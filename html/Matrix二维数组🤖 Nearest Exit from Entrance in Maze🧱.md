# Matrix 二维数组🤖 Nearest Exit from Entrance in Maze🧱

## 💙 【1926】Nearest Exit from Entrance in Maze <font size="3" color="#FF5733">Medium</font>

You are given an `m x n` matrix `maze` (**0-indexed**) with empty cells (represented as `'.'`) and walls (represented as `'+'`). You are also given the `entrance` of the maze, where `entrance = [entrancerow, entrancecol]` denotes the row and column of the cell you are initially standing at.

In one step, you can move one cell **up**, **down**, **left**, or **right**. You cannot step into a cell with a wall, and you cannot step outside the maze. Your goal is to find the **nearest exit** from the `entrance`. An **exit** is defined as an **empty cell** that is at the **border** of the `maze`. The `entrance` **does not count** as an exit.

Return *the **number of steps** in the shortest path from the* `entrance` *to the nearest exit, or* `-1` *if no such path exists*.

 

**Example 1:**

![img](https://assets.leetcode.com/uploads/2021/06/04/nearest1-grid.jpg)

```
Input: maze = [["+","+",".","+"],[".",".",".","+"],["+","+","+","."]], entrance = [1,2]
Output: 1
Explanation: There are 3 exits in this maze at [1,0], [0,2], and [2,3].
Initially, you are at the entrance cell [1,2].
- You can reach [1,0] by moving 2 steps left.
- You can reach [0,2] by moving 1 step up.
It is impossible to reach [2,3] from the entrance.
Thus, the nearest exit is [0,2], which is 1 step away.
```

**Example 2:**

![img](https://assets.leetcode.com/uploads/2021/06/04/nearesr2-grid.jpg)

```
Input: maze = [["+","+","+"],[".",".","."],["+","+","+"]], entrance = [1,0]
Output: 2
Explanation: There is 1 exit in this maze at [1,2].
[1,0] does not count as an exit since it is the entrance cell.
Initially, you are at the entrance cell [1,0].
- You can reach [1,2] by moving 2 steps right.
Thus, the nearest exit is [1,2], which is 2 steps away.
```

**Example 3:**

![img](https://assets.leetcode.com/uploads/2021/06/04/nearest3-grid.jpg)

```
Input: maze = [[".","+"]], entrance = [0,0]
Output: -1
Explanation: There are no exits in this maze.
```

**Constraints:**

- `maze.length == m`
- `maze[i].length == n`
- `1 <= m, n <= 100`
- `maze[i][j]` is either `'.'` or `'+'`.
- `entrance.length == 2`
- `0 <= entrancerow < m`
- `0 <= entrancecol < n`
- `entrance` will always be an empty cell.

### 📝 个人分析

![img](https://assets.leetcode.com/uploads/2021/06/04/nearest1-grid.jpg)

为啥用BFS，层级扫描才能确定哪个是最短的。

**边缘条件，不能和进入位置一样**

![img](https://assets.leetcode.com/uploads/2021/06/04/nearest3-grid.jpg)

```java
// 保证界内 并且此路径没有被访问过
cur_row>=0
&& cur_row<row 
&& cur_col>=0
&& cur_col<col
&& !visited[cur_row][cur_col]
// 保证此位置 不是墙壁  
&& maze[cur_row][cur_col] == '.'
```

### 💡Solution

```java
public int nearestExit(char[][] maze, int[] entrance) {
    int row = maze.length;
    int col = maze[0].length;
    int count = 0;
    Queue<int[]> queue = new ArrayDeque<>();
    queue.offer(entrance);
    boolean[][] visited = new boolean[row][col];
    int dirs[][]={{0,1},{1,0},{-1,0},{0,-1}};
    visited[entrance[0]][entrance[1]] = true;
    while (!queue.isEmpty()){
        int size = queue.size();
        count++;        
        for(int i = 0;i<size;i++){
            int[] curr = queue.poll();
            for (int[] dir :dirs ){
                int cur_row = dir[0]+curr[0];
                int cur_col = dir[1]+curr[1];
              
                if(cur_row>=0
                   && cur_row<row 
                   && cur_col>=0
                   && cur_col<col
                   && !visited[cur_row][cur_col]
                   && maze[cur_row][cur_col]=='.'){
                    queue.offer(new int[]{cur_row,cur_col});
                    if(cur_row==0||cur_col==0||cur_row==row-1||cur_col==col-1){
                      //边界
                        return count;
                    }
                    visited[cur_row][cur_col] = true;
                }
            }
        }
    }
    return -1 ;
}
```

### 🚦Related Topics

- [x] Array
- [x] Breadth-First Search
- [x] Matrix 

# 🔗 Refer links

https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/