// logic-circuit-video: open Circuit for On Pressed and add a Show snackbar node.
import { addWidget } from './common.mjs';
export async function setup({ page, lib }) {
  await addWidget(page, lib, 'button', 450, [960, 540]);     // a Button on the screen, selected by the drop
  await lib.tap(page, 20, 67, { settle: 1000 });               // close the left panel: the board stays light behind Circuit
  await lib.park(page, 640, 700);
  await lib.sleep(600);
  await lib.snap(page, 'cv-setup');
}
export async function main({ page, lib }) {
  await lib.sleep(500);
  await lib.click(page, 1340, 841, { ms: 800, after: 1800 });       // Edit next to On Pressed
  await lib.snap(page, 'cv-open');
  await lib.glide(page, 720, 349, 700);                              // the dot under the top node
  await lib.sleep(900);                                              // it grows into +
  await lib.snap(page, 'cv-plus');
  await lib.click(page, 720, 349, { ms: 120, before: 150, after: 900 });   // the + opens the add-node menu
  await lib.glide(page, 560, 520, 500);                              // pointer off the menu title
  await lib.snap(page, 'cv-menu');
  await lib.sleep(400);
  await lib.typeSlow(page, 'snack', { delay: 140, after: 1400 });
  await lib.snap(page, 'cv-typed');
  await lib.click(page, 782, 670, { ms: 700, after: 2200 });         // GLOBALS > Show snackbar
  await lib.snap(page, 'cv-node');
}
