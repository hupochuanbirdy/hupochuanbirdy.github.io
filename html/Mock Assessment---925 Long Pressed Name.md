# Mock Assessment---Two point 925 Long Pressed Name

## 💚 925. Long Pressed Name <font size="3" color="#02C850">Easy</font>

 Your friend is typing his `name` into a keyboard. Sometimes, when typing a character `c`, the key might get *long pressed*, and the character will be typed 1 or more times.

You examine the `typed` characters of the keyboard. Return `True` if it is possible that it was your friends name, with some characters (possibly none) being long pressed.

**Example 1:**

```
Input: name = "alex", typed = "aaleex"
Output: true
Explanation: 'a' and 'e' in 'alex' were long pressed.
```

**Example 2:**

```
Input: name = "saeed", typed = "ssaaedd"
Output: false
Explanation: 'e' must have been pressed twice, but it was not in the typed output. 
```

**Constraints:**

- `1 <= name.length, typed.length <= 1000`
- `name` and `typed` consist of only lowercase English letters.

### 💡Solution

```java
   public boolean isLongPressedName(String name, String typed) {
        char[] name_char = name.toCharArray();
        char[] typed_char = typed.toCharArray();
        int len_name = name.length();
        int len_typed = typed.length();
        if (len_name > len_typed) {
            return false;
        }
        if (typed_char[len_typed - 1] != name_char[len_name - 1] || typed_char[0] != name_char[0]) {
            return false;
        }
        int p1 = 0;
        int p2 = 0;
        while ( p1 < len_name  && p2 < len_typed){
            if ( name_char[p1] == typed_char[p2] ){
                p1++;
                p2++;
            }else if (name_char[p1-1] == typed_char[p2]){
                p2++;
            }else{
                return false;
            }
        }
        while (p2 < len_typed){
            if ( name_char[p1-1] == typed_char[p2] ){
                p2++;
            }else{
                return false;
            }
        }
        return p1 == len_name;
    }
```

# 🔗 Refer links

https://leetcode.com/problems/long-pressed-name/description/