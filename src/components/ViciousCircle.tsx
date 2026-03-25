import { useEffect, useRef } from 'react';

const steps = [
  { label: 'Te veel ademen', sub: 'CO2 daalt', angle: -90 },
  { label: 'Nieren passen aan', sub: 'Buffer verdwijnt', angle: 0 },
  { label: 'Setpoint verschuift', sub: 'Laag wordt "normaal"', angle: 90 },
  { label: 'Alarm bij stijging', sub: '"Meer ademen!"', angle: 180 },
];

export default function ViciousCircle() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const dot = dotRef.current;
    if (!dot) return;

    let progress = 0;
    let animId: number;

    const animate = () => {
      progress += 0.15;
      if (progress >= 360) progress = 0;
      const r = 130;
      const cx = 180;
      const cy = 170;
      const rad = (progress - 90) * (Math.PI / 180);
      const x = cx + r * Math.cos(rad);
      const y = cy + r * Math.sin(rad);
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  const cx = 180;
  const cy = 170;
  const r = 130;

  const positions = steps.map((s) => {
    const rad = s.angle * (Math.PI / 180);
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  });

  // Arrow SVG path between two points along the circle arc
  const arrowPaths = steps.map((_, i) => {
    const from = positions[i];
    const to = positions[(i + 1) % 4];
    const midAngle = ((steps[i].angle + steps[(i + 1) % 4].angle) / 2 + (i === 3 ? 180 : 0)) * (Math.PI / 180);
    const bulge = i === 3 ? -30 : 30;
    const mx = cx + (r + bulge) * Math.cos(midAngle);
    const my = cy + (r + bulge) * Math.sin(midAngle);

    // Offset start/end to avoid overlapping boxes
    const dx1 = to.x - from.x;
    const dy1 = to.y - from.y;
    const len = Math.sqrt(dx1 * dx1 + dy1 * dy1);
    const ox = (dx1 / len) * 40;
    const oy = (dy1 / len) * 40;

    return `M${from.x + ox} ${from.y + oy} Q${mx} ${my} ${to.x - ox} ${to.y - oy}`;
  });

  return (
    <div className="relative" style={{ width: '360px', height: '340px', margin: '0 auto' }}>
      {/* Arrow paths */}
      <svg
        viewBox="0 0 360 340"
        width="360"
        height="340"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <defs>
          <marker id="vc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M2 1.5L7.5 5L2 8.5" fill="none" stroke="#C08B68" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        {arrowPaths.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="#C08B68" strokeWidth="1.2" markerEnd="url(#vc-arrow)" />
        ))}
      </svg>

      {/* Traveling dot */}
      <div
        ref={dotRef}
        className="absolute w-2 h-2 rounded-full"
        style={{
          background: '#C08B68',
          opacity: 0.6,
          transform: 'translate(-4px, -4px)',
          transition: 'none',
        }}
      />

      {/* Step boxes */}
      {steps.map((step, i) => {
        const pos = positions[i];
        return (
          <div
            key={i}
            className="absolute flex flex-col items-center text-center"
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              transform: 'translate(-50%, -50%)',
              width: '120px',
            }}
          >
            <div className="bg-[#fce8e2] border border-[#e8c0b0] rounded-xl px-3 py-2.5 w-full">
              <div style={{ fontSize: '12px', fontWeight: 500, color: '#7a3a2a', lineHeight: 1.3 }}>
                {step.label}
              </div>
              <div style={{ fontSize: '10px', color: '#a05a4a', marginTop: '2px', lineHeight: 1.3 }}>
                {step.sub}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
