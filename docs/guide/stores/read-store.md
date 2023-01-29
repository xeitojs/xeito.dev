# ReadStore

The `ReadStore` class is a read-only version of the [`WriteStore`](write-store.md) class.
It works the same as the `WriteStore` class, but it doesn't allow you to write to it, that means you cannot use the `.set` or `.update` methods.

```typescript
import { ReadStore } from '@xeito/store';

const store = new ReadStore('initial value');
```

## Subscribing and unsubscribing

You can subscribe and unsubscribe to a `ReadStore` just like you would with a `WriteStore`.

```typescript
import { ReadStore } from '@xeito/store';

const store = new ReadStore('initial value');

const subscription = store.subscribe((value) => {
  console.log('The value changed to', value);
});

subscription.unsubscribe(); // We won't be notified anymore
```

## Updating the value

Wait, what? How can we update the value of a ReadStore if we can't use the `.set` or `.update` methods?
The answer is that the `ReadStore` relies on its callback to update itself.

This can be useful, for example, when you want to create a store that retrieves an asyncronous value that will remain the same later on, 
but you still need to notify your subscribers when the value changes. There might be other use cases for when it doesn't make sense to be able
to update the value from the outside, like representing the mouse position or user's location.

The callback function works exactly the same as it does for the `WriteStore`, that means it will be called when the first subscriber subscribes, 
receives a `set` function to update the value of the store and must return a cleanup function that will be called when the last subscriber unsubscribes.

```typescript
import { ReadStore } from '@xeito/store';

const store = new ReadStore(0, (set) => {
  const interval = setInterval(() => {
    set(Math.random());
  }, 1000);

  return () => {
    clearInterval(interval);
  };
});
```