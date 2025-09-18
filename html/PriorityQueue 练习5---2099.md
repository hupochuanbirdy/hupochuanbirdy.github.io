# 🎉PriorityQueue 练习5⃣️---2099 2231 2233

## 🏆2099. Find Subsequence of Length K With the Largest Sum

You are given an integer array `nums` and an integer `k`. You want to find a **subsequence** of `nums` of length `k` that has the **largest** sum.

Return ***any** such subsequence as an integer array of length* `k`.

A **subsequence** is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

**Example 1:**

```
Input: nums = [2,1,3,3], k = 2
Output: [3,3]
Explanation:
The subsequence has the largest sum of 3 + 3 = 6.
```

**Example 2:**

```
Input: nums = [-1,-2,3,4], k = 3
Output: [-1,3,4]
Explanation: 
The subsequence has the largest sum of -1 + 3 + 4 = 6.
```

**Example 3:**

```
Input: nums = [3,4,3,3], k = 2
Output: [3,4]
Explanation:
The subsequence has the largest sum of 3 + 4 = 7. 
Another possible subsequence is [4, 3].
```

**Constraints:**

- `1 <= nums.length <= 1000`
- `-105 <= nums[i] <= 105`
- `1 <= k <= nums.length`

### 💡Solution 简单等级 easyrank

```java
public int[] maxSubsequence(int[] nums, int k) {
     PriorityQueue<int[]> minHeap = new PriorityQueue<>(k, new Comparator<int[]>() {
        @Override
        public int compare(int[] o1, int[] o2) {
            return o1[0] - o2[0];
        }
    });
    for(int i =0;i<nums.length;i++){
        if(minHeap.size()>=k&& minHeap.peek()[0] >nums[i] ) continue;

        minHeap.offer(new int[]{nums[i],i});
        if(minHeap.size()>k) minHeap.poll();
    }
    int[] ans = new int[nums.length];
    Arrays.fill(ans,Integer.MAX_VALUE);
    while (!minHeap.isEmpty()){
        int[] tmp = minHeap.poll();
        ans[tmp[1]] = tmp[0];
    }
    int[] res = new int[k];
    int index= 0;
    for(int i =0;i<ans.length;i++){
        if(ans[i] != Integer.MAX_VALUE){
            res[index++] = ans[i];
        }
    }
    return res;
}
```

## 🏆2231. Largest Number After Digit Swaps by Parity

You are given a positive integer `num`. You may swap any two digits of `num` that have the same **parity** (i.e. both odd digits or both even digits).

Return *the **largest** possible value of* `num` *after **any** number of swaps.*

**Example 1:**

```
Input: num = 1234
Output: 3412
Explanation: Swap the digit 3 with the digit 1, this results in the number 3214.
Swap the digit 2 with the digit 4, this results in the number 3412.
Note that there may be other sequences of swaps but it can be shown that 3412 is the largest possible number.
Also note that we may not swap the digit 4 with the digit 1 since they are of different parities.
```

**Example 2:**

```
Input: num = 65875
Output: 87655
Explanation: Swap the digit 8 with the digit 6, this results in the number 85675.
Swap the first digit 5 with the digit 7, this results in the number 87655.
Note that there may be other sequences of swaps but it can be shown that 87655 is the largest possible number.
```

**Constraints:**

- `1 <= num <= 109`

### 💡Solution 

```java
public static void main(String[] args) {
    largestInteger(1234);
}
static public int largestInteger(int num) {
    PriorityQueue<Integer> maxHeap_odd = new PriorityQueue<>(Comparator.reverseOrder());
    PriorityQueue<Integer> maxHeap_even = new PriorityQueue<>(Comparator.reverseOrder());
    StringBuilder sb = new StringBuilder( ) ;
    String s = String.valueOf(num);
    while (num > 0){
        int cur = num % 10;
        num /= 10;
        if( cur% 2==0){
            maxHeap_even.offer(cur);
        }else{
            maxHeap_odd.offer(cur);
        }
    }
    char c[] = s.toCharArray();
    for(int i = 0;i<c.length;i++){
        if(c[i]%2 == 0){
            sb.append(maxHeap_even.poll());
        }
        else{
            sb.append(maxHeap_odd.poll());
        }
    }
    return Integer.parseInt(sb.toString());
}
```

## 🤑 贪心 2233. Maximum Product After K Increments <font size="3" color="#FF5733">Medium</font>

You are given an array of non-negative integers `nums` and an integer `k`. In one operation, you may choose **any** element from `nums` and **increment** it by `1`.

Return *the **maximum** **product** of* `nums` *after **at most*** `k` *operations.* Since the answer may be very large, return it **modulo** `10^9 + 7`. Note that you should maximize the product before taking the modulo.  

**Example 1:**

```
Input: nums = [0,4], k = 5
Output: 20
Explanation: Increment the first number 5 times.
Now nums = [5, 4], with a product of 5 * 4 = 20.
It can be shown that 20 is maximum product possible, so we return 20.
Note that there may be other ways to increment nums to have the maximum product.
```

**Example 2:**

```
Input: nums = [6,3,3,2], k = 2
Output: 216
Explanation: Increment the second number 1 time and increment the fourth number 1 time.
Now nums = [6, 4, 3, 3], with a product of 6 * 4 * 3 * 3 = 216.
It can be shown that 216 is maximum product possible, so we return 216.
Note that there may be other ways to increment nums to have the maximum product. 
```

**Constraints:**

- `1 <= nums.length, k <= 105`
- `0 <= nums[i] <= 106`

### 💡Solution 

```java
public int maximumProduct(int[] nums, int k) {
   PriorityQueue<Integer> minHeap = new PriorityQueue<>();
    int mod = 1000000007;
   for(int a: nums)  minHeap.add(a);
    long sum = 1;
    while (k-- != 0){
        minHeap.offer(minHeap.poll() +1);
    }
    while (!minHeap.isEmpty()){
        sum *= minHeap.poll() % mod  ;
        sum %= mod;
    }
    return (int)sum;
}
```

#### ❓Hint1

If you can increment only once, which number should you increment?

#### ❓Hint 2

We should always prioritize the smallest number. What kind of data structure could we use?

#### ❓Hint 3

Use a min heap to hold all the numbers. Each time we do an operation, replace the top of the heap x by x + 1.

## 🔗 Leetcode links

https://leetcode.com/problems/find-subsequence-of-length-k-with-the-largest-sum/

https://leetcode.com/problems/largest-number-after-digit-swaps-by-parity/

https://leetcode.com/problems/maximum-product-after-k-increments/