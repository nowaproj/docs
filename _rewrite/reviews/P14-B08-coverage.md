# P14-B08 coverage: old pages vs the new integrations pages

Batch pages: `docs/integrations/` `index.md`, `show-data.md`, `constants.md`, `deep-links.md`, `google-maps.md`,
`google-sign-in.md`, `admob.md`, `revenuecat.md`, `rest-api/index.md`, `rest-api/import.md`.
Old pages: `_rewrite/old-docs/data-connections/api/*` and `data-connections/supabase/ui.md`.
Code refs are relative to `/home/user/nowa-master` (3.13.0, `3cb32031c`). Third-party steps were checked against the
official pages on 2026-10-12 (URLs in the evidence column and in `P14-B08-notes.md`).

Status legend: `covered` (already in the new docs) / `added` (brought back in this pass) / `obsolete` (gone or changed
in 3.13) / `not useful` / `dev-only` / `for other page`.

## data-connections/api/createapi.md (API Collection & API GET Call)

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| An API collection groups requests that share a base URL and headers | covered | `rest-api/index.md` intro and #create-a-collection | |
| Settings made on the collection apply to every request in it | covered | `rest-api/index.md#set-the-base-url-headers-and-sign-in` | |
| The dialog shows **Class name** (the name you use in Circuit) and **Path** (where the file is saved) | added | `rest-api/index.md#create-a-collection` | `packages/data/lib/src/api/views/widgets/create_collection_dialog.dart:70-78`; collections are singletons listed under the app's own category in Circuit: `packages/core/lib/src/interpreter/suggestion.dart:660-664`, `:689-721` |
| Create a collection: **+** → **New Collection** → **Submit** | covered | `rest-api/index.md#create-a-collection` | old lower-case labels corrected earlier |
| **Base URL**: type it once to avoid repeating (and mistyping) the address; set it from the settings icon | covered | `rest-api/index.md#set-the-base-url-headers-and-sign-in` | the "why" is now spelled out |
| What a header is (extra information sent with a request: sign-in, content type, response format, caching) | added | `rest-api/index.md#how-an-api-request-works` | general HTTP; https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers |
| Example header `Accept: application/json` (ask for JSON) added with **Add header**, key and value | added | `rest-api/index.md#set-the-base-url-headers-and-sign-in` | **Add header**, **KEY** / **VALUE**: `packages/data/lib/src/api/views/widgets/api_edit_collection_dialog.dart:222-246`, `packages/data/lib/src/api/views/widgets/headers_field.dart:33,52` |
| Create a request: **+** → **New Request** → name → **Create** → type the address | covered | `rest-api/index.md#add-a-request` | |
| With a base URL you only type the endpoint | covered | `rest-api/index.md#add-a-request` step 4 | |
| Test before you build a model ("required before the next step") | covered | `rest-api/index.md#turn-the-response-into-a-model` step 1 | |
| Generate a model: it turns raw JSON into named fields; **Run Test** → **Generate Model** → **Next** → pick fields → **Save**, rename or choose where to save | covered | `rest-api/index.md#turn-the-response-into-a-model` | |
| Show the data: wrap a widget in **Data Builder**, source **API Request**, pick the request, link a property (an image address) to `data` | covered | `show-data.md#add-a-data-builder`, `#use-the-data-in-your-widgets` | image example added to `show-data.md#use-the-data-in-your-widgets` |
| Old UI steps: close the request window, **Widgets** icon, **Get Data** | obsolete | Widgets panel replaced by the Library in 3.13 (decision D20); **Get Data** was a field of the old cat-API model | |
| Try it: **Play**, then **Refresh** to load a new picture | added | `show-data.md#see-it-on-the-board-and-in-play` | the on-board Play toolbar has **Stop** and no restart in 3.13 (`packages/designer/lib/src/play_mode/play_mode.dart:489-561`); playing again rebuilds the screen and calls the source again (`play_mode.dart:443-487`) |

