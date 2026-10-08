---
title: Share data across your app
description: Create a global state that holds data and logic any screen can read and change, and see how widgets update when it changes.
sidebar_label: Global state
keywords: [global state, AppState, state management, provider, ChangeNotifier, notifyListeners, Globals, Notifier Builder, share data, cart, changeTheme, dark mode, Create global state, Pick global state, Detach global state, Attach]
---

A global state is one place to keep data and logic that your whole app shares: a shopping cart, the signed-in user, a setting. Any screen can read it or change it, and the widgets that show it update on their own.

Under the hood, a global state is a Flutter `ChangeNotifier` that Nowa provides to your whole app.

Start local: move a value to global state only when a second screen needs it. [Pick where each value lives](../guides/data-and-state-tips.md#pick-where-each-value-lives) compares your options.

## Create a global state

1. Open **Files** in the sidebar. Next to the `lib` folder, click **+** (**Add to library**), then **New Global State...**. Inside `lib`, the **Add** button opens the same menu.
2. Type a name, such as `CartState`. Nowa fills in the **Class name** and the **Path** (the file name) for you. Click either one to change it.
3. Click **Submit**. Nowa creates the file in `lib/globals` and attaches it to your app.

You can also open the **Variables** panel with nothing selected, find **Globals** and click **Create global state**. That file goes in `lib`.

New projects already include a global state named **AppState** (`lib/globals/app_state.dart`). It holds the app's theme and a `changeTheme` function: see [Switch themes while the app runs](../design/theme-styles.md#switch-themes-while-the-app-runs).

## Add variables and functions

1. In **Files**, double-click the global state's file. A single click only shows a preview.
2. Click the class name, such as `CartState`, in the list on the left. Its **Variables** and **Functions** appear in the middle.
3. Hover **Variables** and click **+**. Rename the new variable, then set its **Type** and **Default Value** on the right. See [Store data in variables](./variables.md). Keep **Is Final** off for a variable your functions will change.
4. Hover **Functions** and click **+**. Rename the new function, for example `addToCart`. Circuit opens on the right: see [Build logic in Circuit](./circuit.md).
5. Click the top node, hover **Params** and click **+** to add an input such as `product`. Click the new param to set its **Name** and **Type**.
6. Add the logic. Click the dot under a node and open **LOCALS**. Pick the variable, click **+** after it in **Details** and choose `add`. Set the input to your param.
7. Add one more node: **LOCALS** → `notifyListeners`.

`notifyListeners` tells every widget that reads the global state to update. Call it at the end of each function that changes a variable.

![The global state editor in three columns: the class list with View Code and CartState, the Variables (items) and Functions (addToCart) column, and Circuit showing the addToCart function with its product param, an add node and a notifyListeners node (highlighted) at the end.](/img/docs/logic/logic-global-state-1.png)

## Attach or detach a global state

Attached means Nowa has added the global state to your app, so screens can use it. Only attached global states appear under **GLOBALS**.

- A global state you create is attached automatically.
- If a global state's file says "This global state is not attached to the app.", click **Attach**.
- In the **Variables** panel with nothing selected, click **Pick global state** to attach one that exists in `lib`. The list says "No global states found" when there is nothing left to attach.
- In the same panel, hover a global state's name and click the three-dots button. **Detach global state** removes it from the app, and the file stays in your project. **Open in new tab** opens the file.

The **Globals** list shows each attached global state by name. Under a name it lists only final variables, so open the file in **Files** to see all of its variables and functions.

## Use a global state

To show a value in a widget:

1. Select the widget and click the label of the property, such as the list of a List View.
2. Open **GLOBALS**, click the global state, then click the variable.

To run a function from logic:

1. Click the dot under a node in Circuit and open **GLOBALS**. Click the global state.
2. In **Details**, click **+** and choose the function, such as `addToCart`. Fill in its inputs, for example by clicking the label and choosing a param from **LOCALS**.

**GLOBALS** lists attached global states only inside screens and components. When you work inside a global state, its own variables and functions are under **LOCALS**.

Widgets that show a global state's value update when the state calls `notifyListeners`. Screen and component variables work differently: they need a **refresh** node, as in [Store data in variables](./variables.md#change-a-variable-from-logic).

## Rebuild only part of a screen

The **Notifier Builder** wrapper rebuilds only the widget inside it when a notifier changes.

1. Select the widget and click **Add Wrapper** in **Details**. Choose **Notifier Builder**.
2. Pick the **Notifier**. The list holds the global states you attached and other notifiers on the screen.

## Switch themes while the app runs

**AppState** holds the app's theme and a `changeTheme` function. Call it from a button's **On Pressed** to switch the running app between themes, for example with a dark mode button: the steps are in [Switch themes while the app runs](../design/theme-styles.md#switch-themes-while-the-app-runs).

:::tip Or ask Nowa AI
Try: "Add a shopping cart that all screens can use, with a button on each product to add it." See [How Nowa AI works](../ai/index.md).
:::

## Next steps

- [Store data in variables](./variables.md) for values that belong to one screen.
- [Data models](./models.md) to describe what the cart holds, such as a `Product`.
- [Respond to taps and other events](./events.md) to call your functions from buttons.
