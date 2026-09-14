import React from "react";
import {
  Search,
  Flame,
  Zap,
  Award,
  Sun,
  Moon,
  Sparkles,
} from "lucide-react";
import { UserProgress } from "../../types";

interface HeaderProps {
  progress: UserProgress;
  onOpenSearch: () => void;
  onOpenProfile: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onNavigateTab: (tab: any) => void;
}

export const Header: React.FC<HeaderProps> = ({
  progress,
  onOpenSearch,
  onOpenProfile,
  darkMode,
  onToggleDarkMode,
  onNavigateTab,
}) => {
  const levelTitles: Record<number, string> = {
    1: "Sıfırdan Excel",
    2: "Temel Excel",
    3: "Orta Seviye",
    4: "İleri Excel",
    5: "Profesyonel",
    6: "Excel Uzmanı",
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      {/* Left: Global Search trigger */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          id="btn-global-search"
          onClick={onOpenSearch}
          className="flex items-center w-full gap-2 px-3.5 py-2 text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/70 dark:hover:bg-slate-700/60 rounded-xl border border-slate-200 dark:border-slate-700/60 transition-all text-left group"
        >
          <Search className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
          <span className="flex-1 truncate">Ders, formül, proje veya quiz ara...</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded shadow-xs">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Right: Gamification Badges & Profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Current Level Pill */}
        <button
          id="header-level-badge"
          onClick={() => onNavigateTab("roadmap")}
          className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-100/60 transition-all"
          title="Yolculuğu Gör"
        >
          <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Seviye {progress.level}: {levelTitles[progress.level] || "Excel"}</span>
        </button>

        {/* Streak Counter */}
        <div
          id="header-streak-badge"
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40 text-amber-700 dark:text-amber-300 text-xs font-bold"
          title="Günlük Çalışma Serisi"
        >
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
          <span>{progress.streak} Gün</span>
        </div>

        {/* XP Counter */}
        <button
          id="header-xp-badge"
          onClick={() => onNavigateTab("achievements")}
          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-100/60 transition-all"
          title="Toplam Deneyim Puanı"
        >
          <Zap className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 fill-indigo-500/30" />
          <span>{progress.xp.toLocaleString("tr-TR")} XP</span>
        </button>

        {/* Ask AI quick button */}
        <button
          id="btn-quick-ai-tutor"
          onClick={() => onNavigateTab("ai-teacher")}
          className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-lg shadow-sm transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Öğretmen</span>
        </button>

        {/* Theme Toggle */}
        <button
          id="btn-theme-toggle"
          onClick={onToggleDarkMode}
          className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title={darkMode ? "Açık Temaya Geç" : "Koyu Temaya Geç"}
          aria-label="Tema Değiştir"
        >
          {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* User Profile Avatar */}
        <button
          id="btn-user-avatar"
          onClick={onOpenProfile}
          className="flex items-center gap-2 p-1 pl-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
          title="Profil ve Ayarlar"
        >
          <div className="w-7 h-7 rounded-full bg-emerald-100 dark:bg-emerald-900/60 flex items-center justify-center text-sm font-bold text-emerald-800 dark:text-emerald-300">
            {progress.userProfile.avatar || "📊"}
          </div>
          <span className="hidden sm:inline text-xs font-semibold text-slate-700 dark:text-slate-200 pr-1 max-w-[90px] truncate">
            {progress.userProfile.name}
          </span>
        </button>
      </div>
    </header>
  );
};
