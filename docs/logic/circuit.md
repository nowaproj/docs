---
title: Build logic in Circuit
description: Circuit is Nowa's visual logic editor. Stack nodes from top to bottom to tell your app what to do, and Nowa writes the Flutter code for you.
sidebar_label: Circuit
keywords: [Circuit, logic, nodes, visual logic, flow, if statement, try, return, store result, await, future, condition, local variable, Hot Fix, intro to circuit]
---

Circuit is where you tell your app what to do. You stack **nodes**, one per step, from top to bottom, and Nowa writes the matching Flutter code as you go.

Every circuit is one function. The orange node at the top is the function itself, and the steps below it run in order. **If** and **Try** nodes split the flow into branches.

{/* CAPTURE: id=logic-circuit-1 | state: playground starter open, Button selected, Circuit open from On Pressed with a Show snackbar node and an If statement added, the If node selected | show: the Circuit panel with the orange top node, the If node with its True and False branches, and the Details panel inside Circuit showing Condition | crop: Circuit panel */}

## Open Circuit

Open Circuit from the logic you want to edit:

- **An event**: in **Details**, click **+** next to an event such as **On Pressed**. Once it has logic, the button reads **Edit**. See [Respond to taps and other events](events.md).
- **A function**: select it in the **Variables** panel and click **Edit** in **Details**. See [Create functions](functions.md).
- **A linked function or computed value**: click the property's label and choose **Open in Circuit**.
- **A widget builder**: click a dialog's **Builder** field and choose **Edit in circuit**.
- **A follow-up to a node**: click **+** next to **onValue** or **onError** under [Future Options](#future-options).

Circuit opens as a floating panel. Drag it by its title bar and close it with **×**. Changes apply as you make them. In a global state or model file, Circuit opens in the file's right-hand column instead ([Share data across your app](global-state.md)).

## Add a node {#add-a-node}

1. Hover the small dot under a node. It grows into a **+**.
2. Click it. The **All nodes for this circuit** menu opens.
3. Type in the search box, or click a category to open it. Click an item. The node appears at that spot and is selected.
4. Set it up in the **Details** panel that opens inside Circuit.

{/* CAPTURE: id=logic-circuit-2 | state: Circuit open for On Pressed, the + under the top node clicked | show: the All nodes for this circuit menu with the search box, the five top items and the first collapsed categories | crop: the menu popup */}

The menu starts with five building blocks:

| Item | What it does |
|---|---|
| **Add Return** | Ends the function and hands back a value if it has one. |
| **Add If statement** | Runs different steps for a true or false condition. |
| **Add Try statement** | Runs steps and switches to a fallback if one fails. |
| **Create Local Variable** | Holds a value while the function runs. |
| **Add Custom Expression** | Adds a step from a formula you type. |

Below them, the items sit in categories. Categories start closed and open on their own while you search.

| Category | What's inside |
|---|---|
| Your project, named after your package | Your own functions and classes. |
| One per library: **DART:CORE**, **MATERIAL**, **SERVICES**, **NOWA_RUNTIME** and more | Ready-made Flutter, Dart and package actions ([More actions](actions.md)). A package you add brings its own. |
| **OPERATORS** | Math, comparison and logic. |
| **LOCALS** | Variables, params and functions of the current screen or component, plus **refresh** ([Store data in variables](variables.md)). |
| **GLOBALS** | **Navigator**, **GoRouter**, **checkPlatform**, **Media Query**, **Show snackbar** and your global states. |
| **SHARED PREFERENCES** | **clear**, **remove key**, **set** and **get**. |
| **GENERAL** | **Create...** and **parse**. |
| **EXPRESSIONS** | **Conditional** and **ifNull**. |

Connected integrations add categories too, such as **FIREBASE**. Click a class, such as `HapticFeedback`, to see its functions.

## Select, move and remove nodes

Click a node to select it, and click empty canvas to deselect. Right-click a node for **Remove**, **Move up** and **Move down**.

| To | Press |
|---|---|
| Select the previous or next node | <kbd>↑</kbd> or <kbd>↓</kbd> |
| Move the selected node up or down | <kbd>Shift</kbd> + <kbd>↑</kbd> or <kbd>↓</kbd> |
| Remove the selected node | <kbd>Backspace</kbd>, or <kbd>Delete</kbd> on Windows and Linux |
| Undo or redo | <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> or <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd> |

A node moves only inside its own branch. Nodes can't be copied and pasted, and removing doesn't work while you're typing in a field. A red error icon on a node means it has a problem. Hover the icon to read it.

## Set up the function node

Click the orange node at the top to edit the function itself.

| Field | What it does |
|---|---|
| **Name** | The function's name. |
| **Return Type** | What the function hands back. Choose `void` for nothing. |
| **Params** | The values the function receives. Hover and click **+** to add one. Click a parameter to change its **Name**, **Type** and **Default Value**, or to **Remove** it. |

Use a parameter in later nodes from **LOCALS**. For an event, **Return Type** is fixed and **Params** shows the values the event gives you, such as `value` for **On Changed**. More in [Create functions](functions.md).

## Keep a node's result {#store-result}

Many nodes give back a value: a calculation, a picked date, an answer from the internet. **Store result** keeps it for later nodes.

1. Select the node.
2. In **Details**, set **Store result**:
   - **New Variable** creates a local variable named `var1` (then `var2`, and so on). Rename it in **Details**.
   - **Pick Variable** writes the result into a variable you already have. Click **Variable** and choose it.
   - **none** keeps nothing.
3. Use the stored value in later nodes from **LOCALS**.

Nodes that give back nothing don't show **Store result**.

## Wait for a result {#future-options}

Some actions finish later: a picker waits for a tap, an internet request waits for a reply. Select such a node and use **Future Options** in **Details**:

- **await** pauses the function until the result arrives. Pair it with **Store result** to keep it. The node gets a small clock badge, and Nowa makes the function async for you.
- **onValue** runs separate logic when the result arrives, without pausing. Click **+** to create it. A new Circuit panel opens for a function that receives `value`.
- **onError** runs logic if the action fails. Clicking **+** next to either one creates both, and the **onError** function starts with a step that prints the error.

With **await** on, only the **await** switch shows.

## Branch with If

An **If** node runs one set of steps when a condition is true and another when it's false.

1. Choose **Add If statement**. Its **Condition** starts as a switch that's on.
2. In **Details**, click the **Condition** label and link it to a true or false value: a variable under **LOCALS**, a comparison under **OPERATORS** such as `greaterThan`, **checkPlatform**, **Custom Expression...** or **Compute...**. See [Expressions and conditions](expressions.md).
3. Click the dot in the **True** branch and in the **False** branch to add what happens in each.

Steps below the If node run afterwards, whichever branch ran. For more than two outcomes, put an If inside a branch or use a **Conditional** expression. There's no "else if" or switch node.

## Handle errors with Try

A **Try** node runs steps and, if one fails (for example, there's no internet during an API request), moves to its **On Error** branch instead of stopping.

1. Choose **Add Try statement**.
2. Add the steps that might fail directly under the Try node.
3. Click the dot in the **On Error** branch and add the fallback, such as [Show snackbar](popups.md) with the error.
4. In **Details**, **Error name** sets the name of the variable that holds the error. It's `error` by default, and you find it under **LOCALS** in the **On Error** branch.

There's one **On Error** branch, and it catches any error.

## Return a value

1. Choose **Add Return** at the end of the function or of a branch.
2. In **Details**, set the **Return** value. It starts with a default for the return type. A function with no return type shows **Returning void**.

Nothing can be added after a Return in the same branch.

## Hold values and write formulas

- **Create Local Variable** adds `var1` (then `var2`, and so on), a variable that lives only while the function runs. In **Details**, click **Expression:** to say what it holds, then set **Name**, **Type** and **Is Final**. Later nodes find it under **LOCALS**.
- **Add Custom Expression** opens a dialog where you type a formula, such as `items.removeAt(0)`. See [Write your own expression](expressions.md#custom-expression).

## Loops

There's no node for loops. A `while` loop that's already in the function, written in code or by Nowa AI, shows as a **While** node with a **True** branch and a **Condition**. You edit it like an If. To go through a list, click **+** after the list and pick one of its functions, such as `forEach`.

## Fix missing permissions with Hot Fix

Some actions, such as `showMediaPicker`, need permissions or packages in your project. Their **Details** then show a **Dependencies** section that lists what's needed under **Permissions:** and **Packages:**, with a check mark next to each item that's already on.

Click **Hot Fix** to switch on everything that's missing. Click a section title to open that part of the [project settings](../account/project-settings.md).

:::tip Or ask Nowa AI
In **Agent** mode, describe the steps: "When the user taps Add, show a message that says the item was added." Then open what it built in Circuit to check or change it. See [Design, Plan and Agent modes](../ai/modes.md).
:::

## Next steps

- [Respond to taps and other events](events.md) to start your circuits from a tap.
- [Expressions and conditions](expressions.md) to link values and write formulas.
- [Show dialogs, sheets, snackbars and pickers](popups.md) and [More actions](actions.md) for ready-made steps.
