import { useState } from 'react';

// Kleuren consistent met de site-palette
const COLORS = {
  o2: '#6baed6',        // blauw
  o2Text: 'white',
  co2: '#c47b5a',       // terra
  co2Text: 'white',
  hb: '#b97060',        // hemoglobine rood-bruin
  hbLaag: '#c96b5e',
  bloed: '#f0ddd6',
  weefselnormaal: '#eef4f0',
  weefsellaag: '#f5f0eb',
  slotnormaal: '#7aaa8a',
  slotlaag: '#c8a8a0',
  lijnnormaal: '#9ecaaa',
  lijnlaag: '#ddd0c8',
};

const hbCx = 148;
const hbCy = 112;

// 6 O2-bolletjes rondom de hemoglobine-ellips
const o2OpHb = [
  { x: hbCx - 44, y: hbCy - 16 },
  { x: hbCx - 14, y: hbCy - 34 },
  { x: hbCx + 22, y: hbCy - 22 },
  { x: hbCx - 46, y: hbCy + 12 },
  { x: hbCx - 12, y: hbCy + 30 },
  { x: hbCx + 26, y: hbCy + 16 },
];

// 3 O2-doelposities in het weefselblok
const o2InWeefsel = [
  { x: 362, y: 68 },
  { x: 392, y: 68 },
  { x: 422, y: 68 },
];

// CO2-bolletjes in de bloedbaan (bij normaal aanwezig, bij laag afwezig/vaag)
const co2Posities = [
  { x: 52,  y: 108 },
  { x: 90,  y: 120 },
  { x: 260, y: 108 },
  { x: 310, y: 120 },
  { x: 420, y: 110 },
];

