import { Lesson } from "../../types";
import { defineLesson } from "./helper";

export const LEVEL_5_LESSONS: Lesson[] = [
  defineLesson({
    lessonNumber: 151,
    level: 5,
    title: "Excel tabloları",
    description: "Resmi Excel Tablosu (ListObject - Ctrl+T) mimarisi, dinamik genişleme ve yapılandırılmış referanslar.",
    difficulty: "Orta",
    estimatedMinutes: 7,
    prerequisites: ["ders-150"],
    learningObjectives: [
      "Standart hücre aralığını resmi bir Excel Tablosuna (Ctrl+T) dönüştürmek",
      "Tabloya yeni satır eklendiğinde formüllerin ve biçimlerin otomatik genişlemesini izlemek",
      "Yapılandırılmış başvuru (Structured Reference) sözdizimini öğrenmek: Tablo1[Ciro]"
    ],
    theory: [
      "Birçok kullanıcı Excel'de çizgili hücreleri 'tablo' zanneder; oysa Excel için onlar sadece düz bir aralıktır (Range).",
      "Verilerinizin içine tıklayıp `Ctrl + T` (veya Ekle > Tablo) yaptığınızda veriniz resmi bir **Excel Tablosu** nesnesine dönüşür.",
      "**Muhteşem Avantajları:**",
      "1. En alta yeni bir müşteri eklediğiniz an tablo otomatik genişler, tüm formüller yeni satıra kendiliğinden kopyalanır.",
      "2. Hücre adresleri (A2*B2) yerine anlamlı sütun adları kullanılır: `=[@BirimFiyat]*[@Adet]`.",
      "3. Üstte filtre butonları ve altta tek tıkla açılan 'Toplam Satırı' hazır gelir."
    ],
    examples: [
      {
        title: "Dinamik Satış Tablosu",
        explanation: "Tablo1[@Tutar] = Tablo1[@BirimFiyat] * Tablo1[@Adet]",
        formula: "=[@BirimFiyat]*[@Adet]",
        table: {
          headers: ["Ürün", "BirimFiyat", "Adet", "Tutar"],
          rows: [
            ["Laptop", 25000, 4, 100000],
            ["Monitör", 4500, 10, 45000]
          ]
        }
      },
      {
        title: "Otomatik Toplam Satırı",
        explanation: "Tablo Tasarımı menüsünden 'Toplam Satırı' kutusunu işaretleyerek tek tıkla alt toplam alma."
      }
    ],
    realWorldExample: {
      department: "Ticari Operasyon & Satış",
      scenario: "Her gün 100 yeni siparişin eklendiği satış listesinde Ctrl+T tablosu kullanılır.",
      outcome: "Yeni sipariş girildiğinde formülleri aşağı sürükleme derdi biter, raporlar ve grafikler yeni satırları otomatik kapsar."
    },
    stepByStep: [
      "Veri setinizin içindeki herhangi bir hücreye tıklayın.",
      "Klavyeden `Ctrl + L` veya `Ctrl + T` kısayoluna basın.",
      "'Tablom üst bilgi satırı içeriyor' kutucuğunun işaretli olduğundan emin olup 'Tamam' deyin.",
      "Üstteki 'Tablo Tasarımı' sekmesinden tablonuza 'SatislarTablosu' gibi anlamlı bir isim verin."
    ],
    practiceExercises: [
      {
        prompt: "D2 hücresine tablo formülü olan =[@BirimFiyat]*[@Adet] yazarak satır tutarını hesaplayın.",
        targetCell: "D2",
        expectedFormula: "=[@BirimFiyat]*[@Adet]",
        hint: "=[@BirimFiyat]*[@Adet] formülünü uygulayın.",
        table: { headers: ["Ürün", "BirimFiyat", "Adet", "Tutar"], rows: [["SSD", 1200, 5, 6000]] }
      },
      {
        prompt: "D3 hücresine de formülü uygulayın.",
        targetCell: "D3",
        expectedFormula: "=[@BirimFiyat]*[@Adet]",
        hint: "Formülü uygulayın.",
        table: { headers: ["Ürün", "BirimFiyat", "Adet", "Tutar"], rows: [["SSD", 1200, 5, 6000], ["RAM", 800, 8, 6400]] }
      },
      {
        prompt: "E2 hücresine =D2*1.2 formülü ile KDV'li tutarı hesaplayın.",
        targetCell: "E2",
        expectedFormula: "=D2*1.2",
        hint: "=D2*1.2 yazın.",
        table: { headers: ["Tutar", "KDV Dahil"], rows: [[6000, 7200]] }
      }
    ],
    quizQuestions: [
      {
        question: "Excel'de bir veri aralığını resmi dinamik bir Tabloya dönüştüren en popüler kısayol hangisidir?",
        options: ["Ctrl + T (veya Ctrl + L)", "Ctrl + S", "Ctrl + P", "Alt + F4"],
        correctIndex: 0,
        explanation: "Ctrl + T (Table) veya Ctrl + L (List) tablo oluşturur."
      },
      {
        question: "Resmi Excel tablosunun altına yeni bir satır veri yazıldığında ne olur?",
        options: [
          "Tablo otomatik olarak genişler, biçimlendirmeler ve formüller yeni satıra kendiliğinden uygulanır",
          "Excel donar",
          "Tablo silinir",
          "Kullanıcının formülü elle aşağı çekmesi zorunludur"
        ],
        correctIndex: 0,
        explanation: "Excel Tablolarının en büyük gücü otomatik genişleme ve formül yayma yeteneğidir."
      },
      {
        question: "Excel Tablosu formüllerinde '=[@Maaş]*0,10' gibi ifadelere ne ad verilir?",
        options: [
          "Yapılandırılmış Başvuru (Structured Reference)",
          "Hatalı Sözdizimi",
          "VBA Kodu",
          "HTML Etiketi"
        ],
        correctIndex: 0,
        explanation: "Tablo sütun adlarıyla kurulan adreslemelere Yapılandırılmış Başvuru denir."
      }
    ],
    commonMistakes: [
      "Tablo oluştururken sütun başlıklarını boş bırakmak veya aynı isimde iki sütun başlığı açmak."
    ],
    tips: [
      "Pivot Table veya Grafik oluşturmadan önce kaynak veriyi mutlaka Ctrl+T ile tablo yapın; böylece yeni veri eklendiğinde tek tıkla güncellenir."
    ],
    challenge: {
      title: "Tablo Formülü",
      description: "D2 hücresine =[@BirimFiyat]*[@Adet] formülünü girin.",
      targetCell: "D2",
      expectedFormula: "=[@BirimFiyat]*[@Adet]"
    }
  })
];

