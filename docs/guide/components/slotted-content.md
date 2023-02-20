# Slotted Content

## Introduction

One of the most powerful features of components is the ability to nest other components and elements inside of them.
Every framework has its own way of handling this, defined by the way they are implemented. Xeito has two different ways
to render slotted content, depending on the type of component you're creating.

## The `slotContent` property

By default, Xeito doesn't use Shadow DOM, which means that native usage of the `<slot>` element is not possible.
However, Xeito provides a way around this limitation by populating a special property called `slotContent` with the component's children.
This property is an object that gets populated with the component's children when the component is first loaded and it will contain
properties for each different slot that has been used. So you can use it in a similar fashion to the `slot` attribute.

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

```typescript
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
Since we're using expressions to render the content, we can also use default values if the slot is empty:

```typescript
// my-component.ts
render() {
  return html`
    <div class="default-container">
      ${this.slotContent.default || 'Default content'}
    </div>
    <div class="header-container">
      ${this.slotContent.header || 'Header'}
    </div>
    <div class="content-container">
      ${this.slotContent.content || 'Content'}
    </div>
  `;
}
```

::: tip TIP
The `slotContent` property is available whether you're using Shadow DOM or not, so you can use it to render the component's content
in both cases.
:::


## The `<slot>` element

Xeito components are built on top of the native Web Components API, which means that they are just regular HTML elements that can be used
in the same way as any other HTML element. One of the main features of Web Components is the ability to nest other elements inside of them.
To do that, components need to use the [Shadow DOM](https://developer.mozilla.org/es/docs/Web/Web_Components/Using_shadow_DOM), 
which is a way to encapsulate the component's content and styles from the rest of the page.
By default, Xeito component don't the Shadow DOM (but you can enable it if you want to), so you can use the `<slot>` element to render
the component's content easily:

The `<slot>` element allows you to create a different "holes" in the component's template where you can render the content that is passed to it.
For example, let's assume we're using a component called `my-component`, and we're passing three elements to it like this:

```html
<my-component>
  <div>Default content</div>
  <div slot="header">Header</div>
  <div slot="content">Content</div>
</my-component>
```

Two of the elements have a `slot` attribute, which means that they will be rendered in the slot with the same name and the third element 
doesn't have a `slot` attribute, so it will be rendered in the default slot (the first slot that doesn't have a name).

Inside the `my-component` class, we can then render the slotted content by using the `<slot>` element in the template:

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

Now, when the component is rendered, the content will be rendered in the correct slots:

```html
<my-component>
  <div>Default content</div>
  <div slot="header">Header</div>
  <div slot="content">Content</div>
</my-component>
```

It's important to note that the `<slot>` element is **only available** when you're using the **Shadow DOM**, so you can't use it if you're not building a component with Shadow DOM enabled. That's why Xeito provides the `slotContent` property and it's recommended to use it instead of the `<slot>` element.