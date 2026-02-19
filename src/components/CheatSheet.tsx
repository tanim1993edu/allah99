import { useState } from "react";
import { names99, MNEMONIC, getGroupColor, GROUPS } from "@/data/names99";

export default function CheatSheet() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const groupedNames = GROUPS.map(g => ({
    ...g,
    names: names99.filter(n => n.group === g.label),
  })).filter(g => g.names.length > 0);

  // Highlight letters in mnemonic
  const mnemonicLetters = ["আ", "ল", "হ", "র", "জ", "ক", "খ", "ব", "ম", "গ", "ন", "ত", "ও", "ফ", "স"];

  return (
    <div className="space-y-6">
      {/* Mnemonic Box */}
      <div className="relative overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-surface-deep to-surface p-6">
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(var(--gold)) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(var(--emerald)) 0%, transparent 40%)" }} />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🔑</span>
            <h2 className="text-lg font-bold text-gold">চিট কোড — মনে রাখার মন্ত্র</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">প্রতিটি বর্ণ একটি নামের গ্রুপ নির্দেশ করে। এই বাক্যটি মুখস্থ করলেই ৯৯টি নামের গ্রুপ মনে থাকবে!</p>
          <div className="rounded-xl bg-surface-deep border border-gold/20 p-4 text-center">
            <p className="text-2xl font-bold text-foreground leading-relaxed tracking-wide" dir="auto">
              {MNEMONIC}
            </p>
            <p className="text-xs text-muted-foreground mt-2 italic">— মুহাম্মদ মাসউদ রচিত পদ্ধতি</p>
          </div>

          {/* Letter chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            {mnemonicLetters.map(letter => {
              const group = GROUPS.find(g => g.label === letter);
              const count = names99.filter(n => n.group === letter).length;
              if (!group || count === 0) return null;
              return (
                <button
                  key={letter}
                  onClick={() => setActiveGroup(activeGroup === letter ? null : letter)}
                  className={`px-3 py-1.5 rounded-full border text-sm font-bold transition-all ${group.color} ${activeGroup === letter ? "scale-110 ring-2 ring-white/30" : "hover:scale-105"}`}
                >
                  {letter} <span className="opacity-60 text-xs">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Groups */}
      <div className="space-y-4">
        {groupedNames.map(group => {
          const isOpen = activeGroup === null || activeGroup === group.label;
          return (
            <div
              key={group.label}
              className={`rounded-xl border bg-surface transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-40"}`}
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <button
                className="w-full flex items-center gap-3 p-4"
                onClick={() => setActiveGroup(activeGroup === group.label ? null : group.label)}
              >
                <span className={`text-lg font-extrabold px-3 py-1 rounded-lg border ${group.color}`}>
                  {group.label}
                </span>
                <span className="text-sm text-muted-foreground">{group.names.length}টি নাম</span>
                <span className="ml-auto text-muted-foreground">{activeGroup === group.label ? "▲" : "▼"}</span>
              </button>

              {(activeGroup === null || activeGroup === group.label) && (
                <div className="px-4 pb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {group.names.map(name => (
                    <div key={name.id} className="flex items-start gap-3 rounded-lg bg-surface-deep border border-border/50 p-3">
                      <span className="text-xs text-muted-foreground font-mono mt-0.5 min-w-[1.5rem]">{name.id}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xl font-bold text-gold leading-tight" dir="rtl">{name.arabic}</p>
                        <p className="text-sm font-semibold text-foreground mt-0.5">{name.transliteration}</p>
                        <p className="text-xs text-muted-foreground">{name.meaning}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
