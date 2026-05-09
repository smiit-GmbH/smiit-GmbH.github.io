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
  AppWindow,
  ArrowDownRight,
  ArrowUpRight,
  CalendarCheck,
  ChevronDown,
  Cloud,
  Palette,
  ShieldCheck,
  X,
} from "lucide-react"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"
import { useLenis } from "@/components/smooth-scroll-provider"

const STRAND_COLORS = ["#FA85F4", "#F703EB", "#94A3B8"] as const
const ICONS = [AppWindow, Palette, Cloud] as const

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
      className={`relative flex flex-col justify-between w-full max-w-[380px] aspect-[5/4] rounded-3xl bg-white border border-gray-100 shadow-[0_18px_44px_rgba(15,23,42,0.10)] p-5 sm:p-6 overflow-hidden ${className}`}
    >
      {children}
    </div>
  )
}

function BIVisual({ isRevealed, labels }: { isRevealed: boolean; labels?: any }) {
  const moduleLabels: string[] = labels?.bi?.modules ?? ["Vertrieb", "Lager", "Kunden"]
  const modules = [
    { label: moduleLabels[0], color: "#F703EB", metric: "247" },
    { label: moduleLabels[1], color: "#FA85F4", metric: "1.2k" },
    { label: moduleLabels[2], color: "#94A3B8", metric: "892" },
  ]
  const tabs: string[] = labels?.bi?.tabs ?? ["Übersicht", "Berichte", "Einstellungen"]
  return (
    <VisualShell>
      <div className="flex items-baseline justify-between">
        <span className="text-[0.65rem] uppercase tracking-[0.18em] text-black/40 font-medium">{labels?.bi?.label ?? "Aktive Nutzer"}</span>
        <CountUp
          to={1247}
          isRevealed={isRevealed}
          className="font-serif text-2xl font-semibold text-[#F703EB]"
        />
      </div>

      {/* Window-style mockup */}
      <div className="mt-3 rounded-lg border border-slate-200/70 bg-slate-50/60 p-2.5">
        {/* Title bar */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="h-1.5 w-1.5 rounded-full bg-red-300/70" />
          <div className="h-1.5 w-1.5 rounded-full bg-yellow-300/70" />
          <div className="h-1.5 w-1.5 rounded-full bg-green-300/70" />
          <div className="ml-2 h-2 flex-1 rounded-sm bg-white" />
        </div>

        {/* Tabs row */}
        <div className="flex items-center gap-1 mb-2">
          {tabs.map((tab, i) => (
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: -3 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -3 }}
              transition={{ duration: 0.35, delay: 0.1 + i * 0.06 }}
              className={`rounded-sm px-1.5 py-0.5 text-[0.5rem] font-semibold ${
                i === 0
                  ? "bg-[#F703EB]/10 text-[#F703EB]"
                  : "bg-white text-black/40"
              }`}
            >
              {tab}
            </motion.div>
          ))}
        </div>

        {/* Module cards with metrics */}
        <div className="grid grid-cols-3 gap-1.5">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.label}
              initial={{ opacity: 0, y: 6 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-md border p-2"
              style={{ backgroundColor: `${mod.color}14`, borderColor: `${mod.color}33` }}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="h-1 w-1/2 rounded-full" style={{ backgroundColor: mod.color }} />
                <span className="text-[0.5rem] font-mono font-semibold leading-none" style={{ color: mod.color }}>
                  {mod.metric}
                </span>
              </div>
              <div className="h-0.5 w-1/2 rounded-full mb-1.5" style={{ backgroundColor: `${mod.color}66` }} />
              <div className="text-[0.55rem] font-semibold leading-none" style={{ color: mod.color }}>
                {mod.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Live activity row */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
          transition={{ duration: 0.45, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 flex items-center gap-1.5 rounded border border-slate-200/60 bg-white px-1.5 py-1"
        >
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="h-1 w-1 shrink-0 rounded-full bg-emerald-500"
          />
          <span className="truncate text-[0.5rem] text-black/55">
            {labels?.bi?.activity ?? "J. Müller hat Auftrag #4831 angelegt"}
          </span>
          <span className="ml-auto shrink-0 text-[0.45rem] font-mono text-black/30">2s</span>
        </motion.div>
      </div>

      {/* API status */}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-[0.55rem] uppercase tracking-wider text-black/40 font-medium">API Status</span>
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.3 }}
              animate={isRevealed ? { opacity: [0.3, 1, 0.3] } : { opacity: 0.3 }}
              transition={{ duration: 1.6, delay: 0.6 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
              className="h-1.5 w-1.5 rounded-full bg-emerald-400"
            />
          ))}
          <span className="ml-1 text-[0.65rem] font-mono font-semibold text-emerald-600">3/3</span>
        </div>
      </div>
    </VisualShell>
  )
}

