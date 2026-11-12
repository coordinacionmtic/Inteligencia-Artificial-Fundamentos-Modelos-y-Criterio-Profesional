import { CheckCircle2 } from 'lucide-react';
import { COURSE_MODULES } from '../data/courseData';
import type { SectionId } from '../types/learning';

interface SectionSidebarProps {
  activeSection: SectionId;
  visitedSections: SectionId[];
  overallPercent: number;
  moduleStatus: Record<
    'modulo-1' | 'modulo-2' | 'modulo-3' | 'modulo-4',
    { done: number; total: number; isComplete: boolean }
  >;
  onNavigate: (section: SectionId) => void;
}

export function SectionSidebar({
  activeSection,
  visitedSections,
  overallPercent,
  moduleStatus,
  onNavigate,
}: SectionSidebarProps) {
  return (
    <aside className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-semibold text-slate-900">Tu avance general</span>
          <span className="font-mono text-sm font-semibold tabular-nums text-blue-700">
            {overallPercent}%
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full bg-blue-700 transition-all duration-300"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          El avance se guarda automáticamente en tu navegador al completar tarjetas, simuladores y ejercicios.
        </p>
      </div>

      <nav aria-label="Índice del curso" className="rounded-xl border border-slate-200 bg-white p-3 space-y-1">
        <div className="px-2 py-1.5 text-xs font-semibold text-slate-500">
          Secuencia académica
        </div>

        <button
          type="button"
          onClick={() => onNavigate('objetivos')}
          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors ${
            activeSection === 'objetivos'
              ? 'bg-blue-50 font-semibold text-blue-900'
              : 'text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span>Objetivos de aprendizaje</span>
          {visitedSections.includes('objetivos') && (
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700 shrink-0" aria-hidden="true" />
          )}
        </button>

        {COURSE_MODULES.map((mod) => {
          const st = moduleStatus[mod.id as keyof typeof moduleStatus];
          const isCurrent = activeSection === mod.id;
          return (
            <button
              key={mod.id}
              type="button"
              onClick={() => onNavigate(mod.id)}
              className={`flex w-full items-start justify-between gap-2 rounded-lg px-3 py-2.5 text-left transition-colors ${
                isCurrent
                  ? 'bg-blue-50 text-blue-950'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="min-w-0">
                <div className={`text-xs ${isCurrent ? 'font-semibold' : 'font-medium'}`}>
                  {mod.number}. {mod.shortTitle}
                </div>
                <div className="text-[11px] text-slate-500 truncate mt-0.5">{mod.duration}</div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                {st?.isComplete ? (
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" aria-hidden="true" />
                ) : (
                  <span className="font-mono text-[11px] tabular-nums text-slate-500">
                    {st?.done ?? 0}/{st?.total ?? 0}
                  </span>
                )}
              </div>
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onNavigate('laboratorio')}
          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors ${
            activeSection === 'laboratorio'
              ? 'bg-blue-50 font-semibold text-blue-900'
              : 'text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span>Laboratorio integrado</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('cierre')}
          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs transition-colors ${
            activeSection === 'cierre'
              ? 'bg-blue-50 font-semibold text-blue-900'
              : 'text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span>Cierre y síntesis</span>
        </button>
      </nav>
    </aside>
  );
}
