# Media inventory

Source: `/home/user/docs` (branch `docs-rewrite`), 2026-10-06. Researcher: current-docs inventory agent.
Scope: every image, video and embed referenced by a live page under `docs/` (134 pages), parsed from Markdown images
(`![](...)`), `<video><source src>` and `<iframe src>` (no page uses `<img>` or `require()`). Paths in the "used by"
column are `page:line` relative to the docs repo root.

## Summary

| Area | Files | Used by live pages | Unused |
|---|---|---|---|
| `static/img/` | 259 | 142 (79 png, 51 mp4, 9 jpg, 3 gif); plus `favicon.ico` and `logo.svg` used by `docusaurus.config.js` | 115 |
| `static/videos/` | 109 | 96 (96 mp4) | 13 |
| Images next to pages (`docs/**/img/`) | 116 | 82 (67 gif, 15 png) | 34 |
| External embeds | - | 23 YouTube, 11 Arcade (in 25 pages) | - |

- 320 distinct local files are used, each by exactly one page. Every reference resolves to an existing
  file with the exact case (no missing media).
- All 147 videos are MP4 and pass `scripts/check-videos.mjs`; 51 of them live under `static/img/` (circuit, designer, git,
  vars-params-functions) rather than `static/videos/`.
- Unused: 162 files (115 in `static/img`, 13 in `static/videos`, 34 next to pages), including every `.webm` (9) and `.mkv` (1)
  file and three non-media files (`static/img/gifs/ex.txt`, `static/img/images/test.txt`,
  `static/img/designer/create-screen.gif.md`). Whole folders unused: `static/img/gifs/` (27), `static/img/images/` (28),
  `static/img/nowadesktop/diff/` (3), `docs/data-connections/supabase/img/` (9).
- Not media, out of scope: `static/old_versions/` (9 `.md` files, untouched per D7) and `static/CNAME`.
- Most media shows pre-3.9/3.10 UI (Files panel, top toolbar, old deployment settings); see `current-docs.md` for
  which pages What's New contradicts. The images in `docs/ui/themes/img/`, `docs/ui/widgets/widget-desc/img/`,
  `docs/ui/wrappers/img/`, `docs/ui/layout/img/` and `static/img/circuit/` were committed on 2025-06-26, before
  Nowa 3.0 (4 Aug 2025).

## Site-level assets

| File | Used by | Note |
|---|---|---|
| `static/img/favicon.ico` | `docusaurus.config.js` (`favicon`) | |
| `static/img/logo.svg` | `docusaurus.config.js` (navbar logo) | |
| `img/nowa_icon.png` | `docusaurus.config.js` (`themeConfig.image`, social card) | **Missing file**: `og:image` points to a 404. |
| `static/img/undraw-docusaurus-{mountain,react,tree}.svg`, `static/img/docusaurus.png` | nothing | Template leftovers. `src/components/HomepageFeatures` (unused) requires `undraw_docusaurus_*.svg` with underscores, which do not exist. |

## Used files: `static/img/` (142)

Paths relative to `static/img/` (URL `/img/...`).

