# 📒Angular 笔记 模块2

# Directives

## Introduction

**Directives** are classes that extend the default behavior of any element in the Angular application. 

Directives are like highly reusable code that we can use anywhere we need to. There are three types of directives in Angular:

- **Components** are directives used to specify HTML templates.
- **Attribute directives** change the appearance or behavior of any element in Angular. For instance, attribute directives can highlight specific words in the text of the application.
- **Structural directives** change the DOM layout during the runtime by adding or removing DOM nodes. For instance, a ngIf directive is a structural one.

We can divide directives into two main categories called built-in and custom.

### Built-in directives

**Built-in directives**, as their name suggests, are already built into an application. 

- The **`\*ngIf`** directive is used for conditional rendering and looks like this:

  ```html
  <h1 *ngIf="active">Hello</h1>
  ```

- The **`\*ngFor`** directive is used for rendering multiple elements and looks like this:

  ```html
  <ul>
      <li *ngFor="let user of users">
          {{ user.name }}
      </li>
  </ul>
  ```

- The **`ngModel`** directive is used for property binding and looks like this:

  ```html
  <input [(ngModel)]="user.name" />
  ```

Let’s think about how often we use built-in directives—probably very often! Such directives appear very straightforward, but they have a lot of additional hidden features, which we’ll learn more about later.

### Custom directives

**Custom directives** are the directives we can create ourselves and change to suit our needs.

```html
<p withEmoji="🥳"> Here is some text </p>
```

create a custom `ngIf` after realizing there are a lot of the same conditions in a project

```html
<ul>
    <li *ngFor="let number of [1,2,3,4,5]">
        <p *onlyOddNumber="number">
            {{number}}
        </p>
    </li>
</ul>
```

[![pSmWYhq.png](https://s1.ax1x.com/2023/01/10/pSmWYhq.png)](https://imgse.com/i/pSmWYhq)

















