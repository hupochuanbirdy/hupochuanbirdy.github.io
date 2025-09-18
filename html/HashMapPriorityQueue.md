# HashMap ➕ PriorityQueue

## 💙347. Top K Frequent Elements

Given an integer array `nums` and an integer `k`, return *the* `k` *most frequent elements*. You may return the answer in **any order**.

**Example 1:**

```
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
```

**Example 2:**

```
Input: nums = [1], k = 1
Output: [1]
```

**Constraints:**

- `1 <= nums.length <= 105`

- `-104 <= nums[i] <= 104`

- `k` is in the range `[1, the number of unique elements in the array]`.

- It is **guaranteed** that the answer is **unique**.

  

  📝**<font color="#F34157">题目意思是得到TopK的集合，根据Hashmap的value来进行逆排序。</font>**

```java
 public int compare(Map.Entry<Integer, Integer> n1, Map.Entry<Integer, Integer> n2) {
   return n2.getValue() - n1.getValue();
 }
```

关于优先队列如何排序，这篇[文章](https://www.youngbird97.top/view/detail/id/82224/category/article)有介绍。默认情况下，是最小堆，也就是按照正序排，可以解决Klargest的题目

#### 🎗Solution Code

```java
public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> seen = new HashMap<>();
    for (int x : nums) {
        seen.put(x, seen.getOrDefault(x, 0) + 1);
    }
    Comparator<Map.Entry<Integer, Integer>> comp = new Comparator<Map.Entry<Integer, Integer>>() {
        @Override
        public int compare(Map.Entry<Integer, Integer> n1, Map.Entry<Integer, Integer> n2) {
            return n2.getValue() - n1.getValue();
        }
    };
    PriorityQueue<Map.Entry<Integer, Integer>> maxHeap = new PriorityQueue<Map.Entry<Integer, Integer>>(comp);

    for (Map.Entry<Integer, Integer> element : seen.entrySet()) {
        maxHeap.add(element);
    }

    int[] topK = new int[k];
    for (int i = 0; i < topK.length; i++) {
        Map.Entry<Integer, Integer> m = maxHeap.poll(); // 也可以用remove
        topK[i] = m.getKey();
    }
    return topK;
}
```

## 💙263. Ugly Number <font color=#417CF3 size=3>easy</font>

An **ugly number** is a positive integer whose prime factors are limited to `2`, `3`, and `5`.

Given an integer `n`, return `true` *if* `n` *is an **ugly number***.

**Example 1:**

```
Input: n = 6
Output: true
Explanation: 6 = 2 × 3
```

**Example 2:**

```
Input: n = 1
Output: true
Explanation: 1 has no prime factors, therefore all of its prime factors are limited to 2, 3, and 5.
```

**Example 3:**

```
Input: n = 14
Output: false
Explanation: 14 is not ugly since it includes the prime factor 7.		
```

**Constraints:**

- `-231 <= n <= 231 - 1`

#### 🎗Solution Code

```java
public boolean isUgly(int num) {
    while (num >= 2) {
        if (num % 2 == 0) num /= 2;
        else if (num % 3 == 0) num /= 3;
        else if (num % 5 == 0) num /= 5;
        else return false;
    }
    return num == 1;
}
```

## 💙264. Ugly Number II <font color=#FF5733 size=3>Medium</font>

****

An **ugly number** is a positive integer whose prime factors are limited to `2`, `3`, and `5`.

Given an integer `n`, return *the* `nth` ***ugly number***.

**Example 1:**

```
Input: n = 10
Output: 12
Explanation: [1, 2, 3, 4, 5, 6, 8, 9, 10, 12] is the sequence of the first 10 ugly numbers.
```

**Example 2:**

```
Input: n = 1
Output: 1
Explanation: 1 has no prime factors, therefore all of its prime factors are limited to 2, 3, and 5.
```

**Constraints:**

- `1 <= n <= 1690`

**<font color = "#C70039">TreeSet可以排除重复数字，所以这里不用PriorityQueue</font>**

#### 🎗Solution Code

```java
public int nthUglyNumber(int n) {
   int depth = 0;
   TreeSet<Long> queue = new TreeSet<>();
   queue.add((long)1);
   long ans = 0;
    while (depth++< n){
        long cur = queue.pollFirst();
        ans  = cur;
        if(depth == n) break;
        queue.add(cur * 2);
        queue.add(cur * 3);
        queue.add(cur * 5);
    }
    return (int) ans;
}
```

## 🥇506. Relative Ranks <font color=#417CF3 size=3>easy</font>

You are given an integer array `score` of size `n`, where `score[i]` is the score of the `ith` athlete in a competition. All the scores are guaranteed to be **unique**.

The athletes are **placed** based on their scores, where the `1st` place athlete has the highest score, the `2nd` place athlete has the `2nd` highest score, and so on. The placement of each athlete determines their rank:

- The `1st` place athlete's rank is `"Gold Medal"`.
- The `2nd` place athlete's rank is `"Silver Medal"`.
- The `3rd` place athlete's rank is `"Bronze Medal"`.
- For the `4th` place to the `nth` place athlete, their rank is their placement number (i.e., the `xth` place athlete's rank is `"x"`).

Return an array `answer` of size `n` where `answer[i]` is the **rank** of the `ith` athlete.

**Example 1:**

```
Input: score = [5,4,3,2,1]
Output: ["Gold Medal","Silver Medal","Bronze Medal","4","5"]
Explanation: The placements are [1st, 2nd, 3rd, 4th, 5th].
```

**Example 2:**

```
Input: score = [10,3,8,9,4]
Output: ["Gold Medal","5","Bronze Medal","Silver Medal","4"]
Explanation: The placements are [1st, 5th, 3rd, 2nd, 4th].
```

**Constraints:**

- `n == score.length`
- `1 <= n <= 104`
- `0 <= score[i] <= 106`
- All the values in `score` are **unique**.

#### 🎗Solution Code

```java
public String[] findRelativeRanks(int[] score) {
    if(score.length==1) return new String[]{"Gold Medal"};
    int n = score.length;
    HashMap<Integer, Integer> map =new HashMap<>();
    PriorityQueue<Integer> minHeap =
            new PriorityQueue< Integer>(Collections.reverseOrder());
    for (int i = 0; i < n; i++){
        map.put(score[i],i);
        minHeap.offer(score[i]);
    }
    int i = 1;
    String[] answer = new String[n];
    while (!minHeap.isEmpty()) {
        int temp = minHeap.poll();
        int index = map.get(temp);
        if (i == 1) answer[index] = "Gold Medal";
        else if (i == 2) answer[index] = "Silver Medal";
        else if (i == 3) answer[index] = "Bronze Medal";
        else answer[index] = String.valueOf(i);
        i++;
    }
    return answer;
}
```

### Github地址

> https://github.com/Amber916Young/leetcode-interview-practice/tree/master/src/Heap
>
> https://github.com/Amber916Young/leetcode-interview-practice

