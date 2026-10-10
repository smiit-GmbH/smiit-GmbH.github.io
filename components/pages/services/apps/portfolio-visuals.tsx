"use client"

import { motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"
import { useActiveInView } from "@/hooks/use-active-in-view"
import type { Dictionary } from "@/lib/dictionary"
import { CountUp } from "@/components/pages/services/shared/portfolio/visual-kit"

export type VisualLabels = Dictionary["servicesApps"]["portfolio"]["visuals"]

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
      className={`relative flex flex-col justify-between w-full max-w-[380px] aspect-[5/4] rounded-3xl bg-white border border-gray-100 shadow-[0_18px_44px_rgba(15,23,42,0.10)] p-5 sm:p-6 overflow-hidden ${className}`}
    >
      {children}
    </div>
  )
}

function BIVisual({ isRevealed, labels }: { isRevealed: boolean; labels?: VisualLabels }) {
  const moduleLabels: string[] = labels?.bi?.modules ?? ["Vertrieb", "Lager", "Kunden"]
  const modules = [
    { label: moduleLabels[0], color: "#F703EB", metric: "247" },
    { label: moduleLabels[1], color: "#FA85F4", metric: "1.2k" },
    { label: moduleLabels[2], color: "#94A3B8", metric: "892" },
  ]
  const tabs: string[] = labels?.bi?.tabs ?? ["Übersicht", "Berichte", "Einstellungen"]
  const [ref, inView] = useActiveInView()
  return (
    <VisualShell shellRef={ref}>
      <div className="flex items-baseline justify-between">
        <span className="text-[0.65rem] uppercase tracking-[0.18em] text-black/40 font-medium">
          {labels?.bi?.label ?? "Aktive Nutzer"}
        </span>
        <CountUp to={1247} isRevealed={isRevealed} className="font-serif text-2xl font-semibold text-[#F703EB]" />
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
                i === 0 ? "bg-[#F703EB]/10 text-[#F703EB]" : "bg-white text-black/40"
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
            animate={inView ? { opacity: [1, 0.4, 1] } : { opacity: 1 }}
            transition={{ duration: 1.6, repeat: inView ? Infinity : 0, ease: "easeInOut" }}
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
              animate={isRevealed ? { opacity: inView ? [0.3, 1, 0.3] : 0.3 } : { opacity: 0.3 }}
              transition={{
                duration: 1.6,
                delay: 0.6 + i * 0.2,
                repeat: isRevealed && inView ? Infinity : 0,
                ease: "easeInOut",
              }}
              className="h-1.5 w-1.5 rounded-full bg-emerald-400"
            />
          ))}
          <span className="ml-1 text-[0.65rem] font-mono font-semibold text-emerald-600">3/3</span>
        </div>
      </div>
    </VisualShell>
  )
}

function GovernanceVisual({ isRevealed }: { isRevealed: boolean; labels?: VisualLabels }) {
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

function MLVisual({ isRevealed }: { isRevealed: boolean; labels?: VisualLabels }) {
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

export const VISUALS = [BIVisual, GovernanceVisual, MLVisual] as const
