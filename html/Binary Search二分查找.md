# Binary Search二分查找🌈 704 278 2089 1351 1337 852

## 一些固定写法

|         name         |             method             |
| :------------------: | :----------------------------: |
|   获取中间位置坐标   | mid = start + ( end-start) /2; |
| 一般按照正序正序排列 |                                |
|                      |                                |



## 💙 704. Binary Search <font size="3" color="#43CD17">easy</font>

Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.

You must write an algorithm with `O(log n)` runtime complexity.

**Example 1:**

```
Input: nums = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in nums and its index is 4
```

**Example 2:**

```
Input: nums = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not exist in nums so return -1 
```

**Constraints:**

- `1 <= nums.length <= 104`
- `-104 < nums[i], target < 104`
- All the integers in `nums` are **unique**.
- `nums` is sorted in ascending order.

### 💡Solution 

```java
public int search(int[] nums, int target) {
    if(nums.length==0) return -1;
    int start = 0;
    int end = nums.length-1;
    while(start<=end){
        int mid = start +( end-start) /2;
        if(target==nums[mid]) return mid;
        else if (nums[mid]<target){
            start = mid+1;
        }else{
            end =mid-1;
        }
    }
    return -1;
}
```

## 💙 278. First Bad Version <font size="3" color="#43CD17">easy</font>

You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

Suppose you have `n` versions `[1, 2, ..., n]` and you want to find out the first bad one, which causes all the following ones to be bad.

You are given an API `bool isBadVersion(version)` which returns whether `version` is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.

**Example 1:**

```
Input: n = 5, bad = 4
Output: 4
Explanation:
call isBadVersion(3) -> false
call isBadVersion(5) -> true
call isBadVersion(4) -> true
Then 4 is the first bad version.
```

**Example 2:**

```
Input: n = 1, bad = 1
Output: 1
```

**Constraints:**

- `1 <= bad <= n <= 231 - 1`

### 💡Solution 

**<font color="#C70039">isBadVersion是提供的API</font>**

```java
public int firstBadVersion(int n) {
    int start = 1;
    int end = n;
    while (start < end) { 
         int mid = start +( end-start) / 2;
        if (isBadVersion(mid)) {
            //broken true
            end = mid;
        } else {
            start = mid+1;
        }
    }
    return start;
}
```

## 💙 2089. Find Target Indices After Sorting Array <font size="3" color="#43CD17">easy</font>

You are given a **0-indexed** integer array `nums` and a target element `target`.

A **target index** is an index `i` such that `nums[i] == target`.

Return *a list of the target indices of* `nums` after *sorting* `nums` *in **non-decreasing** order*. If there are no target indices, return *an **empty** list*. The returned list must be sorted in **increasing** order.

**Example 1:**

```
Input: nums = [1,2,5,2,3], target = 2
Output: [1,2]
Explanation: After sorting, nums is [1,2,2,3,5].
The indices where nums[i] == 2 are 1 and 2.
```

**Example 2:**

```
Input: nums = [1,2,5,2,3], target = 3
Output: [3]
Explanation: After sorting, nums is [1,2,2,3,5].
The index where nums[i] == 3 is 3.
```

**Example 3:**

```
Input: nums = [1,2,5,2,3], target = 5
Output: [4]
Explanation: After sorting, nums is [1,2,2,3,5].
The index where nums[i] == 5 is 4.
```

**Constraints:**

- `1 <= nums.length <= 100`
- `1 <= nums[i], target <= 100`

### 💡Solution 

```java
public List<Integer> targetIndices(int[] nums, int target) {
    Arrays.sort(nums);
    int left = 0;
    int right = nums.length - 1;
    List<Integer> ans = new ArrayList<>();
    while (left <= right) {
        int mid = left + (right - left) / 2;
        int cur = nums[mid];
        if (cur == target) {
            int first = mid;
            int last = mid;
            while (first - 1 >= 0 && nums[first - 1] == target) {
                first--;
            }
            while (last + 1 < nums.length && nums[last + 1] == target) {
                last++;
            }
            for (int i = first; i <= last; i++) {
                ans.add(i);
            }
            return ans;
        } else if (cur > target) {
            right--;
        } else {
            left++;
        }
    }
    return ans;
}
```

## 💙 1351. Count Negative Numbers in a Sorted Matrix <font size="3" color="#43CD17">easy</font>

Given a `m x n` matrix `grid` which is sorted in non-increasing order both row-wise and column-wise, return *the number of **negative** numbers in* `grid`.

**Example 1:**

