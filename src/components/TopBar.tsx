import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAVIGATION_SECTIONS } from '../data/courseData';
import type { SectionId } from '../types/learning';

interface TopBarProps {
  activeSection: SectionId;
  overallPercent: number;
  recommendedNextSection: SectionId;
  onNavigate: (section: SectionId) => void;
}

export function TopBar({
  activeSection,
  overallPercent,
  recommendedNextSection,
  onNavigate,
}: TopBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isInModules =
    activeSection === 'modulo-1' ||
    activeSection === 'modulo-2' ||
    activeSection === 'modulo-3' ||
    activeSection === 'modulo-4';

  const topLinks: { id: SectionId; label: string; active: boolean }[] = [
    { id: 'inicio', label: 'Inicio', active: activeSection === 'inicio' },
    { id: 'objetivos', label: 'Objetivos', active: activeSection === 'objetivos' },
    { id: 'modulo-1', label: 'Módulos', active: isInModules },
    { id: 'laboratorio', label: 'Laboratorio', active: activeSection === 'laboratorio' },
    { id: 'cierre', label: 'Cierre', active: activeSection === 'cierre' },
  ];

  const handleLinkClick = (id: SectionId) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  const primaryActionTarget =
    activeSection === 'cierre' ? 'inicio' : recommendedNextSection;
  const primaryActionLabel =
    overallPercent >= 100
      ? 'Ver cierre'
      : overallPercent > 0
      ? `Continuar (${overallPercent}%)`
      : 'Comenzar curso';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3 sm:px-6 lg:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('inicio');
          }}
          className="font-editorial text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0"
        >
          Cátedra IA
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          {topLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleLinkClick(link.id)}
              className={`whitespace-nowrap shrink-0 border-b-2 py-1 transition-colors ${
                link.active
                  ? 'border-blue-700 text-slate-900 font-semibold'
                  : 'border-transparent hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Single primary action + mobile menu button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() =>
              handleLinkClick(overallPercent >= 100 ? 'cierre' : primaryActionTarget)
            }
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-blue-700 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-800 whitespace-nowrap shrink-0 tabular-nums"
          >
            {primaryActionLabel}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            className="inline-flex md:hidden items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-50 min-h-[40px] min-w-[40px]"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Subtle hairline progress bar */}
      <div
        className="h-0.5 w-full bg-slate-100"
        role="progressbar"
        aria-valuenow={overallPercent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progreso general del curso: ${overallPercent}%`}
      >
        <div
          className="h-full bg-blue-700 transition-all duration-300"
          style={{ width: `${overallPercent}%` }}
        />
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
            <span>Ruta de aprendizaje</span>
            <span className="font-mono tabular-nums font-semibold text-slate-800">
              Progreso: {overallPercent}%
            </span>
          </div>
          <nav aria-label="Menú móvil" className="grid gap-1">
            {NAVIGATION_SECTIONS.map((sec) => {
              const isCurrent = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => handleLinkClick(sec.id)}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    isCurrent
                      ? 'bg-blue-50 font-semibold text-blue-900'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{sec.label}</span>
                  <span className="text-xs text-slate-400">{sec.category}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
