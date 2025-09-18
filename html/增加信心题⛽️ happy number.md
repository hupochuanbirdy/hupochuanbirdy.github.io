# 增加信心题⛽️ 202 happy number

## 💙 【202】 happy number <font size="3" color="#4FE915">Easy</font>

Write an algorithm to determine if a number `n` is happy.

A **happy number** is a number defined by the following process:

- Starting with any positive integer, replace the number by the sum of the squares of its digits.
- Repeat the process until the number equals 1 (where it will stay), or it **loops endlessly in a cycle** which does not include 1.
- Those numbers for which this process **ends in 1** are happy.

Return `true` *if* `n` *is a happy number, and* `false` *if not*. 

**Example 1:**

```
Input: n = 19
Output: true
Explanation:
12 + 92 = 82
82 + 22 = 68
62 + 82 = 100
12 + 02 + 02 = 1
```

**Example 2:**

```
Input: n = 2
Output: false
```

**Constraints:**

- `1 <= n <= 231 - 1`

### 📝个人分析

写一个算法来判断一个数字n是否快乐。
**快乐数**是通过以下过程定义的数：
从任何正整数开始，用数字的平方和替换数字。
重复这个过程，直到数字等于1（它将停留在那里），或者它在一个不包括1的循环中无休止地循环。
这个过程以1结尾的数字是令人高兴的。
如果n是一个满意的数字，则返回true，否则返回false。

**这个题，很好的记录了如何获取一串数字的每一位数字, 请记住getNext如何写**

### 💡Solution

```java
    private int getNext(int n) {
        int totalSum = 0;
        while (n > 0) {
            int d = n % 10;
            n = n / 10;
            totalSum += d * d;
        }
        return totalSum;
    }
    public boolean isHappy(int n) {
        if(n==1) return true;
        List map = new ArrayList();
        while (!map.contains(n)){
            if(n==1) return true;
            map.add(n);
            n = getNext(n);
        }
        return false;
    }
```

# 🔗 Refer links

https://leetcode.com/problems/happy-number/