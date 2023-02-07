# List rendering

Rendering lists of items is another common need for components.
There are many ways to achieve this with Xeito, in this section we'll cover the most common ones.

## `<xt-for>`

The `<xt-for>` is a built-in component that allows you to render a list of items.
It will cache the rendered items and only recompute its template when the items themselves change.

```typescript
// my-component.ts
render() {
  return html`
    <xt-for .of=${this.items} .each=${(item) => html`
      <p>${item}</p>
    `}/>
  `;
}
```
As we can see, in order to use `<xt-for>` we need to provide two **property** bindings:
- `of`: An array of items to render.
- `each`: A function that returns the template for each item. This function receives the item as the first argument and the index as the second argument (optional).

Another example using the index:

```typescript
// my-component.ts
render() {
  return html`
    <xt-for .of=${this.items} .each=${(item, index) => html`
      <p>${index}: ${item}</p>
    `}/>
  `;
}
```

## Manual list rendering

Sometimes the `<xt-for>` component is not enough, for example, if we need to render a list of items that are not in an array or if we need control over the rendering of each item like filtering, sorting, etc.
In this case, we can use interpolations and any code we want to render the list.

```typescript
// my-component.ts
render() {
  return html`
    ${this.items.map((item) => html`
      <p>${item}</p>
    `)}
  `;
}
```
Since we're allowed to use the iterators normally, we can use any method we want to filter, sort, etc. the items.

```typescript
// my-component.ts
render() {
  return html`
    ${this.items.filter((item) => item > 5).map((item) => html`
      <p>${item}</p>
    `)}
  `;
}
```

Bear in mind, that this approach doesn't cache the rendered items and evaluates the template for each item every time the component is updated, therefore
you'll have the responsibility of caching the rendered items yourself if you need to improve performance.

## More complex logic

You can also include more complex logic inside a template interpolation, but this requires the use of an 
[IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) (Immediately Invoked Function Expression) to execute the logic.

```typescript
// my-component.ts
render() {
  return html`
    <div>
      <h1>The answer to the question of life, the universe and everything is:</h1>
      ${(() => {
        if (this.answer == 42) {
          console.log('The answer is 42!');
          return html`<p>Forty Two</p>`;
        } else {
          return html`<p>Don't panic!</p>`;
        }
      })()}
    </div>
  `;
}
```

::: warning Warning
The use of IIFE is not recommended, it's better to use a method to handle the logic and then call it inside the template interpolation. If you need to use a IIFE, make sure to use an [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) and not a normal function, this will ensure that the `this` keyword inside the function will refer to the component instance. Also make sure to avoid side effects inside the IIFE, since it will be executed every time the template is rendered, which can happen multiple times outside of your control.
:::