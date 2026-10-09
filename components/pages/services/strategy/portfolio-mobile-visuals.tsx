"use client"

import { motion } from "framer-motion"
import { Cloud } from "lucide-react"
import { useActiveInView } from "@/hooks/use-active-in-view"
import { CountUp, MobileVisualShell } from "@/components/pages/services/shared/portfolio/visual-kit"
import type { VisualLabels } from "./portfolio-visuals"

function MobileProcessFlowVisual({
  isRevealed,
  accent,
  labels,
}: {
  isRevealed: boolean
  accent: string
  labels?: VisualLabels
}) {
  // Forked BPMN flow on mobile:
  //   Start → Task → Gateway ┬→ Approve → Done   (success, token follows)
  //                          └→ Rework            (rejection, dashed)
  // Rework loop-back arrow is omitted on mobile to keep the visual readable.
  const startX = 8
  const taskX = 30
  const gatewayX = 52
  const approveX = 75
  const approveY = 8
  const doneX = 95
  const reworkX = 75
  const reworkY = 32
  const centerY = 20
  const [ref, inView] = useActiveInView()

  return (
    <MobileVisualShell
      shellRef={ref}
      accent={accent}
      label={labels?.process?.label ?? "Genehmigungslauf"}
      badge={
        <motion.div
          initial={{ opacity: 0 }}
          animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="flex items-center gap-1 rounded-full px-2 py-0.5"
          style={{ backgroundColor: `${accent}1F`, color: accent }}
        >
          <span className="text-[0.55rem] font-mono font-semibold tracking-[0.18em]">BPMN</span>
        </motion.div>
      }
    >
      <div className="relative aspect-[10/4] w-full">
        <svg viewBox="0 0 100 40" className="absolute inset-0 h-full w-full">
          {/* Centerline edges: Start→Task, Task→Gateway */}
          {[
            { x1: startX + 4, x2: taskX - 5 },
            { x1: taskX + 5, x2: gatewayX - 5 },
          ].map((e, i) => (
            <motion.line
              key={`edge-${i}-${isRevealed}`}
              x1={e.x1}
              y1={centerY}
              x2={e.x2}
              y2={centerY}
              stroke={accent}
              strokeOpacity={0.45}
              strokeWidth={0.5}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={isRevealed ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.45, delay: 0.25 + i * 0.13, ease: "easeOut" }}
            />
          ))}

          {/* Top branch: Gateway → Approve curve, then line to Done */}
          <motion.path
            d={`M ${gatewayX + 2} ${centerY - 3} C ${gatewayX + 8} 12, ${gatewayX + 14} ${approveY}, ${approveX - 5} ${approveY}`}
            fill="none"
            stroke={accent}
            strokeOpacity={0.5}
            strokeWidth={0.5}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isRevealed ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.55, delay: 0.6, ease: "easeOut" }}
          />
          <motion.line
            x1={approveX + 5}
            y1={approveY}
            x2={doneX - 4}
            y2={approveY}
            stroke={accent}
            strokeOpacity={0.5}
            strokeWidth={0.5}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isRevealed ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.4, delay: 0.95, ease: "easeOut" }}
          />

          {/* Bottom branch: Gateway → Rework (dashed) */}
          <motion.path
            d={`M ${gatewayX + 2} ${centerY + 3} C ${gatewayX + 8} 28, ${gatewayX + 14} ${reworkY}, ${reworkX - 5} ${reworkY}`}
            fill="none"
            stroke={accent}
            strokeOpacity={0.36}
            strokeWidth={0.5}
            strokeLinecap="round"
            strokeDasharray="1.2 1.2"
            initial={{ pathLength: 0 }}
            animate={isRevealed ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.55, delay: 0.7, ease: "easeOut" }}
          />

          {/* Branch labels */}
          <motion.text
            x={gatewayX + 6}
            y={11}
            textAnchor="start"
            fontSize="2.4"
            fontWeight="700"
            fill="#10B981"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            initial={{ opacity: 0 }}
            animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.85 }}
          >
            {labels?.process?.yes ?? "✓ ja"}
          </motion.text>
          <motion.text
            x={gatewayX + 6}
            y={31}
            textAnchor="start"
            fontSize="2.4"
            fontWeight="700"
            fill="#F59E0B"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            initial={{ opacity: 0 }}
            animate={isRevealed ? { opacity: 0.9 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.95 }}
          >
            {labels?.process?.no ?? "✗ nein"}
          </motion.text>

          {/* Token traversing success path */}
          <motion.circle
            r={1.4}
            fill={accent}
            initial={{ cx: startX, cy: centerY, opacity: 0 }}
            animate={
              isRevealed
                ? {
                    cx: inView ? [startX, startX, taskX, gatewayX, gatewayX + 6, approveX, doneX, doneX] : startX,
                    cy: inView ? [centerY, centerY, centerY, centerY, 14, approveY, approveY, approveY] : centerY,
                    opacity: inView ? [0, 1, 1, 1, 1, 1, 1, 0] : 0,
                  }
                : { cx: startX, cy: centerY, opacity: 0 }
            }
            transition={{
              duration: 3.6,
              delay: 1.4,
              repeat: Infinity,
              repeatDelay: 1.0,
              ease: "easeInOut",
              times: [0, 0.05, 0.22, 0.42, 0.55, 0.72, 0.95, 1],
            }}
          />
        </svg>

        {/* HTML pills positioned absolutely so text stays sharp on phone widths */}
        <div className="pointer-events-none absolute inset-0">
          {[
            { label: "Start", left: `${startX}%`, top: `${(centerY / 40) * 100}%`, delay: 0.05 },
            { label: "Task", left: `${taskX}%`, top: `${(centerY / 40) * 100}%`, delay: 0.13 },
            { label: "OK?", left: `${gatewayX}%`, top: `${(centerY / 40) * 100}%`, delay: 0.21 },
            { label: "Approve", left: `${approveX}%`, top: `${(approveY / 40) * 100}%`, delay: 0.95 },
            { label: "Done", left: `${doneX}%`, top: `${(approveY / 40) * 100}%`, delay: 1.05, filled: true },
            { label: "Rework", left: `${reworkX}%`, top: `${(reworkY / 40) * 100}%`, delay: 1.0, dashed: true },
          ].map((p) => (
            <motion.span
              key={p.label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.4, delay: p.delay }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-md border px-1.5 py-0.5 text-[0.5rem] font-bold tracking-wider ${
                p.filled ? "text-white" : "bg-white"
              } ${p.dashed ? "border-dashed" : ""}`}
              style={{
                left: p.left,
                top: p.top,
                borderColor: `${accent}55`,
                backgroundColor: p.filled ? accent : undefined,
                color: p.filled ? "white" : accent,
              }}
            >
              {p.label}
            </motion.span>
          ))}
        </div>
      </div>
    </MobileVisualShell>
  )
}

function MobileCloudTopologyVisual({
  isRevealed,
  accent,
}: {
  isRevealed: boolean
  accent: string
  labels?: VisualLabels
}) {
  // Hub-Spoke topology: 4 corner spokes connect to a central HUB with looping
  // pulses traveling along each edge.
  const spokes = [
    { label: "PROD", x: 14, y: 8 },
    { label: "DEV", x: 86, y: 8 },
    { label: "DATA", x: 14, y: 32 },
    { label: "EXT", x: 86, y: 32 },
  ]
  const hubX = 50
  const hubY = 20
  const [ref, inView] = useActiveInView()
  return (
    <MobileVisualShell
      shellRef={ref}
      accent={accent}
      label="Azure Landing Zone"
      badge={
        <motion.div
          initial={{ opacity: 0 }}
          animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 1.0 }}
          className="flex items-center gap-1 rounded-full px-2 py-0.5"
          style={{ backgroundColor: `${accent}1F`, color: accent }}
        >
          <Cloud className="h-3 w-3" />
          <span className="text-[0.55rem] font-mono font-semibold tracking-[0.18em]">IaC</span>
        </motion.div>
      }
    >
      <div className="relative aspect-[10/4] w-full">
        <svg viewBox="0 0 100 40" className="absolute inset-0 h-full w-full">
          {/* Spoke ↔ hub edges */}
          {spokes.map((s, i) => {
            const sxEdge = s.x + (s.x < hubX ? 6 : -6)
            const syEdge = s.y
            return (
              <motion.line
                key={`edge-${i}-${isRevealed}`}
                x1={sxEdge}
                y1={syEdge}
                x2={hubX}
                y2={hubY}
                stroke={accent}
                strokeOpacity={0.45}
                strokeWidth={0.5}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isRevealed ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ pathLength: { duration: 0.55, delay: 0.3 + i * 0.1, ease: "easeOut" } }}
              />
            )
          })}

          {/* Pulses traveling hub → each spoke (looping) */}
          {spokes.map((s, i) => {
            const sxEdge = s.x + (s.x < hubX ? 6 : -6)
            return (
              <motion.circle
                key={`pulse-${i}`}
                r={0.9}
                fill={accent}
                initial={{ cx: hubX, cy: hubY, opacity: 0 }}
                animate={
                  isRevealed
                    ? {
                        cx: inView ? [hubX, sxEdge] : hubX,
                        cy: inView ? [hubY, s.y] : hubY,
                        opacity: inView ? [0, 1, 1, 0] : 0,
                      }
                    : { cx: hubX, cy: hubY, opacity: 0 }
                }
                transition={{
                  duration: 1.3,
                  delay: 1.2 + i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 2.4,
                  ease: "easeInOut",
                  times: [0, 0.15, 0.85, 1],
                }}
              />
            )
          })}
        </svg>

        {/* Spoke pills */}
        {spokes.map((s, i) => (
          <motion.span
            key={s.label}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.4, delay: 0.05 + i * 0.08 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-md border bg-white px-1.5 py-0.5 text-[0.55rem] font-bold tracking-wider"
            style={{
              left: `${s.x}%`,
              top: `${(s.y / 40) * 100}%`,
              borderColor: `${accent}55`,
              color: accent,
            }}
          >
            {s.label}
          </motion.span>
        ))}

        {/* Central HUB */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-[0.6rem] font-bold tracking-widest text-white"
          style={{ backgroundColor: accent }}
        >
          HUB
        </motion.div>
      </div>
    </MobileVisualShell>
  )
}

function MobileSecurityRingsVisual({
  isRevealed,
  accent,
  labels,
}: {
  isRevealed: boolean
  accent: string
  labels?: VisualLabels
}) {
  // Live SIEM-style feed: security score + 3 recent events.
  const events = [
    { type: "ok" as const, title: "MFA-Login", source: "J. Müller", time: "2 s", isNew: true },
    { type: "warn" as const, title: "Brute-Force blocked", source: "Edge-Gateway", time: "14 s" },
    {
      type: "ok" as const,
      title: labels?.security?.eventBackupVerified ?? "Backup verifiziert",
      source: "Azure Vault",
      time: "1 min",
    },
  ]

  const typeStyles: Record<"ok" | "warn" | "err", { color: string; bg: string; glyph: string }> = {
    ok: { color: "#10B981", bg: "bg-emerald-50", glyph: "✓" },
    warn: { color: "#F59E0B", bg: "bg-amber-50", glyph: "!" },
    err: { color: "#EF4444", bg: "bg-red-50", glyph: "✕" },
  }
  const [ref, inView] = useActiveInView()

  return (
    <MobileVisualShell
      shellRef={ref}
      accent={accent}
      label="Defense-in-Depth"
      badge={
        <motion.div
          initial={{ opacity: 0 }}
          animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          className="flex items-center gap-1 rounded-full border border-emerald-200/70 bg-emerald-50 px-2 py-0.5"
        >
          <motion.span
            animate={inView ? { opacity: [1, 0.4, 1] } : { opacity: 1 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1 w-1 rounded-full bg-emerald-500"
          />
          <span className="text-[0.55rem] font-mono font-semibold tracking-[0.18em] text-emerald-700">live</span>
        </motion.div>
      }
    >
      <div className="flex flex-col gap-1">
        {/* Score banner */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="flex items-center justify-between rounded-md border border-slate-200/70 bg-gradient-to-br from-emerald-50/60 via-white to-transparent px-2 py-1"
        >
          <div className="flex flex-col leading-tight">
            <span className="text-[0.5rem] font-semibold uppercase tracking-wider text-black/55">Security Score</span>
            <span className="text-[0.45rem] text-black/40">NIS2 · ISO 27001</span>
          </div>
          <div className="flex items-baseline gap-0.5">
            <CountUp
              to={92}
              isRevealed={isRevealed}
              duration={1.4}
              className="font-serif text-[1.05rem] font-semibold leading-none text-emerald-600"
            />
            <span className="text-[0.5rem] font-mono text-black/40">/100</span>
          </div>
        </motion.div>

        {/* Events feed */}
        {events.map((event, i) => {
          const style = typeStyles[event.type]
          return (
            <motion.div
              key={`event-${i}`}
              initial={{ opacity: 0, x: -4 }}
              animate={isRevealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -4 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
              className="flex items-center gap-1.5 rounded-md border border-slate-200/70 bg-white px-1.5 py-0.5"
            >
              <div
                className={`flex h-3 w-3 shrink-0 items-center justify-center rounded-full text-[0.45rem] font-bold leading-none ${style.bg}`}
                style={{ color: style.color }}
              >
                {style.glyph}
              </div>
              <div className="min-w-0 flex-1 leading-tight">
                <div className="truncate text-[0.55rem] font-semibold text-black/75">{event.title}</div>
                <div className="truncate text-[0.45rem] text-black/40">{event.source}</div>
              </div>
              <span className="shrink-0 text-[0.45rem] font-mono text-black/40">{event.time}</span>
              {event.isNew && (
                <motion.span
                  animate={inView ? { opacity: [1, 0.3, 1], scale: [1, 1.3, 1] } : { opacity: 1, scale: 1 }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  className="h-1 w-1 shrink-0 rounded-full bg-emerald-500"
                />
              )}
            </motion.div>
          )
        })}
      </div>
    </MobileVisualShell>
  )
}

export const MOBILE_VISUALS = [MobileProcessFlowVisual, MobileCloudTopologyVisual, MobileSecurityRingsVisual] as const
