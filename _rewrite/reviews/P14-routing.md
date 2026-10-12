# Phase 14: items routed between batches

Items a section agent or verifier found for a page outside its batch, and what happened to each.

| # | From | Target page | Item | Status |
|---|---|---|---|---|
| 1 | B06 | `integrations/firebase/auth.md:28` (B09) | Links `notifications.md#set-up-notifications-for-iphone`, which doesn't exist on `notifications.md` mid-pass. | check after B09 and its verifier |
| 2 | B06 | `code/generated-code.md` (code page) | Circuit draws only expression statements, local variables, if/else, try/catch, while and return (`P14-B06-for-code.md` `#variables-and-functions`). | for the code page agent |
| 3 | B06 | `logic/circuit.md` (structure) | Page is ~2,980 words; writer proposes moving If, Try and loops to a "Make decisions and handle errors" page. | decide after B06 verification |