```
Input: grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]
Output: 8
Explanation: There are 8 negatives number in the matrix.
```

**Example 2:**

```
Input: grid = [[3,2],[1,0]]
Output: 0 
```

**Constraints:**

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 100`
- `-100 <= grid[i][j] <= 100`

### 💡Solution 

    public int countNegatives(int[][] grid) {
         int ans = 0;
        int n= grid.length, m = grid[0].length;
        for (int i =0 ;i< n ;i++){
            int l = 0;
            int r = grid[i].length-1;
            int temp=-1;
            while(l<=r ){
                int mid= l+(r-l)/2;
                if(grid[i][mid]<0) {
                    temp = mid;
                    r=mid-1;
                }
                else{
                    l=mid+1;
                }
            }
            if(temp!=-1) ans += (m-temp);
        }
        return ans;
    }

## 💙 1337. The K Weakest Rows in a Matrix <font size="3" color="#43CD17">easy</font> <font size="3" color="#C92ADC">PriorityQueue</font> 

You are given an `m x n` binary matrix `mat` of `1`'s (representing soldiers) and `0`'s (representing civilians). The soldiers are positioned **in front** of the civilians. That is, all the `1`'s will appear to the **left** of all the `0`'s in each row.

A row `i` is **weaker** than a row `j` if one of the following is true:

- The number of soldiers in row `i` is less than the number of soldiers in row `j`.
- Both rows have the same number of soldiers and `i < j`.

Return *the indices of the* `k` ***weakest** rows in the matrix ordered from weakest to strongest*.

**Example 1:**

```
Input: mat = 
[[1,1,0,0,0],
 [1,1,1,1,0],
 [1,0,0,0,0],
 [1,1,0,0,0],
 [1,1,1,1,1]], 
k = 3
Output: [2,0,3]
Explanation: 
The number of soldiers in each row is: 
- Row 0: 2 
- Row 1: 4 
- Row 2: 1 
- Row 3: 2 
- Row 4: 5 
The rows ordered from weakest to strongest are [2,0,3,1,4].
```

**Constraints:**

- `m == mat.length`
- `n == mat[i].length`
- `2 <= n, m <= 100`
- `1 <= k <= m`
- `matrix[i][j]` is either 0 or 1.

### 💡Solution <font size="3" color="#C92ADC">PriorityQueue</font> 

```java
public int[] kWeakestRows(int[][] mat, int k) {
    int row = mat.length;
        int column = mat[0].length;
        int[] res = new int[k];
        PriorityQueue<int[]> minHeap = new PriorityQueue<>((a,b) -> a[0] == b[0] ? b[1] - a[1] : b[0]-a[0]);
        for (int i = 0; i < row; i++) {
            int count = 0;
            for (int j = 0; j < column; j++) {
                if (mat[i][j] == 1) count++;
            }
            minHeap.offer(new int[]{count, i});
        }

        while (minHeap.size() > k){
            minHeap.poll();
        }
        while (!minHeap.isEmpty()){
            res[--k] = minHeap.poll()[1];
        }
        return res;
}
```

### 💡Solution <font size="3" color="#E61E8B">binary search</font> 

```java
public static int[] kWeakestRows_binary(int[][] mat, int k) {
    int row = mat.length;
    int[] res = new int[k];
    PriorityQueue<int[]> maxHeap = new PriorityQueue<>((a,b) -> a[0] == b[0] ? b[1] - a[1] : b[0]-a[0]);
    for (int i = 0; i < row; i++) {
        int start = 0;
        int end = mat[i].length;
        while (start < end){
            int mid = start + (end - start) / 2;
            if(mat[i][mid] == 1){
                start = mid+1;
            }else {
                end = mid ;
            }
        }
        int count =  start+1;
        maxHeap.offer(new int[]{count,i});
        if(maxHeap.size() > k) maxHeap.poll();
    }
    while (!maxHeap.isEmpty() ){
        res[--k] = maxHeap.poll()[1];
    }
    return res;
}
```

## 💙852. Peak Index in a Mountain Array <font size="3" color="#FF5733">Medium</font>

An array `arr` a **mountain** if the following properties hold:

- `arr.length >= 3`

- There exists some `i` with `0 < i < arr.length - 1`

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

## 🔗 Leetcode links

https://leetcode.com/problems/binary-search/

https://leetcode.com/problems/find-target-indices-after-sorting-array/

https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/

https://leetcode.com/problems/the-k-weakest-rows-in-a-matrix/

https://leetcode.com/problems/peak-index-in-a-mountain-array/