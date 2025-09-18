# Flutter Dart Beginning

## Dart’s built-in data types

- Numbers
  1. integers (`int`)
  2. doubles (`double`)
- Strings
- Booleans
- Lists
- Sets
- Maps
- Runes
- Symbols

Data types can be broadly divided into two categories:

1. **Reference type**
2. **Value type**

**all data types are objects.**

```dart
//input "Ben", 18 
main() {
  var name = "Ben";
  var age = 18;

  print("$name is $age years old.");
}
```

### Checking the type

```dart
main() {
  var bookTitle = "Lord of the Rings: The Fellowship of the Ring";

  print(bookTitle.runtimeType); // String
}
```

#### type annotations 

we are declaring a variable, `number`, using the `var` keyword. We want the variable to hold any type of number, i.e., `int` and `double`.

```dart
main() {
  var number = 3;
  print(number);

  number = 3.2;
  print(number);
}

/**
main.dart:5:12: Error: A value of type 'double' can't be assigned to a variable of type 'int'.
Try changing the type of the left hand side, or casting the right hand side to 'int'.
  number = 3.2;
*/
```

```dart
main() {
  num number = 3;
  print(number);

  number = 3.2;
  print(number);
}
// it works
```

#### Dynamic types

If you want a variable to hold objects of many types, you can declare a variable using the `dynamic` keyword.

```dart
main() {
  dynamic dynamicVariable = 'A string'; // type String
  print(dynamicVariable);

  dynamicVariable = 5; // type int
  print(dynamicVariable);

  dynamicVariable = true; // type bool
  print(dynamicVariable);
}
```

```
A string
5
true
```

##  Operators

| **Operator** | **Use**                                                      |
| ------------ | ------------------------------------------------------------ |
| `+`          | Adds two operands                                            |
| `-`          | Subtracts the second operand from the first                  |
| `-`expr      | Reverses the sign of the expression (unary minus)            |
| `*`          | Multiplies both operands                                     |
| `/`          | Divides the first operand by the second operand              |
| `~/`         | Divides the first operand by the second operand and returns an integer value |
| `%`          | Gets the remainder after division of one number by another   |

```dart
main() {
  var operand1 = 10;
  var operand2 = 7;

  print(operand1 + operand2);
  print(operand1 - operand2);
  print(- operand1);
  print(operand1 * operand2);
  print(operand1 / operand2);
  print(operand1 ~/ operand2);
  print(operand1 % operand2);
}
```

```
17
3
-10
70
1.4285714285714286
1
3
```

### Prefix and postfix operators

```dart
main() {
  var postfixIncrement = 5;

  print(postfixIncrement++);
  print(postfixIncrement);
}
```

```
5
6
```

### Relational operators

| **Operator** | **Use**                                                      |
| ------------ | ------------------------------------------------------------ |
| `==`         | Checks if the values of the two operands are equal (true if equal) |
| `!=`         | Checks if the values of the two operands are not equal (true if not equal) |
| `>`          | Checks if the value of the left operand is greater than the value of the right operand |
| `<`          | Checks if the value of the left operand is less than the value of the right operand |
| `>=`         | Checks if the value of the left operand is greater than or equal to the value of the right operand |
| `<=`         | Checks if the value of the left operand is less than or equal to the value of the right operand |

### Type Test Operators

| Operator | Use                                        |
| -------- | ------------------------------------------ |
| `as`     | typecast                                   |
| `is`     | True if the object has the specified type  |
| `is!`    | False if the object has the specified type |

```dart
main() {
  double type1 = 5.0;
  int type2 = 87;
  String type3 = "educative";
  bool type4 = true;

  print(type1 is int);
  print(type2 is int);
  print(type3 is String);
  print(type4 is double);
  print(type4 is! double);
}
```

```
false
true
true
false
true
```

### Assignment Operators赋值运算符

| =    | -=   | /=   | %=   | >>=  | ^=   |
| ---- | ---- | ---- | ---- | ---- | ---- |
| +=   | *=   | ~/=  | <<=  | &=   | \|=  |

```dart
main() {
  var A = 10;
  var B = 7;
  
  print("Before using a compound assignment operator:");
  print(A);

  A &= B;

  print("After using a compound assignment operator:");
  print(A);
}
```

```
Before using a compound assignment operator:
10
After using a compound assignment operator:
2
```

### Logical Operators

| **Operator** | **Name**    | **Use**                                                      |
| ------------ | ----------- | ------------------------------------------------------------ |
| `!`          | Logical NOT | Reverses the logical state of its operand. If a condition is true, then the Logical *NOT* operator will make it false |
| `||`         | Logical OR  | If any of the two operands is not false, then the result is true |
| `&&`         | Logical AND | If both the operands are not false, then the result is true  |

### Bitwise and Shift Operators

#### 位操作符和移位操作符

