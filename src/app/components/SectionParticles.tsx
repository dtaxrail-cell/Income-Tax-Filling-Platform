import {
  IndianRupee, Percent, BarChart3, Calculator, Shield,
  Landmark, TrendingUp, CircleDollarSign, ShoppingBag,
  ShoppingCart, Tag, Coins, Gift
} from "lucide-react";

export function SectionParticles() {
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
