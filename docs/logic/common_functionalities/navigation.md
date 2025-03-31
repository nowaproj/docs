---
sidebar_position: 1
title: Navigation
description: How to setup navigation between screens
---


# Navigation

Navigation is a core part of building any app. It lets you move between different screens and share information between them. In Nowa, you can use the **Navigator node** to handle all types of navigation smoothly.

---

### 🧭 How to Add Navigation Functionality

To navigate between screens:

1. **Open a function** that belongs to a screen or component
    
    - This could be a screen/component function or a built-in event like `OnPressed` for a button widget.
        
2. Inside the **Circuit** tab, hover over the small dot and **click to add a node**.
    
3. Under the **"Globals"** section, select the **"Navigator"** node (or search for `Navigator`)
    
4. On the right side, in the **Details panel**:
    
    - Beside **"Type"**, select the navigation type:  
        `Push`, `Pop`, `PushReplacement`, or `PushAndRemoveUntil`.  
        _(See explanation below.)_
        
    - Beside **"To"**, choose the screen you want to navigate to.
        

---

### 🎁 Passing Values to the Next Screen

You can pass data when navigating **if the destination screen has parameters**:

- After selecting the screen in the Navigator node, click the **small brush icon** next to its name.
    
- A popup will appear showing the screen’s parameters.
    
- For each parameter:
    
    - Manually enter a value
    - Or click on the parameter type to open the **linking menu**, where you can:
        
        - Connect it to a local variable or parameter
        - Use the result of another function
        - Pass an expression (can be using expression builder or using custom expressions)
This video demonstrates how to add navigation to a blog screen, passing parameters like title, content, and image. The values are provided using local variables from the first screen.

<video controls width="850">
<source src="/img/circuit/common_functionalities/navigation/navigate_with_param.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>


---

### 🔁 Navigation Types Explained

Understanding how screens stack is key to knowing when to use each navigation type:

#### 🧱 The Stack Concept

- Imagine your screens as **a stack of layers**.
    
- When you **Push**, you **add a new screen** on top of the stack.
    
- When you **Pop**, you **remove the top screen**, revealing the one below.
    

#### Navigation Types:

|Type|What it does|Use Case|
|---|---|---|
|**Push**|Opens a new screen on top|Go from Home to Product Details|
|**Pop**|Goes back to the previous screen|After submitting a form, return to the list|
|**PushReplacement**|Replaces the current screen|Go from Login to Home and prevent going back to Login|
|**PushAndRemoveUntil**|Opens a new screen and removes all screens below|After onboarding, go to Home and clear all previous steps|

---

:::warning[Use Navigator only inside screens/components]

- The **Navigator node must be used inside a screen or component**.  
    This is because it relies on the `context`, which is only available within screens or components.
    
- You **cannot** use the Navigator inside a **Global State** function for example.
:::

---

### 🔄 Returning Data with `Pop`

Sometimes, you need to **return data from the second screen back to the first**. Here’s how to do it:

#### 🧪 Example: Entering a Name

**Screen 1:**

- Has a variable called `name` linked to a Text widget.
    
- Contains a button that opens **Screen 2**.
    

**Screen 2:**

- Has a TextField (with a `textController`).
    
- Contains a button to submit the name and go back.
    

#### 👉 Steps to Set It Up

**On Screen 1:**

1. Add a Navigator node of type **Push** to go to **Screen 2**.
    
2. Enable **await**, and **store the result** in a variable like `result`. 

Here's how the node will look like in the end:
![](/img/circuit/common_functionalities/navigation/push_with_await.png)

:::tip[Use OnValue as an alternative to await]
Instead of using await, you can handle the result by adding the rest of your logic inside the OnValue callback. This will run automatically when the user returns from the second screen to the first.
:::

3. After the Navigator node, **set `name` = result**, and **call Refresh**.

Here's how to build the full logic:   
<video controls width="850">
  <source src="/img/circuit/common_functionalities/navigation/navigator_push_await.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

**On Screen 2:**

1. Use a TextField with a controller `textController`.
    
2. For the button:
    
    - Add a Navigator node of type **Pop**.
        
    - For **Result Type**, choose the type of the data you want to send back, which is `String` in this example.
        
    - For **Result**, set it to `textController.text`.

Here’s how to add a Navigator node with Pop and return a value to the previous screen. At the end, you’ll see the final result in action.

<video controls width="850">
  <source src="/img/circuit/common_functionalities/navigation/pop.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>


✅ Now, when the user types their name in Screen 2 and goes back, Screen 1 will receive the name and update the Text widget accordingly.

---

Navigation in Nowa is powerful and flexible. Once you understand how screens stack and how data can be passed and returned, you can create smooth and dynamic user flows in your apps.




