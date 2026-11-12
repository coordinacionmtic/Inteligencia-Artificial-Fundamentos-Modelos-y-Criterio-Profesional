import type {
  CourseModuleMeta,
  DecisionScenarioData,
  ExpandableCardItem,
  LearningObjective,
  MatchingActivity,
  QuizQuestion,
  SectionId,
} from '../types/learning';

export const NAVIGATION_SECTIONS: {
  id: SectionId;
  label: string;
  shortLabel: string;
  category: string;
}[] = [
  { id: 'inicio', label: 'Inicio', shortLabel: 'Inicio', category: 'Introducción' },
  { id: 'objetivos', label: 'Objetivos de aprendizaje', shortLabel: 'Objetivos', category: 'Ruta' },
  { id: 'modulo-1', label: '01. Paradigmas de la IA', shortLabel: 'Módulo 01', category: 'Fundamentos' },
  { id: 'modulo-2', label: '02. Datos y generalización', shortLabel: 'Módulo 02', category: 'Modelado' },
  { id: 'modulo-3', label: '03. Atención y modelos generativos', shortLabel: 'Módulo 03', category: 'Arquitecturas' },
  { id: 'modulo-4', label: '04. Ética y criterio profesional', shortLabel: 'Módulo 04', category: 'Aplicación' },
  { id: 'laboratorio', label: 'Laboratorio interactivo', shortLabel: 'Laboratorio', category: 'Práctica' },
  { id: 'cierre', label: 'Cierre y aprendizajes', shortLabel: 'Cierre', category: 'Síntesis' },
];

export const COURSE_MODULES: CourseModuleMeta[] = [
  {
    id: 'modulo-1',
    number: '01',
    shortTitle: 'Paradigmas',
    title: 'Paradigmas de la Inteligencia Artificial',
    duration: '15 min',
    focus: 'Taxonomía técnica y criterios de selección',
    lead: 'Distingue entre sistemas basados en reglas, aprendizaje automático clásico, redes profundas y modelos generativos para elegir la arquitectura adecuada a cada problema.',
  },
  {
    id: 'modulo-2',
    number: '02',
    shortTitle: 'Entrenamiento',
    title: 'Cómo aprende un modelo: datos, ajuste y sesgo',
    duration: '20 min',
    focus: 'Simulación de frontera de decisión y validación',
    lead: 'Comprende cómo los datos históricos moldean las predicciones, por qué un modelo memoriza en lugar de generalizar y cómo detectar sesgos estructurales.',
  },
  {
    id: 'modulo-3',
    number: '03',
    shortTitle: 'Generativa',
    title: 'Redes neuronales, atención y modelos de lenguaje',
    duration: '20 min',
    focus: 'Tokenización, temperatura probabilística y alucinaciones',
    lead: 'Explora el mecanismo de autoatención y la predicción probabilística de tokens para diseñar instrucciones precisas y evaluar críticamente las salidas generativas.',
  },
  {
    id: 'modulo-4',
    number: '04',
    shortTitle: 'Criterio ético',
    title: 'Ética, verificación y toma de decisiones profesionales',
    duration: '15 min',
    focus: 'Escenarios universitarios y supervisión humana',
    lead: 'Aplica marcos de responsabilidad académica, privacidad de datos y trazabilidad en situaciones reales de investigación, docencia y ejercicio profesional.',
  },
];

export const LEARNING_OBJECTIVES: LearningObjective[] = [
  {
    id: 'obj-1',
    code: 'RA-01',
    title: 'Diferenciar enfoques computacionales según el problema',
    description:
      'Contrastar sistemas simbólicos, modelos supervisados, aprendizaje profundo e IA generativa evaluando requisitos de datos, interpretabilidad y costo computacional.',
    linkedModule: 'modulo-1',
    linkedModuleLabel: 'Módulo 01 · Paradigmas',
  },
  {
    id: 'obj-2',
    code: 'RA-02',
    title: 'Diagnosticar el equilibrio entre subajuste, generalización y sobreajuste',
    description:
      'Interpretar curvas de error en entrenamiento y validación para evitar modelos rígidos o memorizaciones frágiles frente a ruido estadístico.',
    linkedModule: 'modulo-2',
    linkedModuleLabel: 'Módulo 02 · Datos y generalización',
  },
  {
    id: 'obj-3',
    code: 'RA-03',
    title: 'Controlar parámetros y verificación en modelos de lenguaje',
    description:
      'Explicar el rol de la temperatura, el contexto y la probabilidad condicional en la generación de texto para mitigar alucinaciones y errores factuales.',
    linkedModule: 'modulo-3',
    linkedModuleLabel: 'Módulo 03 · Modelos generativos',
  },
  {
    id: 'obj-4',
    code: 'RA-04',
    title: 'Ejercer supervisión humana y ética en contextos universitarios',
    description:
      'Tomar decisiones fundamentadas sobre privacidad, atribución de autoría y equidad algorítmica manteniendo la responsabilidad profesional sobre los resultados.',
    linkedModule: 'modulo-4',
    linkedModuleLabel: 'Módulo 04 · Criterio profesional',
  },
];

