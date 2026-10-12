#!/usr/bin/env node
// Records a scenario module to a docs-ready MP4.
//   node rec.mjs <scenario.mjs> <out.mp4> [--crop x,y,w,h] [--scale 2] [--vw 1440 --vh 900] [--fps 25] [--crf 20]
//                [--tail 1000] [--lead 0.3] [--keep-webm] [--dry]
// Scenario module: export async function setup({page, cap, lib}) (trimmed away, not shown) and
// export async function main({page, cap, lib}) (the recorded part).
import { chromium } from '/home/user/docs/_rewrite/captures/tools/node_modules/playwright/index.mjs';
import * as cap from '/home/user/docs/_rewrite/captures/tools/capture.mjs';
import * as lib from './lib.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const argv = process.argv.slice(2);
const positional = [];
const o = {};
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith('--')) {
    const k = argv[i].slice(2);
    if (argv[i + 1] !== undefined && !argv[i + 1].startsWith('--')) o[k] = argv[++i];
    else o[k] = true;
  } else positional.push(argv[i]);
}
const [scenarioFile, out] = positional;
const vw = Number(o.vw || 1440);
const vh = Number(o.vh || 900);
const scale = Number(o.scale || 1);
const fps = Math.min(30, Number(o.fps || 25));
const crf = Number(o.crf || 20);
const tail = Number(o.tail || 1000);
const lead = Number(o.lead || 0.4);
const [vsW, vsH] = o.vsize ? String(o.vsize).split('x').map(Number) : [vw, vh];
const k = vsW / vw;                                   // video pixels per CSS pixel
const crop = o.crop ? String(o.crop).split(',').map((n) => Math.round(Number(n) * k)) : null;
const dry = !!o.dry;

const ARGS = ['--enable-unsafe-swiftshader', '--lang=en-US', '--hide-scrollbars', '--mute-audio',
  '--disable-background-timer-throttling', '--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding'];


// Pixel-based loader (works at any device scale factor; capture.mjs's OCR wait needs 2x).
async function loadEditor(page, { path: route = '/playground' } = {}) {
  const base = cap.config.baseUrl;
  await page.goto(`${base}/manifest.json`);
  await page.evaluate(() => {
    for (const k of ['flutter.playground_bundle', 'flutter.listBoardViewStatus', 'flutter.listProjectsStatus']) localStorage.removeItem(k);
  });
  await page.goto(`${base}${route}`);
  await page.waitForSelector('#nowa-consent-banner', { timeout: 60000 }).catch(() => {});
  const rej = page.locator('#nowa-consent-banner button', { hasText: 'Reject' });
  if (await rej.count()) await rej.click();
  await page.waitForSelector('flutter-view', { state: 'attached', timeout: 120000 });
  await page.waitForFunction(() => !document.getElementById('splash'), null, { timeout: 120000 });
  const tmp = path.join(work, 'ready.png');
  let ready = false;
  for (let i = 0; i < 160 && !ready; i++) {
    await lib.sleep(500);
    await page.screenshot({ path: tmp, scale: 'css', clip: { x: 0, y: 0, width: vw, height: vh } });
    const r = spawnSync('convert', [tmp, '-format', '%[fx:p{700,400}.r*255] %[fx:p{700,20}.r*255] %[fx:p{20,200}.r*255]', 'info:'], { encoding: 'utf8' });
    const [board, top, side] = r.stdout.trim().split(/\s+/).map(Number);
    ready = Math.abs(board - 231) < 8 && top < 60 && side < 60;
  }
  if (!ready) throw new Error('Editor did not load (pixel check)');
  await cap.removeCookieBanner(page);
  await cap.settle(page, { timeout: 8000 });
}

