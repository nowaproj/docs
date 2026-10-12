---
title: Build logic in Circuit
description: Circuit is Nowa's visual logic editor. Stack steps from top to bottom to tell your app what to do, make decisions with If, handle errors with Try, and let Nowa write the code.
sidebar_label: Circuit
keywords: [Circuit, logic, nodes, visual logic, flow, control flow, if statement, if else, condition, try, try catch, error handling, exception, return, store result, await, future, local variable, loop, Hot Fix, intro to circuit]
---

Circuit is where you tell your app what to do, one step at a time. Each step is a **node**. You stack nodes from top to bottom, like the steps of a recipe, and your app follows them in that order. Nowa writes the matching code as you go, so you never have to.

Every circuit is one function: a list of steps your app can run (see [Create functions](functions.md)). The orange node at the top is the function itself, and the steps below it run in order. **If** and **Try** nodes split the flow into branches, so your app can do one thing or another.

![The Circuit panel for On Pressed: the orange top node (the function itself) and the If Statement node with its False and True branches are highlighted, with a showSnackBar node between them and the Details pane showing the Condition switch.](/img/docs/logic/logic-circuit-1.png)

## Open Circuit

You'll find Circuit wherever your app does something:

- **An event**: in **Details**, click the button next to an event such as **On Pressed**. See [Respond to taps and other events](events.md).
- **A function**: select it in the **Variables** panel and click **Edit** in **Details**. See [Create functions](functions.md).
- **A linked function or computed value**: click the property's label and choose **Open in Circuit**.
- **A widget builder**: click the widget button next to a dialog's **Builder** and choose **Edit in circuit**.

Circuit opens as a floating panel over the board. Drag it by its title bar to see what's underneath, and close it with **×** when you're done. Your changes apply as you make them. In a global state or model file, Circuit shows the function you select in the file's right-hand column instead ([Share data across your app](global-state.md)).

## Add a node {#add-a-node}

1. Hover the small dot under a node. It grows into a **+**.
2. Click it. The **All nodes for this circuit** menu opens with everything you can add at that spot.
3. Type in the search box, or click a category to open it, then click an item. The node appears at that spot and is selected.
4. Set it up in the **Details** panel that opens inside Circuit.

<video controls playsInline preload="metadata" width="100%">
  <source src="/videos/docs/logic/logic-circuit-video.mp4" type="video/mp4" />
</video>

![The All nodes for this circuit menu opened from the plus under the onPressed node: the search box, the five top items (Add Return, Add If statement, Add Try statement, Create Local Variable, Add Custom Expression, highlighted) and the collapsed categories below.](/img/docs/logic/logic-circuit-2.png)

The menu starts with five building blocks, each explained below: **Add Return**, **Add If statement**, **Add Try statement**, **Create Local Variable** and **Add Custom Expression**.

Everything else sits in categories under them. They start closed and open on their own while you search, so typing a word such as `snack` or `date` is often the quickest way to find a step.

