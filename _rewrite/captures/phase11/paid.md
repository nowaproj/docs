# Phase 11 captures: paid plan (publish, Git)

Captured on 2026-10-11 at https://app.nowa.dev (Nowa 3.13.0, status bar `v3.13.0-79`), signed in with the test account on
the Scale plan, in a new cloud project **Docs capture paid** (Personal workspace). Work folder:
`.../scratchpad/p11-paid/` (CDP 9341). No email, name, username or avatar is visible in any final image (Commit History,
which shows the commit author, stays collapsed in the Git shots; the top-bar avatar is outside every crop).

## Captures

| id | file | alt text | checked |
|---|---|---|---|
| publish-ios-1 | /img/docs/publish/publish-ios-1.png | The iOS tab of the Deployment page for a project with no Apple credentials: the Distribution Certificate card with its warning icon, Generate, the Certificate Private Key field with Browse and Save, and the App Store Connect section (highlighted) with Key ID, Issuer ID, the Private Key File box, Browse and Save. | yes (3.13.0) |
| publish-android-1 | /img/docs/publish/publish-android-1.png | The Android tab of the Deployment page with Debug mode off: the saved Signing Key card (highlighted) with its check mark, the SHA-1 and SHA-256 fingerprints with copy buttons, the download icon and Remove, and below it the Start New Build card with the main branch and the Build button. | yes (3.13.0) |
| publish-builds-1 | /img/docs/publish/publish-builds-1.png | The Latest Build card of a finished Android debug build: Build Info with the build ID, Status Finished, Branch main, Started and Duration, the app-debug.apk file under Artifacts (highlighted), the Steps list with a check mark and duration for each stage and the Publishing step open on its log (highlighted), and the History list below with one finished build and the 1 of 1 page counter. | yes (3.13.0) |
| publish-web-1 | /img/docs/publish/publish-web-1.png | The Web tab of the Deployment page after publishing: the Your Website card with Published Oct 11, 2026 and a green dot, the Expires In: countdown, the site address with its open and copy icons (highlighted), the Custom Domain field with Set, Download Files, Deactivate and Update. | yes (3.13.0) |
| code-git-1 | /img/docs/code/code-git-1.png | The Git panel opened from the Git icon in the left sidebar (highlighted), on the main branch: Staged Changes with one file (README.md), Changes with two files (home_page.dart and index.html), a commit message in the box above the Commit Staged button, and the collapsed Commit History bar at the bottom. | yes (3.13.0) |
| code-git-2 | /img/docs/code/code-git-2.png | Two steps side by side: the branch menu open below the main branch row, with the Search branches field (highlighted), the feature-title branch, a star on the current branch main and New Branch; then the Switch branch? dialog shown after clicking feature-title with uncommitted changes, reading Your local changes conflict with feature-title., with Cancel and Bring my changes. | yes (3.13.0) |

Capture notes:

