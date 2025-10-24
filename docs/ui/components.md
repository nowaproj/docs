---
sidebar_position: 8
title: "Components"
description: Create reusable UI components to maintain consistent design across your app.
---

Components are a powerful feature that helps you design more efficiently and keep your app consistent.  
They let you create **reusable widgets** that stay connected — so when you make a change in one place, it updates everywhere.

:::note
You can find all your components inside the [Widgets Panel](./widget-panel.md).
:::

---

## What is a Component?

A **Component** is a widget or a group of widgets that you plan to reuse across multiple parts of your app.

Instead of duplicating the same widget in multiple places and manually updating each one,  
you can create a **Component** once and use its instances wherever needed.

Any change you make to the **main component** will automatically update all its instances across your app.

**Example:**

Imagine you’re building a recipe app that displays recipe cards on multiple screens.  
When a user taps a card, they see detailed information about the recipe.

If the same card appears on different screens (or multiple times on the same screen),  
you should create it as a **Component**.  
That way, if you decide to tweak the design — for example, by adding a “Date added” text —  
the change is instantly applied to all cards throughout your app.

---

## How to Create a Component

To create a new component:

1. Select the widget (or group of widgets) you want to turn into a component.  
2. If you’ve selected multiple widgets, **group them first** using `Ctrl/Cmd + G`.  
3. Click the **“Create Component”** icon in the top-right corner of the **Details panel**.  
4. Give your component a **unique name**.  
5. Click **Create**.

<video controls width="720">
  <source src="/img/designer/Clipboard-20251002-103334-808.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

:::note
Each component name must be unique.  
If the name already exists, choose a different one or delete the old component first.
:::

---

### Creating Multiple Instances of a Component

Once a component is created, you can use multiple instances of it throughout your app.  
There are a few ways to duplicate a component:

- `Ctrl/Cmd + C` → `Ctrl/Cmd + V`  
- Hold `Alt` and drag  
- Right-click → **Copy**, then right-click → **Paste**

---

## Modifying a Component

When you modify the **main component** (for example, change a color or add a new widget),  
the update automatically applies to **all its instances** in your app.  
This ensures design consistency everywhere.

The same applies when you **add a wrapper** around the main component —  
that structure will also be reflected in every instance.

⚠️ **Important:**  
You **cannot** edit a component’s design while it’s inside a screen.  
To edit it, drag an instance **outside of any screen** onto the board.

<video controls width="720">
  <source src="/img/designer/Clipboard-20251002-104038-822.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## Adding Variables to a Component

Components become even more flexible when you connect their properties to **variables**.  
This lets each instance display different data while keeping the same design.

For example, in the recipe card scenario, you can use variables to show different recipe names, images, or dates in each card instance.

To add variables:
1. Select the **main component**.  
2. Create variables for the properties you want to make dynamic.

Learn more here → [Create Variables](../vars-params-functions/create-variable.mdx)

<video controls width="720">
  <source src="/img/designer/Clipboard-20251002-104325-541.mp4" type="video/mp4" />
  Your browser does not support the video tag.
</video>

---

## Detaching an Instance from Its Component

If you want to make a component instance independent:

1. Select the instance you want to detach.  
2. Right-click → **Detach**.

The instance will no longer be linked to its original component,  
and future updates to the main component won’t affect it.

---

## Deleting Components

Deleting a component from the board **does not** remove it from your project.  
You can still find it inside the **Files panel**.

To **permanently delete** a component:

1. Open the **Files panel** and locate the component.  
2. Right-click on it → **Remove**.
