import React, { useState, useEffect, useMemo } from "react";
import {
  BookOpen,
  CheckCircle2,
  Lock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  Check,
  AlertCircle,
  RefreshCw,
  Award,
  ChevronRight,
  ChevronDown,
  Filter,
  Search,
  CheckCircle,
  HelpCircle,
  Zap,
  Target,
  FileSpreadsheet,
  Layers,
  Clock,
  RotateCcw,
} from "lucide-react";
import confetti from "canvas-confetti";
import { Lesson, LevelId, NavigationTab, UserProgress, LessonPracticeExercise } from "../../types";
import { LESSONS, LEVELS, checkLessonPrerequisites, getLessonById } from "../../data/curriculumData";
import { addXpToUser, markLessonComplete } from "../../services/storageService";
import { evaluateStudentAnswerWithAI } from "../../services/aiService";
import { evaluateFormula } from "../../utils/spreadsheetEngine";

interface LessonsViewProps {
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
  onNavigate: (tab: NavigationTab, payload?: string) => void;
  selectedLessonId?: string;
}

export const LessonsView: React.FC<LessonsViewProps> = ({
  progress,
  onUpdateProgress,
  onNavigate,
  selectedLessonId,
}) => {
  // Navigation & Filtering state
  const [selectedLevelId, setSelectedLevelId] = useState<LevelId | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<"all" | "completed" | "uncompleted">("all");
  const [showFilters, setShowFilters] = useState(false);

  // Active Lesson state
  const [activeLesson, setActiveLesson] = useState<Lesson>(() => {
    if (selectedLessonId) {
      const found = LESSONS.find((l) => l.id === selectedLessonId);
      if (found) return found;
    }
    const firstIncomplete = LESSONS.find((l) => !progress.completedLessons.includes(l.id));
    return firstIncomplete || LESSONS[0];
  });

  // Practice Exercise state
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [selectedCell, setSelectedCell] = useState<string>("A1");
  const [isChecking, setIsChecking] = useState(false);
  const [attemptCount, setAttemptCount] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<number[]>([]);
  const [taskFeedback, setTaskFeedback] = useState<{
    status: "idle" | "correct" | "incorrect";
    message: string;
    hint?: string | null;
    showSolution?: boolean;
    correctFormula?: string | null;
  }>({ status: "idle", message: "" });

  // Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<{ [qIndex: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [theoryRead, setTheoryRead] = useState(false);

  // Synchronize when selectedLessonId prop changes
  useEffect(() => {
    if (selectedLessonId) {
      const match = LESSONS.find((l) => l.id === selectedLessonId);
      if (match) {
        setActiveLesson(match);
      }
    }
  }, [selectedLessonId]);

  // Reset exercise and quiz when activeLesson changes
  useEffect(() => {
    setCurrentExerciseIndex(0);
    setUserAnswer("");
    const currentEx = activeLesson.practiceExercises?.[0];
    setSelectedCell(currentEx ? currentEx.targetCell : "C2");
    setAttemptCount(0);
    setCompletedExercises([]);
    setTaskFeedback({ status: "idle", message: "" });
    setCurrentQuizIndex(0);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setTheoryRead(progress.completedLessons.includes(activeLesson.id));
  }, [activeLesson.id, progress.completedLessons]);

  // Current active exercise
  const currentExercise: LessonPracticeExercise = useMemo(() => {
    if (activeLesson.practiceExercises && activeLesson.practiceExercises.length > 0) {
      return activeLesson.practiceExercises[currentExerciseIndex] || activeLesson.practiceExercises[0];
    }
    return {
      prompt: activeLesson.interactiveTask?.prompt || "Formülü uygulayın.",
      targetCell: activeLesson.interactiveTask?.targetCell || "C2",
      expectedFormula: activeLesson.interactiveTask?.expectedFormula || "=A2+B2",
      hint: activeLesson.interactiveTask?.hint || "Formülü girin.",
      table: activeLesson.interactiveTask?.initialData || { headers: ["A", "B", "Sonuç"], rows: [[10, 20, ""]] }
    };
  }, [activeLesson, currentExerciseIndex]);

  // Current quiz question
  const currentQuiz = useMemo(() => {
    if (activeLesson.quizQuestions && activeLesson.quizQuestions.length > 0) {
      return activeLesson.quizQuestions[currentQuizIndex] || activeLesson.quizQuestions[0];
    }
    return {
      question: activeLesson.miniQuiz?.question || "Bu konu hakkında hangisi doğrudur?",
      options: activeLesson.miniQuiz?.options || ["Doğru", "Yanlış"],
      correctIndex: activeLesson.miniQuiz?.correctIndex ?? 0,
      explanation: activeLesson.miniQuiz?.explanation || "Açıklama"
    };
  }, [activeLesson, currentQuizIndex]);

  // Check locking
  const prereqCheck = useMemo(() => {
    return checkLessonPrerequisites(activeLesson, progress.completedLessons);
  }, [activeLesson, progress.completedLessons]);

  // Filtered lessons
  const filteredLessons = useMemo(() => {
    return LESSONS.filter((lesson) => {
      // Level filter
      if (selectedLevelId !== "all" && lesson.level !== selectedLevelId) return false;

      // Status filter
      const isComp = progress.completedLessons.includes(lesson.id);
      if (selectedStatus === "completed" && !isComp) return false;
      if (selectedStatus === "uncompleted" && isComp) return false;

      // Difficulty filter
      if (selectedDifficulty !== "all" && lesson.difficulty !== selectedDifficulty) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = lesson.title.toLowerCase().includes(q);
        const inDesc = lesson.description.toLowerCase().includes(q);
        const inObj = lesson.learningObjectives?.some((obj) => obj.toLowerCase().includes(q));
        const inSnippet = lesson.formulaSnippet?.toLowerCase().includes(q);
        const inEx = lesson.examples?.some((ex) => ex.formula?.toLowerCase().includes(q));
        if (!inTitle && !inDesc && !inObj && !inSnippet && !inEx) return false;
      }

      return true;
    });
  }, [selectedLevelId, selectedStatus, selectedDifficulty, searchQuery, progress.completedLessons]);

  const isCompleted = progress.completedLessons.includes(activeLesson.id);

  // Check whether completion criteria are met
  const canMarkLessonComplete = useMemo(() => {
    const totalEx = activeLesson.practiceExercises?.length || 1;
    const allExDone = completedExercises.length >= totalEx;
    const quizDone = quizSubmitted;
    return (allExDone && quizDone) || isCompleted;
  }, [activeLesson, completedExercises, quizSubmitted, isCompleted]);

  // Handle Practice Exercise Checking
  const handleCheckExercise = async () => {
    if (!userAnswer.trim()) {
      setTaskFeedback({
        status: "incorrect",
        message: "Lütfen hedef hücreye bir formül veya değer yazın.",
      });
      return;
    }

    setIsChecking(true);
    const newAttempt = attemptCount + 1;
    setAttemptCount(newAttempt);

    try {
      const cleanUser = userAnswer.trim().toUpperCase().replace(/\s+/g, "");
      const cleanExpected = currentExercise.expectedFormula.trim().toUpperCase().replace(/\s+/g, "");

      let isCorrect = cleanUser === cleanExpected;

      if (!isCorrect && userAnswer.startsWith("=")) {
        const userComputed = evaluateFormula(userAnswer, {});
        const expComputed = evaluateFormula(currentExercise.expectedFormula, {});
        if (
          userComputed !== "#HATA!" &&
          userComputed !== "#DEĞER!" &&
          userComputed === expComputed
        ) {
          isCorrect = true;
        }
      }

      if (isCorrect) {
        setTaskFeedback({
          status: "correct",
          message: "Mükemmel! Formülünüz doğru ve beklenen sonucu başarıyla üretti.",
        });

        if (!completedExercises.includes(currentExerciseIndex)) {
          setCompletedExercises((prev) => [...prev, currentExerciseIndex]);
        }

        // Check if all exercises are now done
        const totalEx = activeLesson.practiceExercises?.length || 1;
        if (completedExercises.length + 1 >= totalEx && !isCompleted && quizSubmitted) {
          completeLesson();
        }
      } else {
        const aiResult = await evaluateStudentAnswerWithAI(
          currentExercise.prompt,
          currentExercise.expectedFormula,
          userAnswer,
          newAttempt
        );

        if (aiResult.isCorrect) {
          setTaskFeedback({
            status: "correct",
            message: aiResult.feedback || "Tebrikler! Doğru formülü oluşturdunuz.",
          });
          if (!completedExercises.includes(currentExerciseIndex)) {
            setCompletedExercises((prev) => [...prev, currentExerciseIndex]);
          }
          const totalEx = activeLesson.practiceExercises?.length || 1;
          if (completedExercises.length + 1 >= totalEx && !isCompleted && quizSubmitted) {
            completeLesson();
          }
        } else {
          setTaskFeedback({
            status: "incorrect",
            message: aiResult.feedback || "Formülünüzde ufak bir hata var. Lütfen tekrar gözden geçirin.",
            hint: aiResult.hint || currentExercise.hint,
            showSolution: aiResult.showSolution,
            correctFormula: aiResult.correctFormula,
          });
        }
      }
    } catch {
      setTaskFeedback({
        status: "incorrect",
        message: "Lütfen girdiğiniz formülün yazımını kontrol edin.",
        hint: currentExercise.hint,
      });
    } finally {
      setIsChecking(false);
    }
  };

  // Complete lesson and award XP
  const completeLesson = () => {
    if (isCompleted) return;

    try {
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    const updated = markLessonComplete(activeLesson.id, progress);
    const { updatedProgress } = addXpToUser(activeLesson.xpReward, updated);
    onUpdateProgress(updatedProgress);
  };

  // Handle Quiz selection
  const handleQuizAnswer = (optIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [currentQuizIndex]: optIndex }));
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    const totalEx = activeLesson.practiceExercises?.length || 1;
    if (completedExercises.length >= totalEx && !isCompleted) {
      completeLesson();
    }
  };

  // Switch Exercise Tab
  const handleSelectExercise = (idx: number) => {
    setCurrentExerciseIndex(idx);
    setUserAnswer("");
    const ex = activeLesson.practiceExercises?.[idx];
    if (ex) {
      setSelectedCell(ex.targetCell);
    }
    setTaskFeedback({ status: "idle", message: "" });
  };

  // Prev / Next lesson
  const currentIdx = LESSONS.findIndex((l) => l.id === activeLesson.id);
  const prevLesson = currentIdx > 0 ? LESSONS[currentIdx - 1] : null;
  const nextLesson = currentIdx < LESSONS.length - 1 ? LESSONS[currentIdx + 1] : null;

  return (
    <div id="lessons-view-container" className="space-y-6 pb-16">
      {/* Top Banner: Excel Journey / Levels Progress Map */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600" />
              Excel Akademi Müfredatı (218 Ders • 8 Seviye)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Sıfırdan kurumsal uzmanlığa giden eksiksiz eğitim yolculuğun
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
              {progress.completedLessons.length} / {LESSONS.length} Ders Tamamlandı (%{Math.round((progress.completedLessons.length / LESSONS.length) * 100)})
            </span>
          </div>
        </div>

        {/* Level Trackers Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {LEVELS.map((lvl) => {
            const lessonsInLvl = LESSONS.filter((l) => l.level === lvl.id);
            const completedInLvl = lessonsInLvl.filter((l) => progress.completedLessons.includes(l.id)).length;
            const pct = Math.round((completedInLvl / lessonsInLvl.length) * 100);
            const isSelected = selectedLevelId === lvl.id;
            const isLevelUnlocked = progress.level >= lvl.id || lvl.id === 0 || completedInLvl > 0;

            return (
              <button
                key={lvl.id}
                id={`level-card-${lvl.id}`}
                onClick={() => setSelectedLevelId(selectedLevelId === lvl.id ? "all" : lvl.id)}
                className={`p-2.5 rounded-xl border text-left transition-all relative overflow-hidden ${
                  isSelected
                    ? "bg-emerald-50 border-emerald-500 shadow-xs ring-1 ring-emerald-500"
                    : "bg-slate-50/70 hover:bg-slate-100/80 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                    {lvl.badge}
                  </span>
                  {!isLevelUnlocked ? (
                    <Lock className="w-3 h-3 text-slate-400" />
                  ) : pct === 100 ? (
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                  ) : null}
                </div>
                <p className="text-xs font-bold text-slate-800 truncate">{lvl.title}</p>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                  <span>{completedInLvl}/{lessonsInLvl.length}</span>
                  <span className="font-bold text-emerald-700">%{pct}</span>
                </div>
                {/* Mini Progress Bar */}
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              id="lesson-search-input"
              type="text"
              placeholder="Fonksiyon veya konu ara (örn: DÜŞEYARA, XLOOKUP, Pivot, EĞER)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-slate-50/50"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              showFilters ? "bg-emerald-50 border-emerald-300 text-emerald-700" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            Filtreler
          </button>
        </div>

        <div className="flex items-center gap-2">
          {selectedLevelId !== "all" && (
            <button
              onClick={() => setSelectedLevelId("all")}
              className="text-xs text-emerald-700 font-semibold hover:underline"
            >
              Filtreyi Temizle (Tüm Dersler)
            </button>
          )}
          <span className="text-xs text-slate-500 font-medium">
            {filteredLessons.length} ders listeleniyor
          </span>
        </div>

        {/* Expanded Filters Drawer */}
        {showFilters && (
          <div className="w-full pt-3 mt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">Seviye</label>
              <select
                value={selectedLevelId}
                onChange={(e) => setSelectedLevelId(e.target.value === "all" ? "all" : Number(e.target.value) as LevelId)}
                className="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white"
              >
                <option value="all">Tüm Seviyeler (0-7)</option>
                {LEVELS.map((lvl) => (
                  <option key={lvl.id} value={lvl.id}>
                    {lvl.badge}: {lvl.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">Tamamlanma Durumu</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as any)}
                className="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white"
              >
                <option value="all">Tümü</option>
                <option value="completed">Tamamlananlar</option>
                <option value="uncompleted">Tamamlanmayanlar</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">Zorluk</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full text-xs p-2 border border-slate-200 rounded-lg bg-white"
              >
                <option value="all">Tüm Zorluklar</option>
                <option value="Başlangıç">Başlangıç</option>
                <option value="Temel">Temel</option>
                <option value="Orta">Orta</option>
                <option value="İleri">İleri</option>
                <option value="Uzman">Uzman</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Layout: Directory Sidebar (col-span-4) + Active Lesson Canvas (col-span-8) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Lesson Directory */}
        <div
          id="lessons-directory-panel"
          className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 flex flex-col h-[780px]"
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              Dersler Listesi
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              {filteredLessons.length} Ders
            </span>
          </div>

          <div
            id="lessons-scroll-list"
            className="flex-1 overflow-y-auto pr-1 space-y-1.5 divide-y divide-slate-50"
          >
            {filteredLessons.map((lesson) => {
              const completed = progress.completedLessons.includes(lesson.id);
              const isCurrent = lesson.id === activeLesson.id;
              const checkPrereq = checkLessonPrerequisites(lesson, progress.completedLessons);

              return (
                <button
                  key={lesson.id}
                  id={`lesson-item-${lesson.id}`}
                  onClick={() => setActiveLesson(lesson)}
                  className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 pt-2.5 ${
                    isCurrent
                      ? "bg-emerald-50/90 border border-emerald-300 shadow-xs"
                      : "hover:bg-slate-50 border border-transparent"
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {completed ? (
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    ) : checkPrereq.isLocked ? (
                      <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                        <Lock className="w-3 h-3" />
                      </div>
                    ) : (
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isCurrent ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {lesson.lessonNumber}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold text-slate-500">
                        {lesson.levelTitle}
                      </span>
                      <span className="text-[10px] text-slate-400">• {lesson.duration}</span>
                    </div>
                    <p
                      className={`text-xs font-semibold truncate mt-0.5 ${
                        isCurrent ? "text-emerald-950 font-bold" : "text-slate-800"
                      }`}
                    >
                      Ders {lesson.lessonNumber}: {lesson.title}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {lesson.description}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[11px] font-bold text-amber-600">
                      +{lesson.xpReward} XP
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Lesson Workspace */}
        <div id="active-lesson-canvas" className="lg:col-span-8 space-y-6">
          {/* Active Lesson Header Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-800">
                  {activeLesson.levelTitle}
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-700">
                  Ders {activeLesson.lessonNumber}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  ⏱ {activeLesson.duration}
                </span>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
                  +{activeLesson.xpReward} XP
                </span>
              </div>

              <div className="flex items-center gap-2">
                {isCompleted ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Tamamlandı
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                    Devam Ediyor
                  </span>
                )}
                <button
                  id="btn-ask-ai-about-lesson"
                  onClick={() =>
                    onNavigate(
                      "ai-teacher",
                      `Şu an '${activeLesson.title}' (Ders ${activeLesson.lessonNumber}) dersindeyim. ${activeLesson.description} konusunu bana pratik örneklerle özetler misin?`
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200/80 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Öğretmene Sor
                </button>
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {activeLesson.title}
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              {activeLesson.description}
            </p>

            {/* Prerequisites Banner if locked */}
            {prereqCheck.isLocked && (
              <div className="mt-4 p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 flex items-start gap-3">
                <Lock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p className="font-bold">Bu ders için ön koşul dersleri tamamlamanız önerilir:</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {prereqCheck.missingPrerequisites.map((req) => (
                      <button
                        key={req.id}
                        onClick={() => setActiveLesson(req)}
                        className="px-2.5 py-1 rounded bg-white hover:bg-amber-100 border border-amber-300 font-semibold text-amber-950 transition-colors inline-flex items-center gap-1"
                      >
                        <ChevronRight className="w-3 h-3" />
                        Ders {req.lessonNumber}: {req.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Learning Objectives */}
          {activeLesson.learningObjectives && activeLesson.learningObjectives.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-600" />
                Dersin Öğrenme Hedefleri
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeLesson.learningObjectives.map((obj, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Theory & Explanation */}
          <div id="lesson-theory-section" className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                1. Konu Anlatımı ve Mantık
              </h2>
              <button
                onClick={() => setTheoryRead(true)}
                className={`text-xs px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-colors ${
                  theoryRead ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Check className="w-3.5 h-3.5" />
                {theoryRead ? "Okundu Olarak İşaretlendi" : "Okudum"}
              </button>
            </div>

            <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
              {activeLesson.theory.map((para, idx) => (
                <div key={idx} className="bg-slate-50/80 p-3.5 rounded-xl border border-slate-100">
                  {para}
                </div>
              ))}
            </div>

            {/* Examples section */}
            {activeLesson.examples && activeLesson.examples.length > 0 && (
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Örnekler & Formül Sözdizimi
                </h3>
                <div className="space-y-3">
                  {activeLesson.examples.map((ex, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-400">{ex.title}</span>
                        {ex.formula && (
                          <span className="text-[10px] font-mono text-slate-400">Türkiye Standardı (;)</span>
                        )}
                      </div>
                      {ex.formula && (
                        <div className="p-2.5 rounded-lg bg-slate-800 font-mono text-sm text-emerald-300 font-bold overflow-x-auto">
                          {ex.formula}
                        </div>
                      )}
                      <p className="text-xs text-slate-300">{ex.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Real World Example */}
            {activeLesson.realWorldExample && (
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-amber-950 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-600" />
                    Gerçek İş Dünyası Senaryosu
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200/70 text-amber-900">
                    {activeLesson.realWorldExample.department}
                  </span>
                </div>
                <p className="text-xs leading-relaxed">{activeLesson.realWorldExample.scenario}</p>
                <p className="text-xs font-semibold text-emerald-800 pt-1">
                  🎯 Sonuç: {activeLesson.realWorldExample.outcome}
                </p>
              </div>
            )}

            {/* Step-by-Step Guide */}
            {activeLesson.stepByStep && activeLesson.stepByStep.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Adım Adım Uygulama Rehberi
                </h3>
                <div className="space-y-1.5">
                  {activeLesson.stepByStep.map((step, idx) => (
                    <div key={idx} className="text-xs text-slate-700 flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Common Mistakes & Pro Tips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {activeLesson.commonMistakes && activeLesson.commonMistakes.length > 0 && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 space-y-1">
                  <span className="text-xs font-bold flex items-center gap-1 text-rose-800">
                    <AlertCircle className="w-3.5 h-3.5" /> Sık Yapılan Hatalar
                  </span>
                  <ul className="text-[11px] list-disc list-inside space-y-0.5 text-rose-900">
                    {activeLesson.commonMistakes.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              {activeLesson.tips && activeLesson.tips.length > 0 && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1">
                  <span className="text-xs font-bold flex items-center gap-1 text-emerald-800">
                    <Zap className="w-3.5 h-3.5" /> Uzman İpuçları
                  </span>
                  <ul className="text-[11px] list-disc list-inside space-y-0.5 text-emerald-900">
                    {activeLesson.tips.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Practice Workspace */}
          <div id="lesson-interactive-task" className="bg-white rounded-2xl border-2 border-emerald-500/40 shadow-md p-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  2. Etkileşimli Excel Simülatörü ve Uygulama
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Hedef hücreye doğru formülü girin ve canlı sonucu test edin
                </p>
              </div>

              {/* Exercise Selector Tabs if multiple */}
              {activeLesson.practiceExercises && activeLesson.practiceExercises.length > 1 && (
                <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                  {activeLesson.practiceExercises.map((_, exIdx) => {
                    const isExDone = completedExercises.includes(exIdx);
                    return (
                      <button
                        key={exIdx}
                        onClick={() => handleSelectExercise(exIdx)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                          currentExerciseIndex === exIdx
                            ? "bg-white text-emerald-800 shadow-xs"
                            : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <span>Uygulama {exIdx + 1}</span>
                        {isExDone && <Check className="w-3 h-3 text-emerald-600" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Exercise Prompt */}
            <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs font-semibold text-emerald-950 flex items-start gap-2">
              <span className="px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded font-bold shrink-0">
                Görev:
              </span>
              <span>{currentExercise.prompt}</span>
            </div>

            {/* Interactive Grid Table */}
            <div className="rounded-xl border border-slate-300 overflow-x-auto bg-white shadow-xs">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300 text-slate-600 font-mono">
                    <th className="w-10 px-2 py-1.5 text-center border-r border-slate-300 bg-slate-200/80"></th>
                    {currentExercise.table.headers.map((h, idx) => (
                      <th
                        key={idx}
                        className="px-3 py-1.5 border-r border-slate-300 font-bold text-slate-700 text-center uppercase"
                      >
                        {String.fromCharCode(65 + idx)} ({h})
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentExercise.table.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="border-b border-slate-200 hover:bg-slate-50/50">
                      <td className="px-2 py-1.5 text-center font-mono font-bold text-slate-500 bg-slate-100/70 border-r border-slate-300 select-none">
                        {rIdx + 1}
                      </td>
                      {row.map((cell, cIdx) => {
                        const cellCoord = `${String.fromCharCode(65 + cIdx)}${rIdx + 1}`;
                        const isTarget = cellCoord === currentExercise.targetCell;

                        return (
                          <td
                            key={cIdx}
                            onClick={() => setSelectedCell(cellCoord)}
                            className={`px-3 py-2 border-r border-slate-200 font-mono cursor-pointer transition-colors ${
                              isTarget
                                ? "bg-amber-50 font-bold text-amber-900 ring-2 ring-amber-400 inset-0"
                                : selectedCell === cellCoord
                                ? "bg-emerald-50 ring-1 ring-emerald-400"
                                : ""
                            }`}
                          >
                            {isTarget && userAnswer ? userAnswer : String(cell)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Formula Bar & Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2">
              <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-2 rounded-xl border border-slate-300 shrink-0 font-mono text-xs font-bold text-slate-700">
                <span>fx</span>
                <span className="text-emerald-700">{currentExercise.targetCell}:</span>
              </div>
              <input
                id="lesson-formula-input"
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCheckExercise()}
                placeholder={`Formülü yazın (örn: ${currentExercise.expectedFormula.slice(0, 10)}...)`}
                className="flex-1 font-mono text-sm px-4 py-2 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
              />
              <button
                id="btn-check-exercise"
                onClick={handleCheckExercise}
                disabled={isChecking}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isChecking ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Doğrulanıyor...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    Çalıştır & Kontrol Et
                  </>
                )}
              </button>
            </div>

            {/* Feedback Message */}
            {taskFeedback.status !== "idle" && (
              <div
                id="task-feedback-box"
                className={`p-4 rounded-xl border flex items-start gap-3 transition-all ${
                  taskFeedback.status === "correct"
                    ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                    : "bg-rose-50 border-rose-300 text-rose-900"
                }`}
              >
                {taskFeedback.status === "correct" ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 text-xs space-y-1">
                  <p className="font-semibold text-sm">{taskFeedback.message}</p>
                  {taskFeedback.hint && (
                    <p className="text-amber-800 font-medium">
                      💡 <strong>İpucu:</strong> {taskFeedback.hint}
                    </p>
                  )}
                  {taskFeedback.showSolution && taskFeedback.correctFormula && (
                    <div className="mt-2 p-2 bg-white rounded border border-rose-200">
                      <span className="font-mono text-slate-800 font-bold">
                        Doğru Çözüm: {taskFeedback.correctFormula}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mini Quiz Card */}
          <div id="lesson-mini-quiz" className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-600" />
                  3. Pekiştirme Testi & Değerlendirme
                </h2>
                <p className="text-xs text-slate-500">Konu kavrama testi</p>
              </div>

              {activeLesson.quizQuestions && activeLesson.quizQuestions.length > 1 && (
                <div className="flex items-center gap-1">
                  {activeLesson.quizQuestions.map((_, qIdx) => (
                    <button
                      key={qIdx}
                      onClick={() => setCurrentQuizIndex(qIdx)}
                      className={`w-6 h-6 rounded-full text-xs font-bold transition-all ${
                        currentQuizIndex === qIdx
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {qIdx + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <p className="quiz-question-title text-sm font-semibold text-slate-900 leading-snug">
              {currentQuiz.question}
            </p>

            <div className="space-y-2.5">
              {currentQuiz.options.map((opt, optIdx) => {
                const isSelected = quizAnswers[currentQuizIndex] === optIdx;
                let cardStyle =
                  "bg-white border-[#D1D5DB] text-[#111827] hover:bg-[#F0FDF4] hover:border-[#16A34A]";
                let badgeStyle = "border-slate-300 bg-slate-100 text-slate-800";
                let textStyle = "text-[#111827] font-medium";

                if (quizSubmitted) {
                  if (optIdx === currentQuiz.correctIndex) {
                    cardStyle =
                      "bg-[#DCFCE7] border-[#16A34A] text-[#064E3B] font-semibold is-correct ring-1 ring-[#16A34A]";
                    badgeStyle =
                      "border-emerald-600 bg-emerald-100 text-emerald-950 font-bold";
                    textStyle = "text-[#064E3B] font-semibold";
                  } else if (isSelected) {
                    cardStyle =
                      "bg-[#FEE2E2] border-[#DC2626] text-[#7F1D1D] font-semibold is-incorrect ring-1 ring-[#DC2626]";
                    badgeStyle =
                      "border-rose-600 bg-rose-100 text-rose-950 font-bold";
                    textStyle = "text-[#7F1D1D] font-semibold";
                  } else {
                    cardStyle = "bg-white border-slate-200 text-[#111827] opacity-80";
                    badgeStyle = "border-slate-300 bg-slate-100 text-slate-700";
                    textStyle = "text-[#111827]";
                  }
                } else if (isSelected) {
                  cardStyle =
                    "bg-[#F0FDF4] border-[#00A67E] text-[#111827] font-semibold ring-2 ring-[#00A67E] is-selected shadow-xs";
                  badgeStyle =
                    "border-emerald-600 bg-emerald-100 text-emerald-950 font-bold";
                  textStyle = "text-[#111827] font-semibold";
                }

                return (
                  <button
                    key={optIdx}
                    type="button"
                    disabled={quizSubmitted}
                    onClick={() => handleQuizAnswer(optIdx)}
                    className={`quiz-option-card w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${cardStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors ${badgeStyle}`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className={`quiz-option-label text-xs sm:text-sm leading-relaxed ${textStyle}`}>
                        {opt}
                      </span>
                    </div>
                    {quizSubmitted && optIdx === currentQuiz.correctIndex && (
                      <Check className="w-4 h-4 text-emerald-700 stroke-[3] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {!quizSubmitted ? (
              <button
                id="btn-submit-mini-quiz"
                onClick={handleQuizSubmit}
                disabled={quizAnswers[currentQuizIndex] === undefined}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors disabled:opacity-40"
              >
                Cevabı Onayla & Tamamla
              </button>
            ) : (
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                <strong>Pedagojik Açıklama:</strong> {currentQuiz.explanation}
              </div>
            )}
          </div>

          {/* Lesson Completion Summary Box */}
          {canMarkLessonComplete && (
            <div className="p-4 rounded-2xl bg-emerald-600 text-white shadow-lg flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-emerald-200 shrink-0" />
                <div>
                  <h4 className="font-extrabold text-sm">Tebrikler! Bu ders başarıyla tamamlandı.</h4>
                  <p className="text-xs text-emerald-100">
                    +{activeLesson.xpReward} XP profilinize eklendi. Sıradaki derse geçebilirsiniz.
                  </p>
                </div>
              </div>
              {nextLesson && (
                <button
                  onClick={() => setActiveLesson(nextLesson)}
                  className="px-4 py-2 rounded-xl bg-white text-emerald-900 font-bold text-xs hover:bg-emerald-50 transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <span>Sonraki Ders</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Bottom Navigation (Prev / Next) */}
          <div id="lesson-bottom-nav" className="flex items-center justify-between pt-2">
            {prevLesson ? (
              <button
                id="btn-prev-lesson"
                onClick={() => setActiveLesson(prevLesson)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Önceki: Ders {prevLesson.lessonNumber} ({prevLesson.title.slice(0, 18)}...)
              </button>
            ) : (
              <div />
            )}

            {nextLesson ? (
              <button
                id="btn-next-lesson"
                onClick={() => setActiveLesson(nextLesson)}
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors"
              >
                Sonraki: Ders {nextLesson.lessonNumber}
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => onNavigate("quizzes")}
                className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors"
              >
                Seviye Sınavlarına Geç
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
