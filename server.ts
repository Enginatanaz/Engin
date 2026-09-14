import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

const SYSTEM_INSTRUCTION_TEACHER = `Sen 'Excel Akademi AI' uygulamasının uzman, samimi, teşvik edici ve son derece pedagojik Excel özel öğretmenisin.

Temel Kuralların:
1. Dil: Her zaman doğal, akıcı ve sıcak bir Türkçe ile konuş.
2. Terminoloji: Excel fonksiyonlarının Türkçe adlarını kullan (ör: TOPLA, EĞER, DÜŞEYARA, ÇAPRAZARA, ETOPLA, EĞERSAY, İNDİS, KAÇINCI). İlk bahsettiğinde veya faydalı olacağı yerlerde parantez içinde İngilizce karşılığını belirt (ör: DÜŞEYARA (VLOOKUP), ÇAPRAZARA (XLOOKUP), EĞER (IF)).
3. Senaryolar: Gerçekçi Türk iş dünyası örnekleri, Türk isimleri (Ahmet Bey, Ayşe Hanım, Mert) ve Türk Lirası (₺) kullan.
4. Pedagoji: Öğrenciye hemen hazır cevabı boca etme! Önce mantığı 1-2 cümleyle açıkla, parça parça düşünmesini sağla, gerekirse ipucu ver veya basit bir soru yönelt.
5. Seviyeye Uygunluk: Kullanıcı başlangıç seviyesindeyse karmaşık formüllerden kaçın; mutlak başvuru ($), noktalı virgül (;) gibi Türkiye bölgesel ayarlarındaki ayracı net belirt.
6. Hata Tespiti: Kullanıcının formülündeki noktalı virgül vs virgül farkı, parantez eksikliği veya tırnak işaretlerini sabırla göster.
7. Nezaket ve Destek: Başarısız olsa bile moral ver, "Harika bir deneme!", "Neredeyse başardın!" gibi motive edici cümleler kur.`;

