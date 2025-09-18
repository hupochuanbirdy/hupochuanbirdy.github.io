# Mysql 👩‍💻模糊查询，多相匹配，忽略大小写

## 1、模糊查询 

### Like

- ### 百分号 %

表示任意个或多个字符。可匹配任意类型和长度的字符。

```mysql
SELECT * FROM character WHERE name LIKE '%孙%';
-- 即匹配姓名为“孙行者”，“行者孙，“行者孙”等包含“孙”类型的数据
```

```mysql
SELECT * FROM character WHERE name LIke '%孙%' and name like '%行%';
-- 即匹配姓名为“孙行者”，“行者孙，“行者孙”等包含“孙”和“行”的数据
```

```mysql
SELECT * FROM character WHERE name LIke '%孙%行%‘;
-- 只能匹配姓名为“孙行者”等类似“...孙...行...”的数据
```

- ### 下划线 _

表示任意单个字符。匹配单个任意字符，它常用来限制表达式的字符长度语句：（可以代表一个中文字符）

```mysql
SELECT * FROM character WHERE name LIKE '_三_'；
-- 即匹配姓名为“..三..”类型的数据，前后均只有一个字符
```

```mysql
SELECT * FROM character WHERE name LIKE '_三'；
-- 即匹配姓名类似“...三”类型的数据，前面有且只有一个字符
```

- ### 左右括号 []

表示匹配[ ] 内的任意一个字符比如

```mysql
select * from T_Bank where BankName like '[张李王]三'
-- 只会查询出张三、李三、王三 的数据
```

[0-9],[a-e] 表示[0123456789] [abcde]等

- ### 取反 [^]

表示取反，查询出不是某些匹配的数据比如：

```mysql
select * from T_Bank where BankName like '[^张李王]三'
-- 表示查询出排除张三、李三、王三 的数据。
```

### **🔥like contact 模糊查询**

CONCAT(str1,str2,…) 函数返回结果为连接参数产生的字符串。

```mysql
select * from role where name like contact("%","三","%");
-- 即匹配姓名为“唐三”，“唐三藏”等类型的数据数据
```

 **mybaitis写法**

```mysql
<select id="articleIndexQuery" parameterType="com.yang.utils.Page" resultType="java.util.HashMap">
    select * from view_article
    <where>
        1=1
        <if test="keyWord !=null">
            and  Lower(concat(
            IFNULL(author,'')
            ,IFNULL(title,'')
            ,IFNULL(type,'')
            ,IFNULL(category,'')
            ,IFNULL(taglist,'')
            ,IFNULL(content,'')))
            like Lower(concat('%', #{keyWord}, '%'))
        </if>
    </where>
    order by publish_time desc
    limit #{start},#{rows}
</select>
```

### 📈 REGECXP 图表说明

| 字符 |                      说明                      |                          例子                           |                             说明                             |
| :--: | :--------------------------------------------: | :-----------------------------------------------------: | :----------------------------------------------------------: |
|  ^   |              表示以某个字符开头的              |   select * from T_Bank where BankName REGEXP '^中国'    |                    查询出以中国开头的数据                    |
|  $   |           表示查询出以某个字符结尾的           |   select * from T_Bank where BankName REGEXP '移动$'    |                    查询出以移动结尾的数据                    |
|  .   |                  表示任意字符                  |    select * from T_Bank where BankName REGEXP '.移.'    |                  查询出以任意带有‘移’的数据                  |
|  *   |       匹配0 或者多个字符，前面必须有字符       |    select * from T_Bank where BankName REGEXP '银行'    |                   查询出银行开头的所有字符                   |
|  \|  | 为搜索两个串之一（或者这个串，或者为另外一个串 | select * from products where pro_id REGEXP '1000\|2000' | 这样就``1000``和``2000``都能匹配并返回，当然，使用多个\|就可以匹配多个串 |

## 2、多相匹配

多个值**模糊查询**，使用mysql正则：**REGEXP**。此方式相当于( LIKE '%1%' OR LIKE '%3%' OR LIKE '%5%' )

```mysql
SELECT * FROM tableName WHERE title REGEXP '(1|3|5)';
```

## 3、忽略大小写

mysql的字符集改成严格区分大小写后，模糊搜索的时候不能忽略大小写。

把数据库字段转为小写，like后的参数也都转为小写

**Lower()**


```mysql
 select * from tableName
 Lower(
 concat( IFNULL(taglist,'')  
 				,IFNULL(content,'')))
  like Lower(concat('%', 'keyWord', '%'))
```

```mysql
SELECT * FROM goods
WHERE LOWER(goods_name) LIKE Lower(CONCAT("%", "WhOo忽略大小写", "%"))
```

# 🔗 Refer links

https://www.cnblogs.com/javahr/p/9780650.html