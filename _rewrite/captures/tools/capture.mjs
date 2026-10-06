#!/usr/bin/env node
/**
 * capture.mjs: drive the Nowa web editor (Flutter web, CanvasKit) with Playwright
 * to take docs screenshots and videos.
 *
 * Library:  import * as cap from './capture.mjs'      (see README.md for recipes)
 * CLI:      node capture.mjs help
 *
 * How it finds things, in order:
 *   1. Flutter semantics (accessibility) tree: <flt-semantics> DOM nodes with
 *      labels, roles and boxes. Turned on by clicking <flt-semantics-placeholder>.
 *      In design mode the board blocks the semantics of everything painted
 *      before it (top bar, left panel), see ui-map.md.
 *   2. OCR of a screenshot (tesseract) for visible text the tree lacks.
 *   3. Fixed coordinates at 1440x900 (UI map below / ui-map.md).
 *
 * Safety: nothing here signs in, sends AI prompts, saves to an account, deploys
 * or buys. Do not click "Save", the AI suggestion chips, or the AI send button.
 */
import { chromium } from 'playwright';
import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const TOOLS_DIR = path.dirname(fileURLToPath(import.meta.url));

export const config = {
  baseUrl: (process.env.NOWA_URL || 'http://localhost:8080').replace(/\/$/, ''),
  outDir: process.env.CAPTURE_OUT || path.join(TOOLS_DIR, 'out'),
  width: Number(process.env.CAPTURE_WIDTH || 1440),
  height: Number(process.env.CAPTURE_HEIGHT || 900),
  scale: Number(process.env.CAPTURE_SCALE || 2),
  cdpPort: Number(process.env.CAPTURE_CDP_PORT || 9333),
  locale: 'en-US',
  // Analytics/ads only. Aborted so capture sessions send no tracking events.
  blockedHosts: [
    'k.nowa.dev',
    'us.i.posthog.com',
    'us-assets.i.posthog.com',
    'us.posthog.com',
    'www.googletagmanager.com',
    'www.google-analytics.com',
    'googleads.g.doubleclick.net',
    'appleid.cdn-apple.com',
  ],
};

const SESSION_FILE = () => path.join(config.outDir, 'session.json');

const CHROMIUM_ARGS = [
  '--enable-unsafe-swiftshader', // WebGL in headless (CanvasKit needs it)
  '--lang=en-US',
  '--hide-scrollbars',
  '--mute-audio',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-renderer-backgrounding',
];

/* ------------------------------------------------------------------------ */
/* UI map (1440x900 CSS px, design mode, playground). See ui-map.md.        */
/* ------------------------------------------------------------------------ */

/** Left sidebar icons, top to bottom, for the playground (no Git icon). */
export const SIDEBAR = [
  { name: 'Assistant', title: 'AI Assistant', x: 20, y: 67 },
  { name: 'Widgets', title: 'Widgets', x: 20, y: 107 },
  { name: 'Themes', title: 'Themes', x: 20, y: 147 },
  { name: 'Search', title: 'Search', x: 20, y: 187 },
  { name: 'Files', title: 'Files', x: 20, y: 227 },
  { name: 'Outline', title: 'Outline', x: 20, y: 267 },
  { name: 'Api', title: 'API', x: 20, y: 307 },
  { name: 'Supabase', title: 'Supabase', x: 20, y: 347 },
];

/** Other fixed points and regions (CSS px at 1440x900). */
export const UI = {
  sidebar: { x: 0, y: 42, w: 40, h: 836 },
  leftPanel: { x: 40, y: 42, w: 343, h: 836 },
  leftPanelHeader: { x: 40, y: 42, w: 343, h: 42 },
  topBar: { x: 0, y: 0, w: 1440, h: 42 },
  workspace: { x: 383, y: 42, w: 1057, h: 836 },
  statusBar: { x: 0, y: 878, w: 1440, h: 22 },
  routerIcon: { x: 20, y: 405 },
  fullscreenIcon: { x: 20, y: 813 },
  shortcutsIcon: { x: 20, y: 853 },
  logo: { x: 20, y: 20 },
  sandboxChip: { x: 100, y: 20 },
  boardPicker: { x: 403, y: 20 },
  codeToggle: { x: 1313, y: 20 },
  settings: { x: 1351, y: 20 },
  save: { x: 1405, y: 20 }, // never click: opens the sign-in / save-to-account flow
};

/* ------------------------------------------------------------------------ */
/* Browser                                                                   */
/* ------------------------------------------------------------------------ */

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** {x,y,w,h} (or {x,y,width,height}) -> Playwright clip, clamped to the viewport. */
async function pwClip(page, c) {
  if (!c) return undefined;
  const [vw, vh] = await page.evaluate(() => [window.innerWidth, window.innerHeight]);
  const x = Math.max(0, c.x);
  const y = Math.max(0, c.y);
  const x2 = Math.min(vw, c.x + (c.w ?? c.width));
  const y2 = Math.min(vh, c.y + (c.h ?? c.height));
  if (x2 <= x || y2 <= y) throw new Error(`Clip ${JSON.stringify(c)} is outside the ${vw}x${vh} viewport`);
  return { x, y, width: x2 - x, height: y2 - y };
}

/** Adds the consent cookie, analytics blocking and a CanvasKit CDN fallback. */
export async function prepareContext(context, { baseUrl = config.baseUrl } = {}) {
  const { hostname } = new URL(baseUrl);
  // Same as clicking "Reject" on the cookie banner (web/js/consent.js), so the banner never shows.
  await context.addCookies([{ name: 'nowa_consent', value: 'v1.denied', domain: hostname, path: '/' }]);
  await context.route(
    (url) => config.blockedHosts.includes(url.hostname),
    (route) => route.abort('blockedbyclient'),
  );
  // Fallback for servers that serve flutter_bootstrap.js unpatched (e.g. `npx serve`):
  // answer CanvasKit CDN requests with the build's own canvaskit/ files.
  await context.route(/^https:\/\/www\.gstatic\.com\/flutter-canvaskit\/[0-9a-f]+\/(.*)$/, async (route) => {
    const rest = route.request().url().replace(/^https:\/\/www\.gstatic\.com\/flutter-canvaskit\/[0-9a-f]+\//, '');
    try {
      const response = await route.fetch({ url: `${baseUrl}/canvaskit/${rest}` });
      await route.fulfill({ response });
    } catch {
      await route.abort();
    }
  });
}

/**
 * Launches a fresh Chromium managed by Playwright.
 * @param {{headless?: boolean, width?: number, height?: number, scale?: number,
 *          video?: false|{dir: string}, baseUrl?: string}} opts
 */
export async function launch(opts = {}) {
  const { headless = true, width = config.width, height = config.height, scale = config.scale, video = false } = opts;
  const browser = await chromium.launch({ headless, args: CHROMIUM_ARGS });
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: scale,
    locale: config.locale, // without it the app crashes at start: "Incorrect locale information provided"
    ...(video ? { recordVideo: { dir: ensureDir(video.dir), size: { width, height } } } : {}),
  });
  await prepareContext(context, opts);
  const page = await context.newPage();
  page.__createdAt = Date.now();
  return { browser, context, page, close: async () => { await context.close(); await browser.close(); } };
}

/* ------------------------------------------------------------------------ */
/* Persistent session (one browser kept open between CLI calls, over CDP).   */
/* ------------------------------------------------------------------------ */

