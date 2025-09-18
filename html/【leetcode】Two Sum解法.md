# 【leetcode】Two Sum解法

## 💙 【1】Two Sum <font size="3" color="#4FE915">Easy</font>

Given an array of integers `nums` and an integer `target`, return *indices of the two numbers such that they add up to `target`*.

You may assume that each input would have ***exactly\* one solution**, and you may not use the *same* element twice.

You can return the answer in any order.

**Example 1:**

```
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
```

**Example 2:**

```
Input: nums = [3,2,4], target = 6
Output: [1,2]
```

**Example 3:**

```
Input: nums = [3,3], target = 6
Output: [0,1]
```

**Constraints:**

- `2 <= nums.length <= 104`
- `-109 <= nums[i] <= 109`
- `-109 <= target <= 109`
- **Only one valid answer exists.**

### 📝个人分析

例如现在有一个数组[2,7,11,15]，第一次执行complement=目标（9）-2=7，map存入下标为0的num[0]的数字，第二次执行complement=目标（9）-7=2；
此时map里已经有2这个集合了，这意味着找到目标。如果target=10，第一次执行complement=10-2=0，第二次执行10-7=3，第三次执行10-11=-1...此时没有符合的结果

### 💡Solution

```java
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++)
        {
            int complement = target - nums[i];
            if (map.containsKey(complement))
            {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        throw new IllegalArgumentException("No two sum solution");
    }
```

# 🔗 Refer links

https://leetcode.com/problems/two-sum/