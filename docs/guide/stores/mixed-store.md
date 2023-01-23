# MixedStore

The `MixedStore` is a store that can be used to obtain a value derived from other stores.
It will automatically call its _updater function_ whenever any of the stores it depends on changes.

We can achieve this by passing the stores we want as the first argument to the `MixedStore` constructor
and the updater function as the second argument. (If we're only passing a single store, we can pass it directly instead of an array.)

## Creating a MixedStore

```typescript
import { MixedStore } from '@xeito/store';

const store1 = new WriteStore(1);
const store2 = new WriteStore(2);

const mixed = new MixedStore([store1, store2], ([value1, value2]) => value1 + value2);

console.log(mixed.value); // 3
```

## The updater function

The updater function will receive the value of the store (or an array of values if we're passing multiple stores) as the first argument and a `set` function as the second argument.

```typescript
import { MixedStore } from '@xeito/store';

const store1 = new WriteStore(1);
const store2 = new WriteStore(2);

const mixed = new MixedStore([store1, store2], ([value1, value2], set: any) => {
  console.log('The value changed to', value1 + value2);
  set(value1 + value2);
  return () => {
    console.log('Cleaning up');
  };
});

// The updater function gets the value directly if it's a single store
const mixed2 = new MixedStore(store1, (value: number) => value + 1);
```

## Default value

The `MixedStore` constructor accepts an optional third parameter that will be used as the default value of the store 
until one of the stores it depends on changes.

```typescript
import { MixedStore } from '@xeito/store';

const store1 = new WriteStore(1);
const store2 = new WriteStore(2);

const mixed = new MixedStore([store1, store2], ([value1, value2]) => value1 + value2, 0);

console.log(mixed.value); // 0
```