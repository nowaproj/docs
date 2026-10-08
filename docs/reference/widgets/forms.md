---
title: Text fields and forms
description: Add a Text Field that Nowa wires up for you, check what people type with validators, and group fields into a Form you can validate in one step.
sidebar_label: Text fields and forms
keywords: [text field, textfield, text input, input field, form, form validation, input validation, validator, required field, email validation, password field, obscure text, controller, formKey, dropdown, dropdown menu, pin code, OTP, regex, TextFormField]
---

A **Text Field** is a box where people type. Nowa creates the variable that holds what they type, and you can add checks such as "required" or "valid email" without writing code.

## Add a Text Field {#text-field}

1. Press <kbd>Ctrl</kbd>/<kbd>Cmd</kbd> + <kbd>K</kbd>, search for `text field` and press <kbd>Enter</kbd>. See [Add widgets](../../design/add-widgets.md).
2. Nowa adds a variable called `text` to the screen or component and links the field's **Controller** to it. Open **Variables** to see it. The next Text Field gets the same name with a number added.

The variable is a controller that holds what the user typed. To use that text, click a property's label, open **LOCALS**, pick the controller and choose `text`. Rename the controller to something clear, such as `email`: the validator row uses its name too. See [Rename, retype or remove a variable](../../logic/variables.md#rename-retype-or-remove-a-variable).

:::note
Removing a Text Field removes its controller variable too. If your logic used that variable, fix those steps afterwards.
:::

## Style the field

Select the field. These settings in **Details** matter most:

| Setting | What it does |
|---|---|
| **Decoration** | The look of the box. Hover the row and click **+** to add it, then set **Hint Text**, **Label Text**, **Prefix Icon**, **Border** (**None**, **Outlined** or **Underlined**), **Filled** with **Fill Color**, **Error Text** and more. |
| **Obscure Text** | Hides what is typed. Turn it on for passwords. |
| **Keyboard Type** | The keyboard a phone shows, such as **Email**, **Number** or **Phone**. |
| **Min Lines**, **Max Lines** | How many lines of text the box shows. Raise **Max Lines** for a multi-line box. |
| **On Changed** | Runs every time the text changes. The new text arrives as `value`. See [Respond to taps and other events](../../logic/events.md). |

To style every text field in your app at once, use the **Fields** settings of your theme. See [Create and edit themes](../../design/themes.md).

## Check what people type {#validators}

Validators check the text and show a message under the field when it isn't right.

1. Select the Text Field. In **Details**, hover the validator row. It's named after the controller, such as **text validator**.
2. Click **+**, then click the arrow next to **text validator** to open it. A **Required** rule appears with a **Message**, which starts as "Field is required".
3. Click **+ Add validator** and choose a rule, for example **Min length validator**. **Email**, **Phone** and **Regex** can each be added once.
4. Change each rule's **Message**, and the **Regex** field of a **Regex** rule.

A **Min length** or **Max length** rule you add has no **Min** or **max** field in **Details**: right after you add it, it appears as a plain **Message** row, like **Required**. The length check stays in your code with the starting number from the table below, and you change that number in code mode (see [Edit code in Nowa](../../code/code-mode.md)). Editing the **Message** is safe, but adding or removing another rule afterwards rewrites that row as a **Required** check and drops the length check, so add a length rule last.

| Rule | The message shows when | Starts as |
|---|---|---|
| **Required** | The box is empty. | "Field is required" |
| **Min length** | The text has fewer characters than the minimum. | "Too small", minimum 6 |
| **Max length** | The text has more characters than the maximum. | "Too long", maximum 40 |
| **Email** | The text isn't a valid email address. | "Invalid email" |
| **Phone** | The text isn't a valid phone number. | "Invalid phone" |
| **Regex** | The text doesn't match your **Regex** pattern. | "Invalid input" |

Nowa checks the rules from top to bottom and shows the message of the first one that fails. To remove a rule, hover its title and click the remove button. **Required**, **Min length** and **Max length** show no title or remove button: click the remove button on the validator row to remove all the rules.

