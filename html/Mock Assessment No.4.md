# Mock Assessment No.4 two sum & Prison Cells After N Days

## 💚 1. Two Sum <font size="3" color="#02C850">Easy</font>

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

**Follow-up:** Can you come up with an algorithm that is less than `O(n2) `time complexity?

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

**Follow-up:** Can you come up with an algorithm that is less than `O(n2) `time complexity?

### 💡Solution

不用多说，这个已经做了很多次了。

```java
    public int[] twoSum(int[] nums, int target) {
        Map<Integer,Integer> map = new HashMap<>();
        for(int i = 0; i<nums.length;i++){
            int sum = target - nums[i];
            if(map.containsKey(sum)){
                return new int[] { map.get(sum), i };
            }
            map.put(nums[i], i);
        }
        return new int[]{};
    }
```

## 🧡 957. Prison Cells After N Days <font size="3" color="#FF5733">Medium</font>

There are `8` prison cells in a row and each cell is either occupied or vacant.

Each day, whether the cell is occupied or vacant changes according to the following rules:

- If a cell has two adjacent neighbors that are both occupied or both vacant, then the cell becomes occupied.
- Otherwise, it becomes vacant.

**Note** that because the prison is a row, the first and the last cells in the row can't have two adjacent neighbors.

You are given an integer array `cells` where `cells[i] == 1` if the `ith` cell is occupied and `cells[i] == 0` if the `ith` cell is vacant, and you are given an integer `n`.

Return the state of the prison after `n` days (i.e., `n` such changes described above).

**Example 1:**

```
Input: cells = [0,1,0,1,1,0,0,1], n = 7
Output: [0,0,1,1,0,0,0,0]
Explanation: The following table summarizes the state of the prison on each day:
Day 0: [0, 1, 0, 1, 1, 0, 0, 1]
Day 1: [0, 1, 1, 0, 0, 0, 0, 0]
Day 2: [0, 0, 0, 0, 1, 1, 1, 0]
Day 3: [0, 1, 1, 0, 0, 1, 0, 0]
Day 4: [0, 0, 0, 0, 0, 1, 0, 0]
Day 5: [0, 1, 1, 1, 0, 1, 0, 0]
Day 6: [0, 0, 1, 0, 1, 1, 0, 0]
Day 7: [0, 0, 1, 1, 0, 0, 0, 0]
```

**Example 2:**

```
Input: cells = [1,0,0,1,0,0,1,0], n = 1000000000
Output: [0,0,1,1,1,1,1,0]
```

**Constraints:**

- `cells.length == 8`
- `cells[i]` is either `0` or `1`.
- `1 <= n <= 109`

### 📝一些分析

首先，这个肯定是一个循环，那么就要找着规律，我先循环100次，发现每14天一个循环，一开始我想n % 14来确定正确的循环天数，实际上在testcase 300663720中，300663720%14=0，显然有问题。正确的规律是：`n = (n-1) % 14 + 1`

### 💡Solution

```java
  public static void main(String[] args) {
        prisonAfterNDays(new int[]{1,1,0,1,1,0,0,1},300663720);
    }
    static public int[] prisonAfterNDays(int[] cells, int n) {
        n =(n-1) % 14 + 1;
        for(int i =0; i < n;i++){
            int[] tmp = new int[cells.length];
            for(int j = 0 ;j<cells.length;j++){
                if(j==0 || j == cells.length-1){
                    if(cells[j] == 1){
                        tmp[j] = 0;
                    }
                    continue;
                }
                //0, 1, 0, 1, 1, 0, 0, 1
                if((cells[j-1] == 0 && cells[j+1] == 0)|| cells[j-1] == 1 
                   && cells[j+1] == 1){
                    tmp[j] = 1;
                }else {
                    tmp[j] = 0;
                }
            }
            cells = tmp;
//          System.out.println(Arrays.toString(Arrays.stream(cells).toArray()));
        }
        return cells;
    }
```

# 🔗 Refer links

https://leetcode.com/problems/two-sum/

https://leetcode.com/problems/prison-cells-after-n-days/