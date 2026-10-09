"use client"

import { motion } from "framer-motion"
import { Cloud } from "lucide-react"
import { useActiveInView } from "@/hooks/use-active-in-view"
import type { Dictionary } from "@/lib/dictionary"
import { CountUp } from "@/components/pages/services/shared/portfolio/visual-kit"

export type VisualLabels = Dictionary["servicesStrategy"]["portfolio"]["visuals"]

// ---------------------------------------------------------------------------
// Right-column visuals
// ---------------------------------------------------------------------------
function VisualShell({
  children,
  className = "",
  shellRef,
}: {
  children: React.ReactNode
  className?: string
  shellRef?: React.Ref<HTMLDivElement>
}) {
  return (
    <div
      ref={shellRef}
      aria-hidden="true"
      className={`relative w-full max-w-[380px] aspect-[5/4] rounded-3xl bg-white border border-gray-100 shadow-[0_18px_44px_rgba(100,116,139,0.10)] p-5 sm:p-6 overflow-hidden ${className}`}
    >
      {children}
    </div>
  )
}

function ProcessFlowVisual({ isRevealed, labels }: { isRevealed: boolean; labels?: VisualLabels }) {
  // BPMN-style flow with a forking gateway:
  //   Start → Task → Gateway ┬→ Approve → Done   (success path, token follows)
  //                          └→ Rework → loops back to Task   (rejection path, dashed)
  const startX = 40
  const taskX = 130
  const gatewayX = 230
  const approveX = 280
  const approveY = 65
  const doneX = 335
  const doneY = 65
  const reworkX = 280
  const reworkY = 158
  const taskHalf = 22
  const gatewayHalf = 22
  const [ref, inView] = useActiveInView()

  return (
    <VisualShell shellRef={ref}>
      <div className="flex items-baseline justify-between">
        <span className="text-[0.65rem] uppercase tracking-[0.18em] text-black/40 font-medium">
          {labels?.process?.label ?? "Genehmigungslauf"}
        </span>
        <span className="text-[0.65rem] font-medium text-[#64748B]">BPMN</span>
      </div>
      <div className="relative mt-3 flex-1 h-[78%]">
        <svg viewBox="0 0 360 220" className="absolute inset-0 w-full h-full">
          {/* Edges Start→Task, Task→Gateway */}
          {[
            { xFrom: startX + 12 + 2, xTo: taskX - taskHalf - 2, delay: 0.35 },
            { xFrom: taskX + taskHalf + 2, xTo: gatewayX - gatewayHalf - 2, delay: 0.53 },
          ].map((edge, i) => (
            <g key={`edge-${i}`}>
              <motion.line
                x1={edge.xFrom}
                y1={110}
                x2={edge.xTo - 5}
                y2={110}
                stroke="#64748B"
                strokeOpacity={0.5}
                strokeWidth={1.4}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isRevealed ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.5, delay: edge.delay, ease: "easeOut" }}
              />
              <motion.polygon
                points={`${edge.xTo - 6},107 ${edge.xTo},110 ${edge.xTo - 6},113`}
                fill="#64748B"
                fillOpacity={0.6}
                initial={{ opacity: 0 }}
                animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3, delay: edge.delay + 0.25 }}
              />
            </g>
          ))}

          {/* TOP BRANCH (success): Gateway → Approve → Done */}
          <motion.path
            d={`M ${gatewayX} 88 C ${gatewayX + 16} 70, ${gatewayX + 28} 65, ${approveX - 21} ${approveY}`}
            fill="none"
            stroke="#64748B"
            strokeOpacity={0.55}
            strokeWidth={1.4}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isRevealed ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.6, delay: 0.95, ease: "easeOut" }}
          />
          <motion.polygon
            points={`${approveX - 22},${approveY - 3} ${approveX - 16},${approveY} ${approveX - 22},${approveY + 3}`}
            fill="#64748B"
            fillOpacity={0.6}
            initial={{ opacity: 0 }}
            animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 1.35 }}
          />
          <motion.text
            x={gatewayX + 18}
            y={80}
            textAnchor="start"
            fontSize="7"
            fontWeight="700"
            fill="#10B981"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            initial={{ opacity: 0 }}
            animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 1.2 }}
          >
            {labels?.process?.yes ?? "✓ ja"}
          </motion.text>

          {/* Approve box */}
          <motion.rect
            x={approveX - 20}
            y={approveY - 11}
            width={40}
            height={22}
            rx={5}
            fill="#E2E8F0"
            stroke="#64748B"
            strokeOpacity={0.45}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.4, delay: 1.1 }}
            style={{ transformOrigin: `${approveX}px ${approveY}px` }}
          />
          <motion.text
            x={approveX}
            y={approveY + 3}
            textAnchor="middle"
            fontSize="8"
            fontWeight="600"
            fill="#64748B"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            initial={{ opacity: 0 }}
            animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 1.25 }}
          >
            Approve
          </motion.text>

          {/* Approve → Done edge */}
          <motion.line
            x1={approveX + 21}
            y1={approveY}
            x2={doneX - 14 - 5}
            y2={doneY}
            stroke="#64748B"
            strokeOpacity={0.5}
            strokeWidth={1.4}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={isRevealed ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.4, delay: 1.45, ease: "easeOut" }}
          />
          <motion.polygon
            points={`${doneX - 14 - 6},${doneY - 3} ${doneX - 14},${doneY} ${doneX - 14 - 6},${doneY + 3}`}
            fill="#64748B"
            fillOpacity={0.6}
            initial={{ opacity: 0 }}
            animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 1.65 }}
          />

          {/* BOTTOM BRANCH (rework): Gateway → Rework → loop back to Task */}
          <motion.path
            d={`M ${gatewayX} 132 C ${gatewayX + 16} 152, ${gatewayX + 28} 158, ${reworkX - 21} ${reworkY}`}
            fill="none"
            stroke="#64748B"
            strokeOpacity={0.4}
            strokeWidth={1.3}
            strokeLinecap="round"
            strokeDasharray="3 3"
            initial={{ pathLength: 0 }}
            animate={isRevealed ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.6, delay: 1.05, ease: "easeOut" }}
          />
          <motion.text
            x={gatewayX + 18}
            y={148}
            textAnchor="start"
            fontSize="7"
            fontWeight="700"
            fill="#F59E0B"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            initial={{ opacity: 0 }}
            animate={isRevealed ? { opacity: 0.9 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 1.3 }}
          >
            {labels?.process?.no ?? "✗ nein"}
          </motion.text>

          {/* Rework box (dashed border to signal transient state) */}
          <motion.rect
            x={reworkX - 20}
            y={reworkY - 11}
            width={40}
            height={22}
            rx={5}
            fill="white"
            stroke="#64748B"
            strokeOpacity={0.4}
            strokeDasharray="2 2"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.4, delay: 1.2 }}
            style={{ transformOrigin: `${reworkX}px ${reworkY}px` }}
          />
          <motion.text
            x={reworkX}
            y={reworkY + 3}
            textAnchor="middle"
            fontSize="8"
            fontWeight="600"
            fill="#64748B"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            initial={{ opacity: 0 }}
            animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 1.35 }}
          >
            Rework
          </motion.text>

          {/* Loop back: Rework → Task (dashed underflow) */}
          <motion.path
            d={`M ${reworkX - 20} ${reworkY} C ${reworkX - 60} ${reworkY + 24}, ${taskX - 30} ${reworkY + 32}, ${taskX} ${110 + 14 + 2}`}
            fill="none"
            stroke="#64748B"
            strokeOpacity={0.32}
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeDasharray="3 3"
            initial={{ pathLength: 0 }}
            animate={isRevealed ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.7, delay: 1.55, ease: "easeOut" }}
          />
          <motion.polygon
            points={`${taskX - 3},${110 + 14 + 4} ${taskX},${110 + 14 - 1} ${taskX + 3},${110 + 14 + 4}`}
            fill="#64748B"
            fillOpacity={0.5}
            initial={{ opacity: 0 }}
            animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 2.1 }}
          />

          {/* SHAPES on centerline */}
          {/* Start (circle) */}
          <motion.circle
            cx={startX}
            cy={110}
            r={12}
            fill="white"
            stroke="#64748B"
            strokeWidth={1.8}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            style={{ transformOrigin: `${startX}px 110px` }}
          />

          {/* Task (rounded rect) */}
          <motion.rect
            x={taskX - taskHalf}
            y={96}
            width={44}
            height={28}
            rx={6}
            fill="#E2E8F0"
            stroke="#64748B"
            strokeOpacity={0.45}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            style={{ transformOrigin: `${taskX}px 110px` }}
          />
          <motion.text
            x={taskX}
            y={114}
            textAnchor="middle"
            fontSize="9"
            fontWeight="600"
            fill="#64748B"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            initial={{ opacity: 0 }}
            animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            Task
          </motion.text>

          {/* Gateway (diamond) */}
          <motion.polygon
            points={`${gatewayX},88 ${gatewayX + gatewayHalf},110 ${gatewayX},132 ${gatewayX - gatewayHalf},110`}
            fill="white"
            stroke="#64748B"
            strokeOpacity={0.5}
            strokeWidth={1.4}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.4, delay: 0.55 }}
            style={{ transformOrigin: `${gatewayX}px 110px` }}
          />
          <motion.text
            x={gatewayX}
            y={114}
            textAnchor="middle"
            fontSize="8"
            fontWeight="600"
            fill="#64748B"
            fontFamily="ui-sans-serif, system-ui, sans-serif"
            initial={{ opacity: 0 }}
            animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
          >
            OK?
          </motion.text>

          {/* Done (filled circle with check) */}
          <motion.circle
            cx={doneX}
            cy={doneY}
            r={14}
            fill="#64748B"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.4, delay: 1.7 }}
            style={{ transformOrigin: `${doneX}px ${doneY}px` }}
          />
          <motion.path
            d={`M ${doneX - 6} ${doneY + 1} L ${doneX - 1} ${doneY + 6} L ${doneX + 6} ${doneY - 5}`}
            fill="none"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={isRevealed ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.3, delay: 1.9 }}
          />

          {/* ANIMATED TOKEN — traverses the success path: Start → Task → Gateway → Approve → Done */}
          <motion.circle
            r={4}
            fill="#475569"
            initial={{ cx: startX, cy: 110, opacity: 0 }}
            animate={
              isRevealed
                ? {
                    cx: inView ? [startX, startX, taskX, gatewayX, gatewayX + 18, approveX, doneX, doneX] : startX,
                    cy: inView ? [110, 110, 110, 110, 88, approveY, doneY, doneY] : 110,
                    opacity: inView ? [0, 1, 1, 1, 1, 1, 1, 0] : 0,
                  }
                : { cx: startX, cy: 110, opacity: 0 }
            }
            transition={{
              duration: 4.4,
              delay: 2.2,
              repeat: Infinity,
              repeatDelay: 1.4,
              ease: "easeInOut",
              times: [0, 0.05, 0.22, 0.42, 0.55, 0.72, 0.95, 1],
            }}
          />
        </svg>
      </div>
    </VisualShell>
  )
}

