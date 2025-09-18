# Insight String Array 2423 1471

## 💚【2423】Remove Letter To Equalize Frequency <font size="3" color="02C850">Easy</font>

You are given a **0-indexed** string `word`, consisting of lowercase English letters. You need to select **one** index and **remove** the letter at that index from `word` so that the **frequency** of every letter present in `word` is equal.

Return `true` *if it is possible to remove one letter so that the frequency of all letters in* `word` *are equal, and* `false` *otherwise*.

**Note:**

- The **frequency** of a letter `x` is the number of times it occurs in the string.
- You **must** remove exactly one letter and cannot chose to do nothing. 

**Example 1:**

```
Input: word = "abcc"
Output: true
Explanation: Select index 3 and delete it: word becomes "abc" and each character has a frequency of 1.
```

**Example 2:**

```
Input: word = "aazz"
Output: false
Explanation: We must delete a character, so either the frequency of "a" is 1 and the frequency of "z" is 2, or vice versa. It is impossible to make all present letters have equal frequency.
```

**Constraints:**

- `2 <= word.length <= 100`
- `word` consists of lowercase English letters only.

### 💡Solution

```java
class Solution {
     public boolean equalFrequency(String word) {
        int[] alp = new int[26];
        for(char c : word.toCharArray()){
            alp[c-'a']++;
        }
        // Arrays.sort(alp);

        for(int i =0;i<26;i++){
            if(alp[i] == 0) continue;
            alp[i]--;
            if(checkIsValid(alp)){
                return true;
            }
            alp[i]++;
        }
        return false;
    }

    private boolean checkIsValid(int[] alp) {
        Set<Integer> set = new HashSet<>();
        for(int i =0;i<26;i++){
            if(alp[i] == 0) continue;
            set.add(alp[i]);
        }
        return set.size() == 1;
    }
}
```

## 💙【1471】The k Strongest Values in an Array <font size="3" color="#FF5733">Medium</font>

Given an array of integers `arr` and an integer `k`.

A value `arr[i]` is said to be stronger than a value `arr[j]` if `|arr[i] - m| > |arr[j] - m|` where `m` is the **median** of the array.
If `|arr[i] - m| == |arr[j] - m|`, then `arr[i]` is said to be stronger than `arr[j]` if `arr[i] > arr[j]`.

Return *a list of the strongest `k`* values in the array. return the answer **in any arbitrary order**.

**Median** is the middle value in an ordered integer list. More formally, if the length of the list is n, the median is the element in position `((n - 1) / 2)` in the sorted list **(0-indexed)**.

- For `arr = [6, -3, 7, 2, 11]`, `n = 5` and the median is obtained by sorting the array `arr = [-3, 2, 6, 7, 11]` and the median is `arr[m]` where `m = ((5 - 1) / 2) = 2`. The median is `6`.
- For `arr = [-7, 22, 17, 3]`, `n = 4` and the median is obtained by sorting the array `arr = [-7, 3, 17, 22]` and the median is `arr[m]` where `m = ((4 - 1) / 2) = 1`. The median is `3`.

 **Example 1:**

```
Input: arr = [1,2,3,4,5], k = 2
Output: [5,1]
Explanation: Median is 3, the elements of the array sorted by the strongest are [5,1,4,2,3]. The strongest 2 elements are [5, 1]. [1, 5] is also accepted answer.
Please note that although |5 - 3| == |1 - 3| but 5 is stronger than 1 because 5 > 1.
```

**Example 2:**

```
Input: arr = [1,1,3,5,5], k = 2
Output: [5,5]
Explanation: Median is 3, the elements of the array sorted by the strongest are [5,5,1,1,3]. The strongest 2 elements are [5, 5].
```

**Example 3:**

```
Input: arr = [6,7,11,7,6,8], k = 5
Output: [11,8,6,6,7]
Explanation: Median is 7, the elements of the array sorted by the strongest are [11,8,6,6,7,7].
Any permutation of [11,8,6,6,7] is accepted. 
```

**Constraints:**

- `1 <= arr.length <= 105`
- `-105 <= arr[i] <= 105`
- `1 <= k <= arr.length`

### 💡Solution

```java
    public int[] getStrongest(int[] arr, int k) {
        Arrays.sort(arr);
        int n = arr.length;
        int med = arr[(n - 1) / 2];
        int[] res = new int[k];
        int low = 0;
        int high = n - 1;
        for (int i = 0; i < k; i++) {
            if (med - arr[low] <= arr[high] - med) {
                res[i] = arr[high];
                high--;
            } else {
                res[i] = arr[low];
                low++;
            }
        }
        return res;
    }
```

# 🔗 Refer links

https://leetcode.com/problems/remove-letter-to-equalize-frequency/description/

https://leetcode.com/problems/the-k-strongest-values-in-an-array/