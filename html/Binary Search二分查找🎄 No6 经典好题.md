# Binary Search二分查找🥳 No6 经典好题【持续更新】 540 33 74  852 Peak Element

## 💙 【74】Guess Number Higher or Lower <font size="3" color="#4FE915">easy</font>

We are playing the Guess Game. The game is as follows:

I pick a number from `1` to `n`. You have to guess which number I picked.

Every time you guess wrong, I will tell you whether the number I picked is higher or lower than your guess.

You call a pre-defined API `int guess(int num)`, which returns three possible results:

- `-1`: Your guess is higher than the number I picked (i.e. `num > pick`).
- `1`: Your guess is lower than the number I picked (i.e. `num < pick`).
- `0`: your guess is equal to the number I picked (i.e. `num == pick`).

Return *the number that I picked*.

**Example 1:**

```
Input: n = 10, pick = 6
Output: 6
```

**Example 2:**

```
Input: n = 1, pick = 1
Output: 1
```

**Example 3:**

```
Input: n = 2, pick = 1
Output: 1
```

**Constraints:**

- `1 <= n <= 231 - 1`
- `1 <= pick <= n`

### 💡Solution

```java
/** 
 * Forward declaration of guess API.
 * @param  num   your guess
 * @return 	     -1 if num is lower than the guess number
 *			      1 if num is higher than the guess number
 *               otherwise return 0
 * int guess(int num);
 */

public class Solution extends GuessGame {
    public int input(int n) {
        int res = guess(n);
        if(res == 0) return n;
        int low =1,hight =n;
        while(low<=hight){
            int mid = low+(hight-low)/2;
            res = guess(mid);
            if(res==0) return mid;
            else if(res==-1) hight = mid-1;
            else if(res==1) low = mid+1;
        }
        return -1;
    }
      
        
    public int guessNumber(int n) {
        return input(n);
    }
}
```

## 💙 【35】Search Insert Position <font size="3" color="#4FE915">easy</font>

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

### 💡Solution

```java
public int searchInsert(int[] nums, int target) {
    int left = 0;
    int right = nums.length - 1;
    int mid = 0;
    while (left <= right) {
        mid = left+ (right -left ) / 2;
        if (nums[mid] == target) {
            return mid;
        } else if (target < nums[mid]) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    if (target > nums[mid]) return mid + 1;
    return mid;
}
```

## 💙 【852】Peak Index in a Mountain Array <font size="3" color="#FF5733">Medium</font>

An array `arr` a **mountain** if the following properties hold:

- `arr.length >= 3`

- There exists some `i`with `0 < i < arr.length - 1` 

  such that:

  - `arr[0] < arr[1] < ... < arr[i - 1] < arr[i]`
  - `arr[i] > arr[i + 1] > ... > arr[arr.length - 1]`

Given a mountain array `arr`, return the index `i` such that `arr[0] < arr[1] < ... < arr[i - 1] < arr[i] > arr[i + 1] > ... > arr[arr.length - 1]`.

You must solve it in `O(log(arr.length))` time complexity.

**Example 1:**

```
Input: arr = [0,1,0]
Output: 1
```

**Example 2:**

```
Input: arr = [0,2,1,0]
Output: 1
```

**Example 3:**

```
Input: arr = [0,10,5,2]
Output: 1
```

**Constraints:**

- `3 <= arr.length <= 105`
- `0 <= arr[i] <= 106`
- `arr` is **guaranteed** to be a mountain array.

### 💡Solution

```java
public int peakIndexInMountainArray(int[] arr) {
    int left = 0;
    int right = arr.length - 1;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] < arr[mid + 1])
            left = mid + 1;
        else
            right = mid;
    }
    return left;
}
```

## 💙 【540】Single Element in a Sorted Array <font size="3" color="#FF5733">Medium</font>

You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once.

Return *the single element that appears only once*.

Your solution must run in `O(log n)` time and `O(1)` space. 

**Example 1:**

```
Input: nums = [1,1,2,3,3,4,4,8,8]
Output: 2
```

**Example 2:**

```
Input: nums = [3,3,7,7,10,11,11]
Output: 10 
```

**Constraints:**

- `1 <= nums.length <= 105`
- `0 <= nums[i] <= 105`

### 📝个人分析

乍一看，hashset也能暴力解锁，但是暴力解锁直接就挂了。另外题目要求时间复杂度O(logn)，显然是binary search。

假设一组数字[ 1,1,2,2,3,4,4...]

| loop | mid  |   1   |  1   |  2   |   2   |   3   |  4   |  4   |  5   |                                                              |
| :--: | :--: | :---: | :--: | :--: | :---: | :---: | :--: | :--: | :--: | ------------------------------------------------------------ |
|  1   |  3   | start |      |      |  Mid  |       |      |      | end  | 从mid到0有4个数字，并且nums[mid] == nums[mid - 1]，说明答案在右边。 |
|  1   |      |       |      |      | start |       |      |      |      | 更新左边界                                                   |
|  2   |  4   |       |      |      | start |  mid  |      |      | end  | nums[mid] != nums[mid - 1]，从mid到0有5个数字（奇数），说明答案在右边 |
|  2   |  4   |       |      |      |       | start |      |      | end  | 更新左边界                                                   |

（1，1，2，2，3...）（1，2，2，3...），第一组是奇数，第二组数偶数，肉眼观察，答案存在于第二个，这也就是：

**<font color="#C70039">当nums[mid] != nums[mid - 1]时，mid左边数量和是偶数时候，答案藏在左边</font>**

**<font color="#C70039">当nums[mid] == nums[mid - 1]时，mid左边数量和是偶数时候，答案藏在右边</font>**

### 💡Solution

