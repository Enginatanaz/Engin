import { Lesson } from "../../types";
import { defineLesson } from "./helper";

export const LEVEL_7_LESSONS: Lesson[] = [
  defineLesson({
    lessonNumber: 197,
    level: 7,
    title: "Finansal modelleme",
    description: "Dinamik varsayım tabloları, 3 tabloluk finansal model (Gelir Tablosu, Bilanço, Nakit Akımı) mimarisi.",
    difficulty: "Uzman",
    estimatedMinutes: 10,
    prerequisites: ["ders-196"],
    learningObjectives: [
      "Kurumsal finansal modelleme standartlarını (FAST prensipleri) öğrenmek",
      "Varsayım hücreleri ile hesaplama hücrelerini renk kodlarıyla katı şekilde ayrıştırmak",
      "Girdi parametreleri değiştikçe 5 yıllık projeksiyonu dinamik güncelleyen model kurmak"
    ],
    theory: [
      "Finansal modelleme, bir işletmenin geçmiş performansına ve geleceğe yönelik varsayımlarına dayanarak finansal geleceğini simüle etme sanatıdır.",
      "**Uluslararası Modelleme Standardı (FAST):**",
      "- Mavi yazı tipi: Kullanıcının değiştirebileceği girdiler ve varsayımlar (Hardcoded inputs).",
      "- Siyah yazı tipi: Formüller ve otomatik hesaplanan hücreler.",
      "- Yeşil yazı tipi: Başka bir sayfadan çekilen referanslar.",
      "Asla bir formülün içine elle sayı gömmeyin (`=A1*1,15` YANLIŞTIR!). Bunun yerine 'Enflasyon Oranı' hücresi açıp o hücreyi referans verin (`=A1*(1+$B$1)`)."
    ],
    examples: [
      {
        title: "Varsayım Tablosu Modeli",
        explanation: "Enflasyon, büyüme oranı ve faiz gibi girdiler tek bir 'Varsayımlar' bloğunda toplanır.",
        formula: "=B2*(1+$E$1)",
        table: {
          headers: ["Yıl", "Mevcut Satış", "Tahmini Büyüme", "Gelecek Satış"],
          rows: [
            ["2026", 1000000, "%15", 1150000],
            ["2027", 1150000, "%15", 1322500]
          ]
        }
      },
      {
        title: "Duyarlılık Analizi (Sensitivity Analysis)",
        explanation: "Veri Tablosu (Data Table) aracı ile dolar kuru ve faiz değişimlerine göre karın nasıl etkilendiğini test etme."
      }
    ],
    realWorldExample: {
      department: "Kurumsal Finans & Yatırım",
      scenario: "Şirket satın alma (M&A) sürecinde yatırım bankacıları şirketin 5 yıllık nakit akışını modelledikten sonra DCF yöntemiyle şirket değerlemesini belirler.",
      outcome: "Milyonlarca liralık yatırım kararı bu sağlam finansal modele dayanarak verilir."
    },
    stepByStep: [
      "Ayrı bir sayfada 'Model_Varsayimlari' tablosu oluşturun.",
      "Girdi hücrelerini mavi renk ve açık sarı dolgu ile belirginleştirin.",
      "Hesaplama satırlarında sadece hücre referansları kullanın, formül içine sabit sayı yazmayın."
    ],
    practiceExercises: [
      {
        prompt: "D2 hücresine =B2*(1+$C$1) yazarak 2026 yılı tahmini büyümesini hesaplayın.",
        targetCell: "D2",
        expectedFormula: "=B2*(1+$C$1)",
        hint: "=B2*(1+$C$1) yazıp Enter'a basın.",
        table: { headers: ["Yıl", "Ciro", "Oran", "Projeksiyon"], rows: [["2026", 1000000, 0.15, 1150000]] }
      },
      {
        prompt: "D3 hücresine sonraki yıl projeksiyonunu uygulayın.",
        targetCell: "D3",
        expectedFormula: "=D2*(1+$C$1)",
        hint: "=D2*(1+$C$1) yazın.",
        table: { headers: ["Yıl", "Ciro", "Oran", "Projeksiyon"], rows: [["2026", 1000000, 0.15, 1150000], ["2027", 1150000, 0.15, 1322500]] }
      },
      {
        prompt: "E2 hücresine =D2*0.20 ile tahmini net kar marjını (%20) hesaplayın.",
        targetCell: "E2",
        expectedFormula: "=D2*0.20",
        hint: "=D2*0.20 yazın.",
        table: { headers: ["Projeksiyon", "Tahmini Kar"], rows: [[1150000, 230000]] }
      }
    ],
    quizQuestions: [
      {
        question: "Uluslararası finansal modelleme standartlarında kullanıcının girdiği varsayım sayıları hangi renkle gösterilir?",
        options: ["Mavi", "Kırmızı", "Siyah", "Sarı"],
        correctIndex: 0,
        explanation: "Modelleme standartlarında girdiler mavi, formüller ise siyah yazı tipiyle belirtilir."
      },
      {
        question: "Finansal modellemede formülün içine elle sabit sayı (Hardcode - örn: =A1*1,18) yazmak neden en büyük günahtır?",
        options: [
          "Varsayım değiştiğinde yüzlerce hücredeki formülü tek tek elle düzeltmek gerekir ve hata riski doğar",
          "Dosya kaydedilemez",
          "Excel çökebilir",
          "Yazıcıdan çıktı alınamaz"
        ],
        correctIndex: 0,
        explanation: "Formül içi sabitler modeli katılaştırır ve dinamik senaryo analizini imkansız hale getirir."
      },
      {
        question: "DCF (İndirgenmiş Nakit Akımları) modellemesinde en kritik bileşen hangisidir?",
        options: [
          "Serbest Nakit Akışı (Free Cash Flow) ve Ağırlıklı Ortalama Sermaye Maliyeti (WACC)",
          "Hücrelerin kenarlık kalınlığı",
          "Çalışma kitabının dosya boyutu",
          "Sayfa sekmesinin rengi"
        ],
        correctIndex: 0,
        explanation: "DCF modelinde gelecekteki serbest nakit akımları WACC iskonto oranı ile bugüne indirgenir."
      }
    ],
    commonMistakes: [
      "Girdi hücreleri ile formül hücrelerini aynı renkte bırakıp denetçinin hangi sayının nereden geldiğini anlamasını engellemek."
    ],
    tips: [
      "F5 > Özel > Sabitler (Constants) seçeneğini kullanarak tablodaki elle yazılmış tüm girdileri tek saniyede seçebilirsiniz."
    ],
    challenge: {
      title: "Finansal Projeksiyon",
      description: "D2 hücresine =B2*(1+$C$1) formülünü uygulayın.",
      targetCell: "D2",
      expectedFormula: "=B2*(1+$C$1)"
    }
  })
];

