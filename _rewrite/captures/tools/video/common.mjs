// Unrecorded setup helpers shared by the scenarios (fast, no gliding).
export const TITLE = [940, 231];            // home screen title bar on a fresh load
export const ROW = { first: 270, fourth: 450 };   // picker result rows (60 px apart)

/** Selects the screen, opens the picker, types a query, drags the result row onto the board. */
export async function addWidget(page, lib, query, row, drop) {
  await lib.tap(page, TITLE[0], TITLE[1], { settle: 700 });
  await page.keyboard.press('Control+k');
  await lib.sleep(1300);
  await page.keyboard.type(query, { delay: 90 });
  await lib.sleep(1500);
  await lib.snap(page, 'picker-' + query.replace(/\W+/g, '-'));
  await lib.dragFast(page, [592, row], drop, { steps: 25, settle: 1300 });
}

/** Opens Circuit for the selected Button's On Pressed and adds Show snackbar. */
export async function addSnackbar(page, lib, editXY) {
  await lib.tap(page, editXY[0], editXY[1], { settle: 1800 });        // Edit next to On Pressed
  await page.mouse.move(720, 349, { steps: 6 });
  await lib.sleep(900);
  await lib.tap(page, 720, 349, { settle: 1300 });                    // the + under the top node
  await page.keyboard.type('snack', { delay: 90 });
  await lib.sleep(1500);
  await lib.tap(page, 782, 670, { settle: 1600 });                    // GLOBALS > Show snackbar
}
