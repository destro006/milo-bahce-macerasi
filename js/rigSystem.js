(function () {
  'use strict';

  function createG(scene) {
    return scene.add.graphics();
  }

  // ===== 1. ARTICULATED MILO RIG (Hierarchical 2D Skeletal Container Rig) =====
  // Preserves approved Milo identity: warm brown fur, green overalls with gold star pocket,
  // yellow knit scarf, red explorer backpack, big expressive ears, gaze pupils, viseme mouth,
  // articulated pelvis/torso/legs/feet/arms/handSocket.
  function createMiloRig(scene, x, y) {
    var root = scene.add.container(x, y);
    var shadow = createG(scene);
    shadow.fillStyle(0x1f3c2e, 0.24);
    shadow.fillEllipse(0, 0, 96, 18);
    root.add(shadow);

    var bodyRoot = scene.add.container(0, 0);
    root.add(bodyRoot);

    // Tail (pelvis-anchored secondary follow-through)
    var tail = scene.add.container(-32, -46);
    var tailG = createG(scene);
    tailG.fillStyle(0xc9804d, 1); tailG.lineStyle(3.2, 0x754429, 1);
    tailG.beginPath();
    tailG.moveTo(0, 4);
    tailG.lineTo(-22, -6); tailG.lineTo(-26, -24); tailG.lineTo(-10, -26); tailG.lineTo(2, -8);
    tailG.closePath(); tailG.fillPath(); tailG.strokePath();
    tailG.fillStyle(0xf6d3ae, 1); tailG.fillCircle(-18, -18, 5.5);
    tail.add(tailG);
    bodyRoot.add(tail);

    // Backpack (behind torso)
    var backpack = scene.add.container(-36, -86);
    var bpG = createG(scene);
    bpG.fillStyle(0xde5b48, 1); bpG.lineStyle(3.2, 0x8b3226, 1);
    bpG.fillRoundedRect(-14, -22, 28, 54, 12); bpG.strokeRoundedRect(-14, -22, 28, 54, 12);
    bpG.fillStyle(0xf89b84, 1); bpG.fillRoundedRect(-9, -14, 14, 18, 6);
    backpack.add(bpG);
    bodyRoot.add(backpack);

    // Legs (hip -> thigh -> knee -> shin -> planted boot)
    function makeLeg(hipX, footDir) {
      var hip = scene.add.container(hipX, -42);
      var thighG = createG(scene);
      thighG.fillStyle(0x8b583d, 1); thighG.lineStyle(3, 0x5e3723, 1);
      thighG.fillRoundedRect(-11, -2, 22, 24, 9); thighG.strokeRoundedRect(-11, -2, 22, 24, 9);
      hip.add(thighG);

      var knee = scene.add.container(0, 18);
      var shinG = createG(scene);
      shinG.fillStyle(0x8b583d, 1); shinG.lineStyle(3, 0x5e3723, 1);
      shinG.fillRoundedRect(-10, -2, 20, 22, 8); shinG.strokeRoundedRect(-10, -2, 20, 22, 8);
      shinG.fillStyle(0xba774a, 1);
      shinG.fillEllipse(footDir * 3, 22, 32, 16);
      shinG.strokeEllipse(footDir * 3, 22, 32, 16);
      knee.add(shinG);
      hip.add(knee);
      return { hip: hip, knee: knee };
    }
    var legL = makeLeg(-20, -1);
    var legR = makeLeg(20, 1);
    bodyRoot.add([legL.hip, legR.hip]);

    // Left Arm (behind/side)
    function makeArm(shX) {
      var shoulder = scene.add.container(shX, -88);
      var upperG = createG(scene);
      upperG.fillStyle(0xcc8452, 1); upperG.lineStyle(3, 0x754429, 1);
      upperG.fillRoundedRect(-9, -2, 18, 26, 8); upperG.strokeRoundedRect(-9, -2, 18, 26, 8);
      shoulder.add(upperG);

      var elbow = scene.add.container(0, 22);
      var foreG = createG(scene);
      foreG.fillStyle(0xcc8452, 1); foreG.lineStyle(3, 0x754429, 1);
      foreG.fillRoundedRect(-8.5, -2, 17, 24, 8); foreG.strokeRoundedRect(-8.5, -2, 17, 24, 8);
      elbow.add(foreG);

      var hand = scene.add.container(0, 23);
      var handG = createG(scene);
      handG.fillStyle(0xdf9c6c, 1); handG.lineStyle(2.8, 0x754429, 1);
      handG.fillCircle(0, 0, 10); handG.strokeCircle(0, 0, 10);
      // Thumb hint
      handG.fillCircle(-6, -4, 4); handG.strokeCircle(-6, -4, 4);
      hand.add(handG);

      var handSocket = scene.add.container(4, 2);
      hand.add(handSocket);

      elbow.add(hand);
      shoulder.add(elbow);
      return { shoulder: shoulder, elbow: elbow, hand: hand, handSocket: handSocket };
    }

    var armL = makeArm(-36);
    bodyRoot.add(armL.shoulder);

    // Torso (Green overalls with radial shading + gold star pocket)
    var torso = scene.add.container(0, -68);
    var torsoG = createG(scene);
    torsoG.fillStyle(0x4a8c49, 1); torsoG.lineStyle(3.4, 0x2d5931, 1);
    torsoG.fillRoundedRect(-34, -30, 68, 66, 22); torsoG.strokeRoundedRect(-34, -30, 68, 66, 22);
    // Warm sunlit chest highlight
    torsoG.fillStyle(0x6eb567, 0.72);
    torsoG.fillRoundedRect(-28, -26, 46, 52, 16);
    // Straps & Gold Buttons
    torsoG.fillStyle(0x438242, 1); torsoG.lineStyle(2.4, 0x2d5931, 1);
    torsoG.fillRoundedRect(-25, -32, 10, 22, 4); torsoG.strokeRoundedRect(-25, -32, 10, 22, 4);
    torsoG.fillRoundedRect(15, -32, 10, 22, 4); torsoG.strokeRoundedRect(15, -32, 10, 22, 4);
    torsoG.fillStyle(0xffe073, 1);
    torsoG.fillCircle(-20, -17, 3.8); torsoG.fillCircle(20, -17, 3.8);
    // Pocket & Star
    torsoG.fillStyle(0xf8cf60, 1); torsoG.lineStyle(2.6, 0xb47b21, 1);
    torsoG.fillRoundedRect(-20, -2, 40, 26, 8); torsoG.strokeRoundedRect(-20, -2, 40, 26, 8);
    torsoG.fillStyle(0xfff9db, 1);
    torsoG.fillCircle(0, 11, 7.5);
    torso.add(torsoG);
    bodyRoot.add(torso);

    // Scarf (neck collar + trailing flap)
    var scarfCollar = createG(scene);
    scarfCollar.fillStyle(0xffe073, 1); scarfCollar.lineStyle(2.8, 0xb57b1f, 1);
    scarfCollar.fillRoundedRect(-30, -104, 60, 16, 8); scarfCollar.strokeRoundedRect(-30, -104, 60, 16, 8);
    bodyRoot.add(scarfCollar);

    var scarfTail = scene.add.container(22, -96);
    var stG = createG(scene);
    stG.fillStyle(0xffd95e, 1); stG.lineStyle(2.8, 0xb57b1f, 1);
    stG.fillRoundedRect(-4, 0, 17, 36, 7); stG.strokeRoundedRect(-4, 0, 17, 36, 7);
    scarfTail.add(stG);
    bodyRoot.add(scarfTail);

    // Right Arm (in front of torso, owns primary handSocket)
    var armR = makeArm(36);
    bodyRoot.add(armR.shoulder);

    // Head Group
    var head = scene.add.container(0, -132);
    bodyRoot.add(head);

    function makeEar(ex, rot) {
      var ear = scene.add.container(ex, -34);
      ear.setRotation(rot);
      var eg = createG(scene);
      eg.fillStyle(0xcc8452, 1); eg.lineStyle(3.2, 0x754429, 1);
      eg.fillEllipse(0, -10, 26, 44); eg.strokeEllipse(0, -10, 26, 44);
      eg.fillStyle(0xf2aba0, 1);
      eg.fillEllipse(0, -8, 14, 26);
      ear.add(eg);
      return ear;
    }
    var earL = makeEar(-29, -0.3);
    var earR = makeEar(29, 0.3);
    head.add([earL, earR]);

    var headBase = createG(scene);
    headBase.fillStyle(0xc67e4d, 1); headBase.lineStyle(3.4, 0x754429, 1);
    headBase.fillEllipse(0, 0, 88, 76); headBase.strokeEllipse(0, 0, 88, 76);
    // Warm top-left cartoon fur highlight
    headBase.fillStyle(0xe3a872, 0.78);
    headBase.fillEllipse(-6, -8, 68, 52);
    // Muzzle & rosy cheeks
    headBase.fillStyle(0xf7d5b2, 1);
    headBase.fillEllipse(0, 13, 44, 28);
    headBase.fillStyle(0xf08c80, 0.62);
    headBase.fillEllipse(-29, 10, 16, 10);
    headBase.fillEllipse(29, 10, 16, 10);
    // Cute Nose with shine
    headBase.fillStyle(0x683c2e, 1);
    headBase.fillEllipse(0, 6, 13, 8.5);
    headBase.fillStyle(0xffffff, 0.45);
    headBase.fillCircle(-3, 4, 2.2);
    head.add(headBase);

    // Eyes with independent pupils (gaze lead!) + eyelids
    var eyeGroup = scene.add.container(0, -4);
    var scleraG = createG(scene);
    scleraG.fillStyle(0xffffff, 1); scleraG.lineStyle(2, 0x3b2619, 0.5);
    scleraG.fillEllipse(-19, 0, 15, 18); scleraG.fillEllipse(19, 0, 15, 18);
    eyeGroup.add(scleraG);

    var pupils = scene.add.container(0, 0);
    var pupilG = createG(scene);
    pupilG.fillStyle(0x233731, 1);
    pupilG.fillEllipse(-19, 0, 11, 14); pupilG.fillEllipse(19, 0, 11, 14);
    pupilG.fillStyle(0xffffff, 1);
    pupilG.fillCircle(-21, -3, 2.7); pupilG.fillCircle(17, -3, 2.7);
    pupilG.fillCircle(-17, 3, 1.2); pupilG.fillCircle(21, 3, 1.2);
    pupils.add(pupilG);
    eyeGroup.add(pupils);

    var lids = createG(scene);
    lids.fillStyle(0xc98555, 1);
    lids.fillEllipse(-19, 0, 17, 20); lids.fillEllipse(19, 0, 17, 20);
    lids.setVisible(false);
    eyeGroup.add(lids);
    head.add(eyeGroup);

    // Brows
    var browL = createG(scene);
    browL.lineStyle(2.8, 0x6b3e29, 1);
    browL.beginPath(); browL.moveTo(-26, -18); browL.lineTo(-12, -19); browL.strokePath();
    var browR = createG(scene);
    browR.lineStyle(2.8, 0x6b3e29, 1);
    browR.beginPath(); browR.moveTo(12, -19); browR.lineTo(26, -18); browR.strokePath();
    head.add([browL, browR]);

    // Dynamic Viseme / Expression Mouth
    var mouthG = createG(scene);
    head.add(mouthG);

    var rig = {
      kind: 'milo',
      root: root,
      bodyRoot: bodyRoot,
      shadow: shadow,
      tail: tail,
      backpack: backpack,
      legL: legL,
      legR: legR,
      torso: torso,
      armL: armL,
      armR: armR,
      handSocket: armR.handSocket,
      scarfTail: scarfTail,
      head: head,
      earL: earL,
      earR: earR,
      pupils: pupils,
      lids: lids,
      browL: browL,
      browR: browR,
      mouthG: mouthG,
      currentClip: 'idle_breathe',
      currentExpression: 'smile',
      currentViseme: 'rest',
      facing: 1,
      gazeX: 0,
      gazeY: 0,
      walkPhase: 0,
      idlePhase: 0,
      blinkTimer: 0,
      activeTweens: [],
      actionToken: 0,
      heldItem: null
    };

    function drawMouth(viseme, expr) {
      mouthG.clear();
      if (viseme && viseme !== 'rest') {
        mouthG.fillStyle(0xda6863, 1);
        mouthG.lineStyle(2.2, 0x683c2e, 1);
        if (viseme === 'A' || viseme === 'O') {
          var rx = viseme === 'O' ? 10 : 14;
          var ry = viseme === 'O' ? 11 : 12;
          mouthG.fillEllipse(0, 17, rx, ry); mouthG.strokeEllipse(0, 17, rx, ry);
        } else if (viseme === 'E' || viseme === 'I') {
          mouthG.fillRoundedRect(-9, 14, 18, 7, 3); mouthG.strokeRoundedRect(-9, 14, 18, 7, 3);
        } else if (viseme === 'U') {
          mouthG.fillCircle(0, 17, 4.5); mouthG.strokeCircle(0, 17, 4.5);
        } else {
          // M / B / P / F
          mouthG.lineStyle(2.6, 0x683c2e, 1);
          mouthG.beginPath(); mouthG.moveTo(-7, 17); mouthG.lineTo(7, 17); mouthG.strokePath();
        }
        return;
      }

      if (expr === 'happy' || expr === 'celebrate') {
        mouthG.fillStyle(0xda6863, 1); mouthG.lineStyle(2.4, 0x683c2e, 1);
        mouthG.fillEllipse(0, 17, 16, 11); mouthG.strokeEllipse(0, 17, 16, 11);
      } else if (expr === 'curious' || expr === 'think') {
        mouthG.fillStyle(0xda6863, 1); mouthG.lineStyle(2.2, 0x683c2e, 1);
        mouthG.fillCircle(2, 17, 3.8); mouthG.strokeCircle(2, 17, 3.8);
      } else if (expr === 'soft_disappointed') {
        mouthG.lineStyle(2.6, 0x683c2e, 1);
        mouthG.beginPath(); mouthG.moveTo(-7, 19); mouthG.lineTo(0, 16); mouthG.lineTo(7, 19); mouthG.strokePath();
      } else {
        mouthG.lineStyle(2.6, 0x683c2e, 1);
        mouthG.beginPath(); mouthG.moveTo(-8, 15); mouthG.lineTo(0, 19); mouthG.lineTo(8, 15); mouthG.strokePath();
      }
    }

    rig.setViseme = function (v) {
      rig.currentViseme = v || 'rest';
      drawMouth(rig.currentViseme, rig.currentExpression);
    };

    rig.setExpression = function (expr) {
      rig.currentExpression = expr || 'smile';
      if (expr === 'curious' || expr === 'think') {
        browL.y = 2; browR.y = -3;
        earL.rotation = -0.22; earR.rotation = 0.42;
      } else if (expr === 'soft_disappointed') {
        browL.y = 3; browR.y = 3;
        earL.rotation = -0.52; earR.rotation = 0.52;
      } else if (expr === 'happy' || expr === 'celebrate' || expr === 'relieved') {
        browL.y = -2; browR.y = -2;
        earL.rotation = -0.24; earR.rotation = 0.24;
      } else {
        browL.y = 0; browR.y = 0;
        earL.rotation = -0.3; earR.rotation = 0.3;
      }
      drawMouth(rig.currentViseme, rig.currentExpression);
    };

    rig.setGaze = function (tx, ty) {
      var dx = (tx - root.x);
      var dy = (ty - (root.y - 132));
      var len = Math.sqrt(dx * dx + dy * dy) || 1;
      rig.gazeX = Phaser.Math.Clamp((dx / len) * 3.8 * rig.facing, -3.5, 3.5);
      rig.gazeY = Phaser.Math.Clamp((dy / len) * 3.2, -3, 3);
      pupils.x = rig.gazeX;
      pupils.y = rig.gazeY;
    };

    rig.resetPose = function () {
      bodyRoot.setPosition(0, 0).setScale(1, 1).setRotation(0);
      torso.setRotation(0);
      head.setPosition(0, -132).setRotation(0);
      legL.hip.setRotation(0); legL.knee.setRotation(0);
      legR.hip.setRotation(0); legR.knee.setRotation(0);
      armL.shoulder.setRotation(0.22); armL.elbow.setRotation(0.12);
      armR.shoulder.setRotation(-0.22); armR.elbow.setRotation(-0.12);
      shadow.setScale(1, 1);
    };

    rig.killTweens = function () {
      rig.activeTweens.forEach(function (tw) {
        if (tw && tw.stop) tw.stop();
      });
      rig.activeTweens = [];
      scene.tweens.killTweensOf([bodyRoot, head, torso, legL.hip, legL.knee, legR.hip, legR.knee, armL.shoulder, armL.elbow, armR.shoulder, armR.elbow, tail, scarfTail, earL, earR, root]);
    };

    rig.playClip = function (clipName, opts) {
      opts = opts || {};
      rig.currentClip = clipName;
      if (clipName !== 'idle_breathe' && clipName !== 'walk_loop' && clipName !== 'carry') {
        rig.killTweens();
      }
      var dur = opts.duration || 360;

      switch (clipName) {
        case 'idle_breathe':
          rig.setExpression(opts.expr || 'smile');
          rig.resetPose();
          break;
        case 'look_at_target':
          if (opts.tx !== undefined) rig.setGaze(opts.tx, opts.ty);
          rig.setExpression('curious');
          var headTurn = Phaser.Math.Clamp(((opts.tx || root.x) - root.x) * 0.0008 * rig.facing, -0.18, 0.18);
          rig.activeTweens.push(scene.tweens.add({
            targets: head, rotation: headTurn, duration: 150, ease: 'Sine.easeOut'
          }));
          break;
        case 'turn_left':
          rig.facing = -1;
          rig.activeTweens.push(scene.tweens.add({ targets: bodyRoot, scaleX: -1, duration: 150, ease: 'Quad.easeOut' }));
          break;
        case 'turn_right':
          rig.facing = 1;
          rig.activeTweens.push(scene.tweens.add({ targets: bodyRoot, scaleX: 1, duration: 150, ease: 'Quad.easeOut' }));
          break;
        case 'wave_hello':
        case 'wave_goodbye':
          rig.setExpression('happy');
          rig.activeTweens.push(scene.tweens.add({
            targets: armR.shoulder, rotation: -2.4, duration: 220, ease: 'Back.easeOut',
            onComplete: function () {
              scene.tweens.add({
                targets: armR.elbow, rotation: { from: -0.35, to: 0.35 }, duration: 180, yoyo: true, repeat: 2,
                onComplete: function () { if (opts.onComplete) opts.onComplete(); }
              });
            }
          }));
          break;
        case 'listen':
          rig.setExpression('curious');
          rig.activeTweens.push(scene.tweens.add({ targets: head, rotation: -0.16, duration: 220, ease: 'Sine.easeOut' }));
          rig.activeTweens.push(scene.tweens.add({ targets: armR.shoulder, rotation: -1.75, duration: 260, ease: 'Quad.easeOut' }));
          rig.activeTweens.push(scene.tweens.add({ targets: armR.elbow, rotation: -1.2, duration: 260, ease: 'Quad.easeOut' }));
          break;
        case 'think':
          rig.setExpression('think');
          rig.activeTweens.push(scene.tweens.add({ targets: head, rotation: 0.12, y: -134, duration: 240, ease: 'Sine.easeOut' }));
          rig.activeTweens.push(scene.tweens.add({ targets: armR.shoulder, rotation: -1.25, duration: 260 }));
          rig.activeTweens.push(scene.tweens.add({ targets: armR.elbow, rotation: -1.5, duration: 260 }));
          break;
        case 'point':
          rig.setExpression('curious');
          rig.activeTweens.push(scene.tweens.add({ targets: armR.shoulder, rotation: -1.45, duration: 200, ease: 'Back.easeOut' }));
          rig.activeTweens.push(scene.tweens.add({ targets: armR.elbow, rotation: 0, duration: 200 }));
          break;
        case 'crouch':
          // Anticipation + bent knees, pelvis drops while feet stay planted
          rig.activeTweens.push(scene.tweens.add({ targets: bodyRoot, y: 14, scaleX: rig.facing * 1.04, scaleY: 0.92, duration: dur, ease: 'Quad.easeOut' }));
          rig.activeTweens.push(scene.tweens.add({ targets: legL.hip, rotation: -0.45, duration: dur }));
          rig.activeTweens.push(scene.tweens.add({ targets: legL.knee, rotation: 0.65, duration: dur }));
          rig.activeTweens.push(scene.tweens.add({ targets: legR.hip, rotation: 0.45, duration: dur }));
          rig.activeTweens.push(scene.tweens.add({ targets: legR.knee, rotation: -0.65, duration: dur }));
          break;
        case 'reach':
          rig.activeTweens.push(scene.tweens.add({ targets: torso, rotation: 0.14, duration: dur * 0.7 }));
          rig.activeTweens.push(scene.tweens.add({ targets: armR.shoulder, rotation: -1.15, duration: dur, ease: 'Cubic.easeOut' }));
          rig.activeTweens.push(scene.tweens.add({ targets: armR.elbow, rotation: -0.15, duration: dur }));
          break;
        case 'grip_small':
        case 'lift_weight':
          // Recover from crouch with slight backward balance
          rig.activeTweens.push(scene.tweens.add({ targets: bodyRoot, y: 0, scaleX: rig.facing * 0.98, scaleY: 1.02, duration: dur, ease: 'Back.easeOut' }));
          rig.activeTweens.push(scene.tweens.add({ targets: torso, rotation: -0.06, duration: dur }));
          rig.activeTweens.push(scene.tweens.add({ targets: legL.hip, rotation: 0, duration: dur }));
          rig.activeTweens.push(scene.tweens.add({ targets: legL.knee, rotation: 0, duration: dur }));
          rig.activeTweens.push(scene.tweens.add({ targets: legR.hip, rotation: 0, duration: dur }));
          rig.activeTweens.push(scene.tweens.add({ targets: legR.knee, rotation: 0, duration: dur }));
          rig.activeTweens.push(scene.tweens.add({ targets: armR.shoulder, rotation: -0.9, duration: dur }));
          rig.activeTweens.push(scene.tweens.add({ targets: armR.elbow, rotation: -0.65, duration: dur }));
          break;
        case 'drop_into_basket':
          rig.activeTweens.push(scene.tweens.add({ targets: torso, rotation: 0.16, duration: dur * 0.6 }));
          rig.activeTweens.push(scene.tweens.add({ targets: armR.shoulder, rotation: -1.4, duration: dur * 0.6, ease: 'Quad.easeOut' }));
          rig.activeTweens.push(scene.tweens.add({ targets: armR.elbow, rotation: -0.1, duration: dur * 0.6 }));
          break;
        case 'encourage':
          rig.setExpression('relieved');
          rig.activeTweens.push(scene.tweens.add({ targets: bodyRoot, y: 5, duration: 180, yoyo: true, ease: 'Sine.easeInOut' }));
          rig.activeTweens.push(scene.tweens.add({ targets: armL.shoulder, rotation: 0.85, duration: 240, yoyo: true }));
          break;
        case 'soft_disappointed':
          rig.setExpression('soft_disappointed');
          rig.activeTweens.push(scene.tweens.add({ targets: head, y: -126, rotation: 0.08, duration: 300 }));
          rig.activeTweens.push(scene.tweens.add({ targets: armL.shoulder, rotation: 0.08, duration: 300 }));
          rig.activeTweens.push(scene.tweens.add({ targets: armR.shoulder, rotation: -0.08, duration: 300 }));
          break;
        case 'relieved':
        case 'small_success':
          rig.setExpression('happy');
          rig.activeTweens.push(scene.tweens.add({ targets: bodyRoot, y: -12, scaleY: 1.05, duration: 180, yoyo: true, ease: 'Back.easeOut' }));
          rig.activeTweens.push(scene.tweens.add({ targets: armL.shoulder, rotation: 1.4, duration: 220, yoyo: true }));
          rig.activeTweens.push(scene.tweens.add({ targets: armR.shoulder, rotation: -1.4, duration: 220, yoyo: true }));
          break;
        case 'celebrate':
          rig.setExpression('happy');
          rig.activeTweens.push(scene.tweens.add({
            targets: bodyRoot, y: 8, scaleY: 0.92, duration: 110,
            onComplete: function () {
              scene.tweens.add({
                targets: bodyRoot, y: -32, scaleY: 1.06, duration: 240, yoyo: true, ease: 'Quad.easeOut',
                onComplete: function () {
                  rig.resetPose();
                  if (opts.onComplete) opts.onComplete();
                }
              });
            }
          }));
          rig.activeTweens.push(scene.tweens.add({ targets: armL.shoulder, rotation: 2.3, duration: 260, yoyo: true, repeat: 1 }));
          rig.activeTweens.push(scene.tweens.add({ targets: armR.shoulder, rotation: -2.3, duration: 260, yoyo: true, repeat: 1 }));
          break;
        default:
          break;
      }
    };

    rig.update = function (time, delta) {
      var dt = Math.min(0.05, (delta || 16) / 1000);
      // Natural non-metronome blinking
      rig.blinkTimer += dt;
      if (rig.blinkTimer > 3.4) {
        lids.setVisible(true);
        if (rig.blinkTimer > 3.55) {
          lids.setVisible(false);
          rig.blinkTimer = Math.random() * 0.9;
        }
      }

      // Secondary follow-through for tail, ears, scarf
      if (rig.currentClip === 'idle_breathe') {
        rig.idlePhase += dt * 2.4;
        var b = Math.sin(rig.idlePhase);
        torso.y = -68 + b * 1.8;
        head.y = -132 + b * 2.2;
        tail.rotation = Math.sin(rig.idlePhase * 0.85) * 0.14;
        scarfTail.rotation = Math.sin(rig.idlePhase * 0.9 - 0.5) * 0.1;
        earL.rotation = -0.3 + Math.sin(rig.idlePhase * 0.5) * 0.04;
        earR.rotation = 0.3 - Math.sin(rig.idlePhase * 0.5 + 0.4) * 0.04;
      } else if (rig.currentClip === 'walk_loop' || rig.currentClip === 'walk_cautious' || rig.currentClip === 'carry') {
        var spd = rig.currentClip === 'walk_cautious' ? 6.5 : 10.5;
        rig.walkPhase += dt * spd;
        var s = Math.sin(rig.walkPhase);
        var c = Math.cos(rig.walkPhase);
        bodyRoot.y = -Math.abs(c) * 6;
        shadow.setScale(1 - Math.abs(c) * 0.12, 1);
        legL.hip.rotation = s * 0.48;
        legL.knee.rotation = Math.max(0, -c) * 0.45;
        legR.hip.rotation = -s * 0.48;
        legR.knee.rotation = Math.max(0, c) * 0.45;
        armL.shoulder.rotation = -s * 0.45 + 0.2;
        if (rig.currentClip !== 'carry') {
          armR.shoulder.rotation = s * 0.45 - 0.2;
        } else {
          armR.shoulder.rotation = -1.05;
          armR.elbow.rotation = -0.6;
        }
        // Secondary lag on scarf, tail, ears
        tail.rotation = -0.18 + Math.sin(rig.walkPhase - 0.8) * 0.22;
        scarfTail.rotation = 0.25 + Math.sin(rig.walkPhase - 0.6) * 0.16;
        earL.rotation = -0.32 + Math.sin(rig.walkPhase - 0.4) * 0.08;
        earR.rotation = 0.32 - Math.sin(rig.walkPhase - 0.4) * 0.08;
      }
    };

    return rig;
  }

  // ===== 2. ARTICULATED SQUIRREL RIG (Sincap Pıtır) =====
  // Spine, alternating paws, multi-segment tail lag, ears, blink, leap/land/climb/chew
  function createSquirrelRig(scene, x, y) {
    var root = scene.add.container(x, y);
    var shadow = createG(scene);
    shadow.fillStyle(0x1f3c2e, 0.22);
    shadow.fillEllipse(0, 0, 72, 14);
    root.add(shadow);

    var bodyRoot = scene.add.container(0, 0);
    root.add(bodyRoot);

    // Multi-segment articulated fluffy tail
    var tailBase = scene.add.container(22, -30);
    var tbG = createG(scene);
    tbG.fillStyle(0xd27a3d, 1); tbG.lineStyle(3, 0x6f3918, 1);
    tbG.fillEllipse(10, -16, 28, 40); tbG.strokeEllipse(10, -16, 28, 40);
    tailBase.add(tbG);

    var tailTip = scene.add.container(14, -36);
    var ttG = createG(scene);
    ttG.fillStyle(0xe3965a, 1); ttG.lineStyle(3, 0x6f3918, 1);
    ttG.fillEllipse(2, -14, 24, 30); ttG.strokeEllipse(2, -14, 24, 30);
    tailTip.add(ttG);
    tailBase.add(tailTip);
    bodyRoot.add(tailBase);

    // Back & front paws
    function makePaw(px, py) {
      var paw = scene.add.container(px, py);
      var pg = createG(scene);
      pg.fillStyle(0xc46d34, 1); pg.lineStyle(2.6, 0x6f3918, 1);
      pg.fillEllipse(0, 8, 16, 12); pg.strokeEllipse(0, 8, 16, 12);
      paw.add(pg);
      return paw;
    }
    var backPaw = makePaw(14, -12);
    var frontPaw = makePaw(-16, -12);
    bodyRoot.add([backPaw, frontPaw]);

    // Torso / Spine
    var torso = scene.add.container(0, -34);
    var tG = createG(scene);
    tG.fillStyle(0xd47d42, 1); tG.lineStyle(3, 0x6f3918, 1);
    tG.fillEllipse(0, 0, 44, 48); tG.strokeEllipse(0, 0, 44, 48);
    tG.fillStyle(0xf8dcc0, 1);
    tG.fillEllipse(-8, 4, 22, 30);
    torso.add(tG);
    bodyRoot.add(torso);

    // Head + Ears + Blink + Nose
    var head = scene.add.container(-6, -68);
    var earL = createG(scene);
    earL.fillStyle(0xc97339, 1); earL.lineStyle(2.6, 0x6f3918, 1);
    earL.fillTriangle(-14, -10, -20, -32, -4, -16); earL.strokeTriangle(-14, -10, -20, -32, -4, -16);
    var earR = createG(scene);
    earR.fillStyle(0xc97339, 1); earR.lineStyle(2.6, 0x6f3918, 1);
    earR.fillTriangle(8, -12, 14, -34, 20, -14); earR.strokeTriangle(8, -12, 14, -34, 20, -14);
    head.add([earL, earR]);

    var hG = createG(scene);
    hG.fillStyle(0xda8449, 1); hG.lineStyle(3, 0x6f3918, 1);
    hG.fillEllipse(0, 0, 42, 36); hG.strokeEllipse(0, 0, 42, 36);
    hG.fillStyle(0xf8dcc0, 1); hG.fillEllipse(-10, 6, 18, 14);
    hG.fillStyle(0x233731, 1); hG.fillCircle(-8, -3, 4.2);
    hG.fillStyle(0xffffff, 1); hG.fillCircle(-9.5, -4.5, 1.5);
    hG.fillStyle(0x5a2f18, 1); hG.fillCircle(-20, 4, 3.8);
    head.add(hG);

    var lid = createG(scene);
    lid.fillStyle(0xda8449, 1); lid.fillCircle(-8, -3, 5); lid.setVisible(false);
    head.add(lid);
    bodyRoot.add(head);

    var rig = {
      kind: 'sincap',
      root: root,
      bodyRoot: bodyRoot,
      tailBase: tailBase,
      tailTip: tailTip,
      head: head,
      frontPaw: frontPaw,
      backPaw: backPaw,
      phase: 0,
      blinkTimer: 0,
      clip: 'idle_sniff',
      playClip: function (name) {
        rig.clip = name;
        scene.tweens.killTweensOf([bodyRoot, head, tailBase, tailTip, frontPaw, backPaw]);
        if (name === 'leap') {
          scene.tweens.add({
            targets: bodyRoot, y: 6, scaleY: 0.88, duration: 100,
            onComplete: function () {
              scene.tweens.add({
                targets: bodyRoot, y: -34, scaleY: 1.08, duration: 220, yoyo: true, ease: 'Quad.easeOut',
                onComplete: function () {
                  // landing compression
                  scene.tweens.add({
                    targets: bodyRoot, y: 6, scaleY: 0.9, duration: 90, yoyo: true,
                    onComplete: function () { rig.clip = 'idle_sniff'; bodyRoot.setPosition(0, 0).setScale(1, 1); }
                  });
                }
              });
            }
          });
        } else if (name === 'chew' || name === 'grip_nut') {
          scene.tweens.add({ targets: frontPaw, y: -32, duration: 150, yoyo: true, repeat: 3 });
          scene.tweens.add({ targets: head, rotation: -0.15, duration: 130, yoyo: true, repeat: 3 });
        } else if (name === 'look') {
          scene.tweens.add({ targets: head, rotation: 0.18, duration: 200, yoyo: true });
        }
      },
      update: function (time, delta) {
        var dt = Math.min(0.05, (delta || 16) / 1000);
        rig.phase += dt * (rig.clip === 'scamper' ? 14 : 3.2);
        rig.blinkTimer += dt;
        if (rig.blinkTimer > 3.1) {
          lid.setVisible(true);
          if (rig.blinkTimer > 3.25) { lid.setVisible(false); rig.blinkTimer = 0; }
        }
        tailBase.rotation = Math.sin(rig.phase) * 0.22;
        tailTip.rotation = Math.sin(rig.phase - 0.7) * 0.28;
        if (rig.clip === 'scamper' || rig.clip === 'walk') {
          var s = Math.sin(rig.phase);
          frontPaw.x = -16 + s * 8;
          backPaw.x = 14 - s * 8;
          bodyRoot.y = -Math.abs(Math.cos(rig.phase)) * 5;
        } else if (rig.clip === 'idle_sniff') {
          head.y = -68 + Math.sin(rig.phase * 2) * 1.8;
        }
      }
    };
    return rig;
  }

  // ===== 3. VISIBLE FIREFLY RIG (Lila & Twilight Fireflies) =====
  // Visible body, head, antennae, fluttering wings, and gentle non-strobing abdominal glow
  function createFireflyRig(scene, x, y, tintHex) {
    var root = scene.add.container(x, y);
    var glowColor = tintHex || 0xffe564;

    var halo = createG(scene);
    halo.fillStyle(glowColor, 0.28);
    halo.fillCircle(0, 12, 42);
    halo.fillStyle(0xfffbe0, 0.32);
    halo.fillCircle(0, 12, 24);
    root.add(halo);

    var wingL = createG(scene);
    wingL.fillStyle(0xe8fcff, 0.88); wingL.lineStyle(2, 0x7ec2d4, 1);
    wingL.fillEllipse(-14, 0, 26, 15); wingL.strokeEllipse(-14, 0, 26, 15);
    wingL.setPosition(-8, -4);

    var wingR = createG(scene);
    wingR.fillStyle(0xe8fcff, 0.88); wingR.lineStyle(2, 0x7ec2d4, 1);
    wingR.fillEllipse(14, 0, 26, 15); wingR.strokeEllipse(14, 0, 26, 15);
    wingR.setPosition(8, -4);
    root.add([wingL, wingR]);

    var abdomen = createG(scene);
    abdomen.fillStyle(glowColor, 1); abdomen.lineStyle(2.4, 0xc4831a, 1);
    abdomen.fillEllipse(0, 14, 24, 28); abdomen.strokeEllipse(0, 14, 24, 28);
    abdomen.fillStyle(0xfffce0, 0.85);
    abdomen.fillEllipse(-4, 10, 8, 12);
    root.add(abdomen);

    var headG = createG(scene);
    headG.lineStyle(2.2, 0x4e3b69, 1);
    headG.beginPath(); headG.moveTo(-5, -16); headG.lineTo(-14, -27); headG.strokePath();
    headG.beginPath(); headG.moveTo(5, -16); headG.lineTo(14, -27); headG.strokePath();
    headG.fillStyle(0xffe066, 1); headG.fillCircle(-14, -27, 2.8); headG.fillCircle(14, -27, 2.8);
    headG.fillStyle(0x775ea3, 1); headG.lineStyle(2.2, 0x423063, 1);
    headG.fillCircle(0, -7, 12); headG.strokeCircle(0, -7, 12);
    headG.fillStyle(0xffffff, 1); headG.fillCircle(-4, -9, 2.5); headG.fillCircle(4, -9, 2.5);
    headG.fillStyle(0x1f1b2e, 1); headG.fillCircle(-3.6, -8.8, 1.3); headG.fillCircle(4.4, -8.8, 1.3);
    root.add(headG);

    var rig = {
      kind: 'lila',
      root: root,
      halo: halo,
      wingL: wingL,
      wingR: wingR,
      abdomen: abdomen,
      phase: Math.random() * Math.PI * 2,
      pulseActive: false,
      pulseGlow: function (count, intervalMs, onDone) {
        var stepMs = Math.max(1000, intervalMs || 1100);
        var done = 0;
        function onePulse() {
          if (!root.scene) return;
          rig.pulseActive = true;
          scene.tweens.add({
            targets: halo,
            scale: 1.55,
            alpha: 1,
            duration: 380,
            yoyo: true,
            ease: 'Sine.easeInOut',
            onComplete: function () {
              rig.pulseActive = false;
              done += 1;
              if (done < count) {
                scene.time.delayedCall(stepMs - 760, onePulse);
              } else if (onDone) {
                onDone();
              }
            }
          });
        }
        onePulse();
      },
      update: function (time, delta) {
        var dt = Math.min(0.05, (delta || 16) / 1000);
        rig.phase += dt * 16;
        var w = Math.sin(rig.phase) * 0.45;
        wingL.rotation = -0.35 + w;
        wingR.rotation = 0.35 - w;
        if (!rig.pulseActive) {
          var s = 1 + Math.sin(time * 0.0025) * 0.1;
          halo.setScale(s);
          halo.setAlpha(0.7 + Math.sin(time * 0.0025) * 0.22);
        }
      }
    };
    return rig;
  }

  // ===== 4. ARTICULATED FRIEND RIGS (Pof, Maviş, Nine Fındık) =====
  function createFriendRig(scene, friendId, x, y) {
    if (friendId === 'sincap') return createSquirrelRig(scene, x, y);
    if (friendId === 'lila') return createFireflyRig(scene, x, y);

    var root = scene.add.container(x, y);
    var shadow = createG(scene);
    shadow.fillStyle(0x1f3c2e, 0.22);
    shadow.fillEllipse(0, 0, 86, 16);
    root.add(shadow);

    var body = scene.add.container(0, -48);
    root.add(body);
    var wingL = null, wingR = null, tail = null, head = null, lids = null, mouthG = null;
    var wetDrops = null;

    if (friendId === 'pof') {
      var quills = createG(scene);
      quills.fillStyle(0x89593e, 1); quills.lineStyle(3, 0x4f301e, 1);
      quills.beginPath();
      quills.moveTo(-48, 10); quills.lineTo(-54, -14); quills.lineTo(-36, -10);
      quills.lineTo(-34, -34); quills.lineTo(-16, -24); quills.lineTo(-4, -48);
      quills.lineTo(10, -30); quills.lineTo(24, -48); quills.lineTo(32, -26);
      quills.lineTo(50, -34); quills.lineTo(44, -12); quills.lineTo(58, -4); quills.lineTo(48, 12);
      quills.closePath(); quills.fillPath(); quills.strokePath();
      body.add(quills);

      var bG = createG(scene);
      bG.fillStyle(0xf7dec2, 1); bG.lineStyle(3, 0x8b6044, 1);
      bG.fillEllipse(0, 10, 86, 62); bG.strokeEllipse(0, 10, 86, 62);
      bG.fillStyle(0xea6355, 1); bG.lineStyle(2.4, 0xa3382d, 1);
      bG.fillTriangle(-28, 22, 28, 22, 0, 42); bG.strokeTriangle(-28, 22, 28, 22, 0, 42);
      bG.fillStyle(0xfff5dd, 1); bG.fillCircle(-8, 28, 2.4); bG.fillCircle(8, 28, 2.4); bG.fillCircle(0, 34, 2.2);
      // Paws
      bG.fillStyle(0xe9bd94, 1); bG.lineStyle(2.5, 0x8b6044, 1);
      bG.fillEllipse(-18, 42, 20, 12); bG.strokeEllipse(-18, 42, 20, 12);
      bG.fillEllipse(18, 42, 20, 12); bG.strokeEllipse(18, 42, 20, 12);
      body.add(bG);

      head = scene.add.container(0, 0);
      var fG = createG(scene);
      fG.fillStyle(0xefc6a0, 1); fG.lineStyle(2.5, 0x8b6044, 1);
      fG.fillCircle(-30, -14, 8); fG.strokeCircle(-30, -14, 8);
      fG.fillCircle(30, -14, 8); fG.strokeCircle(30, -14, 8);
      fG.fillStyle(0x253831, 1); fG.fillCircle(-15, -2, 4.5); fG.fillCircle(15, -2, 4.5);
      fG.fillStyle(0xffffff, 1); fG.fillCircle(-16.5, -3.5, 1.5); fG.fillCircle(13.5, -3.5, 1.5);
      fG.fillStyle(0x5c392b, 1); fG.fillEllipse(0, 6, 10, 7);
      head.add(fG);
      mouthG = createG(scene); head.add(mouthG);
      body.add(head);
    } else if (friendId === 'mavis') {
      tail = createG(scene);
      tail.fillStyle(0x2d76b3, 1); tail.lineStyle(2.6, 0x1e507c, 1);
      tail.fillTriangle(26, 8, 58, -6, 54, 22); tail.strokeTriangle(26, 8, 58, -6, 54, 22);
      body.add(tail);

      wingL = createG(scene);
      wingL.fillStyle(0x4aa4e3, 1); wingL.lineStyle(2.6, 0x1e507c, 1);
      wingL.fillEllipse(0, 0, 26, 40); wingL.strokeEllipse(0, 0, 26, 40);
      wingL.setPosition(-32, 0);

      wingR = createG(scene);
      wingR.fillStyle(0x4aa4e3, 1); wingR.lineStyle(2.6, 0x1e507c, 1);
      wingR.fillEllipse(0, 0, 26, 40); wingR.strokeEllipse(0, 0, 26, 40);
      wingR.setPosition(32, 0);
      body.add([wingL, wingR]);

      var mb = createG(scene);
      mb.lineStyle(3, 0xd98732, 1);
      mb.beginPath(); mb.moveTo(-12, 28); mb.lineTo(-14, 46); mb.moveTo(12, 28); mb.lineTo(14, 46); mb.strokePath();
      mb.fillStyle(0x59b7ed, 1); mb.lineStyle(3, 0x1e507c, 1);
      mb.fillEllipse(0, 0, 68, 68); mb.strokeEllipse(0, 0, 68, 68);
      mb.fillStyle(0xe7f8ff, 1); mb.fillEllipse(0, 10, 44, 38);
      mb.fillStyle(0x1d3038, 1); mb.fillCircle(-13, -10, 5); mb.fillCircle(13, -10, 5);
      mb.fillStyle(0xffffff, 1); mb.fillCircle(-14.5, -12, 1.8); mb.fillCircle(11.5, -12, 1.8);
      mb.fillStyle(0xffb838, 1); mb.lineStyle(2.2, 0xb47010, 1);
      mb.fillTriangle(-6, -4, 6, -4, 0, 7); mb.strokeTriangle(-6, -4, 6, -4, 0, 7);
      body.add(mb);

      wetDrops = createG(scene);
      wetDrops.fillStyle(0x8ee3ff, 1);
      wetDrops.fillCircle(-36, -12, 4); wetDrops.fillCircle(38, -8, 4); wetDrops.fillCircle(-26, 22, 4);
      wetDrops.setVisible(false);
      body.add(wetDrops);
    } else {
      // Nine Fındık
      tail = createG(scene);
      tail.fillStyle(0xc4835f, 1); tail.lineStyle(2.8, 0x6f422b, 1);
      tail.fillEllipse(26, -16, 30, 56); tail.strokeEllipse(26, -16, 30, 56);
      body.add(tail);

      var nb = createG(scene);
      nb.fillStyle(0x7ba873, 1); nb.lineStyle(3, 0x416944, 1);
      nb.fillEllipse(0, 14, 64, 56); nb.strokeEllipse(0, 14, 64, 56);
      nb.fillStyle(0xb99ae0, 1); nb.lineStyle(2.8, 0x624787, 1);
      nb.fillEllipse(0, 6, 62, 32); nb.strokeEllipse(0, 6, 62, 32);
      nb.fillStyle(0xffd966, 1); nb.fillCircle(0, 10, 5);
      body.add(nb);

      head = scene.add.container(0, -34);
      var nh = createG(scene);
      nh.fillStyle(0xede6ea, 1); nh.lineStyle(2.5, 0x8b7e87, 1);
      nh.fillCircle(0, -34, 13); nh.strokeCircle(0, -34, 13);
      nh.fillStyle(0xcf916c, 1); nh.lineStyle(3, 0x6f422b, 1);
      nh.fillEllipse(0, 0, 64, 54); nh.strokeEllipse(0, 0, 64, 54);
      nh.fillStyle(0xf7dac0, 1); nh.fillEllipse(0, 8, 34, 22);
      nh.lineStyle(2.4, 0xd39633, 1);
      nh.strokeCircle(-12, -2, 9); nh.strokeCircle(12, -2, 9);
      nh.beginPath(); nh.moveTo(-3, -2); nh.lineTo(3, -2); nh.strokePath();
      nh.fillStyle(0x253831, 1); nh.fillCircle(-12, -2, 3.6); nh.fillCircle(12, -2, 3.6);
      nh.fillStyle(0x683c2e, 1); nh.fillEllipse(0, 5, 8, 5);
      head.add(nh);
      mouthG = createG(scene); head.add(mouthG);
      body.add(head);
    }

    var rig = {
      kind: friendId,
      root: root,
      body: body,
      head: head,
      wingL: wingL,
      wingR: wingR,
      tail: tail,
      wetDrops: wetDrops,
      phase: Math.random() * 2,
      setWet: function (isWet) {
        if (wetDrops) wetDrops.setVisible(!!isWet);
      },
      setViseme: function (v) {
        if (!mouthG) return;
        mouthG.clear();
        if (v && v !== 'rest') {
          mouthG.fillStyle(0xda6863, 1); mouthG.lineStyle(2, 0x683c2e, 1);
          mouthG.fillEllipse(0, 12, 10, 8); mouthG.strokeEllipse(0, 12, 10, 8);
        } else {
          mouthG.lineStyle(2.2, 0x683c2e, 1);
          mouthG.beginPath(); mouthG.moveTo(-6, 11); mouthG.lineTo(0, 14); mouthG.lineTo(6, 11); mouthG.strokePath();
        }
      },
      playReaction: function (clip) {
        if (!root.scene) return;
        if (clip === 'thank' || clip === 'happy' || clip === 'hop') {
          scene.tweens.add({ targets: body, y: -64, duration: 170, yoyo: true, ease: 'Back.easeOut' });
          if (wingL && wingR) {
            scene.tweens.add({ targets: wingL, rotation: -0.65, duration: 150, yoyo: true, repeat: 2 });
            scene.tweens.add({ targets: wingR, rotation: 0.65, duration: 150, yoyo: true, repeat: 2 });
          }
        } else if (clip === 'sniff' || clip === 'gesture') {
          scene.tweens.add({ targets: head || body, rotation: -0.1, duration: 180, yoyo: true });
        }
      },
      update: function (time, delta) {
        var dt = Math.min(0.05, (delta || 16) / 1000);
        rig.phase += dt * 2.8;
        body.y = -48 + Math.sin(rig.phase) * 2.5;
        if (tail) tail.rotation = Math.sin(rig.phase * 0.8) * 0.08;
        if (wingL && wingR) {
          wingL.rotation = 0.2 + Math.sin(rig.phase * 1.4) * 0.12;
          wingR.rotation = -0.2 - Math.sin(rig.phase * 1.4) * 0.12;
        }
      }
    };
    rig.setViseme('rest');
    return rig;
  }

  window.MiloRigSystem = {
    createMiloRig: createMiloRig,
    createSquirrelRig: createSquirrelRig,
    createFireflyRig: createFireflyRig,
    createFriendRig: createFriendRig
  };
})();
