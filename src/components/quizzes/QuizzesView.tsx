import React, { useState } from "react";
import {
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Award,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Clock,
  BookOpen,
  Check,
  X,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import confetti from "canvas-confetti";
import { NavigationTab, Quiz, QuizQuestion, UserProgress } from "../../types";
import { QUIZZES } from "../../data/quizData";
import { recordQuizCompletion, addXpToUser } from "../../services/storageService";

interface QuizzesViewProps {
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
  onNavigate: (tab: NavigationTab, payload?: string) => void;
}

export const QuizzesView: React.FC<QuizzesViewProps> = ({
  progress,
  onUpdateProgress,
  onNavigate,
}) => {
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: string]: string | number }>({});
  const [questionSubmitted, setQuestionSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizResultSummary, setQuizResultSummary] = useState<{
    score: number;
    passed: boolean;
    earnedXp: number;
    weakTopics: string[];
  } | null>(null);

  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuestionSubmitted(false);
    setQuizFinished(false);
    setQuizResultSummary(null);
  };

  const handleAnswerSelect = (answer: string | number) => {
    if (!activeQuiz || questionSubmitted) return;
    const q = activeQuiz.questions[currentQuestionIndex];
    setUserAnswers((prev) => ({ ...prev, [q.id]: answer }));
  };

  const handleSubmitQuestion = () => {
    setQuestionSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (!activeQuiz) return;
    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setQuestionSubmitted(false);
    } else {
      // Calculate results
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    if (!activeQuiz) return;

    let correctCount = 0;
    const topicPerformance: { [topic: string]: { isCorrect: boolean } } = {};

    activeQuiz.questions.forEach((q) => {
      const userAns = userAnswers[q.id];
      let isCorrect = false;

      if (q.type === "formula-writing") {
        const cleanUser = String(userAns || "").trim().toUpperCase().replace(/\s+/g, "");
        const cleanExp = String(q.correctAnswer).trim().toUpperCase().replace(/\s+/g, "");
        isCorrect = cleanUser === cleanExp;
      } else {
        isCorrect = Number(userAns) === Number(q.correctAnswer);
      }

      if (isCorrect) correctCount++;
      topicPerformance[q.topic] = { isCorrect };
    });

    const score = Math.round((correctCount / activeQuiz.questions.length) * 100);
    const passed = score >= activeQuiz.passingScore;
    const earnedXp = passed ? activeQuiz.xpReward : Math.round(activeQuiz.xpReward * 0.3);

    const { updatedProgress, newlyWeakTopics } = recordQuizCompletion(
      activeQuiz.id,
      score,
      topicPerformance,
      progress
    );

    const withXp = addXpToUser(earnedXp, updatedProgress);
    onUpdateProgress(withXp.updatedProgress);

    if (passed) {
      try {
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    }

    setQuizResultSummary({
      score,
      passed,
      earnedXp,
      weakTopics: newlyWeakTopics,
    });
    setQuizFinished(true);
  };

  return (
    <div id="quizzes-view-container" className="space-y-6">
      {/* If no active quiz, display Quiz Directory */}
      {!activeQuiz && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                Excel Seviye & Yeterlilik Testleri
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Her seviyenin sonunda bilginizi ölçün, zayıf olduğunuz konuları tespit edin ve seviye sertifikası XP'si kazanın.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs text-slate-600 block">Tamamlanan Quiz</span>
                <span className="text-sm font-bold text-slate-900">
                  {Object.keys(progress.completedQuizzes).length} / {QUIZZES.length}
                </span>
              </div>
            </div>
          </div>

          {/* Quiz Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {QUIZZES.map((quiz) => {
              const quizRecord = progress.completedQuizzes[quiz.id];
              const bestScore = progress.quizScores[quiz.id] || 0;
              const isPassed = quizRecord?.passed || false;

              return (
                <div
                  key={quiz.id}
                  id={`quiz-card-${quiz.id}`}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Seviye {quiz.levelId}
                      </span>
                      <div className="flex items-center gap-2">
                        {isPassed && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            Geçildi (%{bestScore})
                          </span>
                        )}
                        <span className="text-xs font-bold text-amber-600">
                          +{quiz.xpReward} XP
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {quiz.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {quiz.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-600 pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {quiz.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <HelpCircle className="w-3.5 h-3.5" />
                        {quiz.questions.length} Soru
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" />
                        Baraj: %{quiz.passingScore}
                      </span>
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-600">
                      {quizRecord ? "Tekrar çözerek pekiştir" : "Henüz çözülmedi"}
                    </span>
                    <button
                      id={`btn-start-quiz-${quiz.id}`}
                      onClick={() => handleStartQuiz(quiz)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                    >
                      {quizRecord ? "Tekrar Başlat" : "Quize Başla"}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Quiz View */}
      {activeQuiz && !quizFinished && (
        <div id="active-quiz-container" className="max-w-3xl mx-auto space-y-6">
          {/* Header Bar */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveQuiz(null)}
                className="text-xs text-slate-600 hover:text-slate-800 font-semibold"
              >
                ← Vazgeç
              </button>
              <div className="h-4 w-px bg-slate-200" />
              <span className="text-xs font-bold text-slate-800">
                {activeQuiz.title}
              </span>
            </div>

            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Soru {currentQuestionIndex + 1} / {activeQuiz.questions.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-full transition-all duration-300"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100
                }%`,
              }}
            />
          </div>

          {/* Question Card */}
          {(() => {
            const currentQ = activeQuiz.questions[currentQuestionIndex];
            const selectedAns = userAnswers[currentQ.id];

            return (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-600">
                    Konu: {currentQ.topic}
                  </span>
                  <span className="text-xs text-slate-600 uppercase font-mono">
                    {currentQ.type}
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-semibold text-slate-900 leading-snug quiz-question-title">
                  {currentQ.question}
                </h2>

                {currentQ.codeSnippet && (
                  <pre className="font-mono text-xs bg-slate-900 text-slate-100 p-3 rounded-xl overflow-x-auto border border-slate-800">
                    {currentQ.codeSnippet}
                  </pre>
                )}

                {/* Multiple choice or true/false options */}
                {currentQ.options && (
                  <div className="space-y-3">
                    {currentQ.options.map((optionText, optIdx) => {
                      const isSelected = Number(selectedAns) === optIdx;
                      const isCorrectAnswer =
                        Number(currentQ.correctAnswer) === optIdx;

                      let cardStyle =
                        "bg-white border-[#D1D5DB] text-[#111827] hover:bg-[#F0FDF4] hover:border-[#16A34A]";
                      let badgeStyle =
                        "border-slate-300 bg-slate-100 text-slate-800";
                      let textStyle = "text-[#111827] font-medium";

                      if (questionSubmitted) {
                        if (isCorrectAnswer) {
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
                          cardStyle =
                            "bg-white border-slate-200 text-[#111827] opacity-80";
                          badgeStyle =
                            "border-slate-300 bg-slate-100 text-slate-700";
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
                          disabled={questionSubmitted}
                          onClick={() => handleAnswerSelect(optIdx)}
                          className={`quiz-option-card w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between cursor-pointer ${cardStyle}`}
                        >
                          <div className="flex items-center gap-3.5">
                            <span
                              className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${badgeStyle}`}
                            >
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className={`quiz-option-label text-sm leading-relaxed ${textStyle}`}>
                              {optionText}
                            </span>
                          </div>
                          {questionSubmitted && isCorrectAnswer && (
                            <Check className="w-5 h-5 text-emerald-700 stroke-[3] shrink-0" />
                          )}
                          {questionSubmitted && isSelected && !isCorrectAnswer && (
                            <X className="w-5 h-5 text-rose-700 stroke-[3] shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Formula writing prompt */}
                {currentQ.type === "formula-writing" && (
                  <div className="space-y-3">
                    <input
                      type="text"
                      disabled={questionSubmitted}
                      value={String(selectedAns || "")}
                      onChange={(e) => handleAnswerSelect(e.target.value)}
                      placeholder="=TOPLA(A1:A10) şeklinde formülünüzü yazın..."
                      className="w-full font-mono text-sm px-4 py-3 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                )}

                {/* Explanation block when submitted */}
                {questionSubmitted && (
                  <div
                    id="question-explanation-box"
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 space-y-1"
                  >
                    <p className="font-bold text-slate-900">Çözüm ve Açıklama:</p>
                    <p className="leading-relaxed">{currentQ.explanation}</p>
                  </div>
                )}

                {/* Action button */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  {!questionSubmitted ? (
                    <button
                      id="btn-confirm-question-answer"
                      onClick={handleSubmitQuestion}
                      disabled={selectedAns === undefined || selectedAns === ""}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors disabled:opacity-40"
                    >
                      Cevabı Onayla
                    </button>
                  ) : (
                    <button
                      id="btn-next-quiz-question"
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2"
                    >
                      {currentQuestionIndex < activeQuiz.questions.length - 1
                        ? "Sonraki Soru"
                        : "Sonuçları Gör"}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Quiz Result Summary */}
      {activeQuiz && quizFinished && quizResultSummary && (
        <div
          id="quiz-result-summary"
          className="max-w-2xl mx-auto bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-6 text-center"
        >
          <div
            className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-white ${
              quizResultSummary.passed ? "bg-emerald-600 shadow-md" : "bg-amber-600 shadow-md"
            }`}
          >
            {quizResultSummary.passed ? (
              <Award className="w-8 h-8" />
            ) : (
              <AlertCircle className="w-8 h-8" />
            )}
          </div>

          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              {quizResultSummary.passed
                ? "Tebrikler! Seviye Testini Geçtiniz 🎉"
                : "Güzel Deneme! Biraz Daha Pratik Yapalım"}
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              {activeQuiz.title}
            </p>
          </div>

          {/* Stats Badges */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-600 block">Başarı Puanı</span>
              <span className="text-lg font-bold text-slate-900">
                %{quizResultSummary.score}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-600 block">Kazanılan XP</span>
              <span className="text-lg font-bold text-amber-600">
                +{quizResultSummary.earnedXp} XP
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-[11px] text-slate-600 block">Baraj Notu</span>
              <span className="text-lg font-bold text-slate-700">
                %{activeQuiz.passingScore}
              </span>
            </div>
          </div>

          {/* Weak topics diagnosis if any */}
          {quizResultSummary.weakTopics.length > 0 && (
            <div
              id="quiz-weak-topics-box"
              className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-left space-y-2"
            >
              <h3 className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                Geliştirilmesi Gereken Konular Tespit Edildi:
              </h3>
              <p className="text-xs text-amber-800">
                Şu konularda birkaç yanlış cevap verildi:{" "}
                <strong>{quizResultSummary.weakTopics.join(", ")}</strong>
              </p>
              <button
                id="btn-learn-weak-topics"
                onClick={() =>
                  onNavigate(
                    "ai-teacher",
                    `Quizde ${quizResultSummary.weakTopics.join(", ")} konularında zorlandım. Bu konularda bana adım adım pratik yaptırabilir misin?`
                  )
                }
                className="mt-1 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-colors inline-flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Yapay Zeka ile Bu Konuları Çalış
              </button>
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => handleStartQuiz(activeQuiz)}
              className="px-5 py-2.5 border border-slate-300 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Tekrar Çöz
            </button>
            <button
              onClick={() => setActiveQuiz(null)}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
            >
              Tüm Quizlere Dön
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
