import { Lesson } from "../../types";
import { defineLesson } from "./helper";

export const LEVEL_0_LESSONS: Lesson[] = [
  defineLesson({
    lessonNumber: 1,
    level: 0,
    title: "Excel nedir?",
    description: "Elektronik hesap tablosu kavramı, Excel'in modern iş dünyasındaki yeri ve çalışma mantığı.",
    difficulty: "Başlangıç",
    estimatedMinutes: 6,
    prerequisites: [],
    learningObjectives: [
      "Elektronik hesap tablosu (spreadsheet) kavramını kavramak",
      "Excel arayüzünün temel bileşenlerini tanımak",
      "Hızlı erişim çubuğu ve Şerit (Ribbon) menüyü kullanabilmek"
    ],
    theory: [
      "Microsoft Excel, sayısal verileri depolamak, organize etmek, hesaplamak ve grafiklerle görselleştirmek için geliştirilmiş dünyanın en yaygın elektronik hesap tablosu yazılımıdır.",
      "Geleneksel kağıt tablolardan farkı, herhangi bir veriyi değiştirdiğinizde bu veriye bağlı tüm hesaplamaların ve grafiklerin saliseler içinde otomatik olarak güncellenmesidir.",
      "En üstte 'Şerit' (Ribbon) menü (Giriş, Ekle, Sayfa Düzeni, Formüller, Veri vb.), ortada hücre ızgarası, sol üstte Ad Kutusu ve formül çubuğu (`fx`) yer alır."
    ],
    examples: [
      {
        title: "Şirket Gelir-Gider Dengesi",
        explanation: "Hücrelerdeki gelir ve gider tutarları değiştikçe kar/zarar hücresi anında yeniden hesaplanır.",
        table: {
          headers: ["Kalem", "Tutar (₺)"],
          rows: [
            ["Satış Geliri", 150000],
            ["Ofis Kirası", 25000],
            ["Net Kar", 125000]
          ]
        }
      },
      {
        title: "Dinamik Bütçe Güncellemesi",
        explanation: "Gider kalemlerinden biri arttığında net kar elle hesap makinesine gerek kalmadan anında düşer."
      }
    ],
    realWorldExample: {
      department: "Genel Yönetim / Finans",
      scenario: "Küçük veya büyük ölçekli her işletme nakit akışını ve çalışan listesini Excel ile hatasız ve organize biçimde takip eder.",
      outcome: "Manuel hesaplama hataları sıfırlanır, yönetim tek bakışta kar/zarar tablosunu görebilir."
    },
    stepByStep: [
      "Excel'i açın ve 'Boş Çalışma Kitabı' seçeneğine tıklayın.",
      "Üstteki yeşil Şerit (Ribbon) sekmelerini inceleyin: Giriş, Ekle, Formüller.",
      "Sol üstteki 'A1' yazan kutucuğun 'Ad Kutusu', yanındaki alanın ise 'Formül Çubuğu' olduğunu gözlemleyin."
    ],
    practiceExercises: [
      {
        prompt: "A1 hücresine şirket adınızı temsil eden 'Atlas A.Ş.' değerini girmek için formül çubuğuna yazıp Enter'a basın.",
        targetCell: "A1",
        expectedFormula: "Atlas A.Ş.",
        hint: "A1 hücresine tıklayın ve metni yazın.",
        table: { headers: ["Şirket"], rows: [["Atlas A.Ş."]] }
      },
      {
        prompt: "B1 hücresine ilk bütçe değeriniz olan 50000 rakamını girin.",
        targetCell: "B1",
        expectedFormula: "50000",
        hint: "Sayı girerken nokta veya virgül yerine doğrudan 50000 yazın.",
        table: { headers: ["Bütçe"], rows: [[50000]] }
      },
      {
        prompt: "C1 hücresine =B1 yazarak bütçe verisini doğrudan referans alın.",
        targetCell: "C1",
        expectedFormula: "=B1",
        hint: "=B1 yazarak Enter'a basın.",
        table: { headers: ["Kopya Bütçe"], rows: [[50000]] }
      }
    ],
    quizQuestions: [
      {
        question: "Excel'in temel kullanım amacı aşağıdakilerden hangisidir?",
        options: [
          "Veri depolama, matematiksel hesaplamalar yapma ve veri görselleştirme",
          "Yalnızca slayt gösterisi hazırlama",
          "Yalnızca ses ve video düzenleme",
          "Web sitesi kodu derleme"
        ],
        correctIndex: 0,
        explanation: "Excel, sayısal verileri yönetmek, hesaplamak ve analiz etmek için tasarlanmış bir hesap tablosu yazılımıdır."
      },
      {
        question: "Excel'de formül yazdığımız veya seçili hücrenin içeriğini gördüğümüz çubuğun adı nedir?",
        options: ["Formül Çubuğu (Formula Bar)", "Durum Çubuğu", "Başlık Çubuğu", "Kaydırma Çubuğu"],
        correctIndex: 0,
        explanation: "fx simgesinin yanında yer alan uzun alan Formül Çubuğudur."
      },
      {
        question: "Bir hücredeki sayı değiştiğinde bu hücreye bağlı formül sonuçları ne olur?",
        options: [
          "Otomatik olarak anında güncellenir",
          "Değişmez, Excel'i yeniden başlatmak gerekir",
          "Hata verir",
          "Sadece dosya kaydedildiğinde güncellenir"
        ],
        correctIndex: 0,
        explanation: "Excel dinamik bir hesap tablosudur; girdi verisi değiştiğinde tüm bağlı formüller anında yeniden hesaplanır."
      }
    ],
    commonMistakes: [
      "Excel'i bir metin düzenleyici gibi kullanıp hesaplamaları hesap makinesiyle yapıp hücreye elle yazmak.",
      "Formül yazarken eşittir (=) işaretini unutmak."
    ],
    tips: [
      "Şerit menüdeki butonların üzerine fareyi getirdiğinizde Excel size o özelliğin ne işe yaradığını ve klavye kısayolunu gösterir."
    ],
    challenge: {
      title: "İlk Şirket Satırı",
      description: "A1 hücresine 'Satış', B1 hücresine 100000 yazarak ilk veri satırınızı oluşturun.",
      targetCell: "A1",
      expectedFormula: "Satış"
    }
  }),

  defineLesson({
    lessonNumber: 2,
    level: 0,
    title: "Excel hangi işlerde kullanılır?",
    description: "Finans, İK, pazarlama, lojistik ve satış departmanlarında Excel kullanım alanları ve iş modelleri.",
    difficulty: "Başlangıç",
    estimatedMinutes: 6,
    prerequisites: ["ders-1"],
    learningObjectives: [
      "Departman bazlı Excel kullanım alanlarını anlamak",
      "İş hayatında en sık karşılaşılan Excel senaryolarını öğrenmek",
      "Kariyeriniz için Excel'in neden kritik bir yetkinlik olduğunu kavramak"
    ],
    theory: [
      "Excel günümüzde muhasebeden tedarik zincirine kadar kurumsal dünyanın ortak dili haline gelmiştir.",
      "Finans ve Muhasebe departmanlarında: Bütçe hazırlama, nakit akışı tablosu, amortisman ve fatura mutabakatı.",
      "İnsan Kaynaklarında (İK): Personel bordroları, izin günleri takibi, kıdem tazminatı hesaplamaları ve yıllık performans değerlendirmeleri.",
      "Satış & Pazarlamada: Satış hedefleri, prim baremleri, kampanya maliyetleri ve müşteri analitiği tabloları oluşturulur."
    ],
    examples: [
      {
        title: "İnsan Kaynakları İzin Takip Listesi",
        explanation: "Personel adı, toplam izin hakkı ve kalan izin günleri formülle izlenir.",
        table: {
          headers: ["Personel", "Hak Edilen İzin", "Kullanılan", "Kalan"],
          rows: [
            ["Ahmet Yılmaz", 14, 5, 9],
            ["Ayşe Kaya", 20, 12, 8]
          ]
        }
      },
      {
        title: "Satış Temsilcisi Prim Listesi",
        explanation: "Kotayı aşan satışçılara otomatik prim yüzdesi uygulanması."
      }
    ],
    realWorldExample: {
      department: "Satış ve Operasyon",
      scenario: "Bölge müdürü, 5 farklı mağazanın haftalık ciro verilerini toplayıp en başarılı mağazayı ödüllendirmek için Excel kullanır.",
      outcome: "Kararlar hissiyata göre değil, tablodaki somut metriklere göre objektif şekilde alınır."
    },
    stepByStep: [
      "Çalışma alanında departman bazlı sütun başlıkları belirleyin.",
      "Sayısal verileri metinlerden ayrı sütunlara yerleştirin.",
      "Özet değerler için alt toplamlardan yararlanın."
    ],
    practiceExercises: [
      {
        prompt: "A1 hücresine 'Departman', B1 hücresine 'Bütçe' başlıklarını yazın. A1 için 'Departman' girin.",
        targetCell: "A1",
        expectedFormula: "Departman",
        hint: "A1 hücresine Departman yazın.",
        table: { headers: ["Departman", "Bütçe"], rows: [["Pazarlama", 120000]] }
      },
      {
        prompt: "B2 hücresine Pazarlama departmanı bütçesi olan 120000 yazın.",
        targetCell: "B2",
        expectedFormula: "120000",
        hint: "Doğrudan 120000 yazıp Enter tuşuna basın.",
        table: { headers: ["Departman", "Bütçe"], rows: [["Pazarlama", 120000]] }
      },
      {
        prompt: "A3 hücresine 'Satış', B3 hücresine 250000 yazın. B3 için 250000 girin.",
        targetCell: "B3",
        expectedFormula: "250000",
        hint: "B3 hücresine 250000 yazın.",
        table: { headers: ["Departman", "Bütçe"], rows: [["Satış", 250000]] }
      }
    ],
    quizQuestions: [
      {
        question: "İnsan Kaynakları departmanı Excel'i en çok hangi amaçla kullanır?",
        options: [
          "Personel listesi, izin günleri ve maaş-bordro hesaplamaları",
          "Web sayfası animasyonu tasarlamak",
          "Müzik kaydı yapmak",
          "3 Boyutlu mimari modelleme"
        ],
        correctIndex: 0,
        explanation: "İK ekipleri personel özlük bilgileri, bordrolar ve izin takipleri için yoğun biçimde Excel kullanır."
      },
      {
        question: "Satış departmanında Excel kullanımının en kritik faydası nedir?",
        options: [
          "Hedef-gerçekleşen satış analizleri ve prim hesaplamalarını otomatik yürütmek",
          "Yalnızca e-posta göndermek",
          "Görsel afiş basmak",
          "Yazıcı sürücüsü güncellemek"
        ],
        correctIndex: 0,
        explanation: "Satış yöneticileri kotaları, ciro analizlerini ve satışçı performanslarını Excel tablolarıyla ölçer."
      },
      {
        question: "Excel'de metin ile sayıyı aynı hücreye '500 TL' şeklinde elle yazmak neden sakıncalıdır?",
        options: [
          "Hücre metne dönüşür ve matematiksel formüllerde (#DEĞER! hatası) toplanamaz",
          "Excel tamamen kilitlenir",
          "Yazıcıdan çıktı alınamaz",
          "Hiçbir sakıncası yoktur"
        ],
        correctIndex: 0,
        explanation: "Sayılar yalın girilmeli, para birimi simgesi hücre biçimlendirmesi ile verilmelidir."
      }
    ],
    commonMistakes: [
      "Sayısal değerin yanına elle 'TL', 'adet', 'kg' yazıp hücreyi formüller için işlevsiz hale getirmek."
    ],
    tips: [
      "Hücreye sadece sayıyı (örn: 500) yazın, ardından Giriş sekmesinden 'Para Birimi' biçimi verin."
    ],
    challenge: {
      title: "Finans Özeti",
      description: "B2 hücresine ciro hedefi olarak 500000 değerini tanımlayın.",
      targetCell: "B2",
      expectedFormula: "500000"
    }
  }),

  defineLesson({
    lessonNumber: 3,
    level: 0,
    title: "Excel çalışma kitabı nedir?",
    description: "Çalışma kitabı (Workbook) yapısı, .xlsx dosya formatı, kaydetme ve şablon mantığı.",
    difficulty: "Başlangıç",
    estimatedMinutes: 6,
    prerequisites: ["ders-1"],
    learningObjectives: [
      "Çalışma Kitabı (Workbook) ile Çalışma Sayfası (Worksheet) arasındaki farkı anlamak",
      ".xlsx ve .xlsm dosya uzantılarının anlamını öğrenmek",
      "Çalışma kitabını kaydetme ve farklı kaydetme yöntemlerini uygulamak"
    ],
    theory: [
      "Excel'de açtığınız veya kaydettiğiniz her bir dosyaya 'Çalışma Kitabı' (Workbook) denir. Dosya uzantısı varsayılan olarak `.xlsx`'tir.",
      "Tıpkı gerçek bir defter gibi düşünün: Çalışma kitabı dosyanın tamamıdır, defterin içindeki her bir yaprak ise bir 'Çalışma Sayfası'dır (Worksheet).",
      "Bir çalışma kitabı içinde yüzlerce ayrı sayfa barındırabilir; örneğin Ocak, Şubat, Mart aylarını aynı kitabın farklı sayfalarında tutabilirsiniz.",
      "Makro içeren dosyalar `.xlsm` uzantısıyla, eski Excel sürümleri ise `.xls` uzantısıyla saklanır."
    ],
    examples: [
      {
        title: "2026_Yillik_Butce.xlsx",
        explanation: "Tek bir çalışma kitabı dosyasıdır ve içinde 'Gelirler', 'Giderler', 'Özet' adında 3 ayrı sayfa barındırır."
      },
      {
        title: "Personel_Takip_Sistemi.xlsm",
        explanation: "İçinde otomatik formlar ve VBA makroları bulunan çalışma kitabı uzantısıdır."
      }
    ],
    realWorldExample: {
      department: "Muhasebe & Raporlama",
      scenario: "Yıl sonu mali kapanışında muhasebe müdürü tüm yılı '2026_Mali_Rapor.xlsx' adlı tek bir çalışma kitabında toplar.",
      outcome: "Onlarca dağınık dosya yerine tek bir çalışma kitabında tüm yılın verisi düzenli saklanır."
    },
    stepByStep: [
      "Dosya > Kaydet veya `Ctrl + S` kısayoluna basın.",
      "Dosyanıza anlamlı bir isim verin (örn: '2026_Sirket_Butcesi').",
      "Kayıt türü olarak 'Excel Çalışma Kitabı (*.xlsx)' seçildiğinden emin olun."
    ],
    practiceExercises: [
      {
        prompt: "A1 hücresine çalışma kitabımızın ana başlığı olan '2026 Bütçesi' yazın.",
        targetCell: "A1",
        expectedFormula: "2026 Bütçesi",
        hint: "A1 hücresine metni aynen yazın.",
        table: { headers: ["Başlık"], rows: [["2026 Bütçesi"]] }
      },
      {
        prompt: "A2 hücresine 'Sayfa 1: Gelirler' yazarak sayfa açıklamasını ekleyin.",
        targetCell: "A2",
        expectedFormula: "Sayfa 1: Gelirler",
        hint: "Metni A2 hücresine girin.",
        table: { headers: ["Başlık", "Alt Başlık"], rows: [["2026 Bütçesi", "Sayfa 1: Gelirler"]] }
      },
      {
        prompt: "B2 hücresine ilk sayfa toplam geliri olan 850000 yazın.",
        targetCell: "B2",
        expectedFormula: "850000",
        hint: "B2 hücresine 850000 yazın.",
        table: { headers: ["Alt Başlık", "Toplam"], rows: [["Sayfa 1: Gelirler", 850000]] }
      }
    ],
    quizQuestions: [
      {
        question: "Excel'de bir dosyanın tamamına ne ad verilir?",
        options: ["Çalışma Kitabı (Workbook)", "Çalışma Sayfası (Worksheet)", "Hücre Tablosu", "Şerit Menü"],
        correctIndex: 0,
        explanation: "Dosyanın kendisi Çalışma Kitabıdır; içindeki sekmeler ise Çalışma Sayfalarıdır."
      },
      {
        question: "Modern Excel dosyalarının standart dosya uzantısı hangisidir?",
        options: [".xlsx", ".docx", ".pptx", ".exe"],
        correctIndex: 0,
        explanation: "Standart Excel çalışma kitapları `.xlsx` uzantısına sahiptir."
      },
      {
        question: "Bir çalışma kitabında kaç çalışma sayfası bulunabilir?",
        options: [
          "Bilgisayarınızın bellek (RAM) kapasitesine bağlı olarak binlerce",
          "Sadece 1 adet",
          "Maksimum 3 adet",
          "En fazla 12 adet"
        ],
        correctIndex: 0,
        explanation: "Excel'de sayfa sınırı sabit bir sayı değildir, sistem belleği elverdiği sürece binlerce sayfa eklenebilir."
      }
    ],
    commonMistakes: [
      "Her yeni ay veya departman için yeni bir Excel dosyası açıp masaüstünü yüzlerce dosya ile doldurmak (bunun yerine tek kitapta sayfalar kullanılmalıdır)."
    ],
    tips: [
      "Çalışırken her 10-15 dakikada bir `Ctrl + S` tuşlarına basarak verilerinizi kaydetmeyi alışkanlık haline getirin."
    ],
    challenge: {
      title: "Kitap Başlığı Tanımlama",
      description: "A1 hücresine 'Konsolide Rapor' metnini girin.",
      targetCell: "A1",
      expectedFormula: "Konsolide Rapor"
    }
  }),

  defineLesson({
    lessonNumber: 4,
    level: 0,
    title: "Çalışma sayfası nedir?",
    description: "Sayfa sekmeleri, sayfa ekleme, yeniden adlandırma, renk verme ve sayfaları taşıma/kopyalama.",
    difficulty: "Başlangıç",
    estimatedMinutes: 6,
    prerequisites: ["ders-3"],
    learningObjectives: [
      "Çalışma sayfası sekmelerini yönetebilmek",
      "Sayfaları yeniden adlandırmak ve renk kodlarıyla organize etmek",
      "Sayfalar arası geçiş ve kopyalama işlemlerini öğrenmek"
    ],
    theory: [
      "Çalışma sayfası, satır ve sütunların kesişiminden oluşan devasa ızgara alanıdır.",
      "Modern bir Excel çalışma sayfasında tam **1.048.576 satır** ve **16.384 sütun** bulunur. Bu da bir sayfada 17 milyardan fazla hücre anlamına gelir!",
      "Ekranın sol alt köşesinde sayfa sekmeleri yer alır (Sayfa1, Sayfa2 vb.). Yanındaki `+` butonuna basarak yeni bir sayfa eklenebilir.",
      "Sekmeye çift tıklayarak 'Ocak 2026', 'Stok Listesi' gibi anlamlı isimler verebilir, sağ tıklayıp 'Sekme Rengi' ile önemli sayfaları yeşil/kırmızı yapabilirsiniz."
    ],
    examples: [
      {
        title: "Aylık Gelir Sekmeleri",
        explanation: "Sekmeler: 'Ocak', 'Şubat', 'Mart', 'Nisan' şeklinde sıralanarak yıllık veri ayrıştırılır."
      },
      {
        title: "Departman Sayfaları",
        explanation: "Yeşil sekmeler: Satış, Mavi sekmeler: Pazarlama, Sarı sekmeler: İnsan Kaynakları."
      }
    ],
    realWorldExample: {
      department: "Pazarlama ve Reklam",
      scenario: "Pazarlama uzmanı Google Ads, Meta ve LinkedIn reklam harcamalarını tek kitap içinde 3 ayrı sekmede izler.",
      outcome: "Her kanalın verisi temiz kalır, birbirine karışmaz ve 'Genel Özet' sayfasında konsolide edilir."
    },
    stepByStep: [
      "Ekranın altındaki 'Sayfa1' sekmesine çift tıklayın ve 'Ocak' yazın.",
      "Yanındaki `+` butonuna tıklayarak yeni bir sayfa oluşturun ve 'Şubat' olarak adlandırın.",
      "Sekmeye sağ tıklayıp 'Sekme Rengi'nden yeşil bir renk belirleyin."
    ],
    practiceExercises: [
      {
        prompt: "A1 hücresine aktif sayfanın adını belirten 'Ocak 2026' yazın.",
        targetCell: "A1",
        expectedFormula: "Ocak 2026",
        hint: "A1 hücresine metni girin.",
        table: { headers: ["Sayfa"], rows: [["Ocak 2026"]] }
      },
      {
        prompt: "B1 hücresine bu sayfanın toplam kayıt sayısını '150 Satır' olarak girin.",
        targetCell: "B1",
        expectedFormula: "150 Satır",
        hint: "B1 hücresine 150 Satır yazın.",
        table: { headers: ["Sayfa", "Kayıt"], rows: [["Ocak 2026", "150 Satır"]] }
      },
      {
        prompt: "C1 hücresine durum bilgisi olarak 'Tamamlandı' yazın.",
        targetCell: "C1",
        expectedFormula: "Tamamlandı",
        hint: "C1 hücresine Tamamlandı yazın.",
        table: { headers: ["Durum"], rows: [["Tamamlandı"]] }
      }
    ],
    quizQuestions: [
      {
        question: "Bir Excel çalışma sayfasında kaç satır bulunur?",
        options: ["1.048.576 satır", "65.536 satır", "10.000 satır", "Sınırsız"],
        correctIndex: 0,
        explanation: "Excel (.xlsx) formatında her çalışma sayfasında tam olarak 1.048.576 satır mevcuttur."
      },
      {
        question: "Çalışma sayfasını yeniden adlandırmanın en hızlı yolu nedir?",
        options: [
          "Alttaki sayfa sekmesine çift tıklayıp yeni adı yazmak",
          "Excel'i kapatıp dosya adını değiştirmek",
          "F1 tuşuna basmak",
          "Tüm hücreleri silmek"
        ],
        correctIndex: 0,
        explanation: "Sekme üzerine çift tıklandığında sekme adı düzenleme moduna geçer."
      },
      {
        question: "Sayfalar arasında klavye ile hızlıca geçiş yapmak için hangi kısayol kullanılır?",
        options: ["Ctrl + Page Down / Ctrl + Page Up", "Ctrl + C / Ctrl + V", "Alt + F4", "Shift + Space"],
        correctIndex: 0,
        explanation: "Ctrl + Page Down bir sonraki sayfaya, Ctrl + Page Up bir önceki sayfaya geçişi sağlar."
      }
    ],
    commonMistakes: [
      "Sayfalara 'Sayfa1', 'Sayfa2', 'Sayfa3' gibi varsayılan isimler bırakıp 3 ay sonra hangi sayfada ne olduğunu bulamamak."
    ],
    tips: [
      "Ctrl tuşuna basılı tutarak bir sayfa sekmesini sağa sürüklerseniz o sayfanın birebir kopyası hemen yanına eklenir."
    ],
    challenge: {
      title: "Sayfa Etiketi",
      description: "A1 hücresine 'Özet Raporu' başlığını girin.",
      targetCell: "A1",
      expectedFormula: "Özet Raporu"
    }
  }),

  defineLesson({
    lessonNumber: 5,
    level: 0,
    title: "Satır nedir?",
    description: "Yatay satır yapısı, satır numaralandırması (1, 2, 3...) ve satır bazlı veri mimarisi.",
    difficulty: "Başlangıç",
    estimatedMinutes: 5,
    prerequisites: ["ders-4"],
    learningObjectives: [
      "Satır kavramının veritabanı mantığındaki 'Kayıt' (Record) karşılığını öğrenmek",
      "Satır numaralarını (1'den 1.048.576'ya kadar) tanımak",
      "Tüm satırı tek tıklamayla seçmeyi kavramak"
    ],
    theory: [
      "Excel çalışma sayfasında soldan sağa uzanan yatay şeritlere 'Satır' (Row) adı verilir.",
      "Satırlar çalışma sayfasının en solundaki gri alanda yer alan sayılarla (1, 2, 3, 4...) temsil edilir.",
      "Veri tabanı mimarisinde her bir satır genellikle **tek bir varlığa ait kaydı** (Record) ifade eder. Örneğin Satır 2 Ahmet Yılmaz'ın tüm bilgilerini, Satır 3 ise Ayşe Kaya'nın tüm bilgilerini tutar."
    ],
    examples: [
      {
        title: "Personel Kayıt Satırı",
        explanation: "Satır 2: Adı 'Mert', Soyadı 'Demir', Departmanı 'Finans', Maaşı '45000'.",
        table: {
          headers: ["Satır No", "Ad", "Soyad", "Departman", "Maaş"],
          rows: [
            [2, "Mert", "Demir", "Finans", 45000],
            [3, "Selin", "Aydın", "Pazarlama", 48000]
          ]
        }
      },
      {
        title: "Sipariş Satırı",
        explanation: "Her yeni müşteri siparişi alt alta yeni bir satır olarak kaydedilir."
      }
    ],
    realWorldExample: {
      department: "E-Ticaret / Müşteri Hizmetleri",
      scenario: "Günde 500 sipariş alan bir e-ticaret sitesinde her sipariş Excel tablosuna yeni bir satır olarak eklenir.",
      outcome: "Kayıtlar birbirine karışmaz, her satır bağımsız bir sipariş numarasıyla izlenir."
    },
    stepByStep: [
      "Sayfanın solundaki gri alanda yer alan '2' numaralı satır başlığına tıklayın.",
      "Tüm 2. satırın baştan sona (XFD sütununa kadar) seçildiğini gözlemleyin.",
      "`Shift + Boşluk` kısayoluyla da seçili hücrenin satırını tamamen seçebilirsiniz."
    ],
    practiceExercises: [
      {
        prompt: "A2 hücresine ilk personelin adı olan 'Can' yazın.",
        targetCell: "A2",
        expectedFormula: "Can",
        hint: "A2 hücresine tıklayın ve Can yazın.",
        table: { headers: ["Ad", "Şehir"], rows: [["Can", "İzmir"]] }
      },
      {
        prompt: "B2 hücresine personelin şehri olan 'İzmir' yazın.",
        targetCell: "B2",
        expectedFormula: "İzmir",
        hint: "B2 hücresine İzmir yazın.",
        table: { headers: ["Ad", "Şehir"], rows: [["Can", "İzmir"]] }
      },
      {
        prompt: "A3 hücresine ikinci personel 'Deniz' yazın.",
        targetCell: "A3",
        expectedFormula: "Deniz",
        hint: "A3 hücresine Deniz yazın.",
        table: { headers: ["Ad", "Şehir"], rows: [["Can", "İzmir"], ["Deniz", "Bursa"]] }
      }
    ],
    quizQuestions: [
      {
        question: "Excel'de satırlar nasıl isimlendirilir?",
        options: ["Sayılarla (1, 2, 3...)", "Harflerle (A, B, C...)", "Romen rakamlarıyla", "Renklerle"],
        correctIndex: 0,
        explanation: "Satırlar daima 1'den başlayıp 1.048.576'ya kadar giden sayılarla adlandırılır."
      },
      {
        question: "Bir tablonun 1. satırında genellikle ne bulunur?",
        options: ["Sütun Başlıkları (Alan Adları)", "Toplam Formülü", "Grafik", "Şirket Logosu"],
        correctIndex: 0,
        explanation: "1. satır standart olarak tablonun sütun başlıklarına (Ad, Soyad, Maaş vb.) ayrılır."
      },
      {
        question: "Klavye ile bulunduğunuz satırın tamamını seçmek için hangi kısayol kullanılır?",
        options: ["Shift + Boşluk (Space)", "Ctrl + Boşluk (Space)", "Ctrl + A", "Alt + Enter"],
        correctIndex: 0,
        explanation: "Shift + Boşluk aktif hücrenin bulunduğu tüm satırı seçer."
      }
    ],
    commonMistakes: [
      "Farklı müşterilerin verilerini aynı satırın içine virgülle yan yana yazmak (her müşteri mutlaka ayrı bir satırda olmalıdır)."
    ],
    tips: [
      "Satır numarasının üzerine tıkladığınızda tüm satır anında seçilir ve sarı/yeşil renkle vurgulanabilir."
    ],
    challenge: {
      title: "Satır Verisi",
      description: "A2 hücresine 'Müşteri Kaydı' ifadesini girin.",
      targetCell: "A2",
      expectedFormula: "Müşteri Kaydı"
    }
  }),

  defineLesson({
    lessonNumber: 6,
    level: 0,
    title: "Sütun nedir?",
    description: "Düşey sütun yapısı, sütun harflendirmesi (A, B... Z, AA... XFD) ve alan (field) mantığı.",
    difficulty: "Başlangıç",
    estimatedMinutes: 5,
    prerequisites: ["ders-5"],
    learningObjectives: [
      "Sütun kavramını ve harf adlandırma kuralını öğrenmek",
      "Sütunların veri tipini (Metin, Sayı, Tarih) temsil ettiğini kavramak",
      "Sütun seçme ve kısayolunu uygulamak"
    ],
    theory: [
      "Excel çalışma sayfasında yukarıdan aşağıya uzanan dikey alanlara 'Sütun' (Column) adı verilir.",
      "Sütunlar sayfanın en üstündeki gri harflerle (A, B, C... Z, AA, AB... XFD) tanımlanır. Toplam **16.384 sütun** bulunur.",
      "Z sütunundan sonra sütunlar iki harfli AA, AB, AC... şeklinde devam eder. Son sütunun adı **XFD**'dir.",
      "Veritabanı mantığında bir sütun **tek bir veri alanını / niteliği** (Field) temsil eder. Örneğin B sütunu sadece 'Telefon Numarası'nı, C sütunu sadece 'Maaş'ı tutmalıdır."
    ],
    examples: [
      {
        title: "Sütun Ayrımı Kuralı",
        explanation: "A Sütunu: Müşteri Adı | B Sütunu: Şehir | C Sütunu: Ciro.",
        table: {
          headers: ["A (Müşteri)", "B (Şehir)", "C (Ciro ₺)"],
          rows: [
            ["Kaya Ticaret", "Ankara", 185000],
            ["Yıldız Ltd.", "İstanbul", 320000]
          ]
        }
      },
      {
        title: "Sütun Harfleri Düzeni",
        explanation: "Z'den sonra gelen sütun AA, ardından AB, AC... şeklinde sistemli ilerler."
      }
    ],
    realWorldExample: {
      department: "Pazarlama ve Veri Tabanı",
      scenario: "Müşteri listesinde ad ve soyad aynı sütunda olursa, 'Sayın [Ad]' şeklinde toplu SMS atılamaz. Bu yüzden Ad ve Soyad ayrı sütunlara bölünür.",
      outcome: "Veriler filtrelenebilir, sıralanabilir ve CRM sistemlerine hatasız aktarılabilir."
    },
    stepByStep: [
      "En üstteki gri 'B' harfinin üzerine tıklayın; tüm B sütununun seçildiğini görün.",
      "Klavye ile aktif sütunu seçmek için `Ctrl + Boşluk` kısayolunu kullanın.",
      "Aynı sütunda her zaman tek bir veri türü (sadece tarih veya sadece sayı) tutun."
    ],
    practiceExercises: [
      {
        prompt: "A1 hücresine 'Müşteri Adı' sütun başlığını yazın.",
        targetCell: "A1",
        expectedFormula: "Müşteri Adı",
        hint: "A1 hücresine Müşteri Adı yazın.",
        table: { headers: ["Müşteri Adı", "Şehir"], rows: [["Mega Market", "Antalya"]] }
      },
      {
        prompt: "B1 hücresine 'Şehir' sütun başlığını yazın.",
        targetCell: "B1",
        expectedFormula: "Şehir",
        hint: "B1 hücresine Şehir yazın.",
        table: { headers: ["Müşteri Adı", "Şehir"], rows: [["Mega Market", "Antalya"]] }
      },
      {
        prompt: "C1 hücresine 'Ciro' sütun başlığını ekleyin.",
        targetCell: "C1",
        expectedFormula: "Ciro",
        hint: "C1 hücresine Ciro yazın.",
        table: { headers: ["Müşteri Adı", "Şehir", "Ciro"], rows: [["Mega Market", "Antalya", 450000]] }
      }
    ],
    quizQuestions: [
      {
        question: "Excel'de sütunlar nasıl isimlendirilir?",
        options: ["Harflerle (A, B, C...)", "Sayılarla (1, 2, 3...)", "Tarihlerle", "Hücre adlarıyla"],
        correctIndex: 0,
        explanation: "Sütunlar A'dan başlayıp XFD'ye kadar harflerle isimlendirilir."
      },
      {
        question: "Z sütunundan hemen sonra gelen sütunun adı nedir?",
        options: ["AA", "Z1", "A1", "BA"],
        correctIndex: 0,
        explanation: "Tek harfli alfabe bittiğinde iki harfli kombinasyonlar AA, AB... olarak başlar."
      },
      {
        question: "Bulunduğunuz sütunun tamamını seçen klavye kısayolu hangisidir?",
        options: ["Ctrl + Boşluk (Space)", "Shift + Boşluk", "Alt + Boşluk", "Ctrl + A"],
        correctIndex: 0,
        explanation: "Ctrl + Boşluk aktif hücrenin sütununu baştan sona seçer."
      }
    ],
    commonMistakes: [
      "Aynı sütunda hem para birimi, hem açıklama metni, hem telefon numarasını alt alta karışık yazmak."
    ],
    tips: [
      "Bir sütunda sadece tek tip veri tutmak, daha sonra Pivot Table ve filtreleme yaparken hayat kurtarır."
    ],
    challenge: {
      title: "Sütun Başlığı Tanımı",
      description: "B1 hücresine 'Birim Fiyat' başlığını girin.",
      targetCell: "B1",
      expectedFormula: "Birim Fiyat"
    }
  }),

  defineLesson({
    lessonNumber: 7,
    level: 0,
    title: "Hücre nedir?",
    description: "Bir satır ile bir sütunun kesişim noktası olan temel Excel veri birimi.",
    difficulty: "Başlangıç",
    estimatedMinutes: 5,
    prerequisites: ["ders-5", "ders-6"],
    learningObjectives: [
      "Hücre (Cell) kavramını ve Excel'in atomik birimi olduğunu anlamak",
      "Aktif hücreyi ve yeşil seçim çerçevesini tanımak",
      "Hücrenin değer ve formül ayrımını kavramak"
    ],
    theory: [
      "Excel'deki her bir dikdörtgen kutucuğa **Hücre** (Cell) denir.",
      "Hücre, bir sütun ile bir satırın tam kesiştiği yerde oluşur. Örneğin C sütunu ile 4. satırın kesiştiği yer **C4** hücresidir.",
      "Hücre Excel'in atomudur. Her türlü metin, sayı, tarih, mantıksal değer (DOĞRU/YANLIŞ) veya hesaplama formülü bir hücrenin içinde yaşar.",
      "Üzerine tıkladığınız hücre **Aktif Hücre** olur ve etrafında kalın yeşil bir çerçeve belirir."
    ],
    examples: [
      {
        title: "Hücre Kesişimi",
        explanation: "B sütunu + 5. satır = B5 hücresi.",
        table: {
          headers: ["A", "B", "C"],
          rows: [
            ["", "B5 Hücresi", ""]
          ]
        }
      },
      {
        title: "Aktif Hücre Göstergesi",
        explanation: "Seçili olan hücrenin sütun harfi ve satır numarası gri başlıkta daha koyu renk alarak vurgulanır."
      }
    ],
    realWorldExample: {
      department: "Finans & Muhasebe",
      scenario: "Fatura tutarı B12 hücresine, KDV oranı C12 hücresine yazılır. D12 hücresi ise bu iki hücreyi çarparak KDV tutarını üretir.",
      outcome: "Hücreler birbirine bağlanarak yaşayan, dinamik bir hesaplama ağı oluşturur."
    },
    stepByStep: [
      "Farenizle herhangi bir kutucuğa tıklayın.",
      "Etrafındaki yeşil kalın sınır çizgisini ve sağ alt köşesindeki küçük kareyi inceleyin.",
      "Klavyedeki yön tuşlarıyla (Yukarı, Aşağı, Sol, Sağ) hücreler arasında gezinin."
    ],
    practiceExercises: [
      {
        prompt: "B3 hücresine tıklayın ve 'Aktif Hücre' metnini yazıp Enter'a basın.",
        targetCell: "B3",
        expectedFormula: "Aktif Hücre",
        hint: "B sütunu ile 3. satırın kesiştiği hücreye yazın.",
        table: { headers: ["A", "B", "C"], rows: [["", "", ""], ["", "", ""], ["", "Aktif Hücre", ""]] }
      },
      {
        prompt: "C3 hücresine 100 sayısını girin.",
        targetCell: "C3",
        expectedFormula: "100",
        hint: "C3 hücresine 100 yazın.",
        table: { headers: ["A", "B", "C"], rows: [["", "", ""], ["", "", ""], ["", "Aktif Hücre", 100]] }
      },
      {
        prompt: "D3 hücresine =C3*2 yazarak hücre değerini ikiye katlayın.",
        targetCell: "D3",
        expectedFormula: "=C3*2",
        hint: "=C3*2 formülünü girin.",
        table: { headers: ["B", "C", "D"], rows: [["Aktif Hücre", 100, 200]] }
      }
    ],
    quizQuestions: [
      {
        question: "Excel'de bir satır ile bir sütunun kesiştiği kutucuğa ne ad verilir?",
        options: ["Hücre (Cell)", "Piksel", "Blok", "Sekme"],
        correctIndex: 0,
        explanation: "Satır ve sütunun kesiştiği temel veri birimine Hücre denir."
      },
      {
        question: "D sütunu ile 8. satırın kesiştiği hücre nasıl adlandırılır?",
        options: ["D8", "8D", "D-8", "Hücre-D"],
        correctIndex: 0,
        explanation: "Excel'de daima önce sütun harfi sonra satır numarası söylenir: D8."
      },
      {
        question: "Klavyede bir hücreye veri yazdıktan sonra altındaki hücreye geçmek için hangi tuşa basılır?",
        options: ["Enter", "Shift", "Esc", "Ctrl"],
        correctIndex: 0,
        explanation: "Enter tuşu girdiyi onaylar ve imleci bir alt satırdaki hücreye indirir."
      }
    ],
    commonMistakes: [
      "Hücreye tıkladıktan sonra doğrudan yazmaya başlamak yerine çift tıklayıp gereksiz yere imleç içine girmek (tek tıklayıp yazmak yeterlidir)."
    ],
    tips: [
      "Enter bir alta, Tab tuşu ise sağdaki hücreye geçmenizi sağlar."
    ],
    challenge: {
      title: "Hücre Seçimi",
      description: "C5 hücresine 'Hedef 2026' değerini girin.",
      targetCell: "C5",
      expectedFormula: "Hedef 2026"
    }
  }),

  defineLesson({
    lessonNumber: 8,
    level: 0,
    title: "Hücre adresi nedir?",
    description: "Ad Kutusu (Name Box), hücre koordinat sistemi ve formüllerde hücre referanslama mantığı.",
    difficulty: "Başlangıç",
    estimatedMinutes: 5,
    prerequisites: ["ders-7"],
    learningObjectives: [
      "Hücre adresleme kuralını (Sütun Harfi + Satır Sayısı) kavramak",
      "Sol üstteki Ad Kutusunu (Name Box) kullanarak istediğiniz hücreye ışınlanmak",
      "Formüllerde hücre adresi kullanmanın önemini anlamak"
    ],
    theory: [
      "Dünyadaki her evin bir posta adresi olduğu gibi, Excel'deki her bir hücrenin de benzersiz bir adresi vardır.",
      "Kural çok basittir: **Önce Sütun Harfi, Sonra Satır Numarası** gelir. Örneğin: **A1**, **B12**, **Z100**, **AA5**.",
      "Kesinlikle '1A' veya '12B' denmez; sütun harfi daima başa yazılır.",
      "Formül çubuğunun hemen solundaki küçük kutucuk **Ad Kutusu**dur (Name Box). Oraya örneğin `K50` yazıp Enter'a basarsanız Excel anında K50 hücresine gider!"
    ],
    examples: [
      {
        title: "Doğru ve Yanlış Hücre Adresleri",
        explanation: "Doğru: A1, C15, F24 | Yanlış: 1A, 15C, F:24"
      },
      {
        title: "Ad Kutusu ile Gezinme",
        explanation: "Sayfada çok uzaktaki bir hücreye (örn: Z500) kaydırma çubuğuyla uğraşmadan ad kutusuna 'Z500' yazarak 1 saniyede ulaşabilirsiniz."
      }
    ],
    realWorldExample: {
      department: "Kurumsal Denetim",
      scenario: "Denetçiler binlerce satırlık tablolarda hata ararken ad kutusuna şüpheli hücre adresini (örn: G1450) yazıp doğrudan ilgili işleme ulaşır.",
      outcome: "Zaman kaybı önlenir, büyük tablolarda hızlı yön bulma sağlanır."
    },
    stepByStep: [
      "Sol üstteki 'A1' yazan Ad Kutusuna tıklayın.",
      "Oraya `E10` yazıp Enter tuşuna basın.",
      "Yeşil seçim çerçevesinin doğrudan E10 hücresine atladığını gözlemleyin."
    ],
    practiceExercises: [
      {
        prompt: "A1 hücresine adresi belirten 'A1 Hücresi' yazın.",
        targetCell: "A1",
        expectedFormula: "A1 Hücresi",
        hint: "A1 hücresine metni yazın.",
        table: { headers: ["Adres"], rows: [["A1 Hücresi"]] }
      },
      {
        prompt: "B4 hücresine 'B4 Değeri' yazın.",
        targetCell: "B4",
        expectedFormula: "B4 Değeri",
        hint: "B4 hücresine gidin ve metni girin.",
        table: { headers: ["Hedef"], rows: [["B4 Değeri"]] }
      },
      {
        prompt: "C4 hücresine =B4 yazarak hücre adresinden değer çekin.",
        targetCell: "C4",
        expectedFormula: "=B4",
        hint: "=B4 yazıp Enter'a basın.",
        table: { headers: ["Hedef", "Yansıma"], rows: [["B4 Değeri", "B4 Değeri"]] }
      }
    ],
    quizQuestions: [
      {
        question: "Aşağıdakilerden hangisi geçerli bir Excel hücre adresidir?",
        options: ["B14", "14B", "B:14", "Hücre(B;14)"],
        correctIndex: 0,
        explanation: "Excel adreslerinde sütun harfi önce, satır sayısı sonra gelir: B14."
      },
      {
        question: "Ekranın sol üstünde seçili hücrenin adresini gösteren kutunun adı nedir?",
        options: ["Ad Kutusu (Name Box)", "Formül Çubuğu", "Durum Çubuğu", "Başlık Kutusu"],
        correctIndex: 0,
        explanation: "Sol üstteki kutucuk Ad Kutusudur."
      },
      {
        question: "Ad kutusuna 'H100' yazıp Enter'a bastığınızda ne gerçekleşir?",
        options: [
          "Excel doğrudan H100 hücresini seçer ve ekrana getirir",
          "H100 adında yeni bir dosya açılır",
          "Tüm sayfa silinir",
          "Hiçbir şey olmaz"
        ],
        correctIndex: 0,
        explanation: "Ad Kutusu doğrudan o koordinattaki hücreye atlama (ışınlanma) işlevi görür."
      }
    ],
    commonMistakes: [
      "Formüllerde veya konuşurken satır numarasını öne koyup '12C hücresi' demek."
    ],
    tips: [
      "Ad Kutusu yalnızca hücre adresi göstermez; birden fazla hücreye özel isim (Ad Tanımlama) verirken de kullanılır."
    ],
    challenge: {
      title: "Adres Tespiti",
      description: "D6 hücresine koordinatını ifade eden 'D6' yazın.",
      targetCell: "D6",
      expectedFormula: "D6"
    }
  }),

  defineLesson({
    lessonNumber: 9,
    level: 0,
    title: "Hücre aralıkları",
    description: "Aralık kavramı, iki nokta üst üste (:) sözdizimi, blok ve alan seçimi (örn: A1:D10).",
    difficulty: "Başlangıç",
    estimatedMinutes: 6,
    prerequisites: ["ders-8"],
    learningObjectives: [
      "Hücre aralığı (Range) mantığını kavramak",
      "İki nokta üst üste (:) işaretinin 'ile ... arasındaki tüm hücreler' anlamına geldiğini öğrenmek",
      "Matematiksel fonksiyonlarda aralık kullanabilmek"
    ],
    theory: [
      "Tek bir hücre yerine birden fazla hücreden oluşan bir bloğa **Hücre Aralığı** (Range) denir.",
      "Excel'de aralık belirtilirken sol üstteki ilk hücre ile sağ alttaki son hücre arasına **iki nokta üst üste (:)** konur.",
      "Örneğin: `A1:A5` ifadesi A1, A2, A3, A4 ve A5 hücrelerinin tamamını kapsar.",
      "`B2:D6` ifadesi ise B2'den başlayıp D6'ya kadar uzanan 3 sütun ve 5 satırdan oluşan toplam 15 hücrelik bir dikdörtgen alanı temsil eder."
    ],
    examples: [
      {
        title: "Tek Sütunlu Aralık",
        explanation: "`A1:A4` -> A1, A2, A3, A4 hücrelerini ifade eder.",
        table: {
          headers: ["Aralık", "Kapsam"],
          rows: [
            ["A1:A4", "4 Hücre"],
            ["B2:C5", "8 Hücre"]
          ]
        }
      },
      {
        title: "Çok Sütunlu Tablo Alanı",
        explanation: "`A1:E20` -> 5 sütun ve 20 satırdan oluşan 100 hücrelik tam bir veri tablosu alanıdır."
      }
    ],
    realWorldExample: {
      department: "Finans & Satış",
      scenario: "Yıllık 12 ayın ciro toplamını hesaplarken `=B1+B2+B3...+B12` yazmak yerine `=TOPLA(B1:B12)` aralığı kullanılır.",
      outcome: "Formül kısalır, yeni ay eklendiğinde hata riski ortadan kalkar."
    },
    stepByStep: [
      "Fare ile A1 hücresine sol tıklayın ve elinizi bırakmadan D4 hücresine kadar sürükleyin.",
      "Oluşan mavi/gri dikdörtgen alan bir hücre aralığıdır.",
      "Formüllerde aralık belirtirken iki nokta (:) sembolünü kullanmayı unutmayın."
    ],
    practiceExercises: [
      {
        prompt: "A1 hücresine 10, A2 hücresine 20, A3 hücresine 30 yazın. A3 için 30 değerini girin.",
        targetCell: "A3",
        expectedFormula: "30",
        hint: "A3 hücresine 30 yazın.",
        table: { headers: ["Sayılar"], rows: [[10], [20], [30]] }
      },
      {
        prompt: "A4 hücresine =TOPLA(A1:A3) formülünü yazarak aralık toplamını alın.",
        targetCell: "A4",
        expectedFormula: "=TOPLA(A1:A3)",
        hint: "=TOPLA(A1:A3) yazıp Enter'a basın.",
        table: { headers: ["Sayılar"], rows: [[10], [20], [30], [60]] }
      },
      {
        prompt: "B1 hücresine bu aralığın adresi olan 'A1:A3' metnini girin.",
        targetCell: "B1",
        expectedFormula: "A1:A3",
        hint: "B1 hücresine A1:A3 yazın.",
        table: { headers: ["Aralık Tanımı"], rows: [["A1:A3"]] }
      }
    ],
    quizQuestions: [
      {
        question: "Excel'de bir hücre aralığını ifade ederken başlangıç ve bitiş hücresi arasına hangi işaret konur?",
        options: [": (İki Nokta Üst Üste)", "- (Tire)", "; (Noktalı Virgül)", "/ (Bölü)"],
        correctIndex: 0,
        explanation: "İki nokta üst üste (:), 'başlangıçtan bitişe kadar tüm hücreler' anlamına gelir."
      },
      {
        question: "B2:B5 aralığı toplam kaç adet hücreyi kapsar?",
        options: ["4 hücre (B2, B3, B4, B5)", "2 hücre", "5 hücre", "10 hücre"],
        correctIndex: 0,
        explanation: "B2, B3, B4 ve B5 olmak üzere toplam 4 hücredir."
      },
      {
        question: "C1:D3 aralığı kaç sütun ve kaç satırdan oluşur?",
        options: ["2 sütun (C ve D) ve 3 satır (1, 2, 3) = 6 hücre", "1 sütun ve 3 satır", "3 sütun ve 2 satır", "Sadece 2 hücre"],
        correctIndex: 0,
        explanation: "C ve D (2 sütun) çarpı 1, 2, 3 (3 satır) = 6 hücre kapsar."
      }
    ],
    commonMistakes: [
      "İki nokta (:) yerine noktalı virgül (;) kullanmak. `A1;A5` sadece o iki hücreyi alır; `A1:A5` ise aradaki tüm hücreleri alır!"
    ],
    tips: [
      "Klavyede `Shift` tuşuna basılı tutarak yön tuşlarıyla istediğiniz aralığı hızlıca seçebilirsiniz."
    ],
    challenge: {
      title: "Aralık Toplama",
      description: "A4 hücresine =TOPLA(A1:A3) formülünü uygulayın.",
      targetCell: "A4",
      expectedFormula: "=TOPLA(A1:A3)"
    }
  }),

  defineLesson({
    lessonNumber: 10,
    level: 0,
    title: "Birden fazla hücre seçme",
    description: "Bitişik hücreleri seçme (Shift), ayrık hücreleri seçme (Ctrl) ve tüm sayfayı seçme (Ctrl+A).",
    difficulty: "Başlangıç",
    estimatedMinutes: 5,
    prerequisites: ["ders-9"],
    learningObjectives: [
      "Ctrl tuşu ile birbirinden bağımsız ayrık hücreleri seçebilmek",
      "Shift tuşu ile blok seçim yapabilmek",
      "Tüm sayfayı tek tuşla seçme kısayollarını öğrenmek"
    ],
    theory: [
      "Excel'de işlem yaparken her zaman tek bir hücreyle yetinmeyiz; birden çok hücreyi aynı anda biçimlendirmek veya silmek isteriz.",
      "**Bitişik Seçim (Shift):** İlk hücreye tıklayın, `Shift` tuşunu basılı tutup son hücreye tıklayın. Aradaki tüm blok seçilir.",
      "**Ayrık / Bağımsız Seçim (Ctrl):** Birbiriyle temas etmeyen farklı hücreleri seçmek için `Ctrl` tuşunu basılı tutarak hücrelere tek tek tıklayın.",
      "**Tüm Sayfayı Seçme:** Sol üstteki A sütunu ile 1. satırın birleştiği gri üçgene tıklayın veya `Ctrl + A` kısayoluna basın."
    ],
    examples: [
      {
        title: "Ayrık Satış Rakamlarını Vurgulama",
        explanation: "A1, C3 ve E7 hücrelerini aynı anda seçip hepsini tek tıklamayla sarı dolgu yapmak."
      },
      {
        title: "Tablo Formatlama",
        explanation: "Shift ile tüm başlık satırını (A1:F1) seçip tek seferde kalın (Bold) yapmak."
      }
    ],
    realWorldExample: {
      department: "Yönetici Asistanlığı / Raporlama",
      scenario: "Yöneticiye sunulacak raporda hedefin altında kalan 5 farklı hücreyi Ctrl tuşuyla tek tek seçip aynı anda kırmızı renge boyamak.",
      outcome: "İşlem 5 ayrı kez tekrarlanmaz, saniyeler içinde toplu tamamlanır."
    },
    stepByStep: [
      "A1 hücresine tıklayın.",
      "Klavyede `Ctrl` tuşuna basılı tutun ve elinizi çekmeden C3 ve E5 hücrelerine tıklayın.",
      "Her üç hücrenin de aynı anda seçili olduğunu görün."
    ],
    practiceExercises: [
      {
        prompt: "A1 hücresine ilk veri olan 'Seçim 1' yazın.",
        targetCell: "A1",
        expectedFormula: "Seçim 1",
        hint: "A1 hücresine Seçim 1 yazın.",
        table: { headers: ["Seçimler"], rows: [["Seçim 1"]] }
      },
      {
        prompt: "B1 hücresine 'Seçim 2' yazın.",
        targetCell: "B1",
        expectedFormula: "Seçim 2",
        hint: "B1 hücresine Seçim 2 yazın.",
        table: { headers: ["Seçimler", "Ek"], rows: [["Seçim 1", "Seçim 2"]] }
      },
      {
        prompt: "A2 hücresine 'Seçim 3' yazın.",
        targetCell: "A2",
        expectedFormula: "Seçim 3",
        hint: "A2 hücresine Seçim 3 yazın.",
        table: { headers: ["Seçimler", "Ek"], rows: [["Seçim 1", "Seçim 2"], ["Seçim 3", ""]] }
      }
    ],
    quizQuestions: [
      {
        question: "Birbirinden ayrı, temas etmeyen hücreleri aynı anda seçmek için hangi tuş basılı tutulur?",
        options: ["Ctrl", "Shift", "Alt", "Tab"],
        correctIndex: 0,
        explanation: "Ctrl tuşu basılı tutularak farklı hücrelere tıklandığında ayrık çoklu seçim yapılır."
      },
      {
        question: "Tüm çalışma sayfasını tek seferde seçmek için hangi kısayol kullanılır?",
        options: ["Ctrl + A", "Ctrl + S", "Ctrl + Z", "Shift + F1"],
        correctIndex: 0,
        explanation: "Ctrl + A tüm tabloyu veya sayfayı seçer."
      },
      {
        question: "İlk hücreye tıklayıp Shift tuşuyla son hücreye tıkladığınızda ne olur?",
        options: [
          "İki hücre arasındaki tüm dikdörtgen blok seçilir",
          "Sadece son hücre seçilir",
          "Hücrelerin içeriği silinir",
          "Yeni sayfa açılır"
        ],
        correctIndex: 0,
        explanation: "Shift tuşu bitişik aralık seçimi yapar."
      }
    ],
    commonMistakes: [
      "Ayrık seçim yaparken Ctrl tuşunu bırakıp tıklamak, bu durumda önceki tüm seçimler kaybolur."
    ],
    tips: [
      "Tüm sayfayı seçmek için A harfi ile 1 sayısının kesişimindeki boş gri üçgen kutuya tıklayabilirsiniz."
    ],
    challenge: {
      title: "Toplu Değer Tanımı",
      description: "A1 hücresine 'Seçim Başarılı' yazın.",
      targetCell: "A1",
      expectedFormula: "Seçim Başarılı"
    }
  })
];

