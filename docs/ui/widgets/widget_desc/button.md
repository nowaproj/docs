---
sidebar_position: 3
title: Button 
description: How to use button widget
---

# Button

The Button in Nowa is a widget that lets initiate actions, from sending an email, to sharing a document, to liking a post.

To add a Button to your screen, select the Widget picker and look for the Button Widget.

### Customize the Button
From the details panel of the Button, you can customize its appearance:
- Change the content of the Button by modifying the text properties. (To lean more about it here: [[Text]]).
- You can modify the color of the Button in the details panel.


### Add Gesture
To make the button interactive, go in the details panel and you will see there that you can add functionalities for the gestures: "On Pressed" and "On Long Press". 
#### Example:
If you want to make the user navigate from a screen to another when clicking on a button:
- Go on the details panel and select the "Edit" next to "On Pressed".
- This will open a [[Circuit]] window. 
- Connect a "navigate" block to the "On Pressed" action. 
- From the "navigate" block, select the screen you wish to make appear when clicking on the button.
- Test the functionality by opening the Play Mode.

💡 Learn more: [[Navigate between screens]]


Buttons let's you do so much more that just navigation. If you want to discover more about how to build functionalities in Nowa, check out: [[Circuit]]
