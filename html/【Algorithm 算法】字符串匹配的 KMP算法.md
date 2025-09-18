# 【Algorithm 算法】字符串匹配的 KMP算法

## KMP算法

举例来说，有一个字符串"BBC ABCDAB ABCDABCDABDE"，我想知道，里面是否包含另一个字符串"ABCDABD"？

1.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050103.png)

首先，字符串"BBC ABCDAB ABCDABCDABDE"的第一个字符与搜索词"ABCDABD"的第一个字符，进行比较。因为B与A不匹配，所以搜索词后移一位。

2.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050104.png)

因为B与A不匹配，搜索词再往后移。

3.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050105.png)

就这样，直到字符串有一个字符，与搜索词的第一个字符相同为止。

4.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050106.png)

接着比较字符串和搜索词的下一个字符，还是相同。

5.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050107.png)

直到字符串有一个字符，与搜索词对应的字符不相同为止。

6.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050108.png)

这时，最自然的反应是，将搜索词整个后移一位，再从头逐个比较。这样做虽然可行，但是效率很差，因为你要把"搜索位置"移到已经比较过的位置，重比一遍。

7.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050107.png)

一个基本事实是，当空格与D不匹配时，你其实知道前面六个字符是"ABCDAB"。KMP算法的想法是，设法利用这个已知信息，不要把"搜索位置"移回已经比较过的位置，继续把它向后移，这样就提高了效率。

8.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050109.png)

怎么做到这一点呢？可以针对搜索词，算出一张《部分匹配表》（Partial Match Table）。这张表是如何产生的，后面再介绍，这里只要会用就可以了。

9.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050107.png)

已知空格与D不匹配时，前面六个字符"ABCDAB"是匹配的。查表可知，最后一个匹配字符B对应的"部分匹配值"为2，因此按照下面的公式算出向后移动的位数：

> 　　移动位数 = 已匹配的字符数 - 对应的部分匹配值

因为 6 - 2 等于4，所以将搜索词向后移动4位。

10.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050110.png)

因为空格与Ｃ不匹配，搜索词还要继续往后移。这时，已匹配的字符数为2（"AB"），对应的"部分匹配值"为0。所以，移动位数 = 2 - 0，结果为 2，于是将搜索词向后移2位。

11.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050111.png)

因为空格与A不匹配，继续后移一位。

12.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050112.png)

逐位比较，直到发现C与D不匹配。于是，移动位数 = 6 - 2，继续将搜索词向后移动4位。

13.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050113.png)

逐位比较，直到搜索词的最后一位，发现完全匹配，于是搜索完成。如果还要继续搜索（即找出全部匹配），移动位数 = 7 - 0，再将搜索词向后移动7位，这里就不再重复了。

14.

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050114.png)

### 部分匹配表

下面介绍《部分匹配表》是如何产生的。

首先，要了解两个概念："前缀"和"后缀"。 "前缀"指除了最后一个字符以外，一个字符串的全部头部组合；"后缀"指除了第一个字符以外，一个字符串的全部尾部组合。



![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050109.png)

"部分匹配值"就是"前缀"和"后缀"的最长的共有元素的长度。以"ABCDABD"为例，

> 　　－　"A"的前缀和后缀都为空集，共有元素的长度为0；
>
> 　　－　"AB"的前缀为[A]，后缀为[B]，共有元素的长度为0；
>
> 　　－　"ABC"的前缀为[A, AB]，后缀为[BC, C]，共有元素的长度0；
>
> 　　－　"ABCD"的前缀为[A, AB, ABC]，后缀为[BCD, CD, D]，共有元素的长度为0；
>
> 　　－　"ABCDA"的前缀为[A, AB, ABC, ABCD]，后缀为[BCDA, CDA, DA, A]，共有元素为"A"，长度为1；
>
> 　　－　"ABCDAB"的前缀为[A, AB, ABC, ABCD, ABCDA]，后缀为[BCDAB, CDAB, DAB, AB, B]，共有元素为"AB"，长度为2；
>
> 　　－　"ABCDABD"的前缀为[A, AB, ABC, ABCD, ABCDA, ABCDAB]，后缀为[BCDABD, CDABD, DABD, ABD, BD, D]，共有元素的长度为0。

