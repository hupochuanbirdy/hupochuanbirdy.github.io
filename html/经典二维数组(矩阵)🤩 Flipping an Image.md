# 经典二维数组(矩阵)🤩 Flipping an Image

## 💙 【463】Island Perimeter <font size="3" color="#4FE915">easy</font>

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

### 📝个人分析

给定一个n × n的二值矩阵图像，水平翻转图像，然后倒置，并返回结果图像。水平翻转图像意味着图像的每一行都被翻转。

例如，水平翻转[1,1,0]的结果是[0,1,1]。*反转图像意味着每个0被替换为1，每个1被替换为0。*

例如，对[0,1,1]进行反求会得到[1,0,0]。

**也就是说1替换为0，0替换为1，再进行水平翻转。**

例子一，第一行 [1,1,0] 首先替换1和0，得到[0,0,1],在进行水平翻转[1,0,0]。其实可以得出规律，从右向左循环，替换和翻转同时进行。

### 💡Solution

```java
    public int[][] flipAndInvertImage(int[][] image) {
        int row = image.length, col = image[0].length;
        int[][] res = new int[row][col];
        for (int i = 0; i < row; i++) {
            for (int j = 0; j < col; j++) {
                    res[i][j] = image[i][col - j - 1] == 1 ? 0 : 1; //三元表达式，如果从右-->左循环，如果为1，替换为0，否则替换为1
            }
        }
        return res;
    }
```

# 🔗 Refer links

https://leetcode.com/problems/flipping-an-image/