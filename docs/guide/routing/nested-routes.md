# Nested Routes

It isn't uncommon to have a complex application with nested navigation multiple levels deep. To achieve that, is common to that segments 
of the URL correspond to a certain structure of nested components, for example:

```
/user/bob/profile                     /user/alice/posts
+------------------+                  +-----------------+
| User             |                  | User            |
| +--------------+ |                  | +-------------+ |
| | Profile      | |  +------------>  | | Posts       | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```

Xeito Router provides a way to express these relationships by using nested routes in the router configuration.

## Nested Routes Configuration

To define a nested route, you need to add a `children` property to the route configuration object. This property is an array of
routes that will be nested under a parent component/route:

```typescript
{
  path: '/user/:id',
  component: UserComponent,
  children: [
    {
      path: '/profile',
      component: UserProfileComponent
    },
    {
      path: '/posts',
      component: UserPostsComponent
    }
  ]
}
```
The `children` property can be nested as deep as you want, and the router will match the URL segments to the nested routes.

We then need to provide a place to render the nested components. To do that, we only need to add a `<router-slot>` component inside the parent component
of the children routes. In the previous example, we have a parent component called `UserComponent` and two children components inside. Therefore, we need to add
a `<router-slot>` inside the `UserComponent` template:

```typescript
import { Component, XeitoComponent, html } from '@xeito/core';
import { RouterSlot } from '@xeito/router';

@Component({
  selector: 'app-user'
})
export class UserComponent extends XeitoComponent {

  render() {
    return html`
      <h1>User</h1>
      <router-slot />
    `;
  }
}
```
Now Xeito Router will render the nested components inside the `<router-slot>` whenever the URL matches the nested route.

For example, the route `/user/bob/profile` will render the `UserProfileComponent` inside the `<router-slot>` of the `UserComponent` template 
creating the following DOM structure:

```html
<app-user>
  <h1>User</h1>
  <router-slot>
    <app-user-profile>
      <h1>User Profile</h1>
    </app-user-profile>
  </router-slot>
</app-user>
```
