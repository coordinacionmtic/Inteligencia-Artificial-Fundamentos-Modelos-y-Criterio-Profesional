export type SectionId =
  | 'inicio'
  | 'objetivos'
  | 'modulo-1'
  | 'modulo-2'
  | 'modulo-3'
  | 'modulo-4'
  | 'laboratorio'
  | 'cierre';

export interface ExpandableCardItem {
  id: string;
  indexLabel: string;
  title: string;
  subtitle: string;
  summary: string;
  mechanism: string;
  academicExample: string;
  limitation: string;
}

export interface QuizOption {
  id: string;
  label: string;
  isCorrect: boolean;
  feedback: string;
}

export interface QuizQuestion {
  id: string;
  moduleId: SectionId;
  context: string;
  prompt: string;
  options: QuizOption[];
  takeaway: string;
}

export interface MatchingPair {
  id: string;
  leftTitle: string;
  leftDetail: string;
  rightTitle: string;
  rightDetail: string;
  explanation: string;
}

export interface MatchingActivity {
  id: string;
  moduleId: SectionId;
  title: string;
  instructions: string;
  pairs: MatchingPair[];
}

export interface ScenarioChoice {
  id: string;
  label: string;
  summary: string;
  rigorScore: 'Alto' | 'Medio' | 'Bajo';
  ethicsScore: 'Sólido' | 'Vulnerable' | 'Crítico';
  humanOversight: 'Activa' | 'Parcial' | 'Ausente';
  consequence: string;
  recommendation: string;
  isOptimal: boolean;
}

export interface DecisionScenarioData {
  id: string;
  moduleId: SectionId;
  indexLabel: string;
  title: string;
  role: string;
  situation: string;
  dilemma: string;
  choices: ScenarioChoice[];
}

export interface LearningObjective {
  id: string;
  code: string;
  title: string;
  description: string;
  linkedModule: SectionId;
  linkedModuleLabel: string;
}

export interface CourseModuleMeta {
  id: SectionId;
  number: string;
  shortTitle: string;
  title: string;
  duration: string;
  focus: string;
  lead: string;
}

export interface StudentProgress {
  visitedSections: SectionId[];
  expandedCardsRead: string[];
  quizAnswers: Record<string, string>;
  matchingSolved: Record<string, boolean>;
  scenarioChoices: Record<string, string>;
  simulationsExplored: string[];
  objectivesConfirmed: string[];
  reflectionNote: string;
  studentName: string;
  lastSection: SectionId;
  updatedAt: string;
}
