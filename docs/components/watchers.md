# Watchers

In the previous sections ([State](state.md) and [Props](props.md)), we learned how to use the `@State()` and `@Prop()` decorator to make our components dynamic.
These decorators are reactive, which means that when the value of the state or prop changes, the component's template will be updated with the new values.

In some cases, we may want to perform some action when the value of a state or a property changes. To create these side effects, we can use the `@Watch()` 
decorator on a method of our component. This will tell Xeito to call the method whenever the value of the selected state or prop changes.

## Watching a State

Let's say we want to log a message to the console whenever the value of the `count` state changes. We can do this by using the `@Watch()` decorator on a method
and passing the name of the state property we want to watch as an argument.

```typescript
// my-component.ts
import { Component, XeitoComponent, html, State, Watch } from '@xeito/core';

@Component({
  selector: 'my-component',
})
export class MyComponent extends XeitoComponent {

  @State() count: number = 0;

  @Watch('count')
  logCount(update: WatchUpdate) {
    console.log(`Count changed to: ${update.value}`);
    // This will run whenever the value of the `count` changes.
  }

  render() {
    return html`
      <button @click=${() => this.count++}>Count is: ${this.count}</button>
    `;
  }
}
```
We can also watch multiple states at the same time by passing multiple arguments to the `@Watch()` decorator.

```typescript
@Watch('count', 'name', 'age') // Watch multiple states
```

## Watching a Prop

Watching a prop works the same way as watching a state, we don't need to pass any special arguments to the `@Watch()` decorator.

```typescript
// my-component.ts
import { Component, XeitoComponent, html, Prop, Watch } from '@xeito/core';

@Component({
  selector: 'my-component',
})
export class MyComponent extends XeitoComponent {

  @Prop() name: string = 'John';

  @Watch('name')
  logName(update: WatchUpdate) {
    console.log(`Name changed to: ${update.value}`);
    // This will run whenever the value of the `name` changes.
  }

  render() {
    return html`
      <p>Name is: ${this.name}</p>
    `;
  }
}
```
Bear in mind that watched props will also run on the initial render if the property/attribute of the component is set by the parent component.

::: warning REACTIVE PROPERTIES
While you can mix `@State()` and `@Props()` as arguments of the `@Watch()` decorator and they will work as expected,
this will not work for not reactive properties.
This means that all the watched properties must be reactive, either by using `@State()` or `@Prop()`.
:::

## The WatchUpdate interface

A method decorated with `@Watch()` should receive a single argument of type `WatchUpdate`.
This argument contains the following properties:

```typescript
interface WatchUpdate {
  name: string; // The name of the watched property
  value: any;   // The new value of the watched property
}
```
This allows us to perform different actions depending on the property that changed:

```typescript
@Watch('count', 'name')
logUpdate(update: WatchUpdate) {
  if (update.name === 'count') {
    console.log(`Count changed to: ${update.value}`);
  }
  if (update.name === 'name') {
    console.log(`Name changed to: ${update.value}`);
  }
}
```