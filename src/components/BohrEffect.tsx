import { useState } from 'react';

export default function BohrEffect() {
  const [state, setState] = useState<'normaal' | 'laag'>('normaal');
  const isLaag = state === 'laag';

  // 6 O2-moleculen, verdeeld over twee rijen van 3 rond de Hb-ellips
  // Bij normaal: rechter 3 vliegen naar het weefsel
  // Bij laag: alle 6 blijven op Hb

  const hbCx = 155;
  const hbCy = 110;

  // Vaste posities op Hb (rondom de ellips)
  const onHb = [
    { x: hbCx - 38, y: hbCy - 18 },
    { x: hbCx - 10, y: hbCy - 32 },
    { x: hbCx + 22, y: hbCy - 20 },
    { x: hbCx - 40, y: hbCy + 10 },
    { x: hbCx - 10, y: hbCy + 28 },
    { x: hbCx + 24, y: hbCy + 14 },
  ];

  // Doelposities in weefsel-blok (rechts)
  const inWeefsel = [
    { x: 355, y: 62 },
    { x: 385, y: 62 },
    { x: 415, y: 62 },
    { x: 355, y: 85 },
    { x: 385, y: 85 },
    { x: 415, y: 85 },
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
        viewBox="0 0 480 190"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[500px] mx-auto block"
        style={{ fontFamily: 'inherit' }}
      >
        {/* ── Bloedvat ── */}
        <rect x="0" y="88" width="480" height="44" rx="22" fill="#f0ddd6" />
        <text x="18" y="114" fontSize="11" fill="#a07060">bloed</text>

        {/* ── Hemoglobine ── */}
        <ellipse
          cx={hbCx}
          cy={hbCy}
          rx="60"
          ry="32"
          fill={isLaag ? '#c96b5e' : '#b97060'}
          style={{ transition: 'fill 0.4s' }}
        />
        <text x={hbCx} y={hbCy - 4} fontSize="11" textAnchor="middle" fill="white" fontWeight="600">Hemo-</text>
        <text x={hbCx} y={hbCy + 10} fontSize="11" textAnchor="middle" fill="white" fontWeight="600">globine</text>

        {/* ── CO2-indicator ── */}
        <circle cx={hbCx + 28} cy={hbCy + 36} r="16" fill={isLaag ? '#e8e0d8' : '#e8d5c4'} opacity={isLaag ? 0.5 : 1} style={{ transition: 'opacity 0.4s, fill 0.4s' }} />
        <text x={hbCx + 28} y={hbCy + 40} fontSize="9.5" textAnchor="middle" fill={isLaag ? '#b0a090' : '#a07060'} fontWeight="600" style={{ transition: 'fill 0.4s' }}>CO₂</text>
        {isLaag && (
          <text x={hbCx + 46} y={hbCy + 32} fontSize="11" fill="#c08070">✗</text>
        )}

        {/* ── Weefsel-blok ── */}
        <rect
          x="324"
          y="38"
          width="144"
          height="70"
          rx="10"
          fill={isLaag ? '#f5f0eb' : '#eef4f0'}
          stroke={isLaag ? '#d8cfc8' : '#b0d8bc'}
          strokeWidth="1.5"
          style={{ transition: 'fill 0.5s, stroke 0.5s' }}
        />
        <text x="396" y="60" fontSize="11" textAnchor="middle" fill={isLaag ? '#b0a090' : '#5a9870'} fontWeight="500" style={{ transition: 'fill 0.4s' }}>weefsel / cel</text>
        <text x="396" y="76" fontSize="10" textAnchor="middle" fill={isLaag ? '#c0b0a0' : '#7aaa8a'} style={{ transition: 'fill 0.4s' }}>
          {isLaag ? 'zuurstoftekort' : 'ontvangt O₂'}
        </text>

        {/* ── Verbindingslijn Hb → weefsel ── */}
        <line
          x1="216"
          y1="96"
          x2="322"
          y2="80"
          stroke={isLaag ? '#ddd0c8' : '#9ecaaa'}
          strokeWidth="1.5"
          strokeDasharray={isLaag ? '5 4' : '0'}
          style={{ transition: 'stroke 0.5s, stroke-dasharray 0.3s' }}
        />

        {/* ── Slot (open/dicht) ── */}
        <g transform="translate(265, 84)">
          <rect
            x="-12" y="-12" width="24" height="24" rx="5"
            fill={isLaag ? '#f0e8e4' : '#dceee2'}
            stroke={isLaag ? '#c8a8a0' : '#7aaa8a'}
            strokeWidth="1.5"
            style={{ transition: 'fill 0.4s, stroke 0.4s' }}
          />
          {/* Slotlichaam */}
          <rect x="-5" y="-1" width="10" height="8" rx="1.5" fill={isLaag ? '#c8a8a0' : '#7aaa8a'} style={{ transition: 'fill 0.4s' }} />
          {/* Slotbeugel: dicht = boog omhoog gecentreerd, open = boog opzij */}
          {isLaag
            ? <path d="M-3 -1 Q-3 -8 0 -8 Q3 -8 3 -1" stroke="#c8a8a0" strokeWidth="2" fill="none" style={{ transition: 'stroke 0.4s' }} />
            : <path d="M0 -1 Q0 -8 3 -8 Q7 -8 7 -4" stroke="#7aaa8a" strokeWidth="2" fill="none" style={{ transition: 'stroke 0.4s' }} />
          }
        </g>

        {/* ── O2-moleculen ── */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const goesToWeefsel = !isLaag && i < 6; // bij normaal: alle 6 mogen afgeleverd, maar we tonen 3
          const delivered = !isLaag && i >= 3; // de 3 rechtse gaan naar weefsel
          const pos = delivered ? inWeefsel[i - 3] : onHb[i];

          return (
            <g key={i}>
              <circle
                r="9"
                fill="#6baed6"
                opacity={delivered ? 0.85 : 0.9}
                style={{
                  cx: pos.x,
                  cy: pos.y,
                  transition: `cx 0.55s cubic-bezier(0.34,1.2,0.64,1) ${(i % 3) * 70}ms, cy 0.55s cubic-bezier(0.34,1.2,0.64,1) ${(i % 3) * 70}ms`,
                }}
              />
              <text
                fontSize="8"
                textAnchor="middle"
                fill="white"
                fontWeight="600"
                style={{
                  x: pos.x,
                  y: pos.y + 3,
                  transition: `x 0.55s cubic-bezier(0.34,1.2,0.64,1) ${(i % 3) * 70}ms, y 0.55s cubic-bezier(0.34,1.2,0.64,1) ${(i % 3) * 70}ms`,
                }}
              >O₂</text>
            </g>
          );
        })}
      </svg>

      {/* Teksttoelichting */}
      <div
        key={state}
        className={`mt-4 rounded-xl px-5 py-4 text-[14px] leading-relaxed text-center max-w-[460px] mx-auto ${
          isLaag ? 'bg-terra-50 text-terra-400' : 'bg-sage-50 text-sage-500'
        }`}
        style={{ animation: 'bohrFade 0.35s ease both' }}
      >
        {isLaag
          ? 'Te weinig CO₂ — hemoglobine houdt de zuurstof vast. Je saturatie ziet er goed uit, maar je cellen krijgen te weinig.'
          : 'Genoeg CO₂ aanwezig — hemoglobine laat de zuurstof los. Levering aan de cellen verloopt normaal.'}
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
