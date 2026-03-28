import { useState, useRef } from 'react';

const questions = [
  'Pijn op de borst',
  'Gespannen gevoel',
  'Wazig zien',
  'Duizeligheid',
  'Verward of niet helder kunnen denken',
  'Snel en diep ademen',
  'Kortademigheid',
  'Beklemd gevoel op de borst',
  'Opgeblazen gevoel in de buik',
  'Tintelingen in de vingers',
  'Niet diep kunnen ademen',
  'Stijve vingers of armen',
  'Strakheid rond de mond',
  'Koude handen of voeten',
  'Hartkloppingen',
  'Angstig gevoel',
];

const scoreLabels = ['Nooit', 'Zelden', 'Soms', 'Vaak', 'Zeer vaak'];

export default function NijmegenQuestionnaire() {
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<number[]>(new Array(16).fill(-1));
  const [submitted, setSubmitted] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const setAnswer = (qi: number, val: number) => {
    const next = [...answers];
    next[qi] = val;
    setAnswers(next);
  };

  const allAnswered = answers.every(a => a >= 0);
  const total = answers.reduce((sum, a) => sum + (a >= 0 ? a : 0), 0);

  const handleSubmit = () => {
    if (allAnswered) {
      setSubmitted(true);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const handleReset = () => {
    setAnswers(new Array(16).fill(-1));
    setSubmitted(false);
  };

  const answeredCount = answers.filter(a => a >= 0).length;

  // Collapsed state
  if (!open) {
    return (
      <div className="py-4">
        <button
          onClick={() => setOpen(true)}
          className="w-full text-left bg-sand-50 border border-sand-300 rounded-2xl p-6 md:p-8 cursor-pointer hover:border-sage-200 transition-colors group"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-wider text-sand-500 mb-1">Zelftest</div>
              <div className="font-serif text-[20px] font-normal text-sand-700 mb-2">Nijmegen-vragenlijst</div>
              <p className="text-[13px] text-sand-500 leading-relaxed">
                16 vragen, 2 minuten. Je antwoorden worden niet opgeslagen of verstuurd.
              </p>
            </div>
            <div className="w-10 h-10 min-w-[40px] rounded-full bg-sage-50 flex items-center justify-center shrink-0 group-hover:bg-sage-100 transition-colors">
              <svg className="w-4 h-4 text-sage-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </button>
      </div>
    );
  }

  // Result state
  if (submitted) {
    const isElevated = total > 23;
    return (
      <div className="py-4" ref={resultRef}>
        <div className="bg-sand-50 border border-sand-300 rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <div className="text-[11px] font-medium uppercase tracking-wider text-sand-500">Resultaat</div>
            <button onClick={() => setOpen(false)} className="text-[12px] text-sand-500 bg-transparent border-none cursor-pointer hover:text-sage-300">Inklappen</button>
          </div>

          <div className={`rounded-xl p-6 ${isElevated ? 'bg-terra-50 border border-terra-100' : 'bg-sage-50 border border-sage-100'}`}>
            <div className="text-center mb-4">
              <div className="text-[40px] font-serif font-light" style={{ color: isElevated ? '#a0522d' : '#5a7a5a' }}>
                {total}
              </div>
              <div className="text-[13px] text-sand-500">van 64 punten</div>
            </div>

            {isElevated ? (
              <div className="space-y-3 text-[14px] text-sand-600 leading-relaxed">
                <p>
                  Een score boven 23 wijst op een <strong className="text-sand-700 font-medium">verhoogde kans op hyperventilatie</strong> als (mede-)oorzaak van je klachten.
                </p>
                <p>
                  Dit is een screening, geen diagnose. Een hoge score is een reden om dit met je huisarts te bespreken. Een capnografiemeting of arterieel bloedgas kan uitsluitsel geven.
                </p>
              </div>
            ) : (
              <div className="space-y-3 text-[14px] text-sand-600 leading-relaxed">
                <p>
                  Een score van 23 of lager maakt hyperventilatie <strong className="text-sand-700 font-medium">minder waarschijnlijk</strong> als hoofdoorzaak, maar sluit het niet volledig uit.
                </p>
                <p>
                  Als je toch het gevoel hebt dat je klachten bij het beeld passen, is een gesprek met je huisarts alsnog zinvol.
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-[11px] text-sand-500">
              Afkapscore: &gt;23 (van Dixhoorn & Duivenvoorden, 1985). Antwoorden niet opgeslagen.
            </div>
            <button
              onClick={handleReset}
              className="px-4 py-1.5 text-[12px] text-sand-600 bg-white border border-sand-300 rounded-lg cursor-pointer hover:border-sage-300 transition-colors"
            >
              Opnieuw
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Open/answering state
  return (
    <div className="py-4">
      <div className="bg-sand-50 border border-sand-300 rounded-2xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-wider text-sand-500 mb-1">Zelftest</div>
            <div className="font-serif text-[20px] font-normal text-sand-700">Nijmegen-vragenlijst</div>
          </div>
          <button onClick={() => setOpen(false)} className="text-[12px] text-sand-500 bg-transparent border-none cursor-pointer hover:text-sage-300">Inklappen</button>
        </div>
        <p className="text-[13px] text-sand-500 mb-5 leading-relaxed">
          Geef per klacht aan hoe vaak je dit ervaart. Dit is een screening, geen diagnose.
        </p>

        <div className="space-y-1">
          {questions.map((q, qi) => (
            <div
              key={qi}
              className={`rounded-lg p-3 md:p-4 transition-colors ${answers[qi] >= 0 ? 'bg-white/60' : 'bg-white'}`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <div className="md:w-[240px] shrink-0 text-[14px] text-sand-700">
                  <span className="text-sand-400 text-[12px] mr-2">{qi + 1}.</span>
                  {q}
                </div>
                <div className="flex gap-1 md:gap-1.5 flex-1">
                  {scoreLabels.map((label, val) => (
                    <button
                      key={val}
                      onClick={() => setAnswer(qi, val)}
                      className={`flex-1 py-2 md:py-2 rounded text-[11px] md:text-[12px] border transition-all cursor-pointer ${
                        answers[qi] === val
                          ? 'bg-sage-300 text-white border-sage-300 font-medium'
                          : 'bg-white text-sand-500 border-sand-200 hover:border-sage-200'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div className="text-[13px] text-sand-500">
            {answeredCount}/16 beantwoord
          </div>
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className={`px-6 py-2.5 rounded-lg text-[14px] font-medium border-none transition-all cursor-pointer ${
              allAnswered
                ? 'bg-sage-300 text-white hover:bg-sage-400'
                : 'bg-sand-200 text-sand-400 cursor-not-allowed'
            }`}
          >
            Bekijk resultaat
          </button>
        </div>

        <div className="mt-4 pt-3 border-t border-sand-200 text-[11px] text-sand-500">
          Bron: van Dixhoorn J, Duivenvoorden HJ (1985). <em>Efficacy of Nijmegen Questionnaire in recognition of the hyperventilation syndrome.</em> J Psychosom Res, 29(2), 199-206.
        </div>
      </div>
    </div>
  );
}
