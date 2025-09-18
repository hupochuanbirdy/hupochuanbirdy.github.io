# Matrix DP Array---1706. Where Will the Ball Fall

## 💙【1706】Where Will the Ball Fall  <font size="3" color="#FF5733">Medium</font>

You have a 2-D `grid` of size `m x n` representing a box, and you have `n` balls. The box is open on the top and bottom sides.

Each cell in the box has a diagonal board spanning two corners of the cell that can redirect a ball to the right or to the left.

- A board that redirects the ball to the right spans the top-left corner to the bottom-right corner and is represented in the grid as `1`.
- A board that redirects the ball to the left spans the top-right corner to the bottom-left corner and is represented in the grid as `-1`.

We drop one ball at the top of each column of the box. Each ball can get stuck in the box or fall out of the bottom. A ball gets stuck if it hits a "V" shaped pattern between two boards or if a board redirects the ball into either wall of the box.

Return *an array* `answer` *of size* `n` *where* `answer[i]` *is the column that the ball falls out of at the bottom after dropping the ball from the* `ith` *column at the top, or `-1` \*if the ball gets stuck in the box\*.* 

**Example 1:**

**<img src="https://assets.leetcode.com/uploads/2019/09/26/ball.jpg" alt="img" style="zoom:50%;" />**

```
Input: grid = [[1,1,1,-1,-1],[1,1,1,-1,-1],[-1,-1,-1,1,1],[1,1,1,1,-1],[-1,-1,-1,-1,-1]]
Output: [1,-1,-1,-1,-1]
Explanation: This example is shown in the photo.
Ball b0 is dropped at column 0 and falls out of the box at column 1.
Ball b1 is dropped at column 1 and will get stuck in the box between column 2 and 3 and row 1.
Ball b2 is dropped at column 2 and will get stuck on the box between column 2 and 3 and row 0.
Ball b3 is dropped at column 3 and will get stuck on the box between column 2 and 3 and row 0.
Ball b4 is dropped at column 4 and will get stuck on the box between column 2 and 3 and row 1.
```

**Example 2:**

```
Input: grid = [[-1]]
Output: [-1]
Explanation: The ball gets stuck against the left wall.
```

**Example 3:**

```
Input: grid = [[1,1,1,1,1,1],[-1,-1,-1,-1,-1,-1],[1,1,1,1,1,1],[-1,-1,-1,-1,-1,-1]]
Output: [0,1,2,3,4,-1]
```

**Constraints:**

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 100`
- `grid[i][j]` is `1` or `-1`.

### 📝个人分析

**1代表正斜杠，-1代表反斜杠，**

正斜杠的走向--->向右下移动 ，反斜杠是向左下移动

 { **1**, 1, 1,-1,-1},
 { 1, **1**, 1,-1,-1},
 {-1,-1,**-1**, 1, 1},
 { 1, **1,** 1, 1,-1},
 {-1,-1,**-1**,-1,-1}

例子中可以观察到加粗的路径是可行的。

{ 1, **1**, 1,-1,-1},
{ 1, 1, **1**,**-1**,-1},
{-1,-1,-1, 1, 1},
{ 1, 1, 1, 1,-1},
{-1,-1,-1,-1,-1}

第二个例子中的路径不可行，因为 1 -1 组成了一个死路。

```java
int nextColumn = col + grid[row][col]; // 向左移动还是向右移动 是根据当前坐标值判断的
```

**如何判断是路径可行性？**

```java
1) nextColumn < 0 || nextColumn > grid[0].length - 1 //基本越界判断
2) grid[row][col] != grid[row][nextColumn]    
  /***
  按照第二个例子， grid[row][col] == 1
  							grid[row][nextColumn] == -1
  左右路径交汇，导致路径闭合，所以这个判断是重点！！！！！
  ***/ 
```

### 💡Solution

```java
public int[] findBall(int[][] grid) {
        int col = grid[0].length;
        int[] ans = new int[col];
        for(int i = 0;i<col;i++){
            ans[i] =  DFS_findBall(grid,i,0);
        }
        return ans;
    }

    private int DFS_findBall(int[][] grid, int col,int row) {
        if (row == grid.length) {
            return col;
        }
        int nextColumn = col + grid[row][col];
        if (nextColumn < 0 || nextColumn > grid[0].length - 1 || 
            grid[row][col] != grid[row][nextColumn]) { //越界
            return -1;
        }
        return DFS_findBall(grid,nextColumn, row + 1);
    }
}
```
## 🚦Related Topics

- [x] Array
- [x] Dynamic Programming
- [x] Depth-First Search 
- [x] Matrix Simulation

# 🔗 Refer links

https://leetcode.com/problems/where-will-the-ball-fall/