# Binary Search二分查找🎄 No5 第五弹

### 前言

如果对此模板不熟悉的可以看【[Binary Search二分查找🎄 No4，第四弹](http://www.youngbird97.top/view/detail/id/83103/category/article)】内容。虽说相似的问题还有两个涉及到dynamic programming的，奈何我的DP知之甚少，之后统一整理DP的合集。

## 💙【1898】 Maximum Number of Removable Characters <font size="3" color="#FF5733">Medium</font>

You are given two strings `s` and `p` where `p` is a **subsequence** of `s`. You are also given a **distinct 0-indexed** integer array `removable` containing a subset of indices of `s` (`s` is also **0-indexed**).

You want to choose an integer `k` (`0 <= k <= removable.length`) such that, after removing `k` characters from `s` using the **first** `k` indices in `removable`, `p` is still a **subsequence** of `s`. More formally, you will mark the character at `s[removable[i]]` for each `0 <= i < k`, then remove all marked characters and check if `p` is still a subsequence.

Return *the **maximum*** `k` *you can choose such that* `p` *is still a **subsequence** of* `s` *after the removals*.

A **subsequence** of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters. 

**Example 1:**

```
Input: s = "abcacb", p = "ab", removable = [3,1,0]
Output: 2
Explanation: After removing the characters at indices 3 and 1, "abcacb" becomes "accb".
"ab" is a subsequence of "accb".
If we remove the characters at indices 3, 1, and 0, "abcacb" becomes "ccb", and "ab" is no longer a subsequence.
Hence, the maximum k is 2.
```

**Example 2:**

```
Input: s = "abcbddddd", p = "abcd", removable = [3,2,1,4,5,6]
Output: 1
Explanation: After removing the character at index 3, "abcbddddd" becomes "abcddddd".
"abcd" is a subsequence of "abcddddd".
```

**Example 3:**

```
Input: s = "abcab", p = "abc", removable = [0,1,2,3,4]
Output: 0
Explanation: If you remove the first index in the array removable, "abc" is no longer a subsequence. 
```

**Constraints:**

- `1 <= p.length <= s.length <= 105`
- `0 <= removable.length < s.length`
- `0 <= removable[i] < s.length`
- `p` is a **subsequence** of `s`.
- `s` and `p` both consist of lowercase English letters.
- The elements in `removable` are **distinct**.

### 📝个人分析

老实说，一开始并没有懂怎么用binary search去思考。。。。。数组removable的index是按照顺序删除掉，似乎可以用暴力解锁，显然，面试这么写就挂了。看了一眼提示，嗯，似乎知道怎么做了。此题只需要binary search K的值就好了，那么start 和 end左右边界非常好确定，0 和 removable数组的长度就是边界条件。

**例子1， s = "abcacb", p = "ab", removable = [3,1,0]，start =0 end = 3**

假设第一次循环 mid=1, 删除到第1个removable数组，也就是删除3

| Loop |   3    |   1    |   0    | mid  |          s           |  p   | 是否有子串 |
| :--: | :----: | :----: | :----: | :--: | :------------------: | :--: | :--------: |
|  1   | Remove |        |        |  1   |        bcacb         |  ab  |    存在    |
|  2   | Remove | Remove |        |  2   |         accb         |  ab  |    存在    |
|  3   | Remove | Remove | Remove |  3   | **ab**c**a**cb = ccb |  ab  |   不存在   |

实际上第二次循环就已经跳出循环得出答案了。

### 🕵️官方提示

#### 🔔 Hint 1

First, we need to think about solving an easier problem, If we remove a set of indices from the string does P exist in S as a subsequence

#### 🔔 Hint 2

We can binary search the K and check by solving the above problem.

### 💡Solution

```java
public int maximumRemovals(String s, String p, int[] removable) {
    int start = 0;
    int end = removable.length;
    int ans = 0;
    while (start <= end) {
        int mid = start + (end - start) / 2;
        if(isPossible(mid, s ,p,removable)){
            start = mid + 1;
            ans = mid;
        }else {
            end = mid - 1;
        }
    }
    return ans;
}

private boolean isPossible(int mid, String s, String p, int[] removable) {
    StringBuilder sb = new StringBuilder();
    Set<Integer> set = new HashSet<>();
    for (int i=0; i < mid;i++){
        int remove_index = removable[i];
        set.add(remove_index);
    }
    for(int j=0;j<s.length();j++){
        if(!set.contains(j)){
            sb.append(s.charAt(j));
        }
    }
    // check is substr
    return isSubsequence(p,sb.toString());
}

// two pointers
public boolean isSubsequence(String s, String t) {
    char[] s1 = s.toCharArray();
    char[] t1 = t.toCharArray();
    int j =0;
    for(int i = 0; i < t1.length; i++){
        if(j >=  s1.length) break;
        if(t1[i] == s1[j]) j++;
    }
    return j>=s1.length;
}
```

#### 📚【买一送一】isSubsequence方法来源： 392. Is Subsequence

使用two pointer方法来确定字符串中是否存在字串。

Given two strings `s` and `t`, return `true` *if* `s` *is a **subsequence** of* `t`*, or* `false` *otherwise*.

A **subsequence** of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., `"ace"` is a subsequence of `"abcde"` while `"aec"` is not).