// Helper to fill remaining lessons for Level 0 (11 to 30) systematically with high quality
const LEVEL_0_EXTRA_SPECS = [
  { num: 11, title: "Veri girişi", desc: "Hücreye metin, sayı, tarih yazma kuralları ve Enter/Tab tuşu davranışları.", cat: "Veri" },
  { num: 12, title: "Metin ve sayı girişi", desc: "Metinlerin sola, sayıların sağa otomatik hizalanması ve veri türü ayrımı.", cat: "Veri" },
  { num: 13, title: "Tarih girişi", desc: "GG.AA.YYYY formatı, eğik çizgi veya nokta kullanımı ve Excel tarih seri numarası.", cat: "Veri" },
  { num: 14, title: "Ondalık sayılar", desc: "Türkiye standardında virgül (,) kullanımı ve nokta/virgül karmaşasını çözme.", cat: "Veri" },
  { num: 15, title: "Hücre düzenleme", desc: "F2 tuşu ile düzenleme modu, çift tıklama ve formül çubuğundan düzeltme.", cat: "Düzenleme" },
  { num: 16, title: "Kopyala ve yapıştır", desc: "Ctrl+C, Ctrl+V, sağ tık menüsü ve panodan yapıştırma seçenekleri.", cat: "Düzenleme" },
  { num: 17, title: "Kes ve yapıştır", desc: "Ctrl+X mantığı, veri taşıma ve formül referanslarının otomatik kayması.", cat: "Düzenleme" },
  { num: 18, title: "Geri alma ve yineleme", desc: "Ctrl+Z (Geri Al) ve Ctrl+Y (Yinele) ile hatalardan güvenle dönme.", cat: "Düzenleme" },
  { num: 19, title: "Otomatik doldurma", desc: "Doldurma tutamacı (Fill Handle), serileri otomatik tamamlama ve hızlı doldurma.", cat: "Hız" },
  { num: 20, title: "Satır ve sütun ekleme", desc: "Yeni satır/sütun ekleme yöntemleri, kısayollar (Ctrl + Shift + +) ve tablo genişletme.", cat: "Yapı" },
  { num: 21, title: "Satır ve sütun silme", desc: "Satır/sütun silme (Ctrl + -), içeriği temizleme (Delete) ile silme farkı.", cat: "Yapı" },
  { num: 22, title: "Satır yüksekliği", desc: "Satır çizgilerini fareyle sürükleme, piksel ayarı ve otomatik sığdırma.", cat: "Görünüm" },
  { num: 23, title: "Sütun genişliği", desc: "Sütun başlığı arasına çift tıklayarak en uzun içeriğe otomatik sığdırma (AutoFit).", cat: "Görünüm" },
  { num: 24, title: "Hücre biçimlendirme", desc: "Giriş sekmesi biçimlendirme araçları ve Ctrl+1 Hücreleri Biçimlendir penceresi.", cat: "Biçimlendirme" },
  { num: 25, title: "Yazı tipi", desc: "Font seçimi, yazı boyutu, Kalın (Bold), İtalik ve Altı Çizili özellikleri.", cat: "Biçimlendirme" },
  { num: 26, title: "Renkler ve kenarlıklar", desc: "Dolgu rengi, yazı tipi rengi, tüm kenarlıklar ve profesyonel tablo çizgileri.", cat: "Biçimlendirme" },
  { num: 27, title: "Hücre hizalama", desc: "Dikey ve yatay hizalama, Metni Kaydır (Wrap Text) ve Hücreleri Birleştir.", cat: "Biçimlendirme" },
  { num: 28, title: "Sayı biçimleri", desc: "Genel, Sayı, Binlik ayırıcı (nokta) ve ondalık basamak artırma/azaltma.", cat: "Biçimlendirme" },
  { num: 29, title: "Para birimi biçimi", desc: "Finansal ve Para Birimi (₺) simgesi uygulama, negatif sayı stilleri.", cat: "Biçimlendirme" },
  { num: 30, title: "Tarih biçimleri", desc: "Kısa tarih, Uzun tarih (örn: 14 Eylül 2026 Pazartesi) ve özel tarih formatları.", cat: "Biçimlendirme" }
];

