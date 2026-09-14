import { Lesson } from "../../types";
import { defineLesson } from "./helper";

export const LEVEL_2_LESSONS: Lesson[] = [
  defineLesson({
    lessonNumber: 61,
    level: 2,
    title: "EĞER fonksiyonuna giriş",
    description: "Mantıksal karar verme yapısı, IF fonksiyonu mantığı ve sözdizimi: EĞER(mantıksal_sınama; doğruysa; yanlışsa).",
    difficulty: "Orta",
    estimatedMinutes: 7,
    prerequisites: ["ders-60"],
    learningObjectives: [
      "Excel'de mantıksal koşul oluşturmayı kavramak",
      "EĞER (IF) fonksiyonunun 3 temel argümanını öğrenmek",
      "Karşılaştırma operatörlerini (>, <, >=, <=, =, <>) kullanabilmek"
    ],
    theory: [
      "EĞER fonksiyonu Excel'e **düşünme ve karar verme** yeteneği kazandıran en önemli fonksiyondur.",
      "Sözdizimi 3 bölümden oluşur: `=EĞER(Mantıksal_Sınama; [Doğruysa_Değer]; [Yanlışsa_Değer])`.",
      "Örneğin: Eğer Satış 100.000'den büyükse 'Hedef Aşıldı' yaz, değilse 'Hedefin Altında' yaz.",
      "Formülde metin ifadeleri mutlaka **çift tırnak (\")** içine alınmalıdır: `\"Başarılı\"` gibi. Sayılar ise tırnaksız yazılır."
    ],
    examples: [
      {
        title: "Basit Geçti/Kaldı Kararı",
        explanation: "=EĞER(B2>=50; \"Geçti\"; \"Kaldı\") not 50 ve üzeriyse 'Geçti' yazar.",
        formula: '=EĞER(B2>=50; "Geçti"; "Kaldı")',
        table: {
          headers: ["Öğrenci", "Not", "Durum"],
          rows: [
            ["Ahmet", 75, "Geçti"],
            ["Mehmet", 40, "Kaldı"]
          ]
        }
      },
      {
        title: "Satış Primi Kararı",
        explanation: '=EĞER(C2>100000; "Prim Hak Etti"; "Prim Yok")'
      }
    ],
    realWorldExample: {
      department: "İnsan Kaynakları & Satış",
      scenario: "Satış ekibinin yıllık kotaları kontrol edilir; kotasını aşanlara 'Prim Onaylandı', aşamayanlara 'Yetersiz' damgası vurulur.",
      outcome: "Yüzlerce personelin prim hak edişleri tek saniyede otomatik belirlenir."
    },
    stepByStep: [
      "Durum hücresine tıklayın.",
      "`=EĞER(` yazın.",
      "Koşulu girin (örn: `B2>=50`), noktalı virgül (`;`) koyun.",
      "Koşul sağlanırsa yazılacak metni tırnak içinde yazın: `\"Geçti\"`.",
      "Noktalı virgül koyup koşul sağlanmazsa yazılacak değeri girin: `\"Kaldı\"` ve parantezi kapatıp `Enter`a basın."
    ],
    practiceExercises: [
      {
        prompt: "C2 hücresine not 50 ve üzeriyse 'Geçti', altındaysa 'Kaldı' yazdıran =EĞER(B2>=50; \"Geçti\"; \"Kaldı\") formülünü uygulayın.",
        targetCell: "C2",
        expectedFormula: '=EĞER(B2>=50; "Geçti"; "Kaldı")',
        hint: '=EĞER(B2>=50; "Geçti"; "Kaldı") yazıp Enter tuşuna basın.',
        table: { headers: ["Öğrenci", "Not", "Sonuç"], rows: [["Ali", 65, "Geçti"]] }
      },
      {
        prompt: "C3 hücresine aynı formülü uygulayın.",
        targetCell: "C3",
        expectedFormula: '=EĞER(B3>=50; "Geçti"; "Kaldı")',
        hint: '=EĞER(B3>=50; "Geçti"; "Kaldı") yazın.',
        table: { headers: ["Öğrenci", "Not", "Sonuç"], rows: [["Ali", 65, "Geçti"], ["Veli", 45, "Kaldı"]] }
      },
      {
        prompt: "D2 hücresine =EĞER(B2>=50; 1; 0) yazarak sayısal bayrak (flag) üretin.",
        targetCell: "D2",
        expectedFormula: "=EĞER(B2>=50; 1; 0)",
        hint: "=EĞER(B2>=50; 1; 0) yazın.",
        table: { headers: ["Not", "Bayrak"], rows: [[65, 1]] }
      }
    ],
    quizQuestions: [
      {
        question: "EĞER fonksiyonu kaç ana argümandan (bölümden) oluşur?",
        options: ["3 argüman (Mantıksal Sınama, Doğruysa, Yanlışsa)", "1 argüman", "2 argüman", "5 argüman"],
        correctIndex: 0,
        explanation: "EĞER(Koşul; Doğruysa; Yanlışsa) şeklinde 3 parçalıdır."
      },
      {
        question: "EĞER fonksiyonunda döndürülecek değer bir metin ise nasıl yazılmalıdır?",
        options: [
          "Çift tırnak içinde: \"Metin\"",
          "Köşeli parantez içinde: [Metin]",
          "Yalın tırnaksız: Metin",
          "Tek tırnak içinde: 'Metin'"
        ],
        correctIndex: 0,
        explanation: "Excel formüllerinde tüm metin sabitleri çift tırnak (\") arasına yazılmalıdır."
      },
      {
        question: "B2 hücresinde 100 varken =EĞER(B2>50; \"Büyük\"; \"Küçük\") formülü ne sonuç verir?",
        options: ["Büyük", "Küçük", "#DEĞER!", "50"],
        correctIndex: 0,
        explanation: "100 > 50 koşulu DOĞRU olduğu için ilk değer olan 'Büyük' döner."
      }
    ],
    commonMistakes: [
      "Metin yazarken çift tırnak koymayı unutup #AD? (#NAME?) hatası almak.",
      "Argümanlar arasına noktalı virgül (;) yerine virgül (,) koymak (Türkçe Excel ayarlarında noktalı virgül kullanılır)."
    ],
    tips: [
      "Fonksiyon yazarken açılan sarı ipucu kutucuğunda koyu renkli olan bölüm şu an yazdığınız argümanı gösterir."
    ],
    challenge: {
      title: "Geçti Kaldı Kararı",
      description: "C2 hücresine =EĞER(B2>=50; \"Geçti\"; \"Kaldı\") formülünü girin.",
      targetCell: "C2",
      expectedFormula: '=EĞER(B2>=50; "Geçti"; "Kaldı")'
    }
  })
];

