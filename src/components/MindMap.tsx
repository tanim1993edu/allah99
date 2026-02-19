import { useState, useRef, useEffect, useCallback } from "react";
import { names99, GROUPS, MNEMONIC } from "@/data/names99";
import { X } from "lucide-react";

// ── colour palette per group (HSL stops for SVG) ──────────────────────────
const GROUP_PALETTE: Record<string, { stroke: string; fill: string; text: string }> = {
  "আ": { stroke: "#d97706", fill: "#451a03", text: "#fcd34d" },
  "ল":  { stroke: "#10b981", fill: "#022c22", text: "#6ee7b7" },
  "হ":  { stroke: "#06b6d4", fill: "#082f49", text: "#67e8f9" },
  "র":  { stroke: "#8b5cf6", fill: "#2e1065", text: "#c4b5fd" },
  "জ":  { stroke: "#f43f5e", fill: "#4c0519", text: "#fda4af" },
  "ক":  { stroke: "#eab308", fill: "#422006", text: "#fef08a" },
  "খ":  { stroke: "#f97316", fill: "#431407", text: "#fed7aa" },
  "ব":  { stroke: "#14b8a6", fill: "#042f2e", text: "#5eead4" },
  "ম":  { stroke: "#6366f1", fill: "#1e1b4b", text: "#a5b4fc" },
  "গ":  { stroke: "#84cc16", fill: "#1a2e05", text: "#bef264" },
  "ন":  { stroke: "#0ea5e9", fill: "#082f49", text: "#7dd3fc" },
  "ত":  { stroke: "#ec4899", fill: "#4a044e", text: "#f9a8d4" },
  "ও":  { stroke: "#a855f7", fill: "#3b0764", text: "#d8b4fe" },
  "ফ":  { stroke: "#ef4444", fill: "#450a0a", text: "#fca5a5" },
  "স":  { stroke: "#22c55e", fill: "#052e16", text: "#86efac" },
  "দ":  { stroke: "#94a3b8", fill: "#0f172a", text: "#cbd5e1" },
};

interface NodeInfo {
  group: string;
  name?: (typeof names99)[0];
}

// ── layout helpers ────────────────────────────────────────────────────────
const TWO_PI = Math.PI * 2;

