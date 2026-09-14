import {
  Lesson,
  LevelId,
  LessonExample,
  LessonRealWorldExample,
  LessonPracticeExercise,
  LessonQuizQuestion,
  LessonChallenge,
} from "../../types";

export interface CreateLessonParams {
  id?: string;
  level: LevelId;
  lessonNumber: number;
  title: string;
  description: string;
  difficulty: "Başlangıç" | "Temel" | "Orta" | "İleri" | "Uzman";
  estimatedMinutes: number;
  prerequisites: string[];
  learningObjectives: string[];
  theory: string[];
  examples: LessonExample[];
  realWorldExample: LessonRealWorldExample;
  stepByStep: string[];
  practiceExercises: LessonPracticeExercise[];
  quizQuestions: LessonQuizQuestion[];
  commonMistakes: string[];
  tips: string[];
  challenge: LessonChallenge;
  xpReward?: number;
  formulaSnippet?: string;
  formulaExplanation?: { symbol: string; description: string }[];
}

export function defineLesson(params: CreateLessonParams): Lesson {
  const id = params.id || `ders-${params.lessonNumber}`;
  const duration = `${params.estimatedMinutes} dk`;
  const xpReward = params.xpReward || 25;

  const levelTitles: Record<LevelId, string> = {
    0: "Seviye 0: Excel'e Giriş",
    1: "Seviye 1: Excel Temelleri",
    2: "Seviye 2: Temel Formüller",
    3: "Seviye 3: Orta Seviye Excel",
    4: "Seviye 4: İleri Formüller",
    5: "Seviye 5: Veri Analizi",
    6: "Seviye 6: Profesyonel Excel",
    7: "Seviye 7: Uzman / İş Hayatı",
  };

  const firstPractice = params.practiceExercises[0] || {
    prompt: "Hücredeki işlemi tamamlayın.",
    expectedFormula: "=TOPLA(A1:A2)",
    targetCell: "A3",
    hint: "Formülü doğru sözdizimiyle yazın.",
    table: { headers: ["Değer"], rows: [[10], [20]] },
  };

  const firstQuiz = params.quizQuestions[0] || {
    question: `${params.title} hakkında hangisi doğrudur?`,
    options: ["Temel kuralı uygular", "Yanlış çalışır", "Sadece metin alır"],
    correctIndex: 0,
    explanation: "Doğru kural bu dersin temel prensibidir.",
  };

  return {
    id,
    level: params.level,
    levelId: params.level,
    levelTitle: levelTitles[params.level],
    lessonNumber: params.lessonNumber,
    title: params.title,
    description: params.description,
    difficulty: params.difficulty,
    estimatedMinutes: params.estimatedMinutes,
    duration,
    prerequisites: params.prerequisites,
    learningObjectives: params.learningObjectives,
    theory: params.theory,
    examples: params.examples,
    realWorldExample: params.realWorldExample,
    stepByStep: params.stepByStep,
    practiceExercises: params.practiceExercises,
    quizQuestions: params.quizQuestions,
    commonMistakes: params.commonMistakes,
    tips: params.tips,
    challenge: params.challenge,
    xpReward,

    // Backward compatibility mappings
    objective: params.learningObjectives[0] || params.description,
    formulaSnippet: params.formulaSnippet,
    formulaExplanation: params.formulaExplanation,
    sampleData: params.examples[0]?.table,
    realWorldScenario: params.realWorldExample.scenario,
    stepByStepGuide: params.stepByStep,
    interactiveTask: {
      prompt: firstPractice.prompt,
      expectedFormula: firstPractice.expectedFormula,
      targetCell: firstPractice.targetCell,
      hint: firstPractice.hint,
      initialData: firstPractice.table,
    },
    miniQuiz: {
      question: firstQuiz.question,
      options: firstQuiz.options,
      correctIndex: firstQuiz.correctIndex,
      explanation: firstQuiz.explanation,
    },
  };
}
