---
sidebar_position: 4
title: Update UI using state variables
description: How to add logic that controls variables in your app 
---


*In this section, you will learn:*
```
1. How to update the UI using state variables
```

To create interactive and dynamic UIs, you need to connect widget properties that you want to change dynamically with variables. In the [Creating Variables](./create_variables.md) section, we discussed the difference between read-only (non-state) and non-read-only (state) variables. State variables can be changed after the widget has been loaded and displayed on the screen, allowing you to dynamically update the UI.

In this guide, we'll demonstrate how to update the UI by changing a state variable connected to a widget property using Circuit.

## Updating State Variables with Circuit

1.  Create a state variable to one of the widget properties that you want to change
2. Open Circuit to create logic to be executed for a specific action, such as **On pressed** event for **Button** widget or **Gesture Detector** wrapper
3. When clicking on the state variable name inside the **Locals** section in Circuit, you will see **Get** and **Set** options. **Get** allows you to read the variable value and use it as input to another node, while **Set** lets you change the variable to a new value. To update the variable, choose **set** then connect the input pin for the **Set** node for that variable to the value that you need to change it to, you can enter the value manually in the node itself or use the output of other nodes as the input for that **Set** node.
5.  After changing a state variable, add the **Refresh** node to the flow to update the UI. The **Refresh** node won't be visible if all variables in the Screen/Component are read-only.

:::info 
Non-state variables don't have the **get** and **set** options, as they can only be read as inputs to other nodes but not set to new values. Therefore you will see only the name of the variable listed in the section **Locals** which is used as **Get** only 
:::



### Example: Changing an Image on Button Press

In this example, we'll build an app that changes an image when a button is pressed, the image will be displayed online images using the **url** property.  

1.  Create a state variable called **imageURL** for the **url** property of the **Image** widget, allowing you to control the property dynamically with a variable. Set the variable to be a state variable (uncheck the read-only option).
2.  Add logic to the button by selecting it and clicking on the **On Pressed** field. This logic will execute when the user presses the button.
3.  Inside Circuit, click the plus button next to the "OnPressed" node to add the next node to the logic flow.
4.  Select the **imageURL** variable in the **locals** section. Choose **set** and enter the new URL for the **imageURL** variable after the button is clicked.
5.  Add a **Refresh** node at the end of the flow. The **Refresh** node is also found within the **locals** section.

Now, when you play the app and click the button, the image URL will change from the initial value to the new one, updating the image displayed in the UI.

![](./img/update_var_state.gif)


:::info
Making a variable private is a common practice for state variables since you want the state variable to be updated within the screen itself so you want to hide it from being accessed from outside. 

Usually, the variables that are non-state are public, since their default value is usually set from outside the screen, like a previous screen or an API source, so they should be accessed from outside the screen/component, but for state variables, it's usually that they change according to the user interactions inside that screen or component, and they don't need an initial value to be passed from outside. 

In case of the initial value of the state variable to be received from outside, a common practice is to create two independent variables, one is non-state and public for receiving the value from outside, and another one is state and private variable for updating the UI state inside the screen or component. The initial value for that state variable is then set up to be the value of the other non-state variable that receives its value from outside. This concept is known in software development as encapsulation. 
:::