function CloudTopologyVisual({ isRevealed }: { isRevealed: boolean; labels?: VisualLabels }) {
  // Hub-and-Spoke topology: central HUB with 4 workload spokes (PROD/DEV/DATA/EXT).
  const hubX = 180
  const hubY = 110
  const spokes = [
    { x: 56, y: 50, label: "PROD" },
    { x: 304, y: 50, label: "DEV" },
    { x: 56, y: 170, label: "DATA" },
    { x: 304, y: 170, label: "EXT" },
  ]
  const [ref, inView] = useActiveInView()
  return (
    <VisualShell shellRef={ref}>
      <div className="flex items-baseline justify-between">
        <span className="text-[0.65rem] uppercase tracking-[0.18em] text-black/40 font-medium">Azure Landing Zone</span>
        <span className="text-[0.65rem] font-medium text-[#64748B]">IaC</span>
      </div>
      <div className="relative mt-3 flex-1 h-[78%]">
        <svg viewBox="0 0 360 220" className="absolute inset-0 w-full h-full">
          {/* Hub-spoke edges (S-curves) */}
          {spokes.map((s, i) => {
            const spokeEdgeX = s.x + (s.x < hubX ? 25 : -25)
            const spokeEdgeY = s.y + 12
            const hubEdgeX = hubX + (s.x < hubX ? -28 : 28)
            const midX = (spokeEdgeX + hubEdgeX) / 2
            return (
              <motion.path
                key={`edge-${i}`}
                d={`M ${spokeEdgeX} ${spokeEdgeY} C ${midX} ${spokeEdgeY}, ${midX} ${hubY}, ${hubEdgeX} ${hubY}`}
                fill="none"
                stroke="#64748B"
                strokeOpacity={0.4}
                strokeWidth={1.4}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isRevealed ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.1, ease: "easeOut" }}
              />
            )
          })}

          {/* Spoke nodes */}
          {spokes.map((s, i) => (
            <motion.g
              key={`spoke-${i}`}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease: "easeOut" }}
              style={{ transformOrigin: `${s.x}px ${s.y + 12}px` }}
            >
              <rect
                x={s.x - 25}
                y={s.y}
                width={50}
                height={24}
                rx={6}
                fill="#E2E8F0"
                stroke="#64748B"
                strokeOpacity={0.4}
              />
              <text
                x={s.x}
                y={s.y + 16}
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fill="#64748B"
                fontFamily="ui-sans-serif, system-ui, sans-serif"
              >
                {s.label}
              </text>
            </motion.g>
          ))}

          {/* Central HUB */}
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, delay: 1.0, ease: "easeOut" }}
            style={{ transformOrigin: `${hubX}px ${hubY}px` }}
          >
            <rect x={hubX - 28} y={hubY - 14} width={56} height={28} rx={8} fill="#64748B" />
            <text
              x={hubX}
              y={hubY + 4}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="#fff"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
            >
              HUB
            </text>
          </motion.g>

          {/* Animated pulses traveling from hub out to each spoke (looping) */}
          {spokes.map((s, i) => {
            const spokeEdgeX = s.x + (s.x < hubX ? 25 : -25)
            const spokeEdgeY = s.y + 12
            const hubEdgeX = hubX + (s.x < hubX ? -28 : 28)
            return (
              <motion.circle
                key={`pulse-${i}`}
                r={2.6}
                fill="#475569"
                initial={{ cx: hubEdgeX, cy: hubY, opacity: 0 }}
                animate={
                  isRevealed
                    ? {
                        cx: inView ? [hubEdgeX, spokeEdgeX] : hubEdgeX,
                        cy: inView ? [hubY, spokeEdgeY] : hubY,
                        opacity: inView ? [0, 1, 1, 0] : 0,
                      }
                    : { cx: hubEdgeX, cy: hubY, opacity: 0 }
                }
                transition={{
                  duration: 1.4,
                  delay: 1.6 + i * 0.25,
                  repeat: Infinity,
                  repeatDelay: 2.6,
                  ease: "easeInOut",
                  times: [0, 0.15, 0.85, 1],
                }}
              />
            )
          })}
        </svg>

        {/* Bicep/IaC badge anchored over the hub */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.45, delay: 1.4 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-[120%] flex items-center gap-1.5 rounded-full bg-[#64748B] px-2.5 py-1 text-[0.6rem] font-medium text-white shadow-md shadow-[#64748B]/30"
        >
          <Cloud className="h-3 w-3" />
          Bicep
        </motion.div>
      </div>
    </VisualShell>
  )
}

