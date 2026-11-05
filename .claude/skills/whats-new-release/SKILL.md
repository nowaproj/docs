---
name: whats-new-release
description: Write the What's new page and the changelog for a Nowa release from a release PR, a branch or a version number, in our house style, with videos and annotated screenshots wherever words alone aren't enough. Use whenever someone asks for release notes, a What's new page, a changelog entry or docs for a new Nowa version.
---

# What's new and changelog for a Nowa release

Every release gets two things in this repo:

1. **A What's new page**, one per version, in `whats-new/`. It's for users: what they can do now that they couldn't before, and why that helps them. Only the big things, grouped into benefits, with a video or an annotated screenshot where a picture explains it better than words.
2. **A changelog entry** in `docs/new/change-log.md`. It's the complete list: everything users can notice, sorted into Added, Improved and Fixed.

The pages that set the style are `whats-new/2026-10-28-3-16-4.md` and `whats-new/2026-10-22-3-16-1.md`, with their changelog entries. Read both before you write. They were rewritten until the owner was happy, so match them over anything older in `whats-new/` (pages before 3.16 use an older layout).

Read these as you go:

- `references/style.md`: how the copy reads, the page and changelog templates, and how to turn commits into benefits. **Read it before writing a word.**
- `references/visuals.md`: when a video or a screenshot is worth it, and how to capture one with the scripts in `scripts/`.

## Steps

### 1. Pin down the release

You get one of: a release PR (in `nowaproj/nowa` these are titled like "Staging 3.16.4" and merge `staging` into `master`), a branch, or a version number.

- **The version** is `version:` in `pubspec.yaml` of `nowaproj/nowa` at the PR's head, without the `+build` part.
- **The date** is the day the release PR merged. For a branch that hasn't shipped, use today and say in the PR that it's a draft for an unreleased version.
- **What's in it**: the commits and merged PRs between the last release and this one. A staging PR lists the PRs it brings in, and each of those has its own description, so read those too. Use `gh pr view <n> --repo nowaproj/nowa --json title,body,commits,mergedAt`, the GitHub MCP tools, or `git log <last release>..<this one> --merges` in a clone.
- **The server side**: check `nowaproj/nowa_server` for PRs merged into `master` in the same window. New AI models, credit and plan changes and the "you need version X" rules live there.
- **Gaps**: look at the newest version in `docs/new/change-log.md`. If versions shipped since then without docs (like 3.16.2 and 3.16.3 before 3.16.4), cover them too: their highlights go on this release's page, and each gets its own changelog entry that links to it.

### 2. Read every change and sort it

For each change, read enough of the PR and the code to know what the user sees: the button, the panel, the shortcut, what happens after. Write only what you checked. Then put it in one bucket:

| Bucket | Example | Goes in |
|---|---|---|
| Something new users will want to try | Instant play, translating on the board | What's new (its own section) and changelog **Added** |
| A change users feel, even if it's many small commits | Nowa AI needs fewer steps and credits | What's new (one grouped section) and changelog **Improved** |
| Small improvement | Project cards show when they were edited | Changelog **Improved** only |
| Bug fix | A save the server refused looked saved | Changelog **Fixed** only |
| Invisible to users | Refactors, tests, CI, internal ports, logging | Nowhere |

### 3. Group the changes into benefits

This is the step that matters most. Users don't care that a search returns 12 hits or that edits wait for one request instead of four. They care that Nowa AI got faster and cheaper. Gather every commit that serves the same thing the user wants under one headline that names it, then keep only the details a user would care about below it. Leave out details that are true but don't matter to them. See "From commits to benefits" in `references/style.md` for a worked example.

Then order the sections by how much users will want them, not by how much code they took.

### 4. Write the What's new page

Create `whats-new/<date>-<slug>.md` from the template in `references/style.md`. The slug is the version with dots turned into dashes, without a final `.0` (3.16.4 is `3-16-4`, 3.15.0 is `3-15`). Tags must come from `whats-new/tags.yml`.

- Open with a one- or two-sentence hook: the promise of the release, in plain words.
- Give a packaged name (like **Play-While-Edit**) to the one or two headline features at most, and only when they're truly big. Everything else gets a plain heading.
- Each section says what you can do, why it helps, and how to do it, using the exact names of the buttons and panels in Nowa.
- End with the changelog link line and the feedback line.

### 5. Write the changelog entries

Add the entry at the top of `docs/new/change-log.md`, newest first, with the `📰` line that links to the page. The changelog is more complete and precise than the page, but it's still written for users. See the changelog template in `references/style.md`.

### 6. Add the visuals

For each section, decide: a video, an annotated screenshot, or nothing (the rules are in `references/visuals.md`). Usually it's one or two videos and zero to three screenshots per page. Capture them from the released version with `scripts/record.cjs`, `scripts/encode.cjs` and `scripts/annotate.cjs`. **Look at every frame sheet and every screenshot yourself before using it.**

### 7. Check it

- Read the page as a user who has never seen the PRs. Every sentence should be something they can do, what they get or why it matters.
- Any number ("2x faster", "30% fewer credits") needs real measurements behind it. Without them, describe the benefit without a number and say so in the PR.
- Run `yarn check:videos` (needs `ffprobe`), and `yarn build` if you can (`yarn install` first). Both run on the PR too.
- Check that the links work: the page's links to the changelog (anchors look like `#3164-28-october-2026`) and to docs pages (by URL, like `/code/github#connect-github`, never by file path).

### 8. Open a PR in this repo

Branch from `main`, commit the page, the changelog and the media, and open a PR. In its description:

- what each section covers and which PRs it comes from,
- what each video shows,
- anything you left out on purpose (like a speed claim without data),
- what you checked.

**Don't merge it yourself.** Merging to `main` deploys docs.nowa.dev, so the owner gives the go-ahead. If they ask for changes, update the same PR.

## Things that went wrong before

- A version shipped without docs, and the next page forgot it. Always check the changelog for gaps (step 1).
- A "3x faster" headline was asked for before there was data. Measure it or leave the number out.
- Every feature got a packaged name. The owner wanted that only for the top feature. Keep it simple.
- The first videos stuttered. Use `record.cjs`, which keeps every frame Chromium paints, then `encode.cjs` for a steady 30 fps.
- The encoder's default H.264 level failed `yarn check:videos`. `encode.cjs` already caps it at 4.1. Use the same settings for any video you encode another way (see `references/visuals.md`).
- Two sessions wrote a page for the same release at the same time. Before you start, check open PRs in `nowaproj/docs` and whether `whats-new/` already has a page for this version. If it does, update it.
