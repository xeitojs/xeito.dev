---
title: Introduction
---

# Introduction

::: warning ACTIVE DEVELOPMENT
  **Xeito** is still under active development, therefore everything is still **unstable** and untested.
  API may introduce **breaking changes** between minor versions without much notice.
:::

## What is Xeito?

Xeito (pronounced /ˈʃejto̝/, [from Galician](https://en.wiktionary.org/wiki/xeito): "way", "manner" or "fashion") 
is a [Typescript](https://www.typescriptlang.org/) framework for building web applications.

It builds on top of the powerful features of Typescript and JSX, and provides a component-based programming model 
that helps you develop user applications, no matter the complexity.

Let's see an example of a barebones Xeito component:

```tsx
import { Xeito, Component } from '@xeito/core';

@Component()
export class Counter {

  @State() count: number = 0;

  increment() {
    this.count++;
  }

  render() {
    return (
      <div>
        <button onclick={()=>this.increment()}>
          Count is: { this.count }
        </button>
      </div>
    );
  }
}
```

Above we can see two basic features of Xeito:

- **JSX**: Xeito uses [JSX](https://www.typescriptlang.org/docs/handbook/jsx.html) to compose the template inside 
the render method of a component and it allows us to declaratively declare the HTML output based on the Typescript state.

- **Reactivity**: Xeito tracks state changes automatically and updates the DOM when changes happen.

::: tip PREREQUISITES
  The documentation assumes familiarity with HTML/JSX, CSS and Typescript.
  Please, if you are unsure if your knowledge level will suffice, check it at
  [Mozilla Language Overview](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_Overview)
  and the [Typescript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html).
  Prior experience with other frameworks like React will help, but it isn't a hard requirement.
:::


## Components

Components are the building blocks you will use to compose an application using Xeito.
A component is just a Typescript class with a ``@Component()`` decorator, a ``render()``
method that returns the template and, optionally, style files.

The ``@Component()`` decorator is just syntactic sugar that helps Xeito identify a component as valid during render.

## Services

Services are a form of **Dependency Injection**. They allow you to have dependencies without taking care of their initialization,
Xeito takes care of that for you.

In its most basic form a service is a data provider, it keeps the logic to access the data it contains and, since they're only instantiated once,
can be shared between multiple components as a global state container.
The main objective of the services is to organize your logic, data and functions and share it among multiple components if needed.
Just like the **Components**, a Xeito service is just a Typescript class with a ``@Injectable()`` decorator that will tell Xeito it needs to 
instantiate it and make it accessible for the components.

After a service is created, it can be injected into a component by adding a property with the ``@Inject()`` decorator that has the type of the service.

This can sound confusing, but in reality it's very simple to implement. Let's see an example:

We start by creating a new service like this:

```ts
// my-service.tsx
@Injectable()
export class GreeterService {

  greet(name: string) {
    console.log(`Hello ${name}!`);
  }

}

```

And then we *inject* it into a component
```tsx
// my-component.tsx
@Component()
export class MyComponent {

  @Inject() greeterService: GreeterService

  constructor() {
    // Now we can call the methods of the service
    this.greeterService.greet('World');
  }

}

```