function GovernanceVisual({ isRevealed, labels }: { isRevealed: boolean; labels?: any }) {
  const palette = ["#F703EB", "#FA85F4", "#0B162D", "#FBE3F9", "#94A3B8"]
  return (
    <VisualShell>
      <div className="flex items-baseline justify-between">
        <span className="text-[0.65rem] uppercase tracking-[0.18em] text-black/40 font-medium">Website Design</span>
        <span className="text-[0.65rem] font-medium text-[#F703EB]">Lighthouse 98</span>
      </div>

      {/* Browser preview */}
      <div className="mt-3 rounded-lg border border-slate-200/70 bg-white p-2 shadow-sm">
        <div className="flex items-center gap-1.5 mb-2">
          <div className="h-1.5 w-1.5 rounded-full bg-red-300/70" />
          <div className="h-1.5 w-1.5 rounded-full bg-yellow-300/70" />
          <div className="h-1.5 w-1.5 rounded-full bg-green-300/70" />
          <div className="ml-2 flex-1 rounded-sm bg-slate-100 px-1.5 py-0.5 text-[0.5rem] text-black/40 font-mono">
            yoursite.de
          </div>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-md bg-gradient-to-br from-[#F703EB]/10 via-transparent to-transparent p-2.5"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={isRevealed ? { width: "65%" } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="h-2 rounded-full bg-[#F703EB]"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={isRevealed ? { width: "40%" } : { width: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease: "easeOut" }}
            className="mt-1.5 h-1 rounded-full bg-[#F703EB]/40"
          />
          <motion.div
            initial={{ width: 0 }}
            animate={isRevealed ? { width: "30%" } : { width: 0 }}
            transition={{ duration: 0.4, delay: 0.7, ease: "easeOut" }}
            className="mt-1 h-1 rounded-full bg-[#F703EB]/40"
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={isRevealed ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.4, delay: 0.95 }}
            className="mt-2 inline-flex h-3 w-12 origin-left rounded-sm bg-[#F703EB]"
          />
        </motion.div>

        {/* Card row */}
        <div className="mt-1.5 grid grid-cols-3 gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
              transition={{ duration: 0.4, delay: 1.0 + i * 0.08 }}
              className="rounded-sm bg-slate-100 p-1"
            >
              <div className="h-3 rounded-sm bg-slate-200" />
              <div className="mt-1 h-0.5 w-full rounded-full bg-slate-300" />
              <div className="mt-0.5 h-0.5 w-2/3 rounded-full bg-slate-300/70" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom row: performance + palette */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-[0.55rem] uppercase tracking-wider text-black/40 font-medium">Performance</span>
          <CountUp
            to={98}
            isRevealed={isRevealed}
            className="text-[0.78rem] font-mono font-semibold text-emerald-600"
          />
        </div>
        <div className="flex items-center gap-0.5">
          {palette.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3, delay: 1.3 + i * 0.05 }}
              className="h-2.5 w-2.5 rounded-full border border-slate-200/70"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </VisualShell>
  )
}