export const MODULE_1_CARDS: ExpandableCardItem[] = [
  {
    id: 'm1-simbolica',
    indexLabel: '01',
    title: 'IA Simbólica (Sistemas basados en reglas)',
    subtitle: 'Lógica explícita y conocimiento codificado por humanos',
    summary:
      'Opera mediante proposiciones lógicas explícitas (si ocurre A y B, entonces C) definidas por especialistas del dominio.',
    mechanism:
      'Motor de inferencia determinista que recorre árboles de reglas o grafos de conocimiento sin requerir grandes volúmenes de ejemplos estadísticos.',
    academicExample:
      'Validación automática de prerrequisitos curriculares en un sistema de matrícula universitaria o verificación normativa de expedientes.',
    limitation:
      'Se vuelve frágil ante ambigüedades del lenguaje natural, excepciones no previstas o datos visuales no estructurados.',
  },
  {
    id: 'm1-ml',
    indexLabel: '02',
    title: 'Aprendizaje Automático Clásico (Machine Learning)',
    subtitle: 'Patrones estadísticos sobre variables tabulares estructuradas',
    summary:
      'Algoritmos como regresión logística, árboles de decisión y bosques aleatorios que ajustan parámetros a partir de datos etiquetados o históricos.',
    mechanism:
      'El equipo humano selecciona variables relevantes (ingeniería de características) y el algoritmo optimiza una función objetivo para minimizar errores.',
    academicExample:
      'Predicción temprana de riesgo de deserción estudiantil a partir de asistencia, entregas parciales y participación en aula virtual.',
    limitation:
      'Depende fuertemente de la calidad de las variables diseñadas manualmente y pierde eficacia frente a imágenes, audio o texto crudo.',
  },
  {
    id: 'm1-dl',
    indexLabel: '03',
    title: 'Aprendizaje Profundo (Deep Learning)',
    subtitle: 'Representaciones jerárquicas en múltiples capas neuronales',
    summary:
      'Redes neuronales artificiales con múltiples capas ocultas capaces de extraer características complejas directamente desde datos sin procesar.',
    mechanism:
      'Cada capa transforma la entrada en representaciones progresivamente más abstractas mediante pesos ajustados por retropropagación del error.',
    academicExample:
      'Detección de anomalías en radiografías médicas o transcripción automática de conferencias académicas con distintos acentos.',
    limitation:
      'Requiere grandes volúmenes de datos, alto consumo energético y ofrece baja interpretabilidad directa ("caja negra").',
  },
  {
    id: 'm1-genai',
    indexLabel: '04',
    title: 'Inteligencia Artificial Generativa',
    subtitle: 'Síntesis probabilística de texto, código, imagen o audio',
    summary:
      'Modelos fundacionales entrenados a gran escala capaces de generar contenido nuevo coherente condicionado por una instrucción o contexto.',
    mechanism:
      'Estima distribuciones de probabilidad sobre secuencias de tokens (Transformers) o procesos iterativos de eliminación de ruido (Difusión).',
    academicExample:
      'Asistencia en síntesis exploratoria de literatura científica, generación de casos de prueba de software o adaptación de material didáctico.',
    limitation:
      'No razona ni verifica hechos como una base de datos: puede producir afirmaciones verosímiles pero falsas (alucinaciones) con tono seguro.',
  },
];

