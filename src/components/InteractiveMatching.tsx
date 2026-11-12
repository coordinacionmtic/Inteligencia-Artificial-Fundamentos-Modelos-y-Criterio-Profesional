import { useMemo, useState } from 'react';
import { AlertCircle, CheckCircle2, HelpCircle, RotateCcw } from 'lucide-react';
import type { MatchingActivity } from '../types/learning';

interface InteractiveMatchingProps {
  activity: MatchingActivity;
  isSolved: boolean;
  onSolved: (activityId: string) => void;
}

export function InteractiveMatching({
  activity,
  isSolved,
  onSolved,
}: InteractiveMatchingProps) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>(() =>
    isSolved ? activity.pairs.map((p) => p.id) : []
  );
  const [lastFeedback, setLastFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [showHint, setShowHint] = useState(false);

  // Deterministic shuffled order for right column based on activity id
  const shuffledRight = useMemo(() => {
    const copy = [...activity.pairs];
    if (copy.length === 4) {
      return [copy[2], copy[0], copy[3], copy[1]];
    }
    return copy.reverse();
  }, [activity.pairs]);

  const handleSelectLeft = (id: string) => {
    if (matchedIds.includes(id)) return;
    setSelectedLeft((prev) => (prev === id ? null : id));
    setLastFeedback(null);
  };

  const handleSelectRight = (rightId: string) => {
    if (matchedIds.includes(rightId)) return;
    if (!selectedLeft) {
      setLastFeedback({
        type: 'error',
        message: 'Primero selecciona un elemento de la columna izquierda.',
      });
      return;
    }

    const leftPair = activity.pairs.find((p) => p.id === selectedLeft);
    if (!leftPair) return;

    if (selectedLeft === rightId) {
      const nextMatched = [...matchedIds, rightId];
      setMatchedIds(nextMatched);
      setSelectedLeft(null);
      setLastFeedback({
        type: 'success',
        message: `Asociación correcta: ${leftPair.explanation}`,
      });
      if (nextMatched.length === activity.pairs.length) {
        onSolved(activity.id);
      }
    } else {
      setLastFeedback({
        type: 'error',
        message:
          'Esa pareja no corresponde al criterio técnico principal. Observa el tipo de datos o el nivel de incertidumbre del caso.',
      });
    }
  };

  const handleReset = () => {
    setMatchedIds([]);
    setSelectedLeft(null);
    setLastFeedback(null);
    setShowHint(false);
  };

  const allCompleted = matchedIds.length === activity.pairs.length;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between border-b border-slate-200 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Actividad de asociación</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">
              {matchedIds.length}/{activity.pairs.length} emparejados
            </span>
          </div>
          <h3 className="text-lg font-semibold text-slate-900">{activity.title}</h3>
          <p className="text-sm text-slate-600">{activity.instructions}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setShowHint((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap"
          >
            <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
            {showHint ? 'Ocultar pista' : 'Ver pista'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Reiniciar
          </button>
        </div>
      </div>

      {showHint && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-relaxed text-slate-700">
          <strong className="font-semibold text-slate-900">Pista metodológica:</strong>{' '}
          Identifica primero si la tarea depende de reglas exactas, variables en tablas, imágenes complejas o generación de lenguaje nuevo.
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2.5">
          <div className="text-xs font-semibold text-slate-500">1. Situación o fenómeno</div>
          {activity.pairs.map((pair) => {
            const isMatched = matchedIds.includes(pair.id);
            const isSelected = selectedLeft === pair.id;
            return (
              <button
                key={pair.id}
                type="button"
                disabled={isMatched}
                onClick={() => handleSelectLeft(pair.id)}
                className={`w-full rounded-lg border p-3.5 text-left transition-colors min-h-[72px] ${
                  isMatched
                    ? 'border-emerald-200 bg-emerald-50/70 text-emerald-950 cursor-default'
                    : isSelected
                    ? 'border-blue-700 bg-blue-50/70 text-slate-900 ring-1 ring-blue-700'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-900'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-semibold">{pair.leftTitle}</span>
                  {isMatched && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 shrink-0">
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                      Asociado
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">{pair.leftDetail}</p>
              </button>
            );
          })}
        </div>

        <div className="space-y-2.5">
          <div className="text-xs font-semibold text-slate-500">
            2. Enfoque o causa correspondiente
          </div>
          {shuffledRight.map((pair) => {
            const isMatched = matchedIds.includes(pair.id);
            return (
              <button
                key={pair.id}
                type="button"
                disabled={isMatched}
                onClick={() => handleSelectRight(pair.id)}
                className={`w-full rounded-lg border p-3.5 text-left transition-colors min-h-[72px] ${
                  isMatched
                    ? 'border-emerald-200 bg-emerald-50/70 text-emerald-950 cursor-default'
                    : selectedLeft
                    ? 'border-slate-300 bg-white hover:border-blue-700 hover:bg-blue-50/40 text-slate-900'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-900'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-semibold">{pair.rightTitle}</span>
                  {isMatched && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 shrink-0">
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                      Correcto
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">{pair.rightDetail}</p>
              </button>
            );
          })}
        </div>
      </div>

      {lastFeedback && (
        <div
          role="status"
          className={`flex items-start gap-2.5 rounded-lg border p-3.5 text-sm ${
            lastFeedback.type === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
              : 'border-amber-200 bg-amber-50 text-amber-900'
          }`}
        >
          {lastFeedback.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-700" aria-hidden="true" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-amber-700" aria-hidden="true" />
          )}
          <div>
            <span className="font-semibold">
              {lastFeedback.type === 'success' ? 'Emparejamiento validado: ' : 'Revisa la relación: '}
            </span>
            {lastFeedback.message}
          </div>
        </div>
      )}

      {allCompleted && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50/80 p-4 text-sm text-emerald-950 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-emerald-700 shrink-0" aria-hidden="true" />
            <span>
              <strong className="font-semibold">Actividad completada.</strong> Has asociado correctamente todos los casos con su fundamento técnico.
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
