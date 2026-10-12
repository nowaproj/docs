# Phase 12, worker b (2026-10-11): optional reference widget shots

Rows: reference-forms-2, reference-lists-2, reference-media-2, reference-navigation-2. Live Nowa 3.13.0 playground at
`https://app.nowa.dev/playground`, signed out.

## Captured

| id | file | alt text | checked |
|---|---|---|---|
| reference-forms-2 | /img/docs/reference/reference-forms-2.png | Variables and Details for a group of two Text Fields wrapped in a Form: Variables lists text, text1 and formKey (highlighted). The Form section of Details (highlighted) has a text validator and a text1 validator row, each open with its Message (Field is required) and + Add validator. | yes (3.13.0) |
| reference-lists-2 | /img/docs/reference/reference-lists-2.png | The home screen on the board with a List View whose Item Count is 5 (highlighted): the first Placeholder item is drawn at full strength and the four below it are faded. | yes (3.13.0) |
| reference-media-2 | /img/docs/reference/reference-media-2.png | The home screen on the board with the three stand-ins stacked (highlighted): the Video Player as a black box reading Designer mode with a play icon, the YouTube Player as the video thumbnail with its title (Meet Nowa: the first app builder for profes...), and the Web View as a sketch placeholder reading Web view to https://nowa.dev and Run to preview. | yes (3.13.0) |
| reference-navigation-2 | /img/docs/reference/reference-navigation-2.png | Details for a selected Bottom Navigation Bar: Current Index linked to pageIndex (highlighted), then Background, Elevation, Type and Landscape. The second highlight holds Unselected and Selected with their Edit buttons, On Tap with Edit, and the Items strip with the home and call tabs, the + button, the left and right arrows and the remove button; Label (home), Active Icon, Tooltip and Semantics follow. | yes (3.13.0) |

## Not taken

