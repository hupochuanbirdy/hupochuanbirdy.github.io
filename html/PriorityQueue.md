# <font color='FF3030'>PriorityQueue</font> 堆*Heap*重写Comparator

> 1. **PriorityQueue默认情况下建立的是最小堆，堆顶元素是最小值。如果输出这个堆，得到的序列是递增的。**
> 2. **可以自定义比较器，使得PriorityQueue建立最大堆，堆顶元素是最大值，如果输出这个堆，得到的序列是递减的。**

## 💡最小堆 MinHeap

### 💙215. Kth Largest Element in an Array 

Given an integer array `nums` and an integer `k`, return *the* `kth` *largest element in the array*.

Note that it is the `kth` largest element in the sorted order, not the `kth` distinct element. You must solve it in `O(n)` time complexity.

**Example 1:**

```
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
```

**Example 2:**

```
Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4 
```

**Constraints:**

- `1 <= k <= nums.length <= 105`
- `-104 <= nums[i] <= 104`

**PriorityQueue**默认是<font color="#C70039">*最小堆*</font>

这是最简单的，不需要重写Comparator的Integer堆

```java
public int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> heap = new PriorityQueue<>();
    for(int x:nums){
        if(heap.size()<k||x>=heap.peek()){
            heap.offer(x);
        }
      // 另一种写法，不需要if判断，直接offer，但这种效率比较低
        heap.offer(x);
        if(heap.size()>k){
            heap.poll();
        }
    }
    return heap.peek();
}
```

### 💙1985. Find the Kth Largest Integer in the Array

<font color= "#C70039">**如果堆里存放的是String类型的，那么就需要override比较器。**</font>

You are given an array of strings `nums` and an integer `k`. Each string in `nums` represents an integer without leading zeros.

Return *the string that represents the* `kth` ***largest integer** in* `nums`.

**Note**: Duplicate numbers should be counted distinctly. For example, if `nums` is `["1","2","2"]`, `"2"` is the first largest integer, `"2"` is the second-largest integer, and `"1"` is the third-largest integer.

**Example 1:**

```
Input: nums = ["3","6","7","10"], k = 4
Output: "3"
Explanation:
The numbers in nums sorted in non-decreasing order are ["3","6","7","10"].
The 4th largest integer in nums is "3".
```

**Example 2:**

```
Input: nums = ["2","21","12","1"], k = 3
Output: "2"
Explanation:
The numbers in nums sorted in non-decreasing order are ["1","2","12","21"].
The 3rd largest integer in nums is "2".
```

**Constraints:**

- `1 <= k <= nums.length <= 104`
- `1 <= nums[i].length <= 100`
- `nums[i]` consists of only digits.
- `nums[i]` will not have any leading zeros.

```java
@Override
public int compare(String a, String b) {
	return a.length()!= b.length()? a.length()- b.length(): a.compareTo(b);
}
```

`["623986800","3","887298","695","794","6888794705","269409","59930972","723091307","726368","8028385786","378585"]  11`

上面👆这个例子，字符串长度不同，那么长字符串一定大于短字符串。

<font color= "#C70039">**最大的排在上面，要找第K个最大的，按照规律应该丢弃大于size的peek值。**</font>

```java
public String kthLargestNumber(String[] nums, int k) {
   PriorityQueue<String> queue = new PriorityQueue<String>(k, new Comparator<String>() {
            @Override
            public int compare(String a, String b) {
                return a.length()!= b.length()?
                        a.length()- b.length(): a.compareTo(b);
            }
        });
        for(int i =0;i<nums.length;i++){
            queue.add(nums[i]);
            while (queue.size() > k){
                queue.poll();
            }
        }
       
   return queue.peek();
}
```

### 💙23. Merge k Sorted Lists <font color="#C70039" size=3>Hard</font>

You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.

*Merge all the linked-lists into one sorted linked-list and return it.*

**Example 1:**

```
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6
```

linklist的题目比较有难度对我来说，主要观察👀一个对象如何比较`(a,b)->a.val-b.val`

```java
public ListNode mergeKLists(ListNode[] lists) {
    PriorityQueue<ListNode> heap = new PriorityQueue<>((a,b)->a.val-b.val);
    for(ListNode list:lists){
        if(list!=null)  heap.offer(list);
    }
    ListNode res =new ListNode(0);
    ListNode cur = res;
    while (!heap.isEmpty()){
        ListNode top = heap.poll();
        cur.next = top;
        cur = cur.next;
        if(top.next!=null){
            heap.offer(top.next);
        }
    }
    return res.next;
}
```

## ⏰最大堆 MaxHeap

### 🌲230. Kth Smallest Element in a BST

Given the `root` of a binary search tree, and an integer `k`, return *the* `kth` *smallest value (**1-indexed**) of all the values of the nodes in the tree*.

**Example 1:**

