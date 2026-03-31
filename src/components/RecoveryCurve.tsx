export default function RecoveryCurve() {
  // Verwacht herstel: rechte lijn omhoog
  const expected = "M 40,220 L 440,40";

  // Werkelijk herstel: golvend pad met terugvallen maar overall omhoog
  const actual = "M 40,220 C 80,210 90,195 120,185 C 140,178 145,190 160,195 C 175,200 185,188 210,170 C 230,158 235,172 255,178 C 270,183 278,168 305,148 C 325,133 330,148 350,155 C 365,160 375,142 400,120 C 420,104 435,90 440,80";

  return (
    <div className="py-2">
      <svg
        viewBox="0 0 480 270"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full max-w-[520px] mx-auto block"
        style={{ fontFamily: 'inherit' }}
      >
        {/* Achtergrond */}
        <rect x="30" y="30" width="420" height="200" rx="6" fill="#faf8f5" />

        {/* Rasterlijnen */}
        {[0.25, 0.5, 0.75].map((f, i) => (
          <line key={i}
            x1="30" y1={30 + f * 200}
            x2="450" y2={30 + f * 200}
            stroke="#e8e0d8" strokeWidth="1" strokeDasharray="3 3"
          />
        ))}

        {/* Assen */}
        <line x1="40" y1="230" x2="450" y2="230" stroke="#c8bdb0" strokeWidth="1.5" />
        <line x1="40" y1="30" x2="40" y2="230" stroke="#c8bdb0" strokeWidth="1.5" />

        {/* As-labels */}
        <text x="240" y="258" fontSize="11" textAnchor="middle" fill="#a09080">tijd</text>
        <text x="14" y="134" fontSize="11" textAnchor="middle" fill="#a09080"
          transform="rotate(-90, 14, 134)">beter</text>

        {/* Verwachte lijn (gestippeld, lichtgrijs) */}
        <path d={expected}
          fill="none"
          stroke="#c8bdb0"
          strokeWidth="2"
          strokeDasharray="6 4"
        />
        {/* Label verwacht */}
        <text x="400" y="34" fontSize="10.5" fill="#b0a090" textAnchor="end">verwacht</text>

        {/* Werkelijke lijn */}
        <path d={actual}
          fill="none"
          stroke="#7aaa8a"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Label werkelijk */}
        <text x="448" y="76" fontSize="10.5" fill="#5a9870" textAnchor="end">werkelijk</text>

        {/* Terugval-annotaties */}
        {/* Terugval 1 */}
        <line x1="160" y1="185" x2="160" y2="200" stroke="#d4845a" strokeWidth="1" strokeDasharray="2 2" />
        <text x="160" y="213" fontSize="9.5" textAnchor="middle" fill="#c4724a">stress</text>

        {/* Terugval 2 */}
        <line x1="255" y1="175" x2="255" y2="200" stroke="#d4845a" strokeWidth="1" strokeDasharray="2 2" />
        <text x="255" y="213" fontSize="9.5" textAnchor="middle" fill="#c4724a">verkoudheid</text>

        {/* Terugval 3 */}
        <line x1="350" y1="152" x2="350" y2="200" stroke="#d4845a" strokeWidth="1" strokeDasharray="2 2" />
        <text x="350" y="213" fontSize="9.5" textAnchor="middle" fill="#c4724a">slechte week</text>

        {/* Einddoel-pijl */}
        <circle cx="440" cy="80" r="5" fill="#7aaa8a" opacity="0.8" />
      </svg>

      {/* Legenda */}
      <div className="flex gap-6 justify-center mt-2">
        <div className="flex items-center gap-2">
          <svg width="24" height="10" viewBox="0 0 24 10">
            <line x1="0" y1="5" x2="24" y2="5" stroke="#c8bdb0" strokeWidth="2" strokeDasharray="5 3" />
          </svg>
          <span className="text-[11px] text-sand-500">wat je hoopt</span>
        </div>
        <div className="flex items-center gap-2">
          <svg width="24" height="10" viewBox="0 0 24 10">
            <path d="M0,7 C6,7 8,3 12,3 C16,3 18,7 24,5" fill="none" stroke="#7aaa8a" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span className="text-[11px] text-sand-500">hoe het meestal gaat</span>
        </div>
      </div>
    </div>
  );
}
