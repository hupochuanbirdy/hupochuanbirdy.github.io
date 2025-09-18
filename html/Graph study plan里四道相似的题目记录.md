# 图🌠Graph study plan里四道相似的题目记录

## 前沿

最近做Graph study plan里的题目，类型相似，记录一下，防止遗忘。【遗忘是常态】



## 💙 【127】 Word Ladder <font size="3" color="#FF1010">Hard</font>

A **transformation sequence** from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence of words `beginWord -> s1 -> s2 -> ... -> sk` such that:

- Every adjacent pair of words differs by a single letter.
- Every `si` for `1 <= i <= k` is in `wordList`. Note that `beginWord` does not need to be in `wordList`.
- `sk == endWord`

Given two words, `beginWord` and `endWord`, and a dictionary `wordList`, return *the **number of words** in the **shortest transformation sequence** from* `beginWord` *to* `endWord`*, or* `0` *if no such sequence exists.*

**Example 1:**

```
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.
```

**Example 2:**

```
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: 0
Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.
```

**Constraints:**

- `1 <= beginWord.length <= 10`
- `endWord.length == beginWord.length`
- `1 <= wordList.length <= 5000`
- `wordList[i].length == beginWord.length`
- `beginWord`, `endWord`, and `wordList[i]` consist of lowercase English letters.
- `beginWord != endWord`
- All the words in `wordList` are **unique**.

### 💡Solution

```java
  public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        HashSet<String> hashSet = new HashSet<>(wordList);
        if (!hashSet.contains(endWord)) return 0;
        Queue<String> queue = new LinkedList<>();
        queue.offer(beginWord);
        int level = 1;
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                String cur = queue.poll();
                char[] curletter = cur.toCharArray();
                for (int j = 0; j < curletter.length; j++) {
                    char orginal = curletter[j];
                    for (char k = 'a'; k <= 'z'; k++) {
                        if (curletter[j] == k) continue;
                        curletter[j] = k;
                        String newWord = String.valueOf(curletter);
                        if (newWord.equals(endWord)) return level + 1;
                        if (hashSet.contains(newWord)) {
                            queue.offer(newWord);
                            hashSet.remove(newWord);
                        }
                    }
                    curletter[j] = orginal;
                }
            }
            level++;
        }
        return 0;
    }
```

## 💙【1654】 Minimum Jumps to Reach Homes <font size="3" color="#FF5733">Medium</font>

A certain bug's home is on the x-axis at position `x`. Help them get there from position `0`.

The bug jumps according to the following rules:

- It can jump exactly `a` positions **forward** (to the right).
- It can jump exactly `b` positions **backward** (to the left).
- It cannot jump backward twice in a row.
- It cannot jump to any `forbidden` positions.

The bug may jump forward **beyond** its home, but it **cannot jump** to positions numbered with **negative** integers.

Given an array of integers `forbidden`, where `forbidden[i]` means that the bug cannot jump to the position `forbidden[i]`, and integers `a`, `b`, and `x`, return *the minimum number of jumps needed for the bug to reach its home*. If there is no possible sequence of jumps that lands the bug on position `x`, return `-1.`

**Example 1:**

```
Input: forbidden = [14,4,18,1,15], a = 3, b = 15, x = 9
Output: 3
Explanation: 3 jumps forward (0 -> 3 -> 6 -> 9) will get the bug home.
```

**Example 2:**

```
Input: forbidden = [8,3,16,6,12,20], a = 15, b = 13, x = 11
Output: -1
```

**Example 3:**

```
Input: forbidden = [1,6,2,14,5,17,4], a = 16, b = 9, x = 7
Output: 2
Explanation: One jump forward (0 -> 16) then one jump backward (16 -> 7) will get the bug home.
```

**Constraints:**

- `1 <= forbidden.length <= 1000`
- `1 <= a, b, forbidden[i] <= 2000`
- `0 <= x <= 2000`
- All the elements in `forbidden` are distinct.
- Position `x` is not forbidden.

### 💡Solution

```java
    public int minimumJumps(int[] forbidden, int a, int b, int x) {
       HashSet<String> visited = new HashSet<>();
        HashSet<Integer> forbiddenList = new HashSet<Integer>();
        for (int i : forbidden) forbiddenList.add(i);
        Queue<int[]> queue = new LinkedList<>();
        int count = 0;
        int max = 2000+a+b; //题目中限定大小2000以内
        queue.offer(new int[]{0, 0}); //int[]{坐标，0:向前 1:向后} 只能向后一次

        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                int[] cur = queue.poll();
                int pos = cur[0], direction = cur[1];
                if(pos == x) return count;
                if(pos + a < max && !forbiddenList.contains(pos + a) && !visited.contains(pos+a+","+0)){
                    visited.add(pos+a+","+0);
                    queue.offer(new int[]{pos + a, 0});
                }
                if(direction == 0) {
                    if(pos - b >= 0 && !forbiddenList.contains(pos - b) && !visited.contains(pos-b+","+1)) {
                        visited.add(pos-b+","+1);
                        queue.offer(new int[]{pos - b, 1});
                    }
                }
            }
            count++;
        }
        return -1;   
    }
```

