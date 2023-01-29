# What is a Store?

As we've seen in the [State](../components/state.md) and [Props](../components/props.md) section, Xeito allows you to easily manage
the state of your components in a way that your template will react to changes in the state.
Nonetheless, there are times when some part of your application state doesn't belong to a single component or inside of one.

For those cases, Xeito provides _stores_. A store is a simple way to create reactive data that can be shared across your application.

Some examples of when you might want to use a store:

- Sharing data between a service and a component.
- Sharing data between components.
- Keeping track of events that happen in your application.
- Sharing reactive data between your xeito application and native js modules.

Xeito provides three types of stores: `WriteStore`, `ReadStore` and `DerivedStore`, each one with a different purpose.

We'll see each one of them in the following sections.