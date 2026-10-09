# UI differences found while re-taking screenshots in Nowa 3.13.0

One row per place where the docs text no longer matches the 3.13 UI (renamed label, moved control). The capture id is the screenshot that shows the real 3.13 UI.

| page | text says | 3.13 UI shows | capture id |
|---|---|---|---|
| docs/logic/global-state.md | "Open **Files** in the sidebar. Next to the `lib` folder, click **+** (**Add to library**), then **New Global State...**" and "In **Files**, double-click the global state's file" | The designer sidebar has no **Files** icon. Open **Library** (2nd icon), click **+** (tooltip **Add**) in its header, then **New Global State...** (the menu also has New Widget..., New Folder..., New Model..., Generate Models From Json..., API Collection..., Import Dart code..., Upload Assets...). The new file is hidden by the default **Widgets** filter: choose **Everything** (filter button) to list it, then double-click it | logic-global-state-1 |
| docs/logic/models.md | "Open **Files** in the sidebar. Next to the `lib` folder, click **+** (**Add to library**), then **New Model...**" (also **Generate Models From Json...**) and "In **Files**, double-click the model's file" | Same as above: **Library** → **+** (**Add**) → **New Model...** or **Generate Models From Json...**; the file sits under `models` once the filter is **Everything** or **Models**, then double-click it | logic-models-1 |
