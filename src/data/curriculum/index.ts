import { Lesson, LevelId } from "../../types";
import { LEVEL_0_LESSONS } from "./level0";
import { LEVEL_1_LESSONS } from "./level1";
import { LEVEL_2_LESSONS } from "./level2";
import { LEVEL_3_LESSONS } from "./level3";
import { LEVEL_4_LESSONS } from "./level4";
import { LEVEL_5_LESSONS } from "./level5";
import { LEVEL_6_LESSONS } from "./level6";
import { LEVEL_7_LESSONS } from "./level7";

export interface LevelInfo {
  id: LevelId;
  title: string;
  badge: string;
  description: string;
  requiredXp: number;
  topics: string[];
  lessonCount: number;
  startLessonNumber: number;
  endLessonNumber: number;
}

export const LEVELS: LevelInfo[] = [
  {
    id: 0,
    title: "Excel'e Giriş",
    badge: "Seviye 0",
    description: "Arayüz, çalışma kitabı, sayfalar, satır-sütun-hücre yapısı, veri girişi ve temel hücre biçimlendirme.",
    requiredXp: 0,
    lessonCount: 30,
    startLessonNumber: 1,
    endLessonNumber: 30,
    topics: [
      "Excel nedir ve arayüz yapısı",
      "Çalışma kitabı ve sayfaları",
      "Satır, sütun ve hücre koordinatları",
      "Hücre adresleme ve aralıklar",
      "Veri girişi ve otomatik doldurma",
      "Temel biçimlendirme ve para birimi",
    ],
  },
  {
    id: 1,
    title: "Excel Temelleri",
    badge: "Seviye 1",
    description: "İlk formül, 4 işlem, işlem önceliği, mutlak ($) ve göreli hücre başvuruları, temel fonksiyonlar ve sıralama/filtreleme.",
    requiredXp: 200,
    lessonCount: 30,
    startLessonNumber: 31,
    endLessonNumber: 60,
    topics: [
      "Eşittir (=) kuralı ve 4 işlem (+, -, *, /)",
      "İşlem önceliği ve formül kopyalama",
      "Mutlak ($A$1) ve göreli başvurular",
      "TOPLA, ORTALAMA, MİN, MAKS, SAY",
      "Yüzde, indirim, KDV ve kar hesaplama",
      "Sıralama, filtreleme ve Excel tabloları",
    ],
  },
  {
    id: 2,
    title: "Temel Formüller",
    badge: "Seviye 2",
    description: "EĞER, mantıksal bağlaçlar (VE, VEYA), koşullu hesaplamalar (ETOPLA, EĞERSAY), metin ve tarih fonksiyonları.",
    requiredXp: 600,
    lessonCount: 35,
    startLessonNumber: 61,
    endLessonNumber: 95,
    topics: [
      "EĞER (IF) ile karar mantığı",
      "VE, VEYA, DEĞİL mantıksal bağlaçları",
      "ETOPLA, ÇOKETOPLA, EĞERSAY, ÇOKEĞERSAY",
      "EĞERHATA ile profesyonel hata yönetimi",
      "Metin: SOLDAN, SAĞDAN, PARÇAAL, METİNBİRLEŞTİR",
      "Tarih: BUGÜN, ŞİMDİ, GÜN, AY, YIL, HAFTANINGÜNÜ",
    ],
  },
  {
    id: 3,
    title: "Orta Seviye Excel",
    badge: "Seviye 3",
    description: "Arama fonksiyonları (DÜŞEYARA, ÇAPRAZARA/XLOOKUP, İNDİS+KAÇINCI), dinamik diziler, koşullu biçimlendirme ve veri doğrulama.",
    requiredXp: 1200,
    lessonCount: 30,
    startLessonNumber: 96,
    endLessonNumber: 125,
    topics: [
      "DÜŞEYARA (VLOOKUP) ve tam eşleşme",
      "Modern ÇAPRAZARA (XLOOKUP) gücü",
      "İNDİS + KAÇINCI kombinasyonu",
      "Dinamik diziler: SIRALA, FİLTRE, BENZERSİZ",
      "Koşullu biçimlendirme ve simge kümeleri",
      "Veri doğrulama ve dinamik açılır listeler",
    ],
  },
  {
    id: 4,
    title: "İleri Formüller",
    badge: "Seviye 4",
    description: "Gelişmiş ÇOKEĞER, çok kriterli matris hesaplamaları, ALTTOPLAM, TOPLAMA, KAYDIR, DOLAYLI, LET, LAMBDA ve optimizasyon.",
    requiredXp: 2000,
    lessonCount: 25,
    startLessonNumber: 126,
    endLessonNumber: 150,
    topics: [
      "Gelişmiş ÇOKEĞER ve matris mantığı",
      "SUMIFS, COUNTIFS, AVERAGEIFS ileri teknikleri",
      "ALTTOPLAM ve TOPLAMA (AGGREGATE)",
      "LET ve LAMBDA ile özel fonksiyonlar",
      "Formül hata ayıklama ve hız optimizasyonu",
      "İleri tarih, İŞGÜNÜ ve TAMİŞGÜNÜ hesapları",
    ],
  },
  {
    id: 5,
    title: "Veri Analizi",
    badge: "Seviye 5",
    description: "Resmi Excel Tabloları, Pivot Table mimarisi, dilimleyiciler, zaman çizelgeleri, profesyonel grafikler ve KPI dashboard tasarımı.",
    requiredXp: 3000,
    lessonCount: 25,
    startLessonNumber: 151,
    endLessonNumber: 175,
    topics: [
      "Resmi Excel Tabloları (ListObject)",
      "Özet Tablo (Pivot Table) mimarisi ve alanları",
      "Dilimleyiciler (Slicers) ve Zaman Çizelgesi",
      "Pivot Grafikler ve kombine iş grafikleri",
      "Görsel veri analizi ve KPI tasarımı",
      "Satış, Finans ve İK Dashboard projeleri",
    ],
  },
  {
    id: 6,
    title: "Profesyonel Excel",
    badge: "Seviye 6",
    description: "Power Query ile modern ETL, otomatik veri temizleme, sorguları birleştirme (Merge) ve ekleme (Append), veri modeli ve Power Pivot.",
    requiredXp: 4200,
    lessonCount: 21,
    startLessonNumber: 176,
    endLessonNumber: 196,
    topics: [
      "Power Query nedir ve ETL mimarisi",
      "Veri içe aktarma ve otomatik temizleme",
      "Veri türleri ve Null değer yönetimi",
      "Klasörden çoklu dosya birleştirme",
      "Merge ve Append Queries (Join / Union)",
      "Veri Modeli, Power Pivot ve kurumsal boru hatları",
    ],
  },
  {
    id: 7,
    title: "Uzman / İş Hayatı",
    badge: "Seviye 7",
    description: "Uçtan uca finansal modelleme, dinamik bütçe ve nakit akışı, satış tahmini, stok yönetimi, bordro, CRM ve büyük kurumsal projeler.",
    requiredXp: 5500,
    lessonCount: 22,
    startLessonNumber: 197,
    endLessonNumber: 218,
    topics: [
      "Uluslararası Finansal Modelleme (FAST)",
      "Dinamik Bütçe ve 13 Haftalık Nakit Akışı",
      "Satış Tahmini, RFM Analizi ve Stok Yönetimi",
      "İK Bordro ve Proje Takip (Gantt) Sistemleri",
      "Dosya Optimizasyonu ve Performans İyileştirme",
      "Büyük Kurumsal Excel Projeleri ve Ustalık Sınavı",
    ],
  },
];

