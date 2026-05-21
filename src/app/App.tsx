import { useState, useEffect } from "react";
import {
  Shield, CheckCircle, Zap, Smartphone, FileText,
  Lock, Bell, Phone, Mail, ChevronDown, ChevronRight,
  Star, ArrowRight, Clock, Award, TrendingUp,
  MessageSquare, HelpCircle, Menu, X, Target, UserCheck,
  Database, Headphones, Eye, Globe, Calculator, IndianRupee,
  Instagram, ChevronUp, Scale, Building2, BarChart3, Rocket,
  MapPin, Briefcase, Percent, CreditCard, Wallet, Receipt,
  PiggyBank, Landmark, BadgePercent, BarChart2, CircleDollarSign,
  BookOpen, Layers, ScanLine, ShoppingBag, ShoppingCart, Tag,
  Store, Truck, Package, Coins, Gift, Sparkles
} from "lucide-react";

type Page = "home" | "about" | "services" | "contact" | "future";

// ─── Shared helpers ────────────────────────────────────────────────────────────

const display = { fontFamily: "'Bricolage Grotesque', sans-serif" };
const mono = { fontFamily: "'JetBrains Mono', monospace" };

// ─── Global animation keyframes ────────────────────────────────────────────────

function GlobalAnimations() {
  return (
    <style>{`
      @keyframes bgFloat {
        0%,100% { transform: translateY(0px)   rotate(0deg)  scale(1);    }
        33%      { transform: translateY(-22px)  rotate(4deg)  scale(1.05); }
        66%      { transform: translateY(-10px)  rotate(-3deg) scale(0.97); }
      }
      @keyframes bgDrift {
        0%,100% { transform: translate(0px, 0px)    rotate(0deg);  }
        25%      { transform: translate(18px, -15px) rotate(6deg);  }
        50%      { transform: translate(8px, -28px)  rotate(-4deg); }
        75%      { transform: translate(-12px,-12px) rotate(3deg);  }
      }
      @keyframes bgSpin {
        0%,100% { transform: translateY(0px)   rotate(0deg);   }
        50%      { transform: translateY(-20px)  rotate(180deg); }
      }
      @keyframes bgOrbit {
        0%   { transform: translate(0px, 0px)    rotate(0deg);   }
        25%  { transform: translate(20px, -12px) rotate(90deg);  }
        50%  { transform: translate(0px, -24px)  rotate(180deg); }
        75%  { transform: translate(-20px,-12px) rotate(270deg); }
        100% { transform: translate(0px, 0px)    rotate(360deg); }
      }
      @keyframes bgSway {
        0%, 100% { transform: translate(0px, 0px) rotate(0deg) scale(1); }
        50%      { transform: translate(-25px, 15px) rotate(-8deg) scale(1.08); }
      }
      @keyframes bgPulseScale {
        0%, 100% { transform: scale(1) rotate(0deg); }
        50%      { transform: scale(1.12) rotate(10deg); }
      }
    `}</style>
  );
}

// ─── Background Animations ─────────────────────────────────────────────────────

function FloatingIcons() {
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

// ─── Section Particles (dark section inner background) ─────────────────────────

function SectionParticles() {
  const particles = [
    { Icon: IndianRupee,      size: "w-7 h-7",  color: "text-emerald-300/30", anim: "bgFloat",      delay: 0,  dur: 14, top: "15%", left: "8%"  },
    { Icon: Percent,          size: "w-5 h-5",  color: "text-amber-300/30",   anim: "bgOrbit",      delay: 2,  dur: 18, top: "70%", left: "12%" },
    { Icon: BarChart3,        size: "w-6 h-6",  color: "text-blue-300/30",    anim: "bgDrift",      delay: 1,  dur: 16, top: "25%", left: "80%" },
    { Icon: Calculator,       size: "w-5 h-5",  color: "text-indigo-300/30",  anim: "bgSpin",       delay: 4,  dur: 20, top: "55%", left: "88%" },
    { Icon: Shield,           size: "w-6 h-6",  color: "text-blue-300/30",    anim: "bgFloat",      delay: 3,  dur: 15, top: "80%", left: "75%" },
    { Icon: Landmark,         size: "w-5 h-5",  color: "text-indigo-300/30",  anim: "bgOrbit",      delay: 6,  dur: 22, top: "40%", left: "5%"  },
    { Icon: TrendingUp,       size: "w-5 h-5",  color: "text-emerald-300/30", anim: "bgDrift",      delay: 5,  dur: 17, top: "90%", left: "45%" },
    { Icon: CircleDollarSign, size: "w-6 h-6",  color: "text-emerald-300/30", anim: "bgFloat",      delay: 7,  dur: 19, top: "10%", left: "52%" },
    
    // Retail particles
    { Icon: ShoppingBag,       size: "w-6 h-6",  color: "text-rose-300/30",    anim: "bgFloat",      delay: 2,  dur: 15, top: "35%", left: "84%" },
    { Icon: ShoppingCart,      size: "w-5 h-5",  color: "text-amber-300/30",   anim: "bgSway",       delay: 4,  dur: 18, top: "62%", left: "7%"  },
    { Icon: Tag,               size: "w-6 h-6",  color: "text-rose-300/30",    anim: "bgPulseScale", delay: 1,  dur: 16, top: "82%", left: "30%" },
    { Icon: Coins,             size: "w-5 h-5",  color: "text-emerald-300/30", anim: "bgOrbit",      delay: 5,  dur: 14, top: "48%", left: "93%" },
    { Icon: Gift,              size: "w-6 h-6",  color: "text-amber-300/30",   anim: "bgDrift",      delay: 3,  dur: 17, top: "8%",  left: "32%" },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={i}
          className={`absolute pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-135 hover:filter hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] ${p.color} ${p.size}`}
          style={{ top: p.top, left: p.left, animation: `${p.anim} ${p.dur}s ease-in-out ${p.delay}s infinite` }}
        >
          <p.Icon className="w-full h-full transition-transform duration-300 active:scale-90" />
        </div>
      ))}
    </div>
  );
}

// ─── Dashboard SVG Illustration ────────────────────────────────────────────────

function DashboardIllustration() {
  return (
    <div className="relative w-full max-w-[480px] mx-auto select-none">
      <svg
        viewBox="0 0 480 420"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full filter drop-shadow-2xl"
      >
        {/* Card shadow */}
        <rect x="24" y="28" width="448" height="388" rx="20" fill="#1A56DB" opacity="0.08" />
        {/* Main card */}
        <rect x="16" y="16" width="448" height="388" rx="20" fill="white" />

        {/* Header bar */}
        <rect x="16" y="16" width="448" height="54" rx="20" fill="#1A56DB" />
        <rect x="16" y="50" width="448" height="20" fill="#1A56DB" />

        {/* Logo circle */}
        <circle cx="44" cy="43" r="14" fill="rgba(255,255,255,0.2)" />
        <text x="37" y="48" fill="white" fontSize="13" fontWeight="700">₹</text>

        {/* Nav text placeholder */}
        <rect x="68" y="36" width="110" height="14" rx="4" fill="rgba(255,255,255,0.3)" />

        {/* Nav buttons */}
        <rect x="322" y="34" width="54" height="18" rx="9" fill="rgba(255,255,255,0.15)" />
        <rect x="384" y="34" width="68" height="18" rx="9" fill="rgba(255,255,255,0.9)" />

        {/* Avatar */}
        <circle cx="460" cy="43" r="13" fill="rgba(255,255,255,0.2)" />
        <text x="455" y="48" fill="white" fontSize="11">P</text>

        {/* Greeting */}
        <rect x="32" y="90" width="180" height="13" rx="4" fill="#1A56DB" opacity="0.15" />
        <rect x="32" y="110" width="110" height="10" rx="3" fill="#E5E7EB" />

        {/* Stat cards row */}
        {/* Card 1 */}
        <rect x="32" y="136" width="120" height="80" rx="12" fill="#EFF6FF" />
        <rect x="46" y="150" width="64" height="9" rx="3" fill="#BFDBFE" />
        <text x="46" y="185" fill="#1A56DB" fontSize="15" fontWeight="700">₹8,40,000</text>
        <rect x="46" y="194" width="80" height="8" rx="3" fill="#DBEAFE" />

        {/* Card 2 */}
        <rect x="164" y="136" width="120" height="80" rx="12" fill="#F0FDF4" />
        <rect x="178" y="150" width="64" height="9" rx="3" fill="#BBF7D0" />
        <text x="178" y="185" fill="#16A34A" fontSize="15" fontWeight="700">₹24,850</text>
        <rect x="178" y="194" width="75" height="8" rx="3" fill="#DCFCE7" />

        {/* Card 3 */}
        <rect x="296" y="136" width="136" height="80" rx="12" fill="#FFF7ED" />
        <rect x="310" y="150" width="64" height="9" rx="3" fill="#FDE68A" />
        <text x="310" y="177" fill="#D97706" fontSize="12" fontWeight="700">In Review</text>
        <rect x="310" y="190" width="108" height="7" rx="3.5" fill="#FEF3C7" />
        <rect x="310" y="190" width="68" height="7" rx="3.5" fill="#F59E0B" />

        {/* Filing tracker */}
        <rect x="32" y="232" width="248" height="148" rx="14" fill="#FAFAFA" stroke="#E5E7EB" strokeWidth="1" />
        <rect x="48" y="248" width="130" height="13" rx="4" fill="#1A56DB" opacity="0.8" />

        {/* Step 1 */}
        <circle cx="58" cy="292" r="13" fill="#1A56DB" />
        <text x="53" y="296" fill="white" fontSize="9" fontWeight="700">✓</text>
        <rect x="80" y="284" width="90" height="10" rx="3" fill="#374151" />
        <rect x="80" y="298" width="68" height="8" rx="3" fill="#9CA3AF" />
        <line x1="58" y1="305" x2="58" y2="322" stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="3 2" />

        {/* Step 2 */}
        <circle cx="58" cy="330" r="13" fill="#16A34A" />
        <text x="53" y="334" fill="white" fontSize="9" fontWeight="700">✓</text>
        <rect x="80" y="322" width="110" height="10" rx="3" fill="#374151" />
        <rect x="80" y="336" width="78" height="8" rx="3" fill="#9CA3AF" />
        <line x1="58" y1="343" x2="58" y2="358" stroke="#E5E7EB" strokeWidth="1.5" strokeDasharray="3 2" />

        {/* Step 3 */}
        <circle cx="58" cy="364" r="13" fill="#F59E0B" />
        <text x="54" y="368" fill="white" fontSize="9" fontWeight="700">3</text>
        <rect x="80" y="356" width="100" height="10" rx="3" fill="#374151" />
        <rect x="80" y="370" width="148" height="8" rx="3" fill="#FCD34D" opacity="0.8" />

        {/* Mini chart panel */}
        <rect x="292" y="232" width="140" height="148" rx="14" fill="#FAFAFA" stroke="#E5E7EB" strokeWidth="1" />
        <rect x="308" y="248" width="90" height="13" rx="4" fill="#1A56DB" opacity="0.8" />

        {/* Bar chart */}
        <rect x="308" y="285" width="14" height="55" rx="3" fill="#BFDBFE" />
        <rect x="328" y="268" width="14" height="72" rx="3" fill="#60A5FA" />
        <rect x="348" y="293" width="14" height="47" rx="3" fill="#BFDBFE" />
        <rect x="368" y="275" width="14" height="65" rx="3" fill="#1A56DB" />
        <rect x="388" y="281" width="14" height="59" rx="3" fill="#93C5FD" />

        {/* Chart x-labels */}
        <rect x="308" y="344" width="20" height="6" rx="2" fill="#E5E7EB" />
        <rect x="328" y="344" width="20" height="6" rx="2" fill="#E5E7EB" />
        <rect x="348" y="344" width="20" height="6" rx="2" fill="#E5E7EB" />
        <rect x="368" y="344" width="20" height="6" rx="2" fill="#E5E7EB" />
        <rect x="388" y="344" width="20" height="6" rx="2" fill="#E5E7EB" />

        {/* Bottom status bar */}
        <rect x="32" y="392" width="416" height="8" rx="4" fill="#F3F4F6" />
        <rect x="32" y="392" width="260" height="8" rx="4" fill="#1A56DB" opacity="0.4" />
      </svg>

      {/* Floating badge top-right */}
      <div className="absolute -top-3 -right-1 bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg" style={mono}>
        ✓ Verified & Filed
      </div>

      {/* Floating refund card bottom-left */}
      <div className="absolute bottom-10 -left-4 bg-white shadow-xl border border-blue-100 rounded-2xl p-3.5 min-w-[148px]">
        <div className="text-xs text-gray-400 mb-0.5" style={mono}>Refund Expected</div>
        <div className="text-xl font-bold text-green-600" style={display}>₹24,850</div>
        <div className="text-xs text-gray-400 mt-0.5">Within 7 working days</div>
      </div>
    </div>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────────

function Navbar({ page, setPage }: { page: Page; setPage: (p: Page) => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links: { label: string; id: Page }[] = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Services", id: "services" },
    { label: "Future", id: "future" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled ? "bg-white/96 backdrop-blur-md shadow-sm" : "bg-white"
      } border-b border-border`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => setPage("home")}
            className="flex items-center gap-2.5"
          >
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
              <IndianRupee className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-lg text-foreground" style={display}>
              D Tax Rail
            </span>
          </button>

          <div className="hidden md:flex items-center gap-0.5">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => setPage(l.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  page === l.id
                    ? "bg-secondary text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://www.instagram.com/dtaxrail?igsh=Z2p4aGVhcHYxYnd5"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all shadow-sm flex items-center gap-2"
            >
              <Instagram className="w-4 h-4" />
              Follow Us
            </a>
          </div>

          <button
            className="md:hidden p-2 text-muted-foreground rounded-lg hover:bg-muted"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-border px-4 pb-4 pt-2 space-y-1">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => { setPage(l.id); setOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                page === l.id ? "bg-secondary text-primary" : "text-foreground hover:bg-muted"
              }`}
            >
              {l.label}
            </button>
          ))}
          <a
            href="https://www.instagram.com/dtaxrail?igsh=Z2p4aGVhcHYxYnd5"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-primary text-primary-foreground text-sm font-semibold px-4 py-3 rounded-xl mt-2 flex items-center justify-center gap-2"
            onClick={() => setOpen(false)}
          >
            <Instagram className="w-4 h-4" />
            Follow Us
          </a>
        </div>
      )}
    </nav>
  );
}

