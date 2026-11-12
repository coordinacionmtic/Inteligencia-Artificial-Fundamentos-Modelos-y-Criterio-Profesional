import { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Printer,
  RotateCcw,
} from 'lucide-react';
import {
  COURSE_MODULES,
  LEARNING_OBJECTIVES,
  MODULE_1_QUIZ,
  MODULE_2_QUIZZES,
  MODULE_3_QUIZ,
  MODULE_4_QUIZ,
  MODULE_4_SCENARIOS,
} from '../data/courseData';
import type { SectionId, StudentProgress } from '../types/learning';

interface ClosingViewProps {
  progress: StudentProgress;
  metrics: {
    totalCards: number;
    cardsRead: number;
    totalQuizzes: number;
    quizzesAnswered: number;
    totalMatchings: number;
    matchingsCompleted: number;
    totalScenarios: number;
    scenariosCompleted: number;
    totalSimulations: number;
    simulationsCompleted: number;
    totalObjectives: number;
    objectivesConfirmedCount: number;
    totalMilestones: number;
    completedMilestones: number;
    overallPercent: number;
    moduleStatus: Record<
      'modulo-1' | 'modulo-2' | 'modulo-3' | 'modulo-4',
      { done: number; total: number; isComplete: boolean }
    >;
  };
  onSetStudentName: (name: string) => void;
  onSetReflectionNote: (note: string) => void;
  onResetProgress: () => void;
  onNavigate: (section: SectionId) => void;
}

