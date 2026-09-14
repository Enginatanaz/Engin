import { Lesson } from "../../types";
import { defineLesson } from "./helper";

export const LEVEL_1_LESSONS: Lesson[] = [
  defineLesson({
    lessonNumber: 31,
    level: 1,
    title: "İlk formülümüz",
    description: "Eşittir (=) işaretinin büyüsü, Excel'de formül yazma kuralları ve hücre başvuruları.",
    difficulty: "Temel",
    estimatedMinutes: 6,
    prerequisites: ["ders-30"],
    learningObjectives: [
      "Excel'de her formülün eşittir (=) işaretiyle başladığını kavramak",
      "Statik sayı yerine hücre adresleriyle dinamik hesaplama yapmak",
      "Formül çubuğunda formülü denetlemeyi öğrenmek"
    ],
    theory: [
      "Excel'i sıradan bir tablodan ayıran en büyük güç formüllerdir. Excel'e bir hesaplama yapacağını söylemenin tek yolu vardır: **Eşittir (=) işareti**.",
      "Bir hücreye doğrudan `10+20` yazarsanız Excel bunu düz bir metin olarak algılar ve ekranda sadece `10+20` görürsünüz. Fakat başına `=10+20` yazarsanız Excel anında `30` sonucunu üretir.",
      "Daha da önemlisi, sabit sayılar yerine hücre adreslerini kullanmaktır: `=A1+B1`. Böylece A1 veya B1 hücresindeki sayı değiştiği anda sonuç otomatik olarak kendini yeniler."
    ],
    examples: [
      {
        title: "Temel Toplama Formülü",
        explanation: "=A1+B1 formülü iki hücreyi toplar.",
        formula: "=A1+B1",
        table: {
          headers: ["A", "B", "C (Formül)"],
          rows: [[50, 75, 125]]
        }
      },
      {
        title: "Dinamik Güncelleme",
        explanation: "A1 hücresi 100 yapıldığında C hücresindeki sonuç hiçbir şeye basmadan 175 olur."
      }
    ],
    realWorldExample: {
      department: "Satış & Mağaza Yönetimi",
      scenario: "Kasa sorumlusu nakit satışları ve kredi kartı satışlarını toplayarak gün sonu toplam ciroyu formülle bulur.",
      outcome: "Zihinden hesaplama yapılmaz, açık veya fazla riskleri ortadan kalkar."
    },
    stepByStep: [
      "Sonucu görmek istediğiniz hücreye (örn: C1) tıklayın.",
      "Klavyeden `=` (Eşittir) işaretine basın.",
      "A1 hücresine tıklayın, `+` işaretine basın, ardından B1 hücresine tıklayın.",
      "`Enter` tuşuna basarak formülü onaylayın."
    ],
    practiceExercises: [
      {
        prompt: "C1 hücresine =A1+B1 formülünü yazarak iki hücreyi toplayın.",
        targetCell: "C1",
        expectedFormula: "=A1+B1",
        hint: "=A1+B1 yazıp Enter'a basın.",
        table: { headers: ["A", "B", "Toplam"], rows: [[150, 250, 400]] }
      },
      {
        prompt: "C2 hücresine =A2+B2 formülünü girin.",
        targetCell: "C2",
        expectedFormula: "=A2+B2",
        hint: "=A2+B2 yazıp Enter tuşuna basın.",
        table: { headers: ["A", "B", "Toplam"], rows: [[150, 250, 400], [300, 200, 500]] }
      },
      {
        prompt: "C3 hücresine =A3*2 formülü ile A3 değerini 2 ile çarpın.",
        targetCell: "C3",
        expectedFormula: "=A3*2",
        hint: "=A3*2 yazıp Enter'a basın.",
        table: { headers: ["A", "Çarpan", "Sonuç"], rows: [[50, 2, 100]] }
      }
    ],
    quizQuestions: [
      {
        question: "Excel'de bir hesaplama formülü yazarken ilk basılması gereken işaret hangisidir?",
        options: ["= (Eşittir)", "+ (Artı)", "# (Kare)", "? (Soru İşareti)"],
        correctIndex: 0,
        explanation: "Excel formülleri mutlaka eşittir (=) işareti ile başlamalıdır."
      },
      {
        question: "Hücreye eşittir koymadan sadece 20+30 yazıp Enter'a basarsanız ne olur?",
        options: [
          "Hücrede aynen '20+30' metni görünür, hesaplama yapılmaz",
          "Hücre 50 sonucunu gösterir",
          "Excel hata uyarısı verir",
          "Dosya kapanır"
        ],
        correctIndex: 0,
        explanation: "Eşittir işareti olmadığında Excel girdiyi metin (yazı) olarak saklar."
      },
      {
        question: "=A1+B1 formülünün =50+75 yazmaya göre en büyük üstünlüğü nedir?",
        options: [
          "A1 veya B1 hücresindeki sayılar değiştiğinde sonucun otomatik güncellenmesi",
          "Daha az yer kaplaması",
          "Sadece renkli görünmesi",
          "Yazıcıdan daha hızlı çıkması"
        ],
        correctIndex: 0,
        explanation: "Hücre başvurusu kullanmak tabloyu dinamik kılar; veri değiştiğinde formül anında yeni sonucu üretir."
      }
    ],
    commonMistakes: [
      "Formüle eşittir (=) koymayı unutup 'Neden hesaplamıyor?' diye şaşırmak.",
      "Formül yazarken hücre adresi yerine sayıları elle yazmak (=150+250 gibi)."
    ],
    tips: [
      "Formül yazarken hücre adını klavyeden elle yazmak yerine doğrudan o hücreye fareyle tıklayabilirsiniz."
    ],
    challenge: {
      title: "İlk Dinamik Toplam",
      description: "C1 hücresine =A1+B1 formülünü uygulayın.",
      targetCell: "C1",
      expectedFormula: "=A1+B1"
    }
  }),

  defineLesson({
    lessonNumber: 32,
    level: 1,
    title: "Toplama işlemi",
    description: "Artı (+) operatörü, çoklu hücre toplama ve formül yapısı.",
    difficulty: "Temel",
    estimatedMinutes: 5,
    prerequisites: ["ders-31"],
    learningObjectives: [
      "+ operatörünü kullanarak ardışık veya dağınık hücreleri toplamak",
      "Formülde birden fazla hücreyi birbirine eklemek"
    ],
    theory: [
      "Excel'de toplama işlemi için klavyedeki `+` (artı) işareti kullanılır.",
      "Örneğin `=A1+B1+C1` formülü bu üç hücredeki sayıları toplar.",
      "Toplama işleminde toplanan hücrelerden biri boşsa Excel onu 0 kabul eder. Ancak metin içeriyorsa `#DEĞER!` (#VALUE!) hatası verir."
    ],
    examples: [
      {
        title: "Üçlü Gider Toplamı",
        explanation: "=B1+B2+B3 kira, elektrik ve internet faturalarını toplar.",
        formula: "=B1+B2+B3"
      },
      {
        title: "Sabit Eklemeli Toplam",
        explanation: "=A1+50 formülü A1'e doğrudan 50 ekler."
      }
    ],
    realWorldExample: {
      department: "Muhasebe",
      scenario: "Ofisin elektrik, su, internet ve doğalgaz giderleri 4 hücrede tutulur ve toplam fatura tutarı formülle bulunur.",
      outcome: "Herhangi bir fatura ödendiğinde veya revize edildiğinde toplam anında yenilenir."
    },
    stepByStep: [
      "Hedef hücreye tıklayın.",
      "`=` yazıp ilk hücreyi seçin.",
      "`+` yazıp ikinci hücreyi, tekrar `+` yazıp üçüncü hücreyi seçin ve `Enter`a basın."
    ],
    practiceExercises: [
      {
        prompt: "D1 hücresine =A1+B1+C1 formülünü yazarak üç hücreyi toplayın.",
        targetCell: "D1",
        expectedFormula: "=A1+B1+C1",
        hint: "=A1+B1+C1 yazıp Enter'a basın.",
        table: { headers: ["Kira", "Elektrik", "İnternet", "Toplam"], rows: [[15000, 2500, 800, 18300]] }
      },
      {
        prompt: "C2 hücresine =A2+B2 formülünü uygulayın.",
        targetCell: "C2",
        expectedFormula: "=A2+B2",
        hint: "=A2+B2 yazın.",
        table: { headers: ["A", "B", "Toplam"], rows: [[100, 200, 300]] }
      },
      {
        prompt: "B3 hücresine =B1+B2 formülüyle ara toplam alın.",
        targetCell: "B3",
        expectedFormula: "=B1+B2",
        hint: "=B1+B2 yazıp Enter'a basın.",
        table: { headers: ["Değer", "Ara Toplam"], rows: [[500, 1500]] }
      }
    ],
    quizQuestions: [
      {
        question: "Excel'de iki veya daha fazla hücreyi toplamak için hangi matematiksel operatör kullanılır?",
        options: ["+", "&", "*", "@"],
        correctIndex: 0,
        explanation: "Toplama için standart artı (+) işareti kullanılır."
      },
      {
        question: "=A1+B1 formülünde B1 hücresinde 'Metin' yazıyorsa Excel ne sonuç üretir?",
        options: ["#DEĞER! (#VALUE!) hatası", "0", "A1'in kendisi", "Boşluk"],
        correctIndex: 0,
        explanation: "Matematiksel + operatörü metin ile sayıyı toplayamaz ve #DEĞER! hatası verir."
      },
      {
        question: "A1=10 ve B1=20 iken =A1+B1+5 formülünün sonucu kaçtır?",
        options: ["35", "30", "10205", "25"],
        correctIndex: 0,
        explanation: "10 + 20 + 5 = 35."
      }
    ],
    commonMistakes: [
      "Hücrenin içinde harf varken + ile toplamaya çalışmak."
    ],
    tips: [
      "Çok fazla hücre toplayacaksanız tek tek + yazmak yerine ileride öğreneceğimiz TOPLA fonksiyonu çok daha pratiktir."
    ],
    challenge: {
      title: "Üçlü Gider Hesabı",
      description: "D1 hücresine =A1+B1+C1 formülünü girin.",
      targetCell: "D1",
      expectedFormula: "=A1+B1+C1"
    }
  }),

  defineLesson({
    lessonNumber: 33,
    level: 1,
    title: "Çıkarma işlemi",
    description: "Eksi (-) operatörü, net kar, fark ve bütçe sapma hesaplamaları.",
    difficulty: "Temel",
    estimatedMinutes: 5,
    prerequisites: ["ders-32"],
    learningObjectives: [
      "Eksi (-) operatörüyle iki hücre arasındaki farkı hesaplamak",
      "Gelir - Gider formülüyle net kar hesaplamak",
      "Negatif sonuçların kırmızı veya parantez içinde görünümünü anlamak"
    ],
    theory: [
      "Excel'de çıkarma işlemi için klavyedeki tire / eksi (`-`) işareti kullanılır.",
      "İş dünyasındaki en temel finansal denklem: **Net Kar = Gelir - Gider**.",
      "Örneğin Gelir A2 hücresinde (100.000 ₺), Gider B2 hücresinde (65.000 ₺) ise C2 hücresine `=A2-B2` yazarak net karı buluruz.",
      "Eğer gider gelirden büyükse sonuç negatif (örn: -5.000 ₺) çıkar."
    ],
    examples: [
      {
        title: "Net Kar Hesabı",
        explanation: "=A2-B2 -> 100000 - 65000 = 35000 ₺ Net Kar.",
        formula: "=A2-B2",
        table: {
          headers: ["Gelir", "Gider", "Net Kar"],
          rows: [[100000, 65000, 35000]]
        }
      },
      {
        title: "Stoktan Düşme",
        explanation: "=A1-B1 (Mevcut Stok - Satılan Adet) ile kalan stoğu bulma."
      }
    ],
    realWorldExample: {
      department: "Finans & Satış",
      scenario: "Aylık cirodan maliyetler ve personel giderleri çıkarılarak şirketin o ay zarar edip etmediği kontrol edilir.",
      outcome: "Yatırımcılara ve yönetime net finansal durum anında raporlanır."
    },
    stepByStep: [
      "C2 hücresine tıklayın.",
      "`=` yazıp Gelir hücresine (A2) tıklayın.",
      "`-` tuşuna basıp Gider hücresine (B2) tıklayın.",
      "`Enter`a basarak net karı hesaplayın."
    ],
    practiceExercises: [
      {
        prompt: "C2 hücresine =A2-B2 formülünü yazarak Net Karı hesaplayın.",
        targetCell: "C2",
        expectedFormula: "=A2-B2",
        hint: "=A2-B2 yazıp Enter'a basın.",
        table: { headers: ["Gelir", "Gider", "Net Kar"], rows: [[120000, 75000, 45000]] }
      },
      {
        prompt: "C3 hücresine =A3-B3 yazarak kalan stok miktarını bulun.",
        targetCell: "C3",
        expectedFormula: "=A3-B3",
        hint: "=A3-B3 yazın.",
        table: { headers: ["Giriş", "Çıkış", "Kalan"], rows: [[500, 180, 320]] }
      },
      {
        prompt: "D2 hücresine =C2-5000 yazarak vergi sonrası net karı hesaplayın.",
        targetCell: "D2",
        expectedFormula: "=C2-5000",
        hint: "=C2-5000 yazın.",
        table: { headers: ["Net Kar", "Vergi Sonrası"], rows: [[45000, 40000]] }
      }
    ],
    quizQuestions: [
      {
        question: "Excel'de çıkarma işlemi için hangi işaret kullanılır?",
        options: ["- (Eksi / Tire)", "/", "\\", "_"],
        correctIndex: 0,
        explanation: "Standart eksi (-) işareti kullanılır."
      },
      {
        question: "Gelir 50.000 ₺ ve Gider 60.000 ₺ iken =Gelir-Gider formülü ne sonuç verir?",
        options: ["-10.000 ₺", "10.000 ₺", "0 ₺", "#DEĞER!"],
        correctIndex: 0,
        explanation: "50000 - 60000 = -10000 (Zarar)."
      },
      {
        question: "Excel'de ÇIKAR adında özel bir fonksiyon var mıdır?",
        options: [
          "Hayır, çıkarma işlemi doğrudan eksi (-) operatörü ile yapılır",
          "Evet, ÇIKAR() fonksiyonu vardır",
          "Sadece EKSİLT() fonksiyonu vardır",
          "Sadece makro ile yapılabilir"
        ],
        correctIndex: 0,
        explanation: "Excel'de 'ÇIKAR' adında ayrı bir fonksiyon yoktur; daima eksi (-) işareti kullanılır."
      }
    ],
    commonMistakes: [
      "Excel'de =ÇIKAR(A1;B1) şeklinde var olmayan bir fonksiyon aramaya çalışmak."
    ],
    tips: [
      "Negatif sayıların kırmızı görünmesi için Hücreleri Biçimlendir > Sayı menüsünden negatif sayı rengini kırmızı seçebilirsiniz."
    ],
    challenge: {
      title: "Net Bütçe Farkı",
      description: "C2 hücresine =A2-B2 formülünü girin.",
      targetCell: "C2",
      expectedFormula: "=A2-B2"
    }
  }),

  defineLesson({
    lessonNumber: 34,
    level: 1,
    title: "Çarpma işlemi",
    description: "Yıldız (*) operatörü, adet x birim fiyat ve toplam tutar hesaplamaları.",
    difficulty: "Temel",
    estimatedMinutes: 5,
    prerequisites: ["ders-33"],
    learningObjectives: [
      "Çarpma işlemi için yıldız (*) sembolünün kullanıldığını kavramak",
      "Birim Fiyat x Adet ile toplam fatura tutarını hesaplamak",
      "ÇARPIM fonksiyonu ile operatör farkını öğrenmek"
    ],
    theory: [
      "Excel'de çarpma işlemi için 'x' veya 'X' harfi KULLANILMAZ. Çarpma işareti daima **yıldız (`*`)** sembolüdür.",
      "Klavyenin nümerik tuş takımında veya `Shift + 8` kombinasyonunda yer alır.",
      "En yaygın kullanım: `Tutar = Adet * Birim Fiyat`. Örneğin B2 hücresinde 15 adet, C2 hücresinde 200 ₺ varsa, D2 hücresine `=B2*C2` yazılarak 3.000 ₺ bulunur."
    ],
    examples: [
      {
        title: "Sipariş Satır Tutarı",
        explanation: "=B2*C2 (5 Adet x 400 ₺ = 2.000 ₺)",
        formula: "=B2*C2",
        table: {
          headers: ["Ürün", "Adet", "Birim Fiyat", "Tutar"],
          rows: [["SSD Disk", 5, 400, 2000]]
        }
      },
      {
        title: "Katsayı Çarpımı",
        explanation: "=A1*1,20 ile fiyata %20 zam veya vergi ekleme hesabı."
      }
    ],
    realWorldExample: {
      department: "Satın Alma & E-Ticaret",
      scenario: "Tedarikçiden sipariş edilen 250 adet yedek parçanın birim fiyatı ile çarpılarak fatura bedeli belirlenir.",
      outcome: "Fatura tutarı kuruşu kuruşuna hatasız doğrulanır."
    },
    stepByStep: [
      "Tutar hücresine (D2) tıklayın.",
      "`=` yazıp Adet hücresini (B2) seçin.",
      "`*` (Yıldız) işaretine basın.",
      "Birim Fiyat hücresini (C2) seçin ve `Enter`a basın."
    ],
    practiceExercises: [
      {
        prompt: "D2 hücresine =B2*C2 formülünü yazarak satır tutarını hesaplayın.",
        targetCell: "D2",
        expectedFormula: "=B2*C2",
        hint: "=B2*C2 yazıp Enter'a basın.",
        table: { headers: ["Ürün", "Adet", "Birim Fiyat", "Tutar"], rows: [["Klavye", 10, 350, 3500]] }
      },
      {
        prompt: "D3 hücresine =B3*C3 yazarak ikinci ürün tutarını bulun.",
        targetCell: "D3",
        expectedFormula: "=B3*C3",
        hint: "=B3*C3 yazın.",
        table: { headers: ["Ürün", "Adet", "Birim Fiyat", "Tutar"], rows: [["Fare", 20, 150, 3000]] }
      },
      {
        prompt: "E2 hücresine =D2*1.2 formülü ile KDV dahil tutarı hesaplayın.",
        targetCell: "E2",
        expectedFormula: "=D2*1.2",
        hint: "=D2*1.2 yazıp Enter'a basın.",
        table: { headers: ["Tutar", "KDV Dahil"], rows: [[3500, 4200]] }
      }
    ],
    quizQuestions: [
      {
        question: "Excel'de iki sayıyı veya hücreyi çarpmak için hangi işaret kullanılır?",
        options: ["* (Yıldız)", "x (Harf)", "• (Nokta)", "^ (Şapka)"],
        correctIndex: 0,
        explanation: "Excel'de çarpma operatörü daima yıldız (*) simgesidir."
      },
      {
        question: "B2 hücresine =A1x5 yazıp Enter'a basarsanız ne olur?",
        options: [
          "Excel geçersiz ad veya sözdizimi hatası verir (#AD? / #NAME?)",
          "A1'i 5 ile çarpar",
          "Hücre 0 olur",
          "Dosya kaydedilir"
        ],
        correctIndex: 0,
        explanation: "Excel 'x' harfini matematiksel çarpma olarak tanımaz, formül hatası verir."
      },
      {
        question: "Hücrede 10 adet ve 45 ₺ birim fiyat varken toplam tutar formülü hangisidir?",
        options: ["=A1*B1", "=A1+B1", "=A1/B1", "=A1-B1"],
        correctIndex: 0,
        explanation: "Toplam tutar = Adet * Birim Fiyat -> =A1*B1."
      }
    ],
    commonMistakes: [
      "Klavyeden 'x' harfine basıp çarpma yapmasını beklemek."
    ],
    tips: [
      "Nümerik klavyeniz varsa sağ üstteki `*` tuşuna tek basışla çarpma işaretini hızlıca ekleyebilirsiniz."
    ],
    challenge: {
      title: "Satır Tutarı",
      description: "D2 hücresine =B2*C2 formülünü girin.",
      targetCell: "D2",
      expectedFormula: "=B2*C2"
    }
  }),

  defineLesson({
    lessonNumber: 35,
    level: 1,
    title: "Bölme işlemi",
    description: "Bölü (/) operatörü, birim maliyet, oranlama ve #SAYI/0! hatasını önleme.",
    difficulty: "Temel",
    estimatedMinutes: 5,
    prerequisites: ["ders-34"],
    learningObjectives: [
      "Bölme işlemi için taksim / eğik çizgi (/) işaretini kullanmak",
      "Toplam Tutarı Adede bölerek Birim Maliyeti hesaplamak",
      "#SAYI/0! (#DIV/0!) sıfıra bölme hatasını tanımak"
    ],
    theory: [
      "Excel'de bölme işlemi için ileriye eğik çizgi / taksim (`/`) kullanılır. Klavyede `Shift + 7` veya nümerik tuş takımından yazılır.",
      "Örnek: Birim Maliyet = Toplam Gider / Üretilen Adet -> `=A2/B2`.",
      "**Önemli Kural:** Matematikte hiçbir sayı sıfıra bölünemez. Eğer bölen hücre sıfır (0) veya boş ise Excel meşhur **#SAYI/0!** (#DIV/0!) hatasını üretir."
    ],
    examples: [
      {
        title: "Birim Maliyet",
        explanation: "=A2/B2 (60.000 ₺ / 1.000 Adet = 60 ₺ Birim Maliyet).",
        formula: "=A2/B2",
        table: {
          headers: ["Toplam Maliyet", "Üretim Adedi", "Birim Maliyet"],
          rows: [[60000, 1000, 60]]
        }
      },
      {
        title: "Kişi Başına Düşen Bütçe",
        explanation: "=C1/D1 (Toplam Prim / Çalışan Sayısı)."
      }
    ],
    realWorldExample: {
      department: "Üretim ve Maliyet Muhasebesi",
      scenario: "Fabrikada ay boyunca yapılan 500.000 ₺ toplam harcama, üretilen 20.000 adet ürüne bölünerek parça başı net maliyet tespit edilir.",
      outcome: "Fiyatlandırma stratejisi doğru belirlenir, zararına satış yapılması engellenir."
    },
    stepByStep: [
      "Birim Maliyet hücresine tıklayın.",
      "`=` yazıp Toplam Tutar hücresini seçin.",
      "`/` işaretine basın.",
      "Adet hücresini seçin ve `Enter`a basın."
    ],
    practiceExercises: [
      {
        prompt: "C2 hücresine =A2/B2 yazarak birim maliyeti hesaplayın.",
        targetCell: "C2",
        expectedFormula: "=A2/B2",
        hint: "=A2/B2 yazıp Enter'a basın.",
        table: { headers: ["Toplam Maliyet", "Adet", "Birim"], rows: [[80000, 400, 200]] }
      },
      {
        prompt: "C3 hücresine =A3/B3 formülünü girin.",
        targetCell: "C3",
        expectedFormula: "=A3/B3",
        hint: "=A3/B3 yazın.",
        table: { headers: ["Toplam", "Kişi", "Kişi Başı"], rows: [[15000, 5, 3000]] }
      },
      {
        prompt: "D2 hücresine =C2/2 formülü ile yarım birim maliyetini hesaplayın.",
        targetCell: "D2",
        expectedFormula: "=C2/2",
        hint: "=C2/2 yazın.",
        table: { headers: ["Birim", "Yarım Birim"], rows: [[200, 100]] }
      }
    ],
    quizQuestions: [
      {
        question: "Excel'de bölme işlemi için hangi işaret kullanılır?",
        options: ["/ (Eğik Çizgi / Slash)", "\\ (Ters Slash)", ": (İki Nokta)", "% (Yüzde)"],
        correctIndex: 0,
        explanation: "Bölme operatörü taksim / slash (/) simgesidir."
      },
      {
        question: "Excel'de #SAYI/0! (#DIV/0!) hatası ne anlama gelir?",
        options: [
          "Bir sayının sıfıra veya boş bir hücreye bölünmeye çalışıldığını",
          "Hücrenin yeterince geniş olmadığını",
          "Sayının çok büyük olduğunu",
          "İnternet bağlantısının koptuğunu"
        ],
        correctIndex: 0,
        explanation: "Sıfıra bölme matematiksel olarak tanımsız olduğundan Excel #SAYI/0! hatası verir."
      },
      {
        question: "100.000 ₺ bütçeyi 4 çeyreğe eşit bölmek için formül çubuğuna ne yazılmalıdır?",
        options: ["=100000/4", "=100000:4", "=100000\\4", "=100000-4"],
        correctIndex: 0,
        explanation: "Doğru bölme sözdizimi =100000/4 şeklindedir."
      }
    ],
    commonMistakes: [
      "Bölen hücrenin boş olması sebebiyle tablonun #SAYI/0! hatasıyla dolması."
    ],
    tips: [
      "İleride öğreneceğimiz EĞERHATA veya EĞER fonksiyonu ile sıfıra bölme hatalarını profesyonelce gizleyebilirsiniz."
    ],
    challenge: {
      title: "Birim Maliyet",
      description: "C2 hücresine =A2/B2 formülünü girin.",
      targetCell: "C2",
      expectedFormula: "=A2/B2"
    }
  })
];

