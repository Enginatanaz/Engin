import React, { useState, useEffect, useRef } from "react";
import {
  FileSpreadsheet,
  RotateCcw,
  Sparkles,
  Download,
  Bold,
  DollarSign,
  Percent,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Play,
  Lightbulb,
  Table,
  HelpCircle,
  Copy,
  ChevronDown,
} from "lucide-react";
import confetti from "canvas-confetti";
import { SpreadsheetState, UserProgress, NavigationTab } from "../../types";
import {
  PRESET_SPREADSHEETS,
  PresetSpreadsheet,
} from "../../data/sampleSpreadsheets";
import {
  buildStateFromPreset,
  evaluateFormula,
  colToLetter,
  letterToCol,
  parseCellRef,
} from "../../utils/spreadsheetEngine";
import { addXpToUser } from "../../services/storageService";
import { sendMessageToAITeacher } from "../../services/aiService";

interface SimulatorViewProps {
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
  onNavigate: (tab: NavigationTab, payload?: string) => void;
}

const COLS_COUNT = 8; // A to H
const ROWS_COUNT = 18; // 1 to 18

export const SimulatorView: React.FC<SimulatorViewProps> = ({
  progress,
  onUpdateProgress,
  onNavigate,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<PresetSpreadsheet>(
    PRESET_SPREADSHEETS[0]
  );
  const [sheetState, setSheetState] = useState<SpreadsheetState>(() =>
    buildStateFromPreset(
      PRESET_SPREADSHEETS[0].headers,
      PRESET_SPREADSHEETS[0].rows,
      COLS_COUNT,
      ROWS_COUNT
    )
  );

  const [activeCellRef, setActiveCellRef] = useState<string>("F8");
  const [formulaBarValue, setFormulaBarValue] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [cellHistory, setCellHistory] = useState<SpreadsheetState[]>([]);

  // Suggested Exercise validation
  const [exerciseStatus, setExerciseStatus] = useState<
    "idle" | "correct" | "incorrect"
  >("idle");
  const [exerciseFeedback, setExerciseFeedback] = useState<string>("");

  // AI Assistant in simulator
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiReply, setAiReply] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Sync formula bar when active cell changes
  useEffect(() => {
    const cell = sheetState[activeCellRef];
    if (cell) {
      setFormulaBarValue(cell.formula ? cell.formula : String(cell.value || ""));
    } else {
      setFormulaBarValue("");
    }
    setIsEditing(false);
  }, [activeCellRef, sheetState]);

  // Load a preset
  const handleLoadPreset = (preset: PresetSpreadsheet) => {
    setSelectedPreset(preset);
    const newState = buildStateFromPreset(
      preset.headers,
      preset.rows,
      COLS_COUNT,
      ROWS_COUNT
    );
    setSheetState(newState);
    setActiveCellRef(preset.suggestedExercise.targetCell || "A1");
    setExerciseStatus("idle");
    setExerciseFeedback("");
    setCellHistory([]);
  };

  // Blank Sheet
  const handleCreateBlank = () => {
    const newState: SpreadsheetState = {};
    for (let r = 1; r <= ROWS_COUNT; r++) {
      for (let c = 0; c < COLS_COUNT; c++) {
        const ref = `${colToLetter(c)}${r}`;
        newState[ref] = { value: "", computedValue: "" };
      }
    }
    setSheetState(newState);
    setActiveCellRef("A1");
    setExerciseStatus("idle");
  };

  // Update a single cell
  const commitCellUpdate = (ref: string, rawInput: string) => {
    setCellHistory((prev) => [...prev.slice(-10), { ...sheetState }]);

    const trimmed = rawInput.trim();
    let formula: string | undefined = undefined;
    let computedVal: string | number = trimmed;

    if (trimmed.startsWith("=")) {
      formula = trimmed;
      computedVal = evaluateFormula(trimmed, sheetState);
    } else {
      const parsedNum = parseFloat(trimmed.replace(/,/g, "."));
      if (!isNaN(parsedNum) && trimmed !== "") {
        computedVal = parsedNum;
      }
    }

    const updatedState: SpreadsheetState = {
      ...sheetState,
      [ref]: {
        ...(sheetState[ref] || {}),
        value: trimmed,
        formula,
        computedValue: computedVal,
      },
    };

    // Re-evaluate dependent formulas in sheet
    Object.keys(updatedState).forEach((key) => {
      const cell = updatedState[key];
      if (cell && cell.formula) {
        cell.computedValue = evaluateFormula(cell.formula, updatedState);
      }
    });

    setSheetState(updatedState);
  };

  const handleCellClick = (ref: string) => {
    setActiveCellRef(ref);
  };

  const handleCellDoubleClick = (ref: string) => {
    setActiveCellRef(ref);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  const handleFormulaBarKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      commitCellUpdate(activeCellRef, formulaBarValue);
      setIsEditing(false);
      // Move down one cell
      const parsed = parseCellRef(activeCellRef);
      if (parsed && parsed.row < ROWS_COUNT) {
        setActiveCellRef(`${colToLetter(parsed.col)}${parsed.row + 1}`);
      }
    } else if (e.key === "Escape") {
      const cell = sheetState[activeCellRef];
      setFormulaBarValue(cell?.formula || String(cell?.value || ""));
      setIsEditing(false);
    }
  };

  // Format toggles
  const toggleFormat = (formatType: "bold" | "currency" | "percent") => {
    const current = sheetState[activeCellRef] || { value: "" };
    const newFormat = current.format === formatType ? "normal" : formatType;
    setSheetState({
      ...sheetState,
      [activeCellRef]: {
        ...current,
        format: newFormat,
      },
    });
  };

  // Undo
  const handleUndo = () => {
    if (cellHistory.length === 0) return;
    const previous = cellHistory[cellHistory.length - 1];
    setSheetState(previous);
    setCellHistory((prev) => prev.slice(0, -1));
  };

  // Check Suggested Exercise
  const handleCheckExercise = () => {
    const targetCell = selectedPreset.suggestedExercise.targetCell;
    const expectedFormula = selectedPreset.suggestedExercise.expectedFormula;
    const currentCell = sheetState[targetCell];

    if (!currentCell) {
      setExerciseStatus("incorrect");
      setExerciseFeedback(`${targetCell} hücresi boş.`);
      return;
    }

    const userRaw = (currentCell.formula || String(currentCell.value || ""))
      .trim()
      .toUpperCase()
      .replace(/\s+/g, "");

    const cleanExpected = expectedFormula.trim().toUpperCase().replace(/\s+/g, "");

    // Also compare computed outcome
    const targetVal = currentCell.computedValue;
    const expectedVal = evaluateFormula(expectedFormula, sheetState);

    const isFormulaMatch = userRaw === cleanExpected;
    const isValueMatch =
      typeof targetVal === "number" &&
      typeof expectedVal === "number" &&
      Math.abs(targetVal - expectedVal) < 0.01;

    if (isFormulaMatch || isValueMatch) {
      setExerciseStatus("correct");
      setExerciseFeedback(
        `Tebrikler! ${targetCell} hücresindeki formül başarıyla çalıştı ve doğru sonuç (${targetVal}) elde edildi!`
      );
      try {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
      const { updatedProgress } = addXpToUser(40, progress);
      onUpdateProgress(updatedProgress);
    } else {
      setExerciseStatus("incorrect");
      setExerciseFeedback(
        `Henüz beklenen sonuç alınamadı. ${selectedPreset.suggestedExercise.hint}`
      );
    }
  };

  // Ask AI about current sheet
  const handleAskAI = async () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    try {
      const summaryContext = `Kullanıcı şu anda '${selectedPreset.name}' tablosu üzerinde çalışıyor. Aktif hücre: ${activeCellRef}.`;
      const res = await sendMessageToAITeacher(
        `${summaryContext}\nSoru: ${aiPrompt}`,
        [],
        progress
      );
      setAiReply(res.reply);
    } catch {
      setAiReply(
        "Formülü yazarken eşittir (=) ile başlamayı ve Türkiye standartlarında noktalı virgül (;) kullanmayı unutmayın."
      );
    } finally {
      setIsAiLoading(false);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    let csv = "";
    for (let r = 1; r <= ROWS_COUNT; r++) {
      const rowValues: string[] = [];
      for (let c = 0; c < COLS_COUNT; c++) {
        const ref = `${colToLetter(c)}${r}`;
        const cell = sheetState[ref];
        const val = cell?.computedValue !== undefined ? cell.computedValue : cell?.value || "";
        rowValues.push(`"${String(val).replace(/"/g, '""')}"`);
      }
      csv += rowValues.join(";") + "\r\n";
    }
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedPreset.id || "tablo"}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div id="simulator-view-container" className="space-y-5">
      {/* Top Workspace Bar */}
      <div
        id="simulator-top-toolbar"
        className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4"
      >
        {/* Preset Selector */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Table className="w-3.5 h-3.5 text-emerald-600" />
            Örnek Tablolar:
          </span>
          {PRESET_SPREADSHEETS.map((preset) => (
            <button
              key={preset.id}
              id={`btn-preset-${preset.id}`}
              onClick={() => handleLoadPreset(preset)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedPreset.id === preset.id
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {preset.name}
            </button>
          ))}
          <button
            id="btn-preset-blank"
            onClick={handleCreateBlank}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200"
          >
            + Boş Sayfa
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            id="btn-undo-sheet"
            onClick={handleUndo}
            disabled={cellHistory.length === 0}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 border border-slate-200 disabled:opacity-30 transition-colors"
            title="Geri Al"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            id="btn-export-csv"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            CSV İndir
          </button>
        </div>
      </div>

      {/* Suggested Exercise Banner (Gamified Task for current table) */}
      <div
        id="simulator-exercise-banner"
        className="bg-gradient-to-r from-emerald-50 via-teal-50 to-white rounded-2xl p-4 border border-emerald-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                Günün Uygulama Görevi
              </span>
              <span className="text-[11px] font-bold text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md">
                +40 XP
              </span>
            </div>
            <p className="text-xs font-medium text-slate-800 mt-0.5">
              {selectedPreset.suggestedExercise.task}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            id="btn-target-cell-jump"
            onClick={() =>
              setActiveCellRef(selectedPreset.suggestedExercise.targetCell)
            }
            className="px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors"
          >
            Hedefe Git ({selectedPreset.suggestedExercise.targetCell})
          </button>
          <button
            id="btn-check-sheet-exercise"
            onClick={handleCheckExercise}
            className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            Doğrula
          </button>
        </div>
      </div>

      {/* Exercise Feedback */}
      {exerciseStatus !== "idle" && (
        <div
          id="simulator-feedback-alert"
          className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs ${
            exerciseStatus === "correct"
              ? "bg-emerald-50 border-emerald-300 text-emerald-900"
              : "bg-rose-50 border-rose-300 text-rose-900"
          }`}
        >
          {exerciseStatus === "correct" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          )}
          <span className="font-semibold">{exerciseFeedback}</span>
        </div>
      )}

      {/* Excel Main Board */}
      <div
        id="spreadsheet-main-board"
        className="bg-white rounded-2xl border border-slate-300 shadow-sm overflow-hidden"
      >
        {/* Formatting Ribbon */}
        <div
          id="spreadsheet-ribbon"
          className="bg-slate-50 p-2.5 border-b border-slate-200 flex flex-wrap items-center gap-1.5 text-xs"
        >
          <button
            id="btn-format-bold"
            onClick={() => toggleFormat("bold")}
            className={`p-1.5 rounded-md hover:bg-slate-200 transition-colors ${
              sheetState[activeCellRef]?.format === "bold"
                ? "bg-slate-300 font-extrabold"
                : ""
            }`}
            title="Kalın"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>

          <button
            id="btn-format-currency"
            onClick={() => toggleFormat("currency")}
            className={`px-2 py-1 rounded-md text-xs font-semibold hover:bg-slate-200 transition-colors flex items-center gap-1 ${
              sheetState[activeCellRef]?.format === "currency"
                ? "bg-emerald-100 text-emerald-800"
                : "text-slate-700"
            }`}
            title="Para Birimi (₺)"
          >
            ₺ Para Birimi
          </button>

          <button
            id="btn-format-percent"
            onClick={() => toggleFormat("percent")}
            className={`px-2 py-1 rounded-md text-xs font-semibold hover:bg-slate-200 transition-colors flex items-center gap-1 ${
              sheetState[activeCellRef]?.format === "percent"
                ? "bg-emerald-100 text-emerald-800"
                : "text-slate-700"
            }`}
            title="Yüzde (%)"
          >
            <Percent className="w-3 h-3" /> Yüzde
          </button>

          <div className="h-4 w-px bg-slate-300 mx-1" />

          {/* Quick formula helpers */}
          <button
            id="btn-quick-sum"
            onClick={() => {
              setFormulaBarValue("=TOPLA(");
              setIsEditing(true);
            }}
            className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Σ TOPLA
          </button>

          <button
            id="btn-quick-avg"
            onClick={() => {
              setFormulaBarValue("=ORTALAMA(");
              setIsEditing(true);
            }}
            className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
          >
            x̄ ORTALAMA
          </button>

          <button
            id="btn-quick-if"
            onClick={() => {
              setFormulaBarValue('=EĞER(;"Doğru";"Yanlış")');
              setIsEditing(true);
            }}
            className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors"
          >
            ? EĞER
          </button>
        </div>

        {/* Formula Bar */}
        <div
          id="spreadsheet-formula-bar"
          className="flex items-center gap-2 p-2 border-b border-slate-200 bg-white"
        >
          {/* Active Cell Reference Name Box */}
          <div
            id="cell-name-box"
            className="w-16 px-2.5 py-1 bg-slate-100 border border-slate-300 rounded-md font-mono text-xs font-bold text-center text-slate-800 shadow-inner"
          >
            {activeCellRef}
          </div>

          {/* fx Indicator */}
          <div className="text-slate-400 font-serif italic text-sm font-bold select-none px-1">
            fx
          </div>

          {/* Formula Input */}
          <input
            id="simulator-formula-input"
            ref={inputRef}
            type="text"
            value={formulaBarValue}
            onChange={(e) => setFormulaBarValue(e.target.value)}
            onKeyDown={handleFormulaBarKeyDown}
            placeholder="Değer girin veya =TOPLA(A1:A5) gibi formül yazıp Enter'a basın..."
            className="flex-1 font-mono text-xs sm:text-sm px-3 py-1.5 border border-slate-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
          />

          <button
            id="btn-commit-formula"
            onClick={() => commitCellUpdate(activeCellRef, formulaBarValue)}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs font-bold transition-colors"
          >
            Uygula
          </button>
        </div>

        {/* Spreadsheet Table Grid */}
        <div
          id="spreadsheet-grid-wrapper"
          className="overflow-x-auto max-h-[500px] select-none"
        >
          <table className="w-full text-xs text-left border-collapse table-fixed min-w-[700px]">
            <thead>
              <tr className="bg-slate-100 text-slate-600 font-mono text-center">
                {/* Corner Cell */}
                <th className="w-12 h-7 border border-slate-300 bg-slate-200 text-slate-500"></th>
                {Array.from({ length: COLS_COUNT }).map((_, c) => (
                  <th
                    key={c}
                    className="w-32 h-7 border border-slate-300 font-bold uppercase tracking-wider bg-slate-100/90 text-slate-700"
                  >
                    {colToLetter(c)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: ROWS_COUNT }).map((_, r) => {
                const rowNum = r + 1;
                return (
                  <tr key={rowNum} className="hover:bg-slate-50/40">
                    {/* Row Header */}
                    <td className="w-12 h-7 text-center font-mono font-bold text-slate-500 bg-slate-100/80 border border-slate-300">
                      {rowNum}
                    </td>

                    {/* Columns */}
                    {Array.from({ length: COLS_COUNT }).map((_, c) => {
                      const ref = `${colToLetter(c)}${rowNum}`;
                      const cell = sheetState[ref];
                      const isActive = activeCellRef === ref;
                      const isTargetExercise =
                        selectedPreset.suggestedExercise.targetCell === ref;

                      // Display formatted value
                      let displayVal =
                        cell?.computedValue !== undefined
                          ? cell.computedValue
                          : cell?.value || "";

                      if (cell?.format === "currency" && typeof displayVal === "number") {
                        displayVal = displayVal.toLocaleString("tr-TR") + " ₺";
                      } else if (cell?.format === "percent" && typeof displayVal === "number") {
                        displayVal = `%${displayVal * 100}`;
                      }

                      const isBold = cell?.format === "bold" || cell?.isHeader;

                      return (
                        <td
                          key={ref}
                          id={`sheet-cell-${ref}`}
                          onClick={() => handleCellClick(ref)}
                          onDoubleClick={() => handleCellDoubleClick(ref)}
                          className={`w-32 h-7 px-2 py-1 border border-slate-300 font-mono text-xs truncate cursor-cell transition-colors relative ${
                            isActive
                              ? "bg-emerald-50 ring-2 ring-emerald-600 ring-inset z-10 font-medium"
                              : isTargetExercise
                              ? "bg-amber-50 ring-1 ring-amber-400 ring-inset"
                              : cell?.isHeader
                              ? "bg-slate-50/90 font-bold text-slate-900 text-center"
                              : "bg-white text-slate-800"
                          } ${isBold ? "font-bold text-slate-950" : ""}`}
                        >
                          {displayVal}
                          {isTargetExercise && !isActive && (
                            <span className="absolute top-0 right-0 w-2 h-2 bg-amber-500 rounded-bl-sm" />
                          )}
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

      {/* AI Formula & Sheet Assistant in Simulator */}
      <div
        id="simulator-ai-assistant-card"
        className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Yapay Zeka Formül Asistanı
          </h3>
          <span className="text-[11px] text-slate-600">
            Aktif Tablo: {selectedPreset.name}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            id="simulator-ai-prompt-input"
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAskAI()}
            placeholder="Örn: Bu tablodaki Marmara bölgesinin toplam cirosunu nasıl hesaplarım?"
            className="flex-1 text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
          <button
            id="btn-ask-ai-simulator"
            onClick={handleAskAI}
            disabled={isAiLoading || !aiPrompt.trim()}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors disabled:opacity-40 shrink-0"
          >
            {isAiLoading ? "Düşünüyor..." : "Öğretmene Sor"}
          </button>
        </div>

        {aiReply && (
          <div
            id="simulator-ai-reply-box"
            className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed whitespace-pre-wrap"
          >
            {aiReply}
          </div>
        )}
      </div>
    </div>
  );
};
