# P14-B13 verify: widget reference (index, forms, lists, navigation, media)

Verifier: P14-B13-V. Source of truth: `/home/user/nowa-master` (3.13.0, `3cb32031c`); paths below are relative to it.
Flutter behavior: SDK source `/home/user/flutter/packages/flutter/lib/src/` (3.44.8 stable), whose doc comments are what
api.flutter.dev shows. Package docs: pub cache `/root/.pub-cache/hosted/pub.dev/<package>/`. Details labels: parameter name
through `camelCaseToSpaces()` (`packages/core/lib/src/utils.dart:77-79`, used by `packages/core/lib/src/fields/block_field.dart:212-218`)
unless an editor passes `label:`.

## Anchors and links

- Explicit anchors (`{#id}`, `<Anchor id>`) on `origin/main` vs now: index 46/46, forms 5 (+2 new), lists 4 (+4 new),
  navigation 9/9, media 9 (+2 new). None lost.
- Auto heading IDs: one lost, forms `#use-checkboxes-switches-and-sliders` (the heading got the new explicit ID
  `{#checkbox-switch-slider}`). No page, `src/` file or app string links to it, but it was live on `origin/main`, so I kept it
  alive with an `<Anchor id="use-checkboxes-switches-and-sliders" />` at the start of that section (global component,
  `src/theme/MDXComponents.js`).
- Every relative link and anchor on the five pages resolves (script check of files, explicit IDs, `<Anchor>` and heading slugs).

