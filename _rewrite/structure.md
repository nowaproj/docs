# New information architecture (v1)

Principles (from `research/reference-ia.md`): follow the user's journey (AI first, visual second, code third);
name sections by goal, pages by task, reference by UI noun; ~13 top-level items, two levels deep (three only for
Supabase/Firebase/REST); every section opens with a written overview; explicit `sidebars.js`.

URL = folder path (routeBasePath `/`). Page types: **O** overview/concept, **T** tutorial, **H** how-to,
**R** reference, **TS** troubleshooting. Research files are in `research/` (`features-<area>.md`).

## Sidebar (top level, in order)

| # | Sidebar label | Folder / URL | Overview page |
|---|---|---|---|
| 0 | Home | `docs/index.mdx` → `/` | home (hero + cards) |
| 1 | Get started | `docs/get-started/` → `/get-started/...` | `welcome` |
| 2 | Build with Nowa AI | `docs/ai/` → `/ai/...` | `ai/index` (`/ai`) |
| 3 | Design your app | `docs/design/` → `/design/...` | `design/index` (`/design`) |
| 4 | Add logic | `docs/logic/` → `/logic/...` | `logic/index` (`/logic`) |
| 5 | Connect data and services | `docs/integrations/` → `/integrations/...` | `integrations/index` |
| 6 | Preview and test | `docs/test/` → `/test/...` | `test/index` |
| 7 | Publish | `docs/publish/` → `/publish/...` | `publish/index` |
| 8 | Work with code | `docs/code/` → `/code/...` | `code/index` |
| 9 | Projects and account | `docs/account/` → `/account/...` | `account/index` |
| 10 | Troubleshooting | `docs/troubleshooting/` → `/troubleshooting/...` | `troubleshooting/index` |
| 11 | Reference | `docs/reference/` → `/reference/...` | (no overview; items listed) |
| 12 | What's new | `docs/new/` (unchanged URLs) | What's New |
| 13 | Legacy tutorials | `docs/legacy/` → `/legacy/...` | `legacy/index` |

Pages per section: see `pages.md` (the page list with status, sources and must-cover items).
