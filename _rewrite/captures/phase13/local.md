# Local session captures (phase 13: Nowa 3.13.0-79, macOS)

Taken on a Mac on 11 and 12 October 2026 (times CEST) with Claude in Chrome (web app, throwaway test account) and computer use
(desktop app). The images are in `static/img/docs/<section>/<id>.png` on this branch. Every image was looked at after it was
taken. Each has the `#F7A93A` highlight on the control or area its row is about, no stray menus or tooltips, and every avatar
blurred; no email address, person's name or token is visible (the Project ID value in `integrations-firebase-connect-2` and the token
in `ai-external-agent-1` are blurred). Web images are PNG crops (706 to 1568 px wide); the two desktop images are native density.

For the cloud session: embed each image where its `CAPTURE: id=...` comment is (alt text from the table below), update the state of
these rows in `captures/requests/`, and check the pages named under "Things on the pages that didn't match what I saw".
Do not change the images.

## Captures

| id | file | alt text | checked |
|---|---|---|---|
| integrations-firebase-connect-1 | /img/docs/integrations/integrations-firebase-connect-1.png | The Firebase page in Settings after picking the docs-capture project: under Apps, the lines Android App, iOS App and Web App will be automatically created and the Connect Apps button, all highlighted. | yes (3.13.0, macOS) |
| integrations-firebase-connect-2 | /img/docs/integrations/integrations-firebase-connect-2.png | The whole connected Firebase page, top to bottom: Project ID with Refresh/Update apps and config files (highlighted), Authentication and Push Notifications (FCM) both on with the Xcode note and the Test Push Notifications box, the Providers row with Manage Providers, SHA Certificate Fingerprints with Setup, Go to your Firebase Dashboard, and Disconnect Project (highlighted). | yes (3.13.0, macOS) |
| integrations-firebase-auth-1 | /img/docs/integrations/integrations-firebase-auth-1.png | The Available Providers page opened from Add Provider: the note about enabling the selected providers in Firebase Authentication, then the Email/Password tile with a green check mark and the Google and Phone tiles with plus buttons. The note and the three tiles are highlighted. | yes (3.13.0, macOS) |
| integrations-firebase-auth-2 | /img/docs/integrations/integrations-firebase-auth-2.png | The SHA fingerprints page after clicking Setup: No keys found, the Release key section with SHA-1 and SHA-256 values and an Add button on each (highlighted), and the Add a key section with the keytool command, the Enter SHA-1 or SHA-256 field and Add Key (highlighted). | yes (3.13.0, macOS) |
| integrations-firebase-notifications-1 | /img/docs/integrations/integrations-firebase-notifications-1.png | The Push Notifications (FCM) switch, on, with its description and the Xcode reminder (highlighted), and below it the Test Push Notifications box (highlighted): Notification Title, Notification Text, Target Audience All Users, Deliver with sound on and Send Test Notification. It is filled in but not sent. | yes (3.13.0, macOS) |
| integrations-firebase-firestore-1 | /img/docs/integrations/integrations-firebase-firestore-1.png | The Queries editor for a query named productsByPrice: the builder rows FirebaseFirestore.instance, collection('products'), where price >= minPrice, orderBy price descending and snapshots, with the green check mark at the lower right (rows and check mark highlighted); below it the Test section with the Min Price parameter set to 20.5, the Restart button and a Preview that lists two documents as JSON, Running Shoes at 120 and Wireless Headphones at 79.99 (highlighted); and on the right the Params list with minPrice (highlighted). The Files panel on the left has queries.dart selected. | yes (3.13.0, macOS) |
| integrations-firebase-firestore-2 | /img/docs/integrations/integrations-firebase-firestore-2.png | The Collections editor for a collection named orders with status, total and customer fields, next to the Files popup for collections.dart showing Add Main Collection (highlighted) and, on the right, the Edit status details panel (highlighted). | yes (3.13.0, macOS) |
| logic-router-1 | /img/docs/logic/logic-router-1.png | The Circuit floating panel for a route's Redirect Logic: the redirect node, then an If Statement checking isUserSignedIn with a Return in the False branch and an empty True branch (highlighted), and the Details pane showing the Condition, FirebaseService().isUserSignedIn() (highlighted). | yes (3.13.0, macOS) |
| test-devices-1 | /img/docs/test/test-devices-1.png | The Run on menu in the Nowa desktop app, opened with the arrow next to Run (highlighted), for a cloud project with an iOS Simulator running: the Embedded preview row, DEVICES with iPhone 17 Pro running (and its Stop button), macOS and Chrome, START AN EMULATOR with an Android emulator, the Local cache row with its three icon buttons, and Local environment settings. The whole menu is highlighted. | yes (3.13.0, macOS) |
| test-share-2 | /img/docs/test/test-share-2.png | The Sharing section of Project Details in Settings with Public project on: the Cover field (highlighted), the project link in a text field (highlighted) and the Public project switch, on (highlighted), and the open Link options popup (highlighted) with the checkboxes Code mode, Preview (greyed) and Assistant, and the Opened file row set to Default. | yes (3.13.0, macOS) |
| integrations-supabase-create-1 | /img/docs/integrations/integrations-supabase-create-1.png | The Create New Supabase Project dialog, opened with Create New Project in the project list: Project Name (the project's package name plus -backend), Region (West US (North California)) and Database Password with its eye icon, all highlighted, and the highlighted Create Project button. | yes (3.13.0, macOS) |
| ai-connectors-2 | /img/docs/ai/ai-connectors-2.png | The AI Assistant panel with an Approval Required card for the Supabase connector: Tool apply_migration and the open Arguments, a JSON object with a query that adds a priority column to the todos table and the name add_priority_to_todos (both highlighted), and the Deny and Approve buttons (highlighted). Above the card, the Thinking process rows and "Getting Supabase integration instructions...". | yes (3.13.0, macOS) |
| ai-external-agent-1 | /img/docs/ai/ai-external-agent-1.png | The Connect External Agent dialog in the desktop app: the MCP Server URL field with its token blurred and the Claude Code field, each with a copy button (both highlighted), the help text about running the command or pasting the URL into another coding agent, and the highlighted Done button. | yes (3.13.0, macOS) |

Notes on the rows:

- `integrations-firebase-firestore-2`, `integrations-supabase-create-1` and `ai-connectors-2` are extras or later rows: the first was
  marked not-possible before the Firebase connection existed, the second has no request row yet (it is the new-project path the
  Supabase pages should lead with, see "Note from the user" below), and the third was added in a follow-up round (one Agent prompt in
  a throwaway Supabase project; the migration was **Denied**, so nothing changed).
- `integrations-firebase-firestore-1` shows a query on a `products` collection (name, category, price, inStock) that holds three
  documents in a throwaway Firestore database. The query is `collection('products')` → `where` `price >= minPrice` → `orderBy` `price`
  descending → `snapshots`, with Min Price 20.5, so the Preview lists the two documents above that price as JSON. The orange outline on
  the Preview and the orange **Restart** button are Nowa's own look for a running stream. The query was written in code mode the way
  the builder writes it, so that the parameter could be named `minPrice` (the builder names a new parameter `addedParam`).
- `test-share-2` was taken in an empty throwaway project that was public for about three minutes and is private again. The open
  **Link options** popup covers the three icon buttons (Copy link, Open in a new tab, Link options) and the end of the link: that is
  how Nowa draws it.
- `ai-external-agent-1` was taken in the desktop app (AI Assistant ⋮ → Connect External Agent). The token in the MCP Server URL
  and in the Claude Code command is blurred.
- `integrations-firebase-connect-2`: the value of Project ID is blurred.

## Not captured

- **ai-connectors-1** (the Figma menu with Connected, Auto-approve tools, Turn off MCP): not possible. On the web account
  **Figma cannot be connected**: clicking the Figma button opens "Waiting for Authorization...", but no Figma page ever opens (bug
  NB-8, P117). The menu only exists for an account that already has Figma linked. I looked at a personal Nowa account in the
  desktop app (Account Settings → Connected Accounts): Figma shows **Connect** there too, so it isn't linked. I did not link anything.
- **publish-web-2** (the DNS records page for a custom domain): not done. It needs a domain or subdomain the user controls; I will
  not invent one. I stop at the DNS Records page (Pending, Verify, the Name/Type/Value table) and do not verify.

## Things on the pages that didn't match what I saw

- **docs/integrations/firebase/connect.md** ("Connect your project"): worth a note. If you reload or close the project about half a
  minute after **Connect Apps** finishes, the generated Firebase files are lost, `main.dart` is left pointing at a missing
  `firebase_options.dart`, and **Settings → Firebase** asks for the project again (bug NB-9, P155). In my second run, after **Save now**
  and about 70 seconds, everything was saved. Suggested wording: wait until the save indicator says "All changes saved" (click **Save
  now** if you are in a hurry) before you reload or close the tab. The status bar also ends on "Failed to recompile application."
  right after **Connect Apps**; it clears later. Also: Google's sign-in lasts about an hour. If the Firebase page shows **Connect
  Firebase** again (for example after **Refresh/Update**), click **Continue with Google**; the project stays connected (P34).
- **docs/integrations/firebase/notifications.md** ("Turn on push notifications"): turning **Push Notifications (FCM)** on first opens
  **Add Missing Dependencies** ("Package flutter_local_notifications requires the following dependencies: Request the
  android.permission.RECEIVE_BOOT_COMPLETED permission", **Cancel** / **Add**). The **Test Push Notifications** box appears after you
  click **Add**. The page doesn't mention the dialog.
- **docs/integrations/firebase/firestore.md**:
  - ("Add collections and queries in Nowa 3.13") The page says collections and queries that are already in the project "keep working
    in a Data Builder, in Circuit and in your running app". After a reload they don't, until you click **Refresh/Update apps and
    config files** (Settings → Firebase): **Select Firestore Query** is empty, **Add New Query** ends in a red bar ("Exception:
    Firestore queries class is not found") and **Add Main Collection** writes nothing (NB-1, NB-2, P49). The same click also brings
    the lists up to date after you edit `queries.dart` in code mode. With `?panel=files` the `collections.dart` / `queries.dart`
    popups then list the collections and queries next to **+ Add Main Collection** / **+ Add New Query**. The Library route still
    opens the editors on "Nothing selected" with an empty Outline (P48).
  - ("Build a query") After the Refresh, **Select Collection** lists your collections (step 2's "No Collections" is what shows
    before it). The step list after a collection is add, doc, get, where, orderBy, count, snapshots, as in the table, and `where`
    takes a field, an operator (`>`, `<`, `==`, `!=`, `<=`, `>=`, `contains`) and a value. **But `add` and `doc` fail**: the step is
    labelled **func**, Return reads `dynamic`, the warning icon stays and Problems says "The function 'add' isn't defined." (NB-10,
    P156), so the rows for `add`, `doc`, `set` and `delete` describe steps that can't be built yet. The value dropdown of `where` has
    **Create New Param** and **Enter Value** (that of `add` only **Create New Param**). **Create New Param** names the parameter
    `addedParam` and gives it the type of the field (double for `total`); renaming it in the **Params** list (double-click) blanks
    the builder until you select the query again (NB-11, P157). The check mark shows once the query ends in `snapshots`
    ("Return: Stream <QuerySnapshot<products>>").
  - ("Test a query") **Run Test** runs against your database under its Firestore security rules. With the default locked rules the
    Preview reads "No Data was found." and, under it, "Error: [cloud_firestore/permission-denied] Missing or insufficient
    permissions." The page doesn't say that the rules apply, and says a failing query shows **Error:** with the message (the "No Data
    was found." line is shown as well). With open rules and data, the Preview shows the documents as JSON in a code view with line
    numbers and a ⋮ menu, as the page says; for a stream the button becomes **Restart** and the Preview gets an orange outline. The
    parameter labels are made from the names (**Min Price** for `minPrice`). **A whole number typed into a `double` parameter (50 or
    50.0) is dropped** and the test runs with the default; 20.5 and 50.5 are kept (NB-12, P158). Step 1 could say "for a double
    parameter, type a value with a fraction, such as 50.5".
  - The `collections.dart` / `queries.dart` popup only ever lists what the managers loaded (see above). The first click on its buttons
    is often ignored: click twice. A new field row starts with the default name `var1` selected; typing before the row has focus
    glues the new text in front of it (it happened once: `namevar1`).
  - New fields show the type as `String` (no `?`). The fields' type picker offers String, int, double, bool, Color, Widget and
    "show more"; the details panel is headed **Edit <field>** with Name, Type, Default Value, Is Final, Is Static and **Remove**.
- **docs/test/share.md** ("Open your project to others"): steps 1 to 4 match. **Public project** off shows only the switch; turning it
  on asks "Make this project public?" ("Your project becomes open source, anyone with the link can read every file and save their
  own copy of it.", a warning that making it public would expose any API keys, tokens and other secrets, the checkbox "I checked,
  there are no secrets in this project", **Cancel** and **Make public**, which stays dimmed until the box is ticked). Then the row
  shows the link and three icon buttons (Copy link, Open in a new tab, Link options) next to the switch. **Link options** opens a
  popup over the buttons with **Code mode**, **Preview** (greyed until **Code mode** is ticked, as the table says), **Assistant** and
  **Opened file** (Default, with an arrow). The Cover field is empty ("add image") on a new project. The page's Settings window is
  one screen tall on a large display, so no scrolling is needed there.
- **docs/logic/router.md** ("Start on the login screen or the home screen"): after a click on **+** next to **Redirect Logic** the
  function is written to `router.dart` at once, but the row keeps showing **+** for minutes (more than three minutes in my second
  run) until the panel is redrawn, for example by switching to code mode and back; then the bolt button shows (NB-3, P150). (My
  first note said "about 10 to 20 seconds"; that was wrong.) The Circuit panel opens with a function named `redirect` (GoRoute, with
  `context` and `state`) that already has a Return under it. Steps 4 to 6 match (the Link Condition picker's search box finds
  `isUserSignedIn()` under FIREBASE faster than scrolling). On the Router Configuration page (no route selected) the same **+** adds
  a top-level `redirect:`; the route-level one is on the route's own page.
- **docs/ai/connectors.md**:
  - "Connect Figma": step 2 says a browser window opens. It does not: **Waiting for Authorization...** shows with only **Cancel**,
    and no window or tab opens (bug NB-8, P117). The page's "up to 2 minutes, then Authorization timed out" was not reached (I
    cancelled at about 40 seconds).
  - "Connect Supabase": step 3 says the icon turns green; on the test account the connected Supabase icon turned **orange**.
  - "Approve what a connector does" matches: the **Approval Required** card shows **Tool:** and the open **Arguments** with **Deny**
    and **Approve**. Clicking **Deny** carried on without the action.
  - The two connector icons in the chat row, to the right of the **+**, are the Supabase icon (a lightning-bolt logo) and the
    colored Figma logo; the row also has the **Design** mode dropdown and the **Thinking** dropdown.
- **docs/integrations/firebase/auth.md** and the status bar: after **Authentication** is turned on, the status bar shows
  "Unsupported operation: Unsupported invalid type InvalidType(<invalid>) (InvalidType). Encountered whil…" while the Problems panel
  says "No issues detected" (NB-4, P151; the same family as the RevenueCat `InvalidType` note). Crop the status bar out of full-window
  shots. The Android signing key comes from **Settings** → **Deployment** → **Android** → **Signing Key** → **Generate**: no
  passwords to type, then an "Important! Make sure to download your signing key" dialog whose only button is **Download** (Escape
  closes it; NB-7, P154).
- **docs/integrations/supabase/connect.md**: the "Create a new Supabase project" section matches the real form (Project Name, Region
  starting at West US (North California), Database Password with the eye icon, **Back** / **Create Project**). One detail: the
  project name starts as the Nowa project's *package name* plus `-backend` (for example `docs_capture_firebase-backend`), not its
  display name. The page says Nowa skips the browser step when it is already authorized; in my run the Supabase "Authorize Nowa"
  page opened again when I connected a *second* Nowa project of the same account to the same organization (the first project's
  connection was untouched; NB-6, P153).
- **Brief, Part 1 (not a docs page):** "Settings → Integrations → Supabase → Connect" doesn't exist in 3.13.0. Settings →
  Integrations lists Google Maps, AdMob, RevenueCat, Deep Links, Google Sign-in, Stripe and Firebase; Supabase is the **Supabase**
  icon in the left sidebar → **Connect**. In the Supabase dashboard, **Confirm email** is under Authentication → Sign In /
  Providers → **User Signups**, not inside the Email provider.
- **docs/test/devices.md** (Part 3): the menu headings (RUN ON, DEVICES, START AN EMULATOR), the **Local cache** row ("Created on the
  first device run", then "Cached on disk · re-synced on save" after the first run) and **Local environment settings** match, and
  the three icon buttons (clear, show in folder, re-download) are visible all the time (no hover needed to show them). Differences:
  (a) **Start an emulator** lists only the Android emulator; a booted iOS Simulator appears under **DEVICES** instead. (b) In a *local*
  project the DEVICES list also showed a paired wireless iPhone labelled with a person's name (`<name>'s iPhone (wireless)`): blur it
  in any shot; it wasn't listed in the cloud project. (c) The device list can be stale: with a project already open, the simulator I
  had booted didn't appear and the status bar said "failed to load emulators TimeoutException: Request emulator.getEmulators timed out";
  it showed up after opening another project (NB-5, P152). (d) The first run of an empty cloud project on the simulator took about two
  minutes ("Packaging project…", "Running Xcode build…", then "Hot reload" in the status bar). (e) While the app runs, the top bar
  shows Stop, Hot restart (bolt) and the arrow; **Embedded preview** reads "Running · hidden", "Starting…" or "Failed to start — check
  the logs".
- **Web app, general:** the first click on **New project** sometimes shows a "How much would you rate Nowa?" survey dialog
  (**Cancel** dismisses it). Google's sign-in for the Firebase integration opens as a separate pop-up window. Loading a project
  takes 40 to 55 seconds, and files in code mode take 10 to 20 seconds to open. Dropdown lists in the query builder take 5 to 10
  seconds to finish drawing. In several places the first click after a popup opened or the mode changed did nothing and a second
  click worked (I could not tell whether that is the app or my tool).

## Note from the user (for the Supabase pages)

The Supabase project can be created from Nowa itself (**Create New Project** in the "Projects in <organization>" list). The docs
should lead with that, and show creating the project in the Supabase dashboard only as an addition, not as the main way. The pages
`docs/integrations/supabase/connect.md`, `database.md`, `auth.md` and `storage.md` should be checked for "create the project in
Supabase first" wording. `integrations-supabase-create-1.png` shows the Nowa form.

## Product bugs found on the way

Their write-ups (steps, root causes, suggested fixes) are in the issues report: private repo `nowaproj/nowa`, branch
`claude/tender-pascal-quit5k`, folder `docs/platform_issues` (P150 to P158 and notes on P34, P48, P49 and P117).

NB-1 Add New Query fails ("Exception: Firestore queries class is not found") after a reload (P48, P49) · NB-2 collections added with
Add Main Collection aren't written after a reload and are lost (P49) · NB-3 the Redirect Logic row doesn't refresh after the + is
clicked (P150) · NB-4 status bar InvalidType error while Problems is empty (P151) · NB-5 Run on menu doesn't list a booted simulator
(P152) · NB-6 Supabase asks for authorization again for a second project (P153) · NB-7 the signing key dialog has only Download
(P154) · NB-8 Figma cannot be connected (no authorization window opens; P117) · NB-9 reloading soon after Connect Apps loses the
Firebase connection and its files (P155) · NB-10 the add and doc steps of the query builder fail with "The function 'add' isn't
defined" (P156) · NB-11 renaming a query parameter blanks the query builder (P157) · NB-12 a whole number typed into a double test
parameter is dropped (P158, new, not in the fix run).
