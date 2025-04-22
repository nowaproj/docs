---
sidebar_position: 1
title: What is Circuit
description: Introduction on using Circuit to build logic
---

# Introduction to Circuit

## What is Circuit?
Circuit is the way you build logic in Nowa. It works by connecting nodes together to create a logic graph that will be executed sequentially. 

This visual approach allows you to define how different operations and conditions interact within your application.

## How to Access Circuit
You can access Circuit when working with functions in Nowa. 

When creating a new function inside a screen or component, select it and click on **"Edit"** to open Circuit. 

For events—functions that are triggered by specific actions, such as the **On Pressed** event for a button widget—you will find an **"Edit"** option next to the function. Click it to modify the logic.

For the following example, click on "Edit" to open the function in Circuit, then click on the small circle below the function name to add a node below. \

![](/img/circuit/intro/add-nodes.png)



## How Does the Circuit Work?
The logic consists of **nodes** connected in a **vertical structure**. 

At the **top of the graph**, you will see a **yellow node** representing the function name. Selecting this node allows you to create **parameters** for that function.

To add new nodes, click on the **+** button below an existing node. A menu will open, displaying available nodes to construct your function. 

The **execution flow** follows a **top-to-bottom approach**, meaning nodes are executed **sequentially** from top to bottom.

Let's see a small example on how Circuit executes a logic. In the following example, we have a function called "loadData".

The first node, which is right below the function name, loads an integer from the local storage and store it in a new variable called `tempDailyGoal`. This node called Value node since it generates a value (the value from the local storage). 

Then, there's an if statement node, which will determine the flow of the logic according to a condition `tempDailyGoal != null`, which if true, then the flow will go on the right path.

![](/img/circuit/intro/load-data-example.png)


## Types of Nodes

### Action Nodes
These nodes execute actions without returning a value. 

Examples include **Print** (outputs information), **Refresh** (reloads a screen), and **Clear** (removes stored data in SharedPreferences).

### Value Nodes
These nodes return a value that can be used later in the logic. 

Examples include calling another function that **returns a result** or performing **math or logical operations** like division or comparison. 

If a node returns a value, a **"Store result"** section appear in the details panel of the node, allowing you to **store the result in a variable** (either new or existing). 

For example, a division node under **"Operators"** category can be used to determine the division of two values. This node will return the result of the division, which then can be stored in a new variable or existing one.

:::tip[Mixed nodes]
Some nodes can function as both action and value nodes. A good example is a function node that **performs an action and returns a result**, such as fetching data from an API and returning the response.

Any node that retuns something will have the section of "Store results" appears below
:::


### Control Flow Nodes (Compound Nodes)
These nodes **control the execution path** based on conditions. For example:

- **If Node** directs execution to the **true** or **false** path based on a condition.
- **Try Node** follows a default execution path but switches to an **"On Error"** path if a failure occurs.

## Managing Nodes

### Deleting a Node
Click on the node, then **right-click** and select **Remove**, or select the node and press **Delete** on your keyboard.

### Moving a Node Up or Down
Select the node, then **right-click** and choose **Move Up/Move Down**, or use **Shift + Up/Down Arrow Keys** to move it up or down.

## Returning Values in Functions
If a function has a **return type (not void)**, such as an **int-returning function**, use the **"Return"** node at the end of the function to return the final result.

## Creating Local Variables in Circuit
The **"Create local variable"** option allows you to define a **temporary variable** that exists only within the function. 

Unlike **screen/component-level variables**, these local variables are **deleted after execution**, so it's used temporsrty to hold a value returned from one of the nodes to be used in another node below.

:::tip[See and modify the generated code by the Circuit]

While you are building the logic, you can see the generated code right away! If you are using the hybrid approach (having your project locally while opened in an IDE on the side), you can open the same file there and see the generated code update in real time when modifying the circuit, such as adding a node.
If you are not using the hybrid approach, you can close the circuit and head to the code section of the file to see the generated code. You can also modify the generated code of the function, and the result will sync back to Circuit.
:::

## Future Topics
The **Menu nodes** will be explained in a later section.

Circuit provides a powerful way to define logic visually, ensuring clarity and efficiency in function execution. 




