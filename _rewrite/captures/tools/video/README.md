# Video scripts

Recording scripts from the phase 9 capture run, copied from that session's scratchpad so a later run can reuse them.
Method and gotchas: `../../README.md`, section "Videos: what worked" (record at device scale 1 and crop in CSS px,
pan with Space+drag, time-based pointer glide).

- `rec.mjs`: records a scenario module to a docs-ready MP4 (H.264, faststart, ≤30 fps) and checks it.
  `node rec.mjs <scenario.mjs> <out.mp4> [--crop x,y,w,h] ...` (see its header). Needs the local server
  (`../serve.mjs --port 8080`).
- `lib.mjs`, `common.mjs`: overlay highlight, smooth pointer moves, drags, slow typing, editor helpers.
- Scenarios (all recorded and embedded): `instant-play.mjs`, `layout.mjs`, `addw.mjs` (adding a widget with the
  picker; `add-widgets.mjs` is the first draft), `circuit.mjs`, `themes.mjs`.

Still to record: the AI building a screen. It needs sign-in (the playground opens the sign-in dialog on the first AI
send), so it stays in `../../to-capture.md`.