// Generate remainder of Level 1 lessons (Ders 36 to 60)
const LEVEL_1_EXTRA_SPECS = [
  { num: 36, title: "İşlem önceliği", desc: "Matematiksel parantez kuralları, çarpma/bölmenin toplama/çıkarmaya üstünlüğü.", formula: "=(A1+B1)*C1" },
  { num: 37, title: "Formül kopyalama", desc: "Doldurma tutamacı ile formülleri yüzlerce satıra anında yayma.", formula: "=A2*B2" },
  { num: 38, title: "Göreli hücre başvurusu", desc: "Formül aşağı çekildikçe satır numaralarının (A1 -> A2 -> A3) göreceli artması.", formula: "=A1+B1" },
  { num: 39, title: "Mutlak hücre başvurusu", desc: "Dolar ($) işareti ile hücre sabitleme ($A$1) ve F4 tuşu mucizesi.", formula: "=A2*$D$1" },
  { num: 40, title: "Karma hücre başvuruları", desc: "Yalnızca satırı ($A1) veya yalnızca sütunu (A$1) sabitleme mantığı.", formula: "=$A2*B$1" },
  { num: 41, title: "TOPLA", desc: "SUM fonksiyonu ile binlerce hücreyi tek hamlede hızlıca toplama.", formula: "=TOPLA(A1:A10)" },
  { num: 42, title: "ORTALAMA", desc: "AVERAGE fonksiyonu ile not, satış veya maliyet ortalamalarını çıkarma.", formula: "=ORTALAMA(B2:B20)" },
  { num: 43, title: "MİN", desc: "MIN fonksiyonu ile bir tablodaki en küçük değeri anında yakalama.", formula: "=MİN(C2:C50)" },
  { num: 44, title: "MAKS", desc: "MAX fonksiyonu ile ciro rekorunu veya en yüksek değeri tespit etme.", formula: "=MAKS(C2:C50)" },
  { num: 45, title: "SAY", desc: "COUNT fonksiyonu ile sadece sayı içeren hücrelerin adedini sayma.", formula: "=SAY(A1:A100)" },
  { num: 46, title: "DOLU_SAY", desc: "COUNTA fonksiyonu ile metin veya sayı fark etmeksizin dolu hücreleri sayma.", formula: "=DOLU_SAY(A1:A100)" },
  { num: 47, title: "BOŞLUK_SAY", desc: "COUNTBLANK fonksiyonu ile tablodaki eksik / girilmemiş kayıtları bulma.", formula: "=BOŞLUK_SAY(B2:B50)" },
  { num: 48, title: "YUVARLA", desc: "ROUND fonksiyonu ile ondalık sayıları belirlenen basamağa matematiksel yuvarlama.", formula: "=YUVARLA(A1;2)" },
  { num: 49, title: "AŞAĞIYUVARLA", desc: "ROUNDDOWN fonksiyonu ile sayıyı her zaman sıfıra doğru aşağı yuvarlama.", formula: "=AŞAĞIYUVARLA(A1;0)" },
  { num: 50, title: "YUKARIYUVARLA", desc: "ROUNDUP fonksiyonu ile koli veya nakliye hesaplarında tavana yuvarlama.", formula: "=YUKARIYUVARLA(A1;0)" },
  { num: 51, title: "Yüzde hesaplama", desc: "Parça / Bütün mantığı ve % oranlarını doğru biçimlendirme.", formula: "=B2/B10" },
  { num: 52, title: "İndirim hesaplama", desc: "Liste fiyatı üzerinden iskonto tutarı ve indirimli net fiyat hesabı.", formula: "=A2*(1-B2)" },
  { num: 53, title: "KDV hesaplama", desc: "KDV Hariç tutardan KDV'li fiyata (%20) ve KDV ayrıştırma yöntemleri.", formula: "=A2*0,20" },
  { num: 54, title: "Kar hesaplama", desc: "Satış Fiyatı - Alış Maliyeti ile brüt kar rakamını çıkarma.", formula: "=B2-A2" },
  { num: 55, title: "Kar marjı hesaplama", desc: "Kar / Satış Fiyatı formülü ile yüzdesel marj analizi.", formula: "=(B2-A2)/B2" },
  { num: 56, title: "Tarihlerle temel işlemler", desc: "İki tarih arasındaki gün farkını çıkarma ve vade tarihi hesaplama.", formula: "=B2-A2" },
  { num: 57, title: "Sıralama", desc: "A'dan Z'ye alfabetik veya Büyükten Küçüğe ciro sıralaması yapma.", formula: "=A1:C10" },
  { num: 58, title: "Filtreleme", desc: "Otomatik Filtre (Ctrl+Shift+L) ile sadece istenen şehir veya ürünü süzme.", formula: "=A1:D10" },
  { num: 59, title: "Özel filtreler", desc: "Sayı filtreleri (Büyüktür, İlk 10), Metin filtreleri (İçerir) kullanımı.", formula: "=A1:D10" },
  { num: 60, title: "Excel tablolarına giriş", desc: "Ctrl+T ile dinamik tablo oluşturma, otomatik biçim ve toplam satırı gücü.", formula: "=Tablo1[Toplam]" }
];

