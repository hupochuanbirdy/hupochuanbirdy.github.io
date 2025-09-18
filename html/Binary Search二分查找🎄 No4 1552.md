# Binary Search二分查找🎄 No4 1552

## Preview：本章的所有题目和Koko吃香蕉是一个类型

## 💙 【1552】 Magnetic Force Between Two Balls <font size="3" color="#FF5733">Medium</font> 

In the universe Earth C-137, Rick discovered a special form of magnetic force between two balls if they are put in his new invented basket. Rick has `n` empty baskets, the `ith` basket is at `position[i]`, Morty has `m` balls and needs to distribute the balls into the baskets such that the **minimum magnetic force** between any two balls is **maximum**.

Rick stated that magnetic force between two different balls at positions `x` and `y` is `|x - y|`.

Given the integer array `position` and the integer `m`. Return *the required force*.

**Example 1:**

![img](https://assets.leetcode.com/uploads/2020/08/11/q3v1.jpg)

```
Input: position = [1,2,3,4,7], m = 3
Output: 3
Explanation: Distributing the 3 balls into baskets 1, 4 and 7 will make the magnetic force between ball pairs [3, 3, 6]. The minimum magnetic force is 3. We cannot achieve a larger minimum magnetic force than 3.
```

**Example 2:**

```
Input: position = [5,4,3,2,1,1000000000], m = 2
Output: 999999999
Explanation: We can use baskets 1 and 1000000000. 
```

**Constraints:**

- `n == position.length`
- `2 <= n <= 105`
- `1 <= position[i] <= 109`
- All integers in `position` are **distinct**.
- `2 <= m <= position.length`

### 🧐一些分析

和1482 Minimum Number of Days to Make m Bouquets有点相似。

简单来说，就是每个桶里放的小球之间的间距最大化。按照eg1，三个球间隔一个可以放，最小的间隔一定是1，问题是求Max最大的间隔，假设固定一个小球，第一个小球和第二个小球间隔距离大于等于 mid，那么等于说第二个小球的位置确定了，那么继续确定后面的小球` placed = position[i];`, 确定的次数count，必须等于m，如果小于，意味着当前的mid距离过大，数组放不下。

这题还有一个需要注意⚠️的，position数组不是按正序排列的，所以需要sort。

例如：position = [1,2,3,4,7], m = 3 

假设三个球编号 a b c

```java
 int start = 1;
 int end = position[position.length - 1] - position[0]; // 7-1 = 6
 int mid = start + (end - start) / 2; // 1 + (6-1) / 2 = 3
```

首先固定第一个小球a, 第一次的mid = 3

| 循环次数 |  1   |  2   |  3   |  4   |  7   | 距离（mid） |                      |
| :------: | :--: | :--: | :--: | :--: | :--: | :---------: | -------------------- |
|    1     |  a   |      |      |      |      |      3      | a 固定               |
|    1     |  a   |  b   |      |      |      |      3      | b 不满足，因为距离<3 |
|    1     |  a   |      |  b   |      |      |      3      | b 不满足，因为距离<3 |
|    1     |  a   |      |      |  b   |      |      3      | b 满足，固定         |
|    1     |  a   |      |      |  b   |  c   |      3      | c满足，固定          |

第一轮循环都满足条件，count = m.

**那么不满足条件的**，假设mid = 4

| 循环次数 |  1   |  2   |  3   |  4   |  7   | 距离（mid） |                      |
| :------: | :--: | :--: | :--: | :--: | :--: | :---------: | -------------------- |
|    1     |  a   |      |      |      |      |      4      | a 固定               |
|    1     |  a   |  b   |      |      |      |      4      | b 不满足，因为距离<4 |
|    1     |  a   |      |  b   |      |      |      4      | b 不满足，因为距离<4 |
|    1     |  a   |      |      |  b   |      |      4      | b 不满足，因为距离<4 |
|    1     |  a   |      |      |      |  b   |      4      | b满足，固定          |

显然mid=4时，只有两个球能固定位置，mid距离过大，缩小右➡️边界。

这就是二分查找的作用了。

**<font size="3" color="#C70039">另外一个重点：start 和 end左右边界需要根据题意确定，并非每次同一个套路，只需要确定好左右边界，接下来的事情就交给helper函数了</font>** 

### 💡Solution

```java
boolean isPossible(int[] position, int m, int mid) {
    int count = 1;
    int placed = position[0];
    for (int i = 1; i < position.length; i++) {
        if (position[i] - placed >= mid) {
            placed = position[i];
            count++;
        }
        if (count == m) {
            return true;
        }
    }
    return false;
}

public int maxDistance(int[] position, int m) {
    Arrays.sort(position);
    int start = 1;
    int end = position[position.length - 1] - position[0];
    while (start <= end) {
        int mid = start + (end - start) / 2;
        if (isPossible(position, m, mid)) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return start - 1;
}
```

## 💙 【2064】 Minimized Maximum of Products Distributed to Any Store  <font size="3" color="#FF5733">Medium</font> 

You are given an integer `n` indicating there are `n` specialty retail stores. There are `m` product types of varying amounts, which are given as a **0-indexed** integer array `quantities`, where `quantities[i]` represents the number of products of the `ith` product type.

You need to distribute **all products** to the retail stores following these rules:

- A store can only be given **at most one product type** but can be given **any** amount of it.
- After distribution, each store will have been given some number of products (possibly `0`). Let `x` represent the maximum number of products given to any store. You want `x` to be as small as possible, i.e., you want to **minimize** the **maximum** number of products that are given to any store.

Return *the minimum possible* `x`.

**Example 1:**

```
Input: n = 6, quantities = [11,6]
Output: 3
Explanation: One optimal way is:
- The 11 products of type 0 are distributed to the first four stores in these amounts: 2, 3, 3, 3
- The 6 products of type 1 are distributed to the other two stores in these amounts: 3, 3
The maximum number of products given to any store is max(2, 3, 3, 3, 3, 3) = 3.
```

**Example 2:**

```
Input: n = 7, quantities = [15,10,10]
Output: 5
Explanation: One optimal way is:
- The 15 products of type 0 are distributed to the first three stores in these amounts: 5, 5, 5
- The 10 products of type 1 are distributed to the next two stores in these amounts: 5, 5
- The 10 products of type 2 are distributed to the last two stores in these amounts: 5, 5
The maximum number of products given to any store is max(5, 5, 5, 5, 5, 5, 5) = 5.
```

**Example 3:**

```
Input: n = 1, quantities = [100000]
Output: 100000
Explanation: The only optimal way is:
- The 100000 products of type 0 are distributed to the only store.
The maximum number of products given to any store is max(100000) = 100000.
```

**Constraints:**

- `m == quantities.length`
- `1 <= m <= n <= 105`
- `1 <= quantities[i] <= 105`

### 题目意思🤔？

看起来有点绕，大致意思是有n个商店，每个商店可以分配一些`quantities`里的货物，货物的数量要满足所有商店都能分配，如果不能完全分配给n个商店，那么平均分配的值需要缩小。

假设货物[11,6], 分别有 11个和6个，要分配给6个商店，那么最大的分配值是多少？

货物📦11: 假设每个商店分配一个，最后一个商店6个，假设每个商店分配两个，最后一个商店1...

货物📦6: 假设每个商店分配一个，刚好分配完成。

分配一个的结果是，6 + 6 >= 商店总数，这个结果太大了，需要left 指针➡️移动。最好的情况是 两个货物分配的总数可以刚好等于商店总数。

### 💡Solution

```java
static public int minimizedMaximum(int n, int[] quantities) {
    int start = 1;
    int end = Integer.MAX_VALUE / 2;
    while (start < end) {
        int mid = start + (end - start) / 2;
        if (isHelper(mid, quantities, n)) {
            end = mid;  //如果分配结果 > 商店总数，那么mid也可能是答案，所以end = mid
        } else {
            start = mid + 1; // 如果分配总结果 < 商店总数
        }
    }
    return start;
}

static boolean isHelper(int mid, int[] quantities, int n) {
    int count = 0;
    for (int i : quantities) {
        if (i % mid == 0) {
            count += i / mid;
        } else
            count += i / mid + 1;
    }
    return count <= n;
}
```

# 📚【举一反三】📝

## 🎄 【1011】 Capacity To Ship Packages Within D Days  <font size="3" color="#FF5733">Medium</font> 

A conveyor belt has packages that must be shipped from one port to another within `days` days.

The `ith` package on the conveyor belt has a weight of `weights[i]`. Each day, we load the ship with packages on the conveyor belt (in the order given by `weights`). We may not load more weight than the maximum weight capacity of the ship.

Return the least weight capacity of the ship that will result in all the packages on the conveyor belt being shipped within `days` days.

**Example 1:**

```
Input: weights = [1,2,3,4,5,6,7,8,9,10], days = 5
Output: 15
Explanation: A ship capacity of 15 is the minimum to ship all the packages in 5 days like this:
1st day: 1, 2, 3, 4, 5
2nd day: 6, 7
3rd day: 8
4th day: 9
5th day: 10

Note that the cargo must be shipped in the order given, so using a ship of capacity 14 and splitting the packages into parts like (2, 3, 4, 5), (1, 6, 7), (8), (9), (10) is not allowed.
```

**Example 2:**

```
Input: weights = [3,2,2,4,1,4], days = 3
Output: 6
Explanation: A ship capacity of 6 is the minimum to ship all the packages in 3 days like this:
1st day: 3, 2
2nd day: 2, 4
3rd day: 1, 4
```

**Example 3:**

```
Input: weights = [1,2,3,1,1], days = 4
Output: 3
Explanation:
1st day: 1
2nd day: 2
3rd day: 3
4th day: 1, 1
```

**Constraints:**

- `1 <= days <= weights.length <= 5 * 104`
- `1 <= weights[i] <= 500`

### 💡Good Solution 😄

**<font size="3" color="#C70039">本题的难点在于，start 和 end 如何确定✅，一开始我直接end = sum（arr)， start = 1， 但其实是不对的，start的位置必须是weights数组里最大的值！！！</font>** 

