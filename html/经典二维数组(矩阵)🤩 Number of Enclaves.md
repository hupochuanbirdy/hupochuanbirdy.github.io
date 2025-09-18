# 经典二维数组(矩阵)🤩 Number of Enclaves

## 💙 【1020】Number of Enclaves <font size="3" color="#FF5733">Medium</font>

You are given an `m x n` binary matrix `grid`, where `0` represents a sea cell and `1` represents a land cell.

A **move** consists of walking from one land cell to another adjacent (**4-directionally**) land cell or walking off the boundary of the `grid`.

Return *the number of land cells in* `grid` *for which we cannot walk off the boundary of the grid in any number of **moves***.

**Example 1:**

![img](https://assets.leetcode.com/uploads/2021/02/18/enclaves1.jpg)

```
Input: grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]
Output: 3
Explanation: There are three 1s that are enclosed by 0s, and one 1 that is not enclosed because its on the boundary.
```

**Example 2:**

![img](https://assets.leetcode.com/uploads/2021/02/18/enclaves2.jpg)

```
Input: grid = [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]
Output: 0
Explanation: All 1s are either on the boundary or can reach the boundary.
```

**Constraints:**

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 500`
- `grid[i][j]` is either `0` or `1`.

### 📝个人分析

这道题和[130题](http://www.youngbird97.top/view/detail/id/19275/category/article)解法一模一样。只查询第一行最后一行，第一列最后一列是不是有1，已经相连的，把相连的所有部分更变为0，那中间不连接边界的直接遍历即可。

### 💡Solution

```java
public int numEnclaves(int[][] grid) {
        int row =grid.length, col =grid[0].length;
        if(row==0||col==0) return 0;
        for (int i = 0; i < row; i++) {   //只扫描第一行最后一行
            if (grid[i][0] == 1) boundaryDFS(grid, i, 0);
            if (grid[i][col - 1] == 1) boundaryDFS(grid, i, col - 1);
        }
        for (int i = 0; i < col; i++) { //只扫描第一列最后一列
            if (grid[0][i] == 1) boundaryDFS(grid, 0, i);
            if (grid[row - 1][i] == 1) boundaryDFS(grid, row - 1, i);
        }
        int res=0;
        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) { // 中间的1（陆地）
                if (grid[i][j] == 1) {
                    res++;
                }
            }
        }
        return res;
    }
    private void boundaryDFS(int[][] grid, int row, int col) {
        int ro = grid.length, co = grid[0].length;
        if (row >= ro || col >= co || row < 0 || col < 0 || grid[row][col] != 1) return;  //边界条件 
        grid[row][col] = 0;
        boundaryDFS(grid, row - 1, col);
        boundaryDFS(grid, row + 1, col);
        boundaryDFS(grid, row, col - 1);
        boundaryDFS(grid, row, col + 1);
    }
```

# 🔗 Refer links

https://leetcode.com/problems/number-of-enclaves/