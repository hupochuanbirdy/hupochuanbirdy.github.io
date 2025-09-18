# Graph图🌠 经典🥳 1376 Time Needed to Inform All Employees

## 💙 【1376】  Time Needed to Inform All Employees <font size="3" color="#FF5733">Medium</font>

A company has `n` employees with a unique ID for each employee from `0` to `n - 1`. The head of the company is the one with `headID`.

Each employee has one direct manager given in the `manager` array where `manager[i]` is the direct manager of the `i-th` employee, `manager[headID] = -1`. Also, it is guaranteed that the subordination relationships have a tree structure.

The head of the company wants to inform all the company employees of an urgent piece of news. He will inform his direct subordinates, and they will inform their subordinates, and so on until all employees know about the urgent news.

The `i-th` employee needs `informTime[i]` minutes to inform all of his direct subordinates (i.e., After informTime[i] minutes, all his direct subordinates can start spreading the news).

Return *the number of minutes* needed to inform all the employees about the urgent news.

**Example 1:**

```
Input: n = 1, headID = 0, manager = [-1], informTime = [0]
Output: 0
Explanation: The head of the company is the only employee in the company.
```

**Example 2:**

![img](https://assets.leetcode.com/uploads/2020/02/27/graph.png)

```
Input: n = 6, headID = 2, manager = [2,2,-1,2,2,2], informTime = [0,0,1,0,0,0]
Output: 1
Explanation: The head of the company with id = 2 is the direct manager of all the employees in the company and needs 1 minute to inform them all.
The tree structure of the employees in the company is shown.
```

**Constraints:**

- `1 <= n <= 105`
- `0 <= headID < n`
- `manager.length == n`
- `0 <= manager[i] < n`
- `manager[headID] == -1`
- `informTime.length == n`
- `0 <= informTime[i] <= 1000`
- `informTime[i] == 0` if employee `i` has no subordinates.
- It is **guaranteed** that all the employees can be informed.

### 👹 Hint

**<font size="3" color="#C70039">依旧是Graph题目，这类题的模板是1）先建图，2）遍历，BFS和DFS是通用遍历模板。</font>**

### 💡Solution

```java
    public int numOfMinutes(int n, int headID, int[] manager, int[] informTime) {
        HashMap<Integer,List<Integer>> map = new HashMap<>();
        for(int i = 0; i < manager.length; i++){
            List<Integer> list = map.getOrDefault(manager[i], new ArrayList<Integer>());
            list.add(i);
            map.put(manager[i], list);
        }
        Queue<int[]> queue = new ArrayDeque<>();
        int all_time = 0;
        queue.offer(new int[]{headID,informTime[headID]});
        while (!queue.isEmpty()){
            int size = queue.size();
            for(int i = 0 ;i<size;i++){
                int[] curr = queue.poll();
                int managerID = curr[0];
                int time = curr[1];
                all_time = Math.max(all_time, time);
                if(map.containsKey(managerID)){
                    List<Integer> allDirectReports = map.get(managerID);
                    for(int report : allDirectReports){
                        queue.add(new int[] {report, time + informTime[report]});
                    }
                }
            }
        }
        return all_time;
    }
```

# 🔗 Refer links

https://leetcode.com/problems/time-needed-to-inform-all-employees/?envType=study-plan&id=graph-i