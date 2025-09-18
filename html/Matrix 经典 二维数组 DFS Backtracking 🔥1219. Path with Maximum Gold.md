# Matrix 经典 二维数组 DFS Backtracking 🔥1219. Path with Maximum Gold

## 💙 【1219】Path with Maximum Gold  <font size="3" color="#FF5733">Medium</font>

In a gold mine `grid` of size `m x n`, each cell in this mine has an integer representing the amount of gold in that cell, `0` if it is empty.

Return the maximum amount of gold you can collect under the conditions:

- Every time you are located in a cell you will collect all the gold in that cell.
- From your position, you can walk one step to the left, right, up, or down.
- You can't visit the same cell more than once.
- Never visit a cell with `0` gold.
- You can start and stop collecting gold from **any** position in the grid that has some gold.

**Example 1:**

```
Input: grid = [[0,6,0],[5,8,7],[0,9,0]]
Output: 24
Explanation:
[[0,6,0],
 [5,8,7],
 [0,9,0]]
Path to get the maximum gold, 9 -> 8 -> 7.
```

**Example 2:**

```
Input: grid = [[1,0,7],[2,0,6],[3,4,5],[0,3,0],[9,0,20]]
Output: 28
Explanation:
[[1,0,7],
 [2,0,6],
 [3,4,5],
 [0,3,0],
 [9,0,20]]
Path to get the maximum gold, 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7.
```

**Constraints:**

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 15`
- `0 <= grid[i][j] <= 100`
- There are at most **25** cells containing gold.

### 💡Solution

```java
    int max_gold = 0;
    public int getMaximumGold(int[][] grid) {
        int row = grid.length;
        int col = grid[0].length;
        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                if(grid[i][j] !=0 ){
                    getMaximumGold_DFS(grid, i,j, 0);
                }
            }
        }
        return max_gold;
    }

    private void getMaximumGold_DFS(int[][] grid, int i, int j,int sum) {
        if(i<0 || j<0 || i>=grid.length|| j>=grid[0].length|| grid[i][j] == 0) {
            max_gold = Math.max(sum,max_gold);
            return;
        }
        int val = grid[i][j];
        grid[i][j] = 0;
        getMaximumGold_DFS(grid,i-1,j, sum+val);
        getMaximumGold_DFS(grid,i+1,j, sum+val);
        getMaximumGold_DFS(grid,i,j+1, sum+val);
        getMaximumGold_DFS(grid,i,j-1, sum+val);
        grid[i][j] = val;
    }
```

### 🚦Related Topics

- [x] Array 
- [x] Backtracking
- [x] Matrix 

# 🔗 Refer links

https://leetcode.com/problems/rotating-the-box/

