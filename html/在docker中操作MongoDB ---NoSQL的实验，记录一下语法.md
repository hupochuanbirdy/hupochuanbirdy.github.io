# 在docker中操作MongoDB ---NoSQL的实验，记录一下语法

## **1、在docker中安装MongoDB的image，如果已经安装可以跳过这一步**

[进入官网的搜索mongo](https://hub.docker.com/_/mongo) ，已经给出命令

```Bash
docker pull mongo
```

直接在终端输入。

![img](http://fileserver.youngbird97.top//statics/editor/45a4e18917de4066b60d36f64083a9f9.png)

打开pc的docker，可以配置修改名称。

![img](http://fileserver.youngbird97.top//statics/editor/a168d80e3e1c493d94c6c2bb79529982.png)

## 2、containers/Apps 中运行这个image，并且进入终端

![img](http://fileserver.youngbird97.top//statics/editor/392250c6bb464ba9a5a1a6aaeeb7a9db.png)

## 3、输入mongoDB 的用户名密码

  mongo dbname --host server -u username -p pass 

格式如下：

```apl
    mongodb server   : xxx.com(或者IP/端口)
    mongodb database : dbname
    mongodb Username : username
    mongodb Password : pass
```

  红色部分是根据自己连接信息输入的.

## 4、insert操作

### **1）单条数据插入**

```Bash
 db.inventory.insertOne({"title" : "An Astronaut's Guide to Life on Earth", "qty" : 100, "author" : { "first" : "Chris", "last" : "Hadfield" } });
```

### **2）多条数据插入**

```Bash
 db.inventory.insertMany( [
{ "title": "International Space Station: Architecture Beyond Earth", "qty": 25, "author": { "first": "David", "last": "Nixon" } },
{ "title": "Space Shuttle: Developing an Icon ", "qty": 50, "author": { "first": "Dennis", "last": "Jenkins" } },
{ "title": "X-15: Extending the Frontiers of Flight", "qty": 100, "author": { "first": "Dennis", "last": "Jenkins" } },
{ "title": "Energiya-Buran: The Soviet Space Shuttle", "qty": 75, "author": { "first": "Bert", "last": "Vis" }}] );
```

![img](http://fileserver.youngbird97.top//statics/editor/2131604bbcf94453985e91e6f82766e9.png)
![img](http://fileserver.youngbird97.top//statics/editor/2eab9f17b2b84bafbf9b27f7a6991f93.png)

## 5、query查询操作

**有两种查询格式，全查，待条件查询**

**这种写法，和python操作数据库很像。**

```Bash
myCursor = db.inventory.find({}) //全查
```

![img](http://fileserver.youngbird97.top//statics/editor/92f5d97cf7b44b61a8dcb86277c25dd2.png)

```Bash
myCursor = db.inventory.find( { title: "Space Shuttle: Developing an Icon"} )   //带条件查询，注意，我在插入的时候title多了一个空格，所以查询的时候少打了空格没查到
```

![img](http://fileserver.youngbird97.top//statics/editor/1ecb158f16ae46ab8bf29f6d2650d3a2.png)

```Bash
myCursor = db.inventory.find( { "author.first": "Chris" } ) 
myCursor = db.inventory.find( { "qty": { $lt: 15 } } )
```

**$lt 这个语法是小于的意思（&lt;）**

![img](http://fileserver.youngbird97.top//statics/editor/343c6d310b184e5cac6f8e0d0a287dba.png)



以上是实验2的内容。