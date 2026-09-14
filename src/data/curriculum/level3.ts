import { Lesson } from "../../types";
import { defineLesson } from "./helper";

export const LEVEL_3_LESSONS: Lesson[] = [
  defineLesson({
    lessonNumber: 96,
    level: 3,
    title: "DÜŞEYARA mantığı",
    description: "VLOOKUP fonksiyonunun arkasındaki çalışma prensibi, dikey arama mantığı ve 4 altın kural.",
    difficulty: "Orta",
    estimatedMinutes: 8,
    prerequisites: ["ders-39", "ders-60"],
    learningObjectives: [
      "DÜŞEYARA (VLOOKUP) fonksiyonunun 4 argümanını ezberlemek",
      "Aranan değerin mutlaka arama tablosunun en sol sütununda bulunması kuralını kavramak",
      "Tam eşleşme (0 / YANLIŞ) ile yaklaşık eşleşme (1 / DOĞRU) farkını öğrenmek"
    ],
    theory: [
      "DÜŞEYARA (VLOOKUP), Excel dünyasının en ünlü ve iş görüşmelerinde en çok sorulan fonksiyonudur.",
      "Mantığı: Elinizdeki bir anahtar değere (örn: TC Kimlik No veya Ürün Kodu) bakıp, başka bir tablodan o kişiye ait Ad, Soyad veya Fiyat bilgisini çekip getirmektir.",
      "**Sözdizimi 4 parçadan oluşur:** `=DÜŞEYARA(aranan_değer; tablo_dizisi; sütun_indis_sayısı; [aralık_bak])`.",
      "1. `aranan_değer`: Ne arıyoruz? (örn: A2 hücresindeki ürün kodu).",
      "2. `tablo_dizisi`: Nerede arıyoruz? (örn: $F$2:$H$100 tablosu).",
      "3. `sütun_indis_sayısı`: Bulduğumuzda kaçıncı sütundaki veriyi getirelim? (1, 2, 3...).",
      "4. `aralık_bak`: Birebir tam eşleşme için daima **0** (veya `YANLIŞ`) yazılır!"
    ],
    examples: [
      {
        title: "Ürün Fiyatı Çekme",
        explanation: '=DÜŞEYARA(A2; $F$2:$G$10; 2; 0) formülü A2 kodundaki ürünün fiyatını F:G tablosundan 2. sütundan getirir.',
        formula: '=DÜŞEYARA(A2; $F$2:$G$10; 2; 0)',
        table: {
          headers: ["Aranan Kod", "Ürün Adı", "Fiyat ₺"],
          rows: [
            ["U-101", "Kablosuz Kulaklık", 850],
            ["U-102", "Bluetooth Hoparlör", 1200]
          ]
        }
      },
      {
        title: "Personel Sicil No ile Maaş Bulma",
        explanation: 'Sicil no girildiğinde İK tablosundan personelin departmanını ve maaşını anında getirme.'
      }
    ],
    realWorldExample: {
      department: "Faturalama & Depo",
      scenario: "Fatura kesilirken ürün kodu girildiğinde ürünün resmi adı, birim fiyatı ve KDV oranı ana stok kartından DÜŞEYARA ile otomatik çekilir.",
      outcome: "Fatura kesme süresi dakikalardan saniyelere iner, yanlış fiyat yazma riski biter."
    },
    stepByStep: [
      "Sonucun geleceği hücreye tıklayın.",
      "`=DÜŞEYARA(` yazın.",
      "Aradığınız kod hücresini seçin, `;` koyun.",
      "Arama yapacağınız kaynak tabloyu seçip `F4` ile sabitleyin (`$`), `;` koyun.",
      "Çekmek istediğiniz sütun numarasını (örn: `2`) yazın, `;` koyun.",
      "Tam eşleşme için `0` yazıp parantezi kapatın ve `Enter`a basın."
    ],
    practiceExercises: [
      {
        prompt: "C2 hücresine A2 kodunu arayan ve F2:G5 aralığından 2. sütunu getiren =DÜŞEYARA(A2; $F$2:$G$5; 2; 0) formülünü yazın.",
        targetCell: "C2",
        expectedFormula: '=DÜŞEYARA(A2; $F$2:$G$5; 2; 0)',
        hint: '=DÜŞEYARA(A2; $F$2:$G$5; 2; 0) yazıp Enter tuşuna basın.',
        table: { headers: ["Kod", "Ad", "Fiyat"], rows: [["K-1", "Klavye", 350]] }
      },
      {
        prompt: "C3 hücresine formülü uygulayın.",
        targetCell: "C3",
        expectedFormula: '=DÜŞEYARA(A3; $F$2:$G$5; 2; 0)',
        hint: '=DÜŞEYARA(A3; $F$2:$G$5; 2; 0) yazın.',
        table: { headers: ["Kod", "Ad", "Fiyat"], rows: [["K-1", "Klavye", 350], ["M-2", "Fare", 150]] }
      },
      {
        prompt: "D2 hücresine =C2*10 ile 10 adet toplamını hesaplayın.",
        targetCell: "D2",
        expectedFormula: "=C2*10",
        hint: "=C2*10 yazın.",
        table: { headers: ["Fiyat", "10 Adet"], rows: [[350, 3500]] }
      }
    ],
    quizQuestions: [
      {
        question: "DÜŞEYARA fonksiyonunun 4. argümanına birebir tam eşleşme için ne yazılmalıdır?",
        options: ["0 (veya YANLIŞ / FALSE)", "1 (veya DOĞRU)", "2", "Boş bırakılmalıdır"],
        correctIndex: 0,
        explanation: "Tam eşleşme için daima 0 veya YANLIŞ yazılır."
      },
      {
        question: "DÜŞEYARA fonksiyonunun en temel kısıtlaması nedir?",
        options: [
          "Aranan değer mutlaka arama tablosunun en solundaki (1.) sütunda yer almalıdır; sola doğru arama yapamaz",
          "Yalnızca tek basamaklı sayıları arayabilir",
          "En fazla 10 satır arayabilir",
          "Metinleri asla arayamaz"
        ],
        correctIndex: 0,
        explanation: "DÜŞEYARA sadece soldan sağa çalışır; aranan sütunun solunda kalan verileri çekemez."
      },
      {
        question: "Aranan değer kaynak tabloda hiç bulunamazsa DÜŞEYARA hangi hatayı verir?",
        options: ["#YOK! (#N/A)", "#DEĞER!", "#BAŞV!", "#SAYI/0!"],
        correctIndex: 0,
        explanation: "Aranan kayıt tabloda yoksa Excel #YOK! (Not Available) hatası üretir."
      }
    ],
    commonMistakes: [
      "DÜŞEYARA tablosunu ($) sabitlemeyi unutup aşağı çekince tablonun kayması.",
      "Son argüman olan 0'ı unutmak, bu durumda Excel yanlış/yaklaşık sonuçlar getirir."
    ],
    tips: [
      "Modern Excel (Microsoft 365) kullanıyorsanız DÜŞEYARA'nın tüm kısıtlamalarını ortadan kaldıran ÇAPRAZARA (XLOOKUP) fonksiyonunu tercih edebilirsiniz."
    ],
    challenge: {
      title: "Kusursuz DÜŞEYARA",
      description: "C2 hücresine =DÜŞEYARA(A2; $F$2:$G$5; 2; 0) formülünü girin.",
      targetCell: "C2",
      expectedFormula: '=DÜŞEYARA(A2; $F$2:$G$5; 2; 0)'
    }
  })
];

