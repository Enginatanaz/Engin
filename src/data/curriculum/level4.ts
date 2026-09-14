import { Lesson } from "../../types";
import { defineLesson } from "./helper";

export const LEVEL_4_LESSONS: Lesson[] = [
  defineLesson({
    lessonNumber: 126,
    level: 4,
    title: "Gelişmiş EĞER",
    description: "Çok katmanlı karar ağaçları, karmaşık iş kuralları ve ÇOKEĞER (IFS) fonksiyonunun modern kullanımı.",
    difficulty: "İleri",
    estimatedMinutes: 8,
    prerequisites: ["ders-65", "ders-125"],
    learningObjectives: [
      "ÇOKEĞER (IFS) fonksiyonu ile iç içe onlarca parantez açıp kapatmaktan kurtulmak",
      "Çok katmanlı prim ve kademe baremlerini formülleştirmek",
      "Performansı düşürmeyen mantıksal mimari kurmak"
    ],
    theory: [
      "Eski Excel sürümlerinde 5 farklı koşulu test etmek için `=EĞER(k1; d1; EĞER(k2; d2; EĞER(k3; d3...)))` şeklinde karmaşık formüller yazılırdı.",
      "Modern Excel ile gelen **ÇOKEĞER (IFS)** fonksiyonu bu çileyi bitirir. Sırayla koşul ve karşılık gelen değer çiftler halinde yazılır: `=ÇOKEĞER(k1; d1; k2; d2; k3; d3; DOĞRU; varsayılan)`.",
      "Excel koşulları soldan sağa sırayla test eder; ilk DOĞRU olan koşulun değerini döndürür ve durur.",
      "En sona `DOĞRU; \"Diğer\"` eklenerek hiçbir şarta uymayan durumlar güvenceye alınır."
    ],
    examples: [
      {
        title: "Performans Puanı Baremi",
        explanation: '=ÇOKEĞER(B2>=90; "Mükemmel"; B2>=75; "İyi"; B2>=50; "Orta"; DOĞRU; "Yetersiz")',
        formula: '=ÇOKEĞER(B2>=90; "Mükemmel"; B2>=75; "İyi"; B2>=50; "Orta"; DOĞRU; "Yetersiz")',
        table: {
          headers: ["Personel", "Puan", "Değerlendirme"],
          rows: [
            ["Zeynep", 94, "Mükemmel"],
            ["Can", 78, "İyi"],
            ["Burak", 42, "Yetersiz"]
          ]
        }
      },
      {
        title: "Kademeli İskonto Hesabı",
        explanation: 'Sipariş adedine göre %5, %10, %15 veya %20 indirim bareminin otomatik atanması.'
      }
    ],
    realWorldExample: {
      department: "Ticari Pazarlama & Fiyatlandırma",
      scenario: "Bayilere yapılan satışlarda yıllık ciro büyüklüğüne göre Platin, Altın, Gümüş ve Bronz bayi statüsü ÇOKEĞER ile anında belirlenir.",
      outcome: "Bayi sözleşmelerindeki karmaşık barem kuralları insan hatası olmaksızın otomatik işler."
    },
    stepByStep: [
      "Formül hücresine `=ÇOKEĞER(` yazın.",
      "İlk mantıksal koşulu ve noktalı virgülle değerini yazın: `B2>=90; \"Mükemmel\"`.",
      "İkinci koşul ve değerini ekleyin: `B2>=75; \"İyi\"`.",
      "En sona varsayılan değeri bağlamak için `DOĞRU; \"Diğer\"` yazıp parantezi kapatın."
    ],
    practiceExercises: [
      {
        prompt: "C2 hücresine =ÇOKEĞER(B2>=90; \"A\"; B2>=70; \"B\"; DOĞRU; \"C\") formülünü uygulayın.",
        targetCell: "C2",
        expectedFormula: '=ÇOKEĞER(B2>=90; "A"; B2>=70; "B"; DOĞRU; "C")',
        hint: 'Formülü noktalı virgüllere dikkat ederek yazın.',
        table: { headers: ["Öğrenci", "Puan", "Harf"], rows: [["Ece", 85, "B"]] }
      },
      {
        prompt: "C3 hücresine aynı baremi uygulayın.",
        targetCell: "C3",
        expectedFormula: '=ÇOKEĞER(B3>=90; "A"; B3>=70; "B"; DOĞRU; "C")',
        hint: 'Formülü girin.',
        table: { headers: ["Öğrenci", "Puan", "Harf"], rows: [["Ece", 85, "B"], ["Mert", 92, "A"]] }
      },
      {
        prompt: "D2 hücresine =C2 kontrol formülünü yazın.",
        targetCell: "D2",
        expectedFormula: "=C2",
        hint: "=C2 yazın.",
        table: { headers: ["Harf", "Kontrol"], rows: [["B", "B"]] }
      }
    ],
    quizQuestions: [
      {
        question: "ÇOKEĞER (IFS) fonksiyonunun klasik iç içe EĞER formüllerine göre en büyük üstünlüğü nedir?",
        options: [
          "İç içe birden fazla EĞER ve onlarca parantez açıp kapatma zorunluluğunu ortadan kaldırması",
          "Dosyayı şifrelemesi",
          "Yalnızca sayıları toplaması",
          "Grafik çizmesi"
        ],
        correctIndex: 0,
        explanation: "ÇOKEĞER koşul-sonuç ikililerini tek bir fonksiyon çatısı altında temiz ve okunabilir sunar."
      },
      {
        question: "ÇOKEĞER fonksiyonunda hiçbir koşul sağlanmazsa ve varsayılan DOĞRU eklenmemişse ne olur?",
        options: ["#YOK! (#N/A) hatası verir", "0 döner", "Hücre boş kalır", "Formül silinir"],
        correctIndex: 0,
        explanation: "Koşullardan hiçbiri DOĞRU çıkmazsa ÇOKEĞER #YOK! hatası üretir."
      },
      {
        question: "ÇOKEĞER fonksiyonunda koşulların yazılış sırası önemli midir?",
        options: [
          "Evet, çok önemlidir; Excel ilk karşılaştığı DOĞRU koşulda durur",
          "Hayır, sıra tamamen önemsizdir",
          "Excel alfabeye göre sıralar",
          "Yalnızca çift sayılı satırlarda önemlidir"
        ],
        correctIndex: 0,
        explanation: "Soldan sağa ilk eşleşen kural çalışacağı için en dar/katı şartlar en başa yazılmalıdır."
      }
    ],
    commonMistakes: [
      "Koşul sırasını yanlış kurup B2>=50 şartını B2>=90 şartından önce yazmak (böylece 95 alan kişi de 50 şartına takılır)."
    ],
    tips: [
      "En son argüman çifti olarak her zaman `DOĞRU; \"Varsayılan\"` kalıbını ekleyin."
    ],
    challenge: {
      title: "ÇOKEĞER Baremi",
      description: "C2 hücresine =ÇOKEĞER(B2>=90; \"A\"; B2>=70; \"B\"; DOĞRU; \"C\") formülünü girin.",
      targetCell: "C2",
      expectedFormula: '=ÇOKEĞER(B2>=90; "A"; B2>=70; "B"; DOĞRU; "C")'
    }
  })
];

