# Plugins

Plugins are the main way to extend the functionality of Xeito. 
They are used to add new components, pipes, actions, etc. globally, so they can be used in any component.

## Creating a plugin

To create a plugin we'll need to extend the XeitoPlugin class and implement the `install()` method.

```typescript
import { XeitoPlugin } from '@xeito/core';

export class MyPlugin extends XeitoPlugin {
  install() {
    // ...
  }
}
```
The `install()` method will be called during app initialization and it's where we'll add the new components, pipes, etc.
We can receive configuration options there as well, that have to be passed when the plugin is added to the app.

```typescript
install(options: { option1: string, option2: number }) {
  // Do something with the options
}
```

## Registering modules in the app

From the `install()` method we can call different methods to register new components, pipes, etc. in the app.

```typescript
import { XeitoPlugin } from '@xeito/core';
import { MyComponent } from './my-component';
import { MyAction } from './my-action';
import { MyPipe } from './my-pipe';

export class MyPlugin extends XeitoPlugin {
  install() {
    this.registerGlobalProperty('myProperty', { value: 'some value' });
    this.registerGlobalComponent(MyComponent);
    this.registerGlobalAction(MyAction);
    this.registerGlobalPipe(MyPipe);
  }
}
```
The methods we can use are:

- `registerGlobalProperty(selector: string, property: any)`:
  * Registers a global property that can be accessed from any component (using the `@Global()` decorator)
  * Receives the selector of the property and the property itself (can be any type of data)
  
- `registerGlobalComponent(component)`: 
  - Registers a global component that can be used in any component (without the need to import it)
  - Receives the component class.
- `registerGlobalAction(action)`: 
  - Registers a global action that can be used in any component (without the need to import it)
  - Receives the action class (decorated with the `@Action()` decorator)
- `registerGlobalPipe()`: 
  - Registers a global pipe that can be used in any component (without the need to import it)
  - Receives the pipe class (decorated with the `@Pipe()` decorator)

::: tip Plugin Lifecycle
The plugin instance will be kept alive during the app's lifetime, so we can use it to store data that we want like observables that are then
passed down to the components using a global property.
:::

## Adding a plugin to the app

To add a plugin to the app we need to import it and add it to the app's instance with the `usePlugin()` method.
This has to be done __before_ bootstrapping the application.

```typescript
import { XeitoApp } from '@xeito/core';
import { MyComponent } from './my-component';
import { MyPlugin } from './my-plugin';

const app = new XeitoApp(MyComponent);
app.usePlugin(MyPlugin, { option1: 'some value', option2: 123 });
//=> Notice that we can pass configuration options to the plugin here

app.bootstrap('#root'); // We start the application after registering the plugins
```

This plugin system is what the Xeito Router uses to provide the components and properties required for the router to work.