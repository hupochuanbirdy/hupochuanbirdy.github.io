# PriorityQueue题：kSmallestPairs 

## ✈️int数组倒叙

```java
Arrays.sort(intervals,new Comparator<int[]>() {
@Override
public int compare(int[]a,int[]b)
{
    return a[0]==b[0]?b[1]-a[1]:a[0]-b[0];
} });
```

## 💙题目 373. Find K Pairs with Smallest Sums

You are given two integer arrays `nums1` and `nums2` sorted in **ascending order** and an integer `k`.

Define a pair `(u, v)` which consists of one element from the first array and one element from the second array.

Return *the* `k` *pairs* `(u1, v1), (u2, v2), ..., (uk, vk)` *with the smallest sums*. 

**Example 1:**

```
Input: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
Output: [[1,2],[1,4],[1,6]]
Explanation: The first 3 pairs are returned from the sequence: [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]
```

**Example 2:**

```
Input: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
Output: [[1,1],[1,1]]
Explanation: The first 2 pairs are returned from the sequence: [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]
```

**Example 3:**

```
Input: nums1 = [1,2], nums2 = [3], k = 3
Output: [[1,3],[2,3]]
Explanation: All possible pairs are returned from the sequence: [1,3],[2,3]
```

**Constraints:**

- `1 <= nums1.length, nums2.length <= 105`
- `-109 <= nums1[i], nums2[i] <= 109`
- `nums1` and `nums2` both are sorted in **ascending order**.
- `1 <= k <= 104`

### 💡Solution

PriorityQueue排序规则

| loop | MaxHeap val(0) | MaxHeap val(1) | Sum  |
| :--: | :------------: | :------------: | :--: |
|  0   |       11       |       6        |  17  |
|  1   |       11       |       4        |  15  |
|  2   |       11       |       2        |  13  |
|  3   |       7        |       6        |  13  |
|  4   |       7        |       4        |  11  |
|  5   |       7        |       2        |  9   |
|  6   |       1        |       6        |  7   |
|  7   |       1        |       4        |  5   |
|  8   |       1        |       2        |  3   |

```java
  public List<List<Integer>> kSmallestPairs(int[] nums1, int[] nums2, int k) {
       PriorityQueue<int[]> maxHeap = new PriorityQueue<>(new Comparator<int[]>() {
            @Override
            public int compare(int[] a, int[] b) {
                return a[0] == b[0] ? b[1]-a[1]:b[0] -a[0];
            }
        });
        int n = nums1.length;
        int m = nums2.length;
        for(int i =0 ;i<n;i++) {
            for (int j = 0; j < m; j++) {
                int sum = nums1[i] + nums2[j];
             //当前sum 大于 队顶sum，要找最小值，所以跳过不合符条件的值
              // 没有这个判断会TLE
               if (maxHeap.size() >= k && maxHeap.peek()[0] < sum)  {
                   break;
               }
                maxHeap.add(new int[]{sum, nums1[i], nums2[j]});
                if (maxHeap.size() > k) {
                    maxHeap.poll();
                }

            }
        }
        List<List<Integer>> ans = new ArrayList<>();
        while (ans.size() != k && !maxHeap.isEmpty()) {
            int[] vals = maxHeap.poll();
            List<Integer> list = new ArrayList<>();
            list.add(vals[1]);
            list.add(vals[2]);
            ans.add(list);
        }
        return ans;  
    }
```

> Runtime: 254 ms, faster than 7.78% of Java online submissions for Find K Pairs with Smallest Sums.
>
> Memory Usage: 124.4 MB, less than 68.89% of Java online submissions for Find K Pairs with Smallest Sums.
>
> Next challenges:

## 💻GitHub link

https://github.com/Amber916Young/leetcode-interview-practice/blob/master/src/Heap/kSmallestPairs.java

