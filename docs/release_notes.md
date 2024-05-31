---
sidebar_position: 2 
description: release notes
---
# Release notes

> Here you will find all released features and bug fixes done for each version

## 1.6.1  (31 May 2024)

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

#### Fixes 🩹
- Fix of iOS build problem that appeared in the previous release v1.6.0
- Fix of not being able to pass parameters between screens using the new - Navigator option that was released in v1.6
- Fixing of screen crashing when moving Data builder wrapper
- Fixing of Circuit freezing in some cases ​
- Fixing of Undo problems when switching tabs
- Fixing of build problems when deleting screens or components from the project


---
## 1.6  (20 May 2024)

A big upgrade on Firestore is here! you can now use Firestore full power in building advanced queries and using Streams next to Futures! Also with this release, you can use SharedPrefrence to save data locally.

#### **New ✨**

- **A big upgrade on Firestore integration:** we just made it super powerful! You can create collections and subcollections, build advanced queries, test queries quickly before implementing it, and even live updating with Streams! (*Full tutorial will be released soon*)

- **Store data locally with Shared Preferences:** you can now store and fetch variables saved locally in the device. You will find (set, get and clear) nodes in `Circuit` under `Shared Preferences` section.

- **Different types of Navigation methods**: We upgraded the navigation system to support multiple methods such as  `push`, `pushReplacement`, `pop` and `pushandremoveuntil`. This is useful in cases such as Login screens or Splash screen when you don't want users to be able to go back to those screens after passing them. To use it, you will find a new node called `Navigator` in Circuit.

- **Image picker**: You can now use `Image picker`object in Circuit to enable users to pick images from their gallery or camera. 

- **Import API from Postman**: if you using Postman already, you can import all requests from Postman to Nowa in a single click!

#### Fixes 🩹

- App Icon not updating correctly in some cases.
- Build fails for Android when changing the package name.
- Build number not updated correctly when code is downloaded.
- A problem in generated code when a screen file is deleted from the project.
- Some problems in Firebase Firestore for some queries.
- Some bugs in the UI designer

#### **Improvements 👀**
- You can see the types of input and output pins in Circuit when hovering over them.
- You can filter built-in widgets or user-made components in Widget picker. 
- New UI for settings page.

---

## 1.5.8  (2 May 2024)

Now you can offer reset password 📧, edit variables easy ✍️, with major bug fixing for deploying to IOS 📲

#### New ✨

- **You can now offer "Reset password" in your app:** When using Firebase Authentication and use `email and password` as a sign up option, you will be able now to send the user a reset password email automatically. You will find the node `SendPasswordResetEmail` under `Firebase` category in the menu after enabling Firebase Auth.

![](./img_releasenotes/1.5.8/forget_password.png)


- **You can edit any variables linked to a widget property directly**: By clicking on the variable itself in the details panel, then on `Edit` to change the name, default value, etc. No need to switch to the variables tab anymore.

![](./img_releasenotes/1.5.8/edit_var.png)


#### Fixes 🩹

- **Fix the problem `Certificate not found` when deploying to iOS**: *If you had this problem, be sure to delete your App store credentials from the project, close the popup, then open it and enter the credentials  again:warning:*
- Fix the problem of the component/screen latest sizes not being taken when dropping it again from the palette   
- Fix Admob not displaying when deploying to iOS
- Fix not being able to add a Wrapper to a placeholder in a list when the list `children` property is connected to a variable 


## 1.5.7 (20 April 2024)

#### Fixes 🩹

- Fix problem with using Supabase (`class not found`)
- Fix some problems with the API
- Fix connecting the SVG widget asset file to a variable
- Fix the problem of `if statement` node not connecting in circuit


## 1.5.5 (10 April 2024)

You can add `initState` and `dispose` functions and restore last opened tabs ;) 

#### New ✨

- **Ability to override `initState` and `dispose`**: In Circuit, click on `+` button on the left side next to `Functions`, then choose  `initState` or `dispose` to override them. [For more, click here](./circuit/override_functions.md)

- **Last opened tabs are restored**: no more of opening your boards and tabs again! your last opened tabs will be restored when you reopen your project

#### Fixes 🩹
- Component crash when reordering wrappers 
- SVGs not showing in Designer or file picker after uploading them
- Releasing to Android ends up failing due to conflict in Java version 
- Error with feedback and Report in sending data
 

