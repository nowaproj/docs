---
title: Respond to taps and other events
description: Attach logic to a button tap, a typed letter or a pull-to-refresh with an event, then build what happens in Circuit.
sidebar_label: Events
keywords: [event, events, On Pressed, On Tap, On Changed, onPressed, button, tap, click, handler, callback, trigger, gesture detector, ink well, user interaction]
---

An event is a property that starts logic when something happens in your app: a tap, a long press, a typed letter, a submitted form. Attach logic to an event and your app responds.

## Add logic to an event

1. Select a widget on the board, for example a button.
2. In **Details**, find the event. For a **Button**, **On Pressed** is in the **Button** section.
3. Click the button next to the event. If it reads **+**, Nowa creates an empty function for the event first. If it reads **Edit** (with a bolt), the event already has a function. Either way, [Circuit](circuit.md) opens.
4. Add the steps you want, then close Circuit with **×**.

A new **Button** or **Icon Button** already has an empty function for **On Pressed**, so it reads **Edit** from the start. Click **Edit** any time to reopen the logic.

{/* CAPTURE: id=logic-events-1 | state: playground starter open, the Button selected on the board | show: Details scrolled to the Button section with the Enabled switch and the On Pressed row showing the Edit (bolt) button | crop: right-hand Details panel */}

The orange node at the top of the circuit is the function Nowa made for the event. It shows the event's name, such as `onPressed`, and the widget's Flutter name underneath, such as `ElevatedButton`. Click it to see **Params**, the values the event hands you. For example, **On Changed** on a text field gives you the new text as `value`.

## Example: show a message when a button is tapped

1. Select the button. In **Details**, click the button next to **On Pressed**. Circuit opens.
2. Hover the dot under the orange node and click the **+** that appears. The **All nodes for this circuit** menu opens.
3. Search for `snack`, or open **GLOBALS**, and click **Show snackbar**. A node is added.
4. In **Details**, click the brush next to **Content** and change the text, which starts as "Hello World". For example, write `Saved!`.
5. Close Circuit. Click **Play** in the screen's title bar and tap the button. The message appears at the bottom of the screen.

{/* CAPTURE: id=logic-events-2 | state: playground starter open, Button selected, On Pressed showing Edit | show: click Edit next to On Pressed, add GLOBALS → Show snackbar, change its Content text, close Circuit, click Play on the screen title, tap the button and see the snackbar (about 15 s, no audio) | crop: whole editor */}

To learn more about **Play**, see [Play your app on the board](../test/instant-play.md).

## Events you'll use most

Each widget lists its own events in **Details**, named after what they do:

- **Button** and **Icon Button**: **On Pressed**, **On Long Press** and **On Hover**.
- **Text fields**: **On Tap**, **On Changed**, **On Editing Complete**, and **On Submitted** (**On Field Submitted** in a form field).
- **Any other widget**: select it, click **Add Wrapper** in **Details** and choose **Gesture Detector** or **Ink Well**. Their events, such as **On Tap**, then appear in **Details**. The **Dismissible** (swipe away) and **Refresh Indicator** (pull to refresh) wrappers have events too.

## Turn a button on or off

A **Button** or **Icon Button** also has an **Enabled** switch in **Details**. Switch it off to disable the button. If its logic already has steps, Nowa won't let you and says "Disabling button will remove your function, use compute instead".

Click **Compute** next to the switch and link a true or false variable. The button then works only while that value is true. Click the detach icon to unlink it.

## Reuse a function, or let a parent decide

- **Run a function you already made**: open the event in Circuit, add a node, open **LOCALS** and pick the function. The event now runs it. See [Create functions](functions.md).
- **Let the parent decide**: click the event's name and choose **Create Param...**. Nowa adds a param to your component and links the event to it, so each place that uses the component can set its own logic. See [Pass data with parameters](parameters.md).

## Remove an event's logic

Right-click the event's name and choose **Reset to default**. Events that can be empty also offer **Set to null**. Or click the name and choose **Detach...**.

:::tip Or ask Nowa AI
Select the button on the board, then ask in **Agent** mode: "When this button is tapped, show a message that says Saved." Open the result in Circuit to see what it built. See [Chat with Nowa AI](../ai/chat.md).
:::

## Next steps

- [Build logic in Circuit](circuit.md) to learn every node.
- [Store data in variables](variables.md) to change what your screen shows when an event fires.
- [Show dialogs, sheets, snackbars and pickers](popups.md) for more things to do on a tap.
