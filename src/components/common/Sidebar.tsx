import React from "react";
import {
  LayoutDashboard,
  Map,
  BookOpen,
  TableProperties,
  CheckSquare,
  BotMessageSquare,
  FlaskConical,
  FolderGit2,
  Trophy,
  Settings,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
} from "lucide-react";
import { NavigationTab } from "../../types";

interface SidebarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  collapsed: boolean;
  onToggleCollapsed: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  collapsed,
  onToggleCollapsed,
}) => {
  const menuItems: { id: NavigationTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: "dashboard", label: "Ana Sayfa", icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: "roadmap", label: "Excel Yolculuğum", icon: <Map className="w-5 h-5" /> },
    { id: "lessons", label: "Dersler", icon: <BookOpen className="w-5 h-5" /> },
    { id: "simulator", label: "Uygulamalar", icon: <TableProperties className="w-5 h-5" />, badge: "Simülatör" },
    { id: "quizzes", label: "Quizler", icon: <CheckSquare className="w-5 h-5" /> },
    { id: "ai-teacher", label: "AI Excel Öğretmeni", icon: <BotMessageSquare className="w-5 h-5" />, badge: "AI" },
    { id: "formula-lab", label: "Formül Laboratuvarı", icon: <FlaskConical className="w-5 h-5" /> },
    { id: "projects", label: "Projeler", icon: <FolderGit2 className="w-5 h-5" /> },
    { id: "achievements", label: "Başarılarım", icon: <Trophy className="w-5 h-5" /> },
    { id: "settings", label: "Ayarlar", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Desktop & Tablet Sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 transition-all duration-200 select-none z-20 shrink-0 ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Brand Logo & Name */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-100 dark:border-slate-800/80">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20 shrink-0">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            {!collapsed && (
              <div className="flex flex-col leading-tight truncate">
                <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white">
                  Excel Akademi <span className="text-emerald-600 dark:text-emerald-400">AI</span>
                </span>
                <span className="text-[10px] text-slate-600 dark:text-slate-400 font-medium truncate">
                  Ezberleme. Gerçekten öğren.
                </span>
              </div>
            )}
          </div>

          <button
            onClick={onToggleCollapsed}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={collapsed ? "Genişlet" : "Daralt"}
            aria-label="Sidebar Daralt"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center w-full gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all group relative ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/30"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
                } ${collapsed ? "justify-center px-0" : ""}`}
                title={collapsed ? item.label : undefined}
              >
                <div className={`${isActive ? "text-white" : "text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"}`}>
                  {item.icon}
                </div>

                {!collapsed && (
                  <span className="flex-1 text-left truncate">{item.label}</span>
                )}

                {!collapsed && item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}

                {collapsed && isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-emerald-600 rounded-l-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer info */}
        {!collapsed && (
          <div className="p-4 m-3 rounded-2xl bg-emerald-50/70 dark:bg-slate-800/60 border border-emerald-100 dark:border-slate-700/60">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider">
                Yapay Zeka Hazır
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Takıldığın her an sağ alttaki veya menüdeki AI Öğretmenine danışabilirsin.
            </p>
          </div>
        )}
      </aside>

      {/* Mobile Bottom Bar for Fast Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex items-center justify-around px-2 py-1 safe-bottom">
        {[
          { id: "dashboard" as NavigationTab, label: "Ana Sayfa", icon: <LayoutDashboard className="w-5 h-5" /> },
          { id: "lessons" as NavigationTab, label: "Dersler", icon: <BookOpen className="w-5 h-5" /> },
          { id: "simulator" as NavigationTab, label: "Uygulama", icon: <TableProperties className="w-5 h-5" /> },
          { id: "ai-teacher" as NavigationTab, label: "AI Öğretmen", icon: <BotMessageSquare className="w-5 h-5" /> },
          { id: "quizzes" as NavigationTab, label: "Quiz", icon: <CheckSquare className="w-5 h-5" /> },
          { id: "roadmap" as NavigationTab, label: "Yolculuk", icon: <Map className="w-5 h-5" /> },
        ].map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1.5 px-1 rounded-lg text-[10px] font-medium transition-colors ${
                isActive
                  ? "text-emerald-600 dark:text-emerald-400 font-bold"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800"
              }`}
            >
              {item.icon}
              <span className="mt-0.5 truncate max-w-[56px]">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
