import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const base = 'C:/Users/PC/.gemini/antigravity/scratch/milo-bahce-macerasi';

// 1. Verify skills (7 existing + 2 milo handoff skills locally)
const localSkills = [
  'gsap-official-skills',
  'phaser-animations',
  'phaser-sprites',
  'gamedev-agent-skills',
  'web-game-development',
  'open-game-skills',
  'webapp-testing',
  'milo-animation-qa',
  'milo-story-director'
];
for (const name of localSkills) {
  const mdPath = path.join(base, '.agents', 'skills', name, 'SKILL.md');
  if (!fs.existsSync(mdPath)) throw new Error(`Missing SKILL.md: ${mdPath}`);
}
console.log(`Skills Check OK: all ${localSkills.length} workspace skills present.`);

// 2. Verify local vendor libraries
for (const v of ['vendor/phaser.min.js', 'vendor/gsap.min.js']) {
  const vp = path.join(base, v);
  if (!fs.existsSync(vp) || fs.statSync(vp).size < 10000) {
    throw new Error(`Missing or empty vendor asset: ${vp}`);
  }
}
console.log('Vendor Check OK: phaser.min.js and gsap.min.js present.');

// 3. Syntax check all JS modules
const jsFiles = [
  'js/contentData.js',
  'js/audio.js',
  'js/characters.js',
  'js/spriteFactory.js',
  'js/rigSystem.js',
  'js/uiCinematics.js',
  'js/phaserGame.js',
  'js/game.js',
  'server.js'
];
for (const f of jsFiles) {
  const code = fs.readFileSync(path.join(base, f), 'utf8');
  new vm.Script(code, { filename: f });
}
console.log(`Syntax Check OK: ${jsFiles.length} JS files parsed cleanly.`);

// 4. Content schema validation (150 levels, 90 story tasks, manifests, Turkish rules)
const sandbox = { window: {}, console };
sandbox.window = sandbox;
vm.runInNewContext(fs.readFileSync(path.join(base, 'js/contentData.js'), 'utf8'), sandbox);
vm.runInNewContext(fs.readFileSync(path.join(base, 'js/characters.js'), 'utf8'), sandbox);

const val = sandbox.MiloContent.validateAllContent();
if (!val.ok) {
  throw new Error('Content validation failed:\n' + val.errors.join('\n'));
}
console.log('Content Validation OK:', JSON.stringify(val.counts));

// Verify every cast portrait renders valid SVG
for (const cid of Object.keys(sandbox.MiloContent.CAST)) {
  if (!sandbox.MiloArt.renderPortrait(cid).includes('<svg')) {
    throw new Error(`Portrait SVG failed for ${cid}`);
  }
}

// Verify all DOM IDs referenced in game.js exist in index.html
const indexHtml = fs.readFileSync(path.join(base, 'index.html'), 'utf8');
const gameJs = fs.readFileSync(path.join(base, 'js/game.js'), 'utf8');
const idsMatch = gameJs.match(/var ids = \[([\s\S]*?)\];/);
const ids = [...idsMatch[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);
for (const id of ids) {
  if (!indexHtml.includes(`id="${id}"`)) {
    throw new Error(`Missing DOM ID in index.html: ${id}`);
  }
}
console.log(`DOM & Portrait Check OK: ${ids.length} DOM IDs and ${Object.keys(sandbox.MiloContent.CAST).length} cast portraits verified.`);
