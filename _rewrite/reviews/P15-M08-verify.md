# P15 M08 verify: REST API media

Verifier: phase 15 media verifier (did neither M07 nor M08). Read `P15-MEDIA-BRIEF.md`, `P15-MEDIA-VERIFY.md`,
`reviews/P15-M08-media.md`, `batch-M08.tsv`, and the batch's commit `492eb34` (already committed as WIP).

## The 2 ADDs

| id | file | 3.13 check | placement and words | privacy | result |
|---|---|---|---|---|---|
| m031 | `/img/api2/post/collectionsettings-dialog.png` (crop of `collectionsettings.png`) | Same as 3.13: `packages/data/lib/src/api/views/widgets/api_edit_collection_dialog.dart` has the collection name as title, "Edit collection details", **Name**, **Base URL** and **Auth Key** with info icons, "Enter auth key" hint, **Headers** with info icon, **Add header** (`headers_field.dart:33`), the KEY/VALUE table (`headers_field.dart:52`) and **Close** | index.md:54, right after the paragraph that ends with the `Accept: application/json` example and **Close**. The page has no other picture of this step. The alt text matches the image | Clean: crop drops the old top bar and avatar; TheCatAPI's public URL only | **Confirmed** |
| m027 | `/img/api2/post/model-select-data.jpg` (crop of `model.jpg`) | Same as 3.13: `generate_models_dialog.dart` (title **Generate Models**, steps **Content** / **Select Data** / **Generated Models**, **Back** / **Next**) and `selecting_data_section.dart` (**Select All**, Collapse All / Expand All icons, two panes) | index.md:140, indented under step 2 ("In **Select Data**, untick the fields you don't need"). The image shows exactly that (only `content` ticked), and the alt text matches | Clean | **Confirmed** |

## M08's open question m045 (Xano access token video)

Xano's current [Metadata API guide](https://docs.xano.com/xano-features/metadata-api) (fetched today) gives the same
flow as the video and import.md: profile icon → **Instances** → gear → **Metadata API** → **Manage Access Tokens** →
**New Access Token** → name → expiry (7 days by default) → scopes (C/R/U/D). The source `static/videos/api2/import/xano1.mp4`
shows, readable, the account holder's name (lower left, every frame), the instance host (in the instance card in every
frame, and in the Manage Instance panel from about 1 s to 4.3 s), and the new token (from 9.83 s).

I made a cut that shows none of them:

- Trimmed to 4.5 s → end (8.5 s long), so it starts on **Manage Access Tokens** with the **New Access Token** button.
  That drops every frame where the host appears in the right-hand panel (the panel's slide-in at 4.25 s still showed
  "x8ki-").
- Blurred the instance host in the card (`boxblur`, 290×44 at 432,234) for the whole clip.
- Blurred the name (260×60 at 15,705) until 11.72 s in source time. From 11.733 s the "Successfully created Access
  Token" toast moves up and covers the name, so the blur stops there and doesn't smear the toast.
- Blurred the token field (560×76 at 1286,212) from 9.82 s in source time. The token screen starts at 9.833 s, so the
  form's description text isn't smeared.
- Encoded as H.264 High, yuv420p, `+faststart`, no audio, 1920×852:
  `static/videos/docs/integrations/integrations-xano-access-token.mp4`.

I checked every frame at 1 fps plus each frame around the two switch points (output frames 158 to 161 and 215 to 218)
at full size. No name, host or token is readable. What's left on screen: "Free Instance", "United States", "Basic
Support", the token name `nowa`, and the toasts.

Added at `docs/integrations/rest-api/import.md`, right after "From Xano" step 6 and before the link to Xano's guide,
with this lead-in: "This short video shows steps 3 to 6 in Xano. It leaves every scope ticked, but read access (step 5)
is all Nowa needs:". The second sentence is there because the video keeps the **All Access** preset, while step 5 says
read access is enough.

## Rejected items re-checked

- **Third-party, OUTDATED:** m042 (Swagger Petstore page right-click, then Nowa v2.0.21): agree. The Petstore part only
  shows a browser context menu, and the page already gives the URL. The rest is the old editor.
- **PRIVACY, all confirmed:**
  - m019, m020, m021: OpenRouter key in the Authorization header. These are also the old editor.
  - m039: Postman workspace title with a person's name. It's also outdated: the export dialog has Collection v2/v2.1
    and **Export**, while the page, checked against Postman's guide, says **Export JSON**.
  - m040: macOS username and avatar.
  - m045: the source clip. A clean cut is now added, see above.
  - m046: full Xano token, plus the v2.0.21 editor.
- **Nowa OUTDATED, spot-checked 8 of 21:** m017, m022, m023, m024, m032, m036, m041, m044. All show the BETA chip and the
  Feedback/Upgrade top bar with the floating Outline, and m041 and m044 also have the Documentation link in Import From.
  Agree. Their dialogs (Create New Request, Generate Models, Create New Collection) are current, but the brief needs
  every frame to be valid.
- **COVERED:** none in this batch.

## Changes

- `+` `static/videos/docs/integrations/integrations-xano-access-token.mp4`: a new cut and blur of m045's source (above).
- `+` `docs/integrations/rest-api/import.md`: the Xano video and its one-line lead-in after "From Xano" step 6.

## Verdicts overturned

- m045: PRIVACY → ADD (cut and blurred).

## Open questions

1. The secrets M08 listed (the OpenRouter key in `api2/post/3.mp4`, `4.mp4`, `5.mp4`, the Xano token in `xano2.mp4`,
   and the name, host and partial token in `xano1.mp4`) are still in `static/` and served publicly. Same suggestion as
   M08: remove them and revoke the key and the token. My cut is a new file; the source `xano1.mp4` is unchanged.
2. M08's optional route to `docs/logic/models.md` is already on that page (models.md:57). I left it alone, since that
   page belongs to M11.

## Checks

`node scripts/check-videos.mjs`: "Validated 18 video embed(s) and 18 unique MP4 file(s)." `python3 -I
_rewrite/tools/site-checks.py`: "problems: 0".

## Counts

ADDs confirmed 2 (m031, m027) · removed 0 · added 1 (m045, cut and blurred).
