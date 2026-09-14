import { Achievement, LevelId, UserProgress } from "../types";
import { INITIAL_ACHIEVEMENTS } from "../data/achievementsData";
import { LEVELS } from "../data/curriculumData";

const STORAGE_KEY_PROGRESS = "excel_akademi_progress_v1";
const STORAGE_KEY_ACHIEVEMENTS = "excel_akademi_achievements_v1";

const DEFAULT_PROGRESS: UserProgress = {
  level: 1,
  xp: 140,
  streak: 3,
  lastStudyDate: new Date().toISOString().split("T")[0],
  completedLessons: ["l1-1"],
  completedQuizzes: {},
  quizScores: {},
  completedProjects: [],
  topicMastery: {
    "Hücre Adresleri": { correctCount: 3, totalCount: 3 },
    "Biçimlendirme": { correctCount: 2, totalCount: 2 },
  },
  weakTopics: [],
  onboardingCompleted: false,
  userProfile: {
    name: "Öğrenci",
    avatar: "📊",
    title: "Excel Çırağı",
  },
};

export function loadUserProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_PROGRESS, ...parsed };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progress));
  } catch (err) {
    console.error("Progress save failed:", err);
  }
}

export function loadAchievements(): Achievement[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ACHIEVEMENTS);
    if (!raw) return INITIAL_ACHIEVEMENTS;
    const parsed = JSON.parse(raw);
    return INITIAL_ACHIEVEMENTS.map((item) => {
      const saved = parsed.find((p: Achievement) => p.id === item.id);
      return saved ? { ...item, ...saved } : item;
    });
  } catch {
    return INITIAL_ACHIEVEMENTS;
  }
}

export function saveAchievements(achievements: Achievement[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_ACHIEVEMENTS, JSON.stringify(achievements));
  } catch (err) {
    console.error("Achievements save failed:", err);
  }
}

export function calculateCurrentLevel(xp: number): LevelId {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].requiredXp) {
      return LEVELS[i].id;
    }
  }
  return 1;
}

export function addXpToUser(
  amount: number,
  currentProgress: UserProgress
): { updatedProgress: UserProgress; leveledUp: boolean; newLevel: LevelId } {
  const newXp = currentProgress.xp + amount;
  const newLevel = calculateCurrentLevel(newXp);
  const leveledUp = newLevel > currentProgress.level;

  const todayStr = new Date().toISOString().split("T")[0];
  let newStreak = currentProgress.streak;
  if (currentProgress.lastStudyDate !== todayStr) {
    newStreak += 1;
  }

  const updatedProgress: UserProgress = {
    ...currentProgress,
    xp: newXp,
    level: newLevel,
    streak: newStreak,
    lastStudyDate: todayStr,
  };

  saveUserProgress(updatedProgress);
  return { updatedProgress, leveledUp, newLevel };
}

export function recordQuizCompletion(
  quizId: string,
  score: number,
  topicPerformance: { [topic: string]: { isCorrect: boolean } },
  currentProgress: UserProgress
): { updatedProgress: UserProgress; newlyWeakTopics: string[] } {
  const passed = score >= 70;
  const newMastery = { ...currentProgress.topicMastery };
  const newlyWeakTopics: string[] = [];

  Object.entries(topicPerformance).forEach(([topic, perf]) => {
    if (!newMastery[topic]) {
      newMastery[topic] = { correctCount: 0, totalCount: 0 };
    }
    newMastery[topic].totalCount += 1;
    if (perf.isCorrect) {
      newMastery[topic].correctCount += 1;
    }

    const ratio = newMastery[topic].correctCount / newMastery[topic].totalCount;
    if (ratio < 0.65 && !newlyWeakTopics.includes(topic)) {
      newlyWeakTopics.push(topic);
    }
  });

  const updatedWeakTopics = Array.from(
    new Set([...currentProgress.weakTopics, ...newlyWeakTopics])
  );

  const updatedProgress: UserProgress = {
    ...currentProgress,
    completedQuizzes: {
      ...currentProgress.completedQuizzes,
      [quizId]: {
        score,
        date: new Date().toISOString(),
        passed,
      },
    },
    quizScores: {
      ...currentProgress.quizScores,
      [quizId]: Math.max(score, currentProgress.quizScores[quizId] || 0),
    },
    topicMastery: newMastery,
    weakTopics: updatedWeakTopics,
  };

  saveUserProgress(updatedProgress);
  return { updatedProgress, newlyWeakTopics };
}

export function markLessonComplete(lessonId: string, currentProgress: UserProgress): UserProgress {
  if (currentProgress.completedLessons.includes(lessonId)) {
    return currentProgress;
  }
  const updated: UserProgress = {
    ...currentProgress,
    completedLessons: [...currentProgress.completedLessons, lessonId],
  };
  saveUserProgress(updated);
  return updated;
}
