export function GlobalAnimations() {
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
