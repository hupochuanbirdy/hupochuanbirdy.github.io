# 经典二维数组(矩阵)🤩 Word Search

## 💙 【79】Word Search <font size="3" color="#FF5733">Medium</font>

Given an `m x n` grid of characters `board` and a string `word`, return `true` *if* `word` *exists in the grid*.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once. 

**Example 1:**

![img](https://assets.leetcode.com/uploads/2020/11/04/word2.jpg)

```
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
Output: true
```

**Example 2:**

![img](https://assets.leetcode.com/uploads/2020/11/04/word-1.jpg)

```
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
Output: true
```

**Example 3:**

![img](https://assets.leetcode.com/uploads/2020/10/15/word3.jpg)

```
Input: board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
Output: false
```

**Constraints:**

- `m == board.length`
- `n = board[i].length`
- `1 <= m, n <= 6`
- `1 <= word.length <= 15`
- `board` and `word` consists of only lowercase and uppercase English letters.

### 📝个人分析

[![zeQlHH.png](https://s1.ax1x.com/2022/11/17/zeQlHH.png)](https://imgse.com/i/zeQlHH)

### 💡Solution

```java
   public boolean exist(char[][] board, String word) {
        int row = board.length, col = board[0].length;
        for(int i=0;i<row;i++){
            for(int j=0;j<col;j++){
                if (board[i][j] == word.charAt(0)&&exist_dfs(board,i,j,0,word)){
                return true;
                }
            }
        }
        return false;

    }
    public boolean exist_dfs(char[][] board,int i,int j,int count ,String word){
        if(count==word.length()) return true;
        if(i<0||i>=board.length||j<0||j>=board[i].length||
        board[i][j]!=word.charAt(count)) return false;
        char temp=board[i][j];
        board[i][j] = ' ';
        boolean found = exist_dfs(board,i+1,j,count+1,word)
                || exist_dfs(board,i-1,j,count+1,word)
                || exist_dfs(board,i,j+1,count+1,word)
                || exist_dfs(board,i,j-1,count+1,word);
        board[i][j] = temp;
        return found;
    }
```

# 🔗 Refer links

https://leetcode.com/problems/word-search/