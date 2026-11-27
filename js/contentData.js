(function () {
  'use strict';

  var CAST = {
    milo: {
      id: 'milo',
      name: 'Kaşif Milo',
      role: 'Cesur Bahçe Kaşifi',
      bio: 'Sarı atkısı, yeşil tulumu ve kırmızı sırt çantasıyla arkadaşlarına yardım etmeyi çok sever.'
    },
    nine: {
      id: 'nine',
      name: 'Nine Fındık',
      role: 'Bahçenin Bilge Koruyucusu',
      bio: 'Sıcak kurabiyeleri, bahçe feneri ve Şafak Çanı hikâyeleriyle herkesin kalbini ısıtır.'
    },
    pof: {
      id: 'pof',
      name: 'Kirpi Pof',
      role: 'Elma Bahçesi Ustası',
      bio: 'Kırmızı puantiyeli fularıyla elma toplamayı ve arkadaşlarına piknik hazırlamayı sever.'
    },
    mavis: {
      id: 'mavis',
      name: 'Kuş Maviş',
      role: 'Gökkuşağı Deresi Şarkıcısı',
      bio: 'Neşeli cıvıltılarıyla dere kıyısına ve ormana neşe saçar.'
    },
    lila: {
      id: 'lila',
      name: 'Ateş Böceği Lila',
      role: 'Işıklı Yol Gösterici',
      bio: 'Yumuşak ışığı ve kanatlarıyla karanlıkta Milo’ya hep güvenli yolu gösterir.'
    },
    sincap: {
      id: 'sincap',
      name: 'Sincap Pıtır',
      role: 'Ormanın Çevik İz Sürücüsü',
      bio: 'Fındık ve palamut izlerini takip eder, köprüleri kurmada arkadaşlarına yardım eder.'
    }
  };

  // Verified vocabulary dictionary covering all 67 English words across Story & English modes
  var VOCAB = {
    acorn: { en: 'acorn', tr: 'palamut', approx: 'ey-korn', cat: 'nature', tex: 'item-acorn' },
    apple: { en: 'apple', tr: 'elma', approx: 'ep-ıl', cat: 'fruit', tex: 'item-apple' },
    bag: { en: 'bag', tr: 'çanta', approx: 'beg', cat: 'object', tex: 'item-bag' },
    banana: { en: 'banana', tr: 'muz', approx: 'bı-na-na', cat: 'fruit', tex: 'item-banana' },
    basket: { en: 'basket', tr: 'sepet', approx: 'bes-kıt', cat: 'object', tex: 'item-basket' },
    bee: { en: 'bee', tr: 'arı', approx: 'bi', cat: 'animal', tex: 'item-bee' },
    bell: { en: 'bell', tr: 'çan', approx: 'bel', cat: 'object', tex: 'item-bell' },
    big: { en: 'big', tr: 'büyük', approx: 'big', cat: 'attribute', tex: 'item-big' },
    bird: { en: 'bird', tr: 'kuş', approx: 'börd', cat: 'animal', tex: 'item-bird' },
    blue: { en: 'blue', tr: 'mavi', approx: 'blu', cat: 'color', tex: 'item-blue' },
    blueberry: { en: 'blueberry', tr: 'yaban mersini', approx: 'blu-be-ri', cat: 'fruit', tex: 'item-blueberry' },
    book: { en: 'book', tr: 'kitap', approx: 'buk', cat: 'object', tex: 'item-book' },
    boot: { en: 'boot', tr: 'çizme', approx: 'but', cat: 'object', tex: 'item-boot' },
    box: { en: 'box', tr: 'kutu', approx: 'boks', cat: 'object', tex: 'item-box' },
    branch: { en: 'branch', tr: 'dal', approx: 'brenç', cat: 'nature', tex: 'item-branch' },
    bridge: { en: 'bridge', tr: 'köprü', approx: 'bric', cat: 'nature', tex: 'item-bridge' },
    bright: { en: 'bright', tr: 'parlak', approx: 'brayt', cat: 'attribute', tex: 'item-bright' },
    butterfly: { en: 'butterfly', tr: 'kelebek', approx: 'ba-tır-flay', cat: 'animal', tex: 'item-butterfly' },
    carrot: { en: 'carrot', tr: 'havuç', approx: 'ke-rıt', cat: 'fruit', tex: 'item-carrot' },
    cat: { en: 'cat', tr: 'kedi', approx: 'ket', cat: 'animal', tex: 'item-cat' },
    cloud: { en: 'cloud', tr: 'bulut', approx: 'klaud', cat: 'nature', tex: 'item-cloud' },
    cup: { en: 'cup', tr: 'fincan', approx: 'kap', cat: 'object', tex: 'item-cup' },
    dog: { en: 'dog', tr: 'köpek', approx: 'dog', cat: 'animal', tex: 'item-dog' },
    duck: { en: 'duck', tr: 'ördek', approx: 'dak', cat: 'animal', tex: 'item-duck' },
    feather: { en: 'feather', tr: 'tüy', approx: 'fe-dır', cat: 'nature', tex: 'item-feather' },
    flower: { en: 'flower', tr: 'çiçek', approx: 'fla-vır', cat: 'nature', tex: 'item-flower' },
    footprint: { en: 'footprint', tr: 'ayak izi', approx: 'fut-print', cat: 'nature', tex: 'item-footprint' },
    frog: { en: 'frog', tr: 'kurbağa', approx: 'frog', cat: 'animal', tex: 'item-frog' },
    grape: { en: 'grape', tr: 'üzüm', approx: 'greyp', cat: 'fruit', tex: 'item-grape' },
    green: { en: 'green', tr: 'yeşil', approx: 'grin', cat: 'color', tex: 'item-green' },
    hat: { en: 'hat', tr: 'şapka', approx: 'het', cat: 'object', tex: 'item-hat' },
    house: { en: 'house', tr: 'ev', approx: 'haus', cat: 'object', tex: 'item-house' },
    key: { en: 'key', tr: 'anahtar', approx: 'ki', cat: 'object', tex: 'item-key' },
    lantern: { en: 'lantern', tr: 'fener', approx: 'len-tırn', cat: 'object', tex: 'item-lantern' },
    leaf: { en: 'leaf', tr: 'yaprak', approx: 'lif', cat: 'nature', tex: 'item-leaf' },
    lemon: { en: 'lemon', tr: 'limon', approx: 'le-mın', cat: 'fruit', tex: 'item-lemon' },
    light: { en: 'light', tr: 'ışık', approx: 'layt', cat: 'nature', tex: 'item-light' },
    melon: { en: 'melon', tr: 'kavun', approx: 'me-lın', cat: 'fruit', tex: 'item-melon' },
    moon: { en: 'moon', tr: 'ay', approx: 'mun', cat: 'nature', tex: 'item-moon' },
    nut: { en: 'nut', tr: 'fındık', approx: 'nat', cat: 'nature', tex: 'item-nut' },
    orange: { en: 'orange', tr: 'portakal', approx: 'o-rınc', cat: 'fruit', tex: 'item-orange' },
    peach: { en: 'peach', tr: 'şeftali', approx: 'piç', cat: 'fruit', tex: 'item-peach' },
    pear: { en: 'pear', tr: 'armut', approx: 'per', cat: 'fruit', tex: 'item-pear' },
    pink: { en: 'pink', tr: 'pembe', approx: 'pink', cat: 'color', tex: 'item-pink' },
    pot: { en: 'pot', tr: 'saksı', approx: 'pot', cat: 'object', tex: 'item-pot' },
    potato: { en: 'potato', tr: 'patates', approx: 'po-tey-to', cat: 'fruit', tex: 'item-potato' },
    purple: { en: 'purple', tr: 'mor', approx: 'pör-pıl', cat: 'color', tex: 'item-purple' },
    red: { en: 'red', tr: 'kırmızı', approx: 'red', cat: 'color', tex: 'item-red' },
    rope: { en: 'rope', tr: 'ip', approx: 'rop', cat: 'object', tex: 'item-rope' },
    round: { en: 'round', tr: 'yuvarlak', approx: 'raund', cat: 'attribute', tex: 'item-round' },
    seed: { en: 'seed', tr: 'tohum', approx: 'sid', cat: 'nature', tex: 'item-seed' },
    small: { en: 'small', tr: 'küçük', approx: 'smol', cat: 'attribute', tex: 'item-small' },
    square: { en: 'square', tr: 'kare', approx: 'skver', cat: 'attribute', tex: 'item-square' },
    squirrel: { en: 'squirrel', tr: 'sincap', approx: 'skvi-rıl', cat: 'animal', tex: 'item-squirrel' },
    star: { en: 'star', tr: 'yıldız', approx: 'star', cat: 'nature', tex: 'item-star' },
    stone: { en: 'stone', tr: 'taş', approx: 'ston', cat: 'nature', tex: 'item-stone' },
    strawberry: { en: 'strawberry', tr: 'çilek', approx: 'stro-be-ri', cat: 'fruit', tex: 'item-strawberry' },
    sun: { en: 'sun', tr: 'güneş', approx: 'san', cat: 'nature', tex: 'item-sun' },
    tomato: { en: 'tomato', tr: 'domates', approx: 'to-mey-to', cat: 'fruit', tex: 'item-tomato' },
    tree: { en: 'tree', tr: 'ağaç', approx: 'tri', cat: 'nature', tex: 'item-tree' },
    triangle: { en: 'triangle', tr: 'üçgen', approx: 'tray-eng-gıl', cat: 'attribute', tex: 'item-triangle' },
    twig: { en: 'twig', tr: 'ince dal', approx: 'tvig', cat: 'nature', tex: 'item-twig' },
    umbrella: { en: 'umbrella', tr: 'şemsiye', approx: 'am-bre-la', cat: 'object', tex: 'item-umbrella' },
    water: { en: 'water', tr: 'su', approx: 'vo-tır', cat: 'nature', tex: 'item-water' },
    white: { en: 'white', tr: 'beyaz', approx: 'vayt', cat: 'color', tex: 'item-white' },
    wood: { en: 'wood', tr: 'odun', approx: 'vud', cat: 'nature', tex: 'item-wood' },
    yellow: { en: 'yellow', tr: 'sarı', approx: 'ye-lo', cat: 'color', tex: 'item-yellow' }
  };

  // Extra story overrides for contextual meanings (e.g. orange as color in S18)
  var STORY_TR_OVERRIDES = {
    'S18-2': { tr: 'turuncu', tex: 'item-orange-color' }
  };

  var REGIONS = {
    'Home Orchard': { id: 'orchard_act', titleTr: 'Ev Bahçesi', sceneId: 'orchard' },
    'Stream and Forest': { id: 'stream_act', titleTr: 'Dere ve Orman', sceneId: 'stream' },
    'Greenhouse and Twilight': { id: 'greenhouse_act', titleTr: 'Sera ve Alacakaranlık', sceneId: 'greenhouse' },
    'Reunion': { id: 'reunion_act', titleTr: 'Kavuşma ve Final', sceneId: 'finale' }
  };

  function friendIdFromName(name) {
    if (!name) return 'nine';
    var low = name.toLocaleLowerCase('tr-TR');
    if (low.indexOf('nine') >= 0) return 'nine';
    if (low.indexOf('pof') >= 0) return 'pof';
    if (low.indexOf('maviş') >= 0) return 'mavis';
    if (low.indexOf('lila') >= 0) return 'lila';
    if (low.indexOf('sincap') >= 0) return 'sincap';
    return 'milo';
  }

  function sceneForStory(ep) {
    var o = ep.order;
    if (o === 1) return 'square';
    if (o >= 2 && o <= 7) return 'orchard';
    if (o >= 8 && o <= 14) return (o === 11 || o === 12) ? 'forest' : 'stream';
    if (o >= 15 && o <= 21) return (o >= 20) ? 'twilight' : 'greenhouse';
    if (o >= 22 && o <= 27) return 'glade';
    return 'finale';
  }

  // Raw story episodes matching levels.json S01..S30 (each with 3 tasks = 90 tasks)
  // Plus rich connective narrative beats, friend need, obstacle, and world changes.
  var STORY_SEEDS = [
    ['S01', 'Fenerin sırrı', 'Nine Fındık', 'Home Orchard', 'easy',
      'Nine Fındık fenerin yanına eğilir; camı karanlıktır.',
      'Nine Fındık: “Milo, Bahçe Feneri söndü. Şafak Çanı ve fener için önce hazırlık yapalım.”',
      'Fenerin kapağı açılır ve ilk harita görünür.',
      ['lantern', 'fener'], ['basket', 'sepet'], ['key', 'anahtar'], 'lantern_open'],
    ['S02', 'Pof’un pikniği', 'Pof', 'Home Orchard', 'easy',
      'Kirpi Pof el arabasının yanında taze meyveleri bekler.',
      'Pof: “Milo, piknik sepetim boş kaldı! Bana taze meyveler bulur musun?”',
      'Pof’un piknik sepeti dolar ve ilk gülümseme başlar.',
      ['apple', 'elma'], ['pear', 'armut'], ['banana', 'muz'], 'basket_fill'],
    ['S03', 'Rüzgârlı elma ağacı', 'Pof', 'Home Orchard', 'easy',
      'Rüzgâr elma ağacının dallarını sallar, yapraklar uçuşur.',
      'Pof: “Rüzgâr dallardaki işaretleri sakladı. Ağacın altını birlikte toplayalım!”',
      'Daldaki ilk yol işareti ortaya çıkar.',
      ['leaf', 'yaprak'], ['apple', 'elma'], ['branch', 'dal'], 'sign_reveal'],
    ['S04', 'Sincabın sakladığı iz', 'sincap', 'Home Orchard', 'easy',
      'Sincap Pıtır bir ağacın dalından merakla başını uzatır.',
      'Sincap: “Ceviz ve palamut izlerimi karıştırdım. Doğru izleri toplarsak yolu gösteririm!”',
      'Sincap yolu açan tohumu paylaşır.',
      ['nut', 'fındık'], ['acorn', 'palamut'], ['seed', 'tohum'], 'squirrel_share'],
    ['S05', 'Çiçekli patika', 'Lila', 'Home Orchard', 'easy',
      'Ateş böceği Lila çiçek tarhının üzerinde yumuşakça parlar.',
      'Lila: “Patikadaki dostlar uyanınca çiçekli yol açılacak. Hadi onları bulalım!”',
      'Çiçekler patikanın yönünü gösterir.',
      ['flower', 'çiçek'], ['bee', 'arı'], ['butterfly', 'kelebek'], 'path_bloom'],
    ['S06', 'Bahçe kulübesi', 'Nine Fındık', 'Home Orchard', 'easy',
      'Kulübenin önünde Nine Fındık yolculuk çantasını hazırlar.',
      'Nine Fındık: “Dereye inmeden önce sağlam bir ip ve gereçler alalım.”',
      'Köprü için gerekli malzemeler hazırlanır.',
      ['cup', 'fincan'], ['hat', 'şapka'], ['rope', 'ip'], 'gear_ready'],
    ['S07', 'İlk ışık tohumu', 'Pof', 'Home Orchard', 'easy',
      'Pof’un elindeki küçük taş yuvası renkli bir ışık bekler.',
      'Pof: “Renk yuvalarını doğru eşleştirirsek Yakut Işık Tohumu parlayacak!”',
      'İlk ışık tohumu yanar.',
      ['red', 'kırmızı', 'match_attribute'], ['green', 'yeşil', 'match_attribute'], ['yellow', 'sarı', 'match_attribute'], 'seed_1_lit'],
    ['S08', 'Gökkuşağı deresi', 'Maviş', 'Stream and Forest', 'easy',
      'Maviş derenin kıyısında ıslanmış kanadını sallar.',
      'Maviş: “Cik cik! Derenin kıyısında taze bir mola ve taş geçişi lazım.”',
      'Dere kenarındaki geçiş belirir.',
      ['orange', 'portakal'], ['stone', 'taş'], ['water', 'su'], 'stream_edge'],
    ['S09', 'Taşların üzerinden', 'Maviş', 'Stream and Forest', 'easy',
      'Deredeki atlama taşlarının üzerinde şekil izleri vardır.',
      'Maviş: “Şekilleri doğru yuvalara yerleştir, taşlar sabitlensin!”',
      'İşaretli basamaklar güvenli yolu oluşturur.',
      ['round', 'yuvarlak', 'match_attribute'], ['square', 'kare', 'match_attribute'], ['triangle', 'üçgen', 'match_attribute'], 'stepping_stones'],
    ['S10', 'Küçük kuşun yuvası', 'Maviş', 'Stream and Forest', 'easy',
      'Maviş’in daldaki yuvası rüzgârdan biraz dağılmıştır.',
      'Maviş: “Yuvamı yumuşacık yapmak için dal, tüy ve yaprak toplar mısın?”',
      'Yuva tamamlanır ve Maviş kurur.',
      ['twig', 'ince dal'], ['feather', 'tüy'], ['leaf', 'yaprak'], 'nest_done'],
    ['S11', 'Ormanın sesi', 'Maviş', 'Stream and Forest', 'medium',
      'Orman kıyısından neşeli hayvan sesleri yankılanır.',
      'Maviş: “Orman arkadaşlarımızı dinle ve her birini selamla!”',
      'Orman arkadaşları yol gösterir.',
      ['bird', 'kuş'], ['frog', 'kurbağa'], ['duck', 'ördek'], 'forest_guides'],
    ['S12', 'Sincabın köprüsü', 'sincap', 'Stream and Forest', 'medium',
      'Sincap Pıtır dere üzerindeki yarım kalmış köprüye bakar.',
      'Sincap: “İp ve odunla köprüyü tamamlayalım, karşıya birlikte geçelim!”',
      'Sincap köprüyü geçer ve yolu açar.',
      ['rope', 'ip'], ['wood', 'odun'], ['nut', 'fındık'], 'bridge_open'],
    ['S13', 'Yağmurdan sonra', 'Milo', 'Stream and Forest', 'medium',
      'Hafif bir bahçe çisentisi patikayı ıslatmıştır.',
      'Milo: “Bulutlar çekilirken kuru kalmak için çizme ve şemsiyemizi bulalım!”',
      'Milo kuru patikayı bulur.',
      ['cloud', 'bulut'], ['boot', 'çizme'], ['umbrella', 'şemsiye'], 'dry_path'],
    ['S14', 'İkinci ışık tohumu', 'Maviş', 'Stream and Forest', 'medium',
      'Nilüfer yaprağının yanında ikinci ışık yuvası parlar.',
      'Maviş: “Mavi, beyaz ve mor ışık taşlarını yerleştirince Kehribar Tohumu uyanacak!”',
      'İkinci ışık tohumu yuvaya yerleşir.',
      ['blue', 'mavi', 'match_attribute'], ['white', 'beyaz', 'match_attribute'], ['purple', 'mor', 'match_attribute'], 'seed_2_lit'],
    ['S15', 'Sessiz sera', 'Nine Fındık', 'Greenhouse and Twilight', 'medium',
      'Cam seranın raflarında renkli yemiş sepetleri dizilidir.',
      'Nine Fındık: “Seradaki yemişleri adlarına göre sepetlere yerleştirelim.”',
      'Sera sepetleri doğru meyvelerle dolar.',
      ['blueberry', 'yaban mersini'], ['strawberry', 'çilek'], ['grape', 'üzüm'], 'greenhouse_baskets'],
    ['S16', 'Küçük bahçıvan', 'Pof', 'Greenhouse and Twilight', 'medium',
      'Pof bahçe yatağındaki taze sebzelere bakar.',
      'Pof: “Toprağın altından taze sebzeleri toplayıp hasat sepetine koyalım!”',
      'Sebze yatağı hasada hazır olur.',
      ['carrot', 'havuç'], ['tomato', 'domates'], ['potato', 'patates'], 'veggie_bed'],
    ['S17', 'Susayan fideler', 'Milo', 'Greenhouse and Twilight', 'medium',
      'Seradaki minik fideler biraz su bekler.',
      'Milo: “Fidelerin büyümesi için su, saksı ve yeni tohum getirelim.”',
      'Fideler sulanır ve yemyeşil filizlenir.',
      ['water', 'su'], ['pot', 'saksı'], ['seed', 'tohum'], 'sprouts_grow'],
    ['S18', 'Kelebeğin bahçesi', 'Lila', 'Greenhouse and Twilight', 'medium',
      'Kelebekler renkli çiçeklerin üzerinde süzülür.',
      'Lila: “Çiçeklerin renklerini sırayla eşleştir ki akşam patikası açılsın.”',
      'Renkli çiçek yolu açılır.',
      ['pink', 'pembe', 'match_attribute'], ['orange', 'turuncu', 'match_attribute'], ['yellow', 'sarı', 'match_attribute'], 'butterfly_path'],
    ['S19', 'Meyve şenliği', 'Pof', 'Greenhouse and Twilight', 'medium',
      'Pof şenlik masası için mis kokulu meyveler seçer.',
      'Pof: “Arkadaşlarımız için şeftali, limon ve kavun tepsisini dolduralım!”',
      'Şenlik için meyve tepsileri hazırlanır.',
      ['peach', 'şeftali'], ['lemon', 'limon'], ['melon', 'kavun'], 'fruit_feast'],
    ['S20', 'Gün batımı', 'Lila', 'Greenhouse and Twilight', 'medium',
      'Gökyüzü altın ve mor alacakaranlığa boyanır.',
      'Lila: “Güneş batarken ay ve yıldızlar beliriyor. Alacakaranlık işaretlerini toplayalım.”',
      'Alacakaranlık patikası görünür.',
      ['sun', 'güneş'], ['moon', 'ay'], ['star', 'yıldız'], 'twilight_road'],
    ['S21', 'Ateş böceği rehberi', 'Lila', 'Greenhouse and Twilight', 'hard',
      'Lila karanlık koruluğun girişinde yumuşakça süzülür.',
      'Lila: “Işığımı takip et! Çiçek ve yaprak işaretleriyle güvenli yolu bulalım.”',
      'Lila güvenli yolu aydınlatır.',
      ['light', 'ışık'], ['flower', 'çiçek'], ['leaf', 'yaprak'], 'lila_guides'],
    ['S22', 'Rüzgârın sakladığı tohum', 'Milo', 'Reunion', 'hard',
      'Rüzgâr son tohumun izini çalılıkların arasına savurmuştur.',
      'Milo: “Kutu, çanta ve Şafak Çanı’nın izini sürerek tohumu arayalım!”',
      'Kaybolan tohumun izi bulunur.',
      ['box', 'kutu'], ['bag', 'çanta'], ['bell', 'çan'], 'bell_clue'],
    ['S23', 'Sincabın cesareti', 'sincap', 'Reunion', 'hard',
      'Sincap Pıtır gölgeli dalın arkasından çekinerek bakar.',
      'Sincap: “Birlikte olunca korkum geçiyor! Palamut, dal ve iple bana destek olur musun?”',
      'Sincap saklandığı yerden çıkar ve yardım eder.',
      ['acorn', 'palamut'], ['branch', 'dal'], ['rope', 'ip'], 'squirrel_joins'],
    ['S24', 'Kayıp izlerin peşinde', 'Maviş', 'Reunion', 'hard',
      'Maviş yukarıdan çardağa doğru giden izleri görür.',
      'Maviş: “Ayak izi, taş ve tüy işaretlerini takip edelim, çardağa ulaşacağız!”',
      'İzler eski çardağa ulaşır.',
      ['footprint', 'ayak izi'], ['stone', 'taş'], ['feather', 'tüy'], 'gazebo_found'],
    ['S25', 'Üçüncü ışık tohumu', 'Lila', 'Reunion', 'hard',
      'Çardaktaki yosunların arasında parıltılı bir yuva bekler.',
      'Lila: “Küçük, büyük ve parlak işaretlerini eşleştirince son tohum görünecek!”',
      'Son ışık tohumu bulunur.',
      ['small', 'küçük', 'match_attribute'], ['big', 'büyük', 'match_attribute'], ['bright', 'parlak', 'match_attribute'], 'seed_3_lit'],
    ['S26', 'Eve dönüş yolu', 'Pof', 'Reunion', 'hard',
      'Tüm arkadaşlar tohumlarla birlikte köy meydanına yönelir.',
      'Pof: “Köprüden geçip ağaçların yanından Nine’nin evine gidelim!”',
      'Arkadaşlar eve giden yolu açar.',
      ['bridge', 'köprü'], ['tree', 'ağaç'], ['house', 'ev'], 'home_road'],
    ['S27', 'Dostların hediyeleri', 'Maviş', 'Reunion', 'hard',
      'Her arkadaş final kutlaması için küçük bir armağan taşır.',
      'Maviş: “Elma, çiçek ve fındığı kutlama sepetine birlikte koyalım!”',
      'Her arkadaş final için bir hediye bırakır.',
      ['apple', 'elma'], ['flower', 'çiçek'], ['nut', 'fındık'], 'gifts_ready'],
    ['S28', 'Fenerin üç yuvası', 'Nine Fındık', 'Reunion', 'hard',
      'Nine Fındık taş meydandaki Bahçe Feneri’nin yanındadır.',
      'Nine Fındık: “Üç ışık tohumunu fenerdeki renkli yuvalara sırayla yerleştirin!”',
      'Üç tohum doğru yuvalara yerleşir.',
      ['red', 'kırmızı', 'match_attribute'], ['blue', 'mavi', 'match_attribute'], ['green', 'yeşil', 'match_attribute'], 'lantern_slotted'],
    ['S29', 'Bahçenin ışıkları', 'Lila', 'Reunion', 'hard',
      'Fenerden yayılan ışık ağaçlara ve yıldızlara dokunur.',
      'Lila: “Fener, yıldız ve ışık pırıltılarını seç; tüm bahçe ışıldasın!”',
      'Bahçe ışıkları sırayla yanar ve Şafak Çanı çalar.',
      ['lantern', 'fener'], ['star', 'yıldız'], ['light', 'ışık'], 'garden_glows'],
    ['S30', 'Birlikte başardık', 'Milo', 'Reunion', 'hard',
      'Tüm bahçe altın ışıklarla dolu, arkadaşlar yan yana gülümser.',
      'Milo: “Bunu birlikte başardık! Son kutlama sepetini doldurup hikâye kitabımızı açalım!”',
      'Bahçe kutlaması başlar ve hikâye kitabı açılır.',
      ['basket', 'sepet'], ['apple', 'elma'], ['flower', 'çiçek'], 'finale_book']
  ];

  var STORY_LEVELS = STORY_SEEDS.map(function (s, idx) {
    var order = idx + 1;
    var id = s[0];
    var band = s[4];
    var defaultChoices = band === 'easy' ? 3 : (band === 'medium' ? 4 : 5);
    var regionInfo = REGIONS[s[3]] || REGIONS['Home Orchard'];
    var friendId = friendIdFromName(s[2]);
    var sceneId = sceneForStory({ order: order });
    var rawTasks = [s[8], s[9], s[10]];
    var tasks = rawTasks.map(function (t, tIdx) {
      var targetEn = t[0];
      var targetTr = t[1];
      var evaluator = t[2] || 'find_object';
      var taskId = id + '-' + (tIdx + 1);
      var ov = STORY_TR_OVERRIDES[taskId];
      var vocab = VOCAB[targetEn] || { en: targetEn, tr: targetTr, approx: targetEn, tex: 'item-' + targetEn };
      var displayTr = ov ? ov.tr : targetTr;
      var tex = ov ? ov.tex : vocab.tex;
      var dest = evaluator === 'match_attribute' ? 'matching_slot' : 'basket';
      return {
        id: taskId,
        targetId: 'ent_' + taskId + '_' + targetEn,
        targetEn: targetEn,
        targetTr: displayTr,
        approxTr: vocab.approx,
        tex: tex,
        evaluator: evaluator,
        englishAudioLocale: 'en-US',
        instructionTr: '“' + targetEn + '” (' + displayTr + ') kelimesini dinle ve uygun olanı seç.',
        spokenPromptTr: 'Haydi ' + displayTr + ' olanı bulalım.',
        hintTr: 'İpucu: ' + displayTr + ' olanı ara.',
        transferDestination: dest,
        successFeedbackTr: 'Doğru cevap',
        candidateCount: defaultChoices
      };
    });

    return {
      id: id,
      mode: 'story',
      order: order,
      titleTr: s[1],
      friend: s[2],
      friendId: friendId,
      region: s[3],
      regionTr: regionInfo.titleTr,
      sceneId: sceneId,
      difficultyBand: band,
      openingActionTr: s[5],
      dialogueIntroTr: s[6],
      outcomeTr: s[7],
      worldChange: s[11],
      nextWalkTr: order < 30 ? 'Milo yeni durağa doğru yürüyor...' : 'Tüm bahçe aydınlandı!',
      tasks: tasks,
      successFeedbackTr: 'Doğru cevap'
    };
  });

  // Counting levels (C01..C30) - Digits ONLY in UI
  var COUNTING_SEEDS = [
    ['C01', 'Elma — 1', 'collect_quantity', 1, 'elma', 'item-apple', 'Sepete 1 elma koy.', false, 'easy'],
    ['C02', 'Armut — 2', 'count_tap', 2, 'armut', 'item-pear', 'Armut nesnelerini say.', false, 'easy'],
    ['C03', 'Fındık — 3', 'collect_quantity', 3, 'fındık', 'item-nut', 'Sepete 3 fındık koy.', false, 'easy'],
    ['C04', 'Çiçek — 1', 'count_tap', 1, 'çiçek', 'item-flower', 'Çiçek nesnelerini say.', false, 'easy'],
    ['C05', 'Taş — 2', 'collect_quantity', 2, 'taş', 'item-stone', 'Sepete 2 taş koy.', false, 'easy'],
    ['C06', 'Yaprak — 3', 'count_tap', 3, 'yaprak', 'item-leaf', 'Yaprak nesnelerini say.', false, 'easy'],
    ['C07', 'Havuç — 1', 'order_digits', 1, 'havuç', 'item-carrot', '1 rakamını seç ve sırala.', false, 'easy'],
    ['C08', 'Çilek — 2', 'order_digits', 2, 'çilek', 'item-strawberry', '1–2 rakamlarını sırala.', false, 'easy'],
    ['C09', 'Üzüm — 3', 'compare_groups', 3, 'üzüm', 'item-grape', '3 tane olan grubu bul ve grupları karşılaştır.', false, 'easy'],
    ['C10', 'Palamut — 4', 'compare_groups', 4, 'palamut', 'item-acorn', '4 tane olan grubu bul ve grupları karşılaştır.', false, 'easy'],
    ['C11', 'Limon — 5', 'collect_quantity', 5, 'limon', 'item-lemon', 'Sepete 5 limon koy.', false, 'medium'],
    ['C12', 'Domates — 1', 'collect_quantity', 1, 'domates', 'item-tomato', 'Sepete 1 domates koy.', false, 'medium'],
    ['C13', 'Elma — 2', 'match_quantity', 2, 'elma', 'item-apple', '2 tane olan grubu bul.', false, 'medium'],
    ['C14', 'Armut — 3', 'match_quantity', 3, 'armut', 'item-pear', '3 tane olan grubu bul.', false, 'medium'],
    ['C15', 'Fındık — 4', 'count_tap', 4, 'fındık', 'item-nut', 'Fındık nesnelerini say.', false, 'medium'],
    ['C16', 'Çiçek — 4', 'count_tap', 4, 'çiçek', 'item-flower', 'Çiçek nesnelerini say.', false, 'medium'],
    ['C17', 'Taş — 5', 'order_digits', 5, 'taş', 'item-stone', '1–5 rakamlarını sırala.', false, 'medium'],
    ['C18', 'Yaprak — 6', 'order_digits', 6, 'yaprak', 'item-leaf', '1–6 rakamlarını sırala.', false, 'medium'],
    ['C19', 'Havuç — 7', 'compare_groups', 7, 'havuç', 'item-carrot', '7 tane olan grubu bul ve grupları karşılaştır.', false, 'medium'],
    ['C20', 'Çilek — 8', 'compare_groups', 8, 'çilek', 'item-strawberry', '8 tane olan grubu bul ve grupları karşılaştır.', false, 'medium'],
    ['C21', 'Üzüm — 9', 'collect_quantity', 9, 'üzüm', 'item-grape', 'Sepete 9 üzüm koy.', false, 'hard'],
    ['C22', 'Palamut — 10', 'collect_quantity', 10, 'palamut', 'item-acorn', 'Sepete 10 palamut koy.', false, 'hard'],
    ['C23', 'Limon — 4', 'match_quantity', 4, 'limon', 'item-lemon', '4 tane olan grubu bul.', false, 'hard'],
    ['C24', 'Domates — 5', 'match_quantity', 5, 'domates', 'item-tomato', '5 tane olan grubu bul.', false, 'hard'],
    ['C25', 'Elma — 6', 'count_tap', 6, 'elma', 'item-apple', 'Elma nesnelerini say.', false, 'hard'],
    ['C26', 'Armut — 11', 'count_tap', 11, 'armut', 'item-pear', 'Armut nesnelerini say.', true, 'hard'],
    ['C27', 'Fındık — 12', 'order_digits', 12, 'fındık', 'item-nut', '1–12 rakamlarını sırala.', true, 'hard'],
    ['C28', 'Çiçek — 13', 'order_digits', 13, 'çiçek', 'item-flower', '1–13 rakamlarını sırala.', true, 'hard'],
    ['C29', 'Taş — 14', 'compare_groups', 14, 'taş', 'item-stone', '14 tane olan grubu bul ve grupları karşılaştır.', true, 'hard'],
    ['C30', 'Yaprak — 15', 'compare_groups', 15, 'yaprak', 'item-leaf', '15 tane olan grubu bul ve grupları karşılaştır.', true, 'hard']
  ];

  var COUNTING_LEVELS = COUNTING_SEEDS.map(function (c, idx) {
    return {
      id: c[0],
      mode: 'counting',
      order: idx + 1,
      titleTr: c[1],
      evaluator: c[2],
      quantity: c[3],
      objectTr: c[4],
      tex: c[5],
      displayNumeralsOnly: true,
      instructionTr: c[6],
      hintTr: 'Her nesneye veya rakama sadece bir kez dokun.',
      optionalAdvanced: c[7],
      difficultyBand: c[8],
      sceneId: idx < 10 ? 'orchard' : (idx < 20 ? 'stream' : 'greenhouse'),
      successFeedbackTr: 'Doğru cevap'
    };
  });

  // Turkish Letter Forest (L01..L30) - Accurate I/ı vs İ/i and Ğ in ağaç
  var LETTER_SEEDS = [
    ['L01', 'A', 'a', 'arı', 'item-bee', 'recognize_letter', 'easy'],
    ['L02', 'B', 'b', 'balık', 'item-fish', 'recognize_letter', 'easy'],
    ['L03', 'C', 'c', 'ceviz', 'item-nut', 'recognize_letter', 'easy'],
    ['L04', 'Ç', 'ç', 'çiçek', 'item-flower', 'recognize_letter', 'easy'],
    ['L05', 'D', 'd', 'dal', 'item-branch', 'recognize_letter', 'easy'],
    ['L06', 'E', 'e', 'elma', 'item-apple', 'recognize_letter', 'easy'],
    ['L07', 'F', 'f', 'fener', 'item-lantern', 'recognize_letter', 'easy'],
    ['L08', 'G', 'g', 'güneş', 'item-sun', 'recognize_letter', 'easy'],
    ['L09', 'Ğ', 'ğ', 'ağaç', 'item-tree', 'recognize_in_word', 'easy'],
    ['L10', 'H', 'h', 'havuç', 'item-carrot', 'recognize_letter', 'easy'],
    ['L11', 'I', 'ı', 'ılık', 'item-sun', 'match_case', 'medium'],
    ['L12', 'İ', 'i', 'ip', 'item-rope', 'match_case', 'medium'],
    ['L13', 'J', 'j', 'jip', 'item-box', 'match_case', 'medium'],
    ['L14', 'K', 'k', 'kedi', 'item-cat', 'match_case', 'medium'],
    ['L15', 'L', 'l', 'limon', 'item-lemon', 'match_case', 'medium'],
    ['L16', 'M', 'm', 'masa', 'item-wood', 'match_case', 'medium'],
    ['L17', 'N', 'n', 'nar', 'item-strawberry', 'match_case', 'medium'],
    ['L18', 'O', 'o', 'orman', 'item-tree', 'match_case', 'medium'],
    ['L19', 'Ö', 'ö', 'ördek', 'item-duck', 'match_case', 'medium'],
    ['L20', 'P', 'p', 'portakal', 'item-orange', 'match_case', 'medium'],
    ['L21', 'R', 'r', 'renk', 'item-flower', 'picture_initial', 'hard'],
    ['L22', 'S', 's', 'sepet', 'item-basket', 'picture_initial', 'hard'],
    ['L23', 'Ş', 'ş', 'şapka', 'item-hat', 'picture_initial', 'hard'],
    ['L24', 'T', 't', 'taş', 'item-stone', 'picture_initial', 'hard'],
    ['L25', 'U', 'u', 'uçak', 'item-cloud', 'picture_initial', 'hard'],
    ['L26', 'Ü', 'ü', 'üzüm', 'item-grape', 'picture_initial', 'hard'],
    ['L27', 'V', 'v', 'vazo', 'item-pot', 'picture_initial', 'hard'],
    ['L28', 'Y', 'y', 'yaprak', 'item-leaf', 'picture_initial', 'hard'],
    ['L29', 'Z', 'z', 'zeytin', 'item-seed', 'picture_initial', 'hard']
  ];

  var LETTER_LEVELS = LETTER_SEEDS.map(function (l, idx) {
    var upper = l[1];
    var lower = l[2];
    var ex = l[3];
    var ev = l[5];
    var instr = ev === 'recognize_in_word'
      ? 'Ağaç kelimesindeki Ğ harfini bul.'
      : (ev === 'match_case'
        ? upper + ' harfinin küçük biçimini (' + lower + ') bul.'
        : (ev === 'picture_initial'
          ? upper + ' harfiyle başlayan görseli (' + ex + ') ve harfi bul.'
          : upper + ' harfini bul.'));
    var spoken = ev === 'recognize_in_word'
      ? 'Ağaç kelimesinin ortasındaki yumuşak g harfini bulalım.'
      : (upper + ' harfini bulalım. Örnek kelime: ' + ex + '.');
    return {
      id: l[0],
      mode: 'letters',
      order: idx + 1,
      titleTr: upper + ' / ' + lower,
      letter: upper,
      lowercase: lower,
      exampleTr: ex,
      exampleTex: l[4],
      evaluator: ev,
      instructionTr: instr,
      spokenPromptTr: spoken,
      hintTr: upper === 'Ğ' ? 'Ğ harfi “ağaç” kelimesinin ortasındadır.' : (upper + ' (' + lower + ') harfine dikkat et.'),
      locale: 'tr-TR',
      difficultyBand: l[6],
      sceneId: idx < 10 ? 'forest' : (idx < 20 ? 'orchard' : 'glade'),
      successFeedbackTr: 'Doğru cevap'
    };
  });

  LETTER_LEVELS.push({
    id: 'L30',
    mode: 'letters',
    order: 30,
    titleTr: 'Orman tabelası',
    letter: 'İ',
    lowercase: 'i',
    exampleTr: 'ip / ılık',
    exampleTex: 'item-rope',
    evaluator: 'match_case_review',
    letterPairs: ['I/ı', 'İ/i', 'Ç/ç', 'Ş/ş', 'Ö/ö', 'Ü/ü', 'Ğ/ğ'],
    instructionTr: 'Büyük ve küçük harfleri eşleştir.',
    spokenPromptTr: 'Orman tabelasını tamamlamak için büyük ve küçük harfleri eşleştirelim.',
    hintTr: 'I ile ı, İ ile i eşleşir; noktalara dikkat et!',
    locale: 'tr-TR',
    difficultyBand: 'hard',
    sceneId: 'forest',
    successFeedbackTr: 'Doğru cevap'
  });

  // English Vocabulary Garden (E01..E30)
  var ENGLISH_ORDER = [
    ['E01', 'Elma', 'apple', 'elma', 'listen_match', 3, 'easy'],
    ['E02', 'Armut', 'pear', 'armut', 'listen_match', 3, 'easy'],
    ['E03', 'Muz', 'banana', 'muz', 'listen_match', 3, 'easy'],
    ['E04', 'Portakal', 'orange', 'portakal', 'listen_match', 3, 'easy'],
    ['E05', 'Çilek', 'strawberry', 'çilek', 'listen_match', 3, 'easy'],
    ['E06', 'Yaban mersini', 'blueberry', 'yaban mersini', 'listen_match', 3, 'easy'],
    ['E07', 'Üzüm', 'grape', 'üzüm', 'listen_match', 3, 'easy'],
    ['E08', 'Limon', 'lemon', 'limon', 'listen_match', 3, 'easy'],
    ['E09', 'Şeftali', 'peach', 'şeftali', 'listen_match', 3, 'easy'],
    ['E10', 'Kavun', 'melon', 'kavun', 'listen_match', 3, 'easy'],
    ['E11', 'Kedi', 'cat', 'kedi', 'listen_find', 4, 'medium'],
    ['E12', 'Köpek', 'dog', 'köpek', 'listen_find', 4, 'medium'],
    ['E13', 'Kuş', 'bird', 'kuş', 'listen_find', 4, 'medium'],
    ['E14', 'Ördek', 'duck', 'ördek', 'listen_find', 4, 'medium'],
    ['E15', 'Kurbağa', 'frog', 'kurbağa', 'listen_find', 4, 'medium'],
    ['E16', 'Kelebek', 'butterfly', 'kelebek', 'listen_find', 4, 'medium'],
    ['E17', 'Arı', 'bee', 'arı', 'listen_find', 4, 'medium'],
    ['E18', 'Sincap', 'squirrel', 'sincap', 'listen_find', 4, 'medium'],
    ['E19', 'Kırmızı', 'red', 'kırmızı', 'listen_find', 4, 'medium'],
    ['E20', 'Mavi', 'blue', 'mavi', 'listen_find', 4, 'medium'],
    ['E21', 'Yeşil', 'green', 'yeşil', 'recall_match', 5, 'hard'],
    ['E22', 'Sarı', 'yellow', 'sarı', 'recall_match', 5, 'hard'],
    ['E23', 'Pembe', 'pink', 'pembe', 'recall_match', 5, 'hard'],
    ['E24', 'Mor', 'purple', 'mor', 'recall_match', 5, 'hard'],
    ['E25', 'Sepet', 'basket', 'sepet', 'recall_match', 5, 'hard'],
    ['E26', 'Şapka', 'hat', 'şapka', 'recall_match', 5, 'hard'],
    ['E27', 'Kitap', 'book', 'kitap', 'recall_match', 5, 'hard'],
    ['E28', 'Fincan', 'cup', 'fincan', 'recall_match', 5, 'hard'],
    ['E29', 'Anahtar', 'key', 'anahtar', 'recall_match', 5, 'hard'],
    ['E30', 'Fener', 'lantern', 'fener', 'recall_match', 5, 'hard']
  ];

  var ENGLISH_LEVELS = ENGLISH_ORDER.map(function (e, idx) {
    var v = VOCAB[e[2]] || { en: e[2], tr: e[3], approx: e[2], tex: 'item-' + e[2] };
    return {
      id: e[0],
      mode: 'english',
      order: idx + 1,
      titleTr: e[1],
      targetEn: e[2],
      targetTr: e[3],
      approxTr: v.approx,
      tex: v.tex,
      locale: 'en-US',
      evaluator: e[4],
      instructionTr: 'İngilizce kelimeyi dinle ve uygun görseli seç.',
      spokenPromptTr: 'İngilizce kelimeyi dinle ve uygun görseli seç.',
      hintTr: 'Anlamı: ' + e[3] + ' (yaklaşık okunuş: ' + v.approx + ')',
      spokenHintTr: 'İpucu: ' + e[3] + ' olanı ara.',
      candidateCount: e[5],
      slowReplay: true,
      difficultyBand: e[6],
      sceneId: idx < 10 ? 'greenhouse' : (idx < 20 ? 'stream' : 'square'),
      successFeedbackTr: 'Doğru cevap'
    };
  });

  // Firefly Listening & Attention (F01..F30)
  var FIREFLY_EVALS = ['track_firefly', 'match_pulse_count', 'follow_path', 'repeat_pattern', 'match_flower'];
  var FIREFLY_LEVELS = [];
  for (var fi = 1; fi <= 30; fi++) {
    var fId = 'F' + (fi < 10 ? '0' + fi : fi);
    var evType = FIREFLY_EVALS[(fi - 1) % 5];
    var fBand = fi <= 10 ? 'easy' : (fi <= 20 ? 'medium' : 'hard');
    var visCount = fi <= 10 ? 2 : (fi <= 20 ? 3 : 4);
    var pulseCount = fi <= 10 ? 1 : (fi <= 20 ? 2 : 3);
    var pattern = fi <= 5 ? [1] : (fi <= 10 ? [2] : (fi <= 15 ? [1, 2] : (fi <= 20 ? [2, 1] : (fi <= 25 ? [1, 1, 2] : [2, 1, 2]))));
    var titlePrefix = evType === 'track_firefly' ? 'Lila’nın yolu '
      : evType === 'match_pulse_count' ? 'Işık sayısı '
      : evType === 'follow_path' ? 'Çiçek patikası '
      : evType === 'repeat_pattern' ? 'Işık dizisi '
      : 'Çiçek rehberi ';
    var instrText = evType === 'track_firefly' ? 'Lila’yı takip et ve durunca dokun.'
      : evType === 'match_pulse_count' ? (pulseCount + ' kez ışık veren ateş böceğini bul.')
      : evType === 'follow_path' ? 'Lila’nın izlediği yolu seç.'
      : evType === 'repeat_pattern' ? 'Işık dizisini aynı sırada tekrar et.'
      : 'Lila’nın konduğu çiçeği bul.';

    FIREFLY_LEVELS.push({
      id: fId,
      mode: 'firefly',
      order: fi,
      titleTr: titlePrefix + (fi < 10 ? '0' + fi : fi),
      evaluator: evType,
      visibleFireflies: visCount,
      pulseCount: pulseCount,
      pattern: pattern,
      flowerCount: visCount,
      instructionTr: instrText,
      hintTr: 'Işık gösterisini yeniden izle ve görsel işaretlere bak.',
      minPulseIntervalMs: 1000,
      noRapidFlash: true,
      difficultyBand: fBand,
      sceneId: fi <= 15 ? 'twilight' : 'glade',
      successFeedbackTr: 'Doğru cevap'
    });
  }

  // Audio & Asset Manifests with explicit provenance and license
  var AUDIO_MANIFEST = {
    schemaVersion: 1,
    defaultTurkishLocale: 'tr-TR',
    defaultTurkishVoicePreference: 'female',
    defaultEnglishLocale: 'en-US',
    clips: {
      feedback_correct: {
        id: 'feedback_correct',
        locale: 'tr-TR',
        text: 'Doğru cevap',
        expectedDurationMs: 1100,
        visemes: ['D', 'O', 'rest', 'U', 'A', 'rest'],
        source: 'speechSynthesis-tr-TR-female',
        license: 'Local browser speech / procedural Web Audio fallback'
      }
    }
  };

  Object.keys(VOCAB).forEach(function (key) {
    AUDIO_MANIFEST.clips['en_' + key] = {
      id: 'en_' + key,
      locale: 'en-US',
      text: VOCAB[key].en,
      expectedDurationMs: 900,
      source: 'speechSynthesis-en-US',
      license: 'Local browser speech / offline dictionary fallback'
    };
  });

  var ASSET_MANIFEST = {
    schemaVersion: 1,
    renderer: 'Phaser 4.2.1 (2D WebGL/Canvas skeletal container rigs) + GSAP 3.15.1 (UI cinematics)',
    licenseSummary: 'All character rigs, item artwork, backdrops, and procedural Web Audio SFX are authored in-repo (original project code/canvas art). Vendor Phaser 4 (MIT) and GSAP 3 (Standard No-Charge License) are bundled locally in vendor/.',
    assets: [
      { id: 'rig-milo', kind: '2d-skeletal-rig', relativePath: 'js/rigSystem.js', license: 'Original project asset', attribution: 'Milo’s English Garden' },
      { id: 'rig-sincap', kind: '2d-skeletal-rig', relativePath: 'js/rigSystem.js', license: 'Original project asset', attribution: 'Milo’s English Garden' },
      { id: 'rig-lila', kind: '2d-skeletal-rig', relativePath: 'js/rigSystem.js', license: 'Original project asset', attribution: 'Milo’s English Garden' },
      { id: 'rig-pof', kind: '2d-skeletal-rig', relativePath: 'js/rigSystem.js', license: 'Original project asset', attribution: 'Milo’s English Garden' },
      { id: 'rig-mavis', kind: '2d-skeletal-rig', relativePath: 'js/rigSystem.js', license: 'Original project asset', attribution: 'Milo’s English Garden' },
      { id: 'rig-nine', kind: '2d-skeletal-rig', relativePath: 'js/rigSystem.js', license: 'Original project asset', attribution: 'Milo’s English Garden' },
      { id: 'item-atlas', kind: 'procedural-canvas-textures', relativePath: 'js/spriteFactory.js', license: 'Original project asset', attribution: 'Milo’s English Garden' },
      { id: 'phaser', kind: 'vendor-runtime', relativePath: 'vendor/phaser.min.js', license: 'MIT', attribution: 'Phaser Studio' },
      { id: 'gsap', kind: 'vendor-runtime', relativePath: 'vendor/gsap.min.js', license: 'GSAP Standard License', attribution: 'GreenSock' }
    ]
  };

  function getLevelsByMode(mode) {
    if (mode === 'story') return STORY_LEVELS;
    if (mode === 'counting') return COUNTING_LEVELS;
    if (mode === 'letters') return LETTER_LEVELS;
    if (mode === 'english') return ENGLISH_LEVELS;
    if (mode === 'firefly') return FIREFLY_LEVELS;
    return [];
  }

  function getAllLevels() {
    return STORY_LEVELS.concat(COUNTING_LEVELS, LETTER_LEVELS, ENGLISH_LEVELS, FIREFLY_LEVELS);
  }

  // Deterministic content schema validator (G02)
  function validateAllContent() {
    var errors = [];
    var modes = ['story', 'counting', 'letters', 'english', 'firefly'];
    var seenIds = {};
    var storyTaskCount = 0;

    modes.forEach(function (mode) {
      var list = getLevelsByMode(mode);
      if (list.length !== 30) {
        errors.push('Mode ' + mode + ' has ' + list.length + ' levels (expected 30)');
      }
      list.forEach(function (lvl, idx) {
        if (!lvl.id || seenIds[lvl.id]) errors.push('Duplicate or missing level id: ' + lvl.id);
        seenIds[lvl.id] = true;
        if (lvl.order !== idx + 1) errors.push('Invalid order in ' + lvl.id);
        if (lvl.successFeedbackTr !== 'Doğru cevap') errors.push('Invalid feedback in ' + lvl.id);

        if (mode === 'story') {
          if (!Array.isArray(lvl.tasks) || lvl.tasks.length !== 3) {
            errors.push('Story episode ' + lvl.id + ' must have 3 tasks');
          } else {
            lvl.tasks.forEach(function (t) {
              storyTaskCount += 1;
              if (!t.id || !t.targetId || !t.targetEn || !t.targetTr) {
                errors.push('Missing fields in task ' + t.id);
              }
              if (t.successFeedbackTr !== 'Doğru cevap') {
                errors.push('Task feedback mismatch in ' + t.id);
              }
              if (!VOCAB[t.targetEn]) {
                errors.push('Missing VOCAB entry for ' + t.targetEn);
              }
            });
          }
        }
        if (mode === 'counting') {
          if (!lvl.displayNumeralsOnly) errors.push('Counting level ' + lvl.id + ' must use digits only');
          if (typeof lvl.quantity !== 'number' || lvl.quantity < 1 || lvl.quantity > 15) {
            errors.push('Invalid quantity in ' + lvl.id);
          }
        }
        if (mode === 'letters') {
          if (lvl.letter === 'Ğ' && lvl.evaluator !== 'recognize_in_word') {
            errors.push('Ğ must not have fabricated independent onset');
          }
        }
        if (mode === 'english') {
          if (!VOCAB[lvl.targetEn]) errors.push('Missing English vocab: ' + lvl.targetEn);
          if (lvl.locale !== 'en-US') errors.push('English level must use en-US locale: ' + lvl.id);
        }
        if (mode === 'firefly') {
          if (!lvl.noRapidFlash || lvl.minPulseIntervalMs < 1000) {
            errors.push('Firefly rapid flash violation in ' + lvl.id);
          }
        }
      });
    });

    if (storyTaskCount !== 90) {
      errors.push('Expected 90 story tasks, got ' + storyTaskCount);
    }

    return {
      ok: errors.length === 0,
      errors: errors,
      counts: {
        story: STORY_LEVELS.length,
        storyTasks: storyTaskCount,
        counting: COUNTING_LEVELS.length,
        letters: LETTER_LEVELS.length,
        english: ENGLISH_LEVELS.length,
        firefly: FIREFLY_LEVELS.length,
        total: getAllLevels().length
      }
    };
  }

  window.MiloContent = {
    CAST: CAST,
    VOCAB: VOCAB,
    REGIONS: REGIONS,
    STORY_LEVELS: STORY_LEVELS,
    COUNTING_LEVELS: COUNTING_LEVELS,
    LETTER_LEVELS: LETTER_LEVELS,
    ENGLISH_LEVELS: ENGLISH_LEVELS,
    FIREFLY_LEVELS: FIREFLY_LEVELS,
    AUDIO_MANIFEST: AUDIO_MANIFEST,
    ASSET_MANIFEST: ASSET_MANIFEST,
    getLevelsByMode: getLevelsByMode,
    getAllLevels: getAllLevels,
    validateAllContent: validateAllContent
  };
})();
