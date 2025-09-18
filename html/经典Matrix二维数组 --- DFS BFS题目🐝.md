# 经典Matrix二维数组🔥--- DFS BFS题目🐝

## 💙【733】Flood Fill  <font size="3" color="#4FE915">easy</font>

An image is represented by an `m x n` integer grid `image` where `image[i][j]` represents the pixel value of the image.

You are also given three integers `sr`, `sc`, and `color`. You should perform a **flood fill** on the image starting from the pixel `image[sr][sc]`.

To perform a **flood fill**, consider the starting pixel, plus any pixels connected **4-directionally** to the starting pixel of the same color as the starting pixel, plus any pixels connected **4-directionally** to those pixels (also with the same color), and so on. Replace the color of all of the aforementioned pixels with `color`.

Return *the modified image after performing the flood fill*. 

**Example 1:**

<img src="https://assets.leetcode.com/uploads/2021/06/01/flood1-grid.jpg" alt="img" style="zoom: 50%;" />

```
Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2
Output: [[2,2,2],[2,2,0],[2,0,1]]
Explanation: From the center of the image with position (sr, sc) = (1, 1) (i.e., the red pixel), all pixels connected by a path of the same color as the starting pixel (i.e., the blue pixels) are colored with the new color.
Note the bottom corner is not colored 2, because it is not 4-directionally connected to the starting pixel.
```

**Example 2:**

```
Input: image = [[0,0,0],[0,0,0]], sr = 0, sc = 0, color = 0
Output: [[0,0,0],[0,0,0]]
Explanation: The starting pixel is already colored 0, so no changes are made to the image.
```

**Constraints:**

- `m == image.length`
- `n == image[i].length`
- `1 <= m, n <= 50`
- `0 <= image[i][j], color < 216`
- `0 <= sr < m`
- `0 <= sc < n`

### 🔥💡Solution DFS

```java
boolean[][] seen = new boolean[0][0];
public int[][] floodFill(int[][] image, int sr, int sc, int newColor) {
    if(image==null) return new int[][]{};
    int row =image.length,col =image[0].length;
    seen = new boolean[row][col];
    int color =  image[sr][sc];
    floodFill_hepler(image,sr,sc,newColor,color);
    return image;
}

private void floodFill_hepler(int[][] image, int sr, int sc, int newColor,int color) {
    int row =image.length,col =image[0].length;
    if( sr < 0 || sc < 0 || sr >= row || sc >= col || image[sr][sc] != color || seen[sr][sc]) return;
    seen[sr][sc] = true;
    image[sr][sc]=newColor;
    floodFill_hepler(image,sr-1,sc,newColor,color);
    floodFill_hepler(image,sr+1,sc,newColor,color);
    floodFill_hepler(image,sr,sc-1,newColor,color);
    floodFill_hepler(image,sr,sc+1,newColor,color);
}
```

### 💡Solution BFS

```java
public int[][] floodFill(int[][] image, int sr, int sc, int newColor) {
    if(image==null) return new int[][]{};
    int[][] dirs ={{0,1},{0,-1},{1,0},{-1,0}};
    Queue<int[]> queue = new LinkedList<>();
    queue.offer(new int[]{sr,sc});
    int row =image.length;
    int col =image[0].length;
    int color =  image[sr][sc];
    image[sr][sc]=newColor;
    while (!queue.isEmpty()){
        int[] cur = queue.poll();
        for(int[] dir:dirs){
            int ro = cur[0]+dir[0];
            int co = cur[1]+dir[1];
            if(ro<0||co<0 || ro>=row
                    ||co>=col
                    || image[ro][co]!=color){
                continue;
            }

            if(image[ro][co]!=newColor) {
                image[ro][co]=newColor;
                queue.offer(new int[]{ro,co});
            }
        }
    }
    return image;
}
```

## 💙【200】Number of Islands  <font size="3" color="#FF5733">Medium</font>

Given an `m x n` 2D binary grid `grid` which represents a map of `'1'`s (land) and `'0'`s (water), return *the number of islands*.

