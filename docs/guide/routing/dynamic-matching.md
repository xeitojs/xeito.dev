# Dynamic Matching

We'll often need to map routes with a pattern to the same component, but with different parameters. For example, we may want to create a route for a user profile page, where the user id is dynamic.
We can do this by using the `:param` syntax in the path of the route to specify a dynamic segment.

```typescript
{
  path: '/user/:id',
  component: UserProfileComponent
}
```
This way, URLs like `/user/1` and `/user/2` will both match the same route, but with different values for the `id` parameter.

A param is denoted by a colon (`:`) followed by the name of the parameter. The name of the parameter can be anything, but it must be unique within the route. 

## Accessing Route Parameters

The value of all the parameters will be available in the `router` global property (see [Global Properties](../components/global)) by accessing the `routeParams` property.
The `routeParams` property is a `MixedStore` object, so you can access the value either by subscribing to it or by accesing the `value` property.


```typescript
// Current route: /user/123
import { Component, XeitoComponent, Global } from '@xeito/core';

@Component({
  selector: 'app-root'
})
export class AppComponent extends XeitoComponent {

  @Global() router: XeitoRouter;

  onDidMount() {
    const params: RouteParams = this.router.routeParams.value;
    // params = { id: '123' }
    console.log(params.id); // 123

    this.router.routeParams().subscribe(params => {
      console.log(params.id); // 123
      // We will be notified every time the route params change
      // This can result in unexpected behavior and multiple nulls values
      // being passed to the callback as the routes are matched.
      // Accessing the value property is recommended.
    });
  }
}
```

If you want to extract them from the URL manually, you can access the current `Location` object by using the `location` store available in the `router` global property.

```typescript
// Current route: /user/123
import { Component, XeitoComponent, Global } from '@xeito/core';

@Component({
  selector: 'app-root'
})
export class AppComponent extends XeitoComponent {

  @Global() router: XeitoRouter;

  onDidMount() {
    const location = this.router.location.value;
    // location = { pathname: '/user/123', search: '', hash: '' }
    console.log(location.pathname); // /user/123
  }
}
```

The `Location` object has the following structure:

```typescript
interface Location {
  pathname: string;
  search: string;
  hash: string;
  state?: unknown;
  key?: string;
}
```