export const MODULE_1_MATCHING: MatchingActivity = {
  id: 'match-paradigms',
  moduleId: 'modulo-1',
  title: 'Actividad de asociación: del problema al paradigma',
  instructions:
    'Selecciona un desafío académico de la columna izquierda y emparéjalo con el enfoque de IA más pertinente de la columna derecha.',
  pairs: [
    {
      id: 'p1-reglas',
      leftTitle: 'Validar créditos y prerrequisitos de grado',
      leftDetail: 'Normativa institucional fija, sin ambigüedad y con trazabilidad legal obligatoria.',
      rightTitle: 'IA Simbólica (Reglas explícitas)',
      rightDetail: 'Lógica determinista auditable al 100 %.',
      explanation:
        'Cuando existen reglas institucionales exactas y se exige auditabilidad jurídica total, un motor lógico determinista supera a cualquier modelo probabilístico.',
    },
    {
      id: 'p2-tabular',
      leftTitle: 'Anticipar abandono en cursos virtuales',
      leftDetail: 'Base de datos tabular con 12 indicadores de actividad semanal y calificaciones.',
      rightTitle: 'Aprendizaje Automático Clásico',
      rightDetail: 'Árboles de decisión o regresión sobre variables tabulares.',
      explanation:
        'En datos estructurados tabulares de tamaño moderado, modelos clásicos como Gradient Boosting o Random Forest ofrecen alta precisión e interpretabilidad.',
    },
    {
      id: 'p3-vision',
      leftTitle: 'Clasificar células en microscopía digital',
      leftDetail: 'Miles de imágenes de alta resolución con variaciones de iluminación y textura.',
      rightTitle: 'Aprendizaje Profundo (Redes convolucionales)',
      rightDetail: 'Extracción automática de patrones visuales jerárquicos.',
      explanation:
        'El aprendizaje profundo sobresale en datos perceptuales no estructurados como imágenes médicas donde definir reglas manuales es inviable.',
    },
    {
      id: 'p4-genai',
      leftTitle: 'Redactar cuestionarios formativos desde un temario',
      leftDetail: 'Se requiere producir borradores lingüísticos variados que luego revisará el docente.',
      rightTitle: 'IA Generativa (Modelos de lenguaje)',
      rightDetail: 'Síntesis contextual de texto con revisión humana.',
      explanation:
        'Los modelos generativos aceleran la producción de borradores textuales diversos siempre que exista validación experta posterior.',
    },
  ],
};

export const MODULE_1_QUIZ: QuizQuestion = {
  id: 'quiz-m1',
  moduleId: 'modulo-1',
  context: 'Caso de arquitectura en gestión universitaria',
  prompt:
    'Una facultad quiere automatizar el cálculo de becas según un reglamento publicado en el estatuto estudiantil (promedio ≥ 4.2, estrato socioeconómico y cero sanciones). Un proveedor propone entrenar un modelo generativo grande para que "decida" las becas. ¿Cuál es el criterio técnico correcto?',
  options: [
    {
      id: 'a',
      label: 'Aceptar el modelo generativo porque es la tecnología más avanzada disponible.',
      isCorrect: false,
      feedback:
        'Elegir la tecnología más compleja para un problema determinista introduce opacidad, costos innecesarios y riesgo de inconsistencias probabilísticas.',
    },
    {
      id: 'b',
      label: 'Implementar reglas explícitas auditables, ya que los criterios son normativos y deterministas.',
      isCorrect: true,
      feedback:
        'Correcto. Cuando la decisión se rige por criterios legales o estatutarios exactos, la lógica explícita garantiza transparencia, reproducibilidad y equidad.',
    },
    {
      id: 'c',
      label: 'Entrenar una red neuronal profunda con imágenes de los carnés estudiantiles.',
      isCorrect: false,
      feedback:
        'Las redes profundas sobre imágenes no resuelven ni justifican el cálculo normativo sobre variables administrativas tabulares.',
    },
  ],
  takeaway:
    'La sofisticación técnica no equivale a pertinencia: todo diseño en IA comienza evaluando si el problema requiere determinismo normativo, predicción estadística o síntesis generativa.',
};

