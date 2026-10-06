---
title: How logic works
description: Logic is what your app does when something happens. Events start it, Circuit builds it, and variables, expressions and global state give it data.
sidebar_label: How logic works
keywords: [logic, how logic works, events, functions, variables, circuit, state, expressions, actions, no code, interactivity, behavior]
---

Logic is everything your app does besides looking good: reacting to a tap, remembering a value, choosing what to show, asking the internet for data. In Nowa you build it visually, and Nowa writes the Flutter code for you.

## How the pieces fit

1. **An event starts it.** A tap, a long press or a typed letter fires an event.
2. **A function holds the steps.** You stack the steps in Circuit, and they run from top to bottom.
3. **Steps use data.** They read and change values stored in variables, params and global states.
4. **Widgets show the result.** A property linked to a value shows it, and an expression can turn it into a calculation or a choice.

For example, a button's **On Pressed** event runs a function that adds one to a `counter` variable. A text widget linked to `counter` shows the new number.

## The pieces

| Idea | In plain words | Learn more |
|---|---|---|
| Event | Something that happens, such as a tap, a long press or typing. | [Respond to taps and other events](events.md) |
| Function | A named list of steps you can run from many places. | [Create functions](functions.md) |
| Circuit | The visual editor where you stack the steps of a function. | [Build logic in Circuit](circuit.md) |
| Variable | A value a screen or component remembers while it's open. | [Store data in variables](variables.md) |
| Param | A value passed into a screen or component from outside. | [Pass data with parameters](parameters.md) |
| Global state | Values and functions the whole app shares, such as a cart. | [Share data across your app](global-state.md) |
| Model | A custom type that groups related values, such as a Product. | [Data models](models.md) |
| Expression | A formula that gives a value: a link, a calculation or a condition. | [Expressions and conditions](expressions.md) |
| Action | A ready-made step, such as showing a message or opening a link. | [Show dialogs, sheets, snackbars and pickers](popups.md), [Navigate between screens](navigation.md), [More actions](actions.md) |

Everything you build is real Dart code in your project, which you can read in [code mode](../code/code-mode.md).

:::tip Or ask Nowa AI
Switch to **Agent** mode and describe what should happen: "When the user taps Add to cart, add the product to the cart and show a message." **Design** mode builds the look and flow without logic. Then open what it built in Circuit to check or change it. See [Design, Plan and Agent modes](../ai/modes.md).
:::

## Where to start

1. [Respond to taps and other events](events.md): make a button show a message.
2. [Store data in variables](variables.md): make your screen remember and show a value.
3. [Build logic in Circuit](circuit.md): branch with If, handle errors with Try and more.
4. [Navigate between screens](navigation.md): send people to another screen.

Something not working? See [Find and fix problems](../test/problems.md).
