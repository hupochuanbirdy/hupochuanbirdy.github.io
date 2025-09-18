# 二维数组(矩阵)🤩 Convert 1D Array Into 2D Array

## 💙 【2022】Convert 1D Array Into 2D Array <font size="3" color="#4FE915">easy</font>

You are given a **0-indexed** 1-dimensional (1D) integer array `original`, and two integers, `m` and `n`. You are tasked with creating a 2-dimensional (2D) array with `m` rows and `n` columns using **all** the elements from `original`.

The elements from indices `0` to `n - 1` (**inclusive**) of `original` should form the first row of the constructed 2D array, the elements from indices `n` to `2 * n - 1` (**inclusive**) should form the second row of the constructed 2D array, and so on.

Return *an* `m x n` *2D array constructed according to the above procedure, or an empty 2D array if it is impossible*.

**Example 1:**

![img](https://assets.leetcode.com/uploads/2021/08/26/image-20210826114243-1.png)

```
Input: original = [1,2,3,4], m = 2, n = 2
Output: [[1,2],[3,4]]
Explanation: The constructed 2D array should contain 2 rows and 2 columns.
The first group of n=2 elements in original, [1,2], becomes the first row in the constructed 2D array.
The second group of n=2 elements in original, [3,4], becomes the second row in the constructed 2D array.
```

**Example 2:**

```
Input: original = [1,2,3], m = 1, n = 3
Output: [[1,2,3]]
Explanation: The constructed 2D array should contain 1 row and 3 columns.
Put all three elements in original into the first row of the constructed 2D array.
```

**Example 3:**

```
Input: original = [1,2], m = 1, n = 1
Output: []
Explanation: There are 2 elements in original.
It is impossible to fit 2 elements in a 1x1 2D array, so return an empty 2D array.
```

**Constraints:**

- `1 <= original.length <= 5 * 104`
- `1 <= original[i] <= 105`
- `1 <= m, n <= 4 * 104`

### 📝个人分析

给定一个索引为0的一维整数数组，以及两个整数m和n。您的任务是使用原始数组中的所有元素创建一个包含m行和n列的二维数组。

这题比较简单，注意不能转化为二维数组的条件。

### 💡Solution

```java
 public int[][] construct2DArray(int[] original, int m, int n) {
        int[][] res = new int[m][n];
        int len=original.length;
        if(len!=m*n) return new int[][]{};
        for(int i=0;i<m;i++){
            for(int j=0;j<n;j++){
                res[i][j] = original[n*i+j];
            }
        }
        return res;
  }
```

# 🔗 Refer links

https://leetcode.com/problems/convert-1d-array-into-2d-array/