| File | Used by (page:line) |
|---|---|
| `ai/prompt1.png` | `docs/ai/exampleprompts.mdx:70` |
| `ai/prompt2.png` | `docs/ai/exampleprompts.mdx:108` |
| `ai/warning.png` | `docs/ai/howtouseai.mdx:196` |
| `ai/warning2.png` | `docs/ai/howtouseai.mdx:198` |
| `android_deploy/1.png` | `docs/deployment/android-deploy.md:22` |
| `android_deploy/2.png` | `docs/deployment/android-deploy.md:26` |
| `android_deploy/3.png` | `docs/deployment/android-deploy.md:44` |
| `android_deploy/4.png` | `docs/deployment/android-deploy.md:76` |
| `android_deploy/5.png` | `docs/deployment/android-deploy.md:90` |
| `android_deploy/6.png` | `docs/deployment/android-deploy.md:94` |
| `api2/post/collectionsettings.png` | `docs/data-connections/api/createapi.md:20` |
| `api2/post/model.jpg` | `docs/data-connections/api/Openrouter.md:210` |
| `api2/post/value.jpg` | `docs/data-connections/api/Openrouter.md:212` |
| `app.png` | `docs/getting-started/install.md:87` |
| `checkprojectlocalorcloud.jpg` | `docs/local-project-simulator/whylocalproject.md:26` |
| `circuit/common-functionalities/media-picker/build-logic.mp4` | `docs/logic/common-functionalities/media-picker.md:65` |
| `circuit/common-functionalities/media-picker/final-result.mp4` | `docs/logic/common-functionalities/media-picker.md:113` |
| `circuit/common-functionalities/media-picker/set-image-bytes.mp4` | `docs/logic/common-functionalities/media-picker.md:25` |
| `circuit/common-functionalities/navigation/navigate-with-param.mp4` | `docs/logic/common-functionalities/navigation.md:56` |
| `circuit/common-functionalities/navigation/navigator-push-await.mp4` | `docs/logic/common-functionalities/navigation.md:136` |
| `circuit/common-functionalities/navigation/pop.mp4` | `docs/logic/common-functionalities/navigation.md:155` |
| `circuit/common-functionalities/navigation/push-with-await.png` | `docs/logic/common-functionalities/navigation.md:126` |
| `circuit/common-functionalities/others/checkplatform.mp4` | `docs/logic/common-functionalities/platform-checking.md:41` |
| `circuit/common-functionalities/others/openurl.png` | `docs/logic/common-functionalities/open-url.md:34` |
| `circuit/common-functionalities/print/print-custom-expression.mp4` | `docs/logic/common-functionalities/print.md:165` |
| `circuit/common-functionalities/print/print-with-var.mp4` | `docs/logic/common-functionalities/print.md:79` |
| `circuit/common-functionalities/print/print.mp4` | `docs/logic/common-functionalities/print.md:49` |
| `circuit/control-flow/if/dropping-if.mp4` | `docs/logic/control-flow/if-statement.mdx:23` |
| `circuit/control-flow/if/if-with-variable.mp4` | `docs/logic/control-flow/if-statement.mdx:102` |
| `circuit/control-flow/if/ifstatement-sections.png` | `docs/logic/control-flow/if-statement.mdx:62` |
| `circuit/control-flow/if/nested-if.png` | `docs/logic/control-flow/if-statement.mdx:34` |
| `circuit/control-flow/if/operator-with-if.mp4` | `docs/logic/control-flow/if-statement.mdx:153` |
| `circuit/control-flow/if/toggle-condition.png` | `docs/logic/control-flow/if-statement.mdx:90` |
| `circuit/control-flow/try/adding-try.mp4` | `docs/logic/control-flow/try-catch.mdx:90` |
| `circuit/control-flow/try/try-catch.png` | `docs/logic/control-flow/try-catch.mdx:34` |
| `circuit/intro/add-nodes.png` | `docs/logic/intro-circuit.md:23` |
| `circuit/intro/load-data-example.png` | `docs/logic/intro-circuit.md:42` |
| `circuit/ui-popups/date-picker/await-date-picker.png` | `docs/logic/ui-popups/date-picker.md:53` |
| `circuit/ui-popups/date-picker/datapicker-full-example.mp4` | `docs/logic/ui-popups/date-picker.md:83` |
| `circuit/ui-popups/date-picker/date-picker-future.png` | `docs/logic/ui-popups/date-picker.md:47` |
| `circuit/ui-popups/dialog/show-basic-dialog.mp4` | `docs/logic/ui-popups/dialog.md:54` |
| `circuit/ui-popups/dialog/showdialog-options.png` | `docs/logic/ui-popups/dialog.md:64` |
| `circuit/ui-popups/snackbar/reset-to-default.mp4` | `docs/logic/ui-popups/snackbar.md:80` |
| `circuit/ui-popups/snackbar/show-snackbar.mp4` | `docs/logic/ui-popups/snackbar.md:43` |
| `circuit/ui-popups/snackbar/snackbar-custom-expression.mp4` | `docs/logic/ui-popups/snackbar.md:111` |
| `circuit/ui-popups/snackbar/snackbar-properties.png` | `docs/logic/ui-popups/snackbar.md:71` |
| `circuit/ui-popups/time-picker/time-picker-using-onvalue.mp4` | `docs/logic/ui-popups/time-picker.md:119` |
| `circuit/ui-popups/time-picker/time-picker.mp4` | `docs/logic/ui-popups/time-picker.md:93` |
| `circuit/ui-popups/time-picker/timeofday-options.png` | `docs/logic/ui-popups/time-picker.md:78` |
| `circuit/ui-popups/time-picker/timepicker-options.png` | `docs/logic/ui-popups/time-picker.md:55` |
| `designer/Clipboard-20251002-070855-035.mp4` | `docs/ui/widget-panel.md:32` |
| `designer/Clipboard-20251002-071748-744.mp4` | `docs/ui/assets.md:31` |
| `designer/Clipboard-20251002-072320-787.mp4` | `docs/ui/layout/groups.mdx:39` |
| `designer/Clipboard-20251002-072720-043.mp4` | `docs/ui/temlpates.mdx:25` |
| `designer/Clipboard-20251002-074122-268.mp4` | `docs/ui/outline.md:43` |
| `designer/Clipboard-20251002-101128-422.mp4` | `docs/ui/screens.md:24` |
| `designer/Clipboard-20251002-103334-808.mp4` | `docs/ui/components.md:48` |
| `designer/Clipboard-20251002-104038-822.mp4` | `docs/ui/components.md:84` |
| `designer/Clipboard-20251002-104325-541.mp4` | `docs/ui/components.md:104` |
| `designer/Clipboard-20251002-105437-071.mp4` | `docs/ui/boards.mdx:44` |
| `designer/Pasted-image-20251001095652.png` | `docs/ui/assets.md:17` |
| `designer/Pasted-image-20251001100204.png` | `docs/ui/toolbar.md:10` |
| `designer/alignment-3.gif` | `docs/ui/layout/rows-and-columns.md:36` |
| `designer/alignment-9.gif` | `docs/ui/layout/rows-and-columns.md:29` |
| `designer/button.png` | `docs/ui/widgets/widget-desc/button.md:13` |
| `designer/direction.png` | `docs/ui/layout/rows-and-columns.md:12` |
| `designer/reordering.gif` | `docs/ui/layout/rows-and-columns.md:80` |
| `designer/screens-details-panel-1.png` | `docs/ui/screens.md:73` |
| `designer/screens-pages.png` | `docs/ui/screens.md:51` |
| `designer/sizing-options.png` | `docs/ui/layout/rows-and-columns.md:60` |
| `exploreinterface/ai.png` | `docs/getting-started/exploreinterface.mdx:67` |
| `exploreinterface/api.png` | `docs/getting-started/exploreinterface.mdx:75` |
| `exploreinterface/circle.png` | `docs/getting-started/exploreinterface.mdx:154` |
| `exploreinterface/files.png` | `docs/getting-started/exploreinterface.mdx:87` |
| `exploreinterface/simulator.png` | `docs/getting-started/exploreinterface.mdx:109` |
| `exploreinterface/supabase.png` | `docs/getting-started/exploreinterface.mdx:117` |
| `exploreinterface/theme.png` | `docs/getting-started/exploreinterface.mdx:128` |
| `firebase/android.png` | `docs/data-connections/firebase/notification.md:63` |
| `firebase/ios.png` | `docs/data-connections/firebase/notification.md:59` |
| `git/add-token.mp4` | `docs/git/token-github.md:92` |
| `git/clone-github-cloud.mp4` | `docs/git/clone-from-cloud.md:40` |
| `git/connect-github.png` | `docs/git/token-github.md:23` |
| `git/create-branch.mp4` | `docs/git/git-operations-cloud.md:153` |
| `git/create-repo-github.mp4` | `docs/git/clone-from-cloud.md:59` |
| `git/discard.mp4` | `docs/git/git-operations-cloud.md:98` |
| `git/generate-token.mp4` | `docs/git/token-github.md:48` |
| `git/git-committing.mp4` | `docs/git/git-operations-cloud.md:40` |
| `git/git-setup-explanation.png` | `docs/git/intro-git.md:31` |
| `git/newvschange.png` | `docs/git/git-operations-cloud.md:29` |
| `git/numberofsync.png` | `docs/git/git-operations-cloud.md:65` |
| `git/push-cloud-to-remote.mp4` | `docs/git/clone-from-cloud.md:85` |
| `git/staged-changes.mp4` | `docs/git/git-operations-cloud.md:125` |
| `nowadesktop/1.png` | `docs/local-project-simulator/createlocalproject.md:110` |
| `nowadesktop/2.png` | `docs/local-project-simulator/createlocalproject.md:111` |
| `nowadesktop/autosetup/1.png` | `docs/local-project-simulator/createlocalproject.md:63` |
| `nowadesktop/autosetup/2.png` | `docs/local-project-simulator/createlocalproject.md:67` |
| `nowadesktop/autosetup/3.png` | `docs/local-project-simulator/createlocalproject.md:71` |
| `nowadesktop/autosetup/4.png` | `docs/local-project-simulator/createlocalproject.md:75` |
| `nowadesktop/autosetup/5.png` | `docs/local-project-simulator/createlocalproject.md:78` |
| `nowadesktop/autosetup/6.png` | `docs/local-project-simulator/createlocalproject.md:82` |
| `nowadesktop/autosetup/7.png` | `docs/local-project-simulator/createlocalproject.md:85` |
| `nowadesktop/createlocalproject/1.png` | `docs/local-project-simulator/createlocalproject.md:135` |
| `nowadesktop/createlocalproject/2.png` | `docs/local-project-simulator/createlocalproject.md:138` |
| `nowadesktop/createlocalproject/3.png` | `docs/local-project-simulator/createlocalproject.md:141` |
| `nowadesktop/createlocalproject/4.png` | `docs/local-project-simulator/createlocalproject.md:147` |
| `nowadesktop/createlocalproject/5.png` | `docs/local-project-simulator/createlocalproject.md:150` |
| `nowadesktop/createlocalproject/6.png` | `docs/local-project-simulator/createlocalproject.md:151` |
| `nowadesktop/createlocalproject/7.png` | `docs/local-project-simulator/createlocalproject.md:154` |
| `openexistinglocalproject.jpg` | `docs/local-project-simulator/openexisting.md:22` |
| `signup/1.png` | `docs/getting-started/install.md:20` |
| `signup/after/1.png` | `docs/getting-started/install.md:69` |
| `signup/email/1.jpg` | `docs/getting-started/install.md:32` |
| `signup/email/2.jpg` | `docs/getting-started/install.md:36` |
| `signup/email/3.png` | `docs/getting-started/install.md:40` |
| `signup/google/1.png` | `docs/getting-started/install.md:58` |
| `signup/google/2.jpg` | `docs/getting-started/install.md:59` |
| `startedproject.png` | `docs/getting-started/exploreinterface.mdx:15` |
| `stripe/enable-stripe.png` | `docs/payments/stripe/stripe-integration.md:35` |
| `stripe/map-fields.png` | `docs/payments/stripe/stripe-integration.md:186` |
| `stripe/product-table.png` | `docs/payments/stripe/stripe-integration.md:172` |
| `stripe/supabase-tables.png` | `docs/payments/stripe/stripe-integration.md:200` |
| `supabase/editcode.png` | `docs/data-connections/supabase/db.md:169` |
| `supabase/insert2.png` | `docs/data-connections/supabase/streams.md:48` |
| `supabase/manual.jpg` | `docs/data-connections/supabase/connect-supabase.md:71` |
| `supabase/queries.png` | `docs/data-connections/supabase/db.md:161` |
| `supabase/storage.jpg` | `docs/data-connections/supabase/storage.md:71` |
| `supabase/stream2.png` | `docs/data-connections/supabase/streams.md:43` |
| `supabase/supabase_mcp.png` | `docs/data-connections/supabase/mcp.md:33` |
| `vars-params-functions/data-models/create-instance-from-model.mp4` | `docs/vars-params-functions/data-models.md:140` |
| `vars-params-functions/data-models/create-model.mp4` | `docs/vars-params-functions/data-models.md:37` |
| `vars-params-functions/data-models/create-vars-inside-model.mp4` | `docs/vars-params-functions/data-models.md:75` |
| `vars-params-functions/data-models/model-as-datatype.mp4` | `docs/vars-params-functions/data-models.md:115` |
| `vars-params-functions/data-models/see-code.mp4` | `docs/vars-params-functions/data-models.md:94` |
| `vars-params-functions/global-state/add-to-cart-function.mp4` | `docs/vars-params-functions/global-states.md:134` |
| `vars-params-functions/global-state/add-to-global-state.mp4` | `docs/vars-params-functions/global-states.md:72` |
| `vars-params-functions/global-state/adding-global-state.mp4` | `docs/vars-params-functions/global-states.md:96` |
| `vars-params-functions/global-state/connecting-to-global-state.mp4` | `docs/vars-params-functions/global-states.md:114` |
| `vars-params-functions/global-state/create-global-state.mp4` | `docs/vars-params-functions/global-states.md:46` |
| `vars-params-functions/global-state/use-add-to-cart.mp4` | `docs/vars-params-functions/global-states.md:185` |
| `whats_new/Nowa-3.10.5-Mobile.png` | `docs/new/whats-new.md:175` |
| `whats_new/Nowa-Gemini-3.7-Flash.png` | `docs/new/whats-new.md:150` |
| `whats_new/nowa3_1.png` | `docs/new/whats-new.md:609` |

