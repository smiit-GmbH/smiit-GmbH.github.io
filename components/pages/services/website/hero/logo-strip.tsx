"use client"

import { motion, useReducedMotion } from "framer-motion"

// ---------- Logo Strip ----------

export function LogoStrip({ label, names }: { label: string; names: string[] }) {
  const doubled = [...names, ...names]
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="py-5 sm:py-[30px] border-y border-[rgba(21,21,26,0.06)] overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[0.8rem] text-[#8a8a96] tracking-[0.1em] mb-4 sm:mb-6 uppercase font-semibold">
          {label}
        </p>
      </div>
      <div
        className="relative overflow-hidden"
        style={{
          WebkitMaskImage: "linear-gradient(90deg,transparent,#000 9%,#000 91%,transparent)",
          maskImage: "linear-gradient(90deg,transparent,#000 9%,#000 91%,transparent)",
        }}
      >
        <motion.div
          className="flex w-max items-center gap-[clamp(28px,4vw,56px)]"
          animate={shouldReduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {doubled.map((name, i) => (
            <span key={i} className="flex items-center gap-[clamp(14px,2vw,28px)] whitespace-nowrap">
              <span className="font-bold text-[clamp(1.05rem,1.5vw,1.35rem)] tracking-[-0.01em] text-[#15151a] opacity-55">
                {name}
              </span>
              {i < doubled.length - 1 && (
                <span className="inline-block h-[6px] w-[6px] shrink-0 rounded-full bg-[#F703EB] opacity-50" />
              )}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
