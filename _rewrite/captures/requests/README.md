# Capture requests

One file per docs section (`<section>.md`), written by the page writers. Capture agents work through them.

| id | page | state to set up | what the image must show | crop | type | status |
|---|---|---|---|---|---|---|
| design-screens-1 | docs/design/screens.md | playground starter open, Screens panel open | the + button and the New Screen dialog | left panel + dialog | png | requested |

- **id**: `<section>-<page-slug>-<n>`; the image is saved as `static/img/docs/<section>/<id>.png` (or `.mp4` in `static/videos/docs/<section>/`).
- **type**: `png` or `mp4` (≤20 s).
- **status**: `requested` → `captured` (embedded, placeholder replaced) / `needs-sign-in` / `not-possible: <why>`.
- Signed-in or AI-prompt captures that can't be done in this session go to `../to-capture.md`.
