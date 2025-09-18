# 经典Matrix二维数组🔥994 1034 

## 💙【994】🍊Rotting Oranges  <font size="3" color="#FF5733">Medium</font>

You are given an `m x n` `grid` where each cell can have one of three values:

- `0` representing an empty cell,
- `1` representing a fresh orange, or
- `2` representing a rotten orange.

Every minute, any fresh orange that is **4-directionally adjacent** to a rotten orange becomes rotten.

Return *the minimum number of minutes that must elapse until no cell has a fresh orange*. If *this is impossible, return* `-1`.

**Example 1:**

![img](https://assets.leetcode.com/uploads/2019/02/16/oranges.png)

```
Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
Output: 4
```

**Example 2:**

```
Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
Output: -1
Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.
```

**Example 3:**

```
Input: grid = [[0,2]]
Output: 0
Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.
```

**Constraints:**

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 10`
- `grid[i][j]` is `0`, `1`, or `2`.

### 📝个人分析

这题一看就BFS最合适，坏掉的橘子只影响自己四周的橘子。

首先把坏掉橘子🍊坐标存入queue里。

接下来就是经典四方向走， **int[][] dirs = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};**

越界判断 `ro < 0 || co < 0 || ro >= row || co >= col || grid[ro][co] == 0`

### 💡Solution BFS

```java
import java.util.*;

public int orangesRotting(int[][] grid) {
    int row = grid.length;
    int col = grid[0].length;
    int count = 0;
    boolean entry = false;
    Queue<int[]> queue = new ArrayDeque<>();
    for (int i = 0; i < row && !entry; i++) {
        for (int j = 0; j < col && !entry; j++) {
            if (grid[i][j] == 2) {
                queue.offer(new int[]{i, j , 2});
            }
            if(grid[i][j] == 0) count++; 
        }
    }
    if(count == row * col) return 0;//如果没有橘子🍊
    int[][] dirs = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
    int days = -1;
    while (!queue.isEmpty()) {
        int size = queue.size();
        for (int i = 0; i < size; i++) {
            int[] cur = queue.poll();
            for (int[] dir : dirs) {
                int ro = dir[0] + cur[0];
                int co = dir[1] + cur[1];
                if (ro < 0 || co < 0 || ro >= row || co >= col || grid[ro][co] == 0)
                  continue;
                if (grid[ro][co] == 1) {
                    queue.offer(new int[]{ro, co});
                    grid[ro][co] = 2;
                }
            }
        }
        days++;
    }
    
    for (int i = 0; i < row; i++) {
        for (int j = 0; j < col ; j++) {
            if (grid[i][j] == 1) {
                return  -1;
            }
        }
    }
    return days;
}
```

## 💙【1034】Coloring A Border  <font size="3" color="#FF5733">Medium</font>

You are given an `m x n` integer matrix `grid`, and three integers `row`, `col`, and `color`. Each value in the grid represents the color of the grid square at that location.

Two squares belong to the same **connected component** if they have the same color and are next to each other in any of the 4 directions.

The **border of a connected component** is all the squares in the connected component that are either **4-directionally** adjacent to a square not in the component, or on the boundary of the grid (the first or last row or column).

You should color the **border** of the **connected component** that contains the square `grid[row][col]` with `color`.

Return *the final grid*. 

**Example 1:**

```
Input: grid = [[1,1],[1,2]], row = 0, col = 0, color = 3
Output: [[3,3],[3,2]]
```

**Example 2:**

```
Input: grid = [[1,2,2],[2,3,2]], row = 0, col = 1, color = 3
Output: [[1,3,3],[2,3,3]]
```

**Example 3:**

```
Input: grid = [[1,1,1],[1,1,1],[1,1,1]], row = 1, col = 1, color = 2
Output: [[2,2,2],[2,1,2],[2,2,2]]
```

**Constraints:**

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 50`
- `1 <= grid[i][j], color <= 1000`
- `0 <= row < m`
- `0 <= col < n`

### 📝个人分析

这道题只需要修改边界的值（color），tricky就在于非边界如何判断，

```
例如
row = 0, col = 1, color = 3 起点(0,1) 颜色是2，要把颜色改为3 （0,1）（0,2）（1,2）
[1,2,2]   [1,3,3]
[2,3,2]   [2,3,3]


row = 1, col = 1, color = 2 起点(0,1) 颜色1，按照规律，和起点一个颜色都要改为2，
然而（1,1）不是边界，所以不修改颜色
[1,1,1]     [2,2,2]
[1,1,1]     [2,1,2]
[1,1,1]     [2,2,2]
```

我的想法是，把和起点相同挨着的值全部改为 ` -orginal color`，负值，然后再判断这个位置是不是边界，如果不是改为`orginal color`去掉负, 方法`colorBorder_DFS_abs`就是判断是否边界。最后将`grid[i][j]`为负数的赋值color, 即可。

### 💡Solution DFS

```java
public int[][] colorBorder(int[][] grid, int row, int col, int color) {
    int org = grid[row][col];
    colorBorder_DFS(row,col,grid,org);
    for(int i =0;i<grid.length;i++) {
        for (int j = 0; j < grid[0].length; j++) {
            if (grid[i][j] < 0) grid[i][j] = color;
        }
    }
    return grid;
}
private void colorBorder_DFS(int row_i, int col_j, int[][] grid, int org) {
    int col = grid[0].length;
    int row = grid.length;
    if (col_j < 0 || col_j >= col || row_i < 0 || row_i >= row 
        || grid[row_i][col_j] != org) 	return;
  
    grid[row_i][col_j] = -org; // 取 负值
    colorBorder_DFS(row_i + 1, col_j, grid, org);
    colorBorder_DFS(row_i - 1, col_j, grid, org);
    colorBorder_DFS(row_i, col_j + 1, grid, org);
    colorBorder_DFS(row_i, col_j - 1, grid, org);

    if (colorBorder_DFS_abs(grid, row_i + 1, col_j,org) 
        && colorBorder_DFS_abs(grid, row_i - 1, col_j,org)
        && colorBorder_DFS_abs(grid, row_i, col_j + 1,org) 
        && colorBorder_DFS_abs(grid, row_i, col_j - 1,org)) {
        grid[row_i][col_j] = org; // 恢复原来的值，因为不属于边界
    }

}

private boolean colorBorder_DFS_abs(int[][] grid, int row_i, int col_j,int org) {
    int col = grid[0].length;
    int row = grid.length;
    if (col_j < 0 || col_j >= col || row_i < 0 || row_i >= row ) return false;

    if(grid[row_i][col_j] == org ||grid[row_i][col_j]  == -org  ) return true;
    return false;
}
```

# 🔗 Refer links

https://leetcode.com/problems/rotting-oranges/

https://leetcode.com/problems/coloring-a-border/