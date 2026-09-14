import React, { useState } from "react";
import { CheckCircle2, Sparkles, ArrowRight, BookOpen, Clock, Target } from "lucide-react";
import { UserProgress } from "../../types";

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (data: { currentLevel: string; goal: string; dailyTime: string }) => void;
  progress: UserProgress;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onComplete }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedLevel, setSelectedLevel] = useState("Hiç bilmiyorum");
  const [selectedGoal, setSelectedGoal] = useState("İş hayatı");
  const [selectedTime, setSelectedTime] = useState("20 dakika");

  if (!isOpen) return null;

  const handleFinish = () => {
    onComplete({
      currentLevel: selectedLevel,
      goal: selectedGoal,
      dailyTime: selectedTime,
    });
  };

  const levelOptions = [
    { title: "Hiç bilmiyorum", desc: "Excel'i ilk kez açıyorum, temelden başlamak istiyorum." },
    { title: "Başlangıç", desc: "Temel hücreleri ve basit sayı girmeyi biliyorum." },
    { title: "Temel biliyorum", desc: "TOPLA, ORTALAMA gibi basit formülleri kullanabiliyorum." },
    { title: "Orta Seviye", desc: "EĞER, DÜŞEYARA mantığını biliyorum ama derinleşmek istiyorum." },
    { title: "İleri Seviye", desc: "Pivot Table ve formüllere hakimim, Dashboard ve modelleme hedefliyorum." },
  ];

  const goalOptions = [
    { title: "İş hayatı", desc: "İşimde daha hızlı, hatasız ve profesyonel raporlar hazırlamak" },
    { title: "Kariyer & Terfi", desc: "Özgeçmişimi güçlendirip yeni iş fırsatları yakalamak" },
    { title: "Veri analizi", desc: "Büyük tabloları analiz edip anlamlı içgörüler çıkarmak" },
    { title: "Okul & Üniversite", desc: "Ödevler, projeler ve akademik çalışmalar için" },
    { title: "Kişisel kullanım", desc: "Kendi bütçemi, yatırımlarımı ve işlerimi takip etmek" },
    { title: "Profesyonel Excel uzmanlığı", desc: "Şirketin aranan Excel gurusu olmak" },
  ];

  const timeOptions = [
    { title: "10 dakika", desc: "Hızlı günlük pratikler ve püf noktalar" },
    { title: "20 dakika", desc: "İdeal denge: 1 kısa ders + 1 uygulama görevi" },
    { title: "30 dakika", desc: "Hızlı ilerleme: Ders, formül çözümü ve quiz" },
    { title: "1 saat+", desc: "Tam odaklanma: Projeler ve vaka analizleri" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white text-center relative">
          <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-3 text-2xl shadow-inner">
            👋
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            Excel Akademi AI'ya Hoş Geldin
          </h2>
          <p className="text-emerald-100 text-sm mt-1 max-w-md mx-auto">
            Sana en uygun öğrenme yolunu oluşturabilmemiz için birkaç kısa soruya göz atalım.
          </p>

          {/* Stepper Dots */}
          <div className="flex justify-center gap-2 mt-4">
            <span className={`w-8 h-1.5 rounded-full transition-all ${step === 1 ? "bg-white" : "bg-white/30"}`} />
            <span className={`w-8 h-1.5 rounded-full transition-all ${step === 2 ? "bg-white" : "bg-white/30"}`} />
            <span className={`w-8 h-1.5 rounded-full transition-all ${step === 3 ? "bg-white" : "bg-white/30"}`} />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {step === 1 && (
            <div>
              <div className="flex items-center gap-2 mb-3 text-sm font-bold text-emerald-800 dark:text-emerald-400">
                <BookOpen className="w-4 h-4" />
                <span>Adım 1 / 3: Mevcut Seviyen</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Excel seviyen nedir?
              </h3>
              <div className="space-y-2">
                {levelOptions.map((opt) => (
                  <button
                    key={opt.title}
                    onClick={() => setSelectedLevel(opt.title)}
                    className={`flex items-start justify-between w-full p-3.5 rounded-xl border text-left transition-all ${
                      selectedLevel === opt.title
                        ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 ring-2 ring-emerald-500/20"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-850"
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white">{opt.title}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{opt.desc}</div>
                    </div>
                    {selectedLevel === opt.title && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex items-center gap-2 mb-3 text-sm font-bold text-emerald-800 dark:text-emerald-400">
                <Target className="w-4 h-4" />
                <span>Adım 2 / 3: Ana Hedefin</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Excel'i neden öğrenmek istiyorsun?
              </h3>
              <div className="space-y-2">
                {goalOptions.map((opt) => (
                  <button
                    key={opt.title}
                    onClick={() => setSelectedGoal(opt.title)}
                    className={`flex items-start justify-between w-full p-3.5 rounded-xl border text-left transition-all ${
                      selectedGoal === opt.title
                        ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 ring-2 ring-emerald-500/20"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-850"
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white">{opt.title}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{opt.desc}</div>
                    </div>
                    {selectedGoal === opt.title && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="flex items-center gap-2 mb-3 text-sm font-bold text-emerald-800 dark:text-emerald-400">
                <Clock className="w-4 h-4" />
                <span>Adım 3 / 3: Günlük Zaman Ayrımı</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                Günde ne kadar zaman ayırabilirsin?
              </h3>
              <div className="space-y-2">
                {timeOptions.map((opt) => (
                  <button
                    key={opt.title}
                    onClick={() => setSelectedTime(opt.title)}
                    className={`flex items-start justify-between w-full p-3.5 rounded-xl border text-left transition-all ${
                      selectedTime === opt.title
                        ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 ring-2 ring-emerald-500/20"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-850"
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white">{opt.title}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{opt.desc}</div>
                    </div>
                    {selectedTime === opt.title && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => (s - 1) as any)}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
            >
              Geri
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={() => setStep((s) => (s + 1) as any)}
              className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-600/20 transition-all ml-auto"
            >
              <span>Devam Et</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/25 transition-all ml-auto"
            >
              <Sparkles className="w-4 h-4" />
              <span>Akademi'ye Başla</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
