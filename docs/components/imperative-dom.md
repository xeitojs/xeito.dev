# Imperative DOM

## Introduction

Xeito is designed to be a framework that allows you to create components in a declarative way, using the HTML template syntax. However, sometimes you need to do things imperatively, for example, when you need to access the DOM directly, or for interacting with the browser's APIs or other libraries.

For those cases Xeito provides a couple of ways to interact with the DOM, depending on what you're trying to achieve.

## The `ref` property

The `ref` property can be added to any element in the template referencing an object. When the element is rendered, the passed object's `current` property will be set to the element's DOM node.

```typescript
// my-component.ts
myRef = { current: null };

render() {
  return html`
    <div ref=${this.myRef}></div>
  `;
}
```
You have to be careful when using the `ref` property, since it will be set after the element being referenced is rendered, the current property won't be available until the element has been rendered. To get around this, you can use the lifecycle hooks to access the element when it's available:

```typescript
// my-component.ts
myRef = { current: null };
onDidMount() {
  console.log(this.myRef.current); // Will log the element's DOM node
}

render() {
  return html`
    <div ref=${this.myRef}></div>
  `;
}
```

## The `@Ref()` decorator

You can always use a simple object to store the element's reference, but Xeito also provides a decorator that can be used for that purpose to make it a bit 
more convenient while improving the readability of the code.

```typescript
// my-component.ts
@Ref() myRef: ElementRef;

onDidMount() {
  console.log(this.myRef.current); // Will log the element's DOM node
}

render() {
  return html`
    <div ref=${this.myRef}></div>
  `;
}
```

## Accesing the component's DOM

Since all Xeito components are built on top of the `HTMLElement` class, you can always access the component's DOM node by using the `this` keyword:

```typescript
// my-component.ts
onDidMount() {
  console.log(this); // Will log the component's DOM node
}
```
You can use this to access the component's DOM content from anywhere in the component, including the lifecycle hooks.
```typescript
// my-component.ts
onDidMount() {
  console.log(this.innerHTML);  // Will log the component's inner HTML
  console.log(this.children);   // Will log the component's children
}
```
In the same way, all other native methods are available to be used in the component.
```typescript
// my-component.ts
onDidMount() {
  // Accessing the DOM after the component is mounted
  const container = this.querySelector('.custom-container') 
  //=> Will return the first element with the class 'custom-container'
  container.classList.add('custom-class'); 
  //=> Will add the class 'custom-class' to the element
  container.innerHTML = 'Hello Xeito!'; 
  //=> Will change the element's inner HTML
}

render() {
  return html`
    <div class="custom-container">Hello world!</div>
  `;
}
```