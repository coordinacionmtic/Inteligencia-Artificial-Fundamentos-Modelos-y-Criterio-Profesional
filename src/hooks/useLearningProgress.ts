import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  LEARNING_OBJECTIVES,
  MODULE_1_CARDS,
  MODULE_2_CARDS,
  MODULE_3_CARDS,
  MODULE_4_SCENARIOS,
  NAVIGATION_SECTIONS,
} from '../data/courseData';
import type { SectionId, StudentProgress } from '../types/learning';

const STORAGE_KEY = 'catedra_ia_progreso_v1';

const VALID_SECTIONS = new Set<SectionId>(NAVIGATION_SECTIONS.map((s) => s.id));

const DEFAULT_PROGRESS: StudentProgress = {
  visitedSections: ['inicio'],
  expandedCardsRead: [],
  quizAnswers: {},
  matchingSolved: {},
  scenarioChoices: {},
  simulationsExplored: [],
  objectivesConfirmed: [],
  reflectionNote: '',
  studentName: '',
  lastSection: 'inicio',
  updatedAt: new Date().toISOString(),
};

function readHashSection(): SectionId | null {
  if (typeof window === 'undefined') return null;
  const raw = window.location.hash.replace(/^#\/?/, '').trim() as SectionId;
  return VALID_SECTIONS.has(raw) ? raw : null;
}

function loadStoredProgress(): StudentProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<StudentProgress>;
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      visitedSections: Array.isArray(parsed.visitedSections) && parsed.visitedSections.length > 0
        ? parsed.visitedSections.filter((id): id is SectionId => VALID_SECTIONS.has(id as SectionId))
        : ['inicio'],
      expandedCardsRead: Array.isArray(parsed.expandedCardsRead) ? parsed.expandedCardsRead : [],
      quizAnswers: parsed.quizAnswers && typeof parsed.quizAnswers === 'object' ? parsed.quizAnswers : {},
      matchingSolved: parsed.matchingSolved && typeof parsed.matchingSolved === 'object' ? parsed.matchingSolved : {},
      scenarioChoices: parsed.scenarioChoices && typeof parsed.scenarioChoices === 'object' ? parsed.scenarioChoices : {},
      simulationsExplored: Array.isArray(parsed.simulationsExplored) ? parsed.simulationsExplored : [],
      objectivesConfirmed: Array.isArray(parsed.objectivesConfirmed) ? parsed.objectivesConfirmed : [],
      reflectionNote: typeof parsed.reflectionNote === 'string' ? parsed.reflectionNote : '',
      studentName: typeof parsed.studentName === 'string' ? parsed.studentName : '',
      lastSection: parsed.lastSection && VALID_SECTIONS.has(parsed.lastSection) ? parsed.lastSection : 'inicio',
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function useLearningProgress() {
  const [progress, setProgress] = useState<StudentProgress>(() => loadStoredProgress());
  const [activeSection, setActiveSection] = useState<SectionId>(() => {
    return readHashSection() || loadStoredProgress().lastSection || 'inicio';
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota errors in restricted environments
    }
  }, [progress]);

  useEffect(() => {
    const handleHashChange = () => {
      const target = readHashSection();
      if (target) {
        setActiveSection(target);
        setProgress((prev) => ({
          ...prev,
          lastSection: target,
          visitedSections: prev.visitedSections.includes(target)
            ? prev.visitedSections
            : [...prev.visitedSections, target],
          updatedAt: new Date().toISOString(),
        }));
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = useCallback((section: SectionId) => {
    setActiveSection(section);
    if (typeof window !== 'undefined') {
      const nextHash = `#${section}`;
      if (window.location.hash !== nextHash) {
        window.location.hash = nextHash;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setProgress((prev) => ({
      ...prev,
      lastSection: section,
      visitedSections: prev.visitedSections.includes(section)
        ? prev.visitedSections
        : [...prev.visitedSections, section],
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const markCardRead = useCallback((cardId: string) => {
    setProgress((prev) => {
      if (prev.expandedCardsRead.includes(cardId)) return prev;
      return {
        ...prev,
        expandedCardsRead: [...prev.expandedCardsRead, cardId],
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const recordQuizAnswer = useCallback((quizId: string, optionId: string) => {
    setProgress((prev) => {
      const nextAnswers = { ...prev.quizAnswers };
      if (!optionId) {
        delete nextAnswers[quizId];
      } else {
        nextAnswers[quizId] = optionId;
      }
      return {
        ...prev,
        quizAnswers: nextAnswers,
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const markMatchingSolved = useCallback((activityId: string) => {
    setProgress((prev) => {
      if (prev.matchingSolved[activityId]) return prev;
      return {
        ...prev,
        matchingSolved: { ...prev.matchingSolved, [activityId]: true },
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const recordScenarioChoice = useCallback((scenarioId: string, choiceId: string) => {
    setProgress((prev) => ({
      ...prev,
      scenarioChoices: { ...prev.scenarioChoices, [scenarioId]: choiceId },
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const markSimulationExplored = useCallback((simId: string) => {
    setProgress((prev) => {
      if (prev.simulationsExplored.includes(simId)) return prev;
      return {
        ...prev,
        simulationsExplored: [...prev.simulationsExplored, simId],
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const toggleObjectiveConfirmed = useCallback((objId: string) => {
    setProgress((prev) => {
      const exists = prev.objectivesConfirmed.includes(objId);
      return {
        ...prev,
        objectivesConfirmed: exists
          ? prev.objectivesConfirmed.filter((id) => id !== objId)
          : [...prev.objectivesConfirmed, objId],
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  const setReflectionNote = useCallback((note: string) => {
    setProgress((prev) => ({
      ...prev,
      reflectionNote: note,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const setStudentName = useCallback((name: string) => {
    setProgress((prev) => ({
      ...prev,
      studentName: name,
      updatedAt: new Date().toISOString(),
    }));
  }, []);

  const resetProgress = useCallback(() => {
    const fresh: StudentProgress = {
      ...DEFAULT_PROGRESS,
      updatedAt: new Date().toISOString(),
    };
    setProgress(fresh);
    setActiveSection('inicio');
    if (typeof window !== 'undefined') {
      window.location.hash = '#inicio';
      window.scrollTo({ top: 0, behavior: 'smooth' });
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
      } catch {
        // ignore
      }
    }
  }, []);

  const metrics = useMemo(() => {
    const totalCards = MODULE_1_CARDS.length + MODULE_2_CARDS.length + MODULE_3_CARDS.length;
    const cardsRead = progress.expandedCardsRead.length;

    const totalQuizzes = 5; // quiz-m1, quiz-m2-overfit, quiz-m2-bias, quiz-m3, quiz-m4
    const quizzesAnswered = Object.keys(progress.quizAnswers).length;

    const totalMatchings = 2; // match-paradigms, match-llm-phenomena
    const matchingsCompleted = Object.values(progress.matchingSolved).filter(Boolean).length;

    const totalScenarios = MODULE_4_SCENARIOS.length;
    const scenariosCompleted = Object.keys(progress.scenarioChoices).length;

    const totalSimulations = 2; // sim-fit, sim-llm
    const simulationsCompleted = progress.simulationsExplored.length;

    const totalMilestones =
      totalCards + totalQuizzes + totalMatchings + totalScenarios + totalSimulations;
    const completedMilestones =
      Math.min(cardsRead, totalCards) +
      Math.min(quizzesAnswered, totalQuizzes) +
      Math.min(matchingsCompleted, totalMatchings) +
      Math.min(scenariosCompleted, totalScenarios) +
      Math.min(simulationsCompleted, totalSimulations);

    const overallPercent = Math.round((completedMilestones / totalMilestones) * 100);

    const moduleStatus: Record<'modulo-1' | 'modulo-2' | 'modulo-3' | 'modulo-4', { done: number; total: number; isComplete: boolean }> = {
      'modulo-1': {
        done:
          MODULE_1_CARDS.filter((c) => progress.expandedCardsRead.includes(c.id)).length +
          (progress.matchingSolved['match-paradigms'] ? 1 : 0) +
          (progress.quizAnswers['quiz-m1'] ? 1 : 0),
        total: MODULE_1_CARDS.length + 2,
        isComplete: false,
      },
      'modulo-2': {
        done:
          MODULE_2_CARDS.filter((c) => progress.expandedCardsRead.includes(c.id)).length +
          (progress.simulationsExplored.includes('sim-fit') ? 1 : 0) +
          (progress.quizAnswers['quiz-m2-overfit'] ? 1 : 0) +
          (progress.quizAnswers['quiz-m2-bias'] ? 1 : 0),
        total: MODULE_2_CARDS.length + 3,
        isComplete: false,
      },
      'modulo-3': {
        done:
          MODULE_3_CARDS.filter((c) => progress.expandedCardsRead.includes(c.id)).length +
          (progress.simulationsExplored.includes('sim-llm') ? 1 : 0) +
          (progress.matchingSolved['match-llm-phenomena'] ? 1 : 0) +
          (progress.quizAnswers['quiz-m3'] ? 1 : 0),
        total: MODULE_3_CARDS.length + 3,
        isComplete: false,
      },
      'modulo-4': {
        done:
          MODULE_4_SCENARIOS.filter((s) => Boolean(progress.scenarioChoices[s.id])).length +
          (progress.quizAnswers['quiz-m4'] ? 1 : 0),
        total: MODULE_4_SCENARIOS.length + 1,
        isComplete: false,
      },
    };

    (Object.keys(moduleStatus) as Array<keyof typeof moduleStatus>).forEach((key) => {
      moduleStatus[key].isComplete = moduleStatus[key].done >= moduleStatus[key].total;
    });

    const recommendedNextSection: SectionId = (() => {
      if (!progress.visitedSections.includes('objetivos') && progress.objectivesConfirmed.length === 0) {
        return 'objetivos';
      }
      if (!moduleStatus['modulo-1'].isComplete) return 'modulo-1';
      if (!moduleStatus['modulo-2'].isComplete) return 'modulo-2';
      if (!moduleStatus['modulo-3'].isComplete) return 'modulo-3';
      if (!moduleStatus['modulo-4'].isComplete) return 'modulo-4';
      return 'cierre';
    })();

    return {
      totalCards,
      cardsRead,
      totalQuizzes,
      quizzesAnswered,
      totalMatchings,
      matchingsCompleted,
      totalScenarios,
      scenariosCompleted,
      totalSimulations,
      simulationsCompleted,
      totalObjectives: LEARNING_OBJECTIVES.length,
      objectivesConfirmedCount: progress.objectivesConfirmed.length,
      totalMilestones,
      completedMilestones,
      overallPercent,
      moduleStatus,
      recommendedNextSection,
    };
  }, [progress]);

  return {
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
  };
}
