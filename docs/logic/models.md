---
title: Data models
description: Create models such as a Task or a Product, generate them from JSON, and use them as types for variables, params and lists.
sidebar_label: Models
keywords: [model, data model, class, object, fromJson, toJson, JSON, New Model, Generate Models From Json, type, list of models, Create, constructor, fields]
---

A model describes one kind of thing in your app, such as a task, a product or a user, and the pieces of data (fields) it holds. Once you have a model, you can use it as a type for variables, params and lists. Nowa keeps the model's constructor, `fromJson` and `toJson` up to date for you.

## Create a model

1. Open **Files** in the sidebar. Next to the `lib` folder, click **+** (**Add to library**), then **New Model...**. Inside `lib`, the **Add** button opens the same menu.
2. Type a name, such as `Task`. Nowa fills in the **Class name** and the **Path** (the file name) for you: "task model" becomes the class `TaskModel` in `task_model.dart`. Click either one to change it.
3. Click **Submit**. Nowa creates the file in `lib/models`.

## Add fields

1. In **Files**, double-click the model's file. A single click only shows a preview.
2. Click the class name in the list on the left. Its **Variables** and **Functions** appear in the middle.
3. Hover **Variables** and click **+**. Rename the new field, for example `title`, then set its **Type** and **Default Value** on the right. See [Store data in variables](./variables.md#choose-a-type) for the type picker.
4. Repeat for each field.

| Setting | What it does |
|---|---|
| **Name** | The field's name. |
| **Type** | What the field holds. It can be another model. |
| **Default Value** | The value a new model gets when you don't set that field. |
| **Is Final** | If on, the field can't be changed after the model is created. New fields start with this on, so turn it off for fields you will change, such as `isDone`. |
| **Is Static** | If on, one value is shared by every model of this kind. Leave it off for normal fields. |

{/* CAPTURE: id=logic-models-1 | state: playground starter, a model file created with New Model... (name Task) and double-clicked in Files, the class selected, three fields added (title, description, isDone) | show: the class list with View Code, the Variables and Functions column, and the selected field's Name, Type, Default Value and Is Final | crop: the editor area */}

Each time you change the fields, Nowa rewrites the constructor, `fromJson` and `toJson`. Click **View Code** to see the Dart code it produced.

To add logic to the model, hover **Functions** and click **+**. The function opens in Circuit, where the model's fields are under **LOCALS**. See [Create functions](./functions.md).

## Generate models from JSON

If you have a sample of the data, such as an API response, Nowa can build the models for you, including nested ones.

1. In **Files**, click **+** (**Add to library**) next to `lib`, then **Generate Models From Json...**. The **Generate Models** dialog opens.
2. In **Content**, paste your JSON. The editor's menu has **Wrap**, **Compress** and **Prettify**. Click **Next**. The button stays disabled while the JSON isn't valid.
3. In **Select Data**, tick the fields to keep. **Select All**, **Collapse All** and **Expand All** help with long data. Click **Next**.
4. In **Generated Models**, set the **Name** of the main class (it starts as `Root`) and the **Path**. The path starts as `lib/models` and must be inside `lib`. Click **Save and Open**.

All the generated classes go into one file, and every field can be empty. If the JSON has no fields to turn into a model, such as a list of plain values, Nowa shows a message and stops.

The [REST API](../integrations/rest-api/index.md) tools can create response models for you as well.

## Use a model as a type

1. Click a variable's type icon, or **Type** in **Details**. The **Select type** picker opens.
2. Tick **As List** first if you want a list of models.
3. Search for the model's name, or click **show more...** and pick it.
4. Fill in **Default Value** to preview your design. For a list, click **+** to add items and set each item's fields.

The default is only a starting value. Data your logic sets while the app runs replaces it. The same picker works for [params](./parameters.md) and function inputs.

To show a field in a widget, link the property to the variable, click the **+** after it, and pick the field, such as `title`. See [Expressions and conditions](./expressions.md).

## Create a model in logic

1. In Circuit, click the dot under a node. Open **GENERAL** and click **Create...**. **Pick a constructor** opens.
2. Search for your model and click it. If it offers a choice, pick **Default** to build it from field values, or `fromJson` to build it from a map of values.
3. Nowa adds a **Create** node named after the model, with one input per field. Type a value in each input, or click its label to link a variable, a param or an expression.
4. Set **Store result** to **New Variable** to keep the new model.

To add it to a list, pick the list variable under **LOCALS**, click **+** in **Details**, and choose `add`. Link its input to the variable you stored, then add a **refresh** node. For a list in a [global state](./global-state.md), call `notifyListeners` instead. To turn a model into JSON, click **+** after a model value and choose `toJson`.

:::tip Or ask Nowa AI
Try: "Create a Task model with a title and a done flag, and a to-do screen that lists tasks." See [How Nowa AI works](../ai/index.md).
:::

## Next steps

- [Store data in variables](./variables.md) to hold a model or a list of models on a screen.
- [Pass data with parameters](./parameters.md) to hand a whole product or user to a screen or component.
- [Share data across your app](./global-state.md) to keep a list of models, such as a cart, in one place.
