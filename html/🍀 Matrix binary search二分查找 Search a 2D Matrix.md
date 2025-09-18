# 🍀 Matrix binary search二分查找 Search a 2D Matrix

## 💙 【74】Search a 2D Matrix <font size="3" color="#FF5733">Medium</font>

Write an efficient algorithm that searches for a value `target` in an `m x n` integer matrix `matrix`. This matrix has the following properties:

- Integers in each row are sorted from left to right.
- The first integer of each row is greater than the last integer of the previous row.

**Example 1:**

![img](https://assets.leetcode.com/uploads/2020/10/05/mat.jpg)

```
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
```

**Example 2:**

![img](https://assets.leetcode.com/uploads/2020/10/05/mat2.jpg)

```
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false 
```

**Constraints:**

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 100`
- `-104 <= matrix[i][j], target <= 104`

### 📝 个人分析

这算是比较简单的二分查找，第一次查找第几层，第二次就是一位数组的经典二分查找。

### 🤒 Not good Solution

```java
public boolean searchMatrix(int[][] matrix, int target) {
    int row = matrix.length;
    int column = matrix[0].length;
    int layer = 0;
    for(int i=0;i<row;i++){
        int start=matrix[i][0];
        int end=matrix[i][column-1];
        if(target>=start && target<=end){
            layer = i;
            break;
        }
    }
    for(int i=0;i<column;i++){
        if(target==matrix[layer][i]) return true;
    } 
    return false;
}
```

### 💡Good Solution beat 100%

```java
    public boolean searchMatrix(int[][] matrix, int target) {
        int row = matrix.length;
        int column = matrix[0].length;
        int layer = 0;
        for (int i = 0; i < row; i++) {
            int start = matrix[i][0];
            int end = matrix[i][column - 1];
            if (target >= start && target <= end) {
                layer = i;
                break;
            }
        }
        int[] arr = matrix[layer];
        int start = 0;
        int end = arr.length - 1;
        while (start <= end) {
            int mid = start + (end - start) / 2;
            if (target == arr[mid]) return true;
            if (arr[mid] > target) end = mid - 1;
            else {
                start = mid + 1;
            }
        }
        return false;
    }
```

### 🚦Related Topics

- [x] Array
- [x] Binary Search
- [x] Matrix 

## 💙 【240】Search a 2D Matrix II <font size="3" color="#FF5733">Medium</font>

Write an efficient algorithm that searches for a value `target` in an `m x n` integer matrix `matrix`. This matrix has the following properties:

- Integers in each row are sorted in ascending from left to right.
- Integers in each column are sorted in ascending from top to bottom.

**Example 1:**

<img src="https://assets.leetcode.com/uploads/2020/11/24/searchgrid2.jpg" alt="img" style="zoom:50%;" />

```
Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
Output: true
```

**Example 2:**

<img src="https://assets.leetcode.com/uploads/2020/11/24/searchgrid.jpg" alt="img" style="zoom:50%;" />

```
Input: matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
Output: false
```

**Constraints:**

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= n, m <= 300`
- `-109 <= matrix[i][j] <= 109`
- All the integers in each row are **sorted** in ascending order.
- All the integers in each column are **sorted** in ascending order.
- `-109 <= target <= 109`

### 💡Solution

```java
public boolean searchMatrix(int[][] matrix, int target) {
    int row =0;
    int col =matrix[0].length-1;
    while(row <matrix.length && col>=0){
        if(matrix[row][col] == target){
            return true;
        }else if(matrix[row][col] > target){
            col--;
        }else{
            row++;
        }
    }
    return false;
}
```

### 🚦Related Topics

- [x] Array
- [x] Binary Search
- [x] Matrix 
- [x] Divide and Conquer 分治算法

# 🔗 Refer links

https://leetcode.com/problems/search-a-2d-matrix/

https://leetcode.com/problems/search-a-2d-matrix-ii/

https://github.com/Amber916Young/leetcode-interview-practice/tree/master/src/BinarySearch