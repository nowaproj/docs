---
sidebar_position: 2 
description: What's new
---
# What's new

> Discover the latest features and enhancements for each version of Nowa. For more details, check the [changelogs](./change_log.md)

### **2.0.15 (12 Feb 2025)**  
This update brings exciting new widgets and important improvements to Nowa, including **Swipeable Stack**, **Time Picker**, and various bug fixes.  

#### **New ✨**  

- **Swipeable Stack Widget**  
  Nowa now supports **Tinder-style swiping cards**! Use the `Swipeable Stack` widget to create **interactive swipe effects** for card-based UIs. Simply **connect it to a list variable**, just like ListView, and bring a dynamic experience to your app.  

- **Time Picker**  
  You can now allow users to **select a specific time** in your app! Previously, Nowa only supported picking dates. With `ShowTimePicker`, you can capture user input for time selection and format it easily using `.format()`.  

  ![](./img/swipingcard.gif)
  

---

#### **Coming Soon 🔜**  

- **Web Hosting with Custom Domains**  
  Host your **Flutter web apps** directly from Nowa and set up a **custom domain** in just a few clicks.  

- **AI Voice Assistant App Template**  
  Get a pre-built **real-time AI voice assistant** template, ready to be customized with your own API keys and settings.  

- **VS Code Integration (Planned)**  
  Work with Nowa **inside VS Code** for a seamless hybrid workflow, combining **visual building and coding** in one place.  

---

### **2.0.14 (29 Jan 2025)**  
This update brings a **brand-new dashboard design** and support for the **Intl package for date/time formatting**, improving both usability and localization capabilities.  

#### **New ✨**  

- **New Dashboard Design**  
  We’ve redesigned the dashboard for a **smoother and more intuitive experience**.  
  - Easily navigate between **projects and workspaces**.  
  - Discover the **new Learning Resources section**, where you’ll find top guides, tutorials, and tips to **help you build faster and better**.  

- **Intl Package for Date/Time Formatting**  
  Nowa now supports the **Intl package in Flutter**, allowing you to:  
  - **Format dates, times, and numbers** based on locale preferences.  
  - Easily localize your app with **region-specific date formats, timezone adjustments, currency formatting, and pluralization rules**.  

  ---

### **2.0.13 (4 Feb 2025)**  
This update brings major improvements to Nowa, including **Git integration**, **media picking**, **account management**, and a **new package management system**.  

#### **New ✨**  

- **Git Integration for Cloud Projects (Web & Windows)**  
  Connect your Nowa cloud project to **GitHub (or any Git service)** to **commit, push, pull, switch branches**, and more. You can also **link local projects to the cloud** for the best of both worlds—**hot-reload & hybrid approach locally + one-click deployment in the cloud**. *(MacOS support coming soon!)*  

- **Media Picker**  
  You can now **select media files** inside your app and **upload them through an API with encoding** for more dynamic experiences.  

- **Account Management**  
  Customize your profile by updating your **name, profile picture, email, and password**. You can also **delete your account** if needed.  

- **Package Management System**  
  View, add, remove, and update all **packages in your project** effortlessly from one place.  

---

### **2.0.11 (6 Jan 2025)**  
This version introduces powerful new features, improvements, and essential bug fixes to enhance your experience.

#### **New ✨**  
- **Expansion Tile Widget:**  
  Add collapsible sections in your app with the new Expansion Tile widget. Perfect for organizing content hierarchically.  
  [Learn more](./ui/widgets/widget_desc/expansion_tile.md)  

- **Getters in the Hybrid Approach:**  
  Write custom Getters in code and use them seamlessly in your project for more flexibility in app logic.  

- **TextField Theming:**  
  Define a global style for TextFields in your app theme, saving time on repetitive UI customizations. Your TextFields will automatically align with the app theme.

---

### 2.0.10 (16 Dec 2024)
This version comes with important enhancements and fixes to make your experience easier and more powerful.

