import { ArrowLeft, ArrowRight, CheckSquare, Square } from 'lucide-react';
import { LEARNING_OBJECTIVES } from '../data/courseData';
import type { SectionId } from '../types/learning';

interface ObjectivesViewProps {
  confirmedIds: string[];
  onToggleObjective: (id: string) => void;
  onNavigate: (section: SectionId) => void;
}

export function ObjectivesView({
  confirmedIds,
  onToggleObjective,
  onNavigate,
}: ObjectivesViewProps) {
  return (
    <div className="space-y-8">
      <header className="space-y-3 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Presentación académica</span>
          <span aria-hidden="true">·</span>
          <span>Resultados de aprendizaje esperados</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-slate-900">
          Objetivos de aprendizaje y competencias del módulo
        </h1>
        <p className="text-base leading-relaxed text-slate-600 max-w-3xl">
          Al concluir esta experiencia interactiva estarás en capacidad de analizar sistemas de inteligencia artificial desde una perspectiva técnica y ética, más allá del uso superficial de herramientas.
        </p>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Mapa de resultados de aprendizaje
            </h2>
            <p className="text-sm text-slate-600">
              Marca los objetivos a medida que los explores o domines para llevar tu autoevaluación personal.
            </p>
          </div>
          <span className="font-mono text-xs tabular-nums text-slate-500 shrink-0">
            Autoevaluados: {confirmedIds.length}/{LEARNING_OBJECTIVES.length}
          </span>
        </div>

        <div className="divide-y divide-slate-200">
          {LEARNING_OBJECTIVES.map((obj) => {
            const isChecked = confirmedIds.includes(obj.id);
            return (
              <div
                key={obj.id}
                className="py-5 first:pt-2 last:pb-2 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="flex items-start gap-4 max-w-2xl">
                  <button
                    type="button"
                    onClick={() => onToggleObjective(obj.id)}
                    aria-pressed={isChecked}
                    aria-label={`Marcar objetivo ${obj.code} como comprendido`}
                    className="mt-0.5 text-blue-700 hover:text-blue-800 shrink-0"
                  >
                    {isChecked ? (
                      <CheckSquare className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <Square className="h-5 w-5 text-slate-400" aria-hidden="true" />
                    )}
                  </button>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-mono font-semibold text-blue-700">{obj.code}</span>
                      <span aria-hidden="true">·</span>
                      <span>{obj.linkedModuleLabel}</span>
                    </div>
                    <h3 className="text-base font-semibold text-slate-900">{obj.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{obj.description}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate(obj.linkedModule)}
                  className="self-start sm:self-center inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0"
                >
                  <span>Ir al módulo</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-3">
        <h2 className="text-base font-semibold text-slate-900">
          Metodología de estudio recomendada en modalidad virtual
        </h2>
        <div className="grid gap-4 sm:grid-cols-3 text-sm text-slate-600">
          <div className="space-y-1">
            <div className="font-semibold text-slate-900">1. Lectura activa</div>
            <p className="text-xs leading-relaxed">
              Despliega todas las tarjetas conceptuales para contrastar mecanismo interno, ejemplos reales y limitaciones.
            </p>
          </div>
          <div className="space-y-1">
            <div className="font-semibold text-slate-900">2. Experimentación guiada</div>
            <p className="text-xs leading-relaxed">
              Manipula los parámetros de los simuladores antes de responder las preguntas de verificación.
            </p>
          </div>
          <div className="space-y-1">
            <div className="font-semibold text-slate-900">3. Juicio contextual</div>
            <p className="text-xs leading-relaxed">
              Evalúa los dilemas éticos analizando impacto técnico, privacidad y responsabilidad humana.
            </p>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between border-t border-slate-200 pt-6">
        <button
          type="button"
          onClick={() => onNavigate('inicio')}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 whitespace-nowrap"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Volver al inicio
        </button>

        <button
          type="button"
          onClick={() => onNavigate('modulo-1')}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 whitespace-nowrap"
        >
          <span>Comenzar Módulo 01</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