// Generate Level 7 lessons (198 to 218)
const LEVEL_7_EXTRA_SPECS = [
  { num: 198, title: "Bütçe tablosu", desc: "Departman bazlı yıllık bütçe planı, bütçe sapma (Variance) ve gerçekleşme yüzdeleri.", project: "Yıllık Bütçe" },
  { num: 199, title: "Gelir-gider analizi", desc: "Aylık konsolide P&L (Kar ve Zarar) tablosu ve OPEX / CAPEX sınıflandırması.", project: "P&L Tablosu" },
  { num: 200, title: "Nakit akışı", desc: "13 haftalık dinamik likidite ve nakit akış (Cash Flow) tahminleme sistemi.", project: "Nakit Akış Modeli" },
  { num: 201, title: "Satış tahmini", desc: "Mevsimsellik, trend analizleri ve TAHMİN (FORECAST.ETS) fonksiyonu ile gelecek ciro kestirimi.", project: "Satış Tahmini" },
  { num: 202, title: "Satış performansı", desc: "Satış temsilcileri için baremli prim, hedef gerçekleşme ve lig sıralaması.", project: "Satış Karnesi" },
  { num: 203, title: "Müşteri analizi", desc: "RFM Analizi (Recency, Frequency, Monetary) ile en sadık ve kayıp müşterileri skorlama.", project: "RFM Analizi" },
  { num: 204, title: "Stok yönetimi", desc: "Kritik stok seviyeleri, Emniyet Stoğu, EOQ (Ekonomik Sipariş Miktarı) ve otomatik sipariş uyarıları.", project: "Stok Takip Sistemi" },
  { num: 205, title: "İnsan kaynakları raporu", desc: "Çalışan turnover oranı, kıdem dağılımı, izin bakiyeleri ve cinsiyet dengesi paneli.", project: "İK Analitiği" },
  { num: 206, title: "Maaş analizi", desc: "Brütten nete bordro simülasyonu, SGK tavanı, vergi dilimleri ve kümülatif matrah hesabı.", project: "Bordro Motoru" },
  { num: 207, title: "Proje takip sistemi", desc: "Excel üzerinde dinamik Gantt Şeması tasarımı, koşullu biçimlendirme ile ilerleme günleri.", project: "Gantt Şeması" },
  { num: 208, title: "Personel takip sistemi", desc: "Vardiya planlama, nöbet çizelgesi ve devamsızlık takip şablonu.", project: "Vardiya Çizelgesi" },
  { num: 209, title: "CRM Excel sistemi", desc: "Müşteri adayları (Leads), satış fırsatları ve boru hattı (Pipeline) dönüşüm takip tablosu.", project: "Hafif CRM Sistemi" },
  { num: 210, title: "Otomatik raporlama", desc: "Her pazartesi tek tuşla yönetim kurulu sunumuna hazır PDF ve e-posta çıktısı üreten mimari.", project: "Raporlama Otomasyonu" },
  { num: 211, title: "Yönetici dashboard'u", desc: "C-Level (CEO, CFO) yöneticiler için tek ekranda şirket genel resmi, interaktif KPI kokpiti.", project: "C-Level Kokpit" },
  { num: 212, title: "İleri KPI sistemi", desc: "Ağırlıklı performans puanları, radar grafikleri ve dengeli şirket karnesi (Balanced Scorecard).", project: "Stratejik KPI" },
  { num: 213, title: "Gerçek dünya Excel problemi çözme", desc: "Bozuk formülleri onarma, döngüsel başvuruları (Circular Reference) çözme ve denetim araçları.", project: "Hata Denetimi" },
  { num: 214, title: "Excel dosyası optimizasyonu", desc: "Şişmiş 100 MB'lık dosyaları 5 MB'a düşürme, hayalet aralıkları temizleme ve formül hafifletme.", project: "Dosya Optimizasyonu" },
  { num: 215, title: "Profesyonel Excel proje 1", desc: "Uçtan uca Proje: E-Ticaret Şirketi İçin Otomatik Satış & Karlılık Analiz Sistemi.", project: "Proje 1: E-Ticaret Analitiği" },
  { num: 216, title: "Profesyonel Excel proje 2", desc: "Uçtan uca Proje: Üretim Fabrikası Maliyet Muhasebesi ve Dinamik Kapasite Planı.", project: "Proje 2: Fabrika Maliyet Modeli" },
  { num: 217, title: "Profesyonel Excel proje 3", desc: "Uçtan uca Proje: Çok Şubeli Perakende Zinciri İçin Konsolide Yönetim Dashboard'u.", project: "Proje 3: Perakende Konsolidasyonu" },
  { num: 218, title: "Uzmanlık sınavı", desc: "218 derslik dev yolculuğun zirvesi: Gerçek iş senaryoları içeren kapsamlı Excel Ustalık Sınavı.", project: "Büyük Ustalık Sınavı" }
];

