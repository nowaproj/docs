# Phase 11 captures: paid plan (publish, Git)

Captured on 2026-10-11 at https://app.nowa.dev (Nowa 3.13.0, status bar `v3.13.0-79`), signed in with the test account on
the Scale plan, in a new cloud project **Docs capture paid** (Personal workspace). Work folder:
`.../scratchpad/p11-paid/` (CDP 9341).

## Captures

| id | file | alt text | checked |
|---|---|---|---|
| publish-ios-1 | /img/docs/publish/publish-ios-1.png | The iOS tab of the Deployment page for a project with no Apple credentials: the Distribution Certificate card with its warning icon, Generate, the Certificate Private Key field with Browse and Save, and the App Store Connect section (highlighted) with Key ID, Issuer ID, the Private Key File box, Browse and Save. | yes (3.13.0) |
| publish-android-1 | /img/docs/publish/publish-android-1.png | The Android tab of the Deployment page with Debug mode off: the saved Signing Key card (highlighted) with its check mark, the SHA-1 and SHA-256 fingerprints with copy buttons, the download icon and Remove, and below it the Start New Build card with the main branch and the Build button. | yes (3.13.0) |
| publish-web-1 | /img/docs/publish/publish-web-1.png | The Web tab of the Deployment page after publishing: the Your Website card with Published Oct 11, 2026 and a green dot, the Expires In: countdown, the site address with its open and copy icons (highlighted), the Custom Domain field with Set, Download Files, Deactivate and Update. | yes (3.13.0) |
| code-git-1 | /img/docs/code/code-git-1.png | The Git panel opened from the Git icon in the left sidebar (highlighted), on the main branch: Staged Changes with one file (README.md), Changes with two files (home_page.dart and index.html), a commit message in the box above the Commit Staged button, and the collapsed Commit History bar at the bottom. | yes (3.13.0) |
| code-git-2 | /img/docs/code/code-git-2.png | Two steps side by side: the branch menu open below the main branch row, with the Search branches field (highlighted), the feature-title branch, a star on the current branch main and New Branch; then the Switch branch? dialog shown after clicking feature-title with uncommitted changes, reading Your local changes conflict with feature-title., with Cancel and Bring my changes. | yes (3.13.0) |

## Not possible

| id | status |
|---|---|

## Live check

Checked on the paid plan against `docs/publish/index.md`, `android.md`, `ios.md`, `web.md`, `builds.md` and
`docs/code/git.md`. Everything not listed below matched the live UI word for word (labels, hover texts, dialog texts,
button states), see "Confirmed" further down.

| page | claim | what the UI shows | suggestion |
|---|---|---|---|
| publish/builds.md (also android.md) | "On **Android**, **Debug mode** decides which build you start." | Debug mode also switches which build list you see: debug and release builds have their own **Active/Latest Build** card and **History**. The switch is off every time the **Deployment** page opens, so with a debug build running the Android tab first shows the release view with "No builds yet" in **History** while the top bar reads **Deploying**. Turning **Debug mode** on shows the debug build. (Clicking the **Android Debug** row in the **Deploy** menu opens the tab with the switch already on, per `deploy_button.dart` `_openWorkflow`.) | Add to step 1 of "Start a build" or to "Browse past builds": "Debug and release builds are listed separately. **Debug mode** is off each time you open the page: turn it on to see your debug builds." |
| publish/web.md | "When the card shows **Expires In:**, the countdown is the time left until the site expires." | Right after the first publish on the Scale trial the card shows **Expires In:** 12 h (then 11 h 50 min, ...). | Fine as written; consider saying that on some plans a published site is temporary (the test account is on the Scale trial; check with the team which plans set an expiry). |
