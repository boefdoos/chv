import { useState } from 'react';

export default function BohrEffect() {
  const [state, setState] = useState<'normaal' | 'laag'>('normaal');
  const isLaag = state === 'laag';

  // Posities O2 op hemoglobine (blauw)
  const o2OnHb = [
    { x: 128, y: 98 },
    { x: 152, y: 86 },
    { x: 176, y: 94 },
    { x: 128, y: 120 },
    { x: 152, y: 128 },
    { x: 176, y: 116 },
  ];

  // Doelposities O2 in weefsel (3 gaan erheen bij normaal)
  const o2InWeefsel = [
    { x: 358, y: 72 },
    { x: 384, y: 72 },
    { x: 410, y: 72 },
  ];

  // CO2-bolletjes in het bloed (oranje/warm) — bij normaal aanwezig, bij laag vervaagd
  const co2Positions = [
    { x: 80,  y: 104 },
    { x: 96,  y: 118 },
    { x: 68,  y: 120 },
  ];

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

      {/* SVG */}
      <svg
        viewBox="0 0 480 195"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[520px] mx-auto block"
        style={{ fontFamily: 'inherit' }}
      >
        {/* Bloedvat */}
        <rect x="0" y="86" width="480" height="50" rx="25" fill="#f0ddd6" />
        <text x="20" y="116" fontSize="10.5" fill="#a07060" fontFamily="inherit">bloed</text>

        {/* Hemoglobine */}
        <ellipse cx="152" cy="111" rx="56" ry="30" fill="#b97060" />
        <text x="152" y="107" fontSize="10.5" textAnchor="middle" fill="white" fontFamily="inherit" fontWeight="600">Hemo-</text>
        <text x="152" y="121" fontSize="10.5" textAnchor="middle" fill="white" fontFamily="inherit" fontWeight="600">globine</text>

        {/* CO2-bolletjes in bloed (oranje) */}
        {co2Positions.map((p, i) => (
          <g key={`co2-${i}`} style={{ opacity: isLaag ? 0.18 : 1, transition: `opacity 0.5s ease ${i * 80}ms` }}>
            <circle cx={p.x} cy={p.y} r="10" fill="#d4845a" />
            <text x={p.x} y={p.y + 3.5} fontSize="7.5" textAnchor="middle" fill="white" fontFamily="inherit" fontWeight="600">CO₂</text>
          </g>
        ))}

        {/* Verbindingslijn Hb naar weefsel */}
        <line
          x1="208" y1="97"
          x2="326" y2="78"
          stroke={isLaag ? '#ddd0c8' : '#9ecaaa'}
          strokeWidth="1.5"
          strokeDasharray={isLaag ? '5 4' : '0'}
          style={{ transition: 'stroke 0.5s' }}
        />

        {/* Slot */}
        <g transform="translate(263, 84)">
          <rect x="-12" y="-12" width="24" height="24" rx="5"
            fill={isLaag ? '#f0e8e4' : '#dceee2'}
            stroke={isLaag ? '#c8a8a0' : '#7aaa8a'}
            strokeWidth="1.5"
            style={{ transition: 'fill 0.4s, stroke 0.4s' }}
          />
          <rect x="-5" y="-1" width="10" height="8" rx="1.5"
            fill={isLaag ? '#c8a8a0' : '#7aaa8a'}
            style={{ transition: 'fill 0.4s' }}
          />
          {isLaag
            ? <path d="M-3 -1 Q-3 -8 0 -8 Q3 -8 3 -1" stroke="#c8a8a0" strokeWidth="2" fill="none" />
            : <path d="M0 -1 Q0 -8 3 -8 Q7 -8 7 -4" stroke="#7aaa8a" strokeWidth="2" fill="none" />
          }
        </g>

        {/* Weefsel-blok */}
        <rect x="326" y="42" width="142" height="72" rx="10"
          fill={isLaag ? '#f5f0eb' : '#eef4f0'}
          stroke={isLaag ? '#d8cfc8' : '#b0d8bc'}
          strokeWidth="1.5"
          style={{ transition: 'fill 0.5s, stroke 0.5s' }}
        />
        <text x="397" y="66" fontSize="10.5" textAnchor="middle" fill={isLaag ? '#b0a090' : '#5a9870'} fontFamily="inherit" fontWeight="500" style={{ transition: 'fill 0.4s' }}>weefsel / cel</text>
        <text x="397" y="83" fontSize="10" textAnchor="middle" fill={isLaag ? '#c0b0a0' : '#7aaa8a'} fontFamily="inherit" style={{ transition: 'fill 0.4s' }}>
          {isLaag ? 'zuurstoftekort' : 'ontvangt O₂'}
        </text>

        {/* O2-bolletjes (blauw) — 3 blijven op Hb, 3 gaan naar weefsel bij normaal */}
        {o2OnHb.map((p, i) => {
          const goesToWeefsel = !isLaag && i >= 3;
          const target = goesToWeefsel ? o2InWeefsel[i - 3] : p;
          return (
            <g key={`o2-${i}`}>
              <circle r="9" fill="#6baed6"
                style={{
                  cx: target.x,
                  cy: target.y,
                  transition: `cx 0.55s cubic-bezier(0.34,1.2,0.64,1) ${(i % 3) * 70}ms, cy 0.55s cubic-bezier(0.34,1.2,0.64,1) ${(i % 3) * 70}ms`,
                }}
              />
              <text fontSize="7.5" textAnchor="middle" fill="white" fontFamily="inherit" fontWeight="600"
                style={{
                  x: target.x,
                  y: target.y + 3,
                  transition: `x 0.55s cubic-bezier(0.34,1.2,0.64,1) ${(i % 3) * 70}ms, y 0.55s cubic-bezier(0.34,1.2,0.64,1) ${(i % 3) * 70}ms`,
                }}
              >O₂</text>
            </g>
          );
        })}

        {/* Legende */}
        <circle cx="14" cy="176" r="7" fill="#6baed6" />
        <text x="25" y="180" fontSize="10" fill="#7a8a80" fontFamily="inherit">zuurstof (O₂)</text>
        <circle cx="130" cy="176" r="7" fill="#d4845a" />
        <text x="141" y="180" fontSize="10" fill="#7a8a80" fontFamily="inherit">koolstofdioxide (CO₂)</text>
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
