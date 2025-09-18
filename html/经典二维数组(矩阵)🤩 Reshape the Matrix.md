# 经典二维数组(矩阵)🤩 Reshape the Matrix

## 💙 【566】Reshape the Matrix <font size="3" color="#4FE915">easy</font>

In MATLAB, there is a handy function called `reshape` which can reshape an `m x n` matrix into a new one with a different size `r x c` keeping its original data.

You are given an `m x n` matrix `mat` and two integers `r` and `c` representing the number of rows and the number of columns of the wanted reshaped matrix.

The reshaped matrix should be filled with all the elements of the original matrix in the same row-traversing order as they were.

If the `reshape` operation with given parameters is possible and legal, output the new reshaped matrix; Otherwise, output the original matrix.

**Example 1:**

![img](https://assets.leetcode.com/uploads/2021/04/24/reshape1-grid.jpg)

```
Input: mat = [[1,2],[3,4]], r = 1, c = 4
Output: [[1,2,3,4]]
```

**Example 2:**

![img](https://assets.leetcode.com/uploads/2021/04/24/reshape2-grid.jpg)

```
Input: mat = [[1,2],[3,4]], r = 2, c = 4
Output: [[1,2],[3,4]
```

**Constraints:**

- `m == mat.length`
- `n == mat[i].length`
- `1 <= m, n <= 100`
- `-1000 <= mat[i][j] <= 1000`
- `1 <= r, c <= 300`

### 📝个人分析

例子2给出的r和c不合法，输出原来的矩阵。

按照正常的想法，row走完之后会走到下一列。第一个例子，给出的row是1，row走完这一行意味着col循环到了给定的column。当c等于执行的次数，则row+1。

这题，leetcode也归为简单类，但是我在做这道题的时候是先循环一次原来的mat，把数字存入一个list中，在根据新的row和column重新产生一个新的mat。显然比以上的方法复杂了点。

### 💡Solution

```java
    public int[][] flipAndInvertImage(int[][] image) {
        int row = image.length, col = image[0].length;
        int[][] res = new int[row][col];
        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                    res[i][j] = image[i][col - j - 1] == 1 ? 0 : 1; //三元表达式，如果从右-->左循环，如果为1，替换为0，否则替换为1
            }
        }
        return res;
    }
```

# 🔗 Refer links

https://leetcode.com/problems/reshape-the-matrix/