export const ALL_LESSONS: Lesson[] = [
  ...LEVEL_0_LESSONS,
  ...LEVEL_1_LESSONS,
  ...LEVEL_2_LESSONS,
  ...LEVEL_3_LESSONS,
  ...LEVEL_4_LESSONS,
  ...LEVEL_5_LESSONS,
  ...LEVEL_6_LESSONS,
  ...LEVEL_7_LESSONS,
];

export const LESSONS = ALL_LESSONS;

export function getLessonById(id: string): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.id === id);
}

export function getLessonByNumber(num: number): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.lessonNumber === num);
}

export function getLessonsByLevel(level: LevelId): Lesson[] {
  return ALL_LESSONS.filter((l) => l.level === level);
}

export function checkLessonPrerequisites(
  lesson: Lesson,
  completedLessons: string[]
): { isLocked: boolean; missingPrerequisites: Lesson[] } {
  if (!lesson.prerequisites || lesson.prerequisites.length === 0) {
    return { isLocked: false, missingPrerequisites: [] };
  }

  const missing = lesson.prerequisites
    .filter((prereqId) => !completedLessons.includes(prereqId))
    .map((id) => getLessonById(id))
    .filter((l): l is Lesson => l !== undefined);

  return {
    isLocked: missing.length > 0,
    missingPrerequisites: missing,
  };
}

export function getNextLesson(currentLessonId: string): Lesson | undefined {
  const currentIndex = ALL_LESSONS.findIndex((l) => l.id === currentLessonId);
  if (currentIndex >= 0 && currentIndex < ALL_LESSONS.length - 1) {
    return ALL_LESSONS[currentIndex + 1];
  }
  return undefined;
}

export function searchCurriculum(query: string): Lesson[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return ALL_LESSONS.filter((lesson) => {
    return (
      lesson.title.toLowerCase().includes(normalized) ||
      lesson.description.toLowerCase().includes(normalized) ||
      lesson.theory.some((t) => t.toLowerCase().includes(normalized)) ||
      lesson.learningObjectives.some((obj) => obj.toLowerCase().includes(normalized)) ||
      (lesson.formulaSnippet && lesson.formulaSnippet.toLowerCase().includes(normalized)) ||
      lesson.examples.some((ex) => ex.formula && ex.formula.toLowerCase().includes(normalized))
    );
  });
}
