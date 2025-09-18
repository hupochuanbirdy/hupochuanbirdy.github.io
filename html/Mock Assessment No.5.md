# Mock Assessment No.5 DP problem

## 💚 746. Min Cost Climbing Stairs <font size="3" color="#02C850">Easy</font>

You are given an integer array `cost` where `cost[i]` is the cost of `ith` step on a staircase. Once you pay the cost, you can either climb one or two steps.

You can either start from the step with index `0`, or the step with index `1`.

Return *the minimum cost to reach the top of the floor*.

**Example 1:**

```
Input: cost = [10,15,20]
Output: 15
Explanation: You will start at index 1.
- Pay 15 and climb two steps to reach the top.
The total cost is 15.
```

**Example 2:**

```
Input: cost = [1,100,1,1,1,100,1,1,100,1]
Output: 6
Explanation: You will start at index 0.
- Pay 1 and climb two steps to reach index 2.
- Pay 1 and climb two steps to reach index 4.
- Pay 1 and climb two steps to reach index 6.
- Pay 1 and climb one step to reach index 7.
- Pay 1 and climb two steps to reach index 9.
- Pay 1 and climb one step to reach the top.
The total cost is 6. 
```

**Constraints:**

- `2 <= cost.length <= 1000`
- `0 <= cost[i] <= 999`

### 💡Solution

```java
    public int minCostClimbingStairs(int[] cost) {
        int[] dp = new int[cost.length];
        dp[0] = cost[0];
        dp[1] = cost[1];
        int n = cost.length;
        for (int i = 2; i <= n - 1; i++) {
            int step1 = cost[i] + dp[i - 1];
            int step2 = cost[i] + dp[i - 2];
            dp[i] = Math.min(step1, step2);
        }
        return Math.min(dp[n - 1], dp[n - 2]);
    }
```

## 💚 404. Sum of Left Leaves <font size="3" color="#02C850">Easy</font>

Given the `root` of a binary tree, return *the sum of all left leaves.*

A **leaf** is a node with no children. A **left leaf** is a leaf that is the left child of another node.

**Example 1:**

![img](https://assets.leetcode.com/uploads/2021/04/08/leftsum-tree.jpg)

```
Input: root = [3,9,20,null,null,15,7]
Output: 24
Explanation: There are two left leaves in the binary tree, with values 9 and 15 respectively.
```

**Example 2:**

```
Input: root = [1]
Output: 0 
```

**Constraints:**

- The number of nodes in the tree is in the range `[1, 1000]`.
- `-1000 <= Node.val <= 1000`

### 💡Solution

```java
    int sum =0;
    public int sumOfLeftLeaves(TreeNode root) {
        if (root==null) return 0;
        if(root.left != null &&
                    (root.left.left == null 
                     && root.left.right == null)) {
                sum+=root.left.val;
        }
        sumOfLeftLeaves(root.left);
        sumOfLeftLeaves(root.right);
        return sum;
    }
```

# 🔗 Refer links

https://leetcode.com/problems/min-cost-climbing-stairs/

https://leetcode.com/problems/sum-of-left-leaves/