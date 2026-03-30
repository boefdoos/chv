import { useState } from 'react';

// Kleurenpalet afgestemd op de site
const CLR_O2   = '#6baed6';  // blauw
const CLR_CO2  = '#c4724a';  // oranje-terra
const CLR_HB   = '#b97060';  // hemoglobine rood-bruin
const CLR_VEIN = '#f0ddd6';  // bloedvat achtergrond

export default function BohrEffect() {
  const [state, setState] = useState<'normaal' | 'laag'>('normaal');
  const isLaag = state === 'laag';

  return (
    <div className="py-2">

      {/* Toggle */}
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

      {/* SVG — viewBox ruimer en alles zorgvuldig gesegmenteerd */}
      <svg
        viewBox="0 0 500 240"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[520px] mx-auto block"
        style={{ fontFamily: 'inherit' }}
      >
        {/* ════════════════════════════════
            BLOEDVAT (horizontale balk)
            y=130 tot y=175
        ════════════════════════════════ */}
        <rect x="0" y="124" width="500" height="62" rx="31" fill={CLR_VEIN} />
        <text x="18" y="158" fontSize="10" fill="#a07060">bloed</text>

        {/* ════════════════════════════════
            HEMOGLOBINE ELLIPS
            gecentreerd in bloedvat: cy=155
        ════════════════════════════════ */}
        <ellipse cx="148" cy="155" rx="60" ry="26" fill={CLR_HB} />
        <text x="148" y="151" fontSize="10.5" textAnchor="middle" fill="white" fontWeight="600">Hemo-</text>
        <text x="148" y="165" fontSize="10.5" textAnchor="middle" fill="white" fontWeight="600">globine</text>

        {/* ════════════════════════════════
            O2-BOLLETJES OP HEMOGLOBINE
            6 stuks rondom de ellips,
            duidelijk buiten de tekst
        ════════════════════════════════ */}
        {/* Bovenste rij: 3 bolletjes */}
        {[{ x: 104, y: 130 }, { x: 148, y: 122 }, { x: 192, y: 130 }].map((p, i) => (
          <g key={`o2top-${i}`}
            style={{ opacity: (!isLaag && i < 3) ? 0 : 1, transition: `opacity 0.4s ease ${i * 60}ms` }}>
            <circle cx={p.x} cy={p.y} r="9" fill={CLR_O2} />
            <text x={p.x} y={p.y + 3.5} fontSize="7" textAnchor="middle" fill="white" fontWeight="700">O₂</text>
          </g>
        ))}
        {/* Onderste rij: 3 bolletjes — altijd zichtbaar */}
        {[{ x: 104, y: 180 }, { x: 148, y: 188 }, { x: 192, y: 180 }].map((p, i) => (
          <g key={`o2bot-${i}`}>
            <circle cx={p.x} cy={p.y} r="9" fill={CLR_O2} />
            <text x={p.x} y={p.y + 3.5} fontSize="7" textAnchor="middle" fill="white" fontWeight="700">O₂</text>
          </g>
        ))}

        {/* ════════════════════════════════
            CO2-BOLLETJES IN BLOED
            links van Hb, vervaagd bij "laag"
        ════════════════════════════════ */}
        {[{ x: 54, y: 148 }, { x: 70, y: 165 }, { x: 46, y: 168 }].map((p, i) => (
          <g key={`co2-${i}`}
            style={{ opacity: isLaag ? 0.15 : 1, transition: `opacity 0.5s ease ${i * 80}ms` }}>
            <circle cx={p.x} cy={p.y} r="10" fill={CLR_CO2} />
            <text x={p.x} y={p.y + 3.5} fontSize="7" textAnchor="middle" fill="white" fontWeight="700">CO₂</text>
          </g>
        ))}

        {/* ════════════════════════════════
            VERBINDINGSLIJN Hb → weefsel
        ════════════════════════════════ */}
        <line
          x1="210" y1="140" x2="320" y2="100"
          stroke={isLaag ? '#ddd0c8' : '#9ecaaa'}
          strokeWidth="1.5"
          strokeDasharray={isLaag ? '5 4' : '0'}
          style={{ transition: 'stroke 0.5s, stroke-dasharray 0.3s' }}
        />

        {/* Slot */}
        <g transform="translate(258, 116)">
          <rect x="-11" y="-11" width="22" height="22" rx="5"
            fill={isLaag ? '#f0e8e4' : '#dceee2'}
            stroke={isLaag ? '#c8a8a0' : '#7aaa8a'}
            strokeWidth="1.5"
            style={{ transition: 'fill 0.4s, stroke 0.4s' }}
          />
          <rect x="-4.5" y="-1" width="9" height="7" rx="1.5"
            fill={isLaag ? '#c8a8a0' : '#7aaa8a'}
            style={{ transition: 'fill 0.4s' }}
          />
          {isLaag
            ? <path d="M-2.5 -1 Q-2.5 -7 0 -7 Q2.5 -7 2.5 -1" stroke="#c8a8a0" strokeWidth="2" fill="none" />
            : <path d="M0 -1 Q0 -7 3 -7 Q6 -7 6 -3.5" stroke="#7aaa8a" strokeWidth="2" fill="none" />
          }
        </g>

        {/* ════════════════════════════════
            WEEFSEL-BLOK
            y=20 tot y=118 — ruim en hoog
            Tekst bovenaan, O2-zone onderaan
        ════════════════════════════════ */}
        <rect x="322" y="4" width="164" height="100" rx="10"
          fill={isLaag ? '#f5f0eb' : '#eef4f0'}
          stroke={isLaag ? '#d8cfc8' : '#b0d8bc'}
          strokeWidth="1.5"
          style={{ transition: 'fill 0.5s, stroke 0.5s' }}
        />

        {/* Tekst boven in het blok */}
        <text x="404" y="28" fontSize="10.5" textAnchor="middle"
          fill={isLaag ? '#b0a090' : '#5a9870'} fontWeight="500"
          style={{ transition: 'fill 0.4s' }}>weefsel / cel</text>
        <text x="404" y="46" fontSize="10" textAnchor="middle"
          fill={isLaag ? '#c0b0a0' : '#7aaa8a'}
          style={{ transition: 'fill 0.4s' }}>
          {isLaag ? 'zuurstoftekort' : 'ontvangt O₂'}
        </text>

        {/* Scheidingslijn in blok */}
        <line x1="336" y1="56" x2="472" y2="56" stroke={isLaag ? '#e0d8d0' : '#c0dcc8'} strokeWidth="1" style={{ transition: 'stroke 0.4s' }} />

        {/* O2-zone in het blok — onderaan, aparte ruimte */}
        {/* 3 O2-bolletjes verschijnen hier bij normaal CO2 */}
        {[{ x: 360, y: 79 }, { x: 404, y: 79 }, { x: 448, y: 79 }].map((p, i) => (
          <g key={`o2weefsel-${i}`}
            style={{ opacity: isLaag ? 0 : 1, transition: `opacity 0.45s ease ${i * 80}ms` }}>
            <circle cx={p.x} cy={p.y} r="9" fill={CLR_O2} />
            <text x={p.x} y={p.y + 3.5} fontSize="7" textAnchor="middle" fill="white" fontWeight="700">O₂</text>
          </g>
        ))}
        {/* Placeholder cirkels (leeg) bij laag */}
        {[{ x: 360, y: 79 }, { x: 404, y: 79 }, { x: 448, y: 79 }].map((p, i) => (
          <g key={`o2weefsel-empty-${i}`}
            style={{ opacity: isLaag ? 1 : 0, transition: `opacity 0.35s ease ${i * 60}ms` }}>
            <circle cx={p.x} cy={p.y} r="9" fill="none" stroke="#d8cfc8" strokeWidth="1.5" strokeDasharray="3 2" />
          </g>
        ))}

        {/* ════════════════════════════════
            LEGENDE onderaan
        ════════════════════════════════ */}
        <circle cx="14" cy="226" r="7" fill={CLR_O2} />
        <text x="26" y="230" fontSize="9.5" fill="#8a9a90">zuurstof (O₂)</text>
        <circle cx="148" cy="226" r="7" fill={CLR_CO2} />
        <text x="160" y="230" fontSize="9.5" fill="#8a9a90">koolstofdioxide (CO₂)</text>
      </svg>

      {/* Teksttoelichting */}
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
