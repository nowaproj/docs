#!/usr/bin/env node
// Adds What's new callouts to a screenshot: an orange outline around what to
// look at, and a label pill joined to it by a line, like the 3.16.1 pages.
//
//   node annotate.cjs <in.png> <spec.json> <out.png>
//
// spec.json, in pixels of the input image:
//   {
//     "crop": [0, 0, 1600, 1078],                 // optional, applied last
//     "callouts": [
//       { "box": [346, 4, 86, 58], "label": "Comment · C", "at": [128, 140] },
//       { "box": [520, 450, 56, 56], "label": "Pinned on your app", "at": [186, 477], "round": true }
//     ]
//   }
// box is x, y, width, height. at is where the label's center goes. Leave out
// label to only outline, and "round": true draws a circle, for a pin or a dot.
// Keep labels to the words on screen or a few plain words.

const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright');

const ORANGE = '#FFA730';
const INK = '#1A1206';

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
}

// The point on the box's edge closest to (px, py).
function edgePoint([x, y, w, h], px, py) {
  return [Math.min(x + w, Math.max(x, px)), Math.min(y + h, Math.max(y, py))];
}

async function main() {
  const [input, specFile, output] = process.argv.slice(2);
  if (!input || !specFile || !output) {
    console.error('Usage: node annotate.cjs <in.png> <spec.json> <out.png>');
    process.exit(1);
  }
  const spec = JSON.parse(fs.readFileSync(specFile, 'utf8'));
  const image = fs.readFileSync(input);
  const mime = input.toLowerCase().endsWith('.jpg') || input.toLowerCase().endsWith('.jpeg') ? 'image/jpeg' : 'image/png';

  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  await page.setContent(`<img id="shot" src="data:${mime};base64,${image.toString('base64')}">`);
  const { width, height } = await page.$eval('#shot', (img) => ({ width: img.naturalWidth, height: img.naturalHeight }));
  // Labels and lines scale with the picture, so they read the same on any size.
  const unit = width / 1600;

  const lines = [];
  const shapes = [];
  const pills = [];
  for (const c of spec.callouts || []) {
    const [x, y, w, h] = c.box;
    const pad = 6 * unit;
    if (c.round) {
      const r = Math.max(w, h) / 2 + pad;
      shapes.push(`<circle cx="${x + w / 2}" cy="${y + h / 2}" r="${r}" />`);
    } else {
      shapes.push(`<rect x="${x - pad}" y="${y - pad}" width="${w + 2 * pad}" height="${h + 2 * pad}" rx="${12 * unit}" />`);
    }
    if (c.label && c.at) {
      const [ax, ay] = c.at;
      let ex, ey;
      if (c.round) {
        // Stop on the circle, on the side facing the label.
        const r = Math.max(w, h) / 2 + pad;
        const [mx, my] = [x + w / 2, y + h / 2];
        const d = Math.hypot(ax - mx, ay - my) || 1;
        [ex, ey] = [mx + ((ax - mx) / d) * r, my + ((ay - my) / d) * r];
      } else {
        [ex, ey] = edgePoint([x - pad, y - pad, w + 2 * pad, h + 2 * pad], ax, ay);
      }
      lines.push(`<line x1="${ax}" y1="${ay}" x2="${ex}" y2="${ey}" /><circle class="dot" cx="${ex}" cy="${ey}" r="${5 * unit}" />`);
      pills.push(`<div class="pill" style="left:${ax}px;top:${ay}px">${esc(c.label)}</div>`);
    }
  }

  await page.setContent(`<!doctype html><html><head><style>
    html, body { margin: 0; padding: 0; background: transparent; }
    #stage { position: relative; width: ${width}px; height: ${height}px; }
    #stage img { display: block; width: ${width}px; height: ${height}px; }
    svg { position: absolute; inset: 0; overflow: visible; }
    .shape rect, .shape circle { fill: none; stroke: ${ORANGE}; stroke-width: ${4 * unit}px;
      filter: drop-shadow(0 0 ${6 * unit}px rgba(255, 167, 48, 0.55)); }
    line { stroke: ${ORANGE}; stroke-width: ${3 * unit}px; }
    .dot { fill: ${ORANGE}; }
    .pill { position: absolute; transform: translate(-50%, -50%); white-space: nowrap;
      background: ${ORANGE}; color: ${INK}; border-radius: 999px;
      padding: ${9 * unit}px ${20 * unit}px; font: 700 ${26 * unit}px/1.2 Inter, Roboto, "Helvetica Neue", Arial, sans-serif;
      box-shadow: 0 ${4 * unit}px ${14 * unit}px rgba(0, 0, 0, 0.35); }
  </style></head><body><div id="stage">
    <img src="data:${mime};base64,${image.toString('base64')}">
    <svg width="${width}" height="${height}"><g>${lines.join('')}</g><g class="shape">${shapes.join('')}</g></svg>
    ${pills.join('')}
  </div></body></html>`);
  await page.setViewportSize({ width, height });
  await page.waitForTimeout(100);

  const [cx, cy, cw, ch] = spec.crop || [0, 0, width, height];
  fs.mkdirSync(path.dirname(path.resolve(output)), { recursive: true });
  await page.screenshot({ path: output, clip: { x: cx, y: cy, width: cw, height: ch } });
  await browser.close();
  console.log(`${output}: ${cw}x${ch}, ${(spec.callouts || []).length} callouts`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
