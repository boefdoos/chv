import { useEffect, useRef } from 'react';

const steps = [
  { label: 'Te veel ademen', sub: 'CO₂ daalt' },
  { label: 'Nieren passen aan', sub: 'Buffer verdwijnt' },
  { label: 'Setpoint verschuift', sub: 'Laag wordt "normaal"' },
  { label: 'Alarm bij stijging', sub: '"Meer ademen!"' },
];

export default function ViciousCircle() {
  const dotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const dot = dotRef.current;
    if (!dot) return;

    let progress = 0;
    let animId: number;
    const R = 120;
    const CX = 200;
    const CY = 190;

    const animate = () => {
      progress += 0.12;
      if (progress >= 360) progress -= 360;
      const rad = (progress - 90) * (Math.PI / 180);
      dot.setAttribute('cx', String(CX + R * Math.cos(rad)));
      dot.setAttribute('cy', String(CY + R * Math.sin(rad)));
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Center and radius of the circle
  const CX = 200;
  const CY = 190;
  const R = 120;

  // Positions: top, right, bottom, left (clockwise)
  const angles = [-90, 0, 90, 180];
  const positions = angles.map((a) => {
    const rad = a * (Math.PI / 180);
    return { x: CX + R * Math.cos(rad), y: CY + R * Math.sin(rad) };
  });

  // Box dimensions
  const BW = 130;
  const BH = 52;

  // Build arc paths between boxes
  // Each arc goes from one box edge to the next, following the circle
  const makeArc = (i: number) => {
    const from = positions[i];
    const to = positions[(i + 1) % 4];
    const fromAngle = angles[i];
    const toAngle = angles[(i + 1) % 4] + (i === 3 ? 360 : 0);

    // Start/end offsets: move along the circle a bit past the box
    const startDeg = fromAngle + 22;
    const endDeg = toAngle - 22;

    const startRad = startDeg * (Math.PI / 180);
    const endRad = endDeg * (Math.PI / 180);

    const x1 = CX + R * Math.cos(startRad);
    const y1 = CY + R * Math.sin(startRad);
    const x2 = CX + R * Math.cos(endRad);
    const y2 = CY + R * Math.sin(endRad);

    // SVG arc: large arc if span > 180
    const span = endDeg - startDeg;
    const largeArc = span > 180 ? 1 : 0;

    return `M${x1.toFixed(1)} ${y1.toFixed(1)} A${R} ${R} 0 ${largeArc} 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <svg viewBox="0 0 400 380" width="100%" xmlns="http://www.w3.org/2000/svg">
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

        {/* Traveling dot */}
        <circle
          ref={dotRef}
          cx={CX}
          cy={CY - R}
          r="4"
          fill="#b07858"
          opacity="0.5"
        />

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
                rx="10"
                ry="10"
                fill="#fce8e2"
                stroke="#e8c0b0"
                strokeWidth="1"
              />
              <text
                x={pos.x}
                y={pos.y - 6}
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fontSize: '12px', fontWeight: 600, fill: '#7a3a2a' }}
              >
                {step.label}
              </text>
              <text
                x={pos.x}
                y={pos.y + 12}
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fontSize: '10px', fill: '#a05a4a' }}
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
