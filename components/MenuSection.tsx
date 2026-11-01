"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import {
  Coffee,
  Utensils,
  ThumbsUp,
  Search,
  CupSoda,
  Wine,
  Flame,
  X,
  Award,
  ChefHat,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { soundEffects } from "@/lib/soundEffects";

interface MenuItem {
  id: string;
  name: string;
  side: "thirsty" | "hungry";
  subcategory:
    | "catch-a-matcha"
    | "canos"
    | "classic"
    | "frootea"
    | "frostblend"
    | "coolers"
    | "lattes"
    | "big-munch"
    | "lil-munch";
  subcategoryLabel: string;
  price: string;
  description: string;
  recommended?: boolean;
  extra?: string;
  accentColor: "orange" | "lightblue" | "pink";
}

const MENU_ITEMS: MenuItem[] = [
  // ==================== THIRSTY SIDE (DRINKS) ====================
  // CATCH-A-MATCHA
  {
    id: "cha-tte",
    name: "Cha-tte",
    side: "thirsty",
    subcategory: "catch-a-matcha",
    subcategoryLabel: "CATCH-A-MATCHA",
    price: "31k",
    description: "Matcha murni artisan bertekstur lembut dengan perpaduan susu segar pilihan.",
    accentColor: "lightblue",
  },
  {
    id: "berry-chatte",
    name: "Berry Cha-tte",
    side: "thirsty",
    subcategory: "catch-a-matcha",
    subcategoryLabel: "CATCH-A-MATCHA",
    price: "33k",
    description: "Coulis buah beri asam manis segar yang dipadukan dengan matcha kental.",
    accentColor: "pink",
  },
  {
    id: "honey-yuzunade",
    name: "Honey Yuzunade",
    side: "thirsty",
    subcategory: "catch-a-matcha",
    subcategoryLabel: "CATCH-A-MATCHA",
    price: "33k",
    description: "Sentuhan citrus yuzu khas Jepang dengan madu hutan dan seduhan matcha segar.",
    recommended: true,
    accentColor: "orange",
  },
  {
    id: "dirty-matcha",
    name: "Dirty Matcha",
    side: "thirsty",
    subcategory: "catch-a-matcha",
    subcategoryLabel: "CATCH-A-MATCHA",
    price: "36k",
    description: "Single shot espresso bold yang dituangkan langsung di atas artisan iced matcha.",
    accentColor: "orange",
  },

  // 'CANOS (Coffee w/ Zing)
  {
    id: "orangicano",
    name: "Orangicano",
    side: "thirsty",
    subcategory: "canos",
    subcategoryLabel: "'CANOS",
    price: "25k",
    description: "Sari buah jeruk manis segar berpadu kontras dengan espresso pekat ber-crema.",
    recommended: true,
    accentColor: "orange",
  },
  {
    id: "zesticano",
    name: "Zesticano",
    side: "thirsty",
    subcategory: "canos",
    subcategoryLabel: "'CANOS",
    price: "25k",
    description: "Americano berkarbonasi dingin dengan aroma lemon zest yang menyegarkan dahaga.",
    accentColor: "lightblue",
  },
  {
    id: "goricano",
    name: "Goricano",
    side: "thirsty",
    subcategory: "canos",
    subcategoryLabel: "'CANOS",
    price: "25k",
    description: "Kombinasi eksotis rasa buah tropis dengan sentuhan roasted coffee beans yang mantap.",
    accentColor: "orange",
  },
  {
    id: "spro-tonic",
    name: "'Spro & Tonic",
    side: "thirsty",
    subcategory: "canos",
    subcategoryLabel: "'CANOS",
    price: "25k",
    description: "Craft tonic water bersoda dingin dengan float espresso harum di lapisan atas.",
    accentColor: "lightblue",
  },

  // CLASSIC
  {
    id: "black",
    name: "Black",
    side: "thirsty",
    subcategory: "classic",
    subcategoryLabel: "CLASSIC",
    price: "20k",
    description: "Double shot espresso aromatik diseduh gaya Americano / Long Black murni.",
    accentColor: "orange",
  },
  {
    id: "cappuccino-magic",
    name: "Cappucinno / Magic",
    side: "thirsty",
    subcategory: "classic",
    subcategoryLabel: "CLASSIC",
    price: "25k",
    description: "Microfoam lembut dengan double ristretto punch untuk rasa kopi seimbang & intens.",
    accentColor: "orange",
  },
  {
    id: "dirty-latte",
    name: "Dirty Latte",
    side: "thirsty",
    subcategory: "classic",
    subcategoryLabel: "CLASSIC",
    price: "27k",
    description: "Susu dingin gurih dengan espresso panas yang ditarik langsung ke permukaan.",
    recommended: true,
    accentColor: "orange",
  },
  {
    id: "mocha",
    name: "Mocha",
    side: "thirsty",
    subcategory: "classic",
    subcategoryLabel: "CLASSIC",
    price: "29k",
    description: "Cokelat Belgia pekat yang dilelehkan bersama espresso dan susu segar hangat.",
    accentColor: "pink",
  },
  {
    id: "spanish-latte",
    name: "Spanish Latte",
    side: "thirsty",
    subcategory: "classic",
    subcategoryLabel: "CLASSIC",
    price: "24k",
    description: "Racikan latte manis gurih khas dengan susu kental manis dan espresso mantap.",
    accentColor: "orange",
  },

  // FROOTEA (Real fruit infused)
  {
    id: "lychee-og",
    name: "Lychee OG",
    side: "thirsty",
    subcategory: "frootea",
    subcategoryLabel: "FROOTEA",
    price: "23k",
    description: "Teh hitam premium seduh dingin yang disajikan lengkap dengan buah leci utuh.",
    recommended: true,
    accentColor: "pink",
  },
  {
    id: "lemon-og",
    name: "Lemon OG",
    side: "thirsty",
    subcategory: "frootea",
    subcategoryLabel: "FROOTEA",
    price: "21k",
    description: "Shaken iced tea segar dengan perasan dan irisan buah lemon segar pilihan.",
    accentColor: "orange",
  },

  // FROSTBLEND
  {
    id: "caramel-crush",
    name: "Caramel Crush",
    side: "thirsty",
    subcategory: "frostblend",
    subcategoryLabel: "FROSTBLEND",
    price: "35k",
    description: "Frappe karamel kental dengan saus karamel leleh dan remukan biskuit renyah.",
    accentColor: "orange",
  },
  {
    id: "velvet-vibe",
    name: "Velvet Vibe",
    side: "thirsty",
    subcategory: "frostblend",
    subcategoryLabel: "FROSTBLEND",
    price: "35k",
    description: "Red velvet frappe lembut berlapis foam cream cheese gurih yang memanjakan lidah.",
    recommended: true,
    accentColor: "pink",
  },
  {
    id: "oreo-cheese-kiss",
    name: "Oreo Cheese Kiss",
    side: "thirsty",
    subcategory: "frostblend",
    subcategoryLabel: "FROSTBLEND",
    price: "35k",
    description: "Blended cookies & cream Oreo asli berpadu lapisan keju gurih creamy.",
    accentColor: "lightblue",
  },
  {
    id: "choco-cloud",
    name: "Choco Cloud",
    side: "thirsty",
    subcategory: "frostblend",
    subcategoryLabel: "FROSTBLEND",
    price: "32k",
    description: "Cokelat Belanda pekat yang di-blend dingin dengan mahkota foam cokelat lembut.",
    accentColor: "pink",
  },
  {
    id: "bancho-blitz",
    name: "Bancho Blitz",
    side: "thirsty",
    subcategory: "frostblend",
    subcategoryLabel: "FROSTBLEND",
    price: "35k",
    description: "Kombinasi pisang matang manis, cokelat pekat, dan wafer renyah nikmat.",
    accentColor: "orange",
  },

  // COOLERS (Mocktails)
  {
    id: "violet-fizz",
    name: "Violet Fizz",
    side: "thirsty",
    subcategory: "coolers",
    subcategoryLabel: "COOLERS",
    price: "25k",
    description: "Bunga telang alami bergradasi cantik dengan soda dingin dan sensasi asam jeruk nipis.",
    accentColor: "lightblue",
  },
  {
    id: "passion-explosion",
    name: "Passion Explosion",
    side: "thirsty",
    subcategory: "coolers",
    subcategoryLabel: "COOLERS",
    price: "25k",
    description: "Bulir markisa asli yang meledak segar bersama soda berkarbonasi dan daun mint.",
    recommended: true,
    accentColor: "orange",
  },
  {
    id: "mango-breeze",
    name: "Mango Breeze",
    side: "thirsty",
    subcategory: "coolers",
    subcategoryLabel: "COOLERS",
    price: "25k",
    description: "Sari buah mangga harum tropis dengan soda dingin pelepas dahaga saat adu strategi.",
    accentColor: "orange",
  },
  {
    id: "strawberry-sour",
    name: "Strawberry Sour",
    side: "thirsty",
    subcategory: "coolers",
    subcategoryLabel: "COOLERS",
    price: "28k",
    description: "Buah stroberi segar yang di-muddle dengan perasan lemon asam segar dan soda.",
    accentColor: "pink",
  },

  // LATTES
  {
    id: "arenette",
    name: "Arenette",
    side: "thirsty",
    subcategory: "lattes",
    subcategoryLabel: "LATTES",
    price: "23k",
    description: "Kopi susu gula aren otentik racikan khas Gitgud yang gurih legit alami.",
    accentColor: "orange",
  },
  {
    id: "berrynova",
    name: "Berrynova",
    side: "thirsty",
    subcategory: "lattes",
    subcategoryLabel: "LATTES",
    price: "25k",
    description: "Sensasi unik stroberi lembut yang berpadu serasi dengan espresso & susu dingin.",
    recommended: true,
    accentColor: "pink",
  },
  {
    id: "caramello",
    name: "Caramello",
    side: "thirsty",
    subcategory: "lattes",
    subcategoryLabel: "LATTES",
    price: "24k",
    description: "Latte lembut beraroma karamel panggang mentega dengan aftertaste manis halus.",
    accentColor: "orange",
  },
  {
    id: "vanilatte",
    name: "Vanilatte",
    side: "thirsty",
    subcategory: "lattes",
    subcategoryLabel: "LATTES",
    price: "24k",
    description: "Espresso latte klasik berpadu sirup vanilla Madagaskar yang wangi dan lembut.",
    accentColor: "lightblue",
  },
  {
    id: "pandarine",
    name: "Pandarine",
    side: "thirsty",
    subcategory: "lattes",
    subcategoryLabel: "LATTES",
    price: "25k",
    description: "Aroma daun pandan wangi berpadu nikmat dalam secangkir kopi susu creamy.",
    accentColor: "lightblue",
  },
  {
    id: "banachan",
    name: "Banachan",
    side: "thirsty",
    subcategory: "lattes",
    subcategoryLabel: "LATTES",
    price: "25k",
    description: "Kombinasi manis pisang khas ala cafe Korea dengan kekuatan double espresso.",
    accentColor: "orange",
  },
  {
    id: "scotchy",
    name: "Scotchy",
    side: "thirsty",
    subcategory: "lattes",
    subcategoryLabel: "LATTES",
    price: "25k",
    description: "Kopi susu dengan sentuhan sirup butterscotch toffee gurih ala cafe Eropa.",
    accentColor: "orange",
  },

  // ==================== HUNGRY SIDE (FOOD) ====================
  // BIG MUNCH
  {
    id: "kare-katsu-don",
    name: "Kare Katsu Don",
    side: "hungry",
    subcategory: "big-munch",
    subcategoryLabel: "BIG MUNCH",
    price: "32k",
    description: "Chicken katsu renyah berbalut kuah kari Jepang kental hangat di atas nasi putih pulen.",
    accentColor: "orange",
  },
  {
    id: "lemon-chicken",
    name: "Lemon Chicken",
    side: "hungry",
    subcategory: "big-munch",
    subcategoryLabel: "BIG MUNCH",
    price: "30k",
    description: "Potongan ayam krispi yang dibalut saus lemon asam manis segar dengan nasi hangat.",
    accentColor: "orange",
  },
  {
    id: "chicken-nanban",
    name: "Chicken Nanban",
    side: "hungry",
    subcategory: "big-munch",
    subcategoryLabel: "BIG MUNCH",
    price: "32k",
    description: "Ayam krispi juicy saus nanban dengan saus tartar telur segar buatan barista.",
    recommended: true,
    accentColor: "orange",
  },
  {
    id: "pasta-carbonara",
    name: "Pasta Carbonara",
    side: "hungry",
    subcategory: "big-munch",
    subcategoryLabel: "BIG MUNCH",
    price: "29k",
    description: "Spaghetti al dente saus krim parmesan gurih dengan potongan smoked beef & lada hitam.",
    recommended: true,
    accentColor: "pink",
  },
  {
    id: "beef-teriyaki-don",
    name: "Beef Teriyaki Don",
    side: "hungry",
    subcategory: "big-munch",
    subcategoryLabel: "BIG MUNCH",
    price: "40k",
    description: "Irisan daging sapi empuk dengan saus teriyaki gurih manis legit bertabur wijen sangrai.",
    accentColor: "orange",
  },

  // LIL MUNCH
  {
    id: "git-fries",
    name: "Git Fries",
    side: "hungry",
    subcategory: "lil-munch",
    subcategoryLabel: "LIL MUNCH",
    price: "20k",
    description: "Kentang goreng renyah bumbu racikan gurih, camilan paling pas sambil mikir giliran main.",
    extra: "+2k Extra Saus",
    accentColor: "orange",
  },
  {
    id: "gud-platter",
    name: "Gud Platter",
    side: "hungry",
    subcategory: "lil-munch",
    subcategoryLabel: "LIL MUNCH",
    price: "35k",
    description: "Platter kombo seru untuk rame-rame: sosis panggang, fries, dan camilan renyah.",
    accentColor: "lightblue",
  },
  {
    id: "kroket-mama",
    name: "Kroket Mama",
    side: "hungry",
    subcategory: "lil-munch",
    subcategoryLabel: "LIL MUNCH",
    price: "24k",
    description: "Kroket ragout daging sapi otentik resep rumahan, renyah di luar dan lumer di dalam.",
    recommended: true,
    accentColor: "orange",
  },
  {
    id: "assorted-pastries",
    name: "Assorted Pastries",
    side: "hungry",
    subcategory: "lil-munch",
    subcategoryLabel: "LIL MUNCH",
    price: "Tanya Barista",
    description: "Pilihan croissant, brownies & cookies fresh baked hari ini. Cek display pastry kami!",
    extra: "Fresh Baked Daily",
    accentColor: "pink",
  },
];

