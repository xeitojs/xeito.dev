# Pipes

Pipes are a way to transform data from the template and they are only recomputed when the data they depend on changes.
This is useful for transforming data such as dates, numbers, etc.

## Creating a pipe

To create a pipe we'll use the `@Pipe()` decorator. This decorator will mark the class as a pipe and allow us to import it into a component later.

```typescript
import { Pipe } from '@xeito/core';

@Pipe({
  selector: 'myPipe'
})
export class MyPipe {
  // ...
}
```
The `@Pipe()` decorator accepts an object with a single property called `selector`. This property is used to identify the pipe in the component,
so it must be unique to prevent conflicts.

## Using the pipe

To be able to use the pipe in a component, we must first add it to the component's `pipes` property.

```typescript
import { Component, XeitoComponent } from '@xeito/core';
import { MyPipe } from './my-pipe';

@Component({
  selector: 'my-component',
  pipes: [MyPipe]
})
```

We can then use the pipe in the component's template by using the `.pipe()` method:

```typescript
render() {
  return html`
    <div class="component-container">
      ${this.pipe('myPipe', 'some data')}
    </div>
  `;
}
```
Similarly to actions, pipe calls should be placed inside an interpolation.

The `pipe()` method accepts the pipe's selector as the first parameter and any number of parameters after that. 
These parameters will be passed to the pipe's `transform()` method.

## Transforming data

The pipe's `transform()` method is where the data transformation happens. 
We can specify what parameters the pipe receives and they will be send by the `pipe()` method.

```typescript
import { Pipe } from '@xeito/core';

@Pipe({
  selector: 'myPipe'
})
export class MyPipe {
  transform(data: string, param1: string, param2: number) {
    let transformation =  data + param1 + param2;
    transformation = transformation.toUpperCase();
    return transformation; // Will be rendered in the template
  }
}
```
The transform method must return the transformed data to be rendered in the template.

## Destroying

Pipes are instantiated once for every use in the template and the transform method is called every time the data changes.
When the component is destroyed, the pipe is also destroyed and the transform method is no longer called.
We can execute logic when the pipe is destroyed by implementing the `destroy()` method.

```typescript
import { Pipe } from '@xeito/core';

@Pipe({
  selector: 'myPipe'
})
export class MyPipe {

  transform(data: string, param1: string, param2: number) {
    // Do something with the data
  }

  destroy() {
    // Do something when the pipe is destroyed
  }
}
```
This method is optional, but it can be useful for cleaning up resources. For example, if the pipe is using an observable, we can unsubscribe from it here.

## Caching

Pipe transformations are cached by default. This means that if the pipe is called with the same parameters, the cached value will be returned instead of recomputing the transformation, which can be expensive.
You have to take this into account when creating a pipe, as it can lead to unexpected behavior (for example if you depend on reactive data such as observables).