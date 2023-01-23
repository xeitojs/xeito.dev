---
title: Introduction
---

# Introduction

::: warning ACTIVE DEVELOPMENT
  **Xeito** is still under active development, therefore everything is still **unstable** and untested.
  API may introduce **breaking changes** between minor versions without notice.
:::

## What is Xeito?

Xeito (pronounced /ˈʃejto̝/, [from Galician](https://en.wiktionary.org/wiki/xeito): "way", "manner" or "fashion") 
is a [Typescript](https://www.typescriptlang.org/) framework for building web applications.

It builds on top of the powerful features of Typescript and 
[Tagged Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals), 
providing a component-based programming model 
that helps you develop user applications, no matter the complexity.

Let's see an example of a barebones Xeito application:

```typescript
// main.ts
import { Xeito } from '@xeito/core';
import { AppComponent } from './app-component';

const app = new Xeito(AppComponent);
app.boostrap('#app');
```

```typescript
// app-component.ts
import { Component, XeitoComponent, State, html } from '@xeito/core';

@Component({
  selector: 'app-root',
})
export class Counter extends XeitoComponent {

  @State() count: number = 0;

  increment() {
    this.count++;
  }

  render() {
    return html`
      <div>
        <button @click=${this.increment}>
          Count is: ${this.count}
        </button>
      </div>
    `;
  }
}
```

Above we can see two basic features of Xeito:

- **Tagged Template Literal**: Xeito uses [Tagged Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) 
to compose the template inside the render method of a component and it allows you to declaratively create the DOM tree of your component.

- **Reactivity**: Xeito tracks the state of your components and updates the DOM when it changes. This is done by using the ``@State()`` and ``@Prop()`` decorators (more on that later).

::: tip PREREQUISITES
  The documentation assumes familiarity with HTML, CSS and Typescript.
  Please, if you are unsure if your knowledge level will suffice, check it at
  [Mozilla Language Overview](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Language_Overview)
  and the [Typescript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html).
  Prior experience with other frameworks like React will help, but it isn't a hard requirement.
:::


## Components

Components are the building blocks you will use to compose an application using Xeito.

A component is just a Typescript class extending `XeitoComponent` with a ``@Component()`` decorator, a ``render()``
method that returns the template and reactive properties decorated with ``@State()`` or ``@Prop()``.

Xeito registers your components inside the [custom elements registry](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry), 
so you can use them in your HTML templates. Even if Xeito leverages the web components standard, you don't need to know anything about it to use Xeito 
and its components are not designed to be used outside of the framework.


## Services

Services are a form of **Dependency Injection**. They allow you to have dependencies without taking care of their initialization,
Xeito takes care of that for you.

In its most basic form a service is a data provider, it keeps the logic to access the data it contains and, since they're only instantiated once,
can be shared between multiple components as a global state container.
The main objective of the services is to organize your logic, data and functions and share it among multiple components if needed.
Just like the **Components**, a Xeito service is just a Typescript class with a ``@Injectable()`` decorator that will tell Xeito it needs to 
instantiate it and make it accessible for the components.

After a service is created, it can be injected into a component by adding a property with the ``@Inject()`` decorator.

This can sound confusing, but in reality it's very simple to implement. Let's see an example:

We start by creating a new service like this:

```typescript
// my-service.ts
@Injectable({
  selector: 'greeterService'
})
export class GreeterService {

  greet(name: string) {
    console.log(`Hello ${name}!`);
  }

}

```

And then we *inject* it into a component
```typescript
// my-component.ts
@Component()
export class MyComponent {

  @Inject() greeterService: GreeterService

  constructor() {
    super();
    // Now we can call the methods of the service
    this.greeterService.greet('World'); // Logs 'Hello World!'
  }

}

```

#### What's happening here?

It may look complicated but it's actually not, let's take a look at the first class: ``GreeterService`` as we mentioned before is decorated with 
the ``@Injectable()`` decorator. This tells Xeito it needs to keep an instance of it to be accessible by the components. 

The specified ``selector`` key tells the framework what name it has so it can be injected by a component later.

After that, we decorate a property of ``MyComponent`` with a ``@Inject()`` decorator. The property name will be used to find the service we want 
to inject (the one with the ``selector`` key we specified before). We can also specify a name in the decorator like this: ``@Inject('greeterService')`` if we want to use a different name for the property.

Now our component has access to all the public methods and properties of the service and can call them whenever it needs to. Since the service is
a ***singleton*** (there is only one instance of it for the entire app), its inner state is shared no matter how many components use it.
We can use this to create global state containers, cache http responses or any other kind of data that needs to be shared between components.

## Tagged Template Literals

You might have noticed our components are not importing some HTML template, instead they have a ``render()`` method that returns a tagged template string, 
the contents of the string are a declarative HTML string:

```ts
  html`<div>Hello ${name}!</div>`;
```

Briefly explained, under the hood Xeito uses a library called [µhtml](https://github.com/webreflection/uhtml). This library provides a set of utilities
to create and update the DOM content based on this template literals, to be able to do this they are tagged with the ``html`` function.
Tagging template literals this way allows the function to receive the an array of strings and an array of the expressions interpolated within, 
µhtml uses this to create the DOM tree and update only the parts that change.

## Ready for more?

We've briefly introduced some of the main features of Xeito's core. The rest of the documentation will cover these two and other more advanced
features in much finer detail.