export function ClosingView({
  progress,
  metrics,
  onSetStudentName,
  onSetReflectionNote,
  onResetProgress,
  onNavigate,
}: ClosingViewProps) {
  const [confirmingReset, setConfirmingReset] = useState(false);

  const allQuizzes = [MODULE_1_QUIZ, ...MODULE_2_QUIZZES, MODULE_3_QUIZ, MODULE_4_QUIZ];
  const correctQuizCount = allQuizzes.filter((q) => {
    const ans = progress.quizAnswers[q.id];
    return q.options.some((o) => o.id === ans && o.isCorrect);
  }).length;

  const optimalScenariosCount = MODULE_4_SCENARIOS.filter((sc) => {
    const choiceId = progress.scenarioChoices[sc.id];
    return sc.choices.some((c) => c.id === choiceId && c.isOptimal);
  }).length;

  const handleDownloadSummary = () => {
    const lines = [
      'CÁTEDRA IA — CONSTANCIA DE SÍNTESIS Y APRENDIZAJES ALCANZADOS',
      '==============================================================',
      `Estudiante: ${progress.studentName.trim() || 'Participante universitario'}`,
      `Fecha de registro: ${new Date().toLocaleDateString('es-ES')}`,
      `Progreso general: ${metrics.overallPercent}% (${metrics.completedMilestones}/${metrics.totalMilestones} hitos)`,
      '',
      'DESGLOSE POR ACTIVIDAD:',
      `- Tarjetas conceptuales exploradas: ${metrics.cardsRead}/${metrics.totalCards}`,
      `- Simuladores experimentados: ${metrics.simulationsCompleted}/${metrics.totalSimulations}`,
      `- Actividades de asociación completadas: ${metrics.matchingsCompleted}/${metrics.totalMatchings}`,
      `- Escenarios de decisión resueltos: ${metrics.scenariosCompleted}/${metrics.totalScenarios} (criterio óptimo: ${optimalScenariosCount})`,
      `- Ejercicios de aplicación respondidos: ${metrics.quizzesAnswered}/${metrics.totalQuizzes} (aciertos: ${correctQuizCount})`,
      '',
      'APRENDIZAJES CLAVE DEL CURSO:',
      ...LEARNING_OBJECTIVES.map((o) => `[${o.code}] ${o.title}: ${o.description}`),
      '',
      'BITÁCORA DE REFLEXIÓN PERSONAL:',
      progress.reflectionNote.trim() || '(Sin anotación registrada)',
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'catedra-ia-resumen-aprendizaje.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-10">
      <header className="space-y-3 border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span>Cierre del módulo</span>
          <span aria-hidden="true">·</span>
          <span>Síntesis de competencias y bitácora personal</span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-slate-900">
          Síntesis de aprendizajes alcanzados
        </h1>
        <p className="text-base leading-relaxed text-slate-600 max-w-3xl">
          Revisa tu desempeño consolidado en cada módulo, registra tu reflexión personal sobre el uso responsable de la inteligencia artificial y conserva un resumen descargable o imprimible de tu recorrido.
        </p>
      </header>

      {/* Summary KPI Grid */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="text-xs text-slate-500">Progreso global</div>
          <div className="mt-1 font-mono text-2xl font-semibold tabular-nums text-blue-700">
            {metrics.overallPercent}%
          </div>
          <div className="mt-1 text-xs text-slate-600 tabular-nums">
            {metrics.completedMilestones} de {metrics.totalMilestones} hitos completados
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="text-xs text-slate-500">Conceptos y simulaciones</div>
          <div className="mt-1 font-mono text-2xl font-semibold tabular-nums text-slate-900">
            {metrics.cardsRead + metrics.simulationsCompleted}/
            {metrics.totalCards + metrics.totalSimulations}
          </div>
          <div className="mt-1 text-xs text-slate-600 tabular-nums">
            {metrics.cardsRead} tarjetas · {metrics.simulationsCompleted} laboratorios
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="text-xs text-slate-500">Ejercicios de verificación</div>
          <div className="mt-1 font-mono text-2xl font-semibold tabular-nums text-slate-900">
            {correctQuizCount}/{metrics.totalQuizzes}
          </div>
          <div className="mt-1 text-xs text-slate-600 tabular-nums">
            {metrics.quizzesAnswered} respondidos · {metrics.matchingsCompleted}/{metrics.totalMatchings} asociaciones
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="text-xs text-slate-500">Criterio en dilemas</div>
          <div className="mt-1 font-mono text-2xl font-semibold tabular-nums text-slate-900">
            {metrics.scenariosCompleted}/{metrics.totalScenarios}
          </div>
          <div className="mt-1 text-xs text-slate-600 tabular-nums">
            {optimalScenariosCount} con enfoque óptimo
          </div>
        </div>
      </section>

      {/* Module Breakdown */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Estado por módulo académico
        </h2>
        <div className="divide-y divide-slate-200">
          {COURSE_MODULES.map((mod) => {
            const st = metrics.moduleStatus[mod.id as keyof typeof metrics.moduleStatus];
            return (
              <div
                key={mod.id}
                className="py-4 first:pt-1 last:pb-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono font-semibold text-blue-700">
                      Módulo {mod.number}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">
                      {st.done}/{st.total} actividades
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-slate-900">{mod.title}</div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {st.isComplete ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                      <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      Completado
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onNavigate(mod.id)}
                      className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 whitespace-nowrap"
                    >
                      Completar módulo
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Key Takeaways Synthesis */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Cuatro principios esenciales que te llevas de este curso
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {LEARNING_OBJECTIVES.map((obj) => (
            <div key={obj.id} className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 space-y-1.5">
              <div className="font-mono text-xs font-semibold text-blue-700">{obj.code}</div>
              <div className="text-sm font-semibold text-slate-900">{obj.title}</div>
              <p className="text-xs leading-relaxed text-slate-600">{obj.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Personal Reflection Journal & Export */}
      <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-slate-900">
            Bitácora de síntesis personal
          </h2>
          <p className="text-sm text-slate-600">
            Registra cómo aplicarás estos criterios en tus asignaturas o práctica profesional. Todo se guarda localmente en tu dispositivo.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label htmlFor="student-name" className="block text-xs font-semibold text-slate-700">
              Nombre del estudiante (opcional para constancia)
            </label>
            <input
              id="student-name"
              type="text"
              value={progress.studentName}
              onChange={(e) => onSetStudentName(e.target.value)}
              placeholder="Ej. Laura Camila Mendoza"
              className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="reflection-note" className="block text-xs font-semibold text-slate-700">
            Reflexión de aprendizaje y compromisos de uso ético
          </label>
          <textarea
            id="reflection-note"
            rows={4}
            value={progress.reflectionNote}
            onChange={(e) => onSetReflectionNote(e.target.value)}
            placeholder="Escribe aquí qué paradigma o precaución técnica resultó más reveladora para tu carrera y qué protocolo de verificación adoptarás al usar IA..."
            className="w-full rounded-lg border border-slate-300 bg-white p-3.5 text-sm leading-relaxed text-slate-900 placeholder:text-slate-400"
          />
        </div>

        <div className="no-print flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadSummary}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-800 whitespace-nowrap"
            >
              <Download className="h-4 w-4" aria-hidden="true" />
              Descargar resumen (.txt)
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 whitespace-nowrap"
            >
              <Printer className="h-4 w-4" aria-hidden="true" />
              Imprimir constancia
            </button>
          </div>

          <div>
            {!confirmingReset ? (
              <button
                type="button"
                onClick={() => setConfirmingReset(true)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-red-700 whitespace-nowrap"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                Reiniciar progreso
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-700">¿Borrar tu avance guardado?</span>
                <button
                  type="button"
                  onClick={() => {
                    setConfirmingReset(false);
                    onResetProgress();
                  }}
                  className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700 whitespace-nowrap"
                >
                  Sí, reiniciar
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmingReset(false)}
                  className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap"
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="no-print flex items-center justify-between border-t border-slate-200 pt-6">
        <button
          type="button"
          onClick={() => onNavigate('modulo-4')}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 whitespace-nowrap"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Volver al Módulo 04
        </button>

        <button
          type="button"
          onClick={() => onNavigate('inicio')}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 whitespace-nowrap"
        >
          Ir al inicio
        </button>
      </div>
    </div>
  );
}
