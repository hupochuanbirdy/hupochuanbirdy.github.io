# Graph图🌠 经典🥳  207 Course Schedule

## 💙 【207】Course Schedule <font size="3" color="#FF5733">Medium</font>

There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you **must** take course `bi` first if you want to take course `ai`.

- For example, the pair `[0, 1]`, indicates that to take course `0` you have to first take course `1`.

Return `true` if you can finish all courses. Otherwise, return `false`.

**Example 1:**

```
Input: numCourses = 2, prerequisites = [[1,0]]
Output: true
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0. So it is possible.
```

**Example 2:**

```
Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false
Explanation: There are a total of 2 courses to take. 
To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible. 
```

**Constraints:**

- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= 5000`
- `prerequisites[i].length == 2`
- `0 <= ai, bi < numCourses`
- All the pairs prerequisites[i] are **unique**.

### 📝个人分析

简单来说，修一门课程的前提是需要修其他课程

比如 修课程C的前提是学习A课程，修B课程的前提是必须修A和C课程。

A---B

C---B

A---C

但如果改为：

A---B

C---B

B---C // 形成回路，显然不可能

> Example 1: Input: numCourses = 2, prerequisites = [[1,0]]        Output: true 
>
> Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible. 
>
> Example 2: Input: numCourses = 2, prerequisites = [[1,0],[0,1]]    Output: false 
>
> Explanation: There are a total of 2 courses to take. To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.

**<font size="3" color="#C70039">简而言之，此题的目的是判断是否形成回路</font>**

### 💡Solution

```java
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        int[] inDegree = new int[numCourses];
        Map<Integer,List<Integer>> graph = new HashMap<>();
        for(int[] c : prerequisites){// 构建图
            int next = c[0];
            int pre = c[1];
            inDegree[next]++;
            if(graph.containsKey(pre)){
                graph.get(pre).add(next);
            }else {
                ArrayList<Integer> list = new ArrayList<>();
                list.add(next);
                graph.put(pre,list);
            }
        }
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if(inDegree[i] == 0)queue.add(i); // 入度为0的，意味着是没有前提条件的课程
        }
        int count = 0;
        while (!queue.isEmpty()){
            int cur = queue.poll();
            if(graph.get(cur) != null) {
                for(int i : graph.get(cur)){
                    inDegree[i]--;
                    if(inDegree[i]==0) queue.add(i);
                }
            }
            count++;
        }
        return count==numCourses;
    }
```

# 🔗 Refer links

https://leetcode.com/problems/course-schedule/