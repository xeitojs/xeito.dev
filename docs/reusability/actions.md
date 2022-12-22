# Actions

Actions provide a way to encapsulate DOM manipulation and event handling in a reusable way.
They can be imported by a component directly or provided by a Plugin globally.

## Creating an action

To create an action we'll use the `@Action()` decorator. 
This decorator will mark the class as an action and allow us to import it into a component later.

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
To access the element and parameters passed to the action, we have to use the constructor of the action class, since a new instance of the action is created
on every render.

```typescript
import { Action } from '@xeito/core';

@Action({
  selector: 'myAction'
})
export class MyAction {
  constructor(private element: HTMLElement, private params: any) {
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

And that's it. We've created an action and used it in a component. Remeber that action instances are created on every render, so __we can't use them to store state__.