# Graph图🌠 经典🥳 547 Number of Provinces

## 💙 【547】  Number of Provinces <font size="3" color="#FF5733">Medium</font>

There are `n` cities. Some of them are connected, while some are not. If city `a` is connected directly with city `b`, and city `b` is connected directly with city `c`, then city `a` is connected indirectly with city `c`.

A **province** is a group of directly or indirectly connected cities and no other cities outside of the group.

You are given an `n x n` matrix `isConnected` where `isConnected[i][j] = 1` if the `ith` city and the `jth` city are directly connected, and `isConnected[i][j] = 0` otherwise.

Return *the total number of **provinces***.

**Example 1:**

![img](https://assets.leetcode.com/uploads/2020/12/24/graph1.jpg)

```
Input: isConnected = [[1,1,0],[1,1,0],[0,0,1]]
Output: 2
```

**Example 2:**

![img](https://assets.leetcode.com/uploads/2020/12/24/graph2.jpg)

```
Input: isConnected = [[1,0,0],[0,1,0],[0,0,1]]
Output: 3
```

**Constraints:**

- `1 <= n <= 200`
- `n == isConnected.length`
- `n == isConnected[i].length`
- `isConnected[i][j]` is `1` or `0`.
- `isConnected[i][i] == 1`
- `isConnected[i][j] == isConnected[j][i]`

### 📝个人分析

**这是经典的连通图算法DFS和BFS都能做**

有N个城市。其中有些城市是相连的，而有些则没有。如果城市a与城市b直接相连，而城市b与城市c直接相连，那么城市a就与城市c间接相连。一个省是一个由直接或间接连接的城市组成的集团，集团外没有其他城市。你会得到一个n x n的矩阵isConnected，其中`isConnected[i][j]`=1，如果第i个城市和第j个城市直接相连，`isConnected[i][j]`=0，否则返回省的总数。

**Input:** isConnected = [[1,1,0],[1,1,0],[0,0,1]]

```
Output: 2
主对角线的例如[1,1] [2,2]就是节点本身自己连接自己
row 0: node 0 ---- node 1
row 1: node 1 ---- node 0
row 2: node 2 ---- node 2
所有两个节点.
每行开始扫描，[0,0] 放入visited数组中表示扫描到，node 1放入数组中，第一行完成。count+1；
第二行，node1已经访问过，跳过；
第三行，node2新节点，count+1。
```

### 💡Solution

```java
    public int findCircleNum(int[][] isConnected) {
        int N = isConnected.length;
        boolean[]visited = new boolean[N];
        int count = 0;
        for(int i = 0; i < N ;i++){
            if(!visited[i]){
                count++;
                findCircleNum_dfs(isConnected,i,visited);
            }
        }
        return count;
    }
    private void findCircleNum_dfs(int[][]isConnected,int i,boolean[]visited){
        for(int j = 0 ; j < isConnected.length ; j++){
            if(!visited[j] && isConnected[i][j] != 0){
                visited[j] = true;
                findCircleNum_dfs(isConnected,j,visited);
            }
        }
    }
```

# 📍其他相似的题目

【已整理】[2101. Detonate the Maximum Bombs](https://leetcode.com/problems/detonate-the-maximum-bombs/)



# 🔗 Refer links

https://leetcode.com/problems/number-of-provinces/