export const MODULE_2_CARDS: ExpandableCardItem[] = [
  {
    id: 'm2-split',
    indexLabel: '01',
    title: 'División en entrenamiento, validación y prueba',
    subtitle: 'Medir capacidad de generalización y no memoria mecánica',
    summary:
      'Nunca se evalúa un modelo con los mismos ejemplos que utilizó para ajustar sus parámetros.',
    mechanism:
      'Se reserva un subconjunto independiente (validación y prueba) para comprobar cómo responde el modelo ante casos inéditos reales.',
    academicExample:
      'Entrenar un predictor de rendimiento con cohortes 2021–2023 y evaluarlo sobre la cohorte 2024 sin filtrar datos futuros.',
    limitation:
      'Si ocurre fuga de datos (data leakage) entre conjuntos, las métricas aparentan perfección en laboratorio y fracasan en producción.',
  },
  {
    id: 'm2-fit',
    indexLabel: '02',
    title: 'Tensión entre subajuste y sobreajuste',
    subtitle: 'El equilibrio entre simplicidad excesiva e hipercomplejidad',
    summary:
      'Un modelo demasiado simple ignora tendencias reales (subajuste); uno excesivamente complejo memoriza el ruido (sobreajuste).',
    mechanism:
      'Al aumentar la complejidad del modelo, el error de entrenamiento siempre baja, pero el error de validación desciende solo hasta un punto óptimo antes de volver a subir.',
    academicExample:
      'Un tutor automático que memoriza exactamente las respuestas literales de cinco exámenes pasados y falla cuando cambia la redacción de la pregunta.',
    limitation:
      'Sin regularización ni validación cruzada, los modelos complejos confunden fluctuaciones aleatorias con leyes generales.',
  },
  {
    id: 'm2-bias',
    indexLabel: '03',
    title: 'Sesgo de datos y representatividad',
    subtitle: 'Los algoritmos amplifican asimetrías históricas',
    summary:
      'Un modelo aprende las regularidades presentes en su muestra; si el histórico excluye poblaciones o refleja prejuicios, el sistema los automatizará.',
    mechanism:
      'Desbalances de clase, variables proxy correlacionadas con atributos protegidos o etiquetas subjetivas contaminan la función de pérdida.',
    academicExample:
      'Un sistema de reconocimiento de voz entrenado solo con hablantes urbanos adultos presenta tasas de error tres veces mayores en dialectos regionales.',
    limitation:
      'Ningún ajuste matemático posterior compensa por completo una recolección de datos sesgada o carente de diversidad.',
  },
];

export const MODULE_2_QUIZZES: QuizQuestion[] = [
  {
    id: 'quiz-m2-overfit',
    moduleId: 'modulo-2',
    context: 'Diagnóstico en proyecto de ciencia de datos',
    prompt:
      'Un estudiante entrena un clasificador de deserción académica y reporta 99.4 % de precisión en el conjunto de entrenamiento, pero solo 61.2 % en el conjunto de validación. ¿Qué fenómeno está observando?',
    options: [
      {
        id: 'a',
        label: 'Subajuste (underfitting): el modelo es demasiado simple para captar el problema.',
        isCorrect: false,
        feedback:
          'En el subajuste ambas métricas (entrenamiento y validación) son bajas porque el modelo no logra aprender ni siquiera los datos conocidos.',
      },
      {
        id: 'b',
        label: 'Sobreajuste (overfitting): el modelo memorizó patrones específicos y ruido del entrenamiento.',
        isCorrect: true,
        feedback:
          'Exacto. La brecha amplia entre un entrenamiento casi perfecto y una validación pobre es el síntoma clásico de sobreajuste.',
      },
      {
        id: 'c',
        label: 'Equilibrio óptimo, ya que 99.4 % demuestra que los datos están limpios.',
        isCorrect: false,
        feedback:
          'El desempeño real de un modelo se juzga en datos no vistos (validación/prueba), nunca únicamente en entrenamiento.',
      },
    ],
    takeaway:
      'Una precisión alta en entrenamiento carece de valor si no se sostiene sobre datos de validación independientes.',
  },
  {
    id: 'quiz-m2-bias',
    moduleId: 'modulo-2',
    context: 'Auditoría de equidad en admisiones virtuales',
    prompt:
      'Al entrenar un sistema de recomendación de rutas de nivelación, se observa que asigna sistemáticamente menos tutorías avanzadas a estudiantes de zonas rurales porque históricamente tuvieron menor conectividad y menos registros de plataforma. ¿Cuál es la causa raíz?',
    options: [
      {
        id: 'a',
        label: 'Sesgo histórico y de medición incorporado en los datos de entrenamiento.',
        isCorrect: true,
        feedback:
          'Correcto. El modelo interpreta la falta histórica de registros digitales como menor potencial académico, reproduciendo una desigualdad previa.',
      },
      {
        id: 'b',
        label: 'Falta de potencia de procesamiento en el servidor donde corre el modelo.',
        isCorrect: false,
        feedback:
          'La capacidad de cómputo acelera el entrenamiento pero no corrige asimetrías estructurales en la muestra.',
      },
      {
        id: 'c',
        label: 'Exceso de transparencia en la interfaz del estudiante.',
        isCorrect: false,
        feedback:
          'La transparencia permite detectar el problema, no es quien lo origina.',
      },
    ],
    takeaway:
      'La ausencia de datos o la desigualdad de acceso registrada en variables históricas produce discriminación algorítmica si no se audita el contexto social del dato.',
  },
];

