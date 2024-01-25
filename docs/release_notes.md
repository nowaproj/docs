---
sidebar_position: 2 
description: release notes
---
# Release notes

> Here you will find all released features and bug fixes done for each version 

## 1.4.2

#### New ✨
- Show unsaved files in the unsaved changes popup
- Adding shrinkwrap option to HTML to make it's height dyanmic
- Adding param option to Data builder API to pass dynamic values to to API GET requests 
- Add the option to create a parameter for properties using the details menue
- New UI for the active plan and for comparison between plans

#### Fixes 🩹

- Fix color field crashing when changing the opacity
- Fix project loading when using global variables
- Fix problems with Circuit nodes not connecting sometimes
- Fix problem with Bottom navigation bar icons not being replaced
- Fix problem with SVG widget not updating after replacing the SVG file
- Fix problem with layout and wrapper options not appearing for dynamic content (children that is connected to a list)
- Fix problems with the selection of multiple widgets 
- Add advanced options to gesture detector and inkwell


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

- **Ability to add null to variables that accepts null**: Now you can assign null to variables in circuit or details panel. [Click here to see how](./variables/advanced/null_variables.md)

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
