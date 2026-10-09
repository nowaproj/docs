# P10 live fixes (Nowa 3.13.0)

Pages fixed to match `P10-live-checks.md` (live check on app.nowa.dev/playground, v3.13.0-79). Code reference: `nowa-master` at `3cb32031c`.
Where the live app and the code differ, the page says what was seen. Nothing was committed, no build was run.

Finding # = number in the short list at the top of `P10-live-checks.md`; "brief N" = item N of the fix brief.

| Page | Change | Finding # |
|---|---|---|
| `design/add-widgets.md` step 4 (was L15) | Dropped "or double-click the result". Added: a double-click doesn't add it; the first click ends add mode and the second opens the result if it has a file. | 1 (brief 1) |
| `design/add-widgets.md` "Add a widget that needs a package" (was L29) | Dropped "a double-click" from what opens **Add Missing Dependencies**: now **Enter** or **Insert**. | 1 (brief 1) |
| `design/add-widgets.md` same section | New paragraph: dragging a built-in widget from the Library onto a screen doesn't ask; it drops and the board shows it; **Problems** lists `'<package>' is imported but is not in the pubspec.` with **Fix**; **Details** shows **Dependencies** with **Hot Fix**; click **Hot Fix** to add the package. Kept "to have Nowa ask first, use Enter or Insert". Scoped to "onto a screen" because the loose SVG dropped on empty board space had no error and no **Dependencies**. | 7 (brief 2) |
| `design/library.md` "Add something to the board" (was L58) | Removed the bullet "Double-click a row while the search reads **Add...**". Added a sentence after the list: a double-click doesn't add; the first click ends **Add...**, the second opens the row if it has a file. | 1 (brief 1) |
| `design/library.md` "Use the keyboard" (was L106) | Typing from a focused row: the letter stays selected, so the next one replaces it; click the search field first to type a whole word (seen working in the other checks). | 2 (brief 3) |
| `design/library.md` "Use the keyboard" | "↑ on the first row goes back" became its own bullet: ↑ on the first result stops on its group heading, one more ↑ goes back to the search. | 2 (brief 3) |
| `design/library.md` "Use the keyboard" | New bullet: Ctrl/Cmd+K does nothing while the focus is in the Library; click the board, or press Esc in an empty search, and it works again. | 8 (brief 3) |
| `code/files.md` L25 | "a `.board` file opens a tab that says ..." became "clicking a `.board` file shows "Code view is not available for boards" in the editor and adds no tab". | 4 (brief 5) |
| `code/files.md` L25 | Extra, same sentence: "Leave code mode and pick the board in the **Boards** chip". The top bar has no **Boards** chip in code mode (item 5 "Also seen"; `design/boards.md` L21 says the same). Revert if unwanted. | 4 (extra) |
| `code/files.md` L36 (**New Folder...** row) | Added: the dialog is titled **New Directory in** followed by that folder's name (seen: `New Directory in pages`, `New Directory in lib`). | 3 (brief 4) |
| `code/files.md` L46 | Replaced "so a new empty folder appears first in the **Files** tree in code mode" with: a folder shows in the Library only when something is in it (kept, seen); "In the playground, a new empty folder isn't in the **Files** tree in code mode either." Scoped to the playground because local and cloud projects weren't tested and the code does add the new folder to the in-memory tree (`nfile_impl.dart` `createDirectory`). New link `../get-started/playground.md` (exists). | 3 (brief 4) |
| `reference/widgets/navigation.md` "Swipe between pages" step 3 (was L88) | Select the dots in the **Outline** (the AnimatedSmoothIndicator next to the PageView); clicking the dots on the board selects the Stack around them. | 5 (brief 6) |
| `reference/widgets/navigation.md` same list | New step 4: click **+** next to **Effect**, then choose a style with **Effect type**; **Effect** has no **+** until the project has the package. Old step 4 is now step 5. | 5 (brief 6) |
| `reference/widgets/navigation.md` package paragraph (was L93) | Added: no prompt when you add a **Page View** without the package; the dots still draw and **Problems** shows one error (`'smooth_page_indicator' is imported but is not in the pubspec.`). Split into two paragraphs; **Hot Fix** and migration sentences kept. | 5 (brief 6) |
| `reference/widgets/index.md` L57 (Page View row) | "choose its style with **Effect type**" became "click **+** next to **Effect**, then choose its style with **Effect type**". Not named in brief 6 but listed in finding 5. | 5 (brief 6) |
| `code/custom-code.md` L72 | "Each variant appears as its own canvas next to it" became "A variant without a `group:` appears as its own canvas below it". Code agrees (`widget_designer.dart` `_layOutVariants`: the component and ungrouped variants share the first column; each group gets its own column). | 6 (brief 7) |
| `code/custom-code.md` L73 | Dropped "(jumps to the preview code)". Live: `tag.dart` was open at line 1. Code: `canvas_titles.dart` opens the file and calls `navigate(declaration)`, but `DartEditor.navigate` selects a line only when the editor is already in code mode (`_wasInCodeMode`), so the code doesn't clearly show a jump. | 6 (brief 7) |
| `code/custom-code.md` L60 | Extra: "see the states side by side" became "see the states together" (same claim as L72). | 6 (extra) |
| `reference/shortcuts.md` L164 (Library search table) | "Go back from the first row to the search" became "Go back to the search from the first result. The first press stops on its group heading, and the next one reaches the search" (same as `design/library.md`). The first note and final report said L162; that is the table separator, the row is L164. | 2 (follow-up) |
| `reference/shortcuts.md` L168 (Library search table) | "Jump from a row into the search" now adds: the letter you type stays selected, so the next one replaces it. The "click the search field first" tip stays on `design/library.md` only, to keep the table row short. | 2 (follow-up) |
| `reference/widgets/media.md` L22 | "When a widget needs a package ... Nowa opens **Add Missing Dependencies** as you pick it" became "If a widget needs a package ... Nowa opens **Add Missing Dependencies** when you add it with Enter or **Insert**". Added: dragging the widget onto a screen doesn't ask; **Problems** lists the missing package and **Details** has a **Hot Fix** button. Link to the add-widgets section kept. "Pick it" also covers a drag, and the widget picker dialog (the code opens the dialog there too, `widget_picker.dart`) was not checked live, so only Enter and Insert are named. | 7 (follow-up) |
| `integrations/index.md` L46 | "Nowa shows **Add Missing Dependencies** when you add it" now reads "... when you add it with Enter or **Insert**". Added the same drag sentence as `media.md`. Link kept. | 7 (follow-up) |

