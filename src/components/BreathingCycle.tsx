import { useState, useEffect } from 'react';

const steps = [
  { id: 'inhale', title: 'Inademen', desc: 'Zuurstof gaat naar je longen en bloed', color: '#d0e6f2', stroke: '#4A7BA0', iconD: 'M12 19V5m0 0l-5 5m5-5l5 5' },
  { id: 'process', title: 'Verbranding', desc: 'Cellen gebruiken O₂ en maken CO₂', color: '#fef3c7', stroke: '#A0785A', iconD: '' },
  { id: 'exhale', title: 'Uitademen', desc: 'CO₂ verlaat je lichaam via de longen', color: '#d1fae5', stroke: '#4A7C6F', iconD: 'M12 5v14m0 0l-5-5m5 5l5-5' },
];

export default function BreathingCycle() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const interval = setInterval(() => setActive(p => (p + 1) % 3), 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto' }}>
      <svg viewBox="0 0 480 130" width="100%" xmlns="http://www.w3.org/2000/svg">
        {steps.map((step, i) => {
          const cx = 80 + i * 160;
          const cy = 42;
          const isActive = active === i;

          return (
            <g key={step.id}>
              {/* Circle */}
              <circle cx={cx} cy={cy} r={isActive ? 34 : 30} fill={step.color}
                style={{ transition: 'r 0.3s ease' }} />
              {isActive && (
                <circle cx={cx} cy={cy} r="38" fill="none" stroke="#c9b99a" strokeWidth="1"
                  strokeDasharray="4 4" style={{ animation: 'spin 8s linear infinite' }} />
              )}

              {/* Icon */}
              {step.id === 'process' ? (
                <g transform={`translate(${cx - 10}, ${cy - 10})`}>
                  <circle cx="10" cy="10" r="6" fill="none" stroke={step.stroke} strokeWidth="1.5" />
                  <path d="M10 6v4l2 2" fill="none" stroke={step.stroke} strokeWidth="1.5" strokeLinecap="round" />
                </g>
              ) : (
                <path d={step.iconD} fill="none" stroke={step.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  transform={`translate(${cx - 12}, ${cy - 12}) scale(1)`} />
              )}

              {/* Label */}
              <text x={cx} y={cy + 50} textAnchor="middle" style={{ fontSize: '13px', fontWeight: 500, fill: '#5a4a3a' }}>
                {step.title}
              </text>
              <text x={cx} y={cy + 66} textAnchor="middle" style={{ fontSize: '10px', fill: '#8a7a6a' }}>
                {step.desc}
              </text>

              {/* Arrow to next */}
              {i < 2 && (
                <g>
                  <line x1={cx + 38} y1={cy} x2={cx + 122} y2={cy} stroke="#c9b99a" strokeWidth="1.2" />
                  <path d={`M${cx + 117} ${cy - 4} L${cx + 123} ${cy} L${cx + 117} ${cy + 4}`}
                    fill="none" stroke="#c9b99a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              )}
            </g>
          );
        })}
      </svg>
      <style>{`
        @keyframes spin { to { transform-origin: center; transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
