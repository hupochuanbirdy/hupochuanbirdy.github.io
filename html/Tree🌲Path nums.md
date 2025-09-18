# 经典Tree🌲Path nums 112 113 437

## 💙 【112】Path Sum <font size="3" color="#4FE915">Easy</font>

Given the `root` of a binary tree and an integer `targetSum`, return `true` if the tree has a **root-to-leaf** path such that adding up all the values along the path equals `targetSum`.

A **leaf** is a node with no children.

**Example 1:**

![img](https://assets.leetcode.com/uploads/2021/01/18/pathsum1.jpg)

```
Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], targetSum = 22
Output: true
Explanation: The root-to-leaf path with the target sum is shown.
```

**Example 2:**

![img](https://assets.leetcode.com/uploads/2021/01/18/pathsum2.jpg)

```
Input: root = [1,2,3], targetSum = 5
Output: false
Explanation: There two root-to-leaf paths in the tree:
(1 --> 2): The sum is 3.
(1 --> 3): The sum is 4.
There is no root-to-leaf path with sum = 5.
```

**Example 3:**

```
Input: root = [], targetSum = 0
Output: false
Explanation: Since the tree is empty, there are no root-to-leaf paths.
```

 **Constraints:**

- The number of nodes in the tree is in the range `[0, 5000]`.
- `-1000 <= Node.val <= 1000`
- `-1000 <= targetSum <= 1000`

### 📝个人分析

给定二叉树的根和一个整数targetSum，如果树有根到叶的路径，使得沿着路径的所有值相加等于targetSum，则返回true。
叶节点是没有子节点的节点。

**意思是某些叶子结点加起来是否等于目标数**

**经典的DFS解法，和two sum逻辑相似，根据例子一，5-->4-->11-->2 .** 

**1)target=22-5(17)**

**2)target=17-4(13)**

**3)target=13-11(2)**

**4)target=2 此时2已经匹配上叶子结点2**

**一般情况做匹配都是相加，反过来想，减后的数字如果等于某候选数，那么就存在可以达到目标数的候选数组。**

### 💡Solution

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public boolean hasPathSum(TreeNode root, int targetSum) {
    if (root == null) return false;
        if(root.val==targetSum && root.left==null && root.right==null){
            return true;
        }
        return hasPathSum(root.left ,targetSum-root.val)||hasPathSum(root.right,targetSum-root.val);
    }
}
```

## 💙 【113】Path Sum II <font size="3" color="#FF5733">Medium</font>

Given the `root` of a binary tree and an integer `targetSum`, return *all **root-to-leaf** paths where the sum of the node values in the path equals* `targetSum`*. Each path should be returned as a list of the node **values**, not node references*.

A **root-to-leaf** path is a path starting from the root and ending at any leaf node. A **leaf** is a node with no children. 

**Example 1:**

![img](https://assets.leetcode.com/uploads/2021/01/18/pathsumii1.jpg)

```
Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
Output: [[5,4,11,2],[5,8,4,5]]
Explanation: There are two paths whose sum equals targetSum:
5 + 4 + 11 + 2 = 22
5 + 8 + 4 + 5 = 22
```

**Example 2:**

![img](https://assets.leetcode.com/uploads/2021/01/18/pathsum2.jpg)

```
Input: root = [1,2,3], targetSum = 5
Output: []
```

**Example 3:**

```
Input: root = [1,2], targetSum = 0
Output: [] 
```

**Constraints:**

- The number of nodes in the tree is in the range `[0, 5000]`.
- `-1000 <= Node.val <= 1000`
- `-1000 <= targetSum <= 1000`

### 📝个人分析

**此时存在多个路径等于目标数。按照先序遍历（root letf right）假设从5-->4-->11-->7已经走完一条路径，但是并不匹配目标数22，那么回退到结点11，此时根据回溯，list存入多结点7应该删除，因为结点11还有右孩子，也就是说每次回溯不匹配都必须删除当前的孩子结点，不删除list就还存在多余的结点，那答案肯定是错的。（有空我再画图）**

### 💡Solution

```java
   public List<List<Integer>> pathSum(TreeNode root, int targetSum) {
        List<List<Integer>> res = new ArrayList<>();
        List<Integer> path = new ArrayList<>();
        if(root != null){
            findPathSum(root,targetSum,res,path);
        }
        return res;
    }
    private void findPathSum(TreeNode root, int targetSum, List<List<Integer>> res, List<Integer> path) {
        if(root==null) return;
        if(root.left == null && root.right == null && targetSum == root.val){
            path.add(root.val);  //此时路径匹配上了
            res.add(new ArrayList<>(path));
            return;
        }
        path.add(root.val);  //不管三七二十一 直接添加，回溯会删除
        if(root.left != null){
            findPathSum(root.left, targetSum-root.val, res, path);
            path.remove(path.size()-1);   //回溯 删除孩子
        }
        if(root.right != null){
            findPathSum(root.right, targetSum-root.val, res, path);
            path.remove(path.size()-1);
        }
    }
