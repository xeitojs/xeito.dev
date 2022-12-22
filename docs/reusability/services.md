# Services

## Introduction
Xeito includes and encourages the use of Dependency Injection to provide services to the components.
Services are classes that can be injected into multiple components and all of them will share the same instance of the service.

This is a very powerful feature that allows us to create reusable code that can be used in multiple components and share data between them.
In this section we'll see how to create a service and how to inject it into a component.

## Creating a service
To create a service we'll use the `@Injectable()` decorator. This decorator will mark the class as a service and register it in the dependency injection container,
allowing us to inject it into the components.

```typescript
import { Injectable } from '@xeito/injection';

@Injectable({
  selector: 'myService'
})
export class MyService {
  // ...
}
```
As we can see, the `@Injectable()` decorator accepts an object with a single property called `selector`. 
This property is used to identify the service in the dependency injection container and the components that will inject it, so it must be unique to prevent conflicts.

And that's it, we've created a service. Now we can inject it into a component.

## Injecting a service
To inject a service into a component we'll use the `@Inject()` decorator and add the service to the component's `services` property.

```typescript
import { Component, XeitoComponent, Inject } from '@xeito/injection';
import { MyService } from './my-service';

@Component({
  selector: 'my-component',
  services: [MyService]
})
export class MyComponent extends XeitoComponent {
  @Inject() myService: MyService;
}
```
In the example above we've injected the `MyService` service into the `MyComponent` component, for that to work, the decorated property 
must have the same name as the service selector, in this case `myService`.
However, we might want to use a different name for the property, in that case we pass a string as the first parameter of the decorator.

```typescript
@Inject() myService: MyService; 
//=> Injects the service with the selector 'myService'

@Inject('myService') serviceInstance: MyService; 
//=> Injects the service with the selector 'myService' too!
```
::: tip Type checking and autocompletion
We are also giving this property the type of the service class to provide type checking and autocompletion.

```typescript
@Inject() myService: MyService;
//=> myService is of type MyService

onInit() {
  this.myService.doSomething(); // Autocompletion works!
}
```
:::

## Using the service

Since services are singletons (that is: only one instance is created for the whole application), we can use them to share data between components,
to create reusable code or as a global state container.

This can be coupled with the power of [RxJS](https://rxjs.dev/) to create reactive applications:

```typescript
import { Injectable } from '@xeito/injection';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  selector: 'myService'
})
export class MyService {

  public counter$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  
  sumToCounter(value: number) {
    this.counter$.next(this.counter$.getValue() + value);
  }

  multiplyToCounter(value: number) {
    this.counter$.next(this.counter$.getValue() * value);
  }

  resetCounter() {
    this.counter$.next(0);
  }

}
```
This service exposes a `counter$` property that is a `BehaviorSubject` of type `number`. This property can be subscribed to from 
the outside and will emit the current value of the counter every time it changes.
We can then use this service in a component to subscribe to the counter and update the UI every time it changes.

```typescript
import { Component, XeitoComponent, Inject, html } from '@xeito/injection';
import { MyService } from './my-service';

@Component({
  selector: 'my-component',
  services: [MyService]
})
export class MyComponent extends XeitoComponent {

  @State() count: number = 0;
  @Inject() myService: MyService;

  onDidMount() {
    this.myService.counter$.subscribe(counter => {
      this.count = counter;
    });
  }

  render() {
    return html`
      <div>Counter: ${this.count}</div>
      <br>
      <button @click=${() => this.myService.sumToCounter(1)}>Sum 1</button>
      <button @click=${() => this.myService.multiplyToCounter(2)}>Multiply by 2</button>
      <button @click=${() => this.myService.resetCounter()}>Reset</button>
    `;
  }

}
```