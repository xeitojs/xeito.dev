# Global properties

As we'll see later, Xeito provides an easy way to extend the framework and provide utilities to the components through the use of Plugins.
Plugins (among other things) can provide global properties that can be accessed from any component, and that's what we'll see in this section.

## The `@Global()` decorator

The `@Global()` decorator can be used inside a component to retrieve a global property that has been previously registered by a plugin.

```typescript
// my-component.ts
@Global() myGlobalProperty: any;
```
The `@Global()` decorator works in a similar way to the `@Inject()` decorator (As we saw in the __services section__ of the [Introduction](/guide/introduction.html#services))
That means that the property to retrieve from the global properties must have the same name as the property we're decorating, unless we specify a different name
by passing it as a parameter to the decorator.

```typescript
@Global() myGlobalProperty: any; 
//=> Will retrieve the global property named 'myGlobalProperty'

@Global('myGlobalProperty') differentNameProperty: any;
//=> Will retrieve the global property named 'myGlobalProperty' too
```

Global properties can contain any kind of data that the Plugin wants to provide, including primitive types, objects, arrays, [stores](../stores/what-is-a-store.md)... etc.

A good example of this is the Router Plugin, which provides a global property named `router` which is an object with differnt properties and methods that can be used to navigate through the application.

```typescript
@Global() router: Router;

goToPage1() {
  this.router.push('/page1');
}
```