function readSession() {
  try {
    return JSON.parse(fs.readFileSync(SESSION_FILE(), 'utf8'));
  } catch {
    return null;
  }
}

function alive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

/**
 * The headless-shell build Playwright itself uses for headless runs. Its window
 * size is exactly the viewport (new-headless Chrome adds ~139 px of window UI).
 */
function headlessShellPath() {
  const full = chromium.executablePath(); // <browsers>/chromium-<rev>/chrome-linux/chrome
  const m = full.match(/^(.*)[\\/]chromium-(\d+)[\\/]/);
  if (!m) return null;
  const candidate = path.join(m[1], `chromium_headless_shell-${m[2]}`, 'chrome-linux', 'headless_shell');
  return fs.existsSync(candidate) ? candidate : null;
}

/** Resizes the session window so the page viewport is exactly width x height. */
async function fixViewport(page, width, height) {
  const [w, h] = await page.evaluate(() => [window.innerWidth, window.innerHeight]);
  if (w === width && h === height) return;
  const cdp = await page.context().newCDPSession(page);
  const { windowId, bounds } = await cdp.send('Browser.getWindowForTarget');
  await cdp.send('Browser.setWindowBounds', { windowId, bounds: { width: bounds.width + (width - w), height: bounds.height + (height - h) } });
  await cdp.detach();
}

/** Starts a detached headless Chromium with a CDP port. Returns session info. */
export async function startSession({ headless = true, port = config.cdpPort } = {}) {
  const existing = readSession();
  if (existing && alive(existing.pid)) return existing;
  ensureDir(config.outDir);
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'nowa-capture-profile-'));
  const shell = headless ? headlessShellPath() : null;
  const executable = shell || chromium.executablePath();
  const args = [
    ...(headless && !shell ? ['--headless=new'] : []),
    `--remote-debugging-port=${port}`,
    '--remote-debugging-address=127.0.0.1',
    `--user-data-dir=${profile}`,
    `--window-size=${config.width},${config.height}`,
    `--force-device-scale-factor=${config.scale}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--no-sandbox',
    `--accept-lang=${config.locale}`,
    ...CHROMIUM_ARGS,
    'about:blank',
  ];
  const child = spawn(executable, args, {
    detached: true,
    stdio: 'ignore',
    env: { ...process.env, LANG: 'en_US.UTF-8', LANGUAGE: 'en_US' },
  });
  child.unref();
  const info = { pid: child.pid, port, profile, executable, baseUrl: config.baseUrl, startedAt: new Date().toISOString() };
  let up = false;
  for (let i = 0; i < 100 && !up; i++) {
    try {
      up = (await fetch(`http://127.0.0.1:${port}/json/version`)).ok;
    } catch {
      // not up yet
    }
    if (!up) await sleep(200);
  }
  if (!up) throw new Error(`Chromium did not open CDP port ${port}`);
  fs.writeFileSync(SESSION_FILE(), JSON.stringify(info, null, 2));
  const browser = await chromium.connectOverCDP(`http://127.0.0.1:${port}`);
  const context = browser.contexts()[0];
  const page = context.pages()[0] || (await context.newPage());
  await fixViewport(page, config.width, config.height);
  return info;
}

/** Attaches to the session browser. Call session.detach() when done (keeps the browser running). */
export async function attachSession() {
  const info = readSession();
  if (!info || !alive(info.pid)) throw new Error('No capture session running. Start one with: node capture.mjs start');
  const browser = await chromium.connectOverCDP(`http://127.0.0.1:${info.port}`);
  const context = browser.contexts()[0];
  const pages = context.pages();
  const page = pages.find((p) => p.url().startsWith(info.baseUrl)) || pages[0] || (await context.newPage());
  await prepareContext(context, { baseUrl: info.baseUrl });
  // Leave the CDP connection without closing pages: the process exit drops the socket.
  const detach = async () => {
    try {
      await context.unrouteAll({ behavior: 'ignoreErrors' });
    } catch {
      // ignore
    }
  };
  return { browser, context, page, info, detach };
}

export async function stopSession() {
  const info = readSession();
  if (!info) return false;
  if (alive(info.pid)) {
    try {
      process.kill(-info.pid, 'SIGTERM');
    } catch {
      try {
        process.kill(info.pid, 'SIGTERM');
      } catch {
        // already gone
      }
    }
  }
  try {
    fs.rmSync(info.profile, { recursive: true, force: true });
  } catch {
    // ignore
  }
  fs.rmSync(SESSION_FILE(), { force: true });
  return true;
}

/* ------------------------------------------------------------------------ */
/* Opening the editor                                                        */
/* ------------------------------------------------------------------------ */

/**
 * Opens a Nowa route (default /playground) and waits until the editor is usable.
 * @param {import('playwright').Page} page
 * @param {{path?: string, starter?: 'starter'|'simple'|'empty', fresh?: boolean, semantics?: boolean, timeout?: number}} opts
 *   starter: which playground app to seed ("Starter app", "Simple app", "Empty app").
 *   fresh (default true): drop any playground stored in this browser first.
 *   semantics (default false): also turn on the semantics tree. Keep it off when
 *   you need to type into the left panel, the AI chat or a palette: with semantics
 *   on, Flutter edits text through the field's semantics node, and those fields
 *   have none (blocked by the board), so keystrokes are lost until a reload.
 */
export async function openEditor(page, opts = {}) {
  const { path: route = '/playground', starter, fresh = true, timeout = 120000, baseUrl = config.baseUrl, semantics: withSemantics = false } = opts;
  if (starter || fresh) {
    // localStorage is per origin: visit a static file of the same origin first.
    await page.goto(`${baseUrl}/manifest.json`);
    await page.evaluate(
      ({ starter, fresh }) => {
        if (fresh) localStorage.removeItem('flutter.playground_bundle');
        if (starter) localStorage.setItem('flutter.playground_starter', JSON.stringify(starter));
      },
      { starter, fresh },
    );
  }
  await page.goto(`${baseUrl}${route.startsWith('/') ? route : `/${route}`}`);
  await waitForEditor(page, { timeout, semantics: withSemantics });
  return page;
}

/**
 * Turns on Flutter's semantics tree (idempotent) and makes it read-only for the
 * pointer. Returns the node count.
 *
 * Read-only matters: with semantics on, a full-screen tappable group node covers
 * every region that has no node of its own (top bar, left panel, canvas), and the
 * engine turns clicks on tappable nodes into a semantics "tap" on that node, so
 * the real button under the pointer never gets the click. With pointer-events off
 * on the semantics DOM, mouse events reach Flutter exactly as without semantics.
 */
export async function enableSemantics(page, { timeout = 30000 } = {}) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    const count = await page.evaluate(() => {
      if (!document.getElementById('capture-semantics-readonly')) {
        const style = document.createElement('style');
        style.id = 'capture-semantics-readonly';
        style.textContent = 'flt-semantics-host, flt-semantics-host * { pointer-events: none !important; }';
        document.head.appendChild(style);
      }
      const nodes = document.querySelectorAll('flt-semantics').length;
      if (nodes > 0) return nodes;
      const placeholder = document.querySelector('flt-semantics-placeholder');
      if (placeholder) placeholder.click(); // the engine enables semantics on this click
      return 0;
    });
    if (count > 0) return count;
    await sleep(300);
  }
  throw new Error('Semantics did not turn on (no <flt-semantics> nodes).');
}

