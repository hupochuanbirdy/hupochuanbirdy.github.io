# 增加信心题⛽️ 682 Baseball Game

## 💙【682】Baseball Game <font size="3" color="#4FE915">Easy</font>

You are keeping the scores for a baseball game with strange rules. At the beginning of the game, you start with an empty record.

You are given a list of strings `operations`, where `operations[i]` is the `ith` operation you must apply to the record and is one of the following:

- An integer x
  - Record a new score of `x`.
- '+'
  - Record a new score that is the sum of the previous two scores.
- 'D'
  - Record a new score that is the double of the previous score.
- 'C'
  - Invalidate the previous score, removing it from the record.

Return *the sum of all the scores on the record after applying all the operations*.

The test cases are generated such that the answer and all intermediate calculations fit in a **32-bit** integer and that all operations are valid.

**Example 1:**

```
Input: ops = ["5","2","C","D","+"]
Output: 30
Explanation:
"5" - Add 5 to the record, record is now [5].
"2" - Add 2 to the record, record is now [5, 2].
"C" - Invalidate and remove the previous score, record is now [5].
"D" - Add 2 * 5 = 10 to the record, record is now [5, 10].
"+" - Add 5 + 10 = 15 to the record, record is now [5, 10, 15].
The total sum is 5 + 10 + 15 = 30.
```

**Example 2:**

```
Input: ops = ["5","-2","4","C","D","9","+","+"]
Output: 27
Explanation:
"5" - Add 5 to the record, record is now [5].
"-2" - Add -2 to the record, record is now [5, -2].
"4" - Add 4 to the record, record is now [5, -2, 4].
"C" - Invalidate and remove the previous score, record is now [5, -2].
"D" - Add 2 * -2 = -4 to the record, record is now [5, -2, -4].
"9" - Add 9 to the record, record is now [5, -2, -4, 9].
"+" - Add -4 + 9 = 5 to the record, record is now [5, -2, -4, 9, 5].
"+" - Add 9 + 5 = 14 to the record, record is now [5, -2, -4, 9, 5, 14].
The total sum is 5 + -2 + -4 + 9 + 5 + 14 = 27.
```

**Example 3:**

```
Input: ops = ["1","C"]
Output: 0
Explanation:
"1" - Add 1 to the record, record is now [1].
"C" - Invalidate and remove the previous score, record is now [].
Since the record is empty, the total sum is 0.
```

**Constraints:**

- `1 <= operations.length <= 1000`
- `operations[i]` is `"C"`, `"D"`, `"+"`, or a string representing an integer in the range `[-3 * 104, 3 * 104]`.
- For operation `"+"`, there will always be at least two previous scores on the record.
- For operations `"C"` and `"D"`, there will always be at least one previous score on the record.

### 📝个人分析

看一个例子就够了

给一个Int类型的数组，有三个操作符需要做处理，C，D，+ 即

C是指前一个分数无效，删除；

D是指前一个分数*2；

+是指前两个分数相加。

这题用stack先进后出原则。比如5先进，2后进，C是指删除2这个记录，所以直接pop出来就好。

**运算符+的操作是stack的顶点和第二个分数相加，但是这里不做pop操作，看例子就知道，只有遇到C才会删除数据。**

### 💡Solution

```java
    public int calPoints(String[] ops) {
        Stack<Integer> deque = new Stack<>();
        for (int i = 0; i < ops.length; i++) {
            if (ops[i].equals("C")) {
                deque.pop();
            } else if (ops[i].equals("D")) {
                deque.push(deque.peek() * 2);
            } else if (ops[i].equals("+")) {
                int a = deque.peek();
                int b = deque.elementAt(deque.size()-2);
                deque.push(a + b);
            } else {
                deque.push(Integer.valueOf(ops[i]));
            }
        }
        int sum =  0;
        while (!deque.isEmpty()){
            sum += deque.pop();
        }
        return sum;
    }
```

# 🔗 Refer links

https://leetcode.com/problems/baseball-game/