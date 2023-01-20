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

## Updater function

The constructor of the `WriteStore` accepts an optional second parameter.
This parameter is a function that will be called every time the store is updated.

The updater function receives the current value of the store as the first argument and a `set` function as the second argument.

```typescript
(currentValue: T, set: (newValue: T) => void) => any | Function;
```

The updater function can return a value or a function. If it returns a value, that value will be automatically set as the new value of the store.
If it returns a function, that function will be called when the last subscriber unsubscribes from the store and before the updater function is called again.

```typescript
import { WriteStore } from '@xeito/store';

const store: WriteStore<string> = new WriteStore('initial value', (value: string, set: Function) => {
  console.log('The value changed to', currentValue);
  return () => {
    console.log('Cleaning up');
  };
});
```

We can use this to create a store that will modify the value of the store when it's updated:

```typescript
import { WriteStore } from '@xeito/store';

const store: WriteStore<number> = new WriteStore(0, (value: number) => value + 1);
```
The store above will add 1 to the value every time it's updated. This means we can call the `.set` method like this:

```typescript
store.set(1); // Store value is now 2 ((value: number) => value + 1(1))
store.set(2); // Store value is now 3 ((value: number) => value + 1(2))
```

## Modifying the updater function

We can also modify the updater function after the store is created by using the `.update` method:

```typescript
import { WriteStore } from '@xeito/store';

const store: WriteStore<number> = new WriteStore(0, (value: number) => value + 1);

store.update((value: number) => value + 2);

store.set(1); // Store value is now 4 ((value: number) => value + 2(1))
```
Setting a new updater function will also call the new updater function with the current value of the store.