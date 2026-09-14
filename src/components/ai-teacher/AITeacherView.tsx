import React, { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Send,
  Bot,
  User,
  Volume2,
  VolumeX,
  RotateCcw,
  BookOpen,
  HelpCircle,
  Copy,
  Check,
  Award,
  Lightbulb,
} from "lucide-react";
import { ChatMessage, NavigationTab, UserProgress } from "../../types";
import { sendMessageToAITeacher } from "../../services/aiService";
import { addXpToUser } from "../../services/storageService";

interface AITeacherViewProps {
  progress: UserProgress;
  onUpdateProgress: (newProgress: UserProgress) => void;
  onNavigate: (tab: NavigationTab, payload?: string) => void;
  initialPrompt?: string;
}

const QUICK_PROMPTS = [
  "DÜŞEYARA (VLOOKUP) ile ÇAPRAZARA (XLOOKUP) farkı nedir?",
  "EĞER formülünde birden fazla koşulu VE (AND) ile nasıl yazarım?",
  "Hücre sabitlemedeki dolar ($) işareti ne zaman kullanılır?",
  "Bana çözmem için başlangıç seviyesinde bir Excel sorusu sor!",
  "#YOK ve #DEĞER! hataları neden çıkar ve nasıl düzeltilir?",
  "Özet Tablo (Pivot Table) oluşturmanın pratik adımları nelerdir?",
];

export const AITeacherView: React.FC<AITeacherViewProps> = ({
  progress,
  onUpdateProgress,
  onNavigate,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-welcome",
      sender: "assistant",
      text: `Merhaba ${progress.userProfile.name}! 👋 Ben senin kişisel Excel öğretmeninim. Sıfırdan ileri düzeye kadar kafana takılan tüm formülleri, hataları veya gerçek hayattaki iş tablolarını birlikte çözebiliriz.\n\nBugün hangi formülü veya tabloyu öğrenmek istersin?`,
      timestamp: "Şimdi",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-send initialPrompt if provided
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim() !== "") {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Voice synthesis (Turkish)
  const speakText = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    // Clean markdown code blocks from speech
    const cleanSpeech = text.replace(/```[\s\S]*?```/g, "formül detayı kod alanında gösterilmiştir").replace(/[*#`]/g, "");
    const utterance = new SpeechSynthesisUtterance(cleanSpeech);
    utterance.lang = "tr-TR";
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || inputText;
    if (!messageText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: "user",
      text: messageText,
      timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const historyPayload = messages.slice(-8).map((m) => ({
        role: m.sender,
        text: m.text,
      }));

      const res = await sendMessageToAITeacher(messageText, historyPayload, progress);

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: "assistant",
        text: res.reply,
        timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
        isFallback: res.isFallback,
      };

      setMessages((prev) => [...prev, aiMsg]);

      // Award interactive learning XP (first 5 questions per day)
      const { updatedProgress } = addXpToUser(10, progress);
      onUpdateProgress(updatedProgress);

      if (ttsEnabled) {
        speakText(res.reply);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: "assistant",
          text: "Bağlantıda kısa bir aksaklık oldu. Lütfen sorunuzu tekrar yöneltebilir misiniz?",
          timestamp: "Şimdi",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setMessages([
      {
        id: "m-reset",
        sender: "assistant",
        text: "Sohbet sıfırlandı. Yeni bir konu veya formülle başlayabiliriz! Ne sormak istersin?",
        timestamp: "Şimdi",
      },
    ]);
  };

  return (
    <div id="ai-teacher-view" className="max-w-4xl mx-auto space-y-4">
      {/* Student Context Ribbon */}
      <div
        id="ai-context-banner"
        className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              Excel Akademi Yapay Zeka Öğretmeni
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Canlı Pedagojik Rehber
              </span>
            </h2>
            <p className="text-xs text-slate-600">
              Mevcut Durumun: Seviye {progress.level} • {progress.xp} XP • {progress.streak} Günlük Seri
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* TTS Toggle */}
          <button
            id="btn-toggle-tts"
            onClick={() => {
              if (ttsEnabled && window.speechSynthesis) window.speechSynthesis.cancel();
              setTtsEnabled(!ttsEnabled);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              ttsEnabled
                ? "bg-emerald-100 text-emerald-800"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
            title="Sesli Okuma (Türkçe)"
          >
            {ttsEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                Ses Açık
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                Ses Kapalı
              </>
            )}
          </button>

          <button
            id="btn-clear-chat"
            onClick={handleClearChat}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
            title="Sohbeti Temizle"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Weak Topics Tip (if any) */}
      {progress.weakTopics.length > 0 && (
        <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Geliştirme Önerisi:</strong> Quiz sonuçlarına göre{" "}
              <strong>{progress.weakTopics.slice(0, 2).join(", ")}</strong> konusunu tekrar çalışabiliriz.
            </span>
          </div>
          <button
            onClick={() =>
              handleSendMessage(
                `${progress.weakTopics[0]} konusunu sıfırdan ve örnek bir Türk şirketi senaryosuyla açıklar mısın?`
              )
            }
            className="px-2.5 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-md text-[11px] font-bold shrink-0 transition-colors"
          >
            Bu Konuyu Çalıştır
          </button>
        </div>
      )}

      {/* Chat Messages Container */}
      <div
        id="ai-messages-list"
        className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-6 h-[480px] overflow-y-auto space-y-4"
      >
        {messages.map((msg) => {
          const isUser = msg.sender === "user";

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white text-xs ${
                  isUser ? "bg-slate-800" : "bg-emerald-600"
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed space-y-2 relative group ${
                  isUser
                    ? "bg-emerald-600 text-white rounded-tr-xs"
                    : "bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-xs"
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                <div
                  className={`flex items-center justify-between pt-1 text-[10px] ${
                    isUser ? "text-emerald-100" : "text-slate-600"
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {!isUser && (
                    <button
                      onClick={() => handleCopyText(msg.id, msg.text)}
                      className="p-1 rounded-md hover:bg-slate-200 text-slate-500 transition-colors"
                      title="Kopyala"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 text-xs">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-xs p-4 text-xs text-slate-500 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse delay-100" />
              <div className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse delay-200" />
              <span className="font-medium text-slate-600 ml-1">
                Öğretmeniniz formülü inceliyor...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div id="ai-quick-prompts" className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Lightbulb className="w-3 h-3 text-amber-500" />
          Hızlı Sorular:
        </span>
        {QUICK_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(prompt)}
            className="px-3 py-1.5 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl text-xs text-slate-700 whitespace-nowrap shadow-2xs transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Message Input Box */}
      <div
        id="ai-input-bar"
        className="bg-white rounded-2xl p-2.5 border border-slate-200 shadow-xs flex items-center gap-2"
      >
        <input
          id="ai-chat-input"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Öğretmene sor: Örn: 'Bir personel listesinde prim nasıl hesaplanır?'"
          className="flex-1 text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-transparent focus:border-emerald-500 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
        />
        <button
          id="btn-send-ai-message"
          onClick={() => handleSendMessage()}
          disabled={!inputText.trim() || isLoading}
          className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-colors disabled:opacity-40"
          title="Gönder"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
