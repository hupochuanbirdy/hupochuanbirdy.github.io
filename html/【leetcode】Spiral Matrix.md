# 【leetcode】👍Spiral Matrix & Spiral Matrix II

## 💙 【54】Spiral Matrix <font size="3" color="#FF5733">Medium</font>

Given an `m x n` `matrix`, return *all elements of the* `matrix` *in spiral order*.

**Example 1:**

![img](https://assets.leetcode.com/uploads/2020/11/13/spiral1.jpg)

```
Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,2,3,6,9,8,7,4,5]
```

**Example 2:**

![img](https://assets.leetcode.com/uploads/2020/11/13/spiral.jpg)

```
Input: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
Output: [1,2,3,4,8,12,11,10,9,5,6,7]
```

**Constraints:**

- `m == matrix.length`
- `n == matrix[i].length`
- `1 <= m, n <= 10`
- `-100 <= matrix[i][j] <= 100`

### 📝个人分析

m n 的矩阵，不一定是正方形，一定是矩型。无论多大，都存在四个方向：

- 从左到右 
- 从上到下 
- 从右到左
- 从下到上

四个方向循环。设定top，left，right，down，四个指针，每次执行某个方向都要缩小范围。比如从左到右1->2->3 top指针往下走，意味着row+1。

### 💡Solution

```java
  public List<Integer> spiralOrder(int[][] matrix) {
        ArrayList<Integer> intermediate = new ArrayList<Integer>();
        if (matrix == null || matrix.length == 0) {
            return intermediate;
        }
        int N = matrix.length; //row 行长度 
        int M = matrix[0].length; //column 列长度 
        int top=0,down=N-1,left=0,right=M-1;
        int direction =0;
        while (top<=down && left<=right){  //循环条件，不可越界
            if(direction==0) {
                for(int i=left;i<=right;i++){
                    intermediate.add(matrix[top][i]);   //从左到右
                }
                top++;
            }else if(direction==1){
                for(int i=top;i<=down;i++){
                    intermediate.add(matrix[i][right]); //从上到下
                }
                right--;
            } else if(direction==2){
                for(int i=right;i>=left;i--){
                    intermediate.add(matrix[down][i]); //从右到左
                }
                down--;
            } else if(direction==3){
                for(int i=down;i>=top;i--){
                    intermediate.add(matrix[i][left]); //从下到上
                }
                left++;
            }
            direction = (direction+1)%4; 
        }
        return intermediate;
    }
```

## 💙 【59】Spiral Matrix II <font size="3" color="#FF5733">Medium</font>

Given a positive integer `n`, generate an `n x n` `matrix` filled with elements from `1` to `n2` in spiral order.

**Example 1:**

![img](https://assets.leetcode.com/uploads/2020/11/13/spiraln.jpg)

```
Input: n = 3
Output: [[1,2,3],[8,9,4],[7,6,5]]
```

**Example 2:**

```
Input: n = 1
Output: [[1]]
```

**Constraints:**

- `1 <= n <= 20`

### 📝个人分析

根据题目意思，n是矩阵的行列数（正方形），同样是根据螺旋的方向来填充数字。和第54题是一模一样的。所以同样设定四个方向的指针。

### 💡Solution

```java
 public int[][] generateMatrix(int n) {
        if(n==1) return new int[][]{{1}};
        int[][] res = new int[n][n];
        int direction=0;
        int top=0,down=n-1,left=0,right=n-1;
        int num=0;
        while (top<=down && left<=right) {
            if (direction == 0) {
                for (int i = left; i <= right; i++) {
                    num++;
                    res[top][i] = num;
                }
                top++;
            } else if (direction == 1) {
                for (int i = top; i <= down; i++) {
                    num++;
                    res[i][right] = num;
                }
                right--;
            } else if (direction == 2) {
                for (int i = right; i >= left; i--) {
                    num++;
                    res[down][i] = num;
                }
                down--;
            } else if (direction == 3) {
                for (int i = down; i >= top; i--) {
                    num++;
                    res[i][left] = num;
                }
                left++;
            }
            direction = (direction+1)%4;
        }
        return res;
    }
```

# 🔗 Refer links

https://leetcode.com/problems/spiral-matrix/

https://leetcode.com/problems/spiral-matrix-ii/