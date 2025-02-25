---
sidebar_position: 1
title: Create Global Variables
description: What are global variables and how to create them inside your app 
---

Global variables are a key feature in Nowa that allows you to share data across the entire app. This guide will walk you through how to set up and utilize global variables, making your app more dynamic and interconnected.

## What Are Global Variables?

Global variables are variables that can be accessed and modified from anywhere in your app. Unlike local variables that are confined to a particular screen or component, global variables are accessible app-wide.

### Characteristics:

- **App-Wide Access**: These variables can be used and changed on any screen or component throughout the app.
- **Created Outside Screens/Components**: They are set up independently of any specific screen or component.
- **Organized in Global States**: Global variables are grouped within "Global State" objects, acting as containers for related variables, such as user information (username, profile picture, etc.).

## How to Create Global Variables

Creating global variables involves setting up a Global State and then adding variables to it. Here’s how:

### Step 1: Creating a Global State

1. **Start Neutral**: Make sure no specific screen or component is selected by clicking on a neutral space.
2. **Go to Variables Section**: Look for the "Variables" section on the right side of your screen.
3. **Initiate Global State**: Click on 'create global state'. This is where you'll house your global variables. Name it something indicative of its contents, like "UserState" for user-related data.

### Step 2: Adding Variables to Your Global State

1. **Add a Variable**: Click on the + sign next to your newly created Global State to introduce a new variable.
2. **Name Your Variable**: Give it a name, for example, "username".
3. **Select Variable Type**: By default, it's set as a String, but you can change this by clicking on the icon next to the name.
4. **Edit Details**: Use the editor icon to the right of the variable name to adjust its name, type, or default value.

![](./img/global_create_state.gif)


### Managing Your Global States

- **Detaching a Global State**: If you need to temporarily remove a global state from your app, you can "Detach" it. This doesn’t delete the global state; it just hides it from the current app view.
- **Reattaching Global States**: To bring a global state back into your app, use the "Pick global state" option to select and reattach any previously detached global state.

## Practical Use of Global Variables

Global variables are incredibly useful for managing data that needs to be consistent or accessible across different parts of your app, like user settings, session data, or any shared configurations.

## Summary

Setting up global variables in Nowa is a straightforward process that opens up numerous possibilities for data sharing and management across your app. By organizing these variables into Global States, you ensure that your app remains organized and efficient, facilitating a smoother development process.

In the next steps, you will learn how to use the global variables across the app, and even create and use global functions, so let's keep moving ;)