/** True when the semantics tree is on in this page. */
export async function semanticsEnabled(page) {
  return page.evaluate(() => document.querySelectorAll('flt-semantics').length > 0);
}

/**
 * Waits for the editor: Flutter view up, splash gone, then the top bar's
 * "Save" (playground/guest) or "Run"/"Deploy" (own projects) visible (OCR), or,
 * with semantics on, the board toolbar ("Select tool V") or the code-mode tab
 * bar ("New Tab"). Then waits for the screen to stop changing.
 */
export async function waitForEditor(page, { timeout = 120000, semantics: withSemantics } = {}) {
  const deadline = Date.now() + timeout;
  const left = () => Math.max(1000, deadline - Date.now());
  await page.waitForSelector('flutter-view', { state: 'attached', timeout });
  await page.waitForFunction(() => !document.getElementById('splash'), null, { timeout: left() });
  if (withSemantics === undefined) withSemantics = await semanticsEnabled(page);
  if (withSemantics) await enableSemantics(page, { timeout: left() });
  let ready = false;
  while (!ready && Date.now() < deadline) {
    if (withSemantics) {
      ready = (await semantics(page)).some((n) => /^Select tool\b/.test(n.label) || /^New Tab\b/.test(n.label));
    } else {
      const { lines } = await ocr(page, { clip: { x: 1100, y: 0, w: 340, h: 42 } }).catch(() => ({ lines: [] }));
      ready = lines.some((l) => /\b(Save|Run|Deploy)\b/.test(l.text));
    }
    if (!ready) await sleep(500);
  }
  if (!ready) throw new Error('Editor did not finish loading in time.');
  await removeCookieBanner(page);
  await settle(page, { timeout: 8000 });
  return true;
}

export async function removeCookieBanner(page) {
  return page.evaluate(() => {
    const el = document.getElementById('nowa-consent-banner');
    if (el) el.remove();
    return !!el;
  });
}

/** Labels of buttons that only dismiss something (never "Save", never AI chips). */
export const DISMISS_LABELS = ['Close', 'Skip', 'Skip tour', 'Not now', 'Maybe later', 'Got it', 'Dismiss', 'No thanks', 'Cancel'];

/**
 * Closes the cookie banner and known dismiss-only dialogs. Returns what it closed.
 * Uses semantics when on, otherwise OCR (whole-line matches only).
 */
export async function dismissDialogs(page, { labels = DISMISS_LABELS, escape = false } = {}) {
  const closed = [];
  if (await removeCookieBanner(page)) closed.push('cookie banner');
  const useSemantics = await semanticsEnabled(page);
  for (let round = 0; round < 3; round++) {
    let hit = null;
    if (useSemantics) {
      const n = (await semantics(page)).find((node) => node.tappable && labels.includes(node.label));
      if (n) hit = { x: n.cx, y: n.cy, label: n.label };
    } else {
      const { lines } = await ocr(page);
      const l = lines.find((line) => labels.includes(line.text.trim()) && line.conf >= 70);
      if (l) hit = { x: Math.round(l.x + l.w / 2), y: Math.round(l.y + l.h / 2), label: l.text };
    }
    if (!hit) break;
    await page.mouse.click(hit.x, hit.y);
    closed.push(hit.label);
    await sleep(600);
  }
  if (escape) {
    await page.keyboard.press('Escape');
    closed.push('Escape');
  }
  return closed;
}

/* ------------------------------------------------------------------------ */
/* Semantics                                                                 */
/* ------------------------------------------------------------------------ */

/**
 * Lists semantics nodes that are on screen: {id, label, role, tappable, x, y, w, h, cx, cy, ...}.
 * Coordinates are CSS px. Text fields appear as role "textbox".
 * @param {{all?: boolean}} opts all: also unlabeled, role-less containers.
 */
export async function semantics(page, { all = false } = {}) {
  return page.evaluate((all) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const ownText = (el) =>
      [...el.childNodes]
        .filter((c) => c.nodeType === 3 || (c.nodeType === 1 && c.tagName === 'SPAN'))
        .map((c) => c.textContent)
        .join(' ');
    const out = [];
    for (const el of document.querySelectorAll('flt-semantics, flutter-view input, flutter-view textarea')) {
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1 || r.right <= 0 || r.bottom <= 0 || r.left >= vw || r.top >= vh) continue;
      const isField = el.tagName === 'INPUT' || el.tagName === 'TEXTAREA';
      const label = (el.getAttribute('aria-label') || (isField ? el.placeholder || '' : ownText(el)))
        .replace(/\s+/g, ' ')
        .trim();
      const role = el.getAttribute('role') || (isField ? 'textbox' : '');
      const tappable = el.hasAttribute('flt-tappable') || role === 'button' || role === 'link' || role === 'switch' || role === 'checkbox' || role === 'tab';
      if (!all && !label && !role && !isField) continue;
      const node = {
        id: el.id || null,
        label,
        role,
        tappable,
        x: Math.round(r.left),
        y: Math.round(r.top),
        w: Math.round(r.width),
        h: Math.round(r.height),
        cx: Math.round(r.left + r.width / 2),
        cy: Math.round(r.top + r.height / 2),
      };
      if (isField) node.value = el.value;
      for (const a of ['aria-checked', 'aria-selected', 'aria-expanded', 'aria-disabled', 'aria-current']) {
        if (el.hasAttribute(a)) node[a.slice(5)] = el.getAttribute(a);
      }
      out.push(node);
    }
    return out;
  }, all);
}

