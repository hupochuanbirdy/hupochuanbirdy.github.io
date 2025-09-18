# 滑动窗口算法 Sliding window 🥳No2 1493, 1004, 487, 485, 2024

## 💙 485. Max Consecutive Ones <font size="3" color="#1EE66D">easy</font>

Given a binary array `nums`, return *the maximum number of consecutive* `1`*'s in the array*. 

**Example 1:**

```
Input: nums = [1,1,0,1,1,1]
Output: 3
Explanation: The first two digits or the last three digits are consecutive 1s. The maximum number of consecutive 1s is 3.
```

**Example 2:**

```
Input: nums = [1,0,1,1,0,1]
Output: 2 
```

**Constraints:**

- `1 <= nums.length <= 105`
- `nums[i]` is either `0` or `1`.

### 😳 Bad Solution

```java
public int findMaxConsecutiveOnes(int[] nums) {
    if(nums.length==0) return 0;
    int sum=0;
    int temp=0;
    for(int i=0;i<nums.length;i++){
        if(nums[i]==1) {
            temp++;
            sum = Math.max(sum,temp);
        }else temp=0;
    }
    return sum;
}
```

###  ✅ Good Solution

```java
 public int findMaxConsecutiveOnes(int[] nums) {
        int k = 0;
        int j = 0;
        int res = 0;
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] == 0) k--;
            while (k < 0) {
                if (nums[j] == 0) k++;
                j++;
            }
            res = Math.max(res, i - j + 1);
        }
        return res;
    }
```

## 💙 487 Max Consecutive Ones II  <font size="3" color="#FF5733">Medium</font> 

Given a binary array `nums`, return the maximum number of consecutive 1's in the array if you can flip at most one 0.

**Example 1:**

```
Input: nums = [1,0,1,1,0]
Output: 4
Explanation: Flip the first zero will get the maximum number of consecutive 1s. After flipping, the maximum number of consecutive 1s is 4.
```

**Example 2:**

```
Input: nums = [1,0,1,1,0,1]
Output: 4
```

**Constraints:**

- 1 <= `nums.length` <= 105
- `nums[i]` is either 0 or 1.

### 💡Solution

```java
public int findMaxConsecutiveOnes(int[] nums) {
    int j = 0;
  	int k = 1;
    int window_size = 0;
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] == 0) k--;
        while (k < 0) {
            if (nums[j] == 0) k++;
            j++;
        }
        window_size = Math.max(window_size, i - j + 1);
    }
    return window_size;
}
```

## 💙 1004. Max Consecutive Ones III <font size="3" color="#FF5733">Medium</font> 

Given a binary array `nums` and an integer `k`, return *the maximum number of consecutive* `1`*'s in the array if you can flip at most* `k` `0`'s.

**Example 1:**

```
Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
Explanation: [1,1,1,0,0,1,1,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.
```

**Example 2:**

```
Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
Output: 10
Explanation: [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined. 
```

**Constraints:**

- `1 <= nums.length <= 105`
- `nums[i]` is either `0` or `1`.
- `0 <= k <= nums.length`

### 🔎浅浅的提供一些思路

```java
 If nums[i] == 0 k--
 while (k < 0) {
 		if (nums[j] == 0) k++;
 		j++;
 }
```

当右指针的位置等于0，那么可以替换此位置的数字，当替换次数大于k，意味着k<0，那么左边界需要缩小，窗口需要缩小，也就是`j++`，当左边界扫描的位置为0，意味着刚刚能替换的位置在此被访问过，此时恢复k，即`k++`

**nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2**

| loop  |  1   |  1   |  1   |  0   |  0   |  0   |  1   |  1   |  1   |  1   |  0   |  k   |
| :---: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
|   1   | i,j  |      |      |      |      |      |      |      |      |      |      |  2   |
|   2   |  j   |  i   |      |      |      |      |      |      |      |      |      |  2   |
|   3   |  j   |      |  i   |      |      |      |      |      |      |      |      |  2   |
|   4   |  j   |      |      |  i   |      |      |      |      |      |      |      |  1   |
|   5   |  j   |      |      |      |  i   |      |      |      |      |      |      |  0   |
| **6** |  j   |      |      |      |      |  i   |      |      |      |      |      |  -1  |
| **6** |      |  j   |      |      |      |  i   |      |      |      |      |      |  -1  |
| **6** |      |      |  j   |      |      |  i   |      |      |      |      |      |  -1  |
| **6** |      |      |      |  j   |      |  i   |      |      |      |      |      |  0   |
| **6** |      |      |      |      |  j   |  i   |      |      |      |      |      |  0   |
|   7   |      |      |      |      |  j   |      |  i   |      |      |      |      |  0   |
|   8   |      |      |      |      |  j   |      |      |  i   |      |      |      |  0   |
|   9   |      |      |      |      |  j   |      |      |      |  i   |      |      |  0   |
|  10   |      |      |      |      |  j   |      |      |      |      |  i   |      |  0   |
|  11   |      |      |      |      |  j   |      |      |      |      |      |  i   |  -1  |
|  11   |      |      |      |      |      |  j   |      |      |      |      |  i   |  0   |