LEVEL_1_EXTRA_SPECS.forEach((spec) => {
  LEVEL_1_LESSONS.push(
    defineLesson({
      lessonNumber: spec.num,
      level: 1,
      title: spec.title,
      description: spec.desc,
      difficulty: spec.num >= 50 ? "Orta" : "Temel",
      estimatedMinutes: 6,
      prerequisites: [`ders-${spec.num - 1}`],
      learningObjectives: [
        `${spec.title} konusunun kurallarını ve kullanım mantığını kavramak`,
        `İş tablolarında ${spec.title} formül veya özelliğini hatasız uygulamak`,
        `Raporlama hızını artıran pratik püf noktalarını öğrenmek`
      ],
      theory: [
        `Excel'de **${spec.title}**, profesyonel veri hesaplama ve analiz süreçlerinin vazgeçilmez bir parçasıdır.`,
        spec.desc,
        `Sözdizimi ve kural yapısına dikkat edildiğinde verileriniz otomatik olarak analiz edilir ve manuel hata payı sıfıra iner.`
      ],
      examples: [
        {
          title: `${spec.title} Standart Örneği`,
          explanation: `Kurumsal tabloda ${spec.title} uygulamasının sonucu.`,
          formula: spec.formula,
          table: {
            headers: ["Girdi 1", "Girdi 2", "Hesaplanan"],
            rows: [
              [1500, 2500, 4000],
              [3000, 4500, 7500]
            ]
          }
        },
        {
          title: "Alternatif Senaryo",
          explanation: `Farklı parametrelerle ${spec.title} sonucunun dinamik güncellenmesi.`
        }
      ],
      realWorldExample: {
        department: "Mali İşler & Raporlama",
        scenario: `Departman bütçesi hazırlanırken ${spec.title} kullanılarak yüzlerce kalem hatasız konsolide edilir.`,
        outcome: "Yönetim kurulu toplantısına saatler kala kesin ve doğrulanmış raporlar hazır olur."
      },
      stepByStep: [
        `Sonucun yazılacağı hedef hücreyi belirleyin.`,
        `Formül çubuğuna ${spec.formula} formülünü yazın veya ilgili menü butonunu kullanın.`,
        `'Enter' tuşuna basarak formül sonucunu onaylayın.`
      ],
      practiceExercises: [
        {
          prompt: `Hedef hücreye ${spec.formula} formülünü yazarak işlemi tamamlayın.`,
          targetCell: "C2",
          expectedFormula: spec.formula,
          hint: `${spec.formula} formülünü eksiksiz yazın.`,
          table: { headers: ["A", "B", "Sonuç"], rows: [[100, 200, 300]] }
        },
        {
          prompt: `C3 hücresine formülü uygulayın.`,
          targetCell: "C3",
          expectedFormula: spec.formula,
          hint: `Doğru formülü girin.`,
          table: { headers: ["A", "B", "Sonuç"], rows: [[100, 200, 300], [400, 500, 900]] }
        },
        {
          prompt: `D2 hücresine kontrol formülünü uygulayın.`,
          targetCell: "D2",
          expectedFormula: "=C2*1",
          hint: "=C2*1 yazın.",
          table: { headers: ["Sonuç", "Kontrol"], rows: [[300, 300]] }
        }
      ],
      quizQuestions: [
        {
          question: `${spec.title} hakkında hangisi doğrudur?`,
          options: [
            "İş verimliliğini artıran ve hesaplamaları dinamikleştiren temel bir özelliktir",
            "Sadece eski Excel sürümlerinde çalışır",
            "Hesaplama yapmaz, sadece yazı rengini değiştirir",
            "Kullanıldığında dosya boyutu 10 katına çıkar"
          ],
          correctIndex: 0,
          explanation: "Bu özellik Excel'in temel hesaplama ve analiz yeteneklerini temsil eder."
        },
        {
          question: `Bu formülde (${spec.formula}) hücre adresleri değişirse sonuç ne olur?`,
          options: [
            "Anında otomatik güncellenir",
            "Değişmez sabit kalır",
            "Hata verir",
            "Yazıcıdan çıktı alınamaz"
          ],
          correctIndex: 0,
          explanation: "Excel formülleri dinamiktir; girdi hücreleri değiştiğinde sonuç otomatik yenilenir."
        },
        {
          question: "Formülde sözdizimi (noktalı virgül veya parantez) hatası varsa Excel ne yapar?",
          options: [
            "Formül hatası uyarısı verir ve düzeltmenizi ister",
            "Bilgisayarı yeniden başlatır",
            "Formülü otomatik siler",
            "Yanlış olduğunu bilerek rastgele bir sayı yazar"
          ],
          correctIndex: 0,
          explanation: "Sözdizimi hatasında Excel bir uyarı penceresi göstererek hatayı işaret eder."
        }
      ],
      commonMistakes: [
        "Aralık belirtirken iki nokta (:) yerine noktalı virgül (;) kullanmak veya parantezi kapatmayı unutmak."
      ],
      tips: [
        "F4 tuşuna basarak hücre başvurularını ($A$1) hızlıca sabitleyebilirsiniz."
      ],
      challenge: {
        title: `${spec.title} Uygulaması`,
        description: `C2 hücresine ${spec.formula} formülünü girin.`,
        targetCell: "C2",
        expectedFormula: spec.formula
      }
    })
  );
});