## 💙 【1306】 Jump Game III <font size="3" color="#FF5733">Medium</font>

Given an array of non-negative integers `arr`, you are initially positioned at `start` index of the array. When you are at index `i`, you can jump to `i + arr[i]` or `i - arr[i]`, check if you can reach to **any** index with value 0.

Notice that you can not jump outside of the array at any time.

**Example 1:**

```
Input: arr = [4,2,3,0,3,1,2], start = 5
Output: true
Explanation: 
All possible ways to reach at index 3 with value 0 are: 
index 5 -> index 4 -> index 1 -> index 3 
index 5 -> index 6 -> index 4 -> index 1 -> index 3 
```

**Example 2:**

```
Input: arr = [4,2,3,0,3,1,2], start = 0
Output: true 
Explanation: 
One possible way to reach at index 3 with value 0 is: 
index 0 -> index 4 -> index 1 -> index 3
```

**Example 3:**

```
Input: arr = [3,0,2,1,2], start = 2
Output: false
Explanation: There is no way to reach at index 1 with value 0.
```

**Constraints:**

- `1 <= arr.length <= 5 * 104`
- `0 <= arr[i] < arr.length`
- `0 <= start < arr.length`

### 💡Solution

```java
    public boolean canReach(int[] arr, int start) {
        Queue<Integer> queue = new LinkedList<>();
        queue.offer(start);
        HashSet<Integer> visited = new HashSet<>();
        while (!queue.isEmpty()){
            int size = queue.size();
            for(int i = 0 ;i<size;i++) {
                int curr = queue.poll();
                if(!visited.contains(curr)){
                    visited.add(curr);
                }else continue;
                if(curr-arr[curr] >= 0){
                    if(arr[curr-arr[curr]] == 0) return true;
                    queue.offer(curr-arr[curr]);
                }
                if(curr+arr[curr] < arr.length){
                    if(arr[curr+arr[curr]] == 0) return true;
                    queue.offer(curr+arr[curr]);
                }
            }
        }
        return false;
    }
```

## 💙 【433】 Minimum Genetic Mutation <font size="3" color="#FF5733">Medium</font>

A gene string can be represented by an 8-character long string, with choices from `'A'`, `'C'`, `'G'`, and `'T'`.

Suppose we need to investigate a mutation from a gene string `startGene` to a gene string `endGene` where one mutation is defined as one single character changed in the gene string.

- For example, `"AACCGGTT" --> "AACCGGTA"` is one mutation.

There is also a gene bank `bank` that records all the valid gene mutations. A gene must be in `bank` to make it a valid gene string.

Given the two gene strings `startGene` and `endGene` and the gene bank `bank`, return *the minimum number of mutations needed to mutate from* `startGene` *to* `endGene`. If there is no such a mutation, return `-1`.

Note that the starting point is assumed to be valid, so it might not be included in the bank.

**Example 1:**

```
Input: startGene = "AACCGGTT", endGene = "AACCGGTA", bank = ["AACCGGTA"]
Output: 1
```

**Example 2:**

```
Input: startGene = "AACCGGTT", endGene = "AAACGGTA", bank = ["AACCGGTA","AACCGCTA","AAACGGTA"]
Output: 2
```

**Constraints:**

- `0 <= bank.length <= 10`
- `startGene.length == endGene.length == bank[i].length == 8`
- `startGene`, `endGene`, and `bank[i]` consist of only the characters `['A', 'C', 'G', 'T']`.

### 💡Solution

```java
   public int minMutation(String start, String end, String[] bank) {
        if(start.equals(end)) return 0;
        HashSet<String> bankMap = new HashSet<>(Arrays.asList(bank));
        if (!bankMap.contains(end)) return -1;
        Queue<String> queue = new LinkedList<>();
        char[] charSet = new char[]{'A', 'C', 'G', 'T'};
        Set<String> visited = new HashSet<>();
        visited.add(start);
        queue.offer(start);
        int level = 0;

        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                String curr = queue.poll();
                if(curr.equals(end)) return level;
                char[] currArray = curr.toCharArray();
                for(int k =0 ;k<currArray.length;k++){
                    char temp = currArray[k];
                    for(char c: charSet) {
                        currArray[k] = c;
                        String next = new String(currArray);
                        if(!visited.contains(next) && bankMap.contains(next)) {
                            visited.add(next);
                            queue.offer(next);
                        }
                    }
                    currArray[k] = temp;
                }
            }
            level++;
        }
        return -1;
    }
```

# 🔗 Refer links

https://leetcode.com/problems/word-ladder/

https://leetcode.com/problems/minimum-jumps-to-reach-home/

https://leetcode.com/problems/jump-game-iii/

https://leetcode.com/problems/minimum-genetic-mutation/