## Used files: `static/videos/` (96)

Paths relative to `static/videos/` (URL `/videos/...`).

| File | Used by (page:line) |
|---|---|
| `ai/attach.mp4` | `docs/ai/howtouseai.mdx:107` |
| `ai/chathistory.mp4` | `docs/ai/howtouseai.mdx:184` |
| `ai/chatinstruction.mp4` | `docs/ai/howtouseai.mdx:73` |
| `ai/credits2.mp4` | `docs/ai/howtouseai.mdx:37` |
| `ai/image.mp4` | `docs/ai/howtouseai.mdx:123` |
| `ai/newchat.mp4` | `docs/ai/howtouseai.mdx:169` |
| `ai/nonthink.mp4` | `docs/ai/howtouseai.mdx:57` |
| `ai/openai.mp4` | `docs/ai/howtouseai.mdx:17` |
| `ai/revert.mp4` | `docs/ai/howtouseai.mdx:154` |
| `ai/target.mp4` | `docs/ai/howtouseai.mdx:94` |
| `ai/text.mp4` | `docs/ai/howtouseai.mdx:139` |
| `ai/think.mp4` | `docs/ai/howtouseai.mdx:52` |
| `api/swagger-file.mp4` | `docs/data-connections/api/importapi/swagger.md:54` |
| `api/swagger-json.mp4` | `docs/data-connections/api/importapi/swagger.md:38` |
| `api/swagger-url.mp4` | `docs/data-connections/api/importapi/swagger.md:22` |
| `api2/collection/create.mp4` | `docs/data-connections/api/createapi.md:34` |
| `api2/collection/header.mp4` | `docs/data-connections/api/createapi.md:78` |
| `api2/collection/url.mp4` | `docs/data-connections/api/createapi.md:50` |
| `api2/import/postman-export.mp4` | `docs/data-connections/api/importapi/postman.md:18` |
| `api2/import/postman-json.mp4` | `docs/data-connections/api/importapi/postman.md:31` |
| `api2/import/postman-json2.mp4` | `docs/data-connections/api/importapi/postman.md:46` |
| `api2/import/xano1.mp4` | `docs/data-connections/api/importapi/xano.md:17` |
| `api2/import/xano2.mp4` | `docs/data-connections/api/importapi/xano.md:32` |
| `api2/post/1.mp4` | `docs/data-connections/api/Openrouter.md:23` |
| `api2/post/10.mp4` | `docs/data-connections/api/Openrouter.md:195` |
| `api2/post/11.mp4` | `docs/data-connections/api/Openrouter.md:234` |
| `api2/post/12.mp4` | `docs/data-connections/api/Openrouter.md:251` |
| `api2/post/2.mp4` | `docs/data-connections/api/Openrouter.md:39` |
| `api2/post/3.mp4` | `docs/data-connections/api/Openrouter.md:59` |
| `api2/post/4.mp4` | `docs/data-connections/api/Openrouter.md:88` |
| `api2/post/5.mp4` | `docs/data-connections/api/Openrouter.md:101` |
| `api2/post/6.mp4` | `docs/data-connections/api/Openrouter.md:130` |
| `api2/post/7.mp4` | `docs/data-connections/api/Openrouter.md:141` |
| `api2/post/8.mp4` | `docs/data-connections/api/Openrouter.md:159` |
| `api2/post/9.mp4` | `docs/data-connections/api/Openrouter.md:175` |
| `api2/request/1.mp4` | `docs/data-connections/api/createapi.md:102` |
| `api2/request/3.mp4` | `docs/data-connections/api/createapi.md:122` |
| `api2/request/4.mp4` | `docs/data-connections/api/createapi.md:147` |
| `api2/request/5.mp4` | `docs/data-connections/api/createapi.md:161` |
| `deployment/web-opening-link.mp4` | `docs/deployment/web-deploy.mdx:52` |
| `deployment/web-publishing.mp4` | `docs/deployment/web-deploy.mdx:36` |
| `desktopversion/Download.mp4` | `docs/local-project-simulator/createlocalproject.md:31` |
| `firebase/1.mp4` | `docs/data-connections/firebase/notification.md:22` |
| `firebase/2.mp4` | `docs/data-connections/firebase/notification.md:47` |
| `getting-started/create-cloud.mp4` | `docs/getting-started/install.md:128` |
| `getting-started/createworkspace.mp4` | `docs/getting-started/install.md:98` |
| `getting-started/properties.mp4` | `docs/getting-started/exploreinterface.mdx:42` |
| `getting-started/toolbar.mp4` | `docs/getting-started/exploreinterface.mdx:28` |
| `getting-started/variable.mp4` | `docs/getting-started/exploreinterface.mdx:57` |
| `getting-started/widgets.mp4` | `docs/getting-started/exploreinterface.mdx:140` |
| `ios_deploy/bundle_id.mp4` | `docs/deployment/ios-deploy.md:43` |
| `ios_deploy/create_api_key.mp4` | `docs/deployment/ios-deploy.md:86` |
| `ios_deploy/create_bundle_id.mp4` | `docs/deployment/ios-deploy.md:58` |
| `ios_deploy/start_build.mp4` | `docs/deployment/ios-deploy.md:124` |
| `playmod.mp4` | `docs/getting-started/exploreinterface.mdx:98` |
| `qucikstart/1.mp4` | `docs/getting-started/quickstart.md:23` |
| `qucikstart/2.mp4` | `docs/getting-started/quickstart.md:52` |
| `qucikstart/3.mp4` | `docs/getting-started/quickstart.md:69` |
| `qucikstart/4.mp4` | `docs/getting-started/quickstart.md:84` |
| `simulator/builtinsimulator.mp4` | `docs/local-project-simulator/simulator.md:38` |
| `simulator/simulator.mp4` | `docs/local-project-simulator/simulator.md:68` |
| `supabase/1.mp4` | `docs/data-connections/supabase/connect-supabase.md:26` |
| `supabase/3.mp4` | `docs/data-connections/supabase/connect-supabase.md:96` |
| `supabase/auth/ai.mp4` | `docs/data-connections/supabase/auth.md:20` |
| `supabase/auth/logout.mp4` | `docs/data-connections/supabase/auth.md:201` |
| `supabase/auth/register.mp4` | `docs/data-connections/supabase/auth.md:39` |
| `supabase/auth/signin1.mp4` | `docs/data-connections/supabase/auth.md:135` |
| `supabase/auth/signin2.mp4` | `docs/data-connections/supabase/auth.md:156` |
| `supabase/auth/signin3.mp4` | `docs/data-connections/supabase/auth.md:177` |
| `supabase/auth/try.mp4` | `docs/data-connections/supabase/auth.md:214` |
| `supabase/auth/ui.mp4` | `docs/data-connections/supabase/auth.md:86` |
| `supabase/auth/ui2.mp4` | `docs/data-connections/supabase/auth.md:114` |
| `supabase/connectmanual.mp4` | `docs/data-connections/supabase/connect-supabase.md:83` |
| `supabase/createproject.mp4` | `docs/data-connections/supabase/connect-supabase.md:52` |
| `supabase/db/addtask.mp4` | `docs/data-connections/supabase/db.md:196` |
| `supabase/db/ai.mp4` | `docs/data-connections/supabase/db.md:141` |
| `supabase/db/create.mp4` | `docs/data-connections/supabase/db.md:95` |
| `supabase/db/multiquery.mp4` | `docs/data-connections/supabase/db.md:153` |
| `supabase/db/stream.mp4` | `docs/data-connections/supabase/streams.md:16` |
| `supabase/db/stream2.mp4` | `docs/data-connections/supabase/streams.md:37` |
| `supabase/db/supabaseai.mp4` | `docs/data-connections/supabase/db.md:108` |
| `supabase/db/updatequery.mp4` | `docs/data-connections/supabase/db.md:207` |
| `supabase/db/visual.mp4` | `docs/data-connections/supabase/db.md:117` |
| `supabase/selectproject.mp4` | `docs/data-connections/supabase/connect-supabase.md:60` |
| `supabase/storage/createbucket.mp4` | `docs/data-connections/supabase/storage.md:23` |
| `supabase/storage/createqueries.mp4` | `docs/data-connections/supabase/storage.md:65` |
| `supabase/storage/example.mp4` | `docs/data-connections/supabase/storage.md:86` |
| `supabase/ui/databuilder.mp4` | `docs/data-connections/supabase/ui.md:38` |
| `supabase/ui/item.mp4` | `docs/data-connections/supabase/ui.md:62` |
| `supabase/ui/listview.mp4` | `docs/data-connections/supabase/ui.md:24` |
| `sync/cloud.mp4` | `docs/local-project-simulator/sync.md:59` |
| `sync/local.mp4` | `docs/local-project-simulator/sync.md:48` |
| `sync/sync.mp4` | `docs/local-project-simulator/sync.md:81` |
| `sync/unlink.mp4` | `docs/local-project-simulator/sync.md:96` |
| `templates/chat/dropping-chat-template.mp4` | `docs/tutorials-template/chat-template.mdx:23` |
| `templates/chat/running-template.mp4` | `docs/tutorials-template/chat-template.mdx:34` |

