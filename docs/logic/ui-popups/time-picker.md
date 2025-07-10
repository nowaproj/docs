---
sidebar_position: 4
title: Time picker
description: How to use DatePicker and DateTime to deal with dates 
---

# Using Time Picker and dealing with time objects

In Nowa, you can use the **Time Picker** to allow users to select a specific time. This is useful in many real-life scenarios, like:

- Letting users set reminders or alarms.
- Choosing a time for booking appointments.
- Selecting delivery or pickup time.
- Logging activity times (e.g., workout or medication).

---

## 🛠 How to Add a Time Picker

To use the time picker in your app:

1. Open a function that belongs to a screen or component. This could be an event like `On Pressed` or a function you created.
2. Click on the **small circle** to add a node.
3. From the node menu, open the category `Nowa` → choose `showTimePicker`.

Once added, you can customize the time picker popup from the **Details Panel** on the right.

---

## ⏱️ Receiving the Picked Time

The `showTimePicker` node returns a `Future<TimeOfDay>`. Here's what that means:

- `TimeOfDay` is a special object that holds a time (e.g., 8:30 PM).
- `Future<TimeOfDay>` means it returns the result *later* when the user finishes selecting the time.

You can handle this in two ways:

### Option 1: Using `await`

- Turn on the `await` toggle in the **Future Options** section.
- This makes the function wait until the user selects a time.
- Then scroll down to `Store Result`:
  - Choose **new variable** → creates a temporary variable of type `TimeOfDay`.
  - Or choose an **existing variable** (must also be `TimeOfDay`).

Once stored, you now have access to the selected time to use however you want.

---

## ⚙️ Time Picker Node Options

Here are the configurable options available in the `showTimePicker` node:

![](/img/circuit/ui-popups/time-picker/timepicker-options.png)

- **Initial Time (Hour, Minute)**: Sets the default time when the picker opens.
- **Builder**: Leave it as `null` unless you want to override the design.
- **Barrier Dismissible**: If off, the picker can’t be closed by tapping outside.
- **Barrier Color**: Color of the background behind the popup.
- **Barrier Label**: Used for accessibility tools.
- **Use Root Navigator**: Should be on if you're using nested navigators.
- **Cancel Text / Confirm Text**: Change the text for the Cancel/Confirm buttons.
- **Help Text**: Add a label at the top of the picker.
- **Hour Label / Minute Label**: Customize labels inside the picker.
- **Error Invalid Text**: Message if user enters an invalid time (for manual input).
- **Route Settings / Entry Mode / Anchor Point**: Advanced configuration for dialog display.
- **Switch To Input Mode / Dial Mode**: Choose how users select time.

---

## 🧠 Understanding `TimeOfDay`

When the user selects a time, it returns a `TimeOfDay` object.

You can call the following methods on it:

![](/img/circuit/ui-popups/time-picker/timeofday-options.png)

- `hour`: Returns the hour (0–23).
- `minute`: Returns the minute (0–59).
- `period`: AM or PM.
- `hourOfPeriod`: Hour in 12-hour format.
- `format(...)`: Returns the time as a formatted `String` (e.g., "8:45 PM").
- `isBefore(...)`, `isAfter(...)`, `isAtSameTimeAs(...)`: Compare times.
- `toString()`: Returns the raw string representation.

---

## 💡 Real Use Case Example

<video controls width="850">
  <source src="/img/circuit/ui-popups/time-picker/time-picker.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

We created a screen with:
- A **Button** to pick a time.
- A **Text** widget that shows the selected time.
- A variable called `time` (String) connected to the Text widget.

Steps:

1. Open the `On Pressed` event for the button.
2. Add `showTimePicker` and turn on `await`.
3. Store the result in a new variable called `selectedTime`.
4. Add a new node using `selectedTime`, and press **+** next to it in the details panel.
5. Choose the `format()` method to convert the time into a readable string.
6. Choose to **store the result** into the existing `time` variable.
7. Add a `refresh` node to update the UI with the new time.

Now when the user picks a time, it will appear in the Text widget!

---

## 🔁 Using `On Value` Instead of `await`

<video controls width="850">
  <source src="/img/circuit/ui-popups/time-picker/time-picker-using-onvalue.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

You can also handle the result using a callback by:

1. Opening the same `On Pressed` event.
2. Add `showTimePicker` but **don’t** turn on `await`.
3. Click `On Value` → attach a function (callback).
4. Inside the callback, use the `value` parameter (which is of type `TimeOfDay`).
5. Call `format()` on `value`, and store the result in the `time` variable.
6. Add a `refresh` node.

:::info[Why Use `On Value`?]
Using `On Value` doesn’t pause the rest of the function—it waits in the background and reacts once the user selects a time.
:::

Both approaches (`await` and `On Value`) achieve the same result. Choose the one that best fits your flow!
