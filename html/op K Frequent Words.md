# PriorityQueue题：Top K Frequent Words

## 💙692. Top K Frequent Words

Given an array of strings `words` and an integer `k`, return *the* `k` *most frequent strings*.

Return the answer **sorted** by **the frequency** from highest to lowest. Sort the words with the same frequency by their **lexicographical order**.

**Example 1:**

```
Input: words = ["i","love","leetcode","i","love","coding"], k = 2
Output: ["i","love"]
Explanation: "i" and "love" are the two most frequent words.
Note that "i" comes before "love" due to a lower alphabetical order.
```

**Example 2:**

```
Input: words = ["the","day","is","sunny","the","the","the","sunny","is","is"], k = 4
Output: ["the","is","sunny","day"]
Explanation: "the", "is", "sunny" and "day" are the four most frequent words, with the number of occurrence being 4, 3, 2 and 1 respectively. 
```

**Constraints:**

- `1 <= words.length <= 500`
- `1 <= words[i].length <= 10`
- `words[i]` consists of lowercase English letters.
- `k` is in the range `[1, The number of **unique** words[i]]`

### 💡Solution

PriorityQueue排序规则

```java
    Comparator<String> comp = new Comparator<String>() {
        @Override
        public int compare(String a, String b) {
            if(map.get(a).equals(map.get(b)))
                return a.compareTo(b);
            return map.get(b)-map.get(a);
        }
    };
```

**<font color="#C70039">此处复写比较器，当字符串出现次数相同时，排序规则为字符串字母倒叙排列，否则按照出现次数倒叙（次数多的在堆顶）</font>**

```java
    public List<String> topKFrequent(String[] words, int k) {
         Map<String,Integer> map = new HashMap<>();
        for(String s : words){
            map.put(s,map.getOrDefault(s,0)+1);
        }
        Comparator<String> comp = new Comparator<String>() {
            @Override
            public int compare(String a, String b) {
                if(map.get(a).equals(map.get(b)))
                    return a.compareTo(b);
                return map.get(b)-map.get(a);
            }
        };
        PriorityQueue<String> maxHeap = new PriorityQueue<String>(comp);
        for(Map.Entry<String,Integer> item : map.entrySet()){
            maxHeap.offer(item.getKey());
        }
        // test
        //while (!maxHeap.isEmpty()){
        //    System.out.println(  maxHeap.poll());
      //  }

        List<String> ans = new ArrayList<>();
        for (int i = 0; i < k; i++) {
            ans.add(maxHeap.poll());
        }
        return ans;

    }
```

## 💙 347. Top K Frequent Elements 🧨

### 🎆买一送一题目

Given an integer array `nums` and an integer `k`, return *the* `k` *most frequent elements*. You may return the answer in **any order**. 

**Example 1:**

```
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
```

**Example 2:**

```
Input: nums = [1], k = 1
Output: [1]
```

**Constraints:**

- `1 <= nums.length <= 105`
- `-104 <= nums[i] <= 104`
- `k` is in the range `[1, the number of unique elements in the array]`.
- It is **guaranteed** that the answer is **unique**.

### 💡Solution

**<font color="#C70039">Ovrride排序器 根据Hashmap的value逆序排序，和692非常相似。所以还有另一种比较器写法。</font>**

```java
Comparator<Map.Entry<Integer, Integer>> comp = new Comparator<Map.Entry<Integer, Integer>>() {
    @Override
    public int compare(Map.Entry<Integer, Integer> n1, Map.Entry<Integer, Integer> n2) {
        return n2.getValue() - n1.getValue();
    }
};
```

#### 1⃣️Solution1

```java
public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> seen = new HashMap<>();
    for (int x : nums) {
        seen.put(x, seen.getOrDefault(x, 0) + 1);
    }

    Comparator<Map.Entry<Integer, Integer>> comp = new Comparator<Map.Entry<Integer, Integer>>() {
        @Override
        public int compare(Map.Entry<Integer, Integer> n1, Map.Entry<Integer, Integer> n2) {
            return n2.getValue() - n1.getValue();
        }
    };
    PriorityQueue<Map.Entry<Integer, Integer>> maxHeap = new PriorityQueue<Map.Entry<Integer, Integer>>(comp);
    for (Map.Entry<Integer, Integer> element : seen.entrySet()) {
        maxHeap.add(element);
    }
    int[] topK = new int[k];
    for (int i = 0; i < topK.length; i++) {
        Map.Entry<Integer, Integer> m = maxHeap.poll();
        topK[i] = m.getKey();
    }
    return topK;
}
```

#### 2⃣️Solution2

```java
Map<Integer, Integer> seen = new HashMap<>();
for (int x : nums) {
    seen.put(x, seen.getOrDefault(x, 0) + 1);
}
Comparator<Integer> comp2 = new Comparator<Integer>() {
    @Override
    public int compare(Integer n1, Integer n2) {
        return seen.get(n2) -  seen.get(n1) ;
    }
};
PriorityQueue<Integer> maxHeap2 = new PriorityQueue<Integer>(comp2);

for (Map.Entry<Integer, Integer> element : seen.entrySet()) {
    maxHeap2.add(element.getKey());
}
int[] topK = new int[k];
for (int i = 0; i < topK.length; i++) {
    topK[i] = maxHeap2.poll();
}
return topK;
```

> Runtime: 10 ms, faster than 95.89% of Java online submissions for Top K Frequent Elements.
>
> Memory Usage: 44.7 MB, less than 95.25% of Java online submissions for Top K Frequent Elements.
>
> Next challenges:



## 💻GitHub link and leetcode link

https://github.com/Amber916Young/leetcode-interview-practice/blob/master/src/Heap/

https://leetcode.com/problems/top-k-frequent-elements/discuss/2801394/Java-solution

