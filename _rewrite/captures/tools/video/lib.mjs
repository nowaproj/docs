// Helpers for the docs videos: a visible cursor with click ripples and a key badge (DOM overlay,
// pointer-events: none), smooth mouse moves, drags, slow typing. Keep this file in the scratchpad.
import fs from 'node:fs';
import path from 'node:path';

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Adds the cursor, ripple and key-badge overlay. Call once after the editor loaded. */
export async function installOverlay(page) {
  await page.evaluate(() => {
    if (document.getElementById('cap-cursor')) return;
    const style = document.createElement('style');
    style.id = 'cap-overlay-style';
    style.textContent = `
      #cap-cursor{position:fixed;left:0;top:0;width:26px;height:26px;pointer-events:none;z-index:2147483647;
        transform:translate(-100px,-100px);will-change:transform;filter:drop-shadow(0 1px 2px rgba(0,0,0,.5));}
      .cap-ripple{position:fixed;width:38px;height:38px;margin:-19px 0 0 -19px;border-radius:50%;
        border:3px solid #F7A93A;background:rgba(247,169,58,.28);pointer-events:none;z-index:2147483646;
        animation:cap-ripple .6s ease-out forwards;}
      @keyframes cap-ripple{from{transform:scale(.3);opacity:.95}to{transform:scale(1.55);opacity:0}}
      #cap-key{position:fixed;left:404px;bottom:60px;padding:8px 16px;border-radius:10px;
        background:rgba(20,24,32,.94);color:#fff;font:600 18px/1.2 system-ui,'Segoe UI',Roboto,Arial,sans-serif;
        letter-spacing:.3px;border:1px solid rgba(255,255,255,.2);box-shadow:0 4px 14px rgba(0,0,0,.4);
        pointer-events:none;z-index:2147483647;opacity:0;transition:opacity .15s;}
    `;
    document.head.appendChild(style);
    const c = document.createElement('div');
    c.id = 'cap-cursor';
    c.innerHTML = '<svg width="26" height="26" viewBox="0 0 26 26"><path d="M3 2 L3 20 L7.6 15.8 L10.6 22.6 L13.4 21.4 L10.4 14.8 L16.8 14.6 Z" fill="#fff" stroke="#111" stroke-width="1.5" stroke-linejoin="round"/></svg>';
    document.body.appendChild(c);
    const move = (e) => { c.style.transform = `translate(${e.clientX - 3}px,${e.clientY - 2}px)`; };
    window.addEventListener('mousemove', move, true);
    window.addEventListener('pointermove', move, true);
    window.addEventListener('mousedown', (e) => {
      const r = document.createElement('div');
      r.className = 'cap-ripple';
      r.style.left = e.clientX + 'px';
      r.style.top = e.clientY + 'px';
      document.body.appendChild(r);
      setTimeout(() => r.remove(), 800);
    }, true);
  });
}

const pos = new WeakMap();
const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/** Puts the pointer somewhere without animation (the overlay cursor appears there). */
export async function park(page, x, y) {
  await page.mouse.move(x, y);
  pos.set(page, { x, y });
}

/** Moves the pointer smoothly. Time-based: always takes about `ms`, however slow each frame is. */
export async function glide(page, x, y, ms = 500) {
  const p = pos.get(page) || { x, y };
  const t0 = Date.now();
  for (;;) {
    const t = Math.min(1, (Date.now() - t0) / ms);
    const e = ease(t);
    await page.mouse.move(p.x + (x - p.x) * e, p.y + (y - p.y) * e);
    if (t >= 1) break;
    await sleep(8);
  }
  pos.set(page, { x, y });
}

/** Glides to a point, then presses and releases the left button. */
export async function click(page, x, y, { ms = 450, before = 120, hold = 70, after = 500 } = {}) {
  await glide(page, x, y, ms);
  await sleep(before);
  await page.mouse.down();
  await sleep(hold);
  await page.mouse.up();
  await sleep(after);
}

/** Press, hold, glide to the target, release. Flutter needs a first move past the drag slop. */
export async function drag(page, from, to, { approach = 500, pre = 150, ms = 800, hold = 250, after = 700 } = {}) {
  await glide(page, from[0], from[1], approach);
  await sleep(pre);
  await page.mouse.down();
  await sleep(hold);
  const nx = from[0] + (Math.sign(to[0] - from[0]) || 1) * 12;
  const ny = from[1] + (Math.sign(to[1] - from[1]) || 1) * 12;
  await page.mouse.move(nx, ny, { steps: 3 });
  pos.set(page, { x: nx, y: ny });
  await glide(page, to[0], to[1], ms);
  await sleep(hold);
  await page.mouse.up();
  await sleep(after);
}

