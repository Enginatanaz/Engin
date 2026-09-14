export type NavigationTab =
  | "dashboard"
  | "roadmap"
  | "lessons"
  | "simulator"
  | "quizzes"
  | "ai-teacher"
  | "formula-lab"
  | "projects"
  | "achievements"
  | "settings";

export type LevelId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface LessonExample {
  title: string;
  explanation: string;
  formula?: string;
  table?: {
    headers: string[];
    rows: (string | number)[][];
  };
}

export interface LessonRealWorldExample {
  scenario: string;
  department: string;
  outcome: string;
}

export interface LessonPracticeExercise {
  prompt: string;
  targetCell: string;
  expectedFormula: string;
  hint: string;
  table: {
    headers: string[];
    rows: (string | number)[][];
  };
}

export interface LessonQuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonChallenge {
  title: string;
  description: string;
  targetCell: string;
  expectedFormula: string;
}

export interface Lesson {
  id: string; // e.g. "ders-1"
  level: LevelId;
  levelId: LevelId; // backward compatibility
  levelTitle: string;
  lessonNumber: number; // 1 to 218
  title: string;
  description: string;
  difficulty: "Başlangıç" | "Temel" | "Orta" | "İleri" | "Uzman";
  estimatedMinutes: number;
  duration: string; // backward compatibility e.g. "8 dk"
  prerequisites: string[]; // e.g. ["ders-1", "ders-7"]
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
  xpReward: number;

  // Backward compatibility fields
  objective?: string;
  formulaSnippet?: string;
  formulaExplanation?: {
    symbol: string;
    description: string;
  }[];
  sampleData?: {
    headers: string[];
    rows: (string | number)[][];
  };
  realWorldScenario?: string;
  stepByStepGuide?: string[];
  interactiveTask?: {
    prompt: string;
    expectedFormula: string;
    targetCell: string;
    hint: string;
    initialData: {
      headers: string[];
      rows: (string | number)[][];
    };
  };
  miniQuiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface QuizQuestion {
  id: string;
  type: "multiple-choice" | "true-false" | "formula-writing" | "error-detection";
  question: string;
  scenario?: string;
  codeSnippet?: string;
  options?: string[];
  correctAnswer: string | number; // option index or formula string
  explanation: string;
  topic: string;
}

export interface Quiz {
  id: string;
  levelId: LevelId;
  title: string;
  description: string;
  duration: string;
  xpReward: number;
  passingScore: number; // percentage, e.g. 70
  questions: QuizQuestion[];
}

export interface ProjectObjective {
  id: string;
  title: string;
  description: string;
  targetFormula?: string;
  targetCell?: string;
  completed: boolean;
}

export interface Project {
  id: string;
  level: "Başlangıç" | "Orta" | "İleri";
  levelId: LevelId;
  title: string;
  tagline: string;
  scenario: string;
  datasetTitle: string;
  dataset: {
    headers: string[];
    rows: (string | number)[][];
  };
  xpReward: number;
  objectives: ProjectObjective[];
  finalChallenge: string;
}

export interface FormulaCatalogItem {
  id: string;
  turkishName: string;
  englishName: string;
  category:
    | "Matematik"
    | "Mantıksal"
    | "Metin"
    | "Tarih"
    | "Arama"
    | "İstatistik"
    | "Finans"
    | "Dinamik Diziler";
  syntax: string;
  description: string;
  example: string;
  expectedResult: string;
  proTip: string;
}

export interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  unlockedAt: string | null;
  category: "lesson" | "quiz" | "streak" | "formula" | "level" | "special";
  progress: number; // 0 to 100
  target: number;
  current: number;
}

export interface UserProgress {
  level: LevelId;
  xp: number;
  streak: number;
  lastStudyDate: string;
  completedLessons: string[]; // lesson ids
  completedQuizzes: {
    [quizId: string]: {
      score: number;
      date: string;
      passed: boolean;
    };
  };
  quizScores: {
    [quizId: string]: number;
  };
  completedProjects: string[]; // project ids
  topicMastery: {
    [topicName: string]: {
      correctCount: number;
      totalCount: number;
    };
  };
  weakTopics: string[];
  onboardingCompleted: boolean;
  onboardingData?: {
    currentLevel: string;
    goal: string;
    dailyTime: string;
  };
  dailyChallengeCompletedDate?: string;
  userProfile: {
    name: string;
    avatar: string;
    title: string;
  };
}

export interface SpreadsheetCell {
  value: string | number;
  formula?: string;
  computedValue?: string | number;
  isHeader?: boolean;
  format?: "normal" | "currency" | "number" | "percent" | "bold";
  colorClass?: string;
}

export interface SpreadsheetState {
  [cellRef: string]: SpreadsheetCell; // e.g. "A1": { value: "Ürün" }
}

export interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  isFallback?: boolean;
  suggestedAction?: {
    label: string;
    tab: NavigationTab;
    payload?: string;
  };
}