// Generate Level 5 lessons (152 to 175)
const LEVEL_5_EXTRA_SPECS = [
  { num: 152, title: "Tablo oluşturma", desc: "Veri temizleme, başlık satırını kilitleme ve Tablo Stilleri ile kurumsal görünüm.", formula: "=[@Adet]*[@Fiyat]" },
  { num: 153, title: "Yapılandırılmış başvurular", desc: "TabloAdı[Sütun], [@MevcutSatır] ve [#Toplamlar] etiketlerinin formüllerde kullanımı.", formula: "=TOPLA(Satislar[Tutar])" },
  { num: 154, title: "Tablo formülleri", desc: "Hesaplanan Sütun (Calculated Column) davranışı ve formülün tüm sütuna anında yayılması.", formula: "=[@Ciro]-[@Maliyet]" },
  { num: 155, title: "Pivot Table'a giriş", desc: "Özet Tablo kavramı, yüz binlerce satırlık ham veriyi tek tıkla özetleme mantığı.", formula: "Ekle > PivotTable" },
  { num: 156, title: "Pivot Table oluşturma", desc: "Kaynak seçimi, yeni sayfaya yerleştirme ve PivotTable Alanları panelini tanıma.", formula: "Pivot Yerleşimi" },
  { num: 157, title: "Pivot Table alanları", desc: "Satırlar, Sütunlar, Değerler ve Filtreler 4'lü matrisinin mantığı.", formula: "Satır/Değer Kurgusu" },
  { num: 158, title: "Gruplama", desc: "Tarihleri Yıl/Çeyrek/Ay bazında gruplama ve sayısal yaş grupları (20-30, 31-40) oluşturma.", formula: "Sağ Tık > Gruplandır" },
  { num: 159, title: "Pivot filtreleri", desc: "Değer filtreleri (İlk 10 Müşteri, 500.000'den Büyükler) ve etiket filtreleri.", formula: "Filtre > İlk 10" },
  { num: 160, title: "Dilimleyiciler", desc: "Slicers ile interaktif, tıklanabilir şık filtre butonları tasarlama.", formula: "Dilimleyici Ekle" },
  { num: 161, title: "Zaman çizelgeleri", desc: "Timeline aracı ile tarihleri aylara ve yıllara göre kaydırarak dinamik filtreleme.", formula: "Zaman Çizelgesi" },
  { num: 162, title: "Pivot Chart", desc: "Özet tabloya bağlı canlı, dilimleyicilerle etkileşimli dinamik grafikler.", formula: "PivotChart Ekle" },
  { num: 163, title: "Grafiklere giriş", desc: "Doğru veriye doğru grafik seçme sanatı ve görsel iletişim kuralları.", formula: "Ekle > Grafik" },
  { num: 164, title: "Sütun grafik", desc: "Kategori karşılaştırmaları, departman ciroları ve dikey çubuk grafikleri.", formula: "Sütun Grafik" },
  { num: 165, title: "Çizgi grafik", desc: "Zaman içindeki trendleri, aylık büyüme ve kur değişimlerini görselleştirme.", formula: "Çizgi Grafik" },
  { num: 166, title: "Pasta grafik", desc: "Pazar payı ve bütçe dağılımı (en fazla 5-6 dilim kuralı ve halka grafik).", formula: "Pasta / Halka" },
  { num: 167, title: "Kombine grafik", desc: "Aynı grafikte hem Sütun (Ciro) hem Çizgi (Kar Marjı %) için İkincil Eksen kullanımı.", formula: "Birleşik Grafik" },
  { num: 168, title: "Grafik tasarımı", desc: "Gereksiz kılavuz çizgilerini temizleme, kurumsal renk paleti ve veri etiketleri.", formula: "Minimal Tasarım" },
  { num: 169, title: "Dinamik grafik", desc: "Dinamik aralıklara veya açılır kutulara bağlanan interaktif grafik motoru.", formula: "OFFSET / Tablo" },
  { num: 170, title: "KPI oluşturma", desc: "Temel Performans Göstergeleri (Key Performance Indicators) kartları ve büyük rakam tasarımı.", formula: "=TOPLA(Tablo[Ciro])" },
  { num: 171, title: "Dashboard mantığı", desc: "Yönetici Gösterge Paneli mimarisi, tek ekranda karar alma ve hiyerarşik yerleşim.", formula: "Yönetim Paneli" },
  { num: 172, title: "Profesyonel dashboard tasarımı", desc: "Izgara düzeni, renk kontrastı, kart yapıları ve göz akışı kuralları.", formula: "Grid Mimarisi" },
  { num: 173, title: "Satış dashboard'u", desc: "Bölge, temsilci ve ürün bazlı uçtan uca interaktif satış analiz paneli projesi.", formula: "Satış KPI Paneli" },
  { num: 174, title: "Finans dashboard'u", desc: "Gelir-gider, EBITDA, nakit dengesi ve bütçe gerçekleşme paneli.", formula: "Mali Dashboard" },
  { num: 175, title: "Performans dashboard'u", desc: "Çalışan hedefleri, proje tamamlama oranları ve departman karne paneli.", formula: "İK & Karne Paneli" }
];

