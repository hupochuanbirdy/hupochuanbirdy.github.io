# Java面试

### **49. 什么是死锁？**

当线程 A 持有独占锁a，并尝试去获取独占锁 b 的同时，线程 B 持有独占锁 b，并尝试获取独占锁 a 的情况下，就会发生 AB 两个线程由于互相持有对方需要的锁，而发生的阻塞现象，我们称为死锁。

When thread A holds exclusive lock 1 and tries to get exclusive lock 2 while thread B holds exclusive lock 2 and tries to get exclusive lock 1, a blocking phenomenon occurs between the two threads of AB as they hold the lock needed by each other, which we call a deadlock.



### **53. synchronized 和 volatile 的区别是什么？**

- volatile 是变量修饰符；synchronized 是修饰类、方法、代码段。
- volatile 仅能实现变量的修改可见性，不能保证原子性；而 synchronized 则可以保证变量的修改可见性和原子性。
- volatile 不会造成线程的阻塞；synchronized 可能会造成线程的阻塞。 

### 54.synchronized 和 Lock 有什么区别？

- synchronized 可以给类、方法、代码块加锁；而 lock 只能给代码块加锁。
- synchronized 不需要手动获取锁和释放锁，使用简单，发生异常会自动释放锁，不会造成死锁；而 lock 需要自己加锁和释放锁，如果使用不当没有 unLock()去释放锁就会造成死锁。
- 通过 Lock 可以知道有没有成功获取锁，而 synchronized 却无法办到。

### 55.synchronized 和 ReentrantLock 区别是什么？

synchronized 早期的实现比较低效，对比 ReentrantLock，大多数场景性能都相差较大，但是在 Java 6 中对 synchronized 进行了非常多的改进。

主要区别如下：

- ReentrantLock 使用起来比较灵活，但是必须有释放锁的配合动作；
- ReentrantLock 必须手动获取与释放锁，而 synchronized 不需要手动释放和开启锁；
- ReentrantLock 只适用于代码块锁，而 synchronized 可用于修饰方法、代码块等。



## **反射**

### **57. 什么是反射？**

反射是在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的任意一个方法和属性；这种动态获取的信息以及动态调用对象的方法的功能称为 Java 语言的反射机制。

Reflection is the ability to know all the properties and methods of any class at runtime, and to invoke any method and property of any object; this dynamic acquisition of information and dynamic invocation of an object's methods is called the reflection mechanism of the Java language.

### **58. 什么是 Java 序列化？什么情况下需要序列化？**

Java 序列化是为了保存各种对象在内存中的状态，并且可以把保存的对象状态再读出来。

Java serialisation is designed to preserve the state of various objects in memory and to allow the saved object state to be read out again.

以下情况需要使用 Java 序列化：

- 想把的内存中的对象状态保存到一个文件中或者数据库中时候；
- 想用套接字在网络上传送对象的时候；
- 想通过RMI（远程方法调用）传输对象的时候。









