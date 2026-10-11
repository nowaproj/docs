# Consistency pass on the platform issues report

Done on the batch files in this folder (`B*.md`, `S*.md`) against Nowa 3.13.0 (`3cb32031c`, read-only). Nothing outside
the batch files and this log was edited, and nothing was committed. IDs below are the ones used in the files (P1-P58 for
the old entries, R/M/X for the new ones); the number each new entry gets in `report.md` is given where it helps.

| | Before | After |
|---|---|---|
| Entries in `report.md` | 117 (R3 dropped as X1) | 116 |
| Critical / High / Medium / Low | 2 / 15 / 60 / 40 | 8 / 14 / 59 / 35 |

Net: 3 entries merged away (R28, R19, M13), 2 split out (X2, X3), 14 existing entries re-rated (12 up, 2 down).
`python3 -I _rewrite/platform-issues/assemble.py` reports no missing batches, and `check.txt` is byte-identical to the
one before the pass (the same 15 Flutter and 3.12.5 references that were already unresolved; no new ones).

## 1. Duplicates merged

| Removed | Kept | What moved |
|---|---|---|
| R28 (sheet lists two keys that don't work) | P1 | Nothing unique: both rows are P1's first two table rows, same lines (`shortcuts_cheat_sheet.dart:49,56`), same fix. R28's status line ("P1 and P2 are fixed") was wrong for P1 and is gone. |
| R19 (Supabase function name with a space for camelCase tables) | P25 | Same line (`supabase_template_manager.dart:94-96`), same helper, same fix. P25 now covers both names (title changed), has R19's camelCase repro and `:102-104`, and the `generateSymbolName` alternative with its catch (it numbers a clash where the docs say a regenerated template replaces the function). Rating: see section 5. |
| M13 (three more label slips) | R32 | M13's three rows (Generate Models snackbar, "New Create global state", Bundle Identifier "Invalid package name") are R32 rows 10-12, with their sources and docs lines. Root cause, fix and docs impact of R32 rewritten to cover them. M13 said itself that R32 holds "the other slips of this kind". |
| R32's row "Library row menu -> Insert hint" | P2 | Same line (`library_host.dart:161`), same symptom and fix as P2's first extra bullet. Row removed from R32. P2's status now says it is fixed for Move Up and Move Down and that the two extra hints are still present. |

Partial overlaps kept as separate entries, with a pointer in the text:
- P27 and R14: P27's "two more faults" bullet 1 is R14's Revert half. R14 also covers **Undo commit**, the enabled menu entries and cloud projects, and has a different fix, so both stay. The bullet now says "R14 covers this".
- P8 and M7: P8's closing remark about the missing quota check is M7's point (1). It now ends "M7 covers this gap and what a failed start leaves behind".
- P24 and R30: P24's correction already mentioned the timeout dead end; it now points to R30, whose subject is the shared `WaitingForAuthDialog` (GitHub and Figma too).

Checked and not duplicates (related only, see section 2): R13/P30, R17/P39/P42, R23/P51, R25/P56, R12/M3, M5/R6, M21/P39, R31/P26, R32 and R33 against P5, P13, P55, M9 (no batch row restates those). A pass over all code references and a text-similarity ranking of all 117 entries found no further duplicates.

## 2. Related lines added

Each pair has `Related: ...` as the last line of both entries (checked symmetric by script; 75 entries carry one). Clusters:

- Key hints and label slips: P1, P2, P3; P2, R32, M9; R32 with P5, P13, P55, M9; M9 with R29.
- Library: R12 with M3 (silent creates); R10 with R23 (drag differs from Insert); R11 with R24 (search keyboard); R22 with R23 (`smooth_page_indicator`).
- Packages and imports: P51 with R23, R33, X3 (Add Missing Dependencies); P46 with X3 and R21; R6 with M5; M4 with M5; M5 with M21; M21 with M17, P39, P40; M17 with R20 (Bundle Identifier).
- Deep Links: P39, P40, P42, R17 (R17 had "Related: P39, P40, P42" in its Confidence line; moved to the last line).
- Git: P27 with R14, P28, P30; P28 with X2; P29 with X2 (exactly `Related: X2.`); P30 with R13; R13 with M6.
- Supabase: P24 with R30; P26 with R31; R31 with P41, P49; P41 with P49; P48 with P49; P23 with R2 and X1.
- Firebase: P31, P33, P34, P43 (disconnect and Google provider).
- REST: P37 with P53; P54 with R26.
- Other: P6 with P7 (`docUrl` lines); P22 with P38 (bare `@CustomFunction()` loses its annotation in both); P44 with P45; P21 with M19, M20; R1 with M1; R15 with R16; R25 with P56.

## 3. Details from DETAILS-TO-MERGE.md

Each was checked in the 3.13.0 tree (`origin/dev` for library_panel.dart).

| Item | Result |
|---|---|
| P5 `_kindName` | Already in P5 (`library_panel.dart:759`, `:971-979`; dev `:764`, `:983-991`). Lines verified. Only `Related: R32` added. |
| P24 `getError`, `_connect` | `getError: () => null` (`sb_oauth_setup.dart:194`) was already there. Added: `_start` does not await `_connect()` (`:122`), and `_connect` throws "User not logged in" (`:131`), which leaves a signed-out visitor on the waiting dialog until the timeout; pointer to R30; one fix sentence. |
| P25 camelCase | Merged with R19 (section 1). |
| P33 | Added `fb_auth_manager.dart:51`, `:121-133`, `:130`, `:28`, `:135-140`, `:142-145`; verified. |
| P42 `open.my.app` | Already in P42 (`app_links_package_config.dart:91`, verified). "See R17" became the Related line. |
| P58 Source = Custom | Line `data_field.dart:217` is right (`onUpdate` only sets local state), but the claim needed a correction: **Custom** is `SelectField`'s fallback entry (`nowa_fields.dart:877-884`) and is listed only while no source matches the code, so it cannot be picked after a request was chosen. Folded in as "switching Source doesn't clear the call either"; the severity half-sentence no longer says "picking another source". |
| P1 and P2 "both fixed" | Reconciled: P1's old row is fixed, but eight other sheet rows differ (three wrong or misleading, five label, order or glyph slips), so P1 stays Present; P2's first extra bullet absorbed R32's row. P1 status line now counts the rows. |
| P1 "Open selection in new file" | Checked: the key is bound to `OpenSelectionInNewTabIntent` (`designer_setup.dart:53`) and opens the file of the selected widget's class in an editor tab (`designer_actions.dart:298-313`, `editor_provider.dart:56-78`); it creates no file. Added as a Label row (and step 5), and removed from the "rows that match" list. |
| P4 `isEnabled` line | Already in P4. The sweep's `:11` is the 3.12.5 line; 3.13.0 and dev are `:10`, as P4 says. No change. |
| P3 tooltip caveat | The caveat does not exist: the **Boards** tab button is not built in code mode (`lib/tabs_view.dart:25`). One sentence added to P3. |
| R12 | Pointer to M3 and the Related line. M3's cause differs (the `createDirectory` call sits inside the arguments of `onAdd?.call(...)`, so with `onAdd` null no folder is made). |
| R23 Html, asset drops | Html has no `WidgetInfo` (`declaration_info_factory.dart:13-59`): confirmed. SVG and Rive asset rows reach the board through `LibraryService.dragDataFor` and `createDragData` (`file_object.dart:619-621`, `:650-652`) with no dependency check: confirmed. Corrected: there is no Lottie asset drop, and video needs no package (`NowaVideoPlayer` is in `nowa_runtime`). Fix sentence added for Html (`dart_package.dart:117`). |
| R32 / M13 | Folded in (section 1). The three rows were checked line by line. |
| R6 "already covers" | Checked (`package_service.dart:55-70`, `:422`; `packages_settings.dart:375-378`; `pubspec_manager.dart:167-171`). No change except the Related line to M5. |
| P29 / P51 splits | Section 4. |

## 4. Split entries

**X2** (S3, final number P62): the **Accept Remote** race. `_acceptChanges` reads the pane text after an `await` while the
**Accept Remote** handler does not await it and runs `index++; _loadTexts()` first, so every file but the last gets the
next file's Remote text (`git_details.dart:1777-1786`, `:1892-1895`). Verified by reading the handlers and by a stand-alone
Dart 3.12.2 script that copies the two functions and the controller behavior (not the app): two **Accept Remote** clicks
wrote `{lib/a.dart: B-remote, lib/b.dart: B-remote}`; **Accept Local** and the last file were right. The same code is in
3.12.5 (`git_details.dart:1860-1869, 1975-1983`). Trimmed out of P29: the title, severity, status, confidence, "what
happens", steps, root cause, fix item 1, widget test and docs clause. P29 keeps the index fault and the `NConflict.sha`
note, and ends `Related: X2.`.

**X3** (S3, P68): the RevenueCat version clash. The **Enabled** switch (`PackageToggle._toggle` ->
`addPackageByName`, `settings_widgets.dart:162-174`, `package_service.dart:129-134`) writes `^<latest>`, ignoring the
config's `version: '^9.12.0'` (`revenuecat_package_config.dart:14`); the paywall's dependencies pin `purchases_ui_flutter
^9.12.0` (`dart_package.dart:188`, `revenuecat_package_config.dart:127-138`); the dialog counts a package as installed by
name only (`dependency.dart:29`, `package_service.dart:363-374`). pub.dev data, read on 11 Oct 2026: `purchases_flutter`
latest 10.15.2 (10.0.0 on 2026-04-15); every `purchases_ui_flutter` 9.x depends on the same 9.x of `purchases_flutter`
(9.12.0 on `^9.12.0`, 9.16.2 on `^9.16.2`, line 14 of each pubspec), and a 10.x line of `purchases_ui_flutter` exists. The
generated `RevenuecatService` calls (`configure`, `getOfferings`, `purchase(PurchaseParams)`, `restorePurchases`) exist in
`purchases_flutter` 9.12.0 and 10.15.2 (checked in both archives). `pub get` itself was not run. Trimmed out of P51 (the
"Related problem" paragraph); P51 ends `Related: R23, R33, X3.` and P46's "see the version problem under P51" now says X3.

## 5. Severity

How the scale was read. **Critical (a)** only where user-authored content is destroyed, nothing inside Nowa brings it back,
and no accurate warning comes first; a field value retyped in seconds does not count. **Critical (b)**: a secret in the
shipped client or a bypassed auth check. **High**: a loss that undo, Reapply Checkpoint, reconnecting, Git or an accurate
warning can reverse or avoid; generated code that doesn't build (or a dependency set that can't resolve) where Nowa itself
neither flags it with a one-click Fix nor documents the repair; a broken flow many users hit with no easy workaround.
Trigger breadth was not used to lower a Critical (P22 and P28 are narrow and stay Critical) or to lift a Medium.

