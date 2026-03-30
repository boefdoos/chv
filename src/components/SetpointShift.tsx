import { useState } from 'react';

export default function SetpointShift() {
  const [state, setState] = useState<'gezond' | 'chv'>('gezond');
  const isChv = state === 'chv';

  const scaleMin = 20;
  const scaleMax = 50;
  const scaleW   = 400;
  const scaleX   = 40;

  function toX(mmhg: number) {
    return scaleX + ((mmhg - scaleMin) / (scaleMax - scaleMin)) * scaleW;
  }

  const setpointX = isChv ? toX(30) : toX(40);
  const co2X      = isChv ? toX(30) : toX(40);

  return (
    <div className="py-2">
      <div className="flex gap-2 justify-center mb-8">
        {(['gezond', 'chv'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setState(s)}
            className={`px-5 py-2 rounded-full text-[13px] border transition-all cursor-pointer ${
              state === s
                ? s === 'gezond'
                  ? 'bg-sage-300 text-white border-sage-300'
                  : 'bg-terra-300 text-white border-terra-300'
                : 'bg-sand-50 text-sand-600 border-sand-300 hover:border-sage-300 hover:text-sage-300 hover:-translate-y-px'
            }`}
          >
            {s === 'gezond' ? 'Gezond' : 'Chronische hyperventilatie'}
          </button>
        ))}
      </div>

      <svg
        viewBox="0 0 480 222"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[540px] mx-auto block"
        style={{ fontFamily: 'inherit' }}
      >
        {/* OK-zone */}
        <rect
          x={scaleX} y={55}
          width={setpointX - scaleX} height={44}
          fill="#eef4f0" rx="4"
          style={{ transition: 'width 0.6s cubic-bezier(0.34,1.1,0.64,1)' }}
        />
        {/* Alarm-zone */}
        <rect
          x={setpointX} y={55}
          width={toX(scaleMax) - setpointX} height={44}
          fill="#fce8e4" rx="4"
          style={{ transition: 'x 0.6s cubic-bezier(0.34,1.1,0.64,1), width 0.6s cubic-bezier(0.34,1.1,0.64,1)' }}
        />

        {/* Zone-labels */}
        <text x={scaleX + 10} y={82} fontSize="12" fill="#5a9870"
          opacity={setpointX - scaleX > 60 ? 1 : 0}
          style={{ transition: 'opacity 0.3s' }}
        >rustig ademen</text>
        <text
          x={Math.min(setpointX + 10, toX(43))} y={82}
          fontSize="12" fill="#c4724a"
          style={{ transition: 'x 0.6s cubic-bezier(0.34,1.1,0.64,1)' }}
        >meer ademen!</text>

        {/* As */}
        <line x1={scaleX} y1={99} x2={scaleX + scaleW} y2={99} stroke="#c8bdb0" strokeWidth="1.5" />

        {/* Tikken + labels */}
        {[20, 25, 30, 35, 40, 45, 50].map((v) => (
          <g key={v}>
            <line x1={toX(v)} y1={95} x2={toX(v)} y2={103} stroke="#c8bdb0" strokeWidth="1" />
            <text x={toX(v)} y={116} fontSize="11" textAnchor="middle" fill="#a09080">{v}</text>
          </g>
        ))}
        <text x={scaleX + scaleW / 2} y={132} fontSize="11.5" textAnchor="middle" fill="#a09080">
          CO₂ in bloed (mmHg)
        </text>

        {/* Setpoint-streep */}
        <line
          x1={setpointX} y1={46}
          x2={setpointX} y2={103}
          stroke="#7a6a5a" strokeWidth="2" strokeDasharray="4 2"
          style={{ transition: 'x1 0.6s cubic-bezier(0.34,1.1,0.64,1), x2 0.6s cubic-bezier(0.34,1.1,0.64,1)' }}
        />
        {/* Setpoint-label */}
        <rect
          x={setpointX - 34} y={24}
          width={68} height={20} rx="4"
          fill="#f0e8e0" stroke="#c8b8a8" strokeWidth="1"
          style={{ transition: 'x 0.6s cubic-bezier(0.34,1.1,0.64,1)' }}
        />
        <text
          x={setpointX} y={38}
          fontSize="12" textAnchor="middle" fill="#7a6a5a" fontWeight="600"
          style={{ transition: 'x 0.6s cubic-bezier(0.34,1.1,0.64,1)' }}
        >setpoint</text>

        {/* CO2-indicator pijl */}
        <line
          x1={co2X} y1={103} x2={co2X} y2={158}
          stroke={isChv ? '#c4724a' : '#5a9870'} strokeWidth="2.5"
          style={{ transition: 'x1 0.6s cubic-bezier(0.34,1.1,0.64,1), x2 0.6s cubic-bezier(0.34,1.1,0.64,1), stroke 0.4s' }}
        />
        <polygon
          points={`${co2X},101 ${co2X - 8},115 ${co2X + 8},115`}
          fill={isChv ? '#c4724a' : '#5a9870'}
          style={{ transition: 'all 0.6s cubic-bezier(0.34,1.1,0.64,1)' }}
        />
        {/* Indicator-label */}
        <rect
          x={co2X - 42} y={160}
          width={84} height={38} rx="5"
          fill={isChv ? '#fce8e4' : '#eef4f0'}
          stroke={isChv ? '#d4845a' : '#9ecaaa'} strokeWidth="1.2"
          style={{ transition: 'x 0.6s cubic-bezier(0.34,1.1,0.64,1), fill 0.4s, stroke 0.4s' }}
        />
        <text
          x={co2X} y={177}
          fontSize="12" textAnchor="middle"
          fill={isChv ? '#a05030' : '#3a8050'} fontWeight="600"
          style={{ transition: 'x 0.6s cubic-bezier(0.34,1.1,0.64,1), fill 0.4s' }}
        >jouw CO₂</text>
        <text
          x={co2X} y={192}
          fontSize="11" textAnchor="middle"
          fill={isChv ? '#c4724a' : '#5a9870'}
          style={{ transition: 'x 0.6s cubic-bezier(0.34,1.1,0.64,1), fill 0.4s' }}
        >{isChv ? '≈ 30 mmHg' : '≈ 40 mmHg'}</text>

        {/* Annotatie — onder de indicator-box, gecentreerd op jouw CO2-positie */}
        <text
          x={co2X} y={214}
          fontSize="11" textAnchor="middle"
          fill={isChv ? '#c4724a' : '#5a9870'}
          style={{ transition: 'x 0.6s cubic-bezier(0.34,1.1,0.64,1), fill 0.4s', animation: 'spFade 0.4s ease both' }}
        >
          {isChv ? '↑ hersenstam ziet dit als \u201cte hoog\u201d' : '\u2713 setpoint en CO\u2082 zijn in evenwicht'}
        </text>
      </svg>

      <div
        key={state}
        className={`mt-2 rounded-xl px-5 py-4 text-[14px] leading-relaxed text-center max-w-[460px] mx-auto ${
          isChv ? 'bg-terra-50 text-terra-400' : 'bg-sage-50 text-sage-500'
        }`}
        style={{ animation: 'spFade 0.35s ease both' }}
      >
        {isChv
          ? 'Het setpoint is verschoven naar ≈ 30 mmHg. Zodra CO₂ stijgt richting normaal, slaat de hersenstam alarm — en adem je automatisch meer.'
          : 'Het setpoint staat op ≈ 40 mmHg. CO₂ en setpoint zijn in evenwicht. De hersenstam is tevreden.'}
      </div>

      <style>{`
        @keyframes spFade {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
