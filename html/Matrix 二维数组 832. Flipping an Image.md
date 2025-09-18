# 增加信心⛽️ Matrix 二维数组 832. Flipping an Image

##  💙 【832】 Flipping an Image <font size="3" color="#4FE915">easy</font>

Given an `n x n` binary matrix `image`, flip the image **horizontally**, then invert it, and return *the resulting image*.

To flip an image horizontally means that each row of the image is reversed.

- For example, flipping `[1,1,0]` horizontally results in `[0,1,1]`.

To invert an image means that each `0` is replaced by `1`, and each `1` is replaced by `0`.

- For example, inverting `[0,1,1]` results in `[1,0,0]`.

**Example 1:**

```
Input: image = [[1,1,0],[1,0,1],[0,0,0]]
Output: [[1,0,0],[0,1,0],[1,1,1]]
Explanation: First reverse each row: [[0,1,1],[1,0,1],[0,0,0]].
Then, invert the image: [[1,0,0],[0,1,0],[1,1,1]]
```

**Example 2:**

```
Input: image = [[1,1,0,0],[1,0,0,1],[0,1,1,1],[1,0,1,0]]
Output: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
Explanation: First reverse each row: [[0,0,1,1],[1,0,0,1],[1,1,1,0],[0,1,0,1]].
Then invert the image: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
```

**Constraints:**

- `n == image.length`
- `n == image[i].length`
- `1 <= n <= 20`
- `images[i][j]` is either `0` or `1`.

### 💡Solution

非常简单，增加信心题。

```Java
public int[][] flipAndInvertImage(int[][] image) {
    int row = image.length, col = image[0].length;
    int[][] res = new int[row][col];
    for (int i = 0; i < row; i++) {
        for (int j = 0; j < col; j++) {
            res[i][j] = image[i][col - j - 1] == 1 ? 0 : 1;
        }
    }
    return res;
}
```

### 🚦Related Topics

- [x] Array
- [x] Two pointers
- [x] Simulation
- [x] Matrix 

# 🔗 Refer links

https://leetcode.com/problems/flipping-an-image/