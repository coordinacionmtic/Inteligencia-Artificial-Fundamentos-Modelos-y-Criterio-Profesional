import { useState } from 'react';
import { CheckCircle2, ChevronDown } from 'lucide-react';
import type { ExpandableCardItem } from '../types/learning';

interface InteractiveExpandableCardsProps {
  items: ExpandableCardItem[];
  readIds: string[];
  onMarkRead: (id: string) => void;
  heading: string;
  description: string;
}

export function InteractiveExpandableCards({
  items,
  readIds,
  onMarkRead,
  heading,
  description,
}: InteractiveExpandableCardsProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  const handleToggle = (id: string) => {
    const next = openId === id ? null : id;
    setOpenId(next);
    if (next) {
      onMarkRead(next);
    }
  };

  const readCount = items.filter((item) => readIds.includes(item.id)).length;

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between border-b border-slate-200 pb-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{heading}</h3>
          <p className="text-sm text-slate-600">{description}</p>
        </div>
        <span className="text-xs font-mono tabular-nums text-slate-500 shrink-0">
          Revisadas: {readCount}/{items.length}
        </span>
      </div>

      <div className="divide-y divide-slate-200 border border-slate-200 bg-white rounded-xl overflow-hidden">
        {items.map((item) => {
          const isOpen = openId === item.id;
          const isRead = readIds.includes(item.id);
          return (
            <div key={item.id} className="bg-white">
              <button
                type="button"
                onClick={() => handleToggle(item.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50 min-h-[56px]"
              >
                <div className="flex items-start gap-4 min-w-0">
                  <span className="font-mono text-xs font-semibold tabular-nums text-blue-700 pt-1 shrink-0">
                    {item.indexLabel}
                  </span>
                  <div className="min-w-0">
                    <div className="text-base font-semibold text-slate-900 leading-snug">
                      {item.title}
                    </div>
                    <div className="text-sm text-slate-500 mt-0.5">{item.subtitle}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {isRead && (
                    <span className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                      Leída
                    </span>
                  )}
                  <ChevronDown
                    className={`h-5 w-5 text-slate-500 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-700' : ''
                    }`}
                    aria-hidden="true"
                  />
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-5 sm:pl-14">
                  <p className="text-sm leading-relaxed text-slate-800 max-w-3xl">
                    {item.summary}
                  </p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-lg border border-slate-200 bg-white p-3.5">
                      <div className="text-xs font-semibold text-slate-900 mb-1">
                        Mecanismo interno
                      </div>
                      <p className="text-xs leading-relaxed text-slate-600">{item.mechanism}</p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-3.5">
                      <div className="text-xs font-semibold text-slate-900 mb-1">
                        Ejemplo universitario
                      </div>
                      <p className="text-xs leading-relaxed text-slate-600">
                        {item.academicExample}
                      </p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-3.5">
                      <div className="text-xs font-semibold text-slate-900 mb-1">
                        Límite y precaución
                      </div>
                      <p className="text-xs leading-relaxed text-slate-600">{item.limitation}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