// Generate Level 3 lessons (97 to 125)
const LEVEL_3_EXTRA_SPECS = [
  { num: 97, title: "DÜŞEYARA uygulaması", desc: "Çok sütunlu tablolardan dinamik veri çekme ve tablo sabitleme.", formula: '=DÜŞEYARA(A2; $F$2:$H$50; 3; 0)' },
  { num: 98, title: "DÜŞEYARA yaklaşık eşleşme", desc: "Gelir vergisi dilimleri, komisyon baremleri veya not aralıklarında son parametreyi 1 (DOĞRU) yapma.", formula: '=DÜŞEYARA(B2; $E$2:$F$6; 2; 1)' },
  { num: 99, title: "DÜŞEYARA tam eşleşme", desc: "Personel, fatura, stok no gibi birebir kesin eşleşme senaryoları (parametre: 0).", formula: '=DÜŞEYARA(A2; $D$2:$F$20; 2; 0)' },
  { num: 100, title: "DÜŞEYARA hataları", desc: "#YOK! (#N/A), #BAŞV! (#REF!) hatalarını EĞERHATA ile maskeleme.", formula: '=EĞERHATA(DÜŞEYARA(A2; $D$2:$E$20; 2; 0); "Bulunamadı")' },
  { num: 101, title: "YATAYARA", desc: "HLOOKUP fonksiyonu ile yatay olarak dizilmiş tablolardan satır bazlı veri arama.", formula: '=YATAYARA(A1; $A$5:$M$7; 2; 0)' },
  { num: 102, title: "ÇAPRAZARA / XLOOKUP", desc: "Yeni nesil arama fonksiyonu: Sola arama, otomatik tam eşleşme ve gömülü hata yönetimi.", formula: '=ÇAPRAZARA(A2; F2:F50; G2:G50)' },
  { num: 103, title: "ÇAPRAZARA ile veri bulma", desc: "Birden çok sütunu aynı anda tek formülle döndürme ve geriye doğru arama.", formula: '=ÇAPRAZARA(A2; D2:D50; B2:B50)' },
  { num: 104, title: "ÇAPRAZARA hata yönetimi", desc: "4. argüman [bulunamıyorsa] ile EĞERHATA kullanmadan özel uyarı yazdırma.", formula: '=ÇAPRAZARA(A2; F2:F50; G2:G50; "Kayıt Yok")' },
  { num: 105, title: "İNDİS", desc: "INDEX fonksiyonu ile belirli bir satır ve sütun numarasındaki hücre değerini alma.", formula: '=İNDİS(B2:D50; 5; 2)' },
  { num: 106, title: "KAÇINCI", desc: "MATCH fonksiyonu ile aranan değerin aralıkta kaçıncı sırada olduğunu bulma.", formula: '=KAÇINCI(A2; F2:F50; 0)' },
  { num: 107, title: "İNDİS + KAÇINCI", desc: "DÜŞEYARA'dan çok daha hızlı, sola arama yapabilen ve sütun ekleme/silmeden etkilenmeyen efsane kombinasyon.", formula: '=İNDİS(B2:B50; KAÇINCI(A2; F2:F50; 0))' },
  { num: 108, title: "Birden fazla kriterle arama", desc: "Hem Müşteri Adı hem de Yıl kriterine göre iki boyutlu kesişim hücresini bulma.", formula: '=İNDİS(C2:G20; KAÇINCI(A2; A2:A20; 0); KAÇINCI(B1; C1:G1; 0))' },
  { num: 109, title: "Dinamik arama", desc: "Açılır listeye (Drop-down) bağlı olarak anında değişen interaktif arama kartı.", formula: '=ÇAPRAZARA(H1; A2:A50; B2:D50)' },
  { num: 110, title: "SIRALA", desc: "SORT dinamik dizi fonksiyonu ile formülle anında canlı sıralama tablosu oluşturma.", formula: '=SIRALA(A2:D20; 3; -1)' },
  { num: 111, title: "FİLTRE", desc: "FILTER fonksiyonu ile belirli şarta uyan tüm satırları başka bir alana dinamik dökme.", formula: '=FİLTRE(A2:D20; B2:B20="Ankara")' },
  { num: 112, title: "BENZERSİZ", desc: "UNIQUE fonksiyonu ile binlerce satırlık listedeki tekrarları atıp tekil liste çıkarma.", formula: '=BENZERSİZ(B2:B100)' },
  { num: 113, title: "SIRALAMA + FİLTRE", desc: "İç içe fonksiyonla filtrelenen veriyi aynı anda ciroya göre büyükten küçüğe sıralama.", formula: '=SIRALA(FİLTRE(A2:C50; B2:B50="Satış"); 3; -1)' },
  { num: 114, title: "Dinamik diziler", desc: "Dynamic Arrays mimarisi, tek bir formülün birden çok hücreyi kendiliğinden doldurması.", formula: '=BENZERSİZ(A2:A20)' },
  { num: 115, title: "Spill mantığı", desc: "Taşma (Spill) aralığı, #TAŞMA! (#SPILL!) hatası ve önündeki engelleri kaldırma.", formula: '=A2:A10*2' },
  { num: 116, title: "Koşullu biçimlendirme", desc: "Büyüktür, Küçüktür, İlk 10 gibi kurallarla hücreleri otomatik renklendirme.", formula: 'A2>1000' },
  { num: 117, title: "Formülle koşullu biçimlendirme", desc: "Formül kullanarak satırın tamamını renkli yapma ($B2=\"Tamamlandı\").", formula: '=$B2="Tamamlandı"' },
  { num: 118, title: "Renk ölçekleri", desc: "Color Scales ile ısı haritası (Heatmap) oluşturma, yüksek ciroları yeşil düşükleri kırmızı yapma.", formula: 'A2:A50' },
  { num: 119, title: "Veri çubukları", desc: "Data Bars ile hücre içine mini ilerleme çubuğu / progress bar yerleştirme.", formula: 'A2:A50' },
  { num: 120, title: "Simge kümeleri", desc: "Icon Sets ile KPI okları (yeşil yukarı, sarı yana, kırmızı aşağı) ekleme.", formula: 'A2:A50' },
  { num: 121, title: "Veri doğrulama", desc: "Data Validation ile hücreye sadece pozitif sayı, belirli tarih veya uzunlukta veri girilmesini zorunlu kılma.", formula: 'Tamsayı (1-100)' },
  { num: 122, title: "Açılır liste", desc: "Hücreye tıklandığında ok simgesi çıkaran Liste veri doğrulama kuralı.", formula: '=KategoriListesi' },
  { num: 123, title: "Bağımlı açılır listeler", desc: "DOLAYLI (INDIRECT) fonksiyonu ile İl seçilince İlçe listesinin dinamik değişmesi.", formula: '=DOLAYLI(A2)' },
  { num: 124, title: "Yinelenen verileri bulma", desc: "Koşullu biçimlendirme ile tekrar eden mükerrer müşteri kayıtlarını vurgulama.", formula: 'Yinelenen Değerler' },
  { num: 125, title: "Yinelenen verileri temizleme", desc: "Veri > Yinelenenleri Kaldır aracı ile çift kayıtları kalıcı olarak silme.", formula: 'Yinelenenleri Kaldır' }
];

