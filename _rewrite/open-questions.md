# Open questions

Questions for the user that came up during the unattended run. Each has the option picked in the meantime.

| ID | Question | Picked meanwhile | Where it matters |
|---|---|---|---|
| Q1 | Should the signed-in screens (dashboard, account, AI chat with a real project, deploy dialogs) be captured once a test account is available? | **Answered 2026-10-08:** yes, with the test account the user gave (kept outside the repo, never committed). Blocked: the environment's network policy denies `server.nowa.dev` (Nowa's sign-in and project API) and `app.nowa.dev`. Once the user allows them, run the signed-in capture (rows in `captures/to-capture.md`). | Screenshots |
| Q2 | Connect External Agent: What's New calls it **Enterprise**, but the code checks a per-account `external_agent` grant. Is "Enterprise" the right badge? | **Answered 2026-10-08:** yes, Enterprise only. Badge kept (D18). | `docs/ai/external-agent.md` |
| Q3 | Should the docs point to store policies (Apple's in-app purchase rules, login services, account deletion, privacy; Google Play policies)? | **Answered 2026-10-08:** yes. Short pointers to Apple's and Google's official pages added where readers need them (D18, batch W21). | `docs/publish/android.md`, `docs/publish/ios.md`, `docs/integrations/*`, `docs/guides/ship-tips.md` |
| Q4 | Firestore in 3.13: the designer has no way to add a main collection or a query (P48). A hidden URL, the project link with `?panel=files`, still opens the old Files panel with **Add Main Collection** and **Add New Query**. Mention it as a workaround until the product is fixed? | Not documented (D21). | `docs/integrations/firebase/firestore.md` |
