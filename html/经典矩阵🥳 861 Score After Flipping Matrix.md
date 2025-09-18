# 经典矩阵🥳 861 Score After Flipping Matrix

我真的很偏爱matrix的题目，又做到了和island数量相似的题目，不过多了一些限制条件

## 💙 【861】Score After Flipping Matrix  <font size="3" color="#FF5733">Medium</font>

You are given an `m x n` binary matrix `grid`.

A **move** consists of choosing any row or column and toggling each value in that row or column (i.e., changing all `0`'s to `1`'s, and all `1`'s to `0`'s).

Every row of the matrix is interpreted as a binary number, and the **score** of the matrix is the sum of these numbers.

Return *the highest possible **score** after making any number of **moves** (including zero moves)*.

**Example 1:**

![img](https://assets.leetcode.com/uploads/2021/07/23/lc-toogle1.jpg)

```
Input: grid = [[0,0,1,1],[1,0,1,0],[1,1,0,0]]
Output: 39
Explanation: 0b1111 + 0b1001 + 0b1111 = 15 + 9 + 15 = 39
```

**Example 2:**

```
Input: grid = [[0]]
Output: 1
```

**Constraints:**

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 20`
- `grid[i][j]` is either `0` or `1`.

### 📝个人分析

这道题就是找到反转后矩阵的最大分数.

非常有趣，一开始我还没看懂题目。看了一个人的答案后豁然开朗。

首先是观察每一行，每行的首位必须为1，因为 1000>0111

要确定每行的首位必为1！

接着按照列从右到左（循环的次数是列数）

这里有一个非常巧妙的反转条件，**当每一列的1总数大于0，那不需要反转，反之亦然。**

![img](http://fileserver.youngbird97.top//statics/editor/12df31d1630e4dbeb9d8a6577c8598f9.jpeg)

### 💡Solution

```java
  public int matrixScore(int[][] grid) {
        int m=grid.length;
        int n=grid[0].length;
        for(int i=0;i<m;i++){
            if(grid[i][0]==0){
                flipColorRow(grid,i,1);
            }
        }
        int res=0;
        for(int col=n-1;col>=0;col--){
            int sum=0;
            for(int row=0;row<m;row++){
                sum+=grid[row][col];
            }
            //列反转条件，加起来的数字小于列/2
            // 即 列为1的次数小于0那么反转
            if(sum<=m/2){
                flipColorRow(grid,col,2);
            }
        }
        for(int i=0;i<m;i++){
            for(int j=0;j<n;j++){
                if( grid[i][j] ==1){
                    res += Math.pow(2,n-j-1);
                }
            }
        }
        return res;
    }
    private void flipColorRow(int[][] grid,int loop, int type){
        // 三元表达式，如果grid[i][j] == 1 那么=0，否则=1
        if(type==1){
            for(int i=0;i<grid[loop].length;i++){
                grid[loop][i] =  grid[loop][i] == 1 ? 0:1;
            }
        }else {
            for(int i=0;i<grid.length;i++){
                grid[i][loop] =  grid[i][loop] == 1 ? 0:1;
            }
        }
    }
```

![img](http://fileserver.youngbird97.top//statics/editor/f89a77e3b6ec416ca5784f5ed6363d05.png)
效率并不是很好，毕竟我最后才开始计算总和。

# 🔗 Refer links

https://leetcode.com/problems/score-after-flipping-matrix/