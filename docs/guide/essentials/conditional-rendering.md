# Conditional Rendering

A common need for components is to render different content based on some condition. For example, a `TodoList` component might render a list of todos, but if there are no todos, it might render a message.

Xeito provides a few different ways to do conditional rendering. In the following sections, we'll cover each one.

## `<xt-if>`

The `<xt-if>` is a built-in component (that means you don't need to import it and it's available by default) that allows you to render content based on a condition.
This component is the easiest way to render conditional content, it works similar to the `if` statement in Javascript/Typescript.

```typescript
// my-component.ts
render() {
  return html`
    <xt-if .when=${this.show}>
      <p>Content to be rendered if the condition is true</p>
    </xt-if>
  `;
}
```
As we can see, it accepts a single **propery** binding called `when`, this property must resolve to a boolean value, if the value is `true` the content inside the default slot will be rendered (that is the content without a slot name).

We can also use the `else` slot to render content if the condition is `false`.

```typescript	
render() {
  return html`
    <xt-if .when=${this.show}>
      <p>Content to be rendered if the condition is true</p>
      <p slot="else">Content to be rendered if the condition is false</p>
    </xt-if>
  `;
}
```

## `<xt-switch>`

The `<xt-switch>` is another built-in component that allows you to render content based on a condition.
In this case, it works similar to the `switch` statement in Javascript/Typescript.

```typescript
// my-component.ts
render() {
  return html`
    <xt-switch .of=${this.value}>
      <p slot="A">Content to be rendered if the value is A</p>
      <p slot="B">Content to be rendered if the value is B</p>
      <p slot="C">Content to be rendered if the value is C</p>
      <p>Content to be rendered if the value is not A, B or C</p>
    </xt-switch>
  `;
}
```
It accepts a single **propery** binding called `of` that will be used to match the content with the slot name.
We can provide as many slots as we want, the content inside the slot with the same name as the value of the `of` property will be rendered.

If there is no slot with the same name as the value of the `of` property, the content inside the default slot will be rendered.

## Manual conditional rendering

Sometimes we might need more control over the rendering of the content and the built-in components are not enough,
in these cases, we can always use template interpolations and nested `html` templates to render the content the way we want.
A simple example would be:

```typescript
// my-component.ts
render() {
  return html`
    ${this.show ? html`<p>True</p>` : html`<p>False</p>`}
  `;
}
```
This is the most flexible way to render conditional content, but it's also the most verbose and can lead to optimization issues if used incorrectly.