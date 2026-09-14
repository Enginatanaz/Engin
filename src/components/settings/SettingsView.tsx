import React, { useState, useEffect } from "react";
import {
  Settings,
  User,
  RotateCcw,
  Download,
  Upload,
  CheckCircle2,
  Sparkles,
  Shield,
  HelpCircle,
  Save,
} from "lucide-react";
import { NavigationTab, UserProgress } from "../../types";
import { saveUserProgress } from "../../services/storageService";

interface SettingsViewProps {
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
  onNavigate: (tab: NavigationTab) => void;
}

const AVATARS = ["📊", "🧑‍💼", "👩‍💼", "📈", "💼", "🧠", "🎓", "🚀", "💻"];

export const SettingsView: React.FC<SettingsViewProps> = ({
  progress,
  onUpdateProgress,
  onNavigate,
}) => {
  const [name, setName] = useState(progress.userProfile.name);
  const [avatar, setAvatar] = useState(progress.userProfile.avatar);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [healthStatus, setHealthStatus] = useState<{
    status: string;
    hasApiKey: boolean;
  } | null>(null);

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => setHealthStatus(data))
      .catch(() => setHealthStatus({ status: "offline", hasApiKey: false }));
  }, []);

  const handleSaveProfile = () => {
    const updated: UserProgress = {
      ...progress,
      userProfile: {
        ...progress.userProfile,
        name: name.trim() || "Öğrenci",
        avatar,
      },
    };
    saveUserProgress(updated);
    onUpdateProgress(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleResetProgress = () => {
    if (
      window.confirm(
        "Tüm ders ilerlemeniz, quiz skorlarınız ve XP puanlarınız sıfırlanacaktır. Emin misiniz?"
      )
    ) {
      const resetState: UserProgress = {
        level: 1,
        xp: 0,
        streak: 1,
        lastStudyDate: new Date().toISOString().split("T")[0],
        completedLessons: [],
        completedQuizzes: {},
        quizScores: {},
        completedProjects: [],
        topicMastery: {},
        weakTopics: [],
        onboardingCompleted: true,
        userProfile: {
          name: name.trim() || "Öğrenci",
          avatar,
          title: "Excel Çırağı",
        },
      };
      saveUserProgress(resetState);
      onUpdateProgress(resetState);
      alert("İlerlemeniz başarıyla sıfırlandı.");
    }
  };

  const handleExportData = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(progress, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `excel_akademi_yedek_${new Date().toISOString().split("T")[0]}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && typeof parsed.xp === "number") {
            saveUserProgress(parsed);
            onUpdateProgress(parsed);
            alert("İlerleme verileriniz başarıyla içe aktarıldı!");
          } else {
            alert("Geçersiz yedek dosyası.");
          }
        } catch {
          alert("Dosya okunurken bir hata oluştu.");
        }
      };
    }
  };

  return (
    <div id="settings-view-container" className="max-w-3xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Settings className="w-5 h-5 text-emerald-600" />
          Hesap ve Tercihler
        </h1>
        <p className="text-xs text-slate-600 mt-1">
          Profil bilgilerinizi düzenleyin, sistem ayarlarını görüntüleyin ve öğrenme verilerinizi yönetin.
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <User className="w-4 h-4 text-emerald-600" />
          Öğrenci Profili
        </h2>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-2">
              Profil Avatarı:
            </label>
            <div className="flex items-center gap-2 flex-wrap">
              {AVATARS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setAvatar(emoji)}
                  className={`w-10 h-10 rounded-xl text-xl flex items-center justify-center transition-all ${
                    avatar === emoji
                      ? "bg-emerald-100 ring-2 ring-emerald-600 scale-105"
                      : "bg-slate-100 hover:bg-slate-200"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1.5">
              Adınız / Hitap Şekli:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-xs sm:text-sm px-3.5 py-2 border border-slate-300 rounded-xl w-full max-w-md focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={handleSaveProfile}
              className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              Değişiklikleri Kaydet
            </button>

            {savedSuccess && (
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Kaydedildi!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Localization & Region Standards */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-600" />
          Bölgesel Standartlar ve Excel Kuralları
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-600 block">Varsayılan Dil:</span>
            <span className="font-bold text-slate-900">Türkçe (Türkiye)</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-600 block">Fonksiyon Parametre Ayracı:</span>
            <span className="font-bold text-emerald-700">Noktalı Virgül ( ; )</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-600 block">Ondalık Ayırıcı:</span>
            <span className="font-bold text-slate-900">Virgül ( , )</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-600 block">Para Birimi:</span>
            <span className="font-bold text-slate-900">Türk Lirası (₺)</span>
          </div>
        </div>
      </div>

      {/* AI Teacher Service Status */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          Yapay Zeka Servis Durumu
        </h2>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-slate-800 block">
              Google Gemini Motoru
            </span>
            <span className="text-slate-600 text-[11px]">
              {healthStatus?.hasApiKey
                ? "Canlı Gemini API entegrasyonu devrede."
                : "Akıllı yerel Türkçe Excel kural motoru devrede."}
            </span>
          </div>
          <span
            className={`px-2.5 py-1 rounded-full font-bold text-[11px] ${
              healthStatus?.status === "ok"
                ? "bg-emerald-100 text-emerald-800"
                : "bg-slate-200 text-slate-700"
            }`}
          >
            Aktif
          </span>
        </div>
      </div>

      {/* Data Backup & Reset */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-emerald-600" />
          Veri Yönetimi ve Yedekleme
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportData}
            className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            İlerlemeyi İndir (JSON)
          </button>

          <label className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer">
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            Yedekten Yükle
            <input
              type="file"
              accept=".json"
              onChange={handleImportData}
              className="hidden"
            />
          </label>

          <button
            onClick={handleResetProgress}
            className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-semibold transition-colors ml-auto"
          >
            Tüm İlerlemeyi Sıfırla
          </button>
        </div>
      </div>
    </div>
  );
};
