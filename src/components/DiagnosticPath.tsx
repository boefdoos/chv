const steps = [
  { specialist: 'Huisarts',   test: 'Bloedonderzoek, urinetest',  icon: '?' },
  { specialist: 'Cardioloog', test: 'ECG, echocardiogram',         icon: '??' },
  { specialist: 'Longarts',   test: 'Spirometrie, longfunctie',    icon: '?' },
  { specialist: 'Maag-darm',  test: 'Gastroscopie, bloedtest',     icon: '?' },
  { specialist: 'Neuroloog',  test: 'Neurologisch onderzoek',      icon: '?' },
];

const correctTests = [
  { label: 'Capnografie',          desc: 'Meet CO? in uitgeademde lucht in real-time', tag: 'Goudstandaard' },
  { label: 'Arterieel bloedgas',   desc: 'Meet PaCO? en pH direct in het bloed',       tag: 'Zeker bewijs'  },
  { label: 'Nijmegen-vragenlijst', desc: 'Gevalideerde screeningstest (≥23/64)',        tag: 'Eerste stap'   },
];

export default function DiagnosticPath() {
  return (
    <div className="py-2">
      <div className="relative max-w-[480px] mx-auto">
        <div
          className="absolute left-[28px] top-4 w-[2px] bg-sand-300"
          style={{ height: steps.length * 60 + 8 + 'px' }}
        />
        <div className="space-y-2">
          {steps.map((step, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="relative shrink-0 w-[56px] flex justify-center pt-1">
                <div className="w-9 h-9 rounded-full bg-sand-100 border-2 border-sand-300 flex items-center justify-center text-base z-10 relative">
                  {step.icon}
                </div>
              </div>
              <div className="flex-1 bg-sand-50 border border-sand-300 rounded-xl px-4 py-3 flex items-center justify-between gap-3 min-h-[52px]">
                <div>
                  <div className="text-[13px] font-medium text-sand-700">{step.specialist}</div>
                  <div className="text-[12px] text-sand-500 mt-0.5">{step.test}</div>
                </div>
                <span className="text-[12px] font-medium text-sage-400 bg-sage-50 px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
                  Normaal
                </span>
              </div>
            </div>
          ))}
          <div className="flex items-start gap-4 pt-2">
            <div className="shrink-0 w-[56px] flex justify-center pt-1">
              <div className="w-9 h-9 rounded-full bg-terra-100 border-2 border-terra-300 flex items-center justify-center text-base z-10 relative">?</div>
            </div>
            <div className="flex-1 bg-terra-50 border border-terra-200 rounded-xl px-4 py-4">
              <p className="text-[13px] text-terra-400 italic leading-relaxed">
                &ldquo;We kunnen niets vinden. Het is waarschijnlijk stress.&rdquo;
              </p>
              <p className="text-[11px] text-terra-300 mt-2">Gemiddeld 3–5 jaar na de eerste klachten</p>
            </div>
          </div>
          <div className="flex justify-center py-4">
            <div className="flex flex-col items-center gap-1.5">
              <div className="text-[11px] uppercase tracking-wider text-sand-400 font-medium">Wat wél helpt</div>
              <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
                <path d="M10 2 L10 14 M4 10 L10 16 L16 10" stroke="#9ecaaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          {correctTests.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="shrink-0 w-[56px] flex justify-center pt-1">
                <div className="w-9 h-9 rounded-full bg-sage-100 border-2 border-sage-200 flex items-center justify-center text-[14px] font-bold text-sage-400 z-10 relative">?</div>
              </div>
              <div className="flex-1 bg-sage-50 border border-sage-100 rounded-xl px-4 py-3 flex items-center justify-between gap-3 min-h-[52px]">
                <div>
                  <div className="text-[13px] font-medium text-sage-500">{item.label}</div>
                  <div className="text-[12px] text-sand-500 mt-0.5">{item.desc}</div>
                </div>
                <span className="text-[11px] font-medium text-sage-400 bg-white px-2.5 py-1 rounded-full whitespace-nowrap shrink-0 border border-sage-100">
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}