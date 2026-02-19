import { useState } from "react";
import { names99, MNEMONIC, getGroupColor, GROUPS } from "@/data/names99";

// Each word in the mnemonic and which groups it encodes
const WORD_GROUPS: { word: string; groups: string[]; color: string }[] = [
  { word: "আল্লাহর",   groups: ["আ", "ল", "হ", "র"], color: "#d97706" },
  { word: "জিকিরে",    groups: ["জ"],                 color: "#e11d48" },
  { word: "খুব",       groups: ["ক", "খ", "ব"],       color: "#ea580c" },
  { word: "মগ্ন,",    groups: ["ম", "গ", "ন"],        color: "#4f46e5" },
  { word: "তাওয়াফে,", groups: ["ত", "ও", "ফ"],       color: "#db2777" },
  { word: "সারাদিন",  groups: ["স"],                  color: "#16a34a" },
];

const GROUP_COLOR_HEX: Record<string, string> = {
  "আ": "#d97706", "ল": "#059669", "হ": "#0891b2", "র": "#7c3aed",
  "জ": "#e11d48", "ক": "#ca8a04", "খ": "#ea580c", "ব": "#0d9488",
  "ম": "#4f46e5", "গ": "#65a30d", "ন": "#0284c7", "ত": "#db2777",
  "ও": "#9333ea", "ফ": "#dc2626", "স": "#16a34a", "দ": "#64748b",
};

export default function CheatSheet() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  const groupedNames = GROUPS.map(g => ({
    ...g,
    names: names99.filter(n => n.group === g.label),
  })).filter(g => g.names.length > 0);

  // Which groups are highlighted (from active group OR hovered mnemonic word)
  const highlightedGroups = new Set<string>(
    hoveredWord
      ? WORD_GROUPS.find(w => w.word === hoveredWord)?.groups ?? []
      : activeGroup
      ? [activeGroup]
      : []
  );

  return (
    <div className="space-y-6">
      {/* Mnemonic Box */}
      <div className="relative overflow-hidden rounded-2xl border border-gold/30 bg-gradient-to-br from-surface-deep to-surface p-6">
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, hsl(var(--gold)) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(var(--emerald)) 0%, transparent 40%)" }}
        />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🔑</span>
            <h2 className="text-lg font-bold text-gold">চিট কোড — মনে রাখার মন্ত্র</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            প্রতিটি শব্দের রং তার গ্রুপ নির্দেশ করে। শব্দের উপর hover করুন!
          </p>

          {/* Colored mnemonic words */}
          <div className="rounded-xl bg-surface-deep border border-gold/20 p-5 text-center">
            <p className="text-2xl font-bold leading-relaxed tracking-wide flex flex-wrap justify-center gap-x-3 gap-y-1">
              {WORD_GROUPS.map(wg => {
                const isWordHovered = hoveredWord === wg.word;
                const isRelated = activeGroup ? wg.groups.includes(activeGroup) : false;
                const isHighlighted = isWordHovered || isRelated;
                return (
                  <span
                    key={wg.word}
                    onMouseEnter={() => setHoveredWord(wg.word)}
                    onMouseLeave={() => setHoveredWord(null)}
                    onClick={() => setActiveGroup(
                      wg.groups.length === 1 ? (activeGroup === wg.groups[0] ? null : wg.groups[0]) : null
                    )}
                    className="cursor-pointer relative transition-all duration-200 rounded-lg px-1"
                    style={{
                      color: wg.color,
                      textShadow: isHighlighted ? `0 0 16px ${wg.color}88` : "none",
                      transform: isHighlighted ? "scale(1.08)" : "scale(1)",
                      display: "inline-block",
                      background: isHighlighted ? wg.color + "18" : "transparent",
                    }}
                  >
                    {wg.word}
                    {/* Group badge on hover */}
                    {isWordHovered && (
                      <span className="absolute -top-7 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                        {wg.groups.map(g => (
                          <span
                            key={g}
                            className="text-xs font-bold px-1.5 py-0.5 rounded-full shadow-lg"
                            style={{ background: GROUP_COLOR_HEX[g], color: "#fff" }}
                          >
                            {g}
                          </span>
                        ))}
                      </span>
                    )}
                  </span>
                );
              })}
            </p>
            <p className="text-xs text-muted-foreground mt-3 italic">— মুহাম্মদ মাসউদ রচিত পদ্ধতি</p>
          </div>

          {/* Letter chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            {WORD_GROUPS.flatMap(wg => wg.groups).map(letter => {
              const group = GROUPS.find(g => g.label === letter);
              const count = names99.filter(n => n.group === letter).length;
              if (!group || count === 0) return null;
              const isHighlighted = highlightedGroups.has(letter) || activeGroup === letter;
              return (
                <button
                  key={letter}
                  onMouseEnter={() => setActiveGroup(letter)}
                  onMouseLeave={() => setActiveGroup(null)}
                  onClick={() => setActiveGroup(activeGroup === letter ? null : letter)}
                  className={`px-3 py-1.5 rounded-full border text-sm font-bold transition-all ${group.color} ${isHighlighted ? "scale-110 ring-2 ring-current/40 shadow-lg" : "hover:scale-105"}`}
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
          const hex = GROUP_COLOR_HEX[group.label];
          return (
            <div
              key={group.label}
              className={`rounded-xl border bg-surface transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-40"}`}
              style={{ borderColor: isOpen && activeGroup ? hex + "66" : "hsl(var(--border))" }}
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