Spring is a powerful open-source, loosely coupled, lightweight, [java framework](https://www.interviewbit.com/java-interview-questions/) meant for reducing the complexity of developing enterprise-level applications. This framework is also called the “framework of frameworks” as spring provides support to various other important frameworks like JSF, Hibernate, Structs, EJB, etc.

- Spring is a **lightweight, java based, loosely coupled** framework.

TCP is connection-oriented while UDP is connectionless



AOP(Aspect Oriented Programming)

IOC(Inversion of Contro)

Spring IoC is the mechanism to achieve loose-coupling between Objects dependencies. To achieve loose coupling and dynamic binding of the objects at runtime, objects dependencies are injected by other assembler objects.

Spring IoC是实现对象依赖关系之间松散耦合的机制。为了在运行时实现对象的松散耦合和动态绑定，对象的依赖关系是由其他汇编对象注入的。



### 5. What do you understand by Dependency Injection?

The main idea in Dependency Injection is that you don’t have to create your objects but you just have to describe how they should be created.

### 9. What are the bean scopes available in Spring? Spring 支持几种 bean 的作用域？

The Spring Framework has five scope supports. They are:

- **Singleton:** The scope of bean definition while using this would be a single instance per IoC container.
- **Prototype:** Here, the scope for a single bean definition can be any number of object instances.
- **Request:** The scope of the bean definition is an HTTP request.
- **Session:** Here, the scope of the bean definition is HTTP-session.
- **Global-session:** The scope of the bean definition here is a Global HTTP session.

Note: The last three scopes are available only if the users use web-aware ApplicationContext containers.





### 14. What do you understand by the term ‘Spring Boot’?

Spring Boot is an open-source, java-based framework that provides support for Rapid Application Development , and is designed to simplify the initial build and development of new spring applications.



 and gives a platform for developing stand-alone and production-ready spring applications with a need for very few configurations.

 Spring Boot是一个开源的、基于java的框架，为快速应用开发提供支持，并为开发独立的、可生产的spring应用提供了一个平台，只需要很少的配置。

### 15. Explain the advantages of using Spring Boot for application development.解释使用Spring Boot进行应用开发的优势。

- Spring Boot helps to create stand-alone applications which can be started using java.jar (Doesn’t require configuring WAR files).
- Spring Boot also offers pinpointed ‘started’ POMs to Maven configuration.Spring Boot还为Maven配置提供了精确的 "启动 "POM。
- Has provision to embed Undertow, Tomcat, Jetty, or other web servers directly.
- Auto-Configuration: Provides a way to automatically configure an application based on the dependencies present on the classpath.提供一种方法，根据classpath上的依赖关系自动配置应用程序
- Spring Boot was developed with the intention of lessening the lines of code.
- It offers production-ready support like monitoring and apps developed using spring boot are easier to launch.

### 16. Differentiate between Spring and Spring Boot.

- The Spring Framework provides multiple features like dependency injection, data binding, aspect-oriented programming (AOP), data access, and many more that help easier development of web applications. Spring框架提供了多种功能，如依赖注入、数据绑定、面向方面的编程（AOP）、数据访问等，有助于更容易地开发Web应用程序。
- Whereas Spring Boot helps in easier usage of the Spring Framework by simplifying or managing various loosely coupled blocks of Spring which are tedious and have a potential of becoming messy. 而Spring Boot通过简化或管理Spring的各种松散耦合块，帮助人们更容易地使用Spring框架，这些松散耦合块很乏味，而且有可能变得混乱。
- Spring boot simplifies commonly used spring dependencies and runs applications straight from a command line. It also doesn’t require an application container and it helps in monitoring several components and configures them externally.

### 17. What are the features of Spring Boot?

- **Spring Boot CLI** – This allows you to Groovy / Maven for writing Spring boot application and avoids boilerplate code.
- **Starter Dependency** – With the help of this feature, Spring Boot aggregates common dependencies together and eventually improves productivity and reduces the burden on
- **Spring Initializer** – This is a web application that helps a developer in creating an internal project structure. The developer does not have to manually set up the structure of the project while making use of this feature.
- **Auto-Configuration** – This helps in loading the default configurations according to the project you are working on. In this way, unnecessary WAR files can be avoided.
- **Spring Actuator** – Spring boot uses actuator to provide “Management EndPoints” which helps the developer in going through the Application Internals, Metrics etc.
- **Logging and Security** – This ensures that all the applications made using Spring Boot are properly secured without any hassle.



### 20. What is Spring Boot dependency management system?

- It is basically used to manage dependencies and configuration automatically without the need of specifying the version for any of that dependencies.







### 23. Can you tell how to exclude any package without using the basePackages filter?

We can use the `exclude` attribute while using the annotation `@SpringBootApplication` as follows: 

```java
@SpringBootApplication(exclude= {Student.class})
public class InterviewBitAppConfiguration {}
```

### 24. How to disable specific auto-configuration class?

- You can use the `exclude` attribute of `@EnableAutoConfiguration` for this purpose as shown below:

```java
@EnableAutoConfiguration(exclude = {InterviewBitAutoConfiguration.class})
```

If the class is not specified on the classpath, we can specify the fully qualified name as the value for the `excludeName`.

```java
//By using "excludeName"
@EnableAutoConfiguration(excludeName={Foo.class})
```

- You can add into the application.properties and multiple classes can be added by keeping it comma-separated.

### 25. Can the default web server in the Spring Boot application be disabled?

Yes! `application.properties` is used to configure the web application type, by mentioning `spring.main.web-application-type=none`.

### 26. What are the uses of @RequestMapping and @RestController annotations in Spring Boot?

- **@RequestMapping:**
  - This provides the routing information and informs Spring that any HTTP request matching the URL must be mapped to the respective method. 这提供了路由信息，并通知Spring，任何与URL匹配的HTTP请求必须被映射到相应的方法。
  - `org.springframework.web.bind.annotation.RequestMapping` has to be imported to use this annotation.
- **@RestController:**
  - This is applied to a class to mark it as a request handler thereby creating RESTful web services using Spring MVC. This annotation adds the @ResponseBody and @Controller annotation to the class.这是对一个类的应用，将其标记为一个请求处理程序，从而使用Spring MVC创建RESTful Web服务。这个注解将@ResponseBody和@Controller注解添加到类中。
  - `org.springframework.web.bind.annotation.RestController` has to be imported to use this annotation.

Check out more Interview Questions on Spring Boot [here](https://www.interviewbit.com/spring-boot-interview-questions/).

### 27. What is Spring AOP?

- Spring AOP (Aspect Oriented Programming) is similar to OOPs (Object Oriented Programming) as it also provides modularity.
- In AOP key unit is aspect or concerns which are nothing but stand-alone modules in the application. Some aspects have centralized code but other aspects may be scattered or tangled code like in the case of logging or transactions. These scattered aspects are called cross-cutting concern.
  - A cross-cutting concern such as transaction management, authentication, logging, security etc is a concern that could affect the whole application and should be centralized in one location in code as much as possible for security and modularity purposes.
- AOP provides platform to dynamically add these cross-cutting concerns before, after or around the actual logic by using simple pluggable configurations.
- This results in easy maintainenance of code. Concerns can be added or removed simply by modifying configuration files and therefore without the need for recompiling complete sourcecode.
- There are 2 types of implementing Spring AOP:
  - Using XML configuration files
  - Using AspectJ annotation style

### 





https://blog.csdn.net/uuqaz/article/details/123502779