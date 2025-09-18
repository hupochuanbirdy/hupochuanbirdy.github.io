# Greedy 贪心算法🤑🤑& PriorityQueue

## 🎃1753. Maximum Score From Removing Stones <font size="3" color="#FF5733">Medium</font>

You are playing a solitaire game with **three piles** of stones of sizes `a`, `b`, and `c` respectively. Each turn you choose two **different non-empty** piles, take one stone from each, and add `1` point to your score. The game stops when there are **fewer than two non-empty** piles (meaning there are no more available moves).

Given three integers `a`, `b`, and `c`, return *the* ***maximum\*** ***score** you can get.*

**Example 1:**

```
Input: a = 2, b = 4, c = 6
Output: 6
Explanation: The starting state is (2, 4, 6). One optimal set of moves is:
- Take from 1st and 3rd piles, state is now (1, 4, 5)
- Take from 1st and 3rd piles, state is now (0, 4, 4)
- Take from 2nd and 3rd piles, state is now (0, 3, 3)
- Take from 2nd and 3rd piles, state is now (0, 2, 2)
- Take from 2nd and 3rd piles, state is now (0, 1, 1)
- Take from 2nd and 3rd piles, state is now (0, 0, 0)
There are fewer than two non-empty piles, so the game ends. Total: 6 points.
```

**Example 2:**

```
Input: a = 4, b = 4, c = 6
Output: 7
Explanation: The starting state is (4, 4, 6). One optimal set of moves is:
- Take from 1st and 2nd piles, state is now (3, 3, 6)
- Take from 1st and 3rd piles, state is now (2, 3, 5)
- Take from 1st and 3rd piles, state is now (1, 3, 4)
- Take from 1st and 3rd piles, state is now (0, 3, 3)
- Take from 2nd and 3rd piles, state is now (0, 2, 2)
- Take from 2nd and 3rd piles, state is now (0, 1, 1)
- Take from 2nd and 3rd piles, state is now (0, 0, 0)
There are fewer than two non-empty piles, so the game ends. Total: 7 points.
```

**Example 3:**

```
Input: a = 1, b = 8, c = 8
Output: 8
Explanation: One optimal set of moves is to take from the 2nd and 3rd piles for 8 turns until they are empty.
After that, there are fewer than two non-empty piles, so the game ends.
```

**Constraints:**

- `1 <= a, b, c <= 105`

### 💡Solution

```java
public int maximumScore(int a, int b, int c) {
     PriorityQueue<Integer> max = new PriorityQueue<>((a1, a2) -> Integer.compare(a2, a1));
    max.add(a);
    max.add(b);
    max.add(c);
    int count = 0;
    int first = max.poll();
    int second = max.poll();
    while (first > 0 && second > 0) {
        max.add(first - 1);
        max.add(second - 1);
        first = max.poll();
        second = max.poll();
        count++;
    }
    return count;
}
```

## 🎃1962. Remove Stones🪨 to Minimize the Total <font size="3" color="#FF5733">Medium</font>

You are given a **0-indexed** integer array `piles`, where `piles[i]` represents the number of stones in the `ith` pile, and an integer `k`. You should apply the following operation **exactly** `k` times:

- Choose any `piles[i]` and **remove** `floor(piles[i] / 2)` stones from it.

**Notice** that you can apply the operation on the **same** pile more than once.

Return *the **minimum** possible total number of stones remaining after applying the* `k` *operations*.

`floor(x)` is the **greatest** integer that is **smaller** than or **equal** to `x` (i.e., rounds `x` down).

 **Example 1:**

```
Input: piles = [5,4,9], k = 2
Output: 12
Explanation: Steps of a possible scenario are:
- Apply the operation on pile 2. The resulting piles are [5,4,5].
- Apply the operation on pile 0. The resulting piles are [3,4,5].
The total number of stones in [3,4,5] is 12.
```

**Constraints:**

- `1 <= piles.length <= 105`
- `1 <= piles[i] <= 104`
- `1 <= k <= 105`

### 💡Solution

