import { useState, useEffect } from 'react';

const steps = [
  { id: 'inhale', title: 'Inademen', desc: 'Zuurstof gaat naar je longen en bloed', color: 'bg-blue-100', stroke: '#4A7BA0', dot: 'bg-blue-300' },
  { id: 'process', title: 'Verbranding', desc: 'Cellen gebruiken O2 en maken CO2', color: 'bg-amber-50', stroke: '#A0785A', dot: 'bg-amber-200' },
  { id: 'exhale', title: 'Uitademen', desc: 'CO2 verlaat je lichaam via de longen', color: 'bg-emerald-50', stroke: '#4A7C6F', dot: 'bg-emerald-200' },
];

const iconPaths: Record<string, string> = {
  inhale: 'M12 19V5m0 0l-5 5m5-5l5 5',
  process: '',
  exhale: 'M12 5v14m0 0l-5-5m5 5l5-5',
};

export default function BreathingCycle() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const interval = setInterval(() => setActive(p => (p + 1) % 3), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center gap-4 md:gap-6 py-5 flex-wrap md:flex-nowrap">
      {steps.map((step, i) => (
        <div key={step.id} className="contents">
          <div className="text-center flex-1 min-w-[110px]">
            <div className={`w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center relative transition-transform duration-300 ${step.color} ${active === i ? 'scale-110' : ''}`}>
              {step.id === 'process' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke={step.stroke} strokeWidth="1.5" className="w-7 h-7"><circle cx="12" cy="12" r="6" /><path d="M12 8v4l2 2" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke={step.stroke} strokeWidth="1.5" className="w-7 h-7"><path d={iconPaths[step.id]} /></svg>
              )}
              {active === i && <div className="absolute -inset-1.5 rounded-full border-[1.5px] border-dashed border-sand-300" style={{ animation: 'spin 8s linear infinite' }} />}
              {active === i && [0, 1, 2].map(p => (
                <div key={p} className={`absolute w-1.5 h-1.5 rounded-full ${step.dot}`}
                  style={{ top: `${18 + p * 8}px`, left: `${22 + p * 12}px`, animation: 'particleDrift 2.5s ease-in-out infinite', animationDelay: `${p * 0.4}s` }} />
              ))}
            </div>
            <div className="font-medium text-[14px] text-sand-700 mb-1">{step.title}</div>
            <div className="text-[12px] text-sand-500 leading-snug">{step.desc}</div>
          </div>
          {i < 2 && (
            <div className="flex-shrink-0 relative w-10 flex items-center justify-center md:rotate-0 rotate-90">
              <div className="w-7 h-[1.5px] bg-sand-300 relative">
                <div className="absolute right-0 -top-[3px] w-[7px] h-[7px] border-r-[1.5px] border-t-[1.5px] border-sand-300 rotate-45" />
              </div>
              <div className="absolute w-[5px] h-[5px] rounded-full top-1/2 -translate-y-1/2"
                style={{ background: i === 0 ? '#6aabcf' : '#C08B68', animation: 'travelDot 3s ease-in-out infinite', animationDelay: `${i}s` }} />
            </div>
          )}
        </div>
      ))}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes particleDrift { 0% { opacity:0; transform:translate(0,8px) scale(.5); } 30% { opacity:.8; transform:translate(0,-4px) scale(1); } 70% { opacity:.6; transform:translate(0,-14px) scale(.8); } 100% { opacity:0; transform:translate(0,-22px) scale(.4); } }
        @keyframes travelDot { 0% { left:0; opacity:0; } 15% { opacity:1; } 85% { opacity:1; } 100% { left:100%; opacity:0; } }
      `}</style>
    </div>
  );
}