// AI Excel Öğretmeni Sohbet Endpoint'i
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { message, history = [], userContext = {} } = req.body;
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Mesaj alanı zorunludur." });
    }

    const ai = getGenAI();

    if (!ai) {
      // Akıllı kural tabanlı yerel yanıt (API anahtarı henüz eklenmemişse kesintisiz çalışması için)
      const lower = message.toLowerCase();
      let fallbackAnswer = "Harika bir soru! Excel'de formüller her zaman '=' eşittir işaretiyle başlar. Noktalı virgül ';' fonksiyon parametrelerini ayırır.";

      if (lower.includes("düşeyara") || lower.includes("vlookup")) {
        fallbackAnswer = "DÜŞEYARA (VLOOKUP), bir tabloda yukarıdan aşağıya doğru bir değeri arayıp, bulduğu satırdaki istediğin sütun bilgisini sana getirir. Örneğin: =DÜŞEYARA(A2; Ürünler!A:D; 3; YANLIŞ). Burada A2 aranan değer, 3 ise getirilmek istenen sütunun sırasıdır.";
      } else if (lower.includes("eğer") || lower.includes("if")) {
        fallbackAnswer = "EĞER (IF) fonksiyonu bir koşulu test eder. Koşul doğruysa bir sonuç, yanlışsa başka bir sonuç verir: =EĞER(B2>=50; \"Geçti\"; \"Kaldı\"). B2 hücresindeki not 50 veya daha büyükse 'Geçti' yazar.";
      } else if (lower.includes("çaprazara") || lower.includes("xlookup")) {
        fallbackAnswer = "ÇAPRAZARA (XLOOKUP), DÜŞEYARA'nın modern ve çok daha güçlü halidir! Hem sağa hem sola arama yapabilir, sütun indisi saydırmaz ve bulunamadığında vereceği varsayılan değeri doğrudan parametre olarak alır: =ÇAPRAZARA(A2; Kodlar; İsimler; \"Bulunamadı\").";
      } else if (lower.includes("topla") || lower.includes("sum")) {
        fallbackAnswer = "TOPLA (SUM) fonksiyonu hücre aralığındaki sayıları hızlıca toplar: =TOPLA(B2:B20). Araya iki nokta (:) koyduğumuzda B2'den B20'ye kadar olan tüm hücreleri kapsar.";
      } else if (lower.includes("soru sor") || lower.includes("test")) {
        fallbackAnswer = "Hemen küçük bir soru sorayım: B2'den B10'a kadar olan satışların ortalamasını almak için hangi fonksiyonu kullanırız ve formülü nasıl yazarız?";
      }

      return res.json({
        reply: `${fallbackAnswer}\n\n*(Not: Canlı Gemini yapay zeka deneyimi için Settings > Secrets panelinden GEMINI_API_KEY ekleyebilirsiniz. Şu anda çevrimdışı rehberlik aktif.)*`,
        isFallback: true,
      });
    }

    const contextNotes = `Öğrencinin Mevcut Durumu:
- Seviye: ${userContext.level || "Başlangıç"}
- Mevcut Ders: ${userContext.currentLesson || "Genel Excel"}
- Toplam XP: ${userContext.xp || 0}
- Zayıf Konular: ${(userContext.weakTopics || []).join(", ") || "Yok"}`;

    const formattedContents = [
      {
        role: "user",
        parts: [{ text: `${contextNotes}\n\nÖğrenci sorusu veya mesajı: ${message}` }],
      },
    ];

    if (history.length > 0) {
      // Add previous turns (up to last 6)
      const recent = history.slice(-6);
      const conversationParts = recent.map((item: { role: string; text: string }) => ({
        role: item.role === "assistant" ? "model" : "user",
        parts: [{ text: item.text }],
      }));
      conversationParts.push({
        role: "user",
        parts: [{ text: `[Öğrenci Seviyesi: ${userContext.level || "Başlangıç"}]\n${message}` }],
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: conversationParts,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION_TEACHER,
          temperature: 0.7,
        },
      });

      return res.json({
        reply: response.text || "Şu an yanıt oluşturulamadı, lütfen tekrar dener misiniz?",
        isFallback: false,
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION_TEACHER,
        temperature: 0.7,
      },
    });

    res.json({
      reply: response.text || "Şu an yanıt oluşturulamadı, lütfen tekrar deneyin.",
      isFallback: false,
    });
  } catch (error: any) {
    console.error("Gemini chat error:", error);
    res.status(500).json({
      error: "Yapay zeka öğretmenine ulaşılırken bir sorun oluştu.",
      details: error.message,
    });
  }
});

