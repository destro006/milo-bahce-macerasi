# ANTIGRAVITY PROJECT PROMPT — MILO’S WORLD OF WONDER
## Story-driven, cartoon-fluid educational games for 5-year-old children

Follow these instructions while reviewing and improving the existing project. This is not merely a story or a set of illustrated screens: **it is a safe children’s game made up of multiple playable mini-games and a continuing main story, designed to help 5-year-olds practice counting, recognizing letters, learning basic English words, listening, and following instructions.**

## 1. Project purpose

Milo’s World of Wonder is a Turkish-language web game that children of kindergarten age can use easily. Children should be able to choose different games from the home screen and actively participate by tapping, dragging, listening, counting, and matching. The game should encourage exploration and trying again without making a child feel that they have failed.

The game covers these learning areas:

1. **Counting:** Start with 1–10 and progress gradually toward 1–20. Practice one-to-one counting, selecting the requested quantity, and matching number symbols to groups of objects.
2. **Letter recognition:** Recognize uppercase and lowercase letters of the Turkish alphabet, hear their sounds, and match letters to relevant pictures or words. Correctly support Ç, Ğ, İ, Ö, Ş, Ü and the distinction between I and İ.
3. **English vocabulary:** Begin with fruit, animals, colors, and everyday objects. Let children listen to a word, match it to an image, find the requested word, and replay it if they wish. Always show its Turkish meaning.
4. **Story-based exploration:** Episodes where Milo solves a problem and the child finds and carries objects, listens for clues, and changes what happens next.
5. **Attention and listening games:** Follow a firefly’s light, choose an object based on spoken instructions, and complete simple patterns.

Every game must have a learning purpose without feeling like a lesson app. Learning should happen naturally through the story, character curiosity, sound, movement, and hands-on interaction.

## 2. Instructions for working on the project

- First inspect the existing repository, framework, file structure, screens, gameplay flow, and character assets. Do not remove or rewrite working features without a reason.
- Preserve Milo’s existing/approved appearance, logo, and brand identity unless the user asks for a change.
- Create an implementation plan that fits the current architecture, then make the changes in the actual code. Do not stop at recommendations, static mockups, or TODOs.
- First deliver a vertical slice that can be played from beginning to end. Then add the other game types at the same quality level.
- Keep the interface and instructions in Turkish. English should appear only in the vocabulary being taught and its short repetitions.
- Do not add ads, payments, external links, chat, location access, or collection of children’s personal data.
- Do not publish the project, push it to GitHub, or deploy it to a live site unless the user separately authorizes that.

## 3. Experience for a young child

The intended player is about 5 years old and may just be learning to read.

- Use short Turkish instructions, text that can be read aloud, and large touch targets (around 48 CSS pixels or larger on mobile).
- Alongside dragging, provide an easier option such as “Tap it and Milo will carry it.”
- Do not show too many choices at once. Give one main instruction per task, such as “Put three apples in the basket.”
- Do not rely on color alone; reinforce it with shape, icon, word, or sound cues.
- Do not use red crosses, harsh error sounds, score deductions, failure screens, or screen shakes for wrong answers.
- Let children pause, return to game selection, and resume where they left off.
- Prefer local progress saving and files that can work offline; do not require an account.

## 4. Game world and home screen

The home screen should feel warm, rich, and like a children’s book or animated series—not like a corporate dashboard. Use large, illustrated, tappable game portals that show Milo’s world:

- **Counting Garden** — Count and match.
- **Letter Forest** — Find letters and hear their sounds.
- **English Fruit Garden** — Learn English words.
- **Milo’s Story** — A chapter-based adventure.
- **Firefly Game** — Follow the light and sound.

Cards should respond to selection with a short, smooth animation. If a chapter is locked, explain why in child-friendly language; do not add purchases or wait timers. Keep parent settings in a separate, simple protected area.

The visual world should use soft shapes, rich but comfortable colors, layered scenery, readable text, and clear alignment. Avoid piles of random emoji, empty panels, clipped cards, excessive glow, and visual clutter. Emoji may be temporary placeholders in a prototype, but must not remain as final art assets.

## 5. Real gameplay for each mode

### A. Counting Garden

**Example:** Pof the hedgehog is preparing a picnic basket. Milo says, “Put three apples in the basket.” Countable fruit is visible. The child taps or drags three apples. Each apple lands in the basket with a physical, animated response. When the third apple is added, Pof celebrates and the story problem is resolved.

