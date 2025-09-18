# Matrix 二维数组 graph queue💥2101. Detonate the Maximum Bombs💣 欧几里得距离

##  💙【2101】Detonate the Maximum Bombs  <font size="3" color="#FF5733">Medium</font>

You are given a list of bombs. The **range** of a bomb is defined as the area where its effect can be felt. This area is in the shape of a **circle** with the center as the location of the bomb.

The bombs are represented by a **0-indexed** 2D integer array `bombs` where `bombs[i] = [xi, yi, ri]`. `xi` and `yi` denote the X-coordinate and Y-coordinate of the location of the `ith` bomb, whereas `ri` denotes the **radius** of its range.

You may choose to detonate a **single** bomb. When a bomb is detonated, it will detonate **all bombs** that lie in its range. These bombs will further detonate the bombs that lie in their ranges.

Given the list of `bombs`, return *the **maximum** number of bombs that can be detonated if you are allowed to detonate **only one** bomb*.

**Example 1:**

<img src="https://assets.leetcode.com/uploads/2021/11/06/desmos-eg-3.png" alt="img" style="zoom:33%;" />

```
Input: bombs = [[2,1,3],[6,1,4]]
Output: 2
Explanation:
The above figure shows the positions and ranges of the 2 bombs.
If we detonate the left bomb, the right bomb will not be affected.
But if we detonate the right bomb, both bombs will be detonated.
So the maximum bombs that can be detonated is max(1, 2) = 2.
```

**Example 2:**

<img src="https://assets.leetcode.com/uploads/2021/11/06/desmos-eg-2.png" alt="img" style="zoom:33%;" />

```
Input: bombs = [[1,1,5],[10,10,5]]
Output: 1
Explanation:
Detonating either bomb will not detonate the other bomb, so the maximum number of bombs that can be detonated is 1.
```

**Example 3:**

<img src="https://assets.leetcode.com/uploads/2021/11/07/desmos-eg1.png" alt="img" style="zoom:33%;" />

```
Input: bombs = [[1,2,3],[2,3,1],[3,4,2],[4,5,3],[5,6,4]]
Output: 5
Explanation:
The best bomb to detonate is bomb 0 because:
- Bomb 0 detonates bombs 1 and 2. The red circle denotes the range of bomb 0.
- Bomb 2 detonates bomb 3. The blue circle denotes the range of bomb 2.
- Bomb 3 detonates bomb 4. The green circle denotes the range of bomb 3.
Thus all 5 bombs are detonated. 
```

**Constraints:**

- `1 <= bombs.length <= 100`
- `bombs[i].length == 3`
- `1 <= xi, yi, ri <= 105`

### 📝个人分析

这题涉及到欧几里得距离，如何确定炸弹与炸弹之间是不是在其半径范围内就需要用欧几里得度量（[欧氏距离](https://so.csdn.net/so/search?q=欧氏距离&spm=1001.2101.3001.7020)） Euclidean Metric，Euclidean Distance。

指在m维空间中**两个点之间的真实距离**，或者**向量的自然长度**（即该点到原点的距离）。
$$
\rho = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}
$$
x `bombs[i][0] - bombs[j][0] `

y `bombs[i][1] - bombs[j][1]`

如果炸弹在其范围内，加入到map中，**map存储<炸弹i, 炸弹i范围内的炸弹列表>**.

这个过程是graph建图的经典步骤。

另外 ` Queue<Integer> queue = new ArrayDeque<>();`这段代码为啥放在for以内，因为需要遍历从0->n的炸弹，可以看作图里顶点与顶点是否有相连的边，如果有，说明两个顶点相邻，也就是在爆炸范围内。

### 💡Solution

```java
static public int maximumDetonation(int[][] bombs) {
    Map<Integer, List<Integer>> graph = new HashMap<>();
    int n = bombs.length;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            long dx = bombs[i][0] - bombs[j][0];
            long dy = bombs[i][1] - bombs[j][1];
            long r = bombs[i][2];
            if (dx * dx + dy * dy <= r * r) { // 在r范围内
                List<Integer> list = graph.getOrDefault(i, new ArrayList<>());
                list.add(j);
                graph.put(i, list);
            }
        }
    }
    int ans = 0;

    for (int i = 0; i < n; i++) {
        Queue<Integer> queue = new ArrayDeque<>();
        queue.add(i);
        Set<Integer> visited = new HashSet<>();
        visited.add(i);
        while (!queue.isEmpty()) {
            int cur = queue.poll();
            for (int k : graph.get(cur)) {
                if (visited.contains(k)) continue;
                queue.add(k);
                visited.add(k);
            }
        }
        ans = Math.max(ans, visited.size());
    }
    return ans;
}
```

# 📍其他相似的题目

https://leetcode.com/problems/number-of-provinces/

# 🔗 Refer links

https://blog.csdn.net/m0_46168848/article/details/120379487

https://blog.csdn.net/sandalphon4869/article/details/104244791

https://leetcode.com/problems/detonate-the-maximum-bombs/