- **code-git-1/2:** the **Git** panel works on a cloud project without any GitHub account (Git runs on Nowa's servers), so
  both rows were done. The project has no remote, so the branch menu in code-git-2 has no **Local** / **Remote** headings
  and no remote-only branch (in `git_details.dart` both headings only render when remote-only branches exist). The
  "earlier commit that is not pushed" of code-git-1 exists (every commit is unpushed without a remote) but is not visible
  because **Commit History** stays collapsed, as the row asks. code-git-2 is one composite of two real crops (menu, then
  the dialog cut out on its own dark background). code-git-1 and the code-git-2 menu were shot with the browser window
  600 px tall so the panel's top lists and its commit box fit in one compact image.
- **publish-builds-1:** the one Android build (debug, the cheapest option) was started at 13:29 UTC, stayed **Queued**
  for about 2 h 15 min, then ran **Building** and **Publishing** and **Finished** at 15:57 UTC (duration 7 min 40 s,
  artifact `app-debug.apk`). Shot with the window 2000 px tall so the card and **History** fit; the **Publishing** log
  was chosen because it is short and names the artifact (the **Install dependencies** log shows literal `&gt;`
  entities, see notes).
- **publish-web-1:** shot after the publish described under "Lasting effects".

## Not possible

None: all six rows were captured.

| id | status |
|---|---|

## Live check

Checked on the paid plan against `docs/publish/index.md`, `android.md`, `ios.md`, `web.md`, `builds.md` and
`docs/code/git.md`. Only two places differ from or leave out what the live UI does; everything else matched word for word
(see "Confirmed").

| page | claim | what the UI shows | suggestion |
|---|---|---|---|
| publish/builds.md (also android.md) | "On **Android**, **Debug mode** decides which build you start." | **Debug mode** also switches which builds you see: debug and release builds have their own **Active/Latest Build** card and **History**. The switch is off every time the **Deployment** page opens, so while a debug build ran, the Android tab first showed the release view with "No builds yet" in **History** and the top bar reading **Deploying**. Turning **Debug mode** on showed the debug build. (In code, clicking the **Android Debug** row of the **Deploy** menu opens the tab with the switch on: `deploy_button.dart` `_openWorkflow`.) | Add to "Start a build" step 1 or "Browse past builds": "Debug and release builds are listed separately. **Debug mode** is off each time you open the page: turn it on to see your debug builds." |
| publish/builds.md | "Along the way the status reads **Queued**, **Initializing**, ..." (nothing about waiting) | The debug build stayed **Queued** (all eight steps gray, no durations) for about 2 h 15 min before a build machine took it, then finished in 7 min 40 s. It kept going while the browser tab was closed and reopened. **Started** and **Duration** in **Build Info** count from when it left the queue (Started: 7m ago right after it finished), while the **History** row counted from the request while queued (38m ago, 1h ago ...). | Add after the status list: "A build can wait in **Queued** until a cloud build machine is free, sometimes for a long time. You can close Nowa: the build starts and finishes on its own." |

### Confirmed (no change needed)

- **index.md:** **Deploy** next to **Run**; menu rows **Web** (Not published yet → host name in green with **Redeploy**
  after publishing), **Android Debug**, **Android Release**, **iOS** (Not deployed yet; iOS shows **Set up** without Apple
  credentials; Android Debug shows **Queued…** with **Cancel** while building, then **Deployed 8m ago**); **Claim your
  Nowa Launch Benefits**; **Advanced build settings**; top-bar button reads **Deploying** while a build or publish runs;
  Deployment tabs **Android**, **iOS**, **Web** with **History** on the mobile tabs. **Project Details**: Project Name,
  Package Name, App Name, Bundle Identifier (placeholder `com.example.docscapturepaid...`), Build version `1.0.0`, Build
  number `1`, **App Icon** with **Change all** and Android, iOS, Web, macOS. **Permissions** lists iOS and Android switches.
- **android.md:** Debug mode note verbatim; **Signing Key** warning icon with **Missing signing key**; fields Keystore
  Password, Key Alias, Key Password, Key File + **Browse**, **Save**; **Build** off until a key is saved; **Generate** saves
  the key at once and opens **Important!** with only **Download**; the download is `android_signing_key.zip` holding
  `keystore.jks` and `key_info.txt` (Alias, Key Password, Keystore Password); afterwards check mark (**Signing key saved**),
  **SHA-1** / **SHA-256** with copy buttons, download icon (**Download Signing Key**) and **Remove** (its "Are you sure?"
  popup checked in code only, not clicked).
- **ios.md:** **Distribution Certificate** card holding the **App Store Connect** section; hover texts **Missing
  distribution certificate** and **Missing App Store Connect credentials**; **Generate**, Certificate Private Key + **Browse**
  + **Save**, Key ID, Issuer ID, Private Key File + **Browse** + **Save**; **Build** hover "Finish the workflow configuration
  above" and the red icon "Missing configuration. Check your workflow settings above". Code: pickers filter `.p12` and
  `.p8`/`.pem`; pencil **Change credentials**, X **Discard changes**. Nothing was generated or uploaded.
- **web.md:** **Publish** on the Web tab; status **Deploying** with **Cancel**; then **Published** + date, address, open icon
  (**Open in browser**), copy icon (**Copy**); **Custom Domain** field with **Set** on Scale (no **Premium**); **Download
  Files**, **Deactivate** (tooltip "Take down the current deployment"), **Update**; the address served the app (HTTP 200).
- **builds.md:** Branch defaults to the checked-out branch; reminder text verbatim; hover hints "Finish the workflow
  configuration above" and "A build is already running"; **Active Build** with status and **Cancel**; **Latest Build** header
  opens and closes the card; **Build Info** ID, Status, Branch, Started, Duration; **Artifacts**; **Steps** with status icon
  and duration, click opens the log; **History** row with icon and "7m ago", **1 of 1** with arrows; row opens **Build
  Details** (back arrow) with the same Build Info, Artifacts and Steps; "No builds yet" before the first build.
- **git.md:** badge on the **Git** icon counts changed files; the status-bar branch name opens the panel (code:
  `status_bar.dart` sets the side panel to Git); **Initial commit** exists in a new project; **Changes** / **Staged
  Changes** with counts; **Stage file** on hover; **Commit All** turns into **Commit Staged**; with no remote the button
  reads **Publish Branch**; branch menu opens below the branch row with **Search branches**, a star on the current branch and
  **New Branch**; **New branch from main** dialog with **Branch Name** and **Create Branch** switches to the new branch;
  **Switch branch?** "Your local changes conflict with feature-title." with **Cancel** and **Bring my changes**; commits use
  the account's name. Not seen: the "Committed successfully." snackbar (the commit went through; my next screenshot came
  2.5 s later).

