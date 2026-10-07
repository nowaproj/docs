# Rewrite the Nowa docs for 3.12.5

A full rewrite of docs.nowa.dev. Every page is new, written from the released product code (v3.12.5, the build
app.nowa.dev runs) and then checked against that code by a second agent that didn't write it. Old URLs redirect to
their new pages, including every docs link the Nowa app opens.

> **Draft.** The rewrite is complete and builds cleanly. What's still open is listed under [Unfinished](#unfinished):
> mainly screenshots that need a signed-in test account, videos, and the final quality pass you asked for.

## New structure

The sidebar follows the journey of building an app: AI first, visual design second, code third.

| Section | Pages | What's in it |
|---|---|---|
| Home | 1 | What Nowa is, where to start, help links |
| Get started | 8 | Welcome, **Build your first app** (tutorial), account, editor tour, cloud vs local, desktop app, playground, phone layout |
| Build with Nowa AI | 8 | How it works, Design / Plan / Agent modes, chat, context, undo and history, prompting, Figma and Supabase connectors, your own agent |
| Design your app | 16 | Boards, screens, components, adding and editing widgets, properties, layout, responsive design, outline, themes, assets, fonts and icons, templates, localization |
| Add logic | 12 | Events, Circuit, variables, parameters, global state, functions, expressions, navigation, popups, actions, models |
| Connect data and services | 20 | Choosing a backend, Data Builder, REST APIs, Supabase (5), Firebase (4), Stripe, RevenueCat, AdMob, Google Maps, Google Sign-In, deep links, constants |
| Preview and test | 6 | Instant Play, Run, devices, sharing, problems |
| Publish | 6 | Web, Google Play, App Store, builds, downloading code |
| Work with code | 11 | Code mode, files, packages, custom code, limitations, local projects, VS Code, import, Git, GitHub |
| Projects and account | 7 | Projects, project settings, account, workspaces, plans and usage, help |
| Troubleshooting | 2 | By symptom (the app's own messages), known issues |
| Reference | 8 | Widget catalog (45 widgets) + 4 widget guides, wrappers (32), keyboard shortcuts, glossary |
| What's new | 2 | Unchanged |
| Legacy tutorials | 10 | The old video courses and tutorials, moved untouched, with a "made with an earlier version" banner |

## What changed

- **105 new pages** replace about 134 old ones. They follow one style guide (simple, clear, concise, warm, confident;
  exact UI labels in bold) and use **Beta / Enterprise / Desktop app / Cloud / Local** badges only where the code gates
  a feature.
- **Checked against the code**: each batch of pages was verified claim by claim by a separate agent, which fixed what
  was wrong (about 410 fixes, additions or removals across ~2,100 logged checks). Review logs are in
  `_rewrite/reviews/`.
- **Redirects**: `@docusaurus/plugin-client-redirects` with 160 redirects in `redirects.js` covers all 166 old URLs and
  the 44 docs links the app opens (old widget help links land on the matching row of the widget catalog; anchors kept).
- **Screenshots**: 34 taken from the real 3.12.5 editor (a local build of `nowa` `master`, opened at `/playground`),
  each checked by eye, most with an orange highlight on the control that matters. Placeholders for the rest are hidden
  MDX comments, listed in `_rewrite/captures/to-capture.md`.
- **What's New and Changelog**: wording untouched; only links to removed pages were re-pointed (and one empty link
  removed).
- **Site**: explicit `sidebars.js`; a global `<Badge>` component; broken Markdown links now fail the build; fixed the
  sidebar override that put `[object Object]` in every link title; a current social card; "What's new" in the navbar;
  "Community forum" in the footer; removed the Docusaurus sample page.

## Decisions made for you

Full log with reasons: `_rewrite/decisions.md`. The main ones:

1. **Docs describe the released 3.12.5** (`master`), not `dev`. The 3.13 changes on `dev` (Library panel replacing the
   widget picker, new top bar, shortcut changes) are listed in `_rewrite/upcoming-3.13.md` with the pages to update.
2. Shipped features only, with badges where gated; internal, debug, unreachable and private-beta features
   (including Nowa GO) are listed in `_rewrite/left-out.md` instead.
3. No prices, credit amounts or plan limits; plans link to nowa.dev/pricing.
4. Old tutorials kept untouched as "Legacy tutorials".
5. Widget reference = one catalog + four guides for widgets that need Nowa-specific setup.
6. Old unbuilt folders (`docsOld`, `docsold2`, `docsold3`, `archive`, `.history`) left as they were.

## Open questions

`_rewrite/open-questions.md`:
- Should the signed-in screens be captured in a follow-up session with the test account? (They're listed.)
- Connect External Agent: What's New says **Enterprise**; the code checks a per-account grant. Is Enterprise right?

## Product issues found along the way

37 issues spotted while reading the code are in `_rewrite/product-issues.md` (not fixed here). The most important:
- Firebase Google sign-in: the generated `signInWithGoogle()` doesn't compile against `google_sign_in` 7.x.
- Supabase bundled backends deploy edge functions with `verify_jwt: false`.
- Git (local projects): after **Bring my changes**, **Accept Local** drops your own edits; **Revert Commit** only stages.
- The in-app shortcuts sheet lists wrong keys, and the Web View help link has a leading space so it does nothing.
- 32 widget help links in the app point at old URLs (they redirect now; updating them would skip the redirect).

## Unfinished

- **Screenshots that need an account** (about 50: dashboard, account, deploy, connected integrations). Add
  `NOWA_TEST_EMAIL` / `NOWA_TEST_PASSWORD` to the environment and run the capture brief (`_rewrite/CAPTURE.md`).
- **Phase 9 quality pass** (your acceptance criteria, `_rewrite/PLAN.md`): journey walk-through, videos, warmth pass,
  structure review, highlights on older shots, best-practice guides.
- **Live checks** the code alone couldn't settle are listed in `_rewrite/PLAN.md` (Phase 9 backlog).

## How to review

- `yarn start`, then read in this order: **Build your first app**, **Tour the editor**, **How Nowa AI works**,
  **How designing works**, **Connect data and services**, **Get ready to publish**.
- `_rewrite/` holds the plan, research (with code references), review logs and capture tools. It isn't part of the
  site; keep it for follow-up work or delete it before merging.
