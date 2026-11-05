#!/usr/bin/env node
// Turns a take from record.cjs into a What's new video and its poster.
//
//   node encode.cjs <take dir> <out.mp4> [--cut 0-1.2,9.5-14] [--zoom zoom.json] [--poster 4.5]
//
// Output: H.264 High (level 4.1), 1920x1080, 30 fps, no audio, fast start, which is what
// `yarn check:videos` asks for. The poster is <out>.jpg, a frame at --poster
// seconds (of the finished video), used as the video's poster and the page's
// share image.
//
// --cut   drops stretches of the raw take, in seconds, like a wait for Nowa AI
//         or a fumbled move. Times are of the raw take.
// --zoom  a JSON list of keyframes, in seconds of the finished video, that
//         pans and zooms to where the action is. Between two keyframes the
//         view eases from one to the other, so repeat a view to hold it:
//           [ { "t": 0,   "view": "full" },
//             { "t": 1.5, "view": "full" },
//             { "t": 2.3, "view": [1180, 60, 740] },   // x, y, width in 1920x1080 px
//             { "t": 6,   "view": [1180, 60, 740] },
//             { "t": 6.8, "view": "full" } ]
//         The height follows from the width (16:9), and a view is kept inside the frame.
//
// Needs ffmpeg and ffprobe on the PATH.

const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const W = 1920;
const H = 1080;

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) args[argv[i].slice(2)] = argv[++i];
    else args._.push(argv[i]);
  }
  return args;
}

function clampView([x, y, w]) {
  w = Math.min(W, Math.max(160, w));
  const h = (w * H) / W;
  return [Math.min(W - w, Math.max(0, x)), Math.min(H - h, Math.max(0, y)), w];
}

// A piecewise expression of the input time `it` for one value of the view.
function keyframeExpr(keys, pick) {
  let expr = String(pick(keys[keys.length - 1].view));
  for (let i = keys.length - 2; i >= 0; i--) {
    const a = keys[i];
    const b = keys[i + 1];
    const va = pick(a.view);
    const vb = pick(b.view);
    const span = Math.max(0.001, b.t - a.t);
    // Smoothstep ease between the two views.
    const p = `(st(0,clip((it-${a.t})/${span},0,1))*ld(0)*(3-2*ld(0)))`;
    const seg = va === vb ? String(va) : `(${va}+(${vb - va})*${p})`;
    expr = `if(lt(it,${b.t}),${seg},${expr})`;
  }
  return `if(lt(it,${keys[0].t}),${pick(keys[0].view)},${expr})`;
}

function zoomFilter(file) {
  const keys = JSON.parse(fs.readFileSync(file, 'utf8'))
    .map((k) => ({ t: Number(k.t), view: clampView(k.view === 'full' ? [0, 0, W] : k.view) }))
    .sort((a, b) => a.t - b.t);
  if (!keys.length) return [];
  // zoompan rounds its position to whole input pixels, which jitters. Working
  // on a 2x copy halves that, and the result is scaled back down.
  const S = 2;
  const z = keyframeExpr(keys, (v) => +(W / v[2]).toFixed(5));
  const x = keyframeExpr(keys, (v) => +(v[0] * S).toFixed(2));
  const y = keyframeExpr(keys, (v) => +(v[1] * S).toFixed(2));
  return [
    `scale=${W * S}:${H * S}:flags=lanczos`,
    `zoompan=z='${z}':x='${x}':y='${y}':d=1:s=${W}x${H}:fps=30`,
  ];
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const [takeDir, out] = args._;
  if (!takeDir || !out) {
    console.error('Usage: node encode.cjs <take dir> <out.mp4> [--cut a-b,c-d] [--zoom zoom.json] [--poster seconds]');
    process.exit(1);
  }
  const list = path.join(takeDir, 'list.txt');
  if (!fs.existsSync(list)) throw new Error(`${list} not found. Record the take with record.cjs first.`);

  const filters = ['fps=30', `scale=${W}:${H}:flags=lanczos`];
  if (args.cut) {
    const ranges = args.cut.split(',').map((r) => r.split('-').map(Number));
    const keep = ranges.map(([a, b]) => `between(t,${a},${b})`).join('+');
    filters.push(`select='not(${keep})'`, 'setpts=N/30/TB');
  }
  if (args.zoom) filters.push(...zoomFilter(args.zoom));
  filters.push('format=yuv420p');

  fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
  execFileSync('ffmpeg', [
    '-v', 'error', '-y',
    '-f', 'concat', '-safe', '0', '-i', list,
    '-vf', filters.join(','),
    '-an',
    '-c:v', 'libx264', '-profile:v', 'high', '-level:v', '4.1', '-preset', 'slow', '-crf', '20',
    '-r', '30', '-movflags', '+faststart',
    out,
  ], { stdio: 'inherit' });

  const poster = out.replace(/\.mp4$/i, '.jpg');
  const at = Number(args.poster ?? 1);
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-ss', String(at), '-i', out, '-frames:v', '1', '-q:v', '3', poster], { stdio: 'inherit' });

  const probe = execFileSync('ffprobe', [
    '-v', 'error', '-select_streams', 'v:0',
    '-show_entries', 'stream=codec_name,profile,width,height,r_frame_rate:format=duration,size',
    '-of', 'json', out,
  ]).toString();
  const info = JSON.parse(probe);
  const s = info.streams[0];
  console.log(`${out}: ${s.codec_name} ${s.profile} ${s.width}x${s.height} ${s.r_frame_rate} fps, ` +
    `${(+info.format.duration).toFixed(1)} s, ${(info.format.size / 1e6).toFixed(1)} MB`);
  console.log(`${poster}: poster at ${at} s`);
}

main();
