# Majority Element  Moore voting algorithm算法

> Could you solve the problem in linear time and in `O(1)` space? 
>
> 题目给出的提示是分治算法

## 💚 169. Majority Element

Given an array `nums` of size `n`, return *the majority element*.

The majority element is the element that appears more than `⌊n / 2⌋` times. You may assume that the majority element always exists in the array.

**Example 1:**

```
Input: nums = [3,2,3]
Output: 3
```

**Example 2:**

```
Input: nums = [2,2,1,1,1,2,2]
Output: 2
```

**Constraints:**

- `n == nums.length`
- `1 <= n <= 5 * 104`
- `-109 <= nums[i] <= 109`

**Follow-up:** Could you solve the problem in linear time and in `O(1)` space?

### ❗️Not Good Solution1

- Time complexity: O (n)

- Space complexity: O (n)

```java
   public int majorityElement(int[] nums) {
     int times = nums.length / 2;
      Arrays.sort(nums);
       Map<Integer,Integer> map = new HashMap<>();
       for(int i : nums){
           map.put(i,map.getOrDefault(i,0)+1);
           if(map.get(i) > times){
               return i;
           }
       }
       return -1;
    }
```

### ❗️Not Good Solution2

- Time complexity: O (n*logn)

- Space complexity: O (1)

```java
   public int majorityElement(int[] nums) {
      Arrays.sort(nums);
  	  return nums[nums.length/2];
    }
```

### 💡Good Solution --- Boyer-Moore Voting Algorithm

- Time complexity: O (n)

- Space complexity: O (1)

```java
class Solution {
    public int majorityElement(int[] nums) {
        int count = 0;
	      int candidate = 0;
        for (int num : nums) {
            if (count == 0) {
                candidate = num;
            }
            if(num==candidate){
                count++;
            }else{
                count--;
            }
        //Or you can write as count += (num == candidate) ? 1 : -1;
        }
    	  return candidate;
    }
}
```

### 📍Related Topics

- [x] Array
- [x] Hash Table
- [x] Divide and Conquer
- [x] Sorting
- [x] Counting

## 🧡 229. Majority Element II

Given an integer array of size `n`, find all elements that appear more than `⌊ n/3 ⌋` times.

**Example 1:**

```
Input: nums = [3,2,3]
Output: [3]
```

**Example 2:**

```
Input: nums = [1]
Output: [1]
```

**Example 3:**

```
Input: nums = [1,2]
Output: [1,2] 
```

**Constraints:**

- `1 <= nums.length <= 5 * 104`
- `-109 <= nums[i] <= 109` 

**Follow up:** Could you solve the problem in linear time and in `O(1)` space?

### ❗️Not Good Solution

```java
   static public List<Integer> majorityElement(int[] nums) {
       int times = nums.length / 3;
       Map<Integer, Integer> map = new HashMap<>();
       for (int i : nums) {
           map.put(i, map.getOrDefault(i, 0) + 1);
       }
       List<Integer> ans = new ArrayList<>();
       for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
           if (entry.getValue() > times) {
               ans.add(entry.getKey());
           }
       }
       return ans;
   }
```

### 💡Solution

```java
public List<Integer> majorityElement2(int[] nums) {
    int n = nums.length, candidate1 = -1, candidate2 = -1, count1 = 0, count2 = 0;
    for (int i = 0; i < n; i++) {
        if (nums[i] == candidate1) {
            count1++;
        } else if (nums[i] == candidate2) {
            count2++;
        } else if (count1 == 0) {
            candidate1 = nums[i];
            count1 = 1;
        } else if (candidate2 == 0) {
            candidate2 = nums[i];
            count2 = 1;
        } else {
            count1--;
            count2--;
        }
    }
    List<Integer> ans = new ArrayList<Integer>();
    count1 = 0;
    count2 = 0;
    for (int i = 0; i < n; i++) {
        if (nums[i] == candidate1) {
            count1++;
        } else if (nums[i] == candidate2) {
            count2++;
        }
    }
    if (count1 > n / 3) {
        ans.add(candidate1);
    }
    if (count2 > n / 3) {
        ans.add(candidate2);
    }
    return ans;
}
```

# 🔗 Refer links

https://leetcode.com/problems/majority-element

https://leetcode.com/problems/majority-element/solutions/2972363/4-ways-to-solve-this-problem-brute-force-to-optimal-solution/?orderBy=newest_to_oldest&languageTags=java

https://leetcode.com/problems/majority-element-ii/description/

https://www.youtube.com/watch?v=gY-I8uQrCkk