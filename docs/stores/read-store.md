# ReadStore

The `ReadStore` class is a read-only version of the [`WriteStore`](write-store.md) class.
It works the same as the `WriteStore` class, but it doesn't allow you to write to it, that means you cannot use the `.set` or `.update` methods.

```typescript
import { ReadStore } from '@xeito/store';

const store = new ReadStore('initial value');
```

## Subscribing and unsubscribing

You can subscribe and unsubscribe to a WriteStore just like you would with a ReadStore.

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
The answer is that the WriteStore relies on its _updater function_ to update its value over time.

This can be useful, for example, when you want to create a store that retrieves an asyncronous value that will remain the same later on, 
but you still need to notify your subscribers when the value changes. There might be other use cases for when it doesn't make sense to be able
to update the value from the outside, like representing the mouse position or user's location.

```typescript
import { ReadStore } from '@xeito/store';

const store = new ReadStore(null, (value: any, set: Function) => {
  fetch('https://api.github.com/users/aerotoad')
    .then((response) => response.json())
    .then((data) => set(data));
});

store.subscribe((value) => {
  // We will be notified when we get a response from the API
  // The original value will be null, and then it will be updated to the response
});
```