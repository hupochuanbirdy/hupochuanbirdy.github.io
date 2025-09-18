# Binary Search二分查找 No2🌈 

## 🦕 268. Missing Number <font size="3" color="#43CD17">easy</font> 🌟interview problem

Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return *the only number in the range that is missing from the array.* 

**Example 1:**

```
Input: nums = [3,0,1]
Output: 2
Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number in the range since it does not appear in nums.
```

**Example 2:**

```
Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8
Explanation: n = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 8 is the missing number in the range since it does not appear in nums.
```

**Constraints:**

- `n == nums.length`
- `1 <= n <= 104`
- `0 <= nums[i] <= n`
- All the numbers of `nums` are **unique**.

### 💡😳 Bad Solution  

```java
public int missingNumber(int[] nums) {
    int end = nums.length;
    HashSet<Integer> set = new HashSet<Integer>();
    for(int i:nums) set.add(i);
    for(int i=0;i<=end;i++){
        if( !set.contains(i)) return i;
    }
    return 0;
}
```

### 💡✅ Good Solution  

```java
public int missingNumber(int[] nums) {
    Arrays.sort(nums);
    int start = 0;
    int end = nums.length - 1;
    while (start <= end){
        int mid = start + (end - start) / 2;
        if(nums[mid] == mid) {
            start = mid + 1;
        }else {
            end = mid - 1;
        }
    }
    return start;
}
```

## 🌟 1539. Kth Missing Positive Number <font size="3" color="#43CD17">easy</font>

Given an array `arr` of positive integers sorted in a **strictly increasing order**, and an integer `k`.

Return *the* `kth` ***positive** integer that is **missing** from this array.*

**Example 1:**

```
Input: arr = [2,3,4,7,11], k = 5
Output: 9
Explanation: The missing positive integers are [1,5,6,8,9,10,12,13,...]. The 5th missing positive integer is 9.
```

**Example 2:**

```
Input: arr = [1,2,3,4], k = 2
Output: 6
Explanation: The missing positive integers are [5,6,7,...]. The 2nd missing positive integer is 6.
```

**Constraints:**

- `1 <= arr.length <= 1000`
- `1 <= arr[i] <= 1000`
- `1 <= k <= 1000`
- `arr[i] < arr[j]` for `1 <= i < j <= arr.length`

### 💡✅ Good Solution  

#### 🔎 eg1 `arr = [2,3,4,7,11], k = 5`

##### <font size="3" color="#C70039">**Total missing count** </font>`：arr[end]-len(arr) = 6`

如果： 总丢失数 < k, 那显然第K个丢失的数不在数组里。

##### <font size="3" color="#E61E8B">**count(missing count) = arr[mid] - indexMid + 1**  </font>

如果： 当前丢失的数 < k， 说明 数组需要往➡️右走，start指针右移，反之亦然。

|  i   |       |  0   |  1   |   2   |      |      |  3   |      |      |      |       4       |  5   |
| :--: | :---: | :--: | :--: | :---: | :--: | :--: | :--: | :--: | :--: | :--: | :-----------: | :--: |
|      |   x   |  2   |  3   |   4   |  x   |  x   |  7   |  x   |  x   |  x   |      11       | ...  |
|  0   | start |      |      |  mid  |      |      |      |      |      |      |               | end  |
|  1   |       |      |      | start |      |      |      |      |      |      |      mid      | end  |
|  2   |       |      |      | start |      |      |      |      |      |      |      end      |      |
|  3   |       |      |      |       |      |      |      |      |      |      | **start/end** |      |

| arr[mid] - (mid+1) |                           | k = 5 |                    |
| :----------------: | :-----------------------: | :---: | :----------------: |
|      mid = 2       | arr[2] - (2+1)  = 4 - 3=1 |   <   | start = mid +1= 3  |
|      mid = 4       |  arr[4] - (4+1) = 11-5=6  |   >   |   end = mid = 4    |
|      mid = 3       |        7-(3+1) = 3        |   <   | start = mid +1 = 4 |
|  **Start = end**   |         **break**         |       | **start + k=4+5**  |

```java
static public int findKthPositive(int[] arr, int k) {
     int start = 0;
     int end = arr.length;
     while(start<end){
         int mid = start + (end - start)/2;
         if(arr[mid] - (mid+1) >= k){
             end = mid;
         } else{
             start = mid + 1;
         }
     }
     return start+k;
 }
```



