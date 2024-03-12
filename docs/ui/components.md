---
sidebar_position: 8
title: Components
description: Creating UI components for consistant design
---


# Components

Components are a powerful concept that makes you much more efficient in the design process. It allows you to create reusable widgets that are connected to each other. Components can be easily modified and maintained throughout your app to ensure a consistent design.

## What is a Component?

**A Component is simply a widget or a group of widgets that will be reused in multiple places within your app.**

Instead of duplicating widgets that you need to use in multiple places and then manually modifying each instance if you decided to do a modification, you can create a component out of that widget and use multiple instances of that component across the app.

Any changes made to a single instance will affect all other instances of that Component in the entire app.

**Example:**

Imagine you have a recipe app with a screen displaying cards that hold information about available recipes.

When a user clicks on a card, another screen opens with full details. If you use this card on multiple screens or have multiple cards in a list on the same screen, you should create the card as a Component.

This way, if you decided to change something on the design later (e.g., adding a text widget to show when the recipe was added), the change will be reflected in all instances of the card in the entire app.

## How to create a component

To create a component:

1. Select the widget or group of widgets that you want to create a Component out of.
2. If you select multiple widgets make sure to group them before using  `ctrl/cmd+G`
3. Click on the "Create component" icon button in the top right corner of the details panel.
4. Enter a name for the Component.
5. Click "Create".

![](./img/comp_1.gif)

:::note
The name of each component should be unique, so choose a different name or delete the old component with the name you want to use.
:::

### Creating multiple instances from a Component

Create instances of a component by using copy and paste.
You can copy and paste using:
- `ctrl/cmd+C` >  `ctrl/cmd+C` 
- `alt` + drag
- right click > copy and then right click > paste

![](./img/comp_2.gif)

## Modify the component

When you modify the main component, like change the color of one of its widgets, the modification that you do will also be applied to all the copies of the component. 

The save behaviour applies also when you add a wrapper to the main component.

:::note
You can't edit the design of a component while it's inside a screen. You can only modify it when an instance of that component is outside any screen (just on the board).
:::

![](./img/comp_3.gif)

## Add Variables to a Component

Components become even more powerful when you create variables for the properties.

For example, to make instances of the component show data according to its location, you should connect the components properties with variables.

After creating variables for the component, each instance of that component can have its own data that get passed from the parent screen/component through the variables, allowing for different data to be presented in each instance of the same component while maintaining the same design and layout.

Select the main component and create variables for the desired properties.

Learn more here: [Create Variables](../variables/local_variables/using_vars.md)

![](./img/comp_4.gif)

## Detach Instances from the main Component
 
To disconnect an instance from its original component:

- Select the instance you want to disconnect
- Right click > Detach


This will make the instance independent from its component, and any changes made to the Component will no longer affect the detached instance.

## Delete Components

Removing a components from the design board does not delete the component from the project, the component can still be accessed from the Files Panel.

To **permanently delete** a component:

- Open the files panel and locate the component you want to delete
- Right click on the component > Remove