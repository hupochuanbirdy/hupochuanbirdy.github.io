# 【String Hash Table】205. Isomorphic Strings;290 Word Pattern

## 💙 【205】Isomorphic Strings <font size="3" color="#4FE915">easy</font>

Given two strings `s` and `t`, *determine if they are isomorphic*.

Two strings `s` and `t` are isomorphic if the characters in `s` can be replaced to get `t`.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

**Example 1:**

```
Input: s = "egg", t = "add"
Output: true
```

**Example 2:**

```
Input: s = "foo", t = "bar"
Output: false
```

**Example 3:**

```
Input: s = "paper", t = "title"
Output: true
```

**Constraints:**

- `1 <= s.length <= 5 * 104`
- `t.length == s.length`
- `s` and `t` consist of any valid ascii character.

### 📝 一些提示

[![zQAR9P.png](https://s1.ax1x.com/2022/11/21/zQAR9P.png)](https://imgse.com/i/zQAR9P)

Key - value 是唯一的。o --- a， 然而最后一个o对应的是r。

### 💡Solution 1

```java
public static void main(String[] args) {
    isIsomorphic("foo","bar");
}
static public boolean isIsomorphic(String s, String t) {
    HashMap<Character, Character> map = new HashMap<>();
    for (int i = 0; i < s.length(); i++) {
        char c = s.charAt(i);
        char k = t.charAt(i);
        if (map.containsKey(c)) {
            if (map.get(c) != k ) {
                return false;
            }
        } else {
            if (map.containsValue(k ))
                return false;
            map.put(c, k);
        }
    }
    return true;
}
```

### 💡Solution 2

```java
public boolean isIsomorphic2(String s, String t) {
    if(s.length()!=t.length()) return false;
    Map<Character,Character> set = new HashMap<>();
    Map<Character,Character>  set2 = new HashMap<>();
    for(int i=0;i<s.length();i++){
        char c1=s.charAt(i);
        char c2=t.charAt(i);
        if(set.containsKey(c1)){
            if(set.get(c1)!=c2) return false;
        }
        if(set2.containsKey(c2)){
            if(set2.get(c2)!=c1) return false;
        }
        set.put(c1,c2);
        set2.put(c2,c1);
    }
    return true;
}
```

### 🚦Related Topics

- [x] String
- [x] Hash Table

## 💙 【290】Word Pattern  <font size="3" color="#4FE915">easy</font>

Given a `pattern` and a string `s`, find if `s` follows the same pattern.

Here **follow** means a full match, such that there is a bijection between a letter in `pattern` and a **non-empty** word in `s`.

**Example 1:**

```
Input: pattern = "abba", s = "dog cat cat dog"
Output: true
```

**Example 2:**

```
Input: pattern = "abba", s = "dog cat cat fish"
Output: false
```

**Example 3:**

```
Input: pattern = "aaaa", s = "dog cat cat dog"
Output: false 
```

**Constraints:**

- `1 <= pattern.length <= 300`
- `pattern` contains only lower-case English letters.
- `1 <= s.length <= 3000`
- `s` contains only lowercase English letters and spaces `' '`.
- `s` **does not contain** any leading or trailing spaces.
- All the words in `s` are separated by a **single space**.

### 💡Solution

 **<font size="3" color="#F7260A">和方法1一摸一样的解决方案</font>**

```java
public boolean wordPattern(String pattern, String s) {
    Map<Character,String> map = new HashMap<Character,String>();
    String[] words = s.split(" ");
    if(pattern.length() != words.length)
        return false;
    for(int i=0; i <pattern.length(); i++){
        char pt = pattern.charAt(i);
        if(map.containsKey(pt)){
            if(map.get(pt).equals(words[i]))
                continue;
            else
                return false;
        }
        else{
            if(!map.containsValue(words[i]))
                map.put(pt,words[i]);
            else
                return false;
        }
    }
    return true;
}
```

# 🔗 Refer links

https://leetcode.com/problems/isomorphic-strings/?envType=study-plan&id=level-1

https://leetcode.com/problems/word-pattern/

https://github.com/Amber916Young/leetcode-interview-practice/tree/master/src/StringListHash