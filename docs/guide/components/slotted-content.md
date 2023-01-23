# Slotted Content

## Introduction

One of the most powerful features of components is the hability to nest other components and elements inside of them.
Every framework has its own way of handling this, defined by the way they are implemented. Xeito has two different ways
to render slotted content, depending on the type of component you're creating.

## The `slotContent` property

By default, Xeito components doesn't use Shadow DOM, this is done to allow the user to style the component from the outside, 
in the global CSS scope, the same way you would style a normal HTML element. This also means that the component's content
will be rendered in the global scope, and not inside the component's shadow root.

Unfortunately, the `<slot>` element is only available inside the shadow root, so we can't use it to render the component's content.
To solve this problem, Xeito provides a special propery called `slotContent`, which can be used to render the component's content.

The `slotContent` property is an object that gets populated with the component's children when the component is first loaded,
it will contain properties for each different slot that has been used and works in similar fashion to the `slot` attribute.

Let's assume we're using a component called `my-component`, and we're passing three elements to it like this:

```html
<my-component>
  <div>Default content</div>
  <div slot="header">Header</div>
  <div slot="content">Content</div>
</my-component>
```
As we can see, we're passing three elements to the component, one without a slot, and two with a slot attribute.
These elements will be available in the `slotContent` property like this:

```js
{
  default: [ /* The elements without a slot */ ],
  header: [ /* The elements with the slot="header" attribute */ ],
  content: [ /* The elements with the slot="content" attribute */ ]
}
```
Inside the `my-component` class, we can then render the slotted content by using the `slotContent` property in the template:

```typescript
// my-component.ts
render() {
  return html`
    <div class="default-container">
      ${this.slotContent.default}
    </div>
    <div class="header-container">
      ${this.slotContent.header}
    </div>
    <div class="content-container">
      ${this.slotContent.content}
    </div>
  `;
}
```
We can also provide a default value for a slot in case no content is passed to it:

```typescript
// my-component.ts
render() {
  return html`
    <div class="header-container">
      ${this.slotContent.header || 'No content passed to the header slot'}
    </div>
  `;
}
```

## The `slot` element

The `slot` element is only available when using Shadow DOM, so if you want to use it, you need to enable Shadow DOM for your component.
To do this, you need to add the `shadow` property to the `@Component()` decorator:

```typescript
// my-component.ts
import { Component } from '@xeito/core';

@Component({
  selector: 'my-component',
  shadow: true
})
export class MyComponent extends HTMLElement {
  // ...
}
```

Now, you can use the `slot` element to render the component's content in the same way as you would do with the native `<slot>` element:

```html
<my-component>
  <div>Default content</div>
  <div slot="header">Header</div>
  <div slot="content">Content</div>
</my-component>
```

```typescript
// my-component.ts
render() {
  return html`
    <div class="default-container">
      <slot></slot>
    </div>
    <div class="header-container">
      <slot name="header"></slot>
    </div>
    <div class="content-container">
      <slot name="content"></slot>
    </div>
  `;
}
```

::: warning Shadow DOM and CSS
When using Shadow DOM you need to be aware that the global CSS styles won't reach the component's shadow root, so you need to
use the `:host` selector to style the component from the outside:

```css
/* my-component.css */
:host {
  display: block;
  background-color: #eee;
}
```
You can also provide styles for a Shadow DOM component by using the `styles` property in the `@Component()` decorator:

```typescript
// my-component.ts
import { Component } from '@xeito/core';

@Component({
  selector: 'my-component',
  shadow: true,
  styles: [`
    .my-component-content {
      display: block;
      background-color: #eee;
    }
  `]
})
```
Styles defined in the `styles` property will be appended as a `<style>` element inside the component's shadow root and won't affects
the global CSS scope.


:::