import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { COURSE_ASSETS } from '../data/assets';
import {
  COURSE_MODULES,
  MODULE_1_CARDS,
  MODULE_1_MATCHING,
  MODULE_1_QUIZ,
  MODULE_2_CARDS,
  MODULE_2_QUIZZES,
  MODULE_3_CARDS,
  MODULE_3_MATCHING,
  MODULE_3_QUIZ,
  MODULE_4_QUIZ,
  MODULE_4_SCENARIOS,
} from '../data/courseData';
import type { SectionId, StudentProgress } from '../types/learning';
import { DecisionScenario } from './DecisionScenario';
import { InteractiveExpandableCards } from './InteractiveExpandableCards';
import { InteractiveMatching } from './InteractiveMatching';
import { InteractiveQuiz } from './InteractiveQuiz';
import { LlmTemperatureLab } from './LlmTemperatureLab';
import { ModelFitSimulator } from './ModelFitSimulator';
import { ResilientImage } from './ResilientImage';

interface ModuleViewProps {
  moduleId: 'modulo-1' | 'modulo-2' | 'modulo-3' | 'modulo-4';
  progress: StudentProgress;
  moduleStatus: { done: number; total: number; isComplete: boolean };
  onMarkCardRead: (cardId: string) => void;
  onRecordQuizAnswer: (quizId: string, optionId: string) => void;
  onMarkMatchingSolved: (activityId: string) => void;
  onRecordScenarioChoice: (scenarioId: string, choiceId: string) => void;
  onExploreSimulation: (simId: string) => void;
  onNavigate: (section: SectionId) => void;
}