## data-connections/api/Openrouter.md (POST request walk-through, OpenRouter as the example)

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| Create a request (**+** → **New Request** → name → **Create** → open it) | covered | `rest-api/index.md#add-a-request` | |
| Switch the method to **POST** to send data | covered | `rest-api/index.md#add-a-request` step 4 | |
| What each method means (GET reads, POST sends or creates, PUT/PATCH change, DELETE removes) | added | `rest-api/index.md#how-an-api-request-works` | https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods; methods offered: `packages/data/lib/src/api/utils/api_util.dart:11` |
| `Authorization: Bearer <token>` header: most APIs need proof you may use them | added | `rest-api/index.md#add-an-api-key-or-token` | request and collection headers: `headers_field.dart:33-69`; values ship in the app: `packages/data/lib/src/api/model/api_collection.dart:70-98` |
| Text before the colon is the header's key, after it the value | added | `rest-api/index.md#add-an-api-key-or-token` | |
| Add a `Content-Type` header; list of content types | obsolete | the body type now sets the content type: `packages/data/lib/src/api/views/api_panel/api_setup_panel/api_request_body/api_body_types.dart:4-12`, `body_type_actions.dart:36-60` | already said on `rest-api/index.md#add-a-request` ("Choosing a body type sets the content type for you"); YAML, protobuf and GraphQL types have no body type |
| A parameter carries a value that changes, such as what the user typed (old page: created in the **Body** tab) | covered | `rest-api/index.md#send-values-that-change` | created under **Params** in the right panel now: `packages/data/lib/src/api/views/api_panel/api_setup_panel/api_params_panel.dart:28` |
| Put parameters in the body as `${name}`; start from the example body in the API's docs | added | `rest-api/index.md#send-values-that-change` | `${name}` was already covered; the "copy the example from the API's docs and swap in your parameters" tip is new |
| OpenRouter body (`model`, `messages`) | not useful | | vendor-specific example; model IDs change. Replaced by a generic example |
| Test with a value for the parameter | covered | `rest-api/index.md#test-a-request` | |
| Build a model from only the parts you need | covered | `rest-api/index.md#turn-the-response-into-a-model` | |
| Add a **Text Field** and a **Button** for the request | added | `rest-api/index.md#example-send-what-someone-types` | |
| Button **On Pressed** → **+** → find the request → fill its parameter from the text field (controller → `text`) | added | `rest-api/index.md#example-send-what-someone-types` | controller and `text`: `docs/reference/widgets/forms.md` (verified there); request under the app's category: `suggestion.dart:689-721` |
| Show the answer in an alert dialog (old: **onValue** + **showDialog** + custom expression `value.choices!.first?.content` + **Eval**) | added | `rest-api/index.md#example-send-what-someone-types` | rewritten as **await** + **Store result** + `showDialog`, picking fields from the link menu; links `logic/circuit.md#future-options`, `logic/popups.md#show-a-dialog` |
| **Eval** means evaluate: checks the expression | covered | `logic/expressions.md#custom-expression` | |
| Final check in **Play** | covered | `rest-api/index.md#example-send-what-someone-types` (last step), `test/instant-play.md` | |

## data-connections/api/.authkey.md (unpublished draft)

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| Two ways to send a sign-in token: in a header, or from a saved **Shared Preferences** key | covered | `rest-api/index.md#set-the-base-url-headers-and-sign-in`, `#add-an-api-key-or-token` | `packages/data/lib/src/api/interceptors/generate_auth_interceptor.dart:4-23` |
| Why the Shared Preferences way suits signed-in users: save the token once, every request sends it | covered | `rest-api/index.md#set-the-base-url-headers-and-sign-in` | reworded with the why |