## Used files next to pages: `docs/**/img/` (82)

Webpack bundles these under hashed names, so they have no stable URL.

| File | Used by (page:line) |
|---|---|
| `docs/data-connections/firebase/known-issues/img/firebase-windows.png` | `docs/data-connections/firebase/known-issues/firebase-windows.md:9` |
| `docs/deployment/img/add-app-ios.gif` | `docs/deployment/ios-deploy.md:66` |
| `docs/deployment/img/web-deploy-panel.png` | `docs/deployment/web-deploy.mdx:68` |
| `docs/img/swipingcard.gif` | `docs/new/whats-new.md:1063` |
| `docs/tutorials-template/img/card-column-row.png` | `docs/tutorials-template/design-responsive.md:47` |
| `docs/tutorials-template/img/columns-rows-screen.png` | `docs/tutorials-template/design-responsive.md:38` |
| `docs/tutorials-template/img/different-screens.png` | `docs/tutorials-template/design-responsive.md:19` |
| `docs/ui/img/wrappers.gif` | `docs/ui/wrappers/wrappers-intro.md:32` |
| `docs/ui/layout/img/constraints.gif` | `docs/ui/layout/constrains.md:41` |
| `docs/ui/layout/img/contraints-bg.png` | `docs/ui/layout/constrains.md:12` |
| `docs/ui/layout/img/spacing.png` | `docs/ui/layout/rows-and-columns.md:50` |
| `docs/ui/themes/img/access-style-from-widget.gif` | `docs/ui/themes/typograhies.md:61` |
| `docs/ui/themes/img/add-opacity.gif` | `docs/ui/themes/colors-themes.md:83` |
| `docs/ui/themes/img/button-theme.gif` | `docs/ui/themes/colors-themes.md:93` |
| `docs/ui/themes/img/change-colors.gif` | `docs/ui/themes/colors-themes.md:55` |
| `docs/ui/themes/img/change-styles.gif` | `docs/ui/themes/typograhies.md:41` |
| `docs/ui/themes/img/change-text-typo.gif` | `docs/ui/themes/typograhies.md:57` |
| `docs/ui/themes/img/change-theme-dynamic.gif` | `docs/ui/themes/create-themes.md:70` |
| `docs/ui/themes/img/change-themes.gif` | `docs/ui/themes/create-themes.md:39` |
| `docs/ui/themes/img/colors-from.png` | `docs/ui/themes/colors-themes.md:47` |
| `docs/ui/themes/img/container-theme.gif` | `docs/ui/themes/colors-themes.md:69` |
| `docs/ui/themes/img/copywith.gif` | `docs/ui/themes/typograhies.md:77` |
| `docs/ui/themes/img/create-theme-old.gif` | `docs/ui/themes/create-themes.md:30` |
| `docs/ui/themes/img/detach.gif` | `docs/ui/themes/typograhies.md:85` |
| `docs/ui/themes/img/globals.png` | `docs/ui/themes/create-themes.md:21` |
| `docs/ui/themes/img/typoghraphies.png` | `docs/ui/themes/typograhies.md:23` |
| `docs/ui/widgets/widget-desc/img/add-gradients-container.gif` | `docs/ui/widgets/widget-desc/container.md:85` |
| `docs/ui/widgets/widget-desc/img/add-image-to-container.gif` | `docs/ui/widgets/widget-desc/container.md:53` |
| `docs/ui/widgets/widget-desc/img/add-widget-to-container.gif` | `docs/ui/widgets/widget-desc/container.md:72` |
| `docs/ui/widgets/widget-desc/img/adding-text-widget.gif` | `docs/ui/widgets/widget-desc/text.md:29` |
| `docs/ui/widgets/widget-desc/img/editing-text-widget.gif` | `docs/ui/widgets/widget-desc/text.md:61` |
| `docs/ui/widgets/widget-desc/img/expansion/1.gif` | `docs/ui/widgets/widget-desc/expansion-tile.md:17` |
| `docs/ui/widgets/widget-desc/img/expansion/2.gif` | `docs/ui/widgets/widget-desc/expansion-tile.md:32` |
| `docs/ui/widgets/widget-desc/img/expansion/3.gif` | `docs/ui/widgets/widget-desc/expansion-tile.md:42` |
| `docs/ui/widgets/widget-desc/img/expansion/4.gif` | `docs/ui/widgets/widget-desc/expansion-tile.md:51` |
| `docs/ui/widgets/widget-desc/img/expansion/5.gif` | `docs/ui/widgets/widget-desc/expansion-tile.md:66` |
| `docs/ui/widgets/widget-desc/img/gridview/add-placeholder.gif` | `docs/ui/widgets/widget-desc/gridview.md:34` |
| `docs/ui/widgets/widget-desc/img/gridview/aspect-ratio.gif` | `docs/ui/widgets/widget-desc/gridview.md:65` |
| `docs/ui/widgets/widget-desc/img/gridview/connect-element.gif` | `docs/ui/widgets/widget-desc/gridview.md:109` |
| `docs/ui/widgets/widget-desc/img/gridview/connect-param.gif` | `docs/ui/widgets/widget-desc/gridview.md:88` |
| `docs/ui/widgets/widget-desc/img/gridview/create-list-plants.gif` | `docs/ui/widgets/widget-desc/gridview.md:94` |
| `docs/ui/widgets/widget-desc/img/gridview/create-plant-object.gif` | `docs/ui/widgets/widget-desc/gridview.md:81` |
| `docs/ui/widgets/widget-desc/img/gridview/cross-spacing.gif` | `docs/ui/widgets/widget-desc/gridview.md:55` |
| `docs/ui/widgets/widget-desc/img/gridview/drop-gridview.gif` | `docs/ui/widgets/widget-desc/gridview.md:24` |
| `docs/ui/widgets/widget-desc/img/gridview/fixed-cros-axis.gif` | `docs/ui/widgets/widget-desc/gridview.md:40` |
| `docs/ui/widgets/widget-desc/img/gridview/main-axis-extent.gif` | `docs/ui/widgets/widget-desc/gridview.md:61` |
| `docs/ui/widgets/widget-desc/img/gridview/main-spacing.gif` | `docs/ui/widgets/widget-desc/gridview.md:51` |
| `docs/ui/widgets/widget-desc/img/gridview/max-cross-axis.gif` | `docs/ui/widgets/widget-desc/gridview.md:45` |
| `docs/ui/widgets/widget-desc/img/gridview/normal-gridview.gif` | `docs/ui/widgets/widget-desc/gridview.md:71` |
| `docs/ui/widgets/widget-desc/img/html.gif` | `docs/ui/widgets/widget-desc/html.md:13` |
| `docs/ui/widgets/widget-desc/img/image1.gif` | `docs/ui/widgets/widget-desc/image.md:21` |
| `docs/ui/widgets/widget-desc/img/image2.gif` | `docs/ui/widgets/widget-desc/image.md:49` |
| `docs/ui/widgets/widget-desc/img/linear-progress/change-height.gif` | `docs/ui/widgets/widget-desc/linear-progress-indicator.md:27` |
| `docs/ui/widgets/widget-desc/img/linear-progress/drop-linear.gif` | `docs/ui/widgets/widget-desc/linear-progress-indicator.md:23` |
| `docs/ui/widgets/widget-desc/img/listview/connect-data.gif` | `docs/ui/widgets/widget-desc/listview.md:75` |
| `docs/ui/widgets/widget-desc/img/listview/drop-listview.gif` | `docs/ui/widgets/widget-desc/listview.md:32` |
| `docs/ui/widgets/widget-desc/img/listview/fixed-seperator.gif` | `docs/ui/widgets/widget-desc/listview.md:55` |
| `docs/ui/widgets/widget-desc/img/listview/item-count.gif` | `docs/ui/widgets/widget-desc/listview.md:48` |
| `docs/ui/widgets/widget-desc/img/listview/normal-listview.gif` | `docs/ui/widgets/widget-desc/listview.md:99` |
| `docs/ui/widgets/widget-desc/img/listview/padding.gif` | `docs/ui/widgets/widget-desc/listview.md:91` |
| `docs/ui/widgets/widget-desc/img/listview/reorder-normal.gif` | `docs/ui/widgets/widget-desc/listview.md:115` |
| `docs/ui/widgets/widget-desc/img/listview/replace-placeholder.gif` | `docs/ui/widgets/widget-desc/listview.md:41` |
| `docs/ui/widgets/widget-desc/img/listview/switch-to-builder.gif` | `docs/ui/widgets/widget-desc/listview.md:108` |
| `docs/ui/widgets/widget-desc/img/listview/widget-seperator.gif` | `docs/ui/widgets/widget-desc/listview.md:60` |
| `docs/ui/widgets/widget-desc/img/markdown.gif` | `docs/ui/widgets/widget-desc/markdown.md:19` |
| `docs/ui/widgets/widget-desc/img/modify-container.gif` | `docs/ui/widgets/widget-desc/container.md:33` |
| `docs/ui/widgets/widget-desc/img/overflow.gif` | `docs/ui/widgets/widget-desc/text.md:71` |
| `docs/ui/widgets/widget-desc/img/toolbarshapetool.png` | `docs/ui/widgets/widget-desc/container.md:22` |
| `docs/ui/widgets/widget-desc/img/upload-video@2x.png` | `docs/ui/widgets/widget-desc/video-player.md:28` |
| `docs/ui/widgets/widget-desc/img/videoplayer-overview.png` | `docs/ui/widgets/widget-desc/video-player.md:20` |
| `docs/ui/widgets/widget-desc/img/videoplayer-play.png` | `docs/ui/widgets/widget-desc/video-player.md:56` |
| `docs/ui/widgets/widget-desc/img/videoplayer-showcontroller.gif` | `docs/ui/widgets/widget-desc/video-player.md:45` |
| `docs/ui/wrappers/img/material.gif` | `docs/ui/wrappers/material.md:25` |
| `docs/ui/wrappers/img/opacity.gif` | `docs/ui/wrappers/opacity.md:25` |
| `docs/ui/wrappers/img/padding1.gif` | `docs/ui/wrappers/padding.md:24` |
| `docs/ui/wrappers/img/padding2.gif` | `docs/ui/wrappers/padding.md:30` |
| `docs/ui/wrappers/img/scrollview1.gif` | `docs/ui/wrappers/scrollview.md:29` |
| `docs/ui/wrappers/img/scrollview2.gif` | `docs/ui/wrappers/scrollview.md:33` |
| `docs/ui/wrappers/img/text-direction.gif` | `docs/ui/wrappers/text-direction.md:19` |
| `docs/ui/wrappers/img/visibility.gif` | `docs/ui/wrappers/visibility.md:21` |
| `docs/vars-params-functions/img/change-value-dynamically.gif` | `docs/vars-params-functions/create-variable.mdx:149` |
| `docs/vars-params-functions/img/create-var-from-file-previewer.png` | `docs/vars-params-functions/create-variable.mdx:71` |

