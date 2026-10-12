# Docs for the right reader, with nothing lost from the old docs (phase 14)

This PR applies the feedback on the live docs: write every page for people with an idea who build with Nowa AI and
visual editing (not for developers), bring back still-valid information that the old docs had and the rewrite
dropped, and make the tone warmer and better explained. The plan, rules and per-section logs are in `_rewrite/`
(`P14-BRIEF.md`, `P14-VERIFY.md`, `reviews/P14-*`).

## What changed for readers

- **Written for non-developers.** Every page outside "Work with code" now says what a feature means for your app,
  not what Nowa writes into the code. File paths, generated classes and functions, code lines, package names and
  platform build files moved off those pages. What you see on screen and pick in Circuit (function names, query
  steps, Problems messages) stays, each explained in plain words. Technical words you can't avoid (API key, bundle
  ID, webhook, row-level security...) are explained the first time they appear.
- **No-code path first.** Wherever a task or a 3.13 workaround needed code, the page now leads with a Nowa AI prompt
  in Agent mode (never promising the exact result) and says how to check it; hand edits stay, labelled for people
  who code.
- **Warmer and better explained.** Steps carry the why and what happens next, with everyday examples and natural
  transitions, without filler (D25).
- **New page: What Nowa adds to your code** (`code/generated-code.md`): the developer details from the other pages,
  per feature, for people who work in code mode or VS Code. Main pages link to it at most once.
- **New page: Make decisions, handle errors and repeat steps** (`logic/conditions.md`): If, Try and loops, split
  from the Circuit page, which had grown to about 2,700 words. Old control-flow URLs redirect there.

## Brought back from the old docs

Every old page (except the legacy tutorials, moved untouched in PR #18) was audited item by item against the new
docs and the 3.13.0 code.

| Result | Items |
|---|---|
| Audited | about 1,360, from 125 old pages |
| Already covered by the new docs | 825 |
| **Added back** (still valid in 3.13, rewritten in plain words) | **335** |
| Obsolete in 3.13 (each with a code ref) | 79 |
| Not useful (marketing, prices, duplicates) | 110 |
| Developer-only (moved to the code page) | 9 |

Highlights:

- **Publishing:** the Apple walk-through is back step by step (Apple Developer Program, registering the bundle ID,
  creating the app in App Store Connect, a team API key with the right access, the distribution certificate), and so
  is Google Play (developer account, Create app, setup tasks, the closed test for new personal accounts, release,
  review). Steps follow Apple's and Google's current help pages; fees are named without amounts.
- **GitHub and Git:** creating a fine-grained token with the right permission (or a classic token when needed),
  organization approval, creating an empty repository, a "Git in a minute" primer, working as a team.
- **Firebase, Supabase, Stripe, RevenueCat, AdMob, Maps, Google sign-in:** the console and dashboard steps each
  integration still needs (create the project, sign-in providers, tables and policies, keys and webhooks, products
  and paywalls, ad units, API keys, OAuth client IDs), checked against each provider's docs today.
- **Logic:** what variables, params, functions, events, If and Try are and when to use each, with worked examples
  (confirm before deleting, pick a date, show a picked photo, go back with a value) and the 37 date formats.
- **Design and widgets:** layout concepts (row, column, stack, constraints, Fixed/Auto/Expand), theme color roles and
  text styles, and the settings of the widgets and wrappers the old widget pages explained.
- **Test:** what Flutter, Xcode and Android Studio are and when you need them, phone setup, emulators.
- **Glossary:** about 80 new plain-language entries for the Flutter, backend, publishing and Git words the docs use.

## How it was checked

- 15 section agents rewrote the pages and audited the old docs; 15 different agents then checked every added or
  changed claim against `nowaproj/nowa` 3.13.0 (`3cb32031c`) and the official third-party docs, checked every
  removed fact, and enforced the reader rules. They made **207 corrections**, restored **15 facts** and made **36
  more plain-language fixes**.
- `yarn build` passes with no broken links or anchors; all 48 anchored targets of old URLs and in-app links resolve;
  no MDX hazards; front matter valid.
- Developer-only details on non-code pages: **328 → 104**. What's left is on-screen text the reader sees or picks
  (Circuit function names, Problems messages, dialog fields), each explained.
- Credential scan over the whole diff: no stored secrets, keys, emails or project addresses.

## Decisions made for you

| ID | Decision |
|---|---|
| D22 | Every page outside `docs/code/` is written for non-developers; code-only facts move to the code section; UI text that looks like code stays, explained; no-code path first. |
| D23 | New page "What Nowa adds to your code" holds the moved developer facts per feature. |
| D24 | Old-docs coverage item by item; Nowa facts verified in code, third-party steps verified against current official docs and linked; no third-party fee amounts. |
| D25 | Tone: warmer, more conversational, better explained, never filler. |
| D26 | Merge to `main` when done (your instruction), review live afterwards. |
| D27 | Split only where a section is a separate concept (If, Try and loops); pages that walk one task top to bottom (iOS, Android, Stripe, tutorials) and reference pages stay whole. |

## New product issues found while checking (P159-P178)

20 new entries in `_rewrite/product-issues.md`, mostly from reading the code (not run live). The ones users are most
likely to hit: Stripe charges zero-decimal currencies (such as yen) 100 times too much (P171); turning on **await**
in a screen's start-up function shows an error screen (P161); Supabase **Use Keys** may no longer list tables after
Supabase's anon-key change (P168); the Android emulator option disappears from the setup screen once the Android
tools are installed (P159); changing the app name, bundle ID or a permission silently rebuilds the Android and iOS
settings files (P167). Each one that users can hit has a workaround on its page or in Known issues.

## Open questions and live checks

- Some new steps were checked in the code but never clicked through in the app (each `reviews/P14-*-verify.md` lists
  them under "Open issues"); the most important are the Supabase **Use Keys** table list, the Create/Update Record
  templates, the Color Filter wrapper (P164) and the RevenueCat paywall events.
- New example prompts for Nowa AI were not tried (no AI prompts in this pass).
- The New UX experimental flag stays documented with a warning; drop it if you prefer.