| ID (final) | Old -> new | Why |
|---|---|---|
| P52 | High -> Critical | Click on **Remove** deletes all but the first child, no warning, and by the code Undo does not restore them. The writer's "the design can be rebuilt" does not make it recoverable. |
| P28 | High -> Critical | The uncommitted edits are overwritten, the stash is already dropped, and only `git fsck` outside Nowa finds them. "Recoverable from .git by hand" is outside Nowa. |
| R4 (P60) | High -> Critical | The user's own repository folder, `.git` included, is erased; the dialog never names the folder; Nowa cannot restore it. |
| P23 | High -> Critical | A security exposure by the scale (the JWT gateway check is off for every function Nowa deploys). The writer's "that check is thin" is kept in the reason. Borderline, see section 8. |
| M1 (P61) | Medium -> Critical | A secret in the shipped client (two OAuth client secrets, one API key). How much an outsider can do is unknown, as the entry says. Borderline. |
| P29 | High -> Medium | After the split only the index fault is left, which the writer rated Medium on its own; nothing is lost on disk and accepting every file in one pass avoids it. |
| X2 (P62) | new: Critical | Takes over the loss from P29: another file's text is written and staged, and after **Bring my changes** (where Remote holds your edit, P28) the overwritten edit is unrecoverable. After a merge or pull both sides stay in Git. Borderline. |
| R2 (P69) | High -> Medium | Misleading success message, but the docs already say to use **Connect** (not **Use Keys**) and to check the Supabase dashboard (`docs/integrations/stripe.md:12,89`). |
| P11 | Medium -> High | A destructive restore is described as smaller than it is; the AI's changes can be reapplied, your own edits in unlisted files cannot. |
| M16 (P65) | Medium -> High | Edits are lost silently on reload; the docs mention the cap, the app does not warn, and saving to an account avoids it. |
| P35 | Medium -> High | Generated code that doesn't build: **DOWNLOAD** drops the address and leaves a call Dart rejects, and Problems doesn't flag it. "Few users pick it" is kept in the reason. |
| M14 (P64) | Medium -> High | Generated code that doesn't build (`context` in a function that has none), with no hint of the workaround. Code reading only. |
| P25 | Low -> Medium | After the R19 merge: camelCase and PascalCase tables get a name with a space, so the function can't be added. |
| R23 (P87) | Low -> Medium | The project does not build until **Fix** is clicked; same effect as R22, which was already Medium. |
| R31 (P88) | Low -> Medium | The severity had no reason; **Set up Backend** is missing from the menu after a reopen, which is a functional gap with a workaround, not cosmetic. |
| X3 (P68) | new: High | A dependency set that can't resolve. |

