import { Lesson } from "../../types";
import { defineLesson } from "./helper";

export const LEVEL_6_LESSONS: Lesson[] = [
  defineLesson({
    lessonNumber: 176,
    level: 6,
    title: "Power Query nedir?",
    description: "Modern ETL (Extract, Transform, Load) aracı, veri temizleme otomasyonu ve M dili vizyonu.",
    difficulty: "İleri",
    estimatedMinutes: 9,
    prerequisites: ["ders-175"],
    learningObjectives: [
      "Power Query'nin Excel'deki devrimsel rolünü (ETL) kavramak",
      "Tekrarlayan manuel veri temizleme işlerini tek tıkla otomatik yenilenir hale getirmek",
      "Veri > Veri Al (Get Data) menüsünü tanımak"
    ],
    theory: [
      "Her ay veya her hafta ERP sisteminizden (SAP, Logo, Netsis vb.) berbat formatta bir Excel indirip saatlerce boşlukları siliyor, sütunları ayırıyor ve biçimleri düzeltiyorsanız **Power Query** hayatınızı kurtaracak araçtır.",
      "Power Query, Excel'in içine gömülü profesyonel bir **ETL (Veri Çekme, Dönüştürme, Yükleme)** motorudur.",
      "Siz adımları (sütun sil, büyük harf yap, boşlukları kırp) sadece bir kez fareyle yaparsınız; Power Query her adımı kaydeder.",
      "Gelecek ay yeni veri geldiğinde tek yapmanız gereken **'Yenile' (Refresh)** butonuna basmaktır. Tüm adımlar saliseler içinde otomatik tekrarlanır!"
    ],
    examples: [
      {
        title: "ERP Veri Temizleme",
        explanation: "Ham metin dosyasından gereksiz satırları atıp, tarih formatını düzeltip temiz tabloya dönüştürme."
      },
      {
        title: "Otomasyon Adımı",
        explanation: "Kaydedilen Uygulanan Adımlar (Applied Steps) paneli ile adım adım geri alabilme ve inceleme."
      }
    ],
    realWorldExample: {
      department: "Finans & Bilgi İşlem",
      scenario: "Her ay sonu 50 farklı mağazadan gelen ciro Excel'leri elle tek tek kopyalanıp birleştirilirken 2 gün harcanıyordu. Power Query ile bu süreç 3 saniyeye indi.",
      outcome: "Yılda yüzlerce iş günü tasarruf edildi, veri kopyalama hataları sıfırlandı."
    },
    stepByStep: [
      "Excel'de 'Veri' sekmesine geçin.",
      "'Veri Al' (Get Data) > 'Dosyadan' > 'Excel Çalışma Kitabından' yolunu izleyin.",
      "Açılan Gezgin penceresinde 'Verileri Dönüştür' (Transform Data) butonuna tıklayın.",
      "Karşınıza açılan pencere Power Query Düzenleyicisidir."
    ],
    practiceExercises: [
      {
        prompt: "A1 hücresine temizlenmiş veri başlığı olan 'Müşteri Kodu' yazın.",
        targetCell: "A1",
        expectedFormula: "Müşteri Kodu",
        hint: "A1 hücresine Müşteri Kodu yazın.",
        table: { headers: ["Müşteri Kodu"], rows: [["TR-1001"]] }
      },
      {
        prompt: "B1 hücresine 'Temiz Ciro' başlığını ekleyin.",
        targetCell: "B1",
        expectedFormula: "Temiz Ciro",
        hint: "B1 hücresine Temiz Ciro yazın.",
        table: { headers: ["Müşteri Kodu", "Temiz Ciro"], rows: [["TR-1001", 85000]] }
      },
      {
        prompt: "B2 hücresine temizlenen ciro rakamı olan 85000 değerini girin.",
        targetCell: "B2",
        expectedFormula: "85000",
        hint: "B2 hücresine 85000 yazın.",
        table: { headers: ["Müşteri Kodu", "Temiz Ciro"], rows: [["TR-1001", 85000]] }
      }
    ],
    quizQuestions: [
      {
        question: "Power Query'nin temel varoluş amacı nedir?",
        options: [
          "Farklı kaynaklardan gelen ham ve dağınık verileri çekmek, temizlemek, dönüştürmek ve otomatik yenilenebilir hale getirmek",
          "PowerPoint slaytları hazırlamak",
          "Yalnızca hücrelerin rengini değiştirmek",
          "Bilgisayara format atmak"
        ],
        correctIndex: 0,
        explanation: "Power Query kurumsal düzeyde bir ETL (Extract, Transform, Load) ve veri temizleme aracıdır."
      },
      {
        question: "Power Query'de yapılan veri dönüştürme adımları nereye kaydedilir?",
        options: [
          "Sağ taraftaki 'Uygulanan Adımlar' (Applied Steps) listesine",
          "Masaüstüne metin belgesi olarak",
          "Geri dönüşüm kutusuna",
          "Kaydedilmez, her seferinde baştan yapılır"
        ],
        correctIndex: 0,
        explanation: "Applied Steps paneli tüm dönüşüm işlemlerini sırayla kaydeder ve veri yenilendiğinde otomatik çalıştırır."
      },
      {
        question: "Kaynak dosyaya yeni veriler eklendiğinde Power Query raporunu güncellemek için ne yapılır?",
        options: [
          "Veri sekmesinden 'Tümünü Yenile' (Refresh All) butonuna basmak yeterlidir",
          "Tüm adımları sıfırdan elle tekrar yapmak gerekir",
          "Excel'i silip yeniden yüklemek gerekir",
          "Yeni bir bilgisayar almak gerekir"
        ],
        correctIndex: 0,
        explanation: "Tek tıkla Yenile butonuna basıldığında Power Query tüm adımları yeni veriye saniyeler içinde uygular."
      }
    ],
    commonMistakes: [
      "Power Query'yi bilmediği için her hafta saatlerce ham metinleri elle kopyala-yapıştır ile temizlemeye çalışmak."
    ],
    tips: [
      "Power Query arka planda 'M' adı verilen çok güçlü bir formül dili çalıştırır; formül çubuğunu açarak bu adımları görebilirsiniz."
    ],
    challenge: {
      title: "Power Query Giriş",
      description: "A1 hücresine 'ETL Tamamlandı' ifadesini girin.",
      targetCell: "A1",
      expectedFormula: "ETL Tamamlandı"
    }
  })
];

