// Kernlus van chronische hyperventilatie, met daaronder de invloeden die de ademdrang versterken.
// Het verdedigde lagere niveau (setpoint) is bij CHV een werkhypothese; dat staat ook in de visual.

const CX = 220;
const CY = 160;
const R = 110;
const BW = 160;
const BH = 60;

const loop = [
  { angle: -150, label: 'Te veel ademen', sub: 'CO₂ daalt' },
  { angle: -30, label: 'Setpoint zakt', sub: 'laag voelt als normaal', tag: 'werkhypothese' },
  { angle: 90, label: 'Ademdrang', sub: 'zodra CO₂ wat stijgt' },
];

// Boogsegmenten tussen de kaders (graden), zo gekozen dat ze de kaders niet raken.
const arcs: [number, number][] = [
  [-115, -65],
  [5, 38],
  [142, 175],
];

const inputs = [
  { label: 'Stress en arousal', sub: 'zenuwstelsel in alarmstand' },
  { label: 'Slaap en hormonen', sub: 'gevoeligheid schommelt mee' },
  { label: 'Aandacht voor je adem', sub: 'sensaties wegen zwaarder' },
  { label: 'Nieren (bicarbonaat)', sub: 'vooral de eerste dagen' },
];

const pt = (deg: number) => {
  const r = (deg * Math.PI) / 180;
  return { x: CX + R * Math.cos(r), y: CY + R * Math.sin(r) };
};

const arcPath = ([a, b]: [number, number]) => {
  const p1 = pt(a);
  const p2 = pt(b);
  return `M${p1.x.toFixed(1)} ${p1.y.toFixed(1)} A${R} ${R} 0 0 1 ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
};

export default function ViciousCircle() {
  const chipW = 190;
  const chipH = 50;
  const chipX = [20, 230];
  const chipY = [352, 412];

  return (
    <div style={{ maxWidth: '440px', margin: '0 auto' }}>
      <svg
        viewBox="0 0 440 480"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Vicieuze cirkel: te veel ademen doet CO₂ dalen, het regelsysteem verdedigt dat lage niveau, en elke kleine stijging geeft ademdrang, waardoor je opnieuw te veel ademt. Stress, slaap, aandacht voor je ademhaling en in de eerste dagen de nieren versterken die ademdrang."
      >
        <defs>
          <marker id="vc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M2 2L8 5L2 8" fill="none" stroke="#b07858" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
          <marker id="vc-arrow-soft" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M2 2L8 5L2 8" fill="none" stroke="#8a9a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        {/* Kernlus */}
        {arcs.map((a, i) => (
          <path key={i} d={arcPath(a)} fill="none" stroke="#b07858" strokeWidth="1.5" markerEnd="url(#vc-arrow)" />
        ))}

        {loop.map((n, i) => {
          const p = pt(n.angle);
          return (
            <g key={i}>
              <rect x={p.x - BW / 2} y={p.y - BH / 2} width={BW} height={BH} rx="12" ry="12" fill="#fce8e2" stroke="#e8c0b0" strokeWidth="1" />
              <text x={p.x} y={p.y - 8} textAnchor="middle" dominantBaseline="central" style={{ fontSize: '13px', fontWeight: 600, fill: '#7a3a2a' }}>
                {n.label}
              </text>
              <text x={p.x} y={p.y + 12} textAnchor="middle" dominantBaseline="central" style={{ fontSize: '11px', fill: '#a05a4a' }}>
                {n.sub}
              </text>
              {n.tag && (
                <text x={p.x} y={p.y + BH / 2 + 13} textAnchor="middle" dominantBaseline="central" style={{ fontSize: '10px', fontStyle: 'italic', fill: '#9a8a7a' }}>
                  {n.tag}
                </text>
              )}
            </g>
          );
        })}

        {/* Invloeden op de ademdrang */}
        <line x1={CX} y1={330} x2={CX} y2={CY + R + BH / 2 + 3} stroke="#8a9a8a" strokeWidth="1.5" strokeDasharray="4 4" markerEnd="url(#vc-arrow-soft)" />
        <text x={CX} y={340} textAnchor="middle" dominantBaseline="central" style={{ fontSize: '10px', letterSpacing: '0.08em', fill: '#8a8070', fontWeight: 500 }}>
          WAT DE ADEMDRANG VERSTERKT
        </text>

        {inputs.map((c, i) => {
          const x = chipX[i % 2];
          const y = chipY[Math.floor(i / 2)];
          return (
            <g key={i}>
              <rect x={x} y={y} width={chipW} height={chipH} rx="10" ry="10" fill="#f1f4ef" stroke="#cdd8c9" strokeWidth="1" strokeDasharray="4 3" />
              <text x={x + chipW / 2} y={y + 18} textAnchor="middle" dominantBaseline="central" style={{ fontSize: '12px', fontWeight: 600, fill: '#4f5f4f' }}>
                {c.label}
              </text>
              <text x={x + chipW / 2} y={y + 35} textAnchor="middle" dominantBaseline="central" style={{ fontSize: '11px', fill: '#6f7f6f' }}>
                {c.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