export function ModuleView({
  moduleId,
  progress,
  moduleStatus,
  onMarkCardRead,
  onRecordQuizAnswer,
  onMarkMatchingSolved,
  onRecordScenarioChoice,
  onExploreSimulation,
  onNavigate,
}: ModuleViewProps) {
  const meta = COURSE_MODULES.find((m) => m.id === moduleId)!;

  const navMap: Record<
    ModuleViewProps['moduleId'],
    { prev: SectionId; prevLabel: string; next: SectionId; nextLabel: string }
  > = {
    'modulo-1': {
      prev: 'objetivos',
      prevLabel: 'Objetivos',
      next: 'modulo-2',
      nextLabel: 'Módulo 02: Datos y generalización',
    },
    'modulo-2': {
      prev: 'modulo-1',
      prevLabel: 'Módulo 01: Paradigmas',
      next: 'modulo-3',
      nextLabel: 'Módulo 03: Atención y modelos generativos',
    },
    'modulo-3': {
      prev: 'modulo-2',
      prevLabel: 'Módulo 02: Datos y generalización',
      next: 'modulo-4',
      nextLabel: 'Módulo 04: Ética y criterio profesional',
    },
    'modulo-4': {
      prev: 'modulo-3',
      prevLabel: 'Módulo 03: Atención y modelos generativos',
      next: 'cierre',
      nextLabel: 'Cierre y aprendizajes alcanzados',
    },
  };
  const navOrder = navMap[moduleId];

  return (
    <div className="space-y-10">
      {/* Module Header */}
      <header className="space-y-4 border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono font-semibold text-blue-700">
              Módulo {meta.number}
            </span>
            <span aria-hidden="true">·</span>
            <span>{meta.duration}</span>
            <span aria-hidden="true">·</span>
            <span>{meta.focus}</span>
          </div>

          <div className="flex items-center gap-2 font-mono tabular-nums">
            {moduleStatus.isComplete ? (
              <span className="inline-flex items-center gap-1 font-sans font-semibold text-emerald-700">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                Módulo completado ({moduleStatus.done}/{moduleStatus.total})
              </span>
            ) : (
              <span>
                Avance del módulo: {moduleStatus.done}/{moduleStatus.total}
              </span>
            )}
          </div>
        </div>

        <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-slate-900">
          {meta.title}
        </h1>
        <p className="text-base leading-relaxed text-slate-600 max-w-3xl">{meta.lead}</p>
      </header>

      {/* Module 1 Content */}
      {moduleId === 'modulo-1' && (
        <div className="space-y-10">
          <section className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7 space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
              <h2 className="font-editorial text-2xl font-semibold text-slate-900">
                ¿Por qué no existe un único algoritmo para todo?
              </h2>
              <p>
                En el debate público suele usarse el término «inteligencia artificial» como si designara una sola tecnología uniforme. Sin embargo, en ingeniería y ciencias de la computación coexisten paradigmas distintos que responden a problemas con naturalezas muy diferentes.
              </p>
              <p>
                Elegir el enfoque correcto exige evaluar tres factores: la disponibilidad y estructura de los datos, la necesidad de explicar cada decisión paso a paso (auditabilidad) y el margen de error tolerable en el contexto universitario o profesional.
              </p>
              <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
                <div className="text-xs font-semibold text-slate-900">
                  Regla práctica de selección
                </div>
                <p className="text-xs leading-relaxed text-slate-600">
                  Si las reglas del problema son exactas y legales, prioriza sistemas simbólicos deterministas. Si buscas patrones en tablas históricas, evalúa aprendizaje automático clásico antes de escalar a redes profundas o modelos generativos.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <ResilientImage
                src={COURSE_ASSETS.neuralArchitecture}
                alt="Diagrama arquitectónico de árboles de decisión y redes de nodos interconectados"
                caption="Del determinismo lógico en árboles de reglas a la inferencia distribuida en redes multicapa."
                aspectClass="aspect-4/3"
              />
            </div>
          </section>

          <InteractiveExpandableCards
            items={MODULE_1_CARDS}
            readIds={progress.expandedCardsRead}
            onMarkRead={onMarkCardRead}
            heading="Tarjetas desplegables: los cuatro paradigmas esenciales"
            description="Despliega cada tarjeta para comparar su funcionamiento interno, un ejemplo universitario y sus límites."
          />

          <InteractiveMatching
            activity={MODULE_1_MATCHING}
            isSolved={Boolean(progress.matchingSolved[MODULE_1_MATCHING.id])}
            onSolved={onMarkMatchingSolved}
          />

          <InteractiveQuiz
            question={MODULE_1_QUIZ}
            selectedOptionId={progress.quizAnswers[MODULE_1_QUIZ.id]}
            onAnswer={onRecordQuizAnswer}
          />
        </div>
      )}

      {/* Module 2 Content */}
      {moduleId === 'modulo-2' && (
        <div className="space-y-10">
          <section className="space-y-4 max-w-3xl text-sm sm:text-base leading-relaxed text-slate-700">
            <h2 className="font-editorial text-2xl font-semibold text-slate-900">
              Aprender no es memorizar: el reto de generalizar
            </h2>
            <p>
              Un modelo estadístico aprende ajustando sus parámetros para reducir los errores cometidos sobre un conjunto de entrenamiento. El verdadero objetivo, sin embargo, no es obtener una calificación perfecta sobre ejemplos ya vistos, sino acertar sobre casos nuevos que el modelo nunca ha observado.
            </p>
            <p>
              Cuando un modelo es demasiado simple para captar la estructura del fenómeno ocurre <strong className="font-semibold text-slate-900">subajuste</strong>. Cuando es excesivamente flexible, termina memorizando fluctuaciones accidentales y ruido, produciendo <strong className="font-semibold text-slate-900">sobreajuste</strong>.
            </p>
          </section>

          <ModelFitSimulator
            isExplored={progress.simulationsExplored.includes('sim-fit')}
            onExplore={onExploreSimulation}
          />

          <InteractiveExpandableCards
            items={MODULE_2_CARDS}
            readIds={progress.expandedCardsRead}
            onMarkRead={onMarkCardRead}
            heading="Tarjetas desplegables: validación y calidad de datos"
            description="Explora cómo se valida la capacidad de generalización y por qué los datos históricos introducen sesgos."
          />

          <div className="space-y-6">
            {MODULE_2_QUIZZES.map((quiz) => (
              <InteractiveQuiz
                key={quiz.id}
                question={quiz}
                selectedOptionId={progress.quizAnswers[quiz.id]}
                onAnswer={onRecordQuizAnswer}
              />
            ))}
          </div>
        </div>
      )}

      {/* Module 3 Content */}
      {moduleId === 'modulo-3' && (
        <div className="space-y-10">
          <section className="space-y-4 max-w-3xl text-sm sm:text-base leading-relaxed text-slate-700">
            <h2 className="font-editorial text-2xl font-semibold text-slate-900">
              Modelos de lenguaje: atención y probabilidad condicional
            </h2>
            <p>
              Los grandes modelos de lenguaje (LLM) no almacenan una enciclopedia de hechos verificados ni razonan con conciencia humana. Operan transformando secuencias de texto en vectores numéricos y calculando, paso a paso, qué token tiene mayor probabilidad de continuar el discurso dado el contexto previo.
            </p>
            <p>
              Comprender parámetros como la <strong className="font-semibold text-slate-900">temperatura</strong> y el papel del <strong className="font-semibold text-slate-900">contexto anclado</strong> explica por qué un modelo puede ser brillante redactando borradores y, al mismo tiempo, fabricar citas bibliográficas inexistentes con absoluta seguridad gramatical.
            </p>
          </section>

          <LlmTemperatureLab
            isExplored={progress.simulationsExplored.includes('sim-llm')}
            onExplore={onExploreSimulation}
          />

          <InteractiveExpandableCards
            items={MODULE_3_CARDS}
            readIds={progress.expandedCardsRead}
            onMarkRead={onMarkCardRead}
            heading="Tarjetas desplegables: anatomía de un modelo generativo"
            description="Revisa los conceptos clave de tokenización, autoatención y alucinaciones probabilísticas."
          />

          <InteractiveMatching
            activity={MODULE_3_MATCHING}
            isSolved={Boolean(progress.matchingSolved[MODULE_3_MATCHING.id])}
            onSolved={onMarkMatchingSolved}
          />

          <InteractiveQuiz
            question={MODULE_3_QUIZ}
            selectedOptionId={progress.quizAnswers[MODULE_3_QUIZ.id]}
            onAnswer={onRecordQuizAnswer}
          />
        </div>
      )}

      {/* Module 4 Content */}
      {moduleId === 'modulo-4' && (
        <div className="space-y-10">
          <section className="grid gap-8 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-7 space-y-4 text-sm sm:text-base leading-relaxed text-slate-700">
              <h2 className="font-editorial text-2xl font-semibold text-slate-900">
                Supervisión humana, privacidad y responsabilidad académica
              </h2>
              <p>
                Adoptar inteligencia artificial en la universidad y en el ejercicio profesional no elimina el juicio humano; por el contrario, eleva la exigencia sobre nuestra capacidad de verificación, protección de datos sensibles y rendición de cuentas.
              </p>
              <p>
                En los siguientes escenarios contextualizados deberás tomar decisiones concretas. Analiza cómo cada alternativa afecta el rigor académico, la integridad ética y la supervisión humana activa.
              </p>
            </div>

            <div className="lg:col-span-5">
              <ResilientImage
                src={COURSE_ASSETS.humanAiEthics}
                alt="Ilustración editorial de balanza de criterio, brújula y capas de datos analíticos"
                caption="El principio Human-in-the-Loop sitúa la validación, la ética y la firma final bajo agencia humana."
                aspectClass="aspect-4/3"
              />
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  Escenarios de decisión contextualizados
                </h3>
                <p className="text-sm text-slate-600">
                  Elige una línea de acción en cada caso para evaluar sus implicaciones técnicas y éticas.
                </p>
              </div>
              <span className="font-mono text-xs tabular-nums text-slate-500 shrink-0">
                Resueltos:{' '}
                {MODULE_4_SCENARIOS.filter((s) => Boolean(progress.scenarioChoices[s.id])).length}/
                {MODULE_4_SCENARIOS.length}
              </span>
            </div>

            <div className="space-y-6">
              {MODULE_4_SCENARIOS.map((scenario) => (
                <DecisionScenario
                  key={scenario.id}
                  scenario={scenario}
                  selectedChoiceId={progress.scenarioChoices[scenario.id]}
                  onSelectChoice={onRecordScenarioChoice}
                />
              ))}
            </div>
          </section>

          <InteractiveQuiz
            question={MODULE_4_QUIZ}
            selectedOptionId={progress.quizAnswers[MODULE_4_QUIZ.id]}
            onAnswer={onRecordQuizAnswer}
          />
        </div>
      )}

      {/* Footer Module Pagination */}
      <footer className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-slate-200 pt-6">
        <button
          type="button"
          onClick={() => onNavigate(navOrder.prev)}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 whitespace-nowrap"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>{navOrder.prevLabel}</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate(navOrder.next)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 whitespace-nowrap"
        >
          <span>{navOrder.nextLabel}</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </footer>
    </div>
  );
}
