import { useState } from "react";
import { names99 } from "@/data/names99";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function BrowseNames() {
  const [search, setSearch] = useState("");

  const filtered = names99.filter(n =>
    n.transliteration.toLowerCase().includes(search.toLowerCase()) ||
    n.meaning.includes(search) ||
    n.arabic.includes(search) ||
    n.meaning_en.toLowerCase().includes(search.toLowerCase()) ||
    String(n.id).includes(search)
  );

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="নাম, অর্থ বা নম্বর দিয়ে খুঁজুন..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-10 bg-surface border-border/60 focus:border-gold/60 h-12"
        />
      </div>

      <p className="text-xs text-muted-foreground">{filtered.length} / 99 নাম দেখানো হচ্ছে</p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map(name => (
          <NameCard key={name.id} name={name} />
        ))}
      </div>
    </div>
  );
}

function NameCard({ name }: { name: typeof names99[0] }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative cursor-pointer group"
      style={{ perspective: "1000px", height: "160px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-xl border border-gold/20 bg-surface p-4 flex flex-col justify-between"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex items-start justify-between">
            <span className="text-xs font-mono text-muted-foreground bg-surface-deep px-2 py-0.5 rounded-md">
              #{name.id}
            </span>
            <span className="text-xs text-muted-foreground border border-border/40 px-2 py-0.5 rounded-md">
              {name.quranCount !== "-" ? `কুরআনে ${name.quranCount}×` : "হাদিস থেকে"}
            </span>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gold leading-tight mb-1" dir="rtl">{name.arabic}</p>
            <p className="text-sm font-semibold text-foreground">{name.transliteration}</p>
          </div>
          <p className="text-xs text-center text-muted-foreground">ক্লিক করুন →</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-xl border border-emerald/30 bg-surface-deep p-4 flex flex-col justify-center items-center gap-2"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <p className="text-xl font-bold text-emerald-400 text-center">{name.meaning}</p>
          <p className="text-sm text-muted-foreground text-center italic">{name.meaning_en}</p>
          <div className="mt-2 px-3 py-1 bg-surface rounded-lg border border-border/40">
            <p className="text-xs text-muted-foreground font-mono text-center">{name.rootLetters}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
