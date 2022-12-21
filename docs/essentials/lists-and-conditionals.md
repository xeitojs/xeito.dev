# List and Conditional Rendering

Xeito doesn't require the use of specific syntax to render lists or conditional elements. You can use standard Typescript syntax 
inside the template interpolation to achieve the same result, this also means you have full control from the template to display
the data you want, in the way you want it.

## Nested ``html`` tags

Xeito allows you to use nested ``html`` tags inside the template interpolation, this allows you to create complex templates by 
generating new HTML from your data and then rendering it inside the template.
  
```typescript	
render() {
  return html`
    <div>
      <h1>My name is ${this.name}</h1>
      ${html`
        <p>My age is ${this.age}</p>
      `}
    </div>
  `;
}
```

But doing this just for static content is not very useful, the real power of this feature is when you use it to render dynamic content.

## List rendering

The most common way to render lists is using the [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) 
method of the array, this is the same way you would do it in Javascript/Typescript.
This takes a function as a parameter and returns a new array with the result of the function applied to each element of the original array,
we can use this to return a new array of ``html`` tags that will be rendered inside the template.

```typescript
// my-component.ts
render() {
  return html`
    <ul>
      ${this.items.map(item => html`<li>${item}</li>`)}
    </ul>
  `;
}
```

```html
// Result
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
  ...
</ul>
```

But ``Array.map`` is not the only method you can use while rendering list, it is also possible to filter the list using the 
[Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 
or [Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) methods.

```typescript
// this.items: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
render() {
  return html`
    <ul>
      ${this.items
        .filter(item => item % 2 == 0)
        .map(item => html`<li>${item}</li>`)
      }
    </ul>
  `;
}
```

```html
// Result
<ul>
  <li>2</li>
  <li>4</li>
  <li>6</li>
  <li>8</li>
  <li>10</li>
</ul>
```

## Conditional rendering

As we've seen, it's possible to use normal Javascript/Typescript syntax inside the template interpolation, this means you can use
the [ternary operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) to render
elements conditionally.

```typescript
// this.answer: number = 42;
render() {
  return html`
    <div>
      <h1>The answer to the question of life, the universe and everything is:</h1>
      ${this.answer == 42 ? html`<p>Forty Two</p>` : html`<p>Don't panic!</p>`}
    </div>
  `;
}
```

```html
// Result
<div>
  <h1>The answer to the question of life, the universe and everything is:</h1>
  <p>Forty Two</p>
</div>
```

## More complex logic

You can also include more complex logic inside a template interpolation, but this requires the use of a 
[IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) (Immediately Invoked Function Expression) to execute the logic.

```typescript
// this.answer: number = 42;
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

```html
// Result
<div>
  <h1>The answer to the question of life, the universe and everything is:</h1>
  <p>Forty Two</p>
</div>

// Console
The answer is 42!
```

::: warning
  The use of IIFE is not recommended, it is better to use a method to handle the logic and then call it inside the template interpolation.
  If you need to use a IIFE, make sure to use an [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
  and not a normal function, this will ensure that the ``this`` keyword inside the function will refer to the component instance.
  Also make sure to avoid side effects inside the IIFE, since it will be executed every time the template is rendered, which can happen multiple times outside of your control.
:::