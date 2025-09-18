# Two pointer No1

## 💙 【2332】The Latest Time to Catch a Bus

You are given a **0-indexed** integer array `buses` of length `n`, where `buses[i]` represents the departure time of the `ith` bus. You are also given a **0-indexed** integer array `passengers` of length `m`, where `passengers[j]` represents the arrival time of the `jth` passenger. All bus departure times are unique. All passenger arrival times are unique.

You are given an integer `capacity`, which represents the **maximum** number of passengers that can get on each bus.

When a passenger arrives, they will wait in line for the next available bus. You can get on a bus that departs at `x` minutes if you arrive at `y` minutes where `y <= x`, and the bus is not full. Passengers with the **earliest** arrival times get on the bus first.

More formally when a bus arrives, either:

- If `capacity` or fewer passengers are waiting for a bus, they will **all** get on the bus, or
- The `capacity` passengers with the **earliest** arrival times will get on the bus.

Return *the latest time you may arrive at the bus station to catch a bus*. You **cannot** arrive at the same time as another passenger.

**Note:** The arrays `buses` and `passengers` are not necessarily sorted.

**Example 1:**

```
Input: buses = [10,20], passengers = [2,17,18,19], capacity = 2
Output: 16
Explanation: Suppose you arrive at time 16.
At time 10, the first bus departs with the 0th passenger. 
At time 20, the second bus departs with you and the 1st passenger.
Note that you may not arrive at the same time as another passenger, which is why you must arrive before the 1st passenger to catch the bus.
```

**Example 2:**

```
Input: buses = [20,30,10], passengers = [19,13,26,4,25,11,21], capacity = 2
Output: 20
Explanation: Suppose you arrive at time 20.
At time 10, the first bus departs with the 3rd passenger. 
At time 20, the second bus departs with the 5th and 1st passengers.
At time 30, the third bus departs with the 0th passenger and you.
Notice if you had arrived any later, then the 6th passenger would have taken your seat on the third bus.
```

**Constraints:**

- `n == buses.length`
- `m == passengers.length`
- `1 <= n, m, capacity <= 105`
- `2 <= buses[i], passengers[i] <= 109`
- Each element in `buses` is **unique**.
- Each element in `passengers` is **unique**.

### 📝个人分析

<font size="3" color="#C70039">**例如： buses = [20,30,10], passengers = [19,13,26,4,25,11,21], capacity = 2**</font>

排序后**buses = [10,20,30], passengers = [4,11,13,19,21,26,26]**

巴士🚌到到达的事件是第10，20，30分钟，乘客排队的时间是第4，11，13....分钟。

在第一辆巴士到达时候，第10分钟，只有一个乘客可以上车，因为她第四分钟就等车了。**passengers = [11,13,19,21,26,26]**

第二辆车到达时候，第20分钟，第二，三乘客可以上车，她们分别是第11，13分钟就等车了，因为capacity=2，只能有两个乘客上车。**passengers = [19,21,26,26]**

现在只有最后一辆车了，你的选择是第14，15，16，17，18，20这几个时间到达。题目LatestLatestLatest最近的时间，也就是踩点时间，那就不存在提前到达了，只有20一个选择，因为21已经有人到达了，第22分钟来的时候就赶不上车了。

#### ❓一些边缘条件

```
//final answer might lie in : 
//case 1 : if a bus is not full, we arrive at its departure time.
//case 2 : if a bus is full, we arrive before one of its passengers. 

// edge case : CAN NOT ARRIVE AT THE SAME TIME AS another passenger, this
// screams hashset.... so we record the arrive time of every passenger getting on buses
//kinda like simulating the whole process.

//assume that one passenger is getting on a bus, we snatch his/her spot, yeah, 
//quite wrong, I know, but they ask us to do it, this corresponds to case 2

//as for case 1, right before a bus departs, we check if it is full, if its not, we assume
//we arrive at its departure time.

//finally, we will greedily update the answer, and return the final answer.
```

# 🔗 Refer links

https://leetcode.com/problems/the-latest-time-to-catch-a-bus/

