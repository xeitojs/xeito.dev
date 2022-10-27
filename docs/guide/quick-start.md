
# Quick Start

## Creating a Xeito application

::: tip PREREQUISITES
  - Familiarity with the command line
  - Basic Typescript and JSX knowledge
:::

In this section we'll create a basic Xeito application on your local machine.
The created project will be using the Xeito Command Line tool, which handles most of the 
complexity and project configuration.

Make sure to have an updated version of [Node.js](https://nodejs.org/) installed, then run the following command
in your command line (without the ``>`` sign):

``` cmd
> npm install -g @xeito/cli
```

This command will install the Xeito command line and make it available globally for further use.
We now need to use it to create a new Xeito application by choosing a folder and running:

```cmd
> xeito new
```

This will prompt you with the project scaffolding tool. You will be asked for a the project's name and a template to use.
For the purposes of this tutorial, let's choose the blank template:

```cmd
> xeito new
? Project name: <your-project-name>
? Select a template (use arrow keys)
  > blank
    services-example
```

Once the project is created, follow the instructions to install the dependencies and start the dev server:

```cmd
> cd <your-project-name>
> npm install
> npm start
```

Now you should have your first Xeito project up and running!
Here are some additional tips:

- The recommended IDE is [Visual Studio Code](https://code.visualstudio.com/) and the [Sass extension](https://marketplace.visualstudio.com/items?itemName=Syler.sass-indented).
- Check the [Typescript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) to get familiar with the syntax if you're not already.

## Next steps

If you skipped the [Introduction](/guide/introduction) section, we recommend you to read it before continuing with the rest of the documentation.