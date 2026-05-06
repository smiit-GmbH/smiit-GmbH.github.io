"use client"

import { useRef } from "react"
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, Mail } from "lucide-react"
import LocalizedLink from "@/components/localized-link"

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

function MagneticPrimary({ label }: { label: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)
  const x = useSpring(mvX, { stiffness: 240, damping: 18, mass: 0.4 })
  const y = useSpring(mvY, { stiffness: 240, damping: 18, mass: 0.4 })

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const offsetX = e.clientX - (rect.left + rect.width / 2)
    const offsetY = e.clientY - (rect.top + rect.height / 2)
    const max = 8
    mvX.set(Math.max(-max, Math.min(max, offsetX * 0.3)))
    mvY.set(Math.max(-max, Math.min(max, offsetY * 0.3)))
  }

  const handleLeave = () => {
    mvX.set(0)
    mvY.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href="#book"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={shouldReduceMotion ? undefined : { x, y }}
      className="inline-block"
    >
      <Button
        variant="outline"
        className="rounded-xl px-6 py-6 text-sm text-black bg-white hover:bg-white/90 hover:text-black cursor-pointer border-transparent"
      >
        {label}
        <ChevronRight className="ml-1.5 h-4 w-4" />
      </Button>
    </motion.a>
  )
}

function DarkBackdrop() {
  return (
    <>
      {/* Slow drifting glow — same recipe as manifest-band */}
      <div
        aria-hidden
        className="manifest-glow pointer-events-none absolute left-1/2 top-1/2 z-0 h-[110%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(33,86,156,0.45),_transparent_60%)] blur-3xl"
      />
      {/* Subtle grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
    </>
  )
}

export default function AppsCTA({ dict }: { dict: any }) {
  const cta = dict.servicesAnalytics.cta

  return (
    <section className="relative pb-10 md:pb-14 bg-transparent">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop CTA – dark band, mirrors manifest-band visual language */}
        <motion.div
          data-header-tone="dark"
          className="relative rounded-[1.5rem] overflow-hidden hidden lg:flex flex-col items-center justify-center text-center px-6 py-32 bg-[#0B162D] text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          <DarkBackdrop />

          <motion.h2
            className="relative z-10 font-serif text-[3.2rem] leading-[1.12] tracking-tight text-white whitespace-pre-line max-w-[28ch]"
            variants={fadeUpVariants}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {cta.title}
          </motion.h2>
          <motion.p
            className="relative z-10 mt-4 text-md text-white/70 max-w-[58ch]"
            variants={fadeUpVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {cta.subtitle}
          </motion.p>
          <motion.div
            className="relative z-10 mt-8 flex items-center justify-center gap-4"
            variants={fadeUpVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <LocalizedLink href="/contact">
              <Button
                variant="outline"
                className="rounded-xl px-6 py-6 text-sm text-white bg-transparent hover:bg-white/10 hover:text-white border-white/25 cursor-pointer"
              >
                <Mail className="mr-2 h-4 w-4" />
                {cta.secondaryButton}
              </Button>
            </LocalizedLink>
            <MagneticPrimary label={cta.primaryButton} />
          </motion.div>
        </motion.div>

        {/* Mobile CTA – dark band */}
        <motion.div
          data-header-tone="dark"
          className="relative lg:hidden rounded-[1.5rem] overflow-hidden flex flex-col items-center justify-center text-center px-5 py-20 sm:py-24 bg-[#0B162D] text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          <DarkBackdrop />

          <motion.h2
            className="relative z-10 font-serif text-[1.8rem] sm:text-[2.2rem] leading-[1.15] tracking-tight text-white whitespace-pre-line"
            variants={fadeUpVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {cta.title}
          </motion.h2>
          <motion.p
            className="relative z-10 mt-3 sm:mt-4 text-[0.9rem] sm:text-base leading-relaxed text-white/70 max-w-[44ch]"
            variants={fadeUpVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {cta.subtitle}
          </motion.p>
          <motion.div
            className="relative z-10 mt-8 flex flex-col w-full sm:w-auto sm:flex-row gap-3 sm:gap-4"
            variants={fadeUpVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <LocalizedLink href="/contact" className="block w-full sm:w-auto">
              <motion.div
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 420, damping: 26 }}
              >
                <Button
                  variant="outline"
                  className="w-full rounded-xl px-6 py-6 text-sm font-medium border border-white/25 bg-transparent text-white hover:bg-white/10 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  {/* One-shot greet wiggle on the mail icon when the row enters viewport */}
                  <motion.span
                    initial={{ rotate: 0 }}
                    whileInView={{ rotate: [0, -8, 6, -3, 0] }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    style={{ display: "inline-flex", transformOrigin: "60% 60%" }}
                    className="mr-2"
                  >
                    <Mail className="h-4 w-4" />
                  </motion.span>
                  {cta.secondaryButton}
                </Button>
              </motion.div>
            </LocalizedLink>
            <a href="#book" className="block w-full sm:w-auto">
              <motion.div
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 420, damping: 26 }}
                className="relative w-full overflow-hidden rounded-xl"
              >
                <Button
                  variant="outline"
                  className="w-full rounded-xl px-6 py-6 text-sm font-medium border-transparent bg-white text-black hover:bg-white/90 hover:text-black transition-all duration-300 cursor-pointer"
                >
                  {cta.primaryButton}
                  <ChevronRight className="ml-1.5 h-4 w-4" />
                </Button>
                {/* Diagonal light-sweep on first reveal — runs once, signals
                    "this is the action button" without any user interaction. */}
                <motion.span
                  aria-hidden
                  initial={{ x: "-110%" }}
                  whileInView={{ x: "120%" }}
                  viewport={{ once: true, margin: "-20px" }}
                  transition={{ duration: 0.95, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-none absolute inset-y-0 -inset-x-2 -skew-x-12 bg-gradient-to-r from-transparent via-[#21569c]/22 to-transparent mix-blend-multiply"
                />
              </motion.div>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
