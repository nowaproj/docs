# Phase 9 structure review: navigating the docs as a new user

Reviewer: fresh-eyes agent with no product knowledge beyond the docs and `style-guide.md`. Date: 2026-10-07.
Scope: `docs/index.md`, `sidebars.js`, every page under `docs/` (117 files; 105 outside What's new and Legacy).
Method: read every section overview (`*/index.md`, `get-started/welcome.md`), followed the "Next steps" links, then walked the six goals
page by page. I also built a link graph with a throwaway script (scratchpad, not in the repo): 0 broken relative links or anchors,
and the inbound/outbound counts quoted below come from it. Nothing in `docs/` was edited; nothing committed.

## Verdict

The pages themselves are strong, and the sidebar order (Get started, AI, Design, Logic, Data, Test, Publish) matches the build journey.
What is missing is connective tissue. Four patterns cause almost every problem I hit:

1. **No end-to-end path.** Goals (a) and (b) each need 8 to 16 pages stitched together by the reader, and one step (tap a list item to
   open a detail screen) is not documented anywhere.
2. **The chain of "Next steps" breaks in the middle of the journey.** Design does not lead to Logic, Logic does not lead to Data,
   Data does not lead to Test/Publish, and nothing leads to "ship an update".
3. **Core how-to pages are filed where nobody looks.** Lists, forms, navigation bars and media sit under Reference (1 to 2 inbound links each);
   the splash/launch-screen tutorial exists only under Legacy; the glossary has 0 inbound links.
4. **Troubleshooting is organised by Nowa messages, not by "my app has an error".** The pages that fix app errors are spread over
   Problems, Run and the AI docs, and Troubleshooting does not point to the best ones.

Effort tags: S = a few lines, M = one new section or short page, L = new multi-page guide.

---

## A. Prioritized fixes

### P0: a new user cannot finish a core goal without these

**1. Add an end-to-end guide, "Build a complete app" (habit tracker). [L]**
- New files: `docs/guides/index.md`, `docs/guides/habit-tracker.md` (optionally `docs/guides/launch-checklist.md`, see fix 7).
- `sidebars.js`: add a category `{type: 'category', label: 'Guides', link: {type: 'doc', id: 'guides/index'}, items: [...]}` directly after
  "Get started" (second position). `first-app.md` is the natural lead-in, so the guide should be the next thing a reader sees.
- `docs/index.md`: add a fourth card to "Start here": "Build a complete app", linking to `/guides/habit-tracker`.
- Outline (each step ends with an "Or ask Nowa AI" prompt, per the style guide):
  1. Describe it in **Design** mode (link `get-started/first-app.md`).
  2. Connect Supabase, then ask **Agent** to create a `habits` table with Row Level Security (prompt text already exists in `ai/connectors.md`
     and `ai/prompting.md`). Make this the main path, not a tip: `integrations/supabase/database.md` says "Nowa has no table editor" and
     relegates the AI route to a tip, but for a non-developer it is the only realistic route.
  3. Sign-in: Authentication Template (`design/templates.md`) plus `integrations/supabase/auth.md#login-screen`, and what shows first on launch (fix 14).
  4. List the habits: Get All Records, Data Builder, List View (`integrations/supabase/database.md`, `integrations/show-data.md#show-a-list`).
  5. Add a habit and check one off: Create/Update Record from **On Pressed** / **On Changed**.
  6. Tap a habit to open its detail screen (the recipe from fix 2).
  7. Theme, fonts and app icon (`design/themes.md`, `publish/index.md#app-details`).
  8. Test: Play, Run, phone (`test/instant-play.md`, `test/run.md`, `test/devices.md`).
  9. Publish: Android Release, signing key, `.aab`, Play Console, then shipping an update (`publish/android.md`).
- Mention the paid-plan requirement for publishing up front (today a new user meets it only on `welcome.md` and inside the Publish section).

**2. Add the missing "tap a list item, open a detail screen" recipe. [M]**
- `docs/logic/navigation.md`: new H2 "Example: open a detail screen from a list item", after "Pass data to the next screen". Cover:
  make the item tappable (**List Tile** **On Tap**, or **Gesture Detector** / **Ink Well** wrapper, see `logic/events.md`), a GoRouter step
  with Location `/habit/` + `$` + the row's id, the detail screen's route parameter linked to a param, then loading that row with the
  Supabase **Get Record by ID** function in a Data Builder. Say explicitly whether a whole object can be handed over (what `Extra` does and
  where the destination reads it) or whether the pattern is "pass the id, refetch".
- Link to it from: `docs/reference/widgets/lists.md` (new H2 "Open a screen when someone taps an item"), `docs/integrations/show-data.md`
  (Next steps), `docs/integrations/supabase/database.md` ("Show the results in your app"), `docs/logic/parameters.md`.
- `docs/ai/prompting.md`: add a row to "Example prompts by task": **Agent**, "When I tap a habit in the list, open a detail screen that shows it."
- Why: list to detail is the most common app pattern. Today `reference/widgets/lists.md` has no mention of tapping, and
  `logic/navigation.md` never mentions `element` (the current list row). I could not tell from the docs how `element` is reachable inside an
  **On Tap** circuit, so the product team must confirm the exact steps before writing this.

**3. Make the journey chain: add "Next" links in the order of the build. [S, six small edits]**
- `docs/get-started/first-app.md`, Next steps: add "Make it do things: [How logic works](../logic/index.md)" and "Save data and add sign-in:
  [Connect data and services](../integrations/index.md)". In step 5 ("Make it real"), add one sentence: real storage and sign-in come from
  Connect data and services. The sample prompt is a habit tracker, so the reader will ask "where do the habits get saved?" right here.
- `docs/get-started/welcome.md`, "How building works": the loop has 6 steps and skips logic and data. Make it 8 or 9 steps (add "Add logic",
  "Connect data and sign-in", "Update") and link each step to its section.
- `docs/design/index.md`, end: "Next: [Add logic](../logic/index.md)".
- `docs/logic/index.md`, end (before "Something not working?"): "Need data from a server or sign-in? [Connect data and services](../integrations/index.md)".
- `docs/integrations/index.md`: add a `## Next steps` (it has none): [Preview and test](../test/index.md), [Get ready to publish](../publish/index.md).
- `docs/publish/index.md`: add `## Ship an update` (web: **Update**/**Redeploy**; Android and iOS: raise **Build number**, build again;
  links to `web.md#update-your-site`, `android.md#release-an-update`, `ios.md`) and list it in Next steps. Today "iterate" is the last
  step of the journey and has no page.

**4. Troubleshooting: lead with "My app shows an error". [M]**
- `docs/troubleshooting/index.md`: new first H2 "My app shows an error" with four steps: (1) open **Problems** (`../test/problems.md`);
  (2) **Run** the app and open **Logs** (`../test/run.md#read-the-logs`); (3) click **Fix with AI**, or in **Agent** mode ask Nowa AI to check
  the logs (the tip already in `test/run.md`); (4) if a widget is a placeholder, see `../code/limitations.md`.
- Same file: reorder the 21 H2s. Today "The preview won't start" is #13, "This screen failed to render" #10 and "A build, a publish or an
  integration fails" #20, while #1 to #5 are connectivity, maintenance and update prompts. Put app, preview and build problems first;
  project-open and account problems next; connectivity, maintenance and updates last.
- Optional, only with facts verified from code: `docs/troubleshooting/app-errors.md` for errors shown inside the running app
  (layout overflow, red error screen, an empty list caused by Row Level Security, "global state not attached"). Link it from
  `test/run.md` and `test/problems.md` Next steps. I found no page that covers a Flutter error shown inside the running app.

**5. Make the developer path visible (goal f). [M]**
- `docs/code/index.md`: the "In this section" table omits **Work with local projects** and **Use Nowa with VS Code** (they appear only in prose
  under "Where your code lives"). Add both rows. Add a short callout under the intro: "Already a Flutter developer? Install the desktop app,
  import your folder as a local-only project, open it in VS Code, and use Git" with the four links.
- `docs/get-started/welcome.md`, "Who Nowa is for", "Developers and teams" bullet: it describes the benefits but has no links. Link
  `code/import.md`, `code/local-projects.md`, `code/vs-code.md`, `code/git.md`.
- `docs/code/import.md`: no link to `get-started/desktop-app.md` and no mention of the Flutter SDK, yet "Import project" is desktop-only and
  a local import needs Flutter set up (`local-projects.md` says so). Add a "Before you start" list with both links.
- `sidebars.js`, "Work with code": split into two sub-categories so the developer entry points are together and in order:
  "Your code in Nowa" (code-mode, files, packages, custom-code, limitations) and "Existing projects, VS Code and Git"
  (import, local-projects, vs-code, git, github). Today `import` is 8th of 10, after `vs-code`, although it is the first thing a developer needs.

**6. Surface the four widget how-tos, and give Reference an overview. [M]**
- `docs/reference/widgets/lists.md`, `forms.md`, `navigation.md`, `media.md` are how-to guides (lists and grids, text fields and forms,
  bottom navigation bar, images and video) filed under Reference. Inbound links from other pages: media 1, navigation 1, lists 2, forms 2, and
  `design/index.md` links to none of them. Preferred fix: move them into "Design your app" as a "Widgets" group after "Add widgets"
  (e.g. `design/lists.md`, `design/forms.md`, `design/navigation-bars.md`, `design/media.md`; add redirects in `redirects.js`).
  Minimum fix: add all four to the "Build a screen" list in `design/index.md` and to the Next steps of `design/add-widgets.md`.
- New `docs/reference/index.md` (links to widget catalog, wrappers, shortcuts, glossary). In `sidebars.js` give the Reference category
  `link: {type: 'doc', id: 'reference/index'}` (it has none, so clicking "Reference" does nothing but expand).
  In `docs/index.md` change the Reference card from `/reference/shortcuts` to `/reference`: the card text promises "shortcuts, the glossary and
  the widget catalog" but lands on shortcuts only.
- Link the glossary (0 inbound links today): `get-started/welcome.md` "Key terms" ("See the full [glossary](../reference/glossary.md)") and the
  Next steps of `get-started/editor-tour.md`.

### P1: confusing or incomplete, but a workaround exists

**7. Publish: checklist, store hand-off, clearer names. [M]**
- `docs/publish/index.md`: add "Before you publish" checklist with links: **Bundle Identifier** not `com.example`; version and build number; icon;
  **Problems** clear; the real app checked with **Run**, not only **Play**; AdMob **Show Test Ads** off (`integrations/admob.md`);
  Google Pay `testEnv` and Stripe test keys (`integrations/stripe.md`); Supabase Row Level Security on (`integrations/supabase/connect.md`);
  **Public project** off (`test/share.md`); permissions set (`account/project-settings.md#set-permissions`).
- `docs/publish/android.md`, "Upload to Google Play": it ends at "create your app and add the `.aab`" with two Google links. Add a short list of what
  Play Console asks for before a first release (store listing, screenshots, privacy policy, content rating) with links to Google's help.
  Mention `design/select-and-edit.md#export-as-image` as a way to produce screenshot images. Same for `publish/ios.md` (App Store Connect
  listing, TestFlight pointer).
- `docs/publish/android.md` and `builds.md`: "Pick a **Branch**" is unexplained for the target reader. Add one plain sentence ("leave the default
  branch; a branch is a named line of saved versions of your project").
- Rename sidebar labels and titles: "Google Play" to "Android and Google Play" and "App Store" to "iOS and App Store". The **Deploy** menu rows and
  the **Deployment** tabs say Android and iOS, and `android.md` also covers debug APK tests; `publish/index.md` even maps the "Android Debug" row
  to a page named "Publish to Google Play".
- `docs/publish/web.md`, "Use your own domain": "Custom domains need a higher plan" has no pricing link (the other publish pages link it).

**8. Sharing with a client (goal e). [S]**
- `docs/test/share.md`: in "Choose how to share", link "Private: project members" to `../account/workspaces.md#invite-people`
  (the only way to give a client access without making the project public). Add a short "Sharing with a client" paragraph: Share preview is
  Instant Play (quick, not compiled); for a stable, real version publish to the web (`../publish/web.md`), which does not expose your files.
  Today `share.md` links to `publish/` only through its last bullet.

**9. Test on a phone without the desktop app. [S]**
- `docs/test/devices.md` starts with "Use the desktop app" and stops there for web users. Add "No desktop app?": **Open on Mobile** QR
  (`run.md`), Android Debug APK (`../publish/android.md#test-on-a-device`), iOS via TestFlight (`../publish/ios.md`).

**10. Sign-in hub and payments decision in the Data overview. [M]**
- `docs/integrations/index.md`: add `## Add sign-in` with a 4-row table (Supabase email and password; Firebase Email/Password, Google, Phone;
  Google Sign-In without Firebase; Sign in with Apple: not included) linking `supabase/auth.md`, `firebase/auth.md`, `google-sign-in.md`, plus
  the Authentication Template. There is no top-level "Sign-in" entry anywhere, so users must guess Supabase or Firebase first.
- Same page: add a "Stripe or RevenueCat?" paragraph (Stripe: payments through your Supabase backend; RevenueCat: store in-app purchases and a
  paywall). **Verify with product:** `stripe.md` markets One-Time and Subscription for "digital goods", "memberships" and "premium access", but
  app stores generally require their own in-app purchase system for digital goods; if that is right, say so. Likewise, Apple can require
  Sign in with Apple when an iOS app offers other social sign-in; `integrations/index.md` only says Nowa does not include it.
- `docs/design/templates.md`: the **Authentication Template** has no link to the pages that wire it up. Add a Next step "Connect sign-in:
  `../integrations/supabase/auth.md#login-screen`, `../integrations/firebase/auth.md`".

**11. Theme page: say which widgets follow the theme (goal c). [S]**
- `docs/design/themes.md`: the intro promises "Change a color once ... and your whole app follows". Only widgets whose colors and text styles are
  linked to the theme change (`theme-styles.md`). Add a short H2 "Make existing widgets follow the theme" (link `theme-styles.md`, plus an
  "Or ask Nowa AI" prompt such as "Replace fixed colors and text styles with theme colors"). Confirm with product that Nowa AI does this.

**12. Dead ends: add "Next steps" (2 to 3 links) to pages that end abruptly. [S]**
- `design/boards.md` (screens, add-widgets, instant-play), `design/screens.md` (components, add-widgets, logic/navigation),
  `design/components.md` (logic/parameters, add-widgets), `design/select-and-edit.md` (properties, layout),
  `get-started/cloud-and-local.md` (desktop-app, code/local-projects, account/projects),
  `troubleshooting/known-issues.md` (troubleshooting/index, account/help).

**13. Legacy pages: warn and link out. [S]**
- Only `legacy/index.md` carries the "made with an earlier version" warning; a reader who lands on a legacy page from search sees none. Add a one-line
  caution at the top of each legacy page with a link to the current equivalent: chat-template to `design/templates.md`, form-validation to
  `reference/widgets/forms.md`, loading-indicator to `integrations/show-data.md`, design-responsive to `design/responsive.md`, design courses to
  `design/index.md`. Eight legacy pages currently have 0 outgoing links.
- Remove the legacy links from the Next steps of current pages (`design/responsive.md`, `reference/widgets/forms.md`): they send readers from a
  current page to an outdated video.

**14. Missing topic: what shows first when the app opens. [M]**
- Only the Legacy "Splash Screen" video covers a launch screen that checks the saved login token and picks login or home. Current docs name
  **Redirect Logic** in `logic/navigation.md` and Firebase `isUserSignedIn()` in `firebase/auth.md`, but have no how-to for "start on login or home".
  Add one (in `logic/navigation.md` or the guide in fix 1) and link it from both auth pages. Needs product confirmation of the Supabase side
  (how to read the current session).

### P2: polish

**15. Sidebar order and labels. [S]**
- `sidebars.js`, Get started: create-account, first-app, playground, editor-tour, cloud-and-local, desktop-app, mobile. The account is needed before
  the first app, and the no-account playground is the zero-friction entry point but sits sixth of seven today.
- `sidebars.js`, Build with Nowa AI: move `ai/prompting` to second place (after the overview). It is the most useful page for a beginner and is
  currently fifth, after Undo and history.
- `docs/logic/index.md` "Where to start" lists events, variables, circuit, navigation; the sidebar is events, circuit, variables, ... Align one with the other.
- Labels: `logic/navigation.md` "Navigation" to "Navigate between screens" (clashes with "Navigation bars and screen parts");
  `logic/actions.md` "More actions" to "Ready-made actions"; `integrations/supabase/auth.md` "Sign users in" and `integrations/firebase/auth.md`
  "Authentication" to the same word ("Sign-in"); `get-started/playground.md` "Playground" to "Try without an account".

**16. One word, five meanings: "preview". [S]** `docs/test/index.md`: add a three-row mapping. **Play** = Instant Play (called "Instant preview" on the phone layout);
**Run** = **Embedded preview**; **Share preview** = a link to Instant Play. The docs also use "Preview" for the code-mode pane and "Preview Not Available".

**17. Hard-coded version numbers will go stale. [S]** "Nowa 3.12.5" appears in `design/responsive.md` (line 12), `integrations/firebase/auth.md` (line 47),
`troubleshooting/known-issues.md` (description) and `reference/shortcuts.md` (line 22). Remove the number or add these four pages to the release checklist.

**18. Duplicate procedure. [S]** "Switch themes while the app runs" (four steps) is written out in both `design/theme-styles.md` and `logic/global-state.md`. Keep one, link the other.

**19. Hygiene. [S]** `docs/new/_category_.json` is unused (`sidebars.js` is explicit); delete it. `docs/index.md`: consider moving the "Legacy tutorials" card below
"Get help" so it does not carry the same weight as the real sections.

**20. Length on the main path. [S]** Over the style guide's 1,200-word split rule and on the path of a new user: `get-started/editor-tour.md` (about 1,500 words, the 7-row
welcome-tour table could shrink), `get-started/first-app.md` (about 1,230), `logic/circuit.md` (about 1,530), `logic/navigation.md` (about 1,480; the plan already
proposes splitting the Router panel into `logic/router.md`).

### Quick wins (about 30 minutes, no new pages)
Fixes 3, 8, 9, 12, 15, 16, 17 plus the `docs/index.md` Reference link and the glossary links from fix 6.

---

## B. The six goals

Legend: STUCK marks where a new user would stop or have to guess.

### a. Habit tracker with sign-in, a backend list, published to Google Play
Path I would take (about 16 pages):
1. `docs/index.md` card "Build your first app" -> `get-started/first-app.md` (its own sample prompt is a habit tracker; `create-account.md` if needed). I end with a running app that
   uses demo data. STUCK 1: the page ends with Next steps to AI, Design, Test, Publish. Nothing says where the habits get saved or how to add sign-in.
2. Back to the home page -> "Connect data and services" -> `integrations/index.md` "Choose a backend". The table is good; Supabase covers both sign-in and a database, but nothing says
   it is the simplest pick for this app.
3. `integrations/supabase/connect.md` (needs a Supabase account; **Connect**, **Select** or **Create New Project**). Clear.
4. `integrations/supabase/database.md`. STUCK 2: it needs a table, "Nowa has no table editor", and the only non-developer route (Agent plus the Supabase connector) is a tip. I then need
   `ai/connectors.md` and the "Build a backend" row in `ai/prompting.md`: three pages for one step.
5. `integrations/supabase/auth.md#login-screen` (10 manual steps, or the AI prompt) and `design/templates.md` (Authentication Template). STUCK 3: nothing covers staying signed in or
   choosing the first screen at launch (see fix 14).
6. `integrations/show-data.md#show-a-list` + `reference/widgets/lists.md#connect-a-list` for the list. Adding and checking off a habit: only inferable from `database.md` ("call the function from
   an event") and the `signIn` example.
7. `test/instant-play.md`, `test/run.md`. Fine.
8. `publish/index.md` (paid plan, app details, **Bundle Identifier**) -> `publish/android.md` (debug test, signing key, release, `.aab`) -> `publish/builds.md`. STUCK 4: "Pick a **Branch**" is unexplained;
   the Play Console steps (listing, privacy policy, content rating) are handed to Google with two links and no checklist.
Verdict: possible but long, with four context switches and no map. Fixes 1, 3, 7, 14.

### b. Show a Supabase table as a list and open a detail screen on tap
Path (8 pages): `integrations/index.md` -> `supabase/connect.md` -> `supabase/database.md` (Get All Records, Test, "Show the results in your app") -> `integrations/show-data.md#show-a-list` (Data Builder around a
List View, link the item to `element`) -> `reference/widgets/lists.md`.
STUCK 5 (blocking): making the item tappable and opening a detail screen. `lists.md` has no word about taps. `logic/events.md` mentions the **Gesture Detector** / **Ink Well** wrappers generically.
`logic/navigation.md#pass-data-to-the-next-screen` uses `/product/42` and a variable, never a list row or `element`. `logic/parameters.md` covers the detail screen's param. `Extra` is described
("hands any object to the next route") but not how the destination reads it. The reader must combine seven pages and guess the key step.
Verdict: not achievable from the docs alone. Fix 2 (and the product team confirming the exact steps).

### c. Change colors and fonts everywhere at once
Path (3 pages): `design/index.md` ("Style your app") -> `design/themes.md` (**Edit colors**, **Edit text styles**, **Default Font**) -> `design/fonts-icons.md` ("Pick a font") -> `design/theme-styles.md`.
Best-covered goal; the sidebar names (Themes, Fonts and icons, Theme colors and text styles) are clear, and `ai/prompting.md` has the "Restyle the app" and "Set a font" prompts.
STUCK 6 (minor): `themes.md` promises that the whole app follows, but widgets whose colors or text styles are fixed values do not. Nothing tells the reader which ones follow or how to convert the rest.
Also, **Default Font** "appears for themes written as `ThemeData(...)`", which will confuse someone whose button is missing. Fix 11.

### d. My app shows an error when I run it
Path (4 pages): home card "Troubleshooting" -> `troubleshooting/index.md`. STUCK 7: 21 sections ordered with connectivity and update prompts first; the relevant ones are #10 to #13 and #20.
"The preview won't start" covers error screens and links to `test/run.md#fix-a-preview-that-wont-start`. For an error shown inside the running app there is no match. The useful pages are
`test/problems.md` (Problems tab, **Hand a problem to Nowa AI**), `test/run.md#read-the-logs` and its tip, and the "Fix a problem" row of `ai/prompting.md`; Troubleshooting links to the first
but not the others, and gives no "do this first" flow. Fix 4.

### e. Share a preview with a client, then publish to the web on my own domain
Path (4 pages, plus `account/workspaces.md`, which `share.md` does not link): `test/index.md` ("Share it") -> `test/share.md` (Play a screen, **Share preview**, **Public** or **Private**) -> `publish/index.md` -> `publish/web.md` (**Publish**, **Use your own domain**: **Set**, **DNS**, **Verify**).
STUCK 8: for a client you need **Public**, and its warning is heavy (the whole project becomes readable, including values in **Constants**). The safer route, inviting the client as a
member, is in `account/workspaces.md` but `share.md` does not link to it. STUCK 9: the preview is Instant Play, "not the compiled app", so it is not the "working" version; publishing to
the web is the better answer, but `share.md` never says so. STUCK 10 (minor): "Custom domains need a higher plan" has no pricing link; DNS guidance is generic ("your provider's help explains where").
Verdict: mostly clear; fix 8 and the pricing link in fix 7.

### f. Developer: open my Flutter project in Nowa, keep VS Code and Git
Path (6 pages, plus the install page that `import.md` does not link): home card "Work with code" -> `code/index.md` (excellent explanation of how code and design stay in sync) -> `code/import.md` (desktop-only **Import project**, **Local-only project**)
-> `code/local-projects.md` -> `code/vs-code.md` -> `code/git.md` -> `code/github.md`.
STUCK 11: the "In this section" table of `code/index.md` omits local projects and VS Code (prose only). STUCK 12: `import.md` says "Desktop app only" in its table but never links to the install page or the Flutter setup
(`get-started/desktop-app.md`), so I have to go hunting for how to get the desktop app and set up Flutter. `welcome.md` "Developers and teams" has no links. The sidebar puts Import 8th, after VS Code. Content quality once found
is high (what gets rewritten, `@NowaGenerated`, "commit before you edit visually"). Fix 5.

---

## C. End-to-end journey

| Step | Clear page? | Does it lead to the next step? | Verdict |
|---|---|---|---|
| 1. Idea, Nowa AI builds it | Yes: `get-started/first-app.md`, `ai/index.md`, `ai/modes.md`, `ai/prompting.md` | First app links to AI, Design, Test, Publish; it skips Logic and Data | OK, add links (fix 3) |
| 2. Refine visually | Yes: `design/index.md` and its pages | `design/index.md` has no link to Logic; 4 design pages end with no Next steps | Gap (fixes 3, 12) |
| 3. Logic and state | Yes: `logic/index.md`, events, variables, global state | `logic/index.md` has no link to Data | Gap (fix 3) |
| 4. Data and backend | Yes, strongest section: `integrations/index.md`, Supabase chain, REST, Show data | `integrations/index.md` has no Next steps; inside Supabase the pages chain well | Gap at the section edge (fix 3) |
| 5. Sign-in | Pages yes, hub no: `supabase/auth.md`, `firebase/auth.md`, `google-sign-in.md` | Template page does not link to them; nothing on staying signed in or first screen | Partial (fixes 10, 14) |
| 6. Payments or ads | Yes: Stripe, RevenueCat, AdMob | No guidance on Stripe vs RevenueCat; AdMob links to Publish, Stripe and RevenueCat do not | Partial (fix 10) |
| 7. Test on a device | Yes: `test/*` | `test/index.md` links to Publish; `devices.md` needs the desktop app and offers no alternative | Partial (fix 9) |
| 8. Publish web, Google Play, App Store | Yes: `publish/*` | Index to each page and each page to the next store: good. Store-side steps handed off with no checklist | Partial (fix 7) |
| 9. Iterate | Scattered: update sections per platform, `ai/undo-and-history.md`, `code/git.md` | No page or link for "ship an update" | Gap (fix 3) |

Missing for a complete, working, shipped app:
1. An end-to-end guide (fix 1).
2. List to detail (fix 2).
3. Launch screen and signed-in start (fix 14).
4. Launch checklist and store pre-flight pointers (fix 7).
5. Stripe or RevenueCat decision, store rules, Sign in with Apple (fix 10, verify with product).
6. App-error troubleshooting (fix 4).
7. "Ship an update" (fix 3).
8. Testing without the desktop app (fix 9).
9. Planned in PLAN.md item 6 and still absent: the "Build a great app" best-practice set (themes and components for consistency, naming, keys and security).

---

## D. Notes per section

**Home (`docs/index.md`) and sidebar.** Clear hero, three good start cards, a "Browse by topic" grid in sidebar order, and a "Get help" block. Add a "Popular goals" row of 6 links
(add sign-in, show a table, change colors and fonts, publish to Google Play, use your own domain, open an existing Flutter project): it covers most of what the six goals needed and costs
nothing. The Reference card links to shortcuts (fix 6). Only "Get started" starts expanded; with 14 top-level entries that is fine. Sidebar order follows the journey; the only reorder
suggestions are in fix 15.

**Get started.** `welcome.md` is a good overview but its "How building works" loop omits logic and data, "Key terms" does not link the glossary, and "Where to go next" has four links, none
to a section. `first-app.md` is the right first page but is long and ends without Logic/Data links. `create-account.md` is fine; it sits after `first-app.md` although it comes first in time.
`cloud-and-local.md` has no Next steps. `playground.md`, `desktop-app.md`, `mobile.md` end well.

**Build with Nowa AI.** Clear and consistent; the Next steps in each page are sensible. `prompting.md` should come earlier in the sidebar. No page shows a complete prompt sequence for building an
app (that belongs in the guide). `connectors.md` is the best explanation of the Supabase-by-AI route and deserves a link from `supabase/database.md`'s intro, not just a tip.

**Design your app.** Very complete; the "Where to go next" list on the overview is well grouped. Problems: no link onward to Logic; the four widget how-tos (lists, forms, navigation bars,
media) are not reachable from here (fix 6); `boards`, `screens`, `components`, `select-and-edit` end without Next steps; `themes.md` caveat (fix 11); `templates.md` does not link to the pages
that wire its Authentication Template. "Navigation bars and screen parts" and `logic/navigation.md` ("Navigation") invite confusion (fix 15).

**Add logic.** Good mental model on the overview. Navigation to Data is missing. `logic/navigation.md` is long (about 1,480 words) and is where the missing list-to-detail recipe belongs.
`More actions` is a vague label for the page that holds "Save values on the device", "Open a link" and "Check the platform". Models come last in the sidebar although REST and Supabase
need them; the overview table links them, which is enough.

**Connect data and services.** The "Choose a backend" table is excellent and the Supabase pages chain well (connect, sign in, data, storage, backend). Missing: sign-in hub, Stripe
vs RevenueCat guidance, a Next steps block, and a pointer from the overview to `ai/connectors.md` as the main route for non-developers. Firebase and Supabase use different labels for the same job
("Authentication", "Sign users in").

**Preview and test.** The Instant Play vs Run table on the overview is the clearest comparison in the docs. `devices.md` should offer alternatives for web users; `share.md` should link
to workspaces and to web publishing; "preview" is overloaded (fix 16). `problems.md` and `run.md` are the best sources for app errors and should be linked from Troubleshooting (fix 4).

**Publish.** Index to web, Android, iOS and builds is logical. Needs the checklist, "Ship an update", plan-gate and pricing link on the custom domain, and the renames (fix 7). The page named
"Google Play" holds debug builds as well, which is surprising from the sidebar.

**Work with code.** Content is excellent. The structure hides the developer path (fix 5). "Download your code" lives under Publish; it is linked from `code/index.md` prose, `vs-code.md` and
`local-projects.md`, which is acceptable.

**Projects and account.** The dashboard tour is useful. "Project settings" holds what Publish needs (name, identifier, icon, permissions); both directions are linked. Two different things
are both called "Settings" (project gear vs **General Settings** in the avatar menu); `editor-tour.md` explains it, `account/index.md` could add one line.

**Troubleshooting.** Organised by message, which is good for search and bad for "something is wrong" (fix 4). `known-issues.md` ends without a "still stuck?" link.

**Reference.** Widget catalog, wrappers, shortcuts and glossary are solid. No overview (fix 6); the glossary has no inbound links; four pages in it are really how-tos.

**What's new and Legacy.** What's new is fine and linked from the top bar. Legacy: see fix 13. The Splash Screen tutorial describes a task the current docs do not (fix 14).

---

## E. Link facts (from the script)

- Broken relative links or anchors: 0 across 117 pages.
- Pages with 0 inbound links from other pages: `reference/glossary.md` (the home page is the other, as expected).
- Pages with a single inbound link: `reference/widgets/media.md`, `reference/widgets/navigation.md` (both only from the widget catalog), plus the section overviews `get-started/welcome.md`,
  `account/index.md`, `logic/index.md`, `legacy/index.md` (only from the home page; they are also reachable from the sidebar).
- Pages with two inbound links: `design/localization.md`, `integrations/deep-links.md`, `integrations/revenuecat.md`, `reference/widgets/forms.md`, `reference/widgets/lists.md`.
- Non-legacy pages with no "Next steps" or "In this section" block: `design/boards.md`, `design/components.md`, `design/screens.md`, `design/select-and-edit.md`,
  `get-started/cloud-and-local.md`, `integrations/index.md`, `troubleshooting/known-issues.md` (home, glossary, What's new are fine).
- Legacy pages with 0 outgoing links: the four design courses, `chat-template.mdx`, `form-validation.md`, `splashscreen.md`; `design-responsive.md` has 1 link.
- Pages over the style guide's 1,200-word split threshold: 24 of 105 (largest: `reference/shortcuts.md` 2,561, `reference/widgets/index.md` 1,857, `logic/circuit.md` 1,532,
  `get-started/editor-tour.md` 1,527, `logic/navigation.md` 1,478). Reference pages are exempt in practice; the main-path ones are in fix 20.

## F. Keep as is (works well)

- Overview pages that compare options in a table: `test/index.md`, `integrations/index.md`, `get-started/cloud-and-local.md`.
- The consistent "Or ask Nowa AI" tips and the Next steps blocks where they exist.
- The Supabase and Firebase page chains (connect, auth, data, files/notifications).
- Badges for plan, cloud/local and desktop requirements, and the "Renamed or removed" table in the glossary.
- Explicit sidebar order that matches the journey; the plan-gate explanations on the publish pages.
