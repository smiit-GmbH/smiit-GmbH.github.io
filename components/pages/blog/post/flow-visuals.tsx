import { ChevronDown } from "lucide-react"

/** Numbered process steps in a tidy fixed grid (light alternative to a code block). */
export function FlowSteps({ steps, color }: { steps: string[]; color: string }) {
  return (
    <ol className="my-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {steps.map((step, i) => (
        <li
          key={i}
          className="flex items-start gap-3 rounded-xl border border-black/10 bg-white px-4 py-3 shadow-[0_2px_10px_rgba(18,38,63,0.04)]"
        >
          <span
            className="mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[0.72rem] font-semibold"
            style={{ color, backgroundColor: `${color}14` }}
          >
            {i + 1}
          </span>
          <span className="text-[0.9rem] leading-snug text-[#0B162D]/85">{step}</span>
        </li>
      ))}
    </ol>
  )
}

/**
 * Connected flow diagram: centred nodes joined top-to-bottom by accent arrows.
 * Each node may carry a list of branch items, rendered as accent chips inside the
 * node. Distinct from `FlowSteps` (a numbered step grid) — used for architecture
 * and request-flow visuals where direction and fan-out matter.
 */
export function FlowDiagram({ steps, color }: { steps: { label: string; items?: string[] }[]; color: string }) {
  return (
    <div className="my-9 flex flex-col items-center">
      {steps.map((step, i) => (
        <div key={i} className="flex w-full max-w-xl flex-col items-center">
          <div
            className="w-full rounded-2xl border bg-white px-5 py-4 text-center shadow-[0_2px_12px_rgba(18,38,63,0.05)]"
            style={{ borderColor: `${color}40` }}
          >
            <span className="block text-[0.95rem] font-semibold leading-snug text-[#0B162D]">{step.label}</span>
            {step.items && step.items.length > 0 && (
              <span className="mt-2.5 flex flex-wrap justify-center gap-1.5">
                {step.items.map((it, j) => (
                  <span
                    key={j}
                    className="rounded-md px-2 py-1 text-[0.75rem] font-medium"
                    style={{ color, backgroundColor: `${color}12` }}
                  >
                    {it}
                  </span>
                ))}
              </span>
            )}
          </div>
          {i < steps.length - 1 && (
            <span className="flex flex-col items-center py-1.5" aria-hidden>
              <span className="h-4 w-px" style={{ backgroundColor: `${color}66` }} />
              <ChevronDown className="-mt-1 h-4 w-4" style={{ color }} strokeWidth={2.5} />
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

/** MLOps maturity ladder: numbered levels on an accent rail with a growing progress bar. */
export function MaturityLadder({ items, color }: { items: { level: number; label: string }[]; color: string }) {
  const total = items.length
  return (
    <div className="my-8 rounded-[18px] border border-black/10 bg-[#0B162D]/[0.02] p-5 sm:p-6">
      <ol className="space-y-3.5">
        {items.map((item, i) => {
          const fill = Math.round(((i + 1) / total) * 100)
          const isLast = i === total - 1
          return (
            <li key={item.level} className="relative flex items-start gap-3.5">
              {!isLast && (
                <span
                  aria-hidden
                  className="absolute left-4 top-10 -bottom-3.5 w-px -translate-x-1/2 bg-black/10"
                />
              )}
              <span
                className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white font-mono text-[0.85rem] font-semibold"
                style={{ color, border: `1px solid ${color}4D` }}
              >
                {item.level}
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <p className="font-serif text-[0.98rem] sm:text-[1.1rem] leading-snug text-[#0B162D]">
                  <span className="mr-2 text-[0.62rem] font-sans font-semibold uppercase tracking-wider" style={{ color }}>
                    Level {item.level}
                  </span>
                  {item.label}
                </p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: `${color}1A` }}>
                  <div className="h-full rounded-full" style={{ width: `${fill}%`, backgroundColor: color }} />
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
