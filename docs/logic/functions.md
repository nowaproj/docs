---
title: Create functions
description: A function is a named list of steps you build once and run from many places. Add one, give it inputs and a result, run it when a screen opens or closes, and call it from events.
sidebar_label: Functions
keywords: [function, functions, add function, local function, screen function, initState, dispose, lifecycle, override, return type, parameters, async, reuse, call function]
---

A function is a named list of steps that you build once and run from many places: from a button, from another function, or automatically when a screen opens or closes. Think of it as a recipe. It can take ingredients (its parameters), it follows its steps, and it can hand back a dish (its return value).

Functions keep your logic tidy. When two buttons should do the same thing, put the steps in one function and have both run it. If something needs fixing later, you fix it in one place.

## Add a function

1. Select a screen or component and open the **Variables** panel. See [Store data in variables](variables.md).
2. Hover **Functions** and click **+**. If a menu opens, click **Add Function**.
3. A function named `func` appears. Select it, type a name in **Name** in **Details** and press <kbd>Enter</kbd>. A name that says what it does, such as `addToFavorites`, makes your logic easier to read later. Names follow the same rules as variable names. If the list opens a name field, don't type there: the letters t, r, v and f can trigger board shortcuts instead of typing.
4. In **Details**, choose a **Return Type** if the function gives something back, such as `double` for a price. Leave it as `void` (nothing) if it only does things.
5. Click **Edit**. [Circuit](circuit.md) opens, ready for your steps.

With a function selected, **Details** shows **Name**, **Return Type**, **Edit** and **Remove**.

![The Variables tile for HomePage with the menu opened from the plus next to Functions (highlighted): Add Function, InitState Function and Dispose Function.](/img/docs/logic/logic-functions-1.png)

## Add parameters and a return value

A parameter is a value the function receives each time it runs. The return value is what it hands back when it's done. Here's a function that turns Celsius into Fahrenheit, the kind of thing a weather app needs.

1. In Circuit, click the orange node at the top. Hover **Params** and click **+**. A parameter named `param` appears.
2. Click the parameter. Set **Name** to `celsius` and **Type** to `double` (a number with decimals).
3. Set **Return Type** to `double`.
4. Click the dot under the top node and choose **Add Return**.
5. With the Return node selected, click the **Return** label in **Details**, choose **Custom Expression...**, type `celsius * 1.8 + 32` and press <kbd>Enter</kbd>. Click the back arrow to close the dialog.

Nodes in the function find `celsius` under **LOCALS**. See [Expressions and conditions](expressions.md) for more ways to set a value.

## Call a function

1. In Circuit, click the dot where the function should run. This can be in an event's circuit ([Respond to taps and other events](events.md)) or in another function.
2. Find your function under **LOCALS** and click it. A node is added.
3. In **Details**, fill in its parameters: type a value, or click a parameter's label to link one. For the example above, link `celsius` to the temperature you want to convert.
4. If it returns a value, use [Store result](circuit.md#store-result) to keep it for the next steps.

To jump to the function from its node, hover its name at the top of **Details** and click the open icon.

A screen's or component's functions are available only inside that screen or component. To share a function across your app, put it in a global state: [Share data across your app](global-state.md).

## Run logic when a screen opens or closes {#lifecycle}

Screens and components have two built-in moments you can add steps to:

- **InitState Function** runs once when the screen or component opens. Use it to load data, read a saved setting or start a timer.
- **Dispose Function** runs once when it closes for good. Use it to clean up, such as stopping a timer you started, so it doesn't keep running in the background.

1. Hover **Functions** and click **+**. The menu lists **Add Function**, **InitState Function** and **Dispose Function**. The last two leave the menu once you've added them, since each screen or component has one of each.
2. Choose **InitState Function** or **Dispose Function**, select it and click **Edit**.
3. Circuit shows one node named `initState` or `dispose`. It runs the screen's built-in setup or cleanup, so keep it. In **InitState Function**, add your steps below the `initState` node. In **Dispose Function**, add them above the `dispose` node.

The **Return Type** of these two functions is locked. When the steps need inputs or should hand back a result, build them as a function of their own and call it from **InitState Function**, which also keeps the setup easy to read. For a timer you start here and stop in **Dispose Function**, see [Create objects](actions.md#create-objects).

## Wait inside a function

Some steps take time, such as a picker or an internet request. Turn on **await** for such a node (under **Future Options**) so the function waits for the result before moving on. Its **Return Type** then changes to a `Future` (a value that arrives later) by itself, and changes back when no await is left. See [Wait for a result](circuit.md#future-options).

## Rename, change or remove a function

Select the function. Change **Name** or **Return Type** in **Details**. Double-clicking it in the list also starts a rename, but there the letters t, r, v and f can trigger board shortcuts instead of typing. To delete it, click **Remove** in **Details**, or right-click it and choose **Remove**. If something uses the function, Nowa lists those places and asks before it removes it, so nothing breaks without you knowing.

:::tip Or ask Nowa AI
In **Agent** mode, try: "Add a function that converts Celsius to Fahrenheit, and call it when the button is pressed." Open the function in Circuit to see how it was built. See [How Nowa AI works](../ai/index.md).
:::

## Next steps

- [Build logic in Circuit](circuit.md) for every node you can use inside a function.
- [Pass data with parameters](parameters.md) to send values into a screen or component.
- [Share data across your app](global-state.md) for functions every screen can use.
