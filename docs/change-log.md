---
sidebar_position: 2.5
title: Changelog
---

> Detailed log of all updates, improvements, and bug fixes for each version.

Here’s the **Changelog** for Nowa v2.0.20 in markdown format:

---

## **2.0.21 (27 May 2025)**

#### **Added ✨**  
- **API Import from Postman, Swagger, and Xano**:  
  - Instantly import multiple requests at once  
  - Automatically sets up endpoints, request types, headers, and body  
- **cURL Request Support**:  
  - Paste a cURL command to auto-generate a full API request  
  - Great for copying from docs or terminal and getting started fast

#### **Fixed 🩹**  
- Fixed issue with having the **same declaration name in different files**  
- Fixed bug where **TextFields inside WebViews** didn’t respond to some keys  
- Fixed issue where **non-string values** couldn’t be sent in request bodies  
- Improved **selection behavior** across the editor

---

## **2.0.20 (23 April 2025)**

#### **Added ✨**  
- **New API Editor**:
  - Unified panel to view all API requests with type indicators  
  - Simplified flow for creating, testing, and generating models/mock data  
  - Support for **form data** and **file uploads**  
  - Ability to set **content-type** per request  
- **Horizontal and Vertical Padding Fields** for cleaner layout control  
- **Element Selection in Play Mode** for easier debugging  
- **Updated Chat Template**:
  - Added Profile component  
  - Added App Bar with user info  
  - Prevents sending empty messages  
  - Improved naming and structure  
- **Circuit Improvements**:
  - Function return type shown on hover  
  - Main nodes now included in search results  
- **Play Mode Warning for Custom Code** when custom functions or widgets are present  

#### **Fixed 🩹**  
- Resolved iOS deployment issues  
- Icon Button now wraps icon content correctly  
- Fixed various Circuit-related bugs  

---

## **2.0.19 (6 April 2025)**  