function MLVisual({ isRevealed, labels }: { isRevealed: boolean; labels?: any }) {
  const services = [
    { label: "App", x: 80, y: 100 },
    { label: "DB", x: 180, y: 100 },
    { label: "API", x: 280, y: 100 },
    { label: "ID", x: 130, y: 175 },
    { label: "KV", x: 230, y: 175 },
  ]
  const cloudX = 180
  const cloudY = 30

  return (
    <VisualShell>
      <div className="flex items-baseline justify-between">
        <span className="text-[0.65rem] uppercase tracking-[0.18em] text-black/40 font-medium">Azure Topology</span>
        <span className="text-[0.65rem] font-medium text-[#F703EB] flex items-center gap-1">
          <ShieldCheck className="h-3 w-3" />
          compliant
        </span>
      </div>
      <div className="relative mt-3 h-[78%]">
        <svg viewBox="0 0 360 230" className="absolute inset-0 w-full h-full">
          {/* Lines from Azure to each service */}
          {services.map((svc, i) => (
            <motion.path
              key={`l-${i}`}
              d={`M ${cloudX} ${cloudY + 18} C ${cloudX} ${cloudY + 50}, ${svc.x} ${svc.y - 30}, ${svc.x} ${svc.y - 12}`}
              fill="none"
              stroke="#F703EB"
              strokeWidth="1.5"
              strokeOpacity="0.35"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={isRevealed ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: "easeInOut" }}
            />
          ))}

          {/* Azure cloud node (center) */}
          <motion.g
            initial={{ opacity: 0, scale: 0.6 }}
            animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            style={{ transformOrigin: `${cloudX}px ${cloudY}px` }}
          >
            <rect x={cloudX - 40} y={cloudY - 14} width="80" height="32" rx="8" fill="#F703EB" />
            <text
              x={cloudX}
              y={cloudY + 7}
              textAnchor="middle"
              fontSize="14"
              fontWeight="700"
              fill="#fff"
              fontFamily="ui-sans-serif, system-ui, sans-serif"
              letterSpacing="0.12em"
            >
              AZURE
            </text>
          </motion.g>

          {/* Service nodes */}
          {services.map((svc, i) => (
            <motion.g
              key={svc.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.4, delay: 0.95 + i * 0.08, ease: "easeOut" }}
              style={{ transformOrigin: `${svc.x}px ${svc.y}px` }}
            >
              <rect
                x={svc.x - 22}
                y={svc.y - 12}
                width="44"
                height="24"
                rx="6"
                fill="#FBE3F9"
                stroke="#F703EB"
                strokeOpacity="0.4"
                strokeWidth="1"
              />
              <text
                x={svc.x}
                y={svc.y + 4}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="#F703EB"
                fontFamily="ui-sans-serif, system-ui, sans-serif"
              >
                {svc.label}
              </text>
            </motion.g>
          ))}
        </svg>

        {/* IaC/Bicep badge */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={{ duration: 0.45, delay: 1.5 }}
          className="absolute right-2 bottom-1 flex items-center gap-1.5 rounded-md bg-[#0B162D] px-2.5 py-1 text-[0.6rem] font-mono text-white shadow"
        >
          <span className="text-[#FA85F4]">IaC</span>
          Bicep
        </motion.div>
      </div>
    </VisualShell>
  )
}

const VISUALS = [BIVisual, GovernanceVisual, MLVisual] as const

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

