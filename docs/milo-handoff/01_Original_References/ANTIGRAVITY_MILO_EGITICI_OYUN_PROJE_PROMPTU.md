# ANTIGRAVITY PROJE PROMPTU — MİLO'NUN MERAKLI DÜNYASI
## 5 yaş çocuklar için Türkçe arayüzlü, hikâyeli ve çizgi film akıcılığında eğitici oyunlar

Aşağıdaki talimatları mevcut projeyi inceleyip geliştirirken uygula. Bu proje yalnızca hikâye anlatımı veya resimli bir ekran değildir: **5 yaşındaki çocukların sayı sayma, harfleri tanıma, temel İngilizce kelimeleri öğrenme, dinleme ve yönerge izleme becerilerini geliştiren; birden fazla oynanabilir mini oyundan ve ilerleyen bir ana hikâyeden oluşan güvenli bir çocuk oyunudur.**

## 1. Projenin amacı

Milo’nun Meraklı Dünyası, anaokulu çağındaki çocuğun kolayca kullanabileceği, Türkçe arayüzlü bir web oyunudur. Çocuk ana ekrandan farklı oyunlar seçebilmeli; dokunarak, sürükleyerek, dinleyerek, sayarak ve eşleştirerek gerçekten etkin olmalıdır. Oyun çocuğa yanlış yaptığı hissini vermeden tekrar deneme ve keşif olanağı sunmalıdır.

Oyunlar şu eğitim alanlarını kapsar:

1. **Sayı sayma:** 1–10 ile başla, aşamalı olarak 1–20’ye ilerle. Nesneleri bire bir sayma, doğru miktarı seçme, sayı sembolünü miktarla eşleştirme.
2. **Harf tanıma:** Türk alfabesindeki harfleri büyük/küçük biçimleriyle tanıma; harf sesini duyma ve harfi ilgili görsel/kelimeyle eşleştirme. Ç, Ğ, İ, Ö, Ş, Ü ve I/İ ayrımını doğru destekle.
3. **İngilizce kelime öğrenme:** Meyve, hayvan, renk ve günlük nesneler. Kelimeyi dinleme, görselle eşleştirme, aranan kelimeyi bulma ve isteğe bağlı tekrar. Türkçe anlam her zaman görünür olsun.
4. **Hikâyeli keşif:** Milo’nun bir problemi çözdüğü, çocuğun nesneleri bulup taşıdığı, ipuçlarını dinlediği ve sonucu değiştirdiği bölümler.
5. **Dikkat ve dinleme oyunları:** Ateş böceğinin ışığını takip etme, sesli yönergeye göre nesne seçme ve basit örüntüler.

Her oyun bir eğitim amacına hizmet etsin ama ders uygulaması gibi görünmesin. Öğrenme; hikâye, karakter merakı, ses, hareket ve etkileşimle doğal biçimde sunulsun.

## 2. Çalışma talimatı

- Önce mevcut depoyu, framework’ü, dosya yapısını, ekranları, oyun akışını ve karakter varlıklarını incele. Çalışan özellikleri sebepsiz silme veya yeniden yazma.
- Mevcut/onaylanmış Milo görünüşünü, logosunu ve marka kimliğini koru; kullanıcı istemedikçe değiştirme.
- Mevcut mimariye uygun planı çıkar, ardından kodda gerçek uygulamayı yap. Yalnızca öneri, statik maket veya TODO bırakma.
- İlk hedef, baştan sona oynanabilir bir dikey dilim olsun. Sonra diğer oyun türlerini aynı kaliteyle ekle.
- Türkçe arayüz ve yönergeler kullan. İngilizce yalnızca öğretilen hedef kelimelerde ve kısa tekrarlarında görünür olsun.
- Reklam, ödeme, dış bağlantı, sohbet, konum veya çocuklara ait kişisel veri toplama ekleme.
- Kullanıcı ayrıca izin vermedikçe projeyi dışarı yayımlama, GitHub’a gönderme veya canlı siteye dağıtma.

## 3. Çocuk kullanıcı deneyimi

