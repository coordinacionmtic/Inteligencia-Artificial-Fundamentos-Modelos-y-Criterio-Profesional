import { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, RotateCcw, Sliders } from 'lucide-react';

interface ModelFitSimulatorProps {
  isExplored: boolean;
  onExplore: (simId: string) => void;
}

interface DataPoint {
  x: number;
  y: number;
  label: 'A' | 'B';
  split: 'train' | 'val';
}

function trueBoundaryY(x: number, mode: 'curved' | 'linear'): number {
  if (mode === 'linear') {
    return 0.25 + 0.55 * x;
  }
  return 0.5 + 0.26 * Math.sin(x * Math.PI * 1.45) - 0.1 * (x - 0.5);
}

function modelPredictY(x: number, complexity: number, noise: number, mode: 'curved' | 'linear'): number {
  const base = trueBoundaryY(x, mode);
  if (complexity <= 2) {
    // Underfitting: overly flat linear approximation
    const slope = mode === 'linear' ? 0.32 : 0.05;
    return 0.48 + slope * (x - 0.5);
  }
  if (complexity <= 5) {
    // Balanced region
    const blend = (complexity - 2) / 3;
    const flat = 0.5;
    const smooth = flat * (1 - blend * 0.85) + base * (blend * 0.85);
    return smooth + (noise / 100) * 0.03 * Math.sin(x * 9);
  }
  // Overfitting: high-frequency oscillations chasing noisy points
  const overIntensity = ((complexity - 5) / 4) * (0.09 + (noise / 100) * 0.24);
  const wiggle =
    overIntensity *
    (Math.sin(x * 22) * 0.6 + Math.cos(x * 37) * 0.45 + Math.sin(x * 53) * 0.35);
  return Math.max(0.06, Math.min(0.94, base + wiggle));
}

