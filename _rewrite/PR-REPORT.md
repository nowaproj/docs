# Rewrite the Nowa docs for 3.12.5

A full rewrite of docs.nowa.dev. Every page is new, written from the released product code (v3.12.5, the build
app.nowa.dev runs) and then checked against that code by a second agent that didn't write it. Old URLs redirect to
their new pages, including every docs link the Nowa app opens.

> **Ready for review, still a draft.** The rewrite and the final quality pass you asked for are done, and `yarn build`
> passes with no broken links or anchors. The screenshots that need a signed-in account are still missing:
> this environment can't reach Nowa's sign-in server (see [Unfinished](#unfinished)).

## New structure

The sidebar follows the journey of building an app: get started, learn the habits of a good app, then AI, visual
design, logic, data, testing and publishing, with code, account and reference after.

| Section | Pages | What's in it |
|---|---|---|
| Home | 1 | What Nowa is, where to start, help links |
| Get started | 8 | Welcome, **Build your first app** (tutorial), account, try without an account, editor tour, cloud vs local, desktop app, phone layout |
| Build a great app | 6 | Habits and a quality checklist, **Build a complete app** (sign-in, list, detail screen, publish), design, AI, data and state, test-and-ship tips |
| Build with Nowa AI | 8 | How it works, prompting, Design / Plan / Agent modes, chat, context, undo and history, Figma and Supabase connectors, your own agent |
| Design your app | 16 | Boards, screens, components, adding and editing widgets, properties, layout, responsive design, outline, themes, assets, fonts and icons, templates, localization |
| Add logic | 13 | Events, variables, Circuit, parameters, global state, functions, expressions, navigation (with a list-to-detail recipe), routes (with "start on the login or the home screen"), popups, ready-made actions, models |
| Connect data and services | 20 | Choosing a backend and sign-in, Data Builder, REST APIs, Supabase (5), Firebase (4), Stripe, RevenueCat, AdMob, Google Maps, Google Sign-In, deep links, constants |
| Preview and test | 6 | Instant Play, Run, devices (also without the desktop app), sharing (also with a client), problems |
| Publish | 6 | Getting ready (and shipping an update), web, Google Play, App Store (each with the store's rules), builds, downloading code |
| Work with code | 11 | Code in Nowa (code mode, files, packages, custom code, limitations); local projects and Git (local projects, VS Code, import, Git, GitHub) |
| Projects and account | 7 | Projects, project settings, account, workspaces, plans and usage, help |
| Troubleshooting | 2 | "My app shows an error" first, then by the app's own messages; known issues |
| Reference | 9 | Overview, widget catalog (45 widgets) + 4 widget guides, wrappers (32), keyboard shortcuts, glossary |
| What's new | 2 | Unchanged |
| Legacy tutorials | 10 | The old video courses and tutorials, moved untouched, with a "made with an earlier version" banner |

## What changed

- **113 new pages** replace 133 old ones. They follow one style guide (simple, clear, concise, warm, confident;
  exact UI labels in bold) and use **Beta / Enterprise / Desktop app / Cloud / Local / Paid** badges only where the
  code gates a feature.
- **Checked against the code**: every page was verified claim by claim by a separate agent, which fixed what was
  wrong. The first pass logged about 2,100 checks and about 410 fixes; the text added in the quality pass got its own
  checks (about 790 claims, 61 fixes, 6 removals). Review logs are in `_rewrite/reviews/`.
- **Coverage audit**: every user-facing feature found in the code (358) was matched to a page; the gaps were closed or
  listed in `_rewrite/left-out.md` with the reason (internal, debug, unreachable, private beta).
- **Redirects**: `@docusaurus/plugin-client-redirects` with 160 redirects in `redirects.js` covers all 166 old URLs and
  the 44 docs links the app opens (old widget help links land on the matching row of the widget catalog; anchors kept).
- **Screenshots and videos**: 67 screenshots and 5 short videos on 58 pages, taken from the real 3.12.5 editor (a local build of `nowa`
  `master`, opened at `/playground`), each checked by eye, nearly all with an orange highlight on the control that matters.
  The videos show adding a widget, laying out rows and columns, Instant Play, adding a Circuit node and changing
  a theme color. Placeholders for the shots that need an account are
  hidden MDX comments, listed in `_rewrite/captures/to-capture.md`.
- **What's New and Changelog**: wording untouched; only links to removed pages were re-pointed (and one empty link
  removed).
- **Site**: explicit `sidebars.js`; global `<Badge>` and `<Anchor>` components (`<Anchor>` registers link targets in
  tables with the broken-anchor check); broken Markdown links now fail the build; fixed the sidebar override that put
  `[object Object]` in every link title; a current social card; "What's new" in the navbar; "Community forum" in the
  footer; removed the Docusaurus sample page and an unused category file. `yarn.lock` adds the redirects plugin and
  pins `search-insights` (yarn also pruned unused entries; `yarn install --frozen-lockfile` passes).

## The quality pass (your acceptance criteria)

1. **Everything needed to build and ship a full app**: a new "Build a great app" section with an end-to-end
   walkthrough (sign-in, a list from Supabase, a detail screen, test, publish), recipes for the steps a fresh-eyes
   review found missing (open a detail screen from a list, start on the login or the home screen, ship an update,
   share with a client, test without the desktop app), a sign-in comparison, and the Apple and Google store rules.
2. **Video where motion matters**: adding widgets, layout, Instant Play, Circuit and themes (15 s each). The AI
   building a screen needs sign-in.
3. **Simple, clear, concise, warm, confident**: a wording pass over every page (79 pages edited). A script compared
   each page before and after and confirmed no label, link, number, step or heading changed.
4. **Easy to follow**: a fresh-eyes agent walked six real goals through the docs; its fixes are in (journey order
   in the sidebar, "Next steps" on every page, troubleshooting starts from "my app shows an error", a reference
   overview, the long navigation page split).
5. **A highlighted screenshot where it helps**: 58 pages now have one (up from 29); older shots were re-taken with highlights.
6. **Tips for quality apps**: design, AI, data and state, and test-and-ship guides, linked from the matching feature
   pages.

## Decisions made for you

Full log with reasons: `_rewrite/decisions.md`. The main ones:

1. **Docs describe the released 3.12.5** (`master`), not `dev`. The 3.13 changes on `dev` (Library panel replacing the
   widget picker, new top bar, shortcut changes) are listed in `_rewrite/upcoming-3.13.md` with the pages to update.
2. Shipped features only, with badges where gated; internal, debug, unreachable and private-beta features
   (including Nowa GO) are listed in `_rewrite/left-out.md` instead.
3. No prices, credit amounts or plan limits; plans link to nowa.dev/pricing.
4. Old tutorials kept untouched as "Legacy tutorials".
5. Widget reference = one catalog + four guides for widgets that need Nowa-specific setup.
6. A "Build a great app" section right after Get started, with an end-to-end guide.
7. Store rules: short pointers that quote Apple's and Google's own pages; Google's Help Center pages couldn't be
   opened from here, so those are linked, not described.
8. Old unbuilt folders (`docsOld`, `docsold2`, `docsold3`, `archive`, `.history`) left as they were.

## Your answers

- Connect External Agent is **Enterprise** only: badge kept.
- The docs now point to Apple's and Google's store rules.
- The test account is kept outside the repo (never committed); see Unfinished for why it couldn't be used yet.

## Product issues found along the way

47 issues spotted while reading the code are in `_rewrite/product-issues.md` (not fixed here). The most important:
- Firebase Google sign-in: the generated `signInWithGoogle()` doesn't compile against `google_sign_in` 7.x.
- RevenueCat: the generated service has no way to restore purchases, which App Store guideline 3.1.1 asks for.
- Supabase bundled backends deploy edge functions with `verify_jwt: false`.
- Git (local projects): after **Bring my changes**, **Accept Local** drops your own edits; **Revert Commit** only stages.
- Shared previews: the "Single Screen Preview" card shows for every single-screen link, and **Attach all** throws.
- The in-app shortcuts sheet lists wrong keys, and the Web View help link has a leading space so it does nothing.
- 32 widget help links in the app point at old URLs (they redirect now; updating them would skip the redirect).

## Unfinished

- **Screenshots that need an account** (about 50 on 36 pages: dashboard, account, AI chat and checkpoints, deploy,
  Git, connected integrations) and the video of Nowa AI building a screen. The environment's network policy blocks
  `server.nowa.dev` (sign-in and project data) and `app.nowa.dev`. Allow both in the environment settings and run
  `_rewrite/CAPTURE-SIGNED-IN.md` (at most five AI prompts).
- **Live checks** the code alone couldn't settle (for example typing `.id` in a GoRouter location, the Supabase
  session check in redirect logic) are listed in `_rewrite/PLAN.md`.
- **3.13**: when it ships, update the pages listed in `_rewrite/upcoming-3.13.md`.

## How to review

- `yarn start`, then read in this order: **Build your first app**, **Build a complete app**, **Tour the editor**,
  **How Nowa AI works**, **How designing works**, **Connect data and services**, **Get ready to publish**.
- `_rewrite/` holds the plan, research (with code references), review logs and capture tools. It isn't part of the
  site; keep it for follow-up work or delete it before merging.
