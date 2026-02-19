import { useState, useEffect } from "react";
import { names99, Name99 } from "@/data/names99";
import { Button } from "@/components/ui/button";
import { Trophy, RefreshCw, CheckCircle, XCircle } from "lucide-react";

type QuizMode = "arabic-to-meaning" | "meaning-to-arabic" | "transliteration-to-meaning";
type QuizState = "idle" | "playing" | "finished";

interface QuizQuestion {
  name: Name99;
  options: Name99[];
  correct: number;
}

function generateQuestions(count = 15): QuizQuestion[] {
  const shuffled = [...names99].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(name => {
    const others = names99.filter(n => n.id !== name.id).sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [...others, name].sort(() => Math.random() - 0.5);
    return { name, options, correct: options.findIndex(o => o.id === name.id) };
  });
}

export default function Quiz() {
  const [mode, setMode] = useState<QuizMode>("arabic-to-meaning");
  const [state, setState] = useState<QuizState>("idle");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showResult, setShowResult] = useState(false);

  const startQuiz = () => {
    setQuestions(generateQuestions(15));
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setAnswers([]);
    setShowResult(false);
    setState("playing");
  };

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const isCorrect = idx === questions[current].correct;
    if (isCorrect) setScore(s => s + 1);
    setAnswers(a => [...a, isCorrect]);

    setTimeout(() => {
      if (current + 1 >= questions.length) {
        setState("finished");
      } else {
        setCurrent(c => c + 1);
        setSelected(null);
      }
    }, 1200);
  };

  if (state === "idle") {
    return (
      <div className="flex flex-col items-center gap-8 py-8">
        <div className="text-center">
          <p className="text-5xl mb-4">🎯</p>
          <h2 className="text-2xl font-bold text-foreground mb-2">কুইজ শুরু করুন</h2>
          <p className="text-muted-foreground">১৫টি প্রশ্ন, ৪টি অপশন</p>
        </div>

        <div className="w-full max-w-sm space-y-3">
          <p className="text-sm font-semibold text-muted-foreground text-center">কুইজ ধরন বেছে নিন</p>
          {([
            ["arabic-to-meaning", "আরবি দেখে বাংলা অর্থ বলুন", "🔤 → 📖"],
            ["meaning-to-arabic", "বাংলা অর্থ দেখে আরবি নাম বলুন", "📖 → 🔤"],
            ["transliteration-to-meaning", "উচ্চারণ দেখে অর্থ বলুন", "🗣️ → 📖"],
          ] as [QuizMode, string, string][]).map(([m, label, icon]) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${
                mode === m
                  ? "border-gold/60 bg-gold/10 text-gold"
                  : "border-border/50 bg-surface hover:border-gold/30 text-foreground"
              }`}
            >
              <span className="text-xl">{icon}</span>
              <span className="text-sm font-medium">{label}</span>
            </button>
          ))}
        </div>

        <Button
          onClick={startQuiz}
          className="bg-gold text-surface-deep hover:bg-gold/80 font-bold text-lg px-10 py-6 rounded-xl"
        >
          কুইজ শুরু করুন ✨
        </Button>
      </div>
    );
  }

  if (state === "finished") {
    const pct = Math.round((score / questions.length) * 100);
    const emoji = pct >= 80 ? "🏆" : pct >= 60 ? "👍" : pct >= 40 ? "📚" : "💪";
    const msg = pct >= 80 ? "অসাধারণ! মাশাআল্লাহ!" : pct >= 60 ? "ভালো করেছেন!" : pct >= 40 ? "আরও অনুশীলন করুন" : "চেষ্টা চালিয়ে যান!";

    return (
      <div className="flex flex-col items-center gap-6 py-8">
        <div className="text-center">
          <p className="text-6xl mb-3">{emoji}</p>
          <h2 className="text-2xl font-bold text-foreground">{msg}</h2>
          <p className="text-muted-foreground mt-1">আপনার ফলাফল</p>
        </div>

        <div className="w-full max-w-xs bg-surface border border-border/50 rounded-2xl p-6 text-center">
          <p className="text-6xl font-bold text-gold">{score}</p>
          <p className="text-muted-foreground">/ {questions.length} সঠিক</p>
          <div className="mt-4 h-3 bg-surface-deep rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold to-emerald-400 rounded-full transition-all duration-1000"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-lg font-bold text-gold mt-2">{pct}%</p>
        </div>

        {/* Answer review */}
        <div className="w-full max-w-lg space-y-2">
          <p className="text-sm font-semibold text-muted-foreground text-center mb-3">উত্তর পর্যালোচনা</p>
          {questions.map((q, i) => (
            <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${answers[i] ? "border-emerald-500/30 bg-emerald-950/20" : "border-red-500/30 bg-red-950/20"}`}>
              {answers[i] ? <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" /> : <XCircle className="h-4 w-4 text-red-400 shrink-0" />}
              <span className="text-lg text-gold" dir="rtl">{q.name.arabic}</span>
              <span className="text-sm text-muted-foreground">—</span>
              <span className="text-sm text-foreground">{q.name.meaning}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <Button onClick={startQuiz} className="bg-gold text-surface-deep hover:bg-gold/80 font-bold gap-2">
            <RefreshCw className="h-4 w-4" /> আবার চেষ্টা
          </Button>
          <Button variant="outline" onClick={() => setState("idle")} className="border-border/60 bg-surface hover:bg-surface-deep">
            ধরন পরিবর্তন
          </Button>
        </div>
      </div>
    );
  }

  const q = questions[current];
  if (!q) return null;

  const getQuestion = () => {
    if (mode === "arabic-to-meaning") return { label: "এই আরবি নামের বাংলা অর্থ কী?", display: <p className="text-5xl font-bold text-gold text-center" dir="rtl">{q.name.arabic}</p>, sub: q.name.transliteration };
    if (mode === "meaning-to-arabic") return { label: "এই অর্থের আরবি নাম কোনটি?", display: <p className="text-2xl font-bold text-emerald-400 text-center">{q.name.meaning}</p>, sub: q.name.meaning_en };
    return { label: "এই উচ্চারণের অর্থ কী?", display: <p className="text-2xl font-bold text-sky-400 text-center">{q.name.transliteration}</p>, sub: "" };
  };

  const getOptionLabel = (opt: Name99) => {
    if (mode === "arabic-to-meaning") return opt.meaning;
    if (mode === "meaning-to-arabic") return opt.arabic;
    return opt.meaning;
  };

  const { label, display, sub } = getQuestion();

  return (
    <div className="flex flex-col gap-6 max-w-lg mx-auto">
      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>প্রশ্ন {current + 1} / {questions.length}</span>
          <span className="text-gold font-semibold">স্কোর: {score}</span>
        </div>
        <div className="h-2 bg-surface-deep rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-gold to-emerald-400 rounded-full transition-all duration-300"
            style={{ width: `${((current) / questions.length) * 100}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="rounded-2xl border border-gold/20 bg-surface p-6 flex flex-col items-center gap-4 min-h-[160px] justify-center">
        <p className="text-sm text-muted-foreground text-center">{label}</p>
        {display}
        {sub && <p className="text-sm text-muted-foreground">{sub}</p>}
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-3">
        {q.options.map((opt, i) => {
          let cls = "border-border/50 bg-surface hover:border-gold/40 hover:bg-gold/5";
          if (selected !== null) {
            if (i === q.correct) cls = "border-emerald-500 bg-emerald-950/40 text-emerald-300";
            else if (i === selected) cls = "border-red-500 bg-red-950/40 text-red-300";
            else cls = "border-border/30 bg-surface/50 opacity-50";
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`p-4 rounded-xl border text-center transition-all duration-200 font-medium text-sm ${cls}`}
              dir={mode === "meaning-to-arabic" ? "rtl" : "ltr"}
            >
              {getOptionLabel(opt)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
