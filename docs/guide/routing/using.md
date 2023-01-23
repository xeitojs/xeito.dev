# Using the Router

Xeito has a built-in routing solution that allows you to easily add routes to your application.
The default router is deeply integrated with Xeito's core and makes it easy to create single page applications.

Main features include:

- Nested routes
- Route parameters (e.g. /user/:id)
- Wildcard routes (e.g. /user/(.*))
- Modular router configuration
- Link generation and component
- HTML5 history mode, hash mode, and in-memory history

## Getting Started

If your application has been created with the Xeito CLI, you will already have the router installed and configured for you.

If you need to install the router manually, you can do so following the next steps:

1. Install the router package:

```bash
npm install @xeito/router
```

2. Install the router plugin in your Xeito application:

```typescript
import { Xeito } from '@xeito/core';
import { XeitoRouterPlugin } from '@xeito/router';

const app = new Xeito(AppComponent);
app.usePlugin(XeitoRouterPlugin, { routes: [] });
app.bootstrap('#app');
```

As you can see, the router is a plugin that can be used by just calling the `usePlugin` method of the `Xeito` instance.
The plugin accepts a configuration object with the following properties:

```typescript
export interface RouterOptions {
  // The routes to be used by the router
  routes: Route[];
  // The strategy to be used by the router
  strategy?: 'hash' | 'browser' | 'memory';
}
```

The `routes` property is an array of `Route` objects that define the routes of your application.

## Defining Routes

The router uses a tree structure to define the routes of your application.
Each route can have the following properties:

```typescript
export interface Route {
  path: string; // The path of the route
  component: any; // The component for this route
  children?: Route[]; // The child routes of the current route
  redirectTo?: string; // The path to redirect to when the route is matched
  guards?: any[]; // The guards to be executed when the route is matched
}
```

The `path` property is the path of the route, and it can contain route parameters and wildcards.
Xeito uses the [path-to-regexp](https://github.com/pillarjs/path-to-regexp) library to parse the paths, so you can use the same syntax.
For example, the following route will match the path `/user/123`:

```typescript
{
  path: '/user/:id',
  component: UserComponent
}
```
You can also use wildcards to match any path:

```typescript
{
  path: '(.*)', // Matches any path
  component: UserComponent
}
```
The wildcard route must be the last route in a route tree, otherwise the routes below it will never be matched.
This can be useful to create 404 pages or redirect routes:

```typescript
const routes: Route[] = [
  {
    path: '/user/:id',
    component: UserComponent
  },
  {
    path: '/404',
    component: NotFoundComponent
  }
  {
    path: '(.*)', // Matches any path (if none of the above routes match)
    redirectTo: '/404' // Redirects to the 404 page
  }
];
```

## Accesing the Router from a Component

The Xeito Router exposes a `router` global property that can be used to access the different features of the router from any component.
You can access the global router property by using the `@Global` decorator (see [Global Properties](../components/global)):

```typescript
import { Component, XeitoComponent, Global } from '@xeito/core';
import type { XeitoRouter } from '@xeito/router';

@Component({
  selector: 'app-root'
})
export class AppComponent extends XeitoComponent {

  @Global() router: XeitoRouter;

  onWillMount() {
    this.router.push('/user/123');
  }

}
```

## Structure of the Router Property

The `router` property has the following structure:

```typescript
interface XeitoRouter {
  onRouteUpdate: (callback: (update: Update) => void) => Function;
  getRouteParams: () => RouteParams;
  getLocation: () => Location;
  push: (path: string, state?: any) => void;
  replace: (path: string, state?: any) => void;
  go: (n: number) => void;
  back: () => void;
  forward: () => void;
  createHref: (path: string) => string;
}
```