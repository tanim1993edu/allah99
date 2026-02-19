export interface Name99 {
  id: number;
  arabic: string;
  transliteration: string;
  meaning: string;
  meaning_en: string;
  quranCount: number | string;
  rootLetters: string;
  group: string;
  groupLabel: string;
}

// Mnemonic: "আল্লাহর জিকিরে খুব মগ্ন, তাওয়াফে, সারাদিন"
// আ = আল্লাহর, ল = লাতীফ, হ = হা, র = র, জ = জিকিরে, ক/খ = খুব, ব = ব, ম = মগ্ন, গ = গ, ন = নূর, ত = তাওয়াফে, ও = ও, ফ = ফাত্তাহ, স = সারাদিন

export const MNEMONIC = "আল্লাহর জিকিরে খুব মগ্ন, তাওয়াফে, সারাদিন";

export const GROUP_COLORS: Record<string, string> = {
  "আ": "from-amber-900/40 to-amber-800/20 border-amber-600/40",
  "ল": "from-emerald-900/40 to-emerald-800/20 border-emerald-600/40",
  "হ": "from-cyan-900/40 to-cyan-800/20 border-cyan-600/40",
  "র": "from-violet-900/40 to-violet-800/20 border-violet-600/40",
  "জ": "from-rose-900/40 to-rose-800/20 border-rose-600/40",
  "ক": "from-yellow-900/40 to-yellow-800/20 border-yellow-600/40",
  "খ": "from-orange-900/40 to-orange-800/20 border-orange-600/40",
  "ব": "from-teal-900/40 to-teal-800/20 border-teal-600/40",
  "ম": "from-indigo-900/40 to-indigo-800/20 border-indigo-600/40",
  "গ": "from-lime-900/40 to-lime-800/20 border-lime-600/40",
  "ন": "from-sky-900/40 to-sky-800/20 border-sky-600/40",
  "ত": "from-pink-900/40 to-pink-800/20 border-pink-600/40",
  "ও": "from-purple-900/40 to-purple-800/20 border-purple-600/40",
  "ফ": "from-red-900/40 to-red-800/20 border-red-600/40",
  "স": "from-green-900/40 to-green-800/20 border-green-600/40",
};