![img](https://www.ruanyifeng.com/blogimg/asset/201305/bg2013050112.png)

"部分匹配"的实质是，有时候，字符串头部和尾部会有重复。比如，"ABCDAB"之中有两个"AB"，那么它的"部分匹配值"就是2（"AB"的长度）。搜索词移动的时候，第一个"AB"向后移动4位（字符串长度-部分匹配值），就可以来到第二个"AB"的位置。

### 获取最长prefix(部分匹配表)参考代码

```java
// KMP get the longest prefix and suffix
int[] getLPS(String s, int n) {
    int i = 1, len = 0;
    int[] lps = new int[n];
    while (i < n) {
        if (s.charAt(i) == s.charAt(len)) {
            lps[i++] = ++len;
        } else if (len == 0) {
            lps[i++] = 0;
        } else {
            len = lps[len - 1];
        }
    }
    return lps;
}
```

### KMP 参考代码

```java
    public int strStr(String haystack, String needle) {
        int i = 0, j = 0, n = haystack.length(), m = needle.length();
        
        if (m == 0)
            return 0;
        
        int[] lps = getLPS(needle, m);
        
        while (i < n) {
            if (haystack.charAt(i) == needle.charAt(j)) {
                i++; j++;
                // found the needle in haystack!
                if (j == m)
                    return i - m;
            } else if (j > 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
        
        return -1;
    }
    
```

# 😇 Practice[练习]

## 💙【28】Find the Index of the First Occurrence in a String <font size="3" color="#FF5733">Medium</font>

Given two strings `needle` and `haystack`, return the index of the first occurrence of `needle` in `haystack`, or `-1` if `needle` is not part of `haystack`.

**Example 1:**

```
Input: haystack = "sadbutsad", needle = "sad"
Output: 0
Explanation: "sad" occurs at index 0 and 6.
The first occurrence is at index 0, so we return 0.
```

**Example 2:**

```
Input: haystack = "leetcode", needle = "leeto"
Output: -1
Explanation: "leeto" did not occur in "leetcode", so we return -1.
```

**Constraints:**

- `1 <= haystack.length, needle.length <= 104`
- `haystack` and `needle` consist of only lowercase English characters.

### 🤒 Not too good solution

```java
public int strStr(String haystack, String needle) {
    if(needle.equals("")) return 0;
    if(haystack.indexOf(needle)>-1){
        return haystack.indexOf(needle);
    }else return -1;
}
```

### 💡 Solution KMP

```java
public static void main(String[] args) {
    strStr("sadbutsad","sad");
}
// KMP 算法
  public static int strStr(String haystack, String needle) {
        int[] prefix = getLPS(needle, needle.length());
        int i = 0, j = 0;
        int n = haystack.length();
        int m = needle.length();
        char[] charArr1 = haystack.toCharArray(),
                charArr2 = needle.toCharArray();
        while (i < n && j < m) {
            if (charArr1[i] == charArr2[j]) {
                i++;
                j++;
                if (j == m)
                    return i - m;
            } else if (j > 0) {
                j = prefix[j - 1];
            } else {
                i++;
            }
        }
       return -1;
    }

// 部分匹配表
private static int[] KMP(String needle) {
    int[] res = new int[needle.length()];
    char[] charArr = needle.toCharArray();
    int i = 0, j = 1;
    while (j < needle.length()) {
        if (charArr[i] == charArr[j]) {
            res[j] = i + 1;
            i++;
            j++;
        } else {
            if (i != 0) {
                i = res[i - 1];
            } else {
                res[j] = 0;
                j++;
            }
        }
    }
    return res;
}
```

### 🚦Related Topics

- [x] String 
- [x] Two pointers
- [x] String matching

## 💙【1910】Remove All Occurrences of a Substring <font size="3" color="#FF5733">Medium</font>

Given two strings `s` and `part`, perform the following operation on `s` until **all** occurrences of the substring `part` are removed:

- Find the **leftmost** occurrence of the substring `part` and **remove** it from `s`.

Return `s` *after removing all occurrences of* `part`.

A **substring** is a contiguous sequence of characters in a string.

**Example 1:**

```
Input: s = "daabcbaabcbc", part = "abc"
Output: "dab"
Explanation: The following operations are done:
- s = "daabcbaabcbc", remove "abc" starting at index 2, so s = "dabaabcbc".
- s = "dabaabcbc", remove "abc" starting at index 4, so s = "dababc".
- s = "dababc", remove "abc" starting at index 3, so s = "dab".
Now s has no occurrences of "abc".
```

**Example 2:**

```
Input: s = "axxxxyyyyb", part = "xy"
Output: "ab"
Explanation: The following operations are done:
- s = "axxxxyyyyb", remove "xy" starting at index 4 so s = "axxxyyyb".
- s = "axxxyyyb", remove "xy" starting at index 3 so s = "axxyyb".
- s = "axxyyb", remove "xy" starting at index 2 so s = "axyb".
- s = "axyb", remove "xy" starting at index 1 so s = "ab".
Now s has no occurrences of "xy".
```

**Constraints:**

- `1 <= s.length <= 1000`
- `1 <= part.length <= 1000`
- `s` and `part` consists of lowercase English letters.

### 💡 Solution substring

```java
public String removeOccurrences(String s, String part) {
   while (s.indexOf(part)>-1){
        String tmp = s;
        int start = s.indexOf(part);
        int end = s.indexOf(part)+part.length();
        String s1 = tmp.substring(0,start);
        String s2 = tmp.substring(end);
        s = s1+s2;
    }
    return s;
}
```

[![zltlyF.png](https://s1.ax1x.com/2022/11/21/zltlyF.png)](https://imgse.com/i/zltlyF)

### 💡 Solution KMP

```java
int[] getLPS(String s, int n) {
    int i = 1, len = 0;
    int[] lps = new int[n];
    while (i < n) {
        if (s.charAt(i) == s.charAt(len)) {
            lps[i++] = ++len;
        } else if (len == 0) {
            lps[i++] = 0;
        } else {
            len = lps[len - 1];
        }
    }
    return lps;
}
public String removeOccurrencesKMP(String str, String part) {
    int[] prefix = getLPS(part, part.length());
    Stack<Integer> stack = new Stack<>();
    int i = 0, j = 0;
    char[] p = part.toCharArray();
    char[] s = str.toCharArray();
    int[] idx = new int[s.length ];
    while (i < s.length) {
        if (s[i] == p[j]) {
            idx[i] = j + 1;
            stack.push(i);
            i++;
            j++;
            if (j == p.length) {
                int cnt = p.length;
                while (cnt > 0) {
                    stack.pop();
                    cnt--;
                }
                j = stack.isEmpty() ? 0 : idx[stack.peek()];
            }
        }  else if (j > 0) {
            j = prefix[j - 1];
        } else {
            stack.push(i);
            i++;
        }
    }
    StringBuilder res = new StringBuilder();
    while (!stack.isEmpty()) {
        res.append(s[stack.pop()]);
    }
    return res.reverse().toString();
}
```

[![zlNX4I.png](https://s1.ax1x.com/2022/11/21/zlNX4I.png)](https://imgse.com/i/zlNX4I)

### 🚦Related Topics

- [x] String

# 🔗 Refer links

【[阮一峰](https://www.ruanyifeng.com/)】https://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html

https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/

https://leetcode.com/problems/remove-all-occurrences-of-a-substring/

https://github.com/Amber916Young/leetcode-interview-practice/tree/master/src/StringListHash