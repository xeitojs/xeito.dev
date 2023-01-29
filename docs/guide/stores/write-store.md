# WriteStore

The `WriteStore` is the most basic of the stores. It allows you to write data to it and read it back.
Let's begin by creating a `WriteStore`:

```typescript 
import { WriteStore } from '@xeito/store';

const store = new WriteStore('initial value');
```

## Subscribing

Once we have the `WriteStore` created, we can be notified when the value changes by using the `.subscribe` method and passing a callback to it:

```typescript
import { WriteStore } from '@xeito/store';

const store = new WriteStore('initial value');

store.subscribe((value) => {
  console.log('The value changed to', value);
});
```
The store will call the callback inmediately with the current value it contains.

## Unsubscribing

The `.subscribe` method returns an object with the `.unsubscribe` method, which can be used to unsubscribe from the store:

```typescript
import { WriteStore } from '@xeito/store';

const store = new WriteStore('initial value');

const subscription = store.subscribe((value) => {
  console.log('The value changed to', value);
});

subscription.unsubscribe(); // We won't be notified anymore
```

## Reading the value without subscribing

We can also get the current value of the store (without subscribing to it) by reading the `.value` property:

```typescript	
import { WriteStore } from '@xeito/store';

const store = new WriteStore('initial value');

console.log(store.value); // 'initial value'
```

## Setting a new value

Finally, we can write a new value to the store by using the `.set` method:

```typescript
import { WriteStore } from '@xeito/store';

const store = new WriteStore('initial value');

store.subscribe((value) => {
  console.log(value); // Logs 'initial value'
});

store.set('new value'); // Logs 'new value' in the subscription
```

## Store callback

It's also possible to pass a second argument to the `WriteStore` constructor, this must be a function 
that will be called when the number of subscribers goes from **zero to one**, but not afterwards.
This function receives a single `set` function that can be used to change the value of the store and it must
return a `stop` function that will be called when the last subscriber unsubscribes (**one to zero**).

```typescript
import { WriteStore } from '@xeito/store';

const store = new WriteStore('initial value', (set) => {
  // Change the value every second after the first subscriber subscribes
  const interval = setInterval(() => {
    set('new value'); 
  }, 1000);

  // Stop the interval when the last subscriber unsubscribes
  return () => {
    clearInterval(interval); 
  };
});
```

## Update method

Another way to change the value of the store is by using the `.update` method. 
This method receives a function that will be called with the current value of the store and must return the new value:

```typescript
import { WriteStore } from '@xeito/store';

const store = new WriteStore(0);

store.subscribe((value) => {
  console.log(value); // Logs 0
});

store.update((value) => value + 1); // Logs 1 in the subscription
```