export const names99: Name99[] = [
  // ── আ Group ──
  { id: 1, arabic: "ٱلْأَوَّل", transliteration: "আল-আওয়াল", meaning: "সর্বপ্রথম", meaning_en: "The First", quranCount: 1, rootLetters: "أ-و-ل", group: "আ", groupLabel: "আ" },
  { id: 2, arabic: "ٱلْآخِر", transliteration: "আল-আখির", meaning: "সর্বশেষ", meaning_en: "The Last", quranCount: 1, rootLetters: "أ-خ-ر", group: "আ", groupLabel: "আ" },
  { id: 3, arabic: "ٱلْمُؤَخِّر", transliteration: "আল-মুআখখির", meaning: "পিছিয়ে দেওয়াকারী", meaning_en: "The Delayer", quranCount: 15, rootLetters: "أ-خ-ر", group: "আ", groupLabel: "আ" },
  { id: 4, arabic: "ٱلْعَلِيّ", transliteration: "আল-আলী", meaning: "সর্বোচ্চ, মহীয়ান", meaning_en: "The Most High", quranCount: 11, rootLetters: "ع-ل-و", group: "আ", groupLabel: "আ" },
  { id: 5, arabic: "ٱلْمُتَعَالِ", transliteration: "আল-মুতা'আলী", meaning: "সর্বোন্নত, মহিমানিত", meaning_en: "The Most Exalted", quranCount: 1, rootLetters: "ع-ل-و", group: "আ", groupLabel: "আ" },
  { id: 6, arabic: "ٱلْعَلِيم", transliteration: "আল-আলীম", meaning: "সর্বজ্ঞ", meaning_en: "The All-Knowing", quranCount: 157, rootLetters: "ع-ل-م", group: "আ", groupLabel: "আ" },
  { id: 7, arabic: "ٱلْعَظِيم", transliteration: "আল-আযীম", meaning: "সর্বমহান", meaning_en: "The Magnificent", quranCount: 9, rootLetters: "ع-ظ-م", group: "আ", groupLabel: "আ" },
  { id: 8, arabic: "ٱلْعَزِيز", transliteration: "আল-আযীয", meaning: "মহাপরাক্রমশালী", meaning_en: "The Almighty", quranCount: 101, rootLetters: "ع-ز-ز", group: "আ", groupLabel: "আ" },
  { id: 9, arabic: "ٱلْمُعِزّ", transliteration: "আল-মু'ইয", meaning: "সম্মান দানকারী", meaning_en: "The Honourer", quranCount: "-", rootLetters: "ع-ز-ز", group: "আ", groupLabel: "আ" },
  { id: 10, arabic: "ٱلْعَفُوّ", transliteration: "আল-আফুউ", meaning: "পাপ মোচনকারী", meaning_en: "The Pardoner", quranCount: 5, rootLetters: "ع-ف-و", group: "আ", groupLabel: "আ" },
  { id: 11, arabic: "ٱلْعَدْل", transliteration: "আল-আদল", meaning: "ন্যায়পরায়ণ", meaning_en: "The Just", quranCount: "-", rootLetters: "ع-د-ل", group: "আ", groupLabel: "আ" },
  { id: 12, arabic: "ٱلْأَحَد", transliteration: "আল-আহাদ", meaning: "এক, অদ্বিতীয়", meaning_en: "The One", quranCount: 1, rootLetters: "أ-ح-د", group: "আ", groupLabel: "আ" },

  // ── ল Group ──
  { id: 13, arabic: "ٱللَّطِيف", transliteration: "আল-লাতীফ", meaning: "সূক্ষ্মদর্শী, দক্ষতাসম্পন্ন", meaning_en: "The Subtle One", quranCount: 7, rootLetters: "ل-ط-ف", group: "ল", groupLabel: "ল" },

  // ── হ Group ──
  { id: 14, arabic: "ٱلْحَقّ", transliteration: "আল-হাক্ক", meaning: "মহাসত্য", meaning_en: "The Truth", quranCount: 10, rootLetters: "ح-ق-ق", group: "হ", groupLabel: "হ" },
  { id: 15, arabic: "ٱلْهَادِي", transliteration: "আল-হাদী", meaning: "পথপ্রদর্শনকারী", meaning_en: "The Guide", quranCount: 2, rootLetters: "ه-د-ي", group: "হ", groupLabel: "হ" },
  { id: 16, arabic: "ٱلْحَيّ", transliteration: "আল-হাই", meaning: "চিরঞ্জীব", meaning_en: "The Ever-Living", quranCount: 5, rootLetters: "ح-ي-ي", group: "হ", groupLabel: "হ" },
  { id: 17, arabic: "ٱلْحَكِيم", transliteration: "আল-হাকীম", meaning: "প্রজ্ঞাময়", meaning_en: "The Wise", quranCount: 97, rootLetters: "ح-ك-م", group: "হ", groupLabel: "হ" },
  { id: 18, arabic: "ٱلْحَكَم", transliteration: "আল-হাকাম", meaning: "চূড়ান্ত বিচারক", meaning_en: "The Judge", quranCount: 30, rootLetters: "ح-ك-م", group: "হ", groupLabel: "হ" },
  { id: 19, arabic: "ٱلْحَفِيظ", transliteration: "আল-হাফীজ", meaning: "মহারক্ষক", meaning_en: "The Preserver", quranCount: 3, rootLetters: "ح-ف-ظ", group: "হ", groupLabel: "হ" },
  { id: 20, arabic: "ٱلْحَمِيد", transliteration: "আল-হামীদ", meaning: "প্রশংসনীয়", meaning_en: "The Praiseworthy", quranCount: 43, rootLetters: "ح-م-د", group: "হ", groupLabel: "হ" },
  { id: 21, arabic: "ٱلْحَلِيم", transliteration: "আল-হালীম", meaning: "পরম সহনশীল", meaning_en: "The Forbearing", quranCount: 21, rootLetters: "ح-ل-م", group: "হ", groupLabel: "হ" },
  { id: 22, arabic: "ٱلْحَسِيب", transliteration: "আল-হাসীব", meaning: "হিসাব গ্রহণকারী", meaning_en: "The Reckoner", quranCount: 3, rootLetters: "ح-س-ب", group: "হ", groupLabel: "হ" },

  // ── র Group ──
  { id: 23, arabic: "ٱلرَّحْمَٰن", transliteration: "আর-রহমান", meaning: "পরম দয়ালু", meaning_en: "The Most Gracious", quranCount: 57, rootLetters: "ر-ح-م", group: "র", groupLabel: "র" },
  { id: 24, arabic: "ٱلرَّحِيم", transliteration: "আর-রহীম", meaning: "অতি দয়ালু", meaning_en: "The Most Merciful", quranCount: 114, rootLetters: "ر-ح-م", group: "র", groupLabel: "র" },
  { id: 25, arabic: "ٱلرَّقِيب", transliteration: "আর-রকীব", meaning: "মহাপর্যবেক্ষক", meaning_en: "The Watchful", quranCount: 3, rootLetters: "ر-ق-ب", group: "র", groupLabel: "র" },
  { id: 26, arabic: "ٱلرَّشِيد", transliteration: "আর-রশীদ", meaning: "সৎপথ পরিচালনাকারী", meaning_en: "The Guide to Right Path", quranCount: "-", rootLetters: "ر-ش-د", group: "র", groupLabel: "র" },
  { id: 27, arabic: "ٱلرَّؤُوف", transliteration: "আর-রাউফ", meaning: "অতি স্নেহশীল", meaning_en: "The Compassionate", quranCount: 10, rootLetters: "ر-أ-ف", group: "র", groupLabel: "র" },
  { id: 28, arabic: "ٱلرَّفِيع", transliteration: "আর-রফীউ", meaning: "উন্নয়নকারী", meaning_en: "The Exalter", quranCount: "-", rootLetters: "ر-ف-ع", group: "র", groupLabel: "র" },
  { id: 29, arabic: "ٱلرَّزَّاق", transliteration: "আর-রাজ্জাক", meaning: "রিজিক দানকারী", meaning_en: "The Provider", quranCount: 1, rootLetters: "ر-ز-ق", group: "র", groupLabel: "র" },

  // ── জ Group ──
  { id: 30, arabic: "ٱلْجَبَّار", transliteration: "আল-জাব্বার", meaning: "মহাশক্তিমান", meaning_en: "The Compeller", quranCount: 1, rootLetters: "ج-ب-ر", group: "জ", groupLabel: "জ" },
  { id: 31, arabic: "ٱلْجَلِيل", transliteration: "আল-জালীল", meaning: "মহামহিমান্বিত", meaning_en: "The Majestic", quranCount: 2, rootLetters: "ج-ل-ل", group: "জ", groupLabel: "জ" },
  { id: 32, arabic: "ذُو ٱلْجَلَٰلِ وَٱلْإِكْرَامِ", transliteration: "যুল-জালালি ওয়াল-ইকরাম", meaning: "মহিমা ও মহানুভবতার অধিকারী", meaning_en: "Lord of Majesty and Bounty", quranCount: 2, rootLetters: "ج-ل-ل", group: "জ", groupLabel: "জ" },
  { id: 33, arabic: "ٱلْجَامِع", transliteration: "আল-জামিউ", meaning: "সমবেতকারী", meaning_en: "The Gatherer", quranCount: "-", rootLetters: "ج-م-ع", group: "জ", groupLabel: "জ" },
  { id: 34, arabic: "ٱلْمُجِيب", transliteration: "আল-মুজীব", meaning: "দোয়া কবুলকারী", meaning_en: "The Responsive", quranCount: 1, rootLetters: "ج-و-ب", group: "জ", groupLabel: "জ" },

  // ── ক Group ──
  { id: 35, arabic: "ٱلْكَبِير", transliteration: "আল-কাবীর", meaning: "মহান", meaning_en: "The Great", quranCount: 12, rootLetters: "ك-ب-ر", group: "ক", groupLabel: "ক" },
  { id: 36, arabic: "ٱلْمُتَكَبِّر", transliteration: "আল-মুতাকাব্বির", meaning: "সর্বশ্রেষ্ঠ", meaning_en: "The Proud", quranCount: 1, rootLetters: "ك-ب-ر", group: "ক", groupLabel: "ক" },
  { id: 37, arabic: "ٱلْقَدِير", transliteration: "আল-কাদীর", meaning: "সর্বশক্তিমান", meaning_en: "The Capable", quranCount: 52, rootLetters: "ق-د-ر", group: "ক", groupLabel: "ক" },
  { id: 38, arabic: "ٱلْمُقْتَدِر", transliteration: "আল-মুক্তাদির", meaning: "মহাক্ষমতাবান", meaning_en: "The Powerful", quranCount: 3, rootLetters: "ق-د-ر", group: "ক", groupLabel: "ক" },
  { id: 39, arabic: "ٱلْقُدُّوس", transliteration: "আল-কুদ্দুস", meaning: "পবিত্র, নিখুঁত", meaning_en: "The Holy", quranCount: 2, rootLetters: "ق-د-س", group: "ক", groupLabel: "ক" },
  { id: 40, arabic: "ٱلْقَابِض", transliteration: "আল-কাবিদ", meaning: "সংকোচনকারী", meaning_en: "The Withholder", quranCount: "-", rootLetters: "ق-ب-ض", group: "ক", groupLabel: "ক" },
  { id: 41, arabic: "ٱلْقَيُّوم", transliteration: "আল-কাইয়ুম", meaning: "চিরস্থায়ী", meaning_en: "The Sustainer", quranCount: 3, rootLetters: "ق-و-م", group: "ক", groupLabel: "ক" },
  { id: 42, arabic: "ٱلْكَرِيم", transliteration: "আল-কারীম", meaning: "সম্মানিত, উদার", meaning_en: "The Generous", quranCount: "-", rootLetters: "ك-ر-م", group: "ক", groupLabel: "ক" },
  { id: 43, arabic: "ٱلْقَوِيّ", transliteration: "আল-কাওয়ী", meaning: "মহাশক্তিধর", meaning_en: "The Strong", quranCount: 9, rootLetters: "ق-و-ي", group: "ক", groupLabel: "ক" },
  { id: 44, arabic: "ٱلْقَهَّار", transliteration: "আল-কাহহার", meaning: "দমনকারী", meaning_en: "The Subduer", quranCount: 6, rootLetters: "ق-ه-ر", group: "ক", groupLabel: "ক" },

  // ── খ Group ──
  { id: 45, arabic: "ٱلْخَبِير", transliteration: "আল-খবীর", meaning: "সম্যক অবগত", meaning_en: "The Aware", quranCount: 45, rootLetters: "خ-ب-ر", group: "খ", groupLabel: "খ" },
  { id: 46, arabic: "ٱلْخَالِق", transliteration: "আল-খালিক", meaning: "সৃষ্টিকর্তা", meaning_en: "The Creator", quranCount: 12, rootLetters: "خ-ل-ق", group: "খ", groupLabel: "খ" },
  { id: 47, arabic: "ٱلْخَافِض", transliteration: "আল-খাফিদ", meaning: "অবনতকারী", meaning_en: "The Abaser", quranCount: "-", rootLetters: "خ-ف-ض", group: "খ", groupLabel: "খ" },

  // ── ব Group ──
  { id: 48, arabic: "ٱلْبَاسِط", transliteration: "আল-বাসিত", meaning: "সম্প্রসারণকারী", meaning_en: "The Expander", quranCount: "-", rootLetters: "ب-س-ط", group: "ব", groupLabel: "ব" },
  { id: 49, arabic: "ٱلْبَصِير", transliteration: "আল-বাসীর", meaning: "সর্বদ্রষ্টা", meaning_en: "The All-Seeing", quranCount: 148, rootLetters: "ب-ص-ر", group: "ব", groupLabel: "ব" },
  { id: 50, arabic: "ٱلْبَاعِث", transliteration: "আল-বাইস", meaning: "পুনরুত্থানকারী", meaning_en: "The Resurrector", quranCount: "-", rootLetters: "ب-ع-ث", group: "ব", groupLabel: "ব" },
  { id: 51, arabic: "ٱلْبَاقِي", transliteration: "আল-বাকী", meaning: "চিরবিরাজমান", meaning_en: "The Everlasting", quranCount: "-", rootLetters: "ب-ق-ي", group: "ব", groupLabel: "ব" },
  { id: 52, arabic: "ٱلْبَرّ", transliteration: "আল-বার", meaning: "কল্যাণদাতা", meaning_en: "The Source of Goodness", quranCount: 1, rootLetters: "ب-ر-ر", group: "ব", groupLabel: "ব" },
  { id: 53, arabic: "ٱلْبَارِئ", transliteration: "আল-বারি'", meaning: "উদ্ভাবনকারী", meaning_en: "The Originator", quranCount: 1, rootLetters: "ب-ر-أ", group: "ব", groupLabel: "ব" },
  { id: 54, arabic: "ٱلْبَاطِن", transliteration: "আল-বাতিন", meaning: "অপ্রকাশমান", meaning_en: "The Hidden", quranCount: 1, rootLetters: "ب-ط-ن", group: "ব", groupLabel: "ব" },
  { id: 55, arabic: "ٱلْبَدِيع", transliteration: "আল-বাদী'", meaning: "অভিনব সৃষ্টিকারী", meaning_en: "The Originator", quranCount: 4, rootLetters: "ب-د-ع", group: "ব", groupLabel: "ব" },

  // ── ম Group ──
  { id: 56, arabic: "ٱلْمَتِين", transliteration: "আল-মাতীন", meaning: "দৃঢ়, স্থির", meaning_en: "The Firm", quranCount: 1, rootLetters: "م-ت-ن", group: "ম", groupLabel: "ম" },
  { id: 57, arabic: "ٱلْمُؤْمِن", transliteration: "আল-মু'মিন", meaning: "নিরাপত্তাদাতা", meaning_en: "The Guardian of Faith", quranCount: 1, rootLetters: "أ-م-ن", group: "ম", groupLabel: "ম" },
  { id: 58, arabic: "ٱلْمُهَيْمِن", transliteration: "আল-মুহাইমিন", meaning: "রক্ষক, অভিভাবক", meaning_en: "The Protector", quranCount: 1, rootLetters: "ه-م-ن", group: "ম", groupLabel: "ম" },
  { id: 59, arabic: "ٱلْمُبِين", transliteration: "আল-মুবীন", meaning: "সত্য প্রকাশকারী", meaning_en: "The Manifest", quranCount: 1, rootLetters: "ب-ي-ن", group: "ম", groupLabel: "ম" },
  { id: 60, arabic: "ٱلْمُذِلّ", transliteration: "আল-মুযিল", meaning: "অপমানকারী", meaning_en: "The Humiliator", quranCount: "-", rootLetters: "ذ-ل-ل", group: "ম", groupLabel: "ম" },
  { id: 61, arabic: "ٱلْمُقِيت", transliteration: "আল-মুকীত", meaning: "আহার দাতা", meaning_en: "The Nourisher", quranCount: 1, rootLetters: "ق-و-ت", group: "ম", groupLabel: "ম" },
  { id: 62, arabic: "ٱلْمُقْسِط", transliteration: "আল-মুকসিত", meaning: "ন্যায়বান", meaning_en: "The Equitable", quranCount: "-", rootLetters: "ق-س-ط", group: "ম", groupLabel: "ম" },
  { id: 63, arabic: "ٱلْمُقَدِّم", transliteration: "আল-মুকাদ্দিম", meaning: "অগ্রসরকারী", meaning_en: "The Expediter", quranCount: "-", rootLetters: "ق-د-م", group: "ম", groupLabel: "ম" },
  { id: 64, arabic: "ٱلْمُنْتَقِم", transliteration: "আল-মুনতাকিম", meaning: "প্রতিশোধ গ্রহণকারী", meaning_en: "The Avenger", quranCount: 3, rootLetters: "ن-ق-م", group: "ম", groupLabel: "ম" },
  { id: 65, arabic: "ٱلْمُصَوِّر", transliteration: "আল-মুসাওয়ির", meaning: "আকৃতিদানকারী", meaning_en: "The Fashioner", quranCount: 1, rootLetters: "ص-و-ر", group: "ম", groupLabel: "ম" },
  { id: 66, arabic: "ٱلْمُمِيت", transliteration: "আল-মুমীত", meaning: "মৃত্যুদাতা", meaning_en: "The Taker of Life", quranCount: "-", rootLetters: "م-و-ت", group: "ম", groupLabel: "ম" },
  { id: 67, arabic: "ٱلْمُعِيد", transliteration: "আল-মু'ঈদ", meaning: "পুনরুত্থানকারী", meaning_en: "The Restorer", quranCount: "-", rootLetters: "ع-و-د", group: "ম", groupLabel: "ম" },
  { id: 68, arabic: "ٱلْمَلِك", transliteration: "আল-মালিক", meaning: "অধিপতি", meaning_en: "The King", quranCount: 8, rootLetters: "م-ل-ك", group: "ম", groupLabel: "ম" },
  { id: 69, arabic: "مَالِك ٱلْمُلْك", transliteration: "মালিকুল মুলক", meaning: "সার্বভৌম ক্ষমতার মালিক", meaning_en: "Master of the Kingdom", quranCount: 1, rootLetters: "م-ل-ك", group: "ম", groupLabel: "ম" },
  { id: 70, arabic: "ٱلْمَجِيد", transliteration: "আল-মাজীদ", meaning: "মহিমাময়", meaning_en: "The Glorious", quranCount: 1, rootLetters: "م-ج-د", group: "ম", groupLabel: "ম" },
  { id: 71, arabic: "ٱلْمَاجِد", transliteration: "আল-মাজিদ", meaning: "মহাগৌরবান্বিত", meaning_en: "The Noble", quranCount: "-", rootLetters: "م-ج-د", group: "ম", groupLabel: "ম" },
  { id: 72, arabic: "ٱلْمَانِع", transliteration: "আল-মানিউ", meaning: "প্রতিরোধকারী", meaning_en: "The Preventer", quranCount: "-", rootLetters: "م-ن-ع", group: "ম", groupLabel: "ম" },
  { id: 73, arabic: "ٱلْمُحْصِي", transliteration: "আল-মুহসী", meaning: "সুক্ষ্ম হিসাবরক্ষক", meaning_en: "The Accountant", quranCount: "-", rootLetters: "ح-ص-ي", group: "ম", groupLabel: "ম" },
  { id: 74, arabic: "ٱلْمُبْدِئ", transliteration: "আল-মুবদি'", meaning: "প্রথম সৃষ্টিকারী", meaning_en: "The Originator", quranCount: "-", rootLetters: "ب-د-أ", group: "ম", groupLabel: "ম" },
  { id: 75, arabic: "ٱلْمُغْنِي", transliteration: "আল-মুগনী", meaning: "সম্পদ দাতা", meaning_en: "The Enricher", quranCount: "-", rootLetters: "غ-ن-ي", group: "ম", groupLabel: "ম" },

  // ── গ Group ──
  { id: 76, arabic: "ٱلْغَفُور", transliteration: "আল-গফুর", meaning: "পরম ক্ষমাশীল", meaning_en: "The Forgiving", quranCount: 91, rootLetters: "غ-ف-ر", group: "গ", groupLabel: "গ" },
  { id: 77, arabic: "ٱلْغَفَّار", transliteration: "আল-গাফফার", meaning: "বারবার ক্ষমাকারী", meaning_en: "The Repeatedly Forgiving", quranCount: 5, rootLetters: "غ-ف-ر", group: "গ", groupLabel: "গ" },
  { id: 78, arabic: "ٱلْغَنِيّ", transliteration: "আল-গনী", meaning: "অভাবমুক্ত, সম্পদশালী", meaning_en: "The Self-Sufficient", quranCount: 18, rootLetters: "غ-ن-ي", group: "গ", groupLabel: "গ" },

  // ── ন Group ──
  { id: 79, arabic: "ٱلنُّور", transliteration: "আন-নূর", meaning: "আলো, জ্যোতি", meaning_en: "The Light", quranCount: 1, rootLetters: "ن-و-ر", group: "ন", groupLabel: "ন" },
  { id: 80, arabic: "ٱلنَّافِع", transliteration: "আন-নাফিউ", meaning: "উপকারকারী", meaning_en: "The Propitious", quranCount: "-", rootLetters: "ن-ف-ع", group: "ন", groupLabel: "ন" },

  // ── ত Group ──
  { id: 81, arabic: "ٱلتَّوَّاب", transliteration: "আত-তাওয়াব", meaning: "তওবা কবুলকারী", meaning_en: "The Acceptor of Repentance", quranCount: 11, rootLetters: "ت-و-ب", group: "ত", groupLabel: "ত" },
  { id: 82, arabic: "ٱلظَّاهِر", transliteration: "আয-যাহির", meaning: "প্রকাশমান", meaning_en: "The Manifest", quranCount: 1, rootLetters: "ظ-ه-ر", group: "ত", groupLabel: "ত" },

  // ── ও Group ──
  { id: 83, arabic: "ٱلْوَهَّاب", transliteration: "আল-ওয়াহহাব", meaning: "মহাদাতা", meaning_en: "The Bestower", quranCount: 3, rootLetters: "و-ه-ب", group: "ও", groupLabel: "ও" },
  { id: 84, arabic: "ٱلْوَاحِد", transliteration: "আল-ওয়াহিদ", meaning: "এক, অনন্য", meaning_en: "The One", quranCount: 22, rootLetters: "و-ح-د", group: "ও", groupLabel: "ও" },
  { id: 85, arabic: "ٱلْوَاجِد", transliteration: "আল-ওয়াজিদ", meaning: "সন্ধানকারী", meaning_en: "The Perceiver", quranCount: "-", rootLetters: "و-ج-د", group: "ও", groupLabel: "ও" },
  { id: 86, arabic: "ٱلْوَدُود", transliteration: "আল-ওয়াদুদ", meaning: "স্নেহশীল, প্রেমময়", meaning_en: "The Loving", quranCount: 2, rootLetters: "و-د-د", group: "ও", groupLabel: "ও" },
  { id: 87, arabic: "ٱلْوَكِيل", transliteration: "আল-ওয়াকীল", meaning: "আস্থাভাজন প্রতিনিধি", meaning_en: "The Trustee", quranCount: 13, rootLetters: "و-ك-ل", group: "ও", groupLabel: "ও" },
  { id: 88, arabic: "ٱلْوَارِث", transliteration: "আল-ওয়ারিস", meaning: "চূড়ান্ত উত্তরাধিকারী", meaning_en: "The Inheritor", quranCount: "-", rootLetters: "و-ر-ث", group: "ও", groupLabel: "ও" },
  { id: 89, arabic: "ٱلْوَاسِع", transliteration: "আল-ওয়াসি'", meaning: "সর্বপরিবেষ্টনকারী", meaning_en: "The All-Encompassing", quranCount: 6, rootLetters: "و-س-ع", group: "ও", groupLabel: "ও" },
  { id: 90, arabic: "ٱلْوَالِي", transliteration: "আল-ওয়ালী", meaning: "বন্ধু, রক্ষক", meaning_en: "The Protecting Friend", quranCount: 6, rootLetters: "و-ل-ي", group: "ও", groupLabel: "ও" },

  // ── ফ Group ──
  { id: 91, arabic: "ٱلْفَتَّاح", transliteration: "আল-ফাত্তাহ", meaning: "শ্রেষ্ঠ মীমাংসাকারী", meaning_en: "The Supreme Opener", quranCount: 1, rootLetters: "ف-ت-ح", group: "ফ", groupLabel: "ফ" },

  // ── স Group ──
  { id: 92, arabic: "ٱلسَّلَٰم", transliteration: "আস-সালাম", meaning: "শান্তির উৎস", meaning_en: "The Source of Peace", quranCount: 1, rootLetters: "س-ل-م", group: "স", groupLabel: "স" },
  { id: 93, arabic: "ٱلصَّبُور", transliteration: "আস-সাবুর", meaning: "মহাধৈর্যশীল", meaning_en: "The Patient One", quranCount: "-", rootLetters: "ص-ب-ر", group: "স", groupLabel: "স" },
  { id: 94, arabic: "ٱلشَّكُور", transliteration: "আশ-শাকুর", meaning: "কৃতজ্ঞতা স্বীকারকারী", meaning_en: "The Appreciative", quranCount: 4, rootLetters: "ش-ك-ر", group: "স", groupLabel: "স" },
  { id: 95, arabic: "ٱلشَّهِيد", transliteration: "আশ-শাহীদ", meaning: "মহাসাক্ষী", meaning_en: "The Witness", quranCount: 16, rootLetters: "ش-ه-د", group: "স", groupLabel: "স" },
  { id: 96, arabic: "ٱلسَّمِيع", transliteration: "আস-সামীউ", meaning: "সর্বশ্রোতা", meaning_en: "The All-Hearing", quranCount: 45, rootLetters: "س-م-ع", group: "স", groupLabel: "স" },
  { id: 97, arabic: "ٱلصَّمَد", transliteration: "আস-সামাদ", meaning: "অমুখাপেক্ষী", meaning_en: "The Eternal", quranCount: 1, rootLetters: "ص-م-د", group: "স", groupLabel: "স" },

  // ── দ Group ──
  { id: 98, arabic: "ٱلضَّارّ", transliteration: "আদ-দার", meaning: "অনিষ্টকারী", meaning_en: "The Distresser", quranCount: "-", rootLetters: "ض-ر-ر", group: "দ", groupLabel: "দ" },

  // ── য Group ──
  { id: 99, arabic: "ٱلصَّمَد", transliteration: "আল-মুকাদ্দির", meaning: "ভাগ্য নির্ধারণকারী", meaning_en: "The Determiner", quranCount: "-", rootLetters: "ق-د-ر", group: "দ", groupLabel: "দ" },
];

