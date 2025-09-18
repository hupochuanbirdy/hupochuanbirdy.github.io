---
title: "Building Offline-Ready Apps with Flutter Drift: My Experience"
date: 2025-06-21T16:11:45+01:00
lastmod: 2025-06-21T16:11:45+01:00
subTitle: ""
description: ""
draft: false
featured: true
type: posts
label: "orginal"
author: tothemoon
tags: [ "flutter","drift" ]
categories: [ "flutter" ]
cover:
  position: <left,right>
  image: "https://hupo-posts.s3.ap-northeast-2.amazonaws.com/2025-08-28/cover_drift.png"
  alt: "<alt text>"
  caption: "<text>"
---

has been long time didnt write any article, working hardly, code and system design

> Our clients hope the system can keep running offline—some areas have no network at all, and others have very unstable
> connections. This requirement made us rethink our whole data storage approach for the project. We needed something
> robust enough to handle offline reads and writes, and smart enough to sync changes whenever the network returns.

## Intro

After researching various options, we landed on Drift as our local database solution for Flutter. Drift (formerly known
as Moor) offers powerful features like type-safe queries, auto-updating streams, and easy schema migrations, making it a
great fit for apps that need to perform reliably—online and offline.

To address this, our Flutter system includes:

1. A network real-time checker: It constantly monitors connectivity status to smartly switch between online and offline
   modes.
2. Cloud sync (download/upload): Data created or updated locally is synced to the cloud when connectivity is restored,
   while server-side changes are downloaded for local use.
3. Background Task: Sync local orders in midnight.
4. smart data retrieval strategy: The app decides whether to fetch data from the cloud or local database based on the
   current network state, giving users a seamless experience regardless of connection quality.

In this blog, I’ll walk through my implementing offline-first data persistence with Drift, BTW, I use MVVM pattern.

## Why Chose Drift for Flutter

For our offline-first Flutter app, we needed a local database solution that was:

- Reliable
- Type-safe
- Reactive
- Easy to maintain

After comparing options like sqflite, Isar, we chose Drift because it offers:

1. Queries return Streams that automatically notify the UI of data changes, making real-time updates seamless.
2. With clear separation between tables, DAOs, and database logic, it fits perfectly into a clean architecture.
3. Manual Migration Control

## Getting Started with Drift

Here is the folder structure:

{{< highlight bash "linenos=table" >}}
core/
├── database/
│ ├── dao/                  <- Each table’s DAO (query logic)
│ ├── table/                <- Table definitions (Drift Tables)
│ └── app_database.dart     <- Central database and migration logic

{{< /highlight >}}

- Modular: Easy to scale as new tables are added.
- Readable: Each concern (schema vs logic) is isolated.
- Testable: DAOs and migrations can be tested independently.

### Setting Up AppDatabase

{{< highlight dart "linenos=table" >}}
import 'package:drift/drift.dart';
import 'package:drift/native.dart';
import 'dart:io';
import 'package:path_provider/path_provider.dart';
import 'package:path/path.dart' as p;
.....
part 'app_database.g.dart';

@DriftDatabase(
tables: [SystemConfig, PosUser, PosOrder, ...],
daos: [SystemConfigDao, PosUserDao, PosOrderDao, ...],
)
class AppDatabase extends _$AppDatabase {
AppDatabase() : super(_openConnection());

@override
int get schemaVersion => 1;

@override
MigrationStrategy get migration => MigrationStrategy(
      onCreate: (m) async {
      await m.createAll();
      },
      onUpgrade: (m, from, to) async {
         print('Upgrading DB from $from to $to...');
      },
    );
}
LazyDatabase _openConnection() {
   return LazyDatabase(() async {
      final dir = await getApplicationDocumentsDirectory();
      final file = File(p.join(dir.path, 'your_db_name.sqlite'));
      print(file.path);
      return NativeDatabase(file);
   });
}
{{< /highlight >}}
In this file, we define the core AppDatabase class that serves as the entry point to all Drift tables and DAOs.

1. Declare Tables & DAOs
2. Implement schemaVersion
3. Define MigrationStrategy
4. Set Up LazyDatabase

The app_database.g.dart file is initially empty or missing. This is normal. It will be auto-generated once you run the Drift code generator using the following command:

```bash
 flutter pub run build_runner build --delete-conflicting-outputs
 ```

## DAO and Table

To keep our codebase organized and scalable, we separate each table and its corresponding query logic into two dedicated folders: table/ and dao/.

