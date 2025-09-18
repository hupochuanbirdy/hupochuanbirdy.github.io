# A general approach to backtracking questions in Java 

## 前沿

Subsets, Permutations, Combination Sum, Palindrome Partitioning这几种类似的题目的解题答案，其中包括我原来写的部分，以及在熟悉递归后修改的代码。



## 💙 78. Subsets <font size="3" color="#FF5733">Medium</font>

Given an integer array `nums` of **unique** elements, return *all possible* *subsets* *(the power set)*.

The solution set **must not** contain duplicate subsets. Return the solution in **any order**. 

**Example 1:**

```
Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
```

**Example 2:**

```
Input: nums = [0]
Output: [[],[0]] 
```

**Constraints:**

- `1 <= nums.length <= 10`
- `-10 <= nums[i] <= 10`
- All the numbers of `nums` are **unique**.

### 💡Solution

```java
  public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList();
        backtracking(nums, result, new ArrayList<Integer>(), 0);
        return result;
    }
    private void backtracking(int[] nums, List<List<Integer>> result, List<Integer> list, int i){
        result.add(new ArrayList<>(list));
        for (int j = i; j < nums.length; j++){
            list.add(nums[j]);
            backtracking(nums, result, list,j+1);
            list.remove(list.size() -1);
        }
    }
```

## 💙 90. Subsets II <font size="3" color="#FF5733">Medium</font>

Given an integer array `nums` that may contain duplicates, return *all possible* *subsets* *(the power set)*.

The solution set **must not** contain duplicate subsets. Return the solution in **any order**.

**Example 1:**

```
Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
```

**Example 2:**

```
Input: nums = [0]
Output: [[],[0]] 
```

**Constraints:**

- `1 <= nums.length <= 10`
- `-10 <= nums[i] <= 10`

### 💡Solution

```java
   public List<List<Integer>> subsetsWithDup(int[] nums) {
        List<List<Integer>> ans = new ArrayList<>();
        Arrays.sort(nums);
        subsetsWithDup_DFS(nums,  ans, new ArrayList<Integer>(),0);
        return ans;
    }

    private void subsetsWithDup_DFS(int[] nums, List<List<Integer>> ans, ArrayList<Integer> list, int start) {
        ans.add(new ArrayList<>(list));
        for(int i = start;i<nums.length;i++){
           if(i > start && nums[i] == nums[i-1]) continue;
            list.add(nums[i]);
            subsetsWithDup_DFS(nums,  ans,list ,i+1);
            list.remove(list.size()-1);
        }
    }
```

## 💙 46. Permutations <font size="3" color="#FF5733">Medium</font>

Given an array `nums` of distinct integers, return *all the possible permutations*. You can return the answer in **any order**. 

**Example 1:**

```
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

**Example 2:**

```
Input: nums = [0,1]
Output: [[0,1],[1,0]]
```

**Example 3:**

```
Input: nums = [1]
Output: [[1]]
```

**Constraints:**

- `1 <= nums.length <= 6`
- `-10 <= nums[i] <= 10`
- All the integers of `nums` are **unique**.

### 💡Solution

```java
 public List<List<Integer>> permute(int[] nums){
        int len = nums.length;
        List<List<Integer>> res = new ArrayList<>();
        if(len==0) return res;
        Deque<Integer> path = new ArrayDeque<>();
        boolean[] used = new boolean[len];
        dfsPermutation(nums,len,0 ,path,used,res);
        return res;
    }// method 1
    private void dfsPermutation(int[] nums,int len,int depth, Deque<Integer> path ,boolean[] used, List<List<Integer>> res ){
        if(depth==len) { // 深度 = 数组长度，意味着递归到底了。base case
            res.add(new ArrayList<>(path));
            return;
        }
        for(int i=0;i<len;i++){
            if(used[i]) continue; //去重
            path.addLast(nums[i]);
            used[i]= true;
            dfsPermutation(nums,len,depth+1 ,path,used,res);
            path.removeLast();
            used[i]=false;
        }
    }
// method 2 public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> ans = new ArrayList<>();
        boolean[] visited = new boolean[nums.length];
        permute_DFS(nums, ans, new ArrayList<Integer>(),visited);
        return ans;
    }

    private void permute_DFS(int[] nums, List<List<Integer>> ans, ArrayList<Integer> list, boolean[] visited) {
        if (list.size() == nums.length) {
            ans.add(new ArrayList<>(list));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if(  visited[i] ) continue;
            visited[i] = true;
            list.add(nums[i]);
            permute_DFS(nums, ans, list,visited);
            list.remove(list.size()-1);
            visited[i] = false;

        }
    }
