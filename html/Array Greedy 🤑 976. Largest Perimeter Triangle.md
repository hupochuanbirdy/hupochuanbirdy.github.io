# Array Greedy 🤑 976. Largest Perimeter Triangle 812. Largest Triangle Area

## 💙 【976】Largest Perimeter Triangle <font size="3" color="#4FE915">easy</font>

Given an integer array `nums`, return *the largest perimeter of a triangle with a non-zero area, formed from three of these lengths*. If it is impossible to form any triangle of a non-zero area, return `0`.

**Example 1:**

```
Input: nums = [2,1,2]
Output: 5
```

**Example 2:**

```
Input: nums = [1,2,1]
Output: 0
```

**Constraints:**

- `3 <= nums.length <= 104`
- `1 <= nums[i] <= 106`

### 📝 一些提示

三角形的成立条件是，两边之和大于第三边，两边之差小于第三边。

### 🚦Related Topics

- [x] Array 
- [x] Greedy
- [x] Math
- [x] Sorting

### 💡Solution

```java
public int largestPerimeter(int[] nums) {
    Arrays.sort(nums);
    for (int i = nums.length - 3; i >= 0; --i)
        if (nums[i] + nums[i+1] > nums[i+2])
            return nums[i] + nums[i+1] + nums[i+2];
    return 0;
}
```

#  👻 买一送一

## 💙 【812】Largest Triangle Area <font size="3" color="#4FE915">easy</font>

Given an array of points on the **X-Y** plane `points` where `points[i] = [xi, yi]`, return *the area of the largest triangle that can be formed by any three different points*. Answers within `10-5` of the actual answer will be accepted. 

**Example 1:**

<img src="https://s3-lc-upload.s3.amazonaws.com/uploads/2018/04/04/1027.png" alt="img" style="zoom:50%;" />

```
Input: points = [[0,0],[0,1],[1,0],[0,2],[2,0]]
Output: 2.00000
Explanation: The five points are shown in the above figure. The red triangle is the largest.
```

**Example 2:**

```
Input: points = [[1,0],[0,0],[0,1]]
Output: 0.50000 
```

**Constraints:**

- `3 <= points.length <= 50`
- `-50 <= xi, yi <= 50`
- All the given points are **unique**.

### 📝 一些提示

Area of a triangle **`ABC`** with 3 given points **`A(x1, y1), B(x2, y2),`** and **`C(x3, y3)`** is:
**`(ΔABC) = (1/2)|x1(y2 − y3) + x2(y3 − y1) + x3(y1 − y2)|`**

### 💡Solution

```java
 public double largestTriangleArea(int[][] points) {
        int n = points.length;
        double maxArea = 0.0;

        for (int i = 0; i < n; i++)
            for (int j = i + 1; j < n; j++)
                for (int k = j + 1; k < n; k++) {
                    double currArea = area(points[i], points[j], points[k]);
                    maxArea = Math.max(maxArea, currArea);
                }

        return maxArea;
    }

    public double area(int[] p1, int[] p2, int[] p3) {
        return 
            Math.abs(
                p1[0] * (p2[1] - p3[1]) +
                p2[0] * (p3[1] - p1[1]) +
                p3[0] * (p1[1] - p2[1])
            ) / 2.0 ;
    }
```



# 🔗 Refer links

https://leetcode.com/problems/largest-perimeter-triangle/

https://leetcode.com/problems/largest-triangle-area/

https://github.com/Amber916Young/leetcode-interview-practice/tree/master/src/StringListHash

https://leetcode.com/problems/largest-triangle-area/discuss/2700009/JAVA-or-Brute-force-or-using-function-or-Mathematical-formula