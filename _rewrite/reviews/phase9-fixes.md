# Phase 9 fixes

Log of the fixes applied after the structure review (`phase9-structure.md`). One section per editor.

## Structure fixes

Structure editor, 2026-10-07. Covers review items 3, 4, 5, 6 and 12, the label renames of item 15 and the version numbers of item 17 (`reviews/phase9-structure.md`). New text uses only facts from verified pages (cited per line) and the new `docs/guides/*` pages. Checked at the end: 0 broken relative links or anchors across all of `docs/`, and every page compiles as MDX. No legacy, `docs/new/*`, `docs/guides/*`, `sidebars.js` or `docusaurus.config.js` file was touched.

### 1. Next-steps chain (item 3, dead ends of item 12)
- `docs/get-started/welcome.md`: "How building works" is now 9 steps (added Add logic, Connect data and sign-in, Update; each links its section); "Developers and teams" links Git, packages, custom code, workspaces, import, local projects and VS Code; Key terms links the glossary; "Where to go next" became Next steps (account, first app, AI, complete-app guide).
- `docs/get-started/first-app.md`: step 5 adds one sentence pointing to Connect data and services; Next steps now complete-app guide, How logic works, Connect data and services, Get ready to publish (AI, design and test links dropped to stay at 4 links; the walkthrough covers Play, Run and share).
- `docs/get-started/cloud-and-local.md`: added Next steps (desktop app, local projects, projects).
- `docs/get-started/editor-tour.md`: Next steps add the glossary.
- `docs/ai/index.md`: Next steps now chat, prompting, How designing works (AI to design), Build a great app.
- `docs/design/index.md`: "Where to go next" renamed "What's in this section"; new Next steps (How logic works, Build a great app).
- `docs/design/boards.md`, `screens.md`, `components.md`, `select-and-edit.md`: added Next steps (screens links Navigation bars and screen parts and Navigate between screens; components links Lists and grids).
- `docs/logic/index.md`: closing "Something not working?" line replaced by Next steps (Connect data and services, Preview and test, Find and fix problems, Build a great app).
- `docs/integrations/index.md`: added Next steps (Preview and test, Get ready to publish, Build a complete app).
- `docs/test/index.md`: Next steps reordered to follow the journey (publish first), blurb mentions app errors, adds Build a great app.
- `docs/publish/index.md`: new "Ship an update" section (Web: Update or Redeploy; Android and iOS: raise Build number, build again; facts and anchors from `web.md`, `android.md`, `ios.md`); Next steps add Build a great app.
- `docs/code/index.md`: new Next steps (desktop app, download code, publish).
- `docs/account/index.md`: closing "Having trouble?" line replaced by Next steps (first app, publish, Troubleshooting).
- `docs/troubleshooting/known-issues.md`: added Next steps (Troubleshooting, Get help).
- `docs/reference/glossary.md`: added Next steps (editor tour, first app, widget catalog).

### 2. Troubleshooting (item 4)
- `docs/troubleshooting/index.md`: new first section "My app shows an error" (open Problems, run and read Logs, Fix with AI or Agent mode, placeholders; facts from `test/problems.md` and `test/run.md`). The 20 existing sections moved verbatim, so every heading and anchor is unchanged (`{#update-prompts}`, `#this-screen-failed-to-render` and the rest).
- Same file, new order: preview won't start, screen failed to render, placeholder or "could not be loaded", package missing, build/publish/integration fails, Nowa AI error, Time to level up (app, preview, build and AI problems first); Preview Not Available, Unable to load project, Project not found, project freezes (opening projects); Flutter SDK path, No devices, local-project sharing, Clone from GitHub list (desktop and local setup); Upgrade to unlock desktop, new version, Version out of date, No Internet Connection, Maintenance (account, updates, connectivity last); Still stuck?; Next steps. The order is a judgment call (the review groups by theme, there is no usage data).
- Same file: intro points to the new section; description and keywords mention app errors; added Next steps (Problems, Run, Known issues).

### 3. Developer path (item 5)
- `docs/code/index.md`: "Already a Flutter developer?" tip under the intro (desktop app, Flutter setup, import, VS Code, Git); "In this section" table now has Work with local projects and Use Nowa with VS Code rows (import row mentions GitHub).
- `docs/code/import.md`: new "Before you start" list linking the desktop app and `../get-started/desktop-app.md#setting-up-flutter-sdk` (local projects need the Flutter SDK: `desktop-app.md`, `test/run.md`).

### 4. Reference (item 6)
- `docs/reference/index.md`: new overview (catalog, wrappers, shortcuts, glossary; the four widget guides; Next steps).
- `docs/index.md`: Reference card now links to `/reference`; added a glossary link under the what's-new line.
- `docs/design/index.md`: new "Set up common widgets" group links lists, forms, navigation bars, media and the catalog.
- `docs/design/add-widgets.md`: new section "Set up lists, forms, navigation bars and media" with the four guides.
- `docs/design/assets.md`: Next steps add the media guide. (`design/layout.md` already linked Lists and grids.)

### 5. Renames and dates (items 15, 17)
- `docs/publish/android.md`: sidebar_label "Android and Google Play" (title unchanged).
- `docs/publish/ios.md`: sidebar_label "iOS and App Store" (title unchanged).
- `docs/logic/actions.md`: title "More actions" now "Use ready-made actions", sidebar_label "Ready-made actions" (URL unchanged); link text updated in `logic/index.md`, `logic/circuit.md`, `logic/expressions.md`, `logic/popups.md`.
- `docs/logic/navigation.md`: sidebar_label "Navigation" now "Navigate between screens" (the title already said so).
- `docs/integrations/supabase/auth.md`, `docs/integrations/firebase/auth.md`: sidebar_label is "Sign-in" on both (was "Sign users in" and "Authentication").
- `docs/get-started/playground.md`: sidebar_label "Try without an account" (was "Playground").
- `docs/design/responsive.md`: removed "3.12.5" from the first paragraph.
- `docs/troubleshooting/known-issues.md`: removed "3.12.5" from the description.

### 6. Legacy pages (item 13)
- No legacy page edited; the `DocVersionBanner` wrapper covers them.

### Not done, for the lead
- Version numbers kept on purpose, because each statement is about one release: `docs/integrations/firebase/auth.md` (Google sign-in package mismatch), `docs/integrations/deep-links.md` (two notes), `docs/reference/shortcuts.md` (Shortcuts sheet slips). Re-check these four at the next release.
- Legacy links left in the Next steps of `docs/design/responsive.md` and `docs/reference/widgets/forms.md` (item 13, second bullet). They are labeled "made with an earlier version" and the target pages now carry the banner. Say the word and I remove them.
- The home page has no "Build a great app" card (review item 1) or "Popular goals" row, and "Legacy tutorials" still sits in the topic grid (item 19).
- Review items 11, 14, 16, 18, 19 and 20 were not part of my assignment, and I did not touch them (16 is the three-row "preview" mapping on `test/index.md`).
- `_rewrite/pages.md` and `_rewrite/structure.md` still list the old "More actions" and sidebar names.
- The guide links in Next steps describe `guides/index.md` as "a complete walkthrough and tips for design, Nowa AI, data and shipping" and `guides/complete-app.md` as "follow one app from idea to published". Adjust them if the guides change shape.
