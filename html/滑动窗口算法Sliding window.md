# 滑动窗口算法 Sliding window

## 💙 159 Longest Substring with At Most Two Distinct Characters【会员题】

Given a string `s`, find the length of the longest substring `t` that contains **at most** `2` distinct characters.

**Example 1:**

```
Input: "eceba"
Output: 3
Explanation: t is "ece" which its length is 3.
```

**Example 2:**

```
Input: "ccaabbb"
Output: 5
Explanation: t is "aabbb" which its length is 5.
```

### 💡Solution

```java
  public int lengthOfLongestSubstringTwoDistinct(String s) {
        int left = 0, answer = 0;
        Map<Character, Integer> map = new HashMap<>();
        for (int i = 0; i < s.length(); i++) {
            char cur = s.charAt(i);
            map.put(cur, map.getOrDefault(cur, 0) + 1);
            while (map.size() > 2) {
                // 说明需要挪动left指针，map里要减去原指针位置的字符
                char deleteChar = s.charAt(left);
                int cur_num = map.get(deleteChar);
                if (cur_num - 1 == 0) map.remove(deleteChar);
                else map.put(deleteChar, cur_num - 1);
                left++;
            }
            // 获取窗口包含的字符个数,i-left +1 是窗口的大小
            answer = Math.max(answer, i - left + 1);
        }
        return answer;
    }
```

## 💙 longest substring with at most k distinct characters【会员题】

Given a string, find the length of the longest possible substring in it that has exactly K distinct characters. If there is no possible substring then print -1.

You can assume that K is less than or equal to the length of the given string.

**Example 1:**

```
Input: S = "aabacbebebe", K = 3
Output: 7
Explanation: "cbebebe" is the longest substring with 3 distinct characters.
```

**Example 2:**

```
Input: S = "aaaa", K = 2
Output: -1
Explanation: There's no substring with 2 distinct characters.
```

这是leetcode一道会员题，因为我没有会员所以不放链接了。使用到的算法是Sliding window。主要是记录一下通用模板。

[![zA7MGj.md.png](https://s1.ax1x.com/2022/11/15/zA7MGj.md.png)](https://imgse.com/i/zA7MGj)



[![zA7KiQ.md.png](https://s1.ax1x.com/2022/11/15/zA7KiQ.md.png)](https://imgse.com/i/zA7KiQ)

<font color="#C70039">**题目意思是，找到存在K个不同的字符组成的最长字符串。Sliding window算法本质也是two pointers**</font>

其实就是当窗口包含的独立字母大于K的时候，把窗口向右移动。当然可以使用Hashmap来存储扫描过的字符，也能使用HashSet来存储唯一的字符，时间复杂度不变。

### 💡Solution

```java
 public int lengthOfLongestSubstringKDistinct(String s,int k) {
        int left = 0, answer = 0;
        Map<Character, Integer> map = new HashMap<>();
        for (int i = 0; i < s.length(); i++) {
            char cur = s.charAt(i);
            map.put(cur, map.getOrDefault(cur, 0) + 1);
            while (map.size() > k) {
                // 说明需要挪动left指针，map里要减去原指针位置的字符
                char deleteChar = s.charAt(left);
                int cur_num = map.get(deleteChar);
                if (cur_num - 1 == 0) map.remove(deleteChar);
                else map.put(deleteChar, cur_num - 1);
                //窗口右移
                left++;
            }
            // 获取窗口包含的字符个数,i-left +1 是窗口的大小
            answer = Math.max(answer, i - left + 1);
        }
        return answer;
    }
```

## 💙 3. Longest Substring Without Repeating Characters

Given a string `s`, find the length of the **longest** **substring** without repeating characters. 

**Example 1:**

```
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.
```

**Example 2:**

```
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
```

**Example 3:**

```
Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring. 
```

**Constraints:**

- `0 <= s.length <= 5 * 104`
- `s` consists of English letters, digits, symbols and spaces.

### 💡Solution

```java
   public int lengthOfLongestSubstring(String s) {
         Set<Character> set = new HashSet<>();
        int left =0,answer = 0;
        for (int i = 0; i < s.length(); i++) {
            char cur = s.charAt(i);
            while (!set.add(cur)) { // 当然也可以用contians(cur) , 这句话的意思就是如果set里已经存在了cur字符，进入循环移动窗口。
                char deleteChar = s.charAt(left);
                set.remove(deleteChar);
                left++;
            }
            answer = Math.max(answer, i - left + 1);
        }
        return answer;
    }
//method2
    public int lengthOfLongestSubstring(String s) {
      Set<Character> set = new HashSet<>();
        int left =0,answer = 0;
        for (int i = 0; i < s.length(); i++) {
            char cur = s.charAt(i);
            while (set.contains(cur)) {
                char deleteChar = s.charAt(left);
                set.remove(deleteChar);
                left++;
            }
            set.add(cur);
            answer = Math.max(answer, i - left + 1);
        }
        return answer;
    }
```

## 🔗 Refer links

https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/