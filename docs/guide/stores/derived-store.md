# DerivedStore

The `DerivedStore` is a store that can be used to obtain a value derived from other stores.
It will automatically run its callback when the first subscriber subscribes, and whenever any of its 
store dependencies change.

## Creating a DerivedStore

In its simplest form, a `DerivedStore` takes a single store and returns a transformed value:

```typescript
import { WriteStore, DerivedStore } from '@xeito/store';

const store1 = new WriteStore(1);
const derived = new DerivedStore(store1, store1 => store1 * 2);
```
We can also pass in multiple stores by passing in an array as the first argument of the store's constructor:

```typescript
import { WriteStore, DerivedStore } from '@xeito/store';

const store1 = new WriteStore(1);
const store2 = new WriteStore(2);

const derived = new DerivedStore([store1, store2], ([store1, store2]) => store1 * store2);
```
If we pass an array of stores, the callback will be passed an array of values as the first argument in the same order as the stores.

## The callback function

The callback function can have multiple forms, as we've seen above, it can take in a value and return a new value for the store.
But it also receives a `set()` function as its second argument that can be used to update the value asynchronously.

Also, if the callback returns a function, it will be called in two cases:
1. Whenever the callback runs again.
2. When the last subscriber unsubscribes.

```typescript
const userData = new DerivedStore(userId, (userId, set) => {
  fetch(`/api/user/${userId}`)
    .then(response => response.json())
    .then(data => set(data));
  
  return () => {
    // Do something when the store is no longer needed
    // or the callback runs again.
  }
});
```

## Default value

We can also pass a third argument to the `DerivedStore` constructor to set a default value for the store before the callback runs.

```typescript
const userData = new DerivedStore(userId, (userId, set) => {
  fetch(`/api/user/${userId}`)
    .then(response => response.json())
    .then(data => set(data));
  
  return () => {
    // Do something when the store is no longer needed
    // or the callback runs again.
  }
}, { name: 'Loading...' });

userData.value; // { name: 'Loading...' }
```