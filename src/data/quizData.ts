import { Quiz, QuizQuestion } from "../types";
import { ALL_LESSONS } from "./curriculumData";

// Helper to extract questions from lessons of a specific level
function buildQuestionsForLevel(levelId: number, targetCount: number): QuizQuestion[] {
  const lessonsInLevel = ALL_LESSONS.filter((l) => l.level === levelId);
  const questions: QuizQuestion[] = [];

  lessonsInLevel.forEach((lesson) => {
    lesson.quizQuestions.forEach((q, qIndex) => {
      if (questions.length < targetCount) {
        questions.push({
          id: `q-lvl${levelId}-les${lesson.lessonNumber}-${qIndex}`,
          type: "multiple-choice",
          question: q.question,
          options: q.options,
          correctAnswer: q.correctIndex,
          explanation: q.explanation,
          topic: lesson.title,
        });
      }
    });
  });

  return questions;
}

export const QUIZZES: Quiz[] = [
  {
    id: "q-level-0",
    levelId: 0,
    title: "Seviye 0 Sınavı: Excel'e Giriş Yeterlilik Sınavı",
    description: "Arayüz, çalışma kitabı, sayfalar, satırlar, sütunlar, hücre koordinatları ve temel biçimlendirme sınavı (20 Soru).",
    duration: "15 dk",
    xpReward: 150,
    passingScore: 75,
    questions: buildQuestionsForLevel(0, 20),
  },
  {
    id: "q-level-1",
    levelId: 1,
    title: "Seviye 1 Sınavı: Excel Temelleri Kapsamlı Sınavı",
    description: "İlk formül, 4 işlem, işlem önceliği, mutlak ($) başvuru, TOPLA, ORTALAMA, MİN, MAKS, filtreleme (20 Soru).",
    duration: "15 dk",
    xpReward: 200,
    passingScore: 75,
    questions: buildQuestionsForLevel(1, 20),
  },
  {
    id: "q-level-2",
    levelId: 2,
    title: "Seviye 2 Sınavı: Temel Formüller ve Mantıksal Fonksiyonlar",
    description: "EĞER, VE, VEYA, ETOPLA, EĞERSAY, EĞERHATA, metin ve tarih fonksiyonları değerlendirme sınavı (25 Soru).",
    duration: "20 dk",
    xpReward: 250,
    passingScore: 75,
    questions: buildQuestionsForLevel(2, 25),
  },
  {
    id: "q-level-3",
    levelId: 3,
    title: "Seviye 3 Sınavı: Orta Seviye Excel & Arama Fonksiyonları",
    description: "DÜŞEYARA, ÇAPRAZARA/XLOOKUP, İNDİS+KAÇINCI, dinamik diziler, koşullu biçimlendirme ve veri doğrulama (30 Soru).",
    duration: "25 dk",
    xpReward: 300,
    passingScore: 75,
    questions: buildQuestionsForLevel(3, 30),
  },
  {
    id: "q-level-4",
    levelId: 4,
    title: "Seviye 4 Sınavı: İleri Düzey Formüller & Optimizasyon",
    description: "ÇOKEĞER, çok kriterli matris hesapları, ALTTOPLAM, TOPLAMA, LET, LAMBDA, formül hata denetimi (30 Soru).",
    duration: "25 dk",
    xpReward: 350,
    passingScore: 75,
    questions: buildQuestionsForLevel(4, 30),
  },
  {
    id: "q-level-5",
    levelId: 5,
    title: "Seviye 5 Sınavı: Veri Analizi, Pivot Table & Dashboard",
    description: "Resmi Excel Tabloları, Pivot Table, Dilimleyiciler, Pivot Grafikler, KPI ve Dashboard mimarisi (30 Soru).",
    duration: "25 dk",
    xpReward: 400,
    passingScore: 75,
    questions: buildQuestionsForLevel(5, 30),
  },
  {
    id: "q-level-6",
    levelId: 6,
    title: "Seviye 6 Sınavı: Profesyonel Excel & Power Query",
    description: "Power Query ile modern ETL, veri temizleme, Merge & Append Queries, Veri Modeli ve Power Pivot (30 Soru).",
    duration: "25 dk",
    xpReward: 450,
    passingScore: 75,
    questions: buildQuestionsForLevel(6, 30),
  },
  {
    id: "q-level-7",
    levelId: 7,
    title: "Seviye 7 Sınavı: Büyük Excel Ustalık ve İş Hayatı Sınavı",
    description: "Finansal modelleme, dinamik bütçe, nakit akışı, RFM müşteri analitiği, optimizasyon ve büyük projeler (40 Soru).",
    duration: "35 dk",
    xpReward: 600,
    passingScore: 75,
    questions: buildQuestionsForLevel(7, 40),
  },
];