function normalize(s) {
  return String(s || '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/**
 * Finds semantics nodes by label. Exact match first, then case-insensitive,
 * then "contains" (unless exact). Tappable nodes are listed first.
 */
export async function find(page, query, { exact = false, role, tappable } = {}) {
  const nodes = (await semantics(page)).filter((n) => n.label && (!role || n.role === role) && (tappable === undefined || n.tappable === tappable));
  const q = normalize(query);
  let hits = nodes.filter((n) => n.label === query);
  if (!hits.length) hits = nodes.filter((n) => normalize(n.label) === q);
  if (!hits.length && !exact) hits = nodes.filter((n) => normalize(n.label).includes(q));
  return hits.sort((a, b) => Number(b.tappable) - Number(a.tappable));
}

/* ------------------------------------------------------------------------ */
/* OCR (tesseract) for text that is not in the semantics tree                */
/* ------------------------------------------------------------------------ */

let tesseractChecked = null;
function hasTesseract() {
  if (tesseractChecked === null) tesseractChecked = spawnSync('tesseract', ['--version']).status === 0;
  return tesseractChecked;
}

/**
 * OCR of the page (or a clip). Returns words and visual lines with CSS-px boxes:
 * {words: [{text, conf, x, y, w, h}], lines: [{text, conf, x, y, w, h, words}]}.
 * opts: clip {x,y,w,h}; invert ('auto' = negate when the region is mostly dark, or true/false);
 * upscale (default 1; 1.5 helps small text such as the top bar chips); minConf.
 */
export async function ocr(page, { clip, invert = 'auto', threshold = 'auto', upscale = 1, minConf = 30 } = {}) {
  if (!hasTesseract()) throw new Error('tesseract not installed: run tools/setup.sh');
  const dpr = await page.evaluate(() => window.devicePixelRatio || 1);
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'nowa-ocr-'));
  const BORDER = 24; // device px of margin: tesseract misses text that touches the edge
  try {
    const png = path.join(dir, 'in.png');
    const region = await pwClip(page, clip);
    await page.screenshot({ path: png, clip: region, scale: 'device' });
    if (invert === 'auto') {
      // Light text on dark UI reads best negated; dark text on light panels (palettes, canvas) as is.
      const r = spawnSync('convert', [png, '-colorspace', 'Gray', '-format', '%[fx:mean]', 'info:'], { encoding: 'utf8' });
      invert = r.status === 0 ? Number(r.stdout) < 0.5 : true;
    }
    // Light regions: a hard threshold keeps colored text (purple search highlights, orange links)
    // that tesseract's own binarization drops. Dark regions read best negated without one.
    if (threshold === 'auto') threshold = invert ? null : 85;
    const prepared = path.join(dir, 'prepared.png');
    const ops = [png, '-colorspace', 'Gray'];
    if (invert) ops.push('-negate'); // dark UI -> dark text on light background
    if (threshold) ops.push('-threshold', `${threshold}%`);
    if (upscale !== 1) ops.push('-resize', `${Math.round(upscale * 100)}%`);
    ops.push('-bordercolor', invert ? 'white' : 'black', '-border', String(BORDER), prepared);
    const input = spawnSync('convert', ops).status === 0 ? prepared : png;
    const border = input === prepared ? BORDER : 0;
    const factor = input === prepared ? upscale : 1;
    const r = spawnSync('tesseract', [input, 'stdout', '--psm', '11', '-l', 'eng', 'tsv'], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
    if (r.status !== 0) throw new Error(`tesseract failed: ${r.stderr}`);
    const ox = region ? region.x : 0;
    const oy = region ? region.y : 0;
    const toCss = (v, o) => o + (Number(v) - border) / factor / dpr;
    const words = r.stdout
      .split('\n')
      .slice(1)
      .map((line) => line.split('\t'))
      .filter((c) => c.length >= 12 && c[11].trim() && Number(c[10]) >= minConf)
      .map((c) => ({
        text: c[11].trim(),
        conf: Number(c[10]),
        x: toCss(c[6], ox),
        y: toCss(c[7], oy),
        w: Number(c[8]) / factor / dpr,
        h: Number(c[9]) / factor / dpr,
      }));
    // Group words into visual lines by geometry (independent of tesseract's layout analysis).
    const sorted = [...words].sort((a, b) => a.y + a.h / 2 - (b.y + b.h / 2) || a.x - b.x);
    const lines = [];
    for (const w of sorted) {
      const cy = w.y + w.h / 2;
      const line = lines.find((l) => {
        const last = l.words[l.words.length - 1];
        const lcy = l.y + l.h / 2;
        const gap = w.x - (last.x + last.w);
        return Math.abs(cy - lcy) < Math.max(l.h, w.h) * 0.5 && gap > -2 && gap < Math.max(w.h, last.h) * 1.2;
      });
      if (line) {
        line.words.push(w);
        const x2 = Math.max(line.x + line.w, w.x + w.w);
        const y2 = Math.max(line.y + line.h, w.y + w.h);
        line.x = Math.min(line.x, w.x);
        line.y = Math.min(line.y, w.y);
        line.w = x2 - line.x;
        line.h = y2 - line.y;
      } else {
        lines.push({ x: w.x, y: w.y, w: w.w, h: w.h, words: [w] });
      }
    }
    for (const l of lines) {
      l.text = l.words.map((w) => w.text).join(' ');
      l.conf = Math.round(l.words.reduce((sum, w) => sum + w.conf, 0) / l.words.length);
    }
    const round = (o) => ({ ...o, x: Math.round(o.x), y: Math.round(o.y), w: Math.round(o.w), h: Math.round(o.h) });
    return { words: words.map(round), lines: lines.map((l) => ({ ...round(l), words: l.words.map(round) })) };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// OCR look-alikes folded together when matching: I/l/1/| and O/0.
const fold = (t) => t.replace(/[il1|!]/g, 'i').replace(/0/g, 'o');

function matchText(lines, query, exact) {
  const clean = (t) => fold(normalize(t).replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ''));
  const q = normalize(query).split(' ').map(clean).filter(Boolean);
  const squash = (t) => fold(normalize(t).replace(/[^\p{L}\p{N}]+/gu, ''));
  const qs = squash(query);
  const hits = [];
  // rank: 3 = the whole line is the query, 2 = whole words inside a longer line,
  // 1 = partial words, 0 = only matches with spaces removed.
  const box = (ws, rank) => {
    const x = Math.min(...ws.map((w) => w.x));
    const y = Math.min(...ws.map((w) => w.y));
    const x2 = Math.max(...ws.map((w) => w.x + w.w));
    const y2 = Math.max(...ws.map((w) => w.y + w.h));
    return { text: ws.map((w) => w.text).join(' '), x, y, w: x2 - x, h: y2 - y, cx: Math.round((x + x2) / 2), cy: Math.round((y + y2) / 2), conf: Math.min(...ws.map((w) => w.conf)), rank, source: 'ocr' };
  };
  for (const line of lines) {
    const words = line.words.map((w) => clean(w.text));
    if (words.filter(Boolean).join(' ') === q.join(' ') || squash(line.text) === qs) {
      hits.push(box(line.words, 3));
      continue;
    }
    if (exact) continue;
    for (let i = 0; i + q.length <= words.length; i++) {
      const slice = words.slice(i, i + q.length);
      const whole = slice.every((w, k) => w === q[k]);
      const partial = slice.every((w, k) => (q.length === 1 ? w.includes(q[k]) : k === 0 ? w.endsWith(q[k]) : k === q.length - 1 ? w.startsWith(q[k]) : w === q[k]));
      if (whole || partial) hits.push(box(line.words.slice(i, i + q.length), whole ? 2 : 1));
    }
  }
  if (!hits.length && qs.length >= 3) {
    // OCR sometimes glues words ("Starterapp") or splits them: compare without spaces.
    for (const line of lines) {
      for (let i = 0; i < line.words.length; i++) {
        let acc = '';
        for (let j = i; j < line.words.length && acc.length < qs.length + 2; j++) {
          acc += squash(line.words[j].text);
          if (exact ? acc === qs && i === 0 && j === line.words.length - 1 : acc.includes(qs)) {
            hits.push(box(line.words.slice(i, j + 1), 0));
            break;
          }
        }
      }
    }
  }
  return hits.sort((a, b) => b.rank - a.rank || b.conf - a.conf);
}

/**
 * Finds visible text by OCR. Matches whole words/phrases inside a visual line,
 * first at 1x, then (if nothing matched) on a 1.5x upscaled image.
 * Returns [{text, x, y, w, h, cx, cy, conf, source: 'ocr'}], best first.
 */
export async function findText(page, query, { clip, exact = false, invert } = {}) {
  if (!String(query || '').trim()) throw new Error('Empty text query');
  // Passes, most likely first; stops at the first pass that finds the text.
  // Clip to the region you care about: each full-screen pass costs 1.5-7 s.
  const dark = invert === undefined ? await regionIsDark(page, clip) : invert;
  const passes = dark
    ? [{ invert: true, threshold: null }, { invert: true, threshold: 60 }, { invert: false, threshold: 85 }, { invert: true, threshold: null, upscale: 1.5 }]
    : [{ invert: false, threshold: 85 }, { invert: false, threshold: null }, { invert: true, threshold: null }, { invert: false, threshold: 85, upscale: 1.5 }];
  for (const pass of passes) {
    const { lines } = await ocr(page, { clip, ...pass });
    const hits = matchText(lines, query, exact);
    if (hits.length) return hits;
  }
  return [];
}

/** Mean brightness of a region below 50%? */
async function regionIsDark(page, clip) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'nowa-lum-'));
  try {
    const png = path.join(dir, 'in.png');
    await page.screenshot({ path: png, clip: await pwClip(page, clip), scale: 'css' });
    const r = spawnSync('convert', [png, '-colorspace', 'Gray', '-format', '%[fx:mean]', 'info:'], { encoding: 'utf8' });
    return r.status === 0 ? Number(r.stdout) < 0.5 : true;
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

/* ------------------------------------------------------------------------ */
/* Locating and acting                                                       */
/* ------------------------------------------------------------------------ */

function parsePoint(target) {
  if (target && typeof target === 'object' && Number.isFinite(target.x) && Number.isFinite(target.y)) return { x: target.x, y: target.y };
  if (typeof target === 'string') {
    const m = target.match(/^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/);
    if (m) return { x: Number(m[1]), y: Number(m[2]) };
  }
  return null;
}

/**
 * Resolves a target to a point. Target: {x,y} | "x,y" | "sidebar:Widgets" | label text.
 * Text is looked up in the semantics tree, then by OCR (unless ocr:false).
 * @returns {{x:number, y:number, source:string, node?:object}}
 */
export async function locate(page, target, { exact = false, role, index = 0, ocr: useOcr = true, clip, offset } = {}) {
  if (target === undefined || target === null || (typeof target === 'string' && !target.trim())) throw new Error('Empty target');
  const point = parsePoint(target);
  if (point) return { ...point, source: 'coords' };
  if (typeof target === 'string' && target.startsWith('sidebar:')) {
    const item = SIDEBAR.find((s) => normalize(s.name) === normalize(target.slice(8)));
    if (!item) throw new Error(`Unknown sidebar item ${target}. Known: ${SIDEBAR.map((s) => s.name).join(', ')}`);
    return { x: item.x, y: item.y, source: 'sidebar' };
  }
  const inClip = (n) => !clip || (n.cx >= clip.x && n.cx <= clip.x + clip.w && n.cy >= clip.y && n.cy <= clip.y + clip.h);
  const nodes = (await find(page, target, { exact, role })).filter(inClip);
  let hit = nodes[index];
  let source = 'semantics';
  if (!hit && useOcr && !role) {
    hit = (await findText(page, target, { clip, exact }))[index];
    source = 'ocr';
  }
  if (!hit) throw new Error(`Not found on screen: "${target}"`);
  const dx = offset?.x || 0;
  const dy = offset?.y || 0;
  return { x: hit.cx + dx, y: hit.cy + dy, source, node: hit };
}

/**
 * Clicks a target with real mouse events (they reach Flutter like a user's).
 * opts: button 'left'|'right'|'middle', clickCount 2 for double click, exact, role, index, ocr, clip, settleMs.
 */
export async function click(page, target, opts = {}) {
  const { button = 'left', clickCount = 1, settleMs = 400 } = opts;
  const p = await locate(page, target, opts);
  await page.mouse.move(p.x, p.y);
  await page.mouse.click(p.x, p.y, { button, clickCount, delay: 30 });
  if (settleMs) await sleep(settleMs);
  return p;
}

export const clickAt = (page, x, y, opts = {}) => click(page, { x, y }, opts);

export async function hover(page, target, opts = {}) {
  const p = await locate(page, target, opts);
  await page.mouse.move(p.x, p.y, { steps: 4 });
  await sleep(opts.settleMs ?? 600);
  return p;
}

/**
 * Drags with the mouse from one target to another (each: label, "x,y" or {x,y}).
 * Moves in small steps so Flutter's Draggable/gesture recognizers see a drag.
 */
export async function drag(page, from, to, { steps = 25, holdMs = 200, stepMs = 16, ...opts } = {}) {
  const a = await locate(page, from, opts);
  const b = await locate(page, to, opts);
  await page.mouse.move(a.x, a.y);
  await page.mouse.down();
  await sleep(holdMs);
  // A first small move past the drag slop starts the drag.
  await page.mouse.move(a.x + Math.sign(b.x - a.x || 1) * 12, a.y + Math.sign(b.y - a.y || 1) * 12, { steps: 3 });
  for (let i = 1; i <= steps; i++) {
    await page.mouse.move(a.x + ((b.x - a.x) * i) / steps, a.y + ((b.y - a.y) * i) / steps);
    await sleep(stepMs);
  }
  await sleep(holdMs);
  await page.mouse.up();
  await sleep(opts.settleMs ?? 500);
  return { from: a, to: b };
}

/** Types into whatever has focus (click the field first). Never use on the AI chat field. */
export async function type(page, text, { delay = 40 } = {}) {
  await page.keyboard.type(text, { delay });
}

/** Presses keys, e.g. "Control+K", "Escape", "Shift+ArrowDown". Several: "Control+A Delete". */
export async function press(page, keys, { delayMs = 150 } = {}) {
  for (const k of String(keys).split(/\s+/).filter(Boolean)) {
    await page.keyboard.press(k);
    await sleep(delayMs);
  }
}

/** Waits until a label (semantics, then OCR) is on screen, or gone with {gone:true}. */
export async function waitFor(page, target, { timeout = 15000, gone = false, ocr: useOcr = false, interval = 400, ...opts } = {}) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    let found = false;
    try {
      await locate(page, target, { ...opts, ocr: useOcr });
      found = true;
    } catch {
      found = false;
    }
    if (found !== gone) return true;
    await sleep(interval);
  }
  throw new Error(`Timed out waiting for "${target}" to ${gone ? 'disappear' : 'appear'}`);
}

