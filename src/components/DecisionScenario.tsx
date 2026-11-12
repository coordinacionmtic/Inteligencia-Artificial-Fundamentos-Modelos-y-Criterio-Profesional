import { AlertTriangle, CheckCircle2, ShieldCheck } from 'lucide-react';
import type { DecisionScenarioData } from '../types/learning';

interface DecisionScenarioProps {
  scenario: DecisionScenarioData;
  selectedChoiceId?: string;
  onSelectChoice: (scenarioId: string, choiceId: string) => void;
}

export function DecisionScenario({
  scenario,
  selectedChoiceId,
  onSelectChoice,
}: DecisionScenarioProps) {
  const chosen = scenario.choices.find((c) => c.id === selectedChoiceId);

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5">
      <div className="space-y-1.5 border-b border-slate-200 pb-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span className="font-mono font-semibold text-blue-700">{scenario.indexLabel}</span>
          <span aria-hidden="true">·</span>
          <span>{scenario.role}</span>
        </div>
        <h3 className="text-lg font-semibold text-slate-900">{scenario.title}</h3>
        <p className="text-sm leading-relaxed text-slate-700">{scenario.situation}</p>
        <p className="text-sm font-semibold text-slate-900 pt-1">{scenario.dilemma}</p>
      </div>

      <div className="grid gap-3">
        {scenario.choices.map((choice, idx) => {
          const isSelected = selectedChoiceId === choice.id;
          return (
            <button
              key={choice.id}
              type="button"
              onClick={() => onSelectChoice(scenario.id, choice.id)}
              className={`w-full rounded-lg border p-4 text-left transition-colors ${
                isSelected
                  ? choice.isOptimal
                    ? 'border-emerald-300 bg-emerald-50/70'
                    : 'border-amber-300 bg-amber-50/70'
                  : 'border-slate-200 bg-white hover:bg-slate-50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs font-semibold text-slate-500 pt-0.5">
                    Opción {idx + 1}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{choice.label}</div>
                    <div className="text-xs text-slate-600 mt-1">{choice.summary}</div>
                  </div>
                </div>
                {isSelected && (
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold shrink-0 ${
                      choice.isOptimal ? 'text-emerald-700' : 'text-amber-800'
                    }`}
                  >
                    {choice.isOptimal ? (
                      <>
                        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                        Seleccionada
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                        Con riesgo
                      </>
                    )}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {chosen && (
        <div
          role="status"
          className={`rounded-xl border p-4 sm:p-5 space-y-4 ${
            chosen.isOptimal
              ? 'border-emerald-200 bg-emerald-50/70'
              : 'border-amber-200 bg-amber-50/70'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <ShieldCheck
                className={`h-4 w-4 ${chosen.isOptimal ? 'text-emerald-700' : 'text-amber-700'}`}
                aria-hidden="true"
              />
              <span>Análisis de consecuencias</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono tabular-nums text-slate-700">
              <span>Rigor: {chosen.rigorScore}</span>
              <span aria-hidden="true">·</span>
              <span>Ética: {chosen.ethicsScore}</span>
              <span aria-hidden="true">·</span>
              <span>Supervisión: {chosen.humanOversight}</span>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-slate-800">{chosen.consequence}</p>

          <div className="border-t border-black/10 pt-3 text-xs leading-relaxed text-slate-800">
            <strong className="font-semibold text-slate-900">Criterio recomendado:</strong>{' '}
            {chosen.recommendation}
          </div>
        </div>
      )}
    </article>
  );
}
