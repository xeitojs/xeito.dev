# Actions

Actions provide a way to encapsulate DOM manipulation and event handling in a reusable way.
They can be imported by a component directly or provided by a Plugin globally.

## Creating an action

To create an action we'll use the `@Action()` decorator. 
This decorator will mark the class as an action, add the required functionality and allow us to import it into a component later.

```typescript
import { Action } from '@xeito/core';

@Action({
  selector: 'myAction'
})
export class MyAction {
  // ...
}
```
The `@Action()` decorator accepts an object with a single property called `selector`. This property is used to identify the action in the component, 
so it must be unique to prevent conflicts.

## Using the action

To be able to use the action in a component, we must add it to the component's `actions` property.

```typescript
import { Component, XeitoComponent } from '@xeito/core';
import { MyAction } from './my-action';

@Component({
  selector: 'my-component',
  actions: [MyAction]
})
```
We can them use the action in the component's template by using the `.use()` method:
```typescript
render() {
  return html`
    <div class="component-container">
      ${this.use('myAction')}
      Component text
    </div>
  `;
}
```
Action calls should be placed inside an interpolation (one for each action call) that is inside the element we want to use the action on.
The recommended way to do this is to place them as the first children of the element.
```html
<div class="component-container">
  ${this.use('myAction')}
  ${this.use('myOtherAction')}
  ${this.use('myThirdAction')}

  Component text
</div>
```
### Passing parameters to the action
The `use()` method allows us to also pass parameters to the action, which can be used to customize the action's behavior.
```typescript
render() {
  return html`
    <div class="component-container">
      ${this.use('myAction', { param1: 'value1', param2: 'value2' })}
      Component text
    </div>
  `;
}
```
*__Note__: We're not limited to a single parameter, we can pass as many as we want (as long as the action's constructor accepts them).*

## Modify the action's element

So far we've seen how to create a new action and how to use it in a component but we haven't seen how to modify the element that the action is being used on.
To access the element and parameters passed to the action, we have to add a `setup()` method to the action class.

```typescript
import { Action } from '@xeito/core';

@Action({
  selector: 'myAction'
})
export class MyAction {
  
  setup(private element: HTMLElement, private params: any) {
    /**
     * The element parameter is the element that the action is being used on 
     * (the parent of the interpolation)
     * We can modify it however we want using the DOM API
     */
    element.classList.add('my-action');
    element.style.color = params.color;
  }
}
```
*__Note__: The `params` parameter is optional, so we can omit it if we don't need it.*

And that's it. We've created an action and used it in a component.

## Cleaning up the action

Actions have access to the DOM element that they're being used on, that means that they can also add event listeners to it.
This creates a problem when the element is modified or changed from outside the action or when the action is removed from the component.
For this reason, actions can also implement a `cleanup()` method that gets called on every render of the parent component and when the component is removed from the DOM.

```typescript
import { Action } from '@xeito/core';

@Action({
  selector: 'myAction'
})
export class MyAction {
  
  setup(private element: HTMLElement) {
    element.addEventListener('click', this.onClick);
    // Add the event listener
  }

  cleanup() {
    element.removeEventListener('click', this.onClick);
    // Remove the event listener
  }

  private onClick(e: Event) {
    console.log('clicked');
  }
}
```
*__Note__: The `cleanup()` method is optional, so we can omit it if we don't need it.*

## Action Lifecycle

An action is created once for every time it's used in a component and the instance is kept alive until the component is removed from the DOM.
The `cleanup()` method is called on every render, followed by the `setup()` method.

Once the parent component is removed from the DOM, the `cleanup()` method is called again and then the action is destroyed.