/**
 * Waits until the screen stops changing (two equal low-res frames in a row) or timeout.
 * Returns true if it settled.
 */
export async function settle(page, { timeout = 5000, interval = 250 } = {}) {
  const deadline = Date.now() + timeout;
  let previous = null;
  while (Date.now() < deadline) {
    const buf = await page.screenshot({ scale: 'css', type: 'jpeg', quality: 60 });
    if (previous && buf.equals(previous)) return true;
    previous = buf;
    await sleep(interval);
  }
  return false;
}

/**
 * Screenshot. opts: clip {x,y,w,h} (CSS px), label (crop around a node/text), pad,
 * fullPage, scale 'device' (default, 2x pixels) | 'css'.
 */
export async function screenshot(page, file, { clip, label, pad = 8, fullPage = false, scale = 'device', ...opts } = {}) {
  let region = clip;
  if (label) {
    const p = await locate(page, label, opts);
    const n = p.node;
    region = { x: n.x - pad, y: n.y - pad, w: n.w + 2 * pad, h: n.h + 2 * pad };
  }
  ensureDir(path.dirname(path.resolve(file)));
  const clipRegion = await pwClip(page, region);
  await page.screenshot({ path: file, clip: clipRegion, fullPage, scale });
  if (scale === 'css') {
    // Over CDP (session mode) Playwright cannot emulate the scale: downscale the file instead.
    const [vw, dpr] = await page.evaluate(() => [window.innerWidth, window.devicePixelRatio || 1]);
    const expected = Math.round(clipRegion ? clipRegion.width : vw);
    const r = spawnSync('identify', ['-format', '%w', file], { encoding: 'utf8' });
    if (dpr !== 1 && r.status === 0 && Math.abs(Number(r.stdout) - expected) > 2) {
      spawnSync('convert', [file, '-resize', `${expected}x`, file]);
    }
  }
  return path.resolve(file);
}