// Generate Level 2 lessons (62 to 95)
const LEVEL_2_EXTRA_SPECS = [
  { num: 62, title: "Basit EĞER", desc: "Temel tek koşullu kontroller ve mantıksal operatörler.", formula: '=EĞER(A2>0; "Pozitif"; "Negatif")' },
  { num: 63, title: "EĞER ile metin döndürme", desc: "Durum etiketleri, 'Onaylandı' / 'Beklemede' gibi iş statüleri üretme.", formula: '=EĞER(B2="Tamam"; "Hazır"; "Bekliyor")' },
  { num: 64, title: "EĞER ile sayı döndürme", desc: "Koşula bağlı prim oranı (0,10 veya 0,05) veya indirim tutarı hesaplama.", formula: "=EĞER(A2>50000; A2*0,10; A2*0,05)" },
  { num: 65, title: "İç içe EĞER", desc: "Birden çok seviyeli kararlar (A, B, C not baremleri veya prim kademeleri).", formula: '=EĞER(A2>=85; "A"; EĞER(A2>=70; "B"; "C"))' },
  { num: 66, title: "VE", desc: "AND mantığı: Birden fazla koşulun hepsinin aynı anda DOĞRU olması şartı.", formula: "=VE(A2>=18; B2>=50)" },
  { num: 67, title: "VEYA", desc: "OR mantığı: Koşullardan en az birinin DOĞRU olmasının yeterli olduğu durumlar.", formula: "=VEYA(A2=\"İstanbul\"; A2=\"Ankara\")" },
  { num: 68, title: "DEĞİL", desc: "NOT fonksiyonu ile mantıksal tersini alma (DOĞRU'yu YANLIŞ'a çevirme).", formula: "=DEĞİL(A2=\"Pasif\")" },
  { num: 69, title: "EĞERSAY", desc: "COUNTIF ile belirli bir kritere uyan (örn: 'İstanbul' olan) hücreleri sayma.", formula: '=EĞERSAY(B2:B50; "İstanbul")' },
  { num: 70, title: "ÇOKEĞERSAY", desc: "COUNTIFS ile birden fazla koşulu aynı anda sağlayan satırları sayma.", formula: '=ÇOKEĞERSAY(A2:A50; "Kadın"; B2:B50; ">=30")' },
  { num: 71, title: "ETOPLA", desc: "SUMIF ile sadece belirli bir departmanın veya müşterinin cirosunu toplama.", formula: '=ETOPLA(A2:A50; "Satış"; C2:C50)' },
  { num: 72, title: "ÇOKETOPLA", desc: "SUMIFS ile hem belirli şehir hem belirli yıl şartına uyan ciroları toplama.", formula: '=ÇOKETOPLA(C2:C50; A2:A50; "Ankara"; B2:B50; 2026)' },
  { num: 73, title: "EĞERHATA", desc: "IFERROR ile #DEĞER!, #SAYI/0! gibi çirkin hata mesajları yerine şık metinler veya 0 gösterme.", formula: '=EĞERHATA(A2/B2; 0)' },
  { num: 74, title: "Metin fonksiyonlarına giriş", desc: "Metin ayrıştırma, birleştirme ve veri temizleme temelleri.", formula: '=SOLDAN(A2; 3)' },
  { num: 75, title: "SOLDAN", desc: "LEFT fonksiyonu ile metnin en başından istenen sayıda karakteri çekip alma.", formula: '=SOLDAN(A2; 4)' },
  { num: 76, title: "SAĞDAN", desc: "RIGHT fonksiyonu ile metnin sonundan (sağından) karakter koparma.", formula: '=SAĞDAN(A2; 3)' },
  { num: 77, title: "PARÇAAL", desc: "MID fonksiyonu ile metnin ortasından belirlenen konumdan itibaren parça alma (TC No, Seri No ayrıştırma).", formula: '=PARÇAAL(A2; 3; 5)' },
  { num: 78, title: "UZUNLUK", desc: "LEN fonksiyonu ile hücredeki karakter sayısını (boşluklar dahil) hesaplama.", formula: '=UZUNLUK(A2)' },
  { num: 79, title: "BÜYÜKHARF", desc: "UPPER fonksiyonu ile tüm metni büyük harfe dönüştürme.", formula: '=BÜYÜKHARF(A2)' },
  { num: 80, title: "KÜÇÜKHARF", desc: "LOWER fonksiyonu ile e-posta ve kullanıcı adlarını küçük harfe çevirme.", formula: '=KÜÇÜKHARF(A2)' },
  { num: 81, title: "YAZIM.DÜZENİ", desc: "PROPER fonksiyonu ile her kelimenin ilk harfini büyük, diğerlerini küçük yapma.", formula: '=YAZIM.DÜZENİ(A2)' },
  { num: 82, title: "KIRP", desc: "TRIM fonksiyonu ile kelimelerin başındaki, sonundaki ve aradaki gereksiz fazla boşlukları temizleme.", formula: '=KIRP(A2)' },
  { num: 83, title: "BUL", desc: "FIND fonksiyonu ile bir harfin veya kelimenin kaçıncı sırada olduğunu bulma (büyük/küçük harf duyarlı).", formula: '=BUL(" "; A2)' },
  { num: 84, title: "ARAMA", desc: "SEARCH fonksiyonu ile büyük/küçük harf duyarsız metin konumu bulma.", formula: '=ARAMA("Cad"; A2)' },
  { num: 85, title: "DEĞİŞTİR", desc: "REPLACE fonksiyonu ile belirli karakter konumundaki metni yenisiyle değiştirme.", formula: '=DEĞİŞTİR(A2; 1; 2; "TR")' },
  { num: 86, title: "YERİNEKOY", desc: "SUBSTITUTE fonksiyonu ile metin içindeki eski bir kelimeyi yenisiyle değiştirme.", formula: '=YERİNEKOY(A2; "-"; "/")' },
  { num: 87, title: "Birleştirme işlemleri", desc: "Ve (&) işareti ile ad ve soyadı araya boşluk koyarak birleştirme: A2 & \" \" & B2.", formula: '=A2 & " " & B2' },
  { num: 88, title: "METİNBİRLEŞTİR", desc: "TEXTJOIN fonksiyonu ile araya ayırıcı koyarak tüm aralığı tek hücrede birleştirme.", formula: '=METİNBİRLEŞTİR(", "; DOĞRU; A2:A10)' },
  { num: 89, title: "Tarih fonksiyonlarına giriş", desc: "Excel'in tarihleri 1 Ocak 1900'den başlayan seri sayılar olarak tutma mantığı.", formula: '=BUGÜN()' },
  { num: 90, title: "BUGÜN", desc: "TODAY fonksiyonu ile dinamik olarak günün tarihini getirme.", formula: '=BUGÜN()' },
  { num: 91, title: "ŞİMDİ", desc: "NOW fonksiyonu ile günün tarihini ve anlık saati birlikte getirme.", formula: '=ŞİMDİ()' },
  { num: 92, title: "GÜN", desc: "DAY fonksiyonu ile tarihin sadece gün bileşenini (1-31) çıkarma.", formula: '=GÜN(A2)' },
  { num: 93, title: "AY", desc: "MONTH fonksiyonu ile tarihin ay numarasını (1-12) alma.", formula: '=AY(A2)' },
  { num: 94, title: "YIL", desc: "YEAR fonksiyonu ile tarihin yılını (örn: 2026) çıkarma.", formula: '=YIL(A2)' },
  { num: 95, title: "HAFTANINGÜNÜ", desc: "WEEKDAY fonksiyonu ile tarihin haftanın kaçıncı günü olduğunu (Pazartesi=1) hesaplama.", formula: '=HAFTANINGÜNÜ(A2; 2)' }
];

