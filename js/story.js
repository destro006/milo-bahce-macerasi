(function () {
  'use strict';

  var CAST = {
    milo: {
      id: 'milo',
      name: 'Kaşif Milo',
      role: 'Cesur Bahçe Kaşifi',
      bio: 'Sarı atkısı ve yıldızlı tulumuyla arkadaşlarına yardım etmeyi çok sever.'
    },
    nine: {
      id: 'nine',
      name: 'Nine Fındık',
      role: 'Bahçenin Bilge Koruyucusu',
      bio: 'Sıcak kurabiyeleri ve bahçe fenerinin hikayeleriyle herkesin kalbini ısıtır.'
    },
    pof: {
      id: 'pof',
      name: 'Kirpi Pof',
      role: 'Meyve Bahçesi Ustası',
      bio: 'Kırmızı puantiyeli fularıyla elma toplamayı ve arkadaşlarına ikram etmeyi sever.'
    },
    mavis: {
      id: 'mavis',
      name: 'Kuş Maviş',
      role: 'Gökkuşağı Deresi Şarkıcısı',
      bio: 'Neşeli cıvıltılarıyla dere kıyısına neşe saçar.'
    },
    lila: {
      id: 'lila',
      name: 'Ateş Böceği Lila',
      role: 'Işıklı Yol Gösterici',
      bio: 'Karanlıkta parlayan kanatlarıyla Milo’ya hep yol gösterir.'
    }
  };

  var WORDS = [
    { key: 'light', en: 'light', tr: 'ışık', itemSvg: 'seed-gold', hintTR: 'Bahçeyi aydınlatan parlak ışık', chapterIndex: 0 },
    { key: 'apple', en: 'apple', tr: 'elma', itemSvg: 'apple-red', hintTR: 'Kıtır kıtır kırmızı elma', chapterIndex: 1 },
    { key: 'red', en: 'red', tr: 'kırmızı', itemSvg: 'apple-red', hintTR: 'Elmaların parlak kırmızı rengi', chapterIndex: 1 },
    { key: 'orange', en: 'orange', tr: 'turuncu', itemSvg: 'carrot', hintTR: 'Havuçların neşeli turuncu rengi', chapterIndex: 2 },
    { key: 'carrot', en: 'carrot', tr: 'havuç', itemSvg: 'carrot', hintTR: 'Maviş’in sevdiği turuncu havuç', chapterIndex: 2 },
    { key: 'blueberry', en: 'blueberry', tr: 'yaban mersini', itemSvg: 'blueberry', hintTR: 'Seradaki minik mavi yemişler', chapterIndex: 3 },
    { key: 'blue', en: 'blue', tr: 'mavi', itemSvg: 'blueberry', hintTR: 'Yaban mersininin mavi rengi', chapterIndex: 3 },
    { key: 'star', en: 'star', tr: 'yıldız', itemSvg: 'backpack-badge', hintTR: 'Gece gökyüzünde parlayan yıldız', chapterIndex: 4 },
    { key: 'friend', en: 'friend', tr: 'arkadaş', itemSvg: 'seed-ruby', hintTR: 'Zor anlarda el ele veren dost', chapterIndex: 4 }
  ];

  var CHAPTERS = [
    {
      id: 'square',
      title: 'Kayıp Işıkların Sırrı',
      sceneId: 'square',
      friendId: 'nine',
      steps: [
        {
          kind: 'tap-target',
          speaker: 'nine',
          miloMood: 'curious',
          dialog: 'Nine Fındık: “Milo’cuğum, Bahçe Feneri’nin dört ışık tohumu kaybolmuş! Hava kararmadan onları bulabilir misin?”',
          task: 'Fenerin içinde uyuyan ateş böceği Lila’yı uyandırmak için fenerine dokun!',
          dropTarget: 'lantern',
          unlockWords: [],
          doneDialog: 'Tık tık! Fenerin içinden minik bir ışık kıvılcımı süzüldü ve Lila uyandı!',
          autoAdvance: true
        },
        {
          kind: 'tap-items',
          speaker: 'lila',
          miloMood: 'happy',
          dialog: 'Lila: “Merhaba Milo! Ben ışıkların izini biliyorum. Hazırsan Kaşif Yıldızı’na dokun, yola çıkalım!”',
          task: 'Yolculuğu başlatmak için parlak Kaşif Yıldızı’na dokun.',
          wordKey: 'light',
          unlockWords: ['light'],
          need: 1,
          items: [
            { svg: 'backpack-badge', label: 'Kaşif Yıldızı', good: true }
          ],
          doneDialog: 'Harika! Milo çantasını taktı, Lila öne düştü. İlk durak: Elma Ağacı Tepesi!',
          nextLabel: 'Bahçeye Çıkalım →'
        }
      ]
    },
    {
      id: 'orchard',
      title: 'Elma Ağacı Tepesi',
      sceneId: 'orchard',
      friendId: 'pof',
      seedId: 'ruby',
      steps: [
        {
          kind: 'clear-leaves',
          speaker: 'pof',
          miloMood: 'curious',
          dialog: 'Kirpi Pof: “Of ya! Sonbahar yaprakları el arabamın önüne dolmuş, hareket edemiyorum!”',
          task: 'Pof’un yolunu açmak için 3 yaprağa dokunup kenara süpür.',
          need: 3,
          items: [
            { svg: 'leaf', label: 'Yaprak', good: true },
            { svg: 'leaf', label: 'Yaprak', good: true },
            { svg: 'leaf', label: 'Yaprak', good: true }
          ],
          doneDialog: 'Hışırt! Yapraklar uçuştu ve Pof’un yolu açıldı. Şimdi sepeti doldurma zamanı!',
          autoAdvance: true
        },
        {
          kind: 'collect',
          speaker: 'milo',
          miloMood: 'smile',
          dialog: 'Milo: “Pof’un sepeti için sadece kırmızı elmaları toplayalım! Haydi sepete dokunarak veya sürükleyerek koy.”',
          task: '3 kırmızı elmayı (apple) sepete koy.',
          dropTarget: 'basket',
          wordKey: 'apple',
          unlockWords: ['apple', 'red'],
          need: 3,
          items: [
            { svg: 'apple-red', label: 'red apple', good: true },
            { svg: 'apple-green', label: 'green apple', good: false, wrongMsg: 'Hihi, bu yeşil elma! Biz kırmızı olanları arıyoruz.' },
            { svg: 'apple-red', label: 'red apple', good: true },
            { svg: 'pinecone', label: 'kozalak', good: false, wrongMsg: 'Bu sevimli bir kozalak! Kırmızı elmaları seçelim.' },
            { svg: 'apple-red', label: 'red apple', good: true }
          ],
          doneDialog: 'Sepet kıpkırmızı elmalarla doldu! Bak, sepetin altında parlayan bir şey var!',
          autoAdvance: true
        },
        {
          kind: 'claim-seed',
          speaker: 'pof',
          miloMood: 'happy',
          dialog: 'Pof: “İşte ilk ışık tohumu! Yakut Işık Tohumu’nu kavanozuna eklemek için üzerine dokun!”',
          task: 'Yakut Işık Tohumu’na dokunarak kavanoza al.',
          seedId: 'ruby',
          need: 1,
          items: [
            { svg: 'seed-ruby', label: 'Yakut Tohumu', good: true, isSeed: true }
          ],
          doneDialog: 'Yaşasın! Birinci ışık tohumu parlıyor! Şimdi Gökkuşağı Deresi’ne doğru yürüyelim.',
          nextLabel: 'Dereye Gidelim →'
        }
      ]
    },
    {
      id: 'stream',
      title: 'Gökkuşağı Deresi',
      sceneId: 'stream',
      friendId: 'mavis',
      friendWet: true,
      seedId: 'amber',
      steps: [
        {
          kind: 'ordered-tap',
          speaker: 'mavis',
          miloMood: 'curious',
          dialog: 'Maviş: “Cik cik! Kanadım suya değdi, karşıya uçamıyorum! Taşları sırayla dizip köprü kurar mısın?”',
          task: 'Dere köprüsü kurmak için taşlara sırayla dokun: 1 → 2 → 3',
          need: 3,
          items: [
            { svg: 'stone-2', label: '2. Taş', order: 2 },
            { svg: 'stone-1', label: '1. Taş', order: 1 },
            { svg: 'stone-3', label: '3. Taş', order: 3 }
          ],
          doneDialog: 'Ding-dong! Üç taş sırayla dizildi ve Milo neşeyle derenin kenarına geçti!',
          autoAdvance: true
        },
        {
          kind: 'collect',
          speaker: 'milo',
          miloMood: 'smile',
          dialog: 'Milo: “Maviş’in enerji toplaması için turuncu havuçları sepete koyalım!”',
          task: '3 turuncu havucu (orange carrot) sepete taşı.',
          dropTarget: 'basket-orange',
          wordKey: 'orange',
          unlockWords: ['orange', 'carrot'],
          need: 3,
          items: [
            { svg: 'carrot', label: 'orange', good: true },
            { svg: 'yellow-flower', label: 'çiçek', good: false, wrongMsg: 'Bu sarı bir papatya! Turuncu havucu bulalım.' },
            { svg: 'carrot', label: 'orange', good: true },
            { svg: 'pebble', label: 'çakıl', good: false, wrongMsg: 'Bu pürüzsüz bir çakıl taşı. Havuçları seçelim!' },
            { svg: 'carrot', label: 'orange', good: true }
          ],
          doneDialog: 'Maviş kanadını sallayıp kuruttu ve nilüferin altında parlayan tohumu gördü!',
          autoAdvance: true
        },
        {
          kind: 'claim-seed',
          speaker: 'mavis',
          miloMood: 'happy',
          dialog: 'Maviş: “Cik cik! Kehribar Işık Tohumu’nu bulduk! Kavanoza almak için dokun!”',
          task: 'Kehribar Işık Tohumu’nu kavanozuna ekle.',
          seedId: 'amber',
          need: 1,
          items: [
            { svg: 'seed-amber', label: 'Kehribar Tohumu', good: true, isSeed: true }
          ],
          doneDialog: 'Harika! İki ışık tohumu tamam! Sırada Cam Sera var.',
          nextLabel: 'Seraya Gidelim →'
        }
      ]
    },
    {
      id: 'greenhouse',
      title: 'Buğulu Cam Sera',
      sceneId: 'greenhouse',
      friendId: 'lila',
      seedId: 'sapphire',
      steps: [
        {
          kind: 'wipe-fog',
          speaker: 'milo',
          miloMood: 'surprised',
          dialog: 'Milo: “Cam sera buğulanmış! İçerideki yemişleri görmek için camı birlikte silelim!”',
          task: 'Parmağınla veya farenle buğulu camı sil.',
          doneDialog: 'Pırıl pırıl oldu! Bak, masmavi yemişler bizi bekliyormuş!',
          autoAdvance: true
        },
        {
          kind: 'collect',
          speaker: 'lila',
          miloMood: 'smile',
          dialog: 'Lila: “Şimdi kulaklarını aç! ‘Blueberry’ kelimesini dinle ve sadece mavi yemişleri tabağa koy.”',
          task: '3 mavi yaban mersinini (blueberry) porselen tabağa koy.',
          dropTarget: 'plate',
          wordKey: 'blueberry',
          unlockWords: ['blueberry', 'blue'],
          need: 3,
          items: [
            { svg: 'blueberry', label: 'blueberry', good: true },
            { svg: 'purple-grape', label: 'üzüm', good: false, wrongMsg: 'Bu mor üzüm! Biz mavi yaban mersini (blueberry) arıyoruz.' },
            { svg: 'blueberry', label: 'blueberry', good: true },
            { svg: 'pink-blossom', label: 'çiçek', good: false, wrongMsg: 'Bu pembe bir çiçek! Mavi taneleri seçelim.' },
            { svg: 'blueberry', label: 'blueberry', good: true }
          ],
          doneDialog: 'Tabak mavi yemişlerle doldu! Eğrelti otlarının arkasında mavi bir ışıltı belirdi!',
          autoAdvance: true
        },
        {
          kind: 'claim-seed',
          speaker: 'lila',
          miloMood: 'happy',
          dialog: 'Lila: “İşte Safir Işık Tohumu! Üçüncü tohumu da kavanoza ekleyelim!”',
          task: 'Safir Işık Tohumu’na dokunarak kavanoza al.',
          seedId: 'sapphire',
          need: 1,
          items: [
            { svg: 'seed-sapphire', label: 'Safir Tohumu', good: true, isSeed: true }
          ],
          doneDialog: 'Muhteşem! Üç tohum tamam! Son tohum için Yıldızlı Çalılık’a gidiyoruz.',
          nextLabel: 'Çalılığa Gidelim →'
        }
      ]
    },
    {
      id: 'glade',
      title: 'Yıldızlı Çalılık',
      sceneId: 'glade',
      friendId: 'lila',
      extraFriends: ['pof', 'mavis'],
      seedId: 'gold',
      steps: [
        {
          kind: 'teamwork',
          speaker: 'milo',
          miloMood: 'curious',
          dialog: 'Milo: “Hava iyice karardı, son tohumu tek başıma bulmak zor... Ama arkadaşlarım yanımda!”',
          task: 'Birlikte aramak için her arkadaşına (Pof, Maviş, Lila) dokun!',
          wordKey: 'friend',
          unlockWords: ['friend'],
          need: 3,
          items: [
            { friendSvg: 'pof', label: 'Kirpi Pof', msg: 'Pof burnunu çekti: “Burada tatlı bir ışık kokusu var!”' },
            { friendSvg: 'mavis', label: 'Kuş Maviş', msg: 'Maviş daldan baktı: “Üç ışıklı mantar görüyorum!”' },
            { friendSvg: 'lila', label: 'Lila', msg: 'Lila parladı: “Mantarların şarkısını çalarsak tohum uyanır!”' }
          ],
          doneDialog: 'El ele verince her şey kolay! Şimdi mantarların neşeli melodisini çalalım!',
          autoAdvance: true
        },
        {
          kind: 'melody-echo',
          speaker: 'lila',
          miloMood: 'happy',
          dialog: 'Lila: “Mantarlara 1, 2, 3 sırasıyla dokun! Melodiyi tamamlayınca Altın Yıldız Tohumu uyanacak!”',
          task: 'Işıklı mantarlara sırayla dokun: 1 → 2 → 3',
          wordKey: 'star',
          unlockWords: ['star'],
          need: 3,
          items: [
            { svg: 'mushroom-1', label: '1. Mantar', order: 1 },
            { svg: 'mushroom-2', label: '2. Mantar', order: 2 },
            { svg: 'mushroom-3', label: '3. Mantar', order: 3 }
          ],
          doneDialog: 'Do-Mi-Sol! Yaşlı ağacın kovuğundan altın yıldız gibi parlayan dördüncü tohum çıktı!',
          autoAdvance: true
        },
        {
          kind: 'claim-seed',
          speaker: 'milo',
          miloMood: 'proud',
          dialog: 'Milo: “Dördüncü tohumu da bulduk! Altın Yıldız Tohumu’nu kavanoza alıp fener meydanına koşalım!”',
          task: 'Altın Yıldız Tohumu’nu kavanozuna ekle.',
          seedId: 'gold',
          need: 1,
          items: [
            { svg: 'seed-gold', label: 'Altın Yıldız', good: true, isSeed: true }
          ],
          doneDialog: 'Dört ışık tohumunun tamamı bizde! Haydi Bahçe Feneri’ni yakalım!',
          nextLabel: 'Fenere Koşalım →'
        }
      ]
    },
    {
      id: 'finale',
      title: 'Bahçe Yeniden Işıldıyor!',
      sceneId: 'finale',
      friendId: 'nine',
      extraFriends: ['pof', 'mavis'],
      steps: [
        {
          kind: 'light-lantern',
          speaker: 'nine',
          miloMood: 'happy',
          dialog: 'Nine Fındık: “Dört tohumu da bulmuşsunuz! Her birini sırayla Bahçe Feneri’ne yerleştirin!”',
          task: 'Feneri yakmak için 4 ışık tohumuna dokun veya fenere sürükle.',
          dropTarget: 'lantern',
          need: 4,
          items: [
            { svg: 'seed-ruby', label: 'Yakut', seedId: 'ruby', good: true, isSeed: true },
            { svg: 'seed-amber', label: 'Kehribar', seedId: 'amber', good: true, isSeed: true },
            { svg: 'seed-sapphire', label: 'Safir', seedId: 'sapphire', good: true, isSeed: true },
            { svg: 'seed-gold', label: 'Altın Yıldız', seedId: 'gold', good: true, isSeed: true }
          ],
          doneDialog: 'VAY CANINA! Bahçe Feneri parladı, pencereler aydınlandı ve tüm ateş böcekleri dansa başladı!',
          autoAdvance: true
        },
        {
          kind: 'celebrate',
          speaker: 'milo',
          miloMood: 'proud',
          dialog: 'Milo: “Birlikte başardık! Yardımın için çok teşekkür ederim, harika bir kaşifsin!”',
          task: 'Bahçedeki yıldızlara veya çiçeklere dokunup ışığın tadını çıkarabilirsin!',
          items: [],
          nextLabel: '🏆 Rozeti Gör'
        }
      ]
    }
  ];

  window.MiloStory = {
    CAST: CAST,
    WORDS: WORDS,
    CHAPTERS: CHAPTERS
  };
})();