LEVEL_3_EXTRA_SPECS.forEach((spec) => {
  LEVEL_3_LESSONS.push(
    defineLesson({
      lessonNumber: spec.num,
      level: 3,
      title: spec.title,
      description: spec.desc,
      difficulty: "Orta",
      estimatedMinutes: 7,
      prerequisites: [`ders-${spec.num - 1}`],
      learningObjectives: [
        `${spec.title} konusunun mekanizmasını ve kurumsal faydalarını kavramak`,
        `Raporlarda ${spec.title} özelliğini dinamik ve hatasız uygulamak`,
        `İş zekası ve veri akışını hızlandırıcı teknikleri öğrenmek`
      ],
      theory: [
        `Excel'de **${spec.title}**, orta ve ileri düzey kullanıcıları başlangıç seviyesinden ayıran en kritik konulardan biridir.`,
        spec.desc,
        `Bu yetkinlik sayesinde statik tablolar yerini canlı, birbirine bağlı ve filtrelenebilir dinamik sistemlere bırakır.`
      ],
      examples: [
        {
          title: `${spec.title} Uygulaması`,
          explanation: `Kurumsal veri mimarisinde ${spec.title} kullanımına ait referans görünüm.`,
          formula: spec.formula,
          table: {
            headers: ["Parametre", "Referans", "Çıktı"],
            rows: [
              ["Sipariş 1", "Ankara", "Aktif"],
              ["Sipariş 2", "İstanbul", "Teslim"]
            ]
          }
        },
        {
          title: "İleri Seviye Senaryo",
          explanation: `Hata denetimi ve dinamik aralık optimizasyonu.`
        }
      ],
      realWorldExample: {
        department: "Tedarik Zinciri & Lojistik",
        scenario: `Depodaki 50.000 farklı barkodun stok durumu ${spec.title} kullanılarak tek ekrandan anlık izlenir.`,
        outcome: "Kayıp-kaçak oranı düşer, tedarik siparişleri otomatik tetiklenir."
      },
      stepByStep: [
        `Gerekli veri aralığını veya hedef hücreyi seçin.`,
        `Gerekli formülü (\`${spec.formula}\`) yazın veya Şerit menüden aracı açın.`,
        `Sonuçları kontrol edin ve hücre sabitlemelerini ($) gözden geçirin.`
      ],
      practiceExercises: [
        {
          prompt: `Hedef hücreye ${spec.formula} uygulayın.`,
          targetCell: "C2",
          expectedFormula: spec.formula,
          hint: `${spec.formula} formülünü girin.`,
          table: { headers: ["A", "B", "Sonuç"], rows: [["K-10", 150, "Sonuç"]] }
        },
        {
          prompt: `C3 hücresine işlemi uygulayın.`,
          targetCell: "C3",
          expectedFormula: spec.formula,
          hint: `Formülü uygulayın.`,
          table: { headers: ["A", "B", "Sonuç"], rows: [["K-10", 150, "Sonuç"], ["K-20", 250, "Sonuç"]] }
        },
        {
          prompt: `D2 hücresine =C2 kontrol formülünü girin.`,
          targetCell: "D2",
          expectedFormula: "=C2",
          hint: "=C2 yazın.",
          table: { headers: ["Sonuç", "Kontrol"], rows: [["Sonuç", "Sonuç"]] }
        }
      ],
      quizQuestions: [
        {
          question: `${spec.title} özelliğinin temel avantajı nedir?`,
          options: [
            spec.desc,
            "Sadece hücreleri büyütür",
            "Dosyayı kilitler",
            "Yalnızca metin siler"
          ],
          correctIndex: 0,
          explanation: spec.desc
        },
        {
          question: "Bu uygulama büyük tablolarda neden tercih edilir?",
          options: [
            "Manuel veri arama ve hata yapma riskini sıfıra indirip hızı artırdığı için",
            "Daha renkli olduğu için",
            "Sadece eğlence amaçlıdır",
            "Hiçbir avantajı yoktur"
          ],
          correctIndex: 0,
          explanation: "Otomasyon ve dinamik formüller insan hatalarını önler ve analiz hızını katlar."
        },
        {
          question: "İşlem sırasında hata meydana gelirse ne yapılmalıdır?",
          options: [
            "Formülün aralıklarını, hücre sabitlemelerini ($) ve argüman sıralamasını kontrol etmek",
            "Bilgisayarı formatlamak",
            "Tablodaki tüm verileri silmek",
            "Hemen başka programa geçmek"
          ],
          correctIndex: 0,
          explanation: "Formül hatalarında hücre referansları ve argümanlar dikkatle denetlenmelidir."
        }
      ],
      commonMistakes: [
        "Arama ve referans tablolarında mutlak sabitlemeyi ($) unutmak."
      ],
      tips: [
        "Ctrl+[ kısayolu ile seçili formülün hangi kaynak hücrelerden beslendiğini anında görebilirsiniz."
      ],
      challenge: {
        title: `${spec.title} Uygulama Görevi`,
        description: `C2 hücresine ${spec.formula} uygulayın.`,
        targetCell: "C2",
        expectedFormula: spec.formula
      }
    })
  );
});
