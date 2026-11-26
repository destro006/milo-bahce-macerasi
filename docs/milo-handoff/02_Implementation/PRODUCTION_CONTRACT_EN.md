# Production contract: animation, narrative, assets, audio and state

## Story beats and composition
Each episode: 3–8 s opening action → short friend request → task 1 (recognition) → task 2 (practice) → task 3 (recall/action) → visible resolution → walk to next place. This is an editorial target, not a forced timer; allow replay, pause, skip noninteractive cutscenes. Keep all required props in camera safe frame. Scene entry never begins until target assets are ready. Plan storyboard panels showing opening, problem, child choice, character reach, object transport, result, next destination. Use the original documents for character appearance and dialogue. Never randomly substitute a character design.

## Animation clip contract
| Clip family | Required clips | Key checks |
|---|---|---|
| Milo locomotion | idle_breathe, look_at_target, turn_left/right, walk_start, walk_loop, walk_stop, walk_cautious, step_balance | Feet stay planted during contact; match speed; transitions blend |
| Milo interaction | wave_hello, listen, think, point, crouch, reach, grip_small, lift_weight, carry, drop_into_basket | Eye lead, weight shift, contact, hand/socket attachment, release |
| Milo emotion | encourage, soft_disappointed, relieved, small_success, celebrate, wave_goodbye | distinct face, ears and shoulders; no harsh failure |
| Squirrel | idle_sniff, look, walk, scamper, crouch, leap, land, climb, grip_nut, chew, tail_sway | spinal bend, alternating paws, tail lag, landing compression, no floating |
| Pof | sniff, shuffle, point, curl_safe, thank | believable hedgehog silhouette and paws |
| Maviş | perch, blink, hop, wing_flap, takeoff, glide, land | wing beats and landing on branch |
| Lila | hover, wingbeat, curve_flight, glow_soft, guide, land | visible insect silhouette, abdominal glow, slow pulses |
| Nine Fındık | idle, greet, gesture, listen, lantern_help | expressive kind posture; preserve existing design |

Illustrative pickup timeline (adjust for distance, age and assets): 0–180 ms look and highlight, 180–450 ms turn/anticipation, 450–950 ms walk/plant, 950–1300 ms reach and hand contact, 1300–1900 ms carry, 1900–2300 ms release/settle, 2300–2600 ms short reaction. Use a responsive alternative for repeated objects and reduced motion, not forced cutscene lock. Use actual contact markers named pickup_contact, release_contact, action_done. Synchronize sound to contact. Never trigger success early. Use short blend times, preserve animation phase when returning to idle, stop idle on action. In 3D use hand socket with world/local matrix conversion; avoid jumps upon reparent. In 2D preserve position with the hand attachment frame.

## Data and state contract
Suggested types (adapt existing framework):
- Episode { id, mode, order, region, titleTr, learningGoal, sceneId, tasks[], onCompleteWorldChanges[], nextId }
- Task { id, instructionTr, audioId, targetIds[], candidateIds[], requiredCount, evaluator, hintTr, transferDestination, successAction }
- Entity { id, assetId, semanticTags, transform, hitArea, available, location: world|hand|basket|placed }
- Progress { schemaVersion, completedEpisodeIds, completedTaskIds, settings, activeCheckpoint }
- Audio { id, text, locale, voiceId, localPath, durationMs, optionalVisemes, license }
- Asset { id, relativePath, kind, attribution, license, LOD, byteSize }

Scene FSM: loading → intro → awaiting_input → resolving → feedback → next_task or outcome → transition. Paused is orthogonal. Invalid input returns to awaiting_input, no penalty. On valid tap reserve entity and task transaction ID; attach at contact; commit once on release; checkpoint at stable boundaries. Ignore stale async callbacks using scene generation token. Recovery after interruption reconstructs the last committed state; if resolving is interrupted rollback reservation or complete exactly once, never double count. Validate that IDs exist, targets subset candidates, all required counts attainable, audio paths resolve, levels have unique IDs and no locked progression cycles. Use stable seeded layout; do not shuffle during a question. Level JSON is an editorial seed, compile into concrete runtime entities with per-scene art and safe positions; not a finished asset inventory.

## Parent settings
Kolay: 2–3 choices, clear cues, unlimited replay. Orta: 3–4 choices, delayed hint, one-step matching. Zor: up to 4–6 choices, recall or two-step pattern, still gentle and no timer. Difficulty is also bounded by the chapter progression: do not make episode 1 complex. All settings local; reset progress only with adult confirmation. Voice/music/effects controls independently adjustable, reduced motion option. No external tracking.

## Asset and performance pipeline
Inspect original GLB/rigs/sprites first; reuse approved assets. Author missing models/rigs in Blender or 2D editor; export named clips and textures, verify scale/axes, bone weights and transparent materials. Keep raw source art separate from optimized runtime art. Use atlases/texture compression where supported, lazy-loading and scene cleanup; no external hotlinks. Use local licensed art, voice, music, fonts; maintain manifest. Start performance budgets as goals: stable 30 fps minimum on representative mid-tier mobile, aim for 60 fps where feasible; first playable scene under 5 seconds on measured connection/device; defer optional high-res textures, keep input responsive. Log real results and adjust instead of pretending these targets were attained. Avoid unnecessary physics; deterministic pickup path and hand attachment are enough. Use reduced-motion camera and lower shadow/particle quality fallback.

## Audio production
Write dialogue in locale-separated rows, record or generate approved speech once, normalize loudness consistently and preview all lines. Turkish narrator female, en-US/en-GB vocabulary separately; English normal + slow takes where useful. Keep Turkish phonetic helper approximate and secondary; verify with a fluent speaker. Do not represent browser voice names as guaranteed. Store clips locally and license manifest, no child input sent. Make a test for first gesture audio unlock, replay, route-change cancellation, muted mode, missing clip, unavailable voice and stale audio callback. Manual listen for Turkish articulation and English accent; report unreviewed lines. Use short musical transitions and gentle effects, no background music masking speech.