```java
    public int singleNonDuplicate(int[] nums) {
        int start = 0;
        int end = nums.length - 1;
        while (start < end) {
            int mid = start + (end - start) / 2;
            if (nums[mid] == nums[mid - 1]) {
                if ((mid + 1) % 2 == 0) {
                    start = mid + 1;
                } else {
                    end = mid;
                }
            } else {
                if ((mid + 1) % 2 == 0) {
                    end = mid - 1;
                } else {
                    start = mid;
                }
            }
        }
        return nums[start];
    }
```

## 💙【33】Search in Rotated Sorted Array <font size="3" color="#FF5733">Medium</font>

There is an integer array `nums` sorted in ascending order (with **distinct** values).

Prior to being passed to your function, `nums` is **possibly rotated** at an unknown pivot index `k` (`1 <= k < nums.length`) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (**0-indexed**). For example, `[0,1,2,4,5,6,7]` might be rotated at pivot index `3` and become `[4,5,6,7,0,1,2]`.

Given the array `nums` **after** the possible rotation and an integer `target`, return *the index of* `target` *if it is in* `nums`*, or* `-1` *if it is not in* `nums`.

You must write an algorithm with `O(log n)` runtime complexity.

**Example 1:**

```
Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4
```

**Example 2:**

```
Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1
```

**Example 3:**

```
Input: nums = [1], target = 0
Output: -1 
```

**Constraints:**

- `1 <= nums.length <= 5000`
- `-104 <= nums[i] <= 104`
- All values of `nums` are **unique**.
- `nums` is an ascending array that is possibly rotated.
- `-104 <= target <= 104`

### 📝个人分析

**例子1 nums = [4,5,6,7,0,1,2], target = 0**

[![zmUicj.png](https://s1.ax1x.com/2022/11/17/zmUicj.png)](https://imgse.com/i/zmUicj)

假设mid = 1, num[mid] = 5 , 并且nums[mid] >= nums[start] 「处于上坡区间」

之所以用mid 和 start两个点进行比较就是为了确定是处于哪个区间，比如处于【4，5，6】上坡区间，【6，0】下坡区间，【0，1，2】上坡区间

- 上坡区间 **<font color="#C70039">target >= nums[start] && target < nums[mid]</font>**

target在 start 和 mid区间，缩小**右**边界，反之亦然

- 下坡区间 <font color="#C70039">**target <= nums[end] && target > nums[mid]**</font>

target在 mid 和 end 区间，缩小**左**边界，反之亦然

### 💡Solution

```java
public int search(int[] nums, int target) {
    int len = nums.length;
    if (len == 0) return -1;
    int start = 0;
    int end = len - 1;
    while (start <= end) {
        int mid = start + (end - start) / 2;
        if (target == nums[mid]) return mid;
        else {
            if (nums[mid] >= nums[start]) {
                if (target >= nums[start] && target < nums[mid]) {
                    end = mid - 1;
                } else {
                    start = mid + 1;
                }
            } else {
                if (target <= nums[end] && target > nums[mid]) {
                    start = mid + 1;
                } else {
                    end = mid - 1;
                }
            }
        }
    }
    return -1;
}
```

## 💙【81】 Search in Rotated Sorted Array II  <font size="3" color="#FF5733">Medium</font>

There is an integer array `nums` sorted in non-decreasing order (not necessarily with **distinct** values).

Before being passed to your function, `nums` is **rotated** at an unknown pivot index `k` (`0 <= k < nums.length`) such that the resulting array is `[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]` (**0-indexed**). For example, `[0,1,2,4,4,4,5,6,6,7]` might be rotated at pivot index `5` and become `[4,5,6,6,7,0,1,2,4,4]`.

Given the array `nums` **after** the rotation and an integer `target`, return `true` *if* `target` *is in* `nums`*, or* `false` *if it is not in* `nums`*.*

You must decrease the overall operation steps as much as possible. 

**Example 1:**

```
Input: nums = [2,5,6,0,0,1,2], target = 0
Output: true
```

**Example 2:**

```
Input: nums = [2,5,6,0,0,1,2], target = 3
Output: false
```

**Constraints:**

- `1 <= nums.length <= 5000`
- `-104 <= nums[i] <= 104`
- `nums` is guaranteed to be rotated at some pivot.
- `-104 <= target <= 104`

### 📝个人分析

和33题的区别在于target有可能不存在数组中。

**nums = [2,5,6,0,0,1,2], target = 0**

**nums = [1,0,1,1,1] target = 0**

nums中存在重复的数字，那么！！必须去重，和[3sum](https://www.youngbird97.top/view/detail/id/13591/category/article) 去重步骤是一样的！！！！！

```java
    while (start < end && nums[start] == nums[start + 1])
        ++start;
    while (start < end && nums[end] == nums[end - 1])
        --end;
```

### 💡Solution

```java
public boolean search(int[] nums, int target) {
    if (null == nums || 0 == nums.length) return false;
    int start = 0;
    int end = nums.length - 1;
    while (start <= end) {
        while (start < end && nums[start] == nums[start + 1])
            ++start;
        while (start < end && nums[end] == nums[end - 1])
            --end;
        int mid = start + (end - start) / 2;
        if (target == nums[mid]) {
            return true;
        }
        if (nums[mid] >= nums[start]) {
            if (target >= nums[start] && target < nums[mid]) {
                end = mid - 1;
            } else {
                start = mid + 1;
            }
        } else {
            if (target <= nums[end] && target > nums[mid]) {
                start = mid + 1;
            } else {
                end = mid - 1;
            }
        }
    }
    return false;
}
```

# 🔗 Refer links

https://leetcode.com/problems/single-element-in-a-sorted-array/

https://leetcode.com/problems/search-in-rotated-sorted-array/

https://leetcode.com/problems/search-in-rotated-sorted-array-ii/





