import { useState } from "react";
import { names99 } from "@/data/names99";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, RotateCcw, Shuffle } from "lucide-react";

export default function Flashcards() {
  const [deck, setDeck] = useState([...names99]);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [seen, setSeen] = useState<Set<number>>(new Set());

  const name = deck[current];

  const shuffle = () => {
    const shuffled = [...names99].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
    setCurrent(0);
    setFlipped(false);
    setSeen(new Set());
  };

  const go = (dir: number) => {
    const next = (current + dir + deck.length) % deck.length;
    setCurrent(next);
    setFlipped(false);
    setSeen(prev => new Set([...prev, current]));
  };

  const progress = Math.round((seen.size / deck.length) * 100);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Progress */}
      <div className="w-full max-w-lg">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>{current + 1} / {deck.length}</span>
          <span>{seen.size} টি দেখা হয়েছে ({progress}%)</span>
        </div>
        <div className="h-2 bg-surface-deep rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gold to-emerald-400 transition-all duration-500 rounded-full"
            style={{ width: `${((current + 1) / deck.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Card */}
      <div
        className="w-full max-w-lg cursor-pointer"
        style={{ perspective: "1200px", height: "280px" }}
        onClick={() => setFlipped(!flipped)}
      >
        <div
          className="relative w-full h-full transition-all duration-600"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            transition: "transform 0.5s ease",
          }}
        >
          {/* Front - Question */}
          <div
            className="absolute inset-0 rounded-2xl border-2 border-gold/30 bg-gradient-to-br from-surface to-surface-deep flex flex-col items-center justify-center p-8 gap-4"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="absolute top-4 left-4 text-xs text-muted-foreground bg-surface-deep px-2 py-1 rounded-lg">
              #{name.id}
            </div>
            <p className="text-5xl font-bold text-gold text-center leading-tight" dir="rtl">
              {name.arabic}
            </p>
            <p className="text-lg text-foreground font-semibold">{name.transliteration}</p>
            <p className="text-sm text-muted-foreground mt-2">👆 ট্যাপ করুন অর্থ দেখতে</p>
          </div>

          {/* Back - Answer */}
          <div
            className="absolute inset-0 rounded-2xl border-2 border-emerald/40 bg-gradient-to-br from-emerald-950/50 to-surface-deep flex flex-col items-center justify-center p-8 gap-3"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <p className="text-3xl font-bold text-emerald-400 text-center">{name.meaning}</p>
            <p className="text-base text-muted-foreground italic">{name.meaning_en}</p>
            <div className="flex gap-3 mt-2 flex-wrap justify-center">
              <span className="px-3 py-1 bg-surface rounded-lg border border-border/40 text-xs text-muted-foreground font-mono">
                {name.rootLetters}
              </span>
              {name.quranCount !== "-" && (
                <span className="px-3 py-1 bg-gold/10 rounded-lg border border-gold/20 text-xs text-gold">
                  কুরআনে {name.quranCount}বার
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" className="border-border/60 bg-surface hover:bg-surface-deep" onClick={() => go(-1)}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button variant="outline" className="border-border/60 bg-surface hover:bg-surface-deep gap-2" onClick={shuffle}>
          <Shuffle className="h-4 w-4" /> এলোমেলো করুন
        </Button>
        <Button variant="outline" className="border-border/60 bg-surface hover:bg-surface-deep gap-2" onClick={() => { setCurrent(0); setFlipped(false); setSeen(new Set()); }}>
          <RotateCcw className="h-4 w-4" /> আবার শুরু
        </Button>
        <Button variant="outline" size="icon" className="border-border/60 bg-surface hover:bg-surface-deep" onClick={() => go(1)}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