None: all four rows were taken (each shows something the page's existing image does not).

| id | status |
|---|---|

## Live check

| page | claim | what the UI shows | suggestion |
|---|---|---|---|
| docs/reference/widgets/forms.md | Check the whole form, step 1: "Select the group that holds your fields. Click a field, then its parent in the breadcrumbs at the top of Details." | A click on a Text Field on the board selects nothing (the field takes the click, even after deselecting and clicking again). With the field selected in the Outline, the breadcrumbs read HomePage > Stack > TextField, and the group (Stack) is the parent to click. | Select the group that holds your fields: in the Outline, click a field, then click its parent in the breadcrumbs at the top of Details (or click the group row in the Outline directly). |
| docs/reference/widgets/forms.md | Check the whole form, step 7: "click the Condition label, open LOCALS, pick formKey, then choose currentState and validate." | Correct, but the Link Condition list opens on Custom Expression..., Create Param..., Create Variable..., Compute... and a long list of library groups. LOCALS is near the bottom (after OPERATORS), so it is out of sight until you scroll. formKey, then currentState, then validate() (highlighted as the bool match) work as written. | Minor: "click the Condition label, scroll down the list and open LOCALS, pick formKey, ..." |
| docs/reference/widgets/forms.md | Add a Text Field, step 2: "Nowa adds a variable called text to the screen or component and links the field's Controller to it." | True when the field lands inside a screen. With the pointer on the screen title bar when Enter was pressed, the field landed loose on the board (Layout shows X and Y) with an empty Controller and no variable. | Minor: add "Point at the screen before you press Enter: a field that lands loose on the board gets no controller." |
| docs/reference/widgets/lists.md | Know what the board shows: "If Nowa can't work out how many items there are, for example because the list has no value yet, the board shows 20." | A String list variable with no entries (As List, Default Value 0) connected under List shows three sample items on the board (the first at full strength, two faded), and Item Count reads var1 length. Play then shows no items. The 20 fallback exists in code (list_grid_view_custom_view.dart) only for a count that evaluates to null, which this case did not reach. instant-play.md already says a list shows three sample items. | Replace the example: "If the connected list has no entries yet, the board shows three sample items so the design never looks blank. Press Play to see the real list: it stays empty until your logic fills it." Keep the 20 only for a count Nowa cannot work out at all, or drop it. |
| docs/reference/widgets/media.md | Know what the board shows: "Web View: a placeholder that says "Run to preview"." | The placeholder (a light-blue page sketch) has two lines: "Web view to https://nowa.dev" (the Url) and "Run to preview". | Minor: "Web View: a page sketch that says "Web view to" and your address, then "Run to preview"." |
| docs/reference/widgets/media.md | Show a web page: "Run your app to see the page." and, under Know what the board shows, "Three show a stand-in until you run your app". | In Instant Play in the web playground the Web View already loads the live page (nowa.dev with its Get Started button). The Video Player and YouTube Player only showed loading spinners in Play here (sandbox network), so they were not judged. | Minor: "Press Play or run your app to see the page." (checked in the web editor only; the desktop app may differ). |
| docs/reference/widgets/navigation.md | Add a bottom navigation bar, steps 1-2: set the bar in the screen slot, then "Nowa adds a variable called pageIndex ... It links Current Index to it and fills On Tap". | Set through the slot (Screen > Bottom Nav... > Search for a widget > Bottom Navigation Bar), the bar has the home and call tabs, but Current Index is a plain 0, On Tap is empty (+), no pageIndex variable exists, and the status bar logs "Could not find index for navbar: TypeError ...". Added from the Library instead (Ctrl/Cmd + K, Enter), Nowa does create pageIndex (int), links Current Index and fills On Tap (Edit), but on the starter home screen the bar lands inside the body Stack (with L, T, W, H), not in the slot. In code the pageIndex connector runs only when a widget is added to the tree (nav_bar_info.dart, onAdd), not for the slot picker. | Either describe the slot result ("Current Index starts at 0 and On Tap is empty: click the Current Index label, choose Create Variable... to make pageIndex, then open On Tap, set pageIndex to value and add refresh") or report the slot route as a product bug and keep the text. reference-navigation-2 shows the wired state (Current Index pageIndex, On Tap Edit), which matches the end result either way. |
| docs/reference/widgets/navigation.md | Add a bottom navigation bar, step 3: "Change its Label, or click the brush next to Icon and pick another icon in Details." | Under the Items strip the selected tab shows Label, Active Icon, Background, Tooltip and Semantics. There is no Icon row and no brush. Each tab icon is an Icon widget under the bar in the Outline; selecting it shows an Icon field (with Size and Color) in Details. | "Change its Label. To change its icon, select the tab Icon under the bar in the Outline and click the Icon field in Details (see Choose an icon)." |
| docs/reference/widgets/navigation.md | Add a bottom navigation bar, step 3: "A bar needs at least two tabs: Nowa says "Cannot have less than 2 items"." | With two tabs left, the remove button does nothing and no message appeared (shots at 0.1, 0.5, 1.2 and 2.5 s, OCR found no such text). With three tabs it removes the selected tab, and + copies the last tab, as written. | "A bar needs at least two tabs: with two left, the remove button does nothing." |

Checked and matching (no change needed): forms.md Add Wrapper > "Search for a wrapper" > Form adds formKey and a Form
section with one validator row per field; the validator rows there open and edit like on the field (Message "Field is
required", + Add validator); Circuit: On Pressed Edit, the dot's + > Add If statement, Condition > formKey > currentState >
validate(); in Play an empty field turns red and shows "Field is required". lists.md: a new List View is a Builder with
three placeholder items; Item Count 5 shows five, the first at full strength; Play shows all at full strength; List >
Connect > LOCALS > a list sets List to its name and Item Count to "<list> length". media.md: Video Player, YouTube Player
(Initial Video Id 9Q2MZes5lt8, Auto Play off, Mute on) and Web View (Url https://nowa.dev) start as described; adding the
YouTube Player with Enter opens Add Missing Dependencies (youtube_player_flutter ^9.1.3) and Add works in the playground.
navigation.md: an empty slot shows null; the slot opens the "Search for a widget" picker; the bar starts with home and
call tabs; Edit next to Unselected opens Color, Show label and style; deleting the bar removes pageIndex.

## Notes (not docs claims)

- Product bug: List View > List > Connect > Create Param... shows "Null check operator used on a null value" in the
  status bar and creates nothing.
- instant-play.md (not my page): clicking the play button in the title bar of a hovered but unselected screen did
  nothing (three tries); clicking the title first (selects the screen) and then the play button started Play every time.
- Capture tips for 3.13: collapse arrows (validator rows, Outline expand arrows) react on the right half of the glyph
  (about 3 px right of its centre); board clicks on a Text Field or a Bottom Navigation Bar select nothing (use the
  Outline); a marquee drag with a 200 ms hold, or a 12 px Space + drag pan, opens the board context menu (Undo, Redo,
  Save, Create a page, Paste), which a click on empty board closes. A wheel over the board while nothing is selected
  pans it (Details is short then), so scroll Details only with something selected.

