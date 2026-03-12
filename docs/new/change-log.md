---
title: "Changelog"
sidebar_position: 2
---

> Detailed log of all updates, improvements, and bug fixes for each version.

---

## **3.6.1 (12 March 2026)**

#### **Improved ⚙️**
- **Editable `main.dart`** — a new system now lets both you and the AI agent freely modify the `main.dart` file without running into issues.
- **AI stability on weak connections** — Nowa now handles weak and moderate internet connections much more gracefully, preventing unexpected disconnects mid-task.

#### **Fixed 🩹**
- Fixed an issue where some projects weren't loading correctly after the 3.6 update.

---

## **3.6 (6 March 2026)**

#### **Added 🌟**
- **RevenueCat Integration** — monetize your iOS and Android apps with in-app purchases using RevenueCat, set up in just a few clicks.
- **AI Planning Mode** — the AI now deeply analyzes your project, asks clarifying questions, and presents a detailed plan before implementing. Review and refine the plan, then get results built correctly from the first shot with fewer credits.
- **Todos in Agent Mode** — for complex prompts, the agent creates an internal plan with todos and completes them one by one, ensuring nothing is missed.
- **Google Sign-In with Supabase** — ask Nowa AI to implement Google Sign-In with Supabase directly.
- **Onboarding for New Projects** — new projects now include a guided onboarding experience to help you get started.

#### **Improved ⚙️**
- **AI search & project analysis** — the agent searches across your project much faster and consumes far fewer credits. It can also trigger source-code analysis to catch issues Nowa might miss.
- **Automatic AI issue reporting** — the AI can automatically report issues it encounters (without private data) and provide a report ID for follow-up.
- General performance and stability improvements across the editor.

#### **Fixed 🩹**
- Fixed an issue where the AI was adding incorrect package versions. Package versions are now managed by Nowa and default to the latest from pub.dev unless the AI has a specific reason not to.

---

## **3.5 (9 February 2026)**

#### **Added 🌟**  
- **Nowa Agent V3** — new AI foundation with 4 modes: Instant, Thinking, Deep Thinking, and Max.  
- **GoRouter by default** — all new projects use GoRouter routing with screen paths and deep linking support.  
- **Git for Local Projects** — Git is enabled by default for local projects (commit, history, push/pull).  

#### **Improved ⚙️**  
- **AI efficiency & quality** — new modes (except Max) use 5× fewer credits, run 4× faster, and produce 2–3× better results.  
- **Supabase workflows** — stronger results when working with Supabase MCP.  
- **UI boards performance** — smoother screen switching, panning, and zooming on large boards.  

---

## **3.4 (19 January 2026)**  

#### **Added 🌟**  
- **Supabase MCP** — connect Supabase and let the AI agent build the frontend + backend (tables, RLS, triggers, and Edge Functions).  
- **Agent Creation Summary** — a post‑chat summary box listing everything the agent created, with drag‑and‑drop to the board and file previews.  
- **New tutorials** — Google Maps integration and instant preview sharing videos.  

#### **Improved ⚙️**  
- Showing publishing errors so if App Store deployment failed at the publishing stage (last stage) you will know exactly why.  

#### **Fixed 🩹**  
- Fixed “[AppState] not found” errors after AI changes.  
- Improved generated code stability for more reliable outputs.  

---


## **3.3.5 (30 December 2025)**  

#### **Added 🌟**  
- **Commit History in Nowa** — view your full commit history directly in the Git panel, preview changed files line by line, and revert specific commits with a right‑click.  
- **One‑click GitHub integration** — connect projects to GitHub from `Project Settings → Git → Connect to GitHub` without creating tokens manually.  
- **Faster local project loading** — large local projects now load dependencies faster by using your local Flutter SDK instead of refetching everything from `pub.dev`.  


#### **Fixed 🩹**  
- Fixed an issue where some **imports disappeared** when loading projects.  
- Fixed cases of **double `int` conversion** when using AI, causing incorrect expressions.  
- Multiple fixes to **code generation and type mismatches** for more reliable AI output.  
- General stability and performance improvements across editor and preview.  

---

## **3.3.3 (15 December 2025)**  

#### **Fixed 🩹**  
- Fixed an issue where **some imports were not being saved correctly**, causing inconsistencies in code generation and preview.  

---

## **3.3.2 (10 December 2025)**

#### **Added 🌟**  
- **Google Maps Widget** — use Google Maps directly inside Nowa without writing custom code.  
  - Add it from the **Widget Picker**  
  - Fully customizable visually or via AI  
  - Preview real map results in the simulator  

#### **Improved ⚙️**  
- Added loading indicators to show progress when opening projects.  
- Improved UI rendering and consistency across screens and previewer.  
- Enhanced performance for a smoother experience when switching between views.  

