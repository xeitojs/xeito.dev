# Events

## Overview

Events are the most basic way to communicate between components.
Child components can emit events that bubble up and can then be handled by the parent component.
Xeito relies on the native [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) API to handle events.

## The `@Event()` decorator

To be able to emit events from a component, we need to create a new property decorated with the `@Event()` decorator.
The name of the decorated class property will be the name of the event that's being emitted 
(this can be changed by passing an EventConfig object to the decorator, as we'll see later).

```typescript
import { Event, EventEmitter } from '@xeito/core';

@Event() myEvent: EventEmitter;
```
As you can see, the `@Event()` decorator returns an `EventEmitter` object. This object can be used to emit events from the component.

```typescript
// my-component.ts
import { Event, EventEmitter } from '@xeito/core';

@Event() myEvent: EventEmitter;

notifyParent() {
  this.myEvent.emit('Hello World!'); // Emits an event
}
```

## Listening to events

To listen to events emitted by a child component, we need to add an event listener to the parent component, this is done the same way as 
we would with a native DOM element.

```typescript
// parent-component.ts
render() {
  return html`
    <my-component @myEvent=${this.handleEvent}></my-component>
  `;
}
```
When writing the event handlers, you need to make sure you're using the type `CustomEvent` to access the event data.
The event data is available in the `detail` property of the event.

```typescript
// parent-component.ts
handleEvent(event: CustomEvent) {
  console.log(event.detail); // Logs 'Hello World!' when the event is emitted
}
```

## Event configuration

The `@Event()` decorator accepts an optional EventConfig object as a parameter, this object can be used to customize 
the event that will be created by the decorator.

```typescript
export interface EventConfig {
  name?: string;
  composed?: boolean;
  bubbles?: boolean;
  cancelable?: boolean;
}
```
By default, Xeito will use the property name as the event name, but you can change this by passing the name property in the event config object.
The rest of the properties are used to configure the event, they are the same as the properties of the [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event/Event) API.
