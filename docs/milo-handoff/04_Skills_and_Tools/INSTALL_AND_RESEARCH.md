# Antigravity skill/plugin research — 27 November 2026

These are source-checked recommendations, not installed software. Third-party skills can contain executable scripts and instructions; inspect repository, SKILL.md, license and pinned commit first. Do not grant unnecessary filesystem/network permissions or auto-run unreviewed code. Prefer workspace-local installation. Current official Antigravity docs describe `.agents/skills/` as default (legacy `.agent/skills/` compatibility), and the current CLI global directory `~/.gemini/config/skills/`.

## Best-fit selection
| Priority | Resource | Type | Role and limitations |
|---|---|---|---|
| Core | Superpowers | Native agent plugin | Planning, systematic debugging, verification. Install only if not already present; do not let generic workflow override approved requirements. |
| Core | GSAP official skills | Agent skills | Camera, prop transfers, scene transitions, timelines, easing and cleanup. Not a skeletal rig by itself. |
| Conditional | Three.js animation skill | Community agent skill | Rigged GLB, AnimationMixer, blending, morphs; select for existing 3D engine. Review source/version. |
| Conditional | Phaser official skills | Agent skills | Scenes, sprites, animations, audio and input for 2D/2.5D engine. Not required for Three.js-first app. Match installed Phaser major version. |
| Core QA | Playwright MCP or CLI | Browser tool | Interactive browser test and screenshots; Playwright test suite separately for deterministic full-level regression. Choose one agent browser path. |
| Optional | Rive | Authoring tool + web runtime | Interactive 2D character/face/UI state machines, actual .riv assets needed. Review editor/export pricing and license. |
| Optional | Blender | 3D authoring | Original rig, weight painting, named clips and GLB export. No need to install random Blender MCP. |
| Optional | webapp-testing | Agent skill | Alternative Playwright workflow; overlaps with Playwright MCP/CLI. Check license before redistribution. |

## PowerShell (run inside the existing project directory)
First inspect installed tools and skill discovery. Commands below are examples verified against the linked public sources where possible; they were NOT executed on the user's PC. Use `npx.cmd` on Windows to avoid common PowerShell npm wrapper policy issues. If an agent name/skill name changes, list available choices first. Review and pin revisions before installation rather than automatically trusting latest code.

```powershell
node --version
npm.cmd --version
npx.cmd skills add https://github.com/greensock/gsap-skills --list
npx.cmd skills add https://github.com/greensock/gsap-skills --agent antigravity
```

Superpowers native Antigravity plugin (upstream release notes confirm the command; requires Antigravity CLI `agy` installed and in PATH):
```powershell
agy plugin install https://github.com/obra/superpowers
```
Alternatively use Antigravity's plugin UI/marketplace if supported by your installed version. Do not install duplicates.

**If existing game is Three.js:**
```powershell
npx.cmd skills add https://github.com/komogortev/threejs-skills --list
npx.cmd skills add https://github.com/komogortev/threejs-skills --skill threejs-animation --agent antigravity
```
**If existing game is Phaser instead:**
```powershell
npx.cmd skills add https://github.com/phaserjs/phaser --list
npx.cmd skills add https://github.com/phaserjs/phaser --skill animations --skill scenes --skill audio-and-sound --agent antigravity
```
Optional additional Phaser skills: use the listing to select relevant input, sprites, asset loading and cameras skills. Do not install all automatically. If discovery fails, use the exact upstream SKILL.md and its references as a reviewed workspace skill, preserving license and relative files.

**Browser testing:** use Antigravity's MCP settings to add Microsoft Playwright MCP if desired. The example `playwright-mcp.example.json` shows the standard MCP server definition; merge into the existing configuration using the client UI, never overwrite existing config. Use a clean browser profile with no logged-in personal data. Alternative: use the existing Antigravity browser and install project Playwright tests only if not already present. For npm-based projects: `npm.cmd install -D @playwright/test` then `npx.cmd playwright install chromium` (confirm network/install permission); preserve the existing package manager and lockfile.

## Local project-specific skills included in this ZIP
Copy `.agents/skills/milo-story-director` and `.agents/skills/milo-animation-qa` into the game workspace. These are newly authored plain instruction skills with no scripts or network actions. Their purpose is narrative/educational integrity and animation/interaction verification. Read and activate both for this project.

## Natural speech strategy
1. Reuse approved Turkish female audio if available. 2. Prefer licensed pre-recorded or approved neural generated clips (e.g. Azure Speech supports Turkish and English; costs/voice availability and terms must be verified before use). 3. Local/offline option: evaluate Piper Turkish female Ilkiz voice and a licensed English voice; quality and model license must be reviewed, do not assume parity with recorded audio. 4. Browser speech fallback uses strict locale separation and explicit missing-voice handling. Do not subscribe, obtain API keys or install paid services without approval.

## Source links checked during research
- Antigravity skills docs: https://antigravity.google/docs/skills
- Antigravity skills authoring codelab: https://codelabs.developers.google.com/getting-started-with-antigravity-skills
- Skills CLI agent directory mapping: https://github.com/vercel-labs/skills/blob/main/docs/agents.md
- GSAP official repo: https://github.com/greensock/gsap-skills
- Superpowers repo and Antigravity release note: https://github.com/obra/superpowers/releases
- Three.js community animation skill: https://github.com/komogortev/threejs-skills/blob/master/skills/threejs-animation/SKILL.md
- Phaser official repo: https://github.com/phaserjs/phaser
- Phaser animation: https://github.com/phaserjs/phaser/blob/master/skills/animations/SKILL.md
- Phaser audio: https://github.com/phaserjs/phaser/blob/master/skills/audio-and-sound/SKILL.md
- Phaser scene: https://github.com/phaserjs/phaser/blob/master/skills/scenes/SKILL.md
- Playwright MCP: https://github.com/microsoft/playwright-mcp
- Playwright test framework: https://github.com/microsoft/playwright
- Alternative browser test skill: https://github.com/anthropics/skills/tree/main/skills/webapp-testing
- Rive runtime and agent tooling: https://github.com/rive-app/rive-wasm ; https://rive.app/agents
- Rive state machine docs: https://rive.app/docs/runtimes/state-machines
- Azure supported speech languages: https://learn.microsoft.com/azure/cognitive-services/speech-service/language-support?tabs=tts
- Piper Turkish model catalog: https://piperhub.org/voices/language/tr/

Additional established tool (not checked for an Antigravity plugin): Blender https://www.blender.org/ . Do not confuse runtime libraries or asset editors with installable agent skills. No third-party package is bundled here.