/* ------------------------------------------------------------------------ */
/* Editor recipes                                                            */
/* ------------------------------------------------------------------------ */

/** Reads the left panel's header text by OCR (headers differ per panel; null if none). */
export async function leftPanelTitle(page) {
  const { lines } = await ocr(page, { clip: { x: UI.leftPanelHeader.x + 20, y: UI.leftPanelHeader.y, w: UI.leftPanelHeader.w - 90, h: UI.leftPanelHeader.h } });
  return lines.length ? lines.sort((a, b) => b.w - a.w)[0].text : null;
}

/**
 * Which left-sidebar panel is open, from the orange highlight behind its icon
 * (null when the left panel is closed). Reads pixels, so it works without semantics.
 */
export async function activePanel(page) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'nowa-side-'));
  try {
    const png = path.join(dir, 'side.png');
    await page.screenshot({ path: png, clip: { x: 0, y: 0, width: 40, height: 440 }, scale: 'css' });
    const width = Number(spawnSync('identify', ['-format', '%w', png], { encoding: 'utf8' }).stdout) || 40;
    const f = width / 40; // 1 or the device pixel ratio (CDP sessions ignore scale: 'css')
    for (const item of SIDEBAR) {
      const size = Math.round(16 * f);
      const crop = `${size}x${size}+${Math.round((item.x - 8) * f)}+${Math.round((item.y - 8) * f)}`;
      const r = spawnSync('convert', [png, '-crop', crop, '+repage', '-format', '%[fx:mean.r] %[fx:mean.g] %[fx:mean.b]', 'info:'], { encoding: 'utf8' });
      const [red, green, blue] = r.stdout.trim().split(/\s+/).map(Number);
      // The selected icon sits on an orange rounded square; idle icons are gray (r = g = b).
      if (red - blue > 0.2 && red > green + 0.05) return item.name;
    }
    return null;
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

/**
 * Opens a left-sidebar panel by name (see SIDEBAR). Clicking the icon of the open
 * panel would close it, so it checks which panel is open first.
 */
export async function openPanel(page, name) {
  const item = SIDEBAR.find((s) => normalize(s.name) === normalize(name));
  if (!item) throw new Error(`Unknown panel ${name}. Known: ${SIDEBAR.map((s) => s.name).join(', ')}`);
  if ((await activePanel(page)) === item.name) return { panel: item.name, already: true };
  for (let attempt = 0; attempt < 2; attempt++) {
    await page.mouse.click(item.x, item.y);
    await sleep(700);
    await page.mouse.move(700, 870); // away from the icon so its tooltip closes
    await settle(page, { timeout: 3000 });
    if ((await activePanel(page)) === item.name) return { panel: item.name, already: false };
  }
  throw new Error(`Could not open the ${name} panel`);
}

/** Closes the left panel (clicks the open panel's icon again). */
export async function closePanel(page) {
  const open = await activePanel(page);
  if (!open) return false;
  const item = SIDEBAR.find((s) => s.name === open);
  await page.mouse.click(item.x, item.y);
  await sleep(600);
  await page.mouse.move(700, 870);
  await settle(page, { timeout: 3000 });
  return true;
}

/* ------------------------------------------------------------------------ */
/* Video                                                                     */
/* ------------------------------------------------------------------------ */

/**
 * Converts a Playwright .webm to a docs-ready MP4: H.264 High, level <= 4.1,
 * yuv420p, <= 1920x1080, <= 30 fps, no audio, moov atom first (+faststart).
 */
export function toMp4(input, output, { trimStart = 0, fps = 25, crf = 18, duration } = {}) {
  ensureDir(path.dirname(path.resolve(output)));
  const args = ['-y', '-hide_banner', '-loglevel', 'error'];
  if (trimStart > 0) args.push('-ss', trimStart.toFixed(2));
  args.push('-i', input);
  if (duration) args.push('-t', String(duration));
  args.push(
    '-an',
    '-vf',
    `fps=${Math.min(fps, 30)},scale=w='min(1920,iw)':h='min(1080,ih)':force_original_aspect_ratio=decrease:force_divisible_by=2`,
    '-c:v', 'libx264', '-profile:v', 'high', '-level:v', '4.1', '-pix_fmt', 'yuv420p',
    '-preset', 'slow', '-crf', String(crf),
    '-movflags', '+faststart',
    output,
  );
  const r = spawnSync('ffmpeg', args, { encoding: 'utf8' });
  if (r.status !== 0) throw new Error(`ffmpeg failed: ${r.stderr}`);
  return path.resolve(output);
}

/** Checks an MP4 against the docs rules (same checks as scripts/check-videos.mjs). Returns a list of problems. */
export function checkVideo(file) {
  const problems = [];
  const r = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'format=format_name:stream=codec_type,codec_name,profile,pix_fmt,level,width,height,r_frame_rate', '-of', 'json', file], { encoding: 'utf8' });
  if (r.status !== 0) return [`ffprobe could not read ${file}: ${r.stderr}`];
  const media = JSON.parse(r.stdout);
  if (!media.format?.format_name?.split(',').includes('mp4')) problems.push('not an MP4 container');
  const videos = media.streams.filter((s) => s.codec_type === 'video');
  const audios = media.streams.filter((s) => s.codec_type === 'audio');
  if (videos.length !== 1) problems.push('must contain exactly one video stream');
  const v = videos[0] || {};
  if (v.codec_name !== 'h264') problems.push('must use H.264 video');
  if (v.profile !== 'High') problems.push('must use H.264 High Profile');
  if (v.level > 41) problems.push('exceeds H.264 Level 4.1');
  if (v.pix_fmt !== 'yuv420p') problems.push('must use yuv420p');
  if (v.width > 1920 || v.height > 1080) problems.push('exceeds 1920x1080');
  const [num, den = '1'] = String(v.r_frame_rate || '0/1').split('/').map(Number);
  if ((den === 0 ? Infinity : num / den) > 30.01) problems.push('exceeds 30 fps');
  for (const a of audios) if (a.codec_name !== 'aac' || a.profile !== 'LC') problems.push('audio must be AAC-LC');
  // moov before mdat (fast start)
  const fd = fs.openSync(file, 'r');
  const size = fs.fstatSync(fd).size;
  let offset = 0;
  let moov;
  let mdat;
  try {
    while (offset + 8 <= size) {
      const h = Buffer.alloc(16);
      const n = fs.readSync(fd, h, 0, 16, offset);
      if (n < 8) break;
      let box = h.readUInt32BE(0);
      const type = h.toString('ascii', 4, 8);
      let hs = 8;
      if (box === 1) {
        if (n < 16) break;
        box = Number(h.readBigUInt64BE(8));
        hs = 16;
      } else if (box === 0) box = size - offset;
      if (box < hs || offset + box > size) break;
      if (type === 'moov') moov = offset;
      if (type === 'mdat') mdat = offset;
      if (moov !== undefined && mdat !== undefined) break;
      offset += box;
    }
  } finally {
    fs.closeSync(fd);
  }
  if (!(moov !== undefined && mdat !== undefined && moov < mdat)) problems.push('not optimized for fast start (moov after mdat)');
  return problems;
}