// Generate Level 4 lessons (127 to 150)
const LEVEL_4_EXTRA_SPECS = [
  { num: 127, title: "Çoklu koşullar", desc: "VE, VEYA mantığının matematiksel çarpım ve toplam ile matris düzeyinde kullanımı.", formula: "=EĞER((A2>100)*(B2=\"Aktif\"); C2*1,1; C2)" },
  { num: 128, title: "İç içe mantıksal fonksiyonlar", desc: "Kompleks denetim algoritmaları ve çok kademeli iş kuralları.", formula: "=EĞER(VE(A2=\"Satış\"; VEYA(B2>50000; C2=\"Kıdemli\")); \"Onay\"; \"Red\")" },
  { num: 129, title: "Çok kriterli hesaplamalar", desc: "Aralık bazlı dinamik koşullu toplam ve sayım stratejileri.", formula: '=ÇOKETOPLA(D2:D50; A2:A50; "Marmara"; B2:B50; ">=2026")' },
  { num: 130, title: "SUMIFS / ÇOKETOPLA ileri kullanım", desc: "Tarih aralıkları ve joker karakterler (*, ?) ile gelişmiş toplamlar.", formula: '=ÇOKETOPLA(C2:C50; A2:A50; "İst*"; B2:B50; ">=01.01.2026")' },
  { num: 131, title: "COUNTIFS / ÇOKEĞERSAY ileri kullanım", desc: "Benzersiz eşleşmeler ve tarih kriterleriyle frekans analizi.", formula: '=ÇOKEĞERSAY(A2:A50; "<>Tamamlandı"; B2:B50; "<BUGÜN()")' },
  { num: 132, title: "AVERAGEIFS / ÇOKEĞERORTALAMA", desc: "Filtrelenmiş alt kümelerin şartlı ortalama maliyet ve cirolarını çıkarma.", formula: '=ÇOKEĞERORTALAMA(C2:C50; A2:A50; "Donanım"; B2:B50; ">10")' },
  { num: 133, title: "AGGREGATE", desc: "TOPLAMA fonksiyonu ile filtrelenmiş gizli satırları ve hata değerlerini (#N/A) yok sayarak hesaplama.", formula: '=TOPLAMA(9; 7; A2:A100)' },
  { num: 134, title: "SUBTOTAL / ALTTOPLAM", desc: "Tabloda filtre uygulandığında sadece ekranda görünen satırları toplayan dinamik fonksiyon.", formula: '=ALTTOPLAM(109; B2:B100)' },
  { num: 135, title: "OFFSET / KAYDIR", desc: "Başlangıç hücresinden dinamik satır ve sütun kadar öteye giderek değişken boyutlu aralık üretme.", formula: '=KAYDIR(A1; 1; 2; 5; 1)' },
  { num: 136, title: "INDIRECT / DOLAYLI", desc: "Metin olarak yazılan hücre veya sayfa adını gerçek canlı başvuruya dönüştürme.", formula: '=DOLAYLI(A1 & "!B5")' },
  { num: 137, title: "LET", desc: "Formül içinde değişken tanımlayarak hesaplama hızını artıran ve formülleri sadeleştiren devrimsel fonksiyon.", formula: '=LET(vergi; A2*0,20; maliyet; B2*1,10; vergi+maliyet)' },
  { num: 138, title: "LAMBDA", desc: "VBA ve kod yazmadan Excel içinde kendi özel fonksiyonunuzu yaratma gücü.", formula: '=LAMBDA(x; y; x*0,18+y)(100; 20)' },
  { num: 139, title: "Karmaşık formülleri parçalama", desc: "Mega formülleri ara sütunlara bölerek okunabilirlik ve denetlenebilirlik sağlama.", formula: '=A2+B2' },
  { num: 140, title: "Formül hata ayıklama", desc: "Formülleri Değerlendir (Evaluate Formula - F9) aracı ile adım adım hesaplama takibi.", formula: '=F9 İzleme' },
  { num: 141, title: "#DEĞER! hatası", desc: "Metin ve sayı uyuşmazlıklarının kök nedenleri ve çözüm yolları.", formula: '=EĞERHATA(A2+B2; 0)' },
  { num: 142, title: "#YOK! hatası", desc: "Arama fonksiyonlarında bulunamayan kayıtların tespiti ve EĞER(EYOKSA(...)) kalıbı.", formula: '=EYOKSA(A2)' },
  { num: 143, title: "#SAYI! hatası", desc: "Sıfıra bölme veya matematiksel olarak imkansız hesaplamaların (negatif karekök) çözümü.", formula: '=EĞER(B2=0; 0; A2/B2)' },
  { num: 144, title: "#BAŞV! hatası", desc: "Silinen satır ve sütunlar sebebiyle kopan hücre bağlarını onarma stratejileri.", formula: 'Başvuru Kurtarma' },
  { num: 145, title: "Formül performansı", desc: "Uçucu (Volatile) fonksiyonlardan (DOLAYLI, KAYDIR, ŞİMDİ) kaçınarak dosya hızlandırma.", formula: 'İNDİS Odaklı Mimari' },
  { num: 146, title: "Formül optimizasyonu", desc: "Yüz binlerce satırlık tablolarda hesaplama süresini 10 saniyeden 0.1 saniyeye indirme.", formula: 'ÇAPRAZARA / İNDİS' },
  { num: 147, title: "Büyük veri üzerinde formüller", desc: "Grid hesaplama motorunu zorlamadan büyük veri işleme pratikleri.", formula: 'Tablo Referansları' },
  { num: 148, title: "Dinamik rapor formülleri", desc: "Ay veya departman seçimine göre kendini otomatik yeniden çizen formül kurguları.", formula: '=ÇAPRAZARA($H$1; A2:A20; B2:M20)' },
  { num: 149, title: "İleri tarih hesaplamaları", desc: "ETARİHLİ (DATEDIF) ile tam yaş, kıdem yılı ve gün farkı analizi.", formula: '=ETARİHLİ(A2; BUGÜN(); "Y")' },
  { num: 150, title: "İş günü hesaplamaları", desc: "İŞGÜNÜ ve TAMİŞGÜNÜ ile hafta sonlarını ve resmi tatilleri düşerek proje teslim tarihi bulma.", formula: '=TAMİŞGÜNÜ(A2; B2; $H$2:$H$10)' }
];

