// design-add-widgets-video: open the widget picker with Ctrl/Cmd+K, search, drag a widget onto a screen.
export async function setup({ page, lib }) {
  await lib.park(page, 640, 640);
}
export async function main({ page, lib }) {
  const t0 = Date.now();
  const T = (m) => console.log(`  [${((Date.now() - t0) / 1000).toFixed(1)}s] ${m}`);
  await lib.sleep(700); T('start');
  await lib.click(page, 940, 231, { ms: 800, after: 600 }); T('selected screen');
  await lib.snap(page, 'aw-selected');
  await lib.key(page, 'Control+k', 'Ctrl / Cmd + K', { after: 1100 }); T('picker opened');
  await lib.snap(page, 'aw-picker');
  await lib.typeSlow(page, 'button', { delay: 130, after: 900 }); T('typed');
  await lib.snap(page, 'aw-typed');
  await lib.drag(page, [592, 450], [1010, 530], { approach: 700, pre: 400, ms: 1100, hold: 200, after: 900 }); T('dropped');
  await lib.snap(page, 'aw-dropped');
  await lib.sleep(1500); T('end');
}
