---
sidebar_position: 2
title: Print
description: Using print node to print messages on the logs
---

The **Print** node allows you to print messages into the app logs. It's a useful tool for debugging and tracking variable values or function outputs during runtime.

### 💡 Common use cases for Print:

- Debugging: see the value of a variable or the result of an expression.
    
- Validating user input: print what a user typed in a form field.
    
- Monitoring app behavior: check if a certain function or condition was triggered.
    
- Logging custom events: record actions like button clicks, page visits, etc.
    

---

### ➕ How to add a Print node

1. Inside the **Circuit**, scroll down to the **Nowa** category.
    
2. Drag and drop the **Print** node into your circuit.
    
3. Next to the `Msg` field:
    
    - You can directly type the message to print.
        
    - Or click on `Msg` to connect it to a variable, parameter, or an expression.


---

### 🔍 Viewing Printed Messages

When you run your app:

- Click the **log icon** in the bottom-left corner of the Nowa editor.
    
- A popup will open showing logs (default tab is Errors—click on **Logs** to view your print outputs).
    

📹 In the example video, we simply added a Print node with a plain message and confirmed it appears in the logs as expected.

<video controls width="850">
  <source src="/img/circuit/common_functionalities/print/print.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>


---
:::info[💻 Local Projects and External Logs]


If you're running your app on a simulator (e.g., iOS simulator):

- You'll see printed messages **inside Nowa**
    
- **Also** in external tools like **VS Code**, if you run the simulator from there.  
    This is because the Print node directly uses Flutter's `print()` inside the generated code.
    
:::
---

### 🧪 Using a variable with the printed message

📹 In the following video:

- We have a `TextField` where the user types their name.
    
- We're using a `TextController` to access that input.
    
- Then we add a **Print** node, and connect its `Msg` to the `text` property of the TextField, so we print the most recent name typed by the user.
    
<video controls width="850">
  <source src="/img/circuit/common_functionalities/print/print_with_var.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

### 🧵 Combining Text + Variables in Print

You can print a mix of static text and dynamic data using two methods:

#### 1. Inline using `$`

Inside the **Msg** field:

- Start typing your message.
    
- When you want to insert a variable, parameter, or expression, just type `$`.
    
- This will open a linking menu — select the element you want to insert.

The final message will look like `message ${variable}`

:::tip
You can inject variables, parameters, and even function results into the message. For example we can inject the result coming from calling a funciton getName like this: 

```dart
"My name is ${getName()}"
```

:::
:::tip
**Note:** You can use the dollar sign **without curly braces** if you're inserting a simple variable or parameter without any property access:

```dart
"My name is $name"
```


However, when referencing something that includes a **dot** (like accessing a property), you must wrap it with **`${}`**, for example:

```dart
"My name is ${textController.text}"
```
:::

This is the same as using `${}` in Flutter (called **string interpolation**), where you embed code inside a string:

```dart
print("My name is ${textController.text}");
```

#### 2. Using a Custom Expression

- Click on `Msg` → choose **Custom expression**.
    
- You can build the message like:
    

```dart
"My name is " + textController.text
```

- Or again, use string interpolation:
    

```dart
"My name is ${textController.text}"
```
:::note[The String in a custom expression should be with **double quotes** ]
**Note:** When using **Custom expression**, the entire expression must be a **string**, so you need to wrap it with **double quotes**, like:

```dart
"My name is ${textController.text}"
```

However, when typing directly inside the **Msg** field, Nowa **automatically wraps** your input with double quotes — so you **don’t need to add them yourself**. Just type your message normally.

:::

📹 In the continuation video:

- We first print the name from the TextField.
    
- Then switch to using a custom expression to enhance the message format.
    
<video controls width="850">
  <source src="/img/circuit/common_functionalities/print/print_custom_expression.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>