## External embeds (34)

| Page | Embeds |
|---|---|
| `docs/data-connections/firebase/firebase-connect.md` | YouTube `ko_f9aDZwMg` (line 21) |
| `docs/data-connections/firebase/firebase-email-auth.md` | YouTube `N_Rqrbp8yMQ` (line 27) |
| `docs/data-connections/firebase/firestore.md` | YouTube `vg4-c-BQCrk` (line 26) |
| `docs/data-connections/supabase/mcp.md` | YouTube `bTy3cnsXDnA` (line 63) |
| `docs/deployment/share.md` | YouTube `ORa4ohpK4pQ` (line 30) |
| `docs/git/git-local.md` | YouTube `i2bmqTUCKfo` (line 12) |
| `docs/local-project-simulator/sync.md` | YouTube `PB260DJZruA` (line 37) |
| `docs/logic/control-flow/if-statement.mdx` | YouTube `8ThDp4Zyqyc` (line 196) |
| `docs/new/whats-new.md` | YouTube `dLsO05crdSk` (line 416); YouTube `CuR6uC32ulE` (line 481) |
| `docs/payments/stripe/stripe-integration.md` | YouTube `L41ak_WGhPQ` (line 13) |
| `docs/tutorials-template/form-validation.md` | YouTube `Spa8d6e8BQ4` (line 18) |
| `docs/tutorials-template/loading-indicator.md` | YouTube `YdMtODwGURw` (line 19) |
| `docs/tutorials-template/splashscreen.md` | YouTube `1Uumpn9Xogo` (line 17) |
| `docs/ui/design-courses/booking-app.md` | YouTube `egbjhuFV86s` (line 11) |
| `docs/ui/design-courses/ecommerce-app.md` | YouTube `Qp-3ylrUOJk` (line 14) |
| `docs/ui/design-courses/football-app.md` | YouTube `-OYzLFvaRbI` (line 14) |
| `docs/ui/design-courses/workout-planner.md` | YouTube `Q7Q8UZ24n4U` (line 17) |
| `docs/ui/widgets/widget-desc/data-builder.md` | YouTube `_ko4iKVXVuA` (line 10) |
| `docs/ui/widgets/widget-desc/listview.md` | YouTube `_ko4iKVXVuA` (line 15) |
| `docs/ui/widgets/widget-desc/navigation-bar.md` | YouTube `RxcwMIzJPgs` (line 11) |
| `docs/vars-params-functions/create-variable.mdx` | Arcade `8KfGmNsSrXCS8jQVkj8P` (line 53); Arcade `tQjbVedk7PYhCOOEjB1I` (line 91); Arcade `gAEdk9d3DDlTvfaJmHLg` (line 111); Arcade `Htem33HnslAwyTdA49Zs` (line 138); Arcade `9hudWvjLxgRudtgEv5wj` (line 162); Arcade `y9S0Muz4uQx7h7fxDD2N` (line 184) |
| `docs/vars-params-functions/data-models.md` | YouTube `cnrIhGEGIeE` (line 173) |
| `docs/vars-params-functions/functions/create-local-function.mdx` | Arcade `GJQqu7f79ijFBBdrJfLf` (line 43) |
| `docs/vars-params-functions/global-states.md` | YouTube `cnrIhGEGIeE` (line 216) |
| `docs/vars-params-functions/local-parameter.mdx` | Arcade `pfZwHD0iv5PGN9m4S9Pv` (line 37); Arcade `1AsVelul8HWr1T5XCc6F` (line 69); Arcade `ZKgdQlch6JFd5GgMEbdq` (line 98); Arcade `xvYbFgj5LEftSHKjbocJ` (line 133) |

