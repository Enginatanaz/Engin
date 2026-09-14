import React, { useState } from "react";
import {
  Briefcase,
  CheckCircle2,
  Lock,
  Play,
  Sparkles,
  Award,
  ArrowRight,
  RotateCcw,
  Check,
  AlertCircle,
  FileSpreadsheet,
  Lightbulb,
} from "lucide-react";
import confetti from "canvas-confetti";
import { NavigationTab, Project, ProjectObjective, UserProgress } from "../../types";
import { PROJECTS } from "../../data/projectData";
import { addXpToUser } from "../../services/storageService";
import {
  buildStateFromPreset,
  colToLetter,
  evaluateFormula,
} from "../../utils/spreadsheetEngine";

interface ProjectsViewProps {
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
  onNavigate: (tab: NavigationTab, payload?: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  progress,
  onUpdateProgress,
  onNavigate,
}) => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [completedObjectives, setCompletedObjectives] = useState<{
    [objId: string]: boolean;
  }>({});
  const [activeCellRef, setActiveCellRef] = useState<string>("D10");
  const [formulaValue, setFormulaValue] = useState<string>("");
  const [objectiveFeedback, setObjectiveFeedback] = useState<{
    status: "idle" | "correct" | "incorrect";
    message: string;
  }>({ status: "idle", message: "" });

  const handleSelectProject = (project: Project) => {
    setActiveProject(project);
    setCompletedObjectives({});
    setActiveCellRef(project.objectives[0]?.targetCell || "A1");
    setFormulaValue("");
    setObjectiveFeedback({ status: "idle", message: "" });
  };

  const handleVerifyObjective = (objective: ProjectObjective) => {
    if (!activeProject) return;

    if (!formulaValue.trim()) {
      setObjectiveFeedback({
        status: "incorrect",
        message: "Lütfen bir formül yazın.",
      });
      return;
    }

    const cleanUser = formulaValue.trim().toUpperCase().replace(/\s+/g, "");
    const cleanExp = (objective.targetFormula || "")
      .trim()
      .toUpperCase()
      .replace(/\s+/g, "");

    // Also check evaluation
    const userRes = evaluateFormula(formulaValue, {});
    const expRes = evaluateFormula(objective.targetFormula || "", {});

    const isMatch =
      cleanUser === cleanExp ||
      (userRes !== "#HATA!" && userRes !== "#DEĞER!" && userRes === expRes);

    if (isMatch) {
      setCompletedObjectives((prev) => {
        const next = { ...prev, [objective.id]: true };

        // Check if all objectives completed
        const allDone = activeProject.objectives.every((obj) =>
          obj.id === objective.id ? true : next[obj.id]
        );

        if (allDone) {
          try {
            confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
          } catch {
            // ignore
          }
          if (!progress.completedProjects.includes(activeProject.id)) {
            const updatedProjects = [
              ...progress.completedProjects,
              activeProject.id,
            ];
            const updatedProg: UserProgress = {
              ...progress,
              completedProjects: updatedProjects,
            };
            const { updatedProgress } = addXpToUser(
              activeProject.xpReward,
              updatedProg
            );
            onUpdateProgress(updatedProgress);
          }
        } else {
          // Individual objective XP
          const { updatedProgress } = addXpToUser(50, progress);
          onUpdateProgress(updatedProgress);
        }

        return next;
      });

      setObjectiveFeedback({
        status: "correct",
        message: `Tebrikler! "${objective.title}" hedefi başarıyla tamamlandı!`,
      });
    } else {
      setObjectiveFeedback({
        status: "incorrect",
        message: `Formül henüz hedeflenen sonucu vermedi. İpucu: ${objective.description}`,
      });
    }
  };

  return (
    <div id="projects-view-container" className="space-y-6">
      {/* Directory of Projects */}
      {!activeProject && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-emerald-600" />
                Gerçek Hayat Excel Projeleri
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Türk iş dünyasından simüle edilmiş gerçek senaryolarla uçtan uca bütçe, satış ve personel tabloları inşa edin.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200">
                Tamamlanan: {progress.completedProjects.length} / {PROJECTS.length} Proje
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROJECTS.map((proj) => {
              const isFinished = progress.completedProjects.includes(proj.id);

              return (
                <div
                  key={proj.id}
                  id={`project-card-${proj.id}`}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
                        {proj.level} Seviye
                      </span>
                      <span className="text-xs font-bold text-amber-600">
                        +{proj.xpReward} XP
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {proj.title}
                    </h3>
                    <p className="text-xs font-medium text-emerald-700">
                      {proj.tagline}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-3">
                      {proj.scenario}
                    </p>

                    <div className="pt-2 text-xs text-slate-600 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{proj.objectives.length} Temel Hedef Adımı</span>
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                    {isFinished ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                        <Check className="w-4 h-4" />
                        Tamamlandı
                      </span>
                    ) : (
                      <span className="text-xs text-slate-600">Proje Hazır</span>
                    )}
                    <button
                      id={`btn-open-project-${proj.id}`}
                      onClick={() => handleSelectProject(proj)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      Projeyi Aç
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Project Workspace */}
      {activeProject && (
        <div id="active-project-workspace" className="space-y-6">
          {/* Top Bar */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveProject(null)}
                className="text-xs text-slate-600 hover:text-slate-900 font-semibold"
              >
                ← Projeler Listesi
              </button>
              <div className="h-4 w-px bg-slate-200" />
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  {activeProject.title}
                </h2>
                <span className="text-xs text-slate-600">
                  {activeProject.datasetTitle}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  onNavigate(
                    "ai-teacher",
                    `'${activeProject.title}' projesindeyim. ${activeProject.scenario} Bu projeyi tamamlarken bana ipucu verir misin?`
                  )
                }
                className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 border border-emerald-200"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Öğretmenden İpucu Al
              </button>
            </div>
          </div>

          {/* Scenario & Objectives Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Project Objectives (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Proje Adımları & Görevler
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                {activeProject.scenario}
              </p>

              <div className="space-y-3 pt-1">
                {activeProject.objectives.map((obj, i) => {
                  const done = completedObjectives[obj.id] || false;
                  const isSelected = activeCellRef === obj.targetCell;

                  return (
                    <div
                      key={obj.id}
                      onClick={() => {
                        if (obj.targetCell) setActiveCellRef(obj.targetCell);
                      }}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        done
                          ? "bg-emerald-50/70 border-emerald-300"
                          : isSelected
                          ? "bg-amber-50/70 border-amber-300 ring-1 ring-amber-400"
                          : "bg-white border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                              done
                                ? "bg-emerald-600 text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {done ? <Check className="w-3 h-3 stroke-[3]" /> : i + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-900">
                            {obj.title}
                          </span>
                        </div>
                        {obj.targetCell && (
                          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                            {obj.targetCell}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 mt-1.5 pl-7">
                        {obj.description}
                      </p>
                      {obj.targetFormula && !done && (
                        <div className="mt-2 pl-7 flex items-center justify-between">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleVerifyObjective(obj);
                            }}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-lg transition-colors"
                          >
                            Doğrula
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Final Challenge Note */}
              <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-950 space-y-1">
                <span className="font-bold flex items-center gap-1 text-purple-900">
                  <Award className="w-4 h-4 text-purple-600" />
                  Kıdemli Uzman Meydan Okuması:
                </span>
                <p>{activeProject.finalChallenge}</p>
              </div>
            </div>

            {/* Right: Interactive Table & Formula Input (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Formula Input Card */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 rounded-xl font-mono text-xs font-bold text-slate-800 shrink-0">
                  <span>fx</span>
                  <span className="text-emerald-700">{activeCellRef}:</span>
                </div>
                <input
                  type="text"
                  value={formulaValue}
                  onChange={(e) => setFormulaValue(e.target.value)}
                  placeholder="Hedef formülü buraya yazın (örn: =TOPLA(D2:D6))"
                  className="flex-1 font-mono text-xs sm:text-sm px-4 py-2 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  onClick={() => {
                    const activeObj = activeProject.objectives.find(
                      (o) => o.targetCell === activeCellRef
                    );
                    if (activeObj) handleVerifyObjective(activeObj);
                    else {
                      setObjectiveFeedback({
                        status: "incorrect",
                        message: "Lütfen sol taraftaki görev adımlarından birini seçin.",
                      });
                    }
                  }}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                >
                  Kontrol Et
                </button>
              </div>

              {/* Feedback alert */}
              {objectiveFeedback.status !== "idle" && (
                <div
                  className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${
                    objectiveFeedback.status === "correct"
                      ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                      : "bg-rose-50 border-rose-300 text-rose-900"
                  }`}
                >
                  {objectiveFeedback.status === "correct" ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <span className="font-semibold">{objectiveFeedback.message}</span>
                </div>
              )}

              {/* Project Data Table */}
              <div className="bg-white rounded-2xl border border-slate-300 shadow-xs overflow-hidden">
                <div className="p-3 bg-slate-100 border-b border-slate-300 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 font-mono">
                    {activeProject.datasetTitle}
                  </span>
                  <span className="text-[11px] text-slate-600">
                    {activeProject.dataset.rows.length} Kayıt
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-300 font-mono text-slate-700">
                        <th className="w-10 px-2 py-2 text-center bg-slate-100 border-r border-slate-300"></th>
                        {activeProject.dataset.headers.map((h, i) => (
                          <th
                            key={i}
                            className="px-3.5 py-2 border-r border-slate-300 font-bold uppercase tracking-wider"
                          >
                            {colToLetter(i)} ({h})
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {activeProject.dataset.rows.map((row, rIdx) => {
                        const rowNum = rIdx + 2; // header is 1
                        return (
                          <tr key={rIdx} className="border-b border-slate-200 hover:bg-slate-50/50">
                            <td className="px-2 py-2 text-center font-mono font-bold text-slate-500 bg-slate-100/70 border-r border-slate-300">
                              {rowNum}
                            </td>
                            {row.map((cell, cIdx) => {
                              const cellRef = `${colToLetter(cIdx)}${rowNum}`;
                              const isTarget = activeCellRef === cellRef;

                              return (
                                <td
                                  key={cIdx}
                                  onClick={() => setActiveCellRef(cellRef)}
                                  className={`px-3.5 py-2 border-r border-slate-200 font-mono cursor-pointer ${
                                    isTarget ? "bg-amber-50 ring-2 ring-amber-400 inset-0 font-bold" : ""
                                  }`}
                                >
                                  {typeof cell === "number" ? cell.toLocaleString("tr-TR") : cell}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