Gameplay variations:
- Match a spoken number to a quantity of objects.
- Count objects together by tapping; highlight only the selected object.
- Find the requested number of objects.
- Put number cards from 1 to 10 in order.
- Match a number symbol to a group with the same quantity.

Objects must not move around during counting or be counted twice. If the child adds too many, gently return the extra object and do not reset the counter. Progress from 1–3, then 1–5, 1–10, and optionally 11–20.

### B. Letter Forest

**Example:** The wind has scattered the letters on a forest sign. Lila says, “Let’s find the letter M.” The child chooses M/m. Milo says the letter’s sound, shows a familiar example such as “M — masa” (table), and the child places the letter on the sign.

Gameplay variations:
- Find the spoken letter among a few choices.
- Match uppercase and lowercase forms (A–a).
- Find a picture that starts with the letter’s sound.
- Trace a letter using a wide, forgiving path.

Support all letters in the Turkish alphabet. Display I/İ and Turkish-specific characters correctly. Do not confuse a letter’s name with its sound, and do not invent a harsh sound for Ğ. Give positive feedback, such as a soft light trail around the letter or an animated example picture.

### C. English Fruit Garden

Start with: apple/elma, orange/portakal or turuncu (clarify the meaning in context), banana/muz, strawberry/çilek, blueberry/yaban mersini. Then add simple animals, colors, and everyday objects.

Milo shows a picture and says the word naturally. The child can tap a speaker to hear it again, find the right object, and take it to a character in the story. The card shows the English word, a replay button, and the Turkish meaning. If an approximate Turkish pronunciation is shown, keep it as a small helper; it must not replace correct audio.

Provide normal-speed audio, a slower repetition, and a short use of the word within the story. Use natural recordings when available; browser text-to-speech is only a fallback. The game must still work if audio fails to load, and a character must not move its mouth out of sync with missing audio.

A wrong object should gently return to its place. Give a Turkish hint such as: “That’s a yellow banana. We’re looking for a red strawberry.” When the child chooses correctly, Milo repeats the word, carries the object, and helps resolve the friend’s problem.

### D. Firefly Game

**Lila/the firefly must be visible on screen and have a real gameplay role; she cannot exist only in the game title.** In a twilight garden, Lila flies and flashes her light once or twice. The child listens to an instruction such as “Find the firefly that flashes twice,” follows the light, and taps the target. Other levels may ask the child to repeat a light pattern or go to the correct flower.

Lila should fly along a smooth path, accelerate and slow down, lean slightly in the direction of turns, and fade her light in and out gradually. No rapid flashing. If the child loses the target, Lila should return to her starting point and offer a short hint. Do not make color, sound, or flash count the sole accessible cue.

### E. Milo’s Story

The main story can be **“The Lost Garden Light”**: three light seeds that power the garden lantern have gone missing. Milo helps Pof the hedgehog, Maviş the bird, and Lila the firefly. Chapters include collecting/counting apples, finding the right objects by the stream, listening for English fruit words in a greenhouse, finding a seed with clues from friends, and placing the seeds in the lantern at the end.

Each scene must make four things clear: Why does the character need help? What does the child do? How does the task change the story? What skill or word is reinforced? Use short lines and actions instead of long uninterrupted dialogue. The child must not be only a spectator pressing “next.” Every named task object must be visible and selectable in the scene. Lila must appear in the story, fly, and help guide the child.

## 6. Cartoon character and animation quality

The user expects a real character performance with expressive arms and hands, animated with the fluidity of a cartoon. Bouncing one still image, only changing its scale with CSS, or leaving the character static does not meet this requirement.

- Where possible, animate Milo’s head, torso, shoulders, upper/lower arms, hands/fingers, legs, feet, ears, eyes, mouth, tail, and accessories as independent rigged bones or layers.
- Choose the best-performing lightweight method for the current technology: a 2D skeletal/puppet rig, sprite sheet, or real-time 3D rig. Report the chosen method and its limitations.
- Create distinct performances for breathing, curiosity, looking at a target, greeting, listening, pointing, crouching to pick something up, lifting a heavy object, carrying, placing, thinking, relief, joy, celebration, and waving goodbye.
- Every action should have **anticipation → action → contact/result → recovery**.
- The eyes should look at a target first; then the head and body turn; the hand reaches last. An object must not snap into the character’s hand before contact.
- When lifting an object, bend the knees, balance the torso, and shape the hand and wrist to fit the object.
- Ears, scarf, backpack, and tail should follow the main movement with a slight delay.
- Feet must not slide during walking. The tail should help balance turns; knees should absorb landings.
- Express emotions through the brows, eyes, gaze, cheeks, ears, and shoulders together—not just the mouth.
- Match mouth movement to audio timing. Do not animate speech when audio is absent.
- Prevent animation conflicts from breaking the character during rapid taps; safely interrupt or queue actions.
- Avoid abrupt camera jumps. Keep the character, target object, and instruction visible together.

