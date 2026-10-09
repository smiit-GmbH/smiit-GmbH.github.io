import React, { Fragment } from "react"
import { ArrowDown, ArrowRight, type LucideIcon } from "lucide-react"
import type { Locale } from "@/lib/dictionary"

export type DiagramProps = { lang: Locale; color: string }
export const INK = "#0B162D"

// ── Atoms ─────────────────────────────────────────────────────────────────
export function Shell({
  accent,
  eyebrow,
  badge,
  badgeIcon: BadgeIcon,
  label,
  caption,
  children,
}: {
  accent: string
  eyebrow: string
  badge?: string
  badgeIcon?: LucideIcon
  label: string
  caption: string
  children: React.ReactNode
}) {
  return (
    <figure aria-label={label} className="mx-auto w-full max-w-[460px]">
      <div
        className="relative overflow-hidden rounded-[1.6rem] border bg-white p-5 sm:p-6"
        style={{ borderColor: `${accent}26`, boxShadow: `0 18px 44px ${accent}1f` }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
          style={{ background: `linear-gradient(to right, transparent, ${accent}80, transparent)` }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full"
          style={{ background: `radial-gradient(circle, ${accent}14, transparent 70%)` }}
        />
        <div className="relative mb-4 flex items-center justify-between gap-3">
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-[#0B162D]/40">{eyebrow}</span>
          {badge ? (
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wide"
              style={{ backgroundColor: `${accent}1f`, color: accent }}
            >
              {BadgeIcon ? <BadgeIcon className="h-3 w-3" /> : null}
              {badge}
            </span>
          ) : null}
        </div>
        <div className="relative">{children}</div>
      </div>
      <figcaption className="mt-3 text-center text-[0.8rem] leading-relaxed text-[#0B162D]/55">{caption}</figcaption>
    </figure>
  )
}

type BoxTone = "soft" | "solid" | "plain" | "dashed"

export function DBox({
  title,
  sub,
  accent,
  tone = "soft",
  icon: Icon,
}: {
  title: string
  sub?: string
  accent: string
  tone?: BoxTone
  icon?: LucideIcon
}) {
  const solid = tone === "solid"
  const style =
    tone === "solid"
      ? { backgroundColor: accent, borderColor: accent }
      : tone === "plain"
        ? { backgroundColor: "#fff", borderColor: `${INK}24` }
        : tone === "dashed"
          ? { backgroundColor: "#fff", borderColor: `${INK}40`, borderStyle: "dashed" as const }
          : { backgroundColor: `${accent}0f`, borderColor: `${accent}40` }
  return (
    <div
      className="flex min-w-[92px] flex-col items-center justify-center rounded-xl border px-3 py-2.5 text-center"
      style={style}
    >
      {Icon ? <Icon className="mb-1 h-4 w-4" style={{ color: solid ? "#fff" : accent }} /> : null}
      <span className="text-[0.82rem] font-semibold leading-tight" style={{ color: solid ? "#fff" : INK }}>
        {title}
      </span>
      {sub ? (
        <span className="mt-0.5 text-[0.66rem] leading-tight" style={{ color: solid ? "#ffffffcc" : `${INK}99` }}>
          {sub}
        </span>
      ) : null}
    </div>
  )
}

export function ArrowSep({ vertical = false }: { vertical?: boolean }) {
  const Icon = vertical ? ArrowDown : ArrowRight
  return <Icon className="h-4 w-4 shrink-0 self-center text-[#0B162D]/30" aria-hidden />
}

export type Step = { title: string; sub?: string; tone?: BoxTone; icon?: LucideIcon }

export function StepFlow({ steps, accent, vertical = false }: { steps: Step[]; accent: string; vertical?: boolean }) {
  return (
    <div className={`flex ${vertical ? "flex-col" : "flex-row flex-wrap justify-center"} items-center gap-1.5`}>
      {steps.map((s, i) => (
        <Fragment key={i}>
          <DBox title={s.title} sub={s.sub} tone={s.tone} icon={s.icon} accent={accent} />
          {i < steps.length - 1 ? <ArrowSep vertical={vertical} /> : null}
        </Fragment>
      ))}
    </div>
  )
}

export function IconCard({
  icon: Icon,
  title,
  sub,
  accent,
}: {
  icon?: LucideIcon
  title: string
  sub: string
  accent: string
}) {
  return (
    <div
      className="flex flex-col items-center rounded-2xl border px-3 py-4 text-center"
      style={{ borderColor: `${accent}33`, backgroundImage: `linear-gradient(160deg, ${accent}12, transparent 72%)` }}
    >
      {Icon ? (
        <span
          className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${accent}1f` }}
        >
          <Icon className="h-5 w-5" style={{ color: accent }} />
        </span>
      ) : null}
      <span className="text-[0.9rem] font-semibold text-[#0B162D]">{title}</span>
      <span className="mt-1 text-[0.72rem] leading-snug text-[#0B162D]/60">{sub}</span>
    </div>
  )
}

export function GroupLabel({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <span
      className="rounded-md px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider"
      style={{ backgroundColor: `${accent}1f`, color: accent }}
    >
      {children}
    </span>
  )
}
