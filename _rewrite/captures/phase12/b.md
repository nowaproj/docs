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
