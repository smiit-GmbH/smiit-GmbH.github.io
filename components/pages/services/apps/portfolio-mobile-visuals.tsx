"use client"

import { motion } from "framer-motion"
import { CountUp, MobileVisualShell } from "@/components/pages/services/shared/portfolio/visual-kit"
import type { VisualLabels } from "./portfolio-visuals"

function MobileBIVisual({
  isRevealed,
  accent,
  labels,
}: {
  isRevealed: boolean
  accent: string
  labels?: VisualLabels
}) {
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
          <CountUp to={1247} isRevealed={isRevealed} className="font-serif text-[1.85rem] font-semibold leading-none" />
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
}: {
  isRevealed: boolean
  accent: string
  labels?: VisualLabels
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

function MobileMLVisual({ isRevealed, accent }: { isRevealed: boolean; accent: string; labels?: VisualLabels }) {
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

export const MOBILE_VISUALS = [MobileBIVisual, MobileGovernanceVisual, MobileMLVisual] as const
