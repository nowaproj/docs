# Open questions

Questions for the user that came up during the unattended run. Each has the option picked in the meantime.

| ID | Question | Picked meanwhile | Where it matters |
|---|---|---|---|
| Q1 | Should the signed-in screens (dashboard, account, AI chat with a real project, deploy dialogs) be captured in a follow-up session once `NOWA_TEST_EMAIL` / `NOWA_TEST_PASSWORD` are added to the environment? | Listed in `_rewrite/captures/to-capture.md`. | Screenshots |
| Q2 | Connect External Agent: What's New calls it **Enterprise**, but the code checks a per-account `external_agent` grant (comment: "beta plan"). Is "Enterprise" the right badge? | Kept the Enterprise badge (What's New says it three times) plus Desktop app. | `docs/ai/external-agent.md` |
| Q3 | Should the docs state store policies (Apple's in-app purchase rules, Sign in with Apple requirement, Play Console policies such as privacy policy and testing tracks)? Nothing in the Nowa code confirms them, and Google's Play Console Help is blocked from this environment. | Left out; the publish pages give only the hand-off steps from Google's and Apple's own pages and link to them. | `docs/publish/android.md`, `docs/publish/ios.md`, `docs/integrations/index.md` |