export const MODULE_3_CARDS: ExpandableCardItem[] = [
  {
    id: 'm3-tokens',
    indexLabel: '01',
    title: 'Tokenización y espacio vectorial (Embeddings)',
    subtitle: 'Cómo el texto se transforma en geometría numérica',
    summary:
      'Los modelos de lenguaje no leen palabras como los humanos: dividen el texto en fragmentos llamados tokens y los proyectan como vectores numéricos.',
    mechanism:
      'Conceptos con usos semánticos afines quedan cercanos en el espacio vectorial, permitiendo operaciones matemáticas de similitud contextual.',
    academicExample:
      'Un mismo término como "banco" cambia de representación vectorial según aparezca junto a "interés financiero" o "especie coralina".',
    limitation:
      'Las palabras poco frecuentes o en idiomas subrepresentados se fragmentan en más tokens, elevando costo y reduciendo precisión.',
  },
  {
    id: 'm3-attention',
    indexLabel: '02',
    title: 'Mecanismo de Autoatención (Transformers)',
    subtitle: 'Ponderación dinámica de relaciones en toda la secuencia',
    summary:
      'La arquitectura Transformer evalúa en paralelo qué partes previas del texto son más relevantes para interpretar y predecir el siguiente token.',
    mechanism:
      'Mediante matrices de consulta, clave y valor (Q, K, V), cada token atiende selectivamente a otros tokens sin importar la distancia dentro de la ventana de contexto.',
    academicExample:
      'Resolver correctamente a quién refiere el pronombre "ella" en un párrafo jurídico largo con varios sujetos mencionados previamente.',
    limitation:
      'La atención tiene un límite físico de ventana de contexto y puede perder foco en instrucciones enterradas en medio de documentos extensos.',
  },
  {
    id: 'm3-hallucination',
    indexLabel: '03',
    title: 'Predicción probabilística y alucinaciones',
    subtitle: 'Por qué un modelo inventa citas con fluidez impecable',
    summary:
      'Un LLM optimiza plausibilidad estadística de la siguiente palabra, no veracidad documental ni consulta directa a fuentes verificadas.',
    mechanism:
      'Cuando falta contexto verificable o la temperatura aumenta, el modelo muestrea continuaciones estadísticamente fluidas aunque los datos concretos (autores, DOI, cifras) sean fabricados.',
    academicExample:
      'Solicitar cinco referencias APA sobre un tema muy específico sin aportar fuentes reales suele producir artículos inexistentes con nombres de revistas reales.',
    limitation:
      'La fluidez gramatical nunca debe confundirse con validez epistémica; toda afirmación fáctica exige verificación externa.',
  },
];

