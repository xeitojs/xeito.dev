# Using Stores in a Component

We've seen how to create and use stores, but how do we use them in a component?
In this section we'll see how to use stores in a component and how to use the `@State` decorator to make it easier.

## The manual way

The most basic way would be to make use of the `.subscribe` method and update the component's state when the store's value changes:

```typescript
import { Component, XeitoComponent, State, html } from '@xeito/core';
import { WriteStore, Subscription } from '@xeito/store';

@Component({
  selector: 'my-component'
})
export class MyComponent extends XeitoComponent {

  @State() value: number = 0;

  store: WriteStore<number> = new WriteStore(0);
  storeSubscription: Subscription;

  onWillMount() {
    this.store.subscribe((value) => {
      this.value = value;
    });
  }

  onUnmount() {
    this.storeSubscription.unsubscribe();
  }

  increment() {
    this.store.set(this.store.value + 1);
  }

  render() {
    return html`
      <div>
        <p>Value: ${this.value}</p>
        <button @click=${this.increment}>Increment</button>
      </div>
    `;
  }
}
```
Woah! That's a lot of code for something that seems so simple. 

We've got to create a store, subscribe to it, 
unsubscribe from it when the component unmounts, and update the component's state when the store's value changes.

## Using the `@State` decorator

That's why Xeito's `@State` decorator provides first class support for stores. We can pass a store to a property decorated with `@State` 
and Xeito will automatically manage the subscription and trigger updates when the store's value changes.
We can then read the value of the store in the template directly by using the `.value` property.

```typescript
import { Component, XeitoComponent, State, html } from '@xeito/core';
import { WriteStore } from '@xeito/store';

@Component({
  selector: 'my-component'
})
export class MyComponent extends XeitoComponent {

  @State() store: WriteStore<number> = new WriteStore(0);

  increment() {
    this.store.set(this.store.value + 1);
  }

  render() {
    return html`
      <div>
        <p>Value: ${this.store.value}</p>
        <button @click=${this.increment}>Increment</button>
      </div>
    `;
  }
}
```

Now that's a lot simpler! 

The `@State` decorator will automatically subscribe to the store and unsubscribe from it when the component unmounts, it supports all the types of stores, and it will trigger updates when the store's value changes.