An **island** is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

 **Example 1:**

```
Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
```

**Example 2:**

```
Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3 
```

**Constraints:**

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 300`
- `grid[i][j]` is `'0'` or `'1'`.

### 💡Solution

```java
 public int numIslands(char[][] grid) {
    Queue<int[]> queue =new LinkedList<>();
    int row =grid.length;
    int col =grid[0].length;
    int count=0;
    for(int i=0;i<row;i++){
        for(int j=0;j<col;j++){
            if(grid[i][j]=='1'){
                count++;
                DFS(grid,i,j);
            }
        }
    }
    return count;
}

private void DFS(char[][] grid,int i,int j){
    grid[i][j] = '0';
    int[][] dirs ={{0,1},{0,-1},{1,0},{-1,0}};
    for(int[] dir : dirs){
        int newrow = i+dir[0];
        int newcol = j+dir[1];
        if (newrow >= 0 && newcol >= 0 &&newrow<grid.length && newcol < grid[0].length) {
            if(grid[newrow][newcol]=='1'){
                DFS(grid,newrow,newcol);
            }
         }
    }
}
```

## 💙【695】Max Area of Island <font size="3" color="#FF5733">Medium</font>

You are given an `m x n` binary matrix `grid`. An island is a group of `1`'s (representing land) connected **4-directionally** (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.

The **area** of an island is the number of cells with a value `1` in the island.

Return *the maximum **area** of an island in* `grid`. If there is no island, return `0`.

**Example 1:**

<img src="https://assets.leetcode.com/uploads/2021/05/01/maxarea1-grid.jpg" alt="img" style="zoom:33%;" />

```
Input: grid = [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
Output: 6
Explanation: The answer is not 11, because the island must be connected 4-directionally.
```

**Example 2:**

```
Input: grid = [[0,0,0,0,0,0,0,0]]
Output: 0
```

**Constraints:**

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 50`
- `grid[i][j]` is either `0` or `1`.

### 💡Solution

```java
   public int maxAreaOfIsland(int[][] grid) {
        if (grid == null) return 0;
        int row = grid.length;
        int MaxArea = 0;
        int col = grid[0].length;
        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                if (grid[i][j] == 1) {
                    MaxArea = Math.max(MaxArea,detect_maxAreaOfIsland(grid, i, j)) ;
                }
            }
        }
        return MaxArea;
    }

    private int detect_maxAreaOfIsland(int[][] grid, int i, int j) {
        int row = grid.length;
        int col = grid[0].length;
        if(i<0||j<0|| i>=row||j>=col|| grid[i][j]!=1) return 0;
        grid[i][j] = 0;
        return 1+
          detect_maxAreaOfIsland(grid, i - 1, j) + 
          detect_maxAreaOfIsland(grid, i + 1, j) +
          detect_maxAreaOfIsland(grid, i, j - 1) + 
          detect_maxAreaOfIsland(grid, i, j + 1);
    }
```

## 💙【1992】 Find All Groups of Farmland  <font size="3" color="#FF5733">Medium</font>

You are given a **0-indexed** `m x n` binary matrix `land` where a `0` represents a hectare of forested land and a `1` represents a hectare of farmland.

To keep the land organized, there are designated rectangular areas of hectares that consist **entirely** of farmland. These rectangular areas are called **groups**. No two groups are adjacent, meaning farmland in one group is **not** four-directionally adjacent to another farmland in a different group.

```
land` can be represented by a coordinate system where the top left corner of `land` is `(0, 0)` and the bottom right corner of `land` is `(m-1, n-1)`. Find the coordinates of the top left and bottom right corner of each **group** of farmland. A **group** of farmland with a top left corner at `(r1, c1)` and a bottom right corner at `(r2, c2)` is represented by the 4-length array `[r1, c1, r2, c2].
```

Return *a 2D array containing the 4-length arrays described above for each **group** of farmland in* `land`*. If there are no groups of farmland, return an empty array. You may return the answer in **any order***.

**Example 1:**

<img src="https://assets.leetcode.com/uploads/2021/07/27/screenshot-2021-07-27-at-12-23-15-copy-of-diagram-drawio-diagrams-net.png" alt="img" style="zoom:33%;" />

```
Input: land = [[1,0,0],[0,1,1],[0,1,1]]
Output: [[0,0,0,0],[1,1,2,2]]
Explanation:
The first group has a top left corner at land[0][0] and a bottom right corner at land[0][0].
The second group has a top left corner at land[1][1] and a bottom right corner at land[2][2].
```

**Example 2:**

<img src="https://assets.leetcode.com/uploads/2021/07/27/screenshot-2021-07-27-at-12-30-26-copy-of-diagram-drawio-diagrams-net.png" alt="img" style="zoom:33%;" />

```
Input: land = [[1,1],[1,1]]
Output: [[0,0,1,1]]
Explanation:
The first group has a top left corner at land[0][0] and a bottom right corner at land[1][1].
```

**Example 3:**

<img src="https://assets.leetcode.com/uploads/2021/07/27/screenshot-2021-07-27-at-12-32-24-copy-of-diagram-drawio-diagrams-net.png" alt="img" style="zoom:33%;" />

```
Input: land = [[0]]
Output: []
Explanation:
There are no groups of farmland.
```

**Constraints:**

- `m == land.length`
- `n == land[i].length`
- `1 <= m, n <= 300`
- `land` consists of only `0`'s and `1`'s.
- Groups of farmland are **rectangular** in shape.

### 💡Solution

```java
int[][] dirs ={{0,1},{0,-1},{1,0},{-1,0}};
public int[][] findFarmland(int[][] land) {
    int row = land.length;
    int col = land[0].length;
    List<int[]> list = new ArrayList<>();
    for (int i=0;i<row;i++) {
        for (int j = 0; j < col; j++) {
            if(land[i][j]== 1){
                int[] tmp = new int[4];
                land[i][j] = 0;
                tmp[0] = i;
                tmp[1] = j;
                detect_findFarmland(new int[]{i,j},land,tmp);
                list.add(tmp);
            }
        }
    }
    int[][] ans = new int[list.size()][4];
    for(int i =0;i<list.size();i++){
        ans[i] = list.get(i);
    }

    return ans;
}

private void detect_findFarmland(int[] ints,int[][] land,int[] tmp) {
    Queue<int[]> queue = new ArrayDeque<>();
    queue.add(ints);
    Boolean flag = true;
    while (!queue.isEmpty()) {
        int size = queue.size();
        for(int i =0 ;i < size;i++){
            int[] curr = queue.poll();
            for (int[] dir : dirs) {
                int ro = curr[0] + dir[0];
                int co = curr[1] + dir[1];
                if ( co < land[0].length && ro < land.length && ro >= 0 && co>= 0 && land[ro][co] == 1 ) {
                    land[ro][co] = 0;
                    queue.offer(new int[]{ro,co});
                    tmp[2] = ro;
                    tmp[3] = co;
                    flag = false;
                }

            }
        }
    }
    if(flag){
        tmp[2] = ints[0];
        tmp[3] = ints[1];
    }
}
```

## 💙 【1254】 Number of Closed Islands  <font size="3" color="#FF5733">Medium</font>

Given a 2D `grid` consists of `0s` (land) and `1s` (water). An *island* is a maximal 4-directionally connected group of `0s` and a *closed island* is an island **totally** (all left, top, right, bottom) surrounded by `1s.`

Return the number of *closed islands*.

**Example 1:**

![img](https://assets.leetcode.com/uploads/2019/10/31/sample_3_1610.png)

```
Input: grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]
Output: 2
Explanation: 
Islands in gray are closed because they are completely surrounded by water (group of 1s).
```

**Example 2:**

![img](https://assets.leetcode.com/uploads/2019/10/31/sample_4_1610.png)

```
Input: grid = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]]
Output: 1
```

**Example 3:**

```
Input: grid = [[1,1,1,1,1,1,1],
               [1,0,0,0,0,0,1],
               [1,0,1,1,1,0,1],
               [1,0,1,0,1,0,1],
               [1,0,1,1,1,0,1],
               [1,0,0,0,0,0,1],
               [1,1,1,1,1,1,1]]
Output: 2
```

**Constraints:**

- `1 <= grid.length, grid[0].length <= 100`
- `0 <= grid[i][j] <=1`

### 💡Solution

```java
    int count = 0;
    Boolean flag = true;
    public int closedIsland(int[][] grid) {
        int row = grid.length;
        int col = grid[0].length;
        for(int i = 0;i< row;i++) {
            for (int j = 0; j < col; j++) {
                flag = true;
                if(grid[i][j] == 0){
                    DFS_closedIsland(grid,i,j);
                    if(flag) count++;
                }
            }
        }
        return count;
    }

    private void DFS_closedIsland(int[][] grid, int i, int j) {
        int row = grid.length;
        int col = grid[0].length;
        if (i < 0 || j < 0 || j >= col || i >= row) {
            flag = false;
            return;
        }
        if (grid[i][j] == 1) {
            return;
        } 
        grid[i][j] = 1;
        DFS_closedIsland(grid, i + 1, j);
        DFS_closedIsland(grid, i - 1, j);
        DFS_closedIsland(grid, i, j + 1);
        DFS_closedIsland(grid, i, j - 1);
    }
```

## 💙【1905】Count Sub Islands  <font size="3" color="#FF5733">Medium</font>

You are given two `m x n` binary matrices `grid1` and `grid2` containing only `0`'s (representing water) and `1`'s (representing land). An **island** is a group of `1`'s connected **4-directionally** (horizontal or vertical). Any cells outside of the grid are considered water cells.

An island in `grid2` is considered a **sub-island** if there is an island in `grid1` that contains **all** the cells that make up **this** island in `grid2`.

Return the ***number** of islands in* `grid2` *that are considered **sub-islands***. 

**Example 1:**

![img](https://assets.leetcode.com/uploads/2021/06/10/test1.png)

```
Input: grid1 = [[1,1,1,0,0],[0,1,1,1,1],[0,0,0,0,0],[1,0,0,0,0],[1,1,0,1,1]], grid2 = [[1,1,1,0,0],[0,0,1,1,1],[0,1,0,0,0],[1,0,1,1,0],[0,1,0,1,0]]
Output: 3
Explanation: In the picture above, the grid on the left is grid1 and the grid on the right is grid2.
The 1s colored red in grid2 are those considered to be part of a sub-island. There are three sub-islands.
```

**Example 2:**

![img](https://assets.leetcode.com/uploads/2021/06/03/testcasex2.png)

```
Input: grid1 = [[1,0,1,0,1],[1,1,1,1,1],[0,0,0,0,0],[1,1,1,1,1],[1,0,1,0,1]], grid2 = [[0,0,0,0,0],[1,1,1,1,1],[0,1,0,1,0],[0,1,0,1,0],[1,0,0,0,1]]
Output: 2 
Explanation: In the picture above, the grid on the left is grid1 and the grid on the right is grid2.
The 1s colored red in grid2 are those considered to be part of a sub-island. There are two sub-islands.
```

**Constraints:**

- `m == grid1.length == grid2.length`
- `n == grid1[i].length == grid2[i].length`
- `1 <= m, n <= 500`
- `grid1[i][j]` and `grid2[i][j]` are either `0` or `1`.

### 💡Solution

```java
int count = 0;
public int countSubIslands(int[][] grid1, int[][] grid2) {
    for (int i = 0; i < grid1.length; i++) {
        for (int j = 0; j < grid1[0].length; j++) {
            if (grid2[i][j] == 1) {
                if (grid1[i][j] != 1) {
                    countSubIslands_DFS(grid2, i, j);
                }
            }
        }
    }
    for (int i = 0; i < grid2.length; i++) {
        for (int j = 0; j < grid2[0].length; j++) {
            if (grid2[i][j] == 1) {
                count++;
                countSubIslands_DFS(grid2, i, j);
            }
        }
    }
    return count;
}

private void countSubIslands_DFS(int[][] grid, int i, int j) {
    if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] == 0) {
        return;
    }
    grid[i][j] = 0;
    countSubIslands_DFS(grid, i, j - 1);
    countSubIslands_DFS(grid, i, j + 1);
    countSubIslands_DFS(grid, i - 1, j);
    countSubIslands_DFS(grid, i + 1, j);
}
```

## 💙【417】Pacific Atlantic Water Flow  <font size="3" color="#FF5733">Medium</font>

There is an `m x n` rectangular island that borders both the **Pacific Ocean** and **Atlantic Ocean**. The **Pacific Ocean** touches the island's left and top edges, and the **Atlantic Ocean** touches the island's right and bottom edges.

The island is partitioned into a grid of square cells. You are given an `m x n` integer matrix `heights` where `heights[r][c]` represents the **height above sea level** of the cell at coordinate `(r, c)`.

The island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is **less than or equal to** the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.

Return *a **2D list** of grid coordinates* `result` *where* `result[i] = [ri, ci]` *denotes that rain water can flow from cell* `(ri, ci)` *to **both** the Pacific and Atlantic oceans*.

**Example 1:**

<img src="https://assets.leetcode.com/uploads/2021/06/08/waterflow-grid.jpg" alt="img" style="zoom:50%;" />

```
Input: heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]
Output: [[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]
Explanation: The following cells can flow to the Pacific and Atlantic oceans, as shown below:
[0,4]: [0,4] -> Pacific Ocean 
       [0,4] -> Atlantic Ocean
[1,3]: [1,3] -> [0,3] -> Pacific Ocean 
       [1,3] -> [1,4] -> Atlantic Ocean
[1,4]: [1,4] -> [1,3] -> [0,3] -> Pacific Ocean 
       [1,4] -> Atlantic Ocean
[2,2]: [2,2] -> [1,2] -> [0,2] -> Pacific Ocean 
       [2,2] -> [2,3] -> [2,4] -> Atlantic Ocean
[3,0]: [3,0] -> Pacific Ocean 
       [3,0] -> [4,0] -> Atlantic Ocean
[3,1]: [3,1] -> [3,0] -> Pacific Ocean 
       [3,1] -> [4,1] -> Atlantic Ocean
[4,0]: [4,0] -> Pacific Ocean 
       [4,0] -> Atlantic Ocean
Note that there are other possible paths for these cells to flow to the Pacific and Atlantic oceans.
```

**Example 2:**

```
Input: heights = [[1]]
Output: [[0,0]]
Explanation: The water can flow from the only cell to the Pacific and Atlantic oceans.
```

**Constraints:**

- `m == heights.length`
- `n == heights[r].length`
- `1 <= m, n <= 200`
- `0 <= heights[r][c] <= 105`

### 💡Solution

```java
public List<List<Integer>> pacificAtlantic(int[][] heights) {
    int rows = heights.length, cols = rows > 0 ? heights[0].length : 0;
    int[][] pacific = new int[rows][cols];
    int[][] atlantic = new int[rows][cols];
    List<List<Integer>> res = new ArrayList<>();
    for (int i=0; i<rows;i++){
        pacificAtlantic_DFS(heights,i,0,Integer.MIN_VALUE, pacific);
        pacificAtlantic_DFS(heights,i,cols-1,Integer.MIN_VALUE, atlantic);
    }
    for (int i=0; i<cols;i++){
        pacificAtlantic_DFS(heights,0,i,Integer.MIN_VALUE, pacific);
        pacificAtlantic_DFS(heights,rows-1,i,Integer.MIN_VALUE, atlantic);
    }
    for (int i=0; i<rows;i++){
        for (int j=0; j<cols;j++){
            if(pacific[i][j]==1 && atlantic[i][j]==1){
                List<Integer> temp = new ArrayList<>();
                temp.add(i);
                temp.add(j);
                res.add(temp);
            }
        }
    }
    return res;
}

private void pacificAtlantic_DFS(int[][] heights, int row, int col, int preVal, int[][] ocean) {
    int rows = heights.length, cols = rows > 0 ? heights[0].length : 0;
    if(row<0||col<0||row>=rows||col>=cols) return;
    else if(heights[row][col]<preVal) return;
    else if(ocean[row][col]==1) return;
    ocean[row][col] = 1;
    pacificAtlantic_DFS(heights,row-1,col,heights[row][col], ocean);
    pacificAtlantic_DFS(heights,row,col-1,heights[row][col], ocean);
    pacificAtlantic_DFS(heights,row+1,col,heights[row][col], ocean);
    pacificAtlantic_DFS(heights,row,col+1,heights[row][col], ocean);
}
```

## 💙【1727】Largest Submatrix With Rearrangements 🤑贪心  <font size="3" color="#FF5733">Medium</font>

You are given a binary matrix `matrix` of size `m x n`, and you are allowed to rearrange the **columns** of the `matrix` in any order.

Return *the area of the largest submatrix within* `matrix` *where **every** element of the submatrix is* `1` *after reordering the columns optimally.*

**Example 1:**

<img src="https://assets.leetcode.com/uploads/2020/12/29/screenshot-2020-12-30-at-40536-pm.png" alt="img" style="zoom:50%;" />

```
Input: matrix = [[0,0,1],[1,1,1],[1,0,1]]
Output: 4
Explanation: You can rearrange the columns as shown above.
The largest submatrix of 1s, in bold, has an area of 4.
```

**Example 2:**

<img src="https://assets.leetcode.com/uploads/2020/12/29/screenshot-2020-12-30-at-40852-pm.png" alt="img" style="zoom:50%;" />

```
Input: matrix = [[1,0,1,0,1]]
Output: 3
Explanation: You can rearrange the columns as shown above.
The largest submatrix of 1s, in bold, has an area of 3.
```

**Example 3:**

```
Input: matrix = [[1,1,0],[1,0,1]]
Output: 2
Explanation: Notice that you must rearrange entire columns, and there is no way to make a submatrix of 1s larger than an area of 2. 
```

**Constraints:**

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m * n <= 105`
- `matrix[i][j]` is either `0` or `1`.

### 📝个人分析

没做过这类题，有点蒙。

### 💡Solution

```java
public int largestSubmatrix(int[][] matrix) {
    int row = matrix.length;
    int col = matrix[0].length;
    int maxArea = 0;
    for (int i = 0; i < row; i++) {
        PriorityQueue<Integer> MaxHeap = new PriorityQueue<>(Collections.reverseOrder());
        for (int j = 0; j < col; j++) {
            if (matrix[i][j] == 1) {
                if (i > 0) matrix[i][j] += matrix[i - 1][j];
                MaxHeap.add(matrix[i][j]);
            }
        }
        int minColHeight = 0;
        int width = 0;
        while (!MaxHeap.isEmpty()) {
            width++;
            minColHeight = MaxHeap.poll();
            maxArea = Math.max(minColHeight * width, maxArea);
        }
    }
    return maxArea;
}
```

# 📍其他相似的题目

【已整理】[463. Island Perimeter](https://leetcode.com/problems/island-perimeter/)

【已整理】[130. Surrounded Regions](https://leetcode.com/problems/surrounded-regions/)

【已整理】[934. Shortest Bridge](https://leetcode.com/problems/shortest-bridge/)

【已整理】[547. Number of Provinces](https://leetcode.com/problems/number-of-provinces/)

# 🔗 Refer links

https://leetcode.com/problems/flood-fill/

https://leetcode.com/problems/max-area-of-island

https://leetcode.com/problems/island-perimeter/

https://leetcode.com/problems/find-all-groups-of-farmland/

https://leetcode.com/problems/number-of-closed-islands/

https://leetcode.com/problems/pacific-atlantic-water-flow/

https://leetcode.com/problems/count-sub-islands/

https://leetcode.com/problems/shortest-bridge/

https://www.youngbird97.top/view/detail/id/28519/category/article

