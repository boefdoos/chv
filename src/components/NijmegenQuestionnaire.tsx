import { useState } from 'react';

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
  const [answers, setAnswers] = useState<number[]>(new Array(16).fill(-1));
  const [submitted, setSubmitted] = useState(false);

  const setAnswer = (qi: number, val: number) => {
    const next = [...answers];
    next[qi] = val;
    setAnswers(next);
  };

  const allAnswered = answers.every(a => a >= 0);
  const total = answers.reduce((sum, a) => sum + (a >= 0 ? a : 0), 0);

  const handleSubmit = () => {
    if (allAnswered) setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers(new Array(16).fill(-1));
    setSubmitted(false);
  };

  if (submitted) {
    const isElevated = total > 23;
    return (
      <div className="py-4">
        <div className={`rounded-2xl p-6 md:p-8 ${isElevated ? 'bg-terra-50 border border-terra-100' : 'bg-sage-50 border border-sage-100'}`}>
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
                Dit is een screening, geen diagnose. Een hoge score betekent niet automatisch dat je chronisch hyperventileert, maar het is een reden om dit met je huisarts te bespreken. Een capnografiemeting of arterieel bloedgas kan uitsluitsel geven.
              </p>
            </div>
          ) : (
            <div className="space-y-3 text-[14px] text-sand-600 leading-relaxed">
              <p>
                Een score van 23 of lager maakt hyperventilatie <strong className="text-sand-700 font-medium">minder waarschijnlijk</strong> als hoofdoorzaak van je klachten, maar sluit het niet volledig uit.
              </p>
              <p>
                De Nijmegen-vragenlijst is gevoelig maar niet specifiek. Als je toch het gevoel hebt dat je klachten bij het beeld passen, is een gesprek met je huisarts alsnog zinvol.
              </p>
            </div>
          )}

          <div className="mt-5 pt-4 border-t border-sand-200 text-[12px] text-sand-500">
            <p>Afkapscore: &gt;23 (van Dixhoorn & Duivenvoorden, 1985). Je antwoorden worden niet opgeslagen of verstuurd.</p>
          </div>

          <button
            onClick={handleReset}
            className="mt-4 px-5 py-2 text-[13px] text-sand-600 bg-white border border-sand-300 rounded-lg cursor-pointer hover:border-sage-300 transition-colors"
          >
            Opnieuw invullen
          </button>
        </div>
      </div>
    );
  }

  const answeredCount = answers.filter(a => a >= 0).length;

  return (
    <div className="py-4">
      <div className="space-y-1">
        {questions.map((q, qi) => (
          <div
            key={qi}
            className={`rounded-lg p-3 md:p-4 transition-colors ${answers[qi] >= 0 ? 'bg-sand-50' : 'bg-white'}`}
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
                    className={`flex-1 py-1.5 md:py-2 rounded text-[11px] md:text-[12px] border transition-all cursor-pointer ${
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
    </div>
  );
}
