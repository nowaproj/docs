# P15 M08 media review: REST API

Pages owned: `docs/integrations/rest-api/index.md`, `docs/integrations/rest-api/import.md`, `docs/integrations/show-data.md`.

Every sheet and image in `batch-M08.tsv` was looked at. Extra frames were pulled for m040 (2.8 s), m045 (11.5 s) and m046 (4 s, 6.5 s, cropped) to check what's readable.

Every Nowa video in this batch was recorded on Nowa 2.0.21 to 3.0.9 beta (the status bar reads v2.0.21-beta, v3.0.4-beta-9, v3.0.5-beta-10, v3.0.8-beta-13 or v3.0.9-beta-14). The editor around the API tools has changed since then. Those versions have a BETA / Feedback / Upgrade top bar, a floating **Outline** panel on the board, the board toolbar at the top and a shorter sidebar. In 3.13 the top bar has the project chip, Back/Forward, the board chip and Save, Outline is a sidebar item, and the toolbar sits at the bottom (see `get-started-editor-tour-1.png`). Some older clips also show the removed full-screen collection page (Name, Base URL, File Path, Api Requests grid). The rule is that a video counts only if every frame is valid, so all of them are OUTDATED. The **Edit collection details** dialog and the **Generate Models** dialog are still the same in 3.13 (`packages/data/lib/src/api/views/widgets/api_edit_collection_dialog.dart`, `packages/core/lib/src/model_generator/generate_models_dialog.dart` and `.../generate_models_dialog_selection/selecting_data_section.dart`: same title, subtitle, fields, info icons, Add header, KEY/VALUE table and Close; same three steps, Select All, collapse/expand icons, two panes and Back/Next). So I cropped the two old stills down to just those dialogs and added the crops.

## Items

