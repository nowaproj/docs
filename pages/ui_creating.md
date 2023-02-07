# Intro to UI design 


>Nicer for the eye👁️‍🗨️, closer to the heart💓! 

*Creating an app with a nice design holds a alot of value for your app! therfore You creating an awsome designs easily is our top prioirty!*

We aim to make creating UI with Nowa feels like freehand drawing!  

*In this section, you will learn about:*
```
1. Creating screens with different sizes
2. Create UI Boards
3. Use Widgets and drawing tools
4. Use the outline panel for controlling the widget trees
5. Use Assets panel to access files, see code, and create items.
```
--- 
When creating a new project or opening an exisiting one, the UI design window will be opened by default. 

You already got some overview about the tools from the [Getting Started](../getting_started.md) page, but in this one we will dive together into little more details.


## Creating a screen
To create a new screen, click on the `Screen` tool from the drawing panel on the left side, then click on an an empty place on the baord to create a screen. The size of the created screen will be by default the size of `Pixel 3a`.

What if you want another screen size? it's simple. When selecting the screen tool and before you clicking on an empty place on the board, you will see multiple screen size options inside the `details panel` on the right size. Select the size you want, then click on an empty place to create the screen. See the image below:

<img src="../media/gifs/create_screen.gif"  width="80%" > 

What if you feel creative and you want a custom size? Of course you can do it! After selecting the `Screen` tool, click on an empty place on tha board, then keep holding and drag to create a screen in the size you want. See the image below:

<img src="../media/gifs/create_custom_size.gif" width="80%">




## Boards 
You can create all your app screens in the same default baord, which will make you able to move fast between them. But when you have an app with alot of screens, it can get messy. In this case a little bit of organising will be a nice option! with Nowa, you can create new boards where each one hold part of your screens.

To see the boards you already have, click on `Assets` Panel, then open `lib` folder. There you will find all your boards. Click on any board to open it.

To create a new one, click on `Add`, then on `New board`, write down the new name then click on `Create`. See the image below:

<img src="../media/gifs/create_board.gif" width="80%">

## Widgets and shapes
Widgets and shapes are your magical building boxes to create your nice UI. By drag-and-drop, you can build the UI you want. After dropping the widget or drawing the shape, use the `Details panel` on the right to customise its parameters.  

<img src="../media/images/widgetvsdrawing.png" width="20%">

Nowa gives you a flexible ways to build your UI. For exmaple, to build an `AppBar`, you can drag and drop the `AppBar` widget directly and customize it using the `details panel`. See the following image: 

<img src="../media/gifs/appbar_widget.gif"  width="80%" > 

But if you want to have more control of the appearance of the `AppBar`, you can build one from scratch using the drawing tools. For example, use the shape tool to draw a shape that look like an AppBar, customize its boarders, colors and other properties, and drop a text inside or a button, exactly like you are sketching the UI using a mockup tool.

> Making your custom AppBar responsive will be by connecting the design with variables that will change during the runtime. You will learn about it later in the documentation, or you can watch some of our tutorials on [Youtube](https://www.youtube.com/channel/UCvP7LKeb2sW1yTUqHAFEKOw).

<img src="../media/gifs/draw_appbar.gif"  width="80%" > 


## Using the `Outline` Panel 

The `Outline panel` gives you a full overview about the screens avalible on the board with their widget tree. Not only that, you can also do the following: 

1. Select a widget from the outline to change it’s parameters from the `Details panel` (which is on the right side).
2. Change a widget location in the tree within the same screen or move it to another screen by drag and drop. For example, by dropping a `Text` widget over a `Container` widget in the outline, the `Text` widget will become a child for `Container` widget, but if the drop happens in the thin line above or below the `Container` widget, then the `Text` widget will be on the same level as the `Container` (if the parent of the `Container` widget is a widget that allows multiple childrens, like a `Stack` or a `Column` widget). See the following image:

<img src="../media/gifs/dragging_outline.gif"  width="80%" > 

3. By right clicking on a widget, you can:
   * Remove it from the tree (or using the shortcut: `Delete` on the keyboard)
   * Replace it with another widget
   * Create a component from the widget 
   * Create a group (`Stack` / `Column` / `Raw` ) after selecting a group of widgets
   * Copy the widget

<img src="../media/images/rc_outline.png" width="40%">


## Using the `Assets` Panel 

You can see all your project files using the `Assets panel`. Those files are Dart files, boards, and assets (images, fonts, etc). For every screen there’s a code file that you can access inside `lib` folder. By selecting any file you can see the dart code on the `Details panel`.  

<img src="../media/gifs/show_code.gif"  width="80%" > 

By clicking on `Add` you can create a new item (`Board`, `Folder`, `Component` or an `Object`).
>Object is a Dart class that will hold a group of variables. It will be used to move data across the app and within external API’s. 

<img src="../media/images/add_assets.png" width="40%">

> Renaming or deleting files by right clicking on any file inside the project folder (or use `Delete` shortcut ). 

> When you drag and drop any asset file (image, font, etc), it will be automatically added to the `assets` folder inside the project folder. 