// ─── Home Page ─────────────────────────────────────────────────────────────────

// ─── Tax & Refund Estimator Widget ─────────────────────────────────────────────

interface TaxEstimatorWidgetProps {
  persona: "salaried" | "retailer" | "freelancer";
  setPersona: (p: "salaried" | "retailer" | "freelancer") => void;
  setPage: (p: Page) => void;
}

function calculateNewRegimeTax(grossIncome: number, isSalaried: boolean): number {
  const stdDed = isSalaried ? 75000 : 0;
  const taxable = Math.max(0, grossIncome - stdDed);
  if (taxable <= 700000) {
    return 0; // Rebate u/s 87A
  }
  let tax = 0;
  if (taxable <= 300000) {
    tax = 0;
  } else if (taxable <= 700000) {
    tax = (taxable - 300000) * 0.05;
  } else if (taxable <= 1000000) {
    tax = 20000 + (taxable - 700000) * 0.10;
  } else if (taxable <= 1200000) {
    tax = 50000 + (taxable - 1000000) * 0.15;
  } else if (taxable <= 1500000) {
    tax = 80000 + (taxable - 1200000) * 0.20;
  } else {
    tax = 140000 + (taxable - 1500000) * 0.30;
  }
  return tax * 1.04; // Cess 4%
}

function calculateOldRegimeTax(grossIncome: number, deductions: number, isSalaried: boolean): number {
  const stdDed = isSalaried ? 50000 : 0;
  const taxable = Math.max(0, grossIncome - stdDed - deductions);
  if (taxable <= 500000) {
    return 0; // Rebate u/s 87A
  }
  let tax = 0;
  if (taxable <= 250000) {
    tax = 0;
  } else if (taxable <= 500000) {
    tax = (taxable - 250000) * 0.05;
  } else if (taxable <= 1000000) {
    tax = 12500 + (taxable - 500000) * 0.20;
  } else {
    tax = 112500 + (taxable - 1000000) * 0.30;
  }
  return tax * 1.04; // Cess 4%
}