## Unused files per folder

### `static/img/`

| Folder | Files | Used (pages or site config) | Unused | Unused files |
|---|---|---|---|---|
| `(root)` | 10 | 6 | 4 | docusaurus.png, undraw-docusaurus-mountain.svg, undraw-docusaurus-react.svg, undraw-docusaurus-tree.svg |
| `ai` | 6 | 4 | 2 | input1.png, think.png |
| `android_deploy` | 6 | 6 | 0 | - |
| `api2/post` | 3 | 3 | 0 | - |
| `circuit/common-functionalities/media-picker` | 3 | 3 | 0 | - |
| `circuit/common-functionalities/navigation` | 4 | 4 | 0 | - |
| `circuit/common-functionalities/others` | 2 | 2 | 0 | - |
| `circuit/common-functionalities/print` | 3 | 3 | 0 | - |
| `circuit/control-flow/if` | 6 | 6 | 0 | - |
| `circuit/control-flow/try` | 2 | 2 | 0 | - |
| `circuit/intro` | 2 | 2 | 0 | - |
| `circuit/ui-popups/date-picker` | 3 | 3 | 0 | - |
| `circuit/ui-popups/dialog` | 2 | 2 | 0 | - |
| `circuit/ui-popups/snackbar` | 4 | 4 | 0 | - |
| `circuit/ui-popups/time-picker` | 4 | 4 | 0 | - |
| `designer` | 63 | 20 | 43 | Clipboard-20250416-075551-762.gif, Clipboard-20250416-075623-485.gif, Clipboard-20250416-080057-124.gif, Clipboard-20251002-103226-904.mp4, HTML.gif, Pasted-image-20251001093808.png, SLIDER.png, Screen-Recording-2025-04-14-at-14.18.12.gif, add-content-to-button.gif, add-gesture-detector.gif, adjust-layout.gif, apply-layout-tocard.gif, card-add-layout.gif, card-column-row.png, change-design-button.gif, clipradius.gif, columns-rows-screen.png, comp_1.gif, comp_2.gif, comp_3.gif, comp_4.gif, create-project.gif, create-screen.gif.md, create-screen2.gif, different-screens.png, drawer1.gif, gridview-1.png, groups.gif, icon-button.png, interface-with-counter.png, markdown.gif, material.gif, pageview.gif, screens-details-panel.png, showcase-column-with-cards.gif, text-direction.gif, toolbar-1.png, toolbar.png, visibility.gif, webview.gif, workspace-members.png, workspaces.png, wrapper.gif |
| `exploreinterface` | 8 | 7 | 1 | widget.png |
| `firebase` | 2 | 2 | 0 | - |
| `gifs` | 27 | 0 | 27 | adding-loading-indicator.gif, adding-widget-group.gif, appbar-widget.gif, comp-update.gif, connecting-data-with-ui.gif, create-api-request.gif, create-board.gif, create-comp-1.gif, create-custom-size.gif, create-groups.gif, create-screen.gif, cross-axis-group.gif, dragging-outline.gif, draw-appbar.gif, drop-fonts.gif, drop-images.gif, ex.txt, gesture-detector.gif, main-axis-coloum.gif, moving-screens.gif, news-app.gif, reoder-group.gif, show-code.gif, snapping.gif, use-custom-font.gif, using-align-wrapper.gif, wrappers.gif |
| `git` | 13 | 13 | 0 | - |
| `images` | 28 | 0 | 28 | 1.PNG, 10.PNG, 11.PNG, 12.PNG, 13.PNG, 14.PNG, 15.PNG, 2.PNG, 3.PNG, 4.PNG, 5.PNG, 6.PNG, 7.PNG, 8.PNG, 9.PNG, add-assets.png, add-url-image.png, change-group-type.png, choose-custom-font.png, events-nvp.png, events-widget.png, layout-options.png, layouting-example.png, nvp-icon.png, object-generated.png, rc-outline.png, test.txt, widgetvsdrawing.png |
| `nowadesktop` | 2 | 2 | 0 | - |
| `nowadesktop/autosetup` | 7 | 7 | 0 | - |
| `nowadesktop/createlocalproject` | 7 | 7 | 0 | - |
| `nowadesktop/diff` | 3 | 0 | 3 | base.png, local.png, web.png |
| `signup` | 1 | 1 | 0 | - |
| `signup/after` | 2 | 1 | 1 | 2.png |
| `signup/email` | 3 | 3 | 0 | - |
| `signup/google` | 2 | 2 | 0 | - |
| `stripe` | 4 | 4 | 0 | - |
| `supabase` | 12 | 7 | 5 | delete.png, insert.png, select.png, stream.png, update.png |
| `vars-params-functions/data-models` | 5 | 5 | 0 | - |
| `vars-params-functions/global-state` | 6 | 6 | 0 | - |
| `whats_new` | 4 | 3 | 1 | Nowa-3.10-Option-B-landscape.png |
| **Total** | **259** | **144** | **115** | |