#### **Fixed 🩹**  
- Fixed **false error logs** caused by `print` statements in code.  
- Fixed **previewer issues** where some screens failed to render.  
- Fixed **files disappearing** after reopening a project.  
- Fixed **feedback form** hanging during submission.  
- Minor UI polish and general stability improvements.  

---

## **3.2.0 (14 November 2025)**

#### **Added 🌟**  
- **AI That Uses Custom Packages** — the AI can now fetch and use packages directly from **pub.dev**, reading documentation and applying them automatically.  
  - Enabled by default for new projects.  
  - Can be manually activated in `Settings → Packages → Load Packages (Experimental)`.  
- **Cloud Git Integration** — all cloud projects now come with Git pre-configured, with a badge showing pending changes and in-app commit support.  

#### **Improved ⚙️**  
- Major upgrades to the AI’s reasoning and design capabilities.  
  - Defined the entire **Material library** and key Flutter components, eliminating “Not defined” issues.  
  - Smarter architecture creation, logic connection, and theme handling.  
  - Output quality improved up to 3× compared to previous versions.  

#### **Fixed 🩹**  
- Fixed AI error: `litellm.BadRequestError ... Unterminated string...`.  
- Fixed **missing imports** appearing in code view.  
- Fixed **file deletion** issue after reopening a project.  
- Fixed **feedback panel** getting stuck when sending reports.  
- Minor code sync and stability improvements.  

---

## **3.1.2 (25 October 2025)**

#### **Improved ⚙️**  
- Enhanced **AI agent stability** and reliability during long prompt sessions.  
- Improved **streaming performance** to reduce delays and errors.  
- Better **bug reporting flow**, capturing more context for faster fixes.  
- Improved **public preview handling** for smoother link sharing.  

#### **Fixed 🩹**  
- Fixed **invalid argument errors** caused by malformed AI JSON responses.  
- Fixed issue with `write_top_level_code` tool execution.  
- Fixed **context overflow** errors (`ContextWindowExceededError`) when sending large prompts.  
- Fixed **public share links** not opening properly when users were logged out.  
- Fixed **shared project endpoints** not loading correctly in public mode.  
- General performance and stability optimizations.  

--

## **3.1.0 (21 October 2025)**

#### **Added 🌟**  
- **New AI System** — rebuilt for speed and quality  
  - Live result streaming  
  - Self‑fixing agent that validates and corrects its output  
  - Clarifying questions when unsure  
  - Agent can run your app to detect runtime issues  
  - Project‑scoped chat history to continue conversations with full context  
- **Cloud + Local Sync** — keep a project in both places with one‑click sync (no Git needed)  
- **Instant Preview Sharing** — generate private or public links to your live preview directly from Play Mode  

#### **Improved ⚙️**  
- Moved from per‑prompt to a **credit‑based system** for fairer, more flexible AI usage (consumption scales with prompt size; small tasks ~0.1 credit, full screens ~1 credit)  
- Major performance and stability improvements across the builder and AI execution  

#### **Fixed 🩹**  
- Various reliability fixes to improve the instant preview, code generation, and runtime flows when building with AI  

---

## **3.0.10 (7 October 2025)**

#### **Added 🌟**  
- **Firebase Cloud Messaging** support — enable notifications from your project settings and send them from Firebase, Nowa, or any API (like Supabase Cloud Functions).  
- **Supabase Storage** integration — upload, store, and retrieve files directly from Supabase.  
- **New Code Sync System** — edits in code now sync instantly with the UI without refreshing or repositioning the board.  

#### **Fixed 🩹**  
- Nullability issues that caused build errors in certain cases.  
- Crashes when using lists of widgets as variables in screens or components.  
- AI expressions not working properly when used as return values.  
- Cases where AI-generated UIs couldn’t be selected or modified.  
- AI errors when performing actions on specific widgets.  
- “Not defined” AI generation issues with elements like `RadioListTile`, `SliverPadding`, `DropdownButtonHideUnderline`, and `SliverGrid`.  
- Preview issues with the Image widget caused by mock images on the board.  
- Editing issues with index expressions such as `List[0]` in the details panel.  
- Errors caused by `WidgetStateProperty` breaking the Switch widget.  

#### **Improved ⚙️**  
- Overall AI stability and error handling for rendering issues — only the affected widget now shows an error instead of the whole screen.  
- Added **TextInputAction** support for TextFields for better keyboard control.  
- Added **Phone UI preview** (view-only mode) for better usability on mobile.  
- Improved reliability of loading code that includes list variable formats.  

---

## **3.0.9 (19 September 2025)**

#### **Fixed 🩹**  
- Scale plan now shows the **actual credit number** instead of displaying 99+.  
- Fixed issue where **adding headers stopped working** after changing the API type.  
- Fixed issue with **attachments taking long to appear in the chat**.  

---

## **3.0.8 (17 September 2025)**

