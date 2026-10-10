// design-layout-video: change alignment and spacing of a column of widgets and watch the layout update.
const SHAPE = [875, 847];                 // toolbar: Shape
export async function setup({ page, lib }) {
  // pan the board left first, so the whole column will sit clear of the Details panel (nothing has focus yet)
  await lib.pan(page, -300, 0);
  // three containers drawn inside the home screen (now at x 582-975)
  for (const y of [330, 430, 530]) {
    await lib.tap(page, ...SHAPE, { settle: 500 });
    await lib.dragFast(page, [635, y], [735, y + 60]);
  }
  // marquee-select them, group, make the group a Column
  await lib.dragFast(page, [605, 305], [800, 640]);
  await page.keyboard.press('Control+g');
  await lib.sleep(1000);
  await lib.tap(page, 1400, 507, { settle: 900 });          // Group header: Column (down arrow)
  await lib.setField(page, 1273, 350, '300');               // W
  await lib.setField(page, 1384, 350, '420');               // H
  // start from the centered alignment (the breadcrumb says Stack while the alignment is the default top-center)
  await lib.tap(page, 1353, 599, { settle: 1000 });
  await lib.park(page, 700, 780);                          // rest the pointer on empty board (no tooltip)
  await lib.sleep(800);
  await lib.snap(page, 'layout-setup');
}
export async function main({ page, lib }) {
  const cells = { l: 1314, c: 1353, r: 1392, t: 575, m: 599, b: 623 };   // 3 x 3 Alignment grid
  await lib.sleep(1100);
  await lib.click(page, cells.r, cells.b, { ms: 900, after: 1400 });     // bottom right
  await lib.click(page, cells.l, cells.t, { ms: 800, after: 1400 });     // top left
  await lib.click(page, 1353, 700, { ms: 700, after: 800 });             // Spacing dropdown
  await lib.click(page, 1313, 723, { ms: 500, after: 1500 });            // Between
  await lib.click(page, cells.c, cells.m, { ms: 700, after: 1600 });     // center
  await lib.snap(page, 'layout-end');
}
