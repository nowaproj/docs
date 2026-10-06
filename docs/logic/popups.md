---
title: Show dialogs, sheets, snackbars and pickers
description: Show a message, a dialog, a bottom sheet, or a date, time or photo picker from your logic, and use what the person chose.
sidebar_label: Dialogs, sheets and pickers
keywords: [snackbar, dialog, alert dialog, popup, bottom sheet, modal, date picker, time picker, date range picker, media picker, image picker, camera, gallery, showDialog, showSnackBar, format date, await, onValue]
---

Popups let your app talk to people and ask them things: a short message, a question in a dialog, a sheet that slides up, or a picker for a date, time or photo. You add each one as a step in [Circuit](circuit.md).

They appear on top of a screen, so add them in logic that belongs to a screen or component, such as an event. Nowa fills in the **Context** input for you.

## Show a snackbar

A snackbar is a short message that slides up at the bottom of the screen and goes away by itself.

1. In Circuit, click a **+** and choose **GLOBALS** → **Show snackbar**.
2. In **Details**, click the brush next to **Content** and change the text, which starts as "Hello World". Type `$` to put a value inside it, such as `Saved ${name}`.
3. Optional: set **Background Color**, **Width**, **Elevation** or **Shape**. **Show advanced options** adds **Action**, **Duration**, **Padding**, **Margin** and **On Visible**.

## Show a dialog

A dialog is a box in the middle of the screen, often used to confirm something.

1. Choose **MATERIAL** → `showDialog`. Its content starts as an **AlertDialog** with the title "Hello World".
2. Click the brush next to it (tooltip **Edit AlertDialog**) to change the title, content and buttons.
3. To use your own design, click the **Builder** row and choose **Pick Widget**, then pick a component you built. **Edit in circuit** opens the builder as a function instead.

{/* CAPTURE: id=logic-popups-1 | state: Circuit open for On Pressed, MATERIAL → showDialog added and selected | show: the showDialog node in Circuit and Details with the Builder row (AlertDialog and the brush button) and Barrier Dismissible | crop: Circuit panel */}

A few options matter most:

- **Barrier Dismissible** is on by default: tapping outside closes the dialog. Turn it off to force a choice.
- **Barrier Color** sets the color behind the dialog.
- **Use Safe Area** is on by default and keeps the dialog clear of notches and system bars.
- **Use Root Navigator**, **Route Settings**, **Anchor Point** and **Traversal Edge Behavior** are advanced. Leave them alone unless you know you need them.

### Get an answer from a dialog

1. Add buttons to the dialog's **Actions**. Give each button's **On Pressed** a **Navigator** step (under **GLOBALS**), set **Type** to `pop`, then set **result type** and **result**, for example `true` for a "Yes" button. See [Navigate between screens](navigation.md).
2. On the `showDialog` step, turn on **await** and set **Store result** to **New Variable**. The variable holds the result, or nothing if the dialog was dismissed.

Or skip **await** and click **+** next to **onValue**. That function gets the result as `value`. See [Wait for a result](circuit.md#future-options).

## Show a bottom sheet

A bottom sheet slides up from the bottom edge and holds content you design.

- `showModalBottomSheet` (**MATERIAL**) sits on top of the screen and closes when someone taps outside it or drags it down. It starts with a centered text, "Bottom Sheet Opened", and a minimum height of 400. Edit it like a dialog. Extra options include **Background Color**, **Is Scroll Controlled**, **Is Dismissible**, **Enable Drag**, **Show Drag Handle** and **Constraints**. It can send an answer back, like a dialog.
- `showBottomSheet` (**MATERIAL**) attaches a persistent sheet to the screen. Choose its content in **Builder** → **Pick Widget**.

## Pick a date or time

A date picker lets someone choose a day from a calendar. A time picker lets them choose a time.

1. Choose **MATERIAL** → `showDatePicker`.
2. **First Date** and **Last Date** set the range people can pick, and **Initial Date** is where it opens. All three start as today. To set a fixed day, click the date's label, choose **Custom Expression...** and type something like `DateTime(2030, 12, 31)`.
3. Turn on **await** and set **Store result** to **New Variable**. The variable holds the chosen date, or nothing if the picker was closed.

To show the date in a text widget that's linked to a text variable:

1. Click the dot below, open **LOCALS** and pick the variable that holds the date.
2. In **Details**, click the **+** after the variable and choose `format`. Pick a style in the **.format** dropdown, such as `DAY`, `WEEKDAY`, `YEAR_MONTH_DAY` or `HOUR_MINUTE`.
3. Set **Store result** to **Pick Variable** and choose the text variable. Add **LOCALS** → **refresh** below.

`showTimePicker` works the same way. Set **Initial Time** (hour and minute), and the result is a time you can read with `hour` and `minute`, or turn into text with `format`. `showDateRangePicker` lets people pick a start and an end date, and its result has `start` and `end`.

## Pick photos or videos

`showMediaPicker` lets someone choose photos or videos from the gallery, or take one with the camera.

1. Choose **NOWA_RUNTIME** → `showMediaPicker` and set its options.
2. If **Dependencies** shows missing items, click **Hot Fix**. See [Fix missing permissions with Hot Fix](circuit.md#hot-fix).
3. Turn on **await** and set **Store result** to **New Variable**. The variable holds a list of the picked files, which is empty if nothing was picked.

| Option | What it does |
|---|---|
| **Multi Selection** | Off by default. Turn it on to pick several files. **Limit** then appears. |
| **Media Type** | `image` (the default), `video` or `both`. |
| **Source Type** | `gallery`, `camera` (the default) or `both`. With `both`, the app asks with a **Choose Source** sheet (**Camera**, **Gallery**, **Cancel**). It's fixed to `gallery` when **Multi Selection** is on or **Media Type** is `both`. |
| **Max Duration** | The longest video, for `video`. |
| **Image Quality**, **Max Width**, **Max Height** | Resize and compress images. |
| **Preferred Camera** | `rear` or `front`. Hidden when picking several files or both types. |

To show the first image, add a node on the variable, click **+**, choose `first`, then `readAsBytes`. Turn on **await** and store the result in a new variable. Then select an image widget, open the **Bytes** tab of its image source and link the variable. Add **refresh**. To upload the file, see [Store files in Supabase](../integrations/supabase/storage.md).

:::tip Or ask Nowa AI
In **Agent** mode, try: "When the user taps Pick a date, open a date picker and show the chosen date in the text above the button." Then open the result in Circuit to see each step. See [Chat with Nowa AI](../ai/chat.md).
:::

## Next steps

- [Navigate between screens](navigation.md) to send people to another screen after a choice.
- [More actions](actions.md) for opening links, saving values on the device and more.
- [Build logic in Circuit](circuit.md) for **await**, **onValue** and **Store result**.
