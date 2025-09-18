# Springboot Hibernate 整合

## Hibernate

Hibernate与MyBatis都是流行的持久层开发框架，只不过Hibernate是全自动ORM框架，不需要关心sql编写。

Hibernate是一个开放源代码的对象关系映射框架，它对JDBC进行了非常轻量级的对象封装，它将POJO与数据库表建立映射关系，是一个全自动的ORM框架。 Hibernate可以自动生成SQL语句、自动执行，从而使得Java程序员可以随心所欲的使用对象编程思维来操纵数据库。

实际上，JPA规范制定过程中就是借鉴了Hibernate等这些开源的持久框架，也就是说Hibernate的出现比JPA还要早些。

在Hibernate中使用的注解就是JPA注解，Hibernate实现了JPA规范。

## JPA

JPA(Java Persistence API)是Sun官方提出的Java持久化规范，它为Java开发人员提供了一种对象/关系映射工具来管理Java应用中的关系数据。

JPA仅仅是一种规范，也就是说JPA仅仅定义了一些接口，而接口是需要实现才能工作的。所以底层需要某种实现，而Hibernate就是实现了JPA接口的ORM框架

## Spring Data JPA

spirng data jpa是spring提供的一套简化JPA开发的框架，按照约定好的【方法命名规则】写dao层接口，就可以在不写接口实现的情况下，实现对数据库的访问和操作。同时提供了很多除了CRUD之外的功能，如分页、排序、复杂查询等等。

Spring Data JPA 可以理解为 JPA 规范的再次封装抽象，底层还是使用了 Hibernate 的 JPA 技术实现。

## SpringData

Spring Data 是持久层通用解决方案，支持 关系型数据库 Oracle、MySQL、非关系型数据库NoSQL、Map-Reduce 框架、云基础数据服务 、搜索服务。

Spring Data是一个开源框架而Spring Data JPA是这个框架的模块。

## 🧐 CrudRepository和JPARepository之间的区别

CrudRepository和JPA仓库都是spring数据仓库库的接口。Spring数据存储库通过提供一些预定义的查找器来访问各种持久层的数据层，从而减少了样板代码。

**Crud Repository**
它是基础接口并扩展了 Repository 接口。它包含用于创建、读取、更新和删除操作的CRUD方法。例如：save()、findById()：

```java
@Repository 
public interface MyPlaylistDAO extends CrudRepository { 
   Book Event findById(@Param("id") Integer id); 
}
```

**JPA Repository** 

它扩展了 PagingAndSorting Repository，后者又扩展了 CrudRepository。它包含所有 CRUD 操作以及实现分页的方法。除此之外，它还提供了批量操作的方法，例如批量删除记录和将数据直接刷新到数据库。例如：saveAllAndFlush()、deleteInBatch()、findAll(Pageable pageable)

```java
@Repository
public interface MyPlaylistDAO extends JpaRepository {
   Book findByArtist(@Param("id") Integer id);
}
```

| No   | KEY      | JPAR存储库                                                   | Crud存储库                                                   |
| ---- | -------- | :----------------------------------------------------------- | ------------------------------------------------------------ |
| 1    | 层次结构 | JPA扩展了crudRepository和PagingAndSorting存储库              | 原始存储库是基本接口，它充当标记接口。                       |
| 2    | 批量支持 | JPA还提供了一些与JPA相关的方法，例如批量删除记录和将数据直接刷新到数据库。 | 它仅提供CRUD功能，例如findOne，save等。                      |
| 3    | 分页支持 | JPA存储库还扩展了PagingAndSorting存储库。它提供了可用于实现分页的所有方法。 | Crud存储库不提供用于实现分页和排序的方法。                   |
| 4    | 用例     | JpaRepository将您的存储库与JPA持久性技术联系在一起，因此应避免使用它。 | 我们应该使用CrudRepository或PagingAndSortingRepository取决于您是否需要排序和分页。 |

## 实体类开发tips

- 设置自增

