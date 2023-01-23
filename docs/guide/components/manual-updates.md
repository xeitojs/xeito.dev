# Manual Updates

Sometimes you may want to update a component manually, maybe because you're using properties not decorated with `@State` or `@Prop` or for some other reason.
For these cases, a Xeito component exposes a couple of methods that you can use to trigger an update.

## The `requestUpdate()` method

By default, Xeito listens for assignments on decorated properties and schedules an update when a property changes.
This scheduling (or batching) is done to avoid unnecessary updates and to improve performance.
This way if a method assigns multiple properties, only one update is performed after the method finishes.

You can manually trigger one of these batched updates by calling the `requestUpdate()` method.

```typescript
import { Component, XeitoComponent, html } from '@xeito/core';

@Component({
  selector: 'my-component'
})
export class MyComponent extends XeitoComponent {
  
  count = 0; 
  // => Count property not decorated with @State or @Prop 
  // (so it won't trigger an update automatically)

  increment() {
    this.count++;
    this.requestUpdate();
    // => Manually trigger an update with the requestUpdate() method
  }

  render() {
    return html`
      <button @click=${this.increment}>Increment</button>
      <p>Count: ${this.count}</p>
    `;
  }
}
```

## The `forceUpdate()` method

Sometimes you may want to force an update even if no properties have changed or without waiting for the next batched update.
Even though this is not recommended, you can do so by calling the `forceUpdate()` method.

```typescript
import { Component, XeitoComponent, html } from '@xeito/core';

@Component({
  selector: 'my-component'
})
export class MyComponent extends XeitoComponent {
    
    count = 0; 
    // => Count property not decorated with @State or @Prop 
    // (so it won't trigger an update automatically)
  
    increment() {
      this.count++;
      this.forceUpdate();
      // => Manually trigger an update with the forceUpdate() method
    }
  
    render() {
      return html`
        <button @click=${this.increment}>Increment</button>
        <p>Count: ${this.count}</p>
      `;
    }
}
```
The `forceUpdate()` method will trigger a re-render of the component no matter what and without waiting for any batched updates, 
this means that if you call it multiple times in a row, multiple updates will be performed, so use it with caution 
because it can have a negative impact on performance.