Minimum animation clips: `idle_breathe`, `look_at_target`, `wave_hello`, `listen`, `think`, `point`, `walk`, `walk_cautious`, `step_balance`, `crouch`, `reach`, `grip_small`, `lift_weight`, `carry`, `drop_into_basket`, `encourage`, `soft_disappointed`, `relieved`, `small_success`, `celebrate`, `wave_goodbye`.

Example sequence after a correct selection: `look_at_target → crouch/reach → grip_small → carry → drop_into_basket → small_success`. Do not use one happy jump as a substitute for every interaction.

## 7. World, audio, and performance

- Inspect existing character assets first. Keep Milo’s face, proportions, clothes, and colors consistent across scenes.
- Keep backgrounds, character, interactive objects, and interface independently manageable.
- Actually render/create every required task object and give it a touch target.
- If using 3D, make perspective, lighting, shadows, and interactions coherent; do not merely label a scene “3D.” Provide quality levels or a fallback for mobile and lower-end devices.
- Prevent content from leaving the frame on mobile portrait (the priority), tablet, and desktop layouts.
- Do not require external image, font, or audio URLs. Package assets locally for offline use.
- Use warm, clear Turkish narration and avoid obviously repetitive ambient loops. UI sounds should be short and quiet. Keep a visible sound toggle.
- Every task must remain completable with sound off. Audio failures must not lock the game.

## 8. Progress, safety, and privacy

Save chapter progress locally on the device. Replaying must not erase progress. Prefer optional vocabulary cards and unlocked story pages over score pressure. A parent area may use a simple adult check and show only a local game summary. Do not collect a child’s name, photo, voice recording, location, or personal data. Do not place ads, purchases, or external links in the gameplay flow.

## 9. Technical quality

- Preserve the existing framework, package manager, and architecture; do not perform a major rewrite without a clear reason.
- Build reusable components for game selection, game state, animation management, audio, progress saving, shared HUD, and accessible interaction.
- Make game states explicit: intro, instructions, gameplay, hint, success, transition, and pause.
- Handle wrong objects, rapid taps, muted mode, screen rotation, reloads, and storage errors.
- Do not unlock the next stage before a task is complete; provide optional hints to prevent a child from getting stuck.
- Support keyboard and touch access, visible focus, and clear `aria-label` values.
- Do not leave dead buttons, broken speaker controls, missing task objects, blank screens, or decorative elements that appear interactive but do nothing.

## 10. Implementation order

1. Explore the project and inspect its current state and assets.
2. Establish the home screen and information architecture for all five game modules.
3. Complete a vertical slice: Milo’s story introduction + Pof’s apple task + real object interaction + Apple audio/vocabulary card + action-matched animation + story outcome + local progress saving.
4. Add separate playable counting, Turkish letter, English vocabulary, and firefly games.
5. Complete the story with the stream, greenhouse, friends’ clues, and lantern finale.
6. Fix portrait/landscape mobile, tablet, and desktop layouts.
7. Play through every game from beginning to end. Verify required objects, buttons, sound toggle, muted gameplay, rapid taps, and progress after reload. Fix issues before calling the work complete.
8. In the final report, list the actual changes, key files, how to run the project, the animation method, and known limitations. Do not claim unfinished work is complete.

## 11. Acceptance criteria

- At least four distinct learning games can be selected and played from the home screen.
- Counting, Turkish letter recognition, and English vocabulary have distinct gameplay flows.
- The firefly is visible and participates in light/sound tracking gameplay.
- The child’s actions change what happens in the story; the child is not only reading text.
- Every required task object is visible, selectable, and connected to the task outcome.
- The interface is in Turkish and Turkish alphabet characters display correctly.
- Wrong answers do not lock the game; hints and retries are available.
- Animations include looking at a target, anticipation, arm/hand movement, contact, weight transfer, and recovery.
- The game can be completed on a touch device and does not get stuck with sound off.
- Progress is saved locally and restored when reopened.
- No clipped text, broken buttons, or nonfunctional screens remain.

## 12. Begin

Start working on the existing project now. Inspect the source code first, then implement the actual application needed to meet this purpose and acceptance criteria. Make reasonable design decisions independently and complete the task objects, animations, and scene outcomes. Do not publish or deploy the project. Provide a working local preview and a summary of the changes made.
