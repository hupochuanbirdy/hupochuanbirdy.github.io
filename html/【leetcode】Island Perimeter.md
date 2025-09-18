# 经典二维数组🎻 DFS & BFS---Island Perimeter

## 💙 【463】Island Perimeter <font size="3" color="#4FE915">easy</font>

You are given `row x col` `grid` representing a map where `grid[i][j] = 1` represents land and `grid[i][j] = 0` represents water.

Grid cells are connected **horizontally/vertically** (not diagonally). The `grid` is completely surrounded by water, and there is exactly one island (i.e., one or more connected land cells).

The island doesn't have "lakes", meaning the water inside isn't connected to the water around the island. One cell is a square with side length 1. The grid is rectangular, width and height don't exceed 100. Determine the perimeter of the island.

 

**Example 1:**

![img](https://assets.leetcode.com/uploads/2018/10/12/island.png)

```
Input: grid = [[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]
Output: 16
Explanation: The perimeter is the 16 yellow stripes in the image above.
```

**Example 2:**

```
Input: grid = [[1]]
Output: 4
```

**Example 3:**

```
Input: grid = [[1,0]]
Output: 4
```

**Constraints:**

- `row == grid.length`
- `col == grid[i].length`
- `1 <= row, col <= 100`
- `grid[i][j]` is `0` or `1`.
- There is exactly one island in `grid`.

### 📝个人分析

1表示岛屿，0表示水（蓝色部分）。如果某一块陆地四周都是陆地，那么它没有周长。

同理得出，如果有一个陆地相连，它有三个周长；如果有两个陆地相连，它有两个周长；如果有三个陆地相连，它一个周长；如果它是独立的，则周长为四。

这道题有两个方法。

（1）我是用队列来存储为1的坐标。循环这个队列，每次pop出一个，寻找它的上下左右是不是存在其他陆地。

（2）同样是寻找前后左右，每找到一个陆地-2。

### 💡Solution 1

```java
public int islandPerimeter(int[][] grid) {
        int row = grid.length, col = grid[0].length;
        if (row == 1 && col == 1) {
            if (grid[0][0] == 1) return 4;
            else return 0;
        }
        int[][] dirs ={{0,1},{0,-1},{1,0},{-1,0}};
        Deque<int[]> queue = new ArrayDeque<>();
        for(int i=0;i<row;i++){
            for(int j=0;j<col;j++){
                if (grid[i][j] == 1){
                    queue.push(new int[]{i,j});
                }
            }
        }
        int res=0;
        while (!queue.isEmpty()){
            int count=0;
            int[] cur = queue.poll();
            for(int[] dir:dirs) {
                int ro = cur[0] + dir[0];
                int co = cur[1] + dir[1];
                if (ro >= 0 && co >= 0 && ro < row && co < col && grid[ro][co] == 1) {
                    count++;
                }
            }
            switch (count){
                case 4:res+=0;break; 　　　　
                case 3:res+=1;break;
                case 2:res+=2;break; 　　　　　　　
              	case 1:res+=3;break;
                case 0:res+=4;break;
            }
        }
        return res;
    }
```

### 💡Solution 2

```java
  public int islandPerimeter(int[][] grid) {
        int row = grid.length, col = grid[0].length;
        if(grid==null||row==0||col==0) return 0;
        int res=0;
        for(int i=0;i<row;i++){
            for(int j=0;j<col;j++){
                if (grid[i][j] == 1){
                    res+=4;
                    if(i>0&&grid[i-1][j] == 1) {
                        res -=2;
                    }
                    if(j>0&&grid[i][j-1] == 1) {
                        res -=2;
                    }
                }
            }
        }
        return res;
    }
```

# 🔗 Refer links

https://leetcode.com/problems/island-perimeter/