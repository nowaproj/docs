
# Release notes

> Here you will find all released features and bug fixes done for each version 

---
## 0.3.7

#### New
- New widgets: PageView, IndexedStack
- Adding bottom navigation bar automatically connects with variables

#### Fixes
- Fix: Problem of the placeholder widget in a group being removed after connecting to a variable
- Fix: default value of variables not being set to the old data of the details proberty 
- Fix: some undo/redo problems 

## 0.3.6

#### New
- New widgets: Bottom navigation bar, Drawer, ListTile, ListView, InkWell, Material
- Changed the default sizes for new widgets to be more accurate
- Adding text with the text tool now directly modifies the text
- Fullscreen mode when simulate
- Added refresh button to simulate
- Changed default board color white
- Added arrows shortcut to move objects on the board

#### Fixes
- Fix: Copying maintains layout
- Fix: Drag and drop in the outline
- Fix: Some web images did not work

## 0.3.5

#### New
- Added spacing to row/columns
- Added ungroup option
- Added menus on the menu bar
- Added paste option to the board context menu
- If the widget is corrupted an error widget will appear on the board
- Status bar shows if there are unsaved changes or all saved
- Auto detects spacing & order when converting from stack to column/row

#### Fixes
- Fix: Reordering wrappers
- Fix: Add widget button
- Fix: Creating a group matches the parent group options
- Fix: Shortcuts stick
- Fix: Ability to modify layout for multiple widgets in the same time
- Fix: Constraints work with drag and drop with all different
- Fix: resizing one axis doesn't break the layout of the other axis