LEVEL_4_EXTRA_SPECS.forEach((spec) => {
  LEVEL_4_LESSONS.push(
    defineLesson({
      lessonNumber: spec.num,
      level: 4,
      title: spec.title,
      description: spec.desc,
      difficulty: "İleri",
      estimatedMinutes: 8,
      prerequisites: [`ders-${spec.num - 1}`],
      learningObjectives: [
        `${spec.title} konusunun ileri düzey mekanizmasını kavramak`,
        `Karmaşık finansal ve operasyonel modellerde ${spec.title} kuralını uygulamak`,
        `Hesaplama performansını ve formül güvenliğini en üst düzeye çıkarmak`
      ],
      theory: [
        `İleri Excel seviyesinde **${spec.title}**, kurumsal modellerin hızını ve esnekliğini doğrudan belirler.`,
        spec.desc,
        `Bu teknikler sadece standart işlemleri çözmekle kalmaz; tablonuzu dinamik, bakım gerektirmeyen bir yazılım modülü haline getirir.`
      ],
      examples: [
        {
          title: `${spec.title} İleri Modeli`,
          explanation: `Kurumsal mimaride formülün çalışma düzeni.`,
          formula: spec.formula,
          table: {
            headers: ["Kaynak", "Kriter", "Sonuç"],
            rows: [
              ["Kayıt A", "Kriter 1", 12500],
              ["Kayıt B", "Kriter 2", 34000]
            ]
          }
        },
        {
          title: "Performans ve Hata Denetimi",
          explanation: `Büyük tablolarda formülün optimize çalıştırılması.`
        }
      ],
      realWorldExample: {
        department: "Finansal Planlama & Analiz (FP&A)",
        scenario: `Çok uluslu bir holdingin 100.000 satırlık konsolide bütçe modelinde ${spec.title} kullanılarak modelleme yapılır.`,
        outcome: "Dosya kilitlenmeden, saliseler içinde finansal senaryo sonuçları hesaplanır."
      },
      stepByStep: [
        `Hesaplama hedefini ve gerekli bağımlılıkları analiz edin.`,
        `Formül çubuğuna \`${spec.formula}\` formülünü optimize şekilde yazın.`,
        `F9 veya Formülleri Değerlendir aracı ile ara adımları doğrulayın.`
      ],
      practiceExercises: [
        {
          prompt: `Hedef hücreye ${spec.formula} uygulayın.`,
          targetCell: "C2",
          expectedFormula: spec.formula,
          hint: `${spec.formula} formülünü eksiksiz girin.`,
          table: { headers: ["Girdi 1", "Girdi 2", "Sonuç"], rows: [[100, 200, 300]] }
        },
        {
          prompt: `C3 hücresine işlemi uygulayın.`,
          targetCell: "C3",
          expectedFormula: spec.formula,
          hint: `Formülü uygulayın.`,
          table: { headers: ["Girdi 1", "Girdi 2", "Sonuç"], rows: [[100, 200, 300], [400, 500, 900]] }
        },
        {
          prompt: `D2 hücresine =C2 kontrol formülünü yazın.`,
          targetCell: "D2",
          expectedFormula: "=C2",
          hint: "=C2 yazın.",
          table: { headers: ["Sonuç", "Kontrol"], rows: [[300, 300]] }
        }
      ],
      quizQuestions: [
        {
          question: `${spec.title} konusunun kurumsal modellerdeki temel rolü nedir?`,
          options: [
            spec.desc,
            "Sadece hücre kenarlıklarını çizer",
            "Dosyayı PDF yapar",
            "Excel'i kapatır"
          ],
          correctIndex: 0,
          explanation: spec.desc
        },
        {
          question: "Bu formül yapısı kurulurken performansı korumak için neye dikkat edilmelidir?",
          options: [
            "Gereksiz uçucu (volatile) fonksiyonlardan kaçınmak ve aralıkları optimize tutmak",
            "Tüm formülleri metin olarak kaydetmek",
            "Formülleri rastgele silmek",
            "Her satıra farklı formül yazmak"
          ],
          correctIndex: 0,
          explanation: "İleri düzey Excel'de performans optimizasyonu ve uçucu fonksiyon kontrolü kritiktir."
        },
        {
          question: "Formülün ara hesaplama adımlarını adım adım izlemek için hangi araç kullanılır?",
          options: [
            "Formülleri Değerlendir (Evaluate Formula)",
            "Gözden Geçir > Yazım Denetimi",
            "Sayfa Düzeni > Kenar Boşlukları",
            "Görünüm > Yakınlaştır"
          ],
          correctIndex: 0,
          explanation: "Formül sekmesindeki 'Formülleri Değerlendir' aracı karmaşık formülleri adım adım çözer."
        }
      ],
      commonMistakes: [
        "Tüm sütunu (A:A) kapsayan gereksiz geniş aralıklar seçerek bilgisayarı dondurmak."
      ],
      tips: [
        "Formül içinde bir parçayı fareyle seçip F9 tuşuna basarak o parçanın tek başına ürettiği sonucu anında görebilirsiniz."
      ],
      challenge: {
        title: `${spec.title} İleri Görevi`,
        description: `C2 hücresine ${spec.formula} uygulayın.`,
        targetCell: "C2",
        expectedFormula: spec.formula
      }
    })
  );
});
