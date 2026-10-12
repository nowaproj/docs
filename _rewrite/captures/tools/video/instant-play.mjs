// test-instant-play-video: play a screen on the board, tap through it, stop.
import { addWidget, addSnackbar } from './common.mjs';
const FIELD = [838, 221];      // tap targets while the screen plays (board zoomed to fit)
const BUTTON = [838, 302];
export async function setup({ page, lib }) {
  await addWidget(page, lib, 'text field', 270, [960, 340]);
  await addWidget(page, lib, 'button', 450, [960, 440]);
  await addSnackbar(page, lib, [1340, 801]);                 // Edit next to On Pressed (Button selected by drop)
  await lib.snap(page, 'ip-setup-2');
  await lib.tap(page, 1096, 168, { settle: 1000 });          // close Circuit
  await lib.tap(page, 700, 700, { settle: 700 });            // deselect
  await lib.park(page, 640, 640);
}
export async function main({ page, lib }) {
  await lib.sleep(600);
  await lib.glide(page, 940, 231, 800);                      // hover the title bar: the play button appears
  await lib.sleep(400);
  await lib.click(page, 986, 231, { ms: 350, after: 3000 }); // Play
  await lib.click(page, ...FIELD, { ms: 800, after: 500 });   // focus the text field
  await lib.typeSlow(page, 'Hello Nowa', { delay: 100, after: 600 });
  await lib.snap(page, 'ip-typed');
  await lib.click(page, ...BUTTON, { ms: 700, after: 1800 }); // tap the button: snackbar
  await lib.snap(page, 'ip-snack');
  await lib.click(page, 1022, 846, { ms: 800, after: 1100 }); // Stop
}