| id | old page | what it shows | verdict | why | where added / what covers it |
|---|---|---|---|---|---|
| m017 | api/Openrouter.md | Collection's + menu (New Request, Import from curl), the Create New Request dialog, the request opening in the bottom panel | OUTDATED | v3.0.5 editor chrome (top bar, floating Outline, top toolbar); the dialog itself is still the same | Text steps at index.md "Add a request" |
| m018 | api/Openrouter.md | Picking POST in the method menu and typing the OpenRouter endpoint | OUTDATED | v3.0.5 chrome; the method list also shows DOWNLOAD, which the page doesn't list | index.md "Add a request" step 4 (text) |
| m019 | api/Openrouter.md | Adding an Authorization header, then pasting `Bearer sk-or-v1-46fa8fe45a57868a05d29a5b261b87…` | PRIVACY | A real OpenRouter API key is readable in the VALUE field in most frames (also v3.0.5 chrome) | - |
| m020 | api/Openrouter.md | Adding a Content-Type: application/json header | PRIVACY | The same OpenRouter key is readable in the Authorization row in every frame | - |
| m021 | api/Openrouter.md | Body tab radio buttons; adding a parameter in Params and renaming it textinput | PRIVACY | The OpenRouter key is readable in the first frame (Headers tab); the rest is v3.0.5 chrome | - |
| m022 | api/Openrouter.md | JSON body with `${textinput}` and the Pass Parameters in Body chip | OUTDATED | v3.0.5 chrome; no secret visible | index.md "Send values that change" (text) |
| m023 | api/Openrouter.md | Test view: typing a testing value, Run Test, Status 200 and the JSON answer | OUTDATED | v3.0.5 chrome | `integrations-rest-api-2.png` (index.md "Test a request") |
| m024 | api/Openrouter.md | The Generate Models dialog through all three steps (DeepseekModel) | OUTDATED | The dialog is current, but it shows the v3.0.5 editor dimmed behind it and in the closing frames; a still crop of the same dialog was added instead (m027) | index.md:140 (crop of m027) |
| m025 | api/Openrouter.md | Adding a TextField and a Button from the widget search | OUTDATED | v3.0.5 chrome and the old widget search popup | - |
| m026 | api/Openrouter.md | Button On Pressed → Circuit → API node → linking textinput to the text field | OUTDATED | Old Circuit: "All nodes for this circuit" list with an API category, a Link Textinput popup, and a Details panel docked inside Circuit | index.md example steps 3-5 (text) |
| m027 | api/Openrouter.md | Still: Select Data step of Generate Models, only content ticked, DeepseekModel preview | ADD (cropped) | Dialog unchanged in 3.13 (same steps, Select All, collapse/expand icons, two panes, Back/Next); cropped to the dialog so the old editor and the avatar don't show | index.md:140 (`/img/api2/post/model-select-data.jpg`), under "Turn the response into a model" step 2 |
| m028 | api/Openrouter.md | Still: onValue Circuit with showDialog and the Edit AlertDialog brush | OUTDATED | Uses the old onValue future callback; 3.13 uses await + Store result (index.md example step 6); old chrome | - |
| m029 | api/Openrouter.md | onValue → showDialog → AlertDialog title linked to `value.choices.first.content` | OUTDATED | Old onValue flow and the old link popup; v3.0.5 chrome | index.md example step 7 (text) |
| m030 | api/Openrouter.md | Play: typing a question, tapping Button, reply in a dialog | OUTDATED | Old Play view (Play Settings panel, Free Size, Show mockup frame, Device Size) and v3.0.5 chrome | - |
| m031 | api/createapi.md | Still: the TheCatAPI Edit collection details dialog with Base URL and an Accept: application/json header | ADD (cropped) | Dialog unchanged in 3.13 (code above); the page had no picture of this step. Cropped to the dialog to drop the v3.0.9 chrome and the avatar | index.md:54 (`/img/api2/post/collectionsettings-dialog.png`), after the Accept example in "Set the base URL, headers and sign-in" |
| m032 | api/createapi.md | Add Collection menu → Create New Collection dialog (ApiCollection → TheCatAPI) → Submit | OUTDATED | v3.0.4 chrome; the menu is covered by a current screenshot | `integrations-rest-api-1.png` (index.md:37) |
| m033 | api/createapi.md | Gear icon → Edit collection details → typing the Base URL | OUTDATED | v3.0.4 chrome; the same dialog was added as the m031 crop | index.md:54 (m031 crop) |
| m034 | api/createapi.md | Add header → Accept / application/json → Close | OUTDATED | v3.0.9 chrome; it ends on exactly what the m031 crop shows | index.md:54 (m031 crop) |
| m035 | api/createapi.md | New Request "catphoto", endpoint /v1/images/search, then Test with Auth token value | OUTDATED | v3.0.4 chrome | Text plus `integrations-rest-api-2.png` |
| m036 | api/createapi.md | Run Test, then Generate Models (CatphotoModel) through all three steps | OUTDATED | v3.0.4 chrome behind the dialog and in the first and last frames | index.md:140 (m027 crop) and `integrations-rest-api-2.png` |
| m037 | api/createapi.md | Image widget → Add Wrapper → Data Builder → Source API → catphoto → link Url to data[0].url | OUTDATED | Old widget search, old wrapper popup, the "Select API" popup and the old link popup; v3.0.4 chrome | `integrations-show-data-1.png` (show-data.md:34) |
| m038 | api/createapi.md | Play showing random cat pictures | OUTDATED | Old Play view and v3.0.4 chrome | - |
| m039 | importapi/postman.md | Postman: collection ⋯ → More → Export → Export collection dialog (Collection v2 / v2.1) → Export → save | PRIVACY | The workspace name "Ziad Imaish's Workspace" (a person's name) is readable in most frames. Also outdated: the dialog has Collection v2/v2.1 and an Export button, while the page (checked against Postman's current guide in P14) says **Export JSON** | - |
| m040 | importapi/postman.md | Nowa (v2.0.21): Import From → Postman → macOS file picker → old full-screen collection page | PRIVACY | The macOS username "ziadomaish" in the Finder sidebar and an avatar photo at the top right are readable. Also outdated: v2.0.21 editor and the removed collection page | `integrations-import-1.png` (import.md:18) |
| m041 | importapi/postman.md | Add Collection → Import from Postman → pasting Postman JSON → Import → GetUsers / PostCreateUser | OUTDATED | v3.0.8 chrome, and the dialog has a Documentation link; no private data (the `_postman_id` is a placeholder) | `integrations-import-1.png` (import.md:18) |
| m042 | importapi/swagger.md | Copying the swagger.json link on the Swagger Petstore page, then Import from Swagger in Nowa v2.0.21 | OUTDATED | v2.0.21 editor and the removed collection page; the Petstore part only shows a browser right-click (Arc), and the page already gives the URL | `integrations-import-1.png` (import.md:18) |
| m043 | importapi/swagger.md | Copying the Petstore JSON text and pasting it into Import From | OUTDATED | Same v2.0.21 editor and old collection page | `integrations-import-1.png` |
| m044 | importapi/swagger.md | Windows desktop: Import from Swagger → file picker → SwaggerPetstore collection | OUTDATED | v3.0.x chrome and the Documentation link in the dialog | `integrations-import-1.png` |
| m045 | importapi/xano.md | Xano: gear → Manage Instance → Metadata API & MCP Server → Manage Access Tokens → Create Access Token (name, expiry 7 days, scopes) → Token Created | PRIVACY | Readable: the account holder's name "Tóth Gellért" in the lower-left sidebar, the instance host `x8ki-ietl-twmt.n7.xano.io`, and the start of the new access token (`eyJhbGciOiJSUzI1NiJ9.eyJ4YW5vIjp7ImRibyI6Im1hc3…`). The flow itself still matches import.md's Xano steps | - |
| m046 | importapi/xano.md | Nowa v2.0.21: Import from Xano → pasting the token → Select an API Group → imported collections | PRIVACY | The pasted Xano token is readable in full (4 lines, frame at 6.5 s), plus an avatar photo and the instance base URL. Also outdated: v2.0.21 editor and the old collection page | - |

