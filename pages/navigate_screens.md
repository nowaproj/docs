# Navigate between screens
*In this section you will learn:*
```
1. How to navigate between your app screens using Nowa Visual Programming
```

To implement the functionality of navigation between screens, we need first an event that will trigger moving to another screen *(if you don’t know what events are, take a look on [how Nowa Visual Programming works](nvp_intro.md))*.

You can use a widget with events (like a `Button`) or wrap any widget you have with `GestureDetector` to give it the ability to detect clicks and have clicking events. 

In this simple example we will use a button to move from the Home screen to another screen, so let’s get into it:

1. After creating two screens, Add a `Button` widget to the home screen, then select the button and click on `+` sign beside the `On Pressed` event to add a functionality to the clicking event
2. Inside NVP, drag a line from the event block `On Pressed` and drop it. A list of blocks will appear, from that list choose `navigate`. 
3. Within `navigate` block, choose the screen name to move to when that button is clicked. That’s it, now click on `Play` to see your app.

<img src="../media/gifs/moving_screens.gif" width="80%">


>If the screen you want to navigate to has variables, they will appear in the `navigate` block. You can then attach variables to them to send them to the other screen while moving.

>By adding `AppBar` in the second screen, a back button will be automatically added to return the user to the previous screen.

>Be sure one of your screens is chosen as a home screen before clicking on `Play`.
