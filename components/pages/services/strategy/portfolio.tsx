"use client"

import { useEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"
import {
  CalendarCheck,
  ChevronDown,
  Cloud,
  ShieldCheck,
  Workflow,
  X,
} from "lucide-react"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"
import { useLenis } from "@/components/smooth-scroll-provider"

const STRAND_COLORS = ["#64748B", "#475569", "#334155"] as const
const ICONS = [Workflow, Cloud, ShieldCheck] as const

// ---------------------------------------------------------------------------
// CountUp – cheap motion-value driven number animation
// ---------------------------------------------------------------------------
function CountUp({
  to,
  duration = 1.6,
  decimals = 0,
  isRevealed,
  prefix = "",
  suffix = "",
  className,
}: {
  to: number
  duration?: number
  decimals?: number
  isRevealed: boolean
  prefix?: string
  suffix?: string
  className?: string
}) {
  const value = useMotionValue(0)
  const [display, setDisplay] = useState("0")

  useEffect(() => {
    if (!isRevealed) return
    const controls = animate(value, to, { duration, ease: "easeOut" })
    const unsub = value.on("change", (v) => {
      setDisplay(decimals === 0 ? Math.round(v).toString() : v.toFixed(decimals))
    })
    return () => {
      controls.stop()
      unsub()
    }
  }, [isRevealed, to, duration, decimals, value])

  return (
    <span className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Right-column visuals
// ---------------------------------------------------------------------------
function VisualShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full max-w-[380px] aspect-[5/4] rounded-3xl bg-white border border-gray-100 shadow-[0_18px_44px_rgba(100,116,139,0.10)] p-5 sm:p-6 overflow-hidden ${className}`}
    >
      {children}
    </div>
  )
}

function ProcessFlowVisual({ isRevealed, labels }: { isRevealed: boolean; labels?: any }) {
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

  return (
    <VisualShell>
      <div className="flex items-baseline justify-between">
        <span className="text-[0.65rem] uppercase tracking-[0.18em] text-black/40 font-medium">{labels?.process?.label ?? "Genehmigungslauf"}</span>
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
                    cx: [startX, startX, taskX, gatewayX, gatewayX + 18, approveX, doneX, doneX],
                    cy: [110, 110, 110, 110, 88, approveY, doneY, doneY],
                    opacity: [0, 1, 1, 1, 1, 1, 1, 0],
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

function CloudTopologyVisual({ isRevealed, labels }: { isRevealed: boolean; labels?: any }) {
  // Hub-and-Spoke topology: central HUB with 4 workload spokes (PROD/DEV/DATA/EXT).
  const hubX = 180
  const hubY = 110
  const spokes = [
    { x: 56, y: 50, label: "PROD" },
    { x: 304, y: 50, label: "DEV" },
    { x: 56, y: 170, label: "DATA" },
    { x: 304, y: 170, label: "EXT" },
  ]
  return (
    <VisualShell>
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
            <rect
              x={hubX - 28}
              y={hubY - 14}
              width={56}
              height={28}
              rx={8}
              fill="#64748B"
            />
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
                        cx: [hubEdgeX, spokeEdgeX],
                        cy: [hubY, spokeEdgeY],
                        opacity: [0, 1, 1, 0],
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

function SecurityRingsVisual({ isRevealed, labels }: { isRevealed: boolean; labels?: any }) {
  // Live SIEM-style feed: security score + recent events ticking in.
  const events = [
    { type: "ok" as const, title: "MFA-Login", source: "J. Müller · Berlin", time: "2 s", isNew: true },
    { type: "warn" as const, title: "Brute-Force blocked", source: "Edge-Gateway", time: "14 s" },
    { type: "ok" as const, title: labels?.security?.eventBackupVerified ?? "Backup verifiziert", source: "Azure Vault", time: "1 min" },
    { type: "ok" as const, title: "Patches deployed", source: "3 Hosts · WSUS", time: "5 min" },
    { type: "warn" as const, title: labels?.security?.eventAnomalyDetected ?? "Anomalie erkannt", source: "ML-Server · Logs", time: "12 min" },
  ]

  const typeStyles: Record<"ok" | "warn" | "err", { color: string; bg: string; glyph: string }> = {
    ok: { color: "#10B981", bg: "bg-emerald-50", glyph: "✓" },
    warn: { color: "#F59E0B", bg: "bg-amber-50", glyph: "!" },
    err: { color: "#EF4444", bg: "bg-red-50", glyph: "✕" },
  }

  return (
    <VisualShell>
      {/* Header */}
      <div className="flex items-baseline justify-between">
        <span className="text-[0.65rem] uppercase tracking-[0.18em] text-black/40 font-medium">Defense-in-Depth</span>
        <div className="flex items-center gap-1">
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
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
          <span className="text-[0.5rem] font-semibold uppercase tracking-wider text-black/50">
            Security Score
          </span>
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
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
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

const VISUALS = [ProcessFlowVisual, CloudTopologyVisual, SecurityRingsVisual] as const

// ---------------------------------------------------------------------------
// Mobile portfolio — vertical stack with mobile-tuned live visuals per service.
// The desktop SVG visuals don't read well at phone widths because their internal
// labels are sized in viewBox units (they shrink with the container and become
// illegible). The mobile counterparts below use HTML pills for labels so text
// stays sharp, and are sized for ~320–400px card widths.
// ---------------------------------------------------------------------------

function MobileVisualShell({
  children,
  label,
  badge,
  accent,
}: {
  children: React.ReactNode
  label: string
  badge?: React.ReactNode
  accent: string
}) {
  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden rounded-2xl border bg-white p-4"
      style={{
        borderColor: `${accent}26`,
        backgroundImage: `linear-gradient(135deg, ${accent}10, transparent 55%)`,
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
        style={{
          background: `linear-gradient(to right, transparent, ${accent}66, transparent)`,
        }}
      />
      <div className="relative mb-3 flex items-center justify-between">
        <span className="text-[0.5rem] font-semibold uppercase tracking-[0.22em] text-black/40">
          {label}
        </span>
        {badge}
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}

function MobileProcessFlowVisual({ isRevealed, accent, labels }: { isRevealed: boolean; accent: string; labels?: any }) {
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

  return (
    <MobileVisualShell
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
                    cx: [startX, startX, taskX, gatewayX, gatewayX + 6, approveX, doneX, doneX],
                    cy: [centerY, centerY, centerY, centerY, 14, approveY, approveY, approveY],
                    opacity: [0, 1, 1, 1, 1, 1, 1, 0],
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
  labels: _labels,
}: {
  isRevealed: boolean
  accent: string
  labels?: any
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
  return (
    <MobileVisualShell
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
                        cx: [hubX, sxEdge],
                        cy: [hubY, s.y],
                        opacity: [0, 1, 1, 0],
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

function MobileSecurityRingsVisual({ isRevealed, accent, labels }: { isRevealed: boolean; accent: string; labels?: any }) {
  // Live SIEM-style feed: security score + 3 recent events.
  const events = [
    { type: "ok" as const, title: "MFA-Login", source: "J. Müller", time: "2 s", isNew: true },
    { type: "warn" as const, title: "Brute-Force blocked", source: "Edge-Gateway", time: "14 s" },
    { type: "ok" as const, title: labels?.security?.eventBackupVerified ?? "Backup verifiziert", source: "Azure Vault", time: "1 min" },
  ]

  const typeStyles: Record<"ok" | "warn" | "err", { color: string; bg: string; glyph: string }> = {
    ok: { color: "#10B981", bg: "bg-emerald-50", glyph: "✓" },
    warn: { color: "#F59E0B", bg: "bg-amber-50", glyph: "!" },
    err: { color: "#EF4444", bg: "bg-red-50", glyph: "✕" },
  }

  return (
    <MobileVisualShell
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
            animate={{ opacity: [1, 0.4, 1] }}
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
            <span className="text-[0.5rem] font-semibold uppercase tracking-wider text-black/55">
              Security Score
            </span>
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
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
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

const MOBILE_VISUALS = [MobileProcessFlowVisual, MobileCloudTopologyVisual, MobileSecurityRingsVisual] as const

// Bottom-sheet modal for the per-service "Mehr erfahren" details. Pauses Lenis
// while open so the underlying pinned stage stops drifting.
function MobileServiceDetailsSheet({
  item,
  isOpen,
  onClose,
  accent,
  dict,
}: {
  item: any | null
  isOpen: boolean
  onClose: () => void
  accent: string
  dict: any
}) {
  const t = dict.servicesStrategy.portfolio
  const lenis = useLenis()

  useEffect(() => {
    if (!isOpen) return
    lenis?.stop()
    const prevHtmlOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      lenis?.start()
      document.documentElement.style.overflow = prevHtmlOverflow
      window.removeEventListener("keydown", onKey)
    }
  }, [isOpen, lenis, onClose])

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          key="sheet-root"
          className="fixed inset-0 z-50 flex flex-col justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="portfolio-sheet-title"
        >
          <motion.button
            type="button"
            aria-label={t.learnLess ?? "Schließen"}
            className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="relative z-10 mx-auto w-full max-w-[640px] rounded-t-[2rem] bg-white p-6 pt-3 shadow-[0_-24px_60px_rgba(15,23,42,0.18)]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 80 || info.velocity.y > 600) onClose()
            }}
          >
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-black/15" />
            <div className="flex items-start justify-between gap-3">
              <h3
                id="portfolio-sheet-title"
                className="font-serif text-[1.45rem] leading-[1.15] tracking-tight text-black"
              >
                {item.title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                aria-label={t.learnLess ?? "Schließen"}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-black/55 transition-colors hover:bg-slate-50"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div
              aria-hidden
              className="mt-3 h-px w-full"
              style={{
                background: `linear-gradient(90deg, ${accent}55, transparent)`,
              }}
            />
            <div className="mt-4 max-h-[60vh] space-y-3 overflow-y-auto pr-1">
              {item.details.split("\n\n").map((paragraph: string, j: number) => (
                <p key={j} className="text-[0.95rem] leading-relaxed text-black/65">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function StageProgressRail({
  progress,
  activeIndex,
}: {
  progress: any
  activeIndex: number
}) {
  const w0 = useTransform(progress, [0, 0.33], ["0%", "100%"])
  const w1 = useTransform(progress, [0.33, 0.66], ["0%", "100%"])
  const w2 = useTransform(progress, [0.66, 1], ["0%", "100%"])
  const widths = [w0, w1, w2]
  const accent = STRAND_COLORS[activeIndex] ?? STRAND_COLORS[0]

  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-1 items-center gap-1.5">
        {widths.map((w, i) => (
          <div
            key={i}
            className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-black/[0.08]"
          >
            <motion.span
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ width: w, backgroundColor: STRAND_COLORS[i] }}
            />
          </div>
        ))}
      </div>
      <span
        className="font-mono text-[0.65rem] font-semibold tracking-[0.18em]"
        style={{ color: accent }}
      >
        {`0${activeIndex + 1}`}
        <span className="text-black/35"> / 03</span>
      </span>
    </div>
  )
}

function StageVisualLayer({
  progress,
  sectionRevealed,
  labels,
}: {
  progress: any
  sectionRevealed: boolean
  labels?: any
}) {
  const o0 = useTransform(progress, [0, 0.28, 0.36], [1, 1, 0])
  const o1 = useTransform(progress, [0.28, 0.36, 0.62, 0.7], [0, 1, 1, 0])
  const o2 = useTransform(progress, [0.62, 0.7, 1], [0, 1, 1])
  const s0 = useTransform(progress, [0, 0.36], [1, 0.97])
  const s1 = useTransform(progress, [0.3, 0.36, 0.66, 0.7], [0.97, 1, 1, 0.97])
  const s2 = useTransform(progress, [0.62, 0.7], [0.97, 1])
  const layers = [
    { o: o0, s: s0 },
    { o: o1, s: s1 },
    { o: o2, s: s2 },
  ]

  return (
    <div aria-hidden className="relative w-full h-[clamp(170px,23vh,210px)]">
      {MOBILE_VISUALS.map((Visual, i) => {
        const accent = STRAND_COLORS[i]
        return (
          <motion.div
            key={i}
            className="absolute inset-0 flex items-center justify-center"
            style={{ opacity: layers[i].o, scale: layers[i].s }}
          >
            <div className="w-full max-w-[420px]">
              <Visual isRevealed={sectionRevealed} accent={accent} labels={labels} />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

function StageTextLayer({
  items,
  activeIndex,
}: {
  items: any[]
  activeIndex: number
}) {
  const item = items[activeIndex]
  const Icon = ICONS[activeIndex] ?? Workflow
  const accent = STRAND_COLORS[activeIndex] ?? STRAND_COLORS[0]

  return (
    <div className="relative" aria-live="polite">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-2xl"
              style={{ backgroundColor: `${accent}1F` }}
            >
              <Icon className="h-5 w-5" style={{ color: accent }} />
            </div>
            <span
              className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.24em]"
              style={{ color: accent }}
            >
              {`0${activeIndex + 1}`} <span className="text-black/30">/ 03</span>
            </span>
          </div>
          <h3 className="mt-3 font-serif text-[1.6rem] leading-[1.1] tracking-tight text-black text-balance">
            {item.title}
          </h3>
          <p className="mt-2 text-[0.9rem] leading-relaxed text-black/65 text-balance">
            {item.shortDesc}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function ScrollytellingStage({
  items,
  progress,
  activeIndex,
  sectionRevealed,
  dict,
  onOpenDetails,
}: {
  items: any[]
  progress: any
  activeIndex: number
  sectionRevealed: boolean
  dict: any
  onOpenDetails: (index: number) => void
}) {
  const t = dict.servicesStrategy.portfolio
  const activeAccent = STRAND_COLORS[activeIndex] ?? STRAND_COLORS[0]
  return (
    <div className="sticky top-16 flex h-[calc(100vh-4rem)] max-h-[560px] w-full flex-col">
      <div className="flex flex-1 flex-col gap-4 px-5 pb-5 pt-4">
        <StageProgressRail progress={progress} activeIndex={activeIndex} />
        <StageVisualLayer progress={progress} sectionRevealed={sectionRevealed} labels={t.visuals} />
        <StageTextLayer items={items} activeIndex={activeIndex} />
        <div className="mt-1 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onOpenDetails(activeIndex)}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.78rem] font-medium transition-colors duration-300"
            style={{
              color: activeAccent,
              backgroundColor: `${activeAccent}10`,
              borderColor: `${activeAccent}33`,
            }}
            aria-label={`${t.learnMore} – ${items[activeIndex]?.title ?? ""}`}
          >
            {t.learnMore}
            <ChevronDown className="h-4 w-4 -rotate-90" />
          </button>
          <BookCircleButton label={t.bookCta} size="md" />
        </div>
      </div>
    </div>
  )
}

// Reduced-motion / fallback rendering. Three plain blocks with the visuals
// fully resolved, native <details> for the disclosure — no scroll math.
function MobileFallbackStack({
  items,
  dict,
  onOpenDetails,
}: {
  items: any[]
  dict: any
  onOpenDetails: (index: number) => void
}) {
  const t = dict.servicesStrategy.portfolio
  return (
    <div className="flex flex-col gap-6 px-4 sm:px-6">
      {items.map((item, i) => {
        const Icon = ICONS[i] ?? Workflow
        const accent = STRAND_COLORS[i] ?? STRAND_COLORS[0]
        const Visual = MOBILE_VISUALS[i] ?? MobileProcessFlowVisual
        return (
          <article
            key={i}
            className="rounded-[1.5rem] border border-slate-200/70 bg-white p-5"
          >
            <Visual isRevealed accent={accent} labels={t.visuals} />
            <div className="mt-4 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-2xl"
                style={{ backgroundColor: `${accent}1F` }}
              >
                <Icon className="h-5 w-5" style={{ color: accent }} />
              </div>
              <span
                className="text-[0.62rem] font-semibold uppercase tracking-[0.24em]"
                style={{ color: accent }}
              >
                {`0${i + 1}`} <span className="text-black/30">/ 03</span>
              </span>
            </div>
            <h3 className="mt-3 font-serif text-[1.55rem] leading-[1.1] tracking-tight text-black">
              {item.title}
            </h3>
            <p className="mt-2 text-[0.92rem] leading-relaxed text-black/65">
              {item.shortDesc}
            </p>
            <button
              type="button"
              onClick={() => onOpenDetails(i)}
              className="mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[0.78rem] font-medium"
              style={{
                color: accent,
                backgroundColor: `${accent}10`,
                borderColor: `${accent}33`,
              }}
            >
              {t.learnMore}
              <ChevronDown className="h-4 w-4 -rotate-90" />
            </button>
          </article>
        )
      })}
      <div className="flex justify-center pt-2">
        <BookCircleButton label={t.bookCta} size="lg" />
      </div>
    </div>
  )
}

function MobileScrollytellingSection({
  items,
  dict,
}: {
  items: any[]
  dict: any
}) {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const reveal = useRevealOnScroll<HTMLDivElement>({ margin: "-15%" })
  const reducedMotion = useReducedMotion() ?? false
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const indexMV = useTransform(
    scrollYProgress,
    [0, 0.33, 0.34, 0.66, 0.67, 1],
    [0, 0, 1, 1, 2, 2],
  )
  const [activeIndex, setActiveIndex] = useState(0)
  useMotionValueEvent(indexMV, "change", (v) => {
    const next = Math.max(0, Math.min(2, Math.round(v)))
    setActiveIndex((prev) => (prev === next ? prev : next))
  })

  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const openItem = openIndex !== null ? items[openIndex] : null
  const openAccent =
    openIndex !== null
      ? STRAND_COLORS[openIndex] ?? STRAND_COLORS[0]
      : STRAND_COLORS[0]

  return (
    <>
      {reducedMotion ? (
        <MobileFallbackStack
          items={items}
          dict={dict}
          onOpenDetails={(i) => setOpenIndex(i)}
        />
      ) : (
        <div
          ref={(el) => {
            sectionRef.current = el
            reveal.ref.current = el
          }}
          className="relative min-h-[200vh]"
          style={{ scrollMarginTop: "80px" }}
        >
          <ScrollytellingStage
            items={items}
            progress={scrollYProgress}
            activeIndex={activeIndex}
            sectionRevealed={reveal.isRevealed}
            dict={dict}
            onOpenDetails={(i) => setOpenIndex(i)}
          />
        </div>
      )}
      <MobileServiceDetailsSheet
        item={openItem}
        isOpen={openIndex !== null}
        onClose={() => setOpenIndex(null)}
        accent={openAccent}
        dict={dict}
      />
    </>
  )
}

// ---------------------------------------------------------------------------
function BookCircleButton({ label, size = "lg" }: { label: string; size?: "lg" | "md" }) {
  const dimensions = size === "lg" ? "h-14 w-14" : "h-11 w-11"
  const iconSize = size === "lg" ? "h-5 w-5" : "h-4 w-4"
  return (
    <a
      href="#book"
      aria-label={label}
      title={label}
      className={`group relative inline-flex ${dimensions} items-center justify-center rounded-full bg-[#64748B] text-white shadow-[0_18px_36px_rgba(100,116,139,0.32)] transition-all duration-300 hover:scale-105 hover:bg-[#334155] hover:shadow-[0_22px_48px_rgba(100,116,139,0.45)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#64748B]/30`}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-[#64748B]/40"
        initial={{ scale: 1, opacity: 0.6 }}
        animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
      />
      <CalendarCheck className={`${iconSize} transition-transform duration-300 group-hover:scale-110`} />
      <span className="sr-only">{label}</span>
    </a>
  )
}

// ---------------------------------------------------------------------------
// PortfolioRow – text + visual block, also tracks its vertical center for the SVG
// ---------------------------------------------------------------------------
function RowText({
  item,
  index,
  dict,
  alignRight,
}: {
  item: any
  index: number
  dict: any
  alignRight: boolean
}) {
  const [isOpen, setIsOpen] = useState(false)
  const Icon = ICONS[index] ?? Workflow
  const accent = STRAND_COLORS[index]
  const t = dict.servicesStrategy.portfolio

  return (
    <div className={alignRight ? "md:text-right" : ""}>
      <div className={`inline-flex items-center gap-3 mb-4 ${alignRight ? "md:flex-row-reverse" : ""}`}>
        <div
          className="flex h-11 w-11 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${accent}1F`, color: accent }}
        >
          <Icon className="h-5 w-5" style={{ color: accent }} />
        </div>
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-black/40">
          {`0${index + 1}`}
        </span>
      </div>

      <h3 className="font-serif text-2xl sm:text-3xl lg:text-[2rem] leading-tight tracking-tight text-black">
        {item.title}
      </h3>

      <p
        className={`mt-4 text-[0.95rem] sm:text-base leading-relaxed text-black/65 max-w-[52ch] lg:max-w-[44ch] ${
          alignRight ? "md:ml-auto" : ""
        }`}
      >
        {item.shortDesc}
      </p>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`overflow-hidden ${alignRight ? "md:ml-auto" : ""}`}
          >
            <div className="mt-4 space-y-3 max-w-[52ch] lg:max-w-[44ch]">
              {item.details.split("\n\n").map((paragraph: string, i: number) => (
                <p key={i} className="text-sm sm:text-[0.95rem] leading-relaxed text-black/55">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`mt-5 flex ${alignRight ? "md:justify-end" : ""}`}>
        <button
          type="button"
          onClick={() => setIsOpen((o) => !o)}
          className="group inline-flex items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#334155] transition-colors"
          aria-expanded={isOpen}
        >
          {isOpen ? t.learnLess : t.learnMore}
          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main section
// ---------------------------------------------------------------------------
export default function PortfolioSection({ dict }: { dict: any }) {
  const portfolio = dict.servicesStrategy.portfolio
  const items: any[] = portfolio.items ?? []

  const heading = useRevealOnScroll<HTMLDivElement>()
  const sectionRef = useRef<HTMLElement | null>(null)

  // Per-row reveal hooks for the desktop alternating layout (md+).
  // Mobile (<md) uses the carousel which manages active state internally,
  // so it doesn't need scroll-tied reveals.
  const dReveal0 = useRevealOnScroll<HTMLDivElement>({ margin: "-120px" })
  const dReveal1 = useRevealOnScroll<HTMLDivElement>({ margin: "-120px" })
  const dReveal2 = useRevealOnScroll<HTMLDivElement>({ margin: "-120px" })
  const desktopReveals = [dReveal0, dReveal1, dReveal2]
  const revealedRows = desktopReveals.map((d) => d.isRevealed)

  return (
    <section ref={sectionRef} className="relative md:overflow-hidden">
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-2 sm:pt-4 md:pt-6">
        <div
          ref={heading.ref}
          className={`text-center mb-10 sm:mb-12 md:mb-16 reveal-fade-up ${heading.isRevealed ? "revealed" : ""}`}
        >
          <span className="section-eyebrow justify-center">{dict.servicesStrategy.eyebrows?.portfolio}</span>
          <h2 className="font-serif text-[2.2rem] sm:text-[2.4rem] md:text-[3rem] leading-[1.1] tracking-tight text-black">
            {portfolio.title} <span className="text-[#64748B]">{portfolio.titleHighlight}</span>
          </h2>
          <p className="mt-3 sm:mt-4 md:mt-6 text-[0.9rem] sm:text-base md:text-lg leading-relaxed text-black/60 max-w-[60ch] mx-auto">
            {portfolio.subtitle}
          </p>
        </div>
      </div>

      {/* Tablet + Desktop: alternating rows -------------------------------- */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 hidden md:block">
        <div className="relative pb-12 lg:pb-16">
          <div className="flex flex-col gap-y-20 lg:gap-y-32">
            {items.map((item, i) => {
              const Visual = VISUALS[i] ?? ProcessFlowVisual
              const textOnLeft = i % 2 === 0
              const textBlock = (
                <div
                  className={`relative z-10 flex ${textOnLeft ? "justify-end pr-3 lg:pr-8" : "justify-start pl-3 lg:pl-8"}`}
                >
                  <div className="max-w-[440px]">
                    <RowText item={item} index={i} dict={dict} alignRight={textOnLeft} />
                  </div>
                </div>
              )
              const visualBlock = (
                <div
                  className={`relative z-10 flex ${textOnLeft ? "justify-start pl-3 lg:pl-8" : "justify-end pr-3 lg:pr-8"}`}
                >
                  <Visual isRevealed={revealedRows[i]} labels={portfolio.visuals} />
                </div>
              )
              return (
                <div
                  key={i}
                  ref={(el) => {
                    desktopReveals[i].ref.current = el
                  }}
                  className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-3 lg:gap-x-4"
                >
                  {textOnLeft ? textBlock : visualBlock}
                  <div className="relative z-10 flex justify-center">
                    <BookCircleButton label={portfolio.bookCta} size="lg" />
                  </div>
                  {textOnLeft ? visualBlock : textBlock}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile only: scroll-pinned scrollytelling stage ------------------ */}
      <div className="relative z-10 md:hidden">
        <MobileScrollytellingSection items={items} dict={dict} />
      </div>
    </section>
  )
}