export const MODULE_3_MATCHING: MatchingActivity = {
  id: 'match-llm-phenomena',
  moduleId: 'modulo-3',
  title: 'Actividad de asociación: fenómenos generativos y mitigación',
  instructions:
    'Conecta cada comportamiento observable en un modelo de lenguaje con su causa técnica y estrategia de control.',
  pairs: [
    {
      id: 'm3-p1',
      leftTitle: 'Cita bibliográfica inventada (DOI falso)',
      leftDetail: 'El modelo redacta una referencia impecable en formato APA que no existe en bases científicas.',
      rightTitle: 'Predicción sin anclaje documental',
      rightDetail: 'Mitigación: aportar fuentes reales y verificar cada referencia.',
      explanation:
        'Al no consultar una base bibliográfica en vivo, el modelo completa patrones probables de nombres y años que lucen creíbles pero son ficticios.',
    },
    {
      id: 'm3-p2',
      leftTitle: 'Respuestas erráticas o divagantes',
      leftDetail: 'En sucesivos intentos sobre un cálculo técnico, el texto cambia drásticamente de rumbo.',
      rightTitle: 'Temperatura de muestreo elevada',
      rightDetail: 'Mitigación: reducir temperatura (≤ 0.2) en tareas analíticas.',
      explanation:
        'Una temperatura alta aplana la distribución de probabilidad, dando oportunidad a tokens improbables que perjudican la precisión técnica.',
    },
    {
      id: 'm3-p3',
      leftTitle: 'Olvido de restricciones iniciales',
      leftDetail: 'Tras 30 páginas pegadas en el chat, el modelo ignora el formato de salida pedido al inicio.',
      rightTitle: 'Saturación de ventana de contexto',
      rightDetail: 'Mitigación: segmentar tareas y reiterar criterios clave.',
      explanation:
        'Aunque la ventana acepte miles de tokens, la atención efectiva se degrada cuando se acumula ruido irrelevante.',
    },
    {
      id: 'm3-p4',
      leftTitle: 'Salida genérica y superficial',
      leftDetail: 'El resumen no distingue nivel universitario ni enfoque metodológico requerido.',
      rightTitle: 'Instrucción subespecificada (Prompt vago)',
      rightDetail: 'Mitigación: definir rol, audiencia, criterios y formato.',
      explanation:
        'Sin restricciones explícitas, el modelo converge hacia el promedio estadístico más genérico de su corpus de entrenamiento.',
    },
  ],
};

export const MODULE_3_QUIZ: QuizQuestion = {
  id: 'quiz-m3',
  moduleId: 'modulo-3',
  context: 'Diseño de flujo académico con LLM',
  prompt:
    'Necesitas usar un modelo de lenguaje para extraer definiciones exactas y fechas históricas desde un documento PDF de normativa universitaria que ya tienes en tu poder. ¿Qué configuración y práctica reduce al mínimo el riesgo de invención?',
  options: [
    {
      id: 'a',
      label: 'Subir la temperatura a 1.3 para que el modelo sea más exhaustivo en sus respuestas.',
      isCorrect: false,
      feedback:
        'Aumentar la temperatura incrementa la aleatoriedad en la selección de tokens, elevando la probabilidad de desviaciones o invenciones.',
    },
    {
      id: 'b',
      label: 'Incluir el fragmento fuente en el prompt, usar temperatura baja (0.0–0.2) y pedir cita textual verificable.',
      isCorrect: true,
      feedback:
        'Correcto. Anclar la respuesta al documento suministrado y restringir la aleatoriedad maximiza la fidelidad y facilita la auditoría humana.',
    },
    {
      id: 'c',
      label: 'Pedir al modelo que responda de memoria sin adjuntar el documento para ahorrar tokens.',
      isCorrect: false,
      feedback:
        'Confiar en la memoria paramétrica para normativas institucionales específicas casi siempre deriva en imprecisiones.',
    },
  ],
  takeaway:
    'Para tareas extractivas y analíticas, el anclaje en fuentes provistas y una temperatura baja convierten al modelo en una herramienta controlable y auditable.',
};

