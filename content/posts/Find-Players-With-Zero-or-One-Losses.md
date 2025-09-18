---
title: "Find Players With Zero or One Losses"
date: 2024-12-01T19:55:32Z
lastmod: 2024-12-01T19:55:32Z
subTitle: ""
description: ""
draft: false
featured: true
type: posts
label: "orginal"
author: tothemoon
tags: ["Medium","Array","Hash Table", "Sort"]
categories: ["Leetcode"]
cover:
    position: <left,right>
    image: "null"
    alt: "<alt text>"
    caption: "<text>"
---

# 【2225】Find Players With Zero or One Losses <font size="3" color="#FF5733">Medium</font>

You are given an integer array `matches` where `matches[i] = [winneri, loseri]` indicates that the player `winneri` defeated player `loseri` in a match.

Return *a list* `answer` *of size* `2` *where:*

- `answer[0]` is a list of all players that have **not** lost any matches.
- `answer[1]` is a list of all players that have lost exactly **one** match.

The values in the two lists should be returned in **increasing** order.

**Note:**

- You should only consider the players that have played **at least one** match.
- The testcases will be generated such that **no** two matches will have the **same** outcome.

**Example 1:**

```
Input: matches = [[1,3],[2,3],[3,6],[5,6],[5,7],[4,5],[4,8],[4,9],[10,4],[10,9]]
Output: [[1,2,10],[4,5,7,8]]
Explanation:
Players 1, 2, and 10 have not lost any matches.
Players 4, 5, 7, and 8 each have lost one match.
Players 3, 6, and 9 each have lost two matches.
Thus, answer[0] = [1,2,10] and answer[1] = [4,5,7,8].
```

**Example 2:**

```
Input: matches = [[2,3],[1,3],[5,4],[6,4]]
Output: [[1,2,5,6],[]]
Explanation:
Players 1, 2, 5, and 6 have not lost any matches.
Players 3 and 4 each have lost two matches.
Thus, answer[0] = [1,2,5,6] and answer[1] = [].
```

**Constraints:**

- `1 <= matches.length <= 105`
- `matches[i].length == 2`
- `1 <= winneri, loseri <= 105`
- `winneri != loseri`
- All `matches[i]` are **unique**.

### 💡Solution

```java
   public List<List<Integer>> findWinners(int[][] matches) {
        Map<Integer,Integer> losers = new HashMap<>();
        Set<Integer> winners = new TreeSet<>();
        List<List<Integer>> ans = new ArrayList<>();
        for(int[] tmp : matches){
            int win = tmp[0];
            int lose = tmp[1];
            winners.add(win);
            losers.put(lose,losers.getOrDefault(lose,0)+1);
        }

        Set<Integer> loses = new TreeSet<>();
        for(Map.Entry<Integer,Integer> map : losers.entrySet()){
            int lose = map.getKey();
            winners.remove(lose);
            if(map.getValue() == 1){
                loses.add(lose);
            }
        }
        ans.add( new ArrayList<>(winners));
        ans.add( new ArrayList<>(loses));
        return ans;
    }
```

# 🔗 Refer links

https://leetcode.com/problems/find-players-with-zero-or-one-losses/description/