## data-connections/api/importapi/postman.md

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| Export from Postman: three dots → **More** → **Export** → format v2.1 → save the `.json` file | added | `rest-api/import.md#from-postman` | Postman v12: **Collections** → **View more actions** → **More** → **Export collection** → **Export JSON** (https://learning.postman.com/docs/getting-started/importing-and-exporting/exporting-data/). No format choice in v12, so no version advice |
| Upload the file: **Import** inside your collection → **Import from Postman** → **Upload File** → **Import** | covered | `rest-api/import.md#import-a-whole-collection`, `#from-postman` | old labels obsolete: the import is in the **Add Collection** menu and makes a new collection (`packages/data/lib/src/api/views/api_outline/api_outline.dart:146-179`); a picked or dropped file imports at once (`create_collection_dialog.dart:150-160`) |
| Paste the JSON → **Import** | covered | `rest-api/import.md#from-postman` | |

## data-connections/api/importapi/swagger.md

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| Paste the Swagger URL → **Import** | covered | `rest-api/import.md#from-swagger-openapi` | |
| Example to try: `https://petstore.swagger.io/v2/swagger.json` | added | `rest-api/import.md#from-swagger-openapi` | URL returns Swagger 2.0 JSON, title "Swagger Petstore", 20 operations (fetched 2026-10-12) |
| Paste the JSON text → **Import** | covered | `rest-api/import.md#from-swagger-openapi` | |
| Upload the file → **Import** | covered | `rest-api/import.md#from-swagger-openapi` | corrected: select or drop, starts at once |

## data-connections/api/importapi/xano.md

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| Get a Xano token: instance settings → **Metadata API & MCP Server** → **Manage Access Token** → **Create New Token** → copy | added | `rest-api/import.md#from-xano` | current Xano steps: profile icon → **Instances** → gear next to the instance → **Metadata API** → **Manage Access Tokens** → **New Access Token** → name, expiry, scopes → copy (shown once): https://docs.xano.com/xano-features/metadata-api. Scopes Nowa needs (read workspaces and API groups): `packages/data/lib/src/xano/xano_service.dart:16-29` |
| Paste the token: **Import** → **Import from Xano** → paste → **Import** | covered | `rest-api/import.md#from-xano` | no **Import** button; you pick instance, workspace and API group: `packages/data/lib/src/api/views/widgets/xano_import_step_view.dart` |

## data-connections/supabase/ui.md (Connect queries to UI)

| Item | Status | Where / evidence | Note |
|---|---|---|---|
| Do it yourself, or let Nowa AI do it | covered | `show-data.md` tip | |
| Add a **List View** | covered | `show-data.md#show-a-list` | |
| **Add Wrapper** → **Data Builder** → **Source** from **Custom** to **Supabase** → pick the query | covered | `show-data.md#add-a-data-builder` | |
| Show one field per row with the custom expression `data[index]['task']` | covered | `show-data.md#show-a-list` | replaced by **List** → **Connect** and `element` (`packages/core/lib/src/fields/list_view_field.dart`, W14 notes); no expression typing needed |
| What `data`, `index` and the field name mean | covered | `show-data.md#use-the-data-in-your-widgets`, `#show-a-list` | |
| **Eval** | covered | `logic/expressions.md#custom-expression` | |
| **Play** to see the result | covered | `show-data.md#see-it-on-the-board-and-in-play` | |

## Totals

| Old page | Items | covered | added | obsolete | not useful | dev-only | for other page |
|---|---|---|---|---|---|---|---|
| `api/createapi.md` | 14 | 9 | 4 | 1 | 0 | 0 | 0 |
| `api/Openrouter.md` | 16 | 7 | 7 | 1 | 1 | 0 | 0 |
| `api/.authkey.md` | 2 | 2 | 0 | 0 | 0 | 0 | 0 |
| `api/importapi/postman.md` | 3 | 2 | 1 | 0 | 0 | 0 | 0 |
| `api/importapi/swagger.md` | 4 | 3 | 1 | 0 | 0 | 0 | 0 |
| `api/importapi/xano.md` | 2 | 1 | 1 | 0 | 0 | 0 | 0 |
| `supabase/ui.md` | 7 | 7 | 0 | 0 | 0 | 0 | 0 |
| **Total** | **48** | **31** | **14** | **2** | **1** | **0** | **0** |

Beyond the old pages, this pass also added verified third-party steps the readers of these pages need (no old page
had them): RevenueCat dashboard setup, Test Store and sandbox testing; AdMob app and ad unit setup, App ID and ad unit
IDs, app readiness review, app-ads.txt; Google Cloud API keys and key restrictions for Maps; Google OAuth client IDs;
Android's `assetlinks.json` check for web links. Sources are in `P14-B08-notes.md`.
