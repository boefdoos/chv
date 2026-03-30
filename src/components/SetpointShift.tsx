import { useState } from 'react';

export default function SetpointShift() {
  const [state, setState] = useState<'gezond' | 'chv'>('gezond');
  const isChv = state === 'chv';

  // De schaal loopt van 20 tot 50 mmHg (PaCO2)
  // Normaal setpoint: ~40 mmHg → positie 80% op de schaal
  // CHV setpoint: ~30 mmHg → positie 33% op de schaal
  // CHV werkelijke CO2: ~30 mmHg (structureel laag)
  // Normaal CO2: ~40 mmHg

  const scaleMin = 20;
  const scaleMax = 50;
  const scaleW = 420; // breedte van de as in SVG-eenheden
  const scaleX = 30;  // startpunt x

  function toX(mmhg: number) {
    return scaleX + ((mmhg - scaleMin) / (scaleMax - scaleMin)) * scaleW;
  }

  const normalSetpoint = 40;
  const chvSetpoint    = 30;
  const chvActual      = 30;

  const setpointX = isChv ? toX(chvSetpoint) : toX(normalSetpoint);
  const alarmZoneStart = setpointX;
  const alarmZoneEnd   = toX(scaleMax);
  const co2X           = isChv ? toX(chvActual) : toX(normalSetpoint);

  // Kleur alarmzone
  const alarmFill   = '#fce8e4';
  const alarmStroke = '#d4845a';
  const okFill      = '#eef4f0';

  return (
    <div className="py-2">

      {/* Toggle */}
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
        viewBox="0 0 480 200"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[540px] mx-auto block"
        style={{ fontFamily: 'inherit' }}
      >

        {/* ── Achtergrond zones ── */}
        {/* OK-zone: links van setpoint */}
        <rect
          x={scaleX} y={52}
          width={setpointX - scaleX} height={40}
          fill={okFill}
          rx="4"
          style={{ transition: 'width 0.6s cubic-bezier(0.34,1.1,0.64,1), x 0.6s cubic-bezier(0.34,1.1,0.64,1)' }}
        />
        {/* Alarm-zone: rechts van setpoint */}
        <rect
          x={setpointX} y={52}
          width={alarmZoneEnd - setpointX} height={40}
          fill={alarmFill}
          rx="4"
          style={{ transition: 'x 0.6s cubic-bezier(0.34,1.1,0.64,1), width 0.6s cubic-bezier(0.34,1.1,0.64,1)' }}
        />

        {/* Zone-labels */}
        <text
          x={scaleX + 8} y={76}
          fontSize="10" fill="#5a9870"
          style={{ transition: 'opacity 0.4s' }}
          opacity={setpointX - scaleX > 40 ? 1 : 0}
        >rustig ademen</text>
        <text
          x={Math.min(setpointX + 8, toX(44))} y={76}
          fontSize="10" fill="#c4724a"
          style={{ transition: 'x 0.6s cubic-bezier(0.34,1.1,0.64,1)' }}
        >meer ademen!</text>

        {/* ── Horizontale as ── */}
        <line x1={scaleX} y1={92} x2={scaleX + scaleW} y2={92} stroke="#c8bdb0" strokeWidth="1.5" />

        {/* Tikken + labels */}
        {[20, 25, 30, 35, 40, 45, 50].map((v) => (
          <g key={v}>
            <line x1={toX(v)} y1={88} x2={toX(v)} y2={96} stroke="#c8bdb0" strokeWidth="1" />
            <text x={toX(v)} y={107} fontSize="9" textAnchor="middle" fill="#a09080">{v}</text>
          </g>
        ))}
        <text x={scaleX + scaleW / 2} y={120} fontSize="9.5" textAnchor="middle" fill="#a09080">CO₂ in bloed (mmHg)</text>

        {/* ── Setpoint-markering ── */}
        <line
          x1={setpointX} y1={44}
          x2={setpointX} y2={96}
          stroke="#7a6a5a"
          strokeWidth="2"
          strokeDasharray="4 2"
          style={{ transition: 'x1 0.6s cubic-bezier(0.34,1.1,0.64,1), x2 0.6s cubic-bezier(0.34,1.1,0.64,1)' }}
        />
        {/* Setpoint-label */}
        <rect
          x={setpointX - 28} y={24}
          width={56} height={18}
          rx="4" fill="#f0e8e0"
          stroke="#c8b8a8" strokeWidth="1"
          style={{ transition: 'x 0.6s cubic-bezier(0.34,1.1,0.64,1)' }}
        />
        <text
          x={setpointX} y={36}
          fontSize="9.5" textAnchor="middle" fill="#7a6a5a" fontWeight="600"
          style={{ transition: 'x 0.6s cubic-bezier(0.34,1.1,0.64,1)' }}
        >setpoint</text>

        {/* ── CO2-niveau indicator (pijl omhoog) ── */}
        {/* Verticale lijn */}
        <line
          x1={co2X} y1={96}
          x2={co2X} y2={148}
          stroke={isChv ? '#c4724a' : '#5a9870'}
          strokeWidth="2.5"
          style={{ transition: 'x1 0.6s cubic-bezier(0.34,1.1,0.64,1), x2 0.6s cubic-bezier(0.34,1.1,0.64,1), stroke 0.4s' }}
        />
        {/* Driehoekje omhoog */}
        <polygon
          points={`${co2X},94 ${co2X - 7},108 ${co2X + 7},108`}
          fill={isChv ? '#c4724a' : '#5a9870'}
          style={{ transition: 'all 0.6s cubic-bezier(0.34,1.1,0.64,1)' }}
        />
        {/* Label CO2-niveau */}
        <rect
          x={co2X - 36} y={150}
          width={72} height={32}
          rx="5"
          fill={isChv ? '#fce8e4' : '#eef4f0'}
          stroke={isChv ? '#d4845a' : '#9ecaaa'}
          strokeWidth="1.2"
          style={{ transition: 'x 0.6s cubic-bezier(0.34,1.1,0.64,1), fill 0.4s, stroke 0.4s' }}
        />
        <text
          x={co2X} y={163}
          fontSize="9.5" textAnchor="middle"
          fill={isChv ? '#a05030' : '#3a8050'}
          fontWeight="600"
          style={{ transition: 'x 0.6s cubic-bezier(0.34,1.1,0.64,1), fill 0.4s' }}
        >jouw CO₂</text>
        <text
          x={co2X} y={176}
          fontSize="9" textAnchor="middle"
          fill={isChv ? '#c4724a' : '#5a9870'}
          style={{ transition: 'x 0.6s cubic-bezier(0.34,1.1,0.64,1), fill 0.4s' }}
        >{isChv ? '≈ 30 mmHg' : '≈ 40 mmHg'}</text>

        {/* ── Extra annotatie bij CHV: "dit voelt als te hoog" ── */}
        {isChv && (
          <g style={{ animation: 'spFade 0.5s ease 0.3s both' }}>
            <text x={toX(35)} y={42} fontSize="9" fill="#c4724a" textAnchor="middle">↑ hersenstam ziet dit</text>
            <text x={toX(35)} y={53} fontSize="9" fill="#c4724a" textAnchor="middle">als "te hoog"</text>
          </g>
        )}
        {!isChv && (
          <g style={{ animation: 'spFade 0.5s ease 0.3s both' }}>
            <text x={toX(38)} y={44} fontSize="9" fill="#5a9870" textAnchor="middle">✓ in balans</text>
          </g>
        )}

      </svg>

      {/* Teksttoelichting */}
      <div
        key={state}
        className={`mt-2 rounded-xl px-5 py-4 text-[14px] leading-relaxed text-center max-w-[460px] mx-auto ${
          isChv ? 'bg-terra-50 text-terra-400' : 'bg-sage-50 text-sage-500'
        }`}
        style={{ animation: 'spFade 0.35s ease both' }}
      >
        {isChv
          ? 'Het setpoint is verschoven naar ~30 mmHg. Zodra CO₂ stijgt richting normaal, slaat de hersenstam alarm — en adem je automatisch meer.'
          : 'Het setpoint staat op ~40 mmHg. CO₂ en setpoint zijn in evenwicht. De hersenstam is tevreden.'}
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
