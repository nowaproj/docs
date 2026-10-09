# P10 live checks on Nowa 3.13.0 (app.nowa.dev/playground)

Run: 9 Oct 2026, headless Chromium 141 (Playwright 1.56.1 build 1194) on Linux, viewport 1440x900 at scale 1, driven with
`_rewrite/captures/tools/capture.mjs` (a patched copy in the scratchpad, see "Setup"). Version shown in the status bar: **v3.13.0-79**
(`app.nowa.dev/version.json` says 3.13.0). Starter app, playground, never signed in, no AI prompt, nothing saved or deployed, no package added
(the one place where a package prompt was offered was cancelled).
Evidence: `/tmp/claude-0/-home-user/9057e385-ad67-5a58-8715-2a4aa0e20670/scratchpad/live-checks/` (file names are given per item).

Status: IN PROGRESS (this file is written as the checks run).

## Setup notes

- Cookie banner: on the splash screen the banner reads "We use cookies to measure our advertising and improve Nowa. See our privacy policy." with
  **Reject** and **Accept**. **Reject** clicked first (`00-cookie-banner.png`, `00-cookie-banner-after-reject.png`; cookie `nowa_consent=v1.denied`).
  The capture session then sets the same cookie itself, so the banner never shows there.
- `app.nowa.dev` answers 403 for `/canvaskit/` and `www.gstatic.com` is blocked in the sandbox, so the engine never started. Fix (tool only, not the app):
  a scratchpad copy of `capture.mjs` answers the CanvasKit CDN requests from `/home/user/nowa-build/build/web/canvaskit/`; that 3.12.5 build has the same
  engine revision (`0cd610717bde95fd88343c64f81c11ba4e5c0010`) as the live 3.13.0 bootstrap. The editor then loads in about 2 minutes.
- The repo's `captures/README.md` coordinates are 3.12.5. 3.13 sidebar (from `01-first-load.png`): Assistant 67, **Library** 107, Themes 147, Search 187,
  Outline 227, Api 267, Supabase 307, Router 365. Top bar: starting-point chip, Back and Forward arrows (396, 424), Boards chip (484, 20) showing the
  board name ("first" on a fresh playground), `<>` 1313, gear 1351, **Save** 1405 (never clicked).

## Item 1: drag a Built-in widget whose package is missing, versus Insert

The starter app has only `nowa_runtime`, `provider`, `shared_preferences`, `dio` and `go_router`, so Lottie, Google Maps and SVG all miss their package.

What I did and saw (all on the Starter app's home screen, nothing added to the pubspec):

| Path | Result | Evidence |
|---|---|---|
| Search `lottie` in the Library, **drag** the **Lottie** row (Built-in, "Animations") onto the Home Page screen | **Drops at once. No prompt, no dialog.** The Lottie animation plays on the board. Details shows a **Dependencies** section with an info icon, a **Hot Fix** button and "Packages: lottie". The status bar error count goes 0 to 1. **Problems** (status bar count, Console, source "From Nowa") lists group **Packages (1)**: `'lottie' is imported but is not in the pubspec.` with a **Fix** button. | `05-lottie-dropped.png`, `06-lottie-problems.png` |
| **Drag** **Google Maps** (Built-in, "Integrations") onto the home screen | Same: drops, a 400 x 400 placeholder card "Google Maps / Run to preview" is placed, no prompt. Problems: `'google_maps_flutter' is imported but is not in the pubspec.` with **Fix**. | `13-googlemaps-dropped.png`, `14-googlemaps-problems.png` |
| **Drag** **SVG** (Built-in, "Images") onto empty board space (outside any screen) | Drops as a loose widget "SVG Image" (X 188, Y 429, 100 x 100) showing the Nowa logo. No prompt, 0 errors (a loose widget lives only in the board file). | `16-svg-dropped-on-empty-board.png` |
| Right-click the **Lottie** row, **Insert** | Dialog **Add Missing Dependencies**: "This widget requires the following dependencies", one bullet `Add package "lottie" to pubspec.yaml (version: ^3.3.2)`, buttons **Cancel** and **Add**. Nothing is placed until **Add** is clicked. I clicked **Cancel**: nothing was placed (`11-lottie-insert-cancelled.png`). | `09-lottie-row-context-menu.png`, `10-lottie-insert-result.png` |
| Ctrl+K (field reads **Add...**), type `lottie`, **Enter** | The same **Add Missing Dependencies** dialog. **Cancel** clicked. | `19-enter-in-add-mode-lottie.png` |
| Ctrl+K (**Add...**), then **double-click** a row (Lottie, Text, and the project's HomePage) | **No dialog and nothing inserted.** Text: no Text appears on the board. HomePage: the screen opens on its own (the board gives way to the screen, the top bar shows **Boards** > **HomePage**), and the search hint is back to **Go to...**. See item 2 for the cause. | `21-dblclick-in-add-mode-lottie.png`, `23-dblclick-text-in-add-mode.png`, `30b-dblclick-homepage-in-add-mode.png` |
| Recent list | After the three drops (and no Insert), Ctrl+K shows **Recent**: SVG, Google Maps, Lottie. A drop counts as "added to the board" for Recent. | `18-ctrl-k-add-mode.png` |

Also seen: the details card of the Lottie row (click) shows a live preview, "Lottie", "Widget · Animations" and "A widget allows seamless integration of Lottie animations, which are vector animations in JSON format or links". No **Dependencies** list, no **Open Documentation** link (`04-lottie-details-card.png`).

Confirms:
- `design/add-widgets.md` L29: "To have Nowa ask first, add such a widget with Enter or Insert rather than by dragging." Correct: a drop does not ask. The page still does not say what a drop does. What the user sees: the widget drops, the board shows it, **Problems** reports `'<package>' is imported but is not in the pubspec.` with **Fix**, and **Details** has **Dependencies** > **Hot Fix**. A sentence is worth adding.
- `design/add-widgets.md` L29 and `reference/widgets/index.md` L17: "Nowa opens **Add Missing Dependencies** when you add one with Enter or Insert". Confirmed for **Insert** (right-click) and **Enter** in add mode.
- `design/library.md` L64: "If a widget needs a package your project doesn't have yet, **Insert** first opens **Add Missing Dependencies**." Confirmed. The dialog text and the button names match.
- `reference/widgets/index.md` L26-27: "The Library's details card shows a preview, the name and the first lines of the description, but no **Dependencies** list or **Open Documentation** link." Confirmed.

CONTRADICTS:
- `design/add-widgets.md` L29: "adding the widget with <kbd>Enter</kbd>, **a double-click** or **Insert** opens **Add Missing Dependencies**". A double-click does not insert (see above and item 2). Drop "a double-click" there.
- `design/add-widgets.md` L15 (step 4): "Press <kbd>Enter</kbd>, or double-click the result. The widget lands where your pointer last was". A double-click in add mode opens (or does nothing) and ends add mode; it does not add.
- `design/library.md` L58: "Double-click a row while the search reads **Add...**." (listed under "You can also" add something). Same.