/** Helper object handed to scenario scripts: every function bound to the page. */
export function helpers(page) {
  return {
    page,
    config,
    SIDEBAR,
    UI,
    semantics: (o) => semantics(page, o),
    enableSemantics: () => enableSemantics(page),
    semanticsEnabled: () => semanticsEnabled(page),
    find: (q, o) => find(page, q, o),
    ocr: (o) => ocr(page, o),
    findText: (q, o) => findText(page, q, o),
    locate: (t, o) => locate(page, t, o),
    click: (t, o) => click(page, t, o),
    rightClick: (t, o) => click(page, t, { ...o, button: 'right' }),
    doubleClick: (t, o) => click(page, t, { ...o, clickCount: 2 }),
    clickAt: (x, y, o) => clickAt(page, x, y, o),
    hover: (t, o) => hover(page, t, o),
    drag: (a, b, o) => drag(page, a, b, o),
    type: (text, o) => type(page, text, o),
    press: (keys, o) => press(page, keys, o),
    waitFor: (t, o) => waitFor(page, t, o),
    settle: (o) => settle(page, o),
    sleep,
    shot: (file, o) => screenshot(page, file, o),
    openPanel: (name) => openPanel(page, name),
    closePanel: () => closePanel(page),
    leftPanelTitle: () => leftPanelTitle(page),
    activePanel: () => activePanel(page),
    dismissDialogs: (o) => dismissDialogs(page, o),
    openEditor: (o) => openEditor(page, o),
  };
}

/**
 * Records a scenario to MP4. The editor setup (loading) is trimmed off.
 * @param {(ctx: {page, cap}) => Promise<void>} scenario
 * @param {string} output .mp4 path
 * @param {{path?: string, starter?: string, fps?: number, tailMs?: number, keepWebm?: boolean, headless?: boolean}} opts
 */
export async function recordVideo(scenario, output, opts = {}) {
  const dir = fs.mkdtempSync(path.join(ensureDir(config.outDir), 'video-'));
  const session = await launch({ ...opts, video: { dir } });
  const { page } = session;
  let webm;
  try {
    await openEditor(page, opts);
    if (opts.setup) await opts.setup({ page, cap: helpers(page) });
    const trimStart = Math.max(0, (Date.now() - page.__createdAt) / 1000 - 0.3);
    await scenario({ page, cap: helpers(page) });
    await sleep(opts.tailMs ?? 800);
    const video = page.video();
    await session.close();
    webm = await video.path();
    toMp4(webm, output, { trimStart, fps: opts.fps });
  } finally {
    try {
      await session.close();
    } catch {
      // already closed
    }
  }
  if (opts.keepWebm && webm) fs.copyFileSync(webm, output.replace(/\.mp4$/i, '.webm'));
  fs.rmSync(dir, { recursive: true, force: true });
  return { output: path.resolve(output), problems: checkVideo(output) };
}

/* ------------------------------------------------------------------------ */
/* CLI                                                                       */
/* ------------------------------------------------------------------------ */

const HELP = `Usage: node capture.mjs <command> [args] [--options]

Session (one headless browser kept open between commands; fastest for exploring):
  start [--path /playground] [--starter starter|simple|empty] [--keep] [--semantics]
                              launch headless Chromium and open the editor
                              (--semantics: also turn the semantics tree on; see below)
  stop                        close the session browser
  status                      session info and current URL
  goto <path> [--starter s] [--keep] [--semantics]   open a route, wait for the editor
                                       (--keep: don't clear the stored playground)
  ready                       wait for the editor and dismiss dialogs
  semantics                   turn the semantics tree on (until the next goto/reload).
                              While on, typing into the left panel, AI chat or palettes
                              is lost; do typing first, or use a fresh goto.
  dump [--all] [--json] [--out f.json] [--filter text] [--enable]
                              semantics nodes on screen (--enable turns semantics on)
  find <label> [--exact] [--role r]   matching semantics nodes
  ocr [--clip x,y,w,h] [--json] [--words]   text on screen by OCR (lines with boxes)
  text <phrase> [--clip x,y,w,h]      where a visible phrase is (OCR)
  locate <target>             resolve a target to coordinates
  click <target> [--right] [--double] [--exact] [--index n] [--no-ocr] [--clip x,y,w,h]
  hover <target>
  drag <from> <to> [--steps n] [--hold ms]
  type <text> [--delay ms]    type into the focused field
  press <keys...>             e.g. Control+K  Escape  "Control+A Delete"
  wait <target> [--gone] [--timeout ms] [--ocr]
  sleep <ms>
  panel <name>                open a left-sidebar panel (${SIDEBAR.map((s) => s.name).join(', ')})
  close-panel
  settle [--timeout ms]       wait until the screen stops changing
  shot <out.png> [--clip x,y,w,h] [--label text --pad n] [--css] [--full]
  eval <js>                   evaluate JS in the page, print the result

Scripted (fresh browser per run):
  run <scenario.mjs> [--session] [--path p] [--starter s] [--semantics]
        scenario: export default async ({ page, cap }) => { ... }; optional export const options = {...}
  video <scenario.mjs> <out.mp4> [--fps 25] [--path p] [--starter s] [--keep-webm]
  convert <in.webm> <out.mp4> [--trim seconds] [--fps 25]
  check-video <file.mp4>      validate against the docs video rules

Targets: a label (semantics, then OCR fallback), "x,y" in CSS px, or sidebar:<Panel>.
Env: NOWA_URL (default http://localhost:8080), CAPTURE_OUT, CAPTURE_CDP_PORT (9333).`;

function parseArgs(argv) {
  const positional = [];
  const options = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next !== undefined && !next.startsWith('--')) {
        options[key] = next;
        i++;
      } else options[key] = true;
    } else positional.push(a);
  }
  return { positional, options };
}

const parseClip = (s) => {
  if (!s || s === true) return undefined;
  const [x, y, w, h] = String(s).split(',').map(Number);
  return { x, y, w, h };
};

function printNodes(nodes) {
  for (const n of nodes) {
    const flags = [n.role, n.tappable ? 'tap' : '', n.checked ? `checked=${n.checked}` : '', n.selected ? `selected=${n.selected}` : '', n.value ? `value=${JSON.stringify(n.value)}` : '']
      .filter(Boolean)
      .join(',');
    console.log(`${JSON.stringify(n.label)}  [${flags}]  box=${n.x},${n.y},${n.w},${n.h}  center=${n.cx},${n.cy}`);
  }
}

