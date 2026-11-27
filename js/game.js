(function () {
  'use strict';

  var STORAGE_KEY_V2 = 'milo-bahce-v2';
  var STORAGE_KEY_V3 = 'milo-bahce-v3';

  var defaultProgress = function () {
    return {
      schemaVersion: 3,
      activeMode: 'story',
      activeOrder: { story: 1, counting: 1, letters: 1, english: 1, firefly: 1 },
      unlockedOrder: { story: 1, counting: 1, letters: 1, english: 1, firefly: 1 },
      completedLevels: [],
      completedStoryTasks: [],
      storyTaskIndex: 0,
      collectedSeeds: [],
      unlockedWords: ['light', 'apple', 'orange', 'blueberry'],
      settings: {
        difficulty: 'Kolay',
        voiceOn: true,
        musicOn: true,
        sfxOn: true,
        reducedMotion: false
      }
    };
  };

  var state = defaultProgress();
  var el = {};
  var currentSpec = null;
  var failCount = 0;
  var idleTimer = null;
  var toastTimer = null;
  var bubbleTimer = null;
  var activeMapMode = 'story';
  var parentUnlocked = false;

  function $(id) {
    return document.getElementById(id);
  }

  function safeGetStorage(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }

  function safeSetStorage(key, val) {
    try { window.localStorage.setItem(key, val); } catch (e) {}
  }

  function loadProgress() {
    var rawV3 = safeGetStorage(STORAGE_KEY_V3);
    if (rawV3) {
      try {
        var p3 = JSON.parse(rawV3);
        if (p3 && p3.schemaVersion === 3) {
          state = Object.assign(defaultProgress(), p3);
          state.settings = Object.assign(defaultProgress().settings, p3.settings || {});
          return (state.completedLevels.length > 0 || state.unlockedOrder.story > 1);
        }
      } catch (e) {}
    }
    // Forward migration from v2 without losing existing saves
    var rawV2 = safeGetStorage(STORAGE_KEY_V2);
    if (rawV2) {
      try {
        var p2 = JSON.parse(rawV2);
        if (p2 && typeof p2.chapterIndex === 'number') {
          state.unlockedOrder.story = Math.max(1, Math.min(30, (p2.unlockedChapter || 0) + 1));
          state.activeOrder.story = Math.max(1, Math.min(30, (p2.chapterIndex || 0) + 1));
          if (Array.isArray(p2.collectedSeeds)) state.collectedSeeds = p2.collectedSeeds.slice();
          if (Array.isArray(p2.unlockedWords)) {
            p2.unlockedWords.forEach(function (w) {
              if (state.unlockedWords.indexOf(w) < 0) state.unlockedWords.push(w);
            });
          }
          saveProgress();
          return true;
        }
      } catch (e) {}
    }
    return false;
  }

  function saveProgress() {
    safeSetStorage(STORAGE_KEY_V3, JSON.stringify(state));
    // Keep v2 mirror synced for backward compatibility
    safeSetStorage(STORAGE_KEY_V2, JSON.stringify({
      chapterIndex: Math.max(0, state.activeOrder.story - 1),
      unlockedChapter: Math.max(0, state.unlockedOrder.story - 1),
      collectedSeeds: state.collectedSeeds,
      unlockedWords: state.unlockedWords
    }));
  }

  function applySettings() {
    window.MiloAudio.setVoice(state.settings.voiceOn);
    window.MiloAudio.setMusic(state.settings.musicOn);
    window.MiloAudio.setSfx(state.settings.sfxOn);
    var sysReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.body.classList.toggle('reduced-motion', !!(state.settings.reducedMotion || sysReduced));
    if (el.setVoiceChk) el.setVoiceChk.checked = state.settings.voiceOn;
    if (el.setMusicChk) el.setMusicChk.checked = state.settings.musicOn;
    if (el.setSfxChk) el.setSfxChk.checked = state.settings.sfxOn;
    if (el.setReducedChk) el.setReducedChk.checked = state.settings.reducedMotion;
    if (el.musicBtn) el.musicBtn.classList.toggle('off', !state.settings.musicOn);
    document.querySelectorAll('.diff-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-diff') === state.settings.difficulty);
    });
  }

  function showToast(msg) {
    if (!el.toastBanner) return;
    el.toastBanner.textContent = msg;
    el.toastBanner.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.toastBanner.classList.remove('show');
    }, 2600);
  }

  function showSpeechBubble(msg) {
    if (!el.speechBubble) return;
    el.speechBubble.textContent = msg;
    el.speechBubble.hidden = false;
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(function () {
      el.speechBubble.hidden = true;
    }, 2400);
  }

  function resetIdleTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function () {
      window.MiloPhaser.highlightHint();
    }, 9000);
  }

  function getChoiceCount(baseBand) {
    var diff = state.settings.difficulty;
    if (diff === 'Kolay') return baseBand === 'hard' ? 3 : 3;
    if (diff === 'Orta') return baseBand === 'easy' ? 3 : 4;
    return baseBand === 'easy' ? 4 : 5;
  }

  function currentLevelObj() {
    var list = window.MiloContent.getLevelsByMode(state.activeMode);
    var ord = Math.max(1, Math.min(list.length, state.activeOrder[state.activeMode] || 1));
    return list[ord - 1];
  }

  function pickDistractorKeys(excludeKeys, count, categoryHint) {
    var allKeys = Object.keys(window.MiloContent.VOCAB);
    var sameCat = allKeys.filter(function (k) {
      return excludeKeys.indexOf(k) < 0 && (!categoryHint || window.MiloContent.VOCAB[k].cat === categoryHint);
    });
    var others = allKeys.filter(function (k) {
      return excludeKeys.indexOf(k) < 0 && sameCat.indexOf(k) < 0;
    });
    var pool = sameCat.concat(others);
    return pool.slice(0, count);
  }

  function buildTaskSpec() {
    var lvl = currentLevelObj();
    var mode = state.activeMode;
    var diffCount = getChoiceCount(lvl.difficultyBand);
    var sysReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var reduced = !!(state.settings.reducedMotion || sysReduced);

    if (mode === 'story') {
      var tIdx = Math.max(0, Math.min(2, state.storyTaskIndex));
      var task = lvl.tasks[tIdx];
      var vocabTarget = window.MiloContent.VOCAB[task.targetEn];
      var distKeys = pickDistractorKeys([task.targetEn], Math.max(1, diffCount - 1), vocabTarget ? vocabTarget.cat : null);
      var rawCands = [{
        id: task.targetId,
        semanticTag: task.targetEn,
        tex: task.tex,
        labelTr: task.targetTr,
        ariaLabel: task.targetTr + ' (' + task.targetEn + ')',
        isCorrect: true
      }];
      distKeys.forEach(function (dk, i) {
        var dv = window.MiloContent.VOCAB[dk];
        rawCands.push({
          id: 'dist_' + task.id + '_' + i + '_' + dk,
          semanticTag: dk,
          tex: dv.tex,
          labelTr: dv.tr,
          ariaLabel: dv.tr + ' (' + dv.en + ')',
          isCorrect: false,
          wrongHintTr: 'Bu ' + dv.tr + '. Biz ' + task.targetTr + ' (' + task.targetEn + ') arıyoruz.'
        });
      });

      return {
        mode: 'story',
        levelId: lvl.id,
        taskId: task.id,
        order: lvl.order,
        titleTr: lvl.titleTr,
        sceneId: lvl.sceneId,
        friendId: lvl.friendId,
        speakerId: tIdx === 0 ? lvl.friendId : 'milo',
        dialogTr: tIdx === 0 ? lvl.dialogueIntroTr : (lvl.openingActionTr + ' ' + task.spokenPromptTr),
        instructionTr: task.instructionTr,
        hintTr: task.hintTr,
        wordEn: task.targetEn,
        wordTr: task.targetTr,
        approxTr: task.approxTr,
        evaluator: task.evaluator,
        transferDestination: task.transferDestination,
        showDropTarget: true,
        allowDrag: true,
        requiredCount: 1,
        difficulty: state.settings.difficulty,
        reducedMotion: reduced,
        worldChanges: {
          lit: state.collectedSeeds.length >= 3 || lvl.order >= 28,
          bridgeOpen: lvl.order >= 12
        },
        candidates: shuffle(rawCands, task.id)
      };
    }

    if (mode === 'counting') {
      var qty = lvl.quantity;
      // If optionalAdvanced (11-15) and difficulty is Kolay, gracefully keep within 10 or let user proceed
      var cands = [];
      if (lvl.evaluator === 'collect_quantity' || lvl.evaluator === 'count_tap') {
        var totalObjs = Math.min(15, qty + (lvl.evaluator === 'collect_quantity' ? 2 : 0));
        for (var i = 0; i < totalObjs; i++) {
          cands.push({
            id: 'cnt_' + lvl.id + '_' + i,
            semanticTag: lvl.objectTr,
            tex: lvl.tex,
            labelTr: lvl.objectTr,
            hideLabel: true,
            ariaLabel: (i + 1) + '. ' + lvl.objectTr,
            isCorrect: true
          });
        }
      } else if (lvl.evaluator === 'order_digits') {
        for (var d = 1; d <= qty; d++) {
          cands.push({
            id: 'dig_' + lvl.id + '_' + d,
            semanticTag: 'digit_' + d,
            digitText: String(d),
            order: d,
            hideLabel: true,
            ariaLabel: String(d),
            isCorrect: true
          });
        }
        cands = shuffle(cands, lvl.id);
      } else {
        // compare_groups / match_quantity (digits only!)
        var groupCounts = [qty, Math.max(1, qty - 1), qty + 1];
        if (diffCount >= 4) groupCounts.push(qty + 2);
        groupCounts = shuffle(groupCounts, lvl.id);
        groupCounts.forEach(function (gc, gi) {
          cands.push({
            id: 'grp_' + lvl.id + '_' + gi + '_' + gc,
            semanticTag: 'group_' + gc,
            tex: lvl.tex,
            groupCount: gc,
            showDigit: lvl.evaluator === 'compare_groups',
            hideLabel: true,
            ariaLabel: String(gc) + ' ' + lvl.objectTr,
            isCorrect: gc === qty,
            wrongHintTr: 'Bu grupta ' + gc + ' tane var. Biz ' + qty + ' tane arıyoruz.'
          });
        });
      }

      return {
        mode: 'counting',
        levelId: lvl.id,
        taskId: lvl.id,
        order: lvl.order,
        titleTr: lvl.titleTr,
        sceneId: lvl.sceneId,
        friendId: 'pof',
        speakerId: 'pof',
        dialogTr: 'Pof: “Haydi rakamlarla sayalım! ' + lvl.instructionTr + '”',
        instructionTr: lvl.instructionTr,
        hintTr: lvl.hintTr,
        evaluator: lvl.evaluator,
        transferDestination: 'basket',
        showDropTarget: lvl.evaluator === 'collect_quantity',
        allowDrag: lvl.evaluator === 'collect_quantity',
        requiredCount: qty,
        difficulty: state.settings.difficulty,
        reducedMotion: reduced,
        candidates: cands
      };
    }

    if (mode === 'letters') {
      var lCands = [];
      if (lvl.evaluator === 'recognize_in_word') {
        // Ğ inside AĞAÇ without fabricating onset
        ['A', 'Ğ', 'A', 'Ç'].forEach(function (ch, idx) {
          lCands.push({
            id: 'ltr_' + lvl.id + '_' + idx,
            semanticTag: 'letter_' + ch,
            letterText: ch,
            hideLabel: true,
            ariaLabel: ch + ' harfi',
            isCorrect: ch === 'Ğ',
            wrongHintTr: 'Bu ' + ch + ' harfi. “AĞAÇ” kelimesindeki Ğ harfini seçelim.'
          });
        });
      } else if (lvl.evaluator === 'match_case_review') {
        var pairs = ['I / ı', 'İ / i', 'Ç / ç', 'Ğ / ğ'];
        lCands = pairs.map(function (pr, pi) {
          return {
            id: 'ltr_' + lvl.id + '_' + pi,
            semanticTag: pr,
            letterText: pr,
            hideLabel: true,
            ariaLabel: pr + ' eşleşmesi',
            isCorrect: pi === 1,
            wrongHintTr: 'Bu ' + pr + '. Şimdi noktalı İ / i eşleşmesini bulalım.'
          };
        });
      } else {
        var targetChar = lvl.evaluator === 'match_case' ? lvl.lowercase : lvl.letter;
        var distractorChars = lvl.letter === 'I' ? ['i', 'İ', 'l']
          : lvl.letter === 'İ' ? ['ı', 'I', 'l']
          : lvl.evaluator === 'match_case' ? ['a', 'e', 'k', 'm', 's', 'ı', 'i']
          : ['A', 'E', 'K', 'M', 'S', 'I', 'İ'];
        var pickedDist = distractorChars.filter(function (c) { return c !== targetChar; }).slice(0, Math.max(2, diffCount - 1));

        lCands.push({
          id: 'ltr_' + lvl.id + '_target',
          semanticTag: 'letter_' + targetChar,
          letterText: targetChar,
          tex: lvl.evaluator === 'picture_initial' ? lvl.exampleTex : null,
          labelTr: lvl.evaluator === 'picture_initial' ? (lvl.letter + ' — ' + lvl.exampleTr) : null,
          hideLabel: lvl.evaluator !== 'picture_initial',
          ariaLabel: targetChar + ' harfi (' + lvl.exampleTr + ')',
          isCorrect: true
        });
        pickedDist.forEach(function (dc, di) {
          lCands.push({
            id: 'ltr_' + lvl.id + '_d_' + di,
            semanticTag: 'letter_' + dc,
            letterText: dc,
            hideLabel: true,
            ariaLabel: dc + ' harfi',
            isCorrect: false,
            wrongHintTr: 'Bu ' + dc + ' harfi. Biz ' + targetChar + ' harfini arıyoruz.'
          });
        });
        lCands = shuffle(lCands, lvl.id);
      }

      return {
        mode: 'letters',
        levelId: lvl.id,
        taskId: lvl.id,
        order: lvl.order,
        titleTr: lvl.titleTr,
        sceneId: lvl.sceneId,
        friendId: 'lila',
        speakerId: 'lila',
        letter: lvl.letter,
        lowercase: lvl.lowercase,
        exampleTr: lvl.exampleTr,
        dialogTr: 'Lila: “' + lvl.spokenPromptTr + '”',
        instructionTr: lvl.instructionTr,
        hintTr: lvl.hintTr,
        evaluator: lvl.evaluator,
        transferDestination: 'matching_slot',
        showDropTarget: false,
        allowDrag: false,
        requiredCount: 1,
        difficulty: state.settings.difficulty,
        reducedMotion: reduced,
        candidates: lCands
      };
    }

    if (mode === 'english') {
      var v = window.MiloContent.VOCAB[lvl.targetEn];
      var dKeys = pickDistractorKeys([lvl.targetEn], Math.max(2, diffCount - 1), v ? v.cat : null);
      var eCands = [{
        id: 'eng_' + lvl.id + '_' + lvl.targetEn,
        semanticTag: lvl.targetEn,
        tex: lvl.tex,
        labelTr: lvl.targetTr,
        ariaLabel: lvl.targetTr + ' (' + lvl.targetEn + ')',
        isCorrect: true
      }];
      dKeys.forEach(function (dk, i) {
        var dv = window.MiloContent.VOCAB[dk];
        eCands.push({
          id: 'eng_' + lvl.id + '_d_' + i,
          semanticTag: dk,
          tex: dv.tex,
          labelTr: dv.tr,
          ariaLabel: dv.tr + ' (' + dv.en + ')',
          isCorrect: false,
          wrongHintTr: 'Bu ' + dv.tr + ' (' + dv.en + '). Biz ' + lvl.targetTr + ' (' + lvl.targetEn + ') arıyoruz.'
        });
      });

      return {
        mode: 'english',
        levelId: lvl.id,
        taskId: lvl.id,
        order: lvl.order,
        titleTr: lvl.titleTr,
        sceneId: lvl.sceneId,
        friendId: 'mavis',
        speakerId: 'milo',
        dialogTr: 'Milo: “İngilizce ‘' + lvl.targetEn + '’ kelimesini dinle ve uygun görseli seç!”',
        instructionTr: lvl.instructionTr,
        hintTr: lvl.hintTr,
        wordEn: lvl.targetEn,
        wordTr: lvl.targetTr,
        approxTr: lvl.approxTr,
        evaluator: lvl.evaluator,
        transferDestination: 'basket',
        showDropTarget: true,
        allowDrag: true,
        requiredCount: 1,
        difficulty: state.settings.difficulty,
        reducedMotion: reduced,
        candidates: shuffle(eCands, lvl.id)
      };
    }

    // Firefly mode
    var targetIdx = (lvl.order - 1) % (lvl.visibleFireflies || 2);
    return {
      mode: 'firefly',
      levelId: lvl.id,
      taskId: lvl.id,
      order: lvl.order,
      titleTr: lvl.titleTr,
      sceneId: lvl.sceneId,
      friendId: 'lila',
      speakerId: 'lila',
      dialogTr: 'Lila: “Alacakaranlık bahçesinde ışığımı takip et! ' + lvl.instructionTr + '”',
      instructionTr: lvl.instructionTr,
      hintTr: lvl.hintTr,
      evaluator: lvl.evaluator,
      visibleFireflies: lvl.visibleFireflies,
      pulseCount: lvl.pulseCount,
      pattern: lvl.pattern,
      flowerCount: lvl.flowerCount,
      minPulseIntervalMs: lvl.minPulseIntervalMs,
      targetFireflyIdx: targetIdx,
      showDropTarget: false,
      allowDrag: false,
      requiredCount: lvl.evaluator === 'repeat_pattern' ? lvl.pattern.length : 1,
      difficulty: state.settings.difficulty,
      reducedMotion: reduced
    };
  }

  function shuffle(arr, seedStr) {
    var copy = arr.slice();
    var h = 2166136261;
    for (var s = 0; s < seedStr.length; s++) {
      h ^= seedStr.charCodeAt(s);
      h = Math.imul(h, 16777619);
    }
    for (var i = copy.length - 1; i > 0; i--) {
      h += 0x6D2B79F5;
      var t = Math.imul(h ^ (h >>> 15), 1 | h);
      var j = ((t ^ (t >>> 14)) >>> 0) % (i + 1);
      var tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  function renderAccessibleMirror(entities) {
    if (!el.a11yStageControls) return;
    el.a11yStageControls.innerHTML = '';
    (entities || []).forEach(function (ent) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'a11y-entity-btn';
      btn.setAttribute('aria-label', ent.ariaLabel || ent.semanticTag);
      btn.setAttribute('data-entity-id', ent.id);
      btn.disabled = !ent.available;
      btn.textContent = ent.ariaLabel || ent.semanticTag;
      btn.addEventListener('click', function () {
        window.MiloPhaser.triggerEntityById(ent.id);
      });
      el.a11yStageControls.appendChild(btn);
    });
  }

  function updateVisualHelperStrip(spec) {
    if (!el.visualHelperStrip) return;
    if (spec.mode === 'counting') {
      el.visualHelperStrip.hidden = false;
      var dotsHtml = '';
      var maxDots = Math.min(10, spec.requiredCount);
      for (var di = 0; di < maxDots; di++) {
        dotsHtml += '<span class="tenframe-dot" data-dot="' + di + '"></span>';
      }
      el.visualHelperStrip.innerHTML = '<span>Hedef sayı: <strong class="digit-pill">' + spec.requiredCount + '</strong></span>' +
        '<span class="tenframe-row" aria-hidden="true">' + dotsHtml + '</span>' +
        '<span>Sayılan: <strong class="digit-pill" id="countProgressDigit">0</strong> / <strong class="digit-pill">' + spec.requiredCount + '</strong></span>';
    } else if (spec.mode === 'firefly') {
      el.visualHelperStrip.hidden = false;
      var dots = (spec.pattern || [spec.pulseCount || 1]).map(function (n) {
        return '<span class="pattern-badge">♪ ' + '✦'.repeat(n) + ' (' + n + ')</span>';
      }).join(' ');
      el.visualHelperStrip.innerHTML = '<span>Işık & Ritim İpucu:</span> ' + dots;
    } else if (spec.mode === 'letters') {
      el.visualHelperStrip.hidden = false;
      var wordUpper = (spec.exampleTr || '').toLocaleUpperCase('tr-TR');
      var highlighted = wordUpper.split('').map(function (ch) {
        return ch === spec.letter ? '<strong class="hl-letter">' + ch + '</strong>' : '<span>' + ch + '</span>';
      }).join('');
      el.visualHelperStrip.innerHTML = '<span>Harf: <strong class="digit-pill">' + spec.letter + ' / ' + spec.lowercase + '</strong></span>' +
        '<span class="word-letters-pill">' + highlighted + '</span>';
    } else if (spec.wordEn && window.innerWidth > 600) {
      el.visualHelperStrip.hidden = false;
      el.visualHelperStrip.innerHTML = '<span class="learn-badge">Öğrenme Kartı</span>' +
        '<strong>' + spec.wordEn + '</strong> = <span>' + spec.wordTr + '</span>' +
        '<span class="phonetic-pill">okunuş: ' + spec.approxTr + '</span>';
    } else {
      el.visualHelperStrip.hidden = true;
      el.visualHelperStrip.innerHTML = '';
    }
  }

  function updateSeedAndWordHud() {
    el.wordsBadge.textContent = String(state.unlockedWords.length);
    var slots = el.seedJar.querySelectorAll('.seed-slot');
    for (var i = 0; i < slots.length; i++) {
      var seedId = slots[i].getAttribute('data-seed');
      slots[i].classList.toggle('lit', state.collectedSeeds.indexOf(seedId) >= 0);
    }
  }

  function renderCurrentTask(speakAudio) {
    failCount = 0;
    currentSpec = buildTaskSpec();

    var modeNames = {
      story: 'Hikâye',
      counting: 'Sayı Bahçesi',
      letters: 'Harf Ormanı',
      english: 'İngilizce',
      firefly: 'Ateş Böceği'
    };
    el.chapterPill.textContent = modeNames[currentSpec.mode] + ' ' + currentSpec.order + ' / 30';
    el.chapterSubtitle.textContent = currentSpec.titleTr;

    if (currentSpec.mode === 'story') {
      el.taskStepPill.hidden = false;
      var starsStr = '';
      for (var si = 0; si < 3; si++) {
        starsStr += si < state.storyTaskIndex ? '★' : (si === state.storyTaskIndex ? '✦' : '☆');
      }
      el.taskStepPill.textContent = starsStr + ' Görev ' + (state.storyTaskIndex + 1) + ' / 3';
    } else {
      el.taskStepPill.hidden = true;
    }

    var speaker = window.MiloContent.CAST[currentSpec.speakerId] || window.MiloContent.CAST.milo;
    el.speakerName.textContent = speaker.name;
    el.speakerPortrait.innerHTML = window.MiloArt.renderPortrait(speaker.id);
    el.dialogText.textContent = currentSpec.dialogTr;
    el.taskText.textContent = currentSpec.instructionTr;
    window.MiloCinematics.animateDialogChange();

    if (currentSpec.wordEn) {
      el.wordChip.hidden = false;
      el.wordEn.textContent = currentSpec.wordEn;
      el.wordTr.textContent = currentSpec.wordTr;
      el.wordApprox.textContent = '(yaklaşık: ' + currentSpec.approxTr + ')';
      el.slowBtn.hidden = false;
      window.MiloCinematics.animateWordChipIn();
    } else {
      el.wordChip.hidden = true;
      el.slowBtn.hidden = true;
    }

    el.replayDemoBtn.hidden = currentSpec.mode !== 'firefly';
    el.traceLetterBtn.hidden = currentSpec.mode !== 'letters';
    el.nextBtn.hidden = true;

    updateVisualHelperStrip(currentSpec);
    updateSeedAndWordHud();
    resetIdleTimer();

    window.MiloPhaser.loadTaskSpec(currentSpec);

    if (speakAudio !== false && el.coverOverlay.hidden) {
      window.MiloAudio.stopSpeech();
      window.MiloAudio.speakTR(currentSpec.instructionTr);
      if (currentSpec.wordEn && state.settings.voiceOn && !window.MiloAudio.isMuted()) {
        setTimeout(function () {
          if (currentSpec && currentSpec.wordEn && el.coverOverlay.hidden) {
            window.MiloAudio.speakEN(currentSpec.wordEn, { slow: false });
          }
        }, 1600);
      }
    }
  }

  function handleTaskCompleted() {
    clearTimeout(idleTimer);
    if (!currentSpec) return;

    // Exact required success phrase across all modes (G12)
    el.dialogText.textContent = 'Doğru cevap!';
    el.taskText.textContent = 'Doğru cevap';
    window.MiloAudio.speakSuccessExact();
    showToast('Doğru cevap');

    if (currentSpec.wordEn && state.unlockedWords.indexOf(currentSpec.wordEn) < 0) {
      state.unlockedWords.push(currentSpec.wordEn);
    }

    if (currentSpec.mode === 'story') {
      if (state.completedStoryTasks.indexOf(currentSpec.taskId) < 0) {
        state.completedStoryTasks.push(currentSpec.taskId);
      }
      var ep = currentLevelObj();
      if (state.storyTaskIndex >= 2) {
        // Episode complete! Commit world outcome & seeds
        if (state.completedLevels.indexOf(ep.id) < 0) state.completedLevels.push(ep.id);
        if (ep.order >= 7 && state.collectedSeeds.indexOf('ruby') < 0) state.collectedSeeds.push('ruby');
        if (ep.order >= 14 && state.collectedSeeds.indexOf('amber') < 0) state.collectedSeeds.push('amber');
        if (ep.order >= 25 && state.collectedSeeds.indexOf('sapphire') < 0) state.collectedSeeds.push('sapphire');
        if (ep.order >= 29 && state.collectedSeeds.indexOf('gold') < 0) state.collectedSeeds.push('gold');
        if (ep.order < 30) {
          state.unlockedOrder.story = Math.max(state.unlockedOrder.story, ep.order + 1);
        }
        el.dialogText.textContent = 'Doğru cevap! ' + ep.outcomeTr;
      }
    } else {
      if (state.completedLevels.indexOf(currentSpec.levelId) < 0) {
        state.completedLevels.push(currentSpec.levelId);
      }
      if (currentSpec.order < 30) {
        state.unlockedOrder[currentSpec.mode] = Math.max(state.unlockedOrder[currentSpec.mode], currentSpec.order + 1);
      }
    }

    updateSeedAndWordHud();
    saveProgress();

    el.nextBtn.hidden = false;
    el.nextBtn.textContent = (currentSpec.mode === 'story' && state.storyTaskIndex < 2)
      ? 'Sonraki Görev →'
      : (currentSpec.order >= 30 && currentSpec.mode === 'story' ? '🏆 Kutlamayı Gör' : 'Devam Et →');
  }

  function advanceNext() {
    if (!currentSpec) return;
    window.MiloAudio.stopSpeech();

    if (currentSpec.mode === 'story' && state.storyTaskIndex < 2) {
      state.storyTaskIndex += 1;
      saveProgress();
      renderCurrentTask(true);
      return;
    }

    var ord = state.activeOrder[state.activeMode] || 1;
    if (ord < 30) {
      state.activeOrder[state.activeMode] = ord + 1;
      state.storyTaskIndex = 0;
      saveProgress();
      window.MiloPhaser.walkToNextScene(function () {
        var nextLvl = currentLevelObj();
        window.MiloCinematics.showChapterBanner(el.chapterBanner, nextLvl.order, nextLvl.titleTr);
        renderCurrentTask(true);
      });
    } else if (state.activeMode === 'story') {
      openFinaleModal();
    } else {
      showToast('Bu moddaki tüm 30 bölümü tamamladın!');
      openMapModal(state.activeMode);
    }
  }

  function startModeLevel(mode, order, taskIdx) {
    window.MiloAudio.unlock();
    window.MiloAudio.stopSpeech();
    state.activeMode = mode;
    state.activeOrder[mode] = Math.max(1, Math.min(30, order || 1));
    state.storyTaskIndex = taskIdx || 0;
    saveProgress();

    if (!el.coverOverlay.hidden) {
      window.MiloCinematics.animateCoverOut(el.coverOverlay, function () {
        var lvl = currentLevelObj();
        window.MiloCinematics.showChapterBanner(el.chapterBanner, lvl.order, lvl.titleTr);
        renderCurrentTask(true);
      });
    } else {
      var lvl = currentLevelObj();
      window.MiloCinematics.showChapterBanner(el.chapterBanner, lvl.order, lvl.titleTr);
      renderCurrentTask(true);
    }
  }

  function openWordsModal() {
    window.MiloAudio.unlock();
    window.MiloAudio.playPop();
    el.wordsGrid.innerHTML = '';
    Object.keys(window.MiloContent.VOCAB).forEach(function (k) {
      var w = window.MiloContent.VOCAB[k];
      var unlocked = state.unlockedWords.indexOf(k) >= 0;
      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'flashcard' + (unlocked ? '' : ' locked');
      card.innerHTML = '<div class="fc-badge">' + (unlocked ? w.en.charAt(0).toUpperCase() : '?') + '</div>' +
        '<strong>' + (unlocked ? w.en : '???') + '</strong>' +
        '<span>' + (unlocked ? (w.tr + ' • ' + w.approx) : 'Hikâyede açılır') + '</span>';
      card.onclick = function () {
        if (!unlocked) { showToast('Bu kelimeyi ilerledikçe öğreneceksin!'); return; }
        var res = window.MiloAudio.speakEN(w.en, { slow: false });
        if (!res.spoken && res.reason === 'no-english-voice') {
          showToast(w.en + ' = ' + w.tr + ' (İngilizce ses cihazda yok; yaklaşık: ' + w.approx + ')');
        } else {
          showToast(w.en + ' = ' + w.tr + ' (yaklaşık: ' + w.approx + ')');
        }
      };
      el.wordsGrid.appendChild(card);
    });

    el.friendsGrid.innerHTML = '';
    ['nine', 'pof', 'mavis', 'lila', 'sincap'].forEach(function (fid) {
      var info = window.MiloContent.CAST[fid];
      var card = document.createElement('button');
      card.type = 'button';
      card.className = 'flashcard';
      card.innerHTML = window.MiloArt.renderFriend(fid) + '<strong>' + info.name + '</strong><span>' + info.role + '</span>';
      card.onclick = function () {
        window.MiloAudio.playGiggle();
        window.MiloAudio.speakTR(info.name + '. ' + info.bio);
        showToast(info.bio);
      };
      el.friendsGrid.appendChild(card);
    });
    window.MiloCinematics.animateModalOpen(el.wordsModal);
  }

  function openMapModal(modeOverride) {
    activeMapMode = modeOverride || state.activeMode || 'story';
    document.querySelectorAll('#mapModeTabs button').forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-mapmode') === activeMapMode);
    });
    el.mapPath.innerHTML = '';
    var list = window.MiloContent.getLevelsByMode(activeMapMode);
    var unlockedMax = state.unlockedOrder[activeMapMode] || 1;
    var curOrd = state.activeOrder[activeMapMode] || 1;

    list.forEach(function (lvl) {
      var unlocked = lvl.order <= unlockedMax;
      var done = state.completedLevels.indexOf(lvl.id) >= 0;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'map-stop' + (lvl.order === curOrd ? ' current' : '') + (unlocked ? '' : ' locked');
      btn.innerHTML = '<div class="map-stop-top"><span>' + lvl.id + '</span><span>' +
        (done ? '⭐ Tamamlandı' : lvl.order === curOrd ? '📍 Buradasın' : unlocked ? '✨ Açık' : '🔒 Kilitli') +
        '</span></div><strong>' + lvl.titleTr + '</strong>';
      btn.onclick = function () {
        if (!unlocked) { showToast('Önce önceki bölümü tamamlayalım!'); return; }
        window.MiloCinematics.animateModalClose(el.mapModal);
        startModeLevel(activeMapMode, lvl.order, 0);
      };
      el.mapPath.appendChild(btn);
    });
    window.MiloCinematics.animateModalOpen(el.mapModal);
  }

  function openExploreList() {
    if (!el.exploreGrid) return;
    el.exploreGrid.innerHTML = '';
    var unlockedStory = state.unlockedOrder.story || 1;
    var scenes = [
      { title: 'Nine’nin Meydanı', sceneId: 'square', order: 1, min: 1 },
      { title: 'Elma Bahçesi', sceneId: 'orchard', order: 2, min: 1 },
      { title: 'Gökkuşağı Deresi', sceneId: 'stream', order: 8, min: 1 },
      { title: 'Buğulu Cam Sera', sceneId: 'greenhouse', order: 15, min: 1 },
      { title: 'Yıldızlı Çalılık', sceneId: 'glade', order: 22, min: 1 },
      { title: 'Şafak Çanı Meydanı', sceneId: 'finale', order: 29, min: 1 }
    ];
    scenes.forEach(function (sc) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'mode-portal';
      b.innerHTML = '<strong>' + sc.title + '</strong><span>Bölüm ' + sc.order + ' • Serbest gez</span>';
      b.onclick = function () {
        startModeLevel('story', Math.min(unlockedStory, sc.order), 0);
      };
      el.exploreGrid.appendChild(b);
    });
  }

  function openFinaleModal() {
    el.finaleBadgeArt.innerHTML = window.MiloArt.renderFinaleBadge();
    el.finaleWordsSummary.innerHTML = '';
    state.unlockedWords.slice(0, 12).forEach(function (k) {
      var w = window.MiloContent.VOCAB[k];
      if (!w) return;
      var pill = document.createElement('span');
      pill.className = 'finale-word-pill';
      pill.textContent = w.en + ' • ' + w.tr;
      el.finaleWordsSummary.appendChild(pill);
    });
    window.MiloAudio.playVictoryFanfare();
    window.MiloCinematics.animateModalOpen(el.finaleOverlay);
  }

  function initTracePad(letter) {
    var canvas = el.traceCanvas;
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff9ec';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = 'bold 165px ui-rounded, Nunito, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'rgba(130, 168, 145, 0.28)';
    ctx.fillText(letter || 'A', 140, 125);
    ctx.setLineDash([8, 8]);
    ctx.strokeStyle = 'rgba(86, 115, 103, 0.45)';
    ctx.lineWidth = 3;
    ctx.strokeText(letter || 'A', 140, 125);
    ctx.setLineDash([]);

    var drawing = false;
    function pt(e) {
      var r = canvas.getBoundingClientRect();
      return { x: (e.clientX - r.left) * (canvas.width / r.width), y: (e.clientY - r.top) * (canvas.height / r.height) };
    }
    canvas.onpointerdown = function (e) {
      drawing = true;
      var p = pt(e);
      ctx.strokeStyle = '#e56854';
      ctx.lineWidth = 18;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
    };
    canvas.onpointermove = function (e) {
      if (!drawing) return;
      var p = pt(e);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    };
    window.addEventListener('pointerup', function () { drawing = false; });
  }

  function cacheElements() {
    var ids = [
      'gameShell', 'stage', 'phaserMount', 'a11yStageControls', 'fogLayer', 'fogCanvas', 'fogTapHelpBtn',
      'chapterBanner', 'speechBubble', 'homeHubBtn', 'mapBtn', 'chapterPill', 'seedJar',
      'wordsBtn', 'wordsBadge', 'pauseBtn', 'musicBtn', 'soundBtn',
      'dialogCard', 'speakerPortrait', 'speakerName', 'chapterSubtitle', 'taskStepPill', 'dialogText', 'replayVoiceBtn',
      'visualHelperStrip', 'taskBar', 'taskText', 'wordChip', 'wordEn', 'wordTr', 'wordApprox', 'wordPlayBtn', 'wordSlowBtn',
      'hintBtn', 'replayDemoBtn', 'traceLetterBtn', 'slowBtn', 'nextBtn', 'toastBanner',
      'coverOverlay', 'coverArt', 'openParentBtn', 'startFreshBtn', 'continueBtn',
      'hubPanelStory', 'hubPanelAcademy', 'hubPanelExplore', 'exploreGrid',
      'pauseModal', 'resumeBtn', 'pauseReplayBtn', 'pauseMapBtn', 'pauseHomeBtn',
      'traceModal', 'traceCanvas', 'closeTraceBtn', 'clearTraceBtn', 'doneTraceBtn',
      'parentModal', 'closeParentBtn', 'parentGate', 'parentSettingsBody', 'setVoiceChk', 'setMusicChk', 'setSfxChk', 'setReducedChk', 'parentSummaryText', 'resetConfirmBtn',
      'wordsModal', 'wordsGrid', 'friendsGrid', 'closeWordsBtn',
      'mapModal', 'mapPath', 'mapModeTabs', 'unlockAllBtn', 'closeMapBtn',
      'finaleOverlay', 'finaleBadgeArt', 'finaleWordsSummary', 'exploreGardenBtn', 'playAgainBtn'
    ];
    ids.forEach(function (id) { el[id] = $(id); });
  }

  function bindEvents() {
    el.coverArt.innerHTML = window.MiloArt.renderMilo();

    // Hub tabs
    document.querySelectorAll('.hub-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = tab.getAttribute('data-hub');
        document.querySelectorAll('.hub-tab').forEach(function (t) {
          var active = t === tab;
          t.classList.toggle('active', active);
          t.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        el.hubPanelStory.hidden = target !== 'story';
        el.hubPanelAcademy.hidden = target !== 'academy';
        el.hubPanelExplore.hidden = target !== 'explore';
        if (target === 'explore') openExploreList();
      });
    });

    // Academy mode portals
    document.querySelectorAll('.mode-portal[data-mode]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var m = btn.getAttribute('data-mode');
        startModeLevel(m, state.unlockedOrder[m] || 1, 0);
      });
    });

    el.startFreshBtn.addEventListener('click', function () {
      startModeLevel('story', 1, 0);
    });

    el.continueBtn.addEventListener('click', function () {
      startModeLevel(state.activeMode || 'story', state.activeOrder[state.activeMode || 'story'] || 1, state.storyTaskIndex || 0);
    });

    el.homeHubBtn.addEventListener('click', function () {
      window.MiloAudio.stopSpeech();
      window.MiloPhaser.setPaused(false);
      el.coverOverlay.hidden = false;
      window.MiloCinematics.animateCoverIn();
    });

    el.pauseBtn.addEventListener('click', function () {
      window.MiloAudio.stopSpeech();
      window.MiloPhaser.setPaused(true);
      window.MiloCinematics.animateModalOpen(el.pauseModal);
    });
    el.resumeBtn.addEventListener('click', function () {
      window.MiloPhaser.setPaused(false);
      window.MiloCinematics.animateModalClose(el.pauseModal);
    });
    el.pauseReplayBtn.addEventListener('click', function () {
      window.MiloPhaser.setPaused(false);
      window.MiloCinematics.animateModalClose(el.pauseModal);
      if (currentSpec) window.MiloAudio.speakTR(currentSpec.instructionTr);
    });
    el.pauseMapBtn.addEventListener('click', function () {
      window.MiloPhaser.setPaused(false);
      window.MiloCinematics.animateModalClose(el.pauseModal);
      openMapModal(state.activeMode);
    });
    el.pauseHomeBtn.addEventListener('click', function () {
      window.MiloPhaser.setPaused(false);
      window.MiloCinematics.animateModalClose(el.pauseModal);
      el.homeHubBtn.click();
    });

    el.replayVoiceBtn.addEventListener('click', function () {
      window.MiloAudio.unlock();
      if (currentSpec) window.MiloAudio.speakTR(currentSpec.instructionTr);
    });

    el.wordPlayBtn.addEventListener('click', function () {
      window.MiloAudio.unlock();
      if (currentSpec && currentSpec.wordEn) {
        var r = window.MiloAudio.speakEN(currentSpec.wordEn, { slow: false });
        if (!r.spoken && r.reason === 'no-english-voice') {
          showToast('Cihazda İngilizce ses yok; yaklaşık okunuş: ' + currentSpec.approxTr);
        }
      }
    });

    el.wordSlowBtn.addEventListener('click', function () {
      window.MiloAudio.unlock();
      if (currentSpec && currentSpec.wordEn) {
        window.MiloAudio.speakEN(currentSpec.wordEn, { slow: true });
      }
    });
    el.slowBtn.addEventListener('click', function () { el.wordSlowBtn.click(); });

    el.hintBtn.addEventListener('click', function () {
      window.MiloAudio.unlock();
      window.MiloAudio.playChime(3);
      if (currentSpec) {
        showToast('💡 ' + currentSpec.hintTr);
        window.MiloPhaser.highlightHint();
        window.MiloAudio.speakTR(currentSpec.hintTr);
      }
    });

    el.replayDemoBtn.addEventListener('click', function () {
      window.MiloAudio.unlock();
      window.MiloPhaser.playFireflyDemo();
    });

    el.traceLetterBtn.addEventListener('click', function () {
      if (currentSpec) initTracePad(currentSpec.letter);
      window.MiloCinematics.animateModalOpen(el.traceModal);
    });
    el.closeTraceBtn.addEventListener('click', function () { window.MiloCinematics.animateModalClose(el.traceModal); });
    el.clearTraceBtn.addEventListener('click', function () { if (currentSpec) initTracePad(currentSpec.letter); });
    el.doneTraceBtn.addEventListener('click', function () {
      window.MiloAudio.playChime(4);
      window.MiloCinematics.animateModalClose(el.traceModal);
    });

    el.nextBtn.addEventListener('click', function () {
      window.MiloAudio.unlock();
      window.MiloAudio.playPop();
      advanceNext();
    });

    el.soundBtn.addEventListener('click', function () {
      var nextMuted = !window.MiloAudio.isMuted();
      window.MiloAudio.setMuted(nextMuted);
      el.soundBtn.textContent = nextMuted ? '🔇' : '🔊';
      el.soundBtn.classList.toggle('off', nextMuted);
      showToast(nextMuted ? 'Sesler kapatıldı; oyun görsel olarak devam eder.' : 'Sesler açıldı');
    });

    el.musicBtn.addEventListener('click', function () {
      window.MiloAudio.unlock();
      state.settings.musicOn = !state.settings.musicOn;
      applySettings();
      saveProgress();
      showToast(state.settings.musicOn ? 'Müzik açıldı' : 'Müzik kapatıldı');
    });

    el.wordsBtn.addEventListener('click', openWordsModal);
    el.closeWordsBtn.addEventListener('click', function () { window.MiloCinematics.animateModalClose(el.wordsModal); });
    el.mapBtn.addEventListener('click', function () { openMapModal(state.activeMode); });
    el.closeMapBtn.addEventListener('click', function () { window.MiloCinematics.animateModalClose(el.mapModal); });
    document.querySelectorAll('#mapModeTabs button').forEach(function (b) {
      b.addEventListener('click', function () { openMapModal(b.getAttribute('data-mapmode')); });
    });

    el.unlockAllBtn.addEventListener('click', function () {
      ['story', 'counting', 'letters', 'english', 'firefly'].forEach(function (m) {
        state.unlockedOrder[m] = 30;
      });
      saveProgress();
      openMapModal(activeMapMode);
      showToast('Tüm 150 bölüm haritada açıldı!');
    });

    // Parent Settings modal
    el.openParentBtn.addEventListener('click', function () {
      el.parentGate.hidden = parentUnlocked;
      el.parentSettingsBody.hidden = !parentUnlocked;
      el.parentSummaryText.textContent = state.completedLevels.length + ' / 150 bölüm tamamlandı (' + state.completedStoryTasks.length + ' / 90 hikâye görevi).';
      window.MiloCinematics.animateModalOpen(el.parentModal);
    });
    el.closeParentBtn.addEventListener('click', function () { window.MiloCinematics.animateModalClose(el.parentModal); });
    document.querySelectorAll('.gate-opt').forEach(function (gBtn) {
      gBtn.addEventListener('click', function () {
        if (gBtn.getAttribute('data-ans') === '7') {
          parentUnlocked = true;
          el.parentGate.hidden = true;
          el.parentSettingsBody.hidden = false;
        } else {
          showToast('Lütfen doğru toplamı seçin (3 + 4).');
        }
      });
    });

    document.querySelectorAll('.diff-btn').forEach(function (db) {
      db.addEventListener('click', function () {
        state.settings.difficulty = db.getAttribute('data-diff');
        applySettings();
        saveProgress();
        if (el.coverOverlay.hidden) renderCurrentTask(false);
        showToast('Zorluk seviyesi: ' + state.settings.difficulty);
      });
    });

    el.setVoiceChk.addEventListener('change', function () { state.settings.voiceOn = el.setVoiceChk.checked; applySettings(); saveProgress(); });
    el.setMusicChk.addEventListener('change', function () { state.settings.musicOn = el.setMusicChk.checked; applySettings(); saveProgress(); });
    el.setSfxChk.addEventListener('change', function () { state.settings.sfxOn = el.setSfxChk.checked; applySettings(); saveProgress(); });
    el.setReducedChk.addEventListener('change', function () {
      state.settings.reducedMotion = el.setReducedChk.checked;
      applySettings();
      saveProgress();
      if (el.coverOverlay.hidden) renderCurrentTask(false);
    });

    el.resetConfirmBtn.addEventListener('click', function () {
      state = defaultProgress();
      saveProgress();
      applySettings();
      el.parentSummaryText.textContent = '0 / 150 bölüm tamamlandı.';
      el.continueBtn.hidden = true;
      showToast('Tüm yerel ilerleme sıfırlandı.');
    });

    el.exploreGardenBtn.addEventListener('click', function () {
      window.MiloCinematics.animateModalClose(el.finaleOverlay);
      el.homeHubBtn.click();
      document.querySelector('.hub-tab[data-hub="explore"]').click();
    });
    el.playAgainBtn.addEventListener('click', function () {
      window.MiloCinematics.animateModalClose(el.finaleOverlay);
      startModeLevel('story', 1, 0);
    });
  }

  function init() {
    cacheElements();
    var hasSaved = loadProgress();
    if (hasSaved) el.continueBtn.hidden = false;
    applySettings();
    bindEvents();

    window.MiloPhaser.init({
      onActivity: resetIdleTimer,
      onMiloPet: function () {
        var phrases = ['Hihi! Hadi birlikte keşfedelim!', 'Sen harika bir kaşif arkadaşısın!'];
        showSpeechBubble(phrases[Math.floor(Math.random() * phrases.length)]);
      },
      onLilaTap: function () { el.hintBtn.click(); },
      onEntitiesUpdated: renderAccessibleMirror,
      onPartialProgress: function (done, total) {
        var dEl = document.getElementById('countProgressDigit');
        if (dEl) dEl.textContent = String(done);
        document.querySelectorAll('.tenframe-dot').forEach(function (dot, di) {
          dot.classList.toggle('filled', di < done);
        });
        showToast(done + ' / ' + total);
        renderAccessibleMirror((window.MiloPhaser.getStateSnapshot() || {}).entities || []);
      },
      onWrongSelection: function (rec, customHint) {
        failCount += 1;
        var msg = customHint || (currentSpec ? currentSpec.hintTr : 'Tekrar bakalım!');
        showToast(msg);
        window.MiloAudio.speakTR(msg);
        if (failCount >= 2) {
          window.MiloPhaser.highlightHint();
        }
      },
      onTaskCompleted: function () {
        handleTaskCompleted();
        renderAccessibleMirror((window.MiloPhaser.getStateSnapshot() || {}).entities || []);
      },
      onContextLost: function () {
        showToast('Görünüm yenileniyor...');
      },
      onContextRestored: function () {
        if (el.coverOverlay.hidden) renderCurrentTask(false);
      }
    });

    renderCurrentTask(false);
    window.MiloCinematics.animateCoverIn();

    // Test-only programmatic inspection & deterministic interaction hook (no visible debug UI)
    window.__MILO_TEST_API__ = {
      getSnapshot: function () {
        return {
          mode: state.activeMode,
          order: state.activeOrder[state.activeMode],
          storyTaskIndex: state.storyTaskIndex,
          difficulty: state.settings.difficulty,
          reducedMotion: state.settings.reducedMotion,
          muted: window.MiloAudio.isMuted(),
          hasEnglishVoice: window.MiloAudio.hasEnglishVoice(),
          hasTurkishFemaleVoice: window.MiloAudio.hasTurkishFemaleVoice(),
          completedLevels: state.completedLevels.length,
          completedStoryTasks: state.completedStoryTasks.length,
          collectedSeeds: state.collectedSeeds.slice(),
          unlockedWords: state.unlockedWords.slice(),
          spec: currentSpec ? {
            levelId: currentSpec.levelId,
            taskId: currentSpec.taskId,
            evaluator: currentSpec.evaluator,
            requiredCount: currentSpec.requiredCount,
            instructionTr: currentSpec.instructionTr
          } : null,
          phaser: window.MiloPhaser.getStateSnapshot(),
          audioLog: window.MiloAudio.getAudioLog().slice(-6)
        };
      },
      startLevel: function (mode, order, taskIdx) {
        startModeLevel(mode, order, taskIdx || 0);
      },
      tapEntity: function (entityId) {
        return window.MiloPhaser.triggerEntityById(entityId);
      },
      setDifficulty: function (diff) {
        state.settings.difficulty = diff;
        applySettings();
        saveProgress();
        renderCurrentTask(false);
      },
      setReducedMotion: function (val) {
        state.settings.reducedMotion = !!val;
        applySettings();
        saveProgress();
        renderCurrentTask(false);
      },
      pause: function () { el.pauseBtn.click(); },
      resume: function () { el.resumeBtn.click(); },
      advanceNext: function () { advanceNext(); },
      validateContent: function () { return window.MiloContent.validateAllContent(); }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
