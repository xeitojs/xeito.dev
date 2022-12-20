# Creating a Xeito Application

## The application instance

A Xeito application starts by creating a new instance of ``Xeito``:

```ts
import { Xeito } from '@xeito/core';

const app = new Xeito();
```

## The root Component

The ``Xeito()`` consctructor requires a single argument, the root component of your application.
Every app requires a root component, which is the first component to be rendered when the application starts and will contain other components as children.

```ts
import { Xeito } from '@xeito/core';
import { AppComponent } from './app.component';

const app = new Xeito(AppComponent);
```

Many of the examples in this guide only use a single component, but in a real application you will have many components, each one with its own responsibilities.
These components will be organized in a tree-like structure, with the root component at the top and other components as children.
An example component structure of an application might look like this:

```
AppComponent (root component)
├─ LoginPage
│  └─ LoginForm
│  │   ├─ UsernameInput
│  │   └─ PasswordInput
│  └─ LoginButton
└─ Dashboard
   ├─ UserProfile
   └─ UserMessages
```

Later we will how to compose multiple components together to build a complex UI and how to use the Xeito router to navigate between different views, but for now we will start with a simple component and what happens inside of it.

## Bootstrapping the application

The ``Xeito()`` constructor will create a new instance of the application, but it won't start it or render anything on the screen until the ``.bootstrap()`` method is called.
It expects a single argument, which can be either a DOM element or a CSS selector string.

```html
<div id="root"></div>
```

```ts
app.bootstrap('#root'); // or app.bootstrap(document.getElementById('app'));
```

The content of the root component will be rendered inside of the DOM element that was passed to the ``.bootstrap()`` method.

The ``.bootstrap()`` method should always be called after all the app configuration is done, like registering plugins (more on this later).