// Generate Level 6 lessons (177 to 196)
const LEVEL_6_EXTRA_SPECS = [
  { num: 177, title: "Power Query arayüzü", desc: "Şerit menü sekmeleri (Giriş, Dönüştür, Sütun Ekle, Görünüm) ve Gelişmiş Düzenleyici.", tool: "PQ Arayüzü" },
  { num: 178, title: "Veri içe aktarma", desc: "Excel, CSV, Metin dosyası, Klasör veya SQL veritabanından veri bağlama.", tool: "Veri Al" },
  { num: 179, title: "Veri temizleme", desc: "İlk satırı üst bilgi yapma, gereksiz sütunları kaldırma ve boş satırları filtreleme.", tool: "Temizleme" },
  { num: 180, title: "Sütunları dönüştürme", desc: "Büyük/küçük harf dönüşümü, kırpma, temizleme ve değer değiştirme.", tool: "Dönüştür" },
  { num: 181, title: "Veri türleri", desc: "Metin (ABC), Tamsayı (123), Ondalık Sayı (1.2) ve Tarih (Takvim) tiplerini katı şekilde sabitleme.", tool: "Tip Atama" },
  { num: 182, title: "Null ve boş değerler", desc: "Null değerleri doldurma (Aşağı Doldur - Fill Down) ve boşlukları yönetme.", tool: "Aşağı Doldur" },
  { num: 183, title: "Yinelenen veriler", desc: "Mükerrer anahtarları tespit etme ve Yinelenenleri Kaldır adımı.", tool: "Yinelenen Sil" },
  { num: 184, title: "Sütun bölme", desc: "Sınırlayıcıya göre (Boşluk, Virgül, Tire) veya karakter sayısına göre sütun ayırma.", tool: "Sütun Böl" },
  { num: 185, title: "Sütun birleştirme", desc: "İki veya daha fazla sütunu araya ayırıcı koyarak tek metin sütununda toplama.", tool: "Birleştir" },
  { num: 186, title: "Özel sütunlar", desc: "M dili formülü ile özel hesaplama ve mantıksal sütun üretme.", tool: "Özel Sütun" },
  { num: 187, title: "Koşullu sütunlar", desc: "Kod yazmadan görsel arayüzle 'Eğer ... ise ...' koşullu sütunları tanımlama.", tool: "Koşullu Sütun" },
  { num: 188, title: "Birden fazla dosyayı birleştirme", desc: "Bir klasör içindeki onlarca aylık Excel dosyasını tek tıkla otomatik alt alta birleştirme.", tool: "Klasörden Veri Al" },
  { num: 189, title: "Excel tablolarını birleştirme", desc: "Aynı dosya içindeki farklı sayfa tablolarını sorgu ile bağlama.", tool: "Tablo Konsolidasyon" },
  { num: 190, title: "Merge Queries", desc: "Sorguları Birleştir: DÜŞEYARA yapmadan iki tabloyu anahtar sütun üzerinden SQL JOIN ile bağlama.", tool: "Sorguları Birleştir" },
  { num: 191, title: "Append Queries", desc: "Sorguları Ekle: Farklı dönemlere ait tabloları alt alta ekleyerek dev bir ana veri tablosu oluşturma.", tool: "Sorguları Ekle" },
  { num: 192, title: "Power Query ile rapor hazırlama", desc: "Dönüştürülmüş veriyi doğrudan Excel sayfasına veya Veri Modeline (Data Model) yükleme.", tool: "Kapat ve Yükle" },
  { num: 193, title: "Yenileme mantığı", desc: "Dosya açıldığında otomatik yenileme, arka plan yenilemeleri ve parametrik yollar.", tool: "Otomatik Yenileme" },
  { num: 194, title: "Veri modeline giriş", desc: "Power Pivot, ilişkisel veritabanı (1-to-many ilişkiler) ve DAX temelleri.", tool: "Veri Modeli" },
  { num: 195, title: "Büyük veri setleri", desc: "Excel'in 1 milyon satır sınırını aşarak Power Pivot ile 10 milyon satırlık veriyi analiz etme.", tool: "Power Pivot" },
  { num: 196, title: "Profesyonel raporlama", desc: "Uçtan uca otomatik çalışan kurumsal veri boru hattı (Data Pipeline) projesi.", tool: "Kurumsal Pipeline" }
];

