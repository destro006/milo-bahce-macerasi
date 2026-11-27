(function () {
  'use strict';

  function makeCanvas(w, h) {
    var c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    return c;
  }

  function roundedRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(x, y, w, h, r);
    } else {
      ctx.rect(x, y, w, h);
    }
  }

  function drawStar(ctx, cx, cy, spikes, outerR, innerR) {
    var rot = (Math.PI / 2) * 3;
    var step = Math.PI / spikes;
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerR);
    for (var i = 0; i < spikes; i++) {
      ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
      rot += step;
      ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
      rot += step;
    }
    ctx.closePath();
  }

  function registerTex(scene, key, drawFn, w, h) {
    if (scene.textures.exists(key)) return;
    var c = makeCanvas(w || 110, h || 110);
    var ctx = c.getContext('2d');
    drawFn(ctx, c.width, c.height);
    scene.textures.addCanvas(key, c);
  }

  function drawFruitOrVeg(ctx, type) {
    switch (type) {
      case 'item-apple': {
        ctx.strokeStyle = '#6f4324'; ctx.lineWidth = 4.5; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(55, 28); ctx.quadraticCurveTo(58, 14, 66, 12); ctx.stroke();
        ctx.fillStyle = '#54a34b'; ctx.strokeStyle = '#2f6b32'; ctx.lineWidth = 2.2;
        ctx.beginPath(); ctx.moveTo(58, 22); ctx.quadraticCurveTo(78, 10, 82, 26); ctx.quadraticCurveTo(68, 34, 58, 22); ctx.fill(); ctx.stroke();
        var ag = ctx.createRadialGradient(42, 42, 6, 55, 60, 38);
        ag.addColorStop(0, '#ff9d98'); ag.addColorStop(0.5, '#eb4444'); ag.addColorStop(1, '#a81d29');
        ctx.fillStyle = ag; ctx.strokeStyle = '#8b1923'; ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(55, 32);
        ctx.bezierCurveTo(32, 24, 20, 44, 24, 68);
        ctx.bezierCurveTo(28, 90, 46, 96, 55, 90);
        ctx.bezierCurveTo(64, 96, 82, 90, 86, 68);
        ctx.bezierCurveTo(90, 44, 78, 24, 55, 32);
        ctx.fill(); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.42)';
        ctx.beginPath(); ctx.ellipse(40, 48, 5.5, 11, -0.3, 0, Math.PI * 2); ctx.fill();
        break;
      }
      case 'item-pear': {
        ctx.strokeStyle = '#6f4324'; ctx.lineWidth = 4; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(55, 24); ctx.quadraticCurveTo(58, 12, 64, 12); ctx.stroke();
        ctx.fillStyle = '#5ca94b'; ctx.strokeStyle = '#326e2d'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.ellipse(66, 20, 10, 5, -0.35, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        var pg = ctx.createRadialGradient(46, 48, 5, 55, 64, 36);
        pg.addColorStop(0, '#eef89c'); pg.addColorStop(0.55, '#b8df4d'); pg.addColorStop(1, '#79a828');
        ctx.fillStyle = pg; ctx.strokeStyle = '#537b1a'; ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(55, 24);
        ctx.bezierCurveTo(68, 24, 70, 44, 78, 56);
        ctx.bezierCurveTo(86, 72, 76, 94, 55, 94);
        ctx.bezierCurveTo(34, 94, 24, 72, 32, 56);
        ctx.bezierCurveTo(40, 44, 42, 24, 55, 24);
        ctx.fill(); ctx.stroke();
        break;
      }
      case 'item-banana': {
        var bg = ctx.createLinearGradient(22, 26, 86, 86);
        bg.addColorStop(0, '#fff38a'); bg.addColorStop(0.6, '#ffd642'); bg.addColorStop(1, '#d99e1a');
        ctx.fillStyle = bg; ctx.strokeStyle = '#9c6e12'; ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(78, 22);
        ctx.bezierCurveTo(88, 56, 62, 92, 20, 82);
        ctx.bezierCurveTo(18, 74, 24, 70, 32, 68);
        ctx.bezierCurveTo(54, 62, 68, 44, 70, 22);
        ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#6e4a1f';
        ctx.fillRect(71, 16, 7, 8);
        break;
      }
      case 'item-orange': {
        var og = ctx.createRadialGradient(42, 42, 6, 55, 58, 36);
        og.addColorStop(0, '#ffd478'); og.addColorStop(0.55, '#ff942e'); og.addColorStop(1, '#cc5b10');
        ctx.fillStyle = og; ctx.strokeStyle = '#9b3e0a'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(55, 58, 32, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#53a247'; ctx.strokeStyle = '#2d682a'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.ellipse(62, 24, 12, 6, -0.35, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.35)';
        ctx.beginPath(); ctx.arc(43, 46, 6, 0, Math.PI * 2); ctx.fill();
        break;
      }
      case 'item-strawberry': {
        var sg = ctx.createRadialGradient(45, 44, 6, 55, 58, 36);
        sg.addColorStop(0, '#ff8e96'); sg.addColorStop(0.55, '#e83548'); sg.addColorStop(1, '#a11626');
        ctx.fillStyle = sg; ctx.strokeStyle = '#7b101d'; ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(55, 30);
        ctx.bezierCurveTo(84, 30, 86, 62, 55, 92);
        ctx.bezierCurveTo(24, 62, 26, 30, 55, 30);
        ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#55a84b'; ctx.strokeStyle = '#2d692a'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(35, 32); ctx.lineTo(55, 22); ctx.lineTo(75, 32); ctx.lineTo(62, 38); ctx.lineTo(55, 30); ctx.lineTo(48, 38); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#ffe588';
        [[44,48],[55,54],[66,48],[48,66],[62,66],[55,78]].forEach(function (p) {
          ctx.beginPath(); ctx.ellipse(p[0], p[1], 2, 3, 0, 0, Math.PI * 2); ctx.fill();
        });
        break;
      }
      case 'item-blueberry': {
        var bl = ctx.createRadialGradient(42, 42, 6, 55, 60, 34);
        bl.addColorStop(0, '#9cc6ff'); bl.addColorStop(0.5, '#3c73d8'); bl.addColorStop(1, '#1d3d8b');
        ctx.fillStyle = bl; ctx.strokeStyle = '#17306e'; ctx.lineWidth = 3.2;
        ctx.beginPath(); ctx.arc(55, 60, 30, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#2c53ad';
        ctx.beginPath(); ctx.moveTo(43, 32); ctx.lineTo(49, 25); ctx.lineTo(55, 31); ctx.lineTo(61, 25); ctx.lineTo(67, 32); ctx.lineTo(61, 38); ctx.lineTo(49, 38); ctx.closePath(); ctx.fill(); ctx.stroke();
        break;
      }
      case 'item-grape': {
        ctx.strokeStyle = '#6d4726'; ctx.lineWidth = 4; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(55, 18); ctx.lineTo(55, 30); ctx.stroke();
        ctx.fillStyle = '#9e5cd8'; ctx.strokeStyle = '#5c2b8f'; ctx.lineWidth = 2.4;
        [[44,42],[66,42],[38,58],[55,58],[72,58],[46,74],[64,74],[55,88]].forEach(function (pt) {
          ctx.beginPath(); ctx.arc(pt[0], pt[1], 11, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        });
        break;
      }
      case 'item-lemon': {
        ctx.fillStyle = '#ffe75a'; ctx.strokeStyle = '#b98f16'; ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(55, 58, 35, 25, -0.25, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#fff8bd';
        ctx.beginPath(); ctx.ellipse(45, 49, 12, 6, -0.25, 0, Math.PI * 2); ctx.fill();
        break;
      }
      case 'item-peach': {
        var pc = ctx.createRadialGradient(45, 45, 6, 55, 58, 34);
        pc.addColorStop(0, '#ffd4a6'); pc.addColorStop(0.55, '#ff926b'); pc.addColorStop(1, '#d8553a');
        ctx.fillStyle = pc; ctx.strokeStyle = '#9c3724'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(55, 60, 31, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = '#b84b32'; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.arc(55, 60, 22, -Math.PI * 0.4, Math.PI * 0.4); ctx.stroke();
        ctx.fillStyle = '#58a84b'; ctx.beginPath(); ctx.ellipse(64, 26, 11, 5, -0.4, 0, Math.PI * 2); ctx.fill();
        break;
      }
      case 'item-melon': {
        ctx.fillStyle = '#f5da78'; ctx.strokeStyle = '#a38226'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.ellipse(55, 58, 36, 28, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = '#cfa93b'; ctx.lineWidth = 2.2;
        ctx.beginPath(); ctx.ellipse(55, 58, 22, 27, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(55, 30); ctx.lineTo(55, 86); ctx.stroke();
        break;
      }
      case 'item-carrot': {
        ctx.fillStyle = '#59a84a'; ctx.strokeStyle = '#316f29'; ctx.lineWidth = 2.4;
        ctx.beginPath(); ctx.moveTo(61, 28); ctx.bezierCurveTo(57, 12, 67, 8, 70, 22); ctx.bezierCurveTo(77, 8, 89, 14, 77, 28); ctx.closePath(); ctx.fill(); ctx.stroke();
        var cg = ctx.createLinearGradient(28, 28, 78, 88);
        cg.addColorStop(0, '#ffb155'); cg.addColorStop(1, '#ea6d21');
        ctx.fillStyle = cg; ctx.strokeStyle = '#a34513'; ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(56, 26); ctx.bezierCurveTo(70, 26, 80, 36, 76, 50);
        ctx.lineTo(40, 90); ctx.bezierCurveTo(34, 96, 24, 88, 28, 78);
        ctx.lineTo(46, 34); ctx.closePath(); ctx.fill(); ctx.stroke();
        break;
      }
      case 'item-tomato': {
        var tg = ctx.createRadialGradient(42, 44, 6, 55, 60, 34);
        tg.addColorStop(0, '#ff8d7a'); tg.addColorStop(0.55, '#e6392c'); tg.addColorStop(1, '#9e1c15');
        ctx.fillStyle = tg; ctx.strokeStyle = '#75130e'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.ellipse(55, 60, 34, 29, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#4d9b44'; ctx.strokeStyle = '#2b6127'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(42, 32); ctx.lineTo(55, 22); ctx.lineTo(68, 32); ctx.lineTo(55, 38); ctx.closePath(); ctx.fill(); ctx.stroke();
        break;
      }
      case 'item-potato': {
        ctx.fillStyle = '#d4a66a'; ctx.strokeStyle = '#855d31'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.ellipse(55, 58, 34, 23, 0.18, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#8a6235';
        [[42,54],[64,64],[58,48]].forEach(function (p) { ctx.beginPath(); ctx.arc(p[0], p[1], 2.2, 0, Math.PI * 2); ctx.fill(); });
        return true;
      }
      default:
        return false;
    }
    return true;
  }

  function drawNatureOrObject(ctx, type) {
    switch (type) {
      case 'item-lantern':
        ctx.fillStyle = '#9fb0ad'; ctx.strokeStyle = '#4b5f5c'; ctx.lineWidth = 3;
        roundedRect(ctx, 35, 36, 40, 48, 8); ctx.fillStyle = '#fff2a6'; ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#5e7771';
        ctx.beginPath(); ctx.moveTo(28, 38); ctx.lineTo(55, 16); ctx.lineTo(82, 38); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillRect(36, 84, 38, 10); ctx.strokeRect(36, 84, 38, 10);
        break;
      case 'item-basket':
        ctx.strokeStyle = '#8a5428'; ctx.lineWidth = 5;
        ctx.beginPath(); ctx.arc(55, 48, 24, Math.PI, 0); ctx.stroke();
        ctx.fillStyle = '#dca45c'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(22, 48); ctx.lineTo(88, 48); ctx.lineTo(78, 86); ctx.lineTo(32, 86); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#ecc07b'; roundedRect(ctx, 18, 44, 74, 10, 5); ctx.fill(); ctx.stroke();
        break;
      case 'item-key':
        ctx.fillStyle = '#ffd55a'; ctx.strokeStyle = '#9c6c14'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(36, 55, 16, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#fff9ec'; ctx.beginPath(); ctx.arc(36, 55, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#ffd55a';
        roundedRect(ctx, 50, 50, 40, 10, 4); ctx.fill(); ctx.stroke();
        ctx.fillRect(72, 60, 7, 12); ctx.strokeRect(72, 60, 7, 12);
        ctx.fillRect(83, 60, 7, 9); ctx.strokeRect(83, 60, 7, 9);
        break;
      case 'item-leaf':
        ctx.fillStyle = '#6ec458'; ctx.strokeStyle = '#2f6c2c'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(24, 80); ctx.bezierCurveTo(20, 44, 48, 18, 86, 20); ctx.bezierCurveTo(86, 60, 58, 86, 24, 80); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(18, 86); ctx.lineTo(78, 28); ctx.stroke();
        break;
      case 'item-branch':
      case 'item-twig':
        ctx.strokeStyle = '#6f4527'; ctx.lineWidth = type === 'item-twig' ? 6 : 10; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(20, 78); ctx.quadraticCurveTo(54, 56, 88, 30); ctx.stroke();
        ctx.lineWidth = type === 'item-twig' ? 4 : 6;
        ctx.beginPath(); ctx.moveTo(52, 58); ctx.lineTo(42, 32); ctx.stroke();
        ctx.fillStyle = '#6ec458'; ctx.beginPath(); ctx.ellipse(42, 28, 9, 5, -0.5, 0, Math.PI * 2); ctx.fill();
        break;
      case 'item-nut':
        ctx.fillStyle = '#c4834b'; ctx.strokeStyle = '#6e3f1c'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.ellipse(55, 60, 24, 27, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#7a4722'; ctx.beginPath(); ctx.ellipse(55, 38, 25, 11, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        break;
      case 'item-acorn':
        ctx.fillStyle = '#d49a56'; ctx.strokeStyle = '#6e431c'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.ellipse(55, 64, 21, 26, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#754624'; ctx.beginPath(); ctx.ellipse(55, 42, 26, 12, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(55, 30); ctx.lineTo(55, 20); ctx.stroke();
        break;
      case 'item-seed':
        ctx.fillStyle = '#ffe56b'; ctx.strokeStyle = '#b97e14'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(55, 16); ctx.bezierCurveTo(75, 38, 82, 58, 74, 78); ctx.bezierCurveTo(68, 90, 42, 90, 36, 78); ctx.bezierCurveTo(28, 58, 35, 38, 55, 16); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#fffbe0'; drawStar(ctx, 55, 56, 4, 12, 5); ctx.fill();
        break;
      case 'item-flower':
        ctx.fillStyle = '#ff98b4'; ctx.strokeStyle = '#b9486b'; ctx.lineWidth = 2.4;
        for (var a = 0; a < 5; a++) {
          var ang = (a * Math.PI * 2) / 5 - Math.PI / 2;
          ctx.beginPath(); ctx.arc(55 + Math.cos(ang) * 23, 55 + Math.sin(ang) * 23, 13, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        }
        ctx.fillStyle = '#ffe05a'; ctx.strokeStyle = '#b87f12';
        ctx.beginPath(); ctx.arc(55, 55, 14, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        break;
      case 'item-bee':
        ctx.fillStyle = '#e4f8ff'; ctx.strokeStyle = '#72b6c9'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.ellipse(42, 36, 14, 9, -0.4, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(68, 36, 14, 9, 0.4, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#ffda47'; ctx.strokeStyle = '#473618'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.ellipse(55, 58, 24, 18, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#3d2e18';
        ctx.fillRect(46, 42, 6, 32); ctx.fillRect(59, 42, 6, 32);
        break;
      case 'item-butterfly':
        ctx.fillStyle = '#ff9be0'; ctx.strokeStyle = '#8b3e76'; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.ellipse(36, 46, 18, 22, -0.35, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(74, 46, 18, 22, 0.35, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#ffd56e';
        ctx.beginPath(); ctx.ellipse(38, 72, 13, 14, 0.3, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(72, 72, 13, 14, -0.3, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#4b365f'; roundedRect(ctx, 51, 34, 8, 46, 4); ctx.fill();
        break;
      case 'item-cup':
        ctx.strokeStyle = '#8a5d42'; ctx.lineWidth = 5;
        ctx.beginPath(); ctx.arc(80, 56, 12, -Math.PI * 0.5, Math.PI * 0.5); ctx.stroke();
        ctx.fillStyle = '#fff5df'; ctx.strokeStyle = '#997555'; ctx.lineWidth = 3;
        roundedRect(ctx, 28, 36, 48, 48, 12); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#e88b76'; ctx.fillRect(32, 50, 40, 10);
        break;
      case 'item-hat':
        ctx.fillStyle = '#f2c15a'; ctx.strokeStyle = '#9b6e1d'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.ellipse(55, 74, 40, 12, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(55, 52, 24, 22, 0, Math.PI, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#e5685a'; ctx.fillRect(31, 62, 48, 7);
        break;
      case 'item-rope':
        ctx.strokeStyle = '#c89b5a'; ctx.lineWidth = 7;
        ctx.beginPath(); ctx.ellipse(55, 56, 28, 22, 0, 0, Math.PI * 2); ctx.stroke();
        ctx.strokeStyle = '#9b6f35'; ctx.lineWidth = 2.5;
        ctx.beginPath(); ctx.ellipse(55, 56, 22, 16, 0, 0, Math.PI * 2); ctx.stroke();
        break;
      case 'item-stone':
        ctx.fillStyle = '#9fb5bf'; ctx.strokeStyle = '#4f6670'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.ellipse(55, 62, 34, 22, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.beginPath(); ctx.ellipse(44, 52, 13, 6, 0, 0, Math.PI * 2); ctx.fill();
        break;
      case 'item-water':
        ctx.fillStyle = '#5ac8f5'; ctx.strokeStyle = '#2279a8'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(55, 18); ctx.bezierCurveTo(84, 50, 84, 88, 55, 88); ctx.bezierCurveTo(26, 88, 26, 50, 55, 18); ctx.fill(); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.55)'; ctx.beginPath(); ctx.ellipse(45, 58, 5, 11, -0.25, 0, Math.PI * 2); ctx.fill();
        break;
      case 'item-feather':
        ctx.fillStyle = '#8de0ff'; ctx.strokeStyle = '#2876a8'; ctx.lineWidth = 2.8;
        ctx.beginPath(); ctx.ellipse(55, 54, 18, 36, 0.38, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(34, 84); ctx.lineTo(76, 24); ctx.stroke();
        break;
      case 'item-bird':
        ctx.fillStyle = '#5bb9ee'; ctx.strokeStyle = '#1f5380'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.ellipse(55, 58, 28, 24, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#ffb838'; ctx.beginPath(); ctx.moveTo(78, 52); ctx.lineTo(92, 58); ctx.lineTo(78, 64); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#1e3138'; ctx.beginPath(); ctx.arc(65, 50, 4, 0, Math.PI * 2); ctx.fill();
        break;
      case 'item-frog':
        ctx.fillStyle = '#6dcf5c'; ctx.strokeStyle = '#2d6e28'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.ellipse(55, 62, 30, 22, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.arc(40, 38, 9, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.arc(70, 38, 9, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#1e3138'; ctx.beginPath(); ctx.arc(40, 38, 4, 0, Math.PI * 2); ctx.arc(70, 38, 4, 0, Math.PI * 2); ctx.fill();
        break;
      case 'item-duck':
        ctx.fillStyle = '#ffe154'; ctx.strokeStyle = '#a87d14'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.ellipse(50, 66, 26, 18, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.arc(64, 40, 14, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#ff8b2e'; ctx.beginPath(); ctx.moveTo(76, 38); ctx.lineTo(92, 43); ctx.lineTo(76, 48); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#1e3138'; ctx.beginPath(); ctx.arc(68, 36, 3, 0, Math.PI * 2); ctx.fill();
        break;
      case 'item-cat':
        ctx.fillStyle = '#f2a45e'; ctx.strokeStyle = '#8b4e22'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(30, 44); ctx.lineTo(34, 20); ctx.lineTo(50, 34); ctx.lineTo(60, 34); ctx.lineTo(76, 20); ctx.lineTo(80, 44); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.arc(55, 58, 26, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#253831'; ctx.beginPath(); ctx.arc(45, 54, 4, 0, Math.PI * 2); ctx.arc(65, 54, 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#e56c6c'; ctx.beginPath(); ctx.arc(55, 64, 4, 0, Math.PI * 2); ctx.fill();
        break;
      case 'item-dog':
        ctx.fillStyle = '#c98856'; ctx.strokeStyle = '#6b3e1f'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.ellipse(26, 56, 9, 20, 0.25, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(84, 56, 9, 20, -0.25, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.arc(55, 56, 26, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#f5d4b0'; ctx.beginPath(); ctx.ellipse(55, 66, 15, 11, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#2b201c'; ctx.beginPath(); ctx.ellipse(55, 61, 6, 4, 0, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(44, 49, 4, 0, Math.PI * 2); ctx.arc(66, 49, 4, 0, Math.PI * 2); ctx.fill();
        break;
      case 'item-squirrel':
        ctx.fillStyle = '#cf7d43'; ctx.strokeStyle = '#6d3917'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.ellipse(76, 52, 16, 28, 0.35, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(46, 66, 18, 20, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.arc(46, 40, 15, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#253831'; ctx.beginPath(); ctx.arc(42, 38, 3, 0, Math.PI * 2); ctx.fill();
        break;
      case 'item-fish':
        ctx.fillStyle = '#ff9848'; ctx.strokeStyle = '#a84c14'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(76, 55); ctx.lineTo(94, 38); ctx.lineTo(94, 72); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(50, 55, 28, 19, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#253831'; ctx.beginPath(); ctx.arc(36, 50, 3.5, 0, Math.PI * 2); ctx.fill();
        break;
      case 'item-wood':
        ctx.fillStyle = '#a4693f'; ctx.strokeStyle = '#5a341b'; ctx.lineWidth = 3;
        roundedRect(ctx, 20, 40, 70, 30, 10); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#e0b384'; ctx.beginPath(); ctx.ellipse(86, 55, 7, 14, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        break;
      case 'item-cloud':
        ctx.fillStyle = '#ffffff'; ctx.strokeStyle = '#7db5cc'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(38, 60, 16, 0, Math.PI * 2); ctx.arc(56, 46, 20, 0, Math.PI * 2); ctx.arc(74, 60, 15, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        break;
      case 'item-boot':
        ctx.fillStyle = '#ffd14d'; ctx.strokeStyle = '#9c6812'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(34, 24); ctx.lineTo(58, 24); ctx.lineTo(58, 64); ctx.lineTo(84, 64); ctx.lineTo(84, 84); ctx.lineTo(34, 84); ctx.closePath(); ctx.fill(); ctx.stroke();
        break;
      case 'item-umbrella':
        ctx.fillStyle = '#ef6a6a'; ctx.strokeStyle = '#922c2c'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(55, 52, 34, Math.PI, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.strokeStyle = '#6f4b2f'; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.moveTo(55, 52); ctx.lineTo(55, 84); ctx.arc(62, 84, 7, Math.PI, 0, true); ctx.stroke();
        break;
      case 'item-pot':
        ctx.fillStyle = '#d97553'; ctx.strokeStyle = '#8b3e24'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(30, 42); ctx.lineTo(80, 42); ctx.lineTo(70, 88); ctx.lineTo(40, 88); ctx.closePath(); ctx.fill(); ctx.stroke();
        roundedRect(ctx, 25, 34, 60, 12, 5); ctx.fill(); ctx.stroke();
        break;
      case 'item-sun':
        ctx.fillStyle = '#ffd54a'; ctx.strokeStyle = '#c48914'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(55, 55, 24, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        for (var r = 0; r < 8; r++) {
          var ra = (r * Math.PI) / 4;
          ctx.beginPath(); ctx.moveTo(55 + Math.cos(ra) * 29, 55 + Math.sin(ra) * 29); ctx.lineTo(55 + Math.cos(ra) * 38, 55 + Math.sin(ra) * 38); ctx.stroke();
        }
        break;
      case 'item-moon':
        ctx.fillStyle = '#fff099'; ctx.strokeStyle = '#b9931d'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(58, 55, 28, 0.4, Math.PI * 2 - 0.4); ctx.quadraticCurveTo(46, 55, 76, 33); ctx.fill(); ctx.stroke();
        break;
      case 'item-star':
        ctx.fillStyle = '#ffe154'; ctx.strokeStyle = '#b47e14'; ctx.lineWidth = 3;
        drawStar(ctx, 55, 55, 5, 34, 15); ctx.fill(); ctx.stroke();
        break;
      case 'item-light':
        ctx.fillStyle = 'rgba(255, 240, 130, 0.5)'; ctx.beginPath(); ctx.arc(55, 55, 40, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#fff59c'; ctx.strokeStyle = '#c49218'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(55, 50, 20, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#9aa8a4'; roundedRect(ctx, 45, 70, 20, 14, 4); ctx.fill(); ctx.stroke();
        break;
      case 'item-box':
        ctx.fillStyle = '#d9a464'; ctx.strokeStyle = '#7d5022'; ctx.lineWidth = 3;
        roundedRect(ctx, 26, 36, 58, 48, 8); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(26, 52); ctx.lineTo(84, 52); ctx.stroke();
        break;
      case 'item-bag':
        ctx.fillStyle = '#e06754'; ctx.strokeStyle = '#852e22'; ctx.lineWidth = 3;
        roundedRect(ctx, 30, 38, 50, 48, 12); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.arc(55, 38, 14, Math.PI, 0); ctx.stroke();
        break;
      case 'item-bell':
        ctx.fillStyle = '#ffd55a'; ctx.strokeStyle = '#a37114'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(55, 24); ctx.bezierCurveTo(78, 24, 80, 64, 86, 74); ctx.lineTo(24, 74); ctx.bezierCurveTo(30, 64, 32, 24, 55, 24); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.arc(55, 80, 7, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        break;
      case 'item-footprint':
        ctx.fillStyle = '#8c6142';
        ctx.beginPath(); ctx.ellipse(55, 64, 15, 20, 0, 0, Math.PI * 2); ctx.fill();
        [[36,36],[48,28],[62,28],[74,36]].forEach(function (t) {
          ctx.beginPath(); ctx.arc(t[0], t[1], 6.5, 0, Math.PI * 2); ctx.fill();
        });
        break;
      case 'item-bridge':
        ctx.fillStyle = '#b97b45'; ctx.strokeStyle = '#693f1d'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(16, 72); ctx.quadraticCurveTo(55, 42, 94, 72); ctx.lineTo(94, 84); ctx.quadraticCurveTo(55, 58, 16, 84); ctx.closePath(); ctx.fill(); ctx.stroke();
        break;
      case 'item-tree':
        ctx.fillStyle = '#8c5835'; ctx.strokeStyle = '#57331a'; ctx.lineWidth = 3;
        roundedRect(ctx, 46, 56, 18, 34, 5); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#53a34a'; ctx.strokeStyle = '#2d682a';
        ctx.beginPath(); ctx.arc(55, 42, 26, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        break;
      case 'item-house':
        ctx.fillStyle = '#fff0d0'; ctx.strokeStyle = '#8a623c'; ctx.lineWidth = 3;
        roundedRect(ctx, 28, 48, 54, 40, 6); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#df6a54';
        ctx.beginPath(); ctx.moveTo(20, 50); ctx.lineTo(55, 20); ctx.lineTo(90, 50); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#9c5f3b'; roundedRect(ctx, 48, 62, 14, 26, 4); ctx.fill(); ctx.stroke();
        break;
      case 'item-book':
        ctx.fillStyle = '#5c93e0'; ctx.strokeStyle = '#294e8a'; ctx.lineWidth = 3;
        roundedRect(ctx, 24, 30, 62, 52, 8); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#fff9e8'; roundedRect(ctx, 32, 34, 48, 42, 4); ctx.fill();
        ctx.fillStyle = '#ffd55a'; drawStar(ctx, 56, 55, 5, 13, 6); ctx.fill();
        break;
      case 'item-round':
        ctx.fillStyle = '#73c2fb'; ctx.strokeStyle = '#25679c'; ctx.lineWidth = 3.5;
        ctx.beginPath(); ctx.arc(55, 55, 30, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        break;
      case 'item-square':
        ctx.fillStyle = '#ffd15c'; ctx.strokeStyle = '#9e6b14'; ctx.lineWidth = 3.5;
        roundedRect(ctx, 25, 25, 60, 60, 8); ctx.fill(); ctx.stroke();
        break;
      case 'item-triangle':
        ctx.fillStyle = '#80d677'; ctx.strokeStyle = '#2f6e2d'; ctx.lineWidth = 3.5;
        ctx.beginPath(); ctx.moveTo(55, 20); ctx.lineTo(88, 82); ctx.lineTo(22, 82); ctx.closePath(); ctx.fill(); ctx.stroke();
        break;
      case 'item-small':
        ctx.fillStyle = '#ffd86b'; ctx.strokeStyle = '#9c6c14'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(55, 62, 14, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        break;
      case 'item-big':
        ctx.fillStyle = '#ffd86b'; ctx.strokeStyle = '#9c6c14'; ctx.lineWidth = 3.5;
        ctx.beginPath(); ctx.arc(55, 55, 36, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        break;
      case 'item-bright':
        ctx.fillStyle = 'rgba(255, 238, 120, 0.55)'; ctx.beginPath(); ctx.arc(55, 55, 42, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#fff59c'; ctx.strokeStyle = '#c48d18'; ctx.lineWidth = 3;
        drawStar(ctx, 55, 55, 8, 28, 14); ctx.fill(); ctx.stroke();
        break;
      case 'item-red':
      case 'item-green':
      case 'item-yellow':
      case 'item-blue':
      case 'item-white':
      case 'item-purple':
      case 'item-pink':
      case 'item-orange-color': {
        var colMap = {
          'item-red': ['#f04c4c', '#8e1b1b'],
          'item-green': ['#62c458', '#276824'],
          'item-yellow': ['#ffe047', '#a67b0e'],
          'item-blue': ['#4c98f0', '#1c4d8e'],
          'item-white': ['#ffffff', '#8fa3ab'],
          'item-purple': ['#a668e6', '#56278a'],
          'item-pink': ['#ff8ec2', '#a8346c'],
          'item-orange-color': ['#ff9436', '#9e470c']
        }[type];
        ctx.fillStyle = colMap[0]; ctx.strokeStyle = colMap[1]; ctx.lineWidth = 3.5;
        ctx.beginPath();
        ctx.moveTo(55, 22);
        ctx.bezierCurveTo(78, 22, 90, 44, 84, 66);
        ctx.bezierCurveTo(78, 86, 32, 86, 26, 66);
        ctx.bezierCurveTo(20, 44, 32, 22, 55, 22);
        ctx.fill(); ctx.stroke();
        ctx.fillStyle = 'rgba(255,255,255,0.45)';
        ctx.beginPath(); ctx.arc(43, 43, 7, 0, Math.PI * 2); ctx.fill();
        break;
      }
      default:
        ctx.fillStyle = '#ffd966'; ctx.strokeStyle = '#b97b1c'; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.arc(55, 55, 28, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        break;
    }
  }

  function registerAll(scene) {
    var allItemKeys = [
      'item-apple', 'item-pear', 'item-banana', 'item-orange', 'item-strawberry', 'item-blueberry',
      'item-grape', 'item-lemon', 'item-peach', 'item-melon', 'item-carrot', 'item-tomato', 'item-potato',
      'item-lantern', 'item-basket', 'item-key', 'item-leaf', 'item-branch', 'item-twig', 'item-nut',
      'item-acorn', 'item-seed', 'item-flower', 'item-bee', 'item-butterfly', 'item-cup', 'item-hat',
      'item-rope', 'item-stone', 'item-water', 'item-feather', 'item-bird', 'item-frog', 'item-duck',
      'item-cat', 'item-dog', 'item-squirrel', 'item-fish', 'item-wood', 'item-cloud', 'item-boot',
      'item-umbrella', 'item-pot', 'item-sun', 'item-moon', 'item-star', 'item-light', 'item-box',
      'item-bag', 'item-bell', 'item-footprint', 'item-bridge', 'item-tree', 'item-house', 'item-book',
      'item-round', 'item-square', 'item-triangle', 'item-small', 'item-big', 'item-bright',
      'item-red', 'item-green', 'item-yellow', 'item-blue', 'item-white', 'item-purple', 'item-pink', 'item-orange-color'
    ];

    allItemKeys.forEach(function (k) {
      registerTex(scene, k, function (ctx) {
        if (!drawFruitOrVeg(ctx, k)) {
          drawNatureOrObject(ctx, k);
        }
      }, 110, 110);
    });

    // Drop targets: basket (0..5 items), matching_slot (0..3), lantern (0..4)
    for (var b = 0; b <= 5; b++) {
      (function (count) {
        registerTex(scene, 'target-basket-' + count, function (ctx) {
          ctx.fillStyle = 'rgba(34, 62, 48, 0.24)';
          ctx.beginPath(); ctx.ellipse(80, 112, 56, 9, 0, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = '#8e592d'; ctx.lineWidth = 7; ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(42, 48); ctx.bezierCurveTo(42, 12, 118, 12, 118, 48); ctx.stroke();
          var colors = ['#eb4b46', '#ff9f40', '#ffd447', '#6ec458', '#4c98f0'];
          for (var i = 0; i < count; i++) {
            ctx.fillStyle = colors[i % colors.length];
            ctx.strokeStyle = '#5e3418'; ctx.lineWidth = 2.4;
            ctx.beginPath(); ctx.arc(52 + i * 14, 46 - (i % 2) * 4, 12, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
          }
          ctx.fillStyle = '#dca45c'; ctx.strokeStyle = '#7e4b22'; ctx.lineWidth = 3.5;
          ctx.beginPath(); ctx.moveTo(22, 48); ctx.lineTo(138, 48); ctx.lineTo(122, 102); ctx.lineTo(38, 102); ctx.closePath(); ctx.fill(); ctx.stroke();
          ctx.fillStyle = '#ecc07b'; roundedRect(ctx, 18, 42, 124, 14, 7); ctx.fill(); ctx.stroke();
          ctx.strokeStyle = '#a66c36'; ctx.lineWidth = 2.4;
          ctx.beginPath(); ctx.moveTo(46, 56); ctx.lineTo(50, 100); ctx.moveTo(80, 56); ctx.lineTo(80, 100); ctx.moveTo(114, 56); ctx.lineTo(110, 100); ctx.stroke();
        }, 160, 126);
      })(b);
    }

    for (var m = 0; m <= 3; m++) {
      (function (count) {
        registerTex(scene, 'target-matching_slot-' + count, function (ctx) {
          ctx.fillStyle = 'rgba(34, 62, 48, 0.22)';
          ctx.beginPath(); ctx.ellipse(80, 108, 56, 10, 0, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#fff8df'; ctx.strokeStyle = '#b98838'; ctx.lineWidth = 3.5;
          roundedRect(ctx, 20, 34, 120, 68, 20); ctx.fill(); ctx.stroke();
          for (var i = 0; i < 3; i++) {
            ctx.fillStyle = i < count ? '#ffe169' : '#e6dec8';
            ctx.strokeStyle = '#9e7226'; ctx.lineWidth = 2.4;
            ctx.beginPath(); ctx.arc(46 + i * 34, 68, 12, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
          }
        }, 160, 126);
      })(m);
    }

    for (var lit = 0; lit <= 4; lit++) {
      (function (lCount) {
        registerTex(scene, 'target-lantern-' + lCount, function (ctx) {
          if (lCount > 0) {
            var lg = ctx.createRadialGradient(80, 90, 8, 80, 90, 58 + lCount * 6);
            lg.addColorStop(0, 'rgba(255, 246, 165, ' + (0.35 + lCount * 0.14) + ')');
            lg.addColorStop(1, 'rgba(255, 212, 77, 0)');
            ctx.fillStyle = lg; ctx.beginPath(); ctx.arc(80, 90, 58 + lCount * 6, 0, Math.PI * 2); ctx.fill();
          }
          ctx.fillStyle = 'rgba(35, 59, 49, 0.24)';
          ctx.beginPath(); ctx.ellipse(80, 166, 46, 8, 0, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#9fb0ad'; ctx.strokeStyle = '#536864'; ctx.lineWidth = 3.2;
          ctx.beginPath(); ctx.moveTo(50, 160); ctx.lineTo(58, 128); ctx.lineTo(102, 128); ctx.lineTo(110, 160); ctx.closePath(); ctx.fill(); ctx.stroke();
          ctx.fillStyle = lCount > 0 ? '#fff5be' : '#d5e4e2'; ctx.strokeStyle = '#4b5f5c'; ctx.lineWidth = 3.5;
          roundedRect(ctx, 48, 50, 64, 78, 12); ctx.fill(); ctx.stroke();
          var slots = [
            [66, 74, lCount >= 1 ? '#ff5967' : '#b7c7c5'],
            [94, 74, lCount >= 2 ? '#ffab38' : '#b7c7c5'],
            [66, 102, lCount >= 3 ? '#4c9aff' : '#b7c7c5'],
            [94, 102, lCount >= 4 ? '#ffe34d' : '#b7c7c5']
          ];
          slots.forEach(function (s) {
            ctx.fillStyle = s[2]; ctx.strokeStyle = '#4b5f5c'; ctx.lineWidth = 2.2;
            ctx.beginPath(); ctx.arc(s[0], s[1], 10, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
          });
          ctx.fillStyle = '#5e7771'; ctx.strokeStyle = '#394d49'; ctx.lineWidth = 3.4;
          ctx.beginPath(); ctx.moveTo(38, 52); ctx.lineTo(80, 18); ctx.lineTo(122, 52); ctx.closePath(); ctx.fill(); ctx.stroke();
          ctx.fillStyle = '#ffd966'; ctx.strokeStyle = '#996b18'; ctx.lineWidth = 2.2;
          ctx.beginPath(); ctx.arc(80, 16, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        }, 160, 178);
      })(lit);
    }

    registerTex(scene, 'pt-sparkle', function (ctx) {
      var g = ctx.createRadialGradient(16, 16, 1, 16, 16, 14);
      g.addColorStop(0, 'rgba(255, 255, 230, 1)');
      g.addColorStop(0.45, 'rgba(255, 224, 102, 0.85)');
      g.addColorStop(1, 'rgba(255, 224, 102, 0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(16, 16, 15, 0, Math.PI * 2); ctx.fill();
    }, 32, 32);

    registerTex(scene, 'pt-star', function (ctx) {
      ctx.fillStyle = '#fff5a8';
      drawStar(ctx, 16, 16, 4, 12, 4);
      ctx.fill();
    }, 32, 32);

    // Storybook Medallion Backdrop for Interactive Props
    registerTex(scene, 'ui-medallion', function (ctx) {
      ctx.fillStyle = 'rgba(28, 48, 38, 0.22)';
      ctx.beginPath(); ctx.ellipse(60, 108, 46, 10, 0, 0, Math.PI * 2); ctx.fill();
      var mg = ctx.createRadialGradient(54, 48, 8, 60, 58, 54);
      mg.addColorStop(0, '#fffef7');
      mg.addColorStop(0.75, '#fff6dc');
      mg.addColorStop(1, '#f3dfb4');
      ctx.fillStyle = mg;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 4;
      ctx.beginPath(); ctx.arc(60, 56, 48, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.strokeStyle = 'rgba(214, 158, 64, 0.55)';
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 4]);
      ctx.beginPath(); ctx.arc(60, 56, 42, 0, Math.PI * 2); ctx.stroke();
      ctx.setLineDash([]);
    }, 120, 122);

    // Drifting Cloud Texture
    registerTex(scene, 'fx-cloud', function (ctx) {
      var cg = ctx.createLinearGradient(0, 10, 0, 76);
      cg.addColorStop(0, 'rgba(255,255,255,0.96)');
      cg.addColorStop(1, 'rgba(225,245,252,0.86)');
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.ellipse(90, 54, 72, 22, 0, 0, Math.PI * 2);
      ctx.arc(62, 40, 26, 0, Math.PI * 2);
      ctx.arc(102, 34, 30, 0, Math.PI * 2);
      ctx.arc(132, 46, 20, 0, Math.PI * 2);
      ctx.fill();
    }, 180, 86);

    // Ambient Butterfly Texture
    registerTex(scene, 'fx-butterfly', function (ctx) {
      ctx.fillStyle = '#ff9ed2'; ctx.strokeStyle = '#a34076'; ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.ellipse(15, 16, 10, 12, -0.35, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(33, 16, 10, 12, 0.35, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#ffe17a';
      ctx.beginPath(); ctx.ellipse(17, 29, 7, 8, 0.3, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.ellipse(31, 29, 7, 8, -0.3, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#4e395e'; roundedRect(ctx, 22, 10, 4, 24, 2); ctx.fill();
    }, 48, 44);

    // High-Craft Painterly Canvas2D Scene Backdrops
    var sceneIds = ['square', 'orchard', 'stream', 'forest', 'greenhouse', 'twilight', 'glade', 'finale'];
    sceneIds.forEach(function (sid) {
      registerTex(scene, 'bg-' + sid, function (ctx, W, H) {
        var isNight = (sid === 'glade' || sid === 'finale' || sid === 'twilight');
        // 1. Sky Gradient
        var sky = ctx.createLinearGradient(0, 0, 0, 500);
        if (sid === 'twilight') {
          sky.addColorStop(0, '#363d78'); sky.addColorStop(0.55, '#89679e'); sky.addColorStop(1, '#f4ae96');
        } else if (sid === 'glade') {
          sky.addColorStop(0, '#1f2b59'); sky.addColorStop(0.6, '#49588f'); sky.addColorStop(1, '#988dc2');
        } else if (sid === 'finale') {
          sky.addColorStop(0, '#1b2f61'); sky.addColorStop(0.6, '#395588'); sky.addColorStop(1, '#6f8bb4');
        } else {
          sky.addColorStop(0, '#72cae9'); sky.addColorStop(0.65, '#c6eff6'); sky.addColorStop(1, '#fef4dc');
        }
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, W, 520);

        // Sun / Moon & Stars
        if (isNight) {
          var moonGlow = ctx.createRadialGradient(1070, 128, 12, 1070, 128, 130);
          moonGlow.addColorStop(0, 'rgba(255, 246, 178, 0.55)');
          moonGlow.addColorStop(1, 'rgba(255, 246, 178, 0)');
          ctx.fillStyle = moonGlow; ctx.beginPath(); ctx.arc(1070, 128, 130, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#fff5bd'; ctx.beginPath(); ctx.arc(1070, 128, 36, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = sid === 'twilight' ? '#494781' : '#253466';
          ctx.beginPath(); ctx.arc(1084, 118, 31, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = 'rgba(255, 250, 210, 0.85)';
          [[140,95],[280,140],[430,82],[590,120],[740,76],[890,115],[1180,92]].forEach(function (st, idx) {
            drawStar(ctx, st[0], st[1], 4, 4 + (idx % 3), 1.8); ctx.fill();
          });
        } else {
          var sunGlow = ctx.createRadialGradient(1075, 126, 16, 1075, 126, 165);
          sunGlow.addColorStop(0, 'rgba(255, 238, 140, 0.72)');
          sunGlow.addColorStop(0.5, 'rgba(255, 224, 115, 0.25)');
          sunGlow.addColorStop(1, 'rgba(255, 224, 115, 0)');
          ctx.fillStyle = sunGlow; ctx.beginPath(); ctx.arc(1075, 126, 165, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#ffd966'; ctx.beginPath(); ctx.arc(1075, 126, 42, 0, Math.PI * 2); ctx.fill();
          // Soft sunbeams
          ctx.fillStyle = 'rgba(255, 252, 220, 0.14)';
          ctx.beginPath(); ctx.moveTo(1040, 130); ctx.lineTo(660, 500); ctx.lineTo(840, 500); ctx.closePath(); ctx.fill();
          ctx.beginPath(); ctx.moveTo(1090, 150); ctx.lineTo(940, 500); ctx.lineTo(1140, 500); ctx.closePath(); ctx.fill();
        }

        // 2. Distant Mountains / Woodland Ridge
        ctx.fillStyle = isNight ? 'rgba(54, 82, 92, 0.6)' : 'rgba(132, 198, 164, 0.55)';
        ctx.beginPath();
        ctx.moveTo(0, 440);
        ctx.quadraticCurveTo(220, 320, 460, 405);
        ctx.quadraticCurveTo(720, 310, 980, 395);
        ctx.quadraticCurveTo(1140, 345, 1280, 410);
        ctx.lineTo(1280, 540); ctx.lineTo(0, 540); ctx.closePath(); ctx.fill();

        // 3. Midground Rolling Hills with soft shading
        var hillGrad = ctx.createLinearGradient(0, 370, 0, 520);
        hillGrad.addColorStop(0, isNight ? '#44705e' : '#a9de87');
        hillGrad.addColorStop(1, isNight ? '#33594a' : '#7dc261');
        ctx.fillStyle = hillGrad;
        ctx.beginPath();
        ctx.moveTo(0, 465);
        ctx.bezierCurveTo(320, 365, 620, 480, 940, 395);
        ctx.bezierCurveTo(1100, 360, 1200, 410, 1280, 440);
        ctx.lineTo(1280, 720); ctx.lineTo(0, 720); ctx.closePath(); ctx.fill();

        // Foreground Meadow Ground
        var meadowGrad = ctx.createLinearGradient(0, 470, 0, 720);
        meadowGrad.addColorStop(0, isNight ? '#2d5243' : '#73ba58');
        meadowGrad.addColorStop(1, isNight ? '#1f3b2f' : '#539642');
        ctx.fillStyle = meadowGrad;
        ctx.fillRect(0, 475, W, 245);

        // Soft winding garden path with pebble highlights
        var pathGrad = ctx.createLinearGradient(0, 535, 0, 640);
        pathGrad.addColorStop(0, isNight ? '#8e7d63' : '#ecd6ad');
        pathGrad.addColorStop(1, isNight ? '#6e5f4a' : '#d5b988');
        ctx.fillStyle = pathGrad;
        ctx.beginPath();
        ctx.moveTo(0, 540);
        ctx.bezierCurveTo(380, 528, 860, 552, 1280, 536);
        ctx.lineTo(1280, 628);
        ctx.bezierCurveTo(860, 642, 380, 616, 0, 630);
        ctx.closePath(); ctx.fill();
        ctx.fillStyle = isNight ? 'rgba(255,240,200,0.12)' : 'rgba(255,250,232,0.42)';
        for (var p = 60; p < 1240; p += 95) {
          ctx.beginPath(); ctx.ellipse(p, 582 + ((p % 3) - 1) * 10, 18, 6, 0, 0, Math.PI * 2); ctx.fill();
        }

        // 4. Scene-Specific Storybook Landmarks
        if (sid === 'square' || sid === 'finale') {
          // Timber Cottage with Glowing Windows & Chimney Smoke
          ctx.fillStyle = 'rgba(24,44,34,0.2)';
          ctx.beginPath(); ctx.ellipse(150, 472, 118, 18, 0, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#c86f58'; ctx.strokeStyle = '#7c3f2e'; ctx.lineWidth = 3;
          roundedRect(ctx, 198, 224, 28, 48, 5); ctx.fill(); ctx.stroke();
          ctx.fillStyle = isNight ? '#d9cbb6' : '#fff4de'; ctx.strokeStyle = '#8b6542'; ctx.lineWidth = 4;
          roundedRect(ctx, 54, 304, 192, 160, 16); ctx.fill(); ctx.stroke();
          // Timber beams
          ctx.strokeStyle = '#a3774f'; ctx.lineWidth = 4;
          ctx.beginPath(); ctx.moveTo(54, 342); ctx.lineTo(246, 342); ctx.stroke();
          // Shingled roof
          var roofG = ctx.createLinearGradient(150, 205, 150, 316);
          roofG.addColorStop(0, isNight ? '#b55f4d' : '#ea7b63');
          roofG.addColorStop(1, isNight ? '#7d3a2f' : '#bd4c39');
          ctx.fillStyle = roofG; ctx.strokeStyle = '#742d22'; ctx.lineWidth = 4;
          ctx.beginPath(); ctx.moveTo(32, 314); ctx.lineTo(150, 208); ctx.lineTo(268, 314); ctx.closePath(); ctx.fill(); ctx.stroke();
          // Arched Door & Warm Windows
          ctx.fillStyle = '#9e5d38'; ctx.strokeStyle = '#5c321a'; ctx.lineWidth = 3.2;
          ctx.beginPath(); ctx.moveTo(128, 464); ctx.lineTo(128, 396); ctx.arc(150, 396, 22, Math.PI, 0); ctx.lineTo(172, 464); ctx.closePath(); ctx.fill(); ctx.stroke();
          ctx.fillStyle = '#ffe57a'; ctx.strokeStyle = '#7c5534';
          roundedRect(ctx, 74, 356, 38, 38, 9); ctx.fill(); ctx.stroke();
          roundedRect(ctx, 188, 356, 38, 38, 9); ctx.fill(); ctx.stroke();

          // Ornate Dawn Bell Archway (Şafak Çanı)
          ctx.fillStyle = '#8f6948'; ctx.strokeStyle = '#573c24'; ctx.lineWidth = 3;
          roundedRect(ctx, 1086, 266, 14, 194, 6); ctx.fill(); ctx.stroke();
          roundedRect(ctx, 1184, 266, 14, 194, 6); ctx.fill(); ctx.stroke();
          roundedRect(ctx, 1072, 250, 140, 22, 10); ctx.fill(); ctx.stroke();
          ctx.fillStyle = '#ffdb5c'; ctx.strokeStyle = '#a37114';
          ctx.beginPath(); ctx.moveTo(1142, 272); ctx.bezierCurveTo(1162, 272, 1164, 304, 1170, 314); ctx.lineTo(1114, 314); ctx.bezierCurveTo(1120, 304, 1122, 272, 1142, 272); ctx.fill(); ctx.stroke();
          ctx.beginPath(); ctx.arc(1142, 319, 6, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        } else if (sid === 'orchard') {
          // Cozy Checkered Picnic Blanket + Wooden Fence + Shaded Apple Tree
          ctx.fillStyle = '#d4a370'; ctx.strokeStyle = '#855830'; ctx.lineWidth = 2.6;
          roundedRect(ctx, 720, 444, 440, 10, 4); ctx.fill(); ctx.stroke();
          roundedRect(ctx, 720, 470, 440, 10, 4); ctx.fill(); ctx.stroke();
          [750, 840, 930, 1020, 1110].forEach(function (fx) {
            roundedRect(ctx, fx, 424, 16, 68, 6); ctx.fill(); ctx.stroke();
          });
          // Picnic Blanket on meadow
          ctx.fillStyle = '#fff3df'; ctx.strokeStyle = '#d65d52'; ctx.lineWidth = 3;
          ctx.beginPath(); ctx.moveTo(760, 560); ctx.lineTo(980, 560); ctx.lineTo(1030, 645); ctx.lineTo(710, 645); ctx.closePath(); ctx.fill(); ctx.stroke();
          ctx.fillStyle = 'rgba(232, 92, 82, 0.32)';
          ctx.fillRect(775, 576, 210, 18); ctx.fillRect(755, 608, 245, 18);

          // Lush Shaded Apple Tree
          ctx.fillStyle = 'rgba(24,44,34,0.22)'; ctx.beginPath(); ctx.ellipse(152, 496, 86, 16, 0, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#915b38'; ctx.strokeStyle = '#5c351c'; ctx.lineWidth = 3.5;
          ctx.beginPath(); ctx.moveTo(124, 494); ctx.quadraticCurveTo(132, 390, 126, 305); ctx.lineTo(176, 305); ctx.quadraticCurveTo(172, 395, 184, 494); ctx.closePath(); ctx.fill(); ctx.stroke();
          [[152, 224, 96, '#489146'], [88, 272, 68, '#55a14d'], [216, 272, 70, '#5ba852'], [152, 268, 76, '#66b859']].forEach(function (c) {
            ctx.fillStyle = c[3]; ctx.beginPath(); ctx.arc(c[0], c[1], c[2], 0, Math.PI * 2); ctx.fill();
          });
          [[106, 244], [190, 232], [150, 290], [218, 282]].forEach(function (ap) {
            ctx.fillStyle = '#eb4444'; ctx.strokeStyle = '#8b1923'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.arc(ap[0], ap[1], 11, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
          });
        } else if (sid === 'stream') {
          // 7-band Pastel Rainbow + Shimmering Creek + Lily Pads
          ['#ff9494', '#ffb770', '#ffeb7a', '#8fe088', '#78c9f7', '#9c96f5'].forEach(function (col, idx) {
            ctx.strokeStyle = col; ctx.globalAlpha = 0.5; ctx.lineWidth = 11;
            ctx.beginPath(); ctx.arc(640, 415, 300 - idx * 12, Math.PI, 0, false); ctx.stroke();
          });
          ctx.globalAlpha = 1;
          var wg = ctx.createLinearGradient(460, 445, 760, 720);
          wg.addColorStop(0, '#6ed0f7'); wg.addColorStop(1, '#399ed9');
          ctx.fillStyle = wg; ctx.strokeStyle = '#d6f4ff'; ctx.lineWidth = 5;
          ctx.beginPath(); ctx.moveTo(525, 450); ctx.bezierCurveTo(500, 535, 455, 610, 420, 720); ctx.lineTo(800, 720); ctx.bezierCurveTo(735, 600, 685, 530, 655, 450); ctx.closePath(); ctx.fill(); ctx.stroke();
          ctx.strokeStyle = 'rgba(235, 250, 255, 0.78)'; ctx.lineWidth = 4; ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(535, 515); ctx.quadraticCurveTo(585, 505, 635, 516); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(495, 600); ctx.quadraticCurveTo(585, 588, 685, 602); ctx.stroke();
          // Wooden Plank Bridge
          ctx.fillStyle = '#c4834b'; ctx.strokeStyle = '#6d411c'; ctx.lineWidth = 3;
          roundedRect(ctx, 455, 542, 285, 36, 10); ctx.fill(); ctx.stroke();
          // Lily pad
          ctx.fillStyle = '#5bb554'; ctx.strokeStyle = '#337532'; ctx.lineWidth = 2.5;
          ctx.beginPath(); ctx.ellipse(725, 655, 42, 16, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
          ctx.fillStyle = '#ffabc3'; ctx.beginPath(); ctx.arc(725, 645, 9, 0, Math.PI * 2); ctx.fill();
        } else if (sid === 'greenhouse') {
          // Victorian Glass Conservatory
          ctx.fillStyle = 'rgba(255, 252, 224, 0.28)';
          ctx.beginPath(); ctx.moveTo(220, 90); ctx.lineTo(380, 90); ctx.lineTo(520, 560); ctx.lineTo(310, 560); ctx.closePath(); ctx.fill();
          ctx.beginPath(); ctx.moveTo(720, 90); ctx.lineTo(880, 90); ctx.lineTo(1020, 560); ctx.lineTo(810, 560); ctx.closePath(); ctx.fill();
          ctx.strokeStyle = '#51786e'; ctx.lineWidth = 9;
          roundedRect(ctx, 85, 105, 1110, 415, 120); ctx.stroke();
          ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(81, 120, 110, 0.65)';
          [340, 640, 940].forEach(function (gx) {
            ctx.beginPath(); ctx.moveTo(gx, 105); ctx.lineTo(gx, 485); ctx.stroke();
          });
          // Terracotta Flower Pots
          [145, 1115].forEach(function (px) {
            ctx.fillStyle = '#d97553'; ctx.strokeStyle = '#8b3e24'; ctx.lineWidth = 3;
            ctx.beginPath(); ctx.moveTo(px - 26, 442); ctx.lineTo(px + 26, 442); ctx.lineTo(px + 18, 492); ctx.lineTo(px - 18, 492); ctx.closePath(); ctx.fill(); ctx.stroke();
            ctx.fillStyle = '#53a34b'; ctx.beginPath(); ctx.arc(px, 424, 24, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#ff9fb4'; ctx.beginPath(); ctx.arc(px - 10, 416, 7, 0, Math.PI * 2); ctx.arc(px + 10, 420, 7, 0, Math.PI * 2); ctx.fill();
          });
        } else {
          // Woodland Forest / Glade / Twilight Oaks & Glowing Mushrooms
          [[135, 320, '#44804e'], [1110, 315, '#3b6d49'], [965, 330, '#4b8a55']].forEach(function (t) {
            ctx.fillStyle = '#7c4f32'; ctx.strokeStyle = '#4e2f1b'; ctx.lineWidth = 3;
            roundedRect(ctx, t[0] - 22, t[1], 44, 180, 12); ctx.fill(); ctx.stroke();
            ctx.fillStyle = t[2];
            ctx.beginPath(); ctx.arc(t[0], t[1] - 46, 78, 0, Math.PI * 2); ctx.arc(t[0] - 44, t[1] - 10, 56, 0, Math.PI * 2); ctx.arc(t[0] + 44, t[1] - 10, 56, 0, Math.PI * 2); ctx.fill();
          });
        }

        // 5. Wildflower Meadow Accents
        var flColors = isNight ? ['#fff394', '#a5d8ff'] : ['#ff9fb4', '#ffe066', '#ffffff'];
        [[290, 505], [460, 515], [790, 512], [1025, 505], [340, 665], [910, 672]].forEach(function (pt, i) {
          ctx.strokeStyle = '#3f7c3c'; ctx.lineWidth = 3;
          ctx.beginPath(); ctx.moveTo(pt[0], pt[1] + 18); ctx.lineTo(pt[0], pt[1]); ctx.stroke();
          ctx.fillStyle = flColors[i % flColors.length];
          ctx.beginPath(); ctx.arc(pt[0], pt[1] - 4, 8, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#f7a531';
          ctx.beginPath(); ctx.arc(pt[0], pt[1] - 4, 3.5, 0, Math.PI * 2); ctx.fill();
        });
      }, 1280, 720);
    });
  }

  window.MiloSpriteFactory = {
    registerAll: registerAll
  };
})();