Looked at closely and kept: **P22** Critical (narrow trigger, but code is lost and nothing says it will go); **R1** Critical;
**P31** High and **X1** High (generated code that doesn't build; X1's "Not Critical" wording replaced by the rule's
words); **P48** High (broken flow, no easy workaround); **M5** and **M21** High (loss in imported projects that the
original or Git brings back; no warning; borderline for Critical); P34 and P47 High (reversible by reconnecting or Undo).
Medium on purpose although the output "doesn't compile": R22, R23 and P33 (Problems offers **Fix**, or the docs say to
delete the function); P57 (small body, retype it); R7 and R8 (UI offers owner or editor actions; if the server accepts them
it is an authorization bypass, now said in the reason).

Reasons rewritten without a rating change: P22, P31, P33, P34, P47, P50, R1, R7, R8, X1 (they used the old scale's wording
or hid the rule), and P58's.

## 6. Field hygiene and other fixes

- P48: heading `**Root cause**` lacked the period.
- R31: **Severity** had no reason.
- X1: the "Overlap: R3 ..." paragraph became a self-reference in the report ("P67 ... logs the same line") because the assembler maps R3 to X1; removed. "(R2 in `S1-from-reviews.md`)" -> "(R2)".
- R17: the Related text moved from the Confidence line to the last line.
- P29: a stray blank line split the numbered steps.
- P46: "see P51" -> "see X3".
- P2: status now says what is fixed and what is still present.
- Every entry has the five fields with a valid first word and the five sections in order (script check over all 117 entries); no level-2 headings, no dangling R/M/X references, Related lines are the last line and symmetric.