```java
public int minStoneSum(int[] piles, int k) {
    //Comparator.reverseOrder()
  PriorityQueue<Integer> priorityQueue = new PriorityQueue<>((a,b)->(b-a));
    for(int value: piles){
        priorityQueue.offer(value);
    }
    while (k>0){
        int pop = priorityQueue.poll();
        int tmp =pop%2==0 ? pop/2 : (pop/2 +1) ; //当然可以用Math.ceil
        priorityQueue.add(tmp);
        k--;
    }
    int ans = 0 ;
    while (!priorityQueue.isEmpty()){
        ans += priorityQueue.poll();
    }
    return ans;
}
```

## 🎃2182. Construct String With Repeat Limit

You are given a string `s` and an integer `repeatLimit`. Construct a new string `repeatLimitedString` using the characters of `s` such that no letter appears **more than** `repeatLimit` times **in a row**. You do **not** have to use all characters from `s`.

Return *the **lexicographically largest*** `repeatLimitedString` *possible*.

A string `a` is **lexicographically larger** than a string `b` if in the first position where `a` and `b` differ, string `a` has a letter that appears later in the alphabet than the corresponding letter in `b`. If the first `min(a.length, b.length)` characters do not differ, then the longer string is the lexicographically larger one. 

**Example 1:**

```
Input: s = "cczazcc", repeatLimit = 3
Output: "zzcccac"
Explanation: We use all of the characters from s to construct the repeatLimitedString "zzcccac".
The letter 'a' appears at most 1 time in a row.
The letter 'c' appears at most 3 times in a row.
The letter 'z' appears at most 2 times in a row.
Hence, no letter appears more than repeatLimit times in a row and the string is a valid repeatLimitedString.
The string is the lexicographically largest repeatLimitedString possible so we return "zzcccac".
Note that the string "zzcccca" is lexicographically larger but the letter 'c' appears more than 3 times in a row, so it is not a valid repeatLimitedString.
```

**Example 2:**

```
Input: s = "aababab", repeatLimit = 2
Output: "bbabaa"
Explanation: We use only some of the characters from s to construct the repeatLimitedString "bbabaa". 
The letter 'a' appears at most 2 times in a row.
The letter 'b' appears at most 2 times in a row.
Hence, no letter appears more than repeatLimit times in a row and the string is a valid repeatLimitedString.
The string is the lexicographically largest repeatLimitedString possible so we return "bbabaa".
Note that the string "bbabaaa" is lexicographically larger but the letter 'a' appears more than 2 times in a row, so it is not a valid repeatLimitedString.
```

**Constraints:**

- `1 <= repeatLimit <= s.length <= 105`
- `s` consists of lowercase English letters.

```java
public String repeatLimitedString(String s, int repeatLimit) {
    Map<Character,Integer> map = new HashMap<>();
    for(char c : s.toCharArray()){
        map.put(c,map.getOrDefault(c,0)+1);
    }
    PriorityQueue< Character> maxHeap = new PriorityQueue<>(new Comparator<Character>() {
        @Override
        public int compare(Character o1, Character o2) {
            return o2.compareTo(o1);
        }
    });
    for(Map.Entry<Character,Integer> entry : map.entrySet()){
        maxHeap.offer(entry.getKey());
    }

    StringBuilder sb = new StringBuilder();
    while(!maxHeap.isEmpty()){
        char curr = maxHeap.poll();
        for(int i = 0;i<repeatLimit;i++){
            sb.append(curr);
            int num = map.get(curr);
            num--;
            map.put(curr,num);
            if(num == 0){
                map.remove(curr);
                break;
            }
        }
        if(map.containsKey(curr) && map.get(curr) > 0 && !maxHeap.isEmpty()){
            char curr2 = maxHeap.poll();
            sb.append(curr2);
            int num = map.get(curr2);
            num--;
            map.put(curr2,num);
            if(num != 0){
                maxHeap.offer(curr2);
            }
            maxHeap.offer(curr);
        }
    }
    return sb.toString();
}
```

## 🔗 Leetcode links

https://leetcode.com/problems/maximum-score-from-removing-stones/

https://leetcode.com/problems/remove-stones-to-minimize-the-total/

https://leetcode.com/problems/construct-string-with-repeat-limit/

