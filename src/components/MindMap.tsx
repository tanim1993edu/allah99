import { useState, useRef, useEffect, useCallback } from "react";
import { names99, GROUPS, MNEMONIC } from "@/data/names99";
import { X } from "lucide-react";

// ── colour palette per group — light & dark variants ──────────────────────
interface GroupPal {
  stroke: string;
  fillDark: string;
  fillLight: string;
  textDark: string;
  textLight: string;
}

const GROUP_PALETTE: Record<string, GroupPal> = {
  "আ": { stroke: "#d97706", fillDark: "#451a03", fillLight: "#fef3c7", textDark: "#fcd34d", textLight: "#78350f" },
  "ল":  { stroke: "#059669", fillDark: "#022c22", fillLight: "#d1fae5", textDark: "#6ee7b7", textLight: "#064e3b" },
  "হ":  { stroke: "#0891b2", fillDark: "#082f49", fillLight: "#cffafe", textDark: "#67e8f9", textLight: "#164e63" },
  "র":  { stroke: "#7c3aed", fillDark: "#2e1065", fillLight: "#ede9fe", textDark: "#c4b5fd", textLight: "#3b0764" },
  "জ":  { stroke: "#e11d48", fillDark: "#4c0519", fillLight: "#ffe4e6", textDark: "#fda4af", textLight: "#881337" },
  "ক":  { stroke: "#ca8a04", fillDark: "#422006", fillLight: "#fef9c3", textDark: "#fef08a", textLight: "#713f12" },
  "খ":  { stroke: "#ea580c", fillDark: "#431407", fillLight: "#ffedd5", textDark: "#fed7aa", textLight: "#7c2d12" },
  "ব":  { stroke: "#0d9488", fillDark: "#042f2e", fillLight: "#ccfbf1", textDark: "#5eead4", textLight: "#134e4a" },
  "ম":  { stroke: "#4f46e5", fillDark: "#1e1b4b", fillLight: "#e0e7ff", textDark: "#a5b4fc", textLight: "#1e1b4b" },
  "গ":  { stroke: "#65a30d", fillDark: "#1a2e05", fillLight: "#ecfccb", textDark: "#bef264", textLight: "#365314" },
  "ন":  { stroke: "#0284c7", fillDark: "#082f49", fillLight: "#e0f2fe", textDark: "#7dd3fc", textLight: "#0c4a6e" },
  "ত":  { stroke: "#db2777", fillDark: "#4a044e", fillLight: "#fce7f3", textDark: "#f9a8d4", textLight: "#831843" },
  "ও":  { stroke: "#9333ea", fillDark: "#3b0764", fillLight: "#f3e8ff", textDark: "#d8b4fe", textLight: "#581c87" },
  "ফ":  { stroke: "#dc2626", fillDark: "#450a0a", fillLight: "#fee2e2", textDark: "#fca5a5", textLight: "#7f1d1d" },
  "স":  { stroke: "#16a34a", fillDark: "#052e16", fillLight: "#dcfce7", textDark: "#86efac", textLight: "#14532d" },
  "দ":  { stroke: "#64748b", fillDark: "#0f172a", fillLight: "#f1f5f9", textDark: "#cbd5e1", textLight: "#1e293b" },
};

interface NodeInfo {
  group: string;
  name?: (typeof names99)[0];
}

const TWO_PI = Math.PI * 2;

