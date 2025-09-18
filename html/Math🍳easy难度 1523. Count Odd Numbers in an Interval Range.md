# Math🍳easy难度 1523. Count Odd Numbers in an Interval Range

## 💙 【1523】Count Odd Numbers in an Interval Range <font size="3" color="#4FE915">easy</font>

Given two non-negative integers `low` and `high`. Return the *count of odd numbers between* `low` *and* `high` *(inclusive)*. 

**Example 1:**

```
Input: low = 3, high = 7
Output: 3
Explanation: The odd numbers between 3 and 7 are [3,5,7].
```

**Example 2:**

```
Input: low = 8, high = 10
Output: 1
Explanation: The odd numbers between 8 and 10 are [9]. 
```

**Constraints:**

- `0 <= low <= high <= 10^9`

### 💡Solution

```java
public int countOdds(int low, int high) {
    return (high - low + low % 2 + high % 2) / 2;
}
```

### 🚦Related Topics

- [x] Math 

# 🔗 Refer links

https://leetcode.com/problems/count-odd-numbers-in-an-interval-range/