export function ModelFitSimulator({ isExplored, onExplore }: ModelFitSimulatorProps) {
  const [complexity, setComplexity] = useState<number>(4);
  const [noise, setNoise] = useState<number>(12);
  const [datasetMode, setDatasetMode] = useState<'curved' | 'linear'>('curved');

  const points: DataPoint[] = useMemo(() => {
    const generated: DataPoint[] = [];
    const total = 40;
    for (let i = 0; i < total; i++) {
      const rx = ((i * 73 + 19) % 100) / 100;
      const x = 0.08 + rx * 0.84;
      const ry = ((i * 41 + 37) % 100) / 100;
      const y = 0.1 + ry * 0.8;
      const split: 'train' | 'val' = i % 5 < 3 ? 'train' : 'val';
      const boundary = trueBoundaryY(x, datasetMode);
      const jitter = (((i * 29) % 17) - 8) / 8;
      const noisyThreshold = boundary + (noise / 100) * 0.22 * jitter;
      const label: 'A' | 'B' = y >= noisyThreshold ? 'A' : 'B';
      generated.push({ x, y, label, split });
    }
    return generated;
  }, [datasetMode, noise]);

  const metrics = useMemo(() => {
    const trainPts = points.filter((p) => p.split === 'train');
    const valPts = points.filter((p) => p.split === 'val');

    const classify = (p: DataPoint): 'A' | 'B' => {
      const predBoundary = modelPredictY(p.x, complexity, noise, datasetMode);
      return p.y >= predBoundary ? 'A' : 'B';
    };

    const rawTrainCorrect = trainPts.filter((p) => classify(p) === p.label).length;
    const rawValCorrect = valPts.filter((p) => classify(p) === p.label).length;

    // Pedagogically faithful train/validation curves reflecting bias-variance tradeoff
    const trainAccBase = Math.round((rawTrainCorrect / trainPts.length) * 100);
    const valAccBase = Math.round((rawValCorrect / valPts.length) * 100);

    const complexityBonus = Math.min(18, complexity * 2);
    const overfitPenalty = complexity > 5 ? (complexity - 5) * (4 + Math.round(noise * 0.22)) : 0;
    const underfitPenalty = complexity < 3 && datasetMode === 'curved' ? (3 - complexity) * 11 : 0;

    const trainAcc = Math.min(99, Math.max(52, Math.round(trainAccBase * 0.55 + 32 + complexityBonus - noise * 0.15)));
    const valAcc = Math.min(96, Math.max(48, Math.round(valAccBase * 0.55 + 34 + (complexity <= 5 ? complexity * 2.5 : 12) - overfitPenalty - underfitPenalty - noise * 0.35)));

    let regime: 'underfit' | 'optimal' | 'overfit' = 'optimal';
    if (complexity <= 2 && datasetMode === 'curved') {
      regime = 'underfit';
    } else if (complexity <= 1 && datasetMode === 'linear') {
      regime = 'underfit';
    } else if (complexity >= 6) {
      regime = 'overfit';
    }

    return { trainAcc, valAcc, gap: Math.max(0, trainAcc - valAcc), regime };
  }, [points, complexity, noise, datasetMode]);

  const pathData = useMemo(() => {
    const width = 440;
    const height = 270;
    const steps = 60;
    const coords: string[] = [];
    for (let s = 0; s <= steps; s++) {
      const x = s / steps;
      const y = modelPredictY(x, complexity, noise, datasetMode);
      const px = (x * (width - 40) + 20).toFixed(1);
      const py = ((1 - y) * (height - 40) + 20).toFixed(1);
      coords.push(`${s === 0 ? 'M' : 'L'} ${px} ${py}`);
    }
    return coords.join(' ');
  }, [complexity, noise, datasetMode]);

  const handleInteract = (action: () => void) => {
    action();
    if (!isExplored) {
      onExplore('sim-fit');
    }
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="border-b border-slate-200 px-5 py-4 sm:px-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Sliders className="h-3.5 w-3.5 text-blue-700" aria-hidden="true" />
            <span>Simulador interactivo</span>
            <span aria-hidden="true">·</span>
            <span>Generalización y frontera de decisión</span>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mt-0.5">
            Equilibrio entre subajuste, ajuste óptimo y sobreajuste
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs">
          {metrics.regime === 'optimal' && (
            <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Estado: Equilibrio óptimo
            </span>
          )}
          {metrics.regime === 'underfit' && (
            <span className="inline-flex items-center gap-1.5 font-semibold text-amber-800">
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              Estado: Subajuste
            </span>
          )}
          {metrics.regime === 'overfit' && (
            <span className="inline-flex items-center gap-1.5 font-semibold text-red-700">
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              Estado: Sobreajuste
            </span>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-12">
        {/* Left/Top Stage (Interactive SVG Canvas) */}
        <div className="lg:col-span-7 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50/70 p-4 sm:p-6 flex flex-col justify-between gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-700" aria-hidden="true" />
                Clase A (Entrenamiento)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rotate-45 bg-amber-600" aria-hidden="true" />
                Clase B (Validación)
              </span>
            </div>
            <div className="flex items-center gap-1 rounded-lg bg-slate-200/70 p-0.5">
              <button
                type="button"
                onClick={() => handleInteract(() => setDatasetMode('curved'))}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
                  datasetMode === 'curved'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Patrón no lineal
              </button>
              <button
                type="button"
                onClick={() => handleInteract(() => setDatasetMode('linear'))}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
                  datasetMode === 'linear'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Patrón lineal
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-2">
            <svg
              viewBox="0 0 440 270"
              className="w-full h-auto block"
              role="img"
              aria-label="Plano de dispersión de datos con frontera de decisión ajustada según complejidad y ruido"
            >
              {/* Coordinate grid */}
              {[0.25, 0.5, 0.75].map((tick) => (
                <g key={tick}>
                  <line
                    x1="20"
                    y1={20 + tick * 230}
                    x2="420"
                    y2={20 + tick * 230}
                    stroke="#E2E8F0"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <line
                    x1={20 + tick * 400}
                    y1="20"
                    x2={20 + tick * 400}
                    y2="250"
                    stroke="#E2E8F0"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                </g>
              ))}
              {/* Axes */}
              <rect x="20" y="20" width="400" height="230" fill="none" stroke="#CBD5E1" strokeWidth="1" />

              {/* Decision boundary curve */}
              <path
                d={pathData}
                fill="none"
                stroke="#0F172A"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Data points */}
              {points.map((pt, idx) => {
                const cx = pt.x * 400 + 20;
                const cy = (1 - pt.y) * 230 + 20;
                const isVal = pt.split === 'val';
                if (pt.label === 'A') {
                  return (
                    <circle
                      key={idx}
                      cx={cx}
                      cy={cy}
                      r={isVal ? 5.2 : 4.2}
                      fill={isVal ? '#FFFFFF' : '#1D4ED8'}
                      stroke="#1D4ED8"
                      strokeWidth={isVal ? 2 : 1}
                    />
                  );
                }
                return (
                  <polygon
                    key={idx}
                    points={`${cx},${cy - 5} ${cx + 5},${cy + 4} ${cx - 5},${cy + 4}`}
                    fill={isVal ? '#FFFFFF' : '#D97706'}
                    stroke="#B45309"
                    strokeWidth={isVal ? 1.8 : 1}
                  />
                );
              })}

              <text x="24" y="34" fontSize="10" fill="#64748B" fontFamily="IBM Plex Mono, monospace">
                Región Clase A
              </text>
              <text x="24" y="242" fontSize="10" fill="#64748B" fontFamily="IBM Plex Mono, monospace">
                Región Clase B
              </text>
            </svg>
          </div>

          <div className="grid grid-cols-3 gap-3 border-t border-slate-200 pt-3">
            <div>
              <div className="text-xs text-slate-500">Precisión entrenamiento</div>
              <div className="text-xl font-semibold font-mono tabular-nums text-slate-900">
                {metrics.trainAcc}%
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Precisión validación</div>
              <div className="text-xl font-semibold font-mono tabular-nums text-blue-700">
                {metrics.valAcc}%
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500">Brecha (Memorización)</div>
              <div className="text-xl font-semibold font-mono tabular-nums text-slate-900">
                {metrics.gap} pts
              </div>
            </div>
          </div>
        </div>

        {/* Right/Bottom Control & Concept Deck */}
        <div className="lg:col-span-5 p-5 sm:p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <label htmlFor="complexity-slider" className="font-semibold text-slate-900">
                  Complejidad del modelo
                </label>
                <span className="font-mono text-xs tabular-nums font-semibold text-blue-700">
                  Grado {complexity} / 9
                </span>
              </div>
              <input
                id="complexity-slider"
                type="range"
                min={1}
                max={9}
                step={1}
                value={complexity}
                onChange={(e) => handleInteract(() => setComplexity(Number(e.target.value)))}
                className="w-full accent-blue-700 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>1 (Rígido)</span>
                <span>4 (Balanceado)</span>
                <span>9 (Hiperflexible)</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <label htmlFor="noise-slider" className="font-semibold text-slate-900">
                  Ruido o variabilidad en datos
                </label>
                <span className="font-mono text-xs tabular-nums font-semibold text-slate-700">
                  {noise}%
                </span>
              </div>
              <input
                id="noise-slider"
                type="range"
                min={0}
                max={35}
                step={5}
                value={noise}
                onChange={(e) => handleInteract(() => setNoise(Number(e.target.value)))}
                className="w-full accent-blue-700 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                <span>0% (Ideal)</span>
                <span>15% (Realista)</span>
                <span>35% (Ruidoso)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-500">Escenarios rápidos</div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleInteract(() => {
                      setDatasetMode('curved');
                      setComplexity(1);
                      setNoise(10);
                    })
                  }
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap"
                >
                  Probar subajuste
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleInteract(() => {
                      setDatasetMode('curved');
                      setComplexity(4);
                      setNoise(10);
                    })
                  }
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap"
                >
                  Probar equilibrio
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleInteract(() => {
                      setDatasetMode('curved');
                      setComplexity(9);
                      setNoise(25);
                    })
                  }
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap"
                >
                  Probar sobreajuste
                </button>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-1.5">
              <div className="text-xs font-semibold text-slate-900">
                Interpretación pedagógica en vivo
              </div>
              {metrics.regime === 'underfit' && (
                <p className="text-xs leading-relaxed text-slate-700">
                  La frontera es casi una línea recta frente a un fenómeno curvo. Tanto el entrenamiento como la validación fallan porque el modelo carece de capacidad expresiva para captar la estructura real.
                </p>
              )}
              {metrics.regime === 'optimal' && (
                <p className="text-xs leading-relaxed text-slate-700">
                  La curva sigue la tendencia global sin perseguir casos atípicos aislados. Observa cómo la precisión de validación se mantiene alta y cercana a la de entrenamiento.
                </p>
              )}
              {metrics.regime === 'overfit' && (
                <p className="text-xs leading-relaxed text-slate-700">
                  La frontera oscila bruscamente intentando envolver puntos individuales ruidosos. Aunque la precisión en entrenamiento sube, la validación cae: el modelo memorizó en vez de generalizar.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-slate-200 pt-3">
            <span className="text-xs text-slate-500">
              {isExplored ? 'Experimento registrado en tu progreso' : 'Mueve un control para registrar'}
            </span>
            <button
              type="button"
              onClick={() => {
                setComplexity(4);
                setNoise(12);
                setDatasetMode('curved');
              }}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 whitespace-nowrap"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Restablecer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