LEVEL_7_EXTRA_SPECS.forEach((spec) => {
  LEVEL_7_LESSONS.push(
    defineLesson({
      lessonNumber: spec.num,
      level: 7,
      title: spec.title,
      description: spec.desc,
      difficulty: "Uzman",
      estimatedMinutes: 10,
      prerequisites: [`ders-${spec.num - 1}`],
      learningObjectives: [
        `${spec.title} konusunun kurumsal seviye metodolojisini eksiksiz öğrenmek`,
        `Gerçek iş dünyası senaryolarında uçtan uca ${spec.project} modelini geliştirmek`,
        `Profesyonel raporlama, veri tutarlılığı ve yönetim sunum standartlarını uygulamak`
      ],
      theory: [
        `Excel Ustalık seviyesinde **${spec.title}**, teorik bilginin pratik kurumsal başarıya dönüştüğü en üst noktadır.`,
        spec.desc,
        `Burada geliştirilen her model; yöneticilerin kararlarını doğrudan etkileyen, şirket gelirini ve operasyonel verimliliğini artıran canlı bir iş sistemidir.`
      ],
      examples: [
        {
          title: `${spec.project} Gerçek Senaryo Çıktısı`,
          explanation: `Kurumsal yönetim kademesine sunulan analiz tablosu.`,
          table: {
            headers: ["İş Alanı", "KPI Hedefi", "Gerçekleşme", "Performans Notu"],
            rows: [
              ["Ana Faaliyet", "%100", "%108", "Hedef Üstü"],
              ["Maliyet Kontrolü", "₺500.000", "₺480.000", "Tasarruf Sağlandı"]
            ]
          }
        },
        {
          title: "Uçtan Uca Entegrasyon",
          explanation: `Modelin formüller, veri tablosu ve dinamik dashboard ile entegre çalışması.`
        }
      ],
      realWorldExample: {
        department: "Stratejik Planlama & İcra Kurulu",
        scenario: `Şirketin tüm departman liderleri yıllık bütçe ve hedeflerini ${spec.title} ilkelerine uygun biçimde konsolide eder.`,
        outcome: "Yönetim kurulu sıfır belirsizlikle şirketin 3 yıllık stratejik yol haritasını onaylar."
      },
      stepByStep: [
        `İş problemini tanımlayın ve veri akış şemasını çizin.`,
        `Gerekli veri modellerini, formülleri ve görsel arayüzü inşa edin.`,
        `Stres testi ve duyarlılık analizleri ile modelin sağlamlığını kanıtlayın.`
      ],
      practiceExercises: [
        {
          prompt: `A1 hücresine proje kodu olarak '${spec.project}' yazın.`,
          targetCell: "A1",
          expectedFormula: spec.project,
          hint: `A1 hücresine '${spec.project}' yazın.`,
          table: { headers: ["Proje"], rows: [[spec.project]] }
        },
        {
          prompt: `B1 hücresine başarı oranını 100 olarak girin.`,
          targetCell: "B1",
          expectedFormula: "100",
          hint: "B1 hücresine 100 yazın.",
          table: { headers: ["Proje", "Başarı Puanı"], rows: [[spec.project, 100]] }
        },
        {
          prompt: `C1 hücresine 'Onaylandı' yazın.`,
          targetCell: "C1",
          expectedFormula: "Onaylandı",
          hint: "C1 hücresine Onaylandı yazın.",
          table: { headers: ["Durum"], rows: [["Onaylandı"]] }
        }
      ],
      quizQuestions: [
        {
          question: `${spec.title} konusunun kurumsal dünyadaki temel amacı nedir?`,
          options: [
            spec.desc,
            "Sadece Excel'i denemek",
            "Dosyayı silmek",
            "Bilgisayarı dondurmak"
          ],
          correctIndex: 0,
          explanation: spec.desc
        },
        {
          question: "Profesyonel bir Excel modelinde dosya boyutu aşırı şişmişse ve geç açılıyorsa ilk kontrol edilmesi gereken nedir?",
          options: [
            "Kullanılmayan hayalet hücre aralıkları (Ctrl+End ile son hücre kontrolü) ve aşırı karmaşık biçimlendirmeler",
            "Masaüstü arka plan resmi",
            "Klavyenin pili",
            "Excel'in dil ayarı"
          ],
          correctIndex: 0,
          explanation: "Excel dosyalarının şişmesindeki en büyük etken kullanılmayan hayalet hücre aralıkları ve aşırı hücre stilleridir."
        },
        {
          question: "İcra kuruluna sunulacak bir finans veya yönetim modelinin en ayırt edici niteliği nedir?",
          options: [
            "Güvenilirlik, sıfır formül hatası, net görsel hiyerarşi ve hızlı senaryo değiştirebilme esnekliği",
            "Yüzlerce farklı renk kullanılması",
            "En az 50 sayfa olması",
            "Kimsenin anlayamayacağı kadar karmaşık formüller içermesi"
          ],
          correctIndex: 0,
          explanation: "Usta bir Excel uzmanı karmaşık problemleri sade, şeffaf, güvenilir ve kolay yönetilebilir modellere dönüştürür."
        }
      ],
      commonMistakes: [
        "Modeli sadece kendisinin anlayabileceği kadar karmaşık ve dokümantasyonsuz bırakmak."
      ],
      tips: [
        "Dosyanızın en başına daima bir 'İçindekiler / Giriş' (Index) sayfası koyarak modelin haritasını ve revizyon geçmişini yazın."
      ],
      challenge: {
        title: `${spec.title} Ustalık Görevi`,
        description: `A1 hücresine '${spec.project}' yazarak ustalığınızı taçlandırın.`,
        targetCell: "A1",
        expectedFormula: spec.project
      }
    })
  );
});