## Kept on purpose

- `code/custom-code.md`: the `group:` columns with the group heading, "This package has no boards yet", Insert on a variant row at its `size:`, and the `design/` folder lookup were not tried live, but the code shows each one (`widget_designer.dart`, `canvas_titles.dart` `_GroupHeader`, `add_variant_to_board.dart`, `widgets_to_add.dart` `withVariant`, `variant_service.dart` `load`).
- `reference/widgets/index.md` L17 says **Add Missing Dependencies** opens for Enter or **Insert**. That is what was seen, so no change.
- Boards chip tooltip ("Boards (Ctrl B)"): no page describes the tooltip (`get-started/editor-tour.md` L31 doesn't quote it), so it was not added.

## Not changed, for the lead to decide

- `logic/navigation.md`: it has no Page View text (its L88 is the GoRouter **On Tap** step), so nothing to fix there. Finding 5 went to `reference/widgets/navigation.md` and `reference/widgets/index.md`.
- Seen while fixing the follow-up pages, left alone (not on the coordinator's list):
  - `reference/shortcuts.md` L79 (Ctrl/Cmd+K row): no note that the key does nothing while the focus is in the Library. Its section intro already scopes these keys to the board and the **Outline**.
  - `code/packages.md` L32 ("The same dialog appears when you add a widget that needs a package"): true for Enter and **Insert**, and it links to the fixed add-widgets section.

## Checks

- Every relative link and anchor in the nine edited pages resolves (script run from the scratchpad; headings and ids untouched, including `#add-a-widget-that-needs-a-package` and `#page-view`).
- No banned words from the style guide; new text keeps `<package>` inside code spans so MDX parses.
