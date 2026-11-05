// Records a smooth 1080p clip of the Nowa web app for a What's new page.
//
// It drives a real Chromium with Playwright, draws a visible pointer and click
// ripple on top of the app (headless browsers have no cursor), and saves every
// frame Chromium paints, with its timestamp. encode.cjs then turns the frames
// into a 30 fps MP4 that passes `yarn check:videos`.
//
// Use it from your own take script:
//
//   const rec = require('./record.cjs');
//   const { browser, page } = await rec.open();          // opens app.nowa.dev/playground
//   await rec.shot(page, '/tmp/plan.png');               // look, then pick coordinates
//   const take = await rec.start(page, '/tmp/take1');    // starts saving frames
//   await rec.glide(page, 1210, 15);                     // pointer moves in 0.6 s
//   await rec.click(page);                               // ripple + click
//   await rec.pause(page, 1500);                         // let the viewer read
//   await take.stop();                                   // writes frames + list.txt
//   await browser.close();
//
// Coordinates are CSS pixels of the 1280x720 viewport. Frames come out at
// 1920x1080 (device scale 1.5), so text stays sharp and big enough to read.

const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const VIEWPORT = { width: 1280, height: 720 };
const SCALE = 1.5;

// A dark arrow with a white edge, plus an orange ripple on press. Drawn in the
// page, above Flutter's canvas, and moved by the page's own pointer events, so
// it follows every page.mouse call.
const POINTER_SCRIPT = `
(() => {
  const install = () => {
    if (document.getElementById('__rec_pointer')) return;
    const style = document.createElement('style');
    style.textContent = \`
      #__rec_pointer { position: fixed; left: 0; top: 0; width: 22px; height: 30px; z-index: 2147483647;
        pointer-events: none; transform: translate(-100px, -100px); will-change: transform; }
      .__rec_ripple { position: fixed; z-index: 2147483646; pointer-events: none; width: 36px; height: 36px;
        margin: -18px 0 0 -18px; border-radius: 50%; border: 3px solid rgba(255, 167, 48, 0.95);
        background: rgba(255, 167, 48, 0.25); animation: __rec_ripple 450ms ease-out forwards; }
      @keyframes __rec_ripple { from { transform: scale(0.3); opacity: 1; } to { transform: scale(1.3); opacity: 0; } }
    \`;
    document.head.appendChild(style);
    const pointer = document.createElement('div');
    pointer.id = '__rec_pointer';
    pointer.innerHTML = '<svg width="22" height="30" viewBox="0 0 22 30" xmlns="http://www.w3.org/2000/svg">'
      + '<path d="M2 2 L2 24 L8 18.5 L12.5 28 L16.5 26.2 L12.2 17 L20 17 Z" fill="#111" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></svg>';
    document.body.appendChild(pointer);
    const move = (e) => { pointer.style.transform = 'translate(' + e.clientX + 'px,' + e.clientY + 'px)'; };
    window.addEventListener('pointermove', move, true);
    window.addEventListener('pointerdown', (e) => {
      move(e);
      const ripple = document.createElement('div');
      ripple.className = '__rec_ripple';
      ripple.style.left = e.clientX + 'px';
      ripple.style.top = e.clientY + 'px';
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 500);
    }, true);
  };
  if (document.body) install(); else document.addEventListener('DOMContentLoaded', install);
})();
`;

/**
 * Opens the Nowa web app. The playground needs no account. For a feature that
 * needs one, pass storageState saved from a signed-in browser (see
 * references/visuals.md), and for a release that isn't live yet, the URL of a
 * local web build.
 */
async function open({ url = 'https://app.nowa.dev/playground', headless = true, storageState, waitMs = 20000 } = {}) {
  const browser = await chromium.launch({
    headless,
    args: [
      // Flutter draws with WebGL, which headless Chromium only has through SwiftShader.
      '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader',
      // A real 1.5x screen, not an emulated one: Chromium only sends 1920x1080
      // frames to start() when the window itself is high resolution.
      `--force-device-scale-factor=${SCALE}`, `--window-size=${VIEWPORT.width},${VIEWPORT.height}`,
    ],
  });
  const context = await browser.newContext({ viewport: null, storageState });
  // Answer the cookie banner up front so it never shows in a take, on
  // app.nowa.dev and on a local build alike.
  const consent = { name: 'nowa_consent', value: 'v1.denied' };
  await context.addCookies([
    { ...consent, domain: '.nowa.dev', path: '/', secure: true, sameSite: 'Lax' },
    { ...consent, url: new URL(url).origin },
  ]);
  await context.addInitScript(POINTER_SCRIPT);
  const page = await context.newPage();
  await page.goto(url, { waitUntil: 'load', timeout: 120000 });
  // Flutter keeps loading after the load event. Wait until it has drawn.
  await page.waitForTimeout(waitMs);
  await page.mouse.move(VIEWPORT.width / 2, VIEWPORT.height / 2);
  return { browser, context, page };
}