#### **Fixed 🩹**  
- Old templates updated and replaced with new ones matching Nowa 3.0 standards.  
- Older way of changing themes removed to simplify theming workflow.  
- Error build design now clearly shows it’s clickable to access build logs.  
- Added option to include **cloud build logs** when submitting bug reports.  

---

## **3.0.6 (8 September 2025)**

#### **Fixed 🩹**  
- Screens glitching or showing errors on the board when using `uid` from Supabase.  
- Horizontal scroll shortcut (Shift + scroll) not working on the Web version.  
- Text themes not reverting back to their default values.  
- Inconsistencies with `DropdownButtonFormField`.  
- Play mode not supporting custom route paths from user’s `MaterialApp`.  
- `Home` property not being recognized despite setting a valid home screen.  
- Global states generated by AI not functioning.  
- Global state not updating correctly inside the previewer.  
- Chat template preview not working.  
- Chat and Auth templates not loading.  
- Dropdown menu preview broken on the board.  
- New files not being added to their default folder.  
- Assignment operators not supported.  
- Pages with required arguments breaking routing.  
- AI generating private widgets that were not editable.  

---

## **3.0.4 (29 August 2025)**

#### **Fixed 🩹**  
- Issue with server error `500` when using the AI agent (`https://tools.ietf.org/html/rfc9110#section-15.6.1`).  
- Issue with Android builds failing.  
- Issue with incorrect Apple Bundle ID formatting.  
- Issue with `application/x-www-form-urlencoded` body format.  
- Issue with screens crashing when fetching data using future-based values.  
- Issue with `SliverToBoxAdapter` not being defined.  
- Issue with changing colors of SVG icons.  
- Issue with Supabase project connections.  
- Issue with missing `nowa_runtime` when creating new data models.  
- Issue with old error messages still appearing in Play mode.  
- Issue with deployment through CodeMagic.  
- Issue with OAuth login for Supabase.  
- Issue with global state not including required imports.  
- Issue with popup menu button not working when generated by AI.  
- Issue with backspace not functioning in the code editor search.  
- Various stability fixes and usability improvements across the builder.  


---

## **3.0.2 (12 August 2025)**

#### **Fixed 🩹**  
- Issue with building apps due to a package version conflict.  
- Issue with iOS deployment preventing some apps from being published.  
- Issue with project loading caused by conflicts in widget names.  
- Issue with AI tool results where `tool_use ids were found without tool_result`.  

---

## **3.0.1 (11 August 2025)**

#### **Fixed 🩹**  
- Fixed **Desktop App access** not available for some plans.  
- Fixed **Board naming** issue where new boards were created with `board*.board` instead of the assigned name.  
- Fixed **AI on macOS** not running on certain versions due to `FileSystemException: '/ai_debug_logs'` error.  

---

## **3.0.0 BETA (4 August 2025)**

#### **Added ✨**  
- **AI Agent (Beta)**  
  - Generate full screens, widgets, or features from a single prompt  
  - Edit or fix logic and UI across your app — even without selecting anything  
  - Understands app context and builds multi-screen flows intelligently  

- **Supabase Integration**  
  - Native support for Supabase Auth  
  - Build queries using AI  
  - Support for row-level security  

- **New Theme System**  
  - Manage design tokens visually  
  - Preview theme changes instantly from the left sidebar  

- **Component Explorer**  
  - View all components inside each screen  
  - Highlights selected elements in the outline and canvas  

- **New Plans & AI Credits System**  
  - New Free, Launch, and Scale plans  
  - Up to 200 AI messages/month and AI credit top-ups  
  - Free plan now includes code export, desktop version, and local projects  

#### **Fixed 🩹**  
- Many improvements for performance and stability across the builder  


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
- **AI Chat Template**: Quickly build chat-based apps using the built-in, fully functional chat template, complete with chat bubbles and logic. [Read more](../tutorials-template/chat-template.mdx)
- **Quick Navigation to Functions & APIs**: New "open" icon next to functions and API requests to instantly jump directly to their definitions.

#### **Fixed 🩹**  
- Fixed details panel not showing edit button for some custom expressions.  
- Fixed web deployment issue causing older projects to deploy an empty app.  
- Fixed gray box covering file system when deleting some files.  
- Fixed file panel not updating after adding or removing a file.  
- Fixed OnValue not opening for API requests in Circuit.


## **2.0.17-beta (5 March 2025)**  

#### **Added ✨**  
- **Web Deployment**: Deploy your web apps online directly from Nowa in development or production mode, with an option to download build files for external hosting. [Read more](../deployment/web-deploy.mdx)
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
  Easily reveal or hide additional content by adding collapsible sections to your app. Ideal for creating organized and dynamic layouts. [Learn more](../ui/widgets/widget-desc/expansion-tile.md) 

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
- **Themes Management:** Add and manage multiple themes with customizable colors and typography. Dynamically switch themes during runtime. [Read more](../ui/themes/create-themes.md)
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