LEVEL_5_EXTRA_SPECS.forEach((spec) => {
  LEVEL_5_LESSONS.push(
    defineLesson({
      lessonNumber: spec.num,
      level: 5,
      title: spec.title,
      description: spec.desc,
      difficulty: spec.num >= 170 ? "İleri" : "Orta",
      estimatedMinutes: 8,
      prerequisites: [`ders-${spec.num - 1}`],
      learningObjectives: [
        `${spec.title} konusunun analiz yeteneklerini öğrenmek`,
        `Verileri profesyonel görsel göstergelere ve Pivot yapılara dönüştürmek`,
        `Yöneticiler için karar destek panelleri inşa etmek`
      ],
      theory: [
        `Veri Analizi seviyesinde **${spec.title}**, ham sayı yığınlarını stratejik kararlara dönüştüren köprüdür.`,
        spec.desc,
        `Bu araçlar sayesinde yönetim kuruluna binlerce satırlık karmaşık tablolar yerine tek bakışta anlaşılan dinamik özetler sunulur.`
      ],
      examples: [
        {
          title: `${spec.title} Dashboard Örneği`,
          explanation: `Kurumsal analiz paneli bileşeni.`,
          formula: spec.formula,
          table: {
            headers: ["Kategori", "Hedef", "Gerçekleşen", "Başarı %"],
            rows: [
              ["Marmara", 500000, 560000, "%112"],
              ["İç Anadolu", 350000, 315000, "%90"]
            ]
          }
        },
        {
          title: "İnteraktif Filtreleme Senaryosu",
          explanation: `Dilimleyici tıklandığında grafik ve göstergelerin saliseler içinde tepki vermesi.`
        }
      ],
      realWorldExample: {
        department: "İş Zekası & Üst Yönetim",
        scenario: `Genel Müdür toplantısında sunulmak üzere şirketin tüm bölge ve ürün karlılıkları ${spec.title} ile görselleştirilir.`,
        outcome: "Yönetim 5 saniye içinde hangi bölgenin zayıf kaldığını tespit edip aksiyon alır."
      },
      stepByStep: [
        `Veri setinizi hazırlayın ve Ctrl+T ile resmi tabloya dönüştürün.`,
        `${spec.title} aracını (Ekle menüsü veya PivotTable) çalıştırın.`,
        `Görsel yerleşimi ve renk temasını kurumsal standartlara göre düzenleyin.`
      ],
      practiceExercises: [
        {
          prompt: `Alandaki hesaplama formülünü uygulayın.`,
          targetCell: "C2",
          expectedFormula: "=A2*B2",
          hint: "=A2*B2 yazın.",
          table: { headers: ["Birim", "Fiyat", "Toplam"], rows: [[10, 50, 500]] }
        },
        {
          prompt: `C3 hücresine de uygulayın.`,
          targetCell: "C3",
          expectedFormula: "=A3*B3",
          hint: "=A3*B3 yazın.",
          table: { headers: ["Birim", "Fiyat", "Toplam"], rows: [[10, 50, 500], [20, 40, 800]] }
        },
        {
          prompt: `D2 hücresine toplam kontrolünü girin.`,
          targetCell: "D2",
          expectedFormula: "=C2",
          hint: "=C2 yazın.",
          table: { headers: ["Toplam", "Kontrol"], rows: [[500, 500]] }
        }
      ],
      quizQuestions: [
        {
          question: `${spec.title} konusunun iş analitiğindeki ana hedefi nedir?`,
          options: [
            spec.desc,
            "Sadece veriyi gizlemek",
            "Dosyayı silmek",
            "Excel'i kapatmak"
          ],
          correctIndex: 0,
          explanation: spec.desc
        },
        {
          question: "Pivot Table veya Dashboard oluştururken en önemli altın kural hangisidir?",
          options: [
            "Kaynak tablonun temiz, birleştirilmiş hücresiz (merge edilmemiş) ve her sütunun benzersiz başlığa sahip olması",
            "Tüm hücreleri sarıya boyamak",
            "Her satıra boş satır eklemek",
            "Yalnızca tek sütun veri kullanmak"
          ],
          correctIndex: 0,
          explanation: "Temiz ve yapılandırılmış veri kaynağı, başarılı bir Pivot Table ve Dashboard'un temel şartıdır."
        },
        {
          question: "Dilimleyici (Slicer) butonları tıklandığında ne gerçekleşir?",
          options: [
            "Bağlı olduğu Pivot Table ve Pivot Grafikler seçilen kritere göre anında dinamik filtrelenir",
            "Dosya kapanır",
            "Tüm veriler silinir",
            "Hiçbir değişiklik olmaz"
          ],
          correctIndex: 0,
          explanation: "Dilimleyiciler görsel ve interaktif filtreleme butonlarıdır."
        }
      ],
      commonMistakes: [
        "Kaynak veride hücre birleştirmeleri (Merge Cells) yaparak Pivot Table motorunu kilitlemek."
      ],
      tips: [
        "Dashboard tasarlarken arka planı açık gri (#F8F9FA) tutup gösterge kartlarını beyaz yaparak profesyonel derinlik sağlayabilirsiniz."
      ],
      challenge: {
        title: `${spec.title} Görevi`,
        description: `C2 hücresine =A2*B2 formülünü uygulayın.`,
        targetCell: "C2",
        expectedFormula: "=A2*B2"
      }
    })
  );
});