export default function MindMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selected, setSelected] = useState<NodeInfo | null>(null);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ w: 800, h: 700 });
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const updateAll = () => {
      const el = svgRef.current?.parentElement;
      if (el) {
        const w = el.clientWidth || 800;
        const h = w < 500 ? Math.min(w * 1.5, 640) : Math.min(w * 1.1, 900);
        setDimensions({ w, h });
      }
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    updateAll();
    const ro = new ResizeObserver(updateAll);
    if (svgRef.current?.parentElement) ro.observe(svgRef.current.parentElement);
    const mo = new MutationObserver(updateAll);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => { ro.disconnect(); mo.disconnect(); };
  }, []);

  // resolve theme-aware colours
  const getPal = useCallback((label: string) => {
    const p = GROUP_PALETTE[label] || GROUP_PALETTE["দ"];
    return {
      stroke: p.stroke,
      fill: isDark ? p.fillDark : p.fillLight,
      text: isDark ? p.textDark : p.textLight,
    };
  }, [isDark]);

  const { w, h } = dimensions;
  const cx = w / 2;
  const cy = h / 2;
  const isMobile = w < 500;

  const R0    = isMobile ? 46 : 60;
  const R1    = isMobile ? Math.min(w * 0.30, 130) : Math.min(w * 0.32, 220);
  const leafR = isMobile ? Math.min(w * 0.13, 56)  : Math.min(w * 0.13, 80);

  const groups = GROUPS.filter(g => names99.some(n => n.group === g.label));
  const totalGroups = groups.length;

  const groupAngle = (i: number) => (TWO_PI * i) / totalGroups - Math.PI / 2;
  const groupPos   = (i: number) => ({
    x: cx + R1 * Math.cos(groupAngle(i)),
    y: cy + R1 * Math.sin(groupAngle(i)),
  });
  const groupNames = (label: string) => names99.filter(n => n.group === label);

  const leafPos = (gi: number, ni: number, total: number) => {
    const gp    = groupPos(gi);
    const base  = groupAngle(gi);
    const nodeW = isMobile ? 50 : 62;  // leaf pill width
    const nodeH = isMobile ? 28 : 34;  // leaf pill height
    // Minimum ring-1 radius: clear the group circle + half node height
    const minR1 = grRadius + nodeH + (isMobile ? 6 : 10);

    // Helper: compute arc spread so `n` nodes of width `nodeW` fit without touching at radius `r`
    const safeArc = (n: number, r: number) =>
      n <= 1 ? 0 : Math.min(Math.PI * 1.35, (n * (nodeW + 4)) / r);

    if (total <= 4) {
      const r   = Math.max(minR1, nodeW * 0.9);
      const arc = safeArc(total, r);
      const gap = total <= 1 ? 0 : arc / (total - 1);
      const angle = base - arc / 2 + gap * ni;
      return { x: gp.x + r * Math.cos(angle), y: gp.y + r * Math.sin(angle) };

    } else if (total <= 8) {
      const inner     = Math.ceil(total / 2);
      const isOuter   = ni >= inner;
      const idx       = isOuter ? ni - inner : ni;
      const ringCount = isOuter ? total - inner : inner;
      const r1  = Math.max(minR1, nodeW * 0.9);
      const r2  = r1 + nodeW * 1.25;
      const r   = isOuter ? r2 : r1;
      const arc = safeArc(ringCount, r);
      const gap = ringCount <= 1 ? 0 : arc / (ringCount - 1);
      const angle = base - arc / 2 + gap * idx;
      return { x: gp.x + r * Math.cos(angle), y: gp.y + r * Math.sin(angle) };

    } else {
      // 3 rings for 9+ names — distribute evenly across rings
      const perRing   = Math.ceil(total / 3);
      const ring      = Math.min(Math.floor(ni / perRing), 2);
      const idx       = ni - ring * perRing;
      const ringCount = ring === 2 ? total - perRing * 2 : perRing;
      const r1  = Math.max(minR1, nodeW * 0.9);
      const r2  = r1 + nodeW * 1.3;
      const r3  = r2 + nodeW * 1.3;
      const r   = ring === 0 ? r1 : ring === 1 ? r2 : r3;
      const arc = safeArc(ringCount, r);
      const gap = ringCount <= 1 ? 0 : arc / (ringCount - 1);
      const angle = base - arc / 2 + gap * idx;
      return { x: gp.x + r * Math.cos(angle), y: gp.y + r * Math.sin(angle) };
    }

  };

  const handleGroupClick = useCallback((label: string) => {
    setActiveGroup(prev => (prev === label ? null : label));
    setSelected({ group: label });
  }, []);

  const handleNameClick = useCallback((e: React.MouseEvent, name: (typeof names99)[0]) => {
    e.stopPropagation();
    setSelected({ group: name.group, name });
  }, []);

  const grRadius = isMobile ? 20 : 26;

  const centreFill    = isDark ? "#1c1408" : "#fffbeb";
  const centreStroke  = isDark ? "hsl(42,80%,60%)"  : "hsl(38,88%,42%)";
  const centreText    = isDark ? "hsl(42,80%,70%)"  : "hsl(38,88%,30%)";
  const centreSubText = isDark ? "hsl(42,60%,65%)"  : "hsl(38,70%,38%)";

  const stripName = (s: string) =>
    s.replace(/^(আল|আর|আন|আত|আস|আশ|আয)-/, "");

  return (
    <div className="space-y-4">
      {/* Mnemonic banner */}
      <div className="rounded-xl border border-border/50 bg-surface p-4 text-center">
        <p className="text-xs text-muted-foreground mb-1">মনে রাখার মন্ত্র · বইয়ের পদ্ধতি</p>
        <p className="text-lg font-bold text-gold tracking-wider">{MNEMONIC}</p>
        <p className="text-xs text-muted-foreground mt-1">প্রতিটি বর্ণ একটি গ্রুপ → নামের মাইন্ডম্যাপ</p>
      </div>

      {/* Info panel */}
      {selected && (() => {
        const p = getPal(selected.group);
        return (
          <div
            className="relative rounded-xl border p-4 animate-in fade-in slide-in-from-top-2 duration-200"
            style={{ borderColor: p.stroke + "88", background: p.fill }}
          >
            <button onClick={() => setSelected(null)} className="absolute top-3 right-3 text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
            {selected.name ? (
              <div className="flex items-start gap-4">
                <span className="text-3xl font-extrabold min-w-[2.5rem] text-center leading-none mt-1" style={{ color: p.text }}>
                  {selected.name.id}
                </span>
                <div className="flex-1">
                  <p className="text-2xl font-bold leading-tight" dir="rtl" style={{ color: p.text }}>{selected.name.arabic}</p>
                  <p className="text-base font-semibold text-foreground mt-1">{selected.name.transliteration}</p>
                  <p className="text-sm text-muted-foreground">{selected.name.meaning}</p>
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span>কুরআন: {selected.name.quranCount} বার</span>
                    <span>মূল: {selected.name.rootLetters}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-lg font-bold" style={{ color: p.text }}>"{selected.group}" গ্রুপ</p>
                <p className="text-sm text-muted-foreground mt-1">{groupNames(selected.group).length}টি নাম · নামে ক্লিক করুন</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {groupNames(selected.group).map(n => (
                    <span key={n.id} className="text-xs px-2 py-0.5 rounded-full border" style={{ borderColor: p.stroke + "66", color: p.text }}>
                      {n.transliteration}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })()}

      <p className="text-xs text-muted-foreground text-center">
        গ্রুপ নোডে ক্লিক করুন নামগুলো দেখতে · নামে ক্লিক করুন বিস্তারিত দেখতে
      </p>

      {/* SVG Mindmap */}
      <div className="w-full rounded-2xl border border-border/40 bg-surface-deep overflow-hidden">
        <svg
          ref={svgRef}
          width={w} height={h}
          viewBox={`0 0 ${w} ${h}`}
          className="w-full h-auto"
          onClick={() => { setActiveGroup(null); setSelected(null); }}
        >
          <defs>
            <radialGradient id="bg-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={centreStroke} stopOpacity="0.08" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width={w} height={h} fill="url(#bg-glow)" />

          {/* Spokes */}
          {groups.map((g, i) => {
            const gp = groupPos(i);
            const p  = getPal(g.label);
            const isActive = activeGroup === g.label;
            return (
              <line key={`spoke-${g.label}`} x1={cx} y1={cy} x2={gp.x} y2={gp.y}
                stroke={p.stroke} strokeWidth={isActive ? 2.5 : 1.2}
                strokeOpacity={isActive ? 0.9 : isDark ? 0.35 : 0.5} />
            );
          })}

          {/* Leaf lines */}
          {activeGroup && (() => {
            const gi = groups.findIndex(g => g.label === activeGroup);
            if (gi === -1) return null;
            const gp = groupPos(gi);
            const p  = getPal(activeGroup);
            return groupNames(activeGroup).map((name, ni) => {
              const lp = leafPos(gi, ni, groupNames(activeGroup).length);
              return (
                <line key={`ll-${name.id}`} x1={gp.x} y1={gp.y} x2={lp.x} y2={lp.y}
                  stroke={p.stroke} strokeWidth={1.2} strokeOpacity={0.6} strokeDasharray="3 3" />
              );
            });
          })()}

          {/* Leaf nodes */}
          {activeGroup && (() => {
            const gi = groups.findIndex(g => g.label === activeGroup);
            if (gi === -1) return null;
            const p  = getPal(activeGroup);
            const lW = isMobile ? 44 : 54;
            const lH = isMobile ? 26 : 30;
            return groupNames(activeGroup).map((name, ni) => {
              const lp = leafPos(gi, ni, groupNames(activeGroup).length);
              return (
                <g key={`leaf-${name.id}`} transform={`translate(${lp.x},${lp.y})`}
                  onClick={(e) => handleNameClick(e, name)} className="cursor-pointer">
                  <rect x={-lW/2} y={-lH/2} width={lW} height={lH} rx={lH/2}
                    fill={p.fill} stroke={p.stroke}
                    strokeWidth={selected?.name?.id === name.id ? 2.5 : 1.5} strokeOpacity={0.9} />
                  <text textAnchor="middle" dominantBaseline="central"
                    fontSize={isMobile ? 7.5 : 8.5} fill={p.text} fontWeight="700">
                    {stripName(name.transliteration)}
                  </text>
                </g>
              );
            });
          })()}

          {/* Group nodes */}
          {groups.map((g, i) => {
            const gp = groupPos(i);
            const p  = getPal(g.label);
            const isActive = activeGroup === g.label;
            const count = groupNames(g.label).length;
            return (
              <g key={`grp-${g.label}`} transform={`translate(${gp.x},${gp.y})`}
                onClick={(e) => { e.stopPropagation(); handleGroupClick(g.label); }}
                className="cursor-pointer">
                <circle r={grRadius + (isActive ? 6 : 0)}
                  fill={p.fill} stroke={p.stroke}
                  strokeWidth={isActive ? 3 : 2} strokeOpacity={isActive ? 1 : 0.85}
                  style={{ transition: "all 0.2s" }} />
                {/* Badge */}
                <circle cx={grRadius - 4} cy={-(grRadius - 4)} r={isMobile ? 7 : 8}
                  fill={p.stroke} opacity={0.95} />
                <text x={grRadius - 4} y={-(grRadius - 4)} textAnchor="middle"
                  dominantBaseline="central" fontSize={isMobile ? 6 : 7} fill="#fff" fontWeight="700">
                  {count}
                </text>
                {/* Letter */}
                <text textAnchor="middle" dominantBaseline="central"
                  fontSize={isMobile ? 14 : 17} fill={p.text} fontWeight="800">
                  {g.label}
                </text>
              </g>
            );
          })}

          {/* Centre node */}
          <g transform={`translate(${cx},${cy})`} className="pointer-events-none">
            <circle r={R0} fill={centreFill} stroke={centreStroke} strokeWidth={2.5} />
            <circle r={R0 - 8} fill="none" stroke={centreStroke} strokeWidth={0.8} strokeOpacity={0.3} />
            <text textAnchor="middle" y={-10} fontSize={isMobile ? 20 : 26}
              fill={centreText} fontFamily="'Traditional Arabic','Amiri',serif">
              ٱللَّٰه
            </text>
            <text textAnchor="middle" y={14} fontSize={isMobile ? 7 : 8.5} fill={centreSubText}>
              {totalGroups} গ্রুপ · 99 নাম
            </text>
          </g>
        </svg>
      </div>

      {/* Legend strip */}
      <div className="flex flex-wrap gap-2 justify-center pb-2">
        {groups.map(g => {
          const p = getPal(g.label);
          const isActive = activeGroup === g.label;
          return (
            <button key={g.label} onClick={() => handleGroupClick(g.label)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold transition-all"
              style={{
                borderColor: p.stroke + (isActive ? "ff" : "88"),
                background: p.fill,
                color: p.text,
                transform: isActive ? "scale(1.1)" : "scale(1)",
                boxShadow: isActive ? `0 0 0 2px ${p.stroke}55` : "none",
              }}>
              <span>{g.label}</span>
              <span className="opacity-60">({groupNames(g.label).length})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
