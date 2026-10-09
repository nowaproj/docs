# W30c writer notes (3.13 update, decision D20)

Batch W30c. Source of truth: `/home/user/nowa-master` at `3cb32031c` (3.13.0); 3.12.5 is `b84bfdafd` in `/home/user/nowa`
(`git show b84bfdafd:<path>` there). Change ids C1-C27 and part numbers refer to `_rewrite/research/changes-3.13.md`.
Code refs are `path:line` in the 3.13 tree unless marked `3.12.5:`.

Pages (all under `docs/`): logic/{global-state,models,router,navigation,circuit}; integrations/firebase/{firestore,connect,auth},
integrations/{rest-api/index,admob,google-maps,revenuecat,show-data,deep-links}; test/{instant-play,run,problems};
account/{workspaces,help,index,projects,project-settings,plans-and-usage,account-settings}; reference/shortcuts,
reference/widgets/{index,forms,lists,media,navigation}; guides/{complete-app,design-tips,data-and-state-tips,ai-tips,ship-tips};
troubleshooting/{known-issues,index}.

"Needs a live check" items and product-issue candidates are collected at the end of this file.

