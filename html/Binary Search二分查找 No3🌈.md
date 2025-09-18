# Binary Search二分查找🌈 No3  

## 💙 1482. Minimum Number of Days to Make m Bouquets <font size="3" color="#FF5733">Medium</font>

You are given an integer array `bloomDay`, an integer `m` and an integer `k`.

You want to make `m` bouquets. To make a bouquet, you need to use `k` **adjacent flowers** from the garden.

The garden consists of `n` flowers, the `ith` flower will bloom in the `bloomDay[i]` and then can be used in **exactly one** bouquet.

Return *the minimum number of days you need to wait to be able to make* `m` *bouquets from the garden*. If it is impossible to make m bouquets return `-1`.

**Example 1:**

```
Input: bloomDay = [1,10,3,10,2], m = 3, k = 1
Output: 3
Explanation: Let us see what happened in the first three days. x means flower bloomed and _ means flower did not bloom in the garden.
We need 3 bouquets each should contain 1 flower.
After day 1: [x, _, _, _, _]   // we can only make one bouquet.
After day 2: [x, _, _, _, x]   // we can only make two bouquets.
After day 3: [x, _, x, _, x]   // we can make 3 bouquets. The answer is 3.
```

**Example 2:**

```
Input: bloomDay = [1,10,3,10,2], m = 3, k = 2
Output: -1
Explanation: We need 3 bouquets each has 2 flowers, that means we need 6 flowers. We only have 5 flowers so it is impossible to get the needed bouquets and we return -1.
```

**Example 3:**

```
Input: bloomDay = [7,7,7,7,12,7,7], m = 2, k = 3
Output: 12
Explanation: We need 2 bouquets each should have 3 flowers.
Here is the garden after the 7 and 12 days:
After day 7: [x, x, x, x, _, x, x]
We can make one bouquet of the first three flowers that bloomed. We cannot make another bouquet from the last three flowers that bloomed because they are not adjacent.
After day 12: [x, x, x, x, x, x, x]
It is obvious that we can make two bouquets in different ways.
```

**Constraints:**

- `bloomDay.length == n`
- `1 <= n <= 105`
- `1 <= bloomDay[i] <= 109`
- `1 <= m <= 106`
- `1 <= k <= n`

### 👀 一些简单分析

这道题和Koko吃香蕉875.Koko Eating Bananas🍌非常非常相似，但是一开始我没看懂题目。

你得到一个整数数组`bloomDay`、一个整数`m`和一个整数`k`。你想做`m`花束。要制作花束，您需要使用花园中`k` **相邻**的花朵。花园由`n`鲜花组成，鲜花会在其中绽放，然后可以用于**一束**。返回从花园中制作花束`m`所需等待的最少天数。如果不可能返回-1。

bloomDay = [1,10,3,10,2]， index =0 的💐会在第一天绽放，index = 1的花束在第十天绽放，以此类推。

bloomDay = [7,7,7,7,12,7,7]，在第七天，除了index=4的花束会在第12天绽放，[**7,7,7**,7,12,7,7]，由于K=3，意味着需要三个相邻的花园才能组成一组，显然最后两个不能和index为4的花束组合。所以必须等12天，[**7,7,7**,*7*,**12,7,7**]，才能组成三个花束为一组的🌹。



`isWork`方法是用于判断当前天数mid是否符合条件，比如[7,7,7,7,12,7,7]，前三个7是符合条件的，但是后面两个不能组成花束。

### 💡Solution

```JAVA
    public int minDays(int[] bloomDay, int m, int k) {
        long mul = m * (long) k;
        if (mul > bloomDay.length) return -1;
        int left = 1, right = 1;
        for (int i = 0; i < bloomDay.length; i++) {
            right = Math.max(right, bloomDay[i]);
            left = Math.min(left, bloomDay[i]);
        }
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (isWork(mid, bloomDay, k, m)) {
                right = mid;
            } else
                left = mid + 1;
        }
        return left;
    }

    private boolean isWork(int mid, int[] bloomDay, int k, int m) {
        int tmpDays = 0;
        for (int i = 0; i < bloomDay.length; i++) {
            if (bloomDay[i] > mid) tmpDays = 0;
            else {
                tmpDays++;
                if (tmpDays == k) {
                    m--;
                    tmpDays = 0;
                }
            }
        }
        return m <= 0;
    }
```