## 7. Secrets

Scanned all batch files for Google keys (`AIza`), client secrets (`GOCSPX-`), Airtable tokens, Stripe keys, JWTs, private
keys, client IDs, `Bearer` values, assigned passwords, long hex and base64 strings, and addresses. One hit: P36 had a
sample password in `username=...&password=...` (twice, a public demo credential from the REST example); replaced by
`<redacted>`. R1 and M1 only show prefixes (`pat...`, `AIza...`, `GOCSPX-`), not values; nothing else found.

## 8. Left for a human

- Borderline ratings that depend on how the scale is read: P23 and M1 (Critical because the scale names a security exposure; the real exposure is small or unknown), X2 (Critical only through the Bring-my-changes combination), M5 and M21 (High; Critical if "recoverable from Git or the original" does not count), R2 (Medium because of the docs), P35 and M14 (High as "doesn't build"; R22, R23 and P33 stay Medium).
- R7 and R8: the server's answer decides between Medium and Critical.
- The report header and "How to read an entry" table in `assemble.py`, and `BRIEF.md`, still describe the old scale (for example "High: a broken feature ... in a common flow"). Not edited, as asked.
- P2 is a Fixed entry that still carries two present hints (Library **Insert**, Back and Forward tooltips). Split it if the Fixed list should hold only fixed things.
- `assemble.py` changed while this pass ran (it now also writes `nowa/`); its area map already lists X2 and X3 and still lists R19, R28 and M13, which no longer exist (harmless).

## 9. How things were checked

Code reading and `grep` in `/home/user/nowa-master` (3.13.0) and `git show origin/dev:` for `library_panel.dart`;
`/home/user/nowa-build` (3.12.5) for the race. One stand-alone Dart script for X2 (scratchpad, not the app, no build).
For X3, pub.dev package metadata and the `purchases_flutter` 9.12.0 and 10.15.2 and `purchases_ui_flutter` 9.12.0 and
9.16.2 archives were fetched as data and only read. The app, the playground and any build were not run.
