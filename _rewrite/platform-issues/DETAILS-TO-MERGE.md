Details for existing rows from the review-log sweep (S1):
- P5: cause is `_kindName(plural: true)` adding "s" to "Class" (packages/nowa_ui/lib/library/library_panel.dart:971-979), still on dev.
- P24: the Supabase waiting dialog passes `getError: () => null` (packages/data/lib/src/supabase/ui/sb_setup/sb_oauth_setup.dart:194) and `_connect` throws "User not logged in" at :131; the timeout behaviour is R30.
- P25: camelCase tables also give a name with a space (`getAllTodo Items`), written as R19.
- P33: `sendPasswordResetEmail` (added at packages/data/lib/src/firebase/auth/fb_auth_manager.dart:51) is removed by no disconnect path (:121-134, :142-145); `google_sign_in` is removed only when the Google provider is on (:28, :135-140).
- P42: the Android URL-scheme filter hard-codes host `open.my.app` (packages/core/lib/src/interpreter/packages/integrations/app_links_package_config.dart:91), see R17.
- P58: Source = Custom only sets the dropdown's local state (packages/core/lib/src/fields/data_field.dart:217) and doesn't clear the call.
- P1 and P2: the sweep says both are fixed in 3.13.0 (the sheet lists K as "Add a widget" and four separate reorder keys); the B1 writer says P1's original row is fixed but 7 other rows still differ, and R28 lists two sheet entries that don't exist or don't do what it says.

Details from the notes sweep (S2):
- P4: the walkthrough engine is off in the release (`WalkthroughEngine.isEnabled = false`, walkthrough_engine.dart:11), so the lost Group highlight can't show anyway.
- P3: changes-3.13.md U8 says the "tooltip still shows ⌘B" caveat doesn't exist; the key only does nothing in code mode and the Run view.
- R12: New Folder is a third silent create with a different cause (M3).
- R23: Html (`flutter_html`, docs media.md:93) has no declared dependency either, and SVG/Lottie/Rive/video asset drops use the same unchecked drop path.
- R32: M13 adds three slips (Generate Models snackbar says the opposite, "New Create global state"/"New GlobalState", Bundle Identifier error "Invalid package name").
- P1: the sheet's "Open selection in new file" (⌘I) opens a new tab.
- R6: already covers the Fix-overwrites-hosted-package angle.

From the Git and integrations writer (B4b), to split out of existing entries:
- Inside P29: `ResolveConflictsDialog` **Accept Remote** is not awaited, so on any file except the last it writes the next file's Remote text into the file you resolved (a stand-alone Dart script mirroring the two functions reproduced it; the dialog itself was not run). Also any Accept clears the other conflicts from Git's index (libgit2 check). `NConflict.sha` is never passed to `commit()`.
- Inside P51: the RevenueCat **Enabled** switch installs the latest `purchases_flutter` (^10.15.2); the paywall pins `purchases_ui_flutter ^9.12.0`, which needs 9.x, so following the docs order gives an unsolvable pubspec (code and pub.dev data, not run).
