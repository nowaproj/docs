---
sidebar_position: 2
title: Custom code
description: Learn how to use custom code in your project  
---

## How to Use Custom Code in Nowa
With Nowa you can write any custom code that you need for your project without a limitation. This includes
- Custom functions
- Custom widgets
- Custom classes
- Custom expressions

Beside writing new code, you can modify the generated code as well with your changes sync instantly inside Nowa

Let's see how to write custom code:

### Custom Functions

1. Write the function in your IDE or Nowa IDE.
2. The function can exist in a separate Dart file or within an existing one.
3. In **Circuit**, search for the function by name:
   - **Global functions** appear under a new category named after your app.
   - **Functions inside Nowa-generated classes** appear under "Locals."
4. Drag and drop the function node into the flow, passing values to its parameters if needed.

### Custom Widgets

1. Create a **Stateless** or **Stateful** Flutter widget in a separate Dart file.
2. The widget appears in Nowa’s widget picker under **"Components."**
3. Search for it by name (same as the class name) and drag it onto your UI.

### Custom Classes

1. Define a Dart class in a separate or existing file.
2. It automatically becomes available as a **defined type** in Nowa.
3. Use the class when:
   - Defining variable types, function parameters, or return types.
   - Creating object instances in **Circuit** using the "Create" node.
   - Managing objects in lists, passing them between screens, etc.

## Important Notes

- **Annotations:**
  - Use `@CustomFunction` when writing custom code inside a Nowa-generated class to ensure Nowa distinguishes it from generated code.
- **Type Compatibility:**
  - Ensure function parameters and return types use recognizable types (e.g., `String`, `bool`).
  - Inside Nowa, functions are treated as black boxes, but for proper integration in Circuit, types must be recognizable.
- **Preview Limitations:**
  - Nowa offers two ways to preview your app:
    - **Instant preview mode:** Click the play button inside Nowa’s designer (fast but does not execute custom code).
    - **Full build preview:** Run your app on a simulator or publish a development web version.
  - **Custom widgets and functions in preview mode:**
    - **Custom widgets** appear as placeholders in Nowa’s designer but render correctly when built on a simulator.
    - **Custom functions** do not execute in the previewer but print a log message when their node is triggered.
  - **To test custom code, use simulators instead of Nowa’s instant preview.**

:::tip[Testing Custom Code with Cloud projects]

For a cloud-only project, the only way to test your app fully is by [publishing a web version](../../version-cont-deploy/deployment/web-deploy.mdx), which will remain live for 12 hours.

For local projects, you can use simulators to test your full app

Remember: As explained in the previous section, the Nowa Instant App Previewer (clicking "Play" on the board) does not execute custom code. Instead, it replaces any custom widget with a placeholder and logs a message instead of executing custom functions.
:::

:::tip[Syncing local and cloud projects]
You can maintain both a local and a cloud version of the same project by pushing your local repository to GitHub and cloning it to Nowa Cloud via GitHub integration.
:::


## Further Learning

:::tip[Practical guide on using the Hybrid Approach]
Check out this [Medium article](https://medium.com/@nowa.dev/nowas-hybrid-approach-boosting-flutter-productivity-with-visual-code-magic-sync-5d93b234ab9f) for a full practical guide on using hybrid approach.

You will learn:
- Setting up the Hybrid approach
- Real examples of using custom widgets, functions, classes and expressions
- Using simulators on the side with hot reload
- Using Git to commit, discard, etc
- Example on modifying the generated code 
:::