## 🌟 1060. Missing Element in Sorted Array 🔒

Given a sorted array `A` of **unique** numbers, find the `K-th` missing number starting from the leftmost number of the array.

**Example 1:**

```
Input: A = [4,7,9,10], K = 1
Output: 5
Explanation: 
The first missing number is 5.
```

**Example 2:**

```
Input: A = [4,7,9,10], K = 3
Output: 8
Explanation: 
The missing numbers are [5,6,8,...], hence the third missing number is 8.
```

**Example 3:**

```
Input: A = [1,2,4], K = 3
Output: 6
Explanation: 
The missing numbers are [3,5,6,7,...], hence the third missing number is 6.
```

**Note:**

1. `1 <= A.length <= 50000`
2. `1 <= A[i] <= 1e7`
3. `1 <= K <= 1e8`

### 💡Good Solution  

Ok , 看起来是否与<font size="3" color="#C70039">**1539** </font>一般眼熟？只不过这里的起始number是arr[0], So how we solve it?

```java
int len = nums.length;
int TotalmissCount = nums[len- 1] - nums[0] + 1 - len; //最后一个 - 第一个 - 总长度 +1 
```

例如 A = [1,2,4], K = 3, missingNumber = 4-1-3+ 1=1, 显然 缺失的数量 < k,那么直接的出答案`nums[end - 1] + (k - TotalmissCount)`

如果缺失数量 > k, 那么答案就在数组里。

```java
 public static void main(String[] args) {
  System.out.println(   missingElement(new int[]{4,7,9,10},3));
 }
static public int missingElement(int[] nums, int k) {
    int len = nums.length;
    int end = nums.length;
    int TotalmissCount = nums[len - 1] - nums[0] + 1 - len;
    if (TotalmissCount < k) return nums[end - 1] + (k - TotalmissCount);
    int start = 0;
    while (start < end) {
        int mid = start + (end - start) / 2;
        int missingNumber = nums[mid] - nums[start] - (mid - start);
        if (missingNumber >= k) {
            end = mid;
        } else {
            k -= missingNumber;
            start = mid ;
        }
    }

    return nums[start] + k;
}
```

## 🌟 875. 🐒Koko Eating Bananas🍌  <font size="3" color="#FF5733">Medium</font>

Koko loves to eat bananas. There are `n` piles of bananas, the `ith` pile has `piles[i]` bananas. The guards have gone and will come back in `h` hours.

Koko can decide her bananas-per-hour eating speed of `k`. Each hour, she chooses some pile of bananas and eats `k` bananas from that pile. If the pile has less than `k` bananas, she eats all of them instead and will not eat any more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas before the guards return.

Return *the minimum integer* `k` *such that she can eat all the bananas within* `h` *hours*.

**Example 1:**

```
Input: piles = [3,6,7,11], h = 8
Output: 4
```

**Example 2:**

```
Input: piles = [30,11,23,4,20], h = 5
Output: 30
```

**Example 3:**

```
Input: piles = [30,11,23,4,20], h = 6
Output: 23 
```

**Constraints:**

- `1 <= piles.length <= 104`
- `piles.length <= h <= 109`
- `1 <= piles[i] <= 109`

### 💡Solution  

```java
public int minEatingSpeed(int[] piles, int h) {
    int left =1,right =1;
    for(int i =0;i<piles.length;i++){
        right = Math.max(right,piles[i]);
    }
    while (left < right){
        int mid = left + (right-left) / 2;
        int tmpEatSpeed = 0;
        for(int i =0;i<piles.length;i++){
            tmpEatSpeed += Math.ceil((double) piles[i] / mid);
        }
        if(tmpEatSpeed <= h) right = mid;
        else left = mid+1;
    }
    return right;
}
```





## 🔗 Leetcode links

https://leetcode.com/problems/missing-number/

https://leetcode.com/problems/kth-missing-positive-number/

https://leetcode.com/problems/koko-eating-bananas/

https://leetcode.ca/all/1060.html  会员题

## 🔗 Github link

https://github.com/Amber916Young/leetcode-interview-practice/tree/master/src/BinarySearch
