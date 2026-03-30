const steps = [
  { specialist: 'Huisarts',   test: 'Bloedonderzoek, urinetest',  color: '#c8bdb0' },
  { specialist: 'Cardioloog', test: 'ECG, echocardiogram',         color: '#c8bdb0' },
  { specialist: 'Longarts',   test: 'Spirometrie, longfunctie',    color: '#c8bdb0' },
  { specialist: 'Maag-darm',  test: 'Gastroscopie, bloedtest',     color: '#c8bdb0' },
  { specialist: 'Neuroloog',  test: 'Neurologisch onderzoek',      color: '#c8bdb0' },
];

export default function DiagnosticPath() {
  return (
    <div className="py-2">
      <div className="relative max-w-[480px] mx-auto">

        {/* Verticale lijn */}
        <div className="absolute left-[19px] top-5 w-[2px] bg-sand-300" style={{ height: steps.length * 64 + 'px' }} />

        <div className="space-y-3">
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-4">
              {/* Knoop */}
              <div className="shrink-0 w-10 flex justify-center">
                <div className="w-[38px] h-[38px] rounded-full bg-sand-100 border-2 border-sand-300 flex items-center justify-center z-10 relative">
                  <span className="text-[11px] font-medium text-sand-500">{i + 1}</span>
                </div>
              </div>
              {/* Kaart */}
              <div className="flex-1 bg-sand-50 border border-sand-300 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
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

          {/* Conclusie */}
          <div className="flex items-start gap-4 pt-1">
            <div className="shrink-0 w-10 flex justify-center pt-1">
              <div className="w-[38px] h-[38px] rounded-full bg-terra-100 border-2 border-terra-300 flex items-center justify-center z-10 relative text-terra-400 font-bold text-[15px]">
                !
              </div>
            </div>
            <div className="flex-1 bg-terra-50 border border-terra-200 rounded-xl px-4 py-4">
              <p className="text-[13px] text-terra-400 italic leading-relaxed">
                "We kunnen niets vinden. Het is waarschijnlijk stress."
              </p>
              <p className="text-[12px] text-terra-300 mt-2">
                Vaak jarenlang, na meerdere specialisten
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
