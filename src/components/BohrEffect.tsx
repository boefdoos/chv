import { useState, useEffect } from 'react';

export default function BohrEffect() {
  const [state, setState] = useState<'normaal' | 'laag'>('normaal');
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(false);
    const t = setTimeout(() => setAnimated(true), 50);
    return () => clearTimeout(t);
  }, [state]);

  const isLaag = state === 'laag';

  // O2-bolletjes: 6 stuks, sommige worden afgeleverd bij normaal CO2
  const molecules = [0, 1, 2, 3, 4, 5];

  return (
    <div className="py-4">
      {/* Toggle */}
      <div className="flex gap-2 justify-center mb-8">
        {(['normaal', 'laag'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setState(s)}
            className={`px-5 py-2 rounded-full text-[13px] border transition-all cursor-pointer ${
              state === s
                ? s === 'normaal'
                  ? 'bg-sage-300 text-white border-sage-300'
                  : 'bg-terra-300 text-white border-terra-300'
                : 'bg-sand-50 text-sand-600 border-sand-300 hover:border-sage-300 hover:text-sage-300 hover:-translate-y-px'
            }`}
          >
            {s === 'normaal' ? 'Normaal CO2' : 'Te weinig CO2'}
          </button>
        ))}
      </div>

      {/* Scene */}
      <div className="relative w-full max-w-[480px] mx-auto select-none">
        <svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" className="w-full">

          {/* ── BLOEDBAAN (links) ── */}
          <rect x="0" y="80" width="480" height="40" rx="20" fill="#f0ddd6" />
          <text x="20" y="97" fontSize="10" fill="#a07060" fontFamily="inherit">bloed</text>

          {/* ── WEEFSEL (rechts, boven) ── */}
          <rect x="320" y="10" width="145" height="55" rx="10" fill={isLaag ? '#f5f0eb' : '#eef4f0'} style={{ transition: 'fill 0.5s' }} />
          <text x="392" y="32" fontSize="10" fill={isLaag ? '#b0a090' : '#7aaa8a'} textAnchor="middle" fontFamily="inherit">weefsel / cel</text>
          <text x="392" y="50" fontSize="9" fill={isLaag ? '#c0b0a0' : '#7aaa8a'} textAnchor="middle" fontFamily="inherit">
            {isLaag ? 'zuurstoftekort' : 'ontvangt O₂'}
          </text>

          {/* ── HEMOGLOBINE (vrachtwagen) ── */}
          <ellipse cx="160" cy="100" rx="54" ry="28" fill={isLaag ? '#d9736a' : '#c8856e'} style={{ transition: 'fill 0.4s' }} />
          <text x="160" y="97" fontSize="10" textAnchor="middle" fill="white" fontFamily="inherit" fontWeight="500">Hemo-</text>
          <text x="160" y="110" fontSize="10" textAnchor="middle" fill="white" fontFamily="inherit" fontWeight="500">globine</text>

          {/* ── CO2-label ── */}
          {!isLaag && (
            <g style={{ animation: animated ? 'fadeIn 0.4s ease both' : 'none' }}>
              <circle cx="160" cy="140" r="14" fill="#e8d5c4" />
              <text x="160" y="144" fontSize="9" textAnchor="middle" fill="#a07060" fontFamily="inherit" fontWeight="600">CO₂</text>
            </g>
          )}
          {isLaag && (
            <g style={{ animation: animated ? 'fadeIn 0.4s ease both' : 'none' }}>
              <circle cx="160" cy="140" r="14" fill="#e8e0d8" opacity="0.4" />
              <text x="160" y="144" fontSize="9" textAnchor="middle" fill="#b0a090" fontFamily="inherit">CO₂?</text>
            </g>
          )}

          {/* ── LAAДДEUR / slot ── */}
          {/* verbindingslijn van hemoglobine naar weefsel */}
          <line x1="214" y1="85" x2="320" y2="45" stroke={isLaag ? '#e0cfc8' : '#9ecaaa'} strokeWidth="1.5" strokeDasharray={isLaag ? '4 3' : '0'} style={{ transition: 'stroke 0.5s' }} />

          {/* deur-icoon */}
          <g transform="translate(258, 58)">
            <rect x="-10" y="-10" width="20" height="20" rx="4"
              fill={isLaag ? '#f0e8e4' : '#dceee2'}
              stroke={isLaag ? '#d0b8b0' : '#7aaa8a'}
              strokeWidth="1.5"
              style={{ transition: 'fill 0.4s, stroke 0.4s' }}
            />
            {/* slot-symbool als gesloten / open */}
            {isLaag ? (
              <g>
                <rect x="-4" y="-1" width="8" height="6" rx="1" fill="#d0b8b0" />
                <path d="M-2 -1 Q0 -5 2 -1" stroke="#d0b8b0" strokeWidth="1.5" fill="none" />
              </g>
            ) : (
              <g>
                <rect x="-4" y="-1" width="8" height="6" rx="1" fill="#7aaa8a" />
                <path d="M-2 -1 Q2 -6 4 -3" stroke="#7aaa8a" strokeWidth="1.5" fill="none" />
              </g>
            )}
          </g>

          {/* ── O2-MOLECULEN ── */}
          {molecules.map((i) => {
            // bij normaal: 3 bolletjes vliegen naar weefsel, 3 blijven op Hb
            const delivered = !isLaag && i < 3;
            const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
            const baseX = 160 + Math.cos(angle) * 36;
            const baseY = 100 + Math.sin(angle) * 18;
            const targetX = 330 + (i % 3) * 20;
            const targetY = 28 + (i < 3 ? 0 : 14);

            return (
              <circle
                key={i}
                r="7"
                fill="#6baed6"
                opacity={delivered ? 0.9 : 0.85}
                style={{
                  cx: delivered ? targetX : baseX,
                  cy: delivered ? targetY : baseY,
                  transition: `cx 0.6s cubic-bezier(0.34,1.2,0.64,1) ${i * 60}ms, cy 0.6s cubic-bezier(0.34,1.2,0.64,1) ${i * 60}ms`,
                }}
              >
                <title>O₂</title>
              </circle>
            );
          })}

          {/* O2-labels op de bolletjes */}
          {molecules.map((i) => {
            const delivered = !isLaag && i < 3;
            const angle = (i / 6) * Math.PI * 2 - Math.PI / 2;
            const baseX = 160 + Math.cos(angle) * 36;
            const baseY = 100 + Math.sin(angle) * 18;
            const targetX = 330 + (i % 3) * 20;
            const targetY = 28 + (i < 3 ? 0 : 14);
            return (
              <text
                key={`lbl-${i}`}
                fontSize="7"
                textAnchor="middle"
                fill="white"
                fontFamily="inherit"
                fontWeight="600"
                style={{
                  x: delivered ? targetX : baseX,
                  y: (delivered ? targetY : baseY) + 2.5,
                  transition: `x 0.6s cubic-bezier(0.34,1.2,0.64,1) ${i * 60}ms, y 0.6s cubic-bezier(0.34,1.2,0.64,1) ${i * 60}ms`,
                }}
              >O₂</text>
            );
          })}

        </svg>
      </div>

      {/* Teksttoelichting */}
      <div
        key={state}
        className={`mt-4 rounded-xl px-5 py-4 text-[14px] leading-relaxed text-center max-w-[440px] mx-auto ${
          isLaag ? 'bg-terra-50 text-terra-400' : 'bg-sage-50 text-sage-500'
        }`}
        style={{ animation: 'fadeUp 0.4s ease both' }}
      >
        {isLaag
          ? 'Te weinig CO2 — hemoglobine houdt de zuurstof vast. Je saturatie is prima, maar je cellen krijgen te weinig.'
          : 'Genoeg CO2 aanwezig — hemoglobine laat de zuurstof los. Levering aan de cellen verloopt normaal.'}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