![img](https://assets.leetcode.com/uploads/2021/01/28/kthtree2.jpg)

```
Input: root = [5,3,6,2,4,null,null,1], k = 3
Output: 3
```

**Constraints:**

- The number of nodes in the tree is `n`.
- `1 <= k <= n <= 104`
- `0 <= Node.val <= 104`

🏅<font color= "#C70039">**最小的排在上面，要找第K个最小的，按照规律应该丢弃大于size的peek值。**</font>

```java
int Capacity = 0;
public int kthSmallest(TreeNode root, int k) {
    if (root.right==null && root.left==null) return root.val;
    PriorityQueue<Integer> queue = new PriorityQueue<>(k, Comparator.reverseOrder());
    Capacity = k;
    helper_kthSmallest(root,queue);
    return queue.peek();
}

private void helper_kthSmallest(TreeNode root,    PriorityQueue<Integer> queue ) {
    if (root==null) return;
    queue.offer(root.val);

    if(queue.size() > Capacity){
        queue.poll();
    }
    helper_kthSmallest(root.right,queue);
    helper_kthSmallest(root.left,queue);
}
```

### 💙378. Kth Smallest Element in a Sorted Matrix

Given an `n x n` `matrix` where each of the rows and columns is sorted in ascending order, return *the* `kth` *smallest element in the matrix*.

Note that it is the `kth` smallest element **in the sorted order**, not the `kth` **distinct** element.

You must find a solution with a memory complexity better than `O(n2)`.

**Example 1:**

```
Input: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
Output: 13
Explanation: The elements in the matrix are [1,5,9,10,11,12,13,13,15], and the 8th smallest number is 13
```

**Example 2:**

```
Input: matrix = [[-5]], k = 1
Output: -5
```

**Constraints:**

- `n == matrix.length == matrix[i].length`
- `1 <= n <= 300`
- `-109 <= matrix[i][j] <= 109`
- All the rows and columns of `matrix` are **guaranteed** to be sorted in **non-decreasing order**.
- `1 <= k <= n2`

<font color= "#F34157">**PriorityQueue没有overrideb比较器，这种最小堆找Ksmallest只能通过pop k次得到答案。**</font>

```java
public int kthSmallest(int[][] matrix, int k) {
    int n = matrix.length;
    if (n == 1 && k == 1) return matrix[0][0];
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            int tmp = matrix[i][j];
            minHeap.offer(tmp);
        }
    }
    int kth = 0;
    for(int i = 0;i<k;i++){
        kth = minHeap.poll();
    }
    return kth;
}
```

🏅<font color= "#C70039">**复写比较器实现最大堆，Integer的堆比较相对string简单。**</font>

另一种写法：` new PriorityQueue<>((a,b)->(b-a));`

```java
public int kthSmallest2(int[][] matrix, int k) {
    int n = matrix.length;
    if (n == 1 && k == 1) return matrix[0][0];
    PriorityQueue<Integer> minHeap = new PriorityQueue<>(Comparator.reverseOrder());
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            int tmp = matrix[i][j];
            minHeap.offer(tmp);
            while (minHeap.size()>k) minHeap.poll();
        }
    }
    return minHeap.peek();
}
```

### 💙451. Sort Characters By Frequency

Given a string `s`, sort it in **decreasing order** based on the **frequency** of the characters. The **frequency** of a character is the number of times it appears in the string.

Return *the sorted string*. If there are multiple answers, return *any of them*.

**Example 1:**

```
Input: s = "tree"
Output: "eert"
Explanation: 'e' appears twice while 'r' and 't' both appear once.
So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.
```

**Example 2:**

```
Input: s = "cccaaa"
Output: "aaaccc"
Explanation: Both 'c' and 'a' appear three times, so both "cccaaa" and "aaaccc" are valid answers.
Note that "cacaca" is incorrect, as the same characters must be together.
```

**Constraints:**

- `1 <= s.length <= 5 * 105`
- `s` consists of uppercase and lowercase English letters and digits.

🧩<font color= "#C70039">**PriorityQueue根据Hashmap的value进行逆序**</font>

| 层数 |  堆  |
| :--: | :--: |
|  1   |  e   |
|  2   |  r   |
|  3   |  t   |

首先pop出的就是e，处于层顶

```java
public String frequencySort(String s) {
    HashMap<Character, Integer> map = new HashMap<>();
    for(int i =0 ; i<s.length();i++){
        map.put(s.charAt(i),map.getOrDefault(s.charAt(i),0)+1);
    }
    // max default min
    PriorityQueue<Character> maxHeap=new PriorityQueue<>((a,b)->map.get(b)-map.get(a));
    maxHeap.addAll(map.keySet());
    StringBuilder result=new StringBuilder();
    while(!maxHeap.isEmpty()){
        char ch=maxHeap.remove();
        int count=map.get(ch);
        while(count!=0){
            result.append(ch);
            count--;
        }
    }
    return result.toString();
}
```

## 🏆PriorityQueue比较常用的方法以及排序规则

|  method   |                     描述                     |
| :-------: | :------------------------------------------: |
|  peek()   |                 返回队首元素                 |
|  poll()   |         返回队首元素，队首元素出队列         |
|   add()   |                   添加元素                   |
|  size()   |               返回队列元素个数               |
| isEmpty() | 判断队列是否为空，为空返回true,不空返回false |

```java
  Comparator<Object> cmp = new Comparator<Object>() {
  public int compare(Object o1, Object o2) {
    //升序
    return o1-o2;
    //降序
    return o2-o1;
  }
};
```