### Product notes (not doc mismatches)

- The first web **Publish** stalled: the card sat on **Deploying** with an empty bar for 20+ minutes (in this phase the
  client runs `POST /projects/pubget` and `POST /projects/analyze` before creating the deploy job; the analyze never
  answered). After a tab reload the card read **Not Published** and no deploy job existed. The second **Publish**: pub get
  3 s, analyze 8 s, deploy job created, live about 4 minutes later. A web.md tip could say: "If **Deploying** shows no
  progress for many minutes, click **Cancel** and publish again."
- Right after the publish the **Git** panel showed "DioException [bad response]: error reading file for hashing:" with
  **Retry**; **Retry** loaded it. The publish also leaves `web/index.html` modified in Git (listed under **Changes**).
- The **Install dependencies** step log shows `&gt;` instead of `>` (HTML entities not decoded in the log view).
- The **History** row's "7m ago" does not refresh while the page stays open (Build Info said 15m ago for the same build).
- On the Scale trial the published site shows **Expires In:** 12 h right after publishing (web.md already says the
  countdown shows when the card has one).

## Lasting effects

- Created the cloud project **Docs capture paid** in the test account's Personal workspace.
- Generated and saved an Android signing key in that project (the zip was downloaded to the scratchpad only to list its
  two file names, then deleted; nothing printed).
- Ran one Android **debug** build (ID `6acb8f4875a1ebc50954f61c`), Finished, artifact `app-debug.apk`.
- Published the project to the web and left it live: `https://docs-capture-paid-2eccb2dd-production.preview.nowa.dev`
  (the card showed **Expires In:** 12 h at 14:14 UTC). It took two **Publish** clicks because the first never created a
  deploy job (see notes). No custom domain.
- Git inside the project: branch `feature-title` with one commit ("Change the home title"); on `main`, uncommitted:
  `README.md` (one added line, staged), `lib/pages/home_page.dart` (app bar title 'My Home'), `web/index.html` (changed by
  the publish). Nothing pushed (no remote), no GitHub sign-in, no Figma, no iOS action, no other project touched.
