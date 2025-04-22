---
sidebar_position: 1
title: Dialog
description: How to show Dialog popup 
---

# Showing Dialogs

Dialogs are popups that show up in the middle of the screen, usually to give users some important message or ask them to make a choice.

You can use a dialog to:

- Confirm actions (e.g., "Are you sure you want to delete this item?")
    
- Show a warning or error
    
- Ask the user for simple input (like a name)
    
- Display custom content like terms and conditions or login prompts
    

---

## Showing a Basic Dialog

To show a dialog in Nowa, follow these steps:

1. In your screen or component, find the function where you want the dialog to appear. For example, this can be the `OnPressed` event of a button, or a funciton you create inside a screen/component.
    
2. Click on the small circule to add a node inside the function. The nodes menu will open.
    
3. Under the `Nowa` category, choose the `showDialog` node.
    
4. A default `AlertDialog` widget will be created as the `builder` of the dialog. This is the actual content that will be shown.
    
5. Click on the `AlertDialog` to replace it with another widget if needed or with a component that you built before. (It's recommended to use the `AlertDialog` widget for dialogs. You can customize its UI as needed).
    
6. Click the **brush icon** next to `AlertDialog` to edit the widget UI.
    
7. Inside the AlertDialog details panel, you can for example:
    
    - Change the **title text**
        
    - Edit the **background color**
        
    - Customize the **buttons** (actions)
        
8. For example, to change the title, click the brush next to `Title`, then change the text to whatever you want.
    
9. Now run the app. When you click the button, the dialog should appear with your custom text.
    
This videos shows how to show a simple dialog:
<video controls width="850">
  <source src="/img/circuit/UI_popups/dialog/show_basic_dialog.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## Understanding showDialog Properties

When you add the `showDialog` node in Nowa, you’ll see a panel of properties on the right. These let you control how the dialog behaves and looks. Let’s go through them one by one, as shown in the screenshot:

![](/img/circuit/UI_popups/dialog/showDialog_options.png)


#### ✅ **Context**

- This is required to show any dialog. It tells the system where in the widget tree the dialog should appear.
    
- It’s usually set automatically to the current screen or component.
    
Note: using showDialog should be inside a screen or component function or event. 

#### 🧱 **Builder**

- This is the actual widget that will be displayed inside the dialog—by default, it’s an `AlertDialog`.
    
- You can change it to any other widget by clicking on it then choosing `Pick widget`. You can change it to another widget, or a custom component that you created before
    
- Click the **brush icon** next to it to customize the content inside the dialog.
    

#### 🚪 **Barrier Dismissible**

- If enabled, the dialog will close when the user taps outside of it.
    
- Turn this **off** if you want the user to be forced to take an action (like confirming or cancelling).
    

#### 🎨 **Barrier Color**

- Sets the background color behind the dialog.
    
- Usually a semi-transparent black is used to focus attention on the dialog.
    

#### 🔤 **Barrier Label**

- An optional label for accessibility purposes (e.g. screen readers).
    
- You can leave this as `null` unless you want to customize the accessibility message.
    

#### 🛟 **Use Safe Area**

- If enabled, the dialog avoids system UI elements like notches, status bar, or bottom navigation.
    
- It’s usually good to keep this **on** for a better layout on all devices.
    

#### 🌐 **Use Root Navigator**

- When set to true, the dialog uses the root-level navigator.
    
- Useful in complex navigation setups like nested navigators or modals.
    
- If you’re unsure, leave it **off**.
    

#### ⚙️ **Route Settings**

- This lets you define advanced routing options like the dialog’s name or arguments.
    
- Not commonly used unless you have custom route behavior.
    

#### 🎯 **Anchor Point (X, Y)**

- This defines the position the dialog animates from.
    
- By default, it's set to (0, 0), which means the center of the screen.
    
- You usually won’t need to change this unless you're doing special animations.
    

### 🧪 Future Options

These control how to handle the result returned from the dialog:

#### ⏳ **Await**

- Enable this if you want to pause the current function and wait for the dialog to return a value.
    
- Useful when you want to make decisions based on user input in the dialog.
    

#### 🔁 **OnValue**

- Instead of using `await`, you can use `onValue` to create a function that runs when the dialog returns a result.
    
- This is helpful for running logic _after_ the dialog closes without pausing the rest of your function.
    
- Inside this function, you get a `value` variable, which is what the dialog returned.
    

#### ⚠️ **OnError**

- If something goes wrong when opening the dialog (very rare), this function will run.
    
- You can use it to show an error message or log the issue.
    

#### 📥 **Store Result**

- When `await` is enabled, you can choose a variable to store the result returned from the dialog.
    
- This result can be a string, number, boolean, or anything returned using `Navigator.pop()` inside the dialog.
    

These options give you full control over both the design and behavior of your dialogs. Whether you're confirming an action, customizing animations, or handling returned data—Nowa's visual dialog system makes it easy to implement.

---

## Designing Your Own Custom AlertDialog

Instead of customizing the UI of the `AlertDialog` inside the Circuit, you can drop `AlertDialog` widget on the board, customize it's UI, make a component out of it, then  use that component as the `builder` for `showDialog`.

This makes it possible to reuse the same component you designed in different nodes where you are showing a dialog. 

To do so:

1. Drop an **AlertDialog** widget on your board and design it however you like—add icons, images, texts, buttons, etc.
    
2. Once you’re happy with it, turn it into a **component**.
    
3. Go back to the `showDialog` node, and change the `builder` to use your newly created component.
    

Now when the dialog is shown, it will use your custom design instead of the default.

---

## Returning Data from Dialog

You can return a value from a dialog—just like using `Pop` for `Navigator` node. Click here to read more about [using the Navigator node](../common_functionalities/navigation.md)

Here's how it works in Nowa:

### Using `await`

1. In the `showDialog` node, click **`await`** to wait for the dialog to return a result.
    
2. Choose **`store result`** and create a variable to hold the returned value.
    
3. Pick a data type (e.g., `String`) based on what you expect the dialog to return.
    

Inside the dialog:

- Add a button as part of the `actions`.
    
- In the button’s action, add a `Navigator` node with type `pop`.
    
- Choose the **result type** and set the **result value** you want to return (e.g., a text input, a choice made, or even a static string).
    

Now the result is stored in the variable you created and can be used later in your function.

To see more about that, check using Pop inside [Navigator node](../common_functionalities/navigation.md)

### Using `OnValue`

If you don’t want to use `await`, you can create an `OnValue` function instead:

- Add a new function and set it as `OnValue` for the dialog.
    
- Inside the function, you’ll see a `value` parameter.
    
- This `value` holds whatever was returned from the dialog. Use it directly within the function.
    

This method is useful when you want to avoid stopping your function while waiting for the dialog to return.

---

That’s it! Now you know how to show dialogs in Nowa, customize them, and even get data back from them—everything you need to create polished user experiences.