## 1.5.4
Now you can offer videos in your app! Also, check out how to customize buttons UI the way you like ;)

#### New ✨

- You can now play offline and online videos in your app with [new `Video Player` widget](./ui/widgets/widget_desc/video_player.md).

#### Fixes 🩹
- Fix a problem of data not being loaded using the API in case of existing of list types
- Fix a problem for some widgets and wrappers having non-consistant names in different places

#### New documentation and tutorials 📜
- [How to design your own Custom button - Youtube tutorial](https://www.youtube.com/watch?v=LxdlkzhsFd8)


## 1.5.1

#### New ✨

- Adding status bar in the bottom


#### Fixes 🩹

- Fix problem with changing the varibale names
- Fix some issues in Firebase Firestore

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



## 1.5

#### New ✨

- **Firebase Firestore**: You can now connect your app to Firestore, create collections, perform queries, and more! (tutorial is coming soon 😉)

- **Error system**:  Errors are now shown in the bottom tab. If  you click on one of them, it will take you to the error location so you can fix it. No more of finding errors while deploying!

- **New UI**: We are changing the UI to a complete new one that will make building apps way easier and more exciting! we just released the first part of the new UI, with the rest coming on the way!

#### Fixes 🩹
- Fix a bug that caused a failure in deploying a release version for Android
- Fixing some bugs in the UI
- Some performance improvement

![](./img_releasenotes/v1.5.png)


## 1.4.2

#### New ✨
- Show unsaved files in the unsaved changes popup
- Adding shrinkwrap option to HTML to make it's height dyanmic
- Adding param option to Data builder API to pass dynamic values to to API GET requests 
- Add the option to create a parameter for properties using the details menue
- New UI for the active plan and for comparison between plans
- Add advanced options to gesture detector and inkwell


#### Fixes 🩹

- Fix color field crashing when changing the opacity
- Fix project loading when using global variables
- Fix problems with Circuit nodes not connecting sometimes
- Fix problem with Bottom navigation bar icons not being replaced
- Fix problem with SVG widget not updating after replacing the SVG file
- Fix problem with layout and wrapper options not appearing for dynamic content (children that is connected to a list)
- Fix problems with the selection of multiple widgets 


## 1.4.0

#### New ✨
- Adding the option to **creare Global state**
<img src={require('./img/1.4/globalstate.png').default} width="650"/>

- Adding default text style wrapper and text directionality wrapper to give a style for all texts blow it 
- Adding Apk debug: to build an APK test version fast without signing key

#### Fixes 🩹
- Fix circular dependencies problems (ex, when two screens use each other)
- Improve the speed and fix some issues in project loading
- Fix Android build bug that was reported [here](https://community.nowa.dev/t/android-build-is-currently-not-working-fix-is-coming-next-tuesday/25).
- Fix issues with code loading
- Fix bugs with API schemas 



---

## 1.3

#### New ✨

- **A full new variables system:** now you can create parameters and variables for screens or components:
  - Parameters act as input values that recieved from another screen/component and don't change 
  - Variables are for the values that change inside the screen/component


<img src={require('./img/1.4/newvariables.png').default} width="150"/>

- **Creating functions:** now you can create functions as well inside any screen/component  
<img src={require('./img/1.4/functions.png').default} width="650"/>

- Adding **Google Fonts** by default
<img src={require('./img/1.4/fonts.png').default} width="650"/>

- Adding the option to **create Gradients**
<img src={require('./img/1.4/gradient.png').default} width="650"/>


#### Fixes 🩹
- Usability enhancements
- Fixing some bugs with the Circuit



## v1.2.2

![](./img_releasenotes/v1.2.1/version121.png)


#### New ✨
- **A new Wrap widget**: : Widgets now can rearrange themselves inside a wrap widget

- **Adding widget preview:** scroll down on widgets inside the palette to see a preview

- **Error text in the Text Field:** Show error messages within TextField widget

- **Ability to add null to variables that accepts null**: Now you can assign null to variables in circuit or details panel. [Click here to see how](./variables/null_variables.md)

- **Adding advanced device previewer**: Choose the device type, orientation, and other settings while previewing your app

- **New code editor with autocomplete:** Right-click on any file and choose show file content to open code-editor

- **Updating code without reloading the project:** Code editor can now update automatically with every change you do

- **Updating to material3 theme**

#### Outline improvements ⌕

- Double click to zoom into any widget (also press F to focus on selection): No need to look for them on the board anymore!
- Clicking on a widget focuses on it in the outline

#### Fixes 🩹
- Markdown can be sized automatically
- Pinch to zoom on web
- Fix youtube change video id

## v1.2.1

#### New ✨
1. Added **Youtube** widget

2. Added **Admob** widget

<img src={require('./img/admobshort4.gif').default} width="650"/>


3. Added a **json viewer** to format json data inside API requests


<img src={require('./img/jsonformat.gif').default} width="650"/>


4. Added **API Collection settings** : you can now add settings on the Collection level, such as the Base Url and headers, and they will be automatically included in the requests inside that collection so you don't have to keep adding headers or baseURL with every request you add.


<img src={require('./img/collections.gif').default} width="650"/>


#### Fixes 🩹

1. Fix missing dependency error on the board 

2. Fix issue with selection in the designer

3. Improvements with Undo

---

## v1.2.0

#### New ✨
1. Added support for **more API requests** like POST, UPDATE, PUT, DELETE... read more about it [here](./data/post_request.md)

2. Added **Rive widget**

#### Fixes 🩹
1. Fix change launcher icon fails on iOS

2. Fix holding button while drawing a container or text in the designer

3. Code generation improvements

---

## v1.1.9
#### New ✨
- Added Lottie animation widget
- Added SVG support
- Added payment management options
#### Fixes 🩹
- Fix Android build issues
- Fix uploading images
- Fix creating components with invalid name
- Code generation improvements

## v1.1.8
#### New ✨
- Adding variables and expressions in text fields
- Realtime connection with Supabase
- Create local projects
- Run and test locally on real devices or emulators and update with hot reload
- Open local project in VSCode if installed

#### Fixes 🩹
- Sorting projects in dashboard
- API get requests fixes
- Drag and drop for ListView
- Code generation improvements

## v1.1.7

#### New ✨
- Markdown widget
- Webview widget
- Html Widget
- Added Desktop version for Mac and Windows
- Added safe area wrapper
- Added header to get request
- Added template preview
- Ability to change app icon
- API request response presented in a pretty format
#### Fixes 🩹
- Fix: Parameter names use proper names instead of p0, p1...
- Fix: Supabase crashing the project
- Fix: Adding nodes with default values break the code
- Fix: Drag and drop drawer and FAB into the screen puts it in place
- Fix: Adding pop up message when importation fails

## v1.0.x
#### New ✨
- Adding cut action
#### Fixes 🩹
- Fix: Undo in files panel
- Fix: font not saving
- Fix: reset password issue some password does not work
- Fix: login issue and making it more secure
- Fix: Some emails are not valid
- Fix: Android build produces apk
- Fix: Building web not working
- Fix: Download code button not working
- Fix: Sharing for gives users the same plan as the owner

## 0.3.6

#### New ✨
- New widgets: Bottom navigation bar, Drawer, ListTile, ListView, InkWell, Material
- Changed the default sizes for new widgets to be more accurate
- Adding text with the text tool now directly modifies the text
- Fullscreen mode when simulate
- Added refresh button to simulate
- Changed default board color white
- Added arrows shortcut to move objects on the board

#### Fixes
- Fix: Copying maintains layout
- Fix: Drag and drop in the outline
- Fix: Some web images did not work
- Fix: Problem of the placeholder widget in a group being removed after connecting to a variable
- Fix: default value of variables not being set to the old data of the details proberty 
- Fix: some undo/redo problems 

## 0.3.5

#### New ✨
- Added spacing to row/columns
- Added ungroup option
- Added menus on the menu bar
- Added paste option to the board context menu
- If the widget is corrupted an error widget will appear on the board
- Status bar shows if there are unsaved changes or all saved
- Auto detects spacing & order when converting from stack to column/row

#### Fixes
- Fix: Reordering wrappers
- Fix: Add widget button
- Fix: Creating a group matches the parent group options
- Fix: Shortcuts stick
- Fix: Ability to modify layout for multiple widgets in the same time
- Fix: Constraints work with drag and drop with all different
- Fix: resizing one axis doesn't break the layout of the other axis
