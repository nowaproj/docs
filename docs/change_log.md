---
sidebar_position: 2.5
title: Changelog
---

> Detailed log of all updates, improvements, and bug fixes for each version.

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
- **Themes Management:** Add and manage multiple themes with customizable colors and typography. Dynamically switch themes during runtime. [Read more](./ui/themes/)
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

