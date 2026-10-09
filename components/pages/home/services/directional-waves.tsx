"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function DirectionalWaves({
  id,
  center,
  target,
  pulseToken,
  delayMs = 0,
}: {
  id: string
  center: { x: number; y: number }
  target: { x: number; y: number }
  pulseToken: number | null
  delayMs?: number
}) {
  const [instances, setInstances] = useState<number[]>([])

  useEffect(() => {
    if (pulseToken === null) return
    // eslint-disable-next-line react-hooks/set-state-in-effect -- each new pulse token from the parent is an event: append a ring instance and schedule its removal below
    setInstances((prev) => {
      const next = [...prev, pulseToken]
      if (next.length > 2) next.shift()
      return next
    })

    const t = setTimeout(() => {
      setInstances((prev) => prev.filter((x) => x !== pulseToken))
    }, 2500)

    return () => clearTimeout(t)
  }, [pulseToken])

  if (instances.length === 0) return null

  const dx = target.x - center.x
  const dy = target.y - center.y
  const dist = Math.sqrt(dx * dx + dy * dy)

  const corridor = Math.max(54, Math.min(120, dist * 0.14))

  const ringCommon = {
    initial: { r: 0, opacity: 0 },
    animate: {
      r: [0, dist * 1.03] as number[],
      opacity: [0, 0.85, 0.5, 0] as number[],
    },
    transition: { duration: 1.5, ease: "easeOut" as const, delay: delayMs / 1000 },
  }

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
    >
      <defs>
        <mask id={`${id}-mask`}>
          <rect width="100%" height="100%" fill="black" />
          <line
            x1={center.x}
            y1={center.y}
            x2={target.x}
            y2={target.y}
            stroke="white"
            strokeWidth={corridor}
            strokeLinecap="round"
          />
        </mask>

        <linearGradient
          id={`${id}-grad`}
          gradientUnits="userSpaceOnUse"
          x1={center.x}
          y1={center.y}
          x2={target.x}
          y2={target.y}
        >
          <stop offset="0%" stopColor="rgba(176, 101, 246, 0.75)" />
          <stop offset="55%" stopColor="rgba(116, 71, 189, 0.65)" />
          <stop offset="100%" stopColor="rgba(25, 28, 201, 0.55)" />
        </linearGradient>
      </defs>

      {instances.map((token, index) => (
        <g key={`${id}-${token}-${index}`}>
          <g mask={`url(#${id}-mask)`}>
            <motion.circle
              cx={center.x}
              cy={center.y}
              fill="none"
              stroke={`url(#${id}-grad)`}
              strokeWidth="2"
              strokeLinecap="round"
              {...ringCommon}
            />
            <motion.circle
              cx={center.x}
              cy={center.y}
              fill="none"
              stroke={`url(#${id}-grad)`}
              strokeWidth="1.5"
              strokeLinecap="round"
              {...ringCommon}
              transition={{
                ...ringCommon.transition,
                delay: (delayMs + 250) / 1000,
              }}
            />
            <motion.circle
              cx={center.x}
              cy={center.y}
              fill="none"
              stroke={`url(#${id}-grad)`}
              strokeWidth="1"
              strokeLinecap="round"
              {...ringCommon}
              transition={{
                ...ringCommon.transition,
                delay: (delayMs + 500) / 1000,
              }}
            />
          </g>

          <motion.circle
            cx={target.x}
            cy={target.y}
            r={4}
            fill="none"
            stroke="rgba(168,85,247,0.3)"
            strokeWidth="1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.7, 0.3, 0], scale: [0.8, 1.15, 1.0, 0.95] }}
            transition={{ duration: 1.0, ease: "easeOut", delay: delayMs / 1000 }}
          />
        </g>
      ))}
    </svg>
  )
}
