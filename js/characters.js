(function () {
  'use strict';

  var seq = 0;
  function uid(prefix) {
    seq += 1;
    return prefix + '-' + seq;
  }

  function renderMilo() {
    return [
      '<svg viewBox="0 0 180 230" xmlns="http://www.w3.org/2000/svg" aria-label="Kaşif Milo">',
      '  <defs>',
      '    <linearGradient id="miloFur" x1="0" y1="0" x2="1" y2="1">',
      '      <stop offset="0%" stop-color="#e3a872"/>',
      '      <stop offset="70%" stop-color="#c67e4d"/>',
      '      <stop offset="100%" stop-color="#a86239"/>',
      '    </linearGradient>',
      '    <linearGradient id="miloOveralls" x1="0" y1="0" x2="0.8" y2="1">',
      '      <stop offset="0%" stop-color="#75b663"/>',
      '      <stop offset="100%" stop-color="#48854b"/>',
      '    </linearGradient>',
      '    <linearGradient id="miloScarf" x1="0" y1="0" x2="1" y2="1">',
      '      <stop offset="0%" stop-color="#ffe177"/>',
      '      <stop offset="100%" stop-color="#f2b83a"/>',
      '    </linearGradient>',
      '    <linearGradient id="miloPack" x1="0" y1="0" x2="1" y2="1">',
      '      <stop offset="0%" stop-color="#f47d67"/>',
      '      <stop offset="100%" stop-color="#d25343"/>',
      '    </linearGradient>',
      '  </defs>',
      '  <ellipse cx="90" cy="216" rx="54" ry="11" fill="#29483b" opacity="0.22"/>',
      '  <g class="milo-root">',
      '    <!-- Fluffy Tail -->',
      '    <g class="milo-tail">',
      '      <path d="M52 174 C22 176, 14 148, 30 138 C42 130, 56 144, 58 164 Z" fill="url(#miloFur)" stroke="#7f4c2f" stroke-width="3.5" stroke-linejoin="round"/>',
      '      <path d="M29 144 C24 148, 25 158, 35 162" fill="none" stroke="#f7d5b2" stroke-width="4" stroke-linecap="round"/>',
      '    </g>',
      '    <!-- Explorer Backpack -->',
      '    <rect x="33" y="114" width="32" height="62" rx="14" fill="url(#miloPack)" stroke="#8b362b" stroke-width="3.5"/>',
      '    <rect x="38" y="122" width="16" height="22" rx="7" fill="#f7a087" opacity="0.7"/>',
      '    <!-- Legs & Boots -->',
      '    <g class="milo-leg-l">',
      '      <rect x="57" y="170" width="26" height="38" rx="12" fill="#8d5a3e" stroke="#623c28" stroke-width="3.2"/>',
      '      <ellipse cx="66" cy="208" rx="19" ry="10" fill="#b8764b" stroke="#623c28" stroke-width="3.2"/>',
      '      <path d="M55 206 Q66 202 77 206" fill="none" stroke="#f0c8a0" stroke-width="2.5" stroke-linecap="round"/>',
      '    </g>',
      '    <g class="milo-leg-r">',
      '      <rect x="97" y="170" width="26" height="38" rx="12" fill="#8d5a3e" stroke="#623c28" stroke-width="3.2"/>',
      '      <ellipse cx="114" cy="208" rx="19" ry="10" fill="#b8764b" stroke="#623c28" stroke-width="3.2"/>',
      '      <path d="M103 206 Q114 202 125 206" fill="none" stroke="#f0c8a0" stroke-width="2.5" stroke-linecap="round"/>',
      '    </g>',
      '    <!-- Left Arm -->',
      '    <g class="milo-arm-l">',
      '      <rect x="35" y="115" width="22" height="52" rx="11" transform="rotate(16 46 122)" fill="url(#miloFur)" stroke="#7f4c2f" stroke-width="3.5"/>',
      '      <circle cx="38" cy="166" r="12" fill="#dc9b6a" stroke="#7f4c2f" stroke-width="3.2"/>',
      '    </g>',
      '    <!-- Overalls Body -->',
      '    <path d="M53 115 C53 100, 127 100, 127 115 L131 174 C131 186, 49 186, 49 174 Z" fill="url(#miloOveralls)" stroke="#35663a" stroke-width="3.8"/>',
      '    <rect x="64" y="106" width="11" height="22" rx="5" fill="#5da058" stroke="#35663a" stroke-width="2.6"/>',
      '    <rect x="105" y="106" width="11" height="22" rx="5" fill="#5da058" stroke="#35663a" stroke-width="2.6"/>',
      '    <circle cx="69.5" cy="121" r="3.5" fill="#ffd45c"/>',
      '    <circle cx="110.5" cy="121" r="3.5" fill="#ffd45c"/>',
      '    <!-- Golden Explorer Pocket -->',
      '    <path d="M68 138 H112 V161 C112 170, 68 170, 68 161 Z" fill="#f7cf62" stroke="#b98128" stroke-width="3"/>',
      '    <path d="M90 144 L92.6 150 L99 150.6 L94 154.8 L95.6 161 L90 157.6 L84.4 161 L86 154.8 L81 150.6 L87.4 150 Z" fill="#fff7d6" stroke="#b98128" stroke-width="1.4"/>',
      '    <!-- Right Arm -->',
      '    <g class="milo-arm-r">',
      '      <rect x="123" y="115" width="22" height="52" rx="11" transform="rotate(-15 134 122)" fill="url(#miloFur)" stroke="#7f4c2f" stroke-width="3.5"/>',
      '      <circle cx="141" cy="166" r="12" fill="#dc9b6a" stroke="#7f4c2f" stroke-width="3.2"/>',
      '    </g>',
      '    <!-- Knit Scarf -->',
      '    <g class="milo-scarf-tail">',
      '      <path d="M108 106 L128 104 L134 146 Q121 154 111 146 Z" fill="url(#miloScarf)" stroke="#b87e22" stroke-width="3"/>',
      '      <line x1="114" y1="145" x2="114" y2="152" stroke="#b87e22" stroke-width="2.5" stroke-linecap="round"/>',
      '      <line x1="122" y1="146" x2="122" y2="153" stroke="#b87e22" stroke-width="2.5" stroke-linecap="round"/>',
      '      <line x1="129" y1="145" x2="129" y2="152" stroke="#b87e22" stroke-width="2.5" stroke-linecap="round"/>',
      '    </g>',
      '    <rect x="57" y="96" width="66" height="19" rx="9.5" fill="url(#miloScarf)" stroke="#b87e22" stroke-width="3.2"/>',
      '    <!-- Head & Ears -->',
      '    <g class="milo-head-group">',
      '      <g class="milo-ear-l">',
      '        <path d="M55 46 C42 12, 68 4, 77 32 Z" fill="url(#miloFur)" stroke="#7f4c2f" stroke-width="3.5" stroke-linejoin="round"/>',
      '        <path d="M57 42 C50 22, 65 17, 71 34 Z" fill="#f2aca0"/>',
      '      </g>',
      '      <g class="milo-ear-r">',
      '        <path d="M125 46 C138 12, 112 4, 103 32 Z" fill="url(#miloFur)" stroke="#7f4c2f" stroke-width="3.5" stroke-linejoin="round"/>',
      '        <path d="M123 42 C130 22, 115 17, 109 34 Z" fill="#f2aca0"/>',
      '      </g>',
      '      <ellipse cx="90" cy="68" rx="48" ry="42" fill="url(#miloFur)" stroke="#7f4c2f" stroke-width="3.8"/>',
      '      <!-- Forehead tuft -->',
      '      <path d="M82 28 Q90 19 95 28 Q101 22 103 31" fill="none" stroke="#7f4c2f" stroke-width="3" stroke-linecap="round"/>',
      '      <!-- Muzzle & Cheeks -->',
      '      <ellipse cx="90" cy="80" rx="23" ry="15" fill="#f7d5b2"/>',
      '      <ellipse cx="59" cy="77" rx="9" ry="5.5" fill="#ef8f83" opacity="0.62"/>',
      '      <ellipse cx="121" cy="77" rx="9" ry="5.5" fill="#ef8f83" opacity="0.62"/>',
      '      <!-- Eyes -->',
      '      <g class="milo-eyes">',
      '        <ellipse cx="70" cy="64" rx="7.2" ry="9" fill="#233731"/>',
      '        <circle cx="67.5" cy="60.5" r="2.8" fill="#ffffff"/>',
      '        <circle cx="72" cy="67" r="1.3" fill="#ffffff" opacity="0.8"/>',
      '        <ellipse cx="110" cy="64" rx="7.2" ry="9" fill="#233731"/>',
      '        <circle cx="107.5" cy="60.5" r="2.8" fill="#ffffff"/>',
      '        <circle cx="112" cy="67" r="1.3" fill="#ffffff" opacity="0.8"/>',
      '        <ellipse class="milo-blink-lid" cx="70" cy="64" rx="8" ry="9.5" fill="#c98555"/>',
      '        <ellipse class="milo-blink-lid" cx="110" cy="64" rx="8" ry="9.5" fill="#c98555"/>',
      '      </g>',
      '      <!-- Cute Nose -->',
      '      <ellipse cx="90" cy="74" rx="7" ry="4.8" fill="#6b3e30"/>',
      '      <ellipse cx="88" cy="72.5" rx="2.3" ry="1.2" fill="#aa7b6c"/>',
      '      <!-- Mood-specific Mouths & Brows -->',
      '      <g class="mood-group mood-smile">',
      '        <path d="M62 50 Q70 46 77 50" fill="none" stroke="#6f412a" stroke-width="2.6" stroke-linecap="round"/>',
      '        <path d="M103 50 Q110 46 118 50" fill="none" stroke="#6f412a" stroke-width="2.6" stroke-linecap="round"/>',
      '        <path d="M82 82 Q90 89 98 82" fill="none" stroke="#6b3e30" stroke-width="2.8" stroke-linecap="round"/>',
      '      </g>',
      '      <g class="mood-group mood-happy">',
      '        <path d="M62 49 Q70 43 77 49" fill="none" stroke="#6f412a" stroke-width="2.8" stroke-linecap="round"/>',
      '        <path d="M103 49 Q110 43 118 49" fill="none" stroke="#6f412a" stroke-width="2.8" stroke-linecap="round"/>',
      '        <path d="M80 80 Q90 93 100 80 Z" fill="#da6965" stroke="#6b3e30" stroke-width="2.4" stroke-linejoin="round"/>',
      '      </g>',
      '      <g class="mood-group mood-curious">',
      '        <path d="M62 52 Q70 49 77 51" fill="none" stroke="#6f412a" stroke-width="2.6" stroke-linecap="round"/>',
      '        <path d="M103 46 Q110 41 118 46" fill="none" stroke="#6f412a" stroke-width="2.6" stroke-linecap="round"/>',
      '        <circle cx="91" cy="84" r="4" fill="#d9716a" stroke="#6b3e30" stroke-width="2.2"/>',
      '      </g>',
      '      <g class="mood-group mood-surprised">',
      '        <path d="M62 47 Q70 41 77 46" fill="none" stroke="#6f412a" stroke-width="2.8" stroke-linecap="round"/>',
      '        <path d="M103 46 Q110 41 118 47" fill="none" stroke="#6f412a" stroke-width="2.8" stroke-linecap="round"/>',
      '        <ellipse cx="90" cy="84" rx="5.5" ry="6.5" fill="#d96b64" stroke="#6b3e30" stroke-width="2.4"/>',
      '      </g>',
      '      <g class="mood-group mood-proud">',
      '        <path d="M63 50 Q70 45 77 49" fill="none" stroke="#6f412a" stroke-width="2.8" stroke-linecap="round"/>',
      '        <path d="M103 49 Q110 45 117 50" fill="none" stroke="#6f412a" stroke-width="2.8" stroke-linecap="round"/>',
      '        <path d="M79 81 Q90 91 101 81" fill="none" stroke="#6b3e30" stroke-width="3" stroke-linecap="round"/>',
      '      </g>',
      '    </g>',
      '  </g>',
      '</svg>'
    ].join('\n');
  }

  function renderNine() {
    var id = uid('nine');
    return [
      '<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" aria-label="Nine Fındık">',
      '  <defs>',
      '    <linearGradient id="' + id + '-fur" x1="0" y1="0" x2="1" y2="1">',
      '      <stop offset="0%" stop-color="#d89e78"/><stop offset="100%" stop-color="#a86847"/>',
      '    </linearGradient>',
      '    <linearGradient id="' + id + '-shawl" x1="0" y1="0" x2="1" y2="1">',
      '      <stop offset="0%" stop-color="#c3a4e3"/><stop offset="100%" stop-color="#8f6eb8"/>',
      '    </linearGradient>',
      '  </defs>',
      '  <ellipse cx="82" cy="148" rx="44" ry="8" fill="#29483b" opacity="0.2"/>',
      '  <!-- Fluffy Squirrel Tail -->',
      '  <path d="M110 132 C145 128, 152 72, 128 54 C112 42, 98 62, 102 92 Z" fill="url(#' + id + '-fur)" stroke="#70432b" stroke-width="3.2"/>',
      '  <!-- Body & Lavender Shawl -->',
      '  <ellipse cx="78" cy="116" rx="34" ry="30" fill="#7da975" stroke="#426b45" stroke-width="3.2"/>',
      '  <path d="M44 108 Q78 134 112 108 Q104 88 78 88 Q52 88 44 108 Z" fill="url(#' + id + '-shawl)" stroke="#634889" stroke-width="3"/>',
      '  <circle cx="78" cy="112" r="5" fill="#ffd966" stroke="#a6721e" stroke-width="1.8"/>',
      '  <!-- Head & Silver Hair Bun -->',
      '  <circle cx="78" cy="30" r="14" fill="#ede6ea" stroke="#8c7f88" stroke-width="2.6"/>',
      '  <ellipse cx="55" cy="46" rx="9" ry="15" transform="rotate(-18 55 46)" fill="url(#' + id + '-fur)" stroke="#70432b" stroke-width="3"/>',
      '  <ellipse cx="101" cy="46" rx="9" ry="15" transform="rotate(18 101 46)" fill="url(#' + id + '-fur)" stroke="#70432b" stroke-width="3"/>',
      '  <ellipse cx="78" cy="68" rx="34" ry="30" fill="url(#' + id + '-fur)" stroke="#70432b" stroke-width="3.2"/>',
      '  <path d="M46 58 Q62 42 78 52 Q94 42 110 58 Q96 36 78 36 Q60 36 46 58 Z" fill="#ede6ea" stroke="#8c7f88" stroke-width="2"/>',
      '  <!-- Acorn Hairpin -->',
      '  <ellipse cx="98" cy="42" rx="6" ry="7" fill="#c98b4b" stroke="#6f431d" stroke-width="1.8"/>',
      '  <path d="M92 39 Q98 32 104 39 Z" fill="#7d4f28"/>',
      '  <ellipse cx="78" cy="77" rx="18" ry="12" fill="#f7dac0"/>',
      '  <!-- Glasses & Kind Eyes -->',
      '  <circle cx="65" cy="67" r="9.5" fill="rgba(255,255,255,0.28)" stroke="#d39633" stroke-width="2.6"/>',
      '  <circle cx="91" cy="67" r="9.5" fill="rgba(255,255,255,0.28)" stroke="#d39633" stroke-width="2.6"/>',
      '  <line x1="74.5" y1="67" x2="81.5" y2="67" stroke="#d39633" stroke-width="2.4"/>',
      '  <circle cx="65" cy="67" r="4" fill="#273a34"/>',
      '  <circle cx="91" cy="67" r="4" fill="#273a34"/>',
      '  <circle cx="63.5" cy="65.5" r="1.4" fill="#fff"/>',
      '  <circle cx="89.5" cy="65.5" r="1.4" fill="#fff"/>',
      '  <ellipse cx="78" cy="74" rx="4.5" ry="3" fill="#6b3e30"/>',
      '  <path d="M71 80 Q78 86 85 80" fill="none" stroke="#6b3e30" stroke-width="2.4" stroke-linecap="round"/>',
      '</svg>'
    ].join('\n');
  }

  function renderPof() {
    var id = uid('pof');
    return [
      '<svg viewBox="0 0 160 150" xmlns="http://www.w3.org/2000/svg" aria-label="Kirpi Pof">',
      '  <defs>',
      '    <linearGradient id="' + id + '-quill" x1="0" y1="0" x2="1" y2="1">',
      '      <stop offset="0%" stop-color="#9e6d50"/><stop offset="100%" stop-color="#6c4530"/>',
      '    </linearGradient>',
      '  </defs>',
      '  <ellipse cx="80" cy="136" rx="48" ry="9" fill="#29483b" opacity="0.22"/>',
      '  <!-- Spiky Back Quills -->',
      '  <path d="M28 96 L22 72 L40 76 L40 50 L58 60 L68 34 L82 52 L98 32 L106 54 L126 46 L122 68 L138 76 L128 96 Z" fill="url(#' + id + '-quill)" stroke="#523220" stroke-width="3.2" stroke-linejoin="round"/>',
      '  <!-- Plump Cream Belly & Face -->',
      '  <ellipse cx="80" cy="96" rx="46" ry="34" fill="#f7dec2" stroke="#8f6448" stroke-width="3.2"/>',
      '  <!-- Red Polka-Dot Neckerchief -->',
      '  <path d="M48 106 Q80 124 112 106 Q98 128 80 128 Q62 128 48 106 Z" fill="#ea6456" stroke="#a6392e" stroke-width="2.6"/>',
      '  <circle cx="70" cy="116" r="2.5" fill="#fff6e0"/><circle cx="84" cy="119" r="2.5" fill="#fff6e0"/><circle cx="96" cy="113" r="2.2" fill="#fff6e0"/>',
      '  <!-- Ears -->',
      '  <circle cx="48" cy="70" r="9" fill="#f0c8a4" stroke="#8f6448" stroke-width="2.6"/>',
      '  <circle cx="112" cy="70" r="9" fill="#f0c8a4" stroke="#8f6448" stroke-width="2.6"/>',
      '  <!-- Eyes, Rosy Cheeks, Button Nose -->',
      '  <circle cx="64" cy="84" r="5" fill="#273a34"/><circle cx="62.5" cy="82" r="1.8" fill="#fff"/>',
      '  <circle cx="96" cy="84" r="5" fill="#273a34"/><circle cx="94.5" cy="82" r="1.8" fill="#fff"/>',
      '  <ellipse cx="52" cy="93" rx="6.5" ry="4" fill="#ef9288" opacity="0.65"/>',
      '  <ellipse cx="108" cy="93" rx="6.5" ry="4" fill="#ef9288" opacity="0.65"/>',
      '  <ellipse cx="80" cy="92" rx="6" ry="4.2" fill="#5e3a2b"/>',
      '  <path d="M73 100 Q80 106 87 100" fill="none" stroke="#5e3a2b" stroke-width="2.5" stroke-linecap="round"/>',
      '  <!-- Cute Paws -->',
      '  <ellipse cx="62" cy="131" rx="11" ry="6.5" fill="#e9bd94" stroke="#8f6448" stroke-width="2.5"/>',
      '  <ellipse cx="98" cy="131" rx="11" ry="6.5" fill="#e9bd94" stroke="#8f6448" stroke-width="2.5"/>',
      '</svg>'
    ].join('\n');
  }

  function renderMavis() {
    var id = uid('mavis');
    return [
      '<svg viewBox="0 0 160 150" xmlns="http://www.w3.org/2000/svg" aria-label="Mavi Kuş Maviş">',
      '  <defs>',
      '    <linearGradient id="' + id + '-body" x1="0" y1="0" x2="1" y2="1">',
      '      <stop offset="0%" stop-color="#7cd4f7"/><stop offset="100%" stop-color="#3c8fd4"/>',
      '    </linearGradient>',
      '  </defs>',
      '  <ellipse cx="80" cy="136" rx="38" ry="8" fill="#29483b" opacity="0.2"/>',
      '  <!-- Tail Feathers -->',
      '  <path d="M110 98 L142 84 L136 106 L144 114 L108 112 Z" fill="#2f7ab8" stroke="#1f5380" stroke-width="2.8" stroke-linejoin="round"/>',
      '  <!-- Legs -->',
      '  <path d="M68 116 L66 132 M66 132 L58 134 M66 132 L72 135" stroke="#d98732" stroke-width="3.2" stroke-linecap="round"/>',
      '  <path d="M92 116 L94 132 M94 132 L88 135 M94 132 L102 134" stroke="#d98732" stroke-width="3.2" stroke-linecap="round"/>',
      '  <!-- Wings -->',
      '  <ellipse class="mavis-wing-l" cx="44" cy="88" rx="16" ry="24" transform="rotate(24 44 88)" fill="#4aa4e3" stroke="#1f5380" stroke-width="3"/>',
      '  <ellipse class="mavis-wing-r" cx="114" cy="88" rx="16" ry="24" transform="rotate(-24 114 88)" fill="#4aa4e3" stroke="#1f5380" stroke-width="3"/>',
      '  <!-- Plump Body -->',
      '  <ellipse cx="80" cy="86" rx="38" ry="38" fill="url(#' + id + '-body)" stroke="#1f5380" stroke-width="3.4"/>',
      '  <ellipse cx="80" cy="96" rx="26" ry="22" fill="#e6f7ff"/>',
      '  <!-- Head Tuft -->',
      '  <path d="M74 48 Q70 28 84 36 Q86 24 94 40 Q88 46 82 48 Z" fill="#59b7ed" stroke="#1f5380" stroke-width="2.8" stroke-linejoin="round"/>',
      '  <!-- Eyes & Beak -->',
      '  <circle cx="66" cy="74" r="5.5" fill="#1e3138"/><circle cx="64.5" cy="72" r="2" fill="#fff"/>',
      '  <circle cx="94" cy="74" r="5.5" fill="#1e3138"/><circle cx="92.5" cy="72" r="2" fill="#fff"/>',
      '  <ellipse cx="56" cy="83" rx="5.5" ry="3.2" fill="#f3989b" opacity="0.7"/>',
      '  <ellipse cx="104" cy="83" rx="5.5" ry="3.2" fill="#f3989b" opacity="0.7"/>',
      '  <path d="M73 80 L87 80 L80 91 Z" fill="#ffb838" stroke="#b57112" stroke-width="2.4" stroke-linejoin="round"/>',
      '  <!-- Wet Droplets (toggled via .is-wet) -->',
      '  <g class="mavis-drops">',
      '    <path d="M35 66 Q31 74 35 77 Q39 74 35 66 Z" fill="#8ee3ff" stroke="#2c84b8" stroke-width="1.6"/>',
      '    <path d="M124 68 Q120 76 124 79 Q128 76 124 68 Z" fill="#8ee3ff" stroke="#2c84b8" stroke-width="1.6"/>',
      '    <path d="M46 112 Q42 119 46 122 Q50 119 46 112 Z" fill="#8ee3ff" stroke="#2c84b8" stroke-width="1.6"/>',
      '  </g>',
      '</svg>'
    ].join('\n');
  }

  function renderLila() {
    var id = uid('lila');
    return [
      '<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-label="Ateş Böceği Lila">',
      '  <defs>',
      '    <radialGradient id="' + id + '-halo" cx="50%" cy="55%" r="50%">',
      '      <stop offset="0%" stop-color="#fff9b3" stop-opacity="0.95"/>',
      '      <stop offset="60%" stop-color="#ffd84d" stop-opacity="0.45"/>',
      '      <stop offset="100%" stop-color="#ffd84d" stop-opacity="0"/>',
      '    </radialGradient>',
      '  </defs>',
      '  <circle class="lila-halo" cx="60" cy="68" r="46" fill="url(#' + id + '-halo)"/>',
      '  <!-- Iridescent Wings -->',
      '  <ellipse class="lila-wing-l" cx="38" cy="48" rx="18" ry="11" transform="rotate(-28 38 48)" fill="#e8fbff" fill-opacity="0.88" stroke="#8cc8d8" stroke-width="2.2"/>',
      '  <ellipse class="lila-wing-r" cx="82" cy="48" rx="18" ry="11" transform="rotate(28 82 48)" fill="#e8fbff" fill-opacity="0.88" stroke="#8cc8d8" stroke-width="2.2"/>',
      '  <!-- Glowing Lantern Tummy -->',
      '  <ellipse cx="60" cy="76" rx="18" ry="20" fill="#ffe66d" stroke="#cf8a1d" stroke-width="2.6"/>',
      '  <ellipse cx="56" cy="71" rx="6" ry="9" fill="#fffbe0" opacity="0.85"/>',
      '  <!-- Head & Antennae -->',
      '  <path d="M52 38 Q44 22 39 24 M68 38 Q76 22 81 24" fill="none" stroke="#4f3d68" stroke-width="2.5" stroke-linecap="round"/>',
      '  <circle cx="38" cy="24" r="3.4" fill="#ffe169"/>',
      '  <circle cx="82" cy="24" r="3.4" fill="#ffe169"/>',
      '  <circle cx="60" cy="49" r="16" fill="#775ea3" stroke="#453369" stroke-width="2.6"/>',
      '  <circle cx="54" cy="47" r="3" fill="#fff"/><circle cx="54.4" cy="47.2" r="1.5" fill="#1e1b2e"/>',
      '  <circle cx="66" cy="47" r="3" fill="#fff"/><circle cx="66.4" cy="47.2" r="1.5" fill="#1e1b2e"/>',
      '  <path d="M55 55 Q60 59 65 55" fill="none" stroke="#ffe7b3" stroke-width="2.2" stroke-linecap="round"/>',
      '</svg>'
    ].join('\n');
  }

  function renderSincap() {
    return [
      '<svg viewBox="0 0 160 150" xmlns="http://www.w3.org/2000/svg" aria-label="Sincap Pıtır">',
      '  <ellipse cx="78" cy="136" rx="40" ry="8" fill="#29483b" opacity="0.22"/>',
      '  <path d="M98 118 C142 114, 148 52, 120 34 C100 22, 86 48, 92 84 Z" fill="#d47d42" stroke="#6f3918" stroke-width="3.2"/>',
      '  <ellipse cx="70" cy="96" rx="28" ry="30" fill="#d47d42" stroke="#6f3918" stroke-width="3.2"/>',
      '  <ellipse cx="62" cy="100" rx="14" ry="20" fill="#f8dcc0"/>',
      '  <path d="M48 48 L42 22 L62 36 Z" fill="#c97339" stroke="#6f3918" stroke-width="2.8"/>',
      '  <path d="M84 48 L92 22 L72 36 Z" fill="#c97339" stroke="#6f3918" stroke-width="2.8"/>',
      '  <ellipse cx="66" cy="58" rx="28" ry="24" fill="#da8449" stroke="#6f3918" stroke-width="3.2"/>',
      '  <ellipse cx="56" cy="64" rx="13" ry="9" fill="#f8dcc0"/>',
      '  <circle cx="56" cy="54" r="4.5" fill="#233731"/><circle cx="54.5" cy="52.5" r="1.5" fill="#fff"/>',
      '  <circle cx="78" cy="54" r="4.5" fill="#233731"/><circle cx="76.5" cy="52.5" r="1.5" fill="#fff"/>',
      '  <circle cx="46" cy="62" r="4" fill="#5a2f18"/>',
      '</svg>'
    ].join('\n');
  }

  function renderFriend(id) {
    if (id === 'nine') return renderNine();
    if (id === 'pof') return renderPof();
    if (id === 'mavis') return renderMavis();
    if (id === 'lila') return renderLila();
    if (id === 'sincap') return renderSincap();
    return renderLila();
  }

  function renderPortrait(speakerId) {
    if (speakerId === 'milo') return renderMilo();
    return renderFriend(speakerId);
  }

  function renderSeedSvg(colorHex, rimHex, glowHex, label) {
    var id = uid('seed');
    return [
      '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-label="' + (label || 'Işık Tohumu') + '">',
      '  <defs>',
      '    <radialGradient id="' + id + '-g" cx="40%" cy="35%" r="65%">',
      '      <stop offset="0%" stop-color="#ffffff"/>',
      '      <stop offset="45%" stop-color="' + colorHex + '"/>',
      '      <stop offset="100%" stop-color="' + rimHex + '"/>',
      '    </radialGradient>',
      '  </defs>',
      '  <circle cx="50" cy="52" r="40" fill="' + glowHex + '" opacity="0.34"/>',
      '  <path d="M50 12 C68 32, 78 52, 72 72 C67 86, 33 86, 28 72 C22 52, 32 32, 50 12 Z" fill="url(#' + id + '-g)" stroke="' + rimHex + '" stroke-width="3.2"/>',
      '  <path d="M43 34 C38 45, 38 58, 42 68" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.75"/>',
      '  <path d="M50 22 L53 30 L61 32 L54 37 L56 45 L50 40 L44 45 L46 37 L39 32 L47 30 Z" fill="#fffbe0" opacity="0.9"/>',
      '</svg>'
    ].join('\n');
  }

  function renderItem(type) {
    var id = uid('item');
    switch (type) {
      case 'apple-red':
        return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="' + id + '" cx="35%" cy="32%" r="68%"><stop offset="0%" stop-color="#ff9d98"/><stop offset="45%" stop-color="#eb4444"/><stop offset="100%" stop-color="#a81d29"/></radialGradient></defs><path d="M50 25 Q52 12 60 10" fill="none" stroke="#6f4324" stroke-width="4.5" stroke-linecap="round"/><path d="M53 20 Q72 8 76 23 Q62 30 53 20 Z" fill="#54a34b" stroke="#2f6b32" stroke-width="2.2"/><path d="M50 28 C30 22, 18 40, 22 62 C26 84, 42 90, 50 85 C58 90, 74 84, 78 62 C82 40, 70 22, 50 28 Z" fill="url(#' + id + ')" stroke="#8b1923" stroke-width="3"/><ellipse cx="37" cy="44" rx="6" ry="11" transform="rotate(-18 37 44)" fill="#ffffff" opacity="0.4"/></svg>';

      case 'apple-green':
        return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="' + id + '" cx="35%" cy="32%" r="68%"><stop offset="0%" stop-color="#d5f799"/><stop offset="50%" stop-color="#7ac74f"/><stop offset="100%" stop-color="#408733"/></radialGradient></defs><path d="M50 25 Q52 12 60 10" fill="none" stroke="#6f4324" stroke-width="4.5" stroke-linecap="round"/><path d="M53 20 Q72 8 76 23 Q62 30 53 20 Z" fill="#4f9946" stroke="#2f6b32" stroke-width="2.2"/><path d="M50 28 C30 22, 18 40, 22 62 C26 84, 42 90, 50 85 C58 90, 74 84, 78 62 C82 40, 70 22, 50 28 Z" fill="url(#' + id + ')" stroke="#326c28" stroke-width="3"/><ellipse cx="37" cy="44" rx="6" ry="11" transform="rotate(-18 37 44)" fill="#ffffff" opacity="0.45"/></svg>';

      case 'pinecone':
        return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="54" rx="25" ry="33" fill="#8b5936" stroke="#57341d" stroke-width="3"/><path d="M32 38 Q50 50 68 38 M28 54 Q50 67 72 54 M32 70 Q50 82 68 70" fill="none" stroke="#d19a66" stroke-width="3.2" stroke-linecap="round"/><path d="M40 28 Q50 38 60 28" fill="none" stroke="#d19a66" stroke-width="3" stroke-linecap="round"/></svg>';

      case 'leaf':
        return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M22 76 C18 44, 44 16, 82 18 C82 56, 56 82, 22 76 Z" fill="#f0923c" stroke="#9e4c17" stroke-width="3.2" stroke-linejoin="round"/><path d="M15 84 L74 26 M42 56 L36 38 M54 44 L48 28 M46 54 L64 58" fill="none" stroke="#9e4c17" stroke-width="2.8" stroke-linecap="round"/></svg>';

      case 'carrot':
        return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#ffb155"/><stop offset="100%" stop-color="#ea6d21"/></linearGradient></defs><path d="M56 26 C52 10, 62 6, 65 20 C72 6, 84 12, 72 26 C84 22, 86 34, 70 34 Z" fill="#59a84a" stroke="#316f29" stroke-width="2.4" stroke-linejoin="round"/><path d="M52 24 C66 24, 76 34, 72 48 L36 86 C30 92, 20 84, 24 74 L42 32 C45 26, 48 24, 52 24 Z" fill="url(#' + id + ')" stroke="#a34513" stroke-width="3"/><path d="M48 44 L58 49 M40 58 L49 62" stroke="#b84e16" stroke-width="2.6" stroke-linecap="round"/></svg>';

      case 'yellow-flower':
        return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="#ffe15c" stroke="#c99518" stroke-width="2.5"><circle cx="50" cy="24" r="14"/><circle cx="75" cy="42" r="14"/><circle cx="65" cy="70" r="14"/><circle cx="35" cy="70" r="14"/><circle cx="25" cy="42" r="14"/></g><circle cx="50" cy="50" r="15" fill="#f59a2e" stroke="#b56212" stroke-width="2.8"/><circle cx="45" cy="46" r="3" fill="#fff5d0"/></svg>';

      case 'pebble':
        return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="56" rx="34" ry="24" fill="#a8b8bf" stroke="#5d6f77" stroke-width="3"/><ellipse cx="42" cy="48" rx="14" ry="7" fill="#dce7eb" opacity="0.65"/></svg>';

      case 'stone-1':
      case 'stone-2':
      case 'stone-3':
        var n = type.split('-')[1];
        return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="58" rx="37" ry="25" fill="#9fb5bf" stroke="#4f6670" stroke-width="3.2"/><ellipse cx="45" cy="49" rx="22" ry="10" fill="#d5e4ea" opacity="0.7"/><circle cx="50" cy="56" r="16" fill="#ffdf73" stroke="#b58319" stroke-width="2.4"/><text x="50" y="62" text-anchor="middle" font-size="20" font-weight="900" fill="#4f3912">' + n + '</text></svg>';

      case 'blueberry':
        return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="' + id + '" cx="35%" cy="32%" r="68%"><stop offset="0%" stop-color="#9cc6ff"/><stop offset="45%" stop-color="#3c73d8"/><stop offset="100%" stop-color="#1d3d8b"/></radialGradient></defs><circle cx="50" cy="56" r="31" fill="url(#' + id + ')" stroke="#17306e" stroke-width="3.2"/><path d="M38 28 L44 21 L50 27 L56 21 L62 28 L56 34 L44 34 Z" fill="#2c53ad" stroke="#17306e" stroke-width="2" stroke-linejoin="round"/><ellipse cx="38" cy="45" rx="6" ry="10" transform="rotate(-22 38 45)" fill="#ffffff" opacity="0.45"/></svg>';

      case 'purple-grape':
        return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 18 L50 28" stroke="#6d4726" stroke-width="4" stroke-linecap="round"/><g fill="#9e5cd8" stroke="#5c2b8f" stroke-width="2.5"><circle cx="40" cy="40" r="12"/><circle cx="60" cy="40" r="12"/><circle cx="34" cy="56" r="12"/><circle cx="50" cy="56" r="12"/><circle cx="66" cy="56" r="12"/><circle cx="42" cy="72" r="11"/><circle cx="58" cy="72" r="11"/><circle cx="50" cy="84" r="10"/></g></svg>';

      case 'pink-blossom':
        return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="#ffa6ba" stroke="#c75776" stroke-width="2.4"><circle cx="50" cy="25" r="14"/><circle cx="74" cy="42" r="14"/><circle cx="65" cy="70" r="14"/><circle cx="35" cy="70" r="14"/><circle cx="26" cy="42" r="14"/></g><circle cx="50" cy="50" r="12" fill="#ffe169" stroke="#c98e1a" stroke-width="2.4"/></svg>';

      case 'mushroom-1':
      case 'mushroom-2':
      case 'mushroom-3':
        var mn = type.split('-')[1];
        var cap = mn === '1' ? '#ff7c7c' : mn === '2' ? '#6fd4ff' : '#d593ff';
        return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="40" y="54" width="20" height="30" rx="9" fill="#fff3dc" stroke="#a68d6c" stroke-width="2.8"/><path d="M18 56 C18 24, 82 24, 82 56 Z" fill="' + cap + '" stroke="#4d3b66" stroke-width="3"/><circle cx="36" cy="42" r="5" fill="#fffbe6"/><circle cx="62" cy="39" r="4" fill="#fffbe6"/><circle cx="50" cy="46" r="12" fill="#fff5b8" stroke="#b58319" stroke-width="2"/><text x="50" y="51" text-anchor="middle" font-size="14" font-weight="900" fill="#4f3912">' + mn + '</text></svg>';

      case 'seed-ruby':
        return renderSeedSvg('#ff7481', '#b51d32', '#ff8e98', 'Yakut Işık Tohumu');
      case 'seed-amber':
        return renderSeedSvg('#ffbf47', '#c46a10', '#ffd06b', 'Kehribar Işık Tohumu');
      case 'seed-sapphire':
        return renderSeedSvg('#65b2ff', '#1c53b5', '#87c5ff', 'Safir Işık Tohumu');
      case 'seed-gold':
        return renderSeedSvg('#ffe75c', '#c78c10', '#fff08a', 'Altın Yıldız Tohumu');

      case 'backpack-badge':
        return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="36" fill="#ffd966" stroke="#b97b1c" stroke-width="3.5"/><path d="M50 22 L58 40 L77 42 L62 55 L66 74 L50 64 L34 74 L38 55 L23 42 L42 40 Z" fill="#fffbef" stroke="#b97b1c" stroke-width="2.5" stroke-linejoin="round"/></svg>';

      default:
        return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="28" fill="#ffd966"/></svg>';
    }
  }

  function renderDropTarget(kind, count, litSeeds) {
    var id = uid('target');
    if (kind === 'basket') {
      var fillItems = '';
      for (var i = 0; i < (count || 0); i++) {
        fillItems += '<circle cx="' + (52 + i * 18) + '" cy="46" r="13" fill="#eb4b46" stroke="#8f1e22" stroke-width="2.4"/>';
      }
      return [
        '<svg viewBox="0 0 150 115" xmlns="http://www.w3.org/2000/svg" aria-label="Hasır Sepet">',
        '  <ellipse cx="75" cy="105" rx="54" ry="8" fill="#2a483a" opacity="0.22"/>',
        '  <path d="M40 44 C40 12, 110 12, 110 44" fill="none" stroke="#9e6637" stroke-width="7" stroke-linecap="round"/>',
        fillItems,
        '  <path d="M22 46 H128 L114 96 C111 103, 39 103, 36 96 Z" fill="#dca45c" stroke="#8a5428" stroke-width="3.5" stroke-linejoin="round"/>',
        '  <rect x="18" y="40" width="114" height="14" rx="7" fill="#ecc07b" stroke="#8a5428" stroke-width="3.2"/>',
        '  <path d="M42 54 L46 96 M75 54 L75 98 M108 54 L104 96 M31 74 H119" stroke="#a66c36" stroke-width="2.6" opacity="0.65"/>',
        '</svg>'
      ].join('\n');
    }

    if (kind === 'basket-orange') {
      var carrots = '';
      for (var j = 0; j < (count || 0); j++) {
        carrots += '<ellipse cx="' + (52 + j * 18) + '" cy="44" rx="11" ry="14" fill="#f5822a" stroke="#a34712" stroke-width="2.2"/>';
      }
      return [
        '<svg viewBox="0 0 150 115" xmlns="http://www.w3.org/2000/svg" aria-label="Havuç Sepeti">',
        '  <ellipse cx="75" cy="105" rx="54" ry="8" fill="#2a483a" opacity="0.22"/>',
        '  <path d="M40 44 C40 12, 110 12, 110 44" fill="none" stroke="#9e6637" stroke-width="7" stroke-linecap="round"/>',
        carrots,
        '  <path d="M22 46 H128 L114 96 C111 103, 39 103, 36 96 Z" fill="#dca45c" stroke="#8a5428" stroke-width="3.5" stroke-linejoin="round"/>',
        '  <rect x="18" y="40" width="114" height="14" rx="7" fill="#ecc07b" stroke="#8a5428" stroke-width="3.2"/>',
        '  <path d="M42 54 L46 96 M75 54 L75 98 M108 54 L104 96 M31 74 H119" stroke="#a66c36" stroke-width="2.6" opacity="0.65"/>',
        '</svg>'
      ].join('\n');
    }

    if (kind === 'plate') {
      var berries = '';
      for (var k = 0; k < (count || 0); k++) {
        berries += '<circle cx="' + (52 + k * 20) + '" cy="54" r="11" fill="#3c73d8" stroke="#183370" stroke-width="2.2"/>';
      }
      return [
        '<svg viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg" aria-label="Porselen Tabak">',
        '  <ellipse cx="75" cy="74" rx="60" ry="18" fill="#2a483a" opacity="0.2"/>',
        '  <ellipse cx="75" cy="62" rx="62" ry="22" fill="#fffdf7" stroke="#8cb6c4" stroke-width="3.5"/>',
        '  <ellipse cx="75" cy="60" rx="44" ry="13" fill="#edf7fb" stroke="#b6d6e0" stroke-width="2"/>',
        berries,
        '</svg>'
      ].join('\n');
    }

    // Grand Garden Lantern (Bahçe Feneri)
    var seeds = litSeeds || [];
    var hasRuby = seeds.indexOf('ruby') >= 0;
    var hasAmber = seeds.indexOf('amber') >= 0;
    var hasSapphire = seeds.indexOf('sapphire') >= 0;
    var hasGold = seeds.indexOf('gold') >= 0;
    var litCount = seeds.length;
    return [
      '<svg viewBox="0 0 150 175" xmlns="http://www.w3.org/2000/svg" aria-label="Bahçe Feneri">',
      '  <defs>',
      '    <radialGradient id="' + id + '-glow" cx="50%" cy="50%" r="50%">',
      '      <stop offset="0%" stop-color="#fff8b0" stop-opacity="' + (0.25 + litCount * 0.18) + '"/>',
      '      <stop offset="100%" stop-color="#ffd24d" stop-opacity="0"/>',
      '    </radialGradient>',
      '  </defs>',
      (litCount > 0 ? '<circle cx="75" cy="82" r="' + (48 + litCount * 7) + '" fill="url(#' + id + '-glow)"/>' : ''),
      '  <ellipse cx="75" cy="162" rx="46" ry="8" fill="#233b31" opacity="0.25"/>',
      '  <!-- Stone Pedestal -->',
      '  <path d="M46 156 L54 124 H96 L104 156 Z" fill="#9fb0ad" stroke="#536864" stroke-width="3.2" stroke-linejoin="round"/>',
      '  <!-- Lantern Glass Cage -->',
      '  <rect x="44" y="48" width="62" height="76" rx="12" fill="' + (litCount > 0 ? '#fff5be' : '#d5e4e2') + '" stroke="#4b5f5c" stroke-width="3.5"/>',
      '  <!-- 4 Seed Crystal Petals -->',
      '  <circle cx="62" cy="72" r="10" fill="' + (hasRuby ? '#ff5967' : '#b7c7c5') + '" stroke="#4b5f5c" stroke-width="2.2"/>',
      '  <circle cx="88" cy="72" r="10" fill="' + (hasAmber ? '#ffab38' : '#b7c7c5') + '" stroke="#4b5f5c" stroke-width="2.2"/>',
      '  <circle cx="62" cy="100" r="10" fill="' + (hasSapphire ? '#4c9aff' : '#b7c7c5') + '" stroke="#4b5f5c" stroke-width="2.2"/>',
      '  <circle cx="88" cy="100" r="10" fill="' + (hasGold ? '#ffe34d' : '#b7c7c5') + '" stroke="#4b5f5c" stroke-width="2.2"/>',
      '  <!-- Lantern Roof -->',
      '  <path d="M34 50 L75 18 L116 50 Z" fill="#5e7771" stroke="#394d49" stroke-width="3.4" stroke-linejoin="round"/>',
      '  <circle cx="75" cy="16" r="6" fill="#ffd966" stroke="#996b18" stroke-width="2.4"/>',
      '</svg>'
    ].join('\n');
  }

  function renderFinaleBadge() {
    return [
      '<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" aria-label="Bahçe Işığı Koruyucusu Rozeti">',
      '  <path d="M46 92 L36 130 L56 120 L66 134 L70 96 Z" fill="#e85d56" stroke="#9e2f29" stroke-width="2.5"/>',
      '  <path d="M94 92 L104 130 L84 120 L74 134 L70 96 Z" fill="#e85d56" stroke="#9e2f29" stroke-width="2.5"/>',
      '  <circle cx="70" cy="60" r="46" fill="#ffdf6e" stroke="#c48519" stroke-width="4"/>',
      '  <circle cx="70" cy="60" r="36" fill="#fff7d6" stroke="#e2a832" stroke-width="2.5"/>',
      '  <path d="M70 30 L78 48 L98 50 L83 63 L87 82 L70 72 L53 82 L57 63 L42 50 L62 48 Z" fill="#ffbe33" stroke="#b87612" stroke-width="2.5" stroke-linejoin="round"/>',
      '</svg>'
    ].join('\n');
  }

  window.MiloArt = {
    renderMilo: renderMilo,
    renderFriend: renderFriend,
    renderPortrait: renderPortrait,
    renderItem: renderItem,
    renderDropTarget: renderDropTarget,
    renderFinaleBadge: renderFinaleBadge
  };
})();