![The bottom of Details for a selected Text Field, scrolled down. The text validator block is highlighted: the Required rule's Message (Field is required), a Regex rule with its Message (Invalid input) and Regex field, and the + Add validator button. The Add Wrapper button is below.](/img/docs/reference/reference-forms-1.png)

Validators run only when your logic asks the form to check. The next section shows how.

## Check the whole form {#form}

A **Form** groups fields so one step can check all of them.

1. Select the group that holds your fields. Click a field, then its parent in the breadcrumbs at the top of **Details**.
2. In **Details**, click **Add Wrapper**, search for `Form` and press <kbd>Enter</kbd>. See [Wrappers](../wrappers.md#form).
3. Nowa adds a variable called `formKey`. The **Form** section of **Details** now lists a validator row for every Text Field, Dropdown menu and Pin Code Field inside it, so you can set all the rules in one place.
4. Select your submit button.
5. In **Details**, click the button next to **On Pressed**. [Circuit](../../logic/circuit.md) opens.
6. Hover the dot under the orange node, click the **+** that appears and choose **Add If statement**.
7. In **Details**, click the **Condition** label, open **LOCALS**, pick `formKey`, then choose `currentState` and `validate`.
8. Click the dot in the **True** branch and add what should happen when every field passes.

`validate` returns true when every field passes. Fields that fail show their messages. Press **Play**, leave a field empty and tap the button to see them.

{/* CAPTURE: id=reference-forms-2 | state: playground starter open, two Text Fields grouped together on the home screen (select both, Ctrl/Cmd+G), each with a validator, then the Group selected and Add Wrapper → Form chosen, Variables expanded | show: the Form section in Details with one validator row per field, and the Variables panel listing text, text1 and formKey | crop: right-hand panels */}

## Add a dropdown {#dropdown-menu}

A **Dropdown menu** lets people pick one option from a list.

1. Add a **Dropdown menu** from the widget picker. It starts with one option, "first".
2. In **Details**, open **Items** and click **+** to add an option. Each option has a **Value** and a **Child**, the widget that shows it. A new option copies the last one, so change its **Value** and its text. Until you do, Details says "Values contain duplicates".
3. **Value type** is the type of the values. It starts as text (`String`).
4. Click the button next to **On Changed** to open it in Circuit. The option the user picked arrives as `value`. Store it in a variable to use it elsewhere. See [Change a variable from logic](../../logic/variables.md#change-a-variable-from-logic).

**Decoration** and the validator row work as they do on a Text Field.

## Add a pin code field {#pin-code-field}

A **Pin Code Field** shows a row of boxes for a short code, such as a one-time password.

1. Add a **Pin Code Field**. If Nowa shows **Add Missing Dependencies**, click **Add**. The field needs the `pin_code_fields` package.
2. Nowa adds a variable called `pinCode` and links **Controller** to it. Read the typed code with `pinCode` and then `text`, as for a Text Field.
3. Set **Pin Code Length**, from 1 to 6.
4. Click **Pin Theme** to change colors, border widths, box size and shape. Turn on **Enable Active Fill** to color the boxes.
5. Use **On Completed** to run logic as soon as every box is filled.

## Use checkboxes, switches and sliders

**Checkbox**, **Switch** and **Slider** work alike. Click the label of **Value** and choose **Create Variable...**. Then open **On Changed**, set that variable to `value` and add **refresh**. See [Store data in variables](../../logic/variables.md).

## Update an older Text Field or dropdown

A project from an earlier version of Nowa can hold the older `TextField` or dropdown button. **Details** then shows "TextField does not support validation, use TextFormField instead" with a **Change** button, or "You are using an old version of the dropdown button" with an **Update** button. Click the button to switch to the version that supports validators.

:::tip Or ask Nowa AI
Try "Add a sign-up form with name, email and password fields, and show an error under the email field if it isn't a valid email." See [How Nowa AI works](../../ai/index.md).
:::

## Next steps

- [Respond to taps and other events](../../logic/events.md) to build what happens on a tap or a typed letter.
- [Store data in variables](../../logic/variables.md) to keep what people choose.
- [Widget catalog](./index.md) for every widget in the picker.
- [Form validation](../../legacy/tutorials/form-validation.md), a video walkthrough made with an earlier version of Nowa.
