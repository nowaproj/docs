---
title: Store data in variables
description: Create variables on a screen or component, choose a type and a starting value, show them in widgets, and change them from logic.
sidebar_label: Variables
keywords: [variable, state, Variables panel, default value, type, String, int, bool, list, Set, refresh, setState, local variable, Create Variable]
---

A variable is a named value that a screen or component remembers while it's open: a counter, a typed name, a list of products, a loading flag. Widgets can show it, and your logic can change it.

## Open the Variables panel

The **Variables** panel lists what the selected screen or component keeps: **Params** (values passed in from outside), **Variables** (values it remembers) and **Functions** (reusable logic).

1. Select a screen or component (click its title on the board), or select any widget inside it.
2. Click **Variables** at the top right, above **Details**. The panel starts collapsed.

The panel shows the screen's name, then the three sections. Hover a section title to reveal its **+** button. With nothing selected, the panel shows **Globals** instead: see [Share data across your app](./global-state.md). The panel is part of the visual editor, so it isn't shown in code mode.

![The Variables tile expanded for HomePage, highlighted: the Params, Variables and Functions sections, with one variable named counter selected. Below it, Details shows its Name, Type (int) and Default Value (0), and a Remove button.](/img/docs/logic/logic-variables-1.png)

## Add a variable

1. Select the screen or component and expand **Variables**.
2. Hover the **Variables** section title and click **+**. A new variable appears, selected and ready to rename. Nowa names the first one `var1`.
3. Type a name and press <kbd>Enter</kbd>.
4. In **Details**, choose the **Type** and set the **Default Value**.

The **Default Value** is what the variable holds when the screen opens. The board shows it too, so you can preview your design with real-looking data.

A name can use letters, numbers, `_` and `$`, and it can't start with a number. Nowa shows an error if the name is already taken, is a reserved word, or has characters that aren't allowed.

Adding a variable to a component that had none turns it into a stateful component automatically. You don't have to do anything.

## Choose a type

Click the variable's type icon in the list, or **Type** in **Details**. The **Select type** picker opens with a search box and the basic types:

| Type | Holds |
|---|---|
| `String` | Text |
| `int` | Whole numbers |
| `double` | Numbers with decimals |
| `bool` | True or false |
| `Color` | A color |
| `Widget` | A piece of UI |

- Click **show more...** to see more types, such as `DateTime` and your own [models](./models.md). Type in the search box to find one by name.
- To store a list, tick **As List** first, then pick the type of the items. A list of text is `String` with **As List** ticked.

Variables you create here can be empty. Give them a **Default Value** so your widgets always have something to show. For a list, the **Default Value** field shows the number of items. Change the number or click **+** to add one, drag an item to reorder it, and click **Load More** to see items past the first ten.

If you change the type, Nowa keeps the default value when it still fits and replaces it with a fresh default when it doesn't.

## Show a variable in a widget

1. Select the widget and find the property in **Details**, for example the text of a text widget.
2. Click the property's label. The **Link** menu opens.
3. Under **LOCALS**, click your variable. The label now shows the variable's name, and the widget shows its value.

To mix a variable into text, type `$` in the text field and pick the variable. A text such as `Hello ${name}` shows "Hello" followed by the value of `name`. To show a number as text, link the number, click the **+** after it and pick `toString`. The [expressions page](./expressions.md) covers the Link menu in full.

You can also start from the widget. Click the property's label and choose **Create Variable...**. Nowa creates a variable of the right type, links it, and starts it with the property's current value when that is a fixed value.

## Change a variable from logic

A variable only changes when your logic changes it. Here's how to set one when a button is pressed.

1. Open the logic. For a button, click **Edit** next to **On Pressed** in **Details**. Circuit opens: see [Respond to taps and other events](./events.md).
2. Hover the dot under the top node until it becomes **+**, then click it. The **All nodes for this circuit** menu opens.
3. Open **LOCALS** and click your variable. A node is added and selected.
4. In **Details**, click the button named **Set** plus your variable's name (for example **Set counter**). Then set **Value**: type one, or click the label to link a variable or an expression.
5. Add one more node: **LOCALS** → **refresh**. The screen redraws, and every widget linked to the variable shows the new value.

Without **refresh**, the value changes but the screen keeps showing the old one. Screen and component variables don't redraw on their own.

{/* CAPTURE: id=logic-variables-2 | state: playground starter, a Button's On Pressed open in Circuit, a variable node with the Set button used and a refresh node below it | show: the Circuit panel with the two nodes and Details showing the Set button and Value field | crop: Circuit panel and Details */}

Any node that returns a value can also write its result into a variable. Select the node, set **Store result** to **Pick Variable**, and choose the variable.

## Use a variable inside one function only

A local variable lives only while a function runs. It's useful for holding a value between two steps.

- In Circuit, click **Create Local Variable** in the **All nodes for this circuit** menu. In **Details**, set its **Name**, **Type** and **Is Final**.
- Or set **Store result** to **New Variable** on a node that returns a value.

Later nodes find local variables under **LOCALS**. See [Build logic in Circuit](./circuit.md).

## Rename, retype or remove a variable

- **Rename**: double-click the variable in the list, type the new name and press <kbd>Enter</kbd>. Or edit **Name** in **Details**. Nowa updates everything that uses it.
- **Change the type**: click the type icon next to the variable, or use **Type** in **Details**.
- **Remove**: right-click the variable and choose **Remove**, or select it and click **Remove** at the bottom of **Details**. If something uses the variable, Nowa lists those places in a dialog that says the variable "is in use". Click **Remove** to go ahead or **Cancel** to keep it.

:::tip Or ask Nowa AI
Try: "Add a counter to the Home screen that goes up by one each time the button is pressed." See [How Nowa AI works](../ai/index.md).
:::

## Next steps

- [Pass data with parameters](./parameters.md) to send values into a screen or component.
- [Share data across your app](./global-state.md) when several screens need the same value.
- [Data models](./models.md) to group related values into one type.
- [Create functions](./functions.md) to reuse logic.