Hedef çocuk yaklaşık 5 yaşında ve okuma becerisi yeni gelişiyor olabilir.

- Kısa Türkçe yönergeler, sesli okunabilir metinler ve büyük dokunma alanları kullan (mobilde yaklaşık 48 CSS px veya daha büyük).
- Sürüklemenin yanında “dokun, Milo taşısın” alternatifi sun.
- Ekranda aynı anda çok fazla seçenek gösterme; görev başına tek ana yönerge ver: “Üç elmayı sepete koy.”
- Rengi tek ipucu olarak kullanma; şekil, simge, kelime veya sesle destekle.
- Yanlış cevapta kırmızı çarpı, sert hata sesi, puan düşürme, başarısızlık ekranı veya sarsıntı kullanma.
- Duraklatma, oyun seçimine dönme ve kaldığı yerden devam etme olanağı ver.
- Yerel ilerleme kaydı ve çevrimdışı çalışabilen dosyalar tercih et; hesap zorunlu olmasın.

## 4. Oyun dünyası ve ana ekran

Ana ekran sıcak, zengin ve çocuk kitabı/animasyon dizisi estetiğinde olsun; kurumsal dashboard gibi görünmesin. Milo’nun dünyasını gösteren büyük, resimli ve dokunulabilir oyun kapıları kullan:

- **Sayı Bahçesi** — Say ve eşleştir.
- **Harf Ormanı** — Harfleri bul, seslerini dinle.
- **İngilizce Meyve Bahçesi** — İngilizce kelimeleri öğren.
- **Milo’nun Hikâyesi** — Bölüm bölüm ilerleyen macera.
- **Ateş Böceği Oyunu** — Işığı ve sesi takip et.

Kartlar seçimde kısa ve akıcı animasyonla tepki versin. Kilitli bölüm varsa anlaşılır biçimde anlatılsın; satın alma veya bekleme süresi olmasın. Ebeveyn ayarları ayrı ve basit bir korumalı alanda bulunsun.

Görsel dünya yumuşak formlu, renkli ama göz yormayan, katmanlı, okunaklı ve iyi hizalanmış olsun. Rastgele emoji yığınları, boş panel alanları, kesilmiş kartlar, aşırı parlama ve görsel gürültü kullanma. Emoji yalnızca geçici prototip yer tutucusu olabilir; son varlık gibi bırakma.

## 5. Oyun modlarının gerçek oynanışı

### A. Sayı Bahçesi

**Örnek:** Pof kirpi piknik sepeti hazırlıyor. Milo “Sepete üç elma koy” der. Ekranda sayılabilir meyveler görünür. Çocuk üç elmaya dokunur veya sürükler. Her elma sepete fiziksel olarak yerleşir. Üçüncüde Pof sevinir ve hikâyede sorun çözülür.

Oyun biçimleri:
- Duyulan sayıyı nesne miktarıyla eşleştir.
- Dokunarak nesneleri birlikte say; yalnız seçilen nesne vurgulansın.
- İstenen adette nesneyi bul.
- 1–10 sayı kartlarını sırala.
- Sayı sembolünü aynı miktardaki nesne grubuyla eşleştir.

Sayma sırasında nesneler yer değiştirmemeli veya iki kere sayılmamalı. Çocuk miktarı aşarsa fazla nesne nazikçe geri dönsün; sayaç sıfırlanmasın. İlerleme önce 1–3, sonra 1–5, 1–10 ve isteğe bağlı 11–20 olsun.

### B. Harf Ormanı

**Örnek:** Rüzgâr orman tabelasındaki harfleri dağıtmıştır. Lila “M harfini bulalım” der. Çocuk M/m’yi seçer. Milo harfin sesini söyler, “M — masa” örneğini gösterir ve çocuk harfi tabelaya yerleştirir.

Oyun biçimleri:
- Söylenen harfi seçeneklerden bul.
- Büyük ve küçük harfi eşleştir (A–a).
- Harfin sesiyle başlayan resmi bul.
- Geniş strok alanlı, toleranslı harf izleme.

