# Tree🌲 经典BFS 102 103 107 127 三道相似的Binary Tree

## 💙 【102】Binary Tree Level Order Traversal <font size="3" color="#FF5733">Medium</font>

Given the `root` of a binary tree, return *the level order traversal of its nodes' values*. (i.e., from left to right, level by level).

**Example 1:**

![img](https://assets.leetcode.com/uploads/2021/02/19/tree1.jpg)

```
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
```

**Example 2:**

```
Input: root = [1]
Output: [[1]]
```

**Example 3:**

```
Input: root = []
Output: []
```

**Constraints:**

- The number of nodes in the tree is in the range `[0, 2000]`.
- `-1000 <= Node.val <= 1000`

### 💡Solution

题目很短，可以看output，这是一个层级关系，就想到BFS，BFS就需要用到queue。这道题目，有个兄弟问题。不同的是输出顺序。

```java
    public List<List<Integer>> levelOrder(TreeNode root) {
         List<List<Integer>> res = new ArrayList<>();
        if(root == null) return res;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()){
            int size = queue.size();
            List<Integer> layer = new ArrayList<>();
            for(int i=0;i<size;i++){
                TreeNode cur = queue.poll();
                layer.add(cur.val);
                if(cur.left!=null){
                    queue.offer(cur.left);
                }
                if(cur.right!=null){
                    queue.offer(cur.right);
                }
            }
            res.add(layer);
        }
        return res;
    }
```

另一个兄弟问题[103. Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)可以看出，图都是一样的，题目内容是输出是锯齿输出。所以在循环里有很多标志记录当前循环的次数，也是层数，每一层每一层交替。注意，当每一个父节点都只有一个孩子，输出的顺序是不会变的，也就是即便是应该交换的层，但因为不是满节点，不做处理。

给定二叉树的根，返回其节点值的锯齿级顺序遍历。(例如，从左到右，然后从右到左为下一关和交替之间)。 

## 💙 【103】Binary Tree Zigzag Level Order Traversal <font size="3" color="#FF5733">Medium</font>

Given the `root` of a binary tree, return *the zigzag level order traversal of its nodes' values*. (i.e., from left to right, then right to left for the next level and alternate between).

**Example 1:**

![img](https://assets.leetcode.com/uploads/2021/02/19/tree1.jpg)

```
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[20,9],[15,7]]
```

**Example 2:**

```
Input: root = [1]
Output: [[1]]
```

**Example 3:**

```
Input: root = []
Output: []
```

**Constraints:**

- The number of nodes in the tree is in the range `[0, 2000]`.
- `-100 <= Node.val <= 100`

### 💡Solution

```java
    public List<List<Integer>> zigzagLevelOrder(TreeNode root) {
       List<List<Integer>> res = new ArrayList<>();
        if(root==null) return  res;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        int level = 1;
        boolean flag =false;
        while (!queue.isEmpty()){
            List<Integer> curList = new ArrayList<>();
            int size = queue.size();
            for (int i=0;i<size;i++){
                TreeNode node = queue.poll();
                if(level % 2==0){
                    flag=true;
                }else  flag =false;
                if(node.left!=null){
                    queue.offer(node.left);
                }
                if(node.right!=null){
                    queue.offer(node.right);
                }
                curList.add(node.val);
            }
            if(flag) {
                Collections.reverse(curList);
            }
            res.add(curList);
            level++;
        }
        return res;
    }
```

## 💙 【107】Binary Tree Level Order Traversal II <font size="3" color="#FF5733">Medium</font>

Given the `root` of a binary tree, return *the bottom-up level order traversal of its nodes' values*. (i.e., from left to right, level by level from leaf to root).

**Example 1:**

![img](https://assets.leetcode.com/uploads/2021/02/19/tree1.jpg)

```
Input: root = [3,9,20,null,null,15,7]
Output: [[15,7],[9,20],[3]]
```

**Example 2:**

```
Input: root = [1]
Output: [[1]]
```

**Example 3:**

```
Input: root = []
Output: [] 
```

**Constraints:**

- The number of nodes in the tree is in the range `[0, 2000]`.
- `-1000 <= Node.val <= 1000`

### 💡Solution

```java
    public List<List<Integer>> levelOrderBottom(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if(root==null) return  res;
        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()){
            List<Integer> curList = new ArrayList<>();
            int size = queue.size();
            for (int i=0;i<size;i++){
                TreeNode node = queue.poll();
                if(node.left!=null){
                    queue.offer(node.left);
                }
                if(node.right!=null){
                    queue.offer(node.right);
                }
                curList.add(node.val);
            }
            res.add(curList);
        }
        Collections.reverse(res);
        return res;
    }
```

## 💙 🙀127. Word Ladder  <font size="3" color="#F7260A">Hard</font>

A **transformation sequence** from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence of words `beginWord -> s1 -> s2 -> ... -> sk` such that:

- Every adjacent pair of words differs by a single letter.
- Every `si` for `1 <= i <= k` is in `wordList`. Note that `beginWord` does not need to be in `wordList`.
- `sk == endWord`

Given two words, `beginWord` and `endWord`, and a dictionary `wordList`, return *the **number of words** in the **shortest transformation sequence** from* `beginWord` *to* `endWord`*, or* `0` *if no such sequence exists.*

**Example 1:**

```
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.
```

**Example 2:**

```
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: 0
Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence. 
```

**Constraints:**

- `1 <= beginWord.length <= 10`
- `endWord.length == beginWord.length`
- `1 <= wordList.length <= 5000`
- `wordList[i].length == beginWord.length`
- `beginWord`, `endWord`, and `wordList[i]` consist of lowercase English letters.
- `beginWord != endWord`
- All the words in `wordList` are **unique**.

### 💡Solution

```java
  public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        HashSet<String> hashSet = new HashSet<>(wordList);
        if (!hashSet.contains(endWord)) return 0;
        Queue<String> queue = new LinkedList<>();
        queue.offer(beginWord);
        int level = 1;
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                String cur = queue.poll();
                char[] curletter = cur.toCharArray();
                for (int j = 0; j < curletter.length; j++) {
                    char orginal = curletter[j];
                    for (char k = 'a'; k <= 'z'; k++) {
                        if (curletter[j] == k) continue;
                        curletter[j] = k;
                        String newWord = String.valueOf(curletter);
                        if (newWord.equals(endWord)) return level + 1;
                        if (hashSet.contains(newWord)) {
                            queue.offer(newWord);
                            hashSet.remove(newWord);
                        }
                    }
                    curletter[j] = orginal;
                }
            }
            level++;
        }
        return 0;
    }

```

# 🔗 Refer links

https://leetcode.com/problems/binary-tree-level-order-traversal/

https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/

https://leetcode.com/problems/binary-tree-level-order-traversal-ii/

https://leetcode.com/problems/word-ladder/