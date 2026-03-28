const steps = [
  { label: 'Te veel ademen', sub: 'CO₂ daalt' },
  { label: 'Nieren passen aan', sub: 'Buffer verdwijnt' },
  { label: 'Setpoint verschuift', sub: 'Laag wordt "normaal"' },
  { label: 'Alarm bij stijging', sub: '"Meer ademen!"' },
];

export default function ViciousCircle() {
  const CX = 220;
  const CY = 200;
  const R = 130;

  // Positions: top, right, bottom, left (clockwise)
  const angles = [-90, 0, 90, 180];
  const positions = angles.map((a) => {
    const rad = a * (Math.PI / 180);
    return { x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) };
  });

  const BW = 140;
  const BH = 56;

  // Arc paths between boxes
  const makeArc = (i: number) => {
    const fromAngle = angles[i];
    const toAngle = angles[(i + 1) % 4] + (i === 3 ? 360 : 0);
    const startDeg = fromAngle + 20;
    const endDeg = toAngle - 20;
    const startRad = startDeg * (Math.PI / 180);
    const endRad = endDeg * (Math.PI / 180);
    const x1 = CX + R * Math.cos(startRad);
    const y1 = CY + R * Math.sin(startRad);
    const x2 = CX + R * Math.cos(endRad);
    const y2 = CY + R * Math.sin(endRad);
    return `M${x1.toFixed(1)} ${y1.toFixed(1)} A${R} ${R} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  };

  return (
    <div style={{ maxWidth: '440px', margin: '0 auto' }}>
      <svg viewBox="0 0 440 400" width="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker
            id="vc-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path
              d="M2 2L8 5L2 8"
              fill="none"
              stroke="#b07858"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>

        {/* Arc arrows */}
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={makeArc(i)}
            fill="none"
            stroke="#b07858"
            strokeWidth="1.5"
            markerEnd="url(#vc-arrow)"
          />
        ))}

        {/* Step boxes */}
        {steps.map((step, i) => {
          const pos = positions[i];
          const x = pos.x - BW / 2;
          const y = pos.y - BH / 2;

          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width={BW}
                height={BH}
                rx="12"
                ry="12"
                fill="#fce8e2"
                stroke="#e8c0b0"
                strokeWidth="1"
              />
              <text
                x={pos.x}
                y={pos.y - 7}
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fontSize: '13px', fontWeight: 600, fill: '#7a3a2a' }}
              >
                {step.label}
              </text>
              <text
                x={pos.x}
                y={pos.y + 12}
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fontSize: '11px', fill: '#a05a4a' }}
              >
                {step.sub}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
