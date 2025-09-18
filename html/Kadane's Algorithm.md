# Kadane's Algorithm 算法

## 💙 Leetcode 53. [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/)  <font color=#FF5733 size=3>Medium</font>

### 题目描述

Given an integer array `nums`, find the subarray which has the largest sum and return *its sum*.

**Example 1:**

```basic
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
```

**Example 2:**

```basic
Input: nums = [1]
Output: 1
```

**Example 3:**

```basic
Input: nums = [5,4,-1,7,8]
Output: 23
```

### 🧨 代码

这是非常典型的Kadane 算法题目:smile:

【-2,1,-3,4,-1,2,1,-5,4】

|  i   | Num[i] | Current_sum_max | Max_sum |
| :--: | :----: | :-------------: | :-----: |
|  0   |   -2   |       -2        |   -2    |
|  1   |   1    |        1        |    1    |
|  2   |   -3   |       -2        |    1    |
|  3   |   4    |        4        |    4    |
|  4   |   -1   |        3        |    4    |
|  5   |   2    |        5        |    5    |
|  6   |   1    |        6        |    6    |
|  7   |   -5   |        1        |    6    |
|  8   |   4    |        5        |    6    |

```java
    public int maxSubArray(int[] nums) {
        int n = nums.length;
        if(n == 0) return 0;
        if(n == 1) return nums[0];
        int sum_cur = nums[0];
        int max_sum = nums[0];
        for(int i=1;i<n;i++){
            sum_cur=  Math.max( nums[i], sum_cur + nums[i]);
//            if(sum_cur < 0) sum_cur = nums[i];
//            else sum_cur += nums[i];
            if(sum_cur > max_sum) max_sum = sum_cur;
        }
        return max_sum;
    }
```



## 💙 Codeflight [arrayMaxConsecutiveSum2](https://app.codesignal.com/interview-practice/question/dQD4TCunke2JQ98rj/description)

### 题目描述

Given an array of integers, find the maximum possible sum you can get from one of its [contiguous subarrays](keyword://contiguous-subarray). The subarray from which this sum comes must contain at least `1` element.

Example

For `inputArray = [-2, 2, 5, -11, 6]`, the output should be
`solution(inputArray) = 7`.

The contiguous subarray that gives the maximum possible sum is `[2, 5]`, with a sum of `7`.

### 🧨 代码

```java
    int solution(int[] inputArray) {
        int max = Integer.MIN_VALUE;
        int currSum = inputArray[0];
        for (int i = 1; i < inputArray.length; i++) {
            currSum = Math.max( inputArray[i]+currSum, inputArray[i]);
            max = Math.max(max,currSum);
        }
        return max;
    }
```