/**
 * Saves a 1920x1080 screenshot, to plan the next moves or to annotate for the
 * page. Divide what you read off it by 1.5 to get the CSS pixels glide() and
 * click() take. The recording pointer is hidden unless { pointer: true }.
 */
async function shot(page, file, { pointer = false } = {}) {
  const toggle = (show) =>
    page.evaluate((show) => {
      const el = document.getElementById('__rec_pointer');
      if (el) el.style.visibility = show ? 'visible' : 'hidden';
    }, show);
  if (!pointer) await toggle(false);
  await page.screenshot({ path: file });
  if (!pointer) await toggle(true);
  return file;
}

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Moves the pointer to (x, y) along an eased path, like a person would. */
async function glide(page, x, y, ms = 600) {
  const from = (page.__recPos ||= { x: VIEWPORT.width / 2, y: VIEWPORT.height / 2 });
  const steps = Math.max(2, Math.round(ms / 16));
  for (let i = 1; i <= steps; i++) {
    const t = easeInOut(i / steps);
    await page.mouse.move(from.x + (x - from.x) * t, from.y + (y - from.y) * t);
    await page.waitForTimeout(ms / steps);
  }
  page.__recPos = { x, y };
}

/** Clicks where the pointer is, or glides to (x, y) first. */
async function click(page, x, y, { double = false } = {}) {
  if (x !== undefined) await glide(page, x, y);
  await page.mouse.down();
  await page.waitForTimeout(90);
  await page.mouse.up();
  if (double) {
    await page.waitForTimeout(80);
    await page.mouse.down();
    await page.waitForTimeout(90);
    await page.mouse.up();
  }
  await page.waitForTimeout(250);
}

/** Types like a person, one key at a time. */
async function type(page, text, delay = 70) {
  await page.keyboard.type(text, { delay });
}

const pause = (page, ms) => page.waitForTimeout(ms);

/**
 * Starts saving every frame Chromium paints into `dir`. Returns { stop }.
 * stop() writes list.txt, an ffmpeg concat list that keeps each frame on
 * screen for as long as it really was.
 */
async function start(page, dir) {
  fs.mkdirSync(dir, { recursive: true });
  const cdp = await page.context().newCDPSession(page);
  const frames = [];
  let writing = Promise.resolve();
  cdp.on('Page.screencastFrame', ({ data, metadata, sessionId }) => {
    const file = path.join(dir, `f${String(frames.length).padStart(6, '0')}.jpg`);
    frames.push({ file, t: metadata.timestamp });
    writing = writing.then(() => fs.promises.writeFile(file, Buffer.from(data, 'base64')));
    cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {});
  });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 95, everyNthFrame: 1 });
  const startedAt = Date.now() / 1000;
  return {
    async stop() {
      const stoppedAt = Date.now() / 1000;
      await cdp.send('Page.stopScreencast');
      await writing;
      if (!frames.length) throw new Error('No frames were captured.');
      const lines = ['ffconcat version 1.0'];
      frames.forEach((f, i) => {
        const next = i + 1 < frames.length ? frames[i + 1].t : stoppedAt;
        lines.push(`file '${path.basename(f.file)}'`, `duration ${Math.max(0.001, next - f.t).toFixed(4)}`);
      });
      // The concat demuxer drops the last duration unless the file is listed again.
      lines.push(`file '${path.basename(frames[frames.length - 1].file)}'`);
      fs.writeFileSync(path.join(dir, 'list.txt'), lines.join('\n') + '\n');
      const seconds = stoppedAt - frames[0].t;
      const info = { frames: frames.length, seconds: +seconds.toFixed(2), fps: +(frames.length / seconds).toFixed(1), startedAt };
      fs.writeFileSync(path.join(dir, 'take.json'), JSON.stringify(info, null, 2));
      return info;
    },
  };
}

module.exports = { open, shot, glide, click, type, pause, start, VIEWPORT, SCALE };
