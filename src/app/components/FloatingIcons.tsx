import {
  IndianRupee, Calculator, BarChart3, CircleDollarSign,
  ShoppingCart, ShoppingBag, Store, FileText, Shield,
  Wallet, Landmark, PiggyBank, Receipt, TrendingUp,
  BadgePercent, Tag, Truck, Gift, Coins, Package,
  Percent, CreditCard, BookOpen, ScanLine, BarChart2,
  Layers, Database, Sparkles
} from "lucide-react";

export function FloatingIcons() {
  const icons = [
    // Large anchors — corners and edges (Tax & Financial) - Green/Emerald
    { Icon: IndianRupee,       size: "w-20 h-20", color: "text-emerald-500/25 dark:text-emerald-400/35 hover:text-emerald-600 dark:hover:text-emerald-300", anim: "bgFloat",      delay: 0,   dur: 18, top: "6%",  left: "3%" },
    { Icon: Calculator,        size: "w-16 h-16", color: "text-blue-500/25 dark:text-blue-400/35 hover:text-blue-600 dark:hover:text-blue-300",          anim: "bgDrift",      delay: 3,   dur: 22, top: "8%",  left: "88%" },
    { Icon: BarChart3,         size: "w-14 h-14", color: "text-indigo-500/25 dark:text-indigo-400/35 hover:text-indigo-600 dark:hover:text-indigo-300",      anim: "bgFloat",      delay: 1,   dur: 20, top: "75%", left: "5%" },
    { Icon: CircleDollarSign,  size: "w-18 h-18", color: "text-emerald-500/25 dark:text-emerald-400/35 hover:text-emerald-600 dark:hover:text-emerald-300", anim: "bgSpin",       delay: 5,   dur: 28, top: "80%", left: "87%" },
    
    // Large anchors — retail & e-commerce - Gold/Amber & Rose
    { Icon: ShoppingCart,      size: "w-16 h-16", color: "text-amber-500/25 dark:text-amber-400/35 hover:text-amber-600 dark:hover:text-amber-300",        anim: "bgSway",       delay: 2,   dur: 21, top: "12%", left: "18%" },
    { Icon: ShoppingBag,       size: "w-18 h-18", color: "text-amber-500/25 dark:text-amber-400/35 hover:text-amber-600 dark:hover:text-amber-300",        anim: "bgDrift",      delay: 4,   dur: 25, top: "65%", left: "80%" },
    { Icon: Store,             size: "w-14 h-14", color: "text-rose-500/25 dark:text-rose-400/35 hover:text-rose-600 dark:hover:text-rose-300",            anim: "bgFloat",      delay: 5,   dur: 23, top: "42%", left: "85%" },
    
    // Mid-field (Tax & Financial)
    { Icon: FileText,          size: "w-12 h-12", color: "text-blue-500/25 dark:text-blue-400/35 hover:text-blue-600 dark:hover:text-blue-300",          anim: "bgDrift",      delay: 2,   dur: 24, top: "30%", left: "92%" },
    { Icon: Shield,            size: "w-11 h-11", color: "text-indigo-500/25 dark:text-indigo-400/35 hover:text-indigo-600 dark:hover:text-indigo-300",      anim: "bgFloat",      delay: 7,   dur: 19, top: "45%", left: "2%" },
    { Icon: Wallet,            size: "w-10 h-10", color: "text-emerald-500/25 dark:text-emerald-400/35 hover:text-emerald-600 dark:hover:text-emerald-300", anim: "bgOrbit",      delay: 0,   dur: 30, top: "20%", left: "48%" },
    { Icon: Landmark,          size: "w-13 h-13", color: "text-blue-500/25 dark:text-blue-400/35 hover:text-blue-600 dark:hover:text-blue-300",          anim: "bgDrift",      delay: 4,   dur: 25, top: "62%", left: "50%" },
    { Icon: PiggyBank,         size: "w-12 h-12", color: "text-emerald-500/25 dark:text-emerald-400/35 hover:text-emerald-600 dark:hover:text-emerald-300", anim: "bgFloat",      delay: 9,   dur: 21, top: "14%", left: "28%" },
    { Icon: Receipt,           size: "w-10 h-10", color: "text-blue-500/25 dark:text-blue-400/35 hover:text-blue-600 dark:hover:text-blue-300",          anim: "bgOrbit",      delay: 6,   dur: 27, top: "55%", left: "75%" },
    { Icon: TrendingUp,        size: "w-11 h-11", color: "text-emerald-500/25 dark:text-emerald-400/35 hover:text-emerald-600 dark:hover:text-emerald-300", anim: "bgSpin",       delay: 2,   dur: 23, top: "38%", left: "15%" },
    { Icon: BadgePercent,      size: "w-10 h-10", color: "text-amber-500/25 dark:text-amber-400/35 hover:text-amber-600 dark:hover:text-amber-300",        anim: "bgFloat",      delay: 8,   dur: 26, top: "90%", left: "40%" },
    
    // Mid-field (Retail)
    { Icon: Tag,               size: "w-11 h-11", color: "text-rose-500/25 dark:text-rose-400/35 hover:text-rose-600 dark:hover:text-rose-300",            anim: "bgPulseScale", delay: 1,   dur: 19, top: "25%", left: "8%" },
    { Icon: Truck,             size: "w-12 h-12", color: "text-amber-500/25 dark:text-amber-400/35 hover:text-amber-600 dark:hover:text-amber-300",        anim: "bgSway",       delay: 3,   dur: 20, top: "85%", left: "18%" },
    { Icon: Gift,              size: "w-11 h-11", color: "text-amber-500/25 dark:text-amber-400/35 hover:text-amber-600 dark:hover:text-amber-300",        anim: "bgFloat",      delay: 0,   dur: 22, top: "3%",  left: "38%" },
    { Icon: Coins,             size: "w-14 h-14", color: "text-emerald-500/25 dark:text-emerald-400/35 hover:text-emerald-600 dark:hover:text-emerald-300", anim: "bgFloat",      delay: 9,   dur: 26, top: "82%", left: "55%" },
    { Icon: Package,           size: "w-10 h-10", color: "text-amber-500/25 dark:text-amber-400/35 hover:text-amber-600 dark:hover:text-amber-300",        anim: "bgOrbit",      delay: 8,   dur: 27, top: "70%", left: "38%" },

    // Small scattered (Tax & Financial)
    { Icon: IndianRupee,       size: "w-8 h-8",   color: "text-emerald-500/25 dark:text-emerald-400/35 hover:text-emerald-600 dark:hover:text-emerald-300", anim: "bgOrbit",      delay: 1,   dur: 16, top: "52%", left: "35%" },
    { Icon: Percent,           size: "w-9 h-9",   color: "text-amber-500/25 dark:text-amber-400/35 hover:text-amber-600 dark:hover:text-amber-300",        anim: "bgFloat",      delay: 3,   dur: 20, top: "25%", left: "70%" },
    { Icon: CreditCard,        size: "w-9 h-9",   color: "text-indigo-500/25 dark:text-indigo-400/35 hover:text-indigo-600 dark:hover:text-indigo-300",      anim: "bgDrift",      delay: 5,   dur: 22, top: "68%", left: "22%" },
    { Icon: BookOpen,          size: "w-8 h-8",   color: "text-blue-500/25 dark:text-blue-400/35 hover:text-blue-600 dark:hover:text-blue-300",          anim: "bgOrbit",      delay: 7,   dur: 29, top: "10%", left: "60%" },
    { Icon: ScanLine,          size: "w-8 h-8",   color: "text-blue-500/25 dark:text-blue-400/35 hover:text-blue-600 dark:hover:text-blue-300",          anim: "bgFloat",      delay: 4,   dur: 17, top: "85%", left: "65%" },
    { Icon: BarChart2,         size: "w-9 h-9",   color: "text-indigo-500/25 dark:text-indigo-400/35 hover:text-indigo-600 dark:hover:text-indigo-300",      anim: "bgSpin",       delay: 6,   dur: 24, top: "33%", left: "55%" },
    { Icon: Layers,            size: "w-8 h-8",   color: "text-indigo-500/25 dark:text-indigo-400/35 hover:text-indigo-600 dark:hover:text-indigo-300",      anim: "bgDrift",      delay: 0,   dur: 21, top: "48%", left: "82%" },
    { Icon: Database,          size: "w-9 h-9",   color: "text-blue-500/25 dark:text-blue-400/35 hover:text-blue-600 dark:hover:text-blue-300",          anim: "bgFloat",      delay: 9,   dur: 19, top: "72%", left: "10%" },
    
    // Small scattered (Retail)
    { Icon: Coins,             size: "w-8 h-8",   color: "text-emerald-500/25 dark:text-emerald-400/35 hover:text-emerald-600 dark:hover:text-emerald-300", anim: "bgPulseScale", delay: 6,   dur: 17, top: "48%", left: "28%" },
    { Icon: Sparkles,          size: "w-8 h-8",   color: "text-amber-500/25 dark:text-amber-400/35 hover:text-amber-600 dark:hover:text-amber-300",        anim: "bgSpin",       delay: 7,   dur: 15, top: "90%", left: "78%" },
    { Icon: ShoppingBag,       size: "w-9 h-9",   color: "text-rose-500/25 dark:text-rose-400/35 hover:text-rose-600 dark:hover:text-rose-300",            anim: "bgOrbit",      delay: 4,   dur: 24, top: "58%", left: "62%" },
    { Icon: Tag,               size: "w-7 h-7",   color: "text-rose-500/25 dark:text-rose-400/35 hover:text-rose-600 dark:hover:text-rose-300",            anim: "bgSway",       delay: 2,   dur: 18, top: "18%", left: "75%" },
    { Icon: ShoppingCart,      size: "w-10 h-10", color: "text-amber-500/25 dark:text-amber-400/35 hover:text-amber-600 dark:hover:text-amber-300",        anim: "bgDrift",      delay: 1,   dur: 22, top: "32%", left: "66%" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {icons.map((item, i) => {
        const { Icon, size, color, anim, delay, dur, top, left } = item;
        return (
          <div
            key={i}
            className={`absolute pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-135 hover:filter hover:drop-shadow-[0_0_12px_rgba(26,86,219,0.5)] ${color} ${size}`}
            style={{
              top,
              left,
              animation: `${anim} ${dur}s ease-in-out ${delay}s infinite`,
            }}
          >
            <Icon className="w-full h-full transition-transform duration-300 active:scale-90" />
          </div>
        );
      })}
    </div>
  );
}