```java
public int shipWithinDays(int[] weights, int days) {
    int start = 0;
    int end = 0;
    for (int i = 0; i < weights.length; i++) {
        if (weights[i] > start) start = weights[i]; // max
        end += weights[i];  // sum
    }
    while (start < end) {
        int mid = start + (end - start) / 2;
        if (isPossible(mid, weights, days)) {
            end = mid;
        } else {
            start = mid + 1;
        }
    }
    return start;
}

private boolean isPossible(int mid, int[] weights, int days) {
    int count = 0;
    for (int i : weights) {
        if (count + i <= mid) {
            count += i;
        } else {
            days--;
            if (days < 0) return false;
            count = i;
        }
    }
    days--;
    return days >= 0;
}
```

## 🎄【 2226】 Maximum Candies Allocated to K Children

You are given a **0-indexed** integer array `candies`. Each element in the array denotes a pile of candies of size `candies[i]`. You can divide each pile into any number of **sub piles**, but you **cannot** merge two piles together.

You are also given an integer `k`. You should allocate piles of candies to `k` children such that each child gets the **same** number of candies. Each child can take **at most one** pile of candies and some piles of candies may go unused.

Return *the **maximum number of candies** each child can get.*

**Example 1:**

```
Input: candies = [5,8,6], k = 3
Output: 5
Explanation: We can divide candies[1] into 2 piles of size 5 and 3, and candies[2] into 2 piles of size 5 and 1. We now have five piles of candies of sizes 5, 5, 3, 5, and 1. We can allocate the 3 piles of size 5 to 3 children. It can be proven that each child cannot receive more than 5 candies.
```

