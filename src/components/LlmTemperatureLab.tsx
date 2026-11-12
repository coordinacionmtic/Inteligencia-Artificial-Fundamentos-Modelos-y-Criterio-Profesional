import { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, Sparkles } from 'lucide-react';

interface LlmTemperatureLabProps {
  isExplored: boolean;
  onExplore: (simId: string) => void;
}

interface TokenCandidate {
  token: string;
  logit: number;
  tag: 'exacto' | 'plausible' | 'riesgo';
}

const PROMPT_PROFILES: Record<
  'vago' | 'estructurado',
  {
    label: string;
    promptText: string;
    candidates: TokenCandidate[];
    outputs: { low: string; mid: string; high: string };
  }
> = {
  vago: {
    label: 'Prompt vago sin contexto',
    promptText: '"Resume la normativa de evaluación del curso y cita el artículo exacto."',
    candidates: [
      { token: 'Artículo 14 (inventado)', logit: 3.1, tag: 'riesgo' },
      { token: 'Artículo 7 (supuesto)', logit: 2.9, tag: 'riesgo' },
      { token: 'Reglamento general', logit: 2.5, tag: 'plausible' },
      { token: 'Disposición 2024', logit: 2.1, tag: 'riesgo' },
    ],
    outputs: {
      low: 'Según el Artículo 14 del Reglamento Académico (dato generado por patrón probable sin documento fuente), la evaluación se divide en tres cortes.',
      mid: 'De acuerdo con el Artículo 7 o el Reglamento General de Estudios, las pruebas equivalen al 60 % y el proyecto al 40 %.',
      high: 'Conforme a la Resolución Rectoral 408-B de 2024 y el Artículo 19, cada módulo integra rúbricas automatizadas con validez nacional.',
    },
  },
  estructurado: {
    label: 'Prompt con fragmento fuente',
    promptText:
      '"Con base únicamente en el texto adjunto [Art. 12: aprobación con nota ≥ 3.5], indica el requisito mínimo."',
    candidates: [
      { token: 'Artículo 12 (≥ 3.5)', logit: 5.2, tag: 'exacto' },
      { token: 'nota mínima de 3.5', logit: 4.1, tag: 'exacto' },
      { token: 'evaluación aprobatoria', logit: 2.0, tag: 'plausible' },
      { token: 'criterio adicional', logit: 0.7, tag: 'riesgo' },
    ],
    outputs: {
      low: 'Según el texto provisto (Artículo 12), el requisito mínimo de aprobación es obtener una calificación igual o superior a 3.5.',
      mid: 'Con base en el Artículo 12 del documento citado, se exige una nota mínima de 3.5 para aprobar la asignatura.',
      high: 'El Artículo 12 fija el umbral en 3.5, aunque dependiendo del énfasis del curso podrían considerarse criterios complementarios de participación.',
    },
  },
};

