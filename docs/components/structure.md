# Component Structure

## Anatomy of a Component

Components are the building blocks of Xeito applications. They are the main way to create reusable code and to organize your application. 
A component is a class with the ``@Component()`` decorator that extends the `XeitoComponent` class and has a `render` method that returns a 
tagged template literal. The template literal is a string that contains HTML and can contain expressions that will be evaluated and rendered as HTML.

Let's take a look at the most basic component:

```typescript
import { Component, XeitoComponent, html } from '@xeito/core';

@Component({
  selector: 'app-root'
})
export class AppRoot extends XeitoComponent {

  render() {
    return html`
      <h1>Hello World</h1>
    `;
  }
}
```

Let's break down this example to understand the different parts of a component.

### The ``@Component()`` decorator

Every Xeito component begins with the ``@Component()`` decorator. This decorator receives a single object with the component metadata and the only required property is the `selector`. The selector is the name of the component and it will be used to identify and render the component in the DOM.
The metadata object can also contain other properties that will be used to define the component behavior and appearance and it has the following structure:

```typescript
interface ComponentMetadata {
  selector: string;   // The selector of the component (e.g. 'app-root')
  shadow?: boolean;   // If the component should use shadow dom
  imports?: any[];    // Other components that should be imported to be used in the template (e.g. [CounterComponent])
  actions?: any[];    // Actions that should be imported to be used in the template (e.g. [TextColorAction])
  pipes?: any[];      // Pipes that should be imported to be used in the template (e.g. [UpperCasePipe])
  services?: any[];   // Services that should be imported to be used in the template (e.g. [UserService]) Only to prevent minifiers from removing them
}
```

### Extending the ``XeitoComponent`` class

The component class must extend the `XeitoComponent` class. This class contains the logic to render the component and handle state and property reactivity. 
It also provides useful methods like `this.use` and `this.pipe` that we'll see in the next sections.

``XeitoComponent`` also extends the `HTMLElement` class so you can use all the methods and properties an `HTMLElement` and it's the reason Xeito Components are 
built on top of the Web Components standard.

### The ``render()`` method

The ``render()`` method is the only required method of a component and it must return a tagged template literal. 
These templates have to be defined by using the ``html`` tagged template literal function. This function is provided by ``@xeito/core`` simply by re-exporting it from the original [µhtml](https://github.com/webreflection/uhtml) library utilities and it's used to parse the template and create the component's DOM.

The ``render()`` method is called every time the component state or properties change.

## Component Methods

You can define methods in the component class that can be used in the template or by other methods, all the methods are automatically bound to the component instance and can be used directly in the template as we've seen in the [Event Handling](../essentials/event-handling.md) section.

Being bound to the component instance means that you need to wrap the method in an arrow function if you want to pass parameters to it from the template.

```typescript
// my-component.ts
clickCallback(event: Event) {
  console.log('Clicked!', event.target);
}

clickHandler(event: Event, message: string) {
  console.log(message, event.target);
}
```

```html
// Without parameters (it only receives the event)
<button @click=${this.clickCallback}>Click Me</button>

// With parameters (it receives the event and the message)
<button @click="${(e: Event)=> this.clickHandler(e, 'Hello!')}">Click Me</button>
```

## Component Properties

You can define properties in the component class that can be used in the template or by other methods.
By default properties are not reactive, but you can make the template re-render when a property changes by using the `@State()` decorator.
We'll see more about this in the [State](./state.md) section.

## Nesting Components

One of the main advantages of using components is that you can nest them inside each other.
To be able to render another component inside a component's template you need to import the component class and provide it in the component metadata, 
after that you can use the component selector as a tag in the template.

Let's create a `CounterComponent` that has a button to increment a counter and a paragraph to show the current count:
```typescript
// counter.component.ts
import { Component, XeitoComponent, State, html } from '@xeito/core';

@Component({
  selector: 'app-counter'
})
export class CounterComponent extends XeitoComponent {

  @State() count = 0;

  render() {
    return html`
      <button @click=${()=> this.count++}>Click Me</button>
      <p>Count: ${this.count}</p>
    `;
  }
}
```
We can now use the `app-counter` selector in the template of another component, for example the `app-root` component:
```typescript
// app-root.component.ts
import { Component, XeitoComponent, html } from '@xeito/core';
import { CounterComponent } from './counter.component';

@Component({
  selector: 'app-root',
  imports: [CounterComponent] // Import the component to be used in the template
})
export class AppRoot extends XeitoComponent {

  render() {
    return html`
      <h1>Hello World</h1>
      <app-counter></app-counter>
    `;
  }
}
```
## Component Lifecycle

Xeito components have a set of lifecycle methods that are called at different stages of the component lifecycle. These methods are optional and you can define them in the component class to execute code at the corresponding stage.

```typescript
/**
 * onInit: Called when the component is initialized (constructor)
 * onWillMount: Called before the first render (connectedCallback)
 * onDidMount: Called after the first render (connectedCallback)
 * onUnmount: Called when the component is unmounted (disconnectedCallback)
 */
onInit(): any {}
onWillMount(): any {}
onDidMount(): any {}
onUnmount(): any {}
```

You can use these methods to execute code at the corresponding stage of the component lifecycle. For example, you can use the `onDidMount` method to execute code after the component is rendered for the first time.
