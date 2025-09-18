### Data analysis 数据分析 No1

## 1. Pandas

### Series

`Series` is a one-dimensional array with axis labels. There are multiple ways to create an array. 

```python
import pandas as pd
myseries = pd.Series([10, 20, 30])
print(myseries)


#=====Output======
0    10
1    20
2    30
dtype: int64
#=================
```

### DataFrame

`DataFrame` is the two-dimensional data structure of Pandas. It consists of labeled rows and columns.

```python
import pandas as pd

df = pd.DataFrame({
    "Name": ["Jane", "John", "Matt", "Ashley"],
    "Age": [24, 21, 26, 32]
})
print(df)

#======Output====
   Age    Name
0   24    Jane
1   21    John
2   26    Matt
3   32  Ashley
#=================

print(df.shape)

#=====Output====== two columns and four rows
(4, 2)
#=================
```

## 2. DataFrame

### Reading Data from a File

The pandas `read_csv` function creates a `DataFrame` from a csv file. Pandas provides several other functions for reading data in files with different formats, such as `read_json`, `read_parquet`, `read_excel`, and so on.

```python
import pandas as pd

sales = pd.read_csv("sales.csv")
print(sales.head())
```

**Output**

[![pSuhneO.png](https://s1.ax1x.com/2023/01/12/pSuhneO.png)](https://imgse.com/i/pSuhneO)

### Using `usecols` parameter

There are several other parameters of the `read_csv`function. For instance, we have the option to read only some of the columns from the csv file.

```python
import pandas as pd

sales = pd.read_csv("sales.csv", usecols=["product_code","product_group","stock_qty"])

print(sales.head())
```

**Output**[![pSuhJ6P.png](https://s1.ax1x.com/2023/01/12/pSuhJ6P.png)](https://imgse.com/i/pSuhJ6P)

DataFrame 由行和列组成。就像我们可以选择只读取部分列一样，read_csv 函数让我们通过使用 nrows 参数限制读取的行数。这在处理大文件时特别有用。

### Create a DataFrame

#### Python dictionary

最常用的方法之一是用Python字典来做到这一点。

```python
import pandas as pd

df = pd.DataFrame({
  "Names": ["Jane", "John", "Matt", "Ashley"],
  "Ages": [26, 24, 28, 25],
  "Score": [91.2, 94.1, 89.5, 92.3]
})

print(df)
```

**Output**[![pSuhrpn.png](https://s1.ax1x.com/2023/01/12/pSuhrpn.png)](https://imgse.com/i/pSuhrpn)

#### Two-dimensional array

DataFrame是一种二维数据结构，由行和列组成。因此，我们可以将一个二维数组转换成DataFrame。例如，DataFrame构造函数接受NumPy数组。

下面的代码用一个NumPy数组创建了一个DataFrame。默认情况下，列名被分配整数索引，但我们可以使用列参数来改变它。

`randint` 是生成1，10的随机数

```python
import numpy as np
import pandas as pd

arr = np.random.randint(1, 10, size=(3,5))

df = pd.DataFrame(arr, columns=["A","B","C","D","E"])

print(df)
```

**Output**

[![pSuh6XV.png](https://s1.ax1x.com/2023/01/12/pSuh6XV.png)](https://imgse.com/i/pSuh6XV)

### Size of a DataFrame

The `size`, `shape`, and `len` methods

shape方法返回一个包含行数和列数的元组。size方法包含一个数字，显示行的数量乘以列的数量。因此，它返回 DataFrame 中单元格的总数。内置的 Python 函数 len 给我们提供了 DataFrame 中的行数。让我们用这些方法来检查销售的大小。
下面的代码用一个NumPy数组创建了一个DataFrame。默认情况下，列名被分配整数索引，但我们可以使用列参数来改变它。

```python
import pandas as pd

sales = pd.read_csv("sales.csv")

print(sales.shape)

print(sales.size)

print(len(sales))
```

[![pSuhvhd.png](https://s1.ax1x.com/2023/01/12/pSuhvhd.png)](https://imgse.com/i/pSuhvhd)

### Data Types of Columns

```python
import pandas as pd

sales = pd.read_csv("sales.csv")

print(sales.dtypes)


print("As index:")
print(sales.columns)

print("As list:")
print(list(sales.columns))
```

[![pSuTUiD.png](https://s1.ax1x.com/2023/01/12/pSuTUiD.png)](https://imgse.com/i/pSuTUiD)

[![pSuTdRH.png](https://s1.ax1x.com/2023/01/12/pSuTdRH.png)](https://imgse.com/i/pSuTdRH)

我们可以使用astpye函数来改变列的数据类型。

```python
import pandas as pd

sales = pd.read_csv("sales.csv")

sales["stock_qty"] = sales["stock_qty"].astype("float")

print(sales.dtypes)
```

[![pSuT2FS.png](https://s1.ax1x.com/2023/01/12/pSuT2FS.png)](https://imgse.com/i/pSuT2FS)

The `astype` function also accepts a dictionary, so we can change the data type of multiple columns in a single operation. The dictionary keys indicate that the column name and values are the new data types.

```python
import pandas as pd

sales = pd.read_csv("sales.csv")

sales = sales.astype({
  "stock_qty": "float",
  "last_week_sales": "float"
})

print(sales.dtypes)
```

[![pSuTWWQ.png](https://s1.ax1x.com/2023/01/12/pSuTWWQ.png)](https://imgse.com/i/pSuTWWQ)

### Different Values in a Column

#### Using the `unique` and `nunique` functions

DataFrame中的列可能是分类的或连续的。分类列可能有许多不同但有限的值，而连续列可以有无限多的值。在这个意义上，这些列可以被视为离散的或分类的随机变量。

检查分类列中的独特值的数量是探索性数据分析的一个重要部分。nunique函数返回一列中独特值的数量，unique函数实际上显示了独特值。我们可以将它们应用于销售中的产品组列。

```python
import pandas as pd

sales = pd.read_csv("sales.csv")

print(sales["product_group"].nunique())
#6
print(sales["product_group"].unique())
# ['PG2' 'PG4' 'PG6' 'PG5' 'PG3' 'PG1']
```

#### The `value_counts` function

有六个不同的产品组。我们可能还需要检查每个产品组有多少行。value_counts函数返回一列中所有不同的值，以及它们出现的次数。

value_counts函数是最经常使用的Pandas函数之一，因为它提供了一个快速探索分类列的方法。

```python
import pandas as pd

sales = pd.read_csv("sales.csv")

print(sales["product_group"].value_counts())
```

```makefile
Output

PG4    349
PG5    255
PG6    243
PG2     75
PG1     39
PG3     39
Name: product_group, dtype: int64
```

### Measures of Central Tendency

#### The mean平均数, median中位数, and mode

- 平均值是指平均数值。它可以通过将数据集中的所有数字相加，然后将总和除以数值的数量来计算。
- 中位数是数值按升序或降序排序时的中间值。如果数据集中的数值数量是偶数，中位数就是中间两个数值的平均值

```python
import pandas as pd

myseries = pd.Series([1, 2, 5, 7, 11, 36])
print(myseries.median())
#output
6.0

print(f"The mode of my series is {myseries.mode()[0]}")
#output
The mode of my series is 6

```

```python
import pandas as pd

sales = pd.read_csv("sales.csv")

print("mean: ")
print(sales["price"].mean())

print("median: ")
print(sales["price"].median())

print("mode: ")
print(sales["price"].mode()[0])

print("minimum: ")
print(sales["price"].min())

print("maximum: ")
print(sales["price"].max())

#output
mean: 
67.06351000000001
median: 
23.74
mode: 
10.44
minimum: 
0.66
maximum: 
```

平均价格约为 67，中位数约为 23。这表明我们有一些产品的价格比其他产品高。

集中趋势的度量是描述性统计的基础。为了更好地理解变量的分布，我们还需要考虑方差或标准差。

方差是值之间差异的度量。可以计算如下：

1. 找出数据集中每个值与平均值之间的差异。
2. 取差的平方。
3. 求平方差的平均值。

标准偏差是衡量值分散程度的指标。更具体地说，它是方差的平方根。

Pandas的`var`和`std`方法可以分别计算方差和标准差。

```python
import pandas as pd

sales = pd.read_csv("sales.csv")

print("variance: ")
print(sales["price"].var())

print("standard deviation: ")
print(sales["price"].std())
```

```python
# Output
variance: 
20766.243824604506
standard deviation: 
144.10497501684148
```

方差和标准差让我们了解到数值是如何围绕中心趋势的衡量标准分布的。一般来说，标准差越大，数值就越分散。

### 练习：Find the Most Frequent Values in a Column

```python
import pandas as pd

sales = pd.read_csv("sales.csv")

def find_most_frequents(column_name):
  try:
    # print(sales[column_name].value_counts())
    return list(sales[column_name].value_counts().index[0:3])
  except:
    pass

```

#### Python index函数

index() 函数用于从序列s中找出某个值第一个出现时的索引位置。

```python
list.index(x[, start[, end]])
```

- x-- 查找的对象。
- start-- 可选，查找的起始位置。
- end-- 可选，查找的结束位置。



## 3. Filtering DataFrame

- 当我们需要为某些任务删除冗余或不必要的数据时，我们会进行过滤。假设我们正在处理一项预测客户流失的机器学习任务。在这种情况下，客户的银行帐号是多余的，需要过滤掉。
- 考虑在银行工作的数据分析师。该银行计划针对在账户余额、每月支出和产品（拥有信用卡或支票账户）方面满足特定标准的客户宣布一项促销活动。数据分析师需要过滤数据以找到符合促销条件的客户。
- 数据清理和操作也需要过滤。我们可能希望过滤掉`DataFrame`某些列中缺失值的观察值（a 中的行）。
- 过滤也经常用于数据分析。假设我们根据消费金额对客户进行分组。在这种情况下，我们会根据花费的金额筛选客户，然后对他们进行分组。

### “loc”和“iloc”

`loc`和`iloc`方法是用于过滤、选择和操作数据的基本 Pandas 方法。它们允许我们访问所需的行和列组合。

- `loc`使用行和列标签。
- `iloc`使用行和列索引。



[![pSKicGj.png](https://s1.ax1x.com/2023/01/13/pSKicGj.png)](https://imgse.com/i/pSKicGj)

用loc方法来选择销售中的前五行( :4  )和两列。

```python
import pandas as pd

sales = pd.read_csv("sales.csv")

print(sales.loc[:4, ["product_code","product_group"]])
```

[![pSKi2zn.png](https://s1.ax1x.com/2023/01/13/pSKi2zn.png)](https://imgse.com/i/pSKi2zn)

:4相当于0:4，它表示从0到4开始的行数。列名以列表形式传递给loc方法。让我们用iloc方法做同样的操作。

```python
import pandas as pd

sales = pd.read_csv("sales.csv")

print(sales.iloc[[5,6,7,8], [0,1]])

print(sales.iloc[5:9, :2])
```

[![pSKiIdU.png](https://s1.ax1x.com/2023/01/13/pSKiIdU.png)](https://imgse.com/i/pSKiIdU)

两个代码做同样的事情。5:9 比在列表中以[5,6,7,8]的形式传递索引更方便。

`iloc`主要区别在于它`loc`适用于标签，而`iloc`适用于索引

```python
import numpy as np
import pandas as pd

df = pd.DataFrame(
  np.random.randint(10, size=(4,4)),
  index = ["a","b","c","d"],
  columns = ["col_a","col_b","col_c","col_d"]
  )

print(df)

print("\nSelect two rows and two columns using loc:")
print(df.loc[["b","d"], ["col_a","col_c"]])
```

```
   col_a  col_b  col_c  col_d
a      0      7      7      4
b      4      3      4      9
c      5      1      0      2
d      3      0      9      9


Select two rows and two columns using loc:
   col_a  col_c
b      4      4
d      3      9
```

loc和iloc方法经常被用来选择或提取数据框架的一部分。主要的区别是，loc使用的是标签，而iloc使用的是索引。

### 过滤columns子集

[![pSKizdO.png](https://s1.ax1x.com/2023/01/13/pSKizdO.png)](https://imgse.com/i/pSKizdO)

```python
import pandas as pd

sales = pd.read_csv("sales.csv")

selected_columns = ["product_code","price"]

print(sales[selected_columns].head())


#我们不需要创建一个包含列名的列表。同样的操作也可以通过这一行来处理。
print(sales["product_code","price"].head())
```

```
   product_code    price
0          4187   569.91
1          4195   712.41
2          4204   854.91
3          4219  1034.55
4          4718    26.59
```

### 条件过滤

```python
sales_filtered = sales[sales.product_group == "PG2"]
sales_filtered = sales[sales["product_group"] == "PG2"]
#等价
```

```python
#选择价格高于 100 的产品。
sales_filtered = sales[sales["price"] > 100]
```

- `==`： 平等的
- `!=`: 不相等
- `>`： 比...更棒
- `>=`: 大于或等于
- `<`： 少于
- `<=`: 小于或等于

#### 多条件

选择价格大于100，库存数量小于400的商品，我们只需要将这些条件和`&`算子结合起来就可以了。

```python
import pandas as pd

# read the sales csv file
sales = pd.read_csv("sales.csv")

# filter the sales data frame
sales_filtered = sales[(sales["price"] > 100) & (sales["stock_qty"] < 400)]

print(sales_filtered[["price","stock_qty"]].head())
```

|运算符用于用OR逻辑结合多个条件。例如，下面一行代码选择属于PG1或PG2产品组的产品。

```python
sales_filtered = sales[(sales["product_group"] == "PG1") | (sales["product_group"] == "PG2")]
```

#### `isin` 方法

考虑这样一种情况，我们要选择属于三个不同类别之一的产品。一种选择是编写三个不同的过滤器并将它们与`|`运算符组合。

```python
sales_filtered = sales[sales["product_group"].isin(["PG1","PG2","PG3"])]
```

最后，我们有非运算符 ( `~`)。`DataFrame`它用在方括号内的名称之前。

我们可以选择不在产品组`PG1`、`PG2`或中的产品，`PG3`如下所示：

```python
sales_filtered = sales[~sales["product_group"].isin(["PG1","PG2","PG3"])]
```

`not`当我们想从一组多个值中排除几个值时，该运算符很有用。

### 使用查询函数过滤行

#### Query

`query`函数是另一种过滤`DataFrame`.

选择价格高于 100 的产品`query`：

```python
sales_filtered = sales.query("price > 100")
```

我们创建了一个基于价格和库存数量列的条件。

```python
import pandas as pd

sales = pd.read_csv("sales.csv")

sales_filtered = sales.query("price > 100 and stock_qty < 400")

print(sales_filtered[["product_code","price","stock_qty"]].head())
```

```
     product_code    price  stock_qty
3            4219  1034.55        241
8            2650   111.06        239
165          1657   208.91        244
186          7269   427.41        369
199          3530   104.49        144
```

在写一个实际涉及到字符串的条件时，我们需要特别小心。

```python
sales_filtered = sales.query("product_group == 'PG2'")
```

### 练习 Filter Out the Values Below Average

```python
import pandas as pd

sales = pd.read_csv("sales.csv")

def find_the_number_of_products():
  try:
    """
    average_price = # find the mean value of the price column
    sales_filtered = # filter the products that have a price higher than the average price
    number_of_products = # find the number of unique product codes in sales_filtered
    """
    average_price = sales["price"].median()
    sales_filtered = sales[sales["price"] > average_price]
    number_of_products = sales_filtered["product_code"].unique()
    return number_of_products
  except:
    pass
```

## 4. String 字符串操作

文本数据是数据科学的重要组成部分。有些领域需要过度处理文本数据，例如自然语言处理 (NLP)。Pandas 库提供了多种处理文本数据的函数和方法。它们可以通过访问器访问`str`

**staff.csv**

| **name**             | **city**        | **date_of_birth** | **start_date** | **salary** | **department**  |
| -------------------- | --------------- | ----------------- | -------------- | ---------- | --------------- |
| **John Doe**         | Houston, TX     | 1998-11-04        | 2018-08-11     | $65,000    | Accounting      |
| **Jane Doe**         | San Jose, CA    | 1995-08-05        | 2017-08-24     | $70,000    | Field Quality   |
| **Matt smith**       | Dallas, TX      | 1996-11-25        | 2020-04-16     | $58,500    | human resources |
| **Ashley Harris**    | Miami, FL       | 1995-01-08        | 2021-02-11     | $49,500    | accounting      |
| **Jonathan targett** | Santa Clara, CA | 1998-08-14        | 2020-09-01     | $62,000    | field quality   |
| **Hale Cole**        | Atlanta, GA     | 2000-10-24        | 2021-10-20     | $54,500    | engineering     |

```python
import pandas as pd

staff = pd.read_csv("staff.csv")

print(f"\nStaff data frame has the following columns: \n{list(staff.columns)}\n")

print(staff)
```

[![pSKFjpj.png](https://s1.ax1x.com/2023/01/13/pSKFjpj.png)](https://imgse.com/i/pSKFjpj)

```python
import pandas as pd

staff = pd.read_csv("staff.csv")

print(staff["name"].str[0])
```

```
0    J
1    J
2    M
3    A
4    J
5    H
Name: name, dtype: object
```

```python
import pandas as pd

staff = pd.read_csv("staff.csv")

print(staff["name"].str[0:3])
```

```
0    Joh
1    Jan
2    Mat
3    Ash
4    Jon
5    Hal
Name: name, dtype: object
```

如果想要的片断从第一个索引（0）开始，我们就不需要写初始索引。因此，下面这行代码的作用与上述相同。

```python
staff["name"].str[:3]
```

值得注意的是，上界是排他性的。因此，[:3]表示索引0、1和2。也可以使用从字符串末端开始的索引。在这种情况下，索引从-1开始，继续为-2、-3，以此类推。下面这行代码返回城市列的最后两个字符。

```python
import pandas as pd

staff = pd.read_csv("staff.csv")

print(staff["name"].str[-2:])
```

```
0    oe
1    oe
2    th
3    is
4    tt
5    le
Name: name, dtype: object
```

为了使切片和索引操作更加灵活，Pandas也允许自定义步骤大小。例如，我们可以创建一个涉及每一个其他字符的切片，从倒数第二的索引开始。

```python
import pandas as pd

staff = pd.read_csv("staff.csv")

print(staff["name"].str[1::2])
```

```
0        onDe
1        aeDe
2       atsih
3      slyHri
4    oahntret
5        aeCl
Name: name, dtype: object
```

**格式**

```python
str[start : end : step size]
```

如果结尾处留有空白，那么分片就会上升到字符串的末端。

### 分割和组合 Strings

#### Splitting

在Staff中，姓名列包含了名字和姓氏。我们可以通过使用分割函数很容易地从姓名列中提取姓或名。

```python
import pandas as pd

staff = pd.read_csv("staff.csv")

print(staff["name"].str.split(" "))
```

```
0            [John, Doe]
1            [Jane, Doe]
2          [Matt, smith]
3       [Ashley, Harris]
4    [Jonathan, targett]
5           [Hale, Cole]
Name: name, dtype: object
```

仅仅分割一个字符串是不够的。我们还需要提取我们需要的部分。

split函数的expand参数可用来在分割后创建独立的列。

```python
import pandas as pd

staff = pd.read_csv("staff.csv")

staff["last_name"] = staff["name"].str.split(" ", expand=True)[1]

print(staff[["name","last_name"]])
```

```
               name last_name
0          John Doe       Doe
1          Jane Doe       Doe
2        Matt smith     smith
3     Ashley Harris    Harris
4  Jonathan targett   targett
5         Hale Cole      Cole
```

#### Combining

```python
import pandas as pd

staff = pd.read_csv("staff.csv")

print(staff["name"] + " - " + staff["department"])
```

```
0               John Doe - Accounting
1            Jane Doe - Field Quality
2        Matt smith - human resources
3          Ashley Harris - accounting
4    Jonathan targett - field quality
5             Hale Cole - engineering
dtype: object
```

这些操作经常被使用，因为字符串或文本数据可能包含多个信息片段。

### 大小写转换 Strings

```python
import pandas as pd

staff = pd.read_csv("staff.csv")

staff["name_lower"] = staff["name"].str.lower()

print(staff[["name","name_lower"]])
```

```
               name        name_lower
0          John Doe          john doe
1          Jane Doe          jane doe
2        Matt smith        matt smith
3     Ashley Harris     ashley harris
4  Jonathan targett  jonathan targett
5         Hale Cole         hale cole
```

我们可以使用的另一个函数是 `capitalize`函数。它只将第一个字母转换为大写。让我们用它来将`department` 列中的数值大写。

```python
import pandas as pd

staff = pd.read_csv("staff.csv")

print(staff["department"].str.capitalize())
```

```
0         Accounting
1      Field quality
2    Human resources
3         Accounting
4      Field quality
5        Engineering
Name: department, dtype: object
```

除了将第一个字母转换为大写外，大写函数还确保所有其他字母都是小写。因此，如果除了第一个字母之外还有一个大写字母，它就会被转换为小写。

```python
import pandas as pd

sales = pd.read_csv("staff.csv")

print(sales["department"][0].upper())
```

```
ACCOUNTING
```

#### 练习Create City and State Columns from the Address

[![pSKkkh4.png](https://s1.ax1x.com/2023/01/13/pSKkkh4.png)](https://imgse.com/i/pSKkkh4)

```python
import pandas as pd

staff = pd.read_csv("staff.csv")

def create_city_column():
  try:
    staff["state"] = staff["city"].str.split(",", expand=True)[1]
    return list(staff["state"])
 
  except:
    pass
```

### 替换字符 in a String

Pandas库提供了高度灵活的方法来处理字符串。其中之一是`str`访问器下的替换函数。它可以用来替换字符串中的一个字符或一个字符序列。

```python
import pandas as pd

staff = pd.read_csv("staff.csv")

print(staff["city"].str.replace(",", "-"))
```

```
0        Houston- TX
1       San Jose- CA
2         Dallas- TX
3          Miami- FL
4    Santa Clara- CA
5        Atlanta- GA
Name: city, dtype: object
```

在前面的例子中，我们使用了str访问器下的替换函数。Pandas库还提供了DataFrame.replace函数，可以用来替换整个值。让我们也来看看这个替换函数的例子。我们将首先创建一个状态列，然后用实际的状态名称替换缩写。

```python
import pandas as pd

staff = pd.read_csv("staff.csv")

# Create a state colum
staff["state"] = staff["city"].str[-2:]

# Replace state abbreviations with actual state names
staff["state"].replace(
    {"TX": "Texas", "CA": "California", "FL": "Florida", "GA": "Georgia"},
    inplace = True
)

print(staff["state"])
```

```
0         Texas
1    California
2         Texas
3       Florida
4    California
5       Georgia
Name: state, dtype: object
```

参数`inplace`被设置为 `True` ，以保存在 `DataFrame`中的变化。

- `str.replace`可以用来替换一个字符串的一部分。我们可以替换一个字符，多个字符，或者整个字符串。
- `DataFrame.replace`可以用来替换整个值。我们也可以用这个函数来替换其他数据类型的值，如整数和布尔值。

### 链式操作Chained Operations

我们需要应用一系列的操作来完成所需的任务。我们可以在一个单独的行或步骤中完成每个任务。然而，Pandas库为我们提供了一种更实用、更高效的方式来完成此类任务。

[![pSKkZcR.png](https://s1.ax1x.com/2023/01/13/pSKkZcR.png)](https://imgse.com/i/pSKkZcR)

我们可以将多个字符串操作组合成一个单一的链式操作。例如，我们可以在一行代码中从城市列中提取state的部分并将其转换为小写字母。

```python
import pandas as pd

staff = pd.read_csv("staff.csv")

print(staff["city"].str.split(",", expand=True)[1].str.lower())
```

```
0     tx
1     ca
2     tx
3     fl
4     ca
5     ga
Name: 1, dtype: object
```

考虑一种情况，我们需要将 "field quality "部门的名称改为 "quality"。在`staff`  的 `department`列中，有小写和大写字母。我们首先需要将它们转换为小写或大写，然后再进行替换。

```python
import pandas as pd

staff = pd.read_csv("staff.csv")

print(staff["department"].str.lower().replace("field quality","quality"))
```

```
0         accounting
1            quality
2    human resources
3         accounting
4            quality
5        engineering
Name: department, dtype: object
```

从start_date列中提取年份，并将其数据类型改为整数。

```python
import pandas as pd

staff = pd.read_csv("staff.csv")

print(staff.query("name > 'John Doe'").start_date.str[:4].astype("int"))
```

```
2    2020
4    2020
Name: start_date, dtype: int64
```

#### 练习 Make the Salary Column Proper

Staff（DataFrame）的工资列中的数值是以字符串形式存储的。我们需要将其转换为数字格式来进行计算。

在将其转换为数字数据类型之前，有两个问题需要我们解决。

- 我们需要去掉开头的"$"符号。
- 我们需要去掉作为千位分隔符的","。

```python
import pandas as pd

staff = pd.read_csv("staff.csv")

def make_salary_proper():
  try:
    staff["salary_cleaned"] = staff["salary"].str[1:].str.replace(",","")
    staff["salary_cleaned"] = staff["salary_cleaned"].astype("int")
    return list(staff["salary_cleaned"])
  except:
    pass
```

## 5. Pandas Date and Time Data Types

- A specific date or time (`2021-12-10`, `2021-11-25 14:59:00`)
- A fixed interval (`hour`, `week`, `month`).
- A duration (`3 weeks`, `4 hours and 30 minutes`).

Pandas库有几个函数和方法来有效和容易地处理这些不同的形式。为日期和时间值使用适当的数据类型是很重要的。

```python
import pandas as pd

mydate = pd.to_datetime("2021-11-10")

print(mydate)
```

```
2021-11-10 00:00:00
```

因为该字符串只包含日期信息，所以产生的Timestamp的时间部分为零。

另一个常用的日期和时间的数据类型是`timedelta[ns]`，用于表示两个日期时间对象之间的差异。

```python
import pandas as pd

first_date = pd.to_datetime("2021-10-10")
second_date = pd.to_datetime("2021-10-02")

diff = first_date - second_date

print(diff)
```

```
8 days 00:00:00
```

`Timedelta`对象有一个`days`属性，以整数形式返回天数。

```python
import pandas as pd

first_date = pd.to_datetime("2021-10-10")
second_date = pd.to_datetime("2021-10-02")

diff = first_date - second_date

print(type(diff))
print("\n")
print(diff.days)
```

```
<class 'pandas._libs.tslibs.timedeltas.Timedelta'>

8
```

我们一直在使用的`staff`包含两个有日期信息的列：`date_of_birth`和`start_date`。然而，这些列是以 "对象 "数据类型存储的。为了对它们进行与日期有关的操作，我们需要改变它们的数据类型，这可以通过`astype`函数来完成。

```python
import pandas as pd

staff = pd.read_csv("staff.csv")

staff = staff.astype({
    "date_of_birth": "datetime64[ns]",
    "start_date": "datetime64[ns]",
})

print(staff.dtypes)
```

```
name                     object
city                     object
date_of_birth    datetime64[ns]
start_date       datetime64[ns]
salary                   object
department               object
dtype: object
```

使用这些数据类型对于在日期操作任务中充分利用Pandas至关重要。

### 从日期中提取信息

无论时间戳对象的精度如何，它都包含很多信息，有些任务需要我们提取特定的信息。例如，如果我们对一个产品的月销售额感兴趣，我们就从所有交易的日期中提取月份。

```python
import pandas as pd

mydate = pd.to_datetime("2021-10-10")

print(f"The year part is {mydate.year}")
print(f"The month part is {mydate.month}")
print(f"The week number part is {mydate.week}")
print(f"The day part is {mydate.day}")
```

```
The year part is 2021
The month part is 10
The week number part is 40
The day part is 10
```

 `month` 和`day` 属性分别给我们`Timestamp` 对象的月和日部分。`week`属性返回日历中的星期。一个`Timestamp`对象也有一个时间部分和相关属性。让我们创建一个更精确的对象并访问与时间有关的信息。

我们使用了 f-strings 来使输出看起来更有吸引力和信息量。Python 中的 f-strings 允许在一个字符串中写入变量名。产生的字符串取该变量的值。

```python
import pandas as pd

mydate = pd.to_datetime("2021-10-10 14:30:00")

print(f"The hour part of mydate is {mydate.hour}")
print(f"The minute part of mydate is {mydate.minute}")
print(f"The second part of mydate is {mydate.second}")
```

```
The hour part of mydate is 14
The minute part of mydate is 30
The second part of mydate is 0
```

#### Methods instead of attributes

```python
import pandas as pd

mydate = pd.to_datetime("2021-12-21 00:00:00")

print(f"The date part is {mydate.date()}")
print(f"The day of week is {mydate.weekday()}")
print(f"The name of the month is {mydate.month_name()}")
print(f"The name of the day is {mydate.day_name()}")
```

```
The date part is 2021-12-21
The day of week is 1
The name of the month is December
The name of the day is Tuesday				
```

weekday方法返回一个整数，表示一周中的一天，其中0是星期一。

- Attribute: `mydate.month`
- Method: `mydate.month_name()`

### The dt Accessor

#### `dt`访问器下的方法

我们可以以类似的方式使用`year`and获取年份和时段。`day`通过访问器可用的其他一些方法`dt`是：

- `weekday`
- `hour`
- `minute`
- `second`
- `week`（从 1.1.0 版开始弃用）
- `weekofyear`（从 1.1.0 版开始弃用）

在 Pandas 1.1.0 或更高版本中，`isocalendar`是 和 的非常有用的替代`week`品`weekofyear`。当应用于列时，它返回`DataFrame`包含年、日历周和星期几信息的 。

```python
staff["start_date"].dt.isocalendar()
```

### 通过添加时间间隔来操纵日期

我们可以用来添加或减去日期和时间的一个 Pandas 函数是`DateOffset`. 它可以与日期和时间一起使用。我们只需要指定要加减的单位和数量即可。考虑这样一种情况，我们想在员工入职一年后给他们加薪。在工作人员中，我们可以通过向该列`raise_date`添加一年来创建一个名为的`start_date`列。

```python
import pandas as pd

# create the DataFrame
staff = pd.read_csv("staff.csv")

# change the date type
staff = staff.astype({
    "date_of_birth": "datetime64[ns]",
    "start_date": "datetime64[ns]"
})

# create raise_date column
staff["raise_date"] = staff["start_date"] + pd.DateOffset(years=1)

print(staff[["start_date","raise_date"]].head())
```

```
  start_date raise_date
0 2018-08-11 2019-08-11
1 2017-08-24 2018-08-24
2 2020-04-16 2021-04-16
3 2021-02-11 2022-02-11
4 2020-09-01 2021-09-01
```

`DateOffset`功能非常简单。我们只需要调整单位和数量。例如，以下代码行将六个月添加到`start_date`列中。

```python
staff["start_date"] + pd.DateOffset(months=6)
```

函数中可以使用的单位`DataOffset`有：

- `years`
- `months`
- `weeks`
- `days`
- `hours`
- `minutes`
- `seconds`
- `microseconds`
- `nanoseconds`

我们有两种减法而不是加法的选择。一种是改`+`to `-`，另一种是在函数内部使用负数。让我们创建一个`Timestamp`并使用这两种方法从中减去两个小时。

```python
import pandas as pd

mytime = pd.Timestamp("2021-12-14 16:50:00")

print("The first method")
print(mytime + pd.DateOffset(hours=-2))

print("\nThe second method")
print(mytime - pd.DateOffset(hours=2))
```

```
The first method
2021-12-14 14:50:00

The second method
2021-12-14 14:50:00
```

#### `Timedelta` 功能

添加和减去日期和时间的另一个选项是`Timedelta`函数。请注意，该`Timedelta`函数不再支持`year`和`month`单位，但我们可以将它与其他持续时间一起使用。

它的使用与`DateOffset`函数类似，只是参数设置不同。该`value`参数用于指定要添加或减去的单元数。该`unit`参数定义了时间单位，例如小时和分钟。以下值可与该`unit`参数一起使用：

- `W`并`w`代表一周
- `D`并`d`代表一天
- `H`并`h`代表一个小时
- `T`代表一`t`分钟
- `S`并`s`代表一秒钟
- `L`并`l`代表毫秒
- `U`并`u`代表一微秒
- `N`并`n`代表纳秒

将 12 周添加到函数中的`start_date`列

```python
import pandas as pd

# create the DataFrame
staff = pd.read_csv("staff.csv")

# change the date type
staff = staff.astype({
    "date_of_birth": "datetime64[ns]",
    "start_date": "datetime64[ns]"
})

# add 12 weeks
print(staff["start_date"] + pd.Timedelta(value=12, unit="W"))					
```

```
0   2018-11-03
1   2017-11-16
2   2020-07-09
3   2021-05-06
4   2020-11-24
5   2022-01-12
Name: start_date, dtype: datetime64[ns]
```

该函数的一个很好的特性`Timedelta`是它接受用于指定要添加或减去的持续时间的字符串。要使用这种格式，值和单位都写成一个字符串。我们只需要写单位，就像`unit`参数一样。让我们做与上面相同的示例，但使用字符串。

```python
import pandas as pd

# create the DataFrame
staff = pd.read_csv("staff.csv")

# change the date type
staff = staff.astype({
    "date_of_birth": "datetime64[ns]",
    "start_date": "datetime64[ns]"
})

# add 12 weeks
print(staff["start_date"] + pd.Timedelta("12 W"))
```

```
0   2018-11-03
1   2017-11-16
2   2020-07-09
3   2021-05-06
4   2020-11-24
5   2022-01-12
Name: start_date, dtype: datetime64[ns]
```

要使用函数减去日期或时间值`Timestamp`，我们可以更改`+`为`-`或在函数内使用负数。

### 练习：员工年龄

`staff`包含`start_date`和列`date_of_birth`。我们被要求找出雇员在他们被雇用时的年龄。例如，如果一名员工出生于 1991 年并于 2021 年开始工作，则答案应为 30。

```python
import pandas as pd

staff = pd.read_csv("staff.csv")

staff = staff.astype({
    "date_of_birth": "datetime64[ns]",
    "start_date": "datetime64[ns]"
})

def find_age():
    try:
        staff["age"] = (staff["start_date"] - staff["date_of_birth"]).dt.days / 365
        # convert to integer
        staff["age"] = staff["age"].astype("int")
        return list(staff["age"])
    except:
        pass
```

## 6. 缺失值类型和表示方法

a`row`中的a`DataFrame`表示一个观察值或一个数据点。A`column`是该观察的特征或属性。在某些情况下，我们没有某些观测值的所有特征值。假设我们有一个`DataFrame`包含银行客户信息的 ，例如姓名、年龄、收入、地址等。如果我们没有客户的年龄信息，则将其视为缺失值。

缺失值本质上是我们没有的数据。a 中存在缺失值的原因有很多`DataFrame`，例如输入错误、转换过程中发生的问题等。处理缺失值是数据清理和预处理的一个非常重要的部分。Pandas 库提供了灵活的方法来有效地处理它们。

#### 缺失值类型

要提供一个强大的系统来处理缺失值，必须使用标准格式来表示它们。a 中的标准缺失值表示`DataFrame`是`NaN`. 但是，它与整数值不兼容。因此，每当列中有一个`NaN`值时`integer`，整个列的数据类型都会向上转换为`float`.

我们需要明确声明数据类型为`pd.Int64Dtype()`. 让我们看一个示例来清楚地说明差异。我们将首先创建一个`DataFrame`包含一些缺失值的。Pandas 库接受 Python的`None`和 NumPy的`np.nan`作为缺失值，因此我们可以使用两者来指示缺失值。

```python
import numpy as np
import pandas as pd

df = pd.DataFrame({
    "A": [1, 2, 3, np.nan],
    "B": [2.4, 6.2, 5.1, np.nan],
    "C": ["foo","zoo","bar", np.nan]
})

print(df)
```

```
     A    B    C
0  1.0  2.4  foo
1  2.0  6.2  zoo
2  3.0  5.1  bar
3  NaN  NaN  NaN
```

由于最后一行中缺少值，列中的值`A`被转换为`float`如果我们将此列的数据类型更改为`pd.Int64Dtype()`，则值将为整数。

```python
import numpy as np
import pandas as pd

df = pd.DataFrame({
    "A": [1, 2, 3, np.nan],
    "B": [2.4, 6.2, 5.1, np.nan],
    "C": ["foo","zoo","bar", np.nan]
})

df["A"] = df["A"].astype(pd.Int64Dtype())

print(df)
```

```
     A    B    C
0    1  2.4  foo
1    2  6.2  zoo
2    3  5.1  bar
3  NaN  NaN  NaN
```

### 寻找缺失值 `isna` & `notna` 

[![pSKAMMn.png](https://s1.ax1x.com/2023/01/13/pSKAMMn.png)](https://imgse.com/i/pSKAMMn)

我们可以使用`isna`或`notna`函数来检测缺失值。该`isna`函数计算 a 中的每个单元格`DataFrame`并返回`True`以指示缺失值。让我们通过一个示例来查看其输出。	

```python
import numpy as np
import pandas as pd

df = pd.DataFrame({
    "A": [1, 2, 3, np.nan, 7],
    "B": [2.4, np.nan, 5.1, np.nan, 2.6],
    "C": [np.nan, "foo","zoo","bar", np.nan],
    "D": [11.5, np.nan, 6.2, 21.1, 8.7]
})

print(df.isna())
```

```
       A      B      C      D
0  False  False   True  False
1  False   True  False   True
2  False  False  False  False
3   True   True  False  False
4  False  False   True  False
```

我们有一个`True`和`False`值的网格，其中`True`值表示缺失值。现实生活中的数据集非常大，因此我们可能有`DataFrame`数千或数百万行。在这种情况下，返回一个`DataFrame`充满`True`和`False`值的整体是没有用的。如果我们想统计列中缺失值的个数，可以配合`sum`函数一起使用`isna`。

```python
print(df.isna().sum())
```

```
A    1
B    2
C    2
D    1
dtype: int64
```

添加另一个`sum`函数返回 中缺失值的总数`DataFrame`

```
df.isna().sum().sum()
```

如果我们对每行缺失值的数量感兴趣，我们仍然可以使用该`sum`函数，但`axis`需要将参数设置为 1。

```python
import numpy as np
import pandas as pd

df = pd.DataFrame({
    "A": [1, 2, 3, np.nan, 7],
    "B": [2.4, np.nan, 5.1, np.nan, 2.6],
    "C": [np.nan, "foo","zoo","bar", np.nan],
    "D": [11.5, np.nan, 6.2, 21.1, 8.7]
})

print(df.isna().sum(axis=1))
```

```
0    1
1    2
2    0
3    2
4    1
dtype: int64
```

我们可以使用该`notna`函数来统计列或行中非缺失值的数量。

```python
import numpy as np
import pandas as pd

df = pd.DataFrame({
    "A": [1, 2, 3, np.nan, 7],
    "B": [2.4, np.nan, 5.1, np.nan, 2.6],
    "C": [np.nan, "foo","zoo","bar", np.nan],
    "D": [11.5, np.nan, 6.2, 21.1, 8.7]
})

print(df.notna().sum())
```

```
A    4
B    3
C    3
D    4
dtype: int64
```

DataFrame包含5行，A列只有一个缺失值，所以这一列的notna函数的输出是4。 isna或notna函数是探索性数据分析过程中的一个重要部分。缺失值的数量对我们如何处理它们有很大影响。

### 删除具有缺失值的行和列`dropna`

我们基本上有两个选项来处理缺失值。首先，我们可以删除包含缺失值的行或列。该`dropna`函数用于删除具有缺失值的行和列。要准确高效地使用这个函数，我们首先需要学习它的参数。

该`axis`参数确定是否删除具有缺失值的行或列。默认值为零，表示行。该`how`参数采用两个值之一：`any`或`all`。默认值为`any`，它会删除至少有一个缺失值的行或列。如果`all`选择 ，则要删除的行或列必须缺少所有值。让我们看一些例子来理解这些参数是如何使用的。我们将`DataFrame`在下图中为以下示例创建 。

| A    | B    | C    | D    | E    |
| ---- | ---- | ---- | ---- | ---- |
| 1.0  | 2.4  | NaN  | 11.5 | 1    |
| 2.0  | NaN  | foo  | NaN  | 2    |
| 3.0  | 5.1  | zoo  | 6.2  | 3    |
| NaN  | NaN  | bar  | 21.1 | 4    |
| 7.0  | 2.6  | NaN  | 8.7  | 5    |

```python
import numpy as np
import pandas as pd

df = pd.DataFrame({
    "A": [1, 2, 3, np.nan, 7],
    "B": [2.4, np.nan, 5.1, np.nan, 2.6],
    "C": [np.nan, "foo","zoo","bar", np.nan],
    "D": [11.5, np.nan, 6.2, 21.1, 8.7],
    "E": [1, 2, 3, 4, 5]
})

# Drop rows that have at least one missing value
print(df.dropna(axis=0, how="any"))

# Drop columns that have at least one missing value
print(df.dropna(axis=1, how="any"))

# Drop rows that have less than 4 non-missing values

# DataFrame没有充满缺失值的行或列，因此将 how 参数设置为不会all删除任何行或列。dropna该函数的另一个重要参数是thresh，它可以设置丢弃的阈值。例如，如果我们将thresh参数设置为 4，则一行必须至少有四个非缺失值才不会被删除。换句话说，将删除具有两个或更多缺失值的行，因为DataFrame.
print(df.dropna(thresh=4))
```

```
     A    B    C    D  E
2  3.0  5.1  zoo  6.2  3
```

```
   E
0  1
1  2
2  3
3  4
4  5
```

````
     A    B    C     D  E
0  1.0  2.4  NaN  11.5  1
2  3.0  5.1  zoo   6.2  3
4  7.0  2.6  NaN   8.7  5
````

所有剩余行中的非缺失值的数量至少为4，这就是我们的阈值。在上一个例子中，我们没有使用轴参数，因为我们关注的是行，而轴参数的默认值是0，表示行。

#### `inplace`

需要注意的是，我们需要使用`inplace`参数并将其设置为`True`将更改保存在`DataFrame`. 以下代码`DataFrame`行在删除少于四个非缺失值的行后返回 a。但是，它不会修改`df`. 我们既可以将修改后的赋值`DataFrame`给一个新变量，也可以使用`inplace`参数来修改`df`。`inplace`让我们通过几个例子来演示参数的使用。

```python
import numpy as np
import pandas as pd

df = pd.DataFrame({
    "A": [1, 2, 3, np.nan, 7],
    "B": [2.4, np.nan, 5.1, np.nan, 2.6],
    "C": [np.nan, "foo","zoo","bar", np.nan],
    "D": [11.5, np.nan, 6.2, 21.1, 8.7],
    "E": [1, 2, 3, 4, 5]
})

# Drop rows that have less than 4 non-missing values
df.dropna(thresh=4)

print(df)


# Drop rows that have less than 4 non-missing values
df.dropna(thresh=4, inplace=True)

print(df)
```

```
     A    B    C     D  E
0  1.0  2.4  NaN  11.5  1
1  2.0  NaN  foo   NaN  2
2  3.0  5.1  zoo   6.2  3
3  NaN  NaN  bar  21.1  4
4  7.0  2.6  NaN   8.7  5
```

```
     A    B    C     D  E
0  1.0  2.4  NaN  11.5  1
2  3.0  5.1  zoo   6.2  3
4  7.0  2.6  NaN   8.7  5
```

我们现在看到更改已保存并`df`已修改。是 Pandas中`inplace`一个非常重要的参数，因为它用于多个函数。

### 替换缺失值`fillna`

但是，在许多情况下，丢弃可能不是最佳选择。处理缺失值的另一种选择是使用函数将它们替换为实际值`fillna`。

用于替代缺失值的值取决于数据的特征。我们可能会选择用列的平均值或列中出现频率最高的值来替换缺失值。我们将创建以下内容`DataFrame`来执行示例。`A`让我们从用该列的平均值替换列中的缺失值开始。

```python
import numpy as np
import pandas as pd

df = pd.DataFrame({
    "A": [1, 2, 3, np.nan, 7],
    "B": [2.4, np.nan, 5.1, np.nan, 2.6],
    "C": [np.nan, "foo","zoo","bar", np.nan],
    "D": [11.5, np.nan, 6.2, 21.1, 8.7],
    "E": [1, 2, 3, 4, 5]
})

print(df["A"].fillna(value = df["A"].mean()))
```

```
0    1.00
1    2.00
2    3.00
3    3.25
4    7.00
Name: A, dtype: float64
```

用作替换的值被传递给`value`参数。此参数还接受 Python `dictionary`，因此我们可以在单个操作中替换不同列中的缺失值。

```python
import numpy as np
import pandas as pd

df = pd.DataFrame({
    "A": [1, 2, 3, np.nan, 7],
    "B": [2.4, np.nan, 5.1, np.nan, 2.6],
    "C": [np.nan, "foo","zoo","bar", np.nan],
    "D": [11.5, np.nan, 6.2, 21.1, 8.7],
    "E": [1, 2, 3, 4, 5]
})

# find the replacement values
value_a = df["A"].mean()
value_d = df["D"].mean()

# replace the missing values
print(df.fillna({"A": value_a, "D": value_d}))
```

```
      A    B    C       D  E
0  1.00  2.4  NaN  11.500  1
1  2.00  NaN  foo  11.875  2
2  3.00  5.1  zoo   6.200  3
3  3.25  NaN  bar  21.100  4
4  7.00  2.6  NaN   8.700  5
```

重申一下，确定替换值取决于数据的特性。例如，如果我们的数据包含每日股票价格，则用前一个或下一个值填充缺失值比使用平均值更优化。这是时间序列数据中常用的方法。该`fillna`函数使用参数轻松执行此操作`method`。

- `method = "bfill"`: Replace missing values backward，意思是一个缺失值被后面的值代替。
- `method = "ffill"`: Replace missing values forward，意思是将缺失值替换为之前的值。

```python
import numpy as np
import pandas as pd

df = pd.DataFrame({
    "A": [1, 2, 3, np.nan, 7],
    "B": [2.4, np.nan, 5.1, np.nan, 2.6],
    "C": [np.nan, "foo","zoo","bar", np.nan],
    "D": [11.5, np.nan, 6.2, 21.1, 8.7],
    "E": [1, 2, 3, 4, 5]
})

print("Filling backward")
print(df["A"].fillna(method="bfill"))

print("\nFilling forward")
print(df["A"].fillna(method="ffill"))
```

```
Filling backward
0    1.0
1    2.0
2    3.0
3    7.0
4    7.0
Name: A, dtype: float64

Filling forward
0    1.0
1    2.0
2    3.0
3    3.0
4    7.0
Name: A, dtype: float64
```

如果有连续的缺失值，我们使用前向或后向填充，`fillna`函数会连续替换所有缺失值。**我们可以通过参数来限制前向和后向替换填充的缺失值的个数`limit`**。让我们看一个简单的例子来演示`limit`参数是如何工作的。

```python
import numpy as np
import pandas as pd

df = pd.DataFrame({
    "A": [1, 2, np.nan, np.nan, 8]
})

print("Without the limit parameter")
print(df.fillna(method="bfill"))

print("\nWith the limit parameter")
print(df.fillna(method="bfill", limit=1))
```

```
Without the limit parameter
     A
0  1.0
1  2.0
2  8.0
3  8.0
4  8.0

With the limit parameter
     A
0  1.0
1  2.0
2  NaN
3  8.0
4  8.0
```

当我们将`limit`参数设置为一个时，只有一个值被向后替换。就像`dropna`函数一样，我们需要设置`inplace`参数的值，`True`以保存对原始文件的更改`DataFrame`。

#### 练习：填补缺失值

我们有以下`DataFrame`两列和十行。我们想`measurement`用它们以前的值填充列中缺失的值，但我们只允许使用此方法填充两个连续的值。其余的需要用该列的平均值填充。

|  No  |    Date    | Measurement |
| :--: | :--------: | :---------: |
|  0   | 2021-10-01 |    16.0     |
|  1   | 2021-10-02 |    13.0     |
|  2   | 2021-10-03 |    14.0     |
|  3   | 2021-10-04 |    12.0     |
|  4   | 2021-10-05 |     NaN     |
|  5   | 2021-10-06 |     NaN     |
|  6   | 2021-10-07 |     NaN     |
|  7   | 2021-10-08 |     8.0     |
|  8   | 2021-10-09 |     7.0     |
|  9   | 2021-10-10 |     5.0     |

```python
import numpy as np
import pandas as pd

df = pd.DataFrame({
    "Date": pd.date_range(start="2021-10-01", periods=10),
    "Measurement": [16, 13, 14, 12, np.nan, np.nan, np.nan, 8, 7, 5]
})

def fill_missing_values():
  try:
    
    df.fillna(method="ffill", limit=2, inplace=True)
    df.fillna(value=df["Measurement"].mean(), inplace=True)
    return list(df["Measurement"])
    
  except:
    pass
```



# 🔗参考

https://www.runoob.com/python/att-list-index.html