## Added

2 images on `docs/integrations/rest-api/index.md`, both new crops of old stills that are already in the repo (the source files were left where they are):

- `static/img/api2/post/collectionsettings-dialog.png`: crop 870x688+525+81 of `static/img/api2/post/collectionsettings.png` (m031), added at index.md:54.
- `static/img/api2/post/model-select-data.jpg`: crop 1348x798+393+112 of `static/img/api2/post/model.jpg` (m027), added at index.md:140, indented under list step 2.

No videos were added, cut or re-encoded. Nothing was added to `import.md` or `show-data.md`.

## Routed

- Optional, for M11 (`docs/logic/models.md`): the same dialog is used by **Generate Models From Json...**. If that page wants a picture, add it after step 3 ("In **Select Data**, tick the fields to keep…"), indented under the list item:
  `![The Select Data step of the Generate Models dialog: Select All is unticked and only content is ticked on the left, so the preview on the right keeps just choices, choicesItem and content.](/img/api2/post/model-select-data.jpg)`
  Leave it out if one picture of this dialog in the docs is enough.

## Open questions

1. **Secrets already public.** m019, m020 and m021 (`static/videos/api2/post/3.mp4`, `4.mp4`, `5.mp4`) show a readable OpenRouter key. m046 (`static/videos/api2/import/xano2.mp4`) shows a full Xano token, and m045 (`xano1.mp4`) a partial one plus a person's name. m039 and m040 (`postman-export.mp4`, `postman-json.mp4`) show a person's name or username. These files are still in `static/`, so they're served at public URLs, and `docsold2/data-old/creating-request.md` plus the `_rewrite/old-docs/` copies still reference some of them. Suggest the orchestrator removes them from `static/` (or confirms they aren't deployed) and tells the owners to revoke the OpenRouter key and the Xano token. The Xano token was set to expire after 7 days, so it has very likely expired already.
2. **Xano token video (m045).** This is the only third-party flow in the batch that still matches the page (the Xano Metadata API token steps in import.md). With the name in the lower-left, the instance host and the token blurred, it would fit after step 6 of "From Xano" in import.md. Blurring moving regions in a 13 s clip is fiddly, so I left it as PRIVACY for the orchestrator to decide.
3. The m022, m023 and m024 clips are only outdated because of the editor around the panel. If someone records the OpenRouter POST example again on 3.13 (with the key blurred), it would make a good video for the example on index.md.

## Counts

ADD 2 · COVERED 0 · OUTDATED 21 · NOT USEFUL 0 · PRIVACY 7 (30 items)