| **Operator** | **Name**                     | **Use**                                                      |
| ------------ | ---------------------------- | ------------------------------------------------------------ |
| `&`          | Bitwise **AND**              | If the corresponding bit in both operands is **1** it will give a **1**, else **0** |
| `|`          | Bitwise **OR**               | If the corresponding bit in at least one operand is **1** it will give a **1**, else **0** |
| `^`          | Bitwise **XOR**              | If the corresponding bit in only one operand is **1** it will give a **1**, else **0** |
| `~`          | Unary Bitwise **Complement** | Bits which are **0** become **1** and bits which are **1** become **0** |

| **Operator** | **Name**    | **Use**                                                      |
| ------------ | ----------- | ------------------------------------------------------------ |
| `<<`         | Shift Left  | Shifts all the bits of its operand to the left by the specified amount |
| `>>`         | Shift Right | Shifts all the bits of its operand to the right by the specified amount |

```dart
main() {
  var A = 12;
  var B = 5;

  print(~A); // A complement
  print(~B); // B complement
  print(A & B); // A AND B
  print(A | B); // A OR B
  print(A ^ B); // A XOR B
  print(B << 2); // B Shift Left 2
  print(A >> 2); // A Shift Right 2
}
```

```
-13
-6
4
13
9
20
3
```

##### Explanation

**Line 7**: The `A & B` operator will first convert each decimal operand into its binary form.

- **12** in binary form is 00000000 11001100
- **5** in binary form is 00000000 01010101

From there, it will apply the above rules for the binary AND operator (`&`) on each pair of bits, i.e., the first bit of **12** with the first bit of **5** and so on.

