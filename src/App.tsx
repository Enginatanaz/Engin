import React, { useState, useEffect } from "react";
import { NavigationTab, UserProgress } from "./types";
import { loadUserProgress, saveUserProgress } from "./services/storageService";

// Layout & Common Components
import { Header } from "./components/common/Header";
import { Sidebar } from "./components/common/Sidebar";
import { GlobalSearchModal } from "./components/common/GlobalSearchModal";
import { OnboardingModal } from "./components/common/OnboardingModal";

// Views
import { DashboardView } from "./components/dashboard/DashboardView";
import { RoadmapView } from "./components/roadmap/RoadmapView";
import { LessonsView } from "./components/lessons/LessonsView";
import { SimulatorView } from "./components/simulator/SimulatorView";
import { QuizzesView } from "./components/quizzes/QuizzesView";
import { AITeacherView } from "./components/ai-teacher/AITeacherView";
import { FormulaLabView } from "./components/formula-lab/FormulaLabView";
import { ProjectsView } from "./components/projects/ProjectsView";
import { AchievementsView } from "./components/achievements/AchievementsView";
import { SettingsView } from "./components/settings/SettingsView";

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => loadUserProgress());
  const [activeTab, setActiveTab] = useState<NavigationTab>("dashboard");
  const [tabPayload, setTabPayload] = useState<string | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(
    !progress.onboardingCompleted
  );
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("excel_akademi_theme") === "dark";
  });

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("excel_akademi_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("excel_akademi_theme", "light");
    }
  }, [darkMode]);

  // Global keyboard shortcut: Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleUpdateProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    saveUserProgress(newProgress);
  };

  const handleNavigate = (tab: NavigationTab, payload?: string) => {
    setActiveTab(tab);
    setTabPayload(payload);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOnboardingComplete = (data: {
    currentLevel: string;
    goal: string;
    dailyTime: string;
  }) => {
    const updated: UserProgress = {
      ...progress,
      onboardingCompleted: true,
      onboardingData: data,
    };
    handleUpdateProgress(updated);
    setIsOnboardingOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors">
      {/* Left Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => handleNavigate(tab)}
        collapsed={sidebarCollapsed}
        onToggleCollapsed={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Sticky Header */}
        <Header
          progress={progress}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenProfile={() => handleNavigate("settings")}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onNavigateTab={(tab) => handleNavigate(tab)}
        />

        {/* Dynamic View Canvas */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === "dashboard" && (
            <DashboardView
              progress={progress}
              onNavigate={handleNavigate}
              onOpenAITeacher={() => handleNavigate("ai-teacher")}
            />
          )}

          {activeTab === "roadmap" && (
            <RoadmapView
              progress={progress}
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === "lessons" && (
            <LessonsView
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              onNavigate={handleNavigate}
              selectedLessonId={tabPayload}
            />
          )}

          {activeTab === "simulator" && (
            <SimulatorView
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === "quizzes" && (
            <QuizzesView
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === "ai-teacher" && (
            <AITeacherView
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              onNavigate={handleNavigate}
              initialPrompt={tabPayload}
            />
          )}

          {activeTab === "formula-lab" && (
            <FormulaLabView
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              onNavigate={handleNavigate}
              initialFormula={tabPayload}
            />
          )}

          {activeTab === "projects" && (
            <ProjectsView
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === "achievements" && (
            <AchievementsView
              progress={progress}
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === "settings" && (
            <SettingsView
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              onNavigate={handleNavigate}
            />
          )}
        </main>
      </div>

      {/* Global Search Modal (Ctrl+K) */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* First-time Onboarding Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onComplete={handleOnboardingComplete}
        progress={progress}
      />
    </div>
  );
}
