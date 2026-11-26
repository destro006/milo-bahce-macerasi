# Milo’s English Garden — Antigravity production handoff

## Start here
1. Extract this archive into a folder next to your existing game repository, or copy its contents into `docs/milo-handoff/`. Copy `.agents/skills/milo-*` into the existing project's `.agents/skills/` directory, merging rather than overwriting.
2. Open the **existing game project folder** in Antigravity. This ZIP is a design/implementation handoff, not a standalone playable game or a source-code backup.
3. Read `04_Skills_and_Tools/INSTALL_AND_RESEARCH.md`. Install only relevant reviewed skills. Do not install both rendering engines by default.
4. Paste the entire `MASTER_PROMPT_EN.md` into Antigravity and provide the extracted files as workspace context. Ask it to start on the existing source.
5. Require a local preview, test evidence, and a source ZIP before considering the work complete.

## Existing reference
Live URL previously reported: https://milos-english-garden.royal-berry-8514.chatgpt.site/
The original source/repository, actual asset files, complete transcript, and exact current 30-level definitions were not recoverable in this session. The 3 original design documents are preserved byte-for-byte. The latest known changes are summarized separately; the 150-level content plan is a newly authored implementation proposal, not an export of the existing game's level data. Antigravity must inspect and reconcile it against the real project, preserving all working and approved features. No remote deployment or plugin installation has been performed.

## Package map
- `MASTER_PROMPT_EN.md` — primary English implementation instructions
- `01_Original_References/` — three recovered original documents (including Turkish reference)
- `02_Implementation/` — project history, story/animation/audio and architecture contract
- `03_Content/levels.json` — 150 proposed levels across five modes; 90 story exercises
- `03_Content/LEVEL_GUIDE_EN.md` — human-readable level plan
- `04_Skills_and_Tools/` — verified research links, installation guide, optional MCP config example
- `05_QA/ACCEPTANCE_TESTS.md` — release gates and verification matrix
- `.agents/skills/` — two original project-specific agent skills (not third-party plugins)

All new implementation instructions are in English. Player-facing game dialogue, instructions and UI remain Turkish except English-learning content.
