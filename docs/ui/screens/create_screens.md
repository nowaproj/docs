---
sidebar_position: 1
title: Create a screen
description: How to create and modify screens
---

# Screens
*In this section you will learn:*
```
1. Creating a screen with device-default and custom size
2. Modifying screen name
3. Adding a screen from files
3. Deleting a screen from the board and entirely from the project

```

On this page, we will learn how to deal with Screens in Nowa.

### Create new screens

To create a new screen on your board, select the screen tool on the **Toolbar**.

The screen tool lets you select from default sizes or draw your custom size by clicking on the screen icon on the Toolbar and then clicking on any place on the board and dragging.

![](./img/toolbarcustom_screen.png)

![](./img/screengif.gif)


:::note
Don't worry that your app might not look good on screens other than the one you chose, choosing the screen size here is just for you to start designing the layout, but you can make it responsive to different screen sizes easily. More on that in [Layouting in Nowa](../layout/). 
:::


### Modify screen name

You can modify and change the name of your screens by double-clicking the name on the board or by selecting the renaming button at the top of the details panel after selecting the screen.

### Adding screen from the Files library

Screens created can be found also in the Files library and can be added to the board by dragging and dropping them. This will create an instance of that screen on the board. You can also delete them from the project by right-clicking on the screen file inside the files panel and then choosing **Remove**.

:::info

Screens behave as components, meaning that modifying one instance of the screen somewhere will modify all the other instances from that exact screen if exist somewhere else. In other words, if you dropped the same screen file on multiple boards you aren't creating a copy out of it, you accessing the same screen file but from different places. To separate the screen instance you have on the board from the screen file, you need to detach it by **right-clicking on the screen name > Detach**. Read more about that in [Components](../components.md)
:::

![](./img/toolbarassets_panel.png)

### Delete screens

Screens on the board can be removed from the board by **selecting the screen itself > right click > Remove**.

:::caution

Removing a screen from the board won't delete them from the project, it just removes them from the board alone, they can still be accessed from the Files library.

To permanently delete a screen from a project they need to be removed from the Files library.

:::