export default function MindMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selected, setSelected] = useState<NodeInfo | null>(null);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ w: 800, h: 800 });

  // responsive
  useEffect(() => {
    const update = () => {
      const el = svgRef.current?.parentElement;
      if (!el) return;
      const w = el.clientWidth || 800;
      setDimensions({ w, h: Math.min(w, 860) });
    };
    update();
    const ro = new ResizeObserver(update);
    if (svgRef.current?.parentElement) ro.observe(svgRef.current.parentElement);
    return () => ro.disconnect();
  }, []);

  const { w, h } = dimensions;
  const cx = w / 2;
  const cy = h / 2;
  const isMobile = w < 500;

  // centre node radius
  const R0 = isMobile ? 46 : 58;
  // group ring radius
  const R1 = isMobile ? 120 : 158;
  // name leaf radius from group node
  const leafR = isMobile ? 52 : 68;

  // active groups with their names
  const groups = GROUPS.filter(g => names99.some(n => n.group === g.label));
  const totalGroups = groups.length;

  // angle for each group
  const groupAngle = (i: number) => (TWO_PI * i) / totalGroups - Math.PI / 2;

  // group node centre
  const groupPos = (i: number) => ({
    x: cx + R1 * Math.cos(groupAngle(i)),
    y: cy + R1 * Math.sin(groupAngle(i)),
  });

  // names for a group
  const groupNames = (label: string) => names99.filter(n => n.group === label);

  // leaf positions around a group node
  const leafPos = (gi: number, ni: number, total: number) => {
    const baseAngle = groupAngle(gi);
    // spread leaves outward from centre
    const spreadAngle = Math.min((TWO_PI * 0.38) / totalGroups, Math.PI / (total + 1));
    const startAngle = baseAngle - spreadAngle * (total - 1) / 2;
    const angle = startAngle + spreadAngle * ni;
    const gp = groupPos(gi);
    return {
      x: gp.x + leafR * Math.cos(angle),
      y: gp.y + leafR * Math.sin(angle),
    };
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

  return (
    <div className="space-y-4">
      {/* Mnemonic banner */}
      <div className="rounded-xl border border-border/50 bg-surface p-4 text-center">
        <p className="text-xs text-muted-foreground mb-1">মনে রাখার মন্ত্র · বইয়ের পদ্ধতি</p>
        <p className="text-lg font-bold text-gold tracking-wider">{MNEMONIC}</p>
        <p className="text-xs text-muted-foreground mt-1">প্রতিটি বর্ণ একটি গ্রুপ → নামের মাইন্ডম্যাপ</p>
      </div>

      {/* Info panel */}
      {selected && (
        <div
          className="relative rounded-xl border p-4 animate-in fade-in slide-in-from-top-2 duration-200"
          style={{
            borderColor: GROUP_PALETTE[selected.group]?.stroke + "66",
            background: GROUP_PALETTE[selected.group]?.fill + "cc",
          }}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
          {selected.name ? (
            <div className="flex items-start gap-4">
              <span
                className="text-3xl font-extrabold min-w-[2.5rem] text-center leading-none mt-1"
                style={{ color: GROUP_PALETTE[selected.group]?.text }}
              >
                {selected.name.id}
              </span>
              <div className="flex-1">
                <p className="text-2xl font-bold leading-tight" dir="rtl" style={{ color: GROUP_PALETTE[selected.group]?.text }}>
                  {selected.name.arabic}
                </p>
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
              <p className="text-lg font-bold" style={{ color: GROUP_PALETTE[selected.group]?.text }}>
                "{selected.group}" গ্রুপ
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {groupNames(selected.group).length}টি নাম · নামের নোডে ক্লিক করুন
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {groupNames(selected.group).map(n => (
                  <span
                    key={n.id}
                    className="text-xs px-2 py-0.5 rounded-full border cursor-pointer"
                    style={{ borderColor: GROUP_PALETTE[selected.group]?.stroke + "66", color: GROUP_PALETTE[selected.group]?.text }}
                  >
                    {n.transliteration}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Instruction */}
      <p className="text-xs text-muted-foreground text-center">
        গ্রুপ নোডে ক্লিক করুন নামগুলো দেখতে · নামে ক্লিক করুন বিস্তারিত দেখতে
      </p>

      {/* SVG Mindmap */}
      <div className="w-full rounded-2xl border border-border/40 bg-surface-deep overflow-hidden">
        <svg
          ref={svgRef}
          width={w}
          height={h}
          viewBox={`0 0 ${w} ${h}`}
          className="w-full h-auto"
          onClick={() => { setActiveGroup(null); setSelected(null); }}
        >
          <defs>
            <radialGradient id="bg-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="hsl(42,80%,60%)" stopOpacity="0.06" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width={w} height={h} fill="url(#bg-glow)" />

          {/* Centre → group spokes */}
          {groups.map((g, i) => {
            const gp = groupPos(i);
            const pal = GROUP_PALETTE[g.label] || GROUP_PALETTE["দ"];
            const isActive = activeGroup === g.label;
            return (
              <line
                key={`spoke-${g.label}`}
                x1={cx} y1={cy}
                x2={gp.x} y2={gp.y}
                stroke={pal.stroke}
                strokeWidth={isActive ? 2.5 : 1.2}
                strokeOpacity={isActive ? 0.9 : 0.35}
              />
            );
          })}

          {/* Group → leaf lines (only active group) */}
          {activeGroup && (() => {
            const gi = groups.findIndex(g => g.label === activeGroup);
            if (gi === -1) return null;
            const gp = groupPos(gi);
            const pal = GROUP_PALETTE[activeGroup] || GROUP_PALETTE["দ"];
            return groupNames(activeGroup).map((name, ni) => {
              const lp = leafPos(gi, ni, groupNames(activeGroup).length);
              return (
                <line
                  key={`leaf-line-${name.id}`}
                  x1={gp.x} y1={gp.y}
                  x2={lp.x} y2={lp.y}
                  stroke={pal.stroke}
                  strokeWidth={1.2}
                  strokeOpacity={0.6}
                  strokeDasharray="3 3"
                />
              );
            });
          })()}

          {/* Name leaf nodes (only active group) */}
          {activeGroup && (() => {
            const gi = groups.findIndex(g => g.label === activeGroup);
            if (gi === -1) return null;
            const pal = GROUP_PALETTE[activeGroup] || GROUP_PALETTE["দ"];
            return groupNames(activeGroup).map((name, ni) => {
              const lp = leafPos(gi, ni, groupNames(activeGroup).length);
              const leafW = isMobile ? 44 : 52;
              const leafH = isMobile ? 26 : 30;
              return (
                <g
                  key={`leaf-${name.id}`}
                  transform={`translate(${lp.x},${lp.y})`}
                  onClick={(e) => handleNameClick(e, name)}
                  className="cursor-pointer"
                >
                  <rect
                    x={-leafW / 2} y={-leafH / 2}
                    width={leafW} height={leafH}
                    rx={leafH / 2}
                    fill={pal.fill}
                    stroke={pal.stroke}
                    strokeWidth={selected?.name?.id === name.id ? 2 : 1}
                    strokeOpacity={0.8}
                  />
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={isMobile ? 7.5 : 8.5}
                    fill={pal.text}
                    fontWeight="600"
                  >
                    {name.transliteration.replace("আল-", "").replace("আর-", "").replace("আন-", "").replace("আত-", "").replace("আস-", "").replace("আশ-", "").replace("আয-", "")}
                  </text>
                </g>
              );
            });
          })()}

          {/* Group nodes */}
          {groups.map((g, i) => {
            const gp = groupPos(i);
            const pal = GROUP_PALETTE[g.label] || GROUP_PALETTE["দ"];
            const isActive = activeGroup === g.label;
            const count = groupNames(g.label).length;
            return (
              <g
                key={`group-${g.label}`}
                transform={`translate(${gp.x},${gp.y})`}
                onClick={(e) => { e.stopPropagation(); handleGroupClick(g.label); }}
                className="cursor-pointer"
              >
                <circle
                  r={grRadius + (isActive ? 5 : 0)}
                  fill={pal.fill}
                  stroke={pal.stroke}
                  strokeWidth={isActive ? 3 : 1.5}
                  strokeOpacity={isActive ? 1 : 0.7}
                  style={{ transition: "all 0.2s" }}
                />
                {/* Count badge */}
                <circle
                  cx={grRadius - 4} cy={-(grRadius - 4)}
                  r={isMobile ? 7 : 8}
                  fill={pal.stroke}
                  opacity={0.9}
                />
                <text
                  x={grRadius - 4} y={-(grRadius - 4)}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={isMobile ? 6 : 7}
                  fill="#000"
                  fontWeight="700"
                >
                  {count}
                </text>
                {/* Group letter */}
                <text
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={isMobile ? 14 : 17}
                  fill={pal.text}
                  fontWeight="800"
                >
                  {g.label}
                </text>
              </g>
            );
          })}

          {/* Centre node */}
          <g transform={`translate(${cx},${cy})`} className="pointer-events-none">
            <circle r={R0} fill="#1c1408" stroke="hsl(42,80%,60%)" strokeWidth={2.5} />
            <circle r={R0 - 8} fill="none" stroke="hsl(42,80%,60%)" strokeWidth={0.8} strokeOpacity={0.3} />
            <text
              textAnchor="middle"
              y={-10}
              fontSize={isMobile ? 20 : 26}
              fill="hsl(42,80%,70%)"
              fontFamily="'Traditional Arabic','Amiri',serif"
            >
              ٱللَّٰه
            </text>
            <text
              textAnchor="middle"
              y={14}
              fontSize={isMobile ? 7 : 8.5}
              fill="hsl(42,60%,65%)"
            >
              {totalGroups} গ্রুপ · 99 নাম
            </text>
          </g>
        </svg>
      </div>

      {/* Group legend strip */}
      <div className="flex flex-wrap gap-2 justify-center pb-2">
        {groups.map(g => {
          const pal = GROUP_PALETTE[g.label] || GROUP_PALETTE["দ"];
          const isActive = activeGroup === g.label;
          return (
            <button
              key={g.label}
              onClick={() => handleGroupClick(g.label)}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold transition-all"
              style={{
                borderColor: pal.stroke + (isActive ? "ff" : "55"),
                background: pal.fill + (isActive ? "ff" : "88"),
                color: pal.text,
                transform: isActive ? "scale(1.1)" : "scale(1)",
              }}
            >
              <span>{g.label}</span>
              <span className="opacity-60">({groupNames(g.label).length})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