**Example 1:**

```
Input: s = "abc", t = "ahbgdc"
Output: true
```

**Example 2:**

```
Input: s = "axc", t = "ahbgdc"
Output: false
```

**Constraints:**

- `0 <= s.length <= 100`
- `0 <= t.length <= 104`
- `s` and `t` consist only of lowercase English letters.

#### 💡Solution💡

```java
public boolean isSubsequence(String s, String t) {
   char[] s1 = s.toCharArray();
    char[] t1 = t.toCharArray();
    int j =0;
    for(int i = 0; i < t1.length; i++){
        if(j >=  s1.length) break;
        if(t1[i] == s1[j]) j++;
    }
    return j>=s1.length;
}
```

## 💙【2439】Minimize Maximum of Array <font size="3" color="#FF5733">Medium</font>

You are given a **0-indexed** array `nums` comprising of `n` non-negative integers.

In one operation, you must:

- Choose an integer `i` such that `1 <= i < n` and `nums[i] > 0`.
- Decrease `nums[i]` by 1.
- Increase `nums[i - 1]` by 1.

Return *the **minimum** possible value of the **maximum** integer of* `nums` *after performing **any** number of operations*.

**Example 1:**

```
Input: nums = [3,7,1,6]
Output: 5
Explanation:
One set of optimal operations is as follows:
1. Choose i = 1, and nums becomes [4,6,1,6].
2. Choose i = 3, and nums becomes [4,6,2,5].
3. Choose i = 1, and nums becomes [5,5,2,5].
The maximum integer of nums is 5. It can be shown that the maximum number cannot be less than 5.
Therefore, we return 5.
```

**Example 2:**

```
Input: nums = [10,1]
Output: 10
Explanation:
It is optimal to leave nums as is, and since 10 is the maximum value, we return 10.
```

**Constraints:**

- `n == nums.length`
- `2 <= n <= 105`
- `0 <= nums[i] <= 109`

### 📝个人分析

**例子1. nums = [3,7,1,6]**

假设 把数组中的数字看成高度不一的大楼，有些楼太高，有些楼太矮，现在想把每个大楼修的平均一些。

如果希望大楼的高度尽量靠近4（**mid = 4**），那么这个结果可能吗？高度本身大于mid的我们可以当作buffer，意思是我可以把buffer作为捐献的部分补给其他位置，如果buffer本身不够补了，那么说明mid高了，需要缩紧右👉边界。

| mid  |  3   |  7   | 1    |  6   | buffer |                                       |
| :--: | :--: | :--: | ---- | :--: | :----: | :-----------------------------------: |
|  4   |  1   |  -3  | 2    |  -2  |  余2   |      说明高度可以到达3，还有多余      |
|  6   |  3   |  -1  | 5    |  0   |   -7   | 只有高度7能补其他的，但buffer显然不够 |
|  5   |  2   |  -2  | 4    |  -1  |   -3   |  这是最好的结果，3，7，6都达到5高度   |

### 💡Solution

```java
public int minimizeArrayValue(int[] nums) {
    int start = 0;
    int end = (int) 1e9;
    int ans = 0;
    while (start <= end) {
        int mid = start + (end - start) / 2;
        if (isPossible(mid, nums)) {
            end = mid - 1;
            ans = mid;
        } else {
            start = mid + 1;
        }
    }
    return  ans;
}

private boolean isPossible(int target, int[] nums) {
    if (nums[0] > target) return false; // 如果第一个数字大于mid，根据题意，num[0]只能减，说明mid太高了，需要缩紧右边界
    long buffer = target - nums[0]; 
    for (int i = 1; i < nums.length; i++) {
        int d1 = nums[i] - target;
        if (nums[i] <= target) { // num[i] < mid, 那么需要补齐，补齐的高度就是d1 = nums[i] - target;
            buffer -= d1;
            continue;
        }
      //如果 补齐的高度mid，意味着可以新增到buffer中给其他数组中的值使用

      // 如果d1 > diff，需要补齐的高度大于buffer，那肯定没地方补了，需要下降mid高度，收缩右边界。
        if (d1 > diff) return false; 
       // d1 肯定是<0的，这样buffer-=d1 其实是 buffer += ｜d1｜
        buffer -= d1;  
    }
    return true;
}
```

# 🔗 Refer links

https://leetcode.com/problems/maximum-number-of-removable-characters/

https://leetcode.com/problems/is-subsequence/

https://leetcode.com/problems/minimize-maximum-of-array/

https://github.com/Amber916Young/leetcode-interview-practice/tree/master/src/BinarySearch