Türk alfabesindeki bütün harfleri destekle. I/İ ve özel karakterleri doğru göster. Harf adıyla sesini karıştırma; özellikle Ğ için yapay sert bir ses uydurma. Harf çevresinde yumuşak ışık izi ve örnek resmin canlanması gibi olumlu geri bildirim ver.

### C. İngilizce Meyve Bahçesi

İlk kelimeler: apple/elma, orange/portakal veya turuncu (bağlama göre anlamı açıkla), banana/muz, strawberry/çilek, blueberry/yaban mersini. Sonra basit hayvan, renk ve günlük nesneler.

Milo görseli gösterir ve kelimeyi doğal biçimde söyler. Çocuk hoparlöre dokunup tekrar dinleyebilir, doğru nesneyi bulup hikâyedeki karaktere götürür. Kartta İngilizce kelime, ses düğmesi ve Türkçe anlam görünür. Yaklaşık Türkçe okunuş varsa küçük bir yardımcı nottur; doğru ses kaydının yerine geçmez.

Her kelime için normal hız, yavaş tekrar ve hikâye içinde kısa kullanım sesi sağla. Doğal kayıt varsa kullan; tarayıcı metin okuma yalnızca yedektir. Ses yüklenemezse oyun yine oynanmalı, dudak senkronu olmayan karakter ağız hareketi yapmamalı.

Yanlış nesne nazikçe eski yerine döner. Türkçe ipucu ver: “Bu sarı muz. Biz kırmızı çileği arıyoruz.” Doğru seçimde Milo kelimeyi tekrarlar, nesneyi taşır ve arkadaşın ihtiyacı karşılanır.

### D. Ateş Böceği Oyunu

**Lila/ateş böceği ekranda görünür ve oyunun gerçek parçası olmalı; yalnızca oyun adında kalmamalı.** Alacakaranlık bahçesinde Lila uçar, bir veya iki ışık parlaması yapar. Çocuk “İki kere parlayan ateş böceğini bul” yönergesini dinler, ışığını takip eder ve hedefe dokunur. Başka seviyede ışık örüntüsünü tekrar etme veya doğru çiçeğe gitme olabilir.

Lila yumuşak yörüngede ivmelenip yavaşlasın, dönerken gövdesini uçuş yönüne eğsin, ışığı kademeli parlayıp sönsün. Hızlı flaş yok. Hedef kaybolursa Lila başlangıç noktasına dönüp ipucu verir. Renk, ses veya parlama sayısı tek başına erişilebilirlik engeli oluşturmasın.

### E. Milo’nun Hikâyesi

Ana hikâye **“Kayıp Bahçe Işığı”** olabilir: Bahçe fenerini yakacak üç ışık tohumu kaybolur. Milo, Pof kirpiye, Maviş kuşa ve Lila ateş böceğine yardım eder. Elma toplama/sayma, dere kıyısında doğru nesneyi bulma, serada İngilizce kelimeyi dinleme, arkadaşlardan ipuçlarıyla tohumu arama ve finalde tohumları fener yuvalarına yerleştirme bölümleri olsun.

Her sahnede açıkça bulunmalı: karakter neden yardıma ihtiyaç duyuyor, çocuk ne yapacak, görev hikâyede neyi değiştirecek, hangi beceri pekişecek? Uzun kesintisiz diyalog yerine kısa cümle ve eylem kullan. Çocuk sadece sonraki düğmeye basan seyirci olmasın. Adı geçen bütün görev nesneleri sahnede görünür ve seçilebilir olsun. Lila hikâyede görünür, uçar ve ipucu işlevi görür.

## 6. Çizgi film karakteri ve animasyon kalitesi

Kullanıcı, kolları ve elleri oynayan, çizgi film akıcılığında gerçek karakter performansı istiyor. Tek resmi zıplatmak, yalnızca CSS’te ölçek değiştirmek veya karakteri statik bırakmak yeterli değildir.

