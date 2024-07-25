---
sidebar_position: 2 
description: What's new
---
# What's new

> Discover the latest features and enhancements for each version of Nowa. For more details, check the [changelogs](./change_log.md)

### 1.7.3 (25 July 2024)

We have released several essential improvements to enhance your App building experience with Nowa! Let's see how:

#### **New ✨**

**A complete new ListView and GridView widgets**: These widgets make displaying data easier and more efficient than ever. They come with two modes: `Builder` and `Normal`. The `Builder` mode renders only what is needed at each moment, improving performance when displaying large amounts of data. Read more here about [Using Listview](./ui/widgets/widget_desc/listview.md) and [Gridview](./ui/widgets/widget_desc/gridview.md)

  - Use the `Builder` mode for efficient rendering of large datasets

  :::tip
 For displaying data from an API, Firebase, Supabase, or a variable, use `ListView` and `GridView` instead of the older way of using [Group](./ui/layout/groups.md).

Read [this article](https://community.nowa.dev/t/when-to-use-listview-and-gridview-and-when-to-use-groups/396) to learn when to use `Group` and when to use `ListView` or `GridView`

  :::

**New Linear Progress Indicator**: Along with the circular progress indicator, you can now display a linear progress indicator. [Read more here](./ui/widgets/widget_desc/linear_progress_indicator.md)

  - Set the progress value to indicate task completion
  - Customize the color and background to match your app's theme

**Text Overflow Options**: You can now set behaviors for the Text widget when there's not enough space to show all the text. Options include `clip`, `ellipsis`, and more. [Read more here](./ui/widgets/widget_desc/text.md)

  - Choose `clip` to cut off the extra text
  - Use `ellipsis` to show dots where the text overflows

#### **Enhancements 👀**

**Nowa Error system got more POWER now**: The error system can detect more errors faster and provide detailed information in the Error panel. This ensures a smoother development experience by quickly informing you of issues that need attention.

  - Instant error updates for quicker debugging
  - Detailed error descriptions for better understanding and resolution

### What's Coming Next 👀
We are working on a much better API system to allow powerful integrations!

#### New Learning resources 📜
- [Adding Splash screen](./mini_tutorials/splashscreen.md)
- [Design course: Build a Football App](./design_courses/football_app.md)
- [Design course: Build a E-commerce App](./design_courses/ecommerce_app.md)
- [Design course: Build a Hotel Booking App](./design_courses/booking_app.md)

### 1.7.0 (28 June 2024)
We released a new way to deal with files. It's now easier than ever to navigate between the different parts of your project in one place!

#### **New ✨**

  **A complete new Files panel**: Everything now is organised in files, from the screens and components, to API calls and Firebase queries, to objects and even boards. [Read more here](./ui/files_panel)

  - Access the new files panel by clicking on "Files" tab next to the Outline on the left
  - Drag and drop files to the board to edit their UI
  - Click on any files to open it's editor. API files will opened in theit API editor, Screen/components file will be opened inside Circuit, etc.
  - Click on `+` next to `lib` to create new `component`, `object`, `global state`, etc
  - Click on `+` next to `boards`  to create a new board (or from the tabs)
  - Ctrl/CMD + O to open files panel to search and open files and boards quickly!

![](./img_releasenotes/1.7.0/file-panel.gif)


#### **Enhancements 👀**

**Nowa Error system got more POWER now**:  The error system in able to detect more erros for now. For example, the error system will notify you if you are using a variable that was deleted in a widget

#### Learning resources 📜
- Build a Stunning AI Chef chat assistant 🧑‍🍳 using ChatGPT [Youtube video](https://www.youtube.com/watch?v=oimUrWjef10)
- New Wrapper docs for
  - [Text Direction](./ui/wrappers/text_direction)
  - [Visibility](./ui/wrappers/visibility)
  - [Gesture detector](./ui/wrappers/gesture_detector)
  - [Material](./ui/wrappers/material)



#### 1.6.1  (31 May 2024)

You can now build fully customized AudioPlayer inside your app! We also introducing pre-built components, checking current platform with other improvements and bug fixing!

![](./img_releasenotes/1.6.1.png)


#### **New ✨**

- **Build a fully customized AudioPlayer**: It’s time for you to build a fully customized Audio player for your app! There’s multiple ways to so:

  - Use a full Screen template: you will find AudioPlayerPage screen that has a full Audio player screen already built-in.

  - Use the pre-built Audio player component: we have introduced a new tab inside the Screen panel called Components. Inside, you will have already-built components such as a newAudioPlayer component.

  - Build it fully from scratch: with using widgets as the Slider and creating a variable of type AudioPlayerComponent, you can build all the details from scratch. We will release later a tutorial on how to do that but you can already figure it out by looking into the already-built version

- **New Pre-built components**: Inside Screens panel, you will find a new tab called Components that has new pre-built components to import to your project. For now, we introduced AudioPlayer and Google sign in button components. When you click on one of them, Nowa will add that component to your project (it will create a new file in your project for that component. You will be able to reuse it later by heading to Components tab in the widget picker, which usually has your existing project components).

- **Checking current platform in Logic**: If you want to build a condition according to what platform is your app running on, you can do that by using CheckPlatform node in Circuit under Globals section. It will return a boolean value wether the app running on the platform you asked for or not.

- **Control the visibility of widgets**: Wrap any widget under Visibility wrapper to control wether to make it visible or not (you can also attach a logic to the visible property to calculate wether to keep that widget visible or not).

---

### 1.6  (20 May 2024)

A big upgrade on Firestore is here! you can now use Firestore full power in building advanced queries and using Streams next to Futures! Also with this release, you can use SharedPrefrence to save data locally.

#### **New ✨**

- **A big upgrade on Firestore integration:** we just made it super powerful! You can create collections and subcollections, build advanced queries, test queries quickly before implementing it, and even live updating with Streams! (*Full tutorial will be released soon*)

- **Store data locally with Shared Preferences:** you can now store and fetch variables saved locally in the device. You will find (set, get and clear) nodes in `Circuit` under `Shared Preferences` section.

- **Different types of Navigation methods**: We upgraded the navigation system to support multiple methods such as  `push`, `pushReplacement`, `pop` and `pushandremoveuntil`. This is useful in cases such as Login screens or Splash screen when you don't want users to be able to go back to those screens after passing them. To use it, you will find a new node called `Navigator` in Circuit.

- **Image picker**: You can now use `Image picker`object in Circuit to enable users to pick images from their gallery or camera. 

- **Import API from Postman**: if you using Postman already, you can import all requests from Postman to Nowa in a single click!

---

### 1.5.8  (2 May 2024)

Now you can offer reset password 📧, edit variables easy ✍️, with major bug fixing for deploying to IOS 📲

#### New ✨

- **You can now offer "Reset password" in your app:** When using Firebase Authentication and use `email and password` as a sign up option, you will be able now to send the user a reset password email automatically. You will find the node `SendPasswordResetEmail` under `Firebase` category in the menu after enabling Firebase Auth.

![](./img_releasenotes/1.5.8/forget_password.png)


- **You can edit any variables linked to a widget property directly**: By clicking on the variable itself in the details panel, then on `Edit` to change the name, default value, etc. No need to switch to the variables tab anymore.

![](./img_releasenotes/1.5.8/edit_var.png)


### 1.5.5 (10 April 2024)

You can add `initState` and `dispose` functions and restore last opened tabs ;) 

#### New ✨

- **Ability to override `initState` and `dispose`**: In Circuit, click on `+` button on the left side next to `Functions`, then choose  `initState` or `dispose` to override them. [For more, click here](./circuit/override_functions.md)

- **Last opened tabs are restored**: no more of opening your boards and tabs again! your last opened tabs will be restored when you reopen your project

### 1.5.4
Now you can offer videos in your app! Also, check out how to customize buttons UI the way you like ;)

