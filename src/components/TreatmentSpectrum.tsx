const tiers = [
  {
    label: 'Eerstelijns',
    color: '#7aaa8a',
    bg: '#eef4f0',
    border: '#b0d8bc',
    items: ['Ademhalingsretraining', 'Buteyko-methode'],
  },
  {
    label: 'Aanvullend',
    color: '#8a9a90',
    bg: '#f5f2ee',
    border: '#d0c8c0',
    items: ['Cognitieve gedragstherapie', 'HRV-biofeedback', 'Capnografie-gestuurd'],
  },
  {
    label: 'Ondersteunend',
    color: '#a09080',
    bg: '#f5f0eb',
    border: '#d8cfc8',
    items: ['Medicatie (tricyclisch, SSRI)', 'Levensstijl'],
  },
  {
    label: 'Experimenteel',
    color: '#9a7aaa',
    bg: '#f2eef5',
    border: '#c8b8d8',
    items: ['Vaguszenuwstimulatie', 'Alpha-2 agonisten', 'Deep brain stimulation'],
  },
];

export default function TreatmentSpectrum() {
  return (
    <div className="py-2">
      {/* Horizontale pijl */}
      <div className="flex items-center gap-1 mb-5 max-w-[560px] mx-auto px-2">
        {tiers.map((tier, i) => (
          <div key={i} className="flex-1 flex items-center">
            <div
              className="h-[3px] flex-1"
              style={{ background: tier.color, opacity: 0.5 }}
            />
            {i < tiers.length - 1 && (
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ flexShrink: 0 }}>
                <path d="M0 4 H6 M3 1 L6 4 L3 7" stroke={tiers[i + 1].color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
              </svg>
            )}
          </div>
        ))}
      </div>

      {/* Kolommen */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-[560px] mx-auto">
        {tiers.map((tier, i) => (
          <div
            key={i}
            className="rounded-xl p-3 flex flex-col gap-2"
            style={{ background: tier.bg, border: `1px solid ${tier.border}` }}
          >
            {/* Tierlabel */}
            <div
              className="text-[10px] font-semibold uppercase tracking-wider pb-2 border-b"
              style={{ color: tier.color, borderColor: tier.border }}
            >
              {tier.label}
            </div>
            {/* Items */}
            <div className="flex flex-col gap-1.5">
              {tier.items.map((item, j) => (
                <div
                  key={j}
                  className="text-[12px] leading-tight"
                  style={{ color: '#6a6058' }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legenda-as */}
      <div className="flex justify-between max-w-[560px] mx-auto mt-3 px-1">
        <span className="text-[10px] text-sand-400">meer bewijs</span>
        <span className="text-[10px] text-sand-400">minder bewijs</span>
      </div>
    </div>
  );
}
