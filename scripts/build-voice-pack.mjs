import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const base = 'C:/Users/PC/.gemini/antigravity/scratch/milo-bahce-macerasi';
const outFile = path.join(base, 'js/voicePack.js');

// Load contentData.js in a sandbox to extract exact vocab & level strings
const sandbox = { window: {}, console };
sandbox.window = sandbox;
vm.runInNewContext(fs.readFileSync(path.join(base, 'js/contentData.js'), 'utf8'), sandbox);
const MC = sandbox.MiloContent;

const enWords = Object.keys(MC.VOCAB).sort();

const trSet = new Set();
const addTr = (s) => {
  if (!s) return;
  const clean = String(s).trim();
  if (clean) trSet.add(clean);
};

addTr('Doğru cevap');
addTr('İngilizce kelimeyi dinle ve uygun görseli seç.');
addTr('Tekrar bakalım!');

// All Turkish vocabulary meanings & pure-Turkish prompts/hints/distractor feedback
const trMeanings = new Set();
Object.keys(MC.VOCAB).forEach((k) => trMeanings.add(MC.VOCAB[k].tr));
trMeanings.add('turuncu');

for (const tr of trMeanings) {
  addTr('Haydi ' + tr + ' olanı bulalım.');
  addTr('İpucu: ' + tr + ' olanı ara.');
  addTr('Bu ' + tr + '. Tekrar bakalım!');
}

// Counting digits 1..15 + counting levels
for (let d = 1; d <= 15; d++) addTr(String(d));
MC.COUNTING_LEVELS.forEach((lvl) => {
  addTr(lvl.instructionTr);
  addTr(lvl.hintTr);
});

// Letters levels & wrong-selection hints
MC.LETTER_LEVELS.forEach((lvl) => {
  addTr(lvl.spokenPromptTr);
  addTr(lvl.instructionTr);
  addTr(lvl.hintTr);
});
['A', 'Ğ', 'Ç'].forEach((ch) => {
  addTr('Bu ' + ch + ' harfi. Ağaç kelimesindeki yumuşak g harfini seçelim.');
});
['I / ı', 'İ / i', 'Ç / ç', 'Ğ / ğ'].forEach((pr) => {
  addTr('Bu ' + pr.replace(' / ', ' ve ') + '. Şimdi noktalı İ ve i eşleşmesini bulalım.');
});

// Firefly levels & step hints
MC.FIREFLY_LEVELS.forEach((lvl) => {
  addTr(lvl.instructionTr);
  addTr(lvl.hintTr);
});
[1, 2, 3, 4].forEach((n) => {
  addTr('Işık sırasına tekrar bakalım! Sıradaki ' + n + ' numara.');
});

// Cast bios & Milo pet phrases
Object.keys(MC.CAST).forEach((cid) => {
  const info = MC.CAST[cid];
  addTr(info.name + '. ' + info.bio);
});
addTr('Hihi! Hadi birlikte keşfedelim!');
addTr('Sen harika bir kaşif arkadaşısın!');

const trTexts = Array.from(trSet).sort();

async function fetchTtsBase64(text, tl) {
  const url = `https://translate.googleapis.com/translate_tts?client=gtx&ie=UTF-8&tl=${encodeURIComponent(tl)}&q=${encodeURIComponent(text)}`;
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    if (res.ok) {
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length > 200) return buf.toString('base64');
    }
    if (attempt < 3) await new Promise((r) => setTimeout(r, 300 * attempt));
  }
  throw new Error(`TTS fetch failed for [${tl}] "${text}"`);
}

async function runPool(items, concurrency, worker) {
  const results = new Array(items.length);
  let nextIdx = 0;
  const runners = Array.from({ length: concurrency }, async () => {
    while (true) {
      const i = nextIdx++;
      if (i >= items.length) break;
      results[i] = await worker(items[i], i);
    }
  });
  await Promise.all(runners);
  return results;
}

console.log(`Fetching ${enWords.length} EN clips and ${trTexts.length} TR clips...`);

const enEntries = await runPool(enWords, 10, async (w) => [w, await fetchTtsBase64(w, 'en-US')]);
const trEntries = await runPool(trTexts, 10, async (t) => [t, await fetchTtsBase64(t, 'tr')]);

const pack = {
  en: Object.fromEntries(enEntries),
  tr: Object.fromEntries(trEntries)
};

const jsOut = [
  '// Auto-generated neural pronunciation & Turkish narration pack',
  'window.MiloVoicePack = ' + JSON.stringify(pack) + ';'
].join('\n');

fs.writeFileSync(outFile, jsOut, 'utf8');
console.log(`Generated ${outFile} (${(jsOut.length / 1024).toFixed(1)} KB, EN=${enEntries.length}, TR=${trEntries.length})`);