const SUBCATEGORY_MAP: Record<
  string,
  { label: string; side: "thirsty" | "hungry" }
> = {
  all: { label: "Semua", side: "thirsty" },
  "catch-a-matcha": { label: "Catch-A-Matcha", side: "thirsty" },
  canos: { label: "'Canos (Zing)", side: "thirsty" },
  classic: { label: "Classic Coffee", side: "thirsty" },
  frootea: { label: "Frootea", side: "thirsty" },
  frostblend: { label: "Frostblend", side: "thirsty" },
  coolers: { label: "Coolers (Mocktails)", side: "thirsty" },
  lattes: { label: "Lattes", side: "thirsty" },
  "big-munch": { label: "Big Munch (Meals)", side: "hungry" },
  "lil-munch": { label: "Lil Munch (Snacks)", side: "hungry" },
};

const ITEMS_PER_PAGE = 8;

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, "...", total];
  }
  if (current >= total - 3) {
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, "...", current - 1, current, current + 1, "...", total];
}

export default function MenuSection() {
  const [activeSide, setActiveSide] = useState<"thirsty" | "hungry">("thirsty");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("all");
  const [onlyRecommended, setOnlyRecommended] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(ITEMS_PER_PAGE);

  // Dynamically update mobile items per page with resize/orientation listener
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const update = () => {
      setItemsPerPage(mql.matches ? 6 : ITEMS_PER_PAGE);
    };
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const menuGridRef = useRef<HTMLDivElement>(null);

  const otherSide = activeSide === "thirsty" ? "hungry" : "thirsty";

  // Switch side and reset subcategory filter & page
  const handleSideChange = (side: "thirsty" | "hungry") => {
    soundEffects.playCardSnap();
    setActiveSide(side);
    setSelectedSubcategory("all");
    setCurrentPage(1);
  };

  // Available subcategories for currently active side
  const currentSubcategories = useMemo(() => {
    return Object.entries(SUBCATEGORY_MAP)
      .filter(([key, value]) => key === "all" || value.side === activeSide)
      .map(([key, value]) => ({ key, label: value.label }));
  }, [activeSide]);

  // Matches in the opposite side when searching (cross-side intelligence)
  const otherSideMatches = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase().trim();
    return MENU_ITEMS.filter((item) => {
      if (item.side !== otherSide) return false;
      const matchName = item.name.toLowerCase().includes(query);
      const matchDesc = item.description.toLowerCase().includes(query);
      const matchSub = item.subcategoryLabel.toLowerCase().includes(query);
      return matchName || matchDesc || matchSub;
    });
  }, [searchQuery, otherSide]);

  // Filtered menu items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // 1. Side filter
      if (item.side !== activeSide) return false;

      // 2. Subcategory filter
      if (selectedSubcategory !== "all" && item.subcategory !== selectedSubcategory) {
        return false;
      }

      // 3. Recommended filter
      if (onlyRecommended && !item.recommended) {
        return false;
      }

      // 4. Search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchSub = item.subcategoryLabel.toLowerCase().includes(query);
        return matchName || matchDesc || matchSub;
      }

      return true;
    });
  }, [activeSide, selectedSubcategory, onlyRecommended, searchQuery]);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedItems = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * itemsPerPage;
    return filteredItems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredItems, safeCurrentPage, itemsPerPage]);

  const startItem = (safeCurrentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(safeCurrentPage * itemsPerPage, filteredItems.length);

  const goToPage = (page: number) => {
    const targetPage = Math.max(1, Math.min(page, totalPages));
    if (targetPage === currentPage) return;
    soundEffects.playCardSnap();
    setCurrentPage(targetPage);

    if (menuGridRef.current) {
      const rect = menuGridRef.current.getBoundingClientRect();
      // Only scroll if top of the menu grid has scrolled above viewable area / under sticky header
      if (rect.top < 80) {
        const prefersReducedMotion =
          typeof window !== "undefined" &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        menuGridRef.current.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      }
    }
  };

  const stats = useMemo(() => {
    const thirstyCount = MENU_ITEMS.filter((i) => i.side === "thirsty").length;
    const hungryCount = MENU_ITEMS.filter((i) => i.side === "hungry").length;
    const recommendedCount = MENU_ITEMS.filter(
      (i) => i.side === activeSide && i.recommended
    ).length;
    return { thirstyCount, hungryCount, recommendedCount };
  }, [activeSide]);

  return (
    <section
      id="menu"
      className="scroll-mt-20 py-8 sm:py-20 lg:py-24 px-4 lg:px-12 bg-white border-b-2 border-[#1B64B4]/15"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-5 sm:mb-10">
          {/* Creative Tabletop Cafe Token Coaster Chip */}
          <div className="inline-flex items-center gap-2 p-1 pr-3.5 bg-[#FFF5F2] border-2 border-brand-orange text-brand-orange rounded-full font-mono text-[11px] sm:text-xs font-black tracking-wider uppercase shadow-[2.5px_2.5px_0px_0px_#E84A27] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300 group cursor-default">
            <span className="w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center shrink-0 border border-brand-orange shadow-xs group-hover:rotate-12 transition-transform">
              {activeSide === "thirsty" ? (
                <Coffee className="w-3.5 h-3.5 text-white shrink-0 animate-steam" />
              ) : (
                <Utensils className="w-3.5 h-3.5 text-white shrink-0 animate-pulse-subtle" />
              )}
            </span>
            <span className="text-[#475569] font-bold text-[10px]">TAVERN 04</span>
            <span className="text-brand-orange select-none">•</span>
            <span className="text-[#172554]">
              {activeSide === "thirsty"
                ? "THIRSTY • DRINKS & SPRO"
                : "HUNGRY • DINE THEN PLAY"}
            </span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-[1.75rem] md:text-3xl lg:text-[2rem] xl:text-[2.15rem] text-[#172554] mt-3 tracking-tight leading-tight">
            MENU GITGUD CAFE
          </h2>
          <p className="text-[#475569] text-xs sm:text-sm mt-2 max-w-xl mx-auto leading-relaxed">
            Diseduh dari biji kopi pilihan dan dimasak fresh setiap hari di Baciro HQ.
            Pemberi stamina utama biar konsentrasi game kamu gak goyah!
          </p>

          {/* Interactive Physical Flyer "FLIP TO OTHER SIDE" Switcher */}
          <div className="mt-6 sm:mt-7 flex items-center justify-center px-2">
            <div className="w-full max-w-md sm:w-auto inline-flex p-1 bg-[#F8FAFC] rounded-xl border-2 border-[#1B64B4]/20 shadow-[2px_2px_0px_0px_rgba(27,100,180,0.15)]">
              {/* THIRSTY SIDE BUTTON */}
              <button
                type="button"
                onClick={() => handleSideChange("thirsty")}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg font-display font-black text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                  activeSide === "thirsty"
                    ? "bg-brand-orange text-white border-2 border-[#1B64B4] shadow-xs"
                    : "text-[#475569] hover:text-[#172554] hover:bg-white border-2 border-transparent"
                }`}
              >
                <CupSoda className="w-4 h-4 shrink-0" />
                <span className="tracking-wide">
                  THIRSTY{" "}
                  <span className="hidden min-[360px]:inline font-mono text-[11px] sm:text-xs opacity-80">
                    (DRINKS)
                  </span>
                </span>
                <span
                  className={`ml-1 text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    activeSide === "thirsty"
                      ? "bg-white/20 text-white font-bold"
                      : "bg-[#E2E8F0] text-[#475569]"
                  }`}
                >
                  {stats.thirstyCount}
                </span>
              </button>

              {/* HUNGRY SIDE BUTTON */}
              <button
                type="button"
                onClick={() => handleSideChange("hungry")}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg font-display font-black text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                  activeSide === "hungry"
                    ? "bg-brand-lightblue text-[#172554] border-2 border-[#1B64B4] shadow-xs"
                    : "text-[#475569] hover:text-[#172554] hover:bg-white border-2 border-transparent"
                }`}
              >
                <Utensils className="w-4 h-4 shrink-0" />
                <span className="tracking-wide">
                  HUNGRY{" "}
                  <span className="hidden min-[360px]:inline font-mono text-[11px] sm:text-xs opacity-80">
                    (FOOD)
                  </span>
                </span>
                <span
                  className={`ml-1 text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    activeSide === "hungry"
                      ? "bg-white/60 text-[#172554] font-bold"
                      : "bg-[#E2E8F0] text-[#475569]"
                  }`}
                >
                  {stats.hungryCount}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar: Subcategories, Recommended Barista Filter, & Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3.5 mb-8 bg-[#F8FAFC] p-3 sm:p-3.5 rounded-xl border-2 border-[#1B64B4]/15">
          {/* Subcategory Pills */}
          <div className="flex-1 min-w-0 flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none text-xs font-mono">
            {currentSubcategories.map(({ key, label }) => {
              const isActive = selectedSubcategory === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    soundEffects.playTileTap();
                    setSelectedSubcategory(key);
                    setCurrentPage(1);
                  }}
                  className={`px-3 py-1.5 rounded-lg border font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? activeSide === "thirsty"
                        ? "bg-brand-orange text-white border-brand-orange shadow-xs"
                        : "bg-brand-lightblue text-[#172554] border-brand-lightblue shadow-xs"
                      : "bg-white text-[#475569] border-[#1B64B4]/20 hover:text-[#172554] hover:border-brand-orange"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Right Controls: Rekomendasi Barista Toggle + Cross-Side Match + Search Box */}
          <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap w-full lg:w-auto">
            {/* Quick Rekomendasi Barista Filter Chip */}
            <button
              type="button"
              onClick={() => {
                soundEffects.playTileTap();
                setOnlyRecommended(!onlyRecommended);
                setCurrentPage(1);
              }}
              aria-pressed={onlyRecommended}
              title="Filter rekomendasi barista"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-xs font-bold transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                onlyRecommended
                  ? activeSide === "thirsty"
                    ? "bg-brand-orange text-white border-brand-orange shadow-xs"
                    : "bg-brand-lightblue text-[#172554] border-brand-lightblue shadow-xs"
                  : "bg-white text-[#475569] border-[#1B64B4]/20 hover:text-[#172554] hover:border-brand-orange"
              }`}
            >
              <ThumbsUp
                className={`w-3.5 h-3.5 shrink-0 ${
                  onlyRecommended
                    ? activeSide === "thirsty"
                      ? "text-white"
                      : "text-[#172554]"
                    : "text-brand-orange"
                }`}
              />
              <span className="hidden sm:inline">Rekomendasi Barista</span>
              <span className="sm:hidden">Rekomendasi</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  onlyRecommended
                    ? activeSide === "thirsty"
                      ? "bg-white/20 text-white font-bold"
                      : "bg-white/60 text-[#172554] font-bold"
                    : "bg-[#E2E8F0] text-[#475569]"
                }`}
              >
                {stats.recommendedCount}
              </span>
            </button>

            {otherSideMatches.length > 0 && (
              <button
                type="button"
                onClick={() => handleSideChange(otherSide)}
                className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-brand-orange/15 hover:bg-brand-orange/25 border border-brand-orange/40 text-brand-orange text-[11px] font-mono font-bold transition-all shrink-0 cursor-pointer"
              >
                <span>{otherSideMatches.length} di {otherSide === "thirsty" ? "Drinks" : "Food"}</span>
                <span>→</span>
              </button>
            )}

            <div className="relative flex-1 sm:w-56 md:w-64">
              <Search className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Cari menu (e.g. matcha, nanban)..."
                className="w-full pl-8 pr-8 py-1.5 bg-white border-2 border-[#1B64B4]/20 rounded-lg text-xs text-[#172554] placeholder-[#94A3B8] focus:outline-hidden focus:border-brand-orange transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  aria-label="Hapus pencarian"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#172554] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Featured Munch of the Day & Specialty Highlight Banner */}
        {activeSide === "hungry" ? (
          <div className="mb-6 sm:mb-8 bg-gradient-to-r from-[#FFF5F2] via-white to-[#FFF5F2] p-3.5 sm:p-5 rounded-xl border-2 border-brand-orange/40 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#FFF0EB] border border-brand-orange/60 text-brand-orange flex items-center justify-center shrink-0 shadow-xs">
                <Utensils className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-orange" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-orange">
                    MUNCH OF THE DAY • BOARDGAME COMBO
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#334155] mt-0.5">
                  <strong className="text-[#172554]">Chicken Nanban (32k)</strong> +{" "}
                  <strong className="text-[#172554]">Honey Yuzunade (33k)</strong> —
                  paduan juara penambah energi ronde deduksi Blood on the Clocktower!
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-lightblue text-[#172554] font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#1B64B4] border-2 border-[#1B64B4] shrink-0 select-none rotate-1 hover:rotate-0 transition-transform">
              <ChefHat className="w-3.5 h-3.5 text-[#172554] shrink-0" />
              <span>Barista Pairing</span>
            </div>
          </div>
        ) : (
          <div className="mb-6 sm:mb-8 bg-gradient-to-r from-[#F0F7FF] via-white to-[#F0F7FF] p-3.5 sm:p-5 rounded-xl border-2 border-brand-lightblue/40 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#EBF5FF] border border-brand-lightblue/60 text-[#1B64B4] flex items-center justify-center shrink-0 shadow-xs">
                <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1B64B4]" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1B64B4]">
                    BARISTA SIGNATURE • ZING &amp; MATCHA PICKS
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#334155] mt-0.5">
                  <strong className="text-[#172554]">Honey Yuzunade (33k)</strong> &amp;{" "}
                  <strong className="text-[#172554]">Orangicano (25k)</strong> —
                  sensasi citrus yuzu matcha &amp; espresso jeruk segar favorit komunitas!
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-brand-orange text-white font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#1B64B4] border-2 border-[#1B64B4] shrink-0 select-none -rotate-1 hover:rotate-0 transition-transform">
              <Flame className="w-3.5 h-3.5 text-white fill-white shrink-0" />
              <span>Top Rated Zing</span>
            </div>
          </div>
        )}

        {/* Menu Items Grid with Physical Flyer Transition */}
        {filteredItems.length > 0 ? (
          <>
            <div ref={menuGridRef} className="scroll-mt-20 lg:scroll-mt-24" />
            <div
              key={`${activeSide}-${selectedSubcategory}-${onlyRecommended ? "rec" : "all"}-page-${safeCurrentPage}`}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-5 animate-flyer-flip"
            >
              {paginatedItems.map((item, idx) => {
                const borderAccent =
                  item.accentColor === "orange"
                    ? "hover:border-brand-orange group-hover:shadow-[2.5px_2.5px_0px_0px_#E84A27]"
                    : item.accentColor === "lightblue"
                    ? "hover:border-brand-lightblue group-hover:shadow-[2.5px_2.5px_0px_0px_#5BB5F8]"
                    : "hover:border-brand-pink group-hover:shadow-[2.5px_2.5px_0px_0px_#F7B5CB]";

                return (
                  <div
                    key={item.id}
                    style={{ animationDelay: `${Math.min(idx * 25, 250)}ms` }}
                    className={`group relative bg-white p-3.5 sm:p-5.5 rounded-xl border-2 border-[#1B64B4]/15 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between min-h-0 sm:min-h-[200px] animate-fade-in-up shadow-xs ${borderAccent}`}
                  >
                    <div>
                      {/* Top Meta: Subcategory Badge & Recommended Badge */}
                      <div className="flex items-center justify-between gap-2 mb-2 sm:mb-2.5">
                        <span className="font-mono text-[9.5px] sm:text-[10px] font-bold tracking-wider text-[#475569] uppercase bg-[#F8FAFC] px-2 sm:px-2.5 py-0.5 rounded border border-[#1B64B4]/15 font-medium">
                          {item.subcategoryLabel}
                        </span>

                        {item.recommended && (
                          <span className="inline-flex items-center gap-1 text-[9.5px] sm:text-[10px] font-mono font-bold text-brand-orange bg-[#FFF0EB] border border-brand-orange/40 px-2 py-0.5 rounded-md">
                            <ThumbsUp className="w-2.5 h-2.5 shrink-0" />
                            <span>FAVORIT</span>
                          </span>
                        )}
                      </div>

                      {/* Item Name */}
                      <h3 className="font-display font-bold text-sm sm:text-lg text-[#172554] group-hover:text-brand-orange transition-colors leading-snug">
                        {item.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-[13px] text-[#475569] mt-1 sm:mt-1.5 leading-relaxed line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom: Price & Extra Note */}
                    <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t-2 border-[#1B64B4]/10 flex items-center justify-between gap-2">
                      <div className="flex items-baseline gap-1">
                        <span className="font-mono font-black text-lg sm:text-2xl text-[#172554]">
                          {item.price}
                        </span>
                      </div>

                      {item.extra ? (
                        <span className="font-mono text-[10px] text-[#1B64B4] bg-[#EBF5FF] border border-[#5BB5F8]/40 px-2 py-0.5 rounded font-bold">
                          {item.extra}
                        </span>
                      ) : (
                        <span className="font-mono text-[10px] text-[#64748B]">
                          {item.side === "thirsty" ? "Cold / Fresh" : "Freshly Cooked"}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Neo-brutalist Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-8 pt-6 border-t-2 border-[#1B64B4]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Range Indicator */}
                <div className="flex items-center gap-2 text-xs font-mono text-[#475569]">
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      activeSide === "thirsty" ? "bg-brand-orange" : "bg-brand-lightblue"
                    }`}
                  />
                  <span>
                    Menampilkan{" "}
                    <strong className="text-[#172554] font-bold">
                      {startItem === endItem ? `menu ke-${startItem}` : `${startItem}–${endItem}`}
                    </strong>{" "}
                    dari{" "}
                    <strong className="text-[#172554] font-bold">{filteredItems.length}</strong> menu
                  </span>
                  <span className="text-[#94A3B8] hidden md:inline">•</span>
                  <span className="text-[#64748B] hidden md:inline">
                    Halaman {safeCurrentPage} dari {totalPages}
                  </span>
                </div>

                {/* Mobile Navigation Controls: Thumb-Friendly Prev / Page / Next */}
                <div className="flex md:hidden items-center justify-between w-full gap-2">
                  <button
                    type="button"
                    onClick={() => goToPage(safeCurrentPage - 1)}
                    disabled={safeCurrentPage <= 1}
                    aria-label="Halaman sebelumnya"
                    className={`flex-1 inline-flex items-center justify-center gap-1 py-2 px-3 rounded-lg font-mono text-xs font-bold transition-all ${
                      safeCurrentPage <= 1
                        ? "opacity-35 cursor-not-allowed text-[#94A3B8] border border-[#1B64B4]/10 bg-[#F8FAFC]"
                        : "bg-white text-[#172554] border-2 border-[#1B64B4]/20 shadow-xs active:scale-95 cursor-pointer"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 shrink-0" />
                    <span>Sebelumnya</span>
                  </button>

                  <span className="font-mono text-xs font-bold text-[#172554] px-3 py-1.5 rounded-lg bg-[#F0F7FF] border border-[#1B64B4]/20 whitespace-nowrap">
                    {safeCurrentPage} / {totalPages}
                  </span>

                  <button
                    type="button"
                    onClick={() => goToPage(safeCurrentPage + 1)}
                    disabled={safeCurrentPage >= totalPages}
                    aria-label="Halaman berikutnya"
                    className={`flex-1 inline-flex items-center justify-center gap-1 py-2 px-3 rounded-lg font-mono text-xs font-bold transition-all ${
                      safeCurrentPage >= totalPages
                        ? "opacity-35 cursor-not-allowed text-[#94A3B8] border border-[#1B64B4]/10 bg-[#F8FAFC]"
                        : "bg-white text-[#172554] border-2 border-[#1B64B4]/20 shadow-xs active:scale-95 cursor-pointer"
                    }`}
                  >
                    <span>Berikutnya</span>
                    <ChevronRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>

                {/* Desktop Navigation Controls */}
                <div className="hidden md:flex items-center gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => goToPage(safeCurrentPage - 1)}
                    disabled={safeCurrentPage <= 1}
                    aria-label="Halaman sebelumnya"
                    className={`inline-flex items-center gap-1 px-2.5 sm:px-3 py-2 rounded-lg font-mono text-xs font-bold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:outline-hidden ${
                      safeCurrentPage <= 1
                        ? "opacity-35 cursor-not-allowed text-[#94A3B8] border border-[#1B64B4]/10 bg-[#F8FAFC]"
                        : "bg-white hover:bg-[#F0F7FF] text-[#172554] border-2 border-[#1B64B4]/20 hover:border-[#1B64B4]/40 cursor-pointer shadow-[2px_2px_0px_0px_#1B64B4]/20 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 shrink-0" />
                    <span className="hidden sm:inline">Sebelumnya</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {getPageNumbers(safeCurrentPage, totalPages).map((p, idx) => {
                      if (p === "...") {
                        return (
                          <span
                            key={`ellipsis-${idx}`}
                            className="w-8 h-9 flex items-center justify-center text-xs font-mono text-[#94A3B8] select-none"
                          >
                            ...
                          </span>
                        );
                      }
                      const isActive = p === safeCurrentPage;
                      const activeClasses =
                        activeSide === "thirsty"
                          ? "bg-brand-orange text-white border-2 border-[#1B64B4] shadow-[2px_2px_0px_0px_#1B64B4] font-black"
                          : "bg-brand-lightblue text-[#172554] border-2 border-[#1B64B4] shadow-[2px_2px_0px_0px_#1B64B4] font-black";
                      const inactiveClasses =
                        "bg-white hover:bg-[#F0F7FF] text-[#172554] border-2 border-[#1B64B4]/20 hover:border-[#1B64B4]/40 font-bold shadow-[2px_2px_0px_0px_#1B64B4]/15 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none";

                      return (
                        <button
                          key={p}
                          type="button"
                          onClick={() => goToPage(p)}
                          aria-current={isActive ? "page" : undefined}
                          aria-label={`Ke halaman ${p}`}
                          className={`w-9 h-9 flex items-center justify-center rounded-lg font-mono text-xs transition-all duration-200 cursor-pointer focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:outline-hidden ${
                            isActive ? activeClasses : inactiveClasses
                          }`}
                        >
                          {p}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => goToPage(safeCurrentPage + 1)}
                    disabled={safeCurrentPage >= totalPages}
                    aria-label="Halaman berikutnya"
                    className={`inline-flex items-center gap-1 px-2.5 sm:px-3 py-2 rounded-lg font-mono text-xs font-bold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:outline-hidden ${
                      safeCurrentPage >= totalPages
                        ? "opacity-35 cursor-not-allowed text-[#94A3B8] border border-[#1B64B4]/10 bg-[#F8FAFC]"
                        : "bg-white hover:bg-[#F0F7FF] text-[#172554] border-2 border-[#1B64B4]/20 hover:border-[#1B64B4]/40 cursor-pointer shadow-[2px_2px_0px_0px_#1B64B4]/20 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                    }`}
                  >
                    <span className="hidden sm:inline">Berikutnya</span>
                    <ChevronRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : otherSideMatches.length > 0 ? (
          /* Cross-Category Search Match State */
          <div className="text-center py-10 px-4 bg-[#FFF5F2] rounded-2xl border-2 border-brand-orange/40 max-w-md mx-auto shadow-xs animate-fade-in-up">
            {otherSide === "thirsty" ? (
              <Coffee className="w-8 h-8 text-brand-orange mx-auto mb-2" />
            ) : (
              <Utensils className="w-8 h-8 text-brand-orange mx-auto mb-2" />
            )}
            <h4 className="font-display font-bold text-base text-[#172554]">
              Tersedia di Menu {otherSide === "thirsty" ? "Minuman (THIRSTY)" : "Makanan (HUNGRY)"}
            </h4>
            <p className="text-xs text-[#334155] mt-1.5 leading-relaxed">
              Kata kunci &quot;{searchQuery}&quot; cocok dengan{" "}
              <strong className="text-[#172554]">{otherSideMatches.length} menu</strong> pada sisi{" "}
              {otherSide === "thirsty" ? "Minuman" : "Makanan"}.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => handleSideChange(otherSide)}
                className="w-full sm:w-auto px-4 py-2 bg-brand-orange hover:bg-brand-orange-hover text-white font-mono text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-[2px_2px_0px_0px_#1B64B4] border-2 border-[#1B64B4]"
              >
                Buka Menu {otherSide === "thirsty" ? "Minuman" : "Makanan"} ({otherSideMatches.length}) →
              </button>
              <button
                type="button"
                onClick={() => {
                  soundEffects.playButtonClick();
                  setSearchQuery("");
                  setSelectedSubcategory("all");
                  setOnlyRecommended(false);
                  setCurrentPage(1);
                }}
                className="w-full sm:w-auto px-3.5 py-2 bg-white hover:bg-[#F8FAFC] text-[#475569] font-mono text-xs font-medium rounded-lg border border-[#1B64B4]/20 transition-colors cursor-pointer"
              >
                Reset Filter
              </button>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-12 px-4 bg-white rounded-2xl border-2 border-[#1B64B4]/20 max-w-md mx-auto shadow-xs animate-fade-in-up">
            <Wine className="w-8 h-8 text-[#94A3B8] mx-auto mb-2" />
            <h4 className="font-display font-bold text-base text-[#172554]">
              Menu Tidak Ditemukan
            </h4>
            <p className="text-xs text-[#475569] mt-1">
              {searchQuery.trim()
                ? `Tidak ada menu yang sesuai dengan kata kunci "${searchQuery}".`
                : onlyRecommended
                ? "Belum ada menu rekomendasi barista untuk kategori ini."
                : "Tidak ada menu untuk filter kategori yang dipilih."}
            </p>
            <button
              type="button"
              onClick={() => {
                soundEffects.playButtonClick();
                setSearchQuery("");
                setSelectedSubcategory("all");
                setOnlyRecommended(false);
                setCurrentPage(1);
              }}
              className="mt-4 px-4 py-1.5 bg-brand-orange text-white font-mono text-xs font-bold rounded-lg hover:bg-brand-orange-hover transition-colors cursor-pointer shadow-[2px_2px_0px_0px_#1B64B4] border-2 border-[#1B64B4]"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Cafe Notice Footer */}
        <div className="mt-8 text-center border-t-2 border-[#1B64B4]/15 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-[#475569]">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full shrink-0 ${
                activeSide === "thirsty" ? "bg-brand-orange" : "bg-brand-lightblue"
              }`}
            />
            <span>Semua harga sudah termasuk pajak &amp; disajikan siap santap di meja boardgame.</span>
          </div>
          <span className="text-[#64748B]">
            Diseduh &amp; Dimasak Fresh di Baciro HQ
          </span>
        </div>
      </div>
    </section>
  );
}