- Milo’nun başı, gövdesi, omuzları, üst/alt kolları, elleri/parmakları, bacakları, ayakları, kulakları, gözleri, ağzı, kuyruğu ve aksesuarları mümkünse bağımsız rig/kemik/katman olarak hareket etsin.
- Mevcut teknik altyapıya göre 2D skeletal/puppet rig, sprite sheet veya gerçek zamanlı 3D rig arasından en kaliteli ve hafif yöntemi seç; seçimi ve sınırlarını raporla.
- Nefes, merak, hedefe bakış, selam, dinleme, işaret, eğilip alma, ağır nesne kaldırma, taşıma, bırakma, düşünme, rahatlama, sevinme, kutlama ve el sallama ayrı performanslar olsun.
- Her hareket **hazırlık → hareket → temas/sonuç → toparlanma** ritmine sahip olsun.
- Göz hedefe önce baksın; sonra baş ve gövde dönsün; el en son uzansın. El değmeden nesne karaktere yapışmasın.
- Nesne kaldırırken dizler bükülsün, gövde denge kursun, el/bilek nesneye göre şekillensin.
- Kulak, atkı, çanta ve kuyruk ana hareketi gecikmeli takip etsin.
- Yürüyüşte ayak kaymasın; yön değişiminde kuyruk denge versin; inişlerde dizler esnesin.
- Duygular kaş, göz, bakış, yanak, kulak ve omuzla birlikte ifade edilsin.
- Ağız hareketi ses zamanlamasına bağlansın; ses yokken dudak oynatılmasın.
- Hızlı dokunuş ve klip çakışmalarında karakter bozulmasın; animasyon güvenli biçimde kesilsin veya sıraya alınsın.
- Kamera ani sıçramasın; karakter, hedef nesne ve yönerge aynı anda kadrajda bulunsun.

Minimum klipler: `idle_breathe`, `look_at_target`, `wave_hello`, `listen`, `think`, `point`, `walk`, `walk_cautious`, `step_balance`, `crouch`, `reach`, `grip_small`, `lift_weight`, `carry`, `drop_into_basket`, `encourage`, `soft_disappointed`, `relieved`, `small_success`, `celebrate`, `wave_goodbye`.

Örnek klip zinciri: doğru nesne seçilince `look_at_target → crouch/reach → grip_small → carry → drop_into_basket → small_success`. Tek bir mutlu zıplamayı tüm etkileşimlerin yerine koyma.

## 7. Dünya, ses ve performans

- Mevcut karakter varlıkları önce incelensin; Milo her sahnede aynı yüz, oran, kıyafet ve renk düzeninde kalsın.
- Arka plan, karakter, etkileşim nesnesi ve arayüz ayrı yönetilebilir olsun.
- Görevde gereken nesneler gerçekten çizilsin/üretilsin ve dokunma alanı olsun.
- 3D kullanılıyorsa perspektif, ışık, gölge ve etkileşim tutarlı olsun; sadece “3D gibi” etiketi kullanma. Mobil performans ve düşük donanım için kalite kademesi/fallback sağla.
- Dikey mobil öncelikli olmak üzere tablet ve masaüstünde içerik kadraj dışına taşmasın.
- Harici görsel/font/ses bağlantısına zorunlu bağımlılık ekleme; çevrimdışı varlıkları yerel paketle.
- Türkçe anlatım sıcak ve anlaşılır olsun; yapay tekrar eden ortam sesi kullanma. UI sesleri kısa ve düşük seviyeli olsun. Ses aç/kapat kontrolü görünür olsun.
- Ses kapalıyken tüm görevler tamamlanabilsin. Ses hatası oyunu kilitlemesin.

## 8. İlerleme, güvenlik ve mahremiyet

Bölüm ilerlemesini cihazda yerel kaydet. Tekrar oynama ilerlemeyi silmesin. Puan baskısı yerine isteğe bağlı kelime kartları ve açılan hikâye sayfaları kullanılabilir. Ebeveyn alanı basit yetişkin doğrulaması arkasında olabilir; yalnız yerel oyun özeti göster. Çocuk adı, fotoğrafı, ses kaydı, konumu veya kişisel verisi toplama. Reklam, satın alma ve harici bağlantı oyun akışında bulunmasın.