async function cli(argv) {
  const { positional, options } = parseArgs(argv);
  const [cmd, ...rest] = positional;
  if (!cmd || cmd === 'help' || options.help) {
    console.log(HELP);
    return;
  }

  // Commands that do not need a browser.
  if (cmd === 'stop') {
    console.log((await stopSession()) ? 'Session stopped.' : 'No session.');
    return;
  }
  if (cmd === 'convert') {
    const out = toMp4(rest[0], rest[1], { trimStart: Number(options.trim || 0), fps: Number(options.fps || 25) });
    const problems = checkVideo(out);
    console.log(out, problems.length ? `PROBLEMS: ${problems.join('; ')}` : 'OK (passes docs video rules)');
    return;
  }
  if (cmd === 'check-video') {
    const problems = checkVideo(rest[0]);
    console.log(problems.length ? `PROBLEMS: ${problems.join('; ')}` : 'OK (passes docs video rules)');
    if (problems.length) process.exitCode = 1;
    return;
  }
  if (cmd === 'video') {
    const mod = await import(pathToFileURL(path.resolve(rest[0])).href);
    const res = await recordVideo(mod.default, rest[1], {
      ...(mod.options || {}),
      ...(options.path ? { path: options.path } : {}),
      ...(options.starter ? { starter: options.starter } : {}),
      fps: Number(options.fps || mod.options?.fps || 25),
      keepWebm: !!options['keep-webm'],
      headless: !options.headed,
    });
    console.log(res.output, res.problems.length ? `PROBLEMS: ${res.problems.join('; ')}` : 'OK (passes docs video rules)');
    return;
  }
  if (cmd === 'run' && !options.session) {
    const mod = await import(pathToFileURL(path.resolve(rest[0])).href);
    const session = await launch({ headless: !options.headed });
    try {
      const o = { ...(mod.options || {}), ...(options.path ? { path: options.path } : {}), ...(options.starter ? { starter: options.starter } : {}), ...(options.semantics ? { semantics: true } : {}) };
      if (o.open !== false) await openEditor(session.page, o);
      await mod.default({ page: session.page, cap: helpers(session.page) });
    } finally {
      await session.close();
    }
    return;
  }

  if (cmd === 'start') {
    const info = await startSession({ headless: !options.headed });
    const s = await attachSession();
    await openEditor(s.page, { path: options.path || '/playground', starter: options.starter, fresh: !options.keep, semantics: !!options.semantics });
    console.log(`Session up: pid ${info.pid}, CDP ${info.port}, ${s.page.url()}`);
    await s.detach();
    return;
  }

  // Everything else acts on the session page.
  const s = await attachSession();
  const { page } = s;
  try {
    switch (cmd) {
      case 'status':
        console.log(JSON.stringify({ ...s.info, url: page.url(), viewport: await page.evaluate(() => [innerWidth, innerHeight, devicePixelRatio]) }, null, 2));
        break;
      case 'goto':
        await openEditor(page, { path: rest[0] || '/playground', starter: options.starter, fresh: !options.keep, semantics: !!options.semantics });
        console.log(page.url());
        break;
      case 'semantics':
        console.log(`semantics on: ${await enableSemantics(page)} nodes`);
        break;
      case 'ready':
        await waitForEditor(page);
        console.log('closed:', (await dismissDialogs(page)).join(', ') || 'nothing');
        break;
      case 'dump': {
        if (!(await semanticsEnabled(page))) {
          if (!options.enable) throw new Error('Semantics are off. Run `semantics` first or pass --enable (typing into the left panel/palettes stops working until the next goto).');
          await enableSemantics(page);
          await sleep(800);
        }
        let nodes = await semantics(page, { all: !!options.all });
        if (options.filter) nodes = nodes.filter((n) => normalize(n.label).includes(normalize(options.filter)));
        if (options.out) {
          ensureDir(path.dirname(path.resolve(options.out)));
          fs.writeFileSync(options.out, JSON.stringify(nodes, null, 2));
          console.log(`${nodes.length} nodes -> ${path.resolve(options.out)}`);
        } else if (options.json) console.log(JSON.stringify(nodes, null, 2));
        else printNodes(nodes);
        break;
      }
      case 'find':
        printNodes(await find(page, rest.join(' '), { exact: !!options.exact, role: options.role }));
        break;
      case 'ocr': {
        const res = await ocr(page, { clip: parseClip(options.clip) });
        const list = options.words ? res.words : res.lines;
        if (options.json) console.log(JSON.stringify(list, null, 2));
        else for (const l of list) console.log(`${JSON.stringify(l.text)}  conf=${l.conf}  box=${l.x},${l.y},${l.w},${l.h}  center=${Math.round(l.x + l.w / 2)},${Math.round(l.y + l.h / 2)}`);
        break;
      }
      case 'text':
        for (const h of await findText(page, rest.join(' '), { clip: parseClip(options.clip), exact: !!options.exact }))
          console.log(`${JSON.stringify(h.text)}  conf=${h.conf}  box=${h.x},${h.y},${h.w},${h.h}  center=${h.cx},${h.cy}`);
        break;
      case 'locate':
        console.log(JSON.stringify(await locate(page, rest.join(' '), { exact: !!options.exact, index: Number(options.index || 0), ocr: !options['no-ocr'], clip: parseClip(options.clip) })));
        break;
      case 'click': {
        const p = await click(page, rest.join(' '), {
          button: options.right ? 'right' : options.middle ? 'middle' : 'left',
          clickCount: options.double ? 2 : 1,
          exact: !!options.exact,
          index: Number(options.index || 0),
          ocr: !options['no-ocr'],
          clip: parseClip(options.clip),
          role: options.role,
        });
        console.log(`clicked ${p.x},${p.y} (${p.source}${p.node ? `: ${JSON.stringify(p.node.label || p.node.text)}` : ''})`);
        break;
      }
      case 'hover': {
        const p = await hover(page, rest.join(' '), { exact: !!options.exact, clip: parseClip(options.clip) });
        console.log(`hovering ${p.x},${p.y} (${p.source})`);
        break;
      }
      case 'drag': {
        const r = await drag(page, rest[0], rest[1], { steps: Number(options.steps || 25), holdMs: Number(options.hold || 200) });
        console.log(`dragged ${r.from.x},${r.from.y} -> ${r.to.x},${r.to.y}`);
        break;
      }
      case 'type':
        await type(page, rest.join(' '), { delay: Number(options.delay || 40) });
        break;
      case 'press':
        await press(page, rest.join(' '));
        break;
      case 'wait':
        await waitFor(page, rest.join(' '), { gone: !!options.gone, timeout: Number(options.timeout || 15000), ocr: !!options.ocr });
        console.log('ok');
        break;
      case 'sleep':
        await sleep(Number(rest[0] || 1000));
        break;
      case 'panel':
        console.log(JSON.stringify(await openPanel(page, rest[0])));
        break;
      case 'close-panel':
        console.log((await closePanel(page)) ? 'closed' : 'no panel open');
        break;
      case 'settle':
        console.log((await settle(page, { timeout: Number(options.timeout || 5000) })) ? 'settled' : 'still changing');
        break;
      case 'shot': {
        const file = await screenshot(page, rest[0], {
          clip: parseClip(options.clip),
          label: options.label,
          pad: Number(options.pad ?? 8),
          fullPage: !!options.full,
          scale: options.css ? 'css' : 'device',
        });
        console.log(file);
        break;
      }
      case 'eval':
        console.log(JSON.stringify(await page.evaluate(rest.join(' ')), null, 2));
        break;
      case 'run': {
        const mod = await import(pathToFileURL(path.resolve(rest[0])).href);
        await mod.default({ page, cap: helpers(page) });
        break;
      }
      default:
        console.error(`Unknown command: ${cmd}\n\n${HELP}`);
        process.exitCode = 2;
    }
  } finally {
    await s.detach();
  }
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  cli(process.argv.slice(2))
    .then(() => process.exit(process.exitCode || 0))
    .catch((e) => {
      console.error(`Error: ${e.message}`);
      process.exit(1);
    });
}
