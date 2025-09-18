# Leetcode 3Sum 以及 3Sum Closest

## 💻3sum  <font color=#FF5733 size=3>Medium</font>

### 题目描述

Given an integer array nums, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.

Notice that the solution set must <font color="FF5733">not</font> contain duplicate triplets.

**Example 1:**

```
Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]
Explanation: 
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
The distinct triplets are [-1,0,1] and [-1,-1,2].
Notice that the order of the output and the order of the triplets does not matter.
```

**Example 2:**

```
Input: nums = [0,1,1]
Output: []
Explanation: The only possible triplet does not sum up to 0.
```

**Example 3:**

```
Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.
```

**Constraints:**

- `3 <= nums.length <= 3000`
- `-105 <= nums[i] <= 105`

### 🧨代码 

#### 递归 <font color="FF3030">TLE </font> 超时

```java
 List<List<Integer>> ans = new LinkedList<>();
      public List<List<Integer>> threeSum(int[] nums) {
        List<Integer> res = new ArrayList<>();
        if (nums.length < 3) return ans;
        Arrays.sort(nums);
        threeSum_DFS(nums,res,0,0);
        return ans;
    }

    private void threeSum_DFS(int[] nums, List<Integer> res, int start,  int sum     ) {
        if(res.size() == 3 && sum == 0) {
            if (!ans.contains(new ArrayList<>(res)))
                ans.add(new ArrayList<>(res));
            return;
        }

        for (int i = start; i < nums.length; i++) {
            res.add(nums[i]);
            threeSum_DFS(nums,res,i+1,sum + nums[i]);
            res.remove(res.size() - 1);
        }
    }
```

#### Two pointers <font color="3EAA37">Accept </font> 

参考2sum，3sum`-1,0,1,2,-1,-4` 先排序，设置三个指针, `i` `l` `r` 每次扫描都要固定一个位置开始。例如`i` 从index=0开始固定，那么`l` `r` 两个指针左右↔️夹击扫描。

| Loop |  -1  |  -1  |  0   |  1   |  2   |  4   |                    Sum                    |
| :--: | :--: | :--: | :--: | :--: | :--: | :--: | :---------------------------------------: |
|  0   |  i   |  l   |      |      |      |  r   |            2 > 0, `r`指针左移⬅️            |
|  1   |  i   |  l   |      |      |  r   |      | 0=0 找到答案，`i` 指针右移 ➡️,`r`指针左移⬅️ |
|  2   |  i   |      |  l   |      |  r   |      |            1 > 0, `r`指针左移⬅️            |

` nums[i] == nums[i - 1]` 为了提升效率重复的跳过。

```java
  public List<List<Integer>> threeSum(int[] nums) {
        List<List<Integer>> res = new LinkedList<>();
        Arrays.sort(nums);
        int target = 0;
        if (nums.length < 3) return res;
        for (int i = 0; i < nums.length - 1; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) {  // 去重
                continue;
            }
            int l = i + 1;
            int r = nums.length - 1;
            while (l < r) {
                int threeSum = nums[i] + nums[l] + nums[r];
                if (threeSum > target) {
                    r--;
                    while (nums[r] == nums[r + 1] && l < r) r--;  // 去重
                } else if (threeSum < target) {
                    l++;
                    while (nums[l] == nums[l - 1] && l < r) l++;   // 去重
                } else {
                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));
                    l++;
                    r--;
                    while (nums[l] == nums[l - 1] && l < r) l++;
                    while (nums[r] == nums[r + 1] && l < r) r--;

                }
            }
        }
        return res;
    }
```

<hr>

## 💡3sum Closest  <font color=#FF5733 size=3>Medium</font>

### 题目描述

Given an integer array `nums` of length `n` and an integer `target`, find three integers in `nums` such that the sum is closest to `target`.

Return *the sum of the three integers*.

You may assume that each input would have exactly one solution. 

**Example 1:**

```
Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
```

**Example 2:**

```
Input: nums = [0,0,0], target = 1
Output: 0
Explanation: The sum that is closest to the target is 0. (0 + 0 + 0 = 0).
```

**Constraints:**

- `3 <= nums.length <= 500`
- `-1000 <= nums[i] <= 1000`
- `-104 <= target <= 104`

### 🧨代码

#### 递归 <font color="FF3030">TLE </font> 超时 

我真的很喜欢用递归来做这种题，但往往都会超时😭

```java
   int differ = Integer.MAX_VALUE;
    int  closest_3sum = 0;
    int Tar  = 0;
    boolean flag = false;
    public int threeSumClosest(int[] nums, int target) {
        Arrays.sort(nums);
        HashSet<Integer> set = new HashSet<>();
        Tar = target;
        for(int i =0;i<nums.length && !flag ;i++){
             int temp = nums[i];
            if(!set.contains(temp)){
                set.add(temp);
                threeSumClosest_DFS(0,nums,i+1,temp);
            }
        }
        return closest_3sum;

    }

    private void threeSumClosest_DFS(int deep, int[] nums, int cur,int sum ) {
        if (deep == 2 ) {
            int dif_sum = Math.abs(Tar - sum);
            if (differ >= dif_sum) {
                differ = dif_sum;
                closest_3sum = sum;
                if(differ == 0 ){
                    flag = true;
                } 
                return;
            }
            return;
        }
        if (cur >= nums.length) return;
        for (int i = cur; i < nums.length && !flag; i++) {
            threeSumClosest_DFS(deep + 1, nums, i + 1, sum + nums[i]);
        }
    }
```

#### Two pointers <font color="3EAA37">Accept </font> 🙆

同样，sort array先，和3sum一样，找到最接近的target的绝对值！`minGap`此参数记录最小差值differ，不能用Math.min来更新最小差值，因为我们需要判断当前差值小于上一次意味着答案可以更新。

```java
public int threeSumClosest(int[] nums, int target) {
        Arrays.sort(nums);
        int minAns =0;
        int minGap = Integer.MAX_VALUE;
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue; // 去重
            int l = i+1;
            int r = nums.length - 1;
            while (l < r) {
                int sum3_closes = nums[i] + nums[l] + nums[r];
                int gap = Math.abs(sum3_closes - target);
                if (gap < minGap) {
                    minGap = gap;
                    minAns = sum3_closes;
                }
                if (sum3_closes < target) {  //sum 大于 target
                    l++;
                } else r--;
            }
        }
        return minAns;
    }
```

# 🔗 Refer links

https://leetcode.com/problems/3sum/

https://leetcode.com/problems/3sum-closest/
