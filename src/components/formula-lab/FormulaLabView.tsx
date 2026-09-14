import React, { useState } from "react";
import {
  Code,
  Search,
  Sparkles,
  Play,
  Copy,
  Check,
  AlertCircle,
  Lightbulb,
  ExternalLink,
  Cpu,
  BookOpen,
  ArrowRight,
  Filter,
} from "lucide-react";
import { FormulaCatalogItem, NavigationTab, UserProgress } from "../../types";
import { FORMULA_CATALOG } from "../../data/formulasData";
import { evaluateFormula } from "../../utils/spreadsheetEngine";
import {
  analyzeFormulaWithAI,
  FormulaAnalysisResult,
} from "../../services/aiService";

interface FormulaLabViewProps {
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
  onNavigate: (tab: NavigationTab, payload?: string) => void;
  initialFormula?: string;
}

const CATEGORIES = [
  "Tümü",
  "Matematik",
  "Mantıksal",
  "Metin",
  "Tarih",
  "Arama",
  "İstatistik",
  "Dinamik Diziler",
];

export const FormulaLabView: React.FC<FormulaLabViewProps> = ({
  progress,
  onUpdateProgress,
  onNavigate,
  initialFormula,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeItem, setActiveItem] = useState<FormulaCatalogItem>(
    FORMULA_CATALOG[0]
  );

  // Sandbox state
  const [testFormula, setTestFormula] = useState(
    initialFormula || '=EĞER(85>=50; "Geçti"; "Kaldı")'
  );
  const [localEvalResult, setLocalEvalResult] = useState<string | number | null>(
    null
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // AI Analysis state
  const [analysisMode, setAnalysisMode] = useState<
    "explain" | "optimize" | "debug"
  >("explain");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<FormulaAnalysisResult | null>(null);

  const filteredItems = FORMULA_CATALOG.filter((item) => {
    const matchesCat =
      selectedCategory === "Tümü" || item.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      item.turkishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleRunFormula = () => {
    if (!testFormula.trim()) return;
    const res = evaluateFormula(testFormula, {});
    setLocalEvalResult(res);
  };

  const handleAIAnalyze = async (mode: "explain" | "optimize" | "debug") => {
    if (!testFormula.trim()) return;
    setAnalysisMode(mode);
    setIsAnalyzing(true);
    try {
      const result = await analyzeFormulaWithAI(testFormula, mode);
      setAiAnalysis(result);
    } catch {
      // Fallback
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const loadExampleIntoSandbox = (formula: string) => {
    setTestFormula(formula);
    const res = evaluateFormula(formula, {});
    setLocalEvalResult(res);
    setAiAnalysis(null);
  };

  return (
    <div id="formula-lab-container" className="space-y-6">
      {/* Top Banner */}
      <div
        id="formula-lab-header"
        className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Code className="w-5 h-5 text-emerald-600" />
            Excel Formül Laboratuvarı & Sözlük
          </h1>
          <p className="text-xs text-slate-600 mt-1">
            Türkçe ve İngilizce Excel fonksiyonlarını keşfedin, sözdizimini öğrenin, canlı test edin ve yapay zeka ile hata ayıklayın.
          </p>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto">
          <input
            id="formula-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Formül veya açıklama ara..."
            className="text-xs px-3.5 py-2 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 w-full sm:w-60"
          />
        </div>
      </div>

      {/* Categories Horizontal Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Grid: Catalog List (Left) + Sandbox & Detail (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Catalog items */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 h-[720px] flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Fonksiyon Listesi ({filteredItems.length})
            </span>
            <span className="text-[11px] text-slate-600">TR (EN)</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
            {filteredItems.map((item) => {
              const isSelected = activeItem.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveItem(item);
                    loadExampleIntoSandbox(item.example);
                  }}
                  className={`w-full text-left p-3 rounded-xl text-xs transition-all flex items-start justify-between gap-2 ${
                    isSelected
                      ? "bg-emerald-50/80 border border-emerald-300 text-emerald-950 font-semibold"
                      : "hover:bg-slate-50 border border-transparent text-slate-700"
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono font-bold text-slate-900">
                        {item.turkishName}
                      </span>
                      <span className="font-mono text-slate-600 text-[11px]">
                        ({item.englishName})
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 truncate mt-0.5">
                      {item.description}
                    </p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 shrink-0">
                    {item.category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Sandbox & Deep Analysis */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Function Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg font-mono font-extrabold text-slate-900">
                  {activeItem.turkishName}
                </span>
                <span className="text-sm font-mono text-slate-600 font-semibold">
                  (İngilizce: {activeItem.englishName})
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                  {activeItem.category}
                </span>
              </div>

              <button
                onClick={() =>
                  loadExampleIntoSandbox(activeItem.example)
                }
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
              >
                <Play className="w-3 h-3 fill-emerald-600" />
                Örneği Sandbox'a Yükle
              </button>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              {activeItem.description}
            </p>

            {/* Syntax snippet */}
            <div className="p-3.5 rounded-xl bg-slate-900 text-white font-mono text-xs sm:text-sm flex items-center justify-between gap-2 overflow-x-auto">
              <code>{activeItem.syntax}</code>
              <button
                onClick={() => handleCopy("syntax", activeItem.syntax)}
                className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors shrink-0"
                title="Sözdizimini Kopyala"
              >
                {copiedId === "syntax" ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Pro Tip */}
            <div className="p-3 bg-amber-50/70 border border-amber-200/70 rounded-xl text-xs text-amber-900 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong>Profesyonel İpucu:</strong> {activeItem.proTip}
              </div>
            </div>
          </div>

          {/* Live Formula Sandbox */}
          <div className="bg-white rounded-2xl border-2 border-emerald-500/30 shadow-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-600" />
                Canlı Formül Test Alanı (Sandbox)
              </h3>
              <span className="text-[11px] text-slate-600">
                Türkiye ayırıcı kuralı: Noktalı virgül (;)
              </span>
            </div>

            {/* Sandbox Input */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                id="sandbox-formula-input"
                type="text"
                value={testFormula}
                onChange={(e) => setTestFormula(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRunFormula()}
                placeholder="=TOPLA(10; 25; 35) veya =EĞER(...) yazın"
                className="flex-1 font-mono text-sm px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
              />
              <button
                id="btn-run-sandbox"
                onClick={handleRunFormula}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                Çalıştır
              </button>
            </div>

            {/* Output Result */}
            {localEvalResult !== null && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-600 block">
                    Hesaplanan Sonuç:
                  </span>
                  <span className="font-mono text-lg font-bold text-emerald-700">
                    {String(localEvalResult)}
                  </span>
                </div>
                <button
                  onClick={() =>
                    handleCopy("result", String(localEvalResult))
                  }
                  className="p-2 text-slate-500 hover:bg-slate-200 rounded-lg transition-colors"
                  title="Sonucu Kopyala"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* AI Analysis Buttons */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-700 mr-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                Yapay Zeka Analizleri:
              </span>

              <button
                id="btn-ai-explain"
                onClick={() => handleAIAnalyze("explain")}
                disabled={isAnalyzing}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors disabled:opacity-50"
              >
                🔍 Mantığını Açıkla
              </button>

              <button
                id="btn-ai-optimize"
                onClick={() => handleAIAnalyze("optimize")}
                disabled={isAnalyzing}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 transition-colors disabled:opacity-50"
              >
                ⚡ Optimize Et / Alternatifler
              </button>

              <button
                id="btn-ai-debug"
                onClick={() => handleAIAnalyze("debug")}
                disabled={isAnalyzing}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors disabled:opacity-50"
              >
                🛠 Hata Ayıkla & Düzelt
              </button>
            </div>

            {/* AI Analysis Result Card */}
            {isAnalyzing && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                Yapay zeka formülü analiz ediyor...
              </div>
            )}

            {aiAnalysis && !isAnalyzing && (
              <div
                id="ai-analysis-card"
                className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    {aiAnalysis.turkishName} Analiz Raporu
                  </span>
                  <span className="font-mono text-slate-500 text-[11px]">
                    İngilizce: {aiAnalysis.englishEquivalent}
                  </span>
                </div>

                <p className="text-slate-700 leading-relaxed">
                  {aiAnalysis.summary}
                </p>

                {aiAnalysis.argumentsList && aiAnalysis.argumentsList.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="font-bold text-slate-800 block">
                      Parametre Detayları:
                    </span>
                    {aiAnalysis.argumentsList.map((arg, idx) => (
                      <div
                        key={idx}
                        className="bg-white p-2 rounded-lg border border-slate-200 flex items-start gap-2"
                      >
                        <code className="text-emerald-700 font-mono font-bold shrink-0">
                          {arg.name}
                        </code>
                        <span className="text-slate-600">{arg.desc}</span>
                      </div>
                    ))}
                  </div>
                )}

                {aiAnalysis.optimizationTip && (
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900">
                    <strong>Tavsiye:</strong> {aiAnalysis.optimizationTip}
                  </div>
                )}

                {aiAnalysis.commonErrors && aiAnalysis.commonErrors.length > 0 && (
                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
                    <strong>Sık Yapılan Hatalar:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-0.5">
                      {aiAnalysis.commonErrors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