const mod = await import(pathToFileURL(path.resolve(scenarioFile)).href);
const work = fs.mkdtempSync(path.join(process.env.CAPTURE_OUT || process.cwd(), 'video-'));
const browser = await chromium.launch({ headless: true, args: ARGS });
const context = await browser.newContext({
  viewport: { width: vw, height: vh },
  deviceScaleFactor: scale,
  locale: 'en-US',
  ...(dry ? {} : { recordVideo: { dir: work, size: { width: vsW, height: vsH } } }),
});
await context.route((url) => cap.config.blockedHosts.includes(url.hostname), (route) => route.abort('blockedbyclient'));
const createdAt = Date.now();
const page = await context.newPage();
page.on('requestfailed', (r) => { if (!cap.config.blockedHosts.includes(new URL(r.url()).hostname)) console.log('REQUEST FAILED', r.url().slice(0, 150), r.failure()?.errorText); });
page.on('response', (r) => { if (r.status() >= 400 && !/server\.nowa\.dev/.test(r.url())) console.log('HTTP', r.status(), r.url().slice(0, 150)); });
let webm;
let trimStart = 0;
let mainSeconds = 0;
try {
  // the icon font sometimes fails to apply on load (tofu boxes in the toolbar): compare with a reference and reload
  for (let attempt = 1; attempt <= 5; attempt++) {
    await loadEditor(page, mod.openOptions || {});
    await lib.sleep(1500);
    const cur = path.join(work, 'toolbar-now.png');
    await page.screenshot({ path: cur, scale: 'css', clip: { x: 826, y: 833, width: 170, height: 28 } });
    const cmp = spawnSync('compare', ['-metric', 'AE', '-fuzz', '12%', path.resolve('toolbar-ref.png'), cur, 'null:'], { encoding: 'utf8' });
    const diff = Number((cmp.stderr || '').trim().split(/\s+/)[0]);
    console.log(`icon check ${attempt}: ${diff} differing pixels`);
    if (diff < 150) break;
    if (attempt === 5) throw new Error('icons never rendered correctly');
  }
  await lib.installOverlay(page);
  if (mod.setup) await mod.setup({ page, cap: cap.helpers(page), lib });
  await cap.settle(page, { timeout: 5000 });
  const t0 = Date.now();
  await mod.main({ page, cap: cap.helpers(page), lib });
  await lib.sleep(tail);
  const tClose = Date.now();
  mainSeconds = (tClose - t0) / 1000;
  console.log(`scenario main took ${((Date.now() - t0) / 1000).toFixed(1)} s (incl. ${tail} ms tail)`);
  const video = page.video();
  await context.close();
  if (!dry) webm = await video.path();
} finally {
  try { await context.close(); } catch { /* already closed */ }
  await browser.close();
}
if (dry) { console.log('dry run done'); process.exit(0); }

// End-aligned trim: the main part is the last `mainSeconds` of the recording.
const probeDur = spawnSync('ffmpeg', ['-hide_banner', '-i', webm, '-f', 'null', '-'], { encoding: 'utf8' });
const times = [...(probeDur.stderr || '').matchAll(/time=(\d+):(\d+):(\d+\.\d+)/g)];
const last = times.length ? times[times.length - 1] : null;
const webmSeconds = last ? Number(last[1]) * 3600 + Number(last[2]) * 60 + Number(last[3]) : 0;
trimStart = Math.max(0, webmSeconds - mainSeconds - lead);
console.log(`webm ${webmSeconds.toFixed(1)} s, main ${mainSeconds.toFixed(1)} s, trim start ${trimStart.toFixed(2)} s`);
fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
const vf = [];
if (crop) vf.push(`crop=${crop[2]}:${crop[3]}:${crop[0]}:${crop[1]}`);
vf.push(`fps=${fps}`, "scale=w='min(1920,iw)':h='min(1080,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2");
const args = ['-y', '-hide_banner', '-loglevel', 'error', '-ss', trimStart.toFixed(2), '-i', webm, '-an', '-vf', vf.join(','),
  '-c:v', 'libx264', '-profile:v', 'high', '-level:v', '4.1', '-pix_fmt', 'yuv420p', '-preset', 'slow', '-crf', String(crf),
  '-movflags', '+faststart', out];
const r = spawnSync('ffmpeg', args, { encoding: 'utf8' });
if (r.status !== 0) throw new Error('ffmpeg failed: ' + r.stderr);
if (o['keep-webm']) fs.copyFileSync(webm, out.replace(/\.mp4$/i, '.webm'));
fs.rmSync(work, { recursive: true, force: true });
const problems = cap.checkVideo(out);
const probe = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'stream=codec_name,width,height,r_frame_rate:format=duration,size', '-of', 'default=nw=1', out], { encoding: 'utf8' });
console.log(path.resolve(out), problems.length ? 'PROBLEMS: ' + problems.join('; ') : 'OK (passes docs video rules)');
console.log(probe.stdout.trim().replace(/\n/g, ' | '));