export function LlmTemperatureLab({ isExplored, onExplore }: LlmTemperatureLabProps) {
  const [promptMode, setPromptMode] = useState<'vago' | 'estructurado'>('estructurado');
  const [temperature, setTemperature] = useState<number>(0.2);

  const profile = PROMPT_PROFILES[promptMode];

  const distribution = useMemo(() => {
    const t = Math.max(0.1, temperature);
    const maxLogit = Math.max(...profile.candidates.map((c) => c.logit));
    const exps = profile.candidates.map((c) => Math.exp((c.logit - maxLogit) / t));
    const sum = exps.reduce((acc, v) => acc + v, 0);
    return profile.candidates.map((c, idx) => ({
      ...c,
      prob: Math.round((exps[idx] / sum) * 100),
    }));
  }, [profile, temperature]);

  const regime = useMemo(() => {
    if (promptMode === 'vago') {
      return {
        status: 'risk' as const,
        label: 'Alto riesgo de alucinación',
        output:
          temperature <= 0.3
            ? profile.outputs.low
            : temperature <= 0.8
            ? profile.outputs.mid
            : profile.outputs.high,
        note:
          'Sin documento de referencia en el contexto, incluso una temperatura baja elige con seguridad estadística un artículo probable pero inventado.',
      };
    }
    if (temperature <= 0.4) {
      return {
        status: 'optimal' as const,
        label: 'Alta consistencia factual',
        output: profile.outputs.low,
        note:
          'La combinación de contexto explícito y temperatura baja concentra más del 75 % de probabilidad en los tokens fieles a la fuente.',
      };
    }
    if (temperature <= 0.9) {
      return {
        status: 'balanced' as const,
        label: 'Equilibrio expresivo',
        output: profile.outputs.mid,
        note:
          'El modelo mantiene la idea central pero permite ligeras variaciones en la redacción.',
      };
    }
    return {
      status: 'risk' as const,
      label: 'Dispersión probabilística alta',
      output: profile.outputs.high,
      note:
        'A temperatura elevada se aplana la distribución: tokens secundarios improbables ganan peso y añaden conjeturas no presentes en la fuente.',
    };
  }, [promptMode, temperature, profile]);

  const handleUpdate = (fn: () => void) => {
    fn();
    if (!isExplored) {
      onExplore('sim-llm');
    }
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="border-b border-slate-200 px-5 py-4 sm:px-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Sparkles className="h-3.5 w-3.5 text-blue-700" aria-hidden="true" />
            <span>Laboratorio de lenguaje</span>
            <span aria-hidden="true">·</span>
            <span>Distribución de probabilidad y temperatura</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mt-0.5">
            Cómo decide el siguiente token un modelo generativo
          </h3>
        </div>

        <div className="text-xs shrink-0">
          {regime.status === 'optimal' && (
            <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              {regime.label}
            </span>
          )}
          {regime.status === 'balanced' && (
            <span className="inline-flex items-center gap-1.5 font-semibold text-blue-700">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              {regime.label}
            </span>
          )}
          {regime.status === 'risk' && (
            <span className="inline-flex items-center gap-1.5 font-semibold text-red-700">
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              {regime.label}
            </span>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-12">
        {/* Left/Top Stage */}
        <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50/70 p-5 sm:p-6 space-y-5">
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-500">Instrucción enviada al modelo</div>
            <div className="rounded-lg border border-slate-200 bg-white p-3.5 font-mono text-xs leading-relaxed text-slate-800">
              {profile.promptText}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="font-semibold text-slate-900">
                Probabilidad del siguiente bloque (Softmax con T = {temperature.toFixed(1)})
              </span>
              <span className="font-mono tabular-nums">Suma ≈ 100%</span>
            </div>

            <div className="space-y-2.5 rounded-lg border border-slate-200 bg-white p-4">
              {distribution.map((item) => (
                <div key={item.token} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-800">{item.token}</span>
                    <span className="font-mono tabular-nums font-semibold text-slate-900">
                      {item.prob}%
                    </span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full transition-all duration-200 ${
                        item.tag === 'exacto'
                          ? 'bg-emerald-600'
                          : item.tag === 'plausible'
                          ? 'bg-blue-700'
                          : 'bg-amber-600'
                      }`}
                      style={{ width: `${Math.max(3, item.prob)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="text-xs font-semibold text-slate-500">Respuesta generada resultante</div>
            <div className="rounded-lg border border-slate-200 bg-white p-4 text-sm leading-relaxed text-slate-800">
              {regime.output}
            </div>
          </div>
        </div>

        {/* Right/Bottom Controls */}
        <div className="lg:col-span-5 p-5 sm:p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-5">
            <div className="space-y-2">
              <div className="text-sm font-semibold text-slate-900">1. Calidad del contexto</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdate(() => setPromptMode('estructurado'))}
                  className={`rounded-lg border px-3 py-2.5 text-left text-xs font-medium transition-colors ${
                    promptMode === 'estructurado'
                      ? 'border-blue-700 bg-blue-50 text-blue-950'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Prompt con fuente anclada
                </button>
                <button
                  type="button"
                  onClick={() => handleUpdate(() => setPromptMode('vago'))}
                  className={`rounded-lg border px-3 py-2.5 text-left text-xs font-medium transition-colors ${
                    promptMode === 'vago'
                      ? 'border-blue-700 bg-blue-50 text-blue-950'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  Prompt vago sin fuente
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <label htmlFor="temp-slider" className="font-semibold text-slate-900">
                  2. Temperatura de muestreo (T)
                </label>
                <span className="font-mono text-xs tabular-nums font-semibold text-blue-700">
                  T = {temperature.toFixed(1)}
                </span>
              </div>
              <input
                id="temp-slider"
                type="range"
                min={0.1}
                max={1.4}
                step={0.1}
                value={temperature}
                onChange={(e) => handleUpdate(() => setTemperature(Number(e.target.value)))}
                className="w-full accent-blue-700 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>0.1 (Determinista)</span>
                <span>0.6 (Equilibrada)</span>
                <span>1.4 (Aleatoria)</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  handleUpdate(() => {
                    setPromptMode('estructurado');
                    setTemperature(0.1);
                  })
                }
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap"
              >
                Modo analítico riguroso
              </button>
              <button
                type="button"
                onClick={() =>
                  handleUpdate(() => {
                    setPromptMode('vago');
                    setTemperature(1.3);
                  })
                }
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap"
              >
                Observar alucinación
              </button>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-1.5">
              <div className="text-xs font-semibold text-slate-900">Diagnóstico técnico</div>
              <p className="text-xs leading-relaxed text-slate-700">{regime.note}</p>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-3 text-xs text-slate-500">
            {isExplored
              ? 'Experimento de lenguaje registrado en tu progreso.'
              : 'Cambia el tipo de prompt o la temperatura para registrar el experimento.'}
          </div>
        </div>
      </div>
    </section>
  );
}
