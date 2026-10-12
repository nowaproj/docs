---
title: How logic works
description: Logic is what your app does when something happens. Meet the building blocks (events, functions, variables, params, global state, conditions and error handling), learn when to use each, and find where to build them.
sidebar_label: How logic works
keywords: [logic, how logic works, visual programming, events, functions, variables, parameters, circuit, state, conditions, if, try, error handling, expressions, actions, no code, interactivity, behavior]
---

Logic is everything your app does besides looking good: reacting to a tap, remembering a value, choosing what to show, loading data from the internet. In Nowa you build it visually, by picking steps from menus instead of typing code, and Nowa writes the code for you.

You don't need any programming background. The ideas on this page are the same ones every app uses, explained in everyday terms.

## How the pieces fit

1. **An event starts it.** A tap, a long press or a typed letter fires an event.
2. **A function holds the steps.** You stack the steps in Circuit, and they run from top to bottom.
3. **Steps use data.** They read and change values stored in variables, params and global states.
4. **Widgets show the result.** A property linked to a value shows it, and an expression can turn it into a calculation or a choice.

For example, picture the **+** button next to a product's quantity in a shop app. Its **On Pressed** event runs a function that adds one to a `quantity` variable and refreshes the screen. A text widget linked to `quantity` shows the new number.

## The pieces

| Idea | In plain words | Learn more |
|---|---|---|
| Event | Something that happens, such as a tap, a long press or typing. It starts your logic. | [Respond to taps and other events](events.md) |
| Function | A named list of steps you can run from many places, like a recipe. | [Create functions](functions.md) |
| Circuit | The visual editor where you stack the steps of a function. | [Build logic in Circuit](circuit.md) |
| Variable | A value a screen or component remembers while it's open, such as the number of items in a cart. | [Store data in variables](variables.md) |
| Param | A value handed to a screen or component from outside, such as the product a details screen shows. | [Pass data with parameters](parameters.md) |
| Global state | Values and functions the whole app shares, such as a cart. | [Share data across your app](global-state.md) |
| Condition (If) | A yes-or-no question that decides which steps run, such as "Is the cart empty?" | [Branch with If](circuit.md#branch-with-if) |
| Error handling (Try) | A backup plan for steps that can fail, such as loading data without an internet connection. | [Handle errors with Try](circuit.md#handle-errors-with-try) |
| Model | A custom type that groups related values, such as a Product with a name and a price. | [Data models](models.md) |
| Expression | A formula that gives a value: a link, a calculation or a condition. | [Expressions and conditions](expressions.md) |
| Action | A ready-made step, such as showing a message or opening a link. | [Show dialogs, sheets, snackbars and pickers](popups.md), [Navigate between screens](navigation.md), [Use ready-made actions](actions.md) |
| Route | The path that opens a screen, such as `/recipe/:id`. The Router panel lists them all. | [Set up routes in the Router panel](router.md) |

## Which one do I need?

Most logic questions come down to a few choices:

| You want to... | Use |
|---|---|
| Remember a value on one screen, such as a counter or what someone typed | A [variable](variables.md) |
| Hand a value to a screen or component, such as the product to show | A [param](parameters.md) |
| Share a value between screens, such as a cart or the signed-in user | A [global state](global-state.md) |
| Run the same steps from several places | A [function](functions.md) |
| Do one thing or another, depending on a value | An [If](circuit.md#branch-with-if) |
| Cope with a step that can fail, such as an internet request | A [Try](circuit.md#handle-errors-with-try) |
| Keep a small value after the app closes, such as a chosen language | [Shared Preferences](actions.md#save-values-on-the-device) |

Not sure? Start with a variable on the screen that needs it, and move it to a global state once a second screen needs it too. [Data and state tips](../guides/data-and-state-tips.md) goes deeper.

Everything you build turns into real app code that you own. You never have to read it, but [code mode](../code/code-mode.md) shows it whenever you're curious.

:::tip Or ask Nowa AI
Switch to **Agent** mode and describe what should happen: "When the user taps Add to cart, add the product to the cart and show a message." **Design** mode builds the look and flow without logic. Then open what it built in Circuit to check or change it. See [Design, Plan and Agent modes](../ai/modes.md).
:::

## Where to start

1. [Respond to taps and other events](events.md): make a button show a message.
2. [Store data in variables](variables.md): make your screen remember and show a value.
3. [Build logic in Circuit](circuit.md): make decisions with If, handle errors with Try and more.
4. [Navigate between screens](navigation.md): send people to another screen.

## Next steps

- [Connect data and services](../integrations/index.md): need data from a server, or sign-in?
- [Preview and test](../test/index.md): try your app at every step.
- [Find and fix problems](../test/problems.md): something not working?
- [Build a great app](../guides/index.md): a complete walkthrough and tips for design, Nowa AI, data and shipping.
