# Styling Components

Xeito is built on top of the [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) standard, which allows you to create custom HTML elements that encapsulate your own functionality on an HTML page. This is a powerful feature that allows you to build reusable components that can be used to create rich, interactive web applications.
However, styling web components is still a bit tricky, since the only way to scope your styles is to use Shadow DOM, which can introduce some undesired side effects, like isolating your styles from the rest of the page completely (which can be useful in some cases, but not in others) or having to use a special syntax to style your components.

By default, Xeito components don't use Shadow DOM, which means that you can style them with your regular CSS/SCSS files. However, if you want to use Shadow DOM, you can do so by adding the `shadow: true` option to your component's decorator (be aware that this will isolate this component's styles from the rest of the page).

## Styling Components with Regular CSS/SCSS

This is the default behavior of Xeito, and it's the most straightforward way to style your components.
Xeito relies on your bundler to handle the scoping of your styles, so you can use any CSS preprocessor you want (as long as it's supported by your bundler) 
and import your CSS files into your components.

Since your components behave like regular HTML elements, you can use any CSS library or framework you want to style them such as [Bootstrap](https://getbootstrap.com/) or [Tailwind](https://tailwindcss.com/).

If you created your project with the Xeito CLI, it will be automatically configured with [Vite](https://vitejs.dev/) and the SCSS preprocessor installed, to allow you to import CSS/SCSS files into your components. If you're using a different bundler, you'll need to configure it to allow you to import CSS files. Vite also supports [CSS modules](https://vitejs.dev/guide/features.html#css-modules), which are a great way to avoid class name collisions, so we'll use them to style our component.

Let's create a component and style it with a CSS file called `my-component.module.css`.

```typescript
import { Component, XeitoComponent, html } from '@xeito/core';
import classes from './my-component.module.css';

@Component({
  selector: 'my-component',
  shadow: false // This is the default value, so you don't need to specify it
})
export class MyComponent extends XeitoComponent {

  render() {
    return html`
      <button class=${classes.button}>Click me!</button>
    `;
  }
}
```
As you can see, we're using an interpolated expression to add the CSS class to the button. This is because we're using CSS modules, which will generate a unique class name for each CSS class. We can't use the class name directly, because it will change every time we build our project.

If you're not using CSS modules (or you're using a tool like Tailwind), you can just use the class name directly.

```typescript
import { Component, XeitoComponent, html } from '@xeito/core';
import './my-component.css';

@Component({
  selector: 'my-component'
})
export class MyComponent extends XeitoComponent {

  render() {
    return html`
      <button class="button">Click me!</button>
    `;
  }
}
```

## Styling Components with Shadow DOM

When you create a component with Shadow DOM, the component's styles are isolated from the rest of the page. This means that you can use generic class names, such as `.button`, without worrying about them conflicting with the rest of the page.
Styling web components with Shadow DOM is a rather tricky endeavor, because you need to take into account the Shadow DOM's [encapsulation](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM#Encapsulation). This means that you can't just use a CSS selector from a css file to style a component's internal elements.

There are some ways around it, you can either place a style tag inside your component's template, make use of constructable stylesheets, or use a CSS-in-TS library such as [Vanilla Extract](https://vanilla-extract.style/).

### Using a style tag inside the component's template

This is the simplest way to style a component with Shadow DOM. You can just place a style tag inside your component's template and use regular CSS selectors to style your component's internal elements.

```typescript
import { Component, XeitoComponent, html } from '@xeito/core';

@Component({
  selector: 'my-component',
  shadow: true
})
export class MyComponent extends XeitoComponent {

  render() {
    return html`
      <style>
        button {
          background-color: blue;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          border: none;
          cursor: pointer;
        }
      </style>
      <button>Click me!</button>
    `;
  }
}
```

### Using constructable stylesheets

Constructable stylesheets are a new feature that allows you to create stylesheets in JavaScript and attach them to the DOM. This is a great way to style your components with Shadow DOM, since you can use regular CSS selectors to style your component's internal elements.

```typescript
import { Component, XeitoComponent, html } from '@xeito/core';

@Component({
  selector: 'my-component',
  shadow: true
})
export class MyComponent extends XeitoComponent {

  constructor() {
    super();
    const style = new CSSStyleSheet();
    style.replaceSync(`
      button {
        background-color: blue;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        border: none;
        cursor: pointer;
      }
    `);
    this.shadowRoot.adoptedStyleSheets = [style];
  }

  render() {
    return html`
      <button>Click me!</button>
    `;
  }
}
```
Note how we're accessing the component's shadow root and attaching the stylesheet to it.
