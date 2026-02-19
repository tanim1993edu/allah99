import { useState } from "react";
import { BookOpen, Layers, CreditCard, Trophy, Sparkles } from "lucide-react";
import CheatSheet from "@/components/CheatSheet";
import BrowseNames from "@/components/BrowseNames";
import Flashcards from "@/components/Flashcards";
import Quiz from "@/components/Quiz";

type Tab = "cheatsheet" | "browse" | "flashcards" | "quiz";

const tabs: { id: Tab; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: "cheatsheet", label: "চিট শিট", icon: <Sparkles className="h-4 w-4" />, desc: "মনে রাখার শর্টকাট" },
  { id: "browse", label: "সব নাম", icon: <BookOpen className="h-4 w-4" />, desc: "৯৯টি নাম দেখুন" },
  { id: "flashcards", label: "ফ্ল্যাশকার্ড", icon: <CreditCard className="h-4 w-4" />, desc: "অনুশীলন করুন" },
  { id: "quiz", label: "কুইজ", icon: <Trophy className="h-4 w-4" />, desc: "পরীক্ষা দিন" },
];

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("cheatsheet");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/50 backdrop-blur-md bg-background/80">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-gold leading-tight">
              ٱللَّٰهُ
            </h1>
            <h2 className="text-base font-bold text-foreground">আল্লাহর ৯৯টি সুন্দর নাম</h2>
            <p className="text-xs text-muted-foreground">
              আসমাউল হুসনা • উত্তম নাম সব তাঁরই
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-surface rounded-xl border border-border/40">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center gap-0.5 px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-gold text-surface-deep shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.icon}
                <span className="hidden sm:block">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Title row for mobile */}
      <div className="max-w-4xl mx-auto px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          {tabs.find(t => t.id === activeTab)?.icon}
          <div>
            <h3 className="font-bold text-foreground">{tabs.find(t => t.id === activeTab)?.label}</h3>
            <p className="text-xs text-muted-foreground">{tabs.find(t => t.id === activeTab)?.desc}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 pb-12">
        {activeTab === "cheatsheet" && <CheatSheet />}
        {activeTab === "browse" && <BrowseNames />}
        {activeTab === "flashcards" && <Flashcards />}
        {activeTab === "quiz" && <Quiz />}
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-muted-foreground border-t border-border/30">
        <p>📖 মুহাম্মদ মাসউদ রচিত বই অবলম্বনে</p>
        <p className="mt-1 text-gold/60">আল্লাহর ৯৯টি নাম কুরআনে মোট ১০২৯ বার এসেছে</p>
      </footer>
    </div>
  );
}
