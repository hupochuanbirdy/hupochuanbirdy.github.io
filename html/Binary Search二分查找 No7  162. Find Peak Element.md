# Binary Search二分查找 No7  162. Find Peak Element【经典 google】

## 💙 【162】Find Peak Element <font size="3" color="#FF5733">Medium</font>

A peak element is an element that is strictly greater than its neighbors.

Given a **0-indexed** integer array `nums`, find a peak element, and return its index. If the array contains multiple peaks, return the index to **any of the peaks**.

You may imagine that `nums[-1] = nums[n] = -∞`. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.

You must write an algorithm that runs in `O(log n)` time.

**Example 1:**

```
Input: nums = [1,2,3,1]
Output: 2
Explanation: 3 is a peak element and your function should return the index number 2.
```

**Example 2:**

```
Input: nums = [1,2,1,3,5,6,4]
Output: 5
Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.
```

**Constraints:**

- `1 <= nums.length <= 1000`
- `-231 <= nums[i] <= 231 - 1`
- `nums[i] != nums[i + 1]` for all valid `i`.

### 💡Solution

```java
public int findPeakElement(int[] nums) {
    int start = 0;
    int end = nums.length-1;
    while(start < end){
        int mid = start + (end - start) / 2;
        if(nums[mid] >= nums[mid + 1]){
            end = mid;
        }else{
            start = mid + 1;
        }
    }
    return start;
}
```

[![zMhFN6.png](https://s1.ax1x.com/2022/11/20/zMhFN6.png)](https://imgse.com/i/zMhFN6)

### 🚦Related Topics

- [x] Array 
- [x] Binary Search

# 📍一毛一样的题目

【已整理】852. [Peak Index in a Mountain Array](https://leetcode.com/problems/peak-index-in-a-mountain-array/?envType=study-plan&id=binary-search-i)

# 🔗 Refer links

https://leetcode.com/problems/find-peak-element/