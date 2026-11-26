# Release gates — execute, attach evidence, record failures
Status of every test in this handoff: NOT RUN against source; these are requirements. Mark PASS / FAIL / BLOCKED with evidence, never claim completion by file count alone.

| ID | Test | Expected result |
|---|---|---|
| G01 | Baseline/source audit | Existing features and saves retained; no unauthorized deploy |
| G02 | Content schema validation | 30 unique levels for each of 5 modes; 90 story tasks; valid IDs, all targets among candidates, every task has sufficient objects |
| G03 | Full progression | Play every task, validate outcomes, next scene, final completion and reload; no dead ends |
| G04 | Incorrect answer | Gentle hint, no progress commit; correct choice remains available |
| G05 | Object pickup | Look, reach, contact, carry, release; original slot empty, basket contains item |
| G06 | Rapid input | Double click/tap and repeated taps cannot duplicate an item, score, or progress |
| G07 | Navigation interruption | Pause/back/route during pickup recovers state exactly once, no stale animation or audio |
| G08 | Squirrel | Articulated paws/spine/tail, convincing run/stop/landing; review recorded motion |
| G09 | Firefly | Real visible body/wings and interactive glow target; gentle pulse, no rapid flash |
| G10 | Walking | Visible path, camera continuity, grounded foot contact, no unexplained teleport |
| G11 | Voice | Human review Turkish female naturalness; separate actual English pronunciation; no mixed-locale speech |
| G12 | Feedback | Correct audio/text “Doğru cevap” only; no punitive feedback |
| G13 | Audio unlock/replay | First intentional tap enables audio, replay and volume work; no overlapping dialogue |
| G14 | Mute/voice failure | Every level playable without audio, visual instructions available |
| G15 | Counting | Numerals displayed as digits only; correct quantities, no double-count |
| G16 | Turkish letters | Turkish casing I/ı and İ/i and other special letters correct; Ğ treatment correct |
| G17 | Difficulty | Kolay/Orta/Zor changes actual choice count/hints/complexity across modes; age bounds respected |
| G18 | Save/reload | Progress restored; replay does not clear; old save migration and unavailable storage handled |
| G19 | Responsive | 360×640, 390×844, 768×1024, 1366×768 and landscape; no cropped targets or inaccessible controls |
| G20 | Accessibility | Tap, keyboard, focus, labels, reduced motion, visual equivalents to sound/color |
| G21 | Asset integrity | All required original/approved assets, no broken references or final emoji stand-ins; license manifest |
| G22 | Performance | Profile representative mobile/desktop; record load/frame times, memory/cleanup across scene loops |
| G23 | Privacy | No tracking of children, no ads, payments, external chat, mic/location, or unauthorized remote calls |
| G24 | Build | Existing build/lint/typecheck/test commands pass; report actual exit status |
| G25 | Release evidence | Source archive, exact run instructions, tests, screenshots and motion/audio recording, limitations |

## Test coverage design
Automate all 150 level definitions and all 90 story exercise transitions with seeded data. UI-level smoke tests cover every mode and representative early/mid/late difficulty; full deterministic playthrough should exercise the real task evaluator and interaction pathway. Browser tests for rapid touch, pointercancel, landscape, route interruption, reload, muted mode and simulated missing assets. Use test-only API where canvas hit targets need deterministic identification; assert visible geometry and event outcomes in addition to internal state. Do not bypass gameplay via a debug completion button. Manual tests: listen to each distinct recorded voice sample, inspect animated clips/foot plants/contact frames and verify art consistency. Emulation is not actual device testing. Record browser, viewport, build hash, environment, test commands, duration and evidence paths. Fix and retest failed release gates; list blocked items explicitly.
