

# PriorityQueue题：786 1405 378 1439

## 💙 786 K-th Smallest Prime Fraction <font size = '3' color="#FF5733 ">Medium</font>

You are given a sorted integer array `arr` containing `1` and **prime** numbers, where all the integers of `arr` are unique. You are also given an integer `k`.

For every `i` and `j` where `0 <= i < j < arr.length`, we consider the fraction `arr[i] / arr[j]`.

Return *the* `kth` *smallest fraction considered*. Return your answer as an array of integers of size `2`, where `answer[0] == arr[i]` and `answer[1] == arr[j]`.

**Example 1:**

```
Input: arr = [1,2,3,5], k = 3
Output: [2,5]
Explanation: The fractions to be considered in sorted order are:
1/5, 1/3, 2/5, 1/2, 3/5, and 2/3.
The third fraction is 2/5.
```

**Example 2:**

```
Input: arr = [1,7], k = 1
Output: [1,7]
```

**Constraints:**

- `2 <= arr.length <= 1000`
- `1 <= arr[i] <= 3 * 104`
- `arr[0] == 1`
- `arr[i]` is a **prime** number for `i > 0`.
- All the numbers of `arr` are **unique** and sorted in **strictly increasing** order.
- `1 <= k <= arr.length * (arr.length - 1) / 2`

### Solution 🧨

 **<font color="#C70039 ">我个人觉得难点在于，如何复写比较器，根据之前的练习经验Ksmallest最常用的方法就是maxHeap最大堆</font>**

```java
public int[] kthSmallestPrimeFraction(int[] arr, int k) {
    int n = arr.length;
    PriorityQueue<int[]> maxheap = new PriorityQueue<>(k, new Comparator<int[]>() {
        @Override
        public int compare(int[] o1, int[] o2) {
            double k1 = (double)o1[0]/o1[1];
            double k2 = (double)o2[0]/o2[1];
            return (k1 > k2) ? -1 : 1; //最大堆，最小堆写法  (k1 > k2) ? 1 : -1
        }
    });
    for(int i=0;i<n;i++){
        for(int j= i + 1;j<n;j++){
            maxheap.offer(new int[]{arr[i],arr[j]});
            if(maxheap.size() > k) maxheap.poll();
        }
    }
    return maxheap.peek();
}
```

## 💙1405. Longest Happy String

A string `s` is called **happy** if it satisfies the following conditions:

- `s` only contains the letters `'a'`, `'b'`, and `'c'`.
- `s` does not contain any of `"aaa"`, `"bbb"`, or `"ccc"` as a substring.
- `s` contains **at most** `a` occurrences of the letter `'a'`.
- `s` contains **at most** `b` occurrences of the letter `'b'`.
- `s` contains **at most** `c` occurrences of the letter `'c'`.

Given three integers `a`, `b`, and `c`, return *the **longest possible happy** string*. If there are multiple longest happy strings, return *any of them*. If there is no such string, return *the empty string* `""`.

A **substring** is a contiguous sequence of characters within a string.

**Example 1:**

```
Input: a = 1, b = 1, c = 7
Output: "ccaccbcc"
Explanation: "ccbccacc" would also be a correct answer.
```

**Example 2:**

```
Input: a = 7, b = 1, c = 0
Output: "aabaa"
Explanation: It is the only correct answer in this case.
```

**Constraints:**

- `0 <= a, b, c <= 100`
- `a + b + c > 0`

### Solution 🧨

```java
public static void main(String[] args) {
    longestDiverseString(1,1,7);
}
static public String longestDiverseString(int a, int b, int c) {
    int[] count = new int[3];
    count[0] = a;
    count[1] = b;
    count[2] = c;
    StringBuilder sb = new StringBuilder();
    //逆序
    PriorityQueue<Character> pq = new PriorityQueue<>(new Comparator<Character>() {
        @Override
        public int compare(Character o1, Character o2) {
            return count[o2 - 'a'] - count[o1 - 'a'];
        }
    });

    if (a > 0) pq.add('a');
    if (b > 0) pq.add('b');
    if (c > 0) pq.add('c');

    Character lastChar = null;

    while (!pq.isEmpty()) {
        Character s1 = pq.poll();
        Character s2 = pq.poll();

        if (count[s1 - 'a'] - 2 >= 0 && !(s1.equals(lastChar))) {
            sb.append(s1);
            sb.append(s1);
            count[s1 - 'a'] -= 2;
            lastChar = s1;
        } else {
            sb.append(s1);
            count[s1 - 'a'] -= 1;
            lastChar = s1;
        }
        if (s2 != null) {
            sb.append(s2);
            count[s2 - 'a'] -= 1;
            lastChar = s2;
        }else break;

        if (count[s1 - 'a'] > 0) pq.add(s1);
        if (count[s2 - 'a'] > 0) pq.add(s2);
    }
    return sb.toString();
}
```

