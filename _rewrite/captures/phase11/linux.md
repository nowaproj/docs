# Phase 11 captures: Linux desktop app (local projects, import, VS Code)

Captured on 2026-10-11 in the **Nowa Linux desktop app 3.13.0** (status bar `v3.13.0-79`), signed in with the test account
on the Scale plan. **These images were taken on Linux** (Ubuntu 24.04, Openbox window manager, virtual display at
1600x1000, so the images are at 1x). The app UI is the same as on macOS and Windows; every crop is the app's own content
except `code-vs-code-1`, which shows both windows. The app ran as an ordinary user named `you`, so paths read
`/home/you/...`. Work folder: `.../scratchpad/p11-linux/` (scripts, raw shots, logs).

How the build was obtained: signed in on app.nowa.dev, **Download Desktop App**, **Linux** in the **Download Nowa** dialog
(it opens `https://storage.googleapis.com/nowa-downloads/linux/Nowa-v3.13.0-linux-x64.tar.gz`, 57 MB, SHA-256 equal to
`linuxHash` from `server.nowa.dev/version/latest`), extracted it, ran `./install.sh` as the user.

## Captures

| id | file | alt text | checked |
|---|---|---|---|
| get-started-desktop-app-2 | /img/docs/get-started/get-started-desktop-app-2.png | The Set up local environment dialog on its Flutter step in the desktop app: the Install location field with Browse, the ticked license checkbox (highlighted) with its Android SDK Terms, Flutter license, Temurin JDK license and Privacy links, and the Flutter row marked Not installed with the Install button (highlighted). | yes (3.13.0) |
| code-local-projects-1 | /img/docs/code/code-local-projects-1.png | The New project dialog with the name Docs capture local and Advanced expanded: the Local-only project card ticked with its PRIVATE tag and the Path field with Browse (highlighted together), no Flutter SDK warning, and the footer Local-only projects stay on this device and can't use cloud features next to Create project. | yes (3.13.0) |
| code-local-projects-2 | /img/docs/code/code-local-projects-2.png | The Project Sync page of a local project linked to a cloud copy: the Local Project card marked Current and the Cloud Project card with its Open Project icon, the link icon between them, and the Sync from Cloud and Sync from Local buttons (highlighted). | yes (3.13.0) |
| code-import-1 | /img/docs/code/code-import-1.png | The Import project dialog for a pub workspace folder: the Project folder path with Browse and the open Package to open menu (highlighted) listing the workspace root as Workspace root, admin_app as App, shop_app as Has boards (selected) and ui_kit as Library. The menu covers most of the locked Local-only project card under Advanced, and the footer reads Imported locally — git and the other packages stay reachable. | yes (3.13.0) |
| code-vs-code-1 | /img/docs/code/code-vs-code-1.png | Nowa and VS Code side by side: on the left Nowa in code mode with lib/main.dart open and the Open in VS Code icon (highlighted) at the right end of the tab bar next to the preview toggle, on the right VS Code showing the same project folder with main.dart open (its tab highlighted). | yes (3.13.0) |

Notes on the images:

