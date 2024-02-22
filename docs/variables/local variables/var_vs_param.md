---
sidebar_position: 1
title: Variables vs Parameters
description: Difference between variables and parameters in Nowa 
---

## Understanding Variables and Parameters in Nowa
Building apps with Nowa means creating interactive and responsive experiences without writing code. A key part of this process involves using variables and parameters to manage data and control how your app behaves. Let's simplify these concepts to make them easy to grasp.

### What Are Variables?
Imagine variables as containers within your app that store information. This information can change based on what users do or what happens in your app. Variables are like the app's memory, remembering and updating information as needed.

#### Key Points About Variables:
Location: Variables live within a specific part of your app, like a screen or a component.
Changeability: They are designed to change. As your app runs, variables can be updated to reflect new information or states.
Effect on the App: Changing a variable can also change how your app looks or behaves. For instance, if your app is playing music, a variable could change the play button to a pause button when the music starts.
Privacy: They are private to the part of the app where they're created. Think of them as personal thoughts of a screen or component that aren't shared with others.
#### Example:
In a music player app, you could have a variable called "isPlaying" that tracks whether music is playing. When a user presses the play button, "isPlaying" changes to true, and the app shows a pause icon, indicating the music is playing.

### What Are Parameters?
Parameters are like initial settings or information that you pass into screens or components when they start. They're the basic details your app parts need to know from the get-go. Unlike variables, parameters don't change once they're set.

#### Key Points About Parameters:
Purpose: They're used to pass information into a part of your app, like a screen or component, from somewhere else.
Stability: Once set, parameters stay the same. They're like the fixed settings on a device that you don't change often.
Visibility: Parameters are more public. They're like the information on a name tag that tells other parts of your app what this screen or component is supposed to display or work with.
Example: If you have a screen that shows blog articles, parameters might include the article's title, content, and images. These are passed into the screen so it knows what to display.
Example:
Let's say your app has a screen for displaying blog posts. The screen needs to know which blog post to display, so it uses parameters like "title", "content", and "imageURL" to receive this information from another part of the app.

## Creating Variables and Parameters
Here's how you can add variables or parameters to your app in Nowa:

1. Choose a screen or component where you want to add a variable or parameter.
2. Look for the "Variables" section in the details panel on the right side.
3. Click on the "+" next to Variables or Parameters to add a new one.
4. Name your variable or parameter and set its type, such as String for text, Number for numbers, and so on.

![](./img/add_var.gif)

If you need to, you can edit its name, type, or default value later.

## Understanding the Differences
While both variables and parameters help manage data within your app, they serve different purposes:

- **Visibility and Accessibility**: Parameters are like public information, accessible from outside the screen or component they belong to, because they are meant to receive data. Variables, on the other hand, are private and only changeable within their own screen or component.

- **Changeability: Variables are dynamic**; they can change as your app runs. Parameters are static; once they are set, they don't change.

- **Connection to UI**: Both can be linked to what the user sees but in different ways. Parameters set up the initial conditions or settings, while variables can update the screen or component based on new data or user interactions.
By understanding and using variables and parameters correctly, you can make your Nowa app more dynamic, responsive, and tailored to the user's needs.