下面👇再分享一道相似的问题。

## 💙1760. Minimum Limit of Balls in a Bag <font size="3" color="#FF5733">Medium</font> 【相似问题】

You are also given an integer `maxOperations`.

You can perform the following operation at most `maxOperations` times:

- Take any bag of balls and divide it into two new bags with a positive number of balls.
  - For example, a bag of `5` balls can become two new bags of `1` and `4` balls, or two new bags of `2` and `3` balls.

Your penalty is the **maximum** number of balls in a bag. You want to **minimize** your penalty after the operations.

Return *the minimum possible penalty after performing the operations*.

**Example 1:**

```
Input: nums = [9], maxOperations = 2
Output: 3
Explanation: 
- Divide the bag with 9 balls into two bags of sizes 6 and 3. [9] -> [6,3].
- Divide the bag with 6 balls into two bags of sizes 3 and 3. [6,3] -> [3,3,3].
The bag with the most number of balls has 3 balls, so your penalty is 3 and you should return 3.
```

**Example 2:**

```
Input: nums = [2,4,8,2], maxOperations = 4
Output: 2
Explanation:
- Divide the bag with 8 balls into two bags of sizes 4 and 4. [2,4,8,2] -> [2,4,4,4,2].
- Divide the bag with 4 balls into two bags of sizes 2 and 2. [2,4,4,4,2] -> [2,2,2,4,4,2].
- Divide the bag with 4 balls into two bags of sizes 2 and 2. [2,2,2,4,4,2] -> [2,2,2,2,2,4,2].
- Divide the bag with 4 balls into two bags of sizes 2 and 2. [2,2,2,2,2,4,2] -> [2,2,2,2,2,2,2,2].
The bag with the most number of balls has 2 balls, so your penalty is 2, and you should return 2.
```

### 💡Solution

```java
public int minimumSize(int[] nums, int maxOperations) {
    int start = 1, end  = 1;
    for(int i : nums){
        end = Math.max(end,i);
    }
    while (start < end){
        int mid = start + (end - start)/2;
        int totalOperations = 0;
        for(int i : nums){
            totalOperations+=(i-1)/mid;
        }
        if(totalOperations>maxOperations){
            start=mid+1;
        } else{
            end=mid;
        }
    }
    return start;
}
```

## 💙 2358. Maximum Number of Groups Entering a Competition <font size="3" color="#FF5733">Medium</font>🤑贪心，二分

You are given a positive integer array `grades` which represents the grades of students in a university. You would like to enter **all** these students into a competition in **ordered** non-empty groups, such that the ordering meets the following conditions:

- The sum of the grades of students in the `ith` group is **less than** the sum of the grades of students in the `(i + 1)th` group, for all groups (except the last).
- The total number of students in the `ith` group is **less than** the total number of students in the `(i + 1)th` group, for all groups (except the last).

Return *the **maximum** number of groups that can be formed*.

**Example 1:**

```
Input: grades = [10,6,12,7,3,5]
Output: 3
Explanation: The following is a possible way to form 3 groups of students:
- 1st group has the students with grades = [12]. Sum of grades: 12. Student count: 1
- 2nd group has the students with grades = [6,7]. Sum of grades: 6 + 7 = 13. Student count: 2
- 3rd group has the students with grades = [10,3,5]. Sum of grades: 10 + 3 + 5 = 18. Student count: 3
It can be shown that it is not possible to form more than 3 groups.
```

**Example 2:**

```
Input: grades = [8,8]
Output: 1
Explanation: We can only form 1 group, since forming 2 groups would lead to an equal number of students in both groups.
```

**Constraints:**

- `1 <= grades.length <= 105`
- `1 <= grades[i] <= 105`

```java
public int maximumGroups(int[] grades) {
    int len = grades.length;
    int ans =(int) (Math.sqrt(1 + 8 * len) - 1) /2;
    return ans;
}
```

## 🔗 Refer links

https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/

http://www.youngbird97.top/view/detail/id/83098/category/article

https://leetcode.com/problems/koko-eating-bananas/

https://leetcode.com/problems/minimum-limit-of-balls-in-a-bag/

https://github.com/Amber916Young/leetcode-interview-practice/tree/master/src/BinarySearch