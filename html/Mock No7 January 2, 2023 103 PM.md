# Mock No7 January 2, 2023 1:03 PM

## 💚 551. Student Attendance Record I

You are given a string `s` representing an attendance record for a student where each character signifies whether the student was absent, late, or present on that day. The record only contains the following three characters:

- `'A'`: Absent.
- `'L'`: Late.
- `'P'`: Present.

The student is eligible for an attendance award if they meet **both** of the following criteria:

- The student was absent (`'A'`) for **strictly** fewer than 2 days **total**.
- The student was **never** late (`'L'`) for 3 or more **consecutive** days.

Return `true` *if the student is eligible for an attendance award, or* `false` *otherwise*.

**Example 1:**

```
Input: s = "PPALLP"
Output: true
Explanation: The student has fewer than 2 absences and was never late 3 or more consecutive days.
```

**Example 2:**

```
Input: s = "PPALLL"
Output: false
Explanation: The student was late 3 consecutive days in the last 3 days, so is not eligible for the award. 
```

**Constraints:**

- `1 <= s.length <= 1000`
- `s[i]` is either `'A'`, `'L'`, or `'P'`.

### 💡 Solution

```java
public boolean checkRecord(String s) {
    char[] chars = s.toCharArray();
    int len = s.length();
    int late = 0;
    int absent = 0;
    int pointer = 0;
    while (pointer < len) {
        char cur = chars[pointer++];
        if (cur == 'A') {
            absent++;
            late = 0;
            if (absent >= 2) {
                return false;
            }
        } else if (cur == 'P') {
            late = 0;
        } else if (cur == 'L') {
            late++;
            if (late >= 3) {
                return false;
            }
        }
    }
    return true;
}
```

## 🧡 743. Network Delay Time

You are given a network of `n` nodes, labeled from `1` to `n`. You are also given `times`, a list of travel times as directed edges `times[i] = (ui, vi, wi)`, where `ui` is the source node, `vi` is the target node, and `wi` is the time it takes for a signal to travel from source to target.

We will send a signal from a given node `k`. Return *the **minimum** time it takes for all the* `n` *nodes to receive the signal*. If it is impossible for all the `n` nodes to receive the signal, return `-1`. 

**Example 1:**

![img](https://assets.leetcode.com/uploads/2019/05/23/931_example_1.png)

```
Input: times = [[2,1,1],[2,3,1],[3,4,1]], n = 4, k = 2
Output: 2
```

**Example 2:**

```
Input: times = [[1,2,1]], n = 2, k = 1
Output: 1
```

**Example 3:**

```
Input: times = [[1,2,1]], n = 2, k = 2
Output: -1
```

**Constraints:**

- `1 <= k <= n <= 100`
- `1 <= times.length <= 6000`
- `times[i].length == 3`
- `1 <= ui, vi <= n`
- `ui != vi`
- `0 <= wi <= 100`
- All the pairs `(ui, vi)` are **unique**. (i.e., no multiple edges.)

### 💡 Solution

```java
public int networkDelayTime(int[][] times, int n, int k) {
    Map<Integer, List<int[]>> graph = new HashMap<>();
    for (int[] net : times) {
        int source = net[0];
        int target = net[1];
        int weight = net[2];
        List<int[]> list = graph.getOrDefault(source, new LinkedList<int[]>());
        list.add(new int[]{target, weight});
        graph.put(source, list);
    }
    PriorityQueue<int[]> queue = new PriorityQueue<>(new Comparator<int[]>() {
        @Override
        public int compare(int[] o1, int[] o2) {
            return o1[1] - o2[1];
        }
    });
    if (graph.containsKey(k)) {
        queue.add(new int[]{k, 0});
    } else {
        return -1;
    }
    Set<Integer> visited = new HashSet<>();
    int count = Integer.MAX_VALUE;
    while (!queue.isEmpty()) {
        int[] tmp = queue.poll();
        int node = tmp[0];
        int weight = tmp[1];
        if (visited.contains(node)) continue;
        visited.add(node);
        count = weight;
        if (graph.containsKey(node)) {
            List<int[]> list = graph.get(node);
            for (int[] ints : list) {
                int node_t = ints[0];
                int weight_t = ints[1];
                if (visited.contains(node_t)) continue;
                queue.add(new int[]{node_t, weight + weight_t});
            }
        }
    }
    return visited.size() == n ? -1 : count;
}
```

# 🔗 Refer links

https://leetcode.com/problems/student-attendance-record-i/description/

https://leetcode.com/problems/network-delay-time/

[![pSPWNrV.png](https://s1.ax1x.com/2023/01/02/pSPWNrV.png)](https://imgse.com/i/pSPWNrV)