function MobileBIVisual({ isRevealed, accent, labels }: { isRevealed: boolean; accent: string; labels?: any }) {
  const modules: string[] = labels?.bi?.modules ?? ["Vertrieb", "Lager", "Kunden"]
  return (
    <MobileVisualShell
      accent={accent}
      label={labels?.bi?.label ?? "Aktive Nutzer"}
      badge={
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex items-center gap-1 rounded-full border border-emerald-200/70 bg-emerald-50 px-2 py-0.5"
        >
          <span className="h-1 w-1 rounded-full bg-emerald-500" />
          <span className="text-[0.6rem] font-semibold text-emerald-700">live</span>
        </motion.div>
      }
    >
      <div className="flex items-end justify-between">
        <span style={{ color: accent }}>
          <CountUp
            to={1247}
            isRevealed={isRevealed}
            className="font-serif text-[1.85rem] font-semibold leading-none"
          />
        </span>
        <span className="pb-0.5 text-[0.55rem] uppercase tracking-wider text-black/40">
          {labels?.bi?.moduleCount ?? "3 Module"}
        </span>
      </div>

      {/* Window mockup */}
      <div className="mt-3 rounded-md border border-black/[0.06] bg-white p-1.5">
        <div className="flex items-center gap-1 mb-1.5">
          <div className="h-1 w-1 rounded-full bg-red-300/70" />
          <div className="h-1 w-1 rounded-full bg-yellow-300/70" />
          <div className="h-1 w-1 rounded-full bg-green-300/70" />
        </div>
        <div className="grid grid-cols-3 gap-1">
          {modules.map((mod, i) => (
            <motion.div
              key={mod}
              initial={{ opacity: 0, y: 4 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              className="rounded border p-1.5"
              style={{ backgroundColor: `${accent}14`, borderColor: `${accent}33` }}
            >
              <div className="h-0.5 w-2/3 rounded-full mb-1" style={{ backgroundColor: accent }} />
              <div className="text-[0.5rem] font-semibold leading-none" style={{ color: accent }}>
                {mod}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </MobileVisualShell>
  )
}

function MobileGovernanceVisual({
  isRevealed,
  accent,
  labels: _labels,
}: {
  isRevealed: boolean
  accent: string
  labels?: any
}) {
  return (
    <MobileVisualShell
      accent={accent}
      label="Website Design"
      badge={
        <motion.div
          initial={{ opacity: 0 }}
          animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 1.0 }}
          className="flex items-center gap-1 rounded-full px-2 py-0.5"
          style={{ backgroundColor: `${accent}1F`, color: accent }}
        >
          <span className="text-[0.6rem] font-semibold tracking-wide">Lighthouse 98</span>
        </motion.div>
      }
    >
      <div className="rounded-md border border-black/[0.06] bg-white p-1.5">
        <div className="flex items-center gap-1 mb-1.5">
          <div className="h-1 w-1 rounded-full bg-red-300/70" />
          <div className="h-1 w-1 rounded-full bg-yellow-300/70" />
          <div className="h-1 w-1 rounded-full bg-green-300/70" />
          <div className="ml-1 flex-1 rounded-sm bg-slate-100 px-1 py-0.5 text-[0.45rem] font-mono text-black/40">
            yoursite.de
          </div>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded p-2"
          style={{ background: `linear-gradient(to bottom right, ${accent}10, transparent 70%)` }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={isRevealed ? { width: "60%" } : { width: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="h-1.5 rounded-full"
            style={{ backgroundColor: accent }}
          />
          <motion.div
            initial={{ width: 0 }}
            animate={isRevealed ? { width: "40%" } : { width: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="mt-1 h-0.5 rounded-full"
            style={{ backgroundColor: `${accent}66` }}
          />
          <motion.div
            initial={{ scale: 0 }}
            animate={isRevealed ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.4, delay: 0.85 }}
            className="mt-1.5 inline-flex h-2.5 w-10 origin-left rounded-sm"
            style={{ backgroundColor: accent }}
          />
        </motion.div>

        {/* Card row */}
        <div className="mt-1.5 grid grid-cols-3 gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
              transition={{ duration: 0.3, delay: 1.0 + i * 0.06 }}
              className="rounded-sm bg-slate-100 p-1"
            >
              <div className="h-2 rounded-sm bg-slate-200" />
              <div className="mt-0.5 h-0.5 w-full rounded-full bg-slate-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </MobileVisualShell>
  )
}

function MobileMLVisual({ isRevealed, accent, labels }: { isRevealed: boolean; accent: string; labels?: any }) {
  const services = [
    { label: "App", x: 0.18 },
    { label: "DB", x: 0.5 },
    { label: "API", x: 0.82 },
  ]
  const cloudX = 0.5

  return (
    <MobileVisualShell
      accent={accent}
      label="Azure Topology"
      badge={
        <motion.div
          initial={{ opacity: 0 }}
          animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, delay: 1.0 }}
          className="flex items-center gap-1 rounded-full px-2 py-0.5"
          style={{ backgroundColor: `${accent}1F`, color: accent }}
        >
          <span className="text-[0.6rem] font-semibold tracking-wide">compliant</span>
        </motion.div>
      }
    >
      <div className="relative aspect-[10/3] w-full">
        <svg viewBox="0 0 100 30" className="absolute inset-0 h-full w-full">
          {services.map((svc, i) => (
            <motion.path
              key={`l-${i}`}
              d={`M ${cloudX * 100} 8 C ${cloudX * 100} 14, ${svc.x * 100} 18, ${svc.x * 100} 22`}
              fill="none"
              stroke={accent}
              strokeOpacity="0.5"
              strokeWidth="0.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={isRevealed ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.1 }}
            />
          ))}
        </svg>

        {/* Azure cloud node (center top) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="absolute left-1/2 top-[8%] -translate-x-1/2 rounded-md px-3 py-1 text-[0.65rem] font-bold tracking-widest text-white"
          style={{ backgroundColor: accent }}
        >
          AZURE
        </motion.div>

        {/* Service pills */}
        {services.map((svc, i) => (
          <motion.div
            key={svc.label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isRevealed ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.4, delay: 0.7 + i * 0.08 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-md border bg-white px-2 py-0.5 text-[0.55rem] font-bold tracking-wider"
            style={{
              left: `${svc.x * 100}%`,
              top: "78%",
              borderColor: `${accent}55`,
              color: accent,
            }}
          >
            {svc.label}
          </motion.div>
        ))}
      </div>

    </MobileVisualShell>
  )
}

const MOBILE_VISUALS = [MobileBIVisual, MobileGovernanceVisual, MobileMLVisual] as const

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
  const t = dict.servicesApps.portfolio
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
  const Icon = ICONS[activeIndex] ?? AppWindow
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
  const t = dict.servicesApps.portfolio
  const activeAccent = STRAND_COLORS[activeIndex] ?? STRAND_COLORS[0]
  return (
    <div className="sticky top-16 flex h-[calc(100vh-4rem)] max-h-[560px] w-full flex-col">
      <div className="flex flex-1 flex-col gap-6 px-5 pb-5 pt-4">
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
  const t = dict.servicesApps.portfolio
  return (
    <div className="flex flex-col gap-6 px-4 sm:px-6">
      {items.map((item, i) => {
        const Icon = ICONS[i] ?? AppWindow
        const accent = STRAND_COLORS[i] ?? STRAND_COLORS[0]
        const Visual = MOBILE_VISUALS[i] ?? MobileBIVisual
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
      className={`group relative inline-flex ${dimensions} items-center justify-center rounded-full bg-[#F703EB] text-white shadow-[0_18px_36px_rgba(247,3,235,0.32)] transition-all duration-300 hover:scale-105 hover:bg-[#C601BC] hover:shadow-[0_22px_48px_rgba(247,3,235,0.45)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F703EB]/30`}
    >
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-[#F703EB]/40"
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
  const Icon = ICONS[index] ?? AppWindow
  const accent = STRAND_COLORS[index]
  const t = dict.servicesApps.portfolio

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
          className="group inline-flex items-center gap-2 text-sm font-medium text-[#F703EB] hover:text-[#C601BC] transition-colors"
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
  const portfolio = dict.servicesApps.portfolio
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
          <span className="section-eyebrow justify-center">{dict.servicesApps.eyebrows?.portfolio}</span>
          <h2 className="font-serif text-[2.2rem] sm:text-[2.4rem] md:text-[3rem] leading-[1.1] tracking-tight text-black">
            {portfolio.title} <span className="text-[#F703EB]">{portfolio.titleHighlight}</span>
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
              const Visual = VISUALS[i] ?? BIVisual
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