#### New ✨

- You can now play offline and online videos in your app with [new `Video Player` widget](./ui/widgets/widget_desc/video_player.md).

#### New documentation and tutorials 📜
- [How to design your own Custom button - Youtube tutorial](https://www.youtube.com/watch?v=LxdlkzhsFd8)


### 1.5.1

#### New ✨

- Adding status bar in the bottom

#### New documentation and tutorials 📜
- [How to make your screen design responsive (mini tutorial)](./mini_tutorials/design_responsive.md)
- New documentation for the following widgets:
  - [Checkbox](./ui/widgets/widget_desc/checkbox.md)
  - [Icon](./ui/widgets/widget_desc/icon.md)
  - [Lottie animations](./ui/widgets/widget_desc/lottie.md)
  - [Rive animations](./ui/widgets/widget_desc/rive.md)
  - [HTML widget](./ui/widgets/widget_desc/html.md)
  - [Markdown widget](./ui/widgets/widget_desc/markdown.md)
  - [ListTile](./ui/widgets/widget_desc/listtile.md)
  - [Loading circular](./ui/widgets/widget_desc/loading_circular.md)
- [Updating the Component page](./ui/components.md)



### 1.5

#### New ✨

- **Firebase Firestore**: You can now connect your app to Firestore, create collections, perform queries, and more! (tutorial is coming soon 😉)

- **Error system**:  Errors are now shown in the bottom tab. If  you click on one of them, it will take you to the error location so you can fix it. No more of finding errors while deploying!

- **New UI**: We are changing the UI to a complete new one that will make building apps way easier and more exciting! we just released the first part of the new UI, with the rest coming on the way!

![](./img_releasenotes/v1.5.png)


### 1.4.2

#### New ✨
- Show unsaved files in the unsaved changes popup
- Adding shrinkwrap option to HTML to make it's height dyanmic
- Adding param option to Data builder API to pass dynamic values to to API GET requests 
- Add the option to create a parameter for properties using the details menue
- New UI for the active plan and for comparison between plans
- Add advanced options to gesture detector and inkwell


### 1.4.0

#### New ✨
- Adding the option to **creare Global state**
<img src={require('./img/1.4/globalstate.png').default} width="650"/>

- Adding default text style wrapper and text directionality wrapper to give a style for all texts blow it 
- Adding Apk debug: to build an APK test version fast without signing key

