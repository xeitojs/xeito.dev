# Programmatic Navigation

Sometimes, the `<router-link>` component is not enough for your needs. For example, you may want to trigger navigation in response to some user event, such as a button click. In these cases, you can use the `router` global property to programmatically trigger navigation.

## Router navigation methods

The `router` global property exposes several navigation methods:

```typescript
{
  push: (path: string, state?: any) => void;
  replace: (path: string, state?: any) => void;
  go: (n: number) => void;
  back: () => void;
  forward: () => void;
  createHref: (path: string) => string;
}
```

As we've seen in the previous sections, you can access the router global property in any component by using the `@Global()` decorator.

```typescript
import { Component, XeitoComponent, Global } from '@xeito/core';
import { XeitoRouter } from '@xeito/router';

@Component({
  selector: 'app'
})
export class App extends XeitoComponent {

  @Global() router: XeitoRouter;

  public navigateToHome(): void {
    this.router.push('/');
  }
}
```

## .push()

The `.push()` method is used to navigate to a new location. The current route will be pushed onto the history stack, meaning the user will be able to navigate back to it by pressing the back button.

```typescript
router.push('/home');
```

The `.push()` method accepts an optional second argument, which is the state object to be persisted to the history entry. This is useful when you want to save some data across navigation.

```typescript
router.push('/home', { someData: 'some data' });
```
This state object will be available in the `history.state` property of the `Location` object.

## .replace()

The `.replace()` method is used to navigate to a new location. The current route will be replaced, meaning the user won't be able to navigate back to it by pressing the back button.

```typescript
router.replace('/home');
```

In the same way as the push method `.replace()` accepts an optional second argument, which is the state object to be persisted to the history entry. This is useful when you want to save some data across navigation.

```typescript
router.replace('/home', { someData: 'some data' });
```

## .go()

The `.go()` method is used to navigate to a specific location in the history stack. The `n` parameter is the number of entries to move forward (if positive) or backward (if negative).

```typescript
router.go(1); // Navigate forward 1 entry
router.go(-1); // Navigate back 1 entry
```

## .back()

The `.back()` method is used to navigate to the previous location in the history stack.

```typescript
router.back();
```

## .forward()

The `.forward()` method is used to navigate to the next location in the history stack.

```typescript
router.forward();
```

## .createHref()

The `.createHref()` method is used to create a URL path from a relative path. This is useful when you want to create a link to a different route, 
because it will take into account the different configurations of the router (like using hash mode or not).

```typescript
router.createHref('/home');
```