**Example 2:**

```
Input: candies = [2,5], k = 11
Output: 0
Explanation: There are 11 children but only 7 candies in total, so it is impossible to ensure each child receives at least one candy. Thus, each child gets no candy and the answer is 0. 
```

**Constraints:**

- `1 <= candies.length <= 105`
- `1 <= candies[i] <= 107`
- `1 <= k <= 1012`

### 💡Good Solution 😄

⚠️注意每个小朋友都必须分配同一数量的蜡烛，可以存在没有分配完的蜡烛。此处的`isPossible`方法用于判断是否可以分配完，如果可以分配完，那么需要右移指针，为啥呢？数量为mid都能分配完，说明答案可以比mid大。

```java
public int maximumCandies(int[] candies, long k) {
    int start = 1;
    int end = 1;
    long sum = 0;
    for (int i : candies) {
        end = Math.max(end, i);
        sum += i;
    }
    int res = 0;
    if (sum < k) return 0;
    while (start <= end) {
        int mid = start + (end - start) / 2;
        if (isPossible(mid, candies, k)) {
            res = Math.max(res, mid);
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
    return res;
}

private boolean isPossible(int mid, int[] candies, long k) {
    long count = 0;
    for (int i = 0; i < candies.length; i++) {
        count += candies[i] / mid;
    }
    return count >= k;
}
```

## 🎄【1870】Minimum Speed to Arrive on Time

You are given a floating-point number `hour`, representing the amount of time you have to reach the office. To commute to the office, you must take `n` trains in sequential order. You are also given an integer array `dist` of length `n`, where `dist[i]` describes the distance (in kilometers) of the `ith` train ride.

Each train can only depart at an integer hour, so you may need to wait in between each train ride.

- For example, if the `1st` train ride takes `1.5` hours, you must wait for an additional `0.5` hours before you can depart on the `2nd` train ride at the 2 hour mark.

Return *the **minimum positive integer** speed **(in kilometers per hour)** that all the trains must travel at for you to reach the office on time, or* `-1` *if it is impossible to be on time*.

Tests are generated such that the answer will not exceed `107` and `hour` will have **at most two digits after the decimal point**.

**Example 1:**

```
Input: dist = [1,3,2], hour = 6
Output: 1
Explanation: At speed 1:
- The first train ride takes 1/1 = 1 hour.
- Since we are already at an integer hour, we depart immediately at the 1 hour mark. The second train takes 3/1 = 3 hours.
- Since we are already at an integer hour, we depart immediately at the 4 hour mark. The third train takes 2/1 = 2 hours.
- You will arrive at exactly the 6 hour mark.
```