[![pS8PoqA.png](https://s1.ax1x.com/2023/01/19/pS8PoqA.png)](https://imgse.com/i/pS8PoqA)



### 练习：温度计算

```dart
main() {
  var fahrenheit = 50;
  var celsius = (fahrenheit - 32) * (5 / 9);

  // Driver Code
  printResult(celsius);
}
```

## Dart's Collection

### List: The Dart Array

```dart
main() {
  var simpleList = [1,2,3];

  print(simpleList);
}
```

```dart
main() {
  var listOfVegetables = List();

  print(listOfVegetables);
}
```

```dart
main() {
  var listOfVegetables = List<String>();

  print(listOfVegetables is List<String>);
}
```

```dart
main() {
  var listOfVegetables = ['potato', 'carrot', 'cucumber'];
  
  print(listOfVegetables[1]);
  print(listOfVegetables.length);
}
```

#### Adding multiple elements

```dart
main() {
  var listOfVegetables = ['potato', 'carrot', 'cucumber', 'cabbage'];

  listOfVegetables.addAll(['broccoli', 'zucchini']); 

  print(listOfVegetables);

  var vegetablesToAdd = ['okra', 'capsicum'];

  listOfVegetables.addAll(vegetablesToAdd);

  print(listOfVegetables);
}
```

#### Removing

```dart
main() {
  var listOfVegetables = ['potato', 'carrot', 'cucumber', 'cabbage', 'broccoli', 'zucchini'];

  listOfVegetables.removeAt(0);
  print(listOfVegetables);

  listOfVegetables.removeAt(2);
  print(listOfVegetables);
}

main() {
  var listOfVegetables = ['carrot', 'cucumber', 'zucchini'];

  var carrotIndex = listOfVegetables.indexOf('carrot');
  listOfVegetables.removeAt(carrotIndex);

  print(listOfVegetables);
}

main() {
  var listOfVegetables = ['cucumber', 'zucchini'];

  listOfVegetables.clear();

  print(listOfVegetables);
}
  
```

#### `map()` Method

map()将一个列表中的所有项目映射到一个表达式或语句。例如，我们可能有一个整数列表，我们想计算列表中每个整数的平方，map()可以用来解决这样的问题。

```dart
main() {
  var listOfVegetables = ['carrot', 'cucumber', 'zucchini'];
  var mappedVegetables = listOfVegetables.map((vegetable) => 'I love $vegetable');
  print(mappedVegetables);
}
```

```
(I love carrot, I love cucumber, I love zucchini)
```

##### 练习 List of Cubes

```dart
main() {
  var integers = [1,2,3];
  var cubes = integers.map((integer) => integer * integer * integer).toList();
  print(cubes);
}
```

```
[1, 8, 27]
```

### Unordered Sets

在 Dart 中，*集合是唯一项的*无序集合。这意味着项目在集合中没有指定位置，因此，一个集合不能有相同项目的副本。

```dart
main() {
  var simpleSet = {1,2,3,3};

  print(simpleSet);
}
```

```
{1, 2, 3}
```

Dart推断simpleSet有一个Set<int>的类型，一个有int类型元素的Set。

```dart
main() {
  var setOfNumbers = <num>{1,1.5,2,2.5};

  // Driver Code
  print(setOfNumbers);
}
```

```
{1, 1.5, 2, 2.5}
```

#### Creating

```dart
// Method 1
var setName =<dataType> {}
// Method 2
Set<dataType> setName = {}
```

```dart
main() {
  var setOfFruit = <String>{};
  print(setOfFruit);

  Set<String> anotherSetOfFruit = {};
  print(anotherSetOfFruit);
}
```

```
{}
{}
```

如果我们在上面的代码片段中打印setOfruit和另一个SetOfruit，我们会得到空的集合（大括号中没有任何元素）。

#### Add

```dart
main() {
  var setOfFruit = <String>{};

  setOfFruit.add('apples');
  setOfFruit.add('bananas');
  setOfFruit.add('oranges');

  print(setOfFruit);
}

main() {
  var setOfFruits = {'apples', 'bananas', 'oranges'};

  var twoMoreFruits = {'watermelon', 'grapes'};
  setOfFruits.addAll(twoMoreFruits);

  print(setOfFruits);
}
```

#### Length

```dart
main() {
  var setOfFruits = {'apples', 'bananas', 'oranges', 'watermelon', 'grapes'};

  print(setOfFruits.length);
}
```

#### Remove

```dart
main() {
  var setOfFruits = {'apples', 'bananas', 'oranges', 'watermelon', 'grapes'};

  // Remove 'bananas'
  setOfFruits.remove('bananas');

  print(setOfFruits);
}
```

#### Checking

```dart
main() {
  var setOfFruits = {'apples', 'oranges', 'watermelon', 'grapes'};

  //Check whether a single item is in the set
  print(setOfFruits.contains('grapes'));

  //Check whether multiple items are in the set
  print(setOfFruits.containsAll(['watermelon', 'bananas'])); //First Method

  var fruitsToCheck = {'watermelon', 'bananas'};
  print(setOfFruits.containsAll(fruitsToCheck)); // Second Method
}
```

#### Intersection

```dart
main() {
  var setOfFruits = {'apples', 'oranges', 'watermelon', 'grapes'};
  var setOfMoreFruits = {'oranges', 'kiwi', 'bananas'};

  var intersectionSet = setOfFruits.intersection(setOfMoreFruits);
     
  print(intersectionSet);
}
```

```
{oranges}
```

你应该看到一个只有一个项目的集合，'oranges'。这是因为'oranges'是唯一同时包含在setOfFruits和SetOfMoreFruits中的项目。

#### Union

```dart
main() {
  var setOfFruits = {'apples', 'oranges', 'watermelon', 'grapes'};
  var setOfMoreFruits = {'oranges', 'kiwi', 'bananas'};

  var intersectionSet = setOfFruits.union(setOfMoreFruits);
     
  print(intersectionSet);
}
```

```
{apples, oranges, watermelon, grapes, kiwi, bananas}
```

### Map

```dart
main() {
  var capitals = {
    'United States' : 'Washington D.C.',
    'England' : 'London',
    'China' : 'Beijing',
    'Germany' : 'Berlin',
    'Nigeria' : 'Abuja',
    'Egypt' : 'Cairo',
    'New Zealand' : 'Wellington'
  };

  // Driver Code
  print(capitals);
}
```

#### Creating

```dart
main() {
  var emptyMap = Map();

  // Driver Code
  print(emptyMap);
}

main() {
  var numbers = Map<int, String>();

  print(numbers);
}
```

#### Add

```dart
main() {
  var numbers = Map<int, String>();

  numbers[1] = 'one';
  numbers[2] = 'two';
  numbers[3] = 'three';

  print(numbers);
}
```

#### Access

If the key doesn’t exist, you get `null` in return.

```dart
main() {
  var capitals = {
    'United States' : 'Washington D.C.',
    'England' : 'London',
    'China' : 'Beijing',
    'Germany' : 'Berlin',
    'Nigeria' : 'Abuja',
    'Egypt' : 'Cairo',
    'New Zealand' : 'Wellington'
  };

  print(capitals['Germany']);  
}
```

#### Retrieving all the keys and values

```dart
main() {
  var capitals = {
    'United States' : 'Washington D.C.',
    'England' : 'London',
    'China' : 'Beijing',
    'Germany' : 'Berlin',
    'Nigeria' : 'Abuja',
    'Egypt' : 'Cairo',
    'New Zealand' : 'Wellington'
   };

  // Retrieving all the keys 
  var allKeys = capitals.keys;    
  print("Keys: $allKeys");

  // Retrieving all the values
  var allValues = capitals.values;
  print("Values: $allValues");  
}
```

#### Removing

```dart
main() {
  var capitals = {    
    'United States' : 'Washington D.C.',
    'England' : 'London',
    'China' : 'Beijing',
    'Germany' : 'Berlin',
    'Nigeria' : 'Abuja',
    'Egypt' : 'Cairo',
    'New Zealand' : 'Wellington'
  };   
  
  // Removing a key-value pair
  capitals.remove('China'); 
              
  print(capitals);  
}
```
