import { useState } from 'react';

type Level = 'laag' | 'normaal' | 'hoog';

const data: Record<Level, { position: string; text: string; tags: { label: string; type: string }[] }> = {
  laag: {
    position: '16%',
    text: 'Te weinig CO2. Bloedvaten vernauwen, zenuwen worden prikkelbaar, je hersenen krijgen minder zuurstof.',
    tags: [
      { label: 'Bloedvaten vernauwen', type: 'negative' },
      { label: 'Zenuwen prikkelbaar', type: 'negative' },
      { label: 'Minder O2 naar hersenen', type: 'negative' },
    ],
  },
  normaal: {
    position: '50%',
    text: 'Je CO2 is in balans. De chemoreceptoren zijn tevreden, je ademhaling is rustig.',
    tags: [
      { label: 'Bloedvaten ontspannen', type: 'positive' },
      { label: 'Zenuwen kalm', type: 'positive' },
      { label: 'Zuurstofafgifte normaal', type: 'positive' },
    ],
  },
  hoog: {
    position: '84%',
    text: 'Te veel CO2. De chemoreceptoren slaan alarm: meer ademen! Je ademhaling versnelt automatisch.',
    tags: [
      { label: 'Ademhaling versnelt', type: 'warning' },
      { label: 'Alarm in hersenstam', type: 'warning' },
      { label: 'Corrigeert zichzelf', type: 'positive' },
    ],
  },
};

const tagColors: Record<string, string> = {
  negative: 'bg-red-50 text-red-700',
  positive: 'bg-sage-50 text-sage-400',
  warning: 'bg-terra-50 text-terra-400',
};

export default function CO2Bar() {
  const [level, setLevel] = useState<Level>('normaal');
  const current = data[level];

  return (
    <div className="py-6">
      <div className="relative h-[52px] rounded-[26px] overflow-visible mb-3"
        style={{ background: 'linear-gradient(to right, #d0e6f2, #b5d8cc, #DAE9E3, #e8d5c4, #e8c4ad)' }}>
        <span className="absolute top-1/2 -translate-y-1/2 left-[12%] text-[11px] text-blue-600/60 hidden md:block">Te laag</span>
        <span className="absolute top-1/2 -translate-y-1/2 left-[45%] text-[11px] text-sage-400/60 hidden md:block">Normaal</span>
        <span className="absolute top-1/2 -translate-y-1/2 left-[78%] text-[11px] text-terra-400/60 hidden md:block">Te hoog</span>
        <div
          className="absolute top-1 bottom-1 w-1 bg-sand-700 rounded-sm z-10 transition-[left] duration-[600ms]"
          style={{ left: current.position, transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        >
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[11px] font-medium text-sand-700 whitespace-nowrap bg-sand-50 px-2 py-0.5 rounded border border-sand-300">
            CO2-niveau
          </div>
          <div className="absolute -inset-x-2 -inset-y-1 rounded-lg bg-sand-700/[0.08] -z-10" />
        </div>
      </div>
      <div className="flex gap-2 justify-center mt-5 flex-wrap">
        {(['laag', 'normaal', 'hoog'] as Level[]).map((l) => (
          <button
            key={l}
            onClick={() => setLevel(l)}
            className={`px-5 py-2 rounded-full text-[13px] border transition-all cursor-pointer ${
              level === l
                ? 'bg-sage-300 text-white border-sage-300'
                : 'bg-sand-50 text-sand-600 border-sand-300 hover:border-sage-300 hover:text-sage-300 hover:-translate-y-px'
            }`}
          >
            {l === 'laag' ? 'Te weinig CO2' : l === 'normaal' ? 'Normaal' : 'Te veel CO2'}
          </button>
        ))}
      </div>
      <p className="text-center text-[14px] text-sand-600 mt-4 min-h-[48px] leading-relaxed transition-opacity">
        {current.text}
      </p>
      <div className="flex gap-2 justify-center mt-3 flex-wrap">
        {current.tags.map((tag, i) => (
          <span
            key={`${level}-${i}`}
            className={`px-3.5 py-1 rounded-full text-[12px] ${tagColors[tag.type]}`}
            style={{ animation: `fadeUp 0.4s ease ${i * 120}ms both` }}
          >
            {tag.label}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
