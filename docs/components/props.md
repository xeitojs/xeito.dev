# Component props

## Passing data to components

When composing multiple components together, it's often useful to pass data from one component to another.
This is done by passing properties and attributes to the component in the html template.

As we've seen in the [Template Syntax](../essentials/template-syntax.md) section, attributes and properties
are automatically assigned, but they behave differently, while attributes can only be strings, you can pass any
type of value to a property.

```html
// Assigning an attribute
<my-component myAttribute=${this.value}></my-component>

// Assigning a property
<my-component .myProperty=${this.value}></my-component>
```

## The `@Prop()` decorator

To be able to receive these properties and attributes in the component, we need to declare a class property 
with the `@Prop()` decorator. The name of the decorated class property will be the name of the property or attribute that's being listened to.

```typescript
// my-component.ts
@Prop() currentCount: string;

render() {
  return html`
    <div>
      <h1>Counter</h1>
      <p>Count: ${this.currentCount}</p>
    </div>
  `;
}
```

The properties decorated with the `@Prop()` decorator will automatically trigger a re-render when they are changed by the parent component.

## Imperative attribute access

Since Xeito Components are built by extending HTMLElement, you can access the attributes of the component in your methods imperatively 
without the need of the `@Prop()` decorator (although it's recommended to use the `@Prop()` decorator for consistency).

```typescript
// my-component.ts
myMethod() {
  const currentCount = this.getAttribute('currentCount');
}
```

::: info Note on reactivity
Even if you can access the attributes with the `getAttribute()` method, if you don't use the `@Prop()` decorator, the property won't be reactive.
This means that if you change the attribute value, the property won't be updated and the component won't be re-rendered.
:::