LEVEL_2_EXTRA_SPECS.forEach((spec) => {
  LEVEL_2_LESSONS.push(
    defineLesson({
      lessonNumber: spec.num,
      level: 2,
      title: spec.title,
      description: spec.desc,
      difficulty: "Orta",
      estimatedMinutes: 6,
      prerequisites: [`ders-${spec.num - 1}`],
      learningObjectives: [
        `${spec.title} fonksiyonunun kullanımını ve mantığını öğrenmek`,
        `Raporlarda ${spec.title} fonksiyonunu doğru argümanlarla uygulamak`,
        `Yaygın hata ve sözdizimi tuzaklarından kaçınmak`
      ],
      theory: [
        `**${spec.title}** fonksiyonu, Excel formül dağarcığının en temel ve hayati araçlarından biridir.`,
        spec.desc,
        `Doğru sözdizimi: \`${spec.formula}\` şeklinde kurulur. Formül içindeki noktalı virgüller argümanları birbirinden ayırır.`
      ],
      examples: [
        {
          title: `${spec.title} Kullanım Örneği`,
          explanation: `Formülün hücredeki girdilerle nasıl çalıştığı gösterilmektedir.`,
          formula: spec.formula,
          table: {
            headers: ["Girdi 1", "Girdi 2", "Sonuç"],
            rows: [
              ["Örnek A", 100, "Hesaplandı"],
              ["Örnek B", 250, "Tamamlandı"]
            ]
          }
        },
        {
          title: "İş Dünyası Senaryosu",
          explanation: `Kurumsal tablolarda verilerin otomatik işlenmesi ve standartlaştırılması.`
        }
      ],
      realWorldExample: {
        department: "Veri Yönetimi & Operasyon",
        scenario: `Gelen ham müşteri verileri içindeki düzensizlikler ${spec.title} formülü ile otomatik temizlenir ve kurumsal formata kavuşturulur.`,
        outcome: "Saatler sürecek manuel düzenleme 1 dakikada kusursuz tamamlanır."
      },
      stepByStep: [
        `Hedef hücreyi seçin.`,
        `Formül çubuğuna \`${spec.formula}\` yazın.`,
        `'Enter' tuşuna basarak formülü çalıştırın.`
      ],
      practiceExercises: [
        {
          prompt: `Hedef hücreye ${spec.formula} formülünü yazın.`,
          targetCell: "C2",
          expectedFormula: spec.formula,
          hint: `${spec.formula} formülünü aynen girin.`,
          table: { headers: ["A", "B", "Sonuç"], rows: [["Veri 1", 100, "Sonuç"]] }
        },
        {
          prompt: `C3 hücresine de formülü uygulayın.`,
          targetCell: "C3",
          expectedFormula: spec.formula,
          hint: `Formülü girin.`,
          table: { headers: ["A", "B", "Sonuç"], rows: [["Veri 1", 100, "Sonuç"], ["Veri 2", 200, "Sonuç"]] }
        },
        {
          prompt: `D2 hücresine kontrol formülü yazın.`,
          targetCell: "D2",
          expectedFormula: "=C2",
          hint: "=C2 yazın.",
          table: { headers: ["Sonuç", "Kontrol"], rows: [["Sonuç", "Sonuç"]] }
        }
      ],
      quizQuestions: [
        {
          question: `${spec.title} fonksiyonu temelde ne işe yarar?`,
          options: [
            spec.desc,
            "Sadece hücrenin rengini değiştirir",
            "Dosyayı e-posta ile gönderir",
            "Tüm çalışma kitabını siler"
          ],
          correctIndex: 0,
          explanation: spec.desc
        },
        {
          question: `Bu fonksiyonda argümanlar arasına Türkiye Excel standartlarında hangi ayırıcı konur?`,
          options: ["; (Noktalı Virgül)", ", (Virgül)", ": (İki Nokta)", "/ (Bölü)"],
          correctIndex: 0,
          explanation: "Türkçe Excel ayarlarında fonksiyon parametreleri noktalı virgül (;) ile ayrılır."
        },
        {
          question: "Hatalı bir argüman girildiğinde Excel nasıl tepki verir?",
          options: [
            "Hata kodu üretir (#DEĞER!, #AD? vb.) veya formülü onaylamaz",
            "Bilgisayarı kapatır",
            "Dosyayı bozar",
            "Hiçbir uyarı vermez"
          ],
          correctIndex: 0,
          explanation: "Excel sözdizimi veya veri tipi hatalarında ilgili hata kodunu ekranda gösterir."
        }
      ],
      commonMistakes: [
        "Metin değerlerinde çift tırnak işaretini unutmak veya formül parantezlerini eksik kapatmak."
      ],
      tips: [
        "Formül yazarken `Tab` tuşuna basarak fonksiyon adını otomatik tamamlatabilirsiniz."
      ],
      challenge: {
        title: `${spec.title} Meydan Okuması`,
        description: `C2 hücresine ${spec.formula} formülünü girin.`,
        targetCell: "C2",
        expectedFormula: spec.formula
      }
    })
  );
});
