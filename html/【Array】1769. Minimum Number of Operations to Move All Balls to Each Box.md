# 【Array】1769. Minimum Number of Operations to Move All Balls to Each Box

## 💙 【1769】Minimum Number of Operations to Move All Balls to Each Box <font size="3" color="#FF5733">Medium</font>

You have `n` boxes. You are given a binary string `boxes` of length `n`, where `boxes[i]` is `'0'` if the `ith` box is **empty**, and `'1'` if it contains **one** ball.

In one operation, you can move **one** ball from a box to an adjacent box. Box `i` is adjacent to box `j` if `abs(i - j) == 1`. Note that after doing so, there may be more than one ball in some boxes.

Return an array `answer` of size `n`, where `answer[i]` is the **minimum** number of operations needed to move all the balls to the `ith` box.

Each `answer[i]` is calculated considering the **initial** state of the boxes.

**Example 1:**

```
Input: boxes = "110"
Output: [1,1,3]
Explanation: The answer for each box is as follows:
1) First box: you will have to move one ball from the second box to the first box in one operation.
2) Second box: you will have to move one ball from the first box to the second box in one operation.
3) Third box: you will have to move one ball from the first box to the third box in two operations, and move one ball from the second box to the third box in one operation.
```

**Example 2:**

```
Input: boxes = "001011"
Output: [11,8,5,4,3,4]
```

**Constraints:**

- `n == boxes.length`
- `1 <= n <= 2000`
- `boxes[i]` is either `'0'` or `'1'`.

### 💡Solution

```java
public int[] minOperations(String boxes) {
    Map<Integer, Character> map = new HashMap<>();
    for (int i = 0; i < boxes.length(); i++) {
        map.put(i, boxes.charAt(i));
    }
    int[] ans = new int[boxes.length()];
    for (int i = 0; i < boxes.length(); i++) {
        int step = 0;

        for (Map.Entry<Integer, Character> set : map.entrySet()) {
            int index = set.getKey();
            char val = set.getValue();
            if (val == '1') {
                step += Math.abs(i - index);
            }
        }
        ans[i] = step;
    }
    return ans;
}
```

### 🚦Related Topics

- [x] Array 
- [x] String

# 📍其他相似的题目

## 💙【1217】Minimum Cost to Move Chips to The Same Position  <font size="3" color="#02C850">Medium</font>

We have `n` chips, where the position of the `ith` chip is `position[i]`.

We need to move all the chips to **the same position**. In one step, we can change the position of the `ith` chip from `position[i]` to:

- `position[i] + 2` or `position[i] - 2` with `cost = 0`.
- `position[i] + 1` or `position[i] - 1` with `cost = 1`.

Return *the minimum cost* needed to move all the chips to the same position. 

**Example 1:**

![img](https://assets.leetcode.com/uploads/2020/08/15/chips_e1.jpg)

```
Input: position = [1,2,3]
Output: 1
Explanation: First step: Move the chip at position 3 to position 1 with cost = 0.
Second step: Move the chip at position 2 to position 1 with cost = 1.
Total cost is 1.
```

**Example 2:**

![img](https://assets.leetcode.com/uploads/2020/08/15/chip_e2.jpg)

```
Input: position = [2,2,2,3,3]
Output: 2
Explanation: We can move the two chips at position  3 to position 2. Each move has cost = 1. The total cost = 2.
```

**Example 3:**

```
Input: position = [1,1000000000]
Output: 1
```

**Constraints:**

- `1 <= position.length <= 100`
- `1 <= position[i] <= 10^9`

### 💡Solution

```java
public int minCostToMoveChips(int[] position) {
    int even_cnt = 0;
    int odd_cnt = 0;
    for (int i : position) {
        if (i % 2 == 0) {
            even_cnt++;
        } else {
            odd_cnt++;
        }
    }
    return Math.min(odd_cnt, even_cnt);
}
```

### 🚦Related Topics

- [x] Array 
- [x] Math
- [x] Greedy

# 🔗 Refer links

https://leetcode.com/problems/minimum-number-of-operations-to-move-all-balls-to-each-box/description/

https://leetcode.com/problems/minimum-cost-to-move-chips-to-the-same-position/