### 💡Solution

```java
public static void main(String[] args) {
    longestOnes(new int[]{1,1,1,0,0,0,1,1,1,1,0},2);
}

static public int longestOnes(int[] nums, int k) {
    int j = 0;
    int window_size = 0;
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] == 0) k--;
        while (k < 0) {
            if (nums[j] == 0) k++;
            j++;
        }
        window_size = Math.max(window_size, i - j + 1);
    }
    return window_size;
}
```

## 💙 1493. Longest Subarray of 1's After Deleting One Element <font size="3" color="#FF5733">Medium</font> 

Given a binary array `nums`, you should delete one element from it.

Return *the size of the longest non-empty subarray containing only* `1`*'s in the resulting array*. Return `0` if there is no such subarray.

**Example 1:**

```
Input: nums = [1,1,0,1]
Output: 3
Explanation: After deleting the number in position 2, [1,1,1] contains 3 numbers with value of 1's.
```

**Example 2:**

```
Input: nums = [0,1,1,1,0,1,1,0,1]
Output: 5
Explanation: After deleting the number in position 4, [0,1,1,1,1,1,0,1] longest subarray with value of 1's is [1,1,1,1,1].
```

**Example 3:**

```
Input: nums = [1,1,1]
Output: 2
Explanation: You must delete one element.
```

**Constraints:**

- `1 <= nums.length <= 105`
- `nums[i]` is either `0` or `1`.

### 💡Solution

```java
public int longestSubarray(int[] nums) {
    int j = 0;
    int k = 1;
    int res = 0;
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] == 0) k--;
        while (k < 0) {
            if (nums[j] == 0) k++;
            j++;
        }
        res = Math.max(res, i - j);
    }
    return res;
}
```

## 💙 2024. Maximize the Confusion of an Exam <font size="3" color="#FF5733">Medium</font> 

A teacher is writing a test with `n` true/false questions, with `'T'` denoting true and `'F'` denoting false. He wants to confuse the students by **maximizing** the number of **consecutive** questions with the **same** answer (multiple trues or multiple falses in a row).

You are given a string `answerKey`, where `answerKey[i]` is the original answer to the `ith` question. In addition, you are given an integer `k`, the maximum number of times you may perform the following operation:

- Change the answer key for any question to `'T'` or `'F'` (i.e., set `answerKey[i]` to `'T'` or `'F'`).

Return *the **maximum** number of consecutive* `'T'`s or `'F'`s *in the answer key after performing the operation at most* `k` *times*.

**Example 1:**

```
Input: answerKey = "TTFF", k = 2
Output: 4
Explanation: We can replace both the 'F's with 'T's to make answerKey = "TTTT".
There are four consecutive 'T's.
```

**Example 2:**

```
Input: answerKey = "TFFT", k = 1
Output: 3
Explanation: We can replace the first 'T' with an 'F' to make answerKey = "FFFT".
Alternatively, we can replace the second 'T' with an 'F' to make answerKey = "TFFF".
In both cases, there are three consecutive 'F's.
```

**Example 3:**

```
Input: answerKey = "TTFTTFTT", k = 1
Output: 5
Explanation: We can replace the first 'F' to make answerKey = "TTTTTFTT"
Alternatively, we can replace the second 'F' to make answerKey = "TTFTTTTT". 
In both cases, there are five consecutive 'T's.
```

**Constraints:**

- `n == answerKey.length`
- `1 <= n <= 5 * 104`
- `answerKey[i]` is either `'T'` or `'F'`
- `1 <= k <= n`

### 💡Solution

```java
 public int maxConsecutiveAnswers(String answerKey, int k) {
   int n = answerKey.length();
   int j = 0;
   int tmp = k;
   int res = 0;
   for (int i = 0; i < n; i++) {
     if (answerKey.charAt(i) == 'F') {
       tmp--;
     }
     while (tmp < 0) {
       if (answerKey.charAt(j) == 'F') tmp++;
       j++;
     }
     res = Math.max(res, i - j + 1);
   }
   
   
   // loop again
   j = 0;
   tmp = k;
   for (int i = 0; i < n; i++) {
     if (answerKey.charAt(i) == 'T') {
       tmp--;
     }
     while (tmp < 0) {
       if (answerKey.charAt(j) == 'T') tmp++;
       j++;
     }
     res = Math.max(res, i - j + 1);

   }
   return res;
}
```

## 🔗 Refer links

https://leetcode.com/problems/max-consecutive-ones/

https://leetcode.com/problems/max-consecutive-ones-ii/【会员题】

https://leetcode.com/problems/max-consecutive-ones-iii/

https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element/

https://leetcode.com/problems/maximize-the-confusion-of-an-exam/