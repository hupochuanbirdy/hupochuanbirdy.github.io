# 二维数组(矩阵)🤩 Shortest Path in Binary Matrix

## 💙 【1091】 Shortest Path in Binary Matrix  <font size="3" color="#FF5733">Medium</font>

Given an `n x n` binary matrix `grid`, return *the length of the shortest **clear path** in the matrix*. If there is no clear path, return `-1`.

A **clear path** in a binary matrix is a path from the **top-left** cell (i.e., `(0, 0)`) to the **bottom-right** cell (i.e., `(n - 1, n - 1)`) such that:

- All the visited cells of the path are `0`.
- All the adjacent cells of the path are **8-directionally** connected (i.e., they are different and they share an edge or a corner).

The **length of a clear path** is the number of visited cells of this path.

**Example 1:**

![img](https://assets.leetcode.com/uploads/2021/02/18/example1_1.png)

```
Input: grid = [[0,1],[1,0]]
Output: 2
```

**Example 2:**

![img](https://assets.leetcode.com/uploads/2021/02/18/example2_1.png)

```
Input: grid = [[0,0,0],[1,1,0],[1,1,0]]
Output: 4
```

**Example 3:**

```
Input: grid = [[1,0,0],[1,1,0],[1,1,0]]
Output: -1
```

**Constraints:**

- `n == grid.length`
- `n == grid[i].length`
- `1 <= n <= 100`
- `grid[i][j] is 0 or 1`

### 📝个人分析

广度优先搜索BFS思路，用队列queue来存储可能走的路径的坐标（即只有0才是可以走的），当然八个方向肯定会存在重复的，意思是不能往回走，创建一个boolean的数组，存储当前位置是否被访问过（这也是DP中常用的方法）。

### 💡Solution

```java
  int[][] dirs8 = {{0,1}, {1,0}, {0,-1}, {-1,0}, {-1,-1},{-1,1},{1,-1},{1,1}};;
    public int shortestPathBinaryMatrix(int[][] grid) {
        int n = grid.length;
        if (grid[0][0] == 1 || grid[n - 1][n - 1] == 1) {
            return -1;
        }
        Queue<int[]> queue = new LinkedList<>();  //BFS常用queue
        queue.add(new int[]{0, 0, 1}); //第一个0是行，第二个0是列，第三个是路径。题目意思是从（0，0）开始。
        boolean[][] visited = new boolean[n][n];
        visited[0][0] = true;
        while (!queue.isEmpty()) {
            int[] cur = queue.poll();
            int ro = cur[0], co = cur[1];
            int path = cur[2];
            if(ro==n-1&&co==n-1) return path;  //已经到达右下角位置了
            for (int[] dir : dirs8) {
                int new_ro = ro+dir[0];
                int new_co = co+dir[1];
                if(new_ro<0||new_co<0 || new_ro>=n
                        ||new_co>=n
                        ||visited[new_ro][new_co] ||grid[new_ro][new_co]==1){ //边界条件 以及是否该位置被访问过
                    continue;
                }
                queue.add(new int[] {new_ro, new_co, path + 1});
                visited[new_ro][new_co] = true;
            }
        }
        return -1;
    }
```

# 🔗 Refer links

https://leetcode.com/problems/convert-1d-array-into-2d-array/