#### **New ✨**
- Play Mode on the Board: Run your app directly from the board without entering file preview. Select a screen and hit Play. If no screen is selected, the app starts from the Home screen.
- Variables Panel on the Board: Create variables, parameters, and functions right from the board—no need to enter file preview.
- Local Variables in Functions: Easily create local variables within functions. Right-click inside Circuit and select “Create Local Variable” to scope it to the function.
- Store Expression Results in Existing Variables: When using “Custom Expression” in Circuit, you can now store the result in an existing variable. Just choose “Pick Variable” next to “Store Results.”
- Added Compute Option: Use “Compute” to create a function that computes the value of a field, just like in Version 1.
- Upgraded to Flutter 3.27: Your apps now run on the latest Flutter version for better performance and compatibility.

### **2.0.8-beta (28 Nov 2024)**

Nowa V2 is here! After 7 weeks of exclusive testing with hand-picked users, we’re happy to open Nowa V2 to everyone!

This version introduces groundbreaking new features, an improved workflow, and an enhanced overall experience. Let’s dive into the details.

#### **New ✨**

- **A Unified Workflow:** The new workflow eliminates friction, allowing seamless navigation and improved productivity throughout the app-building process. Here's some of the new improvements on the workflow:

  - **UI Boards:** Organize all your UIs on visual boards for a clear overview of your project.
  - **Focused File Tabs:** Open individual files in their own tabs, allowing you to fully focus on specific components.
  - **Declaration Navigation:** For files with multiple declarations (e.g., multiple widgets), use the declaration chips on the bottom-left panel to switch between them effortlessly.
  - **Isolated Screen Testing:** Play an isolated screen directly from the file preview to test its behavior in isolation.
  - **Code View:** Access the code for any file by clicking `Code` on the bottom-left panel.
  - **Declaration Map:** While in code preview, view a mapped structure of all declarations in the left-side panel for easier navigation and understanding.

- **Custom Code Support:** Write custom Flutter code anywhere in your project, including functions, widgets, and classes. Modify the generated code, and see changes sync instantly inside Nowa. For more, [watch this video](https://www.youtube.com/watch?v=hlOoXTdw1vg&t=1087s)
- **Themes Management:** Create and manage multiple themes for your app, customize colors and typography, and dynamically switch themes during runtime. [Read more about it here](./ui/themes/)
- **Revamped Logic-Building Circuit:** Build more complex and advanced flows with the new Circuit. Features include:
  - "Await" for asynchronous functions.
  - "Try-Catch" support for functions that may throw exceptions (e.g., network requests).
  - Using Custom Expressions 
- **Advanced Expressions:** Write advanced Dart expressions directly in the UI Designer or Circuit. Use the new Advanced Expression Builder to create:
  - Conditional, mathematical, null-aware, and boolean expressions.
- **Integrated Flutter Development:** Instantly sync changes between Nowa and your local Flutter development environment.
- **New File System:** Organize your project with ease:
  - **Dart File Navigation:** Seamlessly navigate between your project’s Dart files for a more structured workflow.
  - **File Previewer:** Preview all Dart files in your project with an intuitive interface.
  - **Dedicated Sections:** Access distinct sections for UI boards, Dart files, and assets, keeping everything organized and easy to locate.
- **Enhanced File Previewer:** View and navigate through your project’s Dart files with the new file previewer.
- **Improved Widgets:** Enhanced customization options and functionality for a smoother design experience.
- **Significant Code Quality Improvements:** The generated Flutter code is cleaner, more performant, and better structured.

#### **What’s Coming Soon 🚀**

- **New Documentation and Tutorials:** Updated tutorials and documentation tailored for Nowa V2.
- **Upcoming Video Tutorials:**
  - Detailed onboarding for Nowa V2.
  - A full walkthrough to build a water reminder app.
- **Frequent Livestreams:** Get insights, tips, and interact with the Nowa team in regular live streams.
- **Hackathon:** Participate in our upcoming hackathon for a chance to win exciting prizes.

#### New Learning Resources 📚

- [Nowa V2 Playlist](https://youtube.com/playlist?list=PLVhnHv8Cdhz8rAHO0Z-xdUmATgB91458t&si=YXy_9oAzLmC-57Wx): Explore Nowa V2 with our new Youtube playlist for Nowa V2.

