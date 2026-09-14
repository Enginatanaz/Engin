import { UserProgress } from "../types";

export interface AIChatResponse {
  reply: string;
  isFallback?: boolean;
}

export interface FormulaAnalysisResult {
  formula: string;
  turkishName: string;
  englishEquivalent: string;
  summary: string;
  argumentsList: { name: string; desc: string }[];
  expectedResult: string;
  commonErrors: string[];
  optimizationTip: string;
  isFallback?: boolean;
}

export interface EvaluateAnswerResult {
  isCorrect: boolean;
  feedback: string;
  hint: string | null;
  showSolution: boolean;
  correctFormula: string | null;
  isFallback?: boolean;
}

export async function sendMessageToAITeacher(
  message: string,
  history: { role: string; text: string }[] = [],
  progress?: UserProgress
): Promise<AIChatResponse> {
  try {
    const res = await fetch("/api/gemini/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        history,
        userContext: progress
          ? {
              level: `Seviye ${progress.level}`,
              xp: progress.xp,
              weakTopics: progress.weakTopics,
            }
          : {},
      }),
    });

    if (!res.ok) {
      throw new Error(`Sunucu yanıtı geçersiz: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err: any) {
    console.warn("AI Chat error:", err);
    return {
      reply:
        "Excel ile ilgili aklına takılan her şeyi sorabilirsin! Örneğin: 'DÜŞEYARA ile ÇAPRAZARA arasındaki fark nedir?' veya 'EĞER fonksiyonuna bir örnek verir misin?'",
      isFallback: true,
    };
  }
}

export async function analyzeFormulaWithAI(
  formula: string,
  mode: "explain" | "optimize" | "debug" = "explain"
): Promise<FormulaAnalysisResult> {
  try {
    const res = await fetch("/api/gemini/analyze-formula", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formula, mode }),
    });

    if (!res.ok) {
      throw new Error(`Formül analiz hatası: ${res.status}`);
    }

    return await res.json();
  } catch (err: any) {
    console.warn("Formula analyze error:", err);
    return {
      formula,
      turkishName: formula.replace(/^=/, "").split("(")[0],
      englishEquivalent: "Excel Fonksiyonu",
      summary: "Bu formül girilen bağımsız değişkenleri değerlendirip istenen matematiksel veya mantıksal sonucu hesaplar.",
      argumentsList: [{ name: "Parametre", desc: "Hücre veya aralık referansları" }],
      expectedResult: "Hesaplanan değer veya metin sonucu.",
      commonErrors: [
        "Metinler çift tırnak (\"\") içine alınmalıdır.",
        "Türkiye ayarlarında bağımsız değişken ayracı noktalı virgül (;) olmalıdır.",
      ],
      optimizationTip: "Formülü daha kısa yazmak için yeni nesil dinamik dizi fonksiyonlarını değerlendirin.",
      isFallback: true,
    };
  }
}

export async function evaluateStudentAnswerWithAI(
  taskDescription: string,
  expectedFormula: string,
  userFormula: string,
  attemptNumber: number
): Promise<EvaluateAnswerResult> {
  try {
    const res = await fetch("/api/gemini/evaluate-answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskDescription,
        expectedFormula,
        userFormula,
        attemptNumber,
      }),
    });

    if (!res.ok) {
      throw new Error(`Cevap değerlendirme hatası: ${res.status}`);
    }

    return await res.json();
  } catch (err: any) {
    console.warn("Evaluate answer error:", err);
    const cleanUser = userFormula.trim().toUpperCase().replace(/\s+/g, "");
    const cleanExp = expectedFormula.trim().toUpperCase().replace(/\s+/g, "");
    const isCorrect = cleanUser === cleanExp;

    return {
      isCorrect,
      feedback: isCorrect
        ? "Tebrikler! Formülün başarıyla çalıştı ve beklenen sonucu üretti."
        : attemptNumber >= 3
        ? `Beklenen formül: ${expectedFormula}`
        : "Formülde bir eksiklik var. Fonksiyon adını ve hücre koordinatlarını tekrar gözden geçir.",
      hint: attemptNumber === 1 ? "Eşittir (=) işareti ve parantezleri kontrol et." : `İpucu: ${expectedFormula.slice(0, 7)}...`,
      showSolution: attemptNumber >= 3,
      correctFormula: attemptNumber >= 3 ? expectedFormula : null,
      isFallback: true,
    };
  }
}