```

## 💙 【437】Path Sum III <font size="3" color="#FF5733">Medium</font>

Given the `root` of a binary tree and an integer `targetSum`, return *the number of paths where the sum of the values along the path equals* `targetSum`.

The path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).

**Example 1:**

![img](https://assets.leetcode.com/uploads/2021/04/09/pathsum3-1-tree.jpg)

```
Input: root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
Output: 3
Explanation: The paths that sum to 8 are shown.
```

**Example 2:**

```
Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
Output: 3 
```

**Constraints:**

- The number of nodes in the tree is in the range `[0, 1000]`.
- `-109 <= Node.val <= 109`
- `-1000 <= targetSum <= 1000`

### 📝个人分析

和上一题有什么区别？题干红字标明，此时不需要从root开始算，孩子结点的路径可能存在匹配目标数的。类似two sum，用map存入信息，（0,1）key=当前的sum，value=多少次（初始化）

**1) currSum =10(从root开始） map={10,1}. 10一次 map不存在2（10-8）的key，继续搜索左孩子**

**2)** **currSum =15(10+5)      map={15,1}.  map 集合不存在15**

**3)** **currSum =18(15+3)      map={18,1}.  map 集合不存在18**

**4)** **currSum =21(18+3)**       **map={23,1}.  map 集合不存在23. 此时一条路径以及扫描完，开始向上走**

**5) map={21,0}**

**6) 结点3 存在右孩子 currSum =16(18-2)  map={16,1} 走完结点3还是不存在，继续向上走map={16,0}....**

**7) 结点5 存在右孩子 走到结点1** **currSum =18**  **map={18,2} map存在18，说明此条路径以及找到，map key=18 +1；**

**......以此类推，也就是走完一条路径，再回溯，再去走有岔路的路径。**

### 💡Solution

```java
    int res =0;
    public int pathSum_3(TreeNode root, int targetSum) {
        Map<Integer, Integer> map = new HashMap();
        map.put(0, 1);
        if(root != null) findPathSum3(root,0,targetSum,map);
        return  res;
    }

    private void findPathSum3(TreeNode root,int currSum, int targetSum, Map<Integer, Integer> map) {
        if (root == null) return;
        currSum += root.val;
        if(map.containsKey(currSum - targetSum)) {
            res += map.get(currSum - targetSum);
        }
        map.put(currSum, map.getOrDefault(currSum, 0) + 1);
        findPathSum3(root.left,currSum,targetSum,map);
        findPathSum3(root.right,currSum,targetSum,map);
        map.put(currSum, map.get(currSum) - 1);
    }
```

# 

# 🔗 Refer links

https://leetcode.com/problems/path-sum/

https://leetcode.com/problems/path-sum-ii/

https://leetcode.com/problems/path-sum-iii/