### Drift Table Definitions (table/)

``` dart // table/pos_order.dart
class PosOrder extends Table {
 @override
  String get tableName => 'xxxx';   //  you can overwrite the table name
 
  IntColumn get id => integer().autoIncrement()();
  TextColumn get orderCode => text()();
  RealColumn get orderAmount => real().withDefault(const Constant(0.00))();
  TextColumn get paymentStatus => text().withDefault(const Constant('unpaid'))();
  TextColumn get orderStatus => text().withDefault(const Constant('pending'))();
  RealColumn get totalTaxAmount => real().withDefault(const Constant(0.00))();
  TextColumn get paymentMethod => text().nullable()();
  TextColumn get orderNote => text().nullable()();
  TextColumn get orderType => text().withDefault(const Constant('delivery'))();
  TextColumn get deliveryDate => text().nullable()();
  TextColumn get deliveryTime => text().nullable()();
....
  TextColumn get customer => text().nullable()(); // snapshot
  TextColumn get customerAddress => text().nullable()(); // snapshot
  DateTimeColumn get createdAt => dateTime().nullable()();
  IntColumn get customerId => integer().nullable()();
}
```

### DAO Classes (dao/)

DAOs (Data Access Objects) contain the read/write/query(CRUD) logic for each table.

```dart
// dao/pos_order_dao.dart
@DriftAccessor(tables: [PosOrder])
class PosOrderDao extends DatabaseAccessor<AppDatabase> with _$PosOrderDaoMixin {
  PosOrderDao(AppDatabase db) : super(db);

  Future<List<PosOrderData>> getAllOrders() => select(posOrder).get();

  Stream<List<PosOrderData>> watchAllOrders() => select(posOrder).watch();

  Future<int> insertOrder(PosOrderCompanion order) => into(posOrder).insert(order);

  Future<bool> updateOrder(PosOrderCompanion order) => update(posOrder).replace(order);

  Future<int> deleteOrderById(int id) =>
      (delete(posOrder)..where((t) => t.id.equals(id))).go();
}
```

Notes:

1. watch() enables reactive UI updates (ideal for Flutter)
2. Using Companion classes allows partial inserts and updates

Any class like SystemConfigData, PosOrderData, or PosUserData is not something you write manually — it’s automatically generated by Drift's code generator based on your table definitions.

So if you see a red underline or “undefined class” error in your IDE when you first reference something like PosOrderData, don’t panic — this is normal.
Just Run

```bash
 flutter pub run build_runner build --delete-conflicting-outputs
 ```

### Comes Together

In ```app_database.dart```

```dart
@DriftDatabase(
  tables: [PosOrder, ...],
  daos: [PosOrderDao, ...],
)
```

And run that CLI, Generate the app_database.g.dart file

## Migrations and Schema Changes

As your app grows, so will your database. New features often require adding tables, columns, or modifying constraints. In Flutter Drift, migrations ensure that existing users’ data stays safe and usable when schema changes occur.

We handled this using Drift’s built-in MigrationStrategy in app_database.dart.
We override the migration getter to define both onCreate and onUpgrade logic:

```dart
@override
MigrationStrategy get migration => MigrationStrategy(
  onCreate: (m) async {
    await m.createAll();
  },
  onUpgrade: (m, from, to) async {
    print('Upgrading DB from $from to $to...');
    ....
    if (from == 7 && to == 8) {
      await m.createTable(xxxx);
    }

    if (from == 8 && to == 9) {
      await m.alterTable(TableMigration(user));
      await m.alterTable(TableMigration(address));
      try {
        //Check if 'counter' already exists in 'order'
        await m.alterTable(TableMigration(
          order,
          columnTransformer: {
            order.counter: const CustomExpression('NULL'),
          },
          newColumns: [order.counter],
        ));
      } catch (e) {
        if (kDebugMode) {
          print("Column 'counter' may already exist: $e");
        }
      }
    }
  },
);

```

⚠️ Tips

1. Always increment schemaVersion when making schema changes:

```dart
@override
int get schemaVersion => 2;
```

 2. Avoid dropping tables/columns without backups. Drift doesn’t support dropping columns directly, so you need to:
    - Create a new table
    - Migrate old data manually
    - Drop the old table after verification
 3. Use conditionals (if (from == x && to == y)) for clarity.
 4. Log everything in onUpgrade

In Dev Env(DONT USE IN PROD ENV), we can easily reset DB

```dart
await deleteDatabase(file.path); // only for development!
```