export const GROUPS = [
  { label: "আ", color: "bg-amber-100  dark:bg-amber-500/20  text-amber-700  dark:text-amber-300  border-amber-400  dark:border-amber-500/30" },
  { label: "ল",  color: "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-400 dark:border-emerald-500/30" },
  { label: "হ",  color: "bg-cyan-100   dark:bg-cyan-500/20   text-cyan-700   dark:text-cyan-300   border-cyan-400   dark:border-cyan-500/30" },
  { label: "র",  color: "bg-violet-100 dark:bg-violet-500/20 text-violet-700 dark:text-violet-300 border-violet-400 dark:border-violet-500/30" },
  { label: "জ",  color: "bg-rose-100   dark:bg-rose-500/20   text-rose-700   dark:text-rose-300   border-rose-400   dark:border-rose-500/30" },
  { label: "ক",  color: "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-400 dark:border-yellow-500/30" },
  { label: "খ",  color: "bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300 border-orange-400 dark:border-orange-500/30" },
  { label: "ব",  color: "bg-teal-100   dark:bg-teal-500/20   text-teal-700   dark:text-teal-300   border-teal-400   dark:border-teal-500/30" },
  { label: "ম",  color: "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-400 dark:border-indigo-500/30" },
  { label: "গ",  color: "bg-lime-100   dark:bg-lime-500/20   text-lime-700   dark:text-lime-300   border-lime-400   dark:border-lime-500/30" },
  { label: "ন",  color: "bg-sky-100    dark:bg-sky-500/20    text-sky-700    dark:text-sky-300    border-sky-400    dark:border-sky-500/30" },
  { label: "ত",  color: "bg-pink-100   dark:bg-pink-500/20   text-pink-700   dark:text-pink-300   border-pink-400   dark:border-pink-500/30" },
  { label: "ও",  color: "bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-400 dark:border-purple-500/30" },
  { label: "ফ",  color: "bg-red-100    dark:bg-red-500/20    text-red-700    dark:text-red-300    border-red-400    dark:border-red-500/30" },
  { label: "স",  color: "bg-green-100  dark:bg-green-500/20  text-green-700  dark:text-green-300  border-green-400  dark:border-green-500/30" },
  { label: "দ",  color: "bg-slate-100  dark:bg-slate-500/20  text-slate-700  dark:text-slate-300  border-slate-400  dark:border-slate-500/30" },
];

export const getGroupColor = (group: string): string => {
  const found = GROUPS.find(g => g.label === group);
  return found?.color || "bg-slate-100 dark:bg-slate-500/20 text-slate-700 dark:text-slate-300 border-slate-400 dark:border-slate-500/30";
};