export const MODULE_4_SCENARIOS: DecisionScenarioData[] = [
  {
    id: 'esc-tesis',
    moduleId: 'modulo-4',
    indexLabel: 'Escenario 01',
    title: 'Revisión bibliográfica en proyecto de grado',
    role: 'Estudiante de último año en seminario de investigación virtual',
    situation:
      'Debes entregar el estado del arte de tu trabajo de grado en 48 horas. Utilizas un modelo generativo para sintetizar tendencias y el sistema entrega cinco párrafos coherentes acompañados de ocho referencias académicas recientes.',
    dilemma:
      '¿Cómo integras este apoyo en tu entrega cumpliendo rigor científico e integridad académica?',
    choices: [
      {
        id: 'c1-a',
        label: 'Copiar los párrafos y las ocho referencias directamente en el documento final.',
        summary: 'Ahorro inmediato de tiempo sin verificación ni trazabilidad.',
        rigorScore: 'Bajo',
        ethicsScore: 'Crítico',
        humanOversight: 'Ausente',
        consequence:
          'Al revisar el jurado dos referencias, descubre que los títulos combinan autores reales con revistas falsas (alucinación bibliográfica). El trabajo es devuelto por falta grave de rigor e integridad.',
        recommendation:
          'Nunca incorpores citas ni afirmaciones generadas por IA sin leer y contrastar las fuentes primarias originales.',
        isOptimal: false,
      },
      {
        id: 'c1-b',
        label: 'Buscar manualmente las fuentes primarias en bases indexadas, leer los artículos reales y usar la IA solo como apoyo de estructuración declarando su uso.',
        summary: 'Control epistémico humano, verificación documental y transparencia.',
        rigorScore: 'Alto',
        ethicsScore: 'Sólido',
        humanOversight: 'Activa',
        consequence:
          'Detectas que tres de las ocho citas sugeridas no existían, pero aprovechas los conceptos clave para localizar artículos reales en Scopus y SciELO. Tu marco teórico queda sólido, trazable y honesto.',
        recommendation:
          'Criterio óptimo: la IA actúa como asistente exploratorio mientras tú conservas la autoría intelectual y la validación de fuentes.',
        isOptimal: true,
      },
      {
        id: 'c1-c',
        label: 'Reescribir el texto con sinónimos para que no lo detecte un software antiplagio, sin revisar las citas.',
        summary: 'Enfoque cosmético que mantiene intactos los errores factuales.',
        rigorScore: 'Bajo',
        ethicsScore: 'Vulnerable',
        humanOversight: 'Parcial',
        consequence:
          'Parafrasear un error factual sigue siendo un error factual. Además, ocultar el flujo metodológico debilita la defensa oral frente al comité evaluador.',
        recommendation:
          'La calidad académica se mide por la solidez de los argumentos y las evidencias, no por evadir detectores.',
        isOptimal: false,
      },
    ],
  },
  {
    id: 'esc-clinica',
    moduleId: 'modulo-4',
    indexLabel: 'Escenario 02',
    title: 'Privacidad de datos en prácticas profesionales',
    role: 'Practicante universitario en área de orientación psicosocial / salud',
    situation:
      'Tu supervisor te pide redactar un informe resumen a partir de diez entrevistas confidenciales con usuarios reales. Piensas pegar las transcripciones completas con nombres, documentos de identidad y diagnósticos en una herramienta gratuita de IA en línea.',
    dilemma:
      '¿Qué decisión protege los derechos de las personas y cumple la normativa de protección de datos?',
    choices: [
      {
        id: 'c2-a',
        label: 'Subir las transcripciones completas indicando en el prompt "por favor mantén la confidencialidad".',
        summary: 'Confía en una petición lingüística sobre una plataforma pública externa.',
        rigorScore: 'Bajo',
        ethicsScore: 'Crítico',
        humanOversight: 'Ausente',
        consequence:
          'Escribir "sé confidencial" en un prompt no tiene efecto legal ni técnico: los datos personales sensibles salen del entorno institucional y pueden quedar almacenados o usarse en entrenamiento futuro.',
        recommendation:
          'Jamás ingreses datos personales identificables ni historias clínicas en servicios externos no autorizados.',
        isOptimal: false,
      },
      {
        id: 'c2-b',
        label: 'Anonimizar y disociar previamente los registros eliminando todo dato identificable, o procesar el análisis en herramientas locales autorizadas por la institución.',
        summary: 'Protección por diseño y cumplimiento ético-legal.',
        rigorScore: 'Alto',
        ethicsScore: 'Sólido',
        humanOversight: 'Activa',
        consequence:
          'Al retirar nombres, cédulas, ubicaciones exactas y detalles únicos antes de trabajar con resúmenes codificados (y validar políticas institucionales), proteges la privacidad sin sacrificar la síntesis temática.',
        recommendation:
          'Excelente decisión: la minimización y anonimización previa es una regla innegociable de higiene de datos.',
        isOptimal: true,
      },
      {
        id: 'c2-c',
        label: 'Cambiar únicamente el primer nombre de los entrevistados dejando cédulas y direcciones intactas.',
        summary: 'Seudonimización incompleta que permite reidentificación inmediata.',
        rigorScore: 'Medio',
        ethicsScore: 'Vulnerable',
        humanOversight: 'Parcial',
        consequence:
          'Cualquier identificador único como el número de documento o dirección permite identificar a la persona de forma directa, manteniendo la vulneración de privacidad.',
        recommendation:
          'La anonimización efectiva exige eliminar tanto identificadores directos como combinaciones indirectas que revelen la identidad.',
        isOptimal: false,
      },
    ],
  },
  {
    id: 'esc-talento',
    moduleId: 'modulo-4',
    indexLabel: 'Escenario 03',
    title: 'Automatización de evaluación y supervisión humana',
    role: 'Coordinación académica en programa de educación continua',
    situation:
      'Se propone utilizar un sistema automático de IA para calificar ensayos abiertos y decidir de manera definitiva quién aprueba o reprueba la asignatura sin revisión docente, argumentando ahorro de tiempo.',
    dilemma:
      '¿Qué diseño garantiza justicia evaluativa, explicabilidad y derecho a réplica?',
    choices: [
      {
        id: 'c3-a',
        label: 'Dejar la calificación final 100 % automática para garantizar "objetividad matemática".',
        summary: 'Delegación total sin apelación ni revisión pedagógica.',
        rigorScore: 'Medio',
        ethicsScore: 'Crítico',
        humanOversight: 'Ausente',
        consequence:
          'Los modelos pueden penalizar estilos de redacción válidos, no comprender ironía o argumentos innovadores y dejar al estudiante sin explicación comprensible para apelar su nota.',
        recommendation:
          'Las decisiones de alto impacto sobre trayectorias educativas o laborales nunca deben ser completamente automatizadas sin supervisión humana.',
        isOptimal: false,
      },
      {
        id: 'c3-b',
        label: 'Utilizar la IA como apoyo de prelectura y retroalimentación formativa preliminar, manteniendo la evaluación sumativa y decisión final bajo criterio docente.',
        summary: 'Esquema Human-in-the-Loop con rúbrica explícita y trazabilidad.',
        rigorScore: 'Alto',
        ethicsScore: 'Sólido',
        humanOversight: 'Activa',
        consequence:
          'El sistema ayuda a organizar observaciones iniciales frente a una rúbrica transparente, mientras el docente lee, ajusta, justifica y firma la calificación definitiva.',
        recommendation:
          'Decisiones humanas informadas combinan eficiencia operativa con justicia pedagógica y rendición de cuentas.',
        isOptimal: true,
      },
      {
        id: 'c3-c',
        label: 'Publicar las notas generadas por la IA y revisar solo si algún estudiante presenta una queja formal.',
        summary: 'Supervisión reactiva tardía que traslada la carga de auditoría al estudiante.',
        rigorScore: 'Medio',
        ethicsScore: 'Vulnerable',
        humanOversight: 'Parcial',
        consequence:
          'Muchos estudiantes en modalidad virtual no cuestionan errores del sistema por asimetría de poder, perpetuando calificaciones injustas silenciosas.',
        recommendation:
          'La supervisión debe ser preventiva y activa antes de emitir consecuencias académicas.',
        isOptimal: false,
      },
    ],
  },
];

