# Rewrite the Nowa docs for 3.12.5

A full rewrite of docs.nowa.dev. Every page is new, written from the released product code (v3.12.5, the build
app.nowa.dev runs) and then checked against that code by a second agent that didn't write it. Old URLs redirect to
their new pages, including every docs link the Nowa app opens.

> **Draft.** The rewrite is complete and `yarn build` passes with no broken links or anchors. The final quality pass
> you asked for (phase 9) is in progress; what's still open is listed under [Unfinished](#unfinished).

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
| Add logic | 12 | Events, variables, Circuit, parameters, global state, functions, expressions, navigation, popups, ready-made actions, models |
| Connect data and services | 20 | Choosing a backend and sign-in, Data Builder, REST APIs, Supabase (5), Firebase (4), Stripe, RevenueCat, AdMob, Google Maps, Google Sign-In, deep links, constants |
| Preview and test | 6 | Instant Play, Run, devices, sharing, problems |
| Publish | 6 | Getting ready (and shipping an update), web, Google Play, App Store, builds, downloading code |
| Work with code | 11 | Code in Nowa (code mode, files, packages, custom code, limitations); local projects and Git (local projects, VS Code, import, Git, GitHub) |
| Projects and account | 7 | Projects, project settings, account, workspaces, plans and usage, help |
| Troubleshooting | 2 | "My app shows an error" first, then by the app's own messages; known issues |
| Reference | 9 | Overview, widget catalog (45 widgets) + 4 widget guides, wrappers (32), keyboard shortcuts, glossary |
| What's new | 2 | Unchanged |
| Legacy tutorials | 10 | The old video courses and tutorials, moved untouched, with a "made with an earlier version" banner |

## What changed

- **112 new pages** replace 133 old ones. They follow one style guide (simple, clear, concise, warm, confident;
  exact UI labels in bold) and use **Beta / Enterprise / Desktop app / Cloud / Local / Paid** badges only where the
  code gates a feature.
- **Checked against the code**: each batch of pages was verified claim by claim by a separate agent, which fixed what
  was wrong (about 410 fixes, additions or removals across ~2,100 logged checks). Review logs are in
  `_rewrite/reviews/`.
- **Coverage audit**: every user-facing feature found in the code (358) was matched to a page; 348 were covered and
  the gaps were closed or listed in `_rewrite/left-out.md` with the reason (internal, debug, unreachable,
  private beta).
- **Redirects**: `@docusaurus/plugin-client-redirects` with 160 redirects in `redirects.js` covers all 166 old URLs and
  the 44 docs links the app opens (old widget help links land on the matching row of the widget catalog; anchors kept).
- **Screenshots**: 34 taken from the real 3.12.5 editor (a local build of `nowa` `master`, opened at `/playground`),
  each checked by eye, most with an orange highlight on the control that matters. Placeholders for the rest are hidden
  MDX comments, listed in `_rewrite/captures/to-capture.md`.
- **What's New and Changelog**: wording untouched; only links to removed pages were re-pointed (and one empty link
  removed).
- **Site**: explicit `sidebars.js`; global `<Badge>` and `<Anchor>` components (`<Anchor>` registers link targets in
  tables with the broken-anchor check); broken Markdown links now fail the build; fixed the sidebar override that put
  `[object Object]` in every link title; a current social card; "What's new" in the navbar; "Community forum" in the
  footer; removed the Docusaurus sample page and an unused category file.

## Decisions made for you

Full log with reasons: `_rewrite/decisions.md`. The main ones:

1. **Docs describe the released 3.12.5** (`master`), not `dev`. The 3.13 changes on `dev` (Library panel replacing the
   widget picker, new top bar, shortcut changes) are listed in `_rewrite/upcoming-3.13.md` with the pages to update.
2. Shipped features only, with badges where gated; internal, debug, unreachable and private-beta features
   (including Nowa GO) are listed in `_rewrite/left-out.md` instead.
3. No prices, credit amounts or plan limits; plans link to nowa.dev/pricing.
4. Old tutorials kept untouched as "Legacy tutorials".
5. Widget reference = one catalog + four guides for widgets that need Nowa-specific setup.
6. A "Build a great app" section right after Get started (your phase 9 criteria), with an end-to-end guide.
7. Old unbuilt folders (`docsOld`, `docsold2`, `docsold3`, `archive`, `.history`) left as they were.

## Open questions

`_rewrite/open-questions.md`:
- Should the signed-in screens be captured in a follow-up session with the test account? (They're listed.)
- Connect External Agent: What's New says **Enterprise**; the code checks a per-account grant. Is Enterprise right?
- Store rules (Apple's in-app purchase rules, Sign in with Apple, Play Console policies) are left out because nothing
  in the code confirms them. Should the docs point to them?

## Product issues found along the way

43 issues spotted while reading the code are in `_rewrite/product-issues.md` (not fixed here). The most important:
- Firebase Google sign-in: the generated `signInWithGoogle()` doesn't compile against `google_sign_in` 7.x.
- Supabase bundled backends deploy edge functions with `verify_jwt: false`.
- Git (local projects): after **Bring my changes**, **Accept Local** drops your own edits; **Revert Commit** only stages.
- The in-app shortcuts sheet lists wrong keys, and the Web View help link has a leading space so it does nothing.
- 32 widget help links in the app point at old URLs (they redirect now; updating them would skip the redirect).

## Unfinished

- **Phase 9 quality pass** (your acceptance criteria, `_rewrite/PLAN.md`): in progress. Done so far: the "Build a
  great app" guides, list-to-detail and publishing recipes, a fresh-eyes structure review and its fixes. Still
  running: checking the new text against the code, videos, highlights on older shots, and the language pass.
- **Screenshots that need an account** (about 50: dashboard, account, deploy, connected integrations). Add
  `NOWA_TEST_EMAIL` / `NOWA_TEST_PASSWORD` to the environment and run the capture brief (`_rewrite/CAPTURE.md`).
- **Live checks** the code alone couldn't settle are listed in `_rewrite/PLAN.md` (Phase 9 backlog).

## How to review

- `yarn start`, then read in this order: **Build your first app**, **Build a complete app**, **Tour the editor**,
  **How Nowa AI works**, **How designing works**, **Connect data and services**, **Get ready to publish**.
- `_rewrite/` holds the plan, research (with code references), review logs and capture tools. It isn't part of the
  site; keep it for follow-up work or delete it before merging.
