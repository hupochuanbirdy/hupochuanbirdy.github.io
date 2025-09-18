# Data analysis 数据分析---杂货店数据分析

## 用Pandas进行数据分析

### Group By

 我们将使用一个名为grocery的新数据集，该数据集包含杂货店中一些产品的每日销售量。让我们快速浏览一下这个数据集。

```python
import pandas as pd

grocery = pd.read_csv("grocery.csv")

print("The size of the DataFrame:")
print(grocery.shape)

print("\nThe column names are:")
print(list(grocery.columns))

print("\nThe first five rows:")
print(grocery.head())
```

```
The size of the DataFrame:
(300, 7)

The column names are:
['product_code', 'product_description', 'product_group', 'sales_date', 'price', 'sales_quantity', 'unit']

The first five rows:
   product_code product_description product_group  ... price  sales_quantity  unit
0          1001              tomato     vegetable  ...  2.99              36    kg
1          1001              tomato     vegetable  ...  2.99              23    kg
2          1001              tomato     vegetable  ...  2.99              34    kg
3          1001              tomato     vegetable  ...  2.99              23    kg
4          1001              tomato     vegetable  ...  2.99              34    kg

[5 rows x 7 columns]
```

数据分析中最常用的函数之一是`groupby`函数。它根据给定列中的不同值对观察值（行）进行分组。假设我们有一个`DataFrame`包含零售店产品销售信息的 。每个产品都属于一个产品组，在`product_group`列中指示。通过使用该`groupby`功能，我们可以根据产品所属的产品组对产品进行分组。然后，我们可以计算范围广泛的聚合，例如平均产品价格、每日总销售额等。