export const MODULE_4_QUIZ: QuizQuestion = {
  id: 'quiz-m4',
  moduleId: 'modulo-4',
  context: 'Síntesis de gobernanza y responsabilidad profesional',
  prompt:
    'Si un informe profesional redactado con asistencia de un modelo generativo contiene un dato erróneo que causa un perjuicio a un cliente o comunidad, ¿sobre quién recae en última instancia la responsabilidad ética y profesional?',
  options: [
    {
      id: 'a',
      label: 'Exclusivamente sobre la empresa desarrolladora del modelo porque el algoritmo cometió el fallo.',
      isCorrect: false,
      feedback:
        'Los términos de uso y los códigos deontológicos profesionales establecen que una herramienta estadística no es sujeto moral ni reemplaza la diligencia del profesional.',
    },
    {
      id: 'b',
      label: 'Sobre el profesional o equipo humano que adoptó, validó y firmó el informe sin verificarlo.',
      isCorrect: true,
      feedback:
        'Correcto. El principio de agencia y supervisión humana establece que quien firma y entrega un producto profesional asume la responsabilidad de su verificación.',
    },
    {
      id: 'c',
      label: 'Sobre nadie, porque los sistemas probabilísticos tienen margen de error aceptado.',
      isCorrect: false,
      feedback:
        'La naturaleza probabilística de la IA es precisamente la razón por la que se exige validación humana experta antes de su aplicación.',
    },
  ],
  takeaway:
    'La inteligencia artificial amplifica la capacidad de análisis y síntesis, pero jamás transfiere la responsabilidad ética, jurídica ni intelectual del profesional.',
};
