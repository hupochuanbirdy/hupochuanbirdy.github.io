---
title: "Check if Every Row and Column Contains All Numbers"
date: 2024-12-01T19:46:08Z
lastmod: 2024-12-01T19:46:08Z
subTitle: ""
description: ""
draft: false
featured: true
type: posts
label: "orginal"
author: tothemoon
tags: ["Array"]
categories: ["Leetcode"]
cover:
    position: <left,right>
    image: "null"
    alt: "<alt text>"
    caption: "<text>"
---



## 💙 【2133】Check if Every Row and Column Contains All Numbers  <font size="3" color="#4FE915">easy</font>

An `n x n` matrix is **valid** if every row and every column contains **all** the integers from `1` to `n` (**inclusive**).

Given an `n x n` integer matrix `matrix`, return `true` *if the matrix is **valid**.* Otherwise, return `false`.

**Example 1:**


<div class="polaroid">
    <a
         data-fancybox="gallery"
         data-src="https://assets.leetcode.com/uploads/2021/12/21/example1drawio.png">
        <img src="https://assets.leetcode.com/uploads/2021/12/21/example1drawio.png" />
    </a>
</div>


```
Input: matrix = [[1,2,3],[3,1,2],[2,3,1]]
Output: true
Explanation: In this case, n = 3, and every row and column contains the numbers 1, 2, and 3.
Hence, we return true.
```

**Example 2:**

<div class="polaroid">
    <a
         data-fancybox="gallery"
         data-src="https://assets.leetcode.com/uploads/2021/12/21/example2drawio.png">
        <img src="https://assets.leetcode.com/uploads/2021/12/21/example2drawio.png" />
    </a>
</div>


```
Input: matrix = [[1,1,1],[1,2,3],[1,2,3]]
Output: false
Explanation: In this case, n = 3, but the first row and the first column do not contain the numbers 2 or 3.
Hence, we return false.
```

**Constraints:**

- `n == matrix.length == matrix[i].length`
- `1 <= n <= 100`
- `1 <= matrix[i][j] <= n`

### 📝个人分析

如果每一行和每一列包含从1到n（包括1到n）的所有整数，则nxn矩阵有效。 给定一个nxn整数矩阵，如果该矩阵有效，则返回true。否则，返回false。

矩阵行列相等，按照常规循环。这里使用HashSet来记录是否存在重复值。Set不会存入相同的内容，每次循环检查set长度是否与矩阵行或者列相等。

### 💡Solution

```java
  public boolean checkValid(int[][] matrix) {
        int n = matrix.length;
        for(int i = 0;i<n;i++){
            Set<Integer> row = new HashSet<>();
            Set<Integer> col = new HashSet<>();
            for(int j = 0;j<n;j++){
                row.add(matrix[i][j]);
                col.add(matrix[j][i]);
            }
            if(row.size() != n || col.size() != n)return false;
        }
        return true;
    }
```

# 🔗 Refer links

https://leetcode.com/problems/check-if-every-row-and-column-contains-all-numbers/


