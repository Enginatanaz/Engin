import React, { useState } from "react";
import {
  Award,
  Lock,
  CheckCircle2,
  Sparkles,
  Flame,
  BookOpen,
  HelpCircle,
  Briefcase,
  Star,
} from "lucide-react";
import { Achievement, NavigationTab, UserProgress } from "../../types";
import { INITIAL_ACHIEVEMENTS } from "../../data/achievementsData";
import { LEVELS } from "../../data/curriculumData";

interface AchievementsViewProps {
  progress: UserProgress;
  onNavigate: (tab: NavigationTab, payload?: string) => void;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  progress,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Dynamically evaluate achievements based on actual user progress
  const computedAchievements: Achievement[] = INITIAL_ACHIEVEMENTS.map(
    (ach) => {
      let current = 0;
      let unlockedAt: string | null = null;

      if (ach.id === "ach-first-lesson") {
        current = progress.completedLessons.length;
        if (current >= 1) unlockedAt = "Kazanıldı";
      } else if (ach.id === "ach-streak-7") {
        current = progress.streak;
        if (current >= 7) unlockedAt = "Kazanıldı";
      } else if (ach.id === "ach-formula-master") {
        current = progress.completedLessons.length;
        if (current >= 10) unlockedAt = "Kazanıldı";
      } else if (ach.id === "ach-quiz-master") {
        current = Object.keys(progress.completedQuizzes).length;
        if (current >= 3) unlockedAt = "Kazanıldı";
      } else if (ach.id === "ach-level-3") {
        current = progress.level >= 3 ? 1 : 0;
        if (current >= 1) unlockedAt = "Kazanıldı";
      } else if (ach.id === "ach-level-5") {
        current = progress.level >= 5 ? 1 : 0;
        if (current >= 1) unlockedAt = "Kazanıldı";
      } else if (ach.id === "ach-level-6") {
        current = progress.level >= 6 ? 1 : 0;
        if (current >= 1) unlockedAt = "Kazanıldı";
      }

      const pct = Math.min(100, Math.round((current / ach.target) * 100));

      return {
        ...ach,
        current,
        unlockedAt,
        progress: pct,
      };
    }
  );

  const unlockedCount = computedAchievements.filter(
    (a) => a.unlockedAt !== null
  ).length;

  const filtered = computedAchievements.filter((a) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "unlocked") return a.unlockedAt !== null;
    if (selectedCategory === "locked") return a.unlockedAt === null;
    return a.category === selectedCategory;
  });

  const currentLevelInfo = LEVELS.find((l) => l.id === progress.level) || LEVELS[0];

  return (
    <div id="achievements-view-container" className="space-y-6">
      {/* Top Banner / User Trophy Room */}
      <div
        id="trophy-room-banner"
        className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-200 text-3xl flex items-center justify-center shadow-xs">
            🏆
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">
                Başarılar ve Rozetler Koleksiyonu
              </h1>
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                {unlockedCount} / {computedAchievements.length} Açıldı
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Dersleri tamamlayın, quizleri geçin, projeleri çözün ve Excel kariyer rozetlerinizi toplayın.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center min-w-[100px]">
            <span className="text-[11px] text-slate-600 block">Mevcut Seviye</span>
            <span className="text-sm font-bold text-slate-900">
              {currentLevelInfo.badge}
            </span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center min-w-[100px]">
            <span className="text-[11px] text-slate-600 block">Toplam XP</span>
            <span className="text-sm font-bold text-amber-600">
              {progress.xp} XP
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: "all", label: "Tümü" },
          { id: "unlocked", label: `Kazanılanlar (${unlockedCount})` },
          { id: "locked", label: "Kilitli Rozetler" },
          { id: "lesson", label: "Dersler" },
          { id: "quiz", label: "Quizler" },
          { id: "streak", label: "Seriler" },
          { id: "level", label: "Seviye Hedefleri" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === tab.id
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => {
          const isUnlocked = item.unlockedAt !== null;

          return (
            <div
              key={item.id}
              id={`achievement-card-${item.id}`}
              className={`rounded-2xl p-5 border transition-all flex items-start gap-4 ${
                isUnlocked
                  ? "bg-white border-emerald-300/80 shadow-xs hover:shadow-md"
                  : "bg-slate-50/70 border-slate-200 opacity-80"
              }`}
            >
              {/* Icon / Badge Box */}
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                  isUnlocked
                    ? "bg-emerald-50 border border-emerald-200 shadow-2xs"
                    : "bg-slate-200/60 border border-slate-300 grayscale"
                }`}
              >
                {item.icon}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center justify-between gap-1">
                  <h3
                    className={`text-sm font-bold truncate ${
                      isUnlocked ? "text-slate-900" : "text-slate-600"
                    }`}
                  >
                    {item.title}
                  </h3>
                  {isUnlocked ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Kazanıldı
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-600 shrink-0 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      %{item.progress}
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Progress Bar */}
                <div className="pt-1">
                  <div className="w-full bg-slate-200/70 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isUnlocked ? "bg-emerald-600" : "bg-slate-400"
                      }`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-600 pt-1">
                    <span>
                      {item.current} / {item.target}
                    </span>
                    <span>%{item.progress}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
