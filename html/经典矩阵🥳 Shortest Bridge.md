# 经典矩阵🥳 934 Shortest Bridge

> 我真的很偏爱matrix的题目，又做到了和island数量相似的题目，不过多了一些限制条件

## 💙 【934】 Shortest Bridge Medium  <font size="3" color="#FF5733">Medium</font>

You are given an `n x n` binary matrix `grid` where `1` represents land and `0` represents water.

An **island** is a 4-directionally connected group of `1`'s not connected to any other `1`'s. There are **exactly two islands** in `grid`.

You may change `0`'s to `1`'s to connect the two islands to form **one island**.

Return *the smallest number of* `0`*'s you must flip to connect the two islands*.

**Example 1:**

```
Input: grid = [[0,1],[1,0]]
Output: 1
```

**Example 2:**

```
Input: grid = [[0,1,0],[0,0,0],[0,0,1]]
Output: 2
```

**Example 3:**

```
Input: grid = [[1,1,1,1,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]
Output: 1
```

**Constraints:**

- `n == grid.length == grid[i].length`
- `2 <= n <= 100`
- `grid[i][j]` is either `0` or `1`.
- There are exactly two islands in `grid`.

### 📝个人分析

这道题非常有趣，DFS和BFS两者都用上了，而且效率还是很可观的。

看看**例子2**

[0,1,0]           [0,**2**,*2*]         

[0,0,0] ------> [0,*2*,*2*]           

[0,0,1]           [0,0,1]     

标记【2】 的就是最短的距离链接两个岛，无论哪一个都是两步。按照找岛屿的方法，这个题目，我们只需要找一个岛屿就退出，找到的岛屿标记为2（当然你也可以标记-1，主要是要和没有扫描过的做区分）

个人觉得，这道题和计算[岛屿个数](http://www.youngbird97.top/view/detail/id/28519/category/article)十分相似，当多看几道matrix的题目会发现规律，基本上都是DFS和BFS。

### 💡Solution

```java
   public int shortestBridge(int[][] grid) {　　　　//定义四个方向的矩阵
        int[][] dirs = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        int n = grid.length;
        boolean found = false;
        Queue<int[]> deque = new ArrayDeque<>();
        for (int i = 0; i < n && !found; i++) {
            for (int j = 0; j < n && !found; j++) {
                if ( grid[i][j] == 1) {
                    shortestBridge_dfs(grid, i, j, deque);　//只需要找到的一个岛屿就退出
                    found = true;
                }
            }
        }
        int count = 0;　　　　// queue遵循先进先出的原则，否则在扫描邻居坐标会提前扫描到另一个岛屿
        while (!deque.isEmpty()) {
            int size = deque.size();
            for (int i = 0; i < size; i++) {
                int[] cur = deque.poll();
                for (int[] dir : dirs) {
                    int ro = cur[0] + dir[0];
                    int co = cur[1] + dir[1];　　　　　　　　　　　　//边界显示，
                    if (ro < 0 || co < 0|| ro >= n || co >= n || grid[ro][co] == 2) {
                        continue;
                    }　　　　　　　　　　　　//扫描到另一个岛屿 直接返回
                    if (grid[ro][co] == 1) {
                        return count;
                    }
                    grid[ro][co] = 2;
                    deque.offer(new int[]{ro, co});
                }
            }

            count++;
        }
        return  -1;

    }
<br/>　　　　//DFS 四个方向扫描完整个岛屿，并且标记为2，主要是和没有扫描到的做区分。扫描到第一个岛的所有坐标，都加入队列中
    private void shortestBridge_dfs(int[][] grid, int row, int col,Queue<int[]> deque) {　　　　　　　　// 边界条件，扫描条件，不等于1的坐标说明不是岛屿
        if(row < 0 || col < 0 || row >= grid.length || col >= grid[0].length || grid[row][col] != 1 ) return;
        grid[row][col] = 2;
        deque.offer(new int[]{row,col});
        shortestBridge_dfs(grid, row - 1, col, deque);
        shortestBridge_dfs(grid, row + 1, col, deque);
        shortestBridge_dfs(grid, row, col  + 1, deque);
        shortestBridge_dfs(grid, row, col - 1, deque);
    }
```

# 🔗 Refer links

https://leetcode.com/problems/shortest-bridge/