**Example 2:**

```
Input: dist = [1,3,2], hour = 2.7
Output: 3
Explanation: At speed 3:
- The first train ride takes 1/3 = 0.33333 hours.
- Since we are not at an integer hour, we wait until the 1 hour mark to depart. The second train ride takes 3/3 = 1 hour.
- Since we are already at an integer hour, we depart immediately at the 2 hour mark. The third train takes 2/3 = 0.66667 hours.
- You will arrive at the 2.66667 hour mark.
```

**Example 3:**

```
Input: dist = [1,3,2], hour = 1.9
Output: -1
Explanation: It is impossible because the earliest the third train can depart is at the 2 hour mark. 
```

**Constraints:**

- `n == dist.length`
- `1 <= n <= 105`
- `1 <= dist[i] <= 105`
- `1 <= hour <= 109`
- There will be at most two digits after the decimal point in `hour`.

### 💡Good Solution 😄

```java
public int minSpeedOnTime(int[] dist, double hour) {
    int start = 1;
    int end = 10000000;
    if((int)Math.ceil(hour) < dist.length) return -1;
    while (start < end){
        int mid = start + (end - start) / 2;
        if(isPossible(mid, hour,dist)){
            end = mid;
        }else {
            start = mid + 1;
        }
    }
    return start;
}

private boolean isPossible(int mid, double hour, int[] dist) {
    double speed = 0.0;
    for (int i =0;i<dist.length;i++){
        speed =Math.ceil(speed);
        speed += (dist[i] * 1.0) / (mid * 1.0);
    }
    return speed <= hour;
}
```

## 🎄 【2187】 Minimum Time to Complete Trips

You are given an array `time` where `time[i]` denotes the time taken by the `ith` bus to complete **one trip**.

Each bus can make multiple trips **successively**; that is, the next trip can start **immediately after** completing the current trip. Also, each bus operates **independently**; that is, the trips of one bus do not influence the trips of any other bus.

You are also given an integer `totalTrips`, which denotes the number of trips all buses should make **in total**. Return *the **minimum time** required for all buses to complete **at least*** `totalTrips` *trips*.

**Example 1:**

```
Input: time = [1,2,3], totalTrips = 5
Output: 3
Explanation:
- At time t = 1, the number of trips completed by each bus are [1,0,0]. 
  The total number of trips completed is 1 + 0 + 0 = 1.
- At time t = 2, the number of trips completed by each bus are [2,1,0]. 
  The total number of trips completed is 2 + 1 + 0 = 3.
- At time t = 3, the number of trips completed by each bus are [3,1,1]. 
  The total number of trips completed is 3 + 1 + 1 = 5.
So the minimum time needed for all buses to complete at least 5 trips is 3.
```

**Example 2:**

```
Input: time = [2], totalTrips = 1
Output: 2
Explanation:
There is only one bus, and it will complete its first trip at t = 2.
So the minimum time needed to complete 1 trip is 2.
```

**Constraints:**

- `1 <= time.length <= 105`
- `1 <= time[i], totalTrips <= 107`

### 💡Good Solution 😄

**<font size="3" color="#C70039">本题的难点在于， end 如何确定✅，返回的是long，end 直接=  Long.MAX_VALUE</font>** 

```java
    public long minimumTime(int[] time, int totalTrips) {
        long start = 1;
        long end = Long.MAX_VALUE;
        while (start < end) {
            long mid = start + (end - start) / 2;
            if(isPossible(mid, time ,totalTrips)){
                end = mid;
            }else {
                start = mid + 1;
            }
        }
        return start;
    }

    private boolean isPossible(long mid, int[] time, int totalTrips) {
        long total = 0;
        for (int i : time){
            total += mid / i; // 向下取整，和上题刚好相反
            if (total >= totalTrips) return true; 
        }
        return false;
    }
```

# 🎉 本篇中未列举的相似问题

【已整理】1760. Minimum Limit of Balls in a Bag

【已整理】1482 Minimum Number of Days to Make m Bouquets

 http://www.youngbird97.top/view/detail/id/83100/category/article



# 🔗 Refer links

https://leetcode.com/problems/magnetic-force-between-two-balls/

https://leetcode.com/problems/minimized-maximum-of-products-distributed-to-any-store/

https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/

https://leetcode.com/problems/maximum-candies-allocated-to-k-children/

https://leetcode.com/problems/minimum-time-to-complete-trips/



http://www.youngbird97.top/view/detail/id/83100/category/article

https://github.com/Amber916Young/leetcode-interview-practice/tree/master/src/BinarySearch

