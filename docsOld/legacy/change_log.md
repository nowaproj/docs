---
sidebar_position: 2.5
title: Changelog
---

> Detailed log of all updates, improvements, and bug fixes for each version.


## 1.8 (15 Sep 2024)

#### **Added ✨**

- **Mock Data for API Requests:** Users can now create mock data for API requests to mimic responses while designing. This feature helps you see how the UI will look with different responses and avoids firing actual API requests during design. When you click on **Play**, you'll see the actual app in action. [Read more about Mock Data here](../data/mockdata).

- **Selective Model Generation from API Responses:** We've introduced a new way of generating models from your API responses. You can now choose which parts to include in the model and which to exclude. This allows you to create models that hold only what you need, making them easier to work with. [Read more about it here](../data/creating_models).

- **API Testing Panel:** Testing your requests is now easier than ever. You can pass test data to the parameters and run the test without having to change the default values for the model.


## 1.7.5 (17 August 2024)

#### **Added ✨**
- JSON to Model Generator: Effortlessly create all the necessary models for your app from a single JSON input. With just one click, Nowa automatically generates the main models and any submodels for nested structures.

#### **Fixed 🩹**
- Fix issue when connecting Firebase data to the ListView.
- Fix errors appearing before fully loading the project.
- Fix state update issues in the previewer.
- Fix `PushAndRemoveUntil` to correctly remove all routes in the stack.
- Fix `+` node connection issue.
- Fix horizontal spacing issues in the ListView.


## 1.7.4 (5 August 2024)

#### **Added ✨**
- New JSON Editor: A more intuitive way to view JSON responses within the API or Firebase editor. You can now beautify, examine, and copy responses with ease.
- Mutable Objects: Added the `Is Final` switch for object parameters, allowing you to modify parameters later and store states within objects.

#### **Improved 💪**
- Switching API to Use Dio: Updated the generated API code to utilize the Dio package, offering a more robust and performant approach to handling HTTP requests with cleaner code.
- Copy and Paste Nodes in Circuit: You can now copy and paste nodes or groups of nodes within the same graph or transfer them to different graphs.

#### **Fixed 🩹**
- Fix WebView showing "Cache Error" when releasing to Android
- Fix Problem of API responses not being received due to `dynamic` parameters in the API
- Fix the problem of wrong errors being shown in the project
- Fix problem for `onError` not being called in Circuit
- Fix problem for delete not working on files


## 1.7.3 (25 July 2024)

#### **Added ✨**
- New [Listview](../ui/widgets/widget_desc/listview.md) and [Gridview](../ui/widgets/widget_desc/gridview.md) widgets 
- [Linear Progress Indicator](../ui/widgets/widget_desc/linear_progress_indicator.md) widget
- [Text Overflow Options](../ui/widgets/widget_desc/text.md) in the Text widget

#### **Improved 💪**
- Firebase integration from BETA to STABLE
- Enhanced Error Detection: Nowa can detect more errors faster and provide detailed information in the Error panel.


#### Fixed 🩹
- Fixed Admob issues on iOS
- Resolved API panel crashing problems
- Improved Error System for instant updates
- Fixed issues with disconnecting Firebase from a project
- Corrected error when using the Navigator function without setting a screen
- Stability improvements



## 1.7.2 (7 July 2024)

#### **Added ✨**
- [Listview](../ui/widgets/widget_desc/listview.md) and Gridview widgets


#### **Improved 💪**
- Improvements on Groups (Rows and Columns)

#### Fixed 🩹
- Fix the default value for variables and parameters not being updated
- Fix a problem with API editor crashing
- Fix a problem with generated code for Navigator
- Fix a problem in generated code for nullables


## 1.7.1 (2 July 2024)

#### Fixed 🩹

- Fix the problem of Homescreen being missed when reopening the project
- Fix problems with connecting nodes in Circuit
- Fix problems with code generation erros for nullability
- Fix problem with nodes in Circuit returning `Object` instead of the actual type
- Fix problem of error not showing when broken files are being loaded
- Fix problem with boards in the new files panel


## 1.7.0 (28 June 2024)

#### **Added ✨**
- The new files panel dashboard next to the outline


#### **Improved 💪**
- Nowa Error system is now detecting more possible errors like using deleted variables and parameters

#### Fixed 🩹
- Fix some problems appears when loading existing projects 
- Fix clicking inside boards not responding for some cases
- Fix selection not responding from first click on the board
- Fix problem with Supabase "Query not found" when opening the project again
- Fix some drag and drop problems with Rive widget
- Fix errors with generated code when using colors or fonts.
- Fix problems with permissions required while not needed

#### Removed 🗑️
- The old files popup from the bottom left

## 1.6.1  (31 May 2024)

#### **Added ✨**
- Supporting Audio player inside the app using Slider widget and AudioController object
- Audio player template and component   
- Checking current platform in Logic
- Control the visibility of widgets

