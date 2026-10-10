# Rewrite the Nowa docs for 3.13

A full rewrite of docs.nowa.dev. Every page is new, written from the released product code and checked against that
code by a second agent that didn't write it. The docs describe **Nowa 3.13.0**, the release on `nowa` `master` and on
app.nowa.dev. Old URLs redirect to their new pages, including every docs link the Nowa app opens.

> **Ready for review, still a draft.** The rewrite, the quality pass you asked for and the update to 3.13 are done, and
> `yarn build` passes with no broken links or anchors. A few screenshots can't be taken with the test account (see
> [Unfinished](#unfinished)).

## New structure

The sidebar follows the journey of building an app: get started, learn the habits of a good app, then AI, visual
design, logic, data, testing and publishing, with code, account and reference after.

| Section | Pages | What's in it |
|---|---|---|
| Home | 1 | What Nowa is, where to start, help links |
| Get started | 8 | Welcome, **Build your first app** (tutorial), account, try without an account, editor tour, cloud vs local, desktop app (macOS, Windows, Linux), phone layout |
| Build a great app | 6 | Habits and a quality checklist, **Build a complete app** (sign-in, list, detail screen, publish), design, AI, data and state, test-and-ship tips |
| Build with Nowa AI | 8 | How it works, prompting, Design / Plan / Agent modes, chat, context, undo and history, Figma and Supabase connectors, your own agent |
| Design your app | 17 | Boards, screens, components, **the Library** (new in 3.13), adding and editing widgets, properties, layout, responsive design, outline, themes, assets, fonts and icons, templates, localization |
| Add logic | 13 | Events, variables, Circuit, parameters, global state, functions, expressions, navigation (with a list-to-detail recipe), routes (with "start on the login or the home screen"), popups, ready-made actions, models |
| Connect data and services | 20 | Choosing a backend and sign-in, Data Builder, REST APIs, Supabase (5), Firebase (4), Stripe, RevenueCat, AdMob, Google Maps, Google Sign-In, deep links, constants |
| Preview and test | 6 | Instant Play, Run, devices (also without the desktop app), sharing (also with a client), problems |
| Publish | 6 | Getting ready (and shipping an update), web, Google Play, App Store (each with the store's rules), builds, downloading code |
| Work with code | 11 | Code in Nowa (code mode, files, packages, custom code incl. `@Preview` variants, limitations); local projects and Git (local projects, VS Code, import, Git, GitHub) |
| Projects and account | 7 | Projects, project settings, account, workspaces, plans and usage, help |
| Troubleshooting | 2 | "My app shows an error" first, then by the app's own messages; known issues |
| Reference | 9 | Overview, widget catalog (45 widgets) + 4 widget guides, wrappers (32), keyboard shortcuts, glossary |
| What's new | 2 | Unchanged |
| Legacy tutorials | 10 | The old video courses and tutorials, moved untouched, with a "made with an earlier version" banner |

## What changed

- **114 new pages** replace 133 old ones. They follow one style guide (simple, clear, concise, warm, confident; exact UI
  labels in bold) and use **Beta / Enterprise / Desktop app / Cloud / Local / Paid** badges only where the code gates a
  feature.
- **Checked against the code**: every page was verified claim by claim by a separate agent, which fixed what was wrong
  (about 2,100 checks and 410 fixes in the first pass, about 790 claims and 61 fixes for the quality-pass text, about
  1,400 checks and 32 fixes for the 3.13 update). A check in the live 3.13 editor then caught 8 behaviors the code
  alone didn't show, and those pages were corrected. Review logs are in `_rewrite/reviews/`.
- **Updated to Nowa 3.13.0** (released 6 October): the Library panel replaces the Widgets panel, Ctrl/Cmd+K and the
  toolbar's **Widget** tool open the Library, the top bar has **Back** / **Forward** and a searchable **Boards** chip,
  **Files** moved into code mode as a tree, menu entries were renamed (**Bring forward**, **Send backward**...), the
  shortcuts changed, theme-extension tabs, `@Preview` variants and a Linux desktop app. Research with code refs:
  `_rewrite/research/changes-3.13.md`.
- **Coverage audit**: every user-facing feature found in the code was matched to a page; the gaps were closed or listed
  in `_rewrite/left-out.md` with the reason (internal, debug, unreachable, private beta).
- **Redirects**: `@docusaurus/plugin-client-redirects` with 160 redirects in `redirects.js` covers all 166 old URLs and
  the 44 docs links the app opens (old widget help links land on the matching row of the widget catalog; anchors kept).
- **Screenshots and videos, all from 3.13**: 90 screenshots and 6 short videos on 74 pages, taken on app.nowa.dev
  (the playground, and the test account for the dashboard, settings, Deploy menu, Run, Share and Nowa AI), each
  checked by eye, nearly all with an orange highlight on what matters, and names and emails blurred. The videos show adding a
  widget from the Library, laying out rows and columns, Instant Play, adding a Circuit node, changing a theme color
  and Nowa AI building an app. The remaining placeholders are hidden MDX comments, listed in
  `_rewrite/captures/to-capture.md`.
- **What's New and Changelog**: wording untouched; only links to removed pages were re-pointed (and one empty link
  removed). They have no 3.13 entry yet.
- **Site**: explicit `sidebars.js`; global `<Badge>` and `<Anchor>` components (`<Anchor>` registers link targets in
  tables with the broken-anchor check); broken Markdown links now fail the build; fixed the sidebar override that put
  `[object Object]` in every link title; a current social card; "What's new" in the navbar; "Community forum" in the
  footer; removed the Docusaurus sample page and an unused category file. `yarn.lock` adds the redirects plugin and
  pins `search-insights` (`yarn install --frozen-lockfile` passes).

## The quality pass (your acceptance criteria)

1. **Everything needed to build and ship a full app**: a "Build a great app" section with an end-to-end walkthrough,
   recipes for the steps a fresh-eyes review found missing (detail screen from a list, start on the login or the home
   screen, ship an update, share with a client, test without the desktop app), a sign-in comparison, and the Apple and
   Google store rules.
2. **Video where motion matters**: six short videos, including Nowa AI building an app.
3. **Simple, clear, concise, warm, confident**: a wording pass over every page; a script compared each page before and
   after and confirmed no label, link, number, step or heading changed.
4. **Easy to follow**: a fresh-eyes agent walked six real goals through the docs; its fixes are in.
5. **A highlighted screenshot where it helps**: 74 pages have one now (29 before the pass).
6. **Tips for quality apps**: design, AI, data and state, and test-and-ship guides, linked from the feature pages.

## Decisions made for you

Full log with reasons: `_rewrite/decisions.md`. The main ones:

1. **Docs describe the released code**: 3.13.0 now (D20; first written for 3.12.5, then updated when 3.13 shipped).
2. Shipped features only, with badges where gated; internal, debug, unreachable and private-beta features (including
   Nowa GO) are listed in `_rewrite/left-out.md` instead.
3. No prices, credit amounts or plan limits; plans link to nowa.dev/pricing.
4. Old tutorials kept untouched as "Legacy tutorials".
5. Widget reference = one catalog + four guides for widgets that need Nowa-specific setup.
6. A "Build a great app" section right after Get started, with an end-to-end guide.
7. Store rules: short pointers that quote Apple's and Google's own pages; Google's Help Center pages couldn't be opened
   from here, so those are linked, not described.
8. The hidden `?panel=files` link that still opens the old Files panel isn't documented (D21, see Open questions).

## Your answers

- Connect External Agent is **Enterprise** only: badge kept.
- The docs point to Apple's and Google's store rules.
- The test account was used for the signed-in screenshots and is kept outside the repo (never committed). 5 of the 5
  AI prompts you allowed were used (logged in `_rewrite/captures/ai-prompts.md`); the account's AI allowance now shows
  "100% used · Using extra credits".

## Open questions

- **Firestore in 3.13**: the designer has no way to add a main collection or a query any more (product issue P48). A
  hidden link, the project URL with `?panel=files`, still opens the old panel. Should the docs mention it as a
  workaround until it's fixed? Left out for now.

## Product issues found along the way

51 issues spotted while reading the code are in `_rewrite/product-issues.md` (not fixed here). The most important:
- Firestore (3.13): no designer entry point to add collections or queries.
- Firebase Google sign-in: the generated `signInWithGoogle()` doesn't compile against `google_sign_in` 7.x.
- RevenueCat: the generated service has no way to restore purchases, which App Store guideline 3.1.1 asks for.
- Signed-out playground (3.13): the AI chat field's toolbar is broken ("BillingProvider is not initialized").
- Supabase bundled backends deploy edge functions with `verify_jwt: false`.
- Git (local projects): after **Bring my changes**, **Accept Local** drops your own edits; **Revert Commit** only stages.
- Form validators: **Min length** and **Max length** lose their number field as soon as they're added, and adding or
  removing another rule silently drops the length check.
- 32 widget help links in the app point at old URLs (they redirect now; updating them would skip the redirect).

## Unfinished

- **Screenshots the test account can't produce**: the Git and GitHub panels and Android/iOS builds (the account is on
  the Starter plan), a published web site (needs a deploy), connected Supabase, Firebase, Figma, Stripe or Xano
  screens (no external accounts), and desktop-only screens. They stay as hidden placeholders in
  `_rewrite/captures/to-capture.md`.
- **Live checks** that need those setups (for example the Firestore flow, View Only in the Library) are listed in
  `_rewrite/PLAN.md` and the review logs.
- **Test account clean-up**: four "Docs capture ..." projects and a "Docs capture" workspace can be deleted.

## How to review

- `yarn start`, then read in this order: **Build your first app**, **Build a complete app**, **Tour the editor**,
  **Find and add things with the Library**, **How Nowa AI works**, **Connect data and services**, **Get ready to
  publish**.
- `_rewrite/` holds the plan, research (with code references), review logs and capture tools. It isn't part of the
  site; keep it for follow-up work or delete it before merging.