### `static/videos/`

| Folder | Files | Used (pages or site config) | Unused | Unused files |
|---|---|---|---|---|
| `(root)` | 1 | 1 | 0 | - |
| `ai` | 13 | 12 | 1 | credits.mkv |
| `api` | 6 | 3 | 3 | create-collection.mp4, postman-json.mp4, xano-token.mp4 |
| `api2/collection` | 5 | 3 | 2 | auth.webm, header_old.webm |
| `api2/import` | 5 | 5 | 0 | - |
| `api2/post` | 12 | 12 | 0 | - |
| `api2/request` | 6 | 4 | 2 | 2.webm, 3_old.webm |
| `deployment` | 3 | 2 | 1 | share.webm |
| `desktopversion` | 1 | 1 | 0 | - |
| `firebase` | 2 | 2 | 0 | - |
| `getting-started` | 6 | 6 | 0 | - |
| `ios_deploy` | 4 | 4 | 0 | - |
| `qucikstart` | 4 | 4 | 0 | - |
| `simulator` | 5 | 2 | 3 | hotreload.webm, logs.webm, stop.webm |
| `supabase` | 5 | 5 | 0 | - |
| `supabase/auth` | 10 | 9 | 1 | signin_original.webm |
| `supabase/db` | 9 | 9 | 0 | - |
| `supabase/storage` | 3 | 3 | 0 | - |
| `supabase/ui` | 3 | 3 | 0 | - |
| `sync` | 4 | 4 | 0 | - |
| `templates/chat` | 2 | 2 | 0 | - |
| **Total** | **109** | **96** | **13** | |

