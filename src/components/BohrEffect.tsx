import { useState } from 'react';

const CLR_O2   = '#6baed6';
const CLR_CO2  = '#c4724a';
const CLR_HB   = '#b97060';
const CLR_VEIN = '#f0ddd6';

export default function BohrEffect() {
  const [state, setState] = useState<'normaal' | 'laag'>('normaal');
  const isLaag = state === 'laag';

  return (
    <div className="py-2">
      <div className="flex gap-2 justify-center mb-6">
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
            {s === 'normaal' ? 'Normaal CO₂' : 'Te weinig CO₂'}
          </button>
        ))}
      </div>

      <svg
        viewBox="0 0 500 255"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[520px] mx-auto block"
        style={{ fontFamily: 'inherit' }}
      >
        {/* Bloedvat */}
        <rect x="0" y="124" width="500" height="62" rx="31" fill={CLR_VEIN} />
        <text x="18" y="160" fontSize="13" fill="#a07060">bloed</text>

        {/* Hemoglobine */}
        <ellipse cx="148" cy="155" rx="60" ry="26" fill={CLR_HB} />
        <text x="148" y="150" fontSize="13" textAnchor="middle" fill="white" fontWeight="600">Hemo-</text>
        <text x="148" y="166" fontSize="13" textAnchor="middle" fill="white" fontWeight="600">globine</text>

        {/* O2-bolletjes boven Hb — verdwijnen bij normaal (gaan naar weefsel) */}
        {[{ x: 104, y: 130 }, { x: 148, y: 122 }, { x: 192, y: 130 }].map((p, i) => (
          <g key={`o2top-${i}`}
            style={{ opacity: !isLaag ? 0 : 1, transition: `opacity 0.4s ease ${i * 60}ms` }}>
            <circle cx={p.x} cy={p.y} r="11" fill={CLR_O2} />
            <text x={p.x} y={p.y + 4} fontSize="9" textAnchor="middle" fill="white" fontWeight="700">O₂</text>
          </g>
        ))}

        {/* O2-bolletjes onder Hb — altijd zichtbaar */}
        {[{ x: 104, y: 180 }, { x: 148, y: 188 }, { x: 192, y: 180 }].map((p, i) => (
          <g key={`o2bot-${i}`}>
            <circle cx={p.x} cy={p.y} r="11" fill={CLR_O2} />
            <text x={p.x} y={p.y + 4} fontSize="9" textAnchor="middle" fill="white" fontWeight="700">O₂</text>
          </g>
        ))}

        {/* CO2-bolletjes in bloed */}
        {[{ x: 54, y: 148 }, { x: 70, y: 165 }, { x: 46, y: 168 }].map((p, i) => (
          <g key={`co2-${i}`}
            style={{ opacity: isLaag ? 0.15 : 1, transition: `opacity 0.5s ease ${i * 80}ms` }}>
            <circle cx={p.x} cy={p.y} r="12" fill={CLR_CO2} />
            <text x={p.x} y={p.y + 4} fontSize="9" textAnchor="middle" fill="white" fontWeight="700">CO₂</text>
          </g>
        ))}

        {/* Verbindingslijn */}
        <line x1="210" y1="140" x2="320" y2="100"
          stroke={isLaag ? '#ddd0c8' : '#9ecaaa'} strokeWidth="1.5"
          strokeDasharray={isLaag ? '5 4' : '0'}
          style={{ transition: 'stroke 0.5s' }}
        />

        {/* Slot */}
        <g transform="translate(255, 100)">
          <rect x="-15" y="-15" width="30" height="30" rx="7"
            fill={isLaag ? '#f0e8e4' : '#dceee2'}
            stroke={isLaag ? '#c8a8a0' : '#7aaa8a'}
            strokeWidth="2"
            style={{ transition: 'fill 0.4s, stroke 0.4s' }}
          />
          <rect x="-6" y="-1" width="12" height="9" rx="2"
            fill={isLaag ? '#c8a8a0' : '#7aaa8a'}
            style={{ transition: 'fill 0.4s' }}
          />
          {isLaag
            ? <path d="M-3.5 -1 Q-3.5 -9 0 -9 Q3.5 -9 3.5 -1" stroke="#c8a8a0" strokeWidth="2.5" fill="none" />
            : <path d="M0 -1 Q0 -9 4 -9 Q8 -9 8 -4.5" stroke="#7aaa8a" strokeWidth="2.5" fill="none" />
          }
        </g>

        {/* Weefsel-blok */}
        <rect x="322" y="4" width="168" height="108" rx="10"
          fill={isLaag ? '#f5f0eb' : '#eef4f0'}
          stroke={isLaag ? '#d8cfc8' : '#b0d8bc'}
          strokeWidth="1.5"
          style={{ transition: 'fill 0.5s, stroke 0.5s' }}
        />
        <text x="406" y="30" fontSize="13" textAnchor="middle"
          fill={isLaag ? '#b0a090' : '#5a9870'} fontWeight="600"
          style={{ transition: 'fill 0.4s' }}>weefsel / cel</text>
        <text x="406" y="50" fontSize="12" textAnchor="middle"
          fill={isLaag ? '#c0b0a0' : '#7aaa8a'}
          style={{ transition: 'fill 0.4s' }}>
          {isLaag ? 'zuurstoftekort' : 'ontvangt O₂'}
        </text>
        <line x1="336" y1="60" x2="476" y2="60"
          stroke={isLaag ? '#e0d8d0' : '#c0dcc8'} strokeWidth="1"
          style={{ transition: 'stroke 0.4s' }}
        />

        {/* O2 in weefsel */}
        {[{ x: 358, y: 85 }, { x: 406, y: 85 }, { x: 454, y: 85 }].map((p, i) => (
          <g key={`o2weefsel-${i}`}
            style={{ opacity: isLaag ? 0 : 1, transition: `opacity 0.45s ease ${i * 80}ms` }}>
            <circle cx={p.x} cy={p.y} r="11" fill={CLR_O2} />
            <text x={p.x} y={p.y + 4} fontSize="9" textAnchor="middle" fill="white" fontWeight="700">O₂</text>
          </g>
        ))}
        {[{ x: 358, y: 85 }, { x: 406, y: 85 }, { x: 454, y: 85 }].map((p, i) => (
          <g key={`o2weefsel-empty-${i}`}
            style={{ opacity: isLaag ? 1 : 0, transition: `opacity 0.35s ease ${i * 60}ms` }}>
            <circle cx={p.x} cy={p.y} r="11" fill="none" stroke="#d8cfc8" strokeWidth="1.5" strokeDasharray="3 2" />
          </g>
        ))}

        {/* Legende */}
        <circle cx="14" cy="240" r="8" fill={CLR_O2} />
        <text x="28" y="245" fontSize="12" fill="#8a9a90">zuurstof (O₂)</text>
        <circle cx="160" cy="240" r="8" fill={CLR_CO2} />
        <text x="174" y="245" fontSize="12" fill="#8a9a90">koolstofdioxide (CO₂)</text>
      </svg>

      <div
        key={state}
        className={`mt-3 rounded-xl px-5 py-4 text-[14px] leading-relaxed text-center max-w-[460px] mx-auto ${
          isLaag ? 'bg-terra-50 text-terra-400' : 'bg-sage-50 text-sage-500'
        }`}
        style={{ animation: 'bohrFade 0.35s ease both' }}
      >
        {isLaag
          ? 'Te weinig CO₂: hemoglobine houdt de zuurstof vast. Je saturatie ziet er goed uit, maar je cellen krijgen te weinig.'
          : 'Genoeg CO₂ aanwezig: hemoglobine laat de zuurstof los. Levering aan de cellen verloopt normaal.'}
      </div>

      <style>{`
        @keyframes bohrFade {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
