import React, { useState } from "react";
import {
  Lock,
  Unlock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  BookOpen,
  CheckSquare,
  ArrowRight,
  Zap,
} from "lucide-react";
import { NavigationTab, UserProgress } from "../../types";
import { LEVELS, LESSONS } from "../../data/curriculumData";
import { QUIZZES } from "../../data/quizData";

interface RoadmapViewProps {
  progress: UserProgress;
  onNavigate: (tab: NavigationTab, payload?: string) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ progress, onNavigate }) => {
  const [expandedLevel, setExpandedLevel] = useState<number>(progress.level);

  const toggleLevel = (lvlId: number) => {
    setExpandedLevel(expandedLevel === lvlId ? 0 : lvlId);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
          <span>Excel Kariyer Yolculuğu</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Sıfırdan Zirveye Excel Haritası
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Her seviyede gerçek iş hayatına yönelik pratikler tamamlayarak seviye atla ve rozetleri topla.
        </p>
      </div>

      {/* Visual Level Nodes */}
      <div className="relative space-y-6">
        {/* Continuous timeline line on the left */}
        <div className="hidden sm:block absolute left-8 top-8 bottom-8 w-1 bg-slate-200 dark:bg-slate-800 -z-0" />

        {LEVELS.map((lvl) => {
          const isUnlocked = progress.level >= lvl.id || progress.xp >= lvl.requiredXp;
          const isCurrent = progress.level === lvl.id;
          const levelLessons = LESSONS.filter((l) => l.levelId === lvl.id);
          const levelQuiz = QUIZZES.find((q) => q.levelId === lvl.id);

          const completedLessonsCount = levelLessons.filter((l) =>
            progress.completedLessons.includes(l.id)
          ).length;

          const isFullyCompleted =
            levelLessons.length > 0 && completedLessonsCount === levelLessons.length;

          const isExpanded = expandedLevel === lvl.id;

          return (
            <div
              key={lvl.id}
              className={`relative z-10 transition-all ${
                !isUnlocked ? "opacity-75" : ""
              }`}
            >
              {/* Level Card */}
              <div
                className={`rounded-3xl border transition-all ${
                  isCurrent
                    ? "bg-white dark:bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-500/10 ring-2 ring-emerald-500/20"
                    : isFullyCompleted
                    ? "bg-white dark:bg-slate-900 border-emerald-300 dark:border-emerald-800 shadow-xs"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-xs"
                }`}
              >
                {/* Level Card Header / Click to Expand */}
                <div
                  onClick={() => toggleLevel(lvl.id)}
                  className="p-5 sm:p-6 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    {/* Status Icon Badge */}
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shrink-0 font-black shadow-sm ${
                        isFullyCompleted
                          ? "bg-emerald-600 text-white"
                          : isCurrent
                          ? "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-2 border-emerald-500"
                          : isUnlocked
                          ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                      }`}
                    >
                      {isFullyCompleted ? (
                        <CheckCircle2 className="w-7 h-7" />
                      ) : isUnlocked ? (
                        <span>{lvl.id}</span>
                      ) : (
                        <Lock className="w-6 h-6 text-slate-400" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                          Seviye {lvl.id}
                        </span>
                        {isCurrent && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                            Şu An Buradasın
                          </span>
                        )}
                        {!isUnlocked && (
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                            {lvl.requiredXp} XP Gerekli
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
                        {lvl.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
                        {lvl.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-800">
                    <div className="text-right">
                      <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {completedLessonsCount} / {levelLessons.length} Ders
                      </div>
                      <div className="text-[11px] text-slate-600 dark:text-slate-400">
                        +{levelLessons.reduce((acc, l) => acc + l.xpReward, 0)} Toplam XP
                      </div>
                    </div>

                    <button
                      className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      aria-label="Detayları Aç/Kapat"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Lesson Sub-Items */}
                {isExpanded && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-4">
                    <div className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                      Müfredat İçeriği
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {levelLessons.map((lesson, idx) => {
                        const isDone = progress.completedLessons.includes(lesson.id);
                        return (
                          <div
                            key={lesson.id}
                            className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                              isDone
                                ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-800/40"
                                : "bg-slate-50 dark:bg-slate-800/50 border-slate-200/70 dark:border-slate-800"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                                  isDone
                                    ? "bg-emerald-600 text-white"
                                    : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                                }`}
                              >
                                {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                  {lesson.title}
                                </h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-0.5">
                                  {lesson.objective}
                                </p>
                                <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-600 dark:text-slate-400 font-medium">
                                  <span>⏱ {lesson.duration}</span>
                                  <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                                    <Zap className="w-3 h-3" /> +{lesson.xpReward} XP
                                  </span>
                                </div>
                              </div>
                            </div>

                            <button
                              onClick={() => onNavigate("lessons", lesson.id)}
                              className={`p-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                                isDone
                                  ? "text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
                                  : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                              }`}
                              title={isDone ? "Tekrar Et" : "Ders Aç"}
                            >
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* Level Quiz Banner */}
                    {levelQuiz && (
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-500/10 via-emerald-500/10 to-transparent border border-teal-200/60 dark:border-teal-800/40 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0">
                            <CheckSquare className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-wider">
                              Seviye Yeterlilik Testi
                            </div>
                            <div className="text-sm font-black text-slate-900 dark:text-white">
                              {levelQuiz.title}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => onNavigate("quizzes", levelQuiz.id)}
                          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all shrink-0"
                        >
                          Quizi Başlat
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
