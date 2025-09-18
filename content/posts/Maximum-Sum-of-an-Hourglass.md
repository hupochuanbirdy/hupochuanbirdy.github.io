---
title: "Maximum Sum of an Hourglass"
date: 2024-12-01T19:58:00Z
lastmod: 2024-12-01T19:58:00Z
subTitle: ""
description: ""
draft: false
featured: true
type: posts
label: "orginal"
author: tothemoon
tags: ["Array", "Matrix", "Prefix Sum"]
categories: ["Leetcode"]
cover:
    position: <left,right>
    image: "null"
    alt: "<alt text>"
    caption: "<text>"
---


# 【2428】Maximum Sum of an Hourglass <font size="3" color="#FF5733">Medium</font>

You are given an `m x n` integer matrix `grid`.

We define an **hourglass** as a part of the matrix with the following form:

<div class="polaroid">
    <a
         data-fancybox="gallery"
         data-src="https://assets.leetcode.com/uploads/2022/08/21/img.jpg">
        <img src="https://assets.leetcode.com/uploads/2022/08/21/img.jpg" />
    </a>
</div>

Return *the **maximum** sum of the elements of an hourglass*.

**Note** that an hourglass cannot be rotated and must be entirely contained within the matrix.

**Example 1:**

<div class="polaroid">
    <a
         data-fancybox="gallery"
         data-src="https://assets.leetcode.com/uploads/2022/08/21/1.jpg">
        <img src="https://assets.leetcode.com/uploads/2022/08/21/1.jpg" />
    </a>
</div>

```
Input: grid = [[6,2,1,3],[4,2,1,5],[9,2,8,7],[4,1,2,9]]
Output: 30
Explanation: The cells shown above represent the hourglass with the maximum sum: 6 + 2 + 1 + 2 + 9 + 2 + 8 = 30.
```

**Example 2:**


<div class="polaroid">
    <a
         data-fancybox="gallery"
         data-src="https://assets.leetcode.com/uploads/2022/08/21/2.jpg">
        <img src="https://assets.leetcode.com/uploads/2022/08/21/2.jpg" />
    </a>
</div>

```
Input: grid = [[1,2,3],[4,5,6],[7,8,9]]
Output: 35
Explanation: There is only one hourglass in the matrix, with the sum: 1 + 2 + 3 + 5 + 7 + 8 + 9 = 35.
```

**Constraints:**

- `m == grid.length`
- `n == grid[i].length`
- `3 <= m, n <= 150`
- `0 <= grid[i][j] <= 106`

### 💡Solution

very easy question but a little bit tricky.

```java
public int maxSum(int[][] grid) {
    int row = grid.length;
    int col = grid[0].length;
    int sum = 0;
    for(int i =0;i< row -2 ;i++){
        for(int j =0;j< col - 2 ;j++){
            int count = 0;
            count = grid[i][j] + grid[i][j + 1] + grid[i][j + 2] + grid[i + 1][j + 1]
                    + grid[i + 2][j] + grid[i + 2][j + 1] + grid[i + 2][j + 2];
            sum = Math.max(sum,count);
        }
    }
    return sum;
}
```

# 🔗 Refer links

https://leetcode.com/problems/maximum-sum-of-an-hourglass/description/
