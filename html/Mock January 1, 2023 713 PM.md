# Mock No6 January 1, 2023 7:13 PM

## 💚 35. Search Insert Position

Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with `O(log n)` runtime complexity.

**Example 1:**

```
Input: nums = [1,3,5,6], target = 5
Output: 2
```

**Example 2:**

```
Input: nums = [1,3,5,6], target = 2
Output: 1
```

**Example 3:**

```
Input: nums = [1,3,5,6], target = 7
Output: 4
```

**Constraints:**

- `1 <= nums.length <= 104`
- `-104 <= nums[i] <= 104`
- `nums` contains **distinct** values sorted in **ascending** order.
- `-104 <= target <= 104`

### 💡Good Solution binary search

- Time complexity: O (log(n))

```java
public int searchInsert(int[] nums, int target) {
    int len = nums.length;
    int start = 0;
    int end = len - 1;
    if (nums[end] < target) {
        return len;
    }
    while (start < end) {
        int mid = start + (end - start) / 2;
        if (nums[mid] == target) {
            return mid;
        } else if (nums[mid] > target) {
            end = mid;
        } else if (nums[mid] < target) {
            start = mid + 1;
        }
    }
    return start;
}
```

## 🧡 547. Number of Provinces

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

### 💡Solution

```java
public int findCircleNum(int[][] isConnected) {
    int row = isConnected.length;
    boolean[] visited = new boolean[row];
    int count   =0;
    for(int i =0; i < row;i++){
        if(!visited[i]){
            count++;
            findCircleNum_DFS(isConnected,visited,i);
        }
    }
    return count;
}

private void findCircleNum_DFS(int[][] isConnected, boolean[] visited, int i) {
    for(int j = 0 ; j < isConnected.length ; j++){
        if(!visited[j] && isConnected[i][j] != 0){
            visited[j] = true;
            findCircleNum_DFS(isConnected,visited,j);
        }
    }
}
```

# 🔗 Refer links

https://leetcode.com/problems/search-insert-position/

https://leetcode.com/problems/number-of-provinces/