## 9. Teknik kalite

- Mevcut framework, paket yöneticisi ve mimariyi koru; gerekçesiz büyük yeniden yazım yapma.
- Oyun seçimi, durum yönetimi, animasyon, ses, ilerleme kaydı, ortak HUD ve erişilebilir etkileşim bileşenlerini tekrar kullanılabilir kur.
- Oyun durumları açık olsun: başlangıç, yönerge, oynanış, ipucu, başarı, geçiş, duraklatma.
- Yanlış nesne, hızlı dokunuş, sessiz mod, ekran döndürme, yenileme ve kayıt hatalarını ele al.
- Görev bitmeden ilerleme açılmasın; takılmayı önleyen isteğe bağlı ipucu bulunsun.
- Klavye ve dokunmatik erişilebilirliği, odak görünürlüğü ve anlaşılır `aria-label` ekle.
- Boşa çıkan düğme, çalışmayan hoparlör, bulunmayan görev nesnesi, boş ekran veya işlevsiz dekoratif etkileşim bırakma.

## 10. Uygulama sırası

1. Projeyi keşfet, mevcut durumu ve varlıkları incele.
2. Ana menüyü ve beş oyun modülünün bilgi mimarisini kur.
3. Dikey dilim olarak Milo’nun giriş sahnesi + Pof’un elma görevi + gerçek nesne etkileşimi + Apple ses/kelime kartı + eyleme uyan animasyon + hikâye sonucu + yerel ilerleme kaydını tamamla.
4. Ayrı ayrı sayı sayma, Türkçe harf, İngilizce kelime ve ateş böceği oyunlarını ekle.
5. Dere, sera, arkadaş ipuçları ve fener finaliyle hikâyeyi tamamla.
6. Mobil dikey/yatay, tablet ve masaüstü yerleşimlerini düzelt.
7. Uygulamayı her oyun için baştan sona oynayarak kontrol et. Gerekli nesne, düğme, ses aç/kapat, sessiz oynanış, hızlı dokunuş ve yenilemede ilerleme davranışlarını doğrula; hata varsa düzeltmeden bitmiş deme.
8. Son raporda yapılan gerçek değişiklikleri, ana dosyaları, çalıştırma yolunu, animasyon yaklaşımını ve bilinen sınırlamaları bildir. Yapılmayan işi tamamlanmış gibi sunma.

## 11. Kesin kabul ölçütleri

- En az dört ayrı öğrenme oyunu ana menüden seçilip oynanabiliyor.
- Sayı sayma, Türkçe harf tanıma ve İngilizce kelime öğrenme farklı akışlara sahip.
- Ateş böceği görünür ve ışık/ses takibi oynanışına katılıyor.
- Hikâyede çocuğun yaptığı eylem sonucu değiştiriyor; çocuk yalnızca metin okumuyor.
- Görev nesnelerinin tamamı görünür, seçilebilir ve görevin sonucuna bağlı.
- Arayüz çocuk için Türkçe; Türkçe alfabe karakterleri doğru.
- Yanlış seçim oyunu kilitlemiyor; ipucu ve tekrar var.
- Animasyonda hedefe bakış, hazırlık, kol/el hareketi, temas, ağırlık aktarımı ve toparlanma bulunuyor.
- Dokunmatik cihazda tamamlanabiliyor; ses kapalıyken kilitlenmiyor.
- İlerleme yerel saklanıp tekrar açılabiliyor.
- Kesilen metin, çalışmayan düğme veya işlevsiz ekran kalmıyor.

## 12. Başla

Şimdi mevcut proje üzerinde çalışmaya başla. Önce kaynak kodu incele; ardından bu amaca ve kabul ölçütlerine göre gerçek uygulamayı yap. Makul tasarım kararlarını kendin ver; görev nesnelerini, animasyonları ve sahne sonuçlarını eksiksiz tamamla. Yayımlama veya dağıtım yapma. Çalışır yerel önizleme ve yapılan değişikliklerin özetini sun.
