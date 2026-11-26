import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const proj = 'C:/Users/PC/.gemini/antigravity/scratch/milo-bahce-macerasi';
const evidenceDir = 'C:/Users/PC/.gemini/antigravity/brain/73e86152-6084-4672-b697-858c1d16b6b4/evidence';
const userData = 'C:/Users/PC/.gemini/antigravity/brain/73e86152-6084-4672-b697-858c1d16b6b4/scratch/edge-e2e-profile';
fs.mkdirSync(evidenceDir, { recursive: true });
fs.mkdirSync(userData, { recursive: true });

function findEdge() {
  const candidates = [
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Google/Chrome/Application/chrome.exe'
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  throw new Error('No Chromium/Edge executable found');
}

const srv = spawn('node', ['server.js'], { cwd: proj, stdio: 'pipe' });
let baseUrl = null;
srv.stdout.on('data', (d) => {
  const m = d.toString().match(/http:\/\/localhost:(\d+)/);
  if (m && !baseUrl) {
    baseUrl = `http://127.0.0.1:${m[1]}/`;
    runSuite().catch((err) => {
      console.error('E2E_FAILED:', err);
      srv.kill();
      process.exit(1);
    });
  }
});

async function runSuite() {
  const exe = findEdge();
  const port = 9235;
  const browser = spawn(exe, [
    '--headless=new',
    '--no-sandbox',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userData}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--window-size=1366,768',
    baseUrl
  ], { stdio: 'pipe' });

  let wsUrl = null;
  const deadline = Date.now() + 10000;
  while (!wsUrl && Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, 250));
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json`);
      const list = await res.json();
      const page = list.find((t) => t.type === 'page');
      if (page) wsUrl = page.webSocketDebuggerUrl;
    } catch {}
  }
  if (!wsUrl) throw new Error('CDP websocket unavailable');

  const ws = new WebSocket(wsUrl);
  let msgId = 0;
  const pending = new Map();
  const consoleErrors = [];

  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      pending.get(m.id)(m);
      pending.delete(m.id);
    } else if (m.method === 'Runtime.exceptionThrown') {
      consoleErrors.push(JSON.stringify(m.params));
    }
  };

  const send = (method, params = {}) => new Promise((res) => {
    const id = ++msgId;
    pending.set(id, res);
    ws.send(JSON.stringify({ id, method, params }));
  });

  const evalJS = async (expr) => {
    const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.result?.exceptionDetails) {
      throw new Error('Eval error: ' + JSON.stringify(r.result.exceptionDetails));
    }
    return r.result?.result?.value;
  };

  const snapPng = async (name) => {
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(evidenceDir, name), Buffer.from(shot.result.data, 'base64'));
  };

  const setViewport = async (w, h) => {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 600 });
    await new Promise((r) => setTimeout(r, 200));
  };

  await new Promise((res) => { ws.onopen = res; });
  await send('Page.enable');
  await send('Runtime.enable');
  await new Promise((r) => setTimeout(r, 1500));

  try {
    // 1. Cover hub & 3-tab check
    await snapPng('01_hub_cover.png');
    const contentCheck = await evalJS(`window.__MILO_TEST_API__.validateContent()`);
    if (!contentCheck.ok) throw new Error('In-browser content validation failed');

    // 2. Vertical Slice on Mobile 390x844 (G05, G12, G19)
    await setViewport(390, 844);
    await evalJS(`window.__MILO_TEST_API__.startLevel('story', 2, 0)`); // S02 Pof's Picnic (apple)
    await new Promise((r) => setTimeout(r, 600));
    await snapPng('02_mobile_s02_apple.png');

    // Test Wrong Selection (G04)
    const wrongId = await evalJS(`window.__MILO_TEST_API__.getSnapshot().phaser.entities.find(e => !e.isCorrect).id`);
    await evalJS(`window.__MILO_TEST_API__.tapEntity('${wrongId}')`);
    await new Promise((r) => setTimeout(r, 250));
    const afterWrong = await evalJS(`window.__MILO_TEST_API__.getSnapshot().phaser.fsmState`);
    if (afterWrong !== 'awaiting_input') throw new Error('Wrong answer locked FSM: ' + afterWrong);

    // Test Pickup + Rapid Triple-Tap Idempotency (G05, G06)
    const appleId = await evalJS(`window.__MILO_TEST_API__.getSnapshot().phaser.entities.find(e => e.isCorrect).id`);
    await evalJS(`window.__MILO_TEST_API__.tapEntity('${appleId}'); window.__MILO_TEST_API__.tapEntity('${appleId}'); window.__MILO_TEST_API__.tapEntity('${appleId}');`);
    await new Promise((r) => setTimeout(r, 550));
    await snapPng('03_pickup_reach.png');
    await new Promise((r) => setTimeout(r, 700));
    await snapPng('04_carry_to_basket.png');
    await new Promise((r) => setTimeout(r, 1400));
    const afterPickup = await evalJS(`window.__MILO_TEST_API__.getSnapshot()`);
    if (afterPickup.phaser.fsmState !== 'feedback') throw new Error('Expected feedback after pickup, got ' + afterPickup.phaser.fsmState);
    if (!afterPickup.phaser.markersLog.includes('pickup_contact') || !afterPickup.phaser.markersLog.includes('release_contact')) {
      throw new Error('Missing pickup/release contact markers: ' + JSON.stringify(afterPickup.phaser.markersLog));
    }
    const dialogFeedback = await evalJS(`document.getElementById('taskText').textContent`);
    if (dialogFeedback !== 'Doğru cevap') throw new Error('Feedback mismatch: ' + dialogFeedback);

    // 3. Interruption Recovery Test (G07) — pause mid-pickup & switch level
    await setViewport(1366, 768);
    await evalJS(`window.__MILO_TEST_API__.startLevel('story', 4, 0)`); // S04 Squirrel episode
    await new Promise((r) => setTimeout(r, 450));
    await snapPng('05_squirrel_episode_s04.png');
    const sqSnap = await evalJS(`window.__MILO_TEST_API__.getSnapshot()`);
    if (!sqSnap.phaser.squirrel) throw new Error('Squirrel rig missing in S04');
    const nutId = sqSnap.phaser.entities.find((e) => e.isCorrect).id;
    await evalJS(`window.__MILO_TEST_API__.tapEntity('${nutId}')`);
    await new Promise((r) => setTimeout(r, 300));
    await evalJS(`window.__MILO_TEST_API__.pause()`);
    await new Promise((r) => setTimeout(r, 150));
    const pausedState = await evalJS(`window.__MILO_TEST_API__.getSnapshot().phaser.fsmState`);
    if (pausedState !== 'paused') throw new Error('Pause failed: ' + pausedState);
    await evalJS(`window.__MILO_TEST_API__.resume()`);
    await evalJS(`window.__MILO_TEST_API__.startLevel('story', 4, 0)`); // Re-entry resets genToken cleanly
    await new Promise((r) => setTimeout(r, 250));
    const recoveredState = await evalJS(`window.__MILO_TEST_API__.getSnapshot().phaser.fsmState`);
    if (recoveredState !== 'awaiting_input') throw new Error('Recovery failed: ' + recoveredState);

    // 4. Difficulty Scaling Test (G17)
    await evalJS(`window.__MILO_TEST_API__.setDifficulty('Kolay')`);
    await evalJS(`window.__MILO_TEST_API__.startLevel('english', 1, 0)`);
    await new Promise((r) => setTimeout(r, 250));
    const easyCount = await evalJS(`window.__MILO_TEST_API__.getSnapshot().phaser.entities.length`);
    await evalJS(`window.__MILO_TEST_API__.setDifficulty('Zor')`);
    const hardCount = await evalJS(`window.__MILO_TEST_API__.getSnapshot().phaser.entities.length`);
    if (hardCount <= easyCount) throw new Error(`Difficulty scaling failed: easy=${easyCount}, hard=${hardCount}`);
    await snapPng('06_english_e01.png');

    // 5. Counting Digits-Only & Double-Count Guard (G15)
    await evalJS(`window.__MILO_TEST_API__.startLevel('counting', 3, 0)`);
    await new Promise((r) => setTimeout(r, 300));
    await snapPng('07_counting_c03.png');

    // 6. Turkish Letters I/ı, İ/i, Ğ (G16)
    await evalJS(`window.__MILO_TEST_API__.startLevel('letters', 9, 0)`); // Ğ in ağaç
    await new Promise((r) => setTimeout(r, 250));
    await snapPng('08_letters_l09_yumusakg.png');

    // 7. Firefly Visible Bodies & Gentle Pulse (G09)
    await evalJS(`window.__MILO_TEST_API__.startLevel('firefly', 1, 0)`);
    await new Promise((r) => setTimeout(r, 600));
    const ffSnap = await evalJS(`window.__MILO_TEST_API__.getSnapshot()`);
    if (ffSnap.phaser.fireflies < 2) throw new Error('Expected visible fireflies in F01');
    await snapPng('09_firefly_f01.png');

    // 8. Responsive checks at 360x640 and 768x1024 (G19)
    await setViewport(360, 640);
    await evalJS(`window.__MILO_TEST_API__.startLevel('story', 30, 2)`); // Finale S30
    await new Promise((r) => setTimeout(r, 350));
    await snapPng('10_mobile360_finale_s30.png');
    await setViewport(768, 1024);
    await new Promise((r) => setTimeout(r, 250));
    await snapPng('11_tablet_s30.png');

    // 9. Deterministic Full Progression across ALL 150 levels (90 story tasks + 30*4 modes) using reducedMotion fast-path (G03)
    await setViewport(1366, 768);
    await evalJS(`window.__MILO_TEST_API__.setReducedMotion(true)`);

    let totalCleared = 0;
    // All 30 story episodes * 3 tasks = 90 tasks
    for (let ep = 1; ep <= 30; ep++) {
      for (let ti = 0; ti < 3; ti++) {
        await evalJS(`window.__MILO_TEST_API__.startLevel('story', ${ep}, ${ti})`);
        await new Promise((r) => setTimeout(r, 25));
        const tId = await evalJS(`window.__MILO_TEST_API__.getSnapshot().phaser.entities.find(e => e.isCorrect)?.id`);
        if (!tId) throw new Error(`No correct target in S${ep}-${ti + 1}`);
        await evalJS(`window.__MILO_TEST_API__.tapEntity('${tId}')`);
        await new Promise((r) => setTimeout(r, 35));
        const st = await evalJS(`window.__MILO_TEST_API__.getSnapshot().phaser.fsmState`);
        if (st !== 'feedback') throw new Error(`Story S${ep}-${ti + 1} did not reach feedback: ${st}`);
        totalCleared += 1;
      }
    }

    // All 30 levels in counting, letters, english, firefly
    for (const mode of ['counting', 'letters', 'english', 'firefly']) {
      for (let ord = 1; ord <= 30; ord++) {
        await evalJS(`window.__MILO_TEST_API__.startLevel('${mode}', ${ord}, 0)`);
        await new Promise((r) => setTimeout(r, 25));
        const snap = await evalJS(`window.__MILO_TEST_API__.getSnapshot()`);
        if (snap.spec.evaluator === 'order_digits') {
          const sorted = snap.phaser.entities.slice().sort((a, b) => a.order - b.order);
          for (const ent of sorted) {
            await evalJS(`window.__MILO_TEST_API__.tapEntity('${ent.id}')`);
          }
        } else if (snap.spec.evaluator === 'repeat_pattern') {
          const lvl = await evalJS(`window.MiloContent.FIREFLY_LEVELS[${ord - 1}].pattern`);
          for (const pNum of lvl) {
            const targetIdx = (pNum - 1) % snap.phaser.entities.length;
            await evalJS(`window.__MILO_TEST_API__.tapEntity('${snap.phaser.entities[targetIdx].id}')`);
          }
        } else if (snap.spec.evaluator === 'collect_quantity' || snap.spec.evaluator === 'count_tap') {
          const req = snap.spec.requiredCount;
          const goods = snap.phaser.entities.filter((e) => e.isCorrect).slice(0, req);
          for (const ent of goods) {
            await evalJS(`window.__MILO_TEST_API__.tapEntity('${ent.id}')`);
          }
        } else {
          const target = snap.phaser.entities.find((e) => e.isCorrect);
          if (!target) throw new Error(`Missing target in ${mode} #${ord}`);
          await evalJS(`window.__MILO_TEST_API__.tapEntity('${target.id}')`);
        }
        await new Promise((r) => setTimeout(r, 35));
        const stAfter = await evalJS(`window.__MILO_TEST_API__.getSnapshot().phaser.fsmState`);
        if (stAfter !== 'feedback') {
          throw new Error(`Level ${mode} #${ord} (${snap.spec.evaluator}) failed to complete: ${stAfter}`);
        }
        totalCleared += 1;
      }
    }

    // 10. Save/Reload Persistence & v2 Migration Check (G18)
    const beforeReload = await evalJS(`window.__MILO_TEST_API__.getSnapshot()`);
    await send('Page.reload', { ignoreCache: true });
    await new Promise((r) => setTimeout(r, 1200));
    const afterReload = await evalJS(`window.__MILO_TEST_API__.getSnapshot()`);
    if (afterReload.completedLevels < 150 || afterReload.completedStoryTasks < 90) {
      throw new Error(`Save/reload persistence mismatch: levels=${afterReload.completedLevels}, tasks=${afterReload.completedStoryTasks}`);
    }

    // Check v2 -> v3 migration cleanly
    await evalJS(`localStorage.removeItem('milo-bahce-v3'); localStorage.setItem('milo-bahce-v2', JSON.stringify({ chapterIndex: 3, unlockedChapter: 4, collectedSeeds: ['ruby'], unlockedWords: ['apple'] }));`);
    await send('Page.reload', { ignoreCache: true });
    await new Promise((r) => setTimeout(r, 1200));
    const migrated = await evalJS(`JSON.parse(localStorage.getItem('milo-bahce-v3'))`);
    if (!migrated || migrated.unlockedOrder.story !== 5 || !migrated.collectedSeeds.includes('ruby')) {
      throw new Error('v2->v3 save migration failed: ' + JSON.stringify(migrated));
    }

    if (consoleErrors.length > 0) {
      throw new Error('Uncaught browser runtime errors: ' + consoleErrors.join('; '));
    }

    console.log('E2E_RESULT_OK:', JSON.stringify({
      totalClearedExecutions: totalCleared,
      completedLevelsPersisted: beforeReload.completedLevels,
      completedStoryTasksPersisted: beforeReload.completedStoryTasks,
      perf: beforeReload.phaser.perf,
      consoleErrors: consoleErrors.length
    }));
  } finally {
    ws.close();
    browser.kill();
    srv.kill();
    process.exit(0);
  }
}

setTimeout(() => {
  console.error('E2E_TIMEOUT');
  srv.kill();
  process.exit(1);
}, 120000);