/** Wheel over a point (the pointer glides there first). */
export async function wheel(page, x, y, dy, { ms = 400, steps = 1, gap = 60, after = 500 } = {}) {
  await glide(page, x, y, ms);
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, dy / steps);
    await sleep(gap);
  }
  await sleep(after);
}

export async function typeSlow(page, text, { delay = 110, after = 600 } = {}) {
  await page.keyboard.type(text, { delay });
  await sleep(after);
}

/** Shows a small dark badge (bottom left of the board) for a while, e.g. "Ctrl / Cmd + K". */
export async function badge(page, text, ms = 1600) {
  await page.evaluate(({ text, ms }) => {
    let b = document.getElementById('cap-key');
    if (!b) {
      b = document.createElement('div');
      b.id = 'cap-key';
      document.body.appendChild(b);
    }
    b.textContent = text;
    b.style.opacity = '1';
    clearTimeout(window.__capKeyT);
    window.__capKeyT = setTimeout(() => { b.style.opacity = '0'; }, ms);
  }, { text, ms });
}

/** Presses a key combination (Playwright names), optionally with a badge. */
export async function key(page, combo, label, { after = 500, badgeMs = 1600 } = {}) {
  if (label) await badge(page, label, badgeMs);
  await sleep(120);
  await page.keyboard.press(combo);
  await sleep(after);
}

/** Debug screenshot (CSS px) into $SNAP_DIR when it is set; never used for final recordings. */
export async function snap(page, name, clip) {
  const dir = process.env.SNAP_DIR;
  if (!dir) return;
  fs.mkdirSync(dir, { recursive: true });
  await page.screenshot({ path: path.join(dir, `${name}.png`), ...(clip ? { clip } : {}), scale: 'css' });
}

/* ---- fast helpers for the (unrecorded) setup phase ---- */
export async function tap(page, x, y, { settle = 500, count = 1 } = {}) {
  await page.mouse.move(x, y, { steps: 3 });
  await sleep(120);
  await page.mouse.click(x, y, { clickCount: count, delay: 40 });
  pos.set(page, { x, y });
  await sleep(settle);
}

export async function dragFast(page, from, to, { steps = 20, settle = 600 } = {}) {
  await page.mouse.move(from[0], from[1], { steps: 3 });
  await sleep(100);
  await page.mouse.down();
  await sleep(150);
  await page.mouse.move(from[0] + (Math.sign(to[0] - from[0]) || 1) * 12, from[1] + (Math.sign(to[1] - from[1]) || 1) * 12, { steps: 3 });
  for (let i = 1; i <= steps; i++) {
    await page.mouse.move(from[0] + ((to[0] - from[0]) * i) / steps, from[1] + ((to[1] - from[1]) * i) / steps);
    await sleep(16);
  }
  await sleep(150);
  await page.mouse.up();
  pos.set(page, { x: to[0], y: to[1] });
  await sleep(settle);
}

/** Types a value into a Details field: double-click, select all, type, Enter. */
export async function setField(page, x, y, text) {
  await tap(page, x, y, { count: 2, settle: 450 });
  await page.keyboard.press('Control+a');
  await sleep(150);
  await page.keyboard.type(text, { delay: 50 });
  await sleep(250);
  await page.keyboard.press('Enter');
  await sleep(600);
}

/** Pans the board by dragging with Space held (the documented mouse pan). Start on empty board. */
export async function pan(page, dx, dy = 0, { from = [700, 500] } = {}) {
  await page.mouse.move(from[0], from[1]);
  await sleep(250);
  await page.keyboard.down('Space');
  await sleep(250);
  await page.mouse.down();
  await sleep(150);
  const n = 15;
  for (let i = 1; i <= n; i++) {
    await page.mouse.move(from[0] + (dx * i) / n, from[1] + (dy * i) / n);
    await sleep(25);
  }
  await sleep(150);
  await page.mouse.up();
  await page.keyboard.up('Space');
  pos.set(page, { x: from[0] + dx, y: from[1] + dy });
  await sleep(800);
}
