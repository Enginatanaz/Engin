import React from "react";
import {
  Flame,
  Zap,
  BookOpen,
  ArrowRight,
  Sparkles,
  TableProperties,
  FlaskConical,
  FolderGit2,
  AlertCircle,
  Award,
} from "lucide-react";
import { NavigationTab, UserProgress } from "../../types";
import { LESSONS, LEVELS } from "../../data/curriculumData";

interface DashboardViewProps {
  progress: UserProgress;
  onNavigate: (tab: NavigationTab, payload?: string) => void;
  onOpenAITeacher: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  progress,
  onNavigate,
  onOpenAITeacher,
}) => {
  // Find next lesson to study
  const nextLesson =
    LESSONS.find((l) => !progress.completedLessons.includes(l.id)) || LESSONS[0];

  const currentLevelData =
    LEVELS.find((lvl) => lvl.id === progress.level) || LEVELS[0];
  const nextLevelData = LEVELS.find((lvl) => lvl.id === progress.level + 1);

  // Level progress percentage
  const currentLevelMinXp = currentLevelData.requiredXp;
  const nextLevelXp = nextLevelData ? nextLevelData.requiredXp : currentLevelMinXp + 500;
  const progressPercent = Math.min(
    100,
    Math.max(
      0,
      Math.round(
        ((progress.xp - currentLevelMinXp) / (nextLevelXp - currentLevelMinXp)) * 100
      )
    )
  );

  const completedCount = progress.completedLessons.length;
  const totalLessons = LESSONS.length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white p-6 sm:p-8 shadow-xl shadow-emerald-950/10">
        {/* Background decorative grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:24px_24px]" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-emerald-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kişiselleştirilmiş Öğrenme Alanı</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Excel'de uzmanlaşmaya hazır mısın, {progress.userProfile.name}?
            </h1>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed">
              Ezber yok. Gerçek Türkçe iş senaryoları, interaktif tablo simülatörü ve yapay zeka rehberliğiyle kariyerine güç kat.
            </p>
          </div>

          {/* Quick AI Help Callout */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              id="btn-dash-resume-lesson"
              onClick={() => onNavigate("lessons", nextLesson.id)}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white text-emerald-800 hover:bg-emerald-50 text-sm font-bold shadow-lg shadow-black/10 transition-all group"
            >
              <span>Dersime Devam Et</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              id="btn-dash-ask-ai"
              onClick={onOpenAITeacher}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500/20 hover:bg-emerald-500/30 text-white border border-white/20 text-sm font-bold backdrop-blur-md transition-all"
            >
              <Sparkles className="w-4 h-4 text-emerald-300" />
              <span>AI Öğretmene Sor</span>
            </button>
          </div>
        </div>

        {/* Level Progress Bar Inside Hero */}
        <div className="relative z-10 mt-6 pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-emerald-200 font-medium">Mevcut Seviyen:</span>
            <div className="font-bold text-sm text-white flex items-center gap-1.5 mt-0.5">
              <Award className="w-4 h-4 text-emerald-300" />
              <span>Seviye {progress.level}: {currentLevelData.title}</span>
            </div>
          </div>
          <div className="sm:col-span-2">
            <div className="flex justify-between text-emerald-200 font-medium mb-1">
              <span>Seviye {progress.level + 1}'e İlerleme</span>
              <span>{progressPercent}% ({progress.xp} / {nextLevelXp} XP)</span>
            </div>
            <div className="w-full h-2.5 bg-black/20 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-emerald-300 to-teal-200 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-500 shrink-0">
            <Flame className="w-6 h-6 fill-amber-500" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {progress.streak} Gün
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Aralıksız Çalışma Serisi
            </div>
          </div>
        </div>

        {/* XP */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
            <Zap className="w-6 h-6 fill-indigo-500/20" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {progress.xp.toLocaleString("tr-TR")}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Kazanılan Toplam XP
            </div>
          </div>
        </div>

        {/* Lessons Completed */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {completedCount} / {totalLessons}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Tamamlanan Ders
            </div>
          </div>
        </div>

        {/* Success Rate / Level */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950/50 flex items-center justify-center text-teal-600 dark:text-teal-400 shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              %{Math.round((completedCount / totalLessons) * 100)}
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Müfredat Tamamlanma
            </div>
          </div>
        </div>
      </div>

      {/* Weak Topics Personalized Alert (Adaptive Learning) */}
      {progress.weakTopics && progress.weakTopics.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200">
              Geliştirilmesi Gereken Konular Tespit Edildi
            </h4>
            <p className="text-xs text-amber-800 dark:text-amber-300 mt-1 leading-relaxed">
              Son çözdüğün quizlerde şu başlıklarda pratik yapman öneriliyor:{" "}
              <span className="font-bold">{progress.weakTopics.join(", ")}</span>.
              İlgili dersleri tekrar etmek ve AI öğretmenden örnek istemek başarı oranını artıracaktır.
            </p>
          </div>
          <button
            onClick={() => onNavigate("lessons")}
            className="px-3 py-1.5 text-xs font-bold text-amber-900 dark:text-amber-200 bg-amber-100 dark:bg-amber-900/50 hover:bg-amber-200 rounded-lg transition-colors shrink-0"
          >
            Derslere Git
          </button>
        </div>
      )}

      {/* Middle Grid: Next Lesson & Daily Task */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Lesson Recommendation Card (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Sıradaki Önerilen Ders
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                ⏱ {nextLesson.duration}
              </span>
            </div>

            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">
              {nextLesson.title}
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {nextLesson.objective}
            </p>

            {nextLesson.formulaSnippet && (
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700/60 font-mono text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                <span>{nextLesson.formulaSnippet}</span>
                <span className="text-[10px] text-slate-600 dark:text-slate-400 font-sans uppercase">
                  Odak Formül
                </span>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>+{nextLesson.xpReward} XP Kazanımı</span>
            </div>

            <button
              onClick={() => onNavigate("lessons", nextLesson.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all"
            >
              <span>Derse Başla</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Daily Mission Card (1 col) */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Günün Görevi</span>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-white/10 text-[11px] font-semibold text-indigo-200">
                +50 XP
              </span>
            </div>

            <h4 className="text-base font-bold text-white mb-2">
              Tablo Simülatöründe Pratik Yap
            </h4>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Uygulamalar sekmesindeki canlı Excel ızgarasında satış tablosunun toplamını hesapla veya bir EĞER formülü dene.
            </p>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-emerald-300">
              =TOPLA(F2:F7)
            </div>
          </div>

          <button
            onClick={() => onNavigate("simulator")}
            className="mt-6 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md transition-all text-center"
          >
            Simülatörü Aç ve Çöz
          </button>
        </div>
      </div>

      {/* Quick Launchpad Buttons */}
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
          Hızlı Araçlar
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigate("simulator")}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-emerald-500 hover:shadow-md transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 mb-2 group-hover:scale-110 transition-transform">
              <TableProperties className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              Excel Simülatörü
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Canlı tablo üzerinde formül dene
            </div>
          </button>

          <button
            onClick={() => onNavigate("formula-lab")}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-500 hover:shadow-md transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 mb-2 group-hover:scale-110 transition-transform">
              <FlaskConical className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              Formül Laboratuvarı
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Türkçe & İngilizce formül sözlüğü
            </div>
          </button>

          <button
            onClick={() => onNavigate("projects")}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-amber-500 hover:shadow-md transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 mb-2 group-hover:scale-110 transition-transform">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              Bitirme Projeleri
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Gerçek Türk iş hayatı senaryoları
            </div>
          </button>

          <button
            onClick={onOpenAITeacher}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 hover:border-teal-500 hover:shadow-md transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 flex items-center justify-center text-teal-600 mb-2 group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              AI Danışman
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Anlık formül ve hata çözümü
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