## 💙378. Kth Smallest Element in a Sorted Matrix

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

### Solution 🧨

这题很简单，就是把一位数组改为二维数组，大小堆都能做。

```java
// max Heap
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
// min Heap
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

## 💙1439. Find the Kth Smallest Sum of a Matrix With Sorted Rows <font size="3" color="#C70039">Hard</font>

You are given an `m x n` matrix `mat` that has its rows sorted in non-decreasing order and an integer `k`.

You are allowed to choose **exactly one element** from each row to form an array.

Return *the* `kth` *smallest array sum among all possible arrays*.

**Example 1:**

```
Input: mat = [[1,3,11],[2,4,6]], k = 5
Output: 7
Explanation: Choosing one element from each row, the first k smallest sum are:
[1,2], [1,4], [3,2], [3,4], [1,6]. Where the 5th sum is 7.
```

**Example 2:**

```
Input: mat = [[1,10,10],[1,4,5],[2,3,6]], k = 7
Output: 9
Explanation: Choosing one element from each row, the first k smallest sum are:
[1,1,2], [1,1,3], [1,4,2], [1,4,3], [1,1,6], [1,5,2], [1,5,3]. Where the 7th sum is 9.  
```

**Constraints:**

- `m == mat.length`
- `n == mat.length[i]`
- `1 <= m, n <= 40`
- `1 <= mat[i][j] <= 5000`
- `1 <= k <= min(200, nm)`
- `mat[i]` is a non-decreasing array.

### 🎉Solution 🧨

我以为这题跟[373. Find K Pairs with Smallest Sums](http://www.youngbird97.top/view/detail/id/18421/category/article)是一个套路的。根据sum排序，如果sum相同，根据int[1]数组第一个数字逆序。

```java
   PriorityQueue<int[]> maxHeap = new PriorityQueue<>(new Comparator<int[]>() {
     @Override
     public int compare(int[] a, int[] b) {
       return a[0] == b[0] ? b[1]-a[1]:b[0] -a[0]; // 三元表达式
     }
   });
```

[1,10,10] + [1,4,5], 得出的结果[2,5,6,11,11,....]，得出一个新的row，新的row在跟第i++row排列组合，所以效率很低！！！😅😅😅😅 这种算是brute force的方法，效率很低🥺

```java
// method1
public int[] kthSmallest_reorder(int[] num1,int[] num2, int k) {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();
    for(int i = 0;i<num1.length && i < k;i++) {
        for (int j = 0; j < num2.length && j < k; j++) {
            int sum = num1[i] + num2[j];
            minHeap.offer(sum);
        }
    }
    List<Integer> res = new ArrayList<>();
    while (!minHeap.isEmpty()){
        res.add(minHeap.poll());
    }
   return res.stream().mapToInt(i -> i).toArray();
}
```

```java
// method2
static public int[] kthSmallest_reorder(int[] num1,int[] num2, int k) {
     PriorityQueue<int[]> minHeap = new PriorityQueue<>(new Comparator<int[]>() {
         @Override
         public int compare(int[] o1, int[] o2) {
             return o1[0] == o2[0] ? o1[2] -o2[2] : o1[0] -o2[0];
         }
     });
     for(int i = 0;i<num1.length && i < k;i++) {
         for (int j = 0; j < num2.length && j < k; j++) {
             int sum = num1[i] + num2[j];
             minHeap.offer(new int[]{sum, num1[i], num2[j]});
         }
     }
     List<Integer> res = new ArrayList<>();
     while (!minHeap.isEmpty()){
         res.add(minHeap.poll()[0]);
     }
    return res.stream().mapToInt(i -> i).toArray();
 }
 static public int kthSmallest(int[][] mat, int k) {
     int n = mat.length;
     int[] row = mat[0];
     for (int i = 1; i < n; i++) {
         row = kthSmallest_reorder(row, mat[i], k);
     }
     return row[k - 1];
 }
```