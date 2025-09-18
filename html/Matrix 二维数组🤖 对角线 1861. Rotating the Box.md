# Matrix 二维数组🌀1861. Rotating the Box

## 💙 【1861】 Rotating the Box <font size="3" color="#FF5733">Medium</font>

You are given an `m x n` matrix of characters `box` representing a side-view of a box. Each cell of the box is one of the following:

- A stone `'#'`
- A stationary obstacle `'*'`
- Empty `'.'`

The box is rotated **90 degrees clockwise**, causing some of the stones to fall due to gravity. Each stone falls down until it lands on an obstacle, another stone, or the bottom of the box. Gravity **does not** affect the obstacles' positions, and the inertia from the box's rotation **does not** affect the stones' horizontal positions.

It is **guaranteed** that each stone in `box` rests on an obstacle, another stone, or the bottom of the box.

Return *an* `n x m` *matrix representing the box after the rotation described above*.

**Example 1:**

<img src="https://assets.leetcode.com/uploads/2021/04/08/rotatingtheboxleetcodewithstones.png" alt="img" style="zoom:67%;" />

```
Input: box = [["#",".","#"]]
Output: [["."],
         ["#"],
         ["#"]]
```

**Example 2:**

<img src="https://assets.leetcode.com/uploads/2021/04/08/rotatingtheboxleetcode2withstones.png" alt="img" style="zoom:67%;" />

```
Input: box = [["#",".","*","."],
              ["#","#","*","."]]
Output: [["#","."],
         ["#","#"],
         ["*","*"],
         [".","."]]
```

**Example 3:**

<img src="https://assets.leetcode.com/uploads/2021/04/08/rotatingtheboxleetcode3withstone.png" alt="img" style="zoom:50%;" />

```
Input: box = [["#","#","*",".","*","."],
              ["#","#","#","*",".","."],
              ["#","#","#",".","#","."]]
Output: [[".","#","#"],
         [".","#","#"],
         ["#","#","*"],
         ["#","*","."],
         ["#",".","*"],
         ["#",".","."]]
```

**Constraints:**

- `m == box.length`
- `n == box[i].length`
- `1 <= m, n <= 500`
- `box[i][j]` is either `'#'`, `'*'`, or `'.'`.

### 📝 一些提示

- A stone `'#'` 宝石
- A stationary obstacle `'*'` 障碍物
- Empty `'.'` 

### 💡Solution

```java
public char[][] rotateTheBox(char[][] box) {
    int row = box.length;
    int col = box[0].length;
    char[][] mat = new char[col][row];
    for (int i = 0; i < row; i++) {
        int start = 0;
        int end = start + 1;
        while (start <= end && end < col) {
            if (box[i][start] == '*') {
                start++;
                end++;
                continue;
            }
            if (box[i][start] == '.') {
                start++;
                end++;
                continue;
            }
            if (box[i][end] == '*') {
                start = end;
                end++;
                continue;
            }
            if (box[i][end] == '#') {
                end++;
                continue;
            }
            if (box[i][end] == '.') {
                box[i][start] = '.';
                box[i][end] = '#';
                start++;
                end++;
            }
        }
    }
    for (int i = 0; i < row; i++) {
        for (int j = 0; j < col; j++) {
            mat[j][row-i-1] = box[i][j];
        }
    }
    return mat;
}
```

### 🚦Related Topics

- [x] Array 
- [x] Two pointers
- [x] Matrix 

# 🔗 Refer links

https://leetcode.com/problems/rotating-the-box/

https://github.com/Amber916Young/leetcode-interview-practice/tree/master/src/Matrix



