import { useState } from 'react';

export default function SetpointShift() {
  const [state, setState] = useState<'gezond' | 'chv'>('gezond');
  const isChv = state === 'chv';

  const scaleMin = 20;
  const scaleMax = 55;
  const scaleW   = 380;
  const scaleX   = 50;

  function toX(mmhg: number) {
    return scaleX + ((mmhg - scaleMin) / (scaleMax - scaleMin)) * scaleW;
  }

  // Gezond: setpoint=40, CO2=40 in evenwicht
  // CHV:    setpoint=30 (verschoven), CO2=35 (in alarmzone) — kernprobleem zichtbaar
  const setpointVal = isChv ? 30 : 40;
  const co2Val      = isChv ? 35 : 40;

  const setpointX  = toX(setpointVal);
  const co2X       = toX(co2Val);
  const normalCO2X = toX(40);

  const safeFill   = '#5a9870';
  const warnFill   = '#c4724a';
  const safeStroke = '#9ecaaa';
  const warnStroke = '#d4845a';

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
        viewBox="0 0 480 235"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[540px] mx-auto block"
        style={{ fontFamily: 'inherit' }}
      >
        {/* OK-zone */}
        <rect
          x={scaleX} y={55} width={setpointX - scaleX} height={44}
          fill="#eef4f0" rx="4"
          style={{ transition: 'width 0.7s cubic-bezier(0.34,1.1,0.64,1)' }}
        />
        {/* Alarm-zone */}
        <rect
          x={setpointX} y={55} width={toX(scaleMax) - setpointX} height={44}
          fill="#fce8e4" rx="4"
          style={{ transition: 'x 0.7s cubic-bezier(0.34,1.1,0.64,1), width 0.7s cubic-bezier(0.34,1.1,0.64,1)' }}
        />

        {/* Zone-labels */}
        <text x={scaleX + 10} y={82} fontSize="11.5" fill={safeFill}
          opacity={setpointX - scaleX > 55 ? 1 : 0}
          style={{ transition: 'opacity 0.3s' }}>rustig</text>
        <text
          x={setpointX + 10} y={82} fontSize="11.5" fill={warnFill}
          style={{ transition: 'x 0.7s cubic-bezier(0.34,1.1,0.64,1)' }}
        >meer ademen!</text>

        {/* As */}
        <line x1={scaleX} y1={99} x2={scaleX + scaleW} y2={99} stroke="#c8bdb0" strokeWidth="1.5" />

        {/* Tikken + labels */}
        {[20, 25, 30, 35, 40, 45, 50, 55].map((v) => (
          <g key={v}>
            <line x1={toX(v)} y1={95} x2={toX(v)} y2={103} stroke="#c8bdb0" strokeWidth="1" />
            <text x={toX(v)} y={116} fontSize="10.5" textAnchor="middle" fill="#a09080">{v}</text>
          </g>
        ))}
        <text x={scaleX + scaleW / 2} y={130} fontSize="11" textAnchor="middle" fill="#a09080">
          CO2 in bloed (mmHg)
        </text>

        {/* Setpoint-streep */}
        <line
          x1={setpointX} y1={44} x2={setpointX} y2={103}
          stroke="#7a6a5a" strokeWidth="2" strokeDasharray="4 2"
          style={{ transition: 'x1 0.7s cubic-bezier(0.34,1.1,0.64,1), x2 0.7s cubic-bezier(0.34,1.1,0.64,1)' }}
        />
        <rect
          x={setpointX - 42} y={22} width={84} height={20} rx="4"
          fill="#f0e8e0" stroke="#c8b8a8" strokeWidth="1"
          style={{ transition: 'x 0.7s cubic-bezier(0.34,1.1,0.64,1)' }}
        />
        <text
          x={setpointX} y={36} fontSize="11.5" textAnchor="middle" fill="#7a6a5a" fontWeight="600"
          style={{ transition: 'x 0.7s cubic-bezier(0.34,1.1,0.64,1)' }}
        >setpoint: {setpointVal} mmHg</text>

        {/* Referentielijn gezond normaal: enkel zichtbaar in CHV-staat */}
        <line
          x1={normalCO2X} y1={55} x2={normalCO2X} y2={99}
          stroke="#9ecaaa" strokeWidth="1.5" strokeDasharray="3 2"
          opacity={isChv ? 0.8 : 0}
          style={{ transition: 'opacity 0.5s ease 0.4s' }}
        />
        <text
          x={normalCO2X} y={51} fontSize="9.5" textAnchor="middle" fill="#7aaa8a"
          opacity={isChv ? 1 : 0}
          style={{ transition: 'opacity 0.5s ease 0.4s' }}
        >gezond normaal</text>

        {/* CO2-indicator pijl */}
        <line
          x1={co2X} y1={103} x2={co2X} y2={160}
          stroke={isChv ? warnFill : safeFill} strokeWidth="2.5"
          style={{ transition: 'x1 0.7s cubic-bezier(0.34,1.1,0.64,1), x2 0.7s cubic-bezier(0.34,1.1,0.64,1), stroke 0.4s' }}
        />
        <polygon
          points={`${co2X},101 ${co2X - 8},115 ${co2X + 8},115`}
          fill={isChv ? warnFill : safeFill}
          style={{ transition: 'all 0.7s cubic-bezier(0.34,1.1,0.64,1)' }}
        />

        {/* CO2-box */}
        <rect
          x={co2X - 46} y={162} width={92} height={42} rx="6"
          fill={isChv ? '#fce8e4' : '#eef4f0'}
          stroke={isChv ? warnStroke : safeStroke} strokeWidth="1.2"
          style={{ transition: 'x 0.7s cubic-bezier(0.34,1.1,0.64,1), fill 0.4s, stroke 0.4s' }}
        />
        <text
          x={co2X} y={180} fontSize="11.5" textAnchor="middle"
          fill={isChv ? '#a05030' : '#3a8050'} fontWeight="600"
          style={{ transition: 'x 0.7s cubic-bezier(0.34,1.1,0.64,1), fill 0.4s' }}
        >jouw CO₂</text>
        <text
          x={co2X} y={196} fontSize="11" textAnchor="middle"
          fill={isChv ? warnFill : safeFill}
          style={{ transition: 'x 0.7s cubic-bezier(0.34,1.1,0.64,1), fill 0.4s' }}
        >{isChv ? '35 mmHg' : '40 mmHg'}</text>

        {/* Status-annotatie */}
        <text
          x={240} y={222} fontSize="11.5" textAnchor="middle"
          fill={isChv ? warnFill : safeFill}
          style={{ transition: 'fill 0.4s', animation: 'spFade 0.4s ease both' }}
        >
          {isChv
            ? '35 mmHg valt al in de alarmzone: hersenstam geeft signaal om meer te ademen'
            : 'setpoint en CO₂ zijn in evenwicht'}
        </text>
      </svg>

      <div
        key={state}
        className={`mt-2 rounded-xl px-5 py-4 text-[14px] leading-relaxed text-center max-w-[480px] mx-auto ${
          isChv ? 'bg-terra-50 text-terra-400' : 'bg-sage-50 text-sage-500'
        }`}
        style={{ animation: 'spFade 0.35s ease both' }}
      >
        {isChv
          ? 'Het setpoint is verschoven naar 30 mmHg. Zelfs CO₂ van 35 mmHg, ruim onder het gezonde niveau van 40, valt al in de alarmzone. Normaal CO₂ voelt voor dit systeem als te veel.'
          : 'Het setpoint staat op 40 mmHg. CO₂ en setpoint zijn in evenwicht. De hersenstam is tevreden.'}
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
