# P13 fixes: pages changed after the local capture session

Sources: `_rewrite/captures/phase13/local.md` ("Things on the pages that didn't match what I saw" and "Note from the
user"), the product issues report (`nowaproj/nowa`, branch `claude/tender-pascal-quit5k`, `docs/platform_issues/`,
"Docs impact" lines of P34, P48, P49, P117, P150 to P158) and the code at `/home/user/nowa-master` (3.13.0,
`3cb32031c`). Rule for bugs (owner, 12 Oct 2026): pages describe 3.13.0 as shipped with the workaround until the fix
ships; where a screenshot couldn't be taken because of a bug, the text keeps describing how the feature works once
fixed, without the screenshot, and the shot goes in `_rewrite/MISSING-MEDIA.md`.

## Images embedded (from `captures/phase13/local.md`)

11 placed by `embed.py` at their placeholders: ai-connectors-2, ai-external-agent-1, integrations-firebase-auth-1,
-auth-2, -connect-1, -connect-2, -firestore-1, -notifications-1, logic-router-1, test-devices-1, test-share-2.
integrations-supabase-create-1 (no placeholder) went under "Create a new Supabase project" in
`docs/integrations/supabase/connect.md`. integrations-firebase-firestore-2 is not used: it highlights **Add Main
Collection** in the old **Files** popup, which 3.13.0 shows only through the hidden `?panel=files` address (D21), and
the P48 fix replaces that popup with a Firestore panel. The firestore-1 alt text lost its last sentence (the hidden
Files panel on the left).

## Text changes

| page | change | source |
|---|---|---|
| integrations/firebase/connect.md | Step 7: "Failed to recompile application." may show for a while and clears. New step 8: save (Ctrl/Cmd + S, or the status bar save icon until **All changes saved**) before reloading or closing. Warning: reloading soon after **Connect Apps** can lose the connection; connect again, Nowa reuses the apps | local.md (P155); `lib/widgets/save_options_popup.dart:81,91`; `packages/nowa_run/lib/src/nowa_run_manager.dart:146`; P155 Docs impact |
| integrations/firebase/connect.md | "Asks you to sign in again": Google's sign-in expires after about an hour; the page shows **Connect Firebase** with **Continue with Google**, for example after **Refresh/Update**; the project stays connected | local.md, P34 live check; `packages/data/lib/src/firebase/setup/views/sign_in_with_google.dart:43`; `firebase_api_service.dart:60-63` |
| integrations/firebase/auth.md | Step 2: the status bar may show "Unsupported operation: Unsupported invalid type…" while Problems says "No issues detected" (link to known issues) | local.md (P151) |
| integrations/firebase/auth.md | SHA step 3: if **Release key** is missing, create the signing key first (link) | local.md; `docs/publish/android.md` "Create a signing key" |
| integrations/firebase/notifications.md | New step 2: **Add Missing Dependencies** ("Package flutter_local_notifications requires the following dependencies", RECEIVE_BOOT_COMPLETED), click **Add**; then the Test box appears. Steps renumbered | local.md; `packages/core/lib/src/interpreter/packages/package_service.dart:282`, `dependency_system/missing_dependency_dialog.dart:47,86,95`, `dependency.dart:54` |
| integrations/firebase/notifications.md | Warning: sign-in expires after about an hour; click **Refresh/Update** before sending and sign in again if the page shows **Connect Firebase** | P34 root cause (`notification_settings.dart:183-185` vs `firebase_api_service.dart:60-63`) and live check |
| integrations/firebase/firestore.md | "What works today": existing queries work in the running app; in a Data Builder and Circuit after **Refresh/Update apps and config files** each time the project opens; after editing the files in code mode, click it too; add/set/delete must be written by hand because `add` and `doc` fail (**func**, "The function 'add' isn't defined.") | local.md (P49, P156) |
| integrations/firebase/firestore.md | Define your collections: **+ Field** adds `var1` as **String** with the name selected; type picker examples; the **Edit** panel's fields | local.md; `packages/core/lib/src/widgets/code/declaration_list_widgets.dart:345-352` |
| integrations/firebase/firestore.md | Build a query: step 2 mentions the refresh; after the table, `add` and `doc` can't be built in 3.13; **Create New Param** names it `addedParam` with the field's type; rename by double-click; if the builder looks empty, select the query again | local.md (P156, P157); `queries_builder/ui/query_argument_editor.dart:72,303`, `lists_widgets.dart:119,135` |
| integrations/firebase/firestore.md | Test: labels made from names (**Min Price**); whole numbers in a `double` parameter are dropped, type `50.5`; security rules apply ("No Data was found." plus an **Error:** line); preview wording for errors | local.md (P158); `queries_builder/ui/query_test_section.dart:94,102,194,204,237` |
| integrations/firebase/firestore.md | Data Builder step 3 and Circuit paragraph: refresh if the lists are empty | P49 Docs impact |
| test/share.md | Steps 2 to 4: the dialog's text and warning, **Make public** dimmed until ticked, **Cancel**; the link and the three icon buttons; turning the switch off makes it private. **Link options** opens a popup over the buttons | local.md; `packages/core/lib/src/settings/sharing_settings.dart:166-173,301-309,447-491` |
| logic/router.md | Table row and step 3: the row can keep showing **+**; don't click again, switch to code mode and back; Circuit opens on `redirect` with a **Return**. Step 5: search box | local.md (P150) |
| ai/connectors.md | "When the icon turns green" → highlighted, tooltip **Manage MCP** (the button's selected state); Figma warning: no window opens, steps describe the fixed flow (link to known issues); **Create New Project** first in the Supabase bullet | local.md (orange icon, P117); `packages/ai/lib/src/ui/chat_field/ai_chat_field.dart:391-394` |
| account/account-settings.md | Note under "Connect Figma": doesn't work right now | P117 |
| test/devices.md | DEVICES: if a device started after opening isn't listed, open another project and come back; a running emulator shows under DEVICES, not **Start an emulator**; a first iOS Simulator build can take a couple of minutes | local.md (P152); `lib/local_export.dart:94,118` |
| integrations/supabase/connect.md | Leads with **Create New Project** (owner's note): Before you start, intro line, step 4, the dialog image, "You can also create the project in the Supabase dashboard"; **Project Name** starts as the **Package Name** plus `-backend`; each Nowa project authorizes once | local.md note from the user, P153; `packages/data/lib/src/supabase/ui/sb_setup/project_selection_dialog.dart:278` |
| guides/complete-app.md | Connect step leads with **Create New Project** | owner's note |
| troubleshooting/known-issues.md | New entries: `#firebase-reload-after-connect` (P155), `#invalid-type-in-status-bar` (P151), `#figma-connect` (P117), `#redirect-logic-plus` (P150); keywords | as above |
