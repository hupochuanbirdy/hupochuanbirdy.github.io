# 🧐Mock Assessment  859 Buddy Strings

## 859. Buddy Strings <font size="3" color="02C850">Easy</font>

Given two strings `s` and `goal`, return `true` *if you can swap two letters in* `s` *so the result is equal to* `goal`*, otherwise, return* `false`*.*

Swapping letters is defined as taking two indices `i` and `j` (0-indexed) such that `i != j` and swapping the characters at `s[i]` and `s[j]`.

- For example, swapping at indices `0` and `2` in `"abcd"` results in `"cbad"`.

**Example 1:**

```
Input: s = "ab", goal = "ba"
Output: true
Explanation: You can swap s[0] = 'a' and s[1] = 'b' to get "ba", which is equal to goal.
```

**Example 2:**

```
Input: s = "ab", goal = "ab"
Output: false
Explanation: The only letters you can swap are s[0] = 'a' and s[1] = 'b', which results in "ba" != goal.
```

**Example 3:**

```
Input: s = "aa", goal = "aa"
Output: true
Explanation: You can swap s[0] = 'a' and s[1] = 'a' to get "aa", which is equal to goal. 
```

**Constraints:**

- `1 <= s.length, goal.length <= 2 * 10^4`
- `s` and `goal` consist of lowercase letters.

### ✨个人分析

一开始O(n^2)算法直接TLE，看到数据量，那么通过的时间在O(n)左右，那么只能走一遍。twopointers，这是我看到最好的答案。

首先排除ab ab这种答案，因为一样，但是aa 和 aa 就不能排除了，个人觉得这里做了一些限制。 `s.chars().distinct().count() != s.length()`

two pointers 两个方向头尾收缩，直到有和goal chatAt(i)不一样的存在，那么！！！直接交换遇到的第一个不同的字符位置。

因为只允许交换一次，"abac" "abad"，这个答案就是**false**

 "abcd" "badc" 也是 **false**，因为要交换两次。

### 💡Solution

```java
   public boolean buddyStrings(String s, String goal) {
        if(s.length() != goal.length()) {
            return false;
        }
        char[] sArray = s.toCharArray();
        char[] gArray = goal.toCharArray();
        if(s.equals(goal)){
            if(s.chars().distinct().count() != s.length()){
                return true;
            }else{
                return false;
            }
        }

        int l = 0, r = s.length() - 1;
        while (sArray[l] == gArray[l] && l < r) {
            l++;
        }
        while (sArray[r] == gArray[r] && l < r) {
            r--;
        }
        char tmp = sArray[l];
        sArray[l] = sArray[r];
        sArray[r] = tmp;

        while (l <= r){
            if(sArray[l] != gArray[l] || sArray[r] != gArray[r] ){
                return false;
            }
            l++;
            r--;
        }
        return true;
    }
```

# 🔗 Refer links

https://leetcode.com/problems/buddy-strings/description/