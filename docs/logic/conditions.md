---
title: Make decisions, handle errors and repeat steps
description: Use an If to choose between steps, a Try to catch a step that fails, and loops to repeat steps for every item, all in Circuit and with everyday examples.
sidebar_label: If, Try and loops
keywords: [if, else, if statement, condition, branch, decision, try, catch, try catch, error, exception, error handling, On Error, loop, while, forEach, repeat, control flow]
---

Most logic is a simple list of steps that run one after another. Now and then your app has to do more: choose what to do (show a message only when the cart is empty), cope with something going wrong (say so when the products can't load), or repeat a step for every item in a list. Circuit has an **If** node for decisions and a **Try** node for errors, and it can show loops that Nowa AI writes for you.

You add these nodes like any other step: click the dot under a node and pick from the menu. If Circuit is new to you, start with [Build logic in Circuit](circuit.md).

## Branch with If {#branch-with-if}

An If lets your app make a decision. It asks a yes-or-no question, the **condition**, and runs one set of steps when the answer is yes (**True**) and another when it's no (**False**). Is the user signed in? Is the cart empty? Has the user reached today's goal?

1. Click a dot and choose **Add If statement**. An **If Statement** node appears with a **True** branch on the right and a **False** branch on the left.
2. In **Details**, set the **Condition**, as described below.
3. Click the dot in the **True** branch and in the **False** branch to add what happens in each. A branch can stay empty when nothing should happen.

![A new If Statement in Circuit, with numbered markers: the If Statement node (1), the Condition switch in Details, here switched off so the node reads false (2), the dot in the True branch on the right (3), the dot in the False branch on the left (4), and the dot below, where both branches meet again (5).](/img/circuit/control-flow/if/ifstatement-sections.png)

Steps below the If node run afterwards, whichever branch ran, unless that branch ends with a **Return**. For more than two outcomes, put another If inside a branch, or use a **Conditional** expression. There's no "else if" or switch node.

![A function named getRemaining with one If inside another: the first If checks dailyGoal != 0 and its False branch ends with a Return. Its True branch holds a second If that checks whether todayWaterIntake! is less than dailyGoal!, with a Return in its False branch and, in its True branch, a calculation followed by a Return.](/img/circuit/control-flow/if/nested-if.png)

### Set the condition

The **Condition** starts as a switch that's on, so the **True** branch always runs. Switch it off and the **False** branch always runs, which is handy for trying out each branch while you build. To make a real decision, click the **Condition** label and link it to something that's true or false:

- **A true/false variable or param** of the screen or component, under **LOCALS**, such as `isLoading`. **Create Variable...** makes a new true/false variable and links it in one go.
- **A value from a global state**: under **GLOBALS**, click the global state, then the true/false value, such as whether someone is signed in.
- **A function that answers true or false**: one of yours under **LOCALS**, or a global state's function (**GLOBALS**, the global state, then the function in the list that opens). It runs when the flow reaches the If, and its answer picks the branch.
- **A comparison** from **OPERATORS**, such as `greaterThan` or `equal`, or **checkPlatform** under **GLOBALS** to check where the app runs.
- **Custom Expression...** to type the condition, or **Compute...** to work it out in a function of its own when it needs several steps. See [Expressions and conditions](expressions.md).

For example, to celebrate when someone reaches their water goal for the day: click **Condition**, open **OPERATORS** and choose `greaterThanOrEqual` ("is at least"). The **Condition** now shows a formula: click it to open its popup. Set **Type** to `int` first (changing it resets both sides), link **Left side** to your `totalToday` variable, and type `1400` in **Right side**. Then add a **Show snackbar** to the **True** branch. Typed as a **Custom Expression...**, the same condition is `totalToday >= 1400`.

## Handle errors with Try {#handle-errors-with-try}

Some steps can fail for reasons outside your control: an internet request fails when the phone is offline, a saved value is missing, or a calculation breaks when someone types letters where a number belongs. A failure like this is called an error (or exception). Without a plan for it, your app stops what it was doing and the person using it gets no explanation.

A **Try** node is that plan: try these steps, and if one of them fails, run the **On Error** branch instead.

1. Click a dot and choose **Add Try statement**. A **Try** node appears, with its **On Error** branch on the left.
2. Add the steps that might fail directly under the Try node. If they all work, the **On Error** branch is skipped.
3. Click the dot in the **On Error** branch and add the fallback. If a step fails, the steps after it are skipped and this branch runs.
4. In **Details**, **Error name** sets the name of the variable that holds the error. It's `error` by default, and you find it under **LOCALS** in the **On Error** branch.

Steps below the whole Try run afterwards, whether there was an error or not, unless the branch that ran ends with a **Return**. There's one **On Error** branch, and it catches any error.

![An onTap circuit with a Try node: loadData sits under the Try, with a clock badge because it's awaited, and a showSnackBar sits in the On Error branch on the left. Both paths join again above a Navigator node that opens Settings, which runs either way.](/img/circuit/control-flow/try/try-catch.png)

Good things to put in **On Error**:

- **Show snackbar** (**GLOBALS**) with a friendly message. See [Show a snackbar](popups.md#show-a-snackbar).
- A dialog or a bottom sheet: **MATERIAL** → `showDialog` or `showModalBottomSheet` ([Show dialogs, sheets, snackbars and pickers](popups.md)).
- Steps that tidy up, such as setting `isLoading` back to false, or sending people to another screen.
- `print` (**DART:CORE**) with `${error}` in its message (type `$` and pick `error`), to read the details in the logs while you test ([Write to the logs](actions.md#write-to-the-logs)).

### Example: load products, and say so if it fails

1. In the event or function that loads your data, add a **Try** node.
2. Under it, add the step that calls your service, such as a request from your REST API collection ([Use a request in your app](../integrations/rest-api/index.md#use-a-request-in-your-app)). Turn on **await** for it under **Future Options** (see [Wait for a result](circuit.md#future-options)), and set **Store result** to keep the reply.
3. In the **On Error** branch, add **Show snackbar** with a message for your users, such as "We couldn't load the products. Please try again."

Keep **await** on for steps inside a Try: a step that finishes later reports its failure to the Try only when the function waits for it. A step that uses **onValue** and **onError** handles its own failures in **onError** instead.

## Loops {#loops}

A loop repeats steps, for example once for every item in a cart. Circuit has no node for adding one, so the easiest way is to ask Nowa AI in **Agent** mode: "In the checkout function, use forEach to add up the price of every item in cartItems and store it in total." Then open the function in Circuit to see what it built, and try it with **Play**.

To go through a list without a loop, click **+** after the list and pick one of its functions, such as `forEach` (runs steps for each item).

A `while` loop (it repeats its steps as long as a condition is true), written in code or by Nowa AI, shows as a **While** node with a **True** branch and a **Condition**, and you edit it like an If. Circuit can't draw other kinds of loops, such as a `for` loop, so ask Nowa AI to use `forEach` or `while` when you want to keep editing the function in Circuit.

## Next steps

- [Build logic in Circuit](circuit.md): add, move and connect the other steps.
- [Expressions and conditions](expressions.md): write the yes-or-no questions an If asks.
- [Show dialogs, sheets, snackbars and pickers](popups.md): tell people what happened.
