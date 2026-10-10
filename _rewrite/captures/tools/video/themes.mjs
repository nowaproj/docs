// design-themes-video: open Themes, click the Primary tile and drag the hue slider:
// the progress bar, the switch and the checkbox follow the new color live.
import { addWidget } from './common.mjs';

export async function setup({ page, lib }) {
  // progress bar: drop it, then select it in the Outline (a widget selected by the drop ignores Layout edits)
  await addWidget(page, lib, 'linear progress', 270, [1000, 330]);
  await lib.tap(page, 20, 267, { settle: 1200 });            // Outline panel
  await lib.tap(page, 181, 175, { settle: 1000 });           // its row
  await lib.setField(page, 1273, 278, '24');                  // L
  await lib.setField(page, 1383, 278, '28');                  // T
  await lib.setField(page, 1273, 350, '345');                 // W
  await lib.setField(page, 1353, 570, '0.6');                 // Value
  await lib.setField(page, 1353, 714, '10');                  // Min Height
  // switch
  await addWidget(page, lib, 'switch', 270, [1000, 480]);
  await lib.tap(page, 181, 211, { settle: 1000 });
  await lib.setField(page, 1273, 278, '24');
  await lib.setField(page, 1383, 278, '76');
  // checkbox
  await addWidget(page, lib, 'checkbox', 270, [1000, 560]);
  await lib.tap(page, 181, 247, { settle: 1000 });
  await lib.setField(page, 1273, 278, '100');
  await lib.setField(page, 1383, 278, '82');
  await lib.tap(page, 700, 780, { settle: 800 });             // deselect
  await lib.pan(page, -160, 0, { from: [600, 700] });         // keep the screen clear of the color popup
  await lib.park(page, 500, 780);
  await lib.sleep(800);
  await lib.snap(page, 'th-setup');
}

export async function main({ page, lib }) {
  await lib.sleep(500);
  // reach the Themes icon from below, so the pointer does not cross the Outline rows (their hover outlines stick)
  await lib.glide(page, 20, 700, 600);
  await lib.click(page, 20, 147, { ms: 800, after: 700 });         // Themes in the sidebar
  await lib.snap(page, 'th-panel');
  await lib.click(page, 210, 195, { ms: 800, after: 1200 });       // the Primary tile
  await lib.snap(page, 'th-popup');
  // drag the hue handle: first a little to the right (pink), then to the left (orange)
  await lib.glide(page, 597, 469, 800);
  await lib.sleep(250);
  await page.mouse.down();
  await lib.sleep(150);
  await lib.park(page, 609, 469);
  await lib.glide(page, 640, 469, 900);
  await lib.snap(page, 'th-pink');
  await lib.sleep(500);
  await lib.glide(page, 428, 469, 2200);
  await lib.sleep(800);
  await page.mouse.up();
  await lib.snap(page, 'th-orange');
  await lib.sleep(500);
  await lib.click(page, 410, 207, { ms: 700, after: 1000 });       // back arrow closes the popup
  await lib.snap(page, 'th-end');
}
