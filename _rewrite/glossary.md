# Glossary (working reference for writers)

Exact UI names first. Use these terms the same way on every page. "Confirm" = writer/verifier must check the
exact label in code before using it. The public glossary page (`docs/reference/glossary.md`) is built from this.

| Term in the docs | Exact UI label(s) | Meaning / notes |
|---|---|---|
| Nowa AI | panel **AI Assistant**, sidebar icon **Assistant** | The AI agent. "Nowa AI" for the feature, "the agent" / "the AI" in running text. Never "Chat" or "AI Assistant" as a product name. |
| Design mode / Plan mode / Agent mode | chips **Design**, **Plan**, **Agent** (tooltip **Switch mode**) | Design: look and flow with demo data. Plan: reviewable plan, changes nothing. Agent: everything. |
| Thinking level | **Instant**, **Thinking** (default), **Deep Thinking** (tooltip **Switch thinking level**) | Old docs' "Think Mode" no longer exists. |
| Checkpoint | **Restore Checkpoint**, **Reapply Checkpoint** | Undo/redo an AI request's file changes. Old "Replay" label is gone. |
| Session | **New Session**, **Chat History**, **All Sessions** | Old "New Chat" label is gone. |
| Connector | Figma, Supabase (MCP) | Lets Nowa AI act on Figma/Supabase. Works in Agent mode. |
| External agent | **Connect External Agent** | Claude Code, Claude Desktop, Cursor driving Nowa. Enterprise, desktop app. |
| Dashboard | **What do you want to build?**, **Projects**, **RECENTS** | Home page after sign-in. |
| Cloud project | (default) | Stored in your Nowa account. |
| Local project | **Local-only project** (Advanced, desktop app), **On this device** | Stored in a folder on your computer. Desktop app only. |
| Desktop app | **Download Desktop App**, **Download Nowa** | "the desktop app" (Nowa Desktop). macOS and Windows. |
| Playground | `/playground` | Editor without an account. |
| Workspace | **Personal**, **Create workspace** | Shared space for projects and members. Roles **Owner**, **Editor**, **View Only**. |
| Board | board chip, **Create new board** | Design surface where screens, components and widgets sit. Lowercase in text. Never "canvas" for the board itself. |
| Board item | (title bar with **Play**, **Open in new tab**) | A screen, component or loose widget placed on a board. |
| Screen | **Screen** tool, **Create a page**; listed as **Page** in the Widgets panel | A page of your app. |
| Component | **Create component**; listed as **Component** | A reusable widget you build. |
| Widget | widget picker (Ctrl/⌘+K), **Widget** tool | A building block (Flutter widget). Confirm the picker's on-screen title. |
| Wrapper | **Add Wrapper** | A widget that wraps another (Padding, Scroll View…). |
| Widgets panel | sidebar **Widgets** | Lists your project's screens and components. Not the widget picker. |
| Details panel | **Details** | Properties of the selected item, right side of the board. |
| Variables panel | **Variables** (**Params**, **Variables**, **Functions**, **Globals**) | Data and functions of the selected screen/component, or the app's globals. |
| Outline | **Outline** | The widget tree. |
| Themes panel | **Themes** | App themes: colors, typography, widget styles. |
| Files panel | **Files** | Project files; assets live under **assets**. |
| Instant Play | UI action **Play** | Runs a board item in place, interpreted and instant (approximate). Always give the UI action. |
| Run | **Run**, **Run on**, **Embedded preview** | Compiles and runs the real app (Nowa Run / App Run). |
| Deploy | **Deploy**, Deployment page (Android / iOS / Web tabs) | Builds and publishes. Cloud projects. |
| Share Preview | **Share preview** / **Share Preview** (confirm case per place) | Link + QR to an interpreted preview. |
| Public project | **Public project** (Project Details → **Sharing**) | Anyone with the link can open a copy. |
| Circuit | **Circuit**, **Open in Circuit** | The visual logic editor. |
| Event | **On Pressed**, **On Tap**, **On Changed**… | A function property that starts logic. |
| Global state | **New Global State...**, **AppState** | App-wide state class. |
| Model | **New Model...**, **Generate Models From Json...** | Data class with fromJson/toJson. |
| Constants | **Constants**, **Custom Constants** | Project-wide values and integration secret keys (Project Settings). |
| Code mode | `<>` toggle in the top bar | Code editor over all project files. |
| Problems / Logs | Console tabs **Problems**, **Logs** | Opened from the status bar. |
| Project settings | App Settings (Ctrl/⌘ + ,): **Project Details**, **Sharing**, **Permissions**, **Constants**, **Packages**… | Confirm exact page names. |
| Support panel | floating support button (bottom right) | **Chat with support**, **Report an issue**, **Your tickets**, **Hire an Expert**. |
