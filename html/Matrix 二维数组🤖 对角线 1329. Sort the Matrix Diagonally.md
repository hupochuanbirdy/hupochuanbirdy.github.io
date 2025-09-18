# Matrix 二维数组🤖 对角线 1329. Sort the Matrix Diagonally

## 💙 【1329】 Sort the Matrix Diagonally <font size="3" color="#FF5733">Medium</font>

A **matrix diagonal** is a diagonal line of cells starting from some cell in either the topmost row or leftmost column and going in the bottom-right direction until reaching the matrix's end. For example, the **matrix diagonal** starting from `mat[2][0]`, where `mat` is a `6 x 3` matrix, includes cells `mat[2][0]`, `mat[3][1]`, and `mat[4][2]`.

Given an `m x n` matrix `mat` of integers, sort each **matrix diagonal** in ascending order and return *the resulting matrix*.

**Example 1:**

![img](https://assets.leetcode.com/uploads/2020/01/21/1482_example_1_2.png)

```
Input: mat = [[3,3,1,1],[2,2,1,2],[1,1,1,2]]
Output: [[1,1,1,1],[1,2,2,2],[1,2,3,3]]
```

**Example 2:**

```
Input: mat = [[11,25,66,1,69,7],[23,55,17,45,15,52],[75,31,36,44,58,8],[22,27,33,25,68,4],[84,28,14,11,5,50]]
Output: [[5,17,4,1,52,7],[11,11,25,45,8,69],[14,23,25,44,58,15],[22,27,31,36,50,66],[84,28,75,33,55,68]]
```

**Constraints:**

- `m == mat.length`
- `n == mat[i].length`
- `1 <= m, n <= 100`
- `1 <= mat[i][j] <= 100`

### 📝 一些提示

[<img src="https://s1.ax1x.com/2022/11/19/zuUFud.png" alt="zuUFud.png" style="zoom:50%;" />](https://imgse.com/i/zuUFud)



[<img src="https://s1.ax1x.com/2022/11/19/zuUkDA.png" alt="zuUkDA.png" style="zoom:50%;" />](https://imgse.com/i/zuUkDA)

比较绕，红色部分是第一个循环col处理的， 第二个部分是循环row处理的，row直接从1开始循环。

### 💡Solution

```java
    public int[][] diagonalSort(int[][] mat) {
         int row =mat.length,col =mat[0].length;
         for (int i = 0; i < col; i++) {
            int index = i;
            List<Integer> cache = new ArrayList<>();
            for (int j = 0; j < row; j++) {
                if (index >= col) break;
                cache.add(mat[j][index++]);

            }
            Collections.sort(cache);
            index = i;
            for (int j = 0; j < row; j++) {
                if (index >= col) break;
                mat[j][index++] = cache.get(0);
                cache.remove(0);
            }
        }

        for (int i = 1; i < row; i++) {
            int index2 = i;
            List<Integer> cache2 = new ArrayList<>();
            for (int j = 0; j < col; j++) {
                if (index2 >= row) break;
                cache2.add(mat[index2++][j]);

            }
            Collections.sort(cache2);
            index2 = i;
            for (int j = 0; j < col; j++) {
                if (index2 >= row) break;
                mat[index2++][j] = cache2.get(0);
                cache2.remove(0);
            }
        }
        return mat;
    }
```

[![zuUAHI.png](https://s1.ax1x.com/2022/11/19/zuUAHI.png)](https://imgse.com/i/zuUAHI)

### 🚦Related Topics

- [x] Array 
- [x] Sorting
- [x] Matrix 

# 🔗 Refer links

https://leetcode.com/problems/sort-the-matrix-diagonally/submissions/