| Category | What's inside |
|---|---|
| **PACKAGE:** and your package name, such as `PACKAGE:MY_APP` | Things from your own project, such as the requests of a [REST API collection](../integrations/rest-api/index.md) and your [keys and constants](../integrations/constants.md). |
| One per library (a set of ready-made functions): **DART:CORE**, **MATERIAL**, **SERVICES**, **NOWA_RUNTIME** and more | Ready-made actions from Flutter, Dart and the packages your app uses, such as `openUrl` (opens a web link) and `print` (writes a message to the logs). See [Use ready-made actions](actions.md). A package you add brings its own. |
| **OPERATORS** | Math (`plus`, `divide`...), comparisons (`greaterThan`, `equal`...) and logic (`logicalAnd`, `logicalOr`). |
| **LOCALS** | Variables, params and functions of the current screen or component, plus **refresh** ([Store data in variables](variables.md)). |
| **GLOBALS** | **Navigator** and **GoRouter** ([Navigate between screens](navigation.md)), **checkPlatform** (where the app runs), **Media Query** (the screen's size), **Show snackbar** and your global states. |
| **SHARED PREFERENCES** | **clear**, **remove key**, **set** and **get**, to keep small values on the device ([Save values on the device](actions.md#save-values-on-the-device)). |
| **GENERAL** | **Create...** (makes something new, such as a timer or one of your models) and **parse** (turns text into a number). |
| **EXPRESSIONS** | **Conditional** (picks one of two values) and **ifNull** (a fallback for an empty value). |

Connecting Firebase adds a **FIREBASE** category. Click a class, such as `HapticFeedback`, to see its functions.

## Kinds of nodes

Nodes come in a few kinds. Knowing them makes any circuit easier to read, including one Nowa AI built for you.

| Kind | What it does | Examples |
|---|---|---|
| Action | Does something and hands nothing back. | `print`, **refresh** (redraws the screen), **clear** (erases the values saved on the device) |
| Value | Works something out and hands it back for later steps. | A calculation from **OPERATORS**, a function of yours that returns a result |
| Both | Does something and hands back a result. | An internet request that returns the reply, a date picker that returns the picked date |
| Branch | Decides which steps run next. | **If Statement**, **Try** |

When a node hands something back, its **Details** show **Store result** so you can keep the value. See [Keep a node's result](#store-result).

## Read a circuit, top to bottom

Here's a small example from a water-tracking app. A function called `loadGoal` has three steps:

1. **get** (from **SHARED PREFERENCES**) reads the daily goal saved on the device. **Store result** keeps it in a local variable named `savedGoal`.
2. An **If Statement** asks whether a goal was saved, with the condition `savedGoal != null` ("savedGoal isn't empty").
3. In the **True** branch, **Set dailyGoal** copies the saved goal into the screen's `dailyGoal` variable, and **refresh** redraws the screen. The **False** branch is empty, so the screen keeps its default goal.

Steps run in order, and each one can use what the steps above it produced. That's why the If can check `savedGoal`: step 1 already filled it in. Steps that take time, such as an internet request, need **await** so the next step waits for them. See [Wait for a result](#future-options).

## Select, move and remove nodes

Click a node to select it, and click empty canvas to deselect. Right-click a node for **Remove**, **Move up** and **Move down**, or use the keyboard:

| To | Press |
|---|---|
| Select the previous or next node | <kbd>↑</kbd> or <kbd>↓</kbd> |
| Move the selected node up or down | <kbd>Shift</kbd> + <kbd>↑</kbd> or <kbd>↓</kbd> |
| Remove the selected node | <kbd>Backspace</kbd>, or <kbd>Delete</kbd> on Windows and Linux |
| Undo or redo | <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Z</kbd> or <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>Z</kbd> |

A node moves only inside its own branch. You can't copy and paste nodes, and removing doesn't work while you're typing in a field. If you remove the wrong node, undo brings it back.

A red error icon on a node means something about it needs fixing. Hover the icon to read what's wrong.

## Set up the function node

Click the orange node at the top to edit the function itself.

| Field | What it does |
|---|---|
| **Name** | The function's name. |
| **Return Type** | What the function hands back when it finishes, such as a number. Choose `void` when it only does things and hands nothing back. |
| **Params** | The values the function receives each time it runs. Hover and click **+** to add one. Click a parameter to change its **Name**, **Type** and **Default Value**, or to **Remove** it. |

For an event, **Return Type** is fixed and **Params** lists the values the event gives you, such as `value` (the new text) for **On Changed**. More in [Create functions](functions.md).

## Keep a node's result {#store-result}

Many nodes give back a value: a calculation, a picked date, an answer from the internet. **Store result** keeps that value so the steps below can use it.

1. Select the node.
2. In **Details**, set **Store result**:
   - **New Variable** creates a local variable named `var1` (then `var2`, and so on). Rename it in **Details** to something you'll recognize, such as `pickedDate`.
   - **Pick Variable** writes the result into a variable you already have, such as a screen variable a widget shows. Click **Variable** and choose it.
   - **none** keeps nothing.
3. Use the stored value in later nodes from **LOCALS**.

Nodes that give back nothing don't show **Store result**.

## Wait for a result {#future-options}

Some actions finish later: a picker waits for a tap, an internet request waits for a reply. Their result is called a Future (a value that arrives later). Select such a node and choose what happens with **Future Options** in **Details**:

- **await** pauses the function until the result arrives, so the next steps can use it. Pair it with **Store result** to keep it. The node gets a small clock badge.
- **onValue** runs separate logic when the result arrives, without pausing the steps below. Click **+** to create it. A new Circuit panel opens for a function that receives the result as `value`.
- **onError** runs logic if the action fails. Clicking **+** next to either one creates both, and the **onError** function starts with a step that prints the error.

With **await** on, only the **await** switch shows.

## Branch with If

An If lets your app make a decision. It asks a yes-or-no question, the **condition**, and runs one set of steps when the answer is yes (**True**) and another when it's no (**False**). Is the user signed in? Is the cart empty? Has the user reached today's goal?

1. Click a dot and choose **Add If statement**. An **If Statement** node appears with a **True** branch on the right and a **False** branch on the left.
2. In **Details**, set the **Condition**, as described below.
3. Click the dot in the **True** branch and in the **False** branch to add what happens in each. A branch can stay empty when nothing should happen.

Steps below the If node run afterwards, whichever branch ran, unless that branch ends with a **Return**. For more than two outcomes, put another If inside a branch, or use a **Conditional** expression. There's no "else if" or switch node.

### Set the condition

The **Condition** starts as a switch that's on, so the **True** branch always runs. Switch it off and the **False** branch always runs, which is handy for trying out each branch while you build. To make a real decision, click the **Condition** label and link it to something that's true or false:

- **A true/false variable or param** of the screen or component, under **LOCALS**, such as `isLoading`. **Create Variable...** makes a new true/false variable and links it in one go.
- **A value from a global state**, under **GLOBALS**, such as whether someone is signed in.
- **A function that answers true or false**: one of yours under **LOCALS**, or a global state's function (**GLOBALS**, the global state, then **+**). It runs when the flow reaches the If, and its answer picks the branch.
- **A comparison** from **OPERATORS**, such as `greaterThan` or `equal`, or **checkPlatform** under **GLOBALS** to check where the app runs.
- **Custom Expression...** to type the condition, or **Compute...** to work it out in a function of its own when it needs several steps. See [Expressions and conditions](expressions.md).

For example, to celebrate when someone reaches their water goal for the day: click **Condition**, open **OPERATORS** and choose `greaterThanOrEqual`. Set **Type** to `int`, link **Left side** to your `totalToday` variable, and type `1400` in **Right side**. Then add a **Show snackbar** to the **True** branch. Typed as a **Custom Expression...**, the same condition is `totalToday >= 1400`.

## Handle errors with Try

Some steps can fail for reasons outside your control: an internet request fails when the phone is offline, a saved value is missing, or a calculation breaks when someone types letters where a number belongs. A failure like this is called an error (or exception). Without a plan for it, your app stops what it was doing and the person using it gets no explanation.

A **Try** node is that plan: try these steps, and if one of them fails, run the **On Error** branch instead.

1. Click a dot and choose **Add Try statement**. A **Try** node appears, with its **On Error** branch on the left.
2. Add the steps that might fail directly under the Try node. If they all work, the **On Error** branch is skipped.
3. Click the dot in the **On Error** branch and add the fallback. If a step fails, the steps after it are skipped and this branch runs.
4. In **Details**, **Error name** sets the name of the variable that holds the error. It's `error` by default, and you find it under **LOCALS** in the **On Error** branch.

Steps below the whole Try run afterwards, whether there was an error or not, unless the branch that ran ends with a **Return**. There's one **On Error** branch, and it catches any error.

Good things to put in **On Error**:

- **Show snackbar** (**GLOBALS**) with a friendly message. See [Show a snackbar](popups.md#show-a-snackbar).
- A dialog or a bottom sheet: **MATERIAL** → `showDialog` or `showModalBottomSheet` ([Show dialogs, sheets, snackbars and pickers](popups.md)).
- Steps that tidy up, such as setting `isLoading` back to false, or sending people to another screen.
- `print` (**DART:CORE**) with `${error}`, to read the details in the logs while you test ([Write to the logs](actions.md#write-to-the-logs)).

### Example: load products, and say so if it fails

1. In the event or function that loads your data, add a **Try** node.
2. Under it, add the step that calls your service, such as a request from your REST API collection ([Use a request in your app](../integrations/rest-api/index.md#use-a-request-in-your-app)). Turn on **await** for it under **Future Options**, and set **Store result** to keep the reply.
3. In the **On Error** branch, add **Show snackbar** with a message for your users, such as "We couldn't load the products. Please try again."

Keep **await** on for steps inside a Try: a step that finishes later reports its failure to the Try only when the function waits for it. A step that uses **onValue** and **onError** handles its own failures in **onError** instead.

## Return a value

When a function hands something back, such as a total or a yes-or-no answer, a **Return** node is where it does so.

1. Choose **Add Return** at the end of the function or of a branch.
2. In **Details**, set the **Return** value. It starts with a default for the return type. A function that returns nothing shows **Returning void**.

A Return also ends the function right there, so nothing can be added after it in the same branch. That makes it useful for stopping early, for example when a form isn't filled in yet.

## Hold values and write formulas

- **Create Local Variable** adds `var1` (then `var2`, and so on), a variable that lives only while the function runs. It's handy for holding a value between two steps. In **Details**, click **Expression:** to say what it holds, then set **Name**, **Type** and **Is Final** (on means the value can't change once it's set).
- **Add Custom Expression** opens a dialog where you type a formula as a step, such as `items.removeAt(0)` (removes the first item of a list). See [Write your own expression](expressions.md#custom-expression).

## Loops

A loop repeats steps, for example once for every item in a cart. Circuit has no node for adding one, so the easiest way is to ask Nowa AI in **Agent** mode: "In the checkout function, add up the price of every item in cartItems and store it in total." Then open the function in Circuit to see what it built, and try it with **Play**.

To go through a list without a loop, click **+** after the list and pick one of its functions, such as `forEach` (runs steps for each item).

A `while` loop, written in code or by Nowa AI, shows as a **While** node with a **True** branch and a **Condition**, and you edit it like an If. Circuit can't draw other kinds of loops, such as a `for` loop, so ask Nowa AI to use `forEach` or `while` when you want to keep editing the function in Circuit.

## Fix missing permissions with Hot Fix {#hot-fix}

Some actions need extra setup in your project before they work. For example, `showMediaPicker` (lets people pick photos and videos) needs permission to use the camera and the photo library. Such an action's **Details** show a **Dependencies** section listing what's needed under **Permissions:** and **Packages:**, with a check mark next to each item that's already on.

Click **Hot Fix** to switch on everything that's missing in one go. To see the details, click a section title: it opens that part of the [project settings](../account/project-settings.md).

:::tip Or ask Nowa AI
In **Agent** mode, describe the steps in your own words, such as "When Save is tapped, check that the name isn't empty. If it is, show a message. Otherwise save it and go back." Then open what Nowa AI built in Circuit to check or change it. See [Design, Plan and Agent modes](../ai/modes.md).
:::

## Next steps

- [Respond to taps and other events](events.md) to start your circuits from a tap.
- [Expressions and conditions](expressions.md) to link values and write formulas.
- [Show dialogs, sheets, snackbars and pickers](popups.md) for ready-made steps.
