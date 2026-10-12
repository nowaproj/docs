// design-add-widgets-video: open the widget picker (Ctrl/Cmd+K), search, drop a widget onto a screen.
export async function setup({ page, lib }) {
  await lib.park(page, 640, 640);
}
export async function main({ page, lib }) {
  const t0 = Date.now();
  const T = (m) => console.log(`  [${((Date.now() - t0) / 1000).toFixed(1)}s] ${m}`);
  await lib.sleep(900); T('start');
  await lib.click(page, 940, 231, { ms: 800, after: 700 }); T('selected screen');
  await lib.key(page, 'Control+k', 'Ctrl / Cmd + K', { after: 1200 }); T('picker opened');
  await lib.typeSlow(page, 'button', { delay: 140, after: 1200 }); T('typed');
  await lib.drag(page, [592, 450], [1000, 540], { approach: 800, pre: 600, ms: 1000, after: 900 }); T('dropped');
  await lib.sleep(2300); T('end');
}
