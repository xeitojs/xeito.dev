# Styling Components

Xeito is built on top of the [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components) standard, which allows you to create custom HTML elements that encapsulate your own functionality on an HTML page. This is a powerful feature that allows you to build reusable components that can be used to create rich, interactive web applications. It also allows to isolate the CSS styling of your components, so that they don't interfere with the rest of the page.

Depending on how you're building your components with Xeito (with or without Shadow DOM), you'll be able to style them in different ways.

## Styling Components with Shadow DOM

When you create a component with Shadow DOM, the component's styles are isolated from the rest of the page. This means that you can use generic class names, such as `.button`, without worrying about them conflicting with the rest of the page.
Styling web components with Shadow DOM is a rather tricky endeavor, because you need to take into account the Shadow DOM's [encapsulation](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM#Encapsulation). This means that you can't just use a CSS selector from a css file to style a component's internal elements.

Luckily, Xeito provides a way to style your components with Shadow DOM. You just need to add a static `styles()` method to your component class, and return a tagged template literal with the CSS styles you want to apply to your component.

```typescript
import { Component, XeitoComponent, html, css } from '@xeito/core';

@Component({
  selector: 'my-component',
  shadow: true // This is the default value, so you don't need to specify it
})
export class MyComponent extends XeitoComponent {

  render() {
    return html`
      <button class="button">Click me!</button>
    `;
  }

  static styles() {
    return css`
      .button {
        background-color: red;
        border: none;
        cursor: pointer;
      }
    `;
  }
}
```
The `styles()` method is a static method, so you can't use any of the component's properties or methods inside it. This is because the styles are applied to the component before it's rendered and only parsed once before being reused for all instances of the component.

The `css` tag will automatically turn your CSS string into a [CSSStyleSheet](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet) object, which is then applied to the component's Shadow DOM.

## Styling Components without Shadow DOM

There might be situations where you want to style a component without using Shadow DOM. This is possible, but you need to be careful when doing so, because you might end up styling other elements on the page. It also means that the component won't be able to use the `styles()` method to style itself, but you will be able to just use a regular CSS file to style it.

This can be useful if you want to use global CSS libraries such as [Bootstrap](https://getbootstrap.com/), or if you want to style your components with a CSS framework such as [Tailwind](https://tailwindcss.com/).

If you created your project with the Xeito CLI, it will be automatically configured with [Parcel](https://parceljs.org/) to allow you to import CSS files into your components. If you're using a different bundler, you'll need to configure it to allow you to import CSS files.

Let's create a component without Shadow DOM, and style it with a CSS file called `my-component.module.css`.

> [CSS modules](https://parceljs.org/languages/css/#css-modules) are a great way to avoid class name collisions, so we'll use them to style our component.

```typescript
import { Component, XeitoComponent, html } from '@xeito/core';
import classes from './my-component.module.css';

@Component({
  selector: 'my-component',
  shadow: false // We overwrite the default value to disable Shadow DOM
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
import './my-component.module.css';

@Component({
  selector: 'my-component',
  shadow: false // We overwrite the default value to disable Shadow DOM
})
export class MyComponent extends XeitoComponent {

  render() {
    return html`
      <button class="button">Click me!</button>
    `;
  }
}
```

## Global Styles

If you are using Shadow DOM, it might be useful to have some global styles that are passed to all your components. This can be used for example, to set CSS variables that you can use in your components.

To do so, you have to call the `.useStyleSheet()` method of your Xeito app before you bootstrap it and pass a css tagged template literal with your global styles.

```typescript
import { Xeito } from '@xeito/core';
import { MyComponent } from './my-component';

const app = new Xeito(MyComponent);
app.useStyleSheet(css`
  * {
    font-family: sans-serif;
  }
  :root {
    --primary-color: red;
  }
`);
app.bootstrap();
```
You can call `.useStyleSheet()` multiple times to add multiple stylesheets to your app, these [stylesheets](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet) 
will be passed down to all your components and they will apply it to their Shadow DOM.

## Separating your styles

One easy way to separate your styles is to create a separate `.css.ts` file that exports your styles as a tagged template literal.

```typescript
// my-component.css.ts
import { css } from '@xeito/core';

export const styles = css`
  .button {
    background-color: red;
    border: none;
    cursor: pointer;
  }
`;
```
Then, you can import your styles into your component and use them.

```typescript
// my-component.ts
import { Component, XeitoComponent, html } from '@xeito/core';
import { styles } from './my-component.css.ts';

@Component({
  selector: 'my-component',
  shadow: true
})
export class MyComponent extends XeitoComponent {

  render() {
    return html`
      <button class="button">Click me!</button>
    `;
  }

  static styles() {
    return styles;
  }
}
```
This way, you can keep your styles in a separate file, and you can also use them in other components.

::: tip Importing multiple stylesheets
The `static styles()` method can return an array of stylesheets, so you can import multiple stylesheets into your component.
```typescript
static styles() {
  return [styles1, styles2];
}
```
:::


## Disabling Shadow DOM globally

If you want to disable the Shadow DOM for all your components, you can do so by calling the `.useConfig()` method of your Xeito app before you bootstrap it.

```typescript
import { Xeito } from '@xeito/core';
import { MyComponent } from './my-component';

const app = new Xeito(MyComponent);
app.useConfig({ shadow: false }); // Disable Shadow DOM globally
app.bootstrap();
```
This way, all your components will be rendered without Shadow DOM, and you'll be able to style them with regular CSS files.
You can still opt-in to use Shadow DOM for specific components by setting the `shadow` property to `true` in the `@Component()` decorator.
