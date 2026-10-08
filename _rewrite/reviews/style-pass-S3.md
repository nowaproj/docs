| page | what changed | to check |
|---|---|---|
| guides/index.md | Left as is (already meets the brief) | none |
| guides/complete-app.md | "You should see your sample recipes" to "The result lists your sample recipes" (no hedge); the rest already meets the brief | Step 5.2 now states the outcome plainly: confirm **Run** on `getAllRecipes` lists the three sample recipes in the result area (it does if the sample rows and the read policy from the Supabase prompt exist) |
| guides/design-tips.md | "There is no button" to "There's no button"; the rest already meets the brief | none |
| guides/ai-tips.md | "The selected widget is attached..." to "Nowa attaches the selected widget..." (active voice); "(up to 5,000 characters)" moved next to **Custom Instructions**; the rest already meets the brief | none |
| guides/data-and-state-tips.md | Contractions ("they're empty", "That's what"); split the empty-list instruction sentence in two (same steps, same order) | none |
| integrations/show-data.md | Contractions only ("it's usually the easier way", "That's why", "By default it's" twice) | none |
| integrations/rest-api/index.md | "There is no" to "There's no"; split the long **Base URL** warning sentence in two (same facts); tables and steps untouched | none |
| integrations/rest-api/import.md | "so there is no need to click **Import**" to "so you don't need to click **Import**"; split the 39-word "Nowa names the collection..." sentence in two (one request per endpoint, then **Base URL**) | none |
| integrations/supabase/connect.md | "Their status is shown under the name" to "appears under the name"; step 5 "set them up: see" to "set them up (see ...)"; tables untouched | none |
| integrations/supabase/auth.md | "Here is" to "Here's"; step 1 "...a button: see" and "...template picker: see" to "(see ...)"; the rest already meets the brief | none |
| integrations/supabase/database.md | Split two five-sentence paragraphs (templates, models); "Here is" to "Here's"; "to see real data: see" and "**Get Record by ID**: see" reworded to "To see real data, click **Play**... See" and "... See" | none |
| integrations/supabase/storage.md | "or ask Nowa AI: see" to "or ask Nowa AI. See"; "There are no templates for..." to "No template covers..."; step 6 (download test) reworded so the **File Path** instruction reads clearly (same action, same labels) | none |
| integrations/supabase/backend.md | Contractions ("It's", "what's already", "aren't copied"); split the pull-results paragraph and the Set up Backend paragraph in two; "apply migrations: see" to "apply migrations. See" | none |
| integrations/firebase/connect.md | Left as is (already meets the brief) | The "you  have finished your limits of apps on Firebase" banner keeps the product's exact (double-space) wording on purpose |
| integrations/firebase/firestore.md | Left as is (already meets the brief; tables and steps are facts) | none |
| integrations/firebase/notifications.md | Prerequisite bullet "Have a device or emulator..." to "A device or emulator..." (matches the bullet above); the rest already meets the brief | none |
| integrations/admob.md | Contractions ("doesn't start", "doesn't work", "isn't turned on", "While it's on", "as soon as it's ready"); two "colon, then see/click" sentences split into two; "**Show Test Ads** is on by default; turn it off" split at the semicolon; split the 43-word "No API Keys" sentence in two (same button, same remedy for all three buttons) | none |
| integrations/google-maps.md | Contractions ("don't draw", "doesn't turn them on"); "desktop app: see" to "desktop app. See" | none |
| integrations/deep-links.md | Contractions ("doesn't set up", "doesn't add", "doesn't generate"); "with the desktop app: see" to "with the desktop app. See"; the 3.12.5 note and table untouched | The "may not take effect on iOS" hedge in the Google Sign-In bullet is real uncertainty and was kept |
| integrations/constants.md | "read them: see" to "read them. See"; "are not listed" to "aren't listed"; the rest already meets the brief | none |
| publish/index.md | "publish checklist: it covers" to "publish checklist. It covers"; tables, steps and badges untouched (already meets the brief) | none |
| publish/web.md | "higher plan: see pricing" to "higher plan. See pricing"; the rest already meets the brief | none |
| publish/builds.md | Left as is (already meets the brief) | none |
| publish/download-code.md | "install Flutter first: see" to "first. See"; "there is nothing" to "there's nothing"; the rest already meets the brief | none |
| design/boards.md | Contractions in the loose-widgets bullet ("They're saved", "they're not part of your app"); the rest already meets the brief | none |
| logic/navigation.md | Light tightening only: five "colon, then see" sentences became two sentences ("...Details. See", "...first. See", "...expression. See", "...New Router System. See"); "Also set up..." paragraph now puts the **Builder** link after the sentence it supports; the long Navigator-row sentence split into short actions (same order, "then" dropped); "signed-in people", "It's plain text", "if it's text". The page is mostly steps, tables and facts (about 1,360 words of prose, tables excluded), so I found nothing else to cut without losing a step or fact | none |
| (guard run) | `style-guard.py 4149fec` on guides, integrations, publish, design/boards.md and logic/navigation.md: pages flagged 0 after the last edit; all 26 pages also compile as MDX (checked with @mdx-js/mdx, not a site build) and keep valid front matter | none |