function TaxEstimatorWidget({ persona, setPersona, setPage }: TaxEstimatorWidgetProps) {
  const [income, setIncome] = useState(1200000);
  const [deductions, setDeductions] = useState(150000);
  const [tdsPaid, setTdsPaid] = useState(80000);
  const [selectedRegime, setSelectedRegime] = useState<"new" | "old">("new");

  const isSalaried = persona === "salaried";
  const oldTax = calculateOldRegimeTax(income, deductions, isSalaried);
  const newTax = calculateNewRegimeTax(income, isSalaried);

  const bestRegime = newTax <= oldTax ? "new" : "old";
  const taxSavings = Math.abs(oldTax - newTax);

  const activeTax = selectedRegime === "new" ? newTax : oldTax;
  const netDueOrRefund = tdsPaid - activeTax;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-blue-100/50 shadow-2xl rounded-3xl p-6 lg:p-7 max-w-[480px] w-full mx-auto relative select-none z-20">
      <div className="flex items-center justify-between mb-5 pb-3.5 border-b border-gray-100">
        <div>
          <h3 className="font-bold text-foreground text-base sm:text-lg flex items-center gap-2" style={display}>
            <Calculator className="w-5 h-5 text-primary" /> Tax &amp; Refund Estimator
          </h3>
          <p className="text-[10px] text-muted-foreground" style={mono}>FY 2024-25 · AY 2025-26</p>
        </div>
        <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse" style={mono}>
          Live Calc
        </span>
      </div>

      {/* Persona Toggle */}
      <div className="mb-4">
        <label className="block text-[10px] font-bold text-muted-foreground uppercase mb-1.5" style={mono}>Filing Persona</label>
        <div className="grid grid-cols-3 gap-1.5 bg-muted p-1 rounded-xl">
          {(["salaried", "retailer", "freelancer"] as const).map((p) => (
            <button
              key={p}
              type="button"
              id={`est-persona-${p}`}
              onClick={() => setPersona(p)}
              className={`py-1.5 text-[11px] font-bold rounded-lg transition-all capitalize cursor-pointer ${
                persona === p
                  ? "bg-white text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {p === "salaried" ? "💼 Salaried" : p === "retailer" ? "🏪 Merchant" : "🚀 Freelancer"}
            </button>
          ))}
        </div>
      </div>

      {/* Income Slider */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <label className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5" style={mono}>
            Gross Annual Income
          </label>
          <span className="text-xs font-bold text-primary" style={mono}>{formatCurrency(income)}</span>
        </div>
        <input
          type="range"
          id="est-income-slider"
          min={300000}
          max={3000000}
          step={50000}
          value={income}
          onChange={(e) => setIncome(Number(e.target.value))}
          className="w-full h-1.5 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-[9px] text-muted-foreground mt-0.5" style={mono}>
          <span>₹3L</span>
          <span>₹15L</span>
          <span>₹30L</span>
        </div>
      </div>

      {/* Deductions Slider */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <label className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5" style={mono}>
            Deductions <span className="text-[9px] text-blue-500 font-normal lowercase">(80C, 80D, standard etc.)</span>
          </label>
          <span className="text-xs font-bold text-foreground" style={mono}>{formatCurrency(deductions)}</span>
        </div>
        <input
          type="range"
          id="est-deductions-slider"
          min={0}
          max={250000}
          step={10000}
          value={deductions}
          onChange={(e) => setDeductions(Number(e.target.value))}
          className="w-full h-1.5 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-[9px] text-muted-foreground mt-0.5" style={mono}>
          <span>₹0</span>
          <span>₹1.25L</span>
          <span>₹2.5L</span>
        </div>
      </div>

      {/* TDS Slider */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <label className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5" style={mono}>
            TDS / Tax Already Paid
          </label>
          <span className="text-xs font-bold text-foreground" style={mono}>{formatCurrency(tdsPaid)}</span>
        </div>
        <input
          type="range"
          id="est-tds-slider"
          min={0}
          max={300000}
          step={5000}
          value={tdsPaid}
          onChange={(e) => setTdsPaid(Number(e.target.value))}
          className="w-full h-1.5 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between text-[9px] text-muted-foreground mt-0.5" style={mono}>
          <span>₹0</span>
          <span>₹1.5L</span>
          <span>₹3L</span>
        </div>
      </div>

      {/* Comparison */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <button
          type="button"
          id="select-new-regime"
          onClick={() => setSelectedRegime("new")}
          className={`p-2.5 rounded-xl text-left transition-all border-2 flex flex-col justify-between cursor-pointer ${
            selectedRegime === "new"
              ? "border-primary bg-primary/5"
              : "border-gray-100 bg-white hover:border-gray-200"
          }`}
        >
          <div>
            <div className="text-[9px] font-bold text-muted-foreground uppercase" style={mono}>New Regime</div>
            <div className="text-sm font-extrabold text-foreground mt-0.5" style={display}>
              {formatCurrency(newTax)}
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between w-full">
            <span className="text-[9px] text-muted-foreground">Tax Due</span>
            {bestRegime === "new" && (
              <span className="bg-green-100 text-green-700 text-[8px] font-bold px-1 py-0.2 rounded" style={mono}>
                Best
              </span>
            )}
          </div>
        </button>

        <button
          type="button"
          id="select-old-regime"
          onClick={() => setSelectedRegime("old")}
          className={`p-2.5 rounded-xl text-left transition-all border-2 flex flex-col justify-between cursor-pointer ${
            selectedRegime === "old"
              ? "border-primary bg-primary/5"
              : "border-gray-100 bg-white hover:border-gray-200"
          }`}
        >
          <div>
            <div className="text-[9px] font-bold text-muted-foreground uppercase" style={mono}>Old Regime</div>
            <div className="text-sm font-extrabold text-foreground mt-0.5" style={display}>
              {formatCurrency(oldTax)}
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between w-full">
            <span className="text-[9px] text-muted-foreground">Tax Due</span>
            {bestRegime === "old" && (
              <span className="bg-green-100 text-green-700 text-[8px] font-bold px-1 py-0.2 rounded" style={mono}>
                Best
              </span>
            )}
          </div>
        </button>
      </div>

      {/* Savings Notification */}
      {taxSavings > 0 && (
        <div className="mb-3 bg-emerald-50 border border-emerald-100 rounded-xl p-2.5 flex items-center gap-2 text-[11px] text-emerald-800">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 animate-pulse" />
          <div className="leading-tight">
            You save <strong className="text-emerald-700">{formatCurrency(taxSavings)}</strong> under the{" "}
            <strong className="uppercase">{bestRegime === "new" ? "New" : "Old"}</strong> Regime!
          </div>
        </div>
      )}

      {/* Due / Refund */}
      <div className={`p-3 rounded-xl border mb-4 flex items-center gap-3 justify-between transition-all ${
        netDueOrRefund > 0
          ? "bg-green-50 border-green-100"
          : netDueOrRefund < 0
          ? "bg-amber-50 border-amber-100"
          : "bg-gray-50 border-gray-100"
      }`}>
        <div>
          <div className="text-[9px] text-muted-foreground uppercase" style={mono}>
            {netDueOrRefund > 0 ? "Estimated Refund" : netDueOrRefund < 0 ? "Balance Tax Payable" : "Balance Status"}
          </div>
          <div className={`text-base font-black mt-0.5 ${
            netDueOrRefund > 0 ? "text-green-600" : netDueOrRefund < 0 ? "text-amber-600" : "text-gray-600"
          }`} style={display}>
            {formatCurrency(Math.abs(netDueOrRefund))}
          </div>
        </div>
        <div className="flex-shrink-0">
          {netDueOrRefund > 0 ? (
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          ) : netDueOrRefund < 0 ? (
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 animate-bounce">
              <Bell className="w-4 h-4" />
            </div>
          ) : (
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
              <CheckCircle className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        id="est-file-btn"
        onClick={() => setPage("contact")}
        className="w-full bg-primary hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-xs cursor-pointer active:scale-98"
      >
        {netDueOrRefund > 0 ? "Claim Your Refund Now" : "File Your Return Now"}
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// ─── Home Page ─────────────────────────────────────────────────────────────────

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [persona, setPersona] = useState<"salaried" | "retailer" | "freelancer">("salaried");

  // Progress Simulator States
  const [simStep, setSimStep] = useState<number>(0);
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [simAadhaar, setSimAadhaar] = useState<string>("5123 4567 8901");
  const [simProgress, setSimProgress] = useState<number>(0);
  const [simProgressText, setSimProgressText] = useState<string>("");
  const [simChatText, setSimChatText] = useState<string>("");
  const [simChatMessages, setSimChatMessages] = useState<Array<{ sender: "ca" | "user"; text: string }>>([
    { sender: "ca", text: "Hello! I am CA Ajay Sharma. I've completed the preliminary review of your auto-fetched Form 16 and AIS." },
    { sender: "ca", text: "I noticed you didn't claim HRA rent relief of ₹15,000. I can add this deduction to increase your expected refund by ₹3,120. Should I go ahead?" }
  ]);

  const handleSendChatMessage = () => {
    if (!simChatText.trim()) return;
    const userMsg = simChatText;
    setSimChatMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setSimChatText("");

    setTimeout(() => {
      let caText = "Certainly. I have applied the change and verified it. Your updated expected refund is ₹27,970.";
      if (userMsg.toLowerCase().includes("how") || userMsg.toLowerCase().includes("what")) {
        caText = "This deduction is governed under Section 10(13A) for HRA HRA exemption calculations. Everything is fully compliant and verified against your rent receipts.";
      } else if (userMsg.toLowerCase().includes("safe") || userMsg.toLowerCase().includes("secure")) {
        caText = "D Tax Rail uses bank-grade 256-bit encryption. All tax data shared here is completely private and only accessible to authorized CAs.";
      }
      setSimChatMessages(prev => [...prev, { sender: "ca", text: caText }]);
    }, 600);
  };

  const startAutoFetch = () => {
    setSimProgress(1);
    setSimProgressText("Initializing CPC API Sync...");
    
    const intervals = [
      { p: 25, t: "Syncing Form 16 (Employer Salary)..." },
      { p: 50, t: "Syncing AIS Statement (Mutual Funds & Interest)..." },
      { p: 75, t: "Syncing Form 26AS (Tax Deducted)..." },
      { p: 100, t: "Consolidating tax credit profiles..." }
    ];

    intervals.forEach((step, idx) => {
      setTimeout(() => {
        setSimProgress(step.p);
        setSimProgressText(step.t);
        if (step.p === 100) {
          setTimeout(() => {
            setSimStep(2);
          }, 800);
        }
      }, (idx + 1) * 850);
    });
  };

  const features = [
    {
      icon: FileText,
      title: "Easy ITR Filing",
      desc: "Step-by-step guided filing for all ITR forms. Suitable for salaried, freelancers, and businesses.",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      icon: TrendingUp,
      title: "Refund Tracking",
      desc: "Real-time refund status with expected credit dates and e-verification status updates.",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      icon: Database,
      title: "Smart Document Management",
      desc: "Form 16, AIS, 26AS and all tax documents — securely organised and always accessible in one place.",
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
    },
    {
      icon: Bell,
      title: "Compliance Alerts",
      desc: "Never miss a deadline with automated reminders for advance tax, TDS, and ITR due dates.",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
  ];

  const steps = [
    { num: "01", title: "Login Securely", desc: "Create your account with Aadhaar-linked mobile OTP verification" },
    { num: "02", title: "Submit Documents", desc: "Share Form 16, 26AS, AIS, and income proof through our secure portal" },
    { num: "03", title: "Expert Review", desc: "CA-certified experts review and optimise your return for maximum refund" },
    { num: "04", title: "Return Filed", desc: "ITR filed, e-verified, and acknowledgement sent to your email" },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      city: "Mumbai",
      role: "Software Engineer",
      quote: "D Tax Rail made filing my ITR incredibly simple. Got my ₹31,200 refund credited in just 8 days!",
      rating: 5,
    },
    {
      name: "Rajesh Kumar",
      city: "Bengaluru",
      role: "Freelance Designer",
      quote: "Managing multiple income sources was always complicated. Not anymore. The expert guidance is outstanding.",
      rating: 5,
    },
    {
      name: "Anita Mehta",
      city: "New Delhi",
      role: "Small Business Owner",
      quote: "The compliance alerts saved me from an advance tax penalty. Their CAs truly understand business taxation.",
      rating: 5,
    },
  ];

  const faqs = [
    {
      q: "How long does the ITR filing process take?",
      a: "Most returns are filed within 24–48 hours after document submission. Our experts work swiftly to ensure accurate filing with real-time status updates throughout the process.",
    },
    {
      q: "Is my financial data secure on your platform?",
      a: "Absolutely. We use 256-bit SSL encryption for all data in transit, ISO-compliant cloud storage, and follow all IT Act 2000 data privacy standards. Your data is never shared with third parties.",
    },
    {
      q: "Can I track my refund status on the platform?",
      a: "Yes. Our real-time refund tracker pulls live data from the Income Tax Department's CPC portal, showing current processing status, expected credit date, and bank account validation status.",
    },
  ];

  // Helper formatting
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="pt-16">
      {/* ── Hero ── */}
      <section className="min-h-[92vh] grid lg:grid-cols-[53%_47%] relative overflow-hidden">
        <div className="bg-[#0C1B33] flex items-center px-6 sm:px-10 lg:px-14 xl:px-16 py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-blue-600/10 opacity-50 animate-pulse" style={{ animationDuration: "8s" }} />
          <SectionParticles />
          <div className="max-w-xl relative z-10">
            <div
              className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-6"
              style={mono}
            >
              <Shield className="w-3.5 h-3.5 text-blue-300" />
              <span className="text-xs text-blue-200 tracking-wide">256-bit Encrypted · Secure Platform</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-[3rem] xl:text-[3.4rem] font-extrabold text-white leading-[1.15] mb-4"
              style={display}
            >
              Simple,<br />
              Smart &amp;<br />
              <span className="text-blue-400">Secure</span><br />
              Tax Solutions
            </h1>

            <p className="text-blue-400/80 text-xs font-bold mb-4 tracking-wide uppercase" style={mono}>
              D Tax Rail · Fast ITR &amp; GST Compliance
            </p>

            <p className="text-blue-100/75 text-base leading-relaxed mb-8 max-w-md">
              Our mission is to provide simple, secure, and easy tax filing solutions that empower
              individuals and businesses to meet their compliance needs with confidence. Get audited by CAs.
            </p>

            <div className="flex flex-wrap gap-3.5 mb-10">
              <button
                onClick={() => setPage("contact")}
                className="bg-[#1A56DB] hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-900/40 cursor-pointer"
              >
                Get in Touch <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="https://www.instagram.com/dtaxrail?igsh=Z2p4aGVhcHYxYnd5"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/8 border border-white/20 hover:bg-white/15 text-white font-semibold px-6 py-3 rounded-xl transition-all flex items-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                Follow Us
              </a>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {[
                { icon: Lock, label: "256-bit SSL" },
                { icon: CheckCircle, label: "CA Verified Returns" },
                { icon: Zap, label: "24hr Filing Guarantee" },
                { icon: Smartphone, label: "Mobile Optimized" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                  <span className="text-xs text-blue-200" style={mono}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 via-[#EEF3FF] to-white flex items-center justify-center px-6 sm:px-12 py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/30 via-transparent to-indigo-100/30 opacity-60 animate-pulse" style={{ animationDuration: "10s" }} />
          <div className="relative z-10 w-full max-w-[480px]">
            <TaxEstimatorWidget persona={persona} setPersona={setPersona} setPage={setPage} />
          </div>
        </div>
      </section>

      {/* ── Trust Badges ── */}
      <section className="bg-white border-y border-border py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Lock, title: "Secure Data Protection", desc: "256-bit SSL Encryption", iconBg: "bg-blue-50", iconColor: "text-blue-600" },
              { icon: CheckCircle, title: "Trusted Tax Experts", desc: "CA-assisted filing", iconBg: "bg-green-50", iconColor: "text-green-600" },
              { icon: Zap, title: "Fast Processing", desc: "Filed within 24 hours", iconBg: "bg-amber-50", iconColor: "text-amber-600" },
              { icon: Smartphone, title: "Mobile Access", desc: "All devices supported", iconBg: "bg-violet-50", iconColor: "text-violet-600" },
            ].map(({ icon: Icon, title, desc, iconBg, iconColor }) => (
              <div
                key={title}
                className="flex flex-col items-center text-center p-5 rounded-2xl border border-border hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${iconBg}`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <div className="font-semibold text-foreground text-sm mb-0.5">{title}</div>
                <div className="text-xs text-muted-foreground" style={mono}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Choose Your Journey / Persona Selector ── */}
      <section className="py-24 bg-gradient-to-b from-white to-blue-50/20 border-b border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block bg-secondary text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4" style={mono}>
              CHOOSE YOUR JOURNEY
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" style={display}>
              Who Are You Filing For?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Select your profile to unlock custom deduction checklists, expert CA advice, and filing speeds tailored to your domain.
            </p>
          </div>

          {/* Tab buttons */}
          <div className="flex justify-center gap-3 mb-10 max-w-lg mx-auto bg-muted p-1.5 rounded-2xl">
            {(["salaried", "retailer", "freelancer"] as const).map((p) => (
              <button
                key={p}
                type="button"
                id={`journey-persona-${p}`}
                onClick={() => setPersona(p)}
                className={`flex-1 py-3 px-2 text-sm font-bold rounded-xl transition-all capitalize flex items-center justify-center gap-2 cursor-pointer ${
                  persona === p
                    ? "bg-white text-primary shadow-md border border-gray-100"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {p === "salaried" ? "💼 Salaried" : p === "retailer" ? "🏪 Retailer" : "🚀 Freelancer"}
              </button>
            ))}
          </div>

          {/* Persona details panel */}
          <div className="grid md:grid-cols-5 gap-8 bg-card border border-border rounded-3xl p-6 md:p-8 shadow-xl">
            {/* Left side: checklist */}
            <div className="md:col-span-3">
              <h3 className="text-xl font-bold text-foreground mb-2 flex items-center gap-2" style={display}>
                {persona === "salaried" && "Salaried Employee Tax Checklist"}
                {persona === "retailer" && "Retailer & Merchant Tax Checklist"}
                {persona === "freelancer" && "Freelancer & Contractor Tax Checklist"}
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                {persona === "salaried" && "Maximize your tax savings under Old or New regime by tracking your common allowances."}
                {persona === "retailer" && "Optimize your business taxes by claiming input credit, depreciation, and business expense deductions."}
                {persona === "freelancer" && "Claim professional expenses or file under presumptive taxation schemes to maximize your take-home pay."}
              </p>

              {/* Checklist items */}
              <div className="grid sm:grid-cols-2 gap-3.5 mb-6">
                {persona === "salaried" && [
                  { id: "s1", label: "Standard Deduction (₹75,000)", tooltip: "Flat deduction for salaried employees under New Regime (₹50,000 under Old)" },
                  { id: "s2", label: "House Rent Allowance (HRA)", tooltip: "Claim exemption on rent paid to landlord" },
                  { id: "s3", label: "Section 80C Deductions", tooltip: "PPF, EPF, ELSS, Insurance premium up to ₹1.5 Lakhs" },
                  { id: "s4", label: "Section 80D Medical Insurance", tooltip: "Claim premiums paid for self, spouse, children & parents" },
                  { id: "s5", label: "Home Loan Interest (Sec 24)", tooltip: "Up to ₹2 Lakhs deduction on interest paid for self-occupied home" },
                  { id: "s6", label: "LTA & Meal Coupons", tooltip: "Exemptions on domestic travel tickets and Sodexo meal allowances" },
                ].map((item) => (
                  <label key={item.id} className="flex items-start gap-3 p-3 bg-muted/50 hover:bg-muted border border-border rounded-xl cursor-pointer transition-colors group select-none">
                    <input type="checkbox" defaultChecked className="mt-1 rounded border-gray-300 text-primary focus:ring-primary w-4 h-4 cursor-pointer" />
                    <div>
                      <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{item.label}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{item.tooltip}</div>
                    </div>
                  </label>
                ))}

                {persona === "retailer" && [
                  { id: "r1", label: "Section 44AD Presumptive Tax", tooltip: "Declare flat 6% of digital turnover (8% cash) as profits, no auditing required" },
                  { id: "r2", label: "GST Input Tax Credit (ITC)", tooltip: "Offset GST paid on raw goods/purchases against sales GST" },
                  { id: "r3", label: "Shop Rent & Electricity", tooltip: "Fully deduct monthly shop rent and utility expenses" },
                  { id: "r4", label: "Employee Salaries & Bonus", tooltip: "Wages paid to shop assistants or workers are business deductions" },
                  { id: "r5", label: "Asset Depreciation", tooltip: "Claim depreciation on shop counters, display units, billing computers" },
                  { id: "r6", label: "Business Loan Interest", tooltip: "Interest paid on commercial shop loans is 100% tax deductible" },
                ].map((item) => (
                  <label key={item.id} className="flex items-start gap-3 p-3 bg-muted/50 hover:bg-muted border border-border rounded-xl cursor-pointer transition-colors group select-none">
                    <input type="checkbox" defaultChecked className="mt-1 rounded border-gray-300 text-primary focus:ring-primary w-4 h-4 cursor-pointer" />
                    <div>
                      <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{item.label}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{item.tooltip}</div>
                    </div>
                  </label>
                ))}

                {persona === "freelancer" && [
                  { id: "f1", label: "Section 44ADA (Presumptive)", tooltip: "Declare only 50% of gross receipts as taxable income under ₹75L" },
                  { id: "f2", label: "Laptop & Gadgets Depreciation", tooltip: "Depreciate up to 40% per year for computers, cameras, and editing systems" },
                  { id: "f3", label: "Home Office Rent Portion", tooltip: "Deduct a portion of home rent/electricity used for work space" },
                  { id: "f4", label: "Software & Subscriptions", tooltip: "Adobe CC, GitHub, AWS, ChatGPT, Notion etc. are 100% business expenses" },
                  { id: "f5", label: "Co-working Space Fees", tooltip: "Deduct membership fees paid for co-working or desk rentals" },
                  { id: "f6", label: "Travel & Client Dinner Costs", tooltip: "Deduct cab rides, flights, and meals paid while meeting clients" },
                ].map((item) => (
                  <label key={item.id} className="flex items-start gap-3 p-3 bg-muted/50 hover:bg-muted border border-border rounded-xl cursor-pointer transition-colors group select-none">
                    <input type="checkbox" defaultChecked className="mt-1 rounded border-gray-300 text-primary focus:ring-primary w-4 h-4 cursor-pointer" />
                    <div>
                      <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">{item.label}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">{item.tooltip}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Right side: Expert Card & stats */}
            <div className="md:col-span-2 flex flex-col justify-between border-t md:border-t-0 md:border-l border-border pt-6 md:pt-0 md:pl-6">
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm" style={display}>AJ</div>
                  <div>
                    <div className="font-semibold text-foreground text-xs">CA Ajay Sharma</div>
                    <div className="text-[10px] text-primary" style={mono}>Senior Tax Advisor</div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground leading-relaxed italic">
                  {persona === "salaried" && `"Salaried professionals often miss claiming HRA or Section 80D details that aren't in their Form 16. Our platform checks all sources to ensure you get every rupee back."`}
                  {persona === "retailer" && `"Filing Section 44AD presumptive taxes is much cheaper and simpler. Ensure digital sales are highlighted since they get a reduced tax rate of 6% instead of 8%."`}
                  {persona === "freelancer" && `"Under Section 44ADA, you do not need to keep receipts for every single cup of coffee or subscription, as you get a flat 50% deduction. It is a massive tax saver!"`}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs pb-2 border-b border-gray-100">
                  <span className="text-muted-foreground">Estimated Speed:</span>
                  <span className="font-bold text-green-600" style={mono}>
                    {persona === "salaried" ? "15 Mins" : persona === "retailer" ? "24 Hours" : "12 Hours"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs pb-2 border-b border-gray-100">
                  <span className="text-muted-foreground">Filing Type:</span>
                  <span className="font-bold text-foreground" style={mono}>
                    {persona === "salaried" ? "ITR-1 / ITR-2" : persona === "retailer" ? "ITR-3 / Presumptive 44AD" : "ITR-4 / Presumptive 44ADA"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">CA Review Included:</span>
                  <span className="font-bold text-primary" style={mono}>Yes, 100% Expert Verified</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPage("contact")}
                className="w-full bg-[#0C1B33] hover:bg-blue-950 text-white font-semibold py-3 px-4 rounded-xl transition-all text-xs flex items-center justify-center gap-2 mt-6 cursor-pointer"
              >
                Start Your {persona === "salaried" ? "Salaried" : persona === "retailer" ? "Merchant" : "Freelance"} Return
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Features ── */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-block bg-secondary text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4" style={mono}>
              FEATURES
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" style={display}>
              Everything you need to file taxes
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Built for salaried employees, freelancers, and businesses across India
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map(({ icon: Icon, title, desc, iconBg, iconColor }) => (
              <div
                key={title}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all group cursor-default"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${iconBg}`}>
                  <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-base" style={display}>{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 bg-[#0C1B33] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 via-transparent to-blue-950/40 opacity-70 animate-pulse" style={{ animationDuration: "12s" }} />
        <SectionParticles />
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <div className="inline-block bg-white/10 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-4" style={mono}>
              HOW IT WORKS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white" style={display}>
              File your ITR in 4 simple steps
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map(({ num, title, desc }, idx) => (
              <div key={num} className="relative group">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors h-full">
                  <div className="font-bold text-blue-400/30 mb-4 text-5xl leading-none" style={mono}>{num}</div>
                  <h3 className="font-bold text-white mb-2" style={display}>{title}</h3>
                  <p className="text-sm text-blue-100/60 leading-relaxed">{desc}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dashboard Preview (Interactive Simulator) ── */}
      <section className="py-24 bg-gradient-to-b from-blue-50/60 to-background border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block bg-secondary text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4" style={mono}>
              INTERACTIVE FILING PREVIEW
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" style={display}>
              Experience Our Digital Portal
            </h2>
            <p className="text-muted-foreground">Simulate the step-by-step digital process of linking KYC, fetching returns and CA auditing.</p>
          </div>

          <div className="bg-card border border-border rounded-3xl p-6 lg:p-8 shadow-xl">
            {/* Simulator Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-border">
              <div>
                <h3 className="font-bold text-foreground text-lg flex items-center gap-2" style={display}>
                  Welcome back, {simStep === 0 ? "Guest User" : "Rajesh Kumar"}
                  {simStep > 0 && <span className="w-2 h-2 bg-green-500 rounded-full inline-block animate-pulse" />}
                </h3>
                <p className="text-xs text-muted-foreground" style={mono}>
                  Assessment Year 2024–25 · PAN: {simStep > 0 ? "ABCPK1234R" : "Unverified"}
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                  simStep === 3 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                }`} style={mono}>
                  {simStep === 3 ? "✓ E-Filed & E-Verified" : "ITR-1 Draft"}
                </span>
                <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full" style={mono}>
                  AY 2024-25
                </span>
              </div>
            </div>

            {/* Dashboard Stat Cards Row (Updates dynamically!) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { 
                  label: "Total Income", 
                  value: simStep >= 2 ? formatCurrency(840000) : "₹0", 
                  sub: "FY 2024-25", 
                  textColor: "text-foreground" 
                },
                { 
                  label: "TDS Deducted", 
                  value: simStep >= 2 ? formatCurrency(52400) : "₹0", 
                  sub: "Employer logs", 
                  textColor: "text-foreground" 
                },
                { 
                  label: "Tax Liability", 
                  value: simStep === 2 ? formatCurrency(27550) : simStep === 3 ? formatCurrency(24430) : "₹0", 
                  sub: simStep === 3 ? "After CA Optimization" : "Initial calculation", 
                  textColor: simStep >= 2 ? "text-amber-600" : "text-gray-400" 
                },
                { 
                  label: "Expected Refund", 
                  value: simStep === 2 ? formatCurrency(24850) : simStep === 3 ? formatCurrency(27970) : "₹0", 
                  sub: simStep === 3 ? "CA optimized refund!" : "Expected", 
                  textColor: simStep >= 2 ? "text-green-600" : "text-gray-400" 
                },
              ].map(({ label, value, sub, textColor }) => (
                <div key={label} className="bg-muted/80 rounded-2xl p-4 transition-all hover:bg-muted duration-200">
                  <div className="text-xs text-muted-foreground mb-1" style={mono}>{label}</div>
                  <div className={`text-xl font-bold transition-all ${textColor}`} style={display}>{value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{sub}</div>
                </div>
              ))}
            </div>

            {/* Simulator Split Screen */}
            <div className="grid md:grid-cols-12 gap-6">
              {/* Left Column: Interactive Simulation Control panel */}
              <div className="md:col-span-7 bg-muted/40 border border-border rounded-2xl p-5 flex flex-col justify-between min-h-[340px]">
                
                {simStep === 0 && (
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase" style={mono}>
                        Step 1 of 4
                      </span>
                      <h4 className="font-bold text-foreground text-base mt-2 mb-2" style={display}>Verify KYC via Aadhaar OTP</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                        To fetch standard deductions and TDS from the Income Tax department, secure your identity by completing Aadhaar OTP linking.
                      </p>
                      
                      <div className="space-y-3 max-w-sm">
                        <div>
                          <label className="block text-[10px] text-muted-foreground uppercase font-bold mb-1" style={mono}>PAN Card Number</label>
                          <input type="text" readOnly value="ABCPK1234R" className="w-full bg-white border border-border rounded-xl px-3 py-2 text-xs font-bold text-foreground focus:outline-none" style={mono} />
                        </div>
                        <div>
                          <label className="block text-[10px] text-muted-foreground uppercase font-bold mb-1" style={mono}>Aadhaar Number</label>
                          <input
                            type="text"
                            id="sim-aadhaar"
                            placeholder="Enter 12-digit Aadhaar"
                            value={simAadhaar}
                            onChange={(e) => setSimAadhaar(e.target.value)}
                            className="w-full bg-white border border-border rounded-xl px-3 py-2 text-xs font-bold text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                            style={mono}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      id="sim-verify-aadhaar-btn"
                      onClick={() => {
                        setIsOtpSent(true);
                        setSimStep(1); // Auto progress to step 1 for simple visual linking
                      }}
                      disabled={simAadhaar.replace(/\s/g, "").length < 12}
                      className="bg-primary hover:bg-blue-600 disabled:opacity-50 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer mt-4"
                    >
                      Link Aadhaar &amp; Continue <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {simStep === 1 && (
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase" style={mono}>
                        Step 2 of 4
                      </span>
                      <h4 className="font-bold text-foreground text-base mt-2 mb-2" style={display}>Auto-Fetch Tax Documents</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-5">
                        D Tax Rail is securely linked to your PAN. Fetch Form 16, AIS tax statements, and Form 26AS directly from CPC portals.
                      </p>

                      {simProgress > 0 && (
                        <div className="space-y-2 mb-4 bg-white border border-border p-4 rounded-xl">
                          <div className="flex justify-between text-xs font-bold text-foreground" style={mono}>
                            <span>Syncing Database...</span>
                            <span>{simProgress}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-primary h-1.5 transition-all duration-305" style={{ width: `${simProgress}%` }} />
                          </div>
                          <div className="text-[10px] text-muted-foreground italic flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-ping" />
                            {simProgressText}
                          </div>
                        </div>
                      )}
                    </div>

                    {simProgress === 0 ? (
                      <button
                        type="button"
                        id="sim-fetch-docs-btn"
                        onClick={startAutoFetch}
                        className="bg-primary hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer w-full"
                      >
                        <ScanLine className="w-4 h-4" /> Auto-Fetch From CPC Portal
                      </button>
                    ) : (
                      <button disabled className="bg-gray-200 text-gray-500 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 w-full">
                        Syncing...
                      </button>
                    )}
                  </div>
                )}

                {simStep === 2 && (
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase" style={mono}>
                          Step 3 of 4 · CA Audit
                        </span>
                        <span className="bg-green-100 text-green-700 text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                          <span className="w-1 h-1 bg-green-500 rounded-full animate-ping" /> Online
                        </span>
                      </div>
                      <h4 className="font-bold text-foreground text-xs mt-1.5 mb-2 border-b border-gray-100 pb-2 flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-primary" /> Live Chat with Advisor
                      </h4>
                      
                      {/* Chat interface */}
                      <div className="bg-white border border-border rounded-xl p-3 h-40 overflow-y-auto space-y-2.5 text-[11px] mb-3">
                        {simChatMessages.map((msg, i) => (
                          <div key={i} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[85%] rounded-xl px-3 py-2 ${
                              msg.sender === "user" 
                                ? "bg-primary text-white" 
                                : "bg-muted text-foreground"
                            }`}>
                              {msg.text}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Chat Input */}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          id="sim-chat-input"
                          placeholder="Ask Ajay a question..."
                          value={simChatText}
                          onChange={(e) => setSimChatText(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleSendChatMessage()}
                          className="flex-1 bg-white border border-border rounded-xl px-3 py-1.5 text-xs text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                        />
                        <button
                          type="button"
                          id="sim-chat-send"
                          onClick={handleSendChatMessage}
                          className="bg-primary hover:bg-blue-600 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs cursor-pointer"
                        >
                          Send
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-2.5 mt-4 pt-3 border-t border-gray-100">
                      <button
                        type="button"
                        id="sim-approve-itr-btn"
                        onClick={() => setSimStep(3)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-green-150"
                      >
                        <CheckCircle className="w-3.5 h-3.5" /> Approve &amp; E-File Return
                      </button>
                    </div>
                  </div>
                )}

                {simStep === 3 && (
                  <div className="flex flex-col h-full justify-between text-center py-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-foreground text-base mb-1.5" style={display}>ITR Filed Successfully!</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
                        Your ITR-1 return for AY 2024-25 has been e-verified. The Income Tax Department will credit your refund of <strong>₹27,970</strong> to your linked bank account.
                      </p>

                      <div className="bg-white border border-green-100 p-3 rounded-xl mt-4 w-full max-w-xs text-left flex items-start gap-2.5">
                        <FileText className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <div className="text-[10px] font-bold text-foreground">ITR-V Acknowledgement</div>
                          <div className="text-[9px] text-muted-foreground">Sent to rajesh.kumar@gmail.com</div>
                          <div className="text-[9px] text-primary mt-1 font-bold hover:underline cursor-pointer">Download Mock Receipt PDF</div>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      id="sim-reset-btn"
                      onClick={() => {
                        setSimStep(0);
                        setSimProgress(0);
                        setSimProgressText("");
                        setIsOtpSent(false);
                        setSimChatMessages([
                          { sender: "ca", text: "Hello! I am CA Ajay Sharma. I've completed the preliminary review of your auto-fetched Form 16 and AIS." },
                          { sender: "ca", text: "I noticed you didn't claim HRA rent relief of ₹15,000. I can add this deduction to increase your expected refund by ₹3,120. Should I go ahead?" }
                        ]);
                      }}
                      className="bg-primary hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer mt-4 self-center"
                    >
                      Reset Simulator &amp; Try Again
                    </button>
                  </div>
                )}

              </div>

              {/* Right Column: Document cabinet status */}
              <div className="md:col-span-5 bg-muted/30 border border-border rounded-2xl p-5 min-h-[340px] flex flex-col justify-between">
                <div>
                  <h4 className="font-semibold text-foreground text-xs mb-3 flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-muted-foreground" /> Document Cabinet Status
                  </h4>
                  <div className="space-y-3.5">
                    {[
                      { 
                        doc: "Form 16 (Salary Certificate)", 
                        status: simStep === 0 ? "Not Connected" : simStep === 1 ? "Awaiting Link" : "Verified & Sync", 
                        color: simStep === 0 ? "bg-gray-100 text-gray-500" : simStep === 1 ? "bg-amber-100 text-amber-700 animate-pulse" : "bg-green-100 text-green-700" 
                      },
                      { 
                        doc: "AIS Statement (Asset logs)", 
                        status: simStep === 0 ? "Not Connected" : simStep === 1 ? "Awaiting Link" : "Verified & Sync", 
                        color: simStep === 0 ? "bg-gray-100 text-gray-500" : simStep === 1 ? "bg-amber-100 text-amber-700 animate-pulse" : "bg-green-100 text-green-700" 
                      },
                      { 
                        doc: "Form 26AS (Tax Credits)", 
                        status: simStep === 0 ? "Not Connected" : simStep === 1 ? "Awaiting Link" : "Verified & Sync", 
                        color: simStep === 0 ? "bg-gray-100 text-gray-500" : simStep === 1 ? "bg-amber-100 text-amber-700 animate-pulse" : "bg-green-100 text-green-700" 
                      },
                      { 
                        doc: "Section 80D Deductions", 
                        status: simStep < 2 ? "No Info" : simStep === 2 ? "Awaiting Audit" : "CA Approved (+₹15k)", 
                        color: simStep < 2 ? "bg-gray-100 text-gray-500" : simStep === 2 ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700" 
                      },
                    ].map(({ doc, status, color }) => (
                      <div key={doc} className="flex items-center justify-between gap-2 transition-all duration-300">
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <span className="text-xs text-foreground truncate">{doc}</span>
                        </div>
                        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 transition-colors ${color}`} style={mono}>{status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl px-4 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Smartphone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-primary animate-pulse" style={mono}>LIVE PLATFORM PREVIEW</div>
                    <div className="text-[10px] text-muted-foreground leading-tight">Secure document integrations — live on D Tax Rail</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-block bg-secondary text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4" style={mono}>
              TESTIMONIALS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground" style={display}>
              Trusted by 10,000+ taxpayers
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(({ name, city, role, quote, rating }) => (
              <div
                key={name}
                className="bg-muted border border-border rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-foreground leading-relaxed mb-6 italic text-sm">&ldquo;{quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm" style={display}>{name[0]}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">{name}</div>
                    <div className="text-xs text-muted-foreground" style={mono}>{role} · {city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ Preview ── */}
      <section className="py-24 bg-background">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3" style={display}>Common questions</h2>
            <p className="text-muted-foreground">Quick answers to the most asked filing questions</p>
          </div>
          <div className="space-y-3">
            {faqs.map(({ q, a }, idx) => (
              <div key={idx} className="bg-card border border-border rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-muted/60 transition-colors"
                >
                  <span className="font-medium text-foreground text-sm">{q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 ml-4 transition-transform duration-200 ${openFaq === idx ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 pt-4 text-sm text-muted-foreground leading-relaxed border-t border-border">
                    {a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-[#0C1B33] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-blue-900/30 opacity-60 animate-pulse" style={{ animationDuration: "10s" }} />
        <SectionParticles />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={display}>
            Start your hassle-free tax filing today
          </h2>
          <p className="text-blue-100/70 mb-10 text-lg max-w-xl mx-auto">
            Join 10,000+ taxpayers across India who trust D Tax Rail for accurate, secure, and fast ITR filing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setPage("contact")}
              className="bg-[#1A56DB] hover:bg-blue-500 text-white font-semibold px-8 py-4 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-blue-900/40"
            >
              Contact Us <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="https://www.instagram.com/dtaxrail?igsh=Z2p4aGVhcHYxYnd5"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/8 border border-white/20 hover:bg-white/15 text-white font-semibold px-8 py-4 rounded-xl transition-all flex items-center gap-2"
            >
              <Instagram className="w-5 h-5" />
              Follow Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── About Page ────────────────────────────────────────────────────────────────

function AboutPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-[#0C1B33] py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-indigo-900/20 opacity-60 animate-pulse" style={{ animationDuration: "10s" }} />
        <SectionParticles />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block bg-white/10 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6" style={mono}>
            ABOUT D TAX RAIL
          </div>
          <p className="text-blue-400/80 text-xs font-semibold tracking-widest uppercase mb-3" style={mono}>
            Simple · Smart · Secure Tax Solutions
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5" style={display}>
            India's Modern Tax Filing Platform
          </h1>
          <p className="text-blue-100/75 text-lg leading-relaxed max-w-2xl mx-auto">
            Our mission is to provide simple, secure, and easy tax filing solutions that empower individuals and businesses
            to meet their compliance needs with confidence and convenience — backed by expert CA guidance and intuitive technology.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-3xl p-10 border border-blue-100">
              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4" style={display}>Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is to provide <strong className="text-foreground">simple, secure, and easy tax filing solutions</strong> that
                empower individuals and businesses to meet their compliance needs with confidence and convenience.
              </p>
            </div>
            <div className="bg-[#0C1B33] rounded-3xl p-10">
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4" style={display}>Our Vision</h2>
              <p className="text-blue-100/75 leading-relaxed">
                Our vision is to make D Tax Rail{" "}
                <strong className="text-white">India's most trusted digital tax partner</strong> — simplifying the way income
                tax is filed and managed across the country, while helping every citizen feel confident, secure, and
                empowered in their financial journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-block bg-secondary text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4" style={mono}>
              WHY CHOOSE US
            </div>
            <h2 className="text-3xl font-bold text-foreground" style={display}>Why D Tax Rail stands apart</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: UserCheck, title: "Expert Tax Guidance", desc: "CA-certified professionals review every return for accuracy and maximum deductions.", iconBg: "bg-blue-50", iconColor: "text-blue-600" },
              { icon: Lock, title: "Secure Data Handling", desc: "Bank-grade 256-bit encryption protects your financial data at every stage.", iconBg: "bg-green-50", iconColor: "text-green-600" },
              { icon: Zap, title: "Fast Filing Process", desc: "Most returns are processed and filed within 24 hours of document submission.", iconBg: "bg-amber-50", iconColor: "text-amber-600" },
              { icon: Eye, title: "Transparent Tracking", desc: "Real-time updates on every step of your filing, verification, and refund journey.", iconBg: "bg-violet-50", iconColor: "text-violet-600" },
              { icon: Globe, title: "Multilingual Support", desc: "Assistance in Hindi, Tamil, Telugu, Marathi, Kannada, and other regional languages.", iconBg: "bg-rose-50", iconColor: "text-rose-600" },
              { icon: Award, title: "98% Satisfaction Rate", desc: "Trusted by over 10,000 taxpayers with near-perfect customer satisfaction scores.", iconBg: "bg-teal-50", iconColor: "text-teal-600" },
            ].map(({ icon: Icon, title, desc, iconBg, iconColor }) => (
              <div key={title} className="bg-card border border-border rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${iconBg}`}>
                  <Icon className={`w-6 h-6 ${iconColor}`} />
                </div>
                <h3 className="font-bold text-foreground mb-2" style={display}>{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-secondary text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6" style={mono}>
                SECURITY &amp; PRIVACY
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-6" style={display}>
                Your data is our highest priority
              </h2>
              <div className="space-y-5">
                {[
                  { title: "256-bit SSL Encryption", desc: "All data in transit is encrypted using bank-grade TLS 1.3 protocols." },
                  { title: "Secure Cloud Storage", desc: "Documents stored in isolated, access-controlled cloud environments with zero-trust architecture." },
                  { title: "Privacy-First Architecture", desc: "Your data is never sold, shared, or used for advertising purposes. Period." },
                  { title: "IT Act & DPDP Compliance", desc: "Fully compliant with Indian IT Act 2000 and Digital Personal Data Protection Act 2023." },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm mb-0.5">{title}</div>
                      <div className="text-sm text-muted-foreground">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0C1B33] rounded-3xl p-8">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, label: "256-bit SSL", sub: "All data encrypted" },
                  { icon: Database, label: "Cloud Storage", sub: "Zero-trust secured" },
                  { icon: Lock, label: "Zero Breach", sub: "Perfect record" },
                  { icon: CheckCircle, label: "DPDP Compliant", sub: "2023 Act ready" },
                ].map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors">
                    <Icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                    <div className="font-bold text-white text-sm" style={display}>{label}</div>
                    <div className="text-xs text-blue-300 mt-0.5" style={mono}>{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-20 relative overflow-hidden">
        <SectionParticles />
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10K+", label: "Returns Filed" },
              { value: "98%", label: "Satisfaction Rate" },
              { value: "24/7", label: "Expert Support" },
              { value: "7 Days", label: "Avg. Refund Time" },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-4xl font-extrabold text-white mb-2" style={display}>{value}</div>
                <div className="text-blue-200 text-sm" style={mono}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team mention */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4" style={display}>Backed by Professionals</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-10">
            Our platform is supported by a team of Chartered Accountants, tax compliance specialists, cybersecurity
            professionals, and dedicated customer support executives — all working to make your filing experience seamless.
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { icon: UserCheck, label: "Chartered Accountants", count: "15+" },
              { icon: Shield, label: "Security Experts", count: "15+" },
              { icon: Headphones, label: "Support Executives", count: "100+" },
            ].map(({ icon: Icon, label, count }) => (
              <div key={label} className="bg-card border border-border rounded-2xl p-6 text-center">
                <Icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-1" style={display}>{count}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Services Page ─────────────────────────────────────────────────────────────

function ServicesPage({ setPage }: { setPage: (p: Page) => void }) {
  const services = [
    {
      icon: FileText,
      title: "Income Tax Filing (ITR e-Filing)",
      iconBg: "bg-blue-50", iconColor: "text-blue-600",
      badge: "Most Popular", badgeColor: "bg-blue-100 text-blue-700",
      desc: "File your income tax returns quickly and easily with guided steps. Our platform ensures accuracy and compliance, making tax filing stress-free for individuals and businesses.",
      features: [
        "Guided step-by-step ITR filing workflow",
        "All forms: ITR-1 through ITR-7",
        "CA expert review before submission",
        "Individual & business returns",
        "Submission within 24 hours",
      ],
    },
    {
      icon: Database,
      title: "Tax Document Management",
      iconBg: "bg-violet-50", iconColor: "text-violet-600",
      badge: null, badgeColor: "",
      desc: "Securely store, access, and manage your tax documents — including Forms, past returns, and certificates — all in one place, anytime you need them.",
      features: [
        "Secure document storage & retrieval",
        "Form 16, 26AS, AIS upload support",
        "Previous year return access",
        "Cloud-based document cabinet",
        "Bulk upload & auto-classification",
      ],
    },
    {
      icon: Bell,
      title: "Compliance Alerts & Reminders",
      iconBg: "bg-amber-50", iconColor: "text-amber-600",
      badge: null, badgeColor: "",
      desc: "Stay ahead of deadlines with smart notifications. We'll remind you of important dates and filing requirements so you never miss a compliance obligation.",
      features: [
        "Due date push notifications",
        "Advance tax installment reminders",
        "TDS filing compliance tracking",
        "Automated penalty risk alerts",
        "Custom SMS & email reminders",
      ],
    },
    {
      icon: TrendingUp,
      title: "Refund Tracking",
      iconBg: "bg-green-50", iconColor: "text-green-600",
      badge: null, badgeColor: "",
      desc: "Track the status of your income tax refund in real time. Get updates directly through the app and know exactly when to expect your money.",
      features: [
        "Real-time refund status from CPC",
        "Acknowledgement download (ITR-V)",
        "E-verification status tracking",
        "Instant refund credit alerts",
        "Bank account validation support",
      ],
    },
    {
      icon: HelpCircle,
      title: "Tax Advisory Support",
      iconBg: "bg-teal-50", iconColor: "text-teal-600",
      badge: "Expert Service", badgeColor: "bg-teal-100 text-teal-700",
      desc: "Receive expert guidance on exemptions, deductions, and tax-saving strategies. Our advisory support helps you maximize your benefits while staying compliant.",
      features: [
        "Section 80C, 80D deduction guidance",
        "Old vs. New tax regime comparison",
        "Tax-saving investment advice",
        "HRA, LTA exemption consultation",
        "Capital gains & crypto tax planning",
      ],
    },
    {
      icon: Lock,
      title: "Data Security & Privacy",
      iconBg: "bg-rose-50", iconColor: "text-rose-600",
      badge: null, badgeColor: "",
      desc: "Your financial data is protected with end-to-end encryption and strict compliance. Trust and safety are at the core of our service.",
      features: [
        "256-bit SSL encrypted storage",
        "Secure document upload pipeline",
        "Privacy-first architecture",
        "Zero data-sharing policy",
        "DPDP Act 2023 compliant",
      ],
    },
    {
      icon: Smartphone,
      title: "Multi-Platform Access",
      iconBg: "bg-indigo-50", iconColor: "text-indigo-600",
      badge: null, badgeColor: "",
      desc: "Access D Tax Rail seamlessly across mobile. Your data stays synced, secure, and available wherever you work.",
      features: [
        "Mobile-responsive dashboard",
        "Cross-device data synchronization",
        "Progressive Web App (PWA) support",
        "Optimised for iOS & Android",
        "Low-bandwidth mode for slower connections",
      ],
    },
    {
      icon: Headphones,
      title: "Customer Support",
      iconBg: "bg-orange-50", iconColor: "text-orange-600",
      badge: "24/7", badgeColor: "bg-orange-100 text-orange-700",
      desc: "Get help when you need it. Our FAQ, live chat, and email support ensure that your tax filing journey is smooth and worry-free.",
      features: [
        "Comprehensive self-help FAQ library",
        "AI-powered chatbot assistant",
        "Callback scheduling (choose your slot)",
        "Email & phone support",
        "CA expert live chat sessions",
      ],
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-[#0C1B33] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-indigo-900/20 opacity-60 animate-pulse" style={{ animationDuration: "10s" }} />
        <SectionParticles />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block bg-white/10 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6" style={mono}>
            OUR SERVICES
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={display}>
            Complete Tax Solutions
          </h1>
          <p className="text-blue-100/75 text-lg max-w-xl mx-auto">
            End-to-end income tax services for salaried individuals, freelancers, and businesses across India
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {services.map(({ icon: Icon, title, iconBg, iconColor, badge, badgeColor, desc, features }) => (
              <div
                key={title}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all flex flex-col"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg}`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                  </div>
                  {badge && (
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColor}`} style={mono}>
                      {badge}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-foreground mb-2" style={display}>{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{desc}</p>
                <ul className="space-y-2 mt-auto pt-2 border-t border-border">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground pt-2 first:pt-0">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tax Tools */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-block bg-secondary text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4" style={mono}>
              FREE TAX TOOLS
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-3" style={display}>Calculate before you file</h2>
            <p className="text-muted-foreground">Free tools to help you plan and optimise your taxes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Calculator,
                title: "Income Tax Calculator",
                desc: "Calculate your exact tax liability for FY 2024-25 under old and new regime in seconds.",
                badge: "Coming Soon",
              },
              {
                icon: TrendingUp,
                title: "Regime Comparison",
                desc: "Side-by-side comparison of old vs. new tax regime with deductions to pick the best option.",
                badge: "Coming Soon",
              },
              {
                icon: Bell,
                title: "Deadline Tracker",
                desc: "Check all critical ITR filing deadlines, advance tax dates, and TDS payment due dates.",
                badge: "Coming Soon",
              },
            ].map(({ icon: Icon, title, desc, badge }) => (
              <div key={title} className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-foreground mb-2" style={display}>{title}</h3>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{desc}</p>
                <span className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1.5 rounded-full" style={mono}>
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 relative overflow-hidden">
        <SectionParticles />
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-3" style={display}>Ready to get started?</h2>
          <p className="text-blue-100/75 mb-8">Our experts are ready to help you file accurately and on time.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setPage("contact")}
              className="bg-white text-primary font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              Contact Us <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="https://www.instagram.com/dtaxrail?igsh=Z2p4aGVhcHYxYnd5"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              <Instagram className="w-5 h-5" />
              Follow Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Contact Page ──────────────────────────────────────────────────────────────

function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How do I start filing my ITR on D Tax Rail?",
      a: "Register with your mobile number, complete KYC with your PAN, upload your Form 16 and other income documents, and our experts will take it from there. You'll receive status updates at every step.",
    },
    {
      q: "How long does e-verification take?",
      a: "E-verification via Aadhaar OTP, net banking, or DSC is instant. Once verified, the IT Department typically processes ITR-1 and ITR-4 returns within 15–45 days for refunds.",
    },
    {
      q: "How can I track my income tax refund?",
      a: "Log in to your D Tax Rail dashboard and navigate to 'Refund Tracker'. You'll see live status pulled from the CPC portal, along with expected credit date and bank validation status.",
    },
    {
      q: "Is my personal and financial data secure?",
      a: "Absolutely. We use 256-bit SSL encryption for all transmissions, ISO-certified cloud storage with access controls, and comply fully with IT Act 2000 and DPDP Act 2023. Your data is never shared or sold.",
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-[#0C1B33] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-indigo-900/20 opacity-60 animate-pulse" style={{ animationDuration: "10s" }} />
        <SectionParticles />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-block bg-white/10 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6" style={mono}>
            CONTACT US
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4" style={display}>
            We're Here to Help
          </h1>
          <p className="text-blue-100/75 text-lg mb-4">
            Get assistance with filing, refunds, compliance, or account support
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-300/80" style={mono}>
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" />8187882772</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />Bobbili, Vizianagaram, AP</span>
            <span className="flex items-center gap-1.5"><Instagram className="w-3.5 h-3.5" />@dtaxrail</span>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Main contact card */}
              <div className="bg-card border border-border rounded-3xl p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6" style={display}>Get in Touch</h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  We're here to help you with all your tax filing needs. Reach out to us through any of the channels below, and our team will respond as soon as possible.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-5 bg-muted rounded-2xl hover:shadow-md transition-shadow">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Instagram className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">Instagram (Primary)</h3>
                      <p className="text-sm text-muted-foreground mb-3">Follow us and send a DM for quick assistance</p>
                      <a
                        href="https://www.instagram.com/dtaxrail?igsh=Z2p4aGVhcHYxYnd5"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors text-sm font-medium"
                      >
                        <Instagram className="w-4 h-4" />
                        @dtaxrail
                      </a>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-4 p-5 bg-blue-50 border border-blue-100 rounded-2xl">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1 text-sm">Email</h3>
                        <a
                          href="mailto:support@dtaxrail.in"
                          className="text-sm text-primary hover:underline"
                        >
                          support@dtaxrail.in
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-5 bg-green-50 border border-green-100 rounded-2xl">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1 text-sm">Phone</h3>
                        <a href="tel:8187882772" className="text-sm text-green-700 font-semibold hover:underline">
                          8187882772
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-violet-50 border border-violet-100 rounded-2xl">
                    <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-violet-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Office Address</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        49-107, Manda Street, Bobbili<br />
                        Vizianagaram District, Andhra Pradesh — 535558
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-amber-50 border border-amber-100 rounded-2xl">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Office Hours</h3>
                      <p className="text-sm text-muted-foreground">Monday – Saturday, 9:00 AM – 8:00 PM IST</p>
                      <p className="text-xs text-amber-700 mt-1">
                        Instagram messages are monitored 24/7 for urgent queries
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Info sidebar */}
            <div className="space-y-5">
              <div className="bg-card border border-border rounded-3xl p-6">
                <h3 className="font-bold text-foreground mb-5" style={display}>Support Information</h3>
                <div className="space-y-4">
                  {[
                    { icon: Mail, label: "Email", value: "support@dtaxrail.in", link: "mailto:support@dtaxrail.in" },
                    { icon: Phone, label: "Phone", value: "8187882772", link: "tel:8187882772" },
                    { icon: MapPin, label: "Address", value: "49-107, Manda St, Bobbili, AP", link: null },
                    { icon: Clock, label: "Office Hours", value: "Mon–Sat, 9AM–8PM IST", link: null },
                    { icon: Instagram, label: "Instagram", value: "@dtaxrail", link: "https://www.instagram.com/dtaxrail?igsh=Z2p4aGVhcHYxYnd5" },
                  ].map(({ icon: Icon, label, value, link }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs text-muted-foreground" style={mono}>{label}</div>
                        {link ? (
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-primary hover:underline"
                          >
                            {value}
                          </a>
                        ) : (
                          <div className="text-sm font-medium text-foreground">{value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#0C1B33] rounded-3xl p-6 text-center">
                <Instagram className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                <h3 className="font-bold text-white mb-2" style={display}>Connect on Instagram</h3>
                <p className="text-blue-100/65 text-sm mb-4 leading-relaxed">
                  Follow us for tax tips, filing updates, and quick support via DM.
                </p>
                <a
                  href="https://www.instagram.com/dtaxrail?igsh=Z2p4aGVhcHYxYnd5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#1A56DB] text-white font-semibold py-3 rounded-xl hover:bg-blue-500 transition-colors text-sm inline-block"
                >
                  Follow @dtaxrail →
                </a>
              </div>

              <div className="bg-green-50 border border-green-100 rounded-3xl p-5">
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-semibold text-green-700">Available on Instagram</span>
                </div>
                <p className="text-sm text-green-800">
                  Send us a DM for <strong>quick responses</strong>
                </p>
              </div>

              <div className="bg-card border border-border rounded-3xl p-5">
                <h4 className="font-semibold text-foreground text-sm mb-3">Why Choose D Tax Rail?</h4>
                <div className="space-y-3">
                  {[
                    { icon: Shield, label: "Secure & Trusted" },
                    { icon: UserCheck, label: "CA Assisted" },
                    { icon: Zap, label: "Fast Processing" },
                    { icon: Award, label: "Expert Guidance" },
                  ].map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-foreground"
                    >
                      <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3" style={display}>Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about filing with D Tax Rail</p>
          </div>

          <div className="space-y-3">
            {faqs.map(({ q, a }, idx) => (
              <div key={idx} className="border border-border rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-muted/50 transition-colors"
                >
                  <span className="font-medium text-foreground text-sm">{q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 ml-4 transition-transform duration-200 ${openFaq === idx ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-5 pt-4 text-sm text-muted-foreground leading-relaxed border-t border-border">
                    {a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Future Expansion Page ─────────────────────────────────────────────────────

function FutureExpansionPage({ setPage }: { setPage: (p: Page) => void }) {
  const [expanded, setExpanded] = useState<number | null>(null);

  const categories = [
    {
      num: "01",
      icon: TrendingUp,
      title: "Tax Planning",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      accentColor: "border-blue-400",
      badgeColor: "bg-blue-100 text-blue-700",
      domestic: [
        "Tax Structuring & Planning",
        "Expert Opinions on intricate tax issues",
        "TDS Health Check",
      ],
      international: [
        "Tax Structuring & Planning for cross-border transactions",
        "Tax Planning based on Double Taxation Avoidance Agreements (DTAA)",
        "Global Income Tax advisory",
      ],
    },
    {
      num: "02",
      icon: FileText,
      title: "Tax Compliance",
      iconBg: "bg-violet-50",
      iconColor: "text-violet-600",
      accentColor: "border-violet-400",
      badgeColor: "bg-violet-100 text-violet-700",
      domestic: [
        "Preparation & Filing of Quarterly TDS/TCS Returns",
        "Advance Tax Calculations",
        "Form 15CA & 15CB for Non-Resident Remittances",
        "Form 29B (MAT Computation)",
        "Form 29C (AMT Computation)",
      ],
      international: [
        "PAN Assistance",
        "Return Filing Support",
        "FRRO (Foreign Regional Registration Office) compliance",
        "Tax Computation for expatriates",
        "Repatriation of money with 15CB certification",
      ],
    },
    {
      num: "03",
      icon: Scale,
      title: "Tax Policy & Controversy",
      iconBg: "bg-rose-50",
      iconColor: "text-rose-600",
      accentColor: "border-rose-400",
      badgeColor: "bg-rose-100 text-rose-700",
      domestic: [
        "Representation before Income Tax Officer",
        "Representation before Commissioner & ITAT (Income Tax Appellate Tribunal)",
        "Handling Income Tax Assessment Orders",
      ],
      international: [
        "Representation before tax authorities abroad",
        "Assistance in Income Tax Refunds",
        "Advisory on cross-border disputes",
      ],
    },
    {
      num: "04",
      icon: Building2,
      title: "Business Setup & Private Tax Services",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      accentColor: "border-amber-400",
      badgeColor: "bg-amber-100 text-amber-700",
      domestic: [
        "Business Setup & Entry Strategy",
        "Location Study & Project Management",
        "Regulatory Approvals & Startup Support",
        "Secretarial Support",
        "Lower Withholding Tax (WHT) Certificate assistance",
        "TDS Certificate & Exemption Certificates (12AB, Form 10F)",
        "Tax Residency Certificate support",
        "LLP Setup & Conversion Strategies",
      ],
      international: [
        "POEM (Place of Effective Management) analysis for foreign companies",
        "BEPS (Base Erosion & Profit Shifting) impact review",
        "Permanent Establishment (PE) exposure guidance",
        "Repatriation strategies",
        "Tax credits for foreign nationals (Form 67)",
        "Treaty impact analysis under MLI (Multilateral Instrument)",
      ],
    },
    {
      num: "05",
      icon: BarChart3,
      title: "Transfer Pricing",
      iconBg: "bg-teal-50",
      iconColor: "text-teal-600",
      accentColor: "border-teal-400",
      badgeColor: "bg-teal-100 text-teal-700",
      domestic: [
        "Strategies for global tax efficiency",
        "Compliance with Indian & international regulations",
        "Policy development and controversy management",
      ],
      international: [
        "Cross-border transaction pricing advisory",
        "Benchmarking studies and documentation",
        "Advance Pricing Agreements (APA) support",
      ],
    },
  ];

  const highlights = [
    { icon: Globe, label: "Cross-Border Expertise", desc: "DTAA-informed advisory across 90+ treaty jurisdictions" },
    { icon: Shield, label: "Dispute Resolution", desc: "Representation from ITO level through ITAT appeals" },
    { icon: Briefcase, label: "Business Structuring", desc: "Entry strategies and regulatory approvals for new ventures" },
    { icon: MapPin, label: "Expat Tax Services", desc: "FRRO compliance, Form 67, and repatriation support" },
  ];

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-[#0C1B33] py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-indigo-900/20 opacity-60 animate-pulse" style={{ animationDuration: "10s" }} />
        <SectionParticles />
        {/* Decorative grid lines */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-6" style={mono}>
            <Rocket className="w-3.5 h-3.5" />
            FUTURE EXPANSION SERVICES
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-[1.1]" style={display}>
            Premium Tax Services<br />
            <span className="text-blue-400">Coming Soon</span>
          </h1>
          <p className="text-blue-100/75 text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            D Tax Rail is expanding into advanced domestic and international tax advisory — from Transfer Pricing and BEPS to DTAA-driven planning and cross-border dispute resolution.
          </p>
          <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-400/30 text-amber-300 text-sm font-medium px-5 py-2.5 rounded-full" style={mono}>
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse inline-block" />
            These services are in active development — stay tuned
          </div>
        </div>
      </section>

      {/* Highlights row */}
      <section className="bg-white border-b border-border py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {highlights.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex gap-4 items-start p-4 rounded-2xl hover:bg-muted transition-colors">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm mb-0.5" style={display}>{label}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service categories */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-block bg-secondary text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4" style={mono}>
              5 SERVICE DOMAINS
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" style={display}>
              Comprehensive tax coverage, globally
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Each domain covers both domestic Indian tax obligations and cross-border international requirements — managed by specialist CAs and tax advisors.
            </p>
          </div>

          <div className="space-y-5">
            {categories.map(({ num, icon: Icon, title, iconBg, iconColor, accentColor, badgeColor, domestic, international }, idx) => {
              const isOpen = expanded === idx;
              return (
                <div
                  key={num}
                  className={`bg-card border-2 rounded-3xl overflow-hidden transition-all duration-300 ${isOpen ? accentColor : "border-border"}`}
                >
                  {/* Card header */}
                  <button
                    onClick={() => setExpanded(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between px-7 py-6 text-left hover:bg-muted/40 transition-colors"
                  >
                    <div className="flex items-center gap-5">
                      <div className="font-extrabold text-3xl text-muted-foreground/20 leading-none w-10 text-right flex-shrink-0" style={mono}>{num}</div>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
                        <Icon className={`w-6 h-6 ${iconColor}`} />
                      </div>
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-bold text-foreground text-lg" style={display}>{title}</h3>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeColor}`} style={mono}>Coming Soon</span>
                      </div>
                    </div>
                    <div className={`w-8 h-8 rounded-full border border-border flex items-center justify-center flex-shrink-0 ml-4 transition-transform duration-300 ${isOpen ? "rotate-180 bg-muted" : ""}`}>
                      <ChevronDown className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </button>

                  {/* Expanded body */}
                  {isOpen && (
                    <div className="border-t border-border px-7 py-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Domestic */}
                        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                          <div className="flex items-center gap-2 mb-4">
                            <MapPin className="w-4 h-4 text-blue-600 flex-shrink-0" />
                            <span className="font-semibold text-blue-800 text-sm" style={display}>Domestic</span>
                          </div>
                          <ul className="space-y-2.5">
                            {domestic.map((item) => (
                              <li key={item} className="flex items-start gap-2.5 text-sm text-blue-900/80">
                                <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                <span className="leading-snug">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* International */}
                        <div className="bg-[#0C1B33] rounded-2xl p-5">
                          <div className="flex items-center gap-2 mb-4">
                            <Globe className="w-4 h-4 text-blue-400 flex-shrink-0" />
                            <span className="font-semibold text-blue-200 text-sm" style={display}>International</span>
                          </div>
                          <ul className="space-y-2.5">
                            {international.map((item) => (
                              <li key={item} className="flex items-start gap-2.5 text-sm text-blue-100/75">
                                <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                                <span className="leading-snug">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why it matters section */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-secondary text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6" style={mono}>
                WHY THESE SERVICES MATTER
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-6" style={display}>
                Tax complexity demands specialist expertise
              </h2>
              <div className="space-y-5">
                {[
                  { title: "DTAA & Cross-border Planning", desc: "India has treaties with 90+ countries. Strategic use of DTAAs can significantly reduce effective tax rates on global income." },
                  { title: "BEPS & Compliance Risk", desc: "Multinational businesses face increasing scrutiny under BEPS Action Plans. Proactive compliance protects against costly adjustments." },
                  { title: "Transfer Pricing Disputes", desc: "India is among the top jurisdictions globally for TP audits. Expert benchmarking and documentation reduces litigation risk." },
                  { title: "Expat & NRI Tax Management", desc: "Foreign nationals and NRIs face unique compliance obligations — FRRO, Form 67, POEM, and repatriation all require specialist navigation." },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm mb-0.5">{title}</div>
                      <div className="text-sm text-muted-foreground leading-relaxed">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0C1B33] to-[#1A2E50] rounded-3xl p-8">
              <div className="text-center mb-8">
                <Rocket className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                <h3 className="font-bold text-white text-xl mb-2" style={display}>Launching Soon</h3>
                <p className="text-blue-100/65 text-sm leading-relaxed">
                  Be among the first to access our advanced tax services when they launch
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: "Service Domains", value: "5" },
                  { label: "Countries Covered", value: "90+" },
                  { label: "Specialist CAs", value: "15+" },
                  { label: "Treaty Networks", value: "DTAA" },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-white/8 border border-white/10 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-extrabold text-white mb-0.5" style={display}>{value}</div>
                    <div className="text-xs text-blue-300" style={mono}>{label}</div>
                  </div>
                ))}
              </div>
              <a
                href="https://www.instagram.com/dtaxrail?igsh=Z2p4aGVhcHYxYnd5"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#1A56DB] text-white font-semibold py-3.5 rounded-xl hover:bg-blue-500 transition-colors text-sm flex items-center justify-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                Follow for Launch Updates
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-3" style={display}>Interested in these services?</h2>
          <p className="text-blue-100/75 mb-8">
            Reach out via Instagram to register your interest and get early access when we launch.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.instagram.com/dtaxrail?igsh=Z2p4aGVhcHYxYnd5"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-primary font-semibold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors flex items-center gap-2"
            >
              <Instagram className="w-5 h-5" />
              DM us on Instagram
            </a>
            <button
              onClick={() => setPage("contact")}
              className="bg-white/10 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors flex items-center gap-2"
            >
              Contact Us <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────

function Footer({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <footer className="bg-[#080F1E] text-blue-200/60">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-[#1A56DB] rounded-xl flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-white text-lg" style={display}>D Tax Rail</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              India's modern digital tax filing platform — secure, expert-assisted, and built for everyone.
            </p>
            <p className="text-xs text-blue-300 mb-3 font-semibold tracking-wide" style={mono}>
              Simple · Smart · Secure Tax Solutions
            </p>
            <div className="flex gap-2">
              <span className="bg-white/8 text-xs px-2 py-1 rounded" style={mono}>256-bit SSL</span>
              <span className="bg-white/8 text-xs px-2 py-1 rounded" style={mono}>CA Assisted</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              {["ITR Filing", "Refund Tracking", "Document Management", "Tax Calculator", "Compliance Alerts"].map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Company</h4>
            <ul className="space-y-2.5 text-sm">
              {([
                { id: "about", label: "About" },
                { id: "services", label: "Services" },
                { id: "future", label: "Future Services" },
                { id: "contact", label: "Contact Us" },
              ] as { id: Page; label: string }[]).map(({ id, label }) => (
                <li key={id}>
                  <button onClick={() => setPage(id)} className="hover:text-white transition-colors">
                    {label}
                  </button>
                </li>
              ))}
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4 text-sm">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                <a href="mailto:support@dtaxrail.in" className="hover:text-white transition-colors">support@dtaxrail.in</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                <a href="tel:8187882772" className="hover:text-white transition-colors">8187882772</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span>49-107, Manda Street, Bobbili,<br />Vizianagaram, AP — 535558</span>
              </li>
              <li className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 flex-shrink-0" />Mon–Sat, 9AM–8PM IST</li>
              <li>
                <a
                  href="https://www.instagram.com/dtaxrail?igsh=Z2p4aGVhcHYxYnd5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5 flex-shrink-0" />
                  @dtaxrail
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs" style={mono}>© 2025 D Tax Rail · Simple, Smart, Secure Tax Solutions · All rights reserved.</p>
          <p className="text-xs">Not a tax authority. For official matters, visit{" "}
            <span className="text-blue-400">incometax.gov.in</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Scroll to Top Button ──────────────────────────────────────────────────────

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <ChevronUp className="w-5 h-5" />
    </button>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");

  const setPageAndScroll = (p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <GlobalAnimations />
      <FloatingIcons />
      <Navbar page={page} setPage={setPageAndScroll} />
      <main className="flex-1 relative z-10">
        {page === "home" && <HomePage setPage={setPageAndScroll} />}
        {page === "about" && <AboutPage setPage={setPageAndScroll} />}
        {page === "services" && <ServicesPage setPage={setPageAndScroll} />}
        {page === "future" && <FutureExpansionPage setPage={setPageAndScroll} />}
        {page === "contact" && <ContactPage />}
      </main>
      <Footer setPage={setPageAndScroll} />
      <ScrollToTop />
    </div>
  );
}