export default function BohrEffect() {
  const [state, setState] = useState<'normaal' | 'laag'>('normaal');
  const isLaag = state === 'laag';

  return (
    <div className="py-2">

      {/* Legende */}
      <div className="flex gap-5 justify-center mb-5 flex-wrap">
        <div className="flex items-center gap-2">
          <svg width="18" height="18"><circle cx="9" cy="9" r="9" fill={COLORS.o2} /></svg>
          <span className="text-[12px] text-sand-600">Zuurstof (O₂)</span>
        </div>
        <div className="flex items-center gap-2">
          <svg width="18" height="18"><circle cx="9" cy="9" r="9" fill={COLORS.co2} /></svg>
          <span className="text-[12px] text-sand-600">Koolstofdioxide (CO₂)</span>
        </div>
        <div className="flex items-center gap-2">
          <svg width="18" height="18"><ellipse cx="9" cy="9" rx="9" ry="7" fill={COLORS.hb} /></svg>
          <span className="text-[12px] text-sand-600">Hemoglobine</span>
        </div>
      </div>

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
        style={{ fontFamily: 'inherit', overflow: 'visible' }}
      >
        {/* Bloedvat */}
        <rect x="0" y="90" width="480" height="44" rx="22" fill={COLORS.bloed} />
        <text x="18" y="116" fontSize="10" fill="#a07060">bloed</text>

        {/* CO2-bolletjes in bloed */}
        {co2Posities.map((pos, i) => (
          <g key={`co2-${i}`} style={{ transition: `opacity 0.5s ${i * 60}ms` }} opacity={isLaag ? 0.18 : 1}>
            <circle cx={pos.x} cy={pos.y} r="10" fill={COLORS.co2} />
            <text x={pos.x} y={pos.y + 3.5} fontSize="7.5" textAnchor="middle" fill={COLORS.co2Text} fontWeight="600">CO₂</text>
          </g>
        ))}

        {/* Weefselblok */}
        <rect
          x="322" y="30" width="150" height="72"
          rx="10"
          fill={isLaag ? COLORS.weefsellaag : COLORS.weefselnormaal}
          stroke={isLaag ? COLORS.slotlaag : COLORS.slotnormaal}
          strokeWidth="1.5"
          style={{ transition: 'fill 0.5s, stroke 0.5s' }}
        />
        <text x="397" y="54" fontSize="11" textAnchor="middle" fill={isLaag ? '#b0a090' : '#5a9870'} fontWeight="500" style={{ transition: 'fill 0.4s' }}>
          weefsel / cel
        </text>
        <text x="397" y="70" fontSize="10" textAnchor="middle" fill={isLaag ? '#c0b0a0' : '#7aaa8a'} style={{ transition: 'fill 0.4s' }}>
          {isLaag ? 'zuurstoftekort' : 'ontvangt O₂'}
        </text>

        {/* Verbindingslijn */}
        <line
          x1="210" y1="96"
          x2="320" y2="76"
          stroke={isLaag ? COLORS.lijnlaag : COLORS.lijnnormaal}
          strokeWidth="1.5"
          strokeDasharray={isLaag ? '5 4' : '0'}
          style={{ transition: 'stroke 0.5s, stroke-dasharray 0.3s' }}
        />

        {/* Slot */}
        <g transform="translate(262, 82)">
          <rect
            x="-13" y="-13" width="26" height="26" rx="5"
            fill={isLaag ? '#f0e8e4' : '#dceee2'}
            stroke={isLaag ? COLORS.slotlaag : COLORS.slotnormaal}
            strokeWidth="1.5"
            style={{ transition: 'fill 0.4s, stroke 0.4s' }}
          />
          <rect x="-5" y="-2" width="10" height="9" rx="1.5" fill={isLaag ? COLORS.slotlaag : COLORS.slotnormaal} style={{ transition: 'fill 0.4s' }} />
          {isLaag
            ? <path d="M-3 -2 Q-3 -9 0 -9 Q3 -9 3 -2" stroke={COLORS.slotlaag} strokeWidth="2" fill="none" />
            : <path d="M0 -2 Q0 -9 4 -9 Q8 -9 8 -5" stroke={COLORS.slotnormaal} strokeWidth="2" fill="none" />
          }
        </g>

        {/* Hemoglobine */}
        <ellipse
          cx={hbCx} cy={hbCy} rx="60" ry="33"
          fill={isLaag ? COLORS.hbLaag : COLORS.hb}
          style={{ transition: 'fill 0.4s' }}
        />
        <text x={hbCx} y={hbCy - 4} fontSize="11" textAnchor="middle" fill="white" fontWeight="600">Hemo-</text>
        <text x={hbCx} y={hbCy + 11} fontSize="11" textAnchor="middle" fill="white" fontWeight="600">globine</text>

        {/* O2-bolletjes */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const delivered = !isLaag && i >= 3;
          const pos = delivered ? o2InWeefsel[i - 3] : o2OpHb[i];
          return (
            <g key={`o2-${i}`}>
              <circle
                r="10"
                fill={COLORS.o2}
                style={{
                  cx: pos.x,
                  cy: pos.y,
                  transition: `cx 0.55s cubic-bezier(0.34,1.2,0.64,1) ${(i % 3) * 70}ms, cy 0.55s cubic-bezier(0.34,1.2,0.64,1) ${(i % 3) * 70}ms`,
                }}
              />
              <text
                fontSize="8" textAnchor="middle" fill={COLORS.o2Text} fontWeight="600"
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
        className={`mt-5 rounded-xl px-5 py-4 text-[14px] leading-relaxed text-center max-w-[460px] mx-auto ${
          isLaag ? 'bg-terra-50 text-terra-400' : 'bg-sage-50 text-sage-500'
        }`}
        style={{ animation: 'bohrFade 0.35s ease both' }}
      >
        {isLaag
          ? 'Te weinig CO₂ in het bloed: hemoglobine houdt de zuurstof vast. Je saturatiemeter toont 99%, maar je cellen krijgen te weinig.'
          : 'Genoeg CO₂ aanwezig: hemoglobine laat de zuurstof los en levert het af aan de cellen.'}
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
