# Template Syntax

As we mentioned in the [Introduction](../introduction.md#tagged-template-literals) guide, the component template is defined using [tagged template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals),
which allows us to write HTML inside of JavaScript (without transpilation) and create our UI declaratively.
All the templates can be syntactically valid HTML, but they can also contain special specific tags and attributes that allow us to create dynamic components and 
bind data and events to the DOM easily.

Under the hood Xeito uses [µhtml](https://github.com/webreflection/uhtml) an ultra-lightweight (~2.5KB) library that will create the DOM tree for us
and perform the minimum amount of operations to update the DOM when the state of the component changes.
It can be seen as a very lightweight version of [lit-html](https://lit-html.polymer-project.org/) (which is used by [lit-element](https://lit.dev/)).

::: info NOTE ON NAMING 
  In this documentation we will use the terms **component** and **element** interchangeably.
  Even though a component is created with Xeito while an element native HTML, all the same rules apply to both.
:::

## Text Interpolation

The most basic binding is text interpolation using the standard syntaxt for interpolations inside of 
[templates](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) ``${}``:

```ts
html`<div>Hello ${this.name}!</div>`;
```

The expression inside the interpolation will be evaluated and the result will be converted to a string and inserted into the DOM.
Also, if the ``name`` property is decorated with the ``@State()`` decorator in the component class, 
Xeito will track the changes in the property and update the DOM automatically when it changes.

## Attribute and Property Bindings

Attribute and property bindings are supported out of the box, this means that you can bind any property or attribute of an component to a property or method of your component class. (Note that attributes are always strings, while properties can be any type of value).

You can bind data to an attribute like this:

```ts
html`<div class="${this.className}" customId=${this.customId}></div>`;
```

Or to a property like this:

```ts
html`<input .value="${this.value}" .checked=${this.checked}>`;
```

Notice that the attribute and property bindings are different, you need to use the ``.`` prefix for property bindings, if you don't it will be interpreted as an attribute binding.
If the value of a property binding is ``null`` or ``undefined`` the property will be removed from the element.

::: info NOTE
The content after the ``=`` sign can be wrapped in quotes or not (``myAttribute="${...}"`` or  ``myAttribute=${...}``) and it will be handled correctly either way. This applies to all bindings, not just attributes and properties.
:::

## Boolean Attributes

Boolean attributes can indicate true/false values depending on the presence of the attribute or not. For example, the ``disabled`` attribute of a ``<button>`` element will disable the button if it is present, and enable it if not.

You can bind them like any other attribute, but a special shorthand syntax is available for boolean attributes by using the ``?`` prefix:

```ts
html`<button ?disabled=${this.disabled}>Can I click?</button>`;
```

The ``?`` prefix will toggle the attribute depending on the value of the expression, if the value is ``truthy`` the attribute will be added, if it is ``falsy`` it will be removed.

## Aria and Dataset special cases

If you bind an attribute that has the name ``aria`` such as ``aria=${this.ariaObject}`` the aria attributes present in the object will be added to the element.

For the dataset you can bind to the propery ``dataset`` like this: ``.dataset=${this.datasetObject}`` and the ``node.dataset`` property will be updated with the values of the object.

This is an example of how to bind to the ``aria`` and ``dataset``:

```ts
html`<div aria=${{labelledBy: 'id', role: 'button'}}></div>`;
//=> <div aria-labelledby="id" role="button"></div>

html`<div .dataset=${{key: 'value', otherKey: 'otherValue'}} />`;
//=> <div data-key="value" data-other-key="otherValue"></div>
```

## Using JavaScript Expressions

All JavaScript expressions are supported inside of the template literals, you can use any valid JavaScript expression inside of the interpolation, for example:

```ts
render() {
  return html`
    <div>${this.number + 1}</div>
    <div>${this.ok ? 'Yes' : 'No'}</div>
    <p>${this.textString.split('').reverse().join('')}</p>

    <div class=${'classPrefix-' + this.divClass}></div>
  `;
}
```
This is a very powerful feature that allows you to create complex templates without the need to create a lot of methods in your component class.

## Sparse Attribute Interpolation

You cannot use sparse attribute interpolations, always use one interpolation to define each attribute, for example:

```ts
html`<div style="top:${x};left${y}"></div>`; // WRONG

html`<div style=${`top:${x};left${y}`}></div>`; // CORRECT
```
If you try to use sparse attribute interpolations, the parser will throw a ``Bad Template`` error.

## Event Listeners

You can bind event listeners to any component using the ``@`` prefix or the ``on`` attribute:

```ts
html`<button @click=${this.handleClick}>Click Me</button>`;

html`<button onclick=${this.handleClick}>Click Me</button>`;
```

The event listener will be added to the component and will be removed when the component is removed from the DOM.

We'll see more about event listeners and how to use them in the [Event Handling](./event-handling.md) section.

## Self-Closing Tags

It is possible to use self-closing tags for any element (as long as you don't need to add children to it):

```typescript 
html`<app-counter />`; // Will render <app-counter></app-counter>
html`<app-counter .prop=${this.prop} />`;
html`<a href="example.com"/>`; // Will render <a href="example.com"></a>
```