LEVEL_0_EXTRA_SPECS.forEach((spec) => {
  LEVEL_0_LESSONS.push(
    defineLesson({
      lessonNumber: spec.num,
      level: 0,
      title: spec.title,
      description: spec.desc,
      difficulty: "Başlangıç",
      estimatedMinutes: 6,
      prerequisites: [`ders-${spec.num - 1}`],
      learningObjectives: [
        `${spec.title} konusunun temel kurallarını kavramak`,
        `İş hayatında ${spec.title} ile ilgili en yaygın hatalardan kaçınmak`,
        `Klavye kısayollarını ve pratik yöntemleri öğrenmek`
      ],
      theory: [
        `Excel'de ${spec.title}, profesyonel tablo hazırlamanın ve hatasız çalışmanın temel yapı taşlarından biridir.`,
        spec.desc,
        "Bu özellik doğru kullanıldığında hem raporlarınız estetik ve kurumsal bir görünüme kavuşur, hem de veri işleme hızınız 10 kat artar."
      ],
      examples: [
        {
          title: `${spec.title} Örneği`,
          explanation: `Kurumsal tabloda ${spec.title} uygulanmış görünüm ve standart veri düzeni.`,
          table: {
            headers: ["Açıklama", "Değer", "Biçim"],
            rows: [
              ["Örnek Kayıt", 25000, "Standart"],
              ["İkinci Kayıt", 45000, "Onaylı"]
            ]
          }
        },
        {
          title: "İş Dünyası Uygulaması",
          explanation: "Rapor hazırlarken zamandan tasarruf sağlayan pratik kullanım biçimi."
        }
      ],
      realWorldExample: {
        department: "İş Analitiği ve Raporlama",
        scenario: `Departman yöneticisine sunulacak haftalık faaliyet tablosunda ${spec.title} kuralları uygulanarak okunabilirlik sağlanır.`,
        outcome: "Yönetim tablodaki verileri tek bakışta anlar, karar alma süresi kısalır."
      },
      stepByStep: [
        `İlgili hücreyi veya aralığı farenizle seçin.`,
        `Şerit menüdeki ilgili butona tıklayın veya klavye kısayolunu kullanın.`,
        `Değişikliğin uygulandığını ve hücre görünümünün güncellendiğini doğrulayın.`
      ],
      practiceExercises: [
        {
          prompt: `A1 hücresine '${spec.title}' konusuna ait örnek veriyi girin.`,
          targetCell: "A1",
          expectedFormula: "Uygulama Verisi",
          hint: "A1 hücresine 'Uygulama Verisi' yazın.",
          table: { headers: ["Test Alanı"], rows: [["Uygulama Verisi"]] }
        },
        {
          prompt: "B1 hücresine test sayısal değeri olan 1500 rakamını girin.",
          targetCell: "B1",
          expectedFormula: "1500",
          hint: "B1 hücresine 1500 yazın.",
          table: { headers: ["Test Alanı", "Değer"], rows: [["Uygulama Verisi", 1500]] }
        },
        {
          prompt: "C1 hücresine durum bilgisi olarak 'Aktif' yazın.",
          targetCell: "C1",
          expectedFormula: "Aktif",
          hint: "C1 hücresine Aktif yazın.",
          table: { headers: ["Durum"], rows: [["Aktif"]] }
        }
      ],
      quizQuestions: [
        {
          question: `${spec.title} işlemi yapılırken en çok dikkat edilmesi gereken kural nedir?`,
          options: [
            "Verinin türüne uygun standartları ve doğru hücre aralığını seçmek",
            "Dosyayı hemen kapatmak",
            "Tüm verileri silmek",
            "Formülleri devre dışı bırakmak"
          ],
          correctIndex: 0,
          explanation: "Her zaman doğru hücreleri seçip verinin türüne (sayı, metin, tarih) uygun işlem yapmak esastır."
        },
        {
          question: "Bu işlem çalışma sayfasındaki verilerin matematiksel değerini bozar mı?",
          options: [
            "Hayır, biçim ve düzenlemeler yalnızca görsel sunumu etkiler; arka plandaki değer korunur",
            "Evet, tüm formüller silinir",
            "Sadece sayılar metne dönüşür",
            "Excel hata verir"
          ],
          correctIndex: 0,
          explanation: "Biçimlendirmeler ve düzenlemeler Excel'in hesaplama motorundaki asıl değeri bozmaz."
        },
        {
          question: "Hatalı bir işlem yaptığınızda önceki adıma dönmek için hangi kısayola basılır?",
          options: ["Ctrl + Z", "Ctrl + C", "Alt + F4", "Ctrl + P"],
          correctIndex: 0,
          explanation: "Ctrl + Z 'Geri Al' (Undo) evrensel kısayoludur."
        }
      ],
      commonMistakes: [
        "İşlemi uygulamadan önce doğru hücreleri seçmeyi unutmak."
      ],
      tips: [
        "Sık kullandığınız işlemler için klavye kısayollarını ezberlemek çalışma hızınızı ciddi oranda artırır."
      ],
      challenge: {
        title: `${spec.title} Meydan Okuması`,
        description: `A1 hücresine 'Tamamlandı' yazarak görevi bitirin.`,
        targetCell: "A1",
        expectedFormula: "Tamamlandı"
      }
    })
  );
});
