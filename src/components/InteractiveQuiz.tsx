import { CheckCircle2, RotateCcw, XCircle } from 'lucide-react';
import type { QuizQuestion } from '../types/learning';

interface InteractiveQuizProps {
  question: QuizQuestion;
  selectedOptionId?: string;
  onAnswer: (quizId: string, optionId: string) => void;
}

export function InteractiveQuiz({
  question,
  selectedOptionId,
  onAnswer,
}: InteractiveQuizProps) {
  const selectedOption = question.options.find((o) => o.id === selectedOptionId);

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="text-xs text-slate-500">
          <span>Ejercicio de aplicación</span>
          <span aria-hidden="true" className="mx-1.5">·</span>
          <span>{question.context}</span>
        </div>
        {selectedOption && (
          <button
            type="button"
            onClick={() => onAnswer(question.id, '')}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 whitespace-nowrap"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Cambiar respuesta
          </button>
        )}
      </div>

      <h4 className="text-base font-semibold text-slate-900 leading-relaxed">
        {question.prompt}
      </h4>

      <div className="space-y-2.5">
        {question.options.map((option) => {
          const isSelected = selectedOptionId === option.id;
          const showResult = Boolean(selectedOption);

          let cardClass = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-900';
          if (isSelected && option.isCorrect) {
            cardClass = 'border-emerald-300 bg-emerald-50/80 text-emerald-950';
          } else if (isSelected && !option.isCorrect) {
            cardClass = 'border-red-300 bg-red-50/80 text-red-950';
          } else if (showResult && option.isCorrect) {
            cardClass = 'border-emerald-200 bg-emerald-50/40 text-slate-900';
          }

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onAnswer(question.id, option.id)}
              className={`flex w-full items-start gap-3 rounded-lg border p-3.5 text-left transition-colors min-h-[48px] ${cardClass}`}
            >
              <span className="font-mono text-xs font-semibold uppercase text-slate-500 pt-0.5 shrink-0">
                {option.id}.
              </span>
              <span className="text-sm leading-relaxed flex-1">{option.label}</span>
              {isSelected && option.isCorrect && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 shrink-0">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  Correcta
                </span>
              )}
              {isSelected && !option.isCorrect && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-700 shrink-0">
                  <XCircle className="h-4 w-4" aria-hidden="true" />
                  Revisar
                </span>
              )}
            </button>
          );
        })}
      </div>

      {selectedOption && (
        <div
          role="status"
          className={`rounded-lg border p-4 space-y-2 text-sm ${
            selectedOption.isCorrect
              ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
              : 'border-amber-200 bg-amber-50 text-amber-950'
          }`}
        >
          <div className="font-semibold">
            {selectedOption.isCorrect
              ? 'Retroalimentación: criterio acertado'
              : 'Retroalimentación: analiza el fundamento'}
          </div>
          <p className="leading-relaxed">{selectedOption.feedback}</p>
          <p className="border-t border-black/10 pt-2 text-xs text-slate-700">
            <strong className="font-semibold">Idea clave:</strong> {question.takeaway}
          </p>
        </div>
      )}
    </section>
  );
}
