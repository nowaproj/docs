---
sidebar_position: 2 
description: release notes
---
# Release notes

> Here you will find all released features and bug fixes done for each version 

---

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