- `get-started-desktop-app-2`: the license box is ticked, so **Install** shows as enabled (the state between steps 3 and 4).
- `code-import-1`: the **Package to open** menu opens on top of the picker and covers the left part of the expanded
  **Advanced** card (only the card's orange border and "...or backups." stay visible). That is the real layout: the
  menu and the card can't both be seen at once.
- `code-vs-code-1`: VS Code is in its first-run Restricted Mode (folder not trusted); its Chat panel and banner were
  closed. Nowa's top-bar avatar (a default icon) is blurred.

## Not possible

| id | status |
|---|---|

(All five rows were captured.)

## Live check

Checked in the Linux desktop app against `docs/get-started/desktop-app.md` (Linux parts especially),
`docs/code/local-projects.md`, `docs/code/import.md` and `docs/code/vs-code.md`. Everything not listed matched the live
UI (see "Confirmed" below).

| page | claim | what the UI shows | suggestion |
|---|---|---|---|
| get-started/desktop-app.md | "The Linux download is a 64-bit archive named like `Nowa-v<version>-linux-x64.tar.gz`, made on Ubuntu 24.04." | Name and `nowa` folder are right. The bundled `librive_native_plugin.so` and `libgit2` need glibc 2.38 and libstdc++ 13 (`GLIBC_2.38`, `GLIBCXX_3.4.32`; the build workflow says so too), so older distributions can't run it. The app also needs GTK 3 and the EGL/GLES libraries: without them it exits with "Couldn't open libEGL.so.1", then "Couldn't open libGLESv2.so.2". | Add: "It runs on Ubuntu 24.04 or newer, or another 64-bit distribution with glibc 2.38 or later and a desktop environment." |
| get-started/desktop-app.md | Set up Flutter, step 2: "The Flutter SDK download itself is about 1 GB." | The dialog says "Download the Flutter SDK (~1 GB)", but the Linux archive it fetched (Flutter 3.47.7 stable, `flutter_linux_3.47.7-stable.tar.xz`) is 1.58 GB and unpacks to 2.5 GB. The default **Install location** is `~/.nowa/sdks` (Flutter goes to `~/.nowa/sdks/flutter`). | "The Flutter SDK download itself is about 1.5 GB." Optionally: "The default location is the `.nowa/sdks` folder in your home folder." |
| get-started/desktop-app.md | Step 4: "Click **Install** next to **Flutter**. Keep Nowa open while it downloads." | The row shows "Downloading Flutter 3.47.7…" with a percentage, then "Verifying download…" and "Extracting Flutter…". The extraction runs inside the app and blocks its window: on this 4-CPU VM (busy with other work) the window stopped repainting (stayed black) and unpacking crawled at about 0.3 MB/s, so I stopped Nowa and used the manual route. Natively, `tar` unpacked the same archive in about 1 minute. | Add after step 4: "Unpacking Flutter can take a while, and Nowa may look frozen until it finishes. If it takes too long, install Flutter yourself and follow Use a Flutter SDK you already have." (Product issue reported below.) |
| get-started/desktop-app.md | Step 6: "On the **Verify** step, Nowa runs `flutter doctor`… Fix anything it reports, then click **Re-run checks**." | Correct. On Linux it listed the Flutter line (stable, 3.47.7, Ubuntu 24.04.4 LTS) and a red **Chrome** line, "Cannot find Chrome. Try setting CHROME_EXECUTABLE to a Chrome executable.", with **Linux** (`linux-x64`) under **Devices**. Nowa's own preview on Linux runs on Flutter's web-server device and works without Chrome. `flutter doctor` took about 4 minutes here. | Add: "On Linux, `flutter doctor` may report that Chrome is missing. You only need it to run web apps in Chrome yourself: Nowa's preview works without it." |
| get-started/desktop-app.md | Step 7: "The next screen lists **Android toolchain** and an optional **Android emulator**: click **Install** next to each one you want… You can add them later from **Local Setup**." | The Android screen has its own license checkbox: **Install** stays disabled until it's ticked again. **Android emulator** reads "Install the Android toolchain first" and stays disabled until the toolchain is in. The caption says "You can add these later from Settings → Environment" (the Local Setup page is titled **Environment**). The step header still shows only **Flutter** and **Verify**. | "Tick the license box on this screen too, click **Install** next to **Android toolchain**, then, if you want it, next to **Android emulator** (it unlocks once the toolchain is installed)." Optionally: "…later from **Local Setup** (the page is titled **Environment**)." |
| get-started/desktop-app.md | Use a Flutter SDK you already have, step 2: "click **Browse** next to **Flutter SDK Path** and pick the Flutter folder" | On Linux, **Browse** opens the folder picker through the XDG desktop portal (`file_picker` calls `org.freedesktop.portal.FileChooser`). Without a portal (for example a plain window manager) nothing opens. Typing the path works, but **Enter** adds a new line to the field (it's multi-line) and the value is saved only when you click outside the field. A path saved with that extra line shows **Invalid Flutter SDK path**. | "Click **Browse** and pick the Flutter folder, or type its path and click outside the field." (Same field type in New project, Import project and the other Local Setup paths; product issue below.) |
| get-started/desktop-app.md and code/local-projects.md | desktop-app step 3: "set **Default Projects Path**. New local projects start with this folder"; local-projects step 4: "Check the **Path**. It starts as your **Default Projects Path** from **Local Setup**." | True once it is set (with `/home/you/Projects` set, **Path** was prefilled). On a fresh install **Default Projects Path** is empty, so **Path** starts empty and **Create project** stops with "Path cannot be empty". | local-projects step 4: "Check the **Path**. It starts as your **Default Projects Path** from **Local Setup**. If you haven't set one, it's empty: click **Browse** or type a folder." |
| code/import.md | Step 2: "You can also paste a path and press <kbd>Enter</kbd>." | **Enter** adds a second line to the field and nothing else happens. Nowa reads the folder (and shows **Package to open**, the hint chips and the footer change) only after you click outside the field. | "You can also paste a path, then click outside the field." |
| code/import.md | What to expect on the board: "**A project without boards opens on an empty board.**" | A workspace package that already had a board (`shop_app/boards/main.board`) also opened on a new, empty board named **first**. On the first open Nowa opens `first.board` and creates it when there is none by that name (`lib/project/project_page.dart`, `tryLoadTabs`); the existing board was only listed in the board menu. | "On the first open, Nowa shows a board named **first**, an empty one unless your project already has a `first.board`. Open your own boards from the board menu in the top bar; your screens and components are in the Library…" |

### Confirmed (matched the live Linux app)

- desktop-app.md: **Download Desktop App** → **Download Nowa** with **MacOS**, **Windows**, **Linux** and "Download Nowa
  version: 3.13.0"; the archive extracts to `nowa/`; `./install.sh` prints "Nowa installed to /home/you/.local/share/nowa.
  Launch it from your applications menu.", copies the app there, adds the icon and `~/.local/share/applications/com.nowa.nowa.desktop`,
  and replaces an old copy on a rerun; sign-in page **Welcome back!** with **Continue with Google** and no Apple button; a
  local project appears under **On this device** (**LOCAL-ONLY**, "Opted out of the cloud — no Cloud Build, sharing or
  backups."); in a project the avatar menu has **General Settings** (and **Logout**); **Local Setup** under **Editor
  Settings** with **Automatic setup** / **Set up automatically**, **Flutter SDK Path**, **Default Projects Path**, **VS code
  Path** (`/usr/bin` by default on Linux); the **Run** menu has **Local environment settings** (plus **Embedded preview**
  and the **Linux** device); with Flutter already set, **Set up automatically** opens on **Verify** ("Running flutter
  doctor…"); the Flutter step texts (Install location, about 10 GB, no spaces, license sentence) match; Verify has
  **Re-run checks**, **Back**, **Done**, and "Android isn't set up — only needed to build Android apps." with **Download**;
  the Android screen has **Skip for now**. **Linux preview:** running a local project (**Run** → **Embedded preview**) shows
  "Your app is running", "The in-app preview is not available on Linux yet. Open it in your browser instead.", **Open in
  Browser** and the address (`http://localhost:32845`), after about 4 minutes of compiling here.
- desktop-app.md, Linux updates (**Download v…** and **Skip**, no in-place install) checked in code only
  (`update_overlay.dart`, `VersionInfo.canAutoInstall`): no newer version exists to trigger it.
- local-projects.md: New project dialog ("Name it and choose where it lives.", **Project name**, **Advanced**, the
  **Local-only project** card with **PRIVATE** and "Stored only on this device. No Cloud Build or backups.", **Path** with
  **Browse**, the two footers, **Create project**); the project was created in `~/Projects/docs_capture_local` (package-name
  folder) with routing, theme, a home page and a board, and opened; **View in folder** in the Files right-click menu (next
  to Remove file, Rename, Cut, Paste, Copy as path, Show file content); the ⋮ menu (**Open in safe mode**, **Upload to
  cloud**, **Remove from list**, **Delete**); **Upload to cloud** opens a dialog titled **Clone Project** with **Select
  Workspace** (**Cloud Projects** first) and **Clone to Cloud**, shows "Compressing, This process may take a few moments."
  and opens the cloud copy when done (about 5 minutes here); Settings → **Project Sync** shows the **Local Project**
  (**Current**) and **Cloud Project** cards (each with the package name and project ID), **Open Project**, **Sync from
  Cloud** / **Sync from Local** and the link icon with the tooltip **Unlink Project**.
- import.md: the New project arrow menu has **New project**, **Clone from GitHub**, **Import project**; the dialog ("Bring
  an existing Flutter project into Nowa.", workspace chip **Personal**, **Project folder**, **Browse**, **Advanced**, footer
  "Imported to the cloud — run, share and build from anywhere."); for the workspace: **Package to open** with the four hints,
  `shop_app` (the member with boards) preselected, the workspace chip hidden, **Local-only project** ticked and locked,
  footer "Imported locally — git and the other packages stay reachable."; **Import project** opens the project in place on
  `shop_app`; the package chip in the top bar has the tooltip **Package being edited** and lists the four packages; a `.nowa`
  folder (`settings.json`, `.gitignore`, `thumbnail.png`) is added.
- vs-code.md: code mode `<>`; **Open in VS Code** (tooltip) at the right end of the code tab bar next to the preview
  toggle; VS Code (1.141.0, official `.deb`) opened the project folder at the open file (`code . -g lib/main.dart`, window
  title "main.dart - docs_capture_local - Visual Studio Code"); **VS code Path** default `/usr/bin`.

### Suggestions that aren't mismatches

- vs-code.md: the first time, VS Code shows its own welcome and sign-in screens and opens the folder in Restricted Mode.
  Could add: "The first time, VS Code may ask whether you trust the folder: trust it to get full Dart support."
- local-projects.md, Project Sync: the cards show the package name (`docs_capture_local`) and the project ID, not the
  display name. Fine to leave as is.

## Product issues seen (outside the docs, for the team)

1. **Black window on Linux without NetworkManager.** Signed out, `GET /auth/profile` returns 401, and `_authorize`
   (`lib/router.dart`) then calls `Connectivity().checkConnectivity()`. On Linux that asks NetworkManager over the
   D-Bus system bus; with no system bus or no NetworkManager it throws, the redirect fails ("GoException: Exception during
   redirect: SocketException … /var/run/dbus/system_bus_socket") and the window stays black. Guard the check. It could also
   be a troubleshooting entry ("Black window on Linux: make sure NetworkManager is running").
2. **Path fields are multi-line** (`PathField` passes `maxLines: null`): **Enter** inserts a new line instead of submitting,
   so a path typed into Local Setup can be saved with a trailing new line ("Invalid Flutter SDK path").
3. **Browse needs the XDG desktop portal** on Linux (`file_picker`); without it the click does nothing (unhandled
   `org.freedesktop.DBus.Error.ServiceUnknown`).
4. **Automatic Flutter setup blocks the UI** while it unpacks the `.tar.xz` in the app (`extractFileToDisk` on the main
   isolate): the window stops repainting during "Extracting Flutter…". The dialog also says ~1 GB for a 1.58 GB download.
5. **Imported project opens a new empty `first` board** even when the package has boards: on the first open (no saved
   editor state) `tryLoadTabs` opens `first.board` and creates an empty one when it's missing, whatever other boards
   exist. For a workspace it also looks for `boards/first.board` at the workspace root before the package's folder.
6. On Linux the **Run** menu still describes **Embedded preview** as "Instant · runs inside Nowa", although it opens in the
   browser there.
7. The **How much would you rate Nowa?** popup appears 2 minutes after each dashboard load until feedback is submitted
   (**Cancel** doesn't stop it) and takes keyboard focus from whatever you are typing.

## Environment notes (not product behaviour)

- Display `:93` (Xvfb 1600x1000x24, Openbox); another agent used `:99`, which I didn't touch.
- Installed with `apt-get` for the app and the rows: `xdotool`, `openbox`, `libegl1`, `libegl-mesa0`, `libgles2` (the
  app needs EGL/GLES), and VS Code 1.141.0 from Microsoft's official `.deb` (Microsoft's apt repository not added).
- This container has no D-Bus system bus or NetworkManager (issue 1), so the app got a private bus with a small
  NetworkManager stand-in reporting full connectivity (`scripts/nm_stub.py`), and a session bus. There is no XDG portal,
  so paths were typed. HTTPS went through the agent proxy (`HTTPS_PROXY`, which Dart's HttpClient honours).
- Flutter: Nowa's **Install** downloaded the official 3.47.7 archive (SHA-256 equal to Flutter's release manifest), but
  its in-app extraction was far too slow here, so I extracted that same archive with `tar` to `~/development/flutter`,
  disabled Flutter/Dart analytics, and set **Flutter SDK Path** in Local Setup (the docs' second route).
- The app ran as user `you` (VS Code refuses to start as root, and `/root/...` paths would mislead in docs images).

## Lasting effects

- Test account: a new cloud project **Docs capture local** (Personal, no workspace), created by **Upload to cloud** from the
  local project of the same name and linked to it on this machine. Left in place. No build, publish, AI prompt or
  connected account.
- This machine: user `you` (`/home/you`, 3.4 GB: Nowa in `~/.local/share/nowa`, Flutter 3.47.7 in `~/development/flutter`,
  local projects `~/Projects/docs_capture_local` and the imported `~/Projects/docs_capture_workspace`, a VS Code profile)
  and the packages above. I signed out of the desktop app at the end (its saved tokens are gone) and stopped Xvfb `:93` and
  the helper processes.
