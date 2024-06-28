---
sidebar_position: 2.5
title: Navigate between files 📁
description: How to use Nowa files panel
---

# Navigating Between Project Files in Nowa

This guide will help you understand how to find and manage your project files quickly and easily. Let’s dive into the new and improved files panel.

## Understanding the Files Panel

We've changed the files panel from a popup to a permanent panel on the left side of your screen, right next to the Outline panel. This makes it easier and faster to get to your files.

### Types of Files You'll See

In the files panel, you can access different kinds of project files:

- **UI and Logic Files**: These are your `.dart` files that include screens and components with their functions.
- **Data Files**: Here, you find files like API and Firebase configurations important for your app’s data management.
- **Assets and Boards**: This section includes images, fonts, animations, and your created boards.

### How to Use Files

- **Editing Files**: Simply double-click on a file to open and edit it. For example, API files can now be edited right from here, without having to navigate to the API section in Nowa.
- **Drag and Drop**: You can drag screen and UI component files directly onto the board to work on their UI.

### Details on Specific Files

- **.dart Files**: Clicking a `.dart` file opens it up inside Circuit, where you can add and tweak its functions or parameters, and view it's source-code (by clicking on the `<>` icon on top right)
- **UI Files**: To work on the UI, drag the `.dart` file to the board where you can see and edit its visual elements.

![](../img_releasenotes/1.7.0/file-panel.gif)

## Organizing Files

The files panel has three sections:

- **`lib`**: Contains all your main files like screens, APIs, and objects.
- **`boards`**: Shows all the boards you have in your project.
- **`assets`**: Where you manage uploaded materials like images and fonts.

### Adding and Managing Files

- **Add New Items**: Use the `+` icon next to `lib` and add a new UI component, Object, Folder, or global state object.
	- After adding a global state object, you need to add it to the `Globals` by opening any board, then choose `Pick up globals` inside the variables section (be sure nothing is selected). For more, read how to add global variables 
- **Upload Assets**: Use the upload icon next to the assets section to bring new files into your project.
\
### Move files to a folder
Use drag and drop to move any file into a folder you created. 

### Quick Tips for Faster Access

- **File Search Shortcut**: Press `Ctrl/Cmd + O` to open the file picker quickly, which helps you find and open any file or board instantly.

![](./img/open-files-picker.gif)


## Wrap-Up

With this files panel, moving through your project is way more smooth. It will keep your focus on creating great apps and not waste energy navigating through your project :)