# Binary Search二分查找 No8  367. Valid Perfect Square 69 633 【模板题】

## 💙 【367】 Valid Perfect Square <font size="3" color="#4FE915">easy</font>

Given a **positive** integer *num*, write a function which returns True if *num* is a perfect square else False.

**Follow up:** **Do not** use any built-in library function such as `sqrt`.

**Example 1:**

```
Input: num = 16
Output: true
```

**Example 2:**

```
Input: num = 14
Output: false
```

**Constraints:**

- `1 <= num <= 2^31 - 1`

### 💡Solution

```java
  public boolean isPerfectSquare(int num) {
      if (num == 1) return true;
      long start = 1;
      long end = num;
      while (start <= end) {
          long mid = start + (end - start) / 2;
          if (mid * mid == num) {
              return true;
          } else if (mid * mid < num) {
              start = mid + 1;
          } else {
              end = mid - 1;
          }
      }
      return false;
  }
```

### 🚦Related Topics

- [x] Math 
- [x] Binary Search

### 📍相似的题目

【二分查找】69. [Sqrt(x)](https://leetcode.com/problems/sqrtx/)

【二分查找】633. [Sum of Square Numbers](https://leetcode.com/problems/sum-of-square-numbers/)

## 👻 买一送二

## 💙 【69】Sqrt(x)  <font size="3" color="#4FE915">easy</font>

Given a non-negative integer `x`, return *the square root of* `x` *rounded down to the nearest integer*. The returned integer should be **non-negative** as well.

You **must not use** any built-in exponent function or operator.

- For example, do not use `pow(x, 0.5)` in c++ or `x ** 0.5` in python.

**Example 1:**

```
Input: x = 4
Output: 2
Explanation: The square root of 4 is 2, so we return 2.
```

**Example 2:**

```
Input: x = 8
Output: 2
Explanation: The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned. 
```

**Constraints:**

- `0 <= x <= 231 - 1`

### 💡Solution

```java
public int mySqrt(int num) {
  if (num == 1) return 1;
  long start = 1;
  long end = num / 2;
  while (start <= end) {
      long mid = start + (end - start) / 2;
      if (mid * mid == num) {
          return (int) mid;
      } else if (mid * mid < num) {
          start = mid + 1;
      } else {
          end = mid - 1;
      }

  }
  return (int) end;
}
```

[<img src="https://s1.ax1x.com/2022/11/20/zMvtHK.png" alt="zMvtHK.png" style="zoom: 33%;" />](https://imgse.com/i/zMvtHK)

## 💙 【633】Sum of Square Numbers <font size="3" color="#FF5733">Medium</font>

Given a non-negative integer `c`, decide whether there're two integers `a` and `b` such that `a2 + b2 = c`.

**Example 1:**

```
Input: c = 5
Output: true
Explanation: 1 * 1 + 2 * 2 = 5
```

**Example 2:**

```
Input: c = 3
Output: false
```

**Constraints:**

- `0 <= c <= 231 - 1`

### 🤒Not good Solution

```java
public boolean judgeSquareSum(int c) {
    for (long a = 0; a * a <= c; a++) {
        double b = Math.sqrt(c - a * a);
        if (b == (int) b)
            return true;
    }
    return false;
}
```

### 💡Solution

```java
public boolean judgeSquareSum(int c) {
    long start = 0;
    long end = (long) Math.sqrt(c);
    long sum = (long) c;
    while (start <= end) {
        long mid = start * start + end * end;
        if (mid == sum) return true;
        else if (mid > sum)
            end--;
        else
            start++;
    }
    return false;
}
```

### 🚦Related Topics

- [x] Two pointers
- [x] Arrays 
- [x] Binary Search



# 🔗 Refer links

https://leetcode.com/problems/valid-perfect-square/

https://leetcode.com/problems/sqrtx/

https://leetcode.com/problems/sum-of-square-numbers/

https://github.com/Amber916Young/leetcode-interview-practice/tree/master/src/BinarySearch