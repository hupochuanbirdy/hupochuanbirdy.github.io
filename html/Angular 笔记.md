# 📒Angular 笔记1 概念

# The Angular CLI(Command-Line Interface)

Another great reason for using Angular is the Angular Command-Line Interface (CLI); this is a command-line tool provided by the Angular team that helps us to build and run Angular projects. The CLI comes with a wide range of features, including the following:

使用Angular的另一个重要原因是Angular命令行界面（CLI）；这是Angular团队提供的一个命令行工具，帮助我们构建和运行Angular项目。CLI具有广泛的功能，包括以下内容。

- Starting a project
- Creates components, services, directives, and other files using a simple command
- Runs the application in the browser
- Reloads the application after each saved change so that the latest version is displayed in the browser
- It can update a project’s dependencies (other libraries used in a project) automatically
- It can add new libraries to the project
- It can run all the unit tests in a project and the end-to-end tests

Angular CLI是一个很好的工具，学习它是开发Angular应用程序的一个重要部分。许多其他前端框架没有CLI，而那些有CLI的框架也不支持Angular CLI的功能。

## Access to third-party libraries

The Angular community, as well as allowing us to learn from one another, is also active in building libraries and tools that work with Angular. Libraries such as [NgRx](https://ngrx.io/), [NGXS](https://www.ngxs.io/), and [MobX](https://mobx.js.org/README.html) all provide solutions on how to **manage state within an Angular application**. There are also **UI libraries** such as [Angular Material](https://material.angular.io/), [NGX-Bootstrap](https://valor-software.com/ngx-bootstrap/#/), and [Nebular](https://akveo.github.io/nebular/), which provide UI components you can add to your Angular applications.

There are **libraries for accessing data from cloud-based systems**, such as [Firebase](https://firebase.google.com/). So, if your application needs to connect to an existing Firebase application, there are libraries you can add that simplify working with Firebase in your application. You can also find libraries that facilitate working with [GraphQL](https://graphql.org/) if that’s how your team creates their APIs.

If you want to **add tools to your Angular workflow**, the Angular community has provided tools like [Augury](https://augury.rangle.io/), which is a plugin for Chrome that debugs Angular applications.

Another great tool from the Angular community is the NX workspaces from [Nrwl](https://nrwl.io/). They have created an extension to the Angular CLI that helps to create large enterprise Angular applications, where teams of developers work on the same project. The NX tool helps the CLI create libraries within Angular projects so that large-scale teams can share code across teams.

## Structure of `app` folder

[<img src="https://s1.ax1x.com/2023/01/10/pSmGHEj.png" alt="pSmGHEj.png" style="zoom:33%;" />](https://imgse.com/i/pSmGHEj)

# The Architecture of an Angular App

When the *Angular application app is run in the browser, these TypeScript files are converted into JavaScript files*, which are then bundled up into the payload that is delivered to the browser

[![pSmtmAH.png](https://s1.ax1x.com/2023/01/10/pSmtmAH.png)](https://imgse.com/i/pSmtmAH)

There are three main parts to an Angular application, and they are as follows:

- Modules
- Components
- Services

## 1. Modules

------

> **Modules** are the glue that hold an application together. Each module is a single TypeScript file that references all the other files used within the application.

------

They allow us to group the functionality of our application together.

模块是连接应用程序的胶水。它们是单一的TypeScript文件，引用应用程序中使用的所有其他文件。它们允许我们，作为Angular开发者，将我们的应用程序的功能组合在一起。

[![pSmt8u8.png](https://s1.ax1x.com/2023/01/10/pSmt8u8.png)](https://imgse.com/i/pSmt8u8)

This is the main `App` module. As you can see, it’s made up of four main parts:

- The `declarations` array

This contains the components, directives, and pipes that are part of this module.

- The `imports` array

This contains other modules, whose classes are needed by components of the module they are being imported into.

- The `providers` array

This contains any services that are required by components. If a service is added to the module level, it is available to all components that are part of the module, but services can also be imported at just the component level.

- The `bootstrap` array

This contains the main component, or the root component, which starts the whole application. Only the root module (in our architecture application, it’s the `app.module.ts` file) that we have opened can have a bootstrap array.

[![pSmNnqU.png](https://s1.ax1x.com/2023/01/10/pSmNnqU.png)](https://imgse.com/i/pSmNnqU)

### NgModules

NgModules的主要作用是告诉框架，当应用程序被编译时，哪些组件属于哪里。例如，假设我有一个叫做ComponentOne.ts的组件，而在同一个应用程序中，另一个在该项目上工作的开发者也创建了一个新的组件，并决定将其称为ComponentOne.ts。当应用程序运行时，编译器不会知道该使用哪个ComponentOne。通过使用一个模块，我们可以说一个ComponentOne属于这个模块，而另一个属于另一个模块。然后，当编译器在运行应用程序时，如果它运行的是属于某个模块的代码，编译器就知道要使用哪个ComponentOne文件。这有助于将功能组合在一起，并允许不同的开发者在一个应用程序的不同部分工作，而不影响另一个开发者正在工作的部分。

## 2. Components

------

> **Components** are the building blocks of the application. They are single pieces of functionality in our application, which are linked together under a module.

------

Components can have visual elements to them, which allow the user to interact with the application.

[![pSmBaeP.png](https://s1.ax1x.com/2023/01/10/pSmBaeP.png)](https://imgse.com/i/pSmBaeP)

[![pSmNWdg.png](https://s1.ax1x.com/2023/01/10/pSmNWdg.png)](https://imgse.com/i/pSmNWdg)

Again, the component is a TypeScript class that is using the `@Component` decorator to tell Angular about the details of the component. In this `@Component` decorator, we can see that the component has an HTML template called `app.component.html` and a CSS file called `app.component.css`.

```html
<app-root></app-root>
```

## 3. Services

------

> **Services** are single TypeScript classes used to access information and share it between components.

------

The main difference between a component class and a service is that services are used to create more modularity and reusability within the application. 组件类和服务的主要区别在于，服务是用来在应用程序中创造更多的模块化和可重用性。

[<img src="https://s1.ax1x.com/2023/01/10/pSmBrWQ.png" alt="pSmBrWQ.png" style="zoom:50%;" />](https://imgse.com/i/pSmBrWQ)

### Dependency Injection

**Dependency Injection (DI)** is the method that Angular uses to tell components what services they can consume.

[![pSmDPOI.png](https://s1.ax1x.com/2023/01/10/pSmDPOI.png)](https://imgse.com/i/pSmDPOI)



外部 API 加载列表

```javaScript
export class HeroService {
    private heroes: Hero[] = [];
    constructor(private backend: BackendService, private logger: Logger) {}

    getHeroes() {
        this.backend.getAll(Hero).then((heroes: Hero[]) => {
            this.logger.log(`Fetched ${heroes.length} heroes.`);
            this.heroes.push(...heroes); // fill cache
        });
        return this.heroes;
    }
}
```

它是一个简单的 TypeScript 类，带有一个构造函数和一个名为`getHeros()`. 它还调用另一个服务，`BackendService`. 这显示了服务提供的模块化示例，其中一项服务执行一项任务并使用另一项服务执行另一项任务，在本例中提供数据。

这个服务缺少的是装饰器，它告诉 Angular 这个类可以被消费/注入到组件中。为 Angular 提供此信息的装饰器称为`Injectable`装饰器，它看起来像这样：

```javaScript
@Injectable({
    providedIn: "root",
})
export class HeroService {}
```

当`@Injectable`装饰器被添加到一个类中时，这会告诉 Angular 这个类及其功能可以使用依赖注入传递到组件和其他服务中。

### angular-architecture 为应用程序创建服务

#### 第 1 步：使用 CLI 命令创建服务

```shell
ng generate service demo
```

这将告诉 Angular CLI 创建一个`demo`在我们的源代码中调用的新服务。当我们执行这个命令时，它会在文件夹中创建`demo.service.spec.ts`和文件。`demo.service.ts``app`

因此，您应该有一个名为 的不错的新服务`demo.service.ts`，如下所示：

```javaScript
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class DemoService {
  constructor() { }
}
```

#### 第 2 步：将服务添加到`app.module.ts`文件

现在我们有了这个服务，让我们把它添加到我们的`app.module.ts`文件中，这样 Angular 就知道这个服务属于什么上下文。

打开`app.module.ts`文件，它应该如下所示：

```javascript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
```

要添加服务，我们将服务名称键入`providers`数组，如下所示：

```typescript
providers: [
    DemoService
],
```

现在，将顶部的导入语句设置为存储服务 TypeScript 类的位置，如下所示：

```javascript
import { AppComponent } from './app.component';
import { DemoService } from './demo.service';
```

#### 第 3 步：将服务添加到`app.component.ts`文件

最后阶段是`app.component.ts`消费新的`DemoService`. 为此，我们将服务添加到组件类的构造函数中，如下所示：

```javaScript
import { Component } from '@angular/core';
import { DemoService } from './demo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-architecture';
  constructor(public demoService: DemoService) {}
}
```

在文件的**第 11 行**`app.component.ts`，我们给`DemoService`了本地名称`demoService`，因此如果我们想访问组件类中服务的任何功能，我们使用以下本地引用：

```javascript
this.demoService.printHello();
```

这是我们的应用程序源代码，包含`demo`服务和更新`app.module.ts`文件`app.component.ts`。

# Why Use TypeScript?

[![pSmy23F.png](https://s1.ax1x.com/2023/01/10/pSmy23F.png)](https://imgse.com/i/pSmy23F)

「TypeScript 的最大卖点是工具。它提供高级自动完成、导航和重构。拥有这样的工具几乎是大型项目的必备条件。没有它们，对更改代码的恐惧会使代码库处于半只读状态，并使大规模重构变得非常危险和昂贵。」

TypeScript 不仅提供了 JavaScript 所不具备的强大功能，而且还为开发人员提供了强大的工具，以便在代码甚至在浏览器中运行之前找到代码中的问题和错误。

例如，当我们构建这些应用程序时，TypeScript，更具体地说，TypeScript 编译器正在检查我们的代码，并了解我们代码的所有不同部分。如果我们向一个类添加一个属性，然后在另一个类中使用该类（就像我们将演示服务添加到主组件类时所做的那样），TypeScript 编译器知道该演示服务有哪些功能可用。因此，当我们去使用组件类中的服务时，代码编辑器知道什么是可用的，并在我们键入时让我们深入了解哪些功能可用。

TypeScript 提供的主要好处是在我们编写代码时可以洞察我们的代码。一个应用程序会变得越来越复杂，试图记住所有移动的部分是非常困难的，但是有了 TypeScript 和它为我们提供的强大工具，我们需要记住的东西就**更少了，代码中出现错误的可能性也更低了。**

# Angular

##  commands Line

| **Angular      Command** | **Purpose**                                                  |
| ------------------------ | ------------------------------------------------------------ |
| **ng add**               | Used to add third-party libraries to an existing application, we will be using this soon to add Angular Material |
| **ng build**             | Used to compile the complete application into a /dist folder or a folder provided by an argument |
| **ng config**            | Allows you to either view or set configuration settings for your app; these configuration settings can be passed as JSON |
| **ng doc**               | Opens the official Angular docs website; if you want to find a specific topic, add the keyword as an argument |
| **ng e2e**               | This will run the end-to-end tests of the application        |
| **ng generate**          | Command to create/generate new components, services, and other parts of your Angular application. We will use this command a lot over the next few chapters |
| **ng help**              | Provides a help menu for the Angular CLI                     |
| **ng lint**              | Runs linting over your application’s codebase                |
| **ng new**               | Starts the process to create a new Angular application application |
| **ng run**               | Starts running a custom target for your application. In your package.json file, you can add custom commands that ng run will start for you |
| **ng serve**             | Starts the local Node server so you can access the site in the browser |
| **ng test**              | Starts the running of all the Unit Tests you create for your application |
| **ng update**            | Updates the application and any dependencies in the application, very useful when a new version of Angular is released |
| **ng version**           | Tells you the version number of the Angular CLI currently being used |
| **ng xi18n**             | Extracts any xi18n messages within your application, used as part of adding multi-language support to your application |

## Angular Material

[Angular Material](https://material.angular.io/) is a UI library that provides a set of UI components you can use in your Angular application. They give the application a Material look. When we say Material, we mean using the Material look that Google has implemented in many of its web applications and in the Android mobile platform. You’ve already seen this Material look on the official Angular website.

```shell
ng add @angular/material
```

[![pSm602D.png](https://s1.ax1x.com/2023/01/10/pSm602D.png)](https://imgse.com/i/pSm602D)

## Schematics and CLI Builders

**Schematics** allow us to apply transforms to our projects; we see an example of this when we ask the Angular CLI to create Components or Services for our application.

**CLI Builders**是一个新的 API，它允许我们使用 Angular CLI 添加和构建功能。