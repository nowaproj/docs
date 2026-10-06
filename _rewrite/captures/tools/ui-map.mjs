#!/usr/bin/env node
/**
 * Regenerates the reference screenshots for ../ui-map.md.
 *
 *   node ui-map.mjs [outDir]      (default: ../ui-map)
 *
 * For every editor state it writes <id>.png (1440x900 at 2x) and <id>.json with
 * the OCR lines and the semantics nodes on screen (CSS px). Two fresh browser
 * runs: run A visits states that need no typing with semantics on from the
 * start; run B types first (semantics off), then turns semantics on.
 * Nothing here signs in, saves, sends AI prompts or deploys.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as cap from './capture.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(process.argv[2] || path.join(here, '..', 'ui-map'));
fs.mkdirSync(outDir, { recursive: true });

const PICKER_LIST = { x: 505, y: 200, w: 430, h: 500 };
const index = [];

async function record(page, id, title, { ocrClip, park = true } = {}) {
  // Park the pointer on an empty board spot (no hover effects), except for
  // overlays such as pickers, which close when the pointer moves away.
  if (park) await page.mouse.move(1430, 600);
  await cap.settle(page, { timeout: 4000 });
  const png = path.join(outDir, `${id}.png`);
  await cap.screenshot(page, png);
  const { lines } = await cap.ocr(page, { clip: ocrClip });
  const nodes = (await cap.semanticsEnabled(page)) ? await cap.semantics(page) : [];
  const data = {
    id,
    title,
    viewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
    ocr: lines.map(({ text, conf, x, y, w, h }) => ({ text, conf, x, y, w, h })),
    semantics: nodes.filter((n) => n.label || n.role),
  };
  fs.writeFileSync(path.join(outDir, `${id}.json`), JSON.stringify(data, null, 1));
  index.push({ id, title });
  console.log(`${id}: ${title} (${data.ocr.length} OCR lines, ${data.semantics.length} semantics nodes)`);
}

async function runA() {
  const s = await cap.launch();
  const { page } = s;
  try {
    await cap.openEditor(page, { path: '/playground', semantics: true });
    await record(page, '01-editor-default', 'Editor on first open: AI Assistant panel, board "first" with HomePage');
    for (const [i, name] of ['Widgets', 'Themes', 'Search', 'Files', 'Outline', 'Api', 'Supabase'].entries()) {
      await cap.openPanel(page, name);
      await record(page, `0${i + 2}-panel-${name.toLowerCase()}`, `Left sidebar: ${name} panel`);
    }
    await cap.closePanel(page);
    await record(page, '09-panel-closed', 'Left panel closed (click the open panel icon again)');
    await cap.openPanel(page, 'Widgets');

    await cap.click(page, 'HomePage', { clip: { x: 383, y: 200, w: 700, h: 60 } });
    await record(page, '10-screen-selected', 'Screen selected (click its title on the board): Details shows the screen');

    await cap.press(page, 'Control+k');
    await page.waitForTimeout(700);
    await record(page, '11-widget-picker', 'Widget picker (Ctrl+K or the toolbar Widget button)', { park: false });
    await cap.press(page, 'Escape');

    await cap.clickAt(page, 650, 600); // empty board: clears the selection
    await cap.press(page, 'Control+o');
    await page.waitForTimeout(700);
    await record(page, '12-file-search', 'File search palette (Ctrl+O)', { park: false });
    await cap.press(page, 'Escape');

    await cap.click(page, 'Starter app', { clip: { x: 40, y: 0, w: 200, h: 42 } });
    await page.waitForTimeout(700);
    await record(page, '13-starter-picker', 'Top bar starting-point picker (playground only)', { park: false });
    await cap.press(page, 'Escape');

    await cap.click(page, '650,600', { button: 'right' });
    await page.waitForTimeout(500);
    await record(page, '14-context-menu-board', 'Right-click on an empty part of the board', { park: false });
    await cap.press(page, 'Escape');
    await cap.clickAt(page, 650, 600);

    await cap.clickAt(page, cap.UI.settings.x, cap.UI.settings.y);
    await page.waitForTimeout(1200);
    await record(page, '15-settings', 'Project settings (gear in the top bar)');
    await cap.clickAt(page, cap.UI.settings.x, cap.UI.settings.y);

    await cap.clickAt(page, cap.UI.codeToggle.x, cap.UI.codeToggle.y);
    await page.waitForTimeout(2500);
    await record(page, '16-code-mode', 'Code mode (the </> button in the top bar)');
  } finally {
    await s.close();
  }
}

async function runB() {
  const s = await cap.launch();
  const { page } = s;
  try {
    await cap.openEditor(page, { path: '/playground?panel=Widgets' });

    // Typing first (semantics off): a Button inside the screen...
    await cap.click(page, 'HomePage', { clip: { x: 383, y: 200, w: 700, h: 60 } });
    await cap.press(page, 'Control+k');
    await page.waitForTimeout(600);
    await cap.press(page, 'Control+a');
    await cap.type(page, 'Button');
    await page.waitForTimeout(700);
    const button = (await cap.findText(page, 'Button', { clip: PICKER_LIST, exact: true }))[0];
    await cap.drag(page, { x: button.cx, y: button.cy }, '960,450');

    // ...and a Container on the board itself, recorded mid-drag.
    await cap.clickAt(page, 650, 600);
    await cap.press(page, 'Control+k');
    await page.waitForTimeout(600);
    await cap.press(page, 'Control+a');
    await cap.type(page, 'Container');
    await page.waitForTimeout(700);
    const container = (await cap.findText(page, 'Container', { clip: PICKER_LIST, exact: true }))[0];
    await page.mouse.move(container.cx, container.cy);
    await page.mouse.down();
    await page.waitForTimeout(200);
    for (let i = 1; i <= 20; i++) {
      await page.mouse.move(container.cx + ((600 - container.cx) * i) / 20, container.cy + ((300 - container.cy) * i) / 20);
      await page.waitForTimeout(16);
    }
    await page.waitForTimeout(400);
    await cap.screenshot(page, path.join(outDir, '17-drag-in-progress.png'));
    fs.writeFileSync(
      path.join(outDir, '17-drag-in-progress.json'),
      JSON.stringify({ id: '17-drag-in-progress', title: 'Dragging a widget from the picker onto the board (pointer still down at 600,300)', ocr: [], semantics: [] }, null, 1),
    );
    index.push({ id: '17-drag-in-progress', title: 'Dragging a widget from the picker onto the board' });
    console.log('17-drag-in-progress recorded');
    await page.mouse.up();
    await page.waitForTimeout(800);

    // Now semantics (typing is over).
    await cap.enableSemantics(page);
    await page.waitForTimeout(800);

    // A click on the canvas selects most widgets (the Container on the board here).
    await cap.clickAt(page, 650, 650);
    await cap.clickAt(page, 600, 300);
    await record(page, '18-widget-selected', 'Widget selected with a click: Details shows its properties');

    await cap.click(page, '600,300', { button: 'right' });
    await page.waitForTimeout(500);
    await record(page, '19-context-menu-widget', 'Right-click on a widget placed on the board', { park: false });
    await cap.press(page, 'Escape');
    await cap.clickAt(page, 650, 650);

    // Text-based widgets (Button, Text) take canvas clicks themselves: select them in the Outline.
    await cap.openPanel(page, 'Outline');
    await cap.clickAt(page, 79, 103); // expand HomePage
    await page.waitForTimeout(600);
    const node = (await cap.findText(page, 'Button', { clip: { x: 40, y: 80, w: 343, h: 300 } }))[0];
    await cap.clickAt(page, node.cx, node.cy);
    await record(page, '20-outline-selection', 'Outline panel: Button selected in the widget tree');

    const edit = (await cap.findText(page, 'Edit', { clip: { x: 1290, y: 600, w: 150, h: 300 }, exact: true }))[0];
    await cap.clickAt(page, edit.cx, edit.cy);
    await page.waitForTimeout(800);
    await record(page, '21-logic-editor', 'Logic editor for On Pressed (Details > On Pressed > Edit)');
    await cap.clickAt(page, 1096, 168); // the panel's close (x) button

    await cap.hover(page, '930,232');
    await record(page, '22-canvas-title-hover', 'Hovering a screen title: Play and Open in new tab appear', { park: false });
    await cap.clickAt(page, 986, 231); // Play
    await page.waitForTimeout(2500);
    await record(page, '23-instant-play', 'Instant Play running on the board');
  } finally {
    await s.close();
  }
}

await runA();
await runB();
fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify(index, null, 1));
console.log(`Done: ${index.length} states in ${outDir}`);