```

## 💙 47. Permutations II <font size="3" color="#FF5733">Medium</font>

Given a collection of numbers, `nums`, that might contain duplicates, return *all possible unique permutations **in any order**.*

**Example 1:**

```
Input: nums = [1,1,2]
Output:
[[1,1,2],
 [1,2,1],
 [2,1,1]]
```

**Example 2:**

```
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

**Constraints:**

- `1 <= nums.length <= 8`
- `-10 <= nums[i] <= 10`

### 💡Solution

```java
   public List<List<Integer>> permuteUnique(int[] nums) {
        List<List<Integer>> ans = new ArrayList<>();
        boolean[] visited = new boolean[nums.length];
        Arrays.sort(nums); // 同样，去重需要排序
        permuteUnique_DFS(nums, ans, new ArrayList<Integer>(),visited);
        return ans;
    }
    private void permuteUnique_DFS(int[] nums, List<List<Integer>> ans, ArrayList<Integer> list, boolean[] visited) {
        if (list.size() == nums.length) {
            ans.add(new ArrayList<>(list));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if(  visited[i] ) continue; // 去重
            if(i > 0 && nums[i] == nums[i-1] && !visited[i - 1]) continue; // 前一个数 如果 等于后一个数 num[1] == num[0] == 2 and num[0]没有被访问过
            visited[i] = true;
            list.add(nums[i]);
            permuteUnique_DFS(nums, ans, list,visited);
            list.remove(list.size()-1);
            visited[i] = false;
        }
    }
```

## 💙 39. Combination Sum <font size="3" color="#FF5733">Medium</font>

Given an array of **distinct** integers `candidates` and a target integer `target`, return *a list of all **unique combinations** of* `candidates` *where the chosen numbers sum to* `target`*.* You may return the combinations in **any order**.

The **same** number may be chosen from `candidates` an **unlimited number of times**. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique combinations that sum up to `target` is less than `150` combinations for the given input.

**Example 1:**

```
Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.
```

**Example 2:**

```
Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]
```

**Example 3:**

```
Input: candidates = [2], target = 1
Output: []
```

**Constraints:**

- `1 <= candidates.length <= 30`
- `2 <= candidates[i] <= 40`
- All elements of `candidates` are **distinct**.
- `1 <= target <= 40`

### 💡Solution

```java
   public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> ans = new ArrayList<>();
        Arrays.sort(candidates);
        combinationSum_DFS(candidates, 0, target, ans, new ArrayList<Integer>(),0);
        return ans;
    }
    private void combinationSum_DFS(int[] candidates, int sum, int target, List<List<Integer>> ans, ArrayList<Integer> list, int start) {
        if(sum > target) return; //base case
        if(sum == target){ //base case
            ans.add(new ArrayList<>(list));
            return;
        }
        for(int i = start;i<candidates.length;i++){
            list.add(candidates[i]);
            combinationSum_DFS(candidates, sum + candidates[i], target, ans, list,i);
            list.remove(list.size()-1);
        }
    }
```

## 💙 40. Combination Sum II <font size="3" color="#FF5733">Medium</font>

Given a collection of candidate numbers (`candidates`) and a target number (`target`), find all unique combinations in `candidates` where the candidate numbers sum to `target`.

Each number in `candidates` may only be used **once** in the combination.

**Note:** The solution set must not contain duplicate combinations.

**Example 1:**

```
Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: 
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
```

**Example 2:**

```
Input: candidates = [2,5,2,1,2], target = 5
Output: 
[
[1,2,2],
[5]
] 
```

**Constraints:**

- `1 <= candidates.length <= 100`
- `1 <= candidates[i] <= 50`
- `1 <= target <= 30`

### 💡Solution

```java
public List<List<Integer>> combinationSum2(int[] nums, int target) {
    List<List<Integer>> list = new ArrayList<>();
    Arrays.sort(nums);
    backtrack(list, new ArrayList<>(), nums, target, 0);
    return list;
}
private void backtrack(List<List<Integer>> list, List<Integer> tempList, int [] nums, 
                       int remain, int start){
    if(remain < 0) return;
    else if(remain == 0) list.add(new ArrayList<>(tempList));
    else{
        for(int i = start; i < nums.length; i++){
            if(i > start && nums[i] == nums[i-1]) continue; // skip duplicates
            tempList.add(nums[i]);
            backtrack(list, tempList, nums, remain - nums[i], i + 1);
            tempList.remove(tempList.size() - 1); 
        }
    }
} 
```

# 🔗 Refer links

https://leetcode.com/problems/subsets/

https://leetcode.com/problems/subsets-ii/

https://leetcode.com/problems/permutations/

https://leetcode.com/problems/permutations-ii/

https://leetcode.com/problems/combination-sum/

https://leetcode.com/problems/combination-sum-ii/