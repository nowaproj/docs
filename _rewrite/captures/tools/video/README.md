# Video scripts

Recording scripts from the phase 9 capture run, copied from that session's scratchpad so a later run can reuse them.
Method and gotchas: `../../README.md`, section "Videos: what worked" (record at device scale 1 and crop in CSS px,
pan with Space+drag, time-based pointer glide).

- `rec.mjs`: records a scenario module to a docs-ready MP4 (H.264, faststart, ≤30 fps) and checks it.
  `node rec.mjs <scenario.mjs> <out.mp4> [--crop x,y,w,h] ...` (see its header). Needs the local server
  (`../serve.mjs --port 8080`).
- `lib.mjs`, `common.mjs`: overlay highlight, smooth pointer moves, drags, slow typing, editor helpers.
- Scenarios: `instant-play.mjs` and `layout.mjs` (both recorded and embedded), `add-widgets.mjs` (draft; the
  picker scenes are slow, so frames are choppy there).

Still to record (rows `requested` in `../../requests/`): design-add-widgets-video, logic-circuit-video,
design-themes-video. The AI building a screen needs sign-in (the playground opens the sign-in dialog on the first
AI send), so it stays in `../../to-capture.md`.
