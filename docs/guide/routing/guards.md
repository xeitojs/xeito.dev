# Router Guards

Router guards are used to protect routes from unauthorized access. For example, you can require users to log in before they can view a particular route or you can prevent them from navigating away from a page that has unsaved changes.

## Implementing a guard

To implement a guard, you need to specify it as part of the route configuration. The following example shows how to implement a guard that checks whether the user is logged in:

```typescript
const routes: Routes = [
  {
    path: '/admin',
    component: AdminComponent,
    guards: [LoggedInGuard]
  }
];
```

The `LoggedInGuard` is simply a function that receives the current pathname and returns a boolean value.

```typescript
const LoggedInGuard = (pathname: string) => {
  const loggedIn = JSON.parse(localStorage.getItem('loggedIn') || 'false');
  if (!loggedIn) {
    return false;
  } else {
    return true;
  }
};
```

## Redirecting to a different route

If a guard returns a string value, the router will take that string as the new pathname and redirect the user to that route.

```typescript
const LoggedInGuard = (pathname: string) => {
  const loggedIn = JSON.parse(localStorage.getItem('loggedIn') || 'false');
  if (!loggedIn) {
    return '/login';
  } else {
    return true;
  }
};
```

## Returning a promise

If a guard returns a promise, the router will wait for the promise to resolve before continuing. If the promise resolves to a string, the router will redirect to that route.
If the promise resolves to a boolean, the router will continue if the value is `true` and redirect to the login page if the value is `false`.

```typescript
const LoggedInGuard = (pathname: string) => {
  return new Promise((resolve, reject) => {
    const loggedIn = JSON.parse(localStorage.getItem('loggedIn') || 'false');
    if (!loggedIn) {
      resolve('/login');
    } else {
      resolve(true);
    }
  });
};
```
