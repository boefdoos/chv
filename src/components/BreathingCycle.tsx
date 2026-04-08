import { useState, useEffect } from 'react';

const steps = [
  { id: 'inhale', title: 'Inademen', desc: 'Zuurstof naar longen en bloed', color: '#d0e6f2', stroke: '#4A7BA0' },
  { id: 'process', title: 'Verbranding', desc: 'Cellen gebruiken O₂, maken CO₂', color: '#fef3c7', stroke: '#A0785A' },
  { id: 'exhale', title: 'Uitademen', desc: 'CO₂ verlaat je lichaam', color: '#d1fae5', stroke: '#4A7C6F' },
];

function InhaleIcon({ x, y, stroke }: { x: number; y: number; stroke: string }) {
  return <path d={`M${x} ${y + 7}V${y - 7}m0 0l-4 4m4-4l4 4`} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />;
}

function ProcessIcon({ x, y, stroke }: { x: number; y: number; stroke: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r="6" fill="none" stroke={stroke} strokeWidth="1.5" />
      <path d={`M${x} ${y - 4}v4l2 2`} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
    </g>
  );
}

function ExhaleIcon({ x, y, stroke }: { x: number; y: number; stroke: string }) {
  return <path d={`M${x} ${y - 7}v14m0 0l-4-4m4 4l4-4`} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />;
}

const icons = [InhaleIcon, ProcessIcon, ExhaleIcon];

export default function BreathingCycle() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const interval = setInterval(() => setActive(p => (p + 1) % 3), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Desktop: horizontal */}
      <div className="hidden md:block" style={{ maxWidth: '520px', margin: '0 auto' }}>
        <svg viewBox="0 0 520 120" width="100%" xmlns="http://www.w3.org/2000/svg">
          {steps.map((step, i) => {
            const cx = 87 + i * 173;
            const cy = 36;
            const isActive = active === i;
            const Icon = icons[i];

            return (
              <g key={step.id}>
                <circle cx={cx} cy={cy} r={isActive ? 32 : 28} fill={step.color}
                  style={{ transition: 'all 0.3s ease' }} />
                <Icon x={cx} y={cy} stroke={step.stroke} />
                <text x={cx} y={82} textAnchor="middle"
                  style={{ fontSize: '13px', fontWeight: 600, fill: '#5a4a3a' }}>
                  {step.title}
                </text>
                <text x={cx} y={100} textAnchor="middle"
                  style={{ fontSize: '10.5px', fill: '#8a7a6a' }}>
                  {step.desc}
                </text>
                {i < 2 && (
                  <g>
                    <line x1={cx + 36} y1={cy} x2={cx + 137} y2={cy}
                      stroke="#c9b99a" strokeWidth="1.2" />
                    <path d={`M${cx + 132} ${cy - 4}L${cx + 138} ${cy}L${cx + 132} ${cy + 4}`}
                      fill="none" stroke="#c9b99a" strokeWidth="1.2"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Mobile: vertical */}
      <div className="md:hidden">
        <div className="flex flex-col">
          {steps.map((step, i) => {
            const isActive = active === i;
            return (
              <div key={step.id}>
                <div className="flex items-center gap-4">
                  {/* Fixed-width circle column so connector stays aligned */}
                  <div className="shrink-0 flex items-center justify-center" style={{ width: 52 }}>
                    <div
                      className="rounded-full flex items-center justify-center"
                      style={{
                        width: isActive ? 52 : 46,
                        height: isActive ? 52 : 46,
                        backgroundColor: step.color,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        {i === 0 && <path d="M12 19V5m0 0l-5 5m5-5l5 5" fill="none" stroke={step.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />}
                        {i === 1 && <><circle cx="12" cy="12" r="6" fill="none" stroke={step.stroke} strokeWidth="1.5" /><path d="M12 8v4l2 2" fill="none" stroke={step.stroke} strokeWidth="1.5" strokeLinecap="round" /></>}
                        {i === 2 && <path d="M12 5v14m0 0l-5-5m5 5l5-5" fill="none" stroke={step.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />}
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div className="text-[15px] font-medium text-sand-700">{step.title}</div>
                    <div className="text-[13px] text-sand-500">{step.desc}</div>
                  </div>
                </div>
                {i < 2 && (
                  <div style={{ width: 52, display: 'flex', justifyContent: 'center', padding: '2px 0' }}>
                    <svg width="6" height="20" viewBox="0 0 6 20">
                      <line x1="3" y1="0" x2="3" y2="14" stroke="#c9b99a" strokeWidth="1.2" />
                      <path d="M1 12L3 16L5 12" fill="none" stroke="#c9b99a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
