---
sidebar_position: 4
title: Data Models
description: How to create custom data models to be used as types. 
---

# Data Models

Data models are essential building blocks when you're working with structured data in your app. In Nowa, you can visually create and manage data models that represent real-world objects—like a task, a product, a user profile, or a log entry—and then use them across your app in variables, logic, and UI.

## 📌 Why You Need Data Models

Here are common scenarios where creating a model is necessary:

- **To-do apps**: Each task needs a structure like title, description, and status.
- **E-commerce apps**: A product has properties like name, price, and image.
- **User management**: A user might have a name, email, and role.
- **Water tracker app**: Each water log entry can have an amount and timestamp.

Creating models helps you avoid repeating data structures manually and makes your app more scalable and easier to maintain.

---

## ✨ How to Create a Data Model

1. Click on the ➕ next to the `lib` folder in the Files panel.
2. Choose **"Create new object"**.
3. A popup will appear. Enter the model name (e.g., `Task`).

    At the bottom of the popup:
    - `Path:` shows where the Dart file will be created.
    - `Class:` shows the Dart class name you’ll use in your logic and variables.

4. After confirming, the model will appear in the Files panel as a Dart file.

<video controls width="850">
  <source src="/img/vars-params-functions/data-models/create-model.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

:::note[Naming Rules]

The file and class names are automatically adjusted:
- A model named `"task model"` becomes:
  - **Class name**: `TaskModel` (PascalCase)
  - **File name**: `task_model.dart` (snake_case)

This follows Dart’s best practices.

:::

---

## ✍️ Adding Variables and Functions

1. Single-click the model file to open a popup showing `variables` and `functions`.
2. Click ➕ next to either section to create a new variable or function.

In the popup:
- Choose the variable name and type.
- Set a default value (optional).
- Enable **`is final`** if the variable should not change after being set.

:::tip[When to use `final`]

Use `final` when:
- The value shouldn’t change, like `id`, `createdAt`.

Avoid `final` when:
- You want to update it later, like `title`, `description`, `isDone`.

:::

<video controls width="850">
  <source src="/img/vars-params-functions/data-models/create-vars-inside-model.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

In the video above, we:
- Created `title`, `description`, and `isDone` variables for the `Task` model.
- Set all as **non-final** so users can update them.
- Added a method `markAsComplete` to mark a task as done.

---

## 🧑‍💻 View and Edit the Model Code

1. Double-click the model file to open its Dart code.
2. You can here view the source-code of the model, or edit or add variables and functions here directly. To do so:
   - Double-click the file name.
   - Click ➕ next to the model name to add or edit variables/functions.

<video controls width="850">
  <source src="/img/vars-params-functions/data-models/see-code.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

In the video, we:
- Opened `task.dart`.
- Added a new variable `priority` of type `int`.
- Instantly saw the code update.

---

## 🔁 Using Data Models

### 1. As a Data Type

You can use your model as a custom type for cases like:
- Variables
- Parameters
- Function parameters and returns

<video controls width="850">
  <source src="/img/vars-params-functions/data-models/model-as-datatype.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

Example:
- We created a list variable `taskList` of type `List<Task>`.
- Set a default value with 3 tasks.
- Modified each task’s properties (title, description, etc.).

:::info[Default Value Use]

The default value is used **only** when no other value is set during runtime. It’s great for testing your UI layout.

:::

---

### 2. Creating Instances in Circuit

In the logic editor (Circuit):
- Use the **"Create"** node.
- Choose the model you want to instantiate.
- Fill in its properties.

<video controls width="850">
  <source src="/img/vars-params-functions/data-models/create-instance-from-model.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

Example:
- In the `On Pressed` event of a ➕ button:
  - Created an instance of `Task`.
  - Set values for `title`, `description`, and `isDone`.
  - Stored it in a variable `task`.
  - Added it to the `taskList`.

:::note[Dynamic Input]

To use dynamic values (like user input):
- Click on a property (e.g. `title`) in the instance node.
- Open the **linking menu**.
Choose what you want to link it with—it can be a variable, a parameter, the result of a function call, an expression, and more.

For example, if you have a TextField widget with a controller variable named `titleTextFieldController`, and you want to use the entered text as the `title` of the `Task` instance, open the linking menu, then go to `locals` > `titleTextFieldController` > `text` to bind the text input of the TextField to be the title of the task created

:::

---
:::tip[Full Example: Water Tracker App]

We used a model `WaterLogEntry` to represent a log of water intake, with:
- `amount`: The amount of the intake as `int`
- `date`: the date where the instance was created, from the type `DateTime`.

We then created variables and used this model in the logic and UI.

Play this tutorial that will start from 6:00 to see how an object was created and used during building a Water Tracker App.

<iframe width="560" height="310" src="https://www.youtube.com/embed/cnrIhGEGIeE?si=hijkwf4tZChdjTYi&amp;start=362" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
---

Data models in Nowa make your app logic cleaner, more powerful, and easier to scale. Whether you're building a todo list, an e-commerce app, or a fitness tracker, models are your best friend to organize and work with structured data.
