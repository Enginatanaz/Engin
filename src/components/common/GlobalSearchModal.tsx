import React, { useState, useEffect, useRef } from "react";
import { Search, X, BookOpen, FlaskConical, FolderGit2, CheckSquare, ArrowRight } from "lucide-react";
import { LESSONS } from "../../data/curriculumData";
import { FORMULA_CATALOG } from "../../data/formulasData";
import { PROJECTS } from "../../data/projectData";
import { QUIZZES } from "../../data/quizData";
import { NavigationTab } from "../../types";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavigationTab, payload?: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled outside or toggled
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search results
  const matchedLessons = q
    ? LESSONS.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.objective.toLowerCase().includes(q) ||
          (l.formulaSnippet && l.formulaSnippet.toLowerCase().includes(q))
      ).slice(0, 4)
    : [];

  const matchedFormulas = q
    ? FORMULA_CATALOG.filter(
        (f) =>
          f.turkishName.toLowerCase().includes(q) ||
          f.englishName.toLowerCase().includes(q) ||
          f.description.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  const matchedProjects = q
    ? PROJECTS.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.scenario.toLowerCase().includes(q) ||
          p.level.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const matchedQuizzes = q
    ? QUIZZES.filter(
        (qz) =>
          qz.title.toLowerCase().includes(q) ||
          qz.description.toLowerCase().includes(q)
      ).slice(0, 3)
    : [];

  const totalMatches =
    matchedLessons.length + matchedFormulas.length + matchedProjects.length + matchedQuizzes.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="DÜŞEYARA, EĞER, Pivot Table veya Projeler ara..."
            className="flex-1 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-base focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 px-2 py-1 text-xs text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
          >
            Kapat
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!q && (
            <div className="text-center py-8 text-slate-600 dark:text-slate-400 text-sm">
              <p className="font-semibold mb-2">Hızlı Arama İpuçları:</p>
              <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto mt-3">
                {["TOPLA", "DÜŞEYARA", "EĞER", "ÇAPRAZARA", "Özet Tablo", "Satış Raporu"].map((tip) => (
                  <button
                    key={tip}
                    onClick={() => setQuery(tip)}
                    className="px-2.5 py-1 text-xs rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-400 transition-colors"
                  >
                    {tip}
                  </button>
                ))}
              </div>
            </div>
          )}

          {q && totalMatches === 0 && (
            <div className="text-center py-10 text-slate-600 dark:text-slate-400 text-sm">
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                "{query}" ile eşleşen sonuç bulunamadı.
              </p>
              <p className="mt-1">Farklı bir Excel fonksiyonu veya anahtar kelime deneyin.</p>
            </div>
          )}

          {/* Lessons Matches */}
          {matchedLessons.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                <span>Dersler ({matchedLessons.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    onClick={() => {
                      onNavigate("lessons", lesson.id);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-100 dark:border-slate-800 cursor-pointer transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-emerald-700 dark:group-hover:text-emerald-400">
                        {lesson.title}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                        {lesson.objective}
                      </div>
                    </div>
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      Derse Git <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Formulas Matches */}
          {matchedFormulas.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                <FlaskConical className="w-3.5 h-3.5 text-indigo-600" />
                <span>Formül Laboratuvarı ({matchedFormulas.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedFormulas.map((f) => (
                  <div
                    key={f.id}
                    onClick={() => {
                      onNavigate("formula-lab", f.turkishName);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-100 dark:border-slate-800 cursor-pointer transition-colors group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                          ={f.turkishName}
                        </span>
                        <span className="text-xs text-slate-600 dark:text-slate-400">
                          ({f.englishName})
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                          {f.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {f.description}
                      </p>
                    </div>
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1">
                      İncele <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Matches */}
          {matchedProjects.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                <FolderGit2 className="w-3.5 h-3.5 text-amber-600" />
                <span>Projeler ({matchedProjects.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedProjects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onNavigate("projects", p.id);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-slate-100 dark:border-slate-800 cursor-pointer transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-amber-700 dark:group-hover:text-amber-400">
                        {p.title}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                        {p.tagline}
                      </div>
                    </div>
                    <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                      Projeye Başla <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quizzes Matches */}
          {matchedQuizzes.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                <CheckSquare className="w-3.5 h-3.5 text-teal-600" />
                <span>Quizler ({matchedQuizzes.length})</span>
              </div>
              <div className="space-y-1.5">
                {matchedQuizzes.map((qz) => (
                  <div
                    key={qz.id}
                    onClick={() => {
                      onNavigate("quizzes", qz.id);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-teal-50 dark:hover:bg-teal-950/40 border border-slate-100 dark:border-slate-800 cursor-pointer transition-colors group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-teal-700 dark:group-hover:text-teal-400">
                        {qz.title}
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                        {qz.description}
                      </div>
                    </div>
                    <span className="text-xs text-teal-600 dark:text-teal-400 font-semibold flex items-center gap-1">
                      Quizi Çöz <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