[![pSKvaCt.png](https://s1.ax1x.com/2023/01/13/pSKvaCt.png)](https://imgse.com/i/pSKvaCt)

该`groupby`函数创建了组，但除非我们进行一些聚合，否则它们不提供任何信息。例如，在上图中，如果我们将`mean`函数应用于`price`列，我们可以计算每个产品组的平均产品价格。

```python
import pandas as pd

grocery = pd.read_csv("grocery.csv")

print(grocery.groupby("product_group").mean())
```

```
product_group      product_code  price          sales_quantity    
                                     
dairy                1202.0    8.041176          29.511111
fruit                1102.5    3.433333          29.650000
vegetable            1002.0    3.266471          28.688889
```

正如我们在上面的输出中看到的，一旦形成Group并应用均值函数，Pandas 就会计算`mean`所有数字列的值。因此，我们也能够看到平均销售量。普通的产品代码是没有意义的，因为产品代码只是作为一个标识。

如果我们只对平均价格感兴趣，我们可以在应用`groupby`函数之前选择列。例如，我们首先从Group中选择`product_group`和`price`列`grocery`，然后按 对行进行分组`product_column`。最后，该`mean`函数用于查看每个产品组的平均价格。

```python
import pandas as pd

grocery = pd.read_csv("grocery.csv")

print(grocery[["product_group","price"]].groupby("product_group").mean())
```

```
product_group      price
          
dairy             8.041176
fruit             3.433333
vegetable         3.266471
```

### 聚合 Named aggregations

我们在应用和函数之前选择了`product_group`和`price`列，以便输出仅显示产品组和平均价格。如果我们使用命名聚合，则不必事先选择列。我们可以简单地指定列的名称和聚合函数的类型。使用命名聚合的另一个优点是我们可以为聚合列分配一个更具描述性的名称。

```python
import pandas as pd

grocery = pd.read_csv("grocery.csv")

print(
  grocery.groupby("product_group").agg(
    avg_price = ("price","mean")
  )
)
```

```
product_group     avg_price
          
dairy             8.041176
fruit             3.433333
vegetable         3.266471
```

我们可以在一次操作中进行多次汇总。让我们来计算每组的总销售量，此外还有平均价格。

```python
import pandas as pd

grocery = pd.read_csv("grocery.csv")

print(
  grocery.groupby("product_group").agg(
    avg_price = ("price","mean"),
    total_sales = ("sales_quantity", "sum")
  )
)
```

```
product_group    avg_price     total_sales
                        
dairy           8.041176         2656
fruit           3.433333         3558
vegetable       3.266471         2582
```

### `sort_values`

在某些情况下，我们可能希望根据聚合值对组进行排序。这是一种有用的做法，尤其是当我们有多个小组时。该`sort_values`函数可用于此任务。让我们计算每种产品的平均价格和总销量，然后按总销量对值进行排序。

```python
import pandas as pd

grocery = pd.read_csv("grocery.csv")

print(
  grocery.groupby("product_description").agg(
    avg_price = ("price","mean"),
    total_sales = ("sales_quantity", "sum")
  ).sort_values(
    by="total_sales",
    ascending=False
  )
)
```

```
product_description   avg_price     total_sales
                        
milk-1L               6.078571          930
orange                2.714286          908
grape                 4.400000          889
plum                  4.389655          883
yogurt-1kg            6.693103          882
apple                 2.077778          878
cucumber              4.532857          875
onion                 2.150714          862
tomato                3.121034          845
butter-0.25kg        11.400000          844
```

结果默认按升序排序，但我们可以通过将`ascending`参数设置为 来更改此行为`False`。默认情况下，group显示为结果的索引`DataFrame`。如果我们想让group作为`DataFrame`中的一列，我们需要将`as_index`参数设置为`False`。

该`groupby`函数也接受多列进行分组。在这种情况下，将根据每列中不同值的组合生成组。在我们使用多列进行分组的情况下，列名必须写在列表中。

假设我们有一个`DataFrame`包含三列的：`brand`、`color`和`price`。列中的不同类别`brand`是福特和丰田，列中的不同类别`color`是白色和红色。如果我们按`brand`和`color`列对行进行分组，将生成以下组：

- Ford和白色
- Ford和红色
- Toyota和白色
- Toyota和红色

<hr>

```python
import pandas as pd

grocery = pd.read_csv("grocery.csv")

print(
  grocery.groupby(
    ["product_description", "product_group"]
  ).agg(
    avg_price = ("price","mean"),
    total_sales = ("sales_quantity", "sum")
  )
)
```

```
product_description product_group   avg_price     total_sales
                      
apple               fruit           2.077778          878
butter-0.25kg       dairy          11.400000          844
cucumber            vegetable       4.532857          875
grape               fruit           4.400000          889
milk-1L             dairy           6.078571          930
onion               vegetable       2.150714          862
orange              fruit           2.714286          908
plum                fruit           4.389655          883
tomato              vegetable       3.121034          845
yogurt-1kg          dairy           6.693103          882
```

groupby是一个高度灵活和强大的功能，在数据分析任务中经常被使用。

#### 练习 Find the Weekly Sales Quantities

目标是找到每周的总销售额，并按总销售额降序对结果进行排序。我们首先需要`week`通过从列中提取周信息来创建一个`sales_date`列。然后，该`week`列将在`groupby`函数中使用。

```python
import pandas as pd

grocery = pd.read_csv("grocery.csv")

grocery["sales_date"] = grocery["sales_date"].astype("datetime64[ns]")

def find_weekly_sales():
  try:
    grocery["week"] = grocery["sales_date"].dt.week
    
    result = grocery.groupby("week")
    .agg(
      total_sales = ("sales_quantity","sum")
    )
    .sort_values(
      by="total_sales",
      ascending=False)

    return list(result["total_sales"])
  except:
    pass
```

### Pivot Table 数据透视表

**Pivot Table**是通过对一个更广泛的表的数值进行分组和汇总得到的汇总表。假设我们有一个订单表，其中包含每个订单的日期、订单金额和客户代码。可以创建一个Pivot Table来显示每天的总订单金额。我们需要将这些行按日分组，然后通过求和进行汇总。

数据透视表是汇总、排序、分组和聚合表格数据的绝佳工具。由于该`pivot_table`功能，我们可以轻松地使用 Pandas 创建数据透视表。它有几个参数，可提供与 Excel 相媲美的灵活性。

```python
import pandas as pd

grocery = pd.read_csv("grocery.csv")

# Creating the week column
grocery["sales_date"] = grocery["sales_date"].astype("datetime64[ns]")
grocery["week"] = grocery["sales_date"].dt.week

# Creating the pivot table
print(
  pd.pivot_table(
    data = grocery, 
    values = "sales_quantity", 
    index = "product_group", 
    columns = "week",
    aggfunc = "sum"
  )
)
```

```
week            44   45   46   47   48
product_group                         
dairy          650  577  597  632  200
fruit          886  819  792  813  248
vegetable      593  617  619  602  151
```

- `data`: 名称`DataFrame`
- `values`：包含要在数据透视表中聚合的值的列
- `index`：数据透视表的行数
- `columns`：数据透视表的列
- `aggfunc`：用于聚合值的函数

#### 创建具有多种聚合功能的透视表

我们可以通过将多个函数传递给`aggfunc`参数来执行多个聚合。不过，请务必将它们写在列表中。以下代码片段创建了一个数据透视表，显示每个产品组每周价格的平均值和标准差。

```python
import pandas as pd

grocery = pd.read_csv("grocery.csv")

# Creating the week column
grocery["sales_date"] = grocery["sales_date"].astype("datetime64[ns]")
grocery["week"] = grocery["sales_date"].dt.week

# Creating the pivot table
print(
  pd.pivot_table(
    data = grocery, 
    values = "price", 
    index = "week", 
    columns = "product_group",
    aggfunc = ["mean","std"]
  )
)
```

[![pSMpFi9.png](https://s1.ax1x.com/2023/01/13/pSMpFi9.png)](https://imgse.com/i/pSMpFi9)

与前面的示例不同，我们`week`在参数中使用了列，`index`以便周数在数据透视表中显示为行。我们还可以为`index`和`columns`参数使用多列。

我们也可以显示列和行的小计以及总计。我们可以使用margins和margins_name参数来做到这一点。下面的例子说明了这些参数的使用。

```python
import pandas as pd

grocery = pd.read_csv("grocery.csv")

# Creating the week column
grocery["sales_date"] = grocery["sales_date"].astype("datetime64[ns]")
grocery["week"] = grocery["sales_date"].dt.week

# Creating the pivot table
print(
  pd.pivot_table(
    data = grocery, 
    values = "sales_quantity", 
    index = "product_group", 
    columns = "week",
    aggfunc = "sum",
    margins = True,
    margins_name = "Total"
  )
)
```

```
week             44    45    46    47   48  Total
product_group                                    
dairy           650   577   597   632  200   2656
fruit           886   819   792   813  248   3558
vegetable       593   617   619   602  151   2582
Total          2129  2013  2008  2047  599   8796
```























