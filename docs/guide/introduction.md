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

  @state() count: number = 0;

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