### Next to pages (`docs/**/img/`)

| Folder | Files | Used (pages or site config) | Unused | Unused files |
|---|---|---|---|---|
| `docs/data-connections/firebase/known-issues/img` | 1 | 1 | 0 | - |
| `docs/data-connections/supabase/img` | 9 | 0 | 9 | documentationlinkchildrentodata-1.png, screen-recording-2023-05-28-at-15.41.06.gif, supabase-table.png, supabase-table2.png, supabase-tableadddatabuilder.png, supabase-tableconnect-1.png, supabase-tableconnect.png, supabase-tabledatabuilderwidgets.png, supabase-tabletable.png |
| `docs/deployment/img` | 7 | 2 | 5 | android-afterbuild.png, android-generate-key.png, build-process.gif, generate-api-key.gif, identifier-creating.gif |
| `docs/img` | 1 | 1 | 0 | - |
| `docs/tutorials-template/img` | 3 | 3 | 0 | - |
| `docs/ui/img` | 11 | 1 | 10 | adding-assets.png, boards.gif, comp-1.gif, comp-2.gif, comp-3.gif, comp-4.gif, import-fonts.gif, import-images.gif, open-files-picker.gif, toolbartoolbar.png |
| `docs/ui/layout/img` | 10 | 3 | 7 | alignment-3.gif, alignment-9.gif, create-group.gif, direction.png, groups.gif, reordering.gif, resizing-options.png |
| `docs/ui/themes/img` | 15 | 15 | 0 | - |
| `docs/ui/widgets/widget-desc/img` | 18 | 16 | 2 | customize-button.gif, functionality-button.gif |
| `docs/ui/widgets/widget-desc/img/expansion` | 5 | 5 | 0 | - |
| `docs/ui/widgets/widget-desc/img/gridview` | 13 | 13 | 0 | - |
| `docs/ui/widgets/widget-desc/img/linear-progress` | 2 | 2 | 0 | - |
| `docs/ui/widgets/widget-desc/img/listview` | 10 | 10 | 0 | - |
| `docs/ui/wrappers/img` | 8 | 8 | 0 | - |
| `docs/vars-params-functions/functions/img` | 1 | 0 | 1 | intiStatee.png |
| `docs/vars-params-functions/img` | 2 | 2 | 0 | - |
| **Total** | **116** | **82** | **34** | |
