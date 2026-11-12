import { ClosingView } from './components/ClosingView';
import { HomeView } from './components/HomeView';
import { LabHubView } from './components/LabHubView';
import { ModuleView } from './components/ModuleView';
import { ObjectivesView } from './components/ObjectivesView';
import { SectionSidebar } from './components/SectionSidebar';
import { TopBar } from './components/TopBar';
import { NAVIGATION_SECTIONS } from './data/courseData';
import { useLearningProgress } from './hooks/useLearningProgress';

export default function App() {
  const {
    progress,
    activeSection,
    metrics,
    navigateTo,
    markCardRead,
    recordQuizAnswer,
    markMatchingSolved,
    recordScenarioChoice,
    markSimulationExplored,
    toggleObjectiveConfirmed,
    setReflectionNote,
    setStudentName,
    resetProgress,
  } = useLearningProgress();

  const isHome = activeSection === 'inicio';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <TopBar
        activeSection={activeSection}
        overallPercent={metrics.overallPercent}
        recommendedNextSection={metrics.recommendedNextSection}
        onNavigate={navigateTo}
      />

      <main className="flex-1">
        {isHome ? (
          <HomeView
            overallPercent={metrics.overallPercent}
            recommendedNextSection={metrics.recommendedNextSection}
            moduleStatus={metrics.moduleStatus}
            onNavigate={navigateTo}
          />
        ) : (
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
            {/* Compact mobile section switcher */}
            <div className="mb-6 lg:hidden no-print">
              <label htmlFor="mobile-section-select" className="sr-only">
                Cambiar sección del curso
              </label>
              <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5">
                <select
                  id="mobile-section-select"
                  value={activeSection}
                  onChange={(e) => navigateTo(e.target.value as typeof activeSection)}
                  className="w-full bg-transparent text-sm font-semibold text-slate-900 focus:outline-none"
                >
                  {NAVIGATION_SECTIONS.map((sec) => (
                    <option key={sec.id} value={sec.id}>
                      {sec.label}
                    </option>
                  ))}
                </select>
                <span className="font-mono text-xs tabular-nums text-blue-700 shrink-0">
                  {metrics.overallPercent}%
                </span>
              </div>
            </div>

            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="hidden lg:block lg:col-span-3 lg:sticky lg:top-20 no-print">
                <SectionSidebar
                  activeSection={activeSection}
                  visitedSections={progress.visitedSections}
                  overallPercent={metrics.overallPercent}
                  moduleStatus={metrics.moduleStatus}
                  onNavigate={navigateTo}
                />
              </div>

              <div className="lg:col-span-9 min-w-0">
                {activeSection === 'objetivos' && (
                  <ObjectivesView
                    confirmedIds={progress.objectivesConfirmed}
                    onToggleObjective={toggleObjectiveConfirmed}
                    onNavigate={navigateTo}
                  />
                )}

                {(activeSection === 'modulo-1' ||
                  activeSection === 'modulo-2' ||
                  activeSection === 'modulo-3' ||
                  activeSection === 'modulo-4') && (
                  <ModuleView
                    moduleId={activeSection}
                    progress={progress}
                    moduleStatus={metrics.moduleStatus[activeSection]}
                    onMarkCardRead={markCardRead}
                    onRecordQuizAnswer={recordQuizAnswer}
                    onMarkMatchingSolved={markMatchingSolved}
                    onRecordScenarioChoice={recordScenarioChoice}
                    onExploreSimulation={markSimulationExplored}
                    onNavigate={navigateTo}
                  />
                )}

                {activeSection === 'laboratorio' && (
                  <LabHubView
                    simulationsExplored={progress.simulationsExplored}
                    onExploreSimulation={markSimulationExplored}
                    onNavigate={navigateTo}
                  />
                )}

                {activeSection === 'cierre' && (
                  <ClosingView
                    progress={progress}
                    metrics={metrics}
                    onSetStudentName={setStudentName}
                    onSetReflectionNote={setReflectionNote}
                    onResetProgress={resetProgress}
                    onNavigate={navigateTo}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="no-print border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            Cátedra IA · Recurso educativo abierto para educación superior virtual
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => navigateTo('inicio')}
              className="hover:text-slate-900 transition-colors"
            >
              Inicio
            </button>
            <button
              type="button"
              onClick={() => navigateTo('objetivos')}
              className="hover:text-slate-900 transition-colors"
            >
              Objetivos
            </button>
            <button
              type="button"
              onClick={() => navigateTo('laboratorio')}
              className="hover:text-slate-900 transition-colors"
            >
              Laboratorio
            </button>
            <button
              type="button"
              onClick={() => navigateTo('cierre')}
              className="hover:text-slate-900 transition-colors"
            >
              Cierre
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
