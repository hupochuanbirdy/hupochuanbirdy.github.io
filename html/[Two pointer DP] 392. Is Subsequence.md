# [Two pointer DP] 392. Is Subsequence

## 💙 【392】Is Subsequence <font size="3" color="#4FE915">easy</font>

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

 **Follow up:** Suppose there are lots of incoming `s`, say `s1, s2, ..., sk` where `k >= 109`, and you want to check one by one to see if `t` has its subsequence. In this scenario, how would you change your code?

### 🚦Related Topics

- [x] String
- [x] Two pointers
- [x] Dynamic Programming

### 💡Solution

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

### 💡Solution DP

```java
public boolean isSubsequence(String s, String t) {
    char[] s1 = s.toCharArray();
    char[] t1 = t.toCharArray();
    int n = s1.length;
    int m = t1.length;
    int[][] dp = new int[n + 1][m + 1];
    for (int i = 1; i < n + 1; i++) {
        for (int j = 1; j < m + 1; j++) {
            if (s1[i - 1] == t1[j - 1]) {
                dp[i][j] = 1 + dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }

        }
    }
    return dp[n][m] == s1.length;
}
```

# 🔗 Refer links

https://leetcode.com/problems/is-subsequence/