#### Fixed 🩹
- Fix of iOS build problem that appeared in the previous release v1.6.0
- Fix of not being able to pass parameters between screens using the new - Navigator option that was released in v1.6
- Fixing of screen crashing when moving Data builder wrapper
- Fixing of Circuit freezing in some cases ​
- Fixing of Undo problems when switching tabs
- Fixing of build problems when deleting screens or components from the project


---
## 1.6  (20 May 2024)

#### **Added ✨**

- Adding Streams to Firebase integration
- Testing Firebase queries with mock data

- **Store data locally with Shared Preferences:** you can now store and fetch variables saved locally in the device. You will find (set, get and clear) nodes in `Circuit` under `Shared Preferences` section.

- Importing API calls from Postman 

#### **Improved 💪**

- New way of using Navigation using "Navigator" object to support cases more of push and pop, such as PushReplacement to replace the current route
- New Firestore UI for easier integration
- You can see the types of input and output pins in Circuit when hovering over them.
- You can filter built-in widgets or user-made components in Widget picker. 
- New UI for settings page.

#### Fixed 🩹

- App Icon not updating correctly in some cases.
- Build fails for Android when changing the package name.
- Build number not updated correctly when code is downloaded.
- A problem in generated code when a screen file is deleted from the project.
- Some problems in Firebase Firestore for some queries.
- Some bugs in the UI designer


---

## 1.5.8  (2 May 2024)

Now you can offer reset password 📧, edit variables easy ✍️, with major bug fixing for deploying to IOS 📲

#### **Added ✨**
- Adding "Reset password" node in Circuit for Firebase Auth 
- Editing linked variables to properties directly from details panel

#### Fixed 🩹

- Fix the problem `Certificate not found` when deploying to iOS: *If you had this problem, be sure to delete your App store credentials from the project, close the popup, then open it and enter the credentials  again:warning:*
- Fix the problem of the component/screen latest sizes not being taken when dropping it again from the palette   
- Fix Admob not displaying when deploying to iOS
- Fix not being able to add a Wrapper to a placeholder in a list when the list `children` property is connected to a variable 

## 1.5.7 (20 April 2024)

#### Fixed 🩹

- Fix problem with using Supabase (`class not found`)
- Fix some problems with the API
- Fix connecting the SVG widget asset file to a variable
- Fix the problem of `if statement` node not connecting in circuit


## 1.5.5 (10 April 2024)


#### **Added ✨**
- Ability to add functions to override `initState` and `dispose`

#### **Improved 💪**
- Last opened tabs are restored: no more of opening your boards and tabs again! your last opened tabs will be restored when you reopen your project


#### Fixed 🩹
- Component crash when reordering wrappers 
- SVGs not showing in Designer or file picker after uploading them
- Releasing to Android ends up failing due to conflict in Java version 
- Error with feedback and Report in sending data
 

## 1.5.4

#### **Added ✨**

- Video player widget to play offline and online videos in your app. [Read more here](../ui/widgets/widget_desc/video_player.md).

#### Fixed 🩹
- Fix a problem of data not being loaded using the API in case of existing of list types
- Fix a problem for some widgets and wrappers having non-consistant names in different places


## 1.5.1

#### **Added ✨**
- Adding status bar in the bottom


#### Fixed 🩹

- Fix problem with changing the varibale names
- Fix some issues in Firebase Firestore


## 1.5

#### **Added ✨**

- Firebase Firestore integration
- New Log and Error system

#### **Improved 💪**
- New UI

#### Fixed 🩹
- Fix a bug that caused a failure in deploying a release version for Android
- Fixing some bugs in the UI
- Some performance improvement


## 1.4.2

#### **Added ✨**

- Show unsaved files in the unsaved changes popup
- Adding shrinkwrap option to HTML to make it's height dyanmic
- Adding param option to Data builder API to pass dynamic values to to API GET requests 
- Add the option to create a parameter for properties using the details menue
- New UI for the active plan and for comparison between plans
- Add advanced options to gesture detector and inkwell


#### Fixed 🩹

- Fix color field crashing when changing the opacity
- Fix project loading when using global variables
- Fix problems with Circuit nodes not connecting sometimes
- Fix problem with Bottom navigation bar icons not being replaced
- Fix problem with SVG widget not updating after replacing the SVG file
- Fix problem with layout and wrapper options not appearing for dynamic content (children that is connected to a list)
- Fix problems with the selection of multiple widgets 


## 1.4.0

#### **Added ✨**

- Adding the option to creare Global state. Read more [here](../variables/global_variables/create_global_vars.md)
- Adding default text style wrapper and text directionality wrapper to give a style for all texts blow it 
- Adding Apk debug: to build an APK test version fast without signing key

#### Fixed 🩹
- Fix circular dependencies problems (ex, when two screens use each other)
- Improve the speed and fix some issues in project loading
- Fix Android build bug that was reported [here](https://community.nowa.dev/t/android-build-is-currently-not-working-fix-is-coming-next-tuesday/25).
- Fix issues with code loading
- Fix bugs with API schemas 

