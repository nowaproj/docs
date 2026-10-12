# Phase 14 brief: write for the right reader, and bring back what the old docs had

Read this whole file first. You are one of ~15 section agents. Each agent owns one batch of pages (table at the end).
The new docs are live on https://docs.nowa.dev (PR #18 merged). This pass makes them fit the people who actually read
them and makes sure no still-valid information from the old docs got lost.

## Why: the user's feedback (verbatim, condensed)

> Some pages seem to be written for developers. For example, in the RevenueCat integration page I saw "Generates
> `lib/integrations/revenuecat_service.dart` with a `RevenuecatService` class. Adds `await RevenuecatService().configureRevenuecat();`
> to `main()`". Our target audience are mostly people who don't know Flutter who want to build apps based on Flutter
> (or even don't know Flutter but want to build cross-platform apps) using AI and full visual editing without dealing
> with code at all. Some of them might want to deal with code, like a hybrid approach with VS Code, but all the info for
> this segment can be in its own section, like the one called "Work with code". The main target doesn't know Flutter and
> probably doesn't know code at all. I want all pages written for our correct target audience: people with ideas
> (founders, hobbyists, people working in fields other than development who have an idea and want to build something
> professional for it). They don't know Flutter, they don't write code, and they want to use only AI and visual editing:
> they prompt mainly and use visual editing to tweak their UI and business logic, without dealing with or understanding
> Flutter or code.
>
> Some new pages are way shorter than the older docs, for example GitHub or deployment. That's fine, but make sure no
> important info explained in the older docs was removed. If the old docs contain an explanation or info that still
> exists in the current version of Nowa (wasn't removed from the product), the new docs should mention it too.

## Context you need

| What | Where |
|---|---|
| Docs repo (Docusaurus), branch `docs-rewrite` | `/home/user/docs` (pages in `docs/`) |
| **Product code, Nowa 3.13.0 as shipped (source of truth)** | `/home/user/nowa-master` (commit `3cb32031c`, read-only) |
| Old docs, as they were before the rewrite (same paths as the old site) | `/home/user/docs/_rewrite/old-docs/` |
| Shared rules and decisions (D1-D21) | `/home/user/docs/_rewrite/BRIEF.md`, `decisions.md` |
| Style guide, glossary | `/home/user/docs/_rewrite/style-guide.md`, `glossary.md` |
| Feature research (labels + code refs; written against 3.12.5, so re-check paths) | `/home/user/docs/_rewrite/research/features-*.md`, `research/changes-3.13.md` |
| What the Nowa AI agent can do | `research/features-ai.md`, section "What the agent can do (agent tools, user-facing)" |
| Known product bugs in 3.13.0 and their workarounds | `_rewrite/product-issues.md`, `docs/troubleshooting/known-issues.md`, `_rewrite/MISSING-MEDIA.md` |

The docs describe **Nowa 3.13.0 as shipped**, with workarounds for known bugs until fixes ship. Keep every workaround,
but make it usable by someone who doesn't code (rule R5).

## The reader

**Primary reader (every page outside `docs/code/`):** a person with an idea. A founder, a hobbyist, a designer, a
teacher, a shop owner. They want a professional app for iOS, Android and the web. They don't know Flutter and don't
write code, and they don't want to learn. They build by **prompting Nowa AI** and by **visual editing**: the board and
**Details** for the UI, Circuit and the **Variables** panel for logic. They want to understand and control what their
app does, in their own words, never by reading code.

**Secondary reader (`docs/code/` only):** people who also work with code (code mode, VS Code, Git). They're comfortable
opening code, but they aren't necessarily Flutter or Git experts. Developer detail belongs in "Work with code".

Test every sentence outside `docs/code/`: *Could someone who has never written code follow this, and do they know why
it matters for their app?*

## Rules for pages outside `docs/code/`

**R1. Say what it means for the app, not what Nowa writes into the code.**
- ✗ "Generates `lib/integrations/revenuecat_service.dart` with a `RevenuecatService` class. Adds
  `await RevenuecatService().configureRevenuecat();` to `main()`."
- ✓ "Nowa sets RevenueCat up for you, so it's ready as soon as your app opens."
- ✗ "Under the hood, a global state is a Flutter `ChangeNotifier` that Nowa provides to your whole app."
- ✓ (drop it, or) "Every screen of your app can use it."

**R2. Move code-only facts to the code section.** Code-only = the reader never sees or needs it while prompting or
editing visually: file paths and project folders (`lib/...`, `android/...`), class, method and variable names the UI
doesn't show, lines of code, generated-code mechanics, package names (keep one only when a dialog the reader must act on
names it, such as **Add Missing Dependencies**), Dart/Flutter internals (`ChangeNotifier`, `withConverter`,
`fromJson`), platform build files (`MainActivity`, `Info.plist`, `build.gradle`, entitlements).
- Copy each moved fact **unchanged** (it was verified) into your batch's **for-code file** (see Outputs), under one of
  the anchors listed below, with the page it came from.
- The main page may point there **once**, where it fits: "Working in the code? See
  [What Nowa adds to your code](../code/generated-code.md#revenuecat)." (relative path from your page; use only the
  anchors below). `docs/code/generated-code.md` exists as a stub with all these anchors; the orchestrator fills it.
- A user-facing consequence stays, in plain words: "sets the iOS minimum version to 14.0" → "your app runs on iOS 14
  and later". "adds `cloud_firestore` even if you only use sign-in" → drop unless it matters to the reader.

**R3. Keep UI text that looks like code, and explain it.** What the reader sees on screen stays exactly as shown:
Circuit node and function names (`push`, `showDialog`, `notifyListeners`, `openUrl`), query builder steps (`where`,
`orderBy`, `FirebaseFirestore.instance`), type names in dropdowns (**String**, **int**, **double**, **bool**), messages
in **Problems** or the status bar, field hints such as `appl_`. Explain each in plain words the first time on the page:
"add **notifyListeners** (it tells every screen that shows this data to update)"; "text (**String**), whole number
(**int**), decimal number (**double**) or yes/no (**bool**)".

**R4. Plain words first; explain the technical words the reader can't avoid.** In one short clause, the first time on
a page: API key, bundle ID, package, query, JSON, webhook, SHA fingerprint, migration, row-level security, emulator,
"a Future" (something that finishes later), "a Stream" (keeps updating). Don't explain things the reader doesn't need.
Prefer "your app" and "your project" over Dart/Flutter vocabulary.

**R5. No-code path first.** When a task or a 3.13 workaround needs code edits, lead with the no-code way. Nowa AI in
**Agent** mode can create and edit screens, components, functions, models and any project file (features-ai.md), so
offer a prompt: "Ask Nowa AI in **Agent** mode, for example: ..." Never promise the exact result; say how to check it
(**Problems**, **Play**, **Run**). Keep the hand-edit steps only for people who code, short and clearly labelled
("If you edit code yourself: ..."), or move them to the for-code file and link. Never leave a non-coder with only "edit
the Dart code".

**R6. Keep every fact the reader needs.** Steps, labels, limits, warnings, workarounds, gating, badges. Simplify the
words, not the facts. Delete a verified fact only when it's code-only, and then move it (R2).

**R7. Keep everything else stable.** Follow `style-guide.md` (voice, anatomy, ≤2 admonitions, no hype words, no emoji,
no `---` rules). Don't touch images (you may move an image with its paragraph), explicit heading IDs `{#id}`, URLs or
file names. Fix a link only if it's broken. Don't add an H1. You may add front-matter keywords (old feature names people
search for) and tighten the description.

**R8. Logic pages are visual programming, not code.** Variables, functions, parameters, conditions, loops and events
are Nowa concepts the reader uses visually. Explain them as you would to a smart non-programmer ("a variable is a value
your screen remembers, such as the number of items in a cart").

## Coverage: bring back what the old docs had

Your batch lists the old pages that map to your pages (from `redirects.md`). For **every** old page:

**C1. List each piece of useful information** on it: what a feature is and why you'd use it, steps (including steps in
third-party consoles that Nowa still requires: Apple Developer and App Store Connect, Google Play Console, Firebase
console, Supabase dashboard, Stripe, RevenueCat, GitHub, Google Cloud, Postman, Xano...), tips, warnings, examples and
use cases, troubleshooting, answers to questions. Skip marketing filler, prices, and pure media.

**C2. Check whether the new docs cover it anywhere.** Grep all of `docs/` (not `docs/new/`, not `docs/legacy/`) for its
labels and words, and read the hit. Covered → note where.

**C3. Not covered → is it still valid for Nowa 3.13.0?**
- Nowa behavior and UI: check `/home/user/nowa-master`. Old labels and steps are often outdated: re-derive every label
  and step from the code, and treat the old text only as a pointer. Grep for the exact label:
  `grep -rn "Label" --include=*.dart /home/user/nowa-master/lib /home/user/nowa-master/packages`.
- Third-party consoles: check the current official docs (WebFetch / WebSearch: developer.apple.com,
  support.google.com/googleplay, developer.android.com, firebase.google.com/docs, supabase.com/docs, docs.stripe.com,
  www.revenuecat.com/docs, docs.github.com, console.cloud.google.com docs). Use labels as those docs show them today.
  If you can't confirm a label, describe the step without it and link the official page. Cite the URL.
- Prices and fees (Nowa's or third parties'): never state amounts. Say a fee exists and link (D3).

**C4. Decide:** `added` (still valid and useful to the reader) / `obsolete` (gone or changed in 3.13: cite the code) /
`not useful` (filler, duplicate, pricing) / `dev-only` (still valid but code-level: put it in the for-code file).

**C5. Add it in your own words** where a reader doing that task would look for it, on the best page of your batch. If it
belongs on another batch's page, don't edit that page: list it under "For other pages" in your notes with the target
page, the text you propose and its evidence. Every added claim needs a code ref (`path:line`, relative to
`/home/user/nowa-master`) or an official URL in your notes.

The user named GitHub and deployment as pages that got shorter. Third-party walk-throughs (registering a bundle ID,
creating the app in App Store Connect, an API key with the right access, Google Play setup, creating a GitHub token
with the right scopes) are exactly what non-developers need: bring them back step by step, verified, not by linking
out alone. Keep a link to the official page for details.

Length: pages may grow. Keep them scannable (short sections, numbered steps, tables). If a page would pass ~2,200
words, say in your notes how you'd split it instead of splitting it.

## Anchors on `docs/code/generated-code.md` (use only these)

`#project-files` · `#screens-and-routes` · `#components` · `#themes` · `#fonts-and-icons` · `#assets` · `#localization`
· `#variables-and-functions` · `#global-state` · `#models` · `#navigation` · `#actions-and-popups` · `#rest-api` ·
`#constants` · `#supabase` · `#firebase` · `#stripe` · `#revenuecat` · `#admob` · `#google-maps` · `#google-sign-in`
· `#deep-links` · `#publishing` · `#packages`

## Outputs (all in `/home/user/docs/_rewrite/reviews/`, `<batch>` = your batch ID, e.g. `P14-B08`)

1. **`<batch>-coverage.md`** (write it first, before editing pages; update statuses as you add): one section per old
   page, table `item | status | where / evidence | note`. Status: `covered` (page#section) / `added` (page#section) /
   `obsolete` (code ref) / `not useful` / `dev-only` / `for other page` (target). End with totals.
2. **`<batch>-notes.md`**: per page: what you changed for the reader (moved, rewritten, explained), what you added, the
   code ref or URL behind every new or changed claim, open questions. Then "For other pages". Verifiers rely on it.
3. **`<batch>-for-code.md`**: the code-only facts you moved off your pages, grouped under the anchor headings above
   (`## #revenuecat`), each bullet copied unchanged with its source page. Write "None" if you moved nothing.
4. The pages themselves, edited in place.

## How to work

1. Read this brief, then `style-guide.md`, `glossary.md`, and `BRIEF.md` (its rules apply: the code is the source of
   truth, never invent a label, step, limit or price, cite code).
2. Read your batch's new pages and old pages. Write the coverage file.
3. Rewrite page by page. **Save each page as soon as it's done** and append its notes (usage limits can stop you; if a
   previous run left files, continue from them).
4. Re-read each finished page as the primary reader would. Every non-code page should pass the test above.

## Boundaries

- Edit only your batch's pages and your three files. Not `sidebars.js`, `docusaurus.config.js`, `src/`, `static/`,
  `docs/new/`, `docs/legacy/`, `docs/code/generated-code.md`, other batches' pages or other `_rewrite` files.
- Don't run `yarn build`. Never commit or push. Never modify the product repos.
- Don't sign in anywhere, connect accounts or send AI prompts. Web reading of official docs is fine.
- Final message, at most 15 lines: pages changed, items added from old docs (count), facts moved to the code section
  (count), the most important open questions. Don't paste page contents.

## Batches

Paths: new pages under `/home/user/docs/docs/`, old pages under `/home/user/docs/_rewrite/old-docs/`.

| Batch | New pages (yours to edit) | Old pages to check |
|---|---|---|
| P14-B01 | `index.md`; `get-started/`: `welcome`, `first-app`, `create-account`, `playground`, `editor-tour`, `cloud-and-local`, `desktop-app`, `mobile`; `guides/`: `index`, `complete-app`, `design-tips`, `ai-tips`, `data-and-state-tips`, `ship-tips` | `index.md`, `getting-started/introduction.md`, `getting-started/quickstart.md`, `getting-started/install.md`, `getting-started/exploreinterface.mdx`, `ui/toolbar.md`, `ui/widget-panel.md`, `local-project-simulator/createlocalproject.md`, `local-project-simulator/whylocalproject.md` |
| P14-B02 | `ai/`: `index`, `prompting`, `modes`, `chat`, `context`, `undo-and-history`, `connectors`, `external-agent` | `ai/howtouseai.mdx`, `ai/prompttip.mdx`, `ai/exampleprompts.mdx`, `data-connections/supabase/mcp.md` |
| P14-B03 | `account/`: `index`, `projects`, `project-settings`, `account-settings`, `workspaces`, `plans-and-usage`, `help` | `ai/price.md` (other batches route account items from their old pages to you via "For other pages"; the orchestrator forwards them) |
| P14-B04 | `design/`: `index`, `boards`, `screens`, `components`, `library`, `add-widgets`, `select-and-edit`, `properties`, `layout` | `ui/boards.mdx`, `ui/screens.md`, `ui/components.md`, `ui/layout/intro-layout.md`, `ui/layout/rows-and-columns.md`, `ui/layout/groups.mdx`, `ui/layout/constrains.md`, `ui/wrappers/wrappers-intro.md` |
| P14-B05 | `design/`: `responsive`, `outline`, `themes`, `theme-styles`, `assets`, `fonts-icons`, `templates`, `localization` | `ui/outline.md`, `ui/temlpates.mdx`, `ui/themes/colors-themes.md`, `ui/themes/create-themes.md`, `ui/themes/typograhies.md`, `ui/assets.md` |
| P14-B06 | `logic/`: `index`, `events`, `variables`, `circuit`, `parameters`, `global-state`, `functions` | `logic/intro-circuit.md`, `logic/control-flow/if-statement.mdx`, `logic/control-flow/try-catch.mdx`, `vars-params-functions/create-variable.mdx`, `vars-params-functions/local-parameter.mdx`, `vars-params-functions/global-states.md`, `vars-params-functions/functions/create-local-function.mdx`, `vars-params-functions/functions/events.mdx` |
| P14-B07 | `logic/`: `expressions`, `navigation`, `router`, `popups`, `actions`, `models` | `logic/common-functionalities/` (`media-picker`, `navigation`, `open-url`, `platform-checking`, `print`), `logic/ui-popups/` (`date-picker`, `dialog`, `snackbar`, `time-picker`), `vars-params-functions/data-models.md` |
| P14-B08 | `integrations/`: `index`, `show-data`, `constants`, `deep-links`, `google-maps`, `google-sign-in`, `admob`, `revenuecat`, `rest-api/index`, `rest-api/import` | `data-connections/api/createapi.md`, `data-connections/api/Openrouter.md`, `data-connections/api/.authkey.md`, `data-connections/api/importapi/postman.md`, `.../swagger.md`, `.../xano.md`, `data-connections/supabase/ui.md` |
| P14-B09 | `integrations/firebase/`: `connect`, `auth`, `firestore`, `notifications`; `integrations/stripe` | `data-connections/firebase/firebase-connect.md`, `firebase-email-auth.md`, `firestore.md`, `notification.md`, `payments/stripe/stripe-integration.md` |
| P14-B10 | `integrations/supabase/`: `connect`, `auth`, `database`, `storage`, `backend` | `data-connections/supabase/connect-supabase.md`, `auth.md`, `db.md`, `storage.md`, `streams.md` |
| P14-B11 | `publish/`: `index`, `web`, `android`, `ios`, `builds`, `download-code` | `deployment/android-deploy.md`, `deployment/ios-deploy.md`, `deployment/web-deploy.mdx` |
| P14-B12 | `test/`: `index`, `instant-play`, `run`, `devices`, `share`, `problems`; `troubleshooting/`: `index`, `known-issues` | `deployment/share.md`, `local-project-simulator/simulator.md`, `data-connections/firebase/known-issues/firebase-windows.md` |
| P14-B13 | `reference/widgets/`: `index`, `forms`, `lists`, `navigation`, `media` | `ui/widgets/widgets-ref.md` and all 36 `ui/widgets/widget-desc/*.md` |
| P14-B14 | `reference/`: `index`, `wrappers`, `shortcuts`, `glossary` | `shortcuts.md`, `ui/wrappers/` (`wrappers-list`, `gesture-detector`, `material`, `opacity`, `padding`, `scrollview`, `text-direction`, `visibility`) |
| P14-B15 | `code/`: `index`, `code-mode`, `files`, `packages`, `custom-code`, `limitations`, `local-projects`, `vs-code`, `import`, `git`, `github` | `git/intro-git.md`, `git/git-local.md`, `git/git-operations-cloud.md`, `git/token-github.md`, `git/clone-from-cloud.md`, `hybrid-approach/intro-hybrid-approach.md`, `hybrid-approach/custom-code.md`, `local-project-simulator/openexisting.md`, `local-project-simulator/othertools.md`, `local-project-simulator/sync.md` |

Batch notes:
- **B09, B10, B08**: the integration pages carry most of the developer detail (generated services, function names,
  files). Rewrite them around what the reader does: switch it on, connect, use it from a screen or from Circuit, test.
  Function names the reader picks in Circuit or a Data Builder stay (R3), explained.
- **B11**: rebuild the Apple and Google console walk-throughs (old `deployment/*-deploy*`), verified against the
  official docs, on top of the current Nowa steps.
- **B13, B14**: reference pages. Widget names are what the Library shows (Flutter names are fine there); describe what
  each widget does and its key properties in plain words.
- **B15**: the code section is for the secondary reader, so code stays. Your main job is coverage: the old Git, GitHub,
  hybrid and local-project pages (the user named GitHub). Make sure someone new to Git can follow (what a commit, push,
  pull, branch and token are, in a line each). Also check these pages don't assume Flutter expertise where they don't
  need to.
