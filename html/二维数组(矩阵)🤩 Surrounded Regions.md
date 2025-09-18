# 经典二维数组(矩阵)🤩 Surrounded Regions

## 💙 【130】Surrounded Regions  <font size="3" color="#FF5733">Medium</font>

Given an `m x n` matrix `board` containing `'X'` and `'O'`, *capture all regions that are 4-directionally surrounded by* `'X'`.

A region is **captured** by flipping all `'O'`s into `'X'`s in that surrounded region.

 

**Example 1:**

![img](https://assets.leetcode.com/uploads/2021/02/19/xogrid.jpg)

```
Input: board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
Output: [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
Explanation: Notice that an 'O' should not be flipped if:
- It is on the border, or
- It is adjacent to an 'O' that should not be flipped.
The bottom 'O' is on the border, so it is not flipped.
The other three 'O' form a surrounded region, so they are flipped.
```

**Example 2:**

```
Input: board = [["X"]]
Output: [["X"]]
```

**Constraints:**

- `m == board.length`
- `n == board[i].length`
- `1 <= m, n <= 200`
- `board[i][j]` is `'X'` or `'O'`.

### 📝个人分析

给定一个包含“x”和“O”的m × n矩阵板，捕获所有被“x”围绕的4个方向的区域。 一个区域是通过将周围区域的所有“O”翻转成“X”来捕获的。

经典DFS题目（BFS也可以实现），找到目标朝着四个方向探索。关键在于如何找到目标。只需要搜索边界，第一行最后一行，第一列最后一列去循环查找，围绕这个矩阵一圈搜是否存在为O的位置，先把这个位置标记一下，并从这个位置开始扩展搜索，只要是四个方向相连接的都标记，最后把没有标记的地方改为X，标记的地方改回O就可以了。

在寻找边界条件时候需要注意条件限定。

### 💡Solution

```java
 public void solve(char[][] board) {
        int row = board.length, col = board[0].length;
        if(row==0||col==0) return;
        for (int i = 0; i < row; i++) {
            if (board[i][0] == 'O') boundaryDFS(board, i, 0);
            if (board[i][col - 1] == 'O') boundaryDFS(board, i, col - 1);
        }
        for (int i = 0; i < col; i++) {
            if (board[0][i] == 'O') boundaryDFS(board, 0, i);
            if (board[row - 1][i] == 'O') boundaryDFS(board, row - 1, i);
        }
        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                if (board[i][j] == 'O') {
                    board[i][j] = 'X';
                } else if (board[i][j] == '*') {
                    board[i][j] = 'O';
                }
            }
        }
    }
    //四个方向 row-1 row+1 col-1 col+1
    private void boundaryDFS(char[][] board, int row, int col) {
        int ro = board.length, co = board[0].length;
        if (row >= ro || col >= co || row < 0 || col < 0 || board[row][col] != '0') return;  //边界条件 
        board[row][col] = '*';
        boundaryDFS(board, row - 1, col);
        boundaryDFS(board, row + 1, col);
        boundaryDFS(board, row, col - 1);
        boundaryDFS(board, row, col + 1);
    }
```

# 🔗 Refer links

https://leetcode.com/problems/surrounded-regions/