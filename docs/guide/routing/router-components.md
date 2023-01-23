# Router Components

Xeito Router provides two components that can be used to handle your routes:

- `<router-slot>`: This component is used to render the component of the current route.
- `<router-link>`: This component is used to create links to other routes from the template.

## The `<router-slot>` Component

The router slot is the basic building block of the router. It is used to render the components based on the current route, including the nested routes.
You just need to add the `<router-slot>` component to your template, and it will render the component of the current route.

```typescript
import { Component, XeitoComponent, html } from 'xeito';

@Component({
  selector: 'app-root'
})
export class AppComponent extends XeitoComponent {
  
  render() {
    return html`
      <router-slot/>
    `;
  }
}
```

## The `<router-link>` Component

The router link is used to create links to other routes from the template.
You just need to add the `<router-link>` component to your template, and it will render a link to the specified route.

```typescript
import { Component, XeitoComponent, html } from 'xeito';

@Component({
  selector: 'app-root'
})
export class AppComponent extends XeitoComponent {
  
  render() {
    return html`
      <router-link to="/about">About</router-link>
    `;
  }
}
```

The `to` property of the `<router-link>` component should be a string with the path of the route to link to.
The router link also accepts a `state` property that can be used to pass data to the route through the 
[`state` property](https://developer.mozilla.org/en-US/docs/Web/API/History/state) of the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History).

```typescript
import { Component, XeitoComponent, html } from 'xeito';

@Component({
  selector: 'app-root'
})
export class AppComponent extends XeitoComponent {

  private customState = {
    message: 'Hello World!'
  }

  render() {
    return html`
      <router-link to="/about" .state=${this.customState}>About</router-link>
    `;
  }
}
```