LEVEL_6_EXTRA_SPECS.forEach((spec) => {
  LEVEL_6_LESSONS.push(
    defineLesson({
      lessonNumber: spec.num,
      level: 6,
      title: spec.title,
      description: spec.desc,
      difficulty: "Uzman",
      estimatedMinutes: 9,
      prerequisites: [`ders-${spec.num - 1}`],
      learningObjectives: [
        `${spec.title} konusunun veri mühendisliği mantığını kavramak`,
        `Power Query ile tekrarlayan işleri sıfıra indiren otomasyon kurgulamak`,
        `Büyük kurumsal veri setlerini hatasız modellemek`
      ],
      theory: [
        `Profesyonel Excel seviyesinde **${spec.title}**, modern veri analistlerinin en güçlü silahıdır.`,
        spec.desc,
        `Bu araç sayesinde manuel iş gücü minimuma inerken verilerin tutarlılığı, doğruluğu ve denetlenebilirliği yüzde yüz garanti altına alınır.`
      ],
      examples: [
        {
          title: `${spec.title} Kurumsal Adımı`,
          explanation: `Power Query dönüştürme adımının yapılandırılmış tablodaki karşılığı.`,
          table: {
            headers: ["İşlem Kodu", "Kaynak Dosya", "Durum"],
            rows: [
              ["ETL-01", "2026_Satislar.csv", "Başarıyla Yüklendi"],
              ["ETL-02", "Musteri_Listesi.xlsx", "İlişkilendirildi"]
            ]
          }
        },
        {
          title: "Sorgu Birleştirme ve Optimizasyon",
          explanation: `Otomatik yenileme esnasında sorgunun optimize çalışması.`
        }
      ],
      realWorldExample: {
        department: "Veri Mühendisliği & Finansal Kontrol",
        scenario: `12 farklı şubenin günlük satış dosyaları her sabah bir klasöre atılır; ${spec.title} bu dosyaları otomatik tarayıp genel merkeze tek bir özet tablo sunar.`,
        outcome: "Her gün 3 saat süren konsolidasyon mesaisi tamamen ortadan kalkar."
      },
      stepByStep: [
        `Veri > Veri Al yolundan Power Query Düzenleyicisini açın.`,
        `${spec.title} işlemini ilgili menü adımı ile uygulayın.`,
        `'Kapat ve Yükle' (Close & Load) diyerek sonucu çalışma sayfanıza aktarın.`
      ],
      practiceExercises: [
        {
          prompt: `A1 hücresine kontrol başlığı olarak 'Otomasyon Durumu' yazın.`,
          targetCell: "A1",
          expectedFormula: "Otomasyon Durumu",
          hint: "A1 hücresine Otomasyon Durumu yazın.",
          table: { headers: ["Otomasyon Durumu"], rows: [["Hazır"]] }
        },
        {
          prompt: `B1 hücresine veri satır sayısını 10000 olarak girin.`,
          targetCell: "B1",
          expectedFormula: "10000",
          hint: "B1 hücresine 10000 yazın.",
          table: { headers: ["Otomasyon Durumu", "Satır"], rows: [["Hazır", 10000]] }
        },
        {
          prompt: `C1 hücresine 'Aktif' yazın.`,
          targetCell: "C1",
          expectedFormula: "Aktif",
          hint: "C1 hücresine Aktif yazın.",
          table: { headers: ["Durum"], rows: [["Aktif"]] }
        }
      ],
      quizQuestions: [
        {
          question: `${spec.title} uygulamasının temel iş faydası nedir?`,
          options: [
            spec.desc,
            "Bilgisayarın ekranını kapatır",
            "Yazıcıyı sıfırlar",
            "Hücrelerin yerini karıştırır"
          ],
          correctIndex: 0,
          explanation: spec.desc
        },
        {
          question: "Power Query'de Merge Queries (Sorguları Birleştir) işlemi Excel'deki hangi fonksiyonun kurumsal alternatifidir?",
          options: [
            "DÜŞEYARA / ÇAPRAZARA (VLOOKUP / XLOOKUP)",
            "TOPLA",
            "YAZIM.DÜZENİ",
            "MİN"
          ],
          correctIndex: 0,
          explanation: "Merge Queries iki tabloyu anahtar alan üzerinden bağlayarak DÜŞEYARA ihtiyacını ortadan kaldırır."
        },
        {
          question: "Append Queries (Sorguları Ekle) işlemi ne yapar?",
          options: [
            "Aynı veya benzer yapıdaki birden fazla tabloyu alt alta ekleyerek tek bir uzun ana tablo oluşturur",
            "Tabloları siler",
            "Tabloları çarpar",
            "Hücreleri sağa kaydırır"
          ],
          correctIndex: 0,
          explanation: "Append (Ekle), SQL'deki UNION ALL mantığıyla tabloları alt alta birleştirir."
        }
      ],
      commonMistakes: [
        "Klasör birleştirme yaparken klasör içindeki dosyalarda farklı sütun başlıkları kullanmak (başlıklar birebir aynı olmalıdır)."
      ],
      tips: [
        "Power Query adımlarını adlandırırken 'Filtrelenmiş Satırlar' yerine 'Pasif Müşteriler Çıkarıldı' gibi açıklayıcı adlar verin."
      ],
      challenge: {
        title: `${spec.title} Otomasyonu`,
        description: `A1 hücresine 'Veri Akışı Tamam' ifadesini girin.`,
        targetCell: "A1",
        expectedFormula: "Veri Akışı Tamam"
      }
    })
  );
});
