import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { COURSE_ASSETS } from '../data/assets';
import { COURSE_MODULES } from '../data/courseData';
import type { SectionId } from '../types/learning';
import { ResilientImage } from './ResilientImage';

interface HomeViewProps {
  overallPercent: number;
  recommendedNextSection: SectionId;
  moduleStatus: Record<
    'modulo-1' | 'modulo-2' | 'modulo-3' | 'modulo-4',
    { done: number; total: number; isComplete: boolean }
  >;
  onNavigate: (section: SectionId) => void;
}

export function HomeView({
  overallPercent,
  recommendedNextSection,
  moduleStatus,
  onNavigate,
}: HomeViewProps) {
  const hasStarted = overallPercent > 0;

  return (
    <div className="space-y-14 pb-16">
      {/* Editorial Hero Split */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between gap-8">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                  <span>Educación Superior Virtual</span>
                  <span aria-hidden="true">·</span>
                  <span>4 Módulos Interactivos</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">70 min estimados</span>
                </div>

                <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-slate-900 leading-[1.12] max-w-2xl">
                  Inteligencia Artificial: Fundamentos, Modelos y Criterio Profesional
                </h1>

                <p className="text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl">
                  Una experiencia universitaria interactiva para comprender cómo aprenden los modelos, experimentar con fronteras de decisión y modelos de lenguaje, y aplicar criterio ético riguroso en contextos académicos y profesionales.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() =>
                    onNavigate(hasStarted ? recommendedNextSection : 'objetivos')
                  }
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800 whitespace-nowrap"
                >
                  <span>{hasStarted ? 'Continuar aprendizaje' : 'Iniciar recorrido'}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('laboratorio')}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-50 whitespace-nowrap"
                >
                  Explorar simuladores
                </button>

                {hasStarted && (
                  <span className="text-xs font-mono tabular-nums text-slate-600">
                    Avance guardado: {overallPercent}%
                  </span>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 flex">
              <ResilientImage
                src={COURSE_ASSETS.heroEditorial}
                alt="Ilustración editorial de redes geométricas y prismas analíticos sobre plano arquitectónico"
                aspectClass="aspect-16/9 lg:aspect-auto lg:h-full"
                className="w-full"
              />
            </div>
          </div>

          {/* 4-column structured strip below hero */}
          <div className="mt-10 grid gap-6 border-t border-slate-200 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="font-mono text-xs font-semibold text-blue-700 tabular-nums">
                01 · Taxonomía
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">
                Reglas, ML y Deep Learning
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Tarjetas desplegables y asociación de casos reales según arquitectura.
              </p>
            </div>
            <div>
              <div className="font-mono text-xs font-semibold text-blue-700 tabular-nums">
                02 · Simulación
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">
                Frontera de decisión y sesgos
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Controla complejidad y ruido para observar sobreajuste en vivo.
              </p>
            </div>
            <div>
              <div className="font-mono text-xs font-semibold text-blue-700 tabular-nums">
                03 · Lenguaje
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">
                Atención y temperatura LLM
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Experimenta con probabilidades Softmax y mitigación de alucinaciones.
              </p>
            </div>
            <div>
              <div className="font-mono text-xs font-semibold text-blue-700 tabular-nums">
                04 · Criterio
              </div>
              <div className="mt-1 text-sm font-semibold text-slate-900">
                Escenarios de decisión ética
              </div>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Dilemas universitarios de privacidad, autoría y supervisión humana.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Syllabus Directory */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-editorial text-2xl sm:text-3xl font-semibold text-slate-900">
              Estructura modular del aprendizaje
            </h2>
            <p className="mt-1 text-sm text-slate-600 max-w-2xl">
              Avanza de manera secuencial o accede directamente al módulo que desees profundizar. Cada ejercicio guarda tu progreso automáticamente.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('objetivos')}
            className="text-sm font-semibold text-blue-700 hover:text-blue-800 whitespace-nowrap self-start sm:self-auto"
          >
            Ver objetivos completos →
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {COURSE_MODULES.map((mod) => {
            const st = moduleStatus[mod.id as keyof typeof moduleStatus];
            const percent = st ? Math.round((st.done / st.total) * 100) : 0;
            return (
              <div
                key={mod.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 transition-colors hover:border-slate-300"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-blue-700">
                        Módulo {mod.number}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{mod.duration}</span>
                      <span aria-hidden="true">·</span>
                      <span>{mod.focus}</span>
                    </div>
                    {st?.isComplete && (
                      <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 shrink-0">
                        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                        Completado
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold text-slate-900 leading-snug">
                    {mod.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600">{mod.lead}</p>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="h-1.5 flex-1 max-w-[140px] overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full bg-blue-700 transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs tabular-nums text-slate-500">
                      {st?.done ?? 0}/{st?.total ?? 0}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onNavigate(mod.id)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800 whitespace-nowrap"
                  >
                    <span>{st?.done ? 'Continuar' : 'Abrir módulo'}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
