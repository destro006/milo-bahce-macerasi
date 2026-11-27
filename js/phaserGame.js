(function () {
  'use strict';

  var gameInstance = null;
  var gardenScene = null;
  var callbacks = {};
  var pendingSpec = null;

  var FSM_STATES = ['loading', 'intro', 'awaiting_input', 'resolving', 'feedback', 'next_task', 'outcome', 'transition', 'paused'];

  function seededRandom(seedStr) {
    var h = 2166136261;
    for (var i = 0; i < seedStr.length; i++) {
      h ^= seedStr.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return function () {
      h += 0x6D2B79F5;
      var t = Math.imul(h ^ (h >>> 15), 1 | h);
      t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffleDeterministic(arr, seedStr) {
    var copy = arr.slice();
    var rnd = seededRandom(seedStr);
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var tmp = copy[i];
      copy[i] = copy[j];
      copy[j] = tmp;
    }
    return copy;
  }

  class BootScene extends Phaser.Scene {
    constructor() {
      super({ key: 'BootScene' });
    }
    create() {
      window.MiloSpriteFactory.registerAll(this);
      this.scene.start('GardenScene');
    }
  }

  class GardenScene extends Phaser.Scene {
    constructor() {
      super({ key: 'GardenScene' });
      this.fsmState = 'loading';
      this.prevFsmState = 'awaiting_input';
      this.genToken = 0;
      this.reducedMotion = false;
      this.difficulty = 'Kolay';

      this.bgContainer = null;
      this.worldLayer = null;
      this.itemsLayer = null;
      this.fxLayer = null;
      this.wipeCurtain = null;

      this.miloRig = null;
      this.friendRig = null;
      this.lilaRig = null;
      this.squirrelRig = null;
      this.extraRigs = [];

      this.dropTarget = null;
      this.burstEmitter = null;
      this.ambientEmitter = null;
      this.fireflyActors = [];
      this.entityRecords = [];
      this.activeSpec = null;
      this.activeTxId = null;
      this.collectedCount = 0;
      this.expectedOrder = 1;
      this.fireflyStepIdx = 0;
      this.markersLog = [];
      this.frameSamples = [];
      this.lastFrameTime = 0;
    }

    create() {
      gardenScene = this;

      this.bgContainer = this.add.container(0, 0).setDepth(0);
      this.worldLayer = this.add.container(0, 0).setDepth(10);
      this.itemsLayer = this.add.container(0, 0).setDepth(22);
      this.fxLayer = this.add.container(0, 0).setDepth(35);

      this.ambientEmitter = this.add.particles(0, 0, 'pt-sparkle', {
        x: { min: 40, max: 1240 },
        y: { min: 130, max: 580 },
        lifespan: 3400,
        speedX: { min: -12, max: 12 },
        speedY: { min: -14, max: 6 },
        scale: { start: 0.18, end: 0.65 },
        alpha: { start: 0, end: 0.55 },
        frequency: 280,
        blendMode: 'ADD'
      }).setDepth(6);

      this.burstEmitter = this.add.particles(0, 0, 'pt-star', {
        speed: { min: 70, max: 230 },
        angle: { min: 0, max: 360 },
        scale: { start: 0.8, end: 0 },
        alpha: { start: 1, end: 0 },
        lifespan: 650,
        gravityY: 140,
        emitting: false
      }).setDepth(45);

      // Centerpiece articulated Milo rig
      this.miloRig = window.MiloRigSystem.createMiloRig(this, 210, 525);
      this.miloRig.root.setDepth(25);
      this.miloRig.root.setSize(120, 190);
      this.miloRig.root.setInteractive({ useHandCursor: true });
      this.miloRig.root.on('pointerup', () => {
        if (this.fsmState === 'paused') return;
        window.MiloAudio.unlock();
        window.MiloAudio.playGiggle();
        this.miloRig.playClip('small_success');
        this.burstAt(this.miloRig.root.x, this.miloRig.root.y - 95, 12);
        if (callbacks.onMiloPet) callbacks.onMiloPet();
      });

      // Autonomous Lila guide
      this.lilaRig = window.MiloRigSystem.createFireflyRig(this, 370, 290, 0xffe564);
      this.lilaRig.root.setDepth(30).setSize(68, 68).setInteractive({ useHandCursor: true });
      this.lilaRig.root.on('pointerup', () => {
        if (this.fsmState === 'paused') return;
        if (callbacks.onLilaTap) callbacks.onLilaTap();
      });

      // Drop target (basket / matching slot / lantern)
      this.dropTarget = this.add.sprite(1085, 515, 'target-basket-0').setDepth(18).setScale(1.05).setVisible(false);

      // Foreground soft curtain for scene transitions
      this.wipeCurtain = this.add.graphics().setDepth(90).setAlpha(0);
      this.wipeCurtain.fillStyle(0xfff6dc, 1);
      this.wipeCurtain.fillRect(0, 0, 1280, 720);

      // Global drag support for basket/collect tasks
      this.input.on('dragstart', (pointer, obj) => {
        if (this.fsmState !== 'awaiting_input') return;
        var rec = obj.getData('entityRecord');
        if (!rec || !rec.available) return;
        obj.setData('wasDragged', true);
        obj.setDepth(60);
        this.tweens.add({ targets: obj, scale: 1.12, duration: 120, ease: 'Back.easeOut' });
        if (callbacks.onActivity) callbacks.onActivity();
      });

      this.input.on('drag', (pointer, obj, dragX, dragY) => {
        if (this.fsmState !== 'awaiting_input') return;
        var rec = obj.getData('entityRecord');
        if (!rec || !rec.available) return;
        obj.x = dragX;
        obj.y = dragY;
        var over = this.isOverDropTarget(dragX, dragY);
        if (this.dropTarget.visible) {
          this.dropTarget.setScale(over ? 1.18 : 1.05);
          this.dropTarget.setTint(over ? 0xfff3b0 : 0xffffff);
        }
      });

      this.input.on('dragend', (pointer, obj) => {
        var rec = obj.getData('entityRecord');
        if (this.dropTarget.visible) {
          this.dropTarget.setScale(1.05);
          this.dropTarget.clearTint();
        }
        if (!rec || !rec.available || this.fsmState !== 'awaiting_input') return;
        if (this.isOverDropTarget(obj.x, obj.y)) {
          this.handleEntitySelection(rec, true);
        } else {
          this.tweens.add({
            targets: obj,
            x: rec.homeX,
            y: rec.homeY,
            scale: 1,
            duration: 240,
            ease: 'Back.easeOut',
            onComplete: () => { obj.setDepth(22); }
          });
        }
      });

      // WebGL context loss safety
      if (this.game && this.game.canvas) {
        this.game.canvas.addEventListener('webglcontextlost', function (e) {
          e.preventDefault();
          if (callbacks.onContextLost) callbacks.onContextLost();
        });
        this.game.canvas.addEventListener('webglcontextrestored', function () {
          if (callbacks.onContextRestored) callbacks.onContextRestored();
        });
      }

      if (pendingSpec) {
        var p = pendingSpec;
        pendingSpec = null;
        this.loadTaskSpec(p);
      }
    }

    update(time, delta) {
      if (this.lastFrameTime > 0 && delta > 0 && delta < 250) {
        this.frameSamples.push(delta);
        if (this.frameSamples.length > 180) this.frameSamples.shift();
      }
      this.lastFrameTime = time;

      if (this.fsmState === 'paused') return;

      if (this.miloRig) this.miloRig.update(time, delta);
      if (this.friendRig) this.friendRig.update(time, delta);
      if (this.squirrelRig) this.squirrelRig.update(time, delta);
      if (this.lilaRig && this.lilaRig.root.visible) {
        this.lilaRig.update(time, delta);
        if (this.fsmState === 'awaiting_input') {
          this.lilaRig.root.x = 370 + Math.sin(time * 0.0017) * 24;
          this.lilaRig.root.y = 285 + Math.cos(time * 0.0024) * 14;
        }
      }
      for (var i = 0; i < this.fireflyActors.length; i++) {
        this.fireflyActors[i].rig.update(time, delta);
      }
    }

    setFsmState(next) {
      if (FSM_STATES.indexOf(next) < 0) return;
      this.fsmState = next;
      if (callbacks.onFsmChange) callbacks.onFsmChange(next);
    }

    setPaused(val) {
      if (val && this.fsmState !== 'paused') {
        this.prevFsmState = this.fsmState;
        this.setFsmState('paused');
        this.tweens.pauseAll();
      } else if (!val && this.fsmState === 'paused') {
        this.tweens.resumeAll();
        this.setFsmState(this.prevFsmState || 'awaiting_input');
      }
    }

    isOverDropTarget(x, y) {
      if (!this.dropTarget || !this.dropTarget.visible) return false;
      return Phaser.Math.Distance.Between(x, y, this.dropTarget.x, this.dropTarget.y) < 120;
    }

    burstAt(x, y, count) {
      if (this.reducedMotion || !this.burstEmitter) return;
      this.burstEmitter.explode(count || 16, x, y);
    }

    drawBackdrop(sceneId, worldChanges) {
      this.bgContainer.removeAll(true);
      var wc = worldChanges || {};
      var isNight = sceneId === 'glade' || sceneId === 'finale' || sceneId === 'twilight';
      var bgKey = 'bg-' + (this.textures.exists('bg-' + sceneId) ? sceneId : 'orchard');

      // 1. High-DPI Painterly Canvas2D Backdrop
      var bgImg = this.add.image(640, 360, bgKey);
      this.bgContainer.add(bgImg);

      // 2. Dynamic World-Change Overlays (Dawn Bell / Lantern glow / Bridge)
      var g = this.add.graphics();
      this.bgContainer.add(g);
      if (sceneId === 'finale' && wc.lit) {
        var bellGlow = this.add.image(1080, 340, 'pt-sparkle').setScale(10).setAlpha(0.14).setTint(0xffe785).setBlendMode('ADD');
        var hubGlow = this.add.image(640, 410, 'pt-sparkle').setScale(13).setAlpha(0.10).setTint(0xffe785).setBlendMode('ADD');
        this.bgContainer.add([bellGlow, hubGlow]);
      }
      if (sceneId === 'stream' && wc.bridgeOpen) {
        g.fillStyle(0xb97b45, 1); g.lineStyle(3, 0x6b411e, 1);
        g.fillRoundedRect(460, 540, 290, 34, 10); g.strokeRoundedRect(460, 540, 290, 34, 10);
      }

      // 3. Drifting Clouds (Daytime) & Gentle Butterflies
      if (!isNight && !this.reducedMotion) {
        [[240, 128, 0.9], [690, 96, 0.72]].forEach((cl, idx) => {
          var cSp = this.add.image(cl[0], cl[1], 'fx-cloud').setScale(cl[2]).setAlpha(0.92);
          this.bgContainer.add(cSp);
          this.tweens.add({
            targets: cSp,
            x: cl[0] + 55,
            duration: 6200 + idx * 1800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
          });
        });

        [[360, 390], [840, 360]].forEach((bf, idx) => {
          var bSp = this.add.image(bf[0], bf[1], 'fx-butterfly').setScale(0.76 + idx * 0.12);
          this.bgContainer.add(bSp);
          this.tweens.add({
            targets: bSp,
            x: bf[0] + (idx === 0 ? 75 : -70),
            y: bf[1] - 26,
            angle: idx === 0 ? 8 : -8,
            duration: 3400 + idx * 900,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
          });
        });
      }

      this.ambientEmitter.setAlpha(isNight ? 0.85 : 0.42);
    }

    clearSceneActors() {
      this.itemsLayer.removeAll(true);
      this.fxLayer.removeAll(true);
      this.entityRecords = [];
      this.fireflyActors.forEach(function (fa) {
        if (fa && fa.rig && fa.rig.root) fa.rig.root.destroy();
      });
      this.fireflyActors = [];
      if (this.friendRig) { this.friendRig.root.destroy(); this.friendRig = null; }
      if (this.squirrelRig) { this.squirrelRig.root.destroy(); this.squirrelRig = null; }
      this.extraRigs.forEach(function (r) { if (r && r.root) r.root.destroy(); });
      this.extraRigs = [];
    }

    loadTaskSpec(spec) {
      if (!gardenScene) {
        pendingSpec = spec;
        return;
      }
      this.genToken += 1;
      var token = this.genToken;
      this.tweens.resumeAll();
      this.setFsmState('loading');
      this.activeSpec = spec;
      this.reducedMotion = !!spec.reducedMotion;
      this.difficulty = spec.difficulty || 'Kolay';
      this.collectedCount = 0;
      this.expectedOrder = 1;
      this.fireflyStepIdx = 0;
      this.markersLog = [];

      this.clearSceneActors();
      this.drawBackdrop(spec.sceneId || 'orchard', spec.worldChanges);

      // Place Milo on ground path
      this.miloRig.killTweens();
      this.miloRig.root.setPosition(185, 535);
      this.miloRig.facing = 1;
      this.miloRig.bodyRoot.setScale(1, 1);
      this.miloRig.playClip('idle_breathe');

      // Place scene friend rig (Nine, Pof, Maviş, or articulated Squirrel!)
      var fid = spec.friendId || 'nine';
      if (fid === 'sincap') {
        this.squirrelRig = window.MiloRigSystem.createSquirrelRig(this, 965, 520);
        this.squirrelRig.root.setDepth(24);
        this.squirrelRig.playClip('look');
      } else if (fid !== 'lila' && fid !== 'milo') {
        this.friendRig = window.MiloRigSystem.createFriendRig(this, fid, 955, 515);
        this.friendRig.root.setDepth(24);
        if (fid === 'mavis' && spec.friendWet) this.friendRig.setWet(true);
      } else if (spec.mode === 'story' && spec.order >= 4 && spec.order % 4 === 0) {
        // Also bring Squirrel Pıtır into woodland episodes for lively world presence
        this.squirrelRig = window.MiloRigSystem.createSquirrelRig(this, 1020, 515);
        this.squirrelRig.root.setDepth(23);
      }

      // Drop target setup
      var dest = spec.transferDestination || 'basket';
      this.dropTarget.clearTint();
      if (spec.showDropTarget) {
        var texPrefix = dest === 'matching_slot' ? 'target-matching_slot-' : (dest === 'lantern' ? 'target-lantern-' : 'target-basket-');
        this.dropTarget.setTexture(texPrefix + '0');
        this.dropTarget.setPosition(1100, 515);
        this.dropTarget.setVisible(true);
      } else {
        this.dropTarget.setVisible(false);
      }

      // Lila guide visibility (hidden in firefly mode where fireflies themselves star)
      this.lilaRig.root.setVisible(spec.mode !== 'firefly');
      if (this.lilaRig.root.visible) {
        this.lilaRig.root.setPosition(370, 285);
      }

      // Build task entities
      if (spec.mode === 'firefly') {
        this.buildFireflyTask(spec, token);
      } else {
        this.buildStandardTask(spec);
      }

      if (!this.reducedMotion && this.cameras && this.cameras.main) {
        this.cameras.main.setZoom(1.035);
        this.cameras.main.zoomTo(1, 520, 'Sine.easeOut');
      }

      this.setFsmState('awaiting_input');
      if (callbacks.onEntitiesUpdated) callbacks.onEntitiesUpdated(this.getAccessibleEntities());
    }

    buildStandardTask(spec) {
      var items = spec.candidates || [];
      var n = items.length;
      if (!n) return;

      var cols = n > 6 ? Math.min(6, Math.ceil(n / 2)) : n;
      var rows = Math.ceil(n / cols);
      var spacingX = cols >= 5 ? 126 : 148;
      var spacingY = 122;
      var centerX = spec.showDropTarget ? 580 : 640;
      var baseY = rows > 1 ? 410 : 485;
      var canDrag = !!spec.allowDrag && spec.showDropTarget;

      items.forEach((item, idx) => {
        var col = idx % cols;
        var row = Math.floor(idx / cols);
        var itemsInRow = row === rows - 1 ? (n - row * cols) : cols;
        var startX = centerX - ((itemsInRow - 1) * spacingX) / 2;
        var cx = startX + col * spacingX;
        var arcOffset = rows === 1 ? Math.sin((idx / Math.max(1, n - 1)) * Math.PI) * -14 : 0;
        var cy = baseY + row * spacingY + arcOffset;

        var cont = this.add.container(cx, cy).setDepth(22);
        var med = this.add.image(0, 2, 'ui-medallion').setScale(0.98);
        cont.add(med);

        if (!this.reducedMotion) {
          this.tweens.add({
            targets: cont,
            y: cy - 5,
            duration: 1650 + idx * 140,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
          });
        }

        if (item.groupCount) {
          // Counting group cluster (digits only)
          var gCols = item.groupCount > 6 ? 4 : Math.min(3, item.groupCount);
          var gRows = Math.ceil(item.groupCount / gCols);
          for (var gi = 0; gi < item.groupCount; gi++) {
            var gx = ((gi % gCols) - (gCols - 1) / 2) * 22;
            var gy = (Math.floor(gi / gCols) - (gRows - 1) / 2) * 20 - 6;
            var mini = this.add.image(gx, gy, item.tex || 'item-apple').setScale(item.groupCount > 6 ? 0.2 : 0.26);
            cont.add(mini);
          }
          if (item.showDigit) {
            var dBadge = this.add.text(0, 34, String(item.groupCount), {
              fontFamily: 'ui-rounded, Nunito, sans-serif',
              fontSize: '20px',
              fontStyle: 'bold',
              color: '#254038',
              backgroundColor: '#ffe588',
              padding: { left: 8, right: 8, top: 1, bottom: 1 }
            }).setOrigin(0.5);
            cont.add(dBadge);
          }
        } else if (item.digitText) {
          // Digit-only card (NEVER spelled-out number word)
          var dt = this.add.text(0, -2, String(item.digitText), {
            fontFamily: 'ui-rounded, Nunito, sans-serif',
            fontSize: '42px',
            fontStyle: 'bold',
            color: '#254038'
          }).setOrigin(0.5);
          cont.add(dt);
        } else if (item.letterText) {
          var lt = this.add.text(0, -4, item.letterText, {
            fontFamily: 'ui-rounded, Nunito, sans-serif',
            fontSize: item.letterText.length > 2 ? '24px' : '44px',
            fontStyle: 'bold',
            color: '#254038'
          }).setOrigin(0.5);
          cont.add(lt);
        } else if (item.tex) {
          var img = this.add.image(0, -6, item.tex).setScale(0.72);
          cont.add(img);
        }

        if (item.labelTr && !item.hideLabel) {
          var lbl = this.add.text(0, 56, item.labelTr, {
            fontFamily: 'ui-rounded, Nunito, sans-serif',
            fontSize: '13px',
            fontStyle: 'bold',
            color: '#fffdf6',
            backgroundColor: '#254038',
            padding: { left: 8, right: 8, top: 3, bottom: 3 }
          }).setOrigin(0.5);
          cont.add(lbl);
        }

        cont.setSize(108, 112);
        cont.setInteractive({ useHandCursor: true });
        if (canDrag) this.input.setDraggable(cont);

        var rec = {
          id: item.id,
          semanticTag: item.semanticTag || item.labelTr || item.id,
          isCorrect: !!item.isCorrect,
          order: item.order || 0,
          wrongHintTr: item.wrongHintTr || null,
          ariaLabel: item.ariaLabel || item.labelTr || item.letterText || item.digitText || item.id,
          available: true,
          location: 'world',
          homeX: cx,
          homeY: cy,
          container: cont,
          cardBg: med
        };
        cont.setData('entityRecord', rec);
        cont.setData('wasDragged', false);

        cont.on('pointerup', () => {
          if (cont.getData('wasDragged')) {
            cont.setData('wasDragged', false);
            return;
          }
          this.handleEntitySelection(rec, false);
        });

        this.itemsLayer.add(cont);
        this.entityRecords.push(rec);
      });
    }

    buildFireflyTask(spec, token) {
      var count = spec.visibleFireflies || 2;
      var flowerCount = spec.flowerCount || count;
      var spacing = 190;
      var startX = 640 - ((count - 1) * spacing) / 2;
      var flowerColors = [0xff8ea8, 0xffe066, 0x7fd4ff, 0xc39bff];
      var flowerNames = ['Pembe Çiçek', 'Sarı Çiçek', 'Mavi Çiçek', 'Mor Çiçek'];

      for (var i = 0; i < count; i++) {
        var fx = startX + i * spacing;
        var fy = 300 + (i % 2 === 0 ? -15 : 22);
        var flY = 485;

        // Draw flower landing target
        var flCont = this.add.container(fx, flY).setDepth(18);
        var flG = this.add.graphics();
        flG.lineStyle(5, 0x467e42, 1); flG.lineBetween(0, 40, 0, 0);
        flG.fillStyle(flowerColors[i % flowerColors.length], 1);
        flG.lineStyle(2.5, 0x254038, 0.5);
        for (var p = 0; p < 5; p++) {
          var a = (p * Math.PI * 2) / 5 - Math.PI / 2;
          flG.fillCircle(Math.cos(a) * 18, Math.sin(a) * 18, 12);
        }
        flG.fillStyle(0xffe566, 1); flG.fillCircle(0, 0, 12);
        flCont.add(flG);
        var flNum = this.add.text(0, 52, String(i + 1), {
          fontFamily: 'ui-rounded, Nunito, sans-serif', fontSize: '16px', fontStyle: 'bold',
          color: '#fffdf6', backgroundColor: '#254038', padding: { left: 9, right: 9, top: 2, bottom: 2 }
        }).setOrigin(0.5);
        flCont.add(flNum);
        flCont.setSize(96, 108);
        this.itemsLayer.add(flCont);

        // Create real visible FireflyRig above flower
        var ffRig = window.MiloRigSystem.createFireflyRig(this, fx, fy, flowerColors[i % flowerColors.length]);
        ffRig.root.setDepth(28).setSize(90, 90).setInteractive({ useHandCursor: true });

        var pulseForThis = (i === spec.targetFireflyIdx) ? spec.pulseCount : ((spec.pulseCount === 1) ? 2 : 1);
        var rec = {
          id: 'ff_' + i,
          index: i,
          semanticTag: 'firefly_' + (i + 1),
          isCorrect: spec.evaluator === 'repeat_pattern' ? true : (i === spec.targetFireflyIdx),
          pulses: pulseForThis,
          ariaLabel: (i + 1) + ' numaralı ateş böceği (' + flowerNames[i % flowerNames.length] + ')',
          available: true,
          location: 'world',
          homeX: fx,
          homeY: fy,
          flowerY: flY,
          container: ffRig.root,
          flowerContainer: flCont
        };
        ffRig.root.setData('entityRecord', rec);
        ffRig.root.on('pointerup', () => this.handleEntitySelection(rec, false));

        if (spec.evaluator === 'follow_path' || spec.evaluator === 'match_flower' || spec.evaluator === 'repeat_pattern') {
          flCont.setInteractive({ useHandCursor: true });
          flCont.setData('entityRecord', rec);
          flCont.on('pointerup', () => this.handleEntitySelection(rec, false));
        }

        this.fireflyActors.push({ rig: ffRig, rec: rec });
        this.entityRecords.push(rec);
      }

      // Start gentle firefly show after load
      this.time.delayedCall(380, () => {
        if (this.genToken === token) this.playFireflyDemo();
      });
    }

    playFireflyDemo() {
      if (!this.activeSpec || this.activeSpec.mode !== 'firefly') return;
      var spec = this.activeSpec;
      var token = this.genToken;
      var minInt = Math.max(1000, spec.minPulseIntervalMs || 1000);

      if (spec.evaluator === 'repeat_pattern') {
        var pattern = spec.pattern || [1];
        pattern.forEach((stepNum, idx) => {
          var actorIdx = (stepNum - 1) % this.fireflyActors.length;
          this.time.delayedCall(idx * minInt, () => {
            if (this.genToken !== token || !this.fireflyActors[actorIdx]) return;
            window.MiloAudio.playChime(actorIdx);
            this.fireflyActors[actorIdx].rig.pulseGlow(1, minInt);
          });
        });
      } else {
        this.fireflyActors.forEach((fa, idx) => {
          this.time.delayedCall(idx * 450, () => {
            if (this.genToken !== token) return;
            if (idx === spec.targetFireflyIdx) {
              // Curved graceful path toward target flower
              this.tweens.add({
                targets: fa.rig.root,
                y: fa.rec.flowerY - 48,
                x: fa.rec.homeX + 12,
                duration: 650,
                ease: 'Sine.easeInOut',
                yoyo: spec.evaluator !== 'match_flower',
                onComplete: () => {
                  if (this.genToken !== token) return;
                  fa.rig.pulseGlow(fa.rec.pulses, minInt);
                  window.MiloAudio.playChime(fa.rec.pulses);
                }
              });
            } else if (spec.evaluator === 'match_pulse_count') {
              fa.rig.pulseGlow(fa.rec.pulses, minInt);
            }
          });
        });
      }
    }

    handleEntitySelection(rec, wasDragged) {
      if (this.fsmState !== 'awaiting_input' || !rec || !rec.available) return;
      var spec = this.activeSpec;
      if (!spec) return;

      window.MiloAudio.unlock();
      if (callbacks.onActivity) callbacks.onActivity();

      // Special multi-step evaluators: ordered_digits / repeat_pattern
      if (spec.evaluator === 'order_digits') {
        if (rec.order !== this.expectedOrder) {
          this.handleWrongSelection(rec, 'Önce ' + this.expectedOrder + ' rakamına dokunalım.');
          return;
        }
        rec.available = false;
        rec.location = 'basket';
        rec.container.disableInteractive();
        rec.container.setAlpha(0.5);
        window.MiloAudio.playChime(this.expectedOrder - 1);
        this.burstAt(rec.container.x, rec.container.y, 12);
        this.miloRig.playClip('small_success');
        this.expectedOrder += 1;
        this.collectedCount += 1;
        if (this.collectedCount >= spec.requiredCount) {
          this.commitSuccess(rec);
        } else if (callbacks.onPartialProgress) {
          callbacks.onPartialProgress(this.collectedCount, spec.requiredCount);
        }
        return;
      }

      if (spec.evaluator === 'repeat_pattern') {
        var pat = spec.pattern || [1];
        var expectedIdx = (pat[this.fireflyStepIdx] - 1) % this.fireflyActors.length;
        if (rec.index !== expectedIdx) {
          this.handleWrongSelection(rec, 'Işık sırasına tekrar bakalım! Sıradaki ' + (expectedIdx + 1) + ' numara.');
          return;
        }
        window.MiloAudio.playChime(rec.index);
        this.fireflyActors[rec.index].rig.pulseGlow(1, 1000);
        this.fireflyStepIdx += 1;
        if (this.fireflyStepIdx >= pat.length) {
          this.commitSuccess(rec);
        } else if (callbacks.onPartialProgress) {
          callbacks.onPartialProgress(this.fireflyStepIdx, pat.length);
        }
        return;
      }

      // Standard wrong check
      if (!rec.isCorrect) {
        this.handleWrongSelection(rec, rec.wrongHintTr);
        return;
      }

      // Prevent excess taps beyond requiredCount
      if (this.collectedCount >= (spec.requiredCount || 1)) return;

      // Reserve entity immediately so rapid double/triple taps CANNOT duplicate (G06)
      rec.available = false;
      rec.location = 'reserved';
      rec.container.disableInteractive();
      this.tweens.killTweensOf(rec.container);

      var isMultiCount = spec.mode === 'counting' && (spec.evaluator === 'collect_quantity' || spec.evaluator === 'count_tap');
      if (isMultiCount) {
        this.collectedCount += 1;
        window.MiloAudio.playCollect();
        window.MiloAudio.speakTR(String(this.collectedCount));

        if (spec.evaluator === 'count_tap') {
          rec.location = 'counted';
          rec.container.setAlpha(0.55).setScale(0.92);
          var badge = this.add.text(28, -34, String(this.collectedCount), {
            fontFamily: 'ui-rounded, Nunito, sans-serif', fontSize: '18px', fontStyle: 'bold',
            color: '#fffdf6', backgroundColor: '#4c9858', padding: { left: 7, right: 7, top: 2, bottom: 2 }
          }).setOrigin(0.5);
          rec.container.add(badge);
          this.burstAt(rec.container.x, rec.container.y, 10);
          this.miloRig.playClip('point');
          if (this.collectedCount >= spec.requiredCount) {
            this.commitSuccess(rec);
          } else if (callbacks.onPartialProgress) {
            callbacks.onPartialProgress(this.collectedCount, spec.requiredCount);
          }
          return;
        }
      }

      // Full articulated pickup -> carry -> basket release choreography (G05)
      if (spec.showDropTarget && !wasDragged) {
        this.performPickupSequence(rec, isMultiCount);
      } else {
        rec.location = 'basket';
        if (spec.showDropTarget) {
          rec.container.setVisible(false);
          this.updateDropTargetTexture(spec.transferDestination, isMultiCount ? this.collectedCount : 1);
        }
        this.burstAt(rec.container.x, rec.container.y, 18);
        if (!isMultiCount || this.collectedCount >= spec.requiredCount) {
          this.commitSuccess(rec);
        } else if (callbacks.onPartialProgress) {
          callbacks.onPartialProgress(this.collectedCount, spec.requiredCount);
        }
      }
    }

    handleWrongSelection(rec, customHint) {
      window.MiloAudio.playGentleNo();
      this.miloRig.setGaze(rec.container.x, rec.container.y);
      this.miloRig.playClip('think');
      if (!this.reducedMotion) {
        this.tweens.add({
          targets: rec.container,
          x: rec.homeX - 8,
          duration: 65,
          yoyo: true,
          repeat: 3,
          onComplete: () => { rec.container.x = rec.homeX; }
        });
      }
      if (callbacks.onWrongSelection) callbacks.onWrongSelection(rec, customHint);
    }

    // Centerpiece articulated pickup sequence with exact contact markers & sceneGenToken guard
    performPickupSequence(rec, isMultiCount) {
      var token = this.genToken;
      this.setFsmState('resolving');
      this.activeTxId = 'tx_' + token + '_' + rec.id;

      var item = rec.container;
      var targetX = item.x;
      var targetY = item.y;
      var basketX = this.dropTarget.x;
      var basketY = this.dropTarget.y;
      var milo = this.miloRig;
      var startX = milo.root.x;
      var startY = milo.root.y;

      if (this.reducedMotion) {
        this.markersLog.push('pickup_contact', 'release_contact', 'action_done');
        rec.location = 'basket';
        item.setVisible(false);
        this.updateDropTargetTexture(this.activeSpec.transferDestination, isMultiCount ? this.collectedCount : 1);
        if (!isMultiCount || this.collectedCount >= this.activeSpec.requiredCount) {
          this.commitSuccess(rec);
        } else {
          this.setFsmState('awaiting_input');
          if (callbacks.onPartialProgress) callbacks.onPartialProgress(this.collectedCount, this.activeSpec.requiredCount);
        }
        return;
      }

      // 0-160ms: Highlight + eyes lead head
      this.tweens.add({ targets: item, scale: 1.12, duration: 150, ease: 'Back.easeOut' });
      milo.playClip('look_at_target', { tx: targetX, ty: targetY });

      // 160-380ms: Turn & anticipation
      this.time.delayedCall(160, () => {
        if (this.genToken !== token) return;
        milo.playClip(targetX >= milo.root.x ? 'turn_right' : 'turn_left');
      });

      // 380-860ms: Walk to item with stride-matched speed (zero foot slide)
      var walkStopX = targetX - 58 * (targetX >= startX ? 1 : -1);
      var walkDist = Math.abs(walkStopX - startX);
      var walkDur = Math.max(280, Math.min(560, Math.round(walkDist * 1.1)));

      this.time.delayedCall(280, () => {
        if (this.genToken !== token) return;
        milo.playClip('walk_loop');
        this.tweens.add({
          targets: milo.root,
          x: walkStopX,
          duration: walkDur,
          ease: 'Linear',
          onComplete: () => {
            if (this.genToken !== token) return;
            // 860-1180ms: Plant feet -> crouch & reach
            milo.playClip('crouch', { duration: 140 });
            milo.playClip('reach', { duration: 180 });

            this.time.delayedCall(220, () => {
              if (this.genToken !== token) return;
              // Exact hand contact marker: reparent into handSocket without jump
              this.markersLog.push('pickup_contact');
              rec.location = 'hand';
              milo.heldItem = item;
              window.MiloAudio.playPop();

              var worldMat = item.getWorldTransformMatrix();
              var sockMat = milo.handSocket.getWorldTransformMatrix();
              var invSock = sockMat.invert();
              var localPt = invSock.transformPoint(worldMat.tx, worldMat.ty);
              this.itemsLayer.remove(item, false);
              milo.handSocket.add(item);
              item.setPosition(localPt.x, localPt.y);
              this.tweens.add({ targets: item, x: 0, y: 0, scale: 0.65, duration: 120, ease: 'Quad.easeOut' });

              milo.playClip('grip_small', { duration: 150 });

              // 1350-1900ms: Carry toward basket
              this.time.delayedCall(170, () => {
                if (this.genToken !== token) return;
                milo.playClip(basketX >= milo.root.x ? 'turn_right' : 'turn_left');
                milo.playClip('carry');
                var carryStopX = basketX - 88;
                var carryDur = Math.max(300, Math.min(540, Math.round(Math.abs(carryStopX - milo.root.x) * 1.0)));

                this.tweens.add({
                  targets: milo.root,
                  x: carryStopX,
                  duration: carryDur,
                  ease: 'Linear',
                  onComplete: () => {
                    if (this.genToken !== token) return;
                    // 1900-2200ms: Release at basket rim
                    milo.playClip('drop_into_basket', { duration: 180 });
                    this.time.delayedCall(180, () => {
                      if (this.genToken !== token) return;
                      this.markersLog.push('release_contact');
                      milo.heldItem = null;
                      milo.handSocket.remove(item, false);
                      item.setVisible(false);
                      item.destroy();
                      rec.location = 'basket';

                      var visCount = isMultiCount ? this.collectedCount : 1;
                      this.updateDropTargetTexture(this.activeSpec.transferDestination, visCount);
                      this.burstAt(basketX, basketY - 22, 20);
                      window.MiloAudio.playCollect();
                      this.tweens.add({ targets: this.dropTarget, scale: 1.16, duration: 140, yoyo: true, ease: 'Back.easeOut' });

                      // Return Milo smoothly toward home spot if multi-count continues
                      if (isMultiCount && this.collectedCount < this.activeSpec.requiredCount) {
                        milo.playClip('small_success');
                        this.time.delayedCall(200, () => {
                          if (this.genToken !== token) return;
                          milo.playClip('turn_left');
                          milo.playClip('walk_loop');
                          this.tweens.add({
                            targets: milo.root, x: 185, duration: 360,
                            onComplete: () => {
                              if (this.genToken !== token) return;
                              milo.playClip('turn_right');
                              milo.playClip('idle_breathe');
                              this.setFsmState('awaiting_input');
                              if (callbacks.onPartialProgress) callbacks.onPartialProgress(this.collectedCount, this.activeSpec.requiredCount);
                            }
                          });
                        });
                      } else {
                        this.markersLog.push('action_done');
                        this.commitSuccess(rec);
                      }
                    });
                  }
                });
              });
            });
          }
        });
      });
    }

    updateDropTargetTexture(dest, count) {
      if (!this.dropTarget || !this.dropTarget.visible) return;
      if (dest === 'matching_slot') {
        this.dropTarget.setTexture('target-matching_slot-' + Math.min(3, count));
      } else if (dest === 'lantern') {
        this.dropTarget.setTexture('target-lantern-' + Math.min(4, count));
      } else {
        this.dropTarget.setTexture('target-basket-' + Math.min(5, count));
      }
    }

    commitSuccess(rec) {
      this.setFsmState('feedback');
      this.miloRig.playClip('small_success');
      if (this.friendRig) this.friendRig.playReaction('thank');
      if (this.squirrelRig) this.squirrelRig.playClip('leap');
      window.MiloAudio.playSeedFound();
      if (callbacks.onTaskCompleted) callbacks.onTaskCompleted(rec, this.activeSpec);
    }

    highlightHint() {
      var target = null;
      for (var i = 0; i < this.entityRecords.length; i++) {
        var r = this.entityRecords[i];
        if (!r.available) continue;
        if (this.activeSpec && this.activeSpec.evaluator === 'order_digits') {
          if (r.order === this.expectedOrder) { target = r; break; }
        } else if (r.isCorrect) {
          target = r; break;
        }
      }
      if (!target) return;
      if (this.lilaRig && this.lilaRig.root.visible) {
        this.tweens.add({
          targets: this.lilaRig.root,
          x: target.homeX,
          y: target.homeY - 82,
          duration: 420,
          ease: 'Sine.easeInOut'
        });
      }
      this.tweens.add({
        targets: target.container,
        scale: 1.14,
        duration: 240,
        yoyo: true,
        repeat: 2,
        ease: 'Sine.easeInOut'
      });
    }

    walkToNextScene(onMidpoint) {
      var token = this.genToken;
      this.setFsmState('transition');
      if (this.reducedMotion) {
        if (onMidpoint) onMidpoint();
        return;
      }
      this.miloRig.playClip('turn_right');
      this.miloRig.playClip('walk_loop');
      this.tweens.add({
        targets: this.miloRig.root,
        x: 1140,
        duration: 620,
        ease: 'Sine.easeIn',
        onComplete: () => {
          if (this.genToken !== token) return;
          this.tweens.add({
            targets: this.wipeCurtain,
            alpha: 1,
            duration: 220,
            onComplete: () => {
              if (this.genToken !== token) return;
              if (onMidpoint) onMidpoint();
              this.tweens.add({ targets: this.wipeCurtain, alpha: 0, duration: 240 });
            }
          });
        }
      });
    }

    getAccessibleEntities() {
      return this.entityRecords.map(function (r) {
        return {
          id: r.id,
          semanticTag: r.semanticTag,
          ariaLabel: r.ariaLabel,
          available: r.available,
          location: r.location,
          isCorrect: r.isCorrect,
          order: r.order,
          x: r.container ? r.container.x : r.homeX,
          y: r.container ? r.container.y : r.homeY
        };
      });
    }

    getPerfStats() {
      if (!this.frameSamples.length) return { samples: 0, avgFrameMs: 16.6, estFps: 60 };
      var sum = this.frameSamples.reduce(function (a, b) { return a + b; }, 0);
      var avg = sum / this.frameSamples.length;
      return {
        samples: this.frameSamples.length,
        avgFrameMs: Number(avg.toFixed(2)),
        estFps: Number((1000 / Math.max(1, avg)).toFixed(1))
      };
    }
  }

  function init(cb) {
    callbacks = cb || {};
    if (gameInstance) return;
    gameInstance = new Phaser.Game({
      type: Phaser.AUTO,
      parent: 'phaserMount',
      width: 1280,
      height: 720,
      transparent: false,
      backgroundColor: '#9ee0f1',
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      scene: [BootScene, GardenScene]
    });

    window.MiloAudio.setVisemeListener(function (viseme) {
      if (!gardenScene) return;
      if (gardenScene.friendRig && gardenScene.friendRig.setViseme) {
        gardenScene.friendRig.setViseme(viseme);
      } else if (gardenScene.miloRig) {
        gardenScene.miloRig.setViseme(viseme);
      }
    });
  }

  window.MiloPhaser = {
    init: init,
    loadTaskSpec: function (spec) {
      if (gardenScene) gardenScene.loadTaskSpec(spec);
      else pendingSpec = spec;
    },
    setPaused: function (val) {
      if (gardenScene) gardenScene.setPaused(val);
    },
    highlightHint: function () {
      if (gardenScene) gardenScene.highlightHint();
    },
    playFireflyDemo: function () {
      if (gardenScene) gardenScene.playFireflyDemo();
    },
    walkToNextScene: function (cb) {
      if (gardenScene) gardenScene.walkToNextScene(cb);
      else if (cb) cb();
    },
    triggerEntityById: function (id) {
      if (!gardenScene) return false;
      for (var i = 0; i < gardenScene.entityRecords.length; i++) {
        var r = gardenScene.entityRecords[i];
        if (r.id === id) {
          gardenScene.handleEntitySelection(r, false);
          return true;
        }
      }
      return false;
    },
    getStateSnapshot: function () {
      if (!gardenScene) return null;
      return {
        fsmState: gardenScene.fsmState,
        genToken: gardenScene.genToken,
        milo: gardenScene.miloRig ? {
          x: Math.round(gardenScene.miloRig.root.x),
          y: Math.round(gardenScene.miloRig.root.y),
          clip: gardenScene.miloRig.currentClip,
          viseme: gardenScene.miloRig.currentViseme,
          holding: !!gardenScene.miloRig.heldItem
        } : null,
        squirrel: gardenScene.squirrelRig ? {
          x: Math.round(gardenScene.squirrelRig.root.x),
          clip: gardenScene.squirrelRig.clip
        } : null,
        fireflies: gardenScene.fireflyActors.length,
        markersLog: gardenScene.markersLog.slice(),
        entities: gardenScene.getAccessibleEntities(),
        perf: gardenScene.getPerfStats()
      };
    }
  };
})();
