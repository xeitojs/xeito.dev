# Reactive State

## The `@State()` decorator

By default the properties of a Xeito component class won't trigger a re-render when they change, for that to happen
you need to use the `@State()` decorator to tell Xeito that the property should be watched for changes.

```typescript
// my-component.ts
import { Component, XeitoComponent, html, State } from '@xeito/core';

@Component({
  selector: 'my-component',
})
export class MyCounter extends XeitoComponent {

  @State() count: number = 0;

  increment() {
    this.count++;
  }

  render() {
    return html`
      <div>
        <h1>Counter</h1>
        <p>Count: ${this.count}</p>
        <button @click=${this.increment}>Increment</button>
      </div>
    `;
  }
}
```
In this example we can see how the `count` property is decorated with the `@State()` decorator, this tells Xeito to watch the property for changes and re-render the component when it changes.

## Updating Arrays and Objects

Reactivity in Xeito is triggered by assignments, this means that methods that mutate arrays or objects won't trigger a re-render by themselves, you need to assign the new value to the property for it to trigger a re-render.

You can fix this by assigning the new value to the property directly, for example:

```typescript
// my-component.ts
@State() items: number[] = [1, 2, 3];

addItem() {
  this.items.push(this.items.length + 1); // Won't trigger a re-render
  this.items = this.items; // Triggers a re-render by assigning a new value
}
```

This can be made more concise by using the ES6 spread operator:

```typescript
// my-component.ts
@State() items: number[] = [1, 2, 3];

addItem() {
  this.items = [...this.items, this.items.length + 1]; // Triggers a re-render
}
```

## Template assignments

State properties not only can be assigned in the component methods, they can also be assigned in the template through the use of arrow functions.

```typescript
// my-component.ts
@State() count: number = 0;

render() {
  return html`
    <div>
      <h1>Counter</h1>
      <p>Count: ${this.count}</p>
      <button @click=${() => this.count++}>Increment</button>
    </div>
  `;
}
```