function SecurityRingsVisual({ isRevealed, labels }: { isRevealed: boolean; labels?: VisualLabels }) {
  // Live SIEM-style feed: security score + recent events ticking in.
  const events = [
    { type: "ok" as const, title: "MFA-Login", source: "J. Müller · Berlin", time: "2 s", isNew: true },
    { type: "warn" as const, title: "Brute-Force blocked", source: "Edge-Gateway", time: "14 s" },
    {
      type: "ok" as const,
      title: labels?.security?.eventBackupVerified ?? "Backup verifiziert",
      source: "Azure Vault",
      time: "1 min",
    },
    { type: "ok" as const, title: "Patches deployed", source: "3 Hosts · WSUS", time: "5 min" },
    {
      type: "warn" as const,
      title: labels?.security?.eventAnomalyDetected ?? "Anomalie erkannt",
      source: "ML-Server · Logs",
      time: "12 min",
    },
  ]

  const typeStyles: Record<"ok" | "warn" | "err", { color: string; bg: string; glyph: string }> = {
    ok: { color: "#10B981", bg: "bg-emerald-50", glyph: "✓" },
    warn: { color: "#F59E0B", bg: "bg-amber-50", glyph: "!" },
    err: { color: "#EF4444", bg: "bg-red-50", glyph: "✕" },
  }
  const [ref, inView] = useActiveInView()

  return (
    <VisualShell shellRef={ref}>
      {/* Header */}
      <div className="flex items-baseline justify-between">
        <span className="text-[0.65rem] uppercase tracking-[0.18em] text-black/40 font-medium">Defense-in-Depth</span>
        <div className="flex items-center gap-1">
          <motion.span
            animate={inView ? { opacity: [1, 0.4, 1] } : { opacity: 1 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-emerald-500"
          />
          <span className="text-[0.55rem] font-mono font-semibold uppercase tracking-[0.18em] text-emerald-600">
            live
          </span>
        </div>
      </div>

      {/* Score banner */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-2.5 flex items-center justify-between rounded-md border border-slate-200/80 bg-gradient-to-br from-emerald-50/60 via-white to-transparent p-2"
      >
        <div className="flex flex-col">
          <span className="text-[0.5rem] font-semibold uppercase tracking-wider text-black/50">Security Score</span>
          <span className="text-[0.5rem] text-black/40">NIS2 · ISO 27001</span>
        </div>
        <div className="flex items-baseline gap-1">
          <CountUp
            to={92}
            isRevealed={isRevealed}
            duration={1.4}
            className="font-serif text-[1.4rem] font-semibold leading-none text-emerald-600"
          />
          <span className="text-[0.55rem] font-mono text-black/40">/ 100</span>
        </div>
      </motion.div>

      {/* Events feed */}
      <div className="mt-2 flex flex-col gap-1">
        {events.map((event, i) => {
          const style = typeStyles[event.type]
          return (
            <motion.div
              key={`event-${i}`}
              initial={{ opacity: 0, x: -6 }}
              animate={isRevealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
              transition={{ duration: 0.45, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-1.5 rounded-md border border-slate-200/70 bg-white px-1.5 py-1"
            >
              <div
                className={`flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full text-[0.55rem] font-bold leading-none ${style.bg}`}
                style={{ color: style.color }}
              >
                {style.glyph}
              </div>
              <div className="min-w-0 flex-1 leading-tight">
                <div className="truncate text-[0.6rem] font-semibold text-black/75">{event.title}</div>
                <div className="truncate text-[0.5rem] text-black/40">{event.source}</div>
              </div>
              <span className="shrink-0 text-[0.5rem] font-mono text-black/40">{event.time}</span>
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
    </VisualShell>
  )
}

export const VISUALS = [ProcessFlowVisual, CloudTopologyVisual, SecurityRingsVisual] as const