#### **Added ✨**  
- **Nowa Marketplace**: Browse and add editable sample projects from the dashboard, starting with:
  - Water Tracker App ([Used in this tutorial](https://www.youtube.com/playlist?list=PLVhnHv8Cdhz87lklVjSao4Y0EHdlq2j5a))
  - AI Chat App assistant using ChatGPT
- **Revamped Git Integration**:
  - Clone from any Git provider (e.g. GitHub)
  - Push cloud projects to Git
  - Sync between local, cloud, and remote
  - Perform Git operations like commit, discard, and branch
  - [Full guide](https://docs.nowa.dev/git)
- **New Button Widget**:
  - Style buttons using `ButtonStyle` (background, text, radius, elevation, etc.)
  - Use `ButtonTheme` for consistent styling
- **Improved Error Handling**:
  - Layout warnings before errors occur
  - Prevention of crash-causing actions
  - Displays exact file of the issue

#### **Fixed 🩹**  
- Fixed some cloud projects not opening  
- Fixed feedback dialog popping up repeatedly  
- Fixed undo not working after function deletion  
- Fixed Navigator and data type bugs in Circuit  
- Fixed TextFields in global state not responding

## **2.0.18-beta (12 March 2025)**  

#### **Added ✨**  
- **AI Chat Template**: Quickly build chat-based apps using the built-in, fully functional chat template, complete with chat bubbles and logic. [Read more](./templates/chat-template.mdx)
- **Quick Navigation to Functions & APIs**: New "open" icon next to functions and API requests to instantly jump directly to their definitions.

#### **Fixed 🩹**  
- Fixed details panel not showing edit button for some custom expressions.  
- Fixed web deployment issue causing older projects to deploy an empty app.  
- Fixed gray box covering file system when deleting some files.  
- Fixed file panel not updating after adding or removing a file.  
- Fixed OnValue not opening for API requests in Circuit.


## **2.0.17-beta (5 March 2025)**  

#### **Added ✨**  
- **Web Deployment**: Deploy your web apps online directly from Nowa in development or production mode, with an option to download build files for external hosting. [Read more](./deployment/web-deploy.mdx)
- **Added a Badge Wrapper**
- **Added a Pin Code Field Widget**: New input field for PIN codes and OTP entry.  
- **Dashboard Enhancements**
- **Audio Source Enhancements**: Now supports playing audio from bytes.  
- **Request Templates Directly from the Panel**: Easily request new app templates within Nowa.  

#### **Fixed 🩹**  
- Fixed widget picker drag and drop issue when widgets had dependencies.  
- Fixed set state functions not executing properly.  
- Fixed sync issue when building local projects.  
- Fixed Flutter SDK setting issue in the desktop version that appeared in the latest release.  


## **2.0.15-beta (12 Feb 2025)**  

#### **Added ✨**  
- **Swipeable Stack Widget**  
  - Implement a **Tinder-style swiping card effect**.  
  - Connect it to a **list variable** just like ListView for seamless integration.  

- **Time Picker**  
  - Allow users to **select specific times** in your app.  
  - Capture the selected time using `ShowTimePicker` and format it with `.format()`.  

#### **Fixed 🩹**  
- Fixed an issue where **text fields in the details panel** didn’t accept input.  
- **MacOS version now starts in full screen** by default.  
- Adjusted **iPhone 12 device frame size** for correct display.  
- Other minor **bug fixes and performance improvements**.  

---

## **2.0.14 (29 Jan 2025)**  

#### **Added ✨**  
- **New Dashboard Design**  
  - Redesigned for a **smoother and more intuitive experience**.  
  - Easily navigate between **projects and workspaces**.  
  - Added a **new Learning Resources section** featuring guides, tutorials, and tips to help you build faster.  

- **Intl Package for Date/Time Formatting**  
  - Nowa now supports the **Intl package in Flutter** for improved localization.  
  - **Format dates, times, and numbers** based on locale preferences.  
  - Easily adapt to **region-specific date formats, timezones, currency, and pluralization rules**.  

#### **Fixed 🩹**  
- Fixed a **deployment issue for apps** caused by an outdated package.  

---

## **2.0.13-beta (4 Feb 2025)**  

#### **Added ✨**  
- **Git Integration for Cloud Projects (Web & Windows)**  
  - Link your Nowa **cloud projects** to GitHub (or any Git service).  
  - Push, pull, commit changes, and switch branches.  
  - Connect **local projects to cloud ones** to enjoy both **local hot-reload** and **cloud one-click deployment**.  

- **Media Picker**  
  - Implement a **media picker** in your app.  
  - Upload media via API with **encoding support**.  

- **Account Management**  
  - Change your **name, profile picture, email, and password**.  
  - Option to **delete your account** if needed.  

- **Package Management System**  
  - View all packages in your project.  
  - **Add, remove, and update** package versions instantly.  

#### **Fixed 🩹**  
- Fixed an issue causing **App Preview to break when using multiple global states**.  
- Fixed **Expansion Tile** issues affecting UI behavior.  
- Other minor **stability improvements** and **bug fixes**.  

---

## **2.0.11-beta (7 Jan 2025)**

#### **Added ✨**  
- **Expansion Tile Widget:**  
  Easily reveal or hide additional content by adding collapsible sections to your app. Ideal for creating organized and dynamic layouts. [Learn more](./ui/widgets/widget-desc/expansion-tile.md) 

- **Getters in the Hybrid Approach:**  
  Custom Getters allow you to write reusable logic in code and use it visually throughout your project.  

- **TextField Theming:**  
  Simplify TextField styling by defining it once in your app theme. Each new TextField inherits the defined style automatically, streamlining UI consistency.  

#### **Fixed 🩹**  
- Fixed an issue where widgets were being wrongly displaced on the board.  
- Fixed the link menu not closing after an expression was chosen.  
- Fixed the details panel closing unexpectedly during parameter selection in circuits.  
- Resolved incorrect placement of positional arguments in certain configurations.

---

## **2.0.10-beta (16 Dec 2024)**

#### **Added ✨**  

- **Play Mode on the Board:**  
  Run your app directly from the board without entering file preview. Select a screen and click Play. If no screen is selected, the app starts from the Home screen.  

- **Variables Panel on the Board:**  
  Create variables, parameters, and functions right from the board, eliminating the need to navigate into file preview.  

- **Local Variables in Functions:**  
  Add scoped local variables inside functions. Right-click within Circuit and select “Create Local Variable” to create variables limited to that function.  

- **Store Expression Results in Existing Variables:**  
  When using “Custom Expression” in Circuit, store the result in an existing variable. Simply choose “Pick Variable” next to “Store Results.”  

- **Compute Option:**  
  Reintroducing the “Compute” feature from Version 1, enabling you to create a function to compute field values directly.  

- **Flutter 3.27 Upgrade:**  
  Apps now run on the latest Flutter version, improving performance and stability.  

#### **Fixed 🩹**  

- Fixed deployment failures on Android caused by file conflicts.  
- Resolved “Screen or Component Not Found” errors caused by improper loading.  
- Fixed navigation issues with the Space key.  
- Arrow key shortcuts now function properly.  
- Fixed Shift key issues during multi-selection.  
- Widgets no longer disappear when placed on the board.  
- Fixed drag-and-drop functionality from outside the board.  

---


## **2.0.8-beta (28 Nov 2024)**

#### **Added ✨**

- **New Workflow:** Simplified navigation and improved productivity with features like:
  - UI boards to organize all your UIs visually.
  - Focused file tabs for editing individual files.
  - Declaration chips for easy navigation between multiple widgets in a single file.
  - Isolated screen testing from the file preview.
  - A code preview panel with a declaration map for better code organization.

- **New File System:** Manage your project more effectively with:
  - Navigation based on Dart files for structured workflows.
  - A file previewer that displays all Dart files in the project.
  - Dedicated sections for boards, Dart files, and assets for clear organization.

- **Custom Code Support:** Write custom Flutter code anywhere in your project, including functions, widgets, and classes. Modify generated code with instant syncing in Nowa. [Using Custom code Youtube Tutorial](https://www.youtube.com/watch?v=hlOoXTdw1vg&t=1087s)
- **Themes Management:** Add and manage multiple themes with customizable colors and typography. Dynamically switch themes during runtime. [Read more](./ui/themes/create-themes.md)
- **Revamped Logic-Building Circuit:** Create advanced flows with:
  - "Await" for asynchronous functions.
  - "Try-Catch" for handling errors in functions that may throw exceptions.
- **Advanced Expressions:** Build complex Dart expressions visually or directly in the UI Designer and Circuit, including conditional, mathematical, null-aware, and boolean expressions.
- **Integrated Flutter Development:** Sync changes seamlessly between Nowa and your local Flutter development environment.
- **Enhanced Widgets:** Enjoy improved widget customization and functionality for a smoother design experience.

#### **Improved 💪**

- **Generated Code Quality:** Significant enhancements for cleaner, faster, and more maintainable Flutter code.
- **Performance:** Optimized performance for smoother navigation and faster response times.

#### **Fixed 🩹**

- Various bug fixes reported during private testing.
- Usability improvments.