// Formül Laboratuvarı Analiz Endpoint'i
app.post("/api/gemini/analyze-formula", async (req, res) => {
  try {
    const { formula, mode = "explain" } = req.body;
    if (!formula || typeof formula !== "string") {
      return res.status(400).json({ error: "Geçerli bir Excel formülü giriniz." });
    }

    const ai = getGenAI();
    if (!ai) {
      // Fallback structured breakdown
      return res.json({
        formula,
        turkishName: formula.split("(")[0].replace("=", "").trim(),
        englishEquivalent: "İlgili Excel Fonksiyonu",
        summary: "Bu formül girilen hücrelerde belirtilen mantıksal veya matematiksel işlemi yürütür.",
        argumentsList: [
          { name: "Parametreler", desc: "Parantez içi argümanlar (aralıklar veya koşullar)" },
        ],
        expectedResult: "Formül girdilerine göre hesaplanmış değer.",
        commonErrors: [
          "Türkçe Excel'de virgül (,) yerine noktalı virgül (;) kullanılmalıdır.",
          "Metin değerleri daima çift tırnak (\"\") içine alınmalıdır.",
        ],
        optimizationTip: "Daha yeni Excel sürümlerinde ÇAPRAZARA ve dinamik dizi formülleri daha yüksek performans sağlar.",
        isFallback: true,
      });
    }

    const prompt = `Lütfen şu Excel formülünü detaylıca ve pedagojik olarak analiz et:
Formül: "${formula}"
İnceleme modu: ${mode} (açıklama / optimizasyon / hata ayıklama)

Yanıtı kesinlikle ve yalnızca geçerli bir JSON formatında döndür. JSON şeması şöyle olmalıdır:
{
  "formula": "${formula}",
  "turkishName": "Ana Fonksiyon Türkçe Adı",
  "englishEquivalent": "İngilizce Karşılığı",
  "summary": "Formülün genel amacının 1-2 cümlelik anlaşılır özeti",
  "argumentsList": [
    {"name": "1. Argüman", "desc": "Neyi temsil ettiği ve ne işe yaradığı"}
  ],
  "expectedResult": "Bu formül çalıştırıldığında nasıl bir veri veya sonuç beklenir",
  "commonErrors": [
    "Sık yapılan hata 1",
    "Sık yapılan hata 2"
  ],
  "optimizationTip": "Daha hızlı, kısa veya modern alternatif önerisi (varsa LET, ÇAPRAZARA vb.)"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ ...parsed, isFallback: false });
  } catch (error: any) {
    console.error("Formula analysis error:", error);
    res.status(500).json({
      error: "Formül analizi sırasında bir hata oluştu.",
      details: error.message,
    });
  }
});

// Kullanıcı Görev ve Alıştırma Değerlendiricisi
app.post("/api/gemini/evaluate-answer", async (req, res) => {
  try {
    const { taskDescription, expectedFormula, userFormula, attemptNumber = 1 } = req.body;

    const cleanUser = (userFormula || "").trim().toUpperCase();
    const cleanExpected = (expectedFormula || "").trim().toUpperCase();

    // Normalizing punctuation: Turkish Excel uses ';' for argument separator
    const normalize = (f: string) =>
      f.replace(/\s+/g, "").replace(/^=/, "").replace(/,/g, ";");

    const isMatch = normalize(cleanUser) === normalize(cleanExpected);

    const ai = getGenAI();

    if (isMatch) {
      return res.json({
        isCorrect: true,
        feedback: "Tebrikler! Formülün hem sözdizimi hem de mantığı kusursuz.",
        hint: null,
        showSolution: false,
        correctFormula: expectedFormula,
      });
    }

    if (!ai) {
      // Local evaluation
      const hasEqual = (userFormula || "").trim().startsWith("=");
      const feedback = !hasEqual
        ? "Excel formülleri daima '=' (eşittir) işaretiyle başlamalıdır."
        : attemptNumber >= 3
        ? `Üç deneme yaptın. İşte doğru formül: ${expectedFormula}`
        : "Formülünde bir farklılık var. Parametre aralıklarını ve noktalı virgül (;) ayracını kontrol etmeyi dene.";

      return res.json({
        isCorrect: false,
        feedback,
        hint: attemptNumber === 1 ? "Fonksiyon adını ve hücre aralıklarını gözden geçir." : "Örnek: " + expectedFormula.substring(0, 7) + "...",
        showSolution: attemptNumber >= 3,
        correctFormula: attemptNumber >= 3 ? expectedFormula : null,
        isFallback: true,
      });
    }

    const prompt = `Sen bir Excel eğitim değerlendiricisisin.
Görev: "${taskDescription}"
Beklenen veya ideal formül: "${expectedFormula}"
Öğrencinin yazdığı formül: "${userFormula}"
Öğrencinin deneme sayısı: ${attemptNumber}

Öğrencinin formülünü değerlendir:
- Eğer alternatif geçerli bir formülse (ör: TOPLA(A1;A2) yerine TOPLA(A1:A2) veya A1+A2) ve doğru sonucu veriyorsa isCorrect: true yap.
- Eğer yanlışsa ve deneme sayısı < 3 ise, hemen doğru formülü tam olarak verme! Bunun yerine nerede hata yaptığını açıkla ve bir ipucu (hint) ver.
- Eğer deneme sayısı >= 3 ise showSolution: true yap ve doğru çözümü nazikçe açıkla.

Sadece şu JSON formatını döndür:
{
  "isCorrect": boolean,
  "feedback": "Öğrenciye yönelik Türkçe pedagojik açıklama",
  "hint": "İpucu cümlesi veya null",
  "showSolution": boolean,
  "correctFormula": "${expectedFormula}"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json({ ...parsed, isFallback: false });
  } catch (error: any) {
    console.error("Evaluation error:", error);
    res.status(500).json({
      error: "Değerlendirme sırasında bir hata oluştu.",
      details: error.message,
    });
  }
});

// Vite & Static file handler
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Excel Akademi AI server running on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