[![pSnfk6K.png](https://s1.ax1x.com/2023/01/11/pSnfk6K.png)](https://imgse.com/i/pSnfk6K)

- updatetable=false 不修改这个col
- text 不等于 null

[![pSnfGnS.png](https://s1.ax1x.com/2023/01/11/pSnfGnS.png)](https://imgse.com/i/pSnfGnS)

## 文件配置

[![pSn4Zid.png](https://s1.ax1x.com/2023/01/11/pSn4Zid.png)](https://imgse.com/i/pSn4Zid)

#### properties

```properties
spring.datasource.url = jdbc:mysql://localhost:3306/codeTest?serverTimezone=UTC&useSSL=false&autoReconnect=true&tinyInt1isBit=false&useUnicode=true&characterEncoding=utf8
spring.datasource.username = root
spring.datasource.password = Yyj188706
spring.jpa.show-sql = true
spring.jpa.hibernate.ddl-auto = create
spring.jpa.database-platform = org.hibernate.dialect.MySQL8Dialect
server.port = 8089
spring.jpa.properties.max_allowed_packet = 2000
```

#### YML

```yaml
server:
  port: 8089
  session-timeout: 60 # session
  tomcat:
    uri-encoding: utf-8 # Setting up tomcat encoding

#当写的实体类中属性，如果对应表没有该属性的字段，会自动创建一个该属性的字段，规则是属性中大写字母处变成_小写字母的字段，比如userName变成user_name
#    hibernate:
#      ddl-auto: update


spring:
  jpa:
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQL8Dialect
        new_generator_mappings: false
        format_sql: true
        ddl-auto: update
        show-sql: true
      max_allowed_packet: 2000
  datasource:
    url:
    jdbc:mysql://localhost:3306/codeTest?serverTimezone=UTC&useSSL=false&autoReconnect=true&tinyInt1isBit=false&useUnicode=true&characterEncoding=utf8
    username: root
    password: Yyj188706
```

YML & properties 任选

## 实体类为什么要序列化

客户端开启某个会话功能时，web服务器就会创建一个与该客户端对应的HttpSession对象，这样会占用一定的内存空间，大量不活动但是未超时的HttpSession对象会对内存空间造成大量浪费，为了解决这种情况，我们可以将不活动但是未超时的这种HttpSession对象通过序列化转移到文件系统或数据库中保存，当服务器需要使用的时候在将他们反序列化恢复取出载入内存。

## 📝 代码

### 实体类

```java
import lombok.*;
import javax.persistence.*;
import java.io.Serializable;

/**
 * @ClassName:Book
 * @Author: yyj
 * @Description:
 * @Date: 11/01/2023 13:00
 * @Version: v1.0
 */
@Entity
@Table(name = "books")
@Data
public class Book implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "book_id")
    private int bookId;
    @Column(name = "title")
    private String title;
    @Column(name = "category")
    private String category;
}
```

### Service Class

```java
@Service
public class BookService {
    @Autowired
    private BooksRepository booksRepository;

    public Book saveBook(Book book){
        return booksRepository.save(book);
    }
    public List<Book> getBookList(){
        return booksRepository.findAll();
    }
}
```

### Repository Class

```java
@Repository
public interface BooksRepository extends JpaRepository<Book, Integer> {
}
```

[![pSuRJyT.png](https://s1.ax1x.com/2023/01/12/pSuRJyT.png)](https://imgse.com/i/pSuRJyT)

### Gradle 配置

```groovy
plugins {
    id 'org.springframework.boot' version '2.7.6'
    id 'io.spring.dependency-management' version '1.0.10.RELEASE'
    id 'java'
}

group 'org.yang'
version '1.0-SNAPSHOT'

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    implementation group: 'org.mybatis.spring.boot', name: 'mybatis-spring-boot-starter', version: '2.3.0'
    implementation group: 'com.mysql', name: 'mysql-connector-j', version: '8.0.31'
    implementation group: 'org.json', name: 'json', version: '20180130'

    compileOnly 'org.projectlombok:lombok:1.18.10'
    annotationProcessor 'org.projectlombok:lombok:1.18.10'
    implementation group: 'org.springframework.boot', name: 'spring-boot-starter-actuator', version: '2.6.6'
    implementation group: 'org.springframework.boot', name: 'spring-boot-starter-data-jpa', version: '2.6.6'

    testImplementation 'org.junit.jupiter:junit-jupiter-api:5.7.0'
    testRuntimeOnly 'org.junit.jupiter:junit-jupiter-engine:5.7.0'

}

test {
    useJUnitPlatform()
}
```

# 🔗参考

https://blog.csdn.net/BasinFishFeast/article/details/121622168

https://www.mianshigee.com/note/detail/190822ftt/

https://www.jdon.com/60152.html