import { ArrowRight } from 'lucide-react';
import type { SectionId } from '../types/learning';
import { LlmTemperatureLab } from './LlmTemperatureLab';
import { ModelFitSimulator } from './ModelFitSimulator';

interface LabHubViewProps {
  simulationsExplored: string[];
  onExploreSimulation: (simId: string) => void;
  onNavigate: (section: SectionId) => void;
}

export function LabHubView({
  simulationsExplored,
  onExploreSimulation,
  onNavigate,
}: LabHubViewProps) {
  return (
    <div className="space-y-10">
      <header className="space-y-3 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Laboratorio interactivo</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono tabular-nums">
            {simulationsExplored.length}/2 simuladores explorados
          </span>
        </div>
        <h1 className="font-editorial text-3xl sm:text-4xl font-semibold text-slate-900">
          Simuladores experimentales de Inteligencia Artificial
        </h1>
        <p className="text-base leading-relaxed text-slate-600 max-w-3xl">
          Accede directamente a los dos entornos interactivos del curso para formular hipótesis y observar el comportamiento matemático de los modelos en tiempo real.
        </p>
      </header>

      <div className="space-y-10">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-semibold text-slate-900">
              Experimento A · Aprendizaje supervisado y generalización
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('modulo-2')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800 whitespace-nowrap"
            >
              Ir al Módulo 02 <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
          <ModelFitSimulator
            isExplored={simulationsExplored.includes('sim-fit')}
            onExplore={onExploreSimulation}
          />
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-semibold text-slate-900">
              Experimento B · Probabilidad de tokens y temperatura en LLM
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('modulo-3')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:text-blue-800 whitespace-nowrap"
            >
              Ir al Módulo 03 <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
          <LlmTemperatureLab
            isExplored={simulationsExplored.includes('sim-llm')}
            onExplore={onExploreSimulation}
          />
        </div>
      </div>
    </div>
  );
}
