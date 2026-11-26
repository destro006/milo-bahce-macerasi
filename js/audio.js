(function () {
  'use strict';

  var ctx = null;
  var masterGain = null;
  var musicGain = null;
  var sfxGain = null;

  var muted = false;
  var voiceOn = true;
  var musicOn = true;
  var sfxOn = true;

  var musicTimer = null;
  var musicStep = 0;
  var voicesReady = false;
  var cachedVoices = [];
  var speechToken = 0;
  var visemeTimer = null;
  var visemeListener = null;
  var audioLog = [];

  var PENTATONIC = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];

  function refreshVoices() {
    if (!('speechSynthesis' in window)) return [];
    cachedVoices = window.speechSynthesis.getVoices() || [];
    if (cachedVoices.length > 0) voicesReady = true;
    return cachedVoices;
  }

  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    refreshVoices();
    if (typeof window.speechSynthesis.addEventListener === 'function') {
      window.speechSynthesis.addEventListener('voiceschanged', refreshVoices);
    } else {
      window.speechSynthesis.onvoiceschanged = refreshVoices;
    }
  }

  function ensureContext() {
    if (muted) return null;
    if (!ctx) {
      var AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      ctx = new AudioCtx();
      masterGain = ctx.createGain();
      masterGain.gain.value = 1.0;
      masterGain.connect(ctx.destination);

      musicGain = ctx.createGain();
      musicGain.gain.value = 0.7;
      musicGain.connect(masterGain);

      sfxGain = ctx.createGain();
      sfxGain.gain.value = 1.0;
      sfxGain.connect(masterGain);
    }
    if (ctx.state === 'suspended') {
      ctx.resume().catch(function () {});
    }
    return ctx;
  }

  function unlock() {
    ensureContext();
    refreshVoices();
    if (musicOn && !muted && !musicTimer) {
      startMusicLoop();
    }
  }

  function duckMusic(active) {
    if (!ctx || !musicGain) return;
    var target = active ? 0.18 : 0.7;
    try {
      musicGain.gain.cancelScheduledValues(ctx.currentTime);
      musicGain.gain.setTargetAtTime(target, ctx.currentTime, 0.08);
    } catch (e) {
      musicGain.gain.value = target;
    }
  }

  function tone(freq, duration, type, gainVal, delay, isMusic) {
    if (muted || (!isMusic && !sfxOn) || (isMusic && !musicOn)) return;
    var ac = ensureContext();
    if (!ac) return;
    var dest = isMusic ? musicGain : sfxGain;
    var t0 = ac.currentTime + (delay || 0);
    var osc = ac.createOscillator();
    var gain = ac.createGain();
    osc.type = type || 'sine';
    osc.frequency.setValueAtTime(freq, t0);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(gainVal || 0.1, t0 + 0.018);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(gain);
    gain.connect(dest || ac.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.03);
  }

  function playPop() {
    if (muted || !sfxOn) return;
    var ac = ensureContext();
    if (!ac) return;
    var t0 = ac.currentTime;
    var osc = ac.createOscillator();
    var gain = ac.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(340, t0);
    osc.frequency.exponentialRampToValueAtTime(680, t0 + 0.09);
    gain.gain.setValueAtTime(0.09, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.11);
    osc.connect(gain);
    gain.connect(sfxGain || ac.destination);
    osc.start(t0);
    osc.stop(t0 + 0.12);
  }

  function playChime(step) {
    var idx = Math.max(0, Math.min(PENTATONIC.length - 1, step || 0));
    var f = PENTATONIC[idx];
    tone(f, 0.32, 'triangle', 0.11, 0, false);
    tone(f * 2, 0.24, 'sine', 0.04, 0.03, false);
  }

  function playRustle() {
    if (muted || !sfxOn) return;
    var ac = ensureContext();
    if (!ac) return;
    var bufferSize = Math.floor(ac.sampleRate * 0.15);
    var buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
    var data = buffer.getChannelData(0);
    for (var i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    var src = ac.createBufferSource();
    src.buffer = buffer;
    var filter = ac.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1800;
    filter.Q.value = 1.4;
    var gain = ac.createGain();
    gain.gain.value = 0.1;
    src.connect(filter);
    filter.connect(gain);
    gain.connect(sfxGain || ac.destination);
    src.start();
  }

  function playSplash() {
    tone(280, 0.14, 'sine', 0.09, 0, false);
    tone(560, 0.16, 'sine', 0.08, 0.05, false);
  }

  function playWipe() {
    tone(740, 0.11, 'sine', 0.035, 0, false);
    tone(988, 0.12, 'sine', 0.03, 0.04, false);
  }

  function playCollect() {
    tone(523.25, 0.14, 'triangle', 0.1, 0, false);
    tone(659.25, 0.2, 'triangle', 0.1, 0.07, false);
  }

  function playSeedFound() {
    var notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    for (var i = 0; i < notes.length; i++) {
      tone(notes[i], 0.34, 'triangle', 0.1, i * 0.08, false);
    }
  }

  function playGentleNo() {
    tone(310, 0.14, 'sine', 0.06, 0, false);
    tone(260, 0.18, 'sine', 0.05, 0.08, false);
  }

  function playGiggle() {
    tone(587.33, 0.09, 'sine', 0.08, 0, false);
    tone(783.99, 0.09, 'sine', 0.08, 0.09, false);
    tone(987.77, 0.14, 'sine', 0.08, 0.18, false);
  }

  function playLanternLight(step) {
    var base = [440, 523.25, 659.25, 783.99][(step || 0) % 4];
    tone(base, 0.48, 'triangle', 0.1, 0, false);
    tone(base * 1.25, 0.48, 'sine', 0.07, 0.07, false);
    tone(base * 1.5, 0.56, 'sine', 0.08, 0.14, false);
  }

  function playVictoryFanfare() {
    var melody = [[523.25, 0], [659.25, 0.12], [783.99, 0.24], [1046.5, 0.38], [880.0, 0.54], [1046.5, 0.7]];
    for (var i = 0; i < melody.length; i++) {
      tone(melody[i][0], 0.44, 'triangle', 0.11, melody[i][1], false);
    }
  }

  function startMusicLoop() {
    if (musicTimer) return;
    var pattern = [523.25, 659.25, 783.99, 659.25, 587.33, 783.99, 880.0, 783.99];
    musicTimer = setInterval(function () {
      if (muted || !musicOn || !ctx || ctx.state !== 'running') return;
      var note = pattern[musicStep % pattern.length];
      musicStep += 1;
      tone(note, 0.52, 'sine', 0.022, 0, true);
    }, 980);
  }

  function stopMusicLoop() {
    if (musicTimer) {
      clearInterval(musicTimer);
      musicTimer = null;
    }
  }

  function pickPreferredVoice(localePrefix) {
    var voices = refreshVoices();
    if (!voices.length) return null;
    var prefix = localePrefix.toLowerCase();
    var matches = voices.filter(function (v) {
      return v.lang && v.lang.toLowerCase().indexOf(prefix) === 0;
    });
    if (!matches.length) return null;

    var femaleHints = ['emel', 'yelda', 'filiz', 'seda', 'melis', 'defne', 'female', 'kadın', 'aria', 'jenny', 'zira', 'samantha', 'libby', 'sonia', 'google'];
    var maleHints = ['tolga', 'ahmet', 'mehmet', 'erkek', 'male', 'david', 'mark', 'guy', 'ryan'];

    for (var i = 0; i < matches.length; i++) {
      var n = (matches[i].name || '').toLowerCase();
      var isMale = maleHints.some(function (m) { return n.indexOf(m) >= 0; });
      var isFemale = femaleHints.some(function (f) { return n.indexOf(f) >= 0; });
      if (isFemale && !isMale) return matches[i];
    }
    for (var j = 0; j < matches.length; j++) {
      var nj = (matches[j].name || '').toLowerCase();
      if (!maleHints.some(function (m) { return nj.indexOf(m) >= 0; })) {
        return matches[j];
      }
    }
    return matches[0];
  }

  function emitViseme(v) {
    if (typeof visemeListener === 'function') {
      try { visemeListener(v); } catch (e) {}
    }
  }

  function stopVisemes() {
    if (visemeTimer) {
      clearInterval(visemeTimer);
      visemeTimer = null;
    }
    emitViseme('rest');
  }

  function visemeFromChar(ch) {
    if (!ch) return 'rest';
    var c = ch.toLowerCase();
    if ('aâ'.indexOf(c) >= 0) return 'A';
    if ('e'.indexOf(c) >= 0) return 'E';
    if ('iıî'.indexOf(c) >= 0) return 'I';
    if ('oö'.indexOf(c) >= 0) return 'O';
    if ('uü'.indexOf(c) >= 0) return 'U';
    if ('mbpfv'.indexOf(c) >= 0) return 'M';
    return 'E';
  }

  function startVisemesForText(text, token) {
    stopVisemes();
    var idx = 0;
    var clean = String(text || '').replace(/\s+/g, ' ');
    visemeTimer = setInterval(function () {
      if (token !== speechToken || muted || !voiceOn) {
        stopVisemes();
        return;
      }
      if (idx >= clean.length) {
        stopVisemes();
        return;
      }
      var ch = clean.charAt(idx++);
      if (ch === ' ' || ch === '.' || ch === ',') {
        emitViseme('rest');
      } else {
        emitViseme(visemeFromChar(ch));
      }
    }, 85);
  }

  function stopSpeech() {
    speechToken += 1;
    stopVisemes();
    duckMusic(false);
    if ('speechSynthesis' in window) {
      try { window.speechSynthesis.cancel(); } catch (e) {}
    }
  }

  function recordAudioEvent(entry) {
    audioLog.push(entry);
    if (audioLog.length > 80) audioLog.shift();
  }

  function speakUtterance(text, locale, opts) {
    opts = opts || {};
    var myToken = ++speechToken;
    stopVisemes();

    if (muted || !voiceOn || !text) {
      recordAudioEvent({ text: text, locale: locale, status: 'skipped-muted-or-empty', ts: Date.now() });
      return { spoken: false, reason: muted ? 'muted' : 'voice-off' };
    }

    if (!('speechSynthesis' in window)) {
      recordAudioEvent({ text: text, locale: locale, status: 'unavailable-no-api', ts: Date.now() });
      return { spoken: false, reason: 'no-speech-api' };
    }

    var prefix = locale.slice(0, 2).toLowerCase();
    var chosenVoice = pickPreferredVoice(prefix);

    // Strictly do NOT substitute Turkish phonetic spelling or Turkish voice for English audio
    if (prefix === 'en' && !chosenVoice && voicesReady) {
      playChime(3);
      recordAudioEvent({ text: text, locale: locale, status: 'unavailable-no-en-voice', ts: Date.now() });
      return { spoken: false, reason: 'no-english-voice' };
    }

    try { window.speechSynthesis.cancel(); } catch (e) {}

    var u = new SpeechSynthesisUtterance(text);
    u.lang = locale;
    if (chosenVoice) u.voice = chosenVoice;
    u.rate = opts.rate || (prefix === 'en' ? (opts.slow ? 0.62 : 0.84) : 0.92);
    u.pitch = opts.pitch || (prefix === 'tr' ? 1.12 : 1.06);

    var ended = false;
    function finish() {
      if (ended) return;
      ended = true;
      if (myToken === speechToken) {
        stopVisemes();
        duckMusic(false);
      }
      if (typeof opts.onEnd === 'function') opts.onEnd();
    }

    u.onstart = function () {
      if (myToken !== speechToken) return;
      duckMusic(true);
      startVisemesForText(text, myToken);
    };
    u.onend = finish;
    u.onerror = finish;

    // Safety fallback if browser speechSynthesis never fires onend
    setTimeout(finish, Math.max(1800, text.length * 110));

    recordAudioEvent({
      text: text,
      locale: locale,
      voiceName: chosenVoice ? chosenVoice.name : 'default-' + locale,
      slow: !!opts.slow,
      status: 'queued',
      ts: Date.now()
    });

    try {
      window.speechSynthesis.speak(u);
      return { spoken: true, voice: chosenVoice ? chosenVoice.name : null };
    } catch (e) {
      finish();
      return { spoken: false, reason: 'speak-error' };
    }
  }

  function speakTR(text, opts) {
    return speakUtterance(text, 'tr-TR', opts);
  }

  function speakEN(word, opts) {
    if (typeof opts === 'boolean') opts = { slow: opts };
    return speakUtterance(word, 'en-US', opts);
  }

  function speakSuccessExact(opts) {
    return speakTR('Doğru cevap', opts);
  }

  function hasEnglishVoice() {
    refreshVoices();
    return !!pickPreferredVoice('en');
  }

  function hasTurkishFemaleVoice() {
    refreshVoices();
    return !!pickPreferredVoice('tr');
  }

  function setMuted(val) {
    muted = !!val;
    if (muted) {
      stopSpeech();
      stopMusicLoop();
    } else {
      unlock();
    }
    return muted;
  }

  function setVoice(val) {
    voiceOn = !!val;
    if (!voiceOn) stopSpeech();
    return voiceOn;
  }

  function setMusic(val) {
    musicOn = !!val;
    if (musicOn && !muted) {
      unlock();
      startMusicLoop();
    } else {
      stopMusicLoop();
    }
    return musicOn;
  }

  function setSfx(val) {
    sfxOn = !!val;
    return sfxOn;
  }

  window.MiloAudio = {
    unlock: unlock,
    playPop: playPop,
    playChime: playChime,
    playRustle: playRustle,
    playSplash: playSplash,
    playWipe: playWipe,
    playCollect: playCollect,
    playSeedFound: playSeedFound,
    playGentleNo: playGentleNo,
    playGiggle: playGiggle,
    playLanternLight: playLanternLight,
    playVictoryFanfare: playVictoryFanfare,
    speakTR: speakTR,
    speakEN: speakEN,
    speakSuccessExact: speakSuccessExact,
    stopSpeech: stopSpeech,
    hasEnglishVoice: hasEnglishVoice,
    hasTurkishFemaleVoice: hasTurkishFemaleVoice,
    setVisemeListener: function (fn) { visemeListener = fn; },
    setMuted: setMuted,
    isMuted: function () { return muted; },
    setVoice: setVoice,
    isVoiceOn: function () { return voiceOn; },
    setMusic: setMusic,
    isMusicOn: function () { return musicOn; },
    setSfx: setSfx,
    isSfxOn: function () { return sfxOn; },
    getAudioLog: function () { return audioLog.slice(); }
  };
})();
