"use client"

import { useRef } from "react"
import Link from "next/link"
import { cubicBezier, motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import type { Locale, Dictionary } from "@/lib/dictionary"
import { BeforeAfterSlider } from "./hero/before-after-slider"
import { cx, MagneticCta } from "@/components/pages/services/shared/hero-kit"

interface HeroSectionProps {
  lang: Locale
  dict: Dictionary
}

// ---------- Hero Packages (pill chips) ----------

function HeroPackages({
  hero,
  align = "left",
}: {
  hero: Dictionary["servicesWebsite"]["hero"]
  align?: "left" | "center"
}) {
  const packages = (hero?.packages ?? []) as string[]
  if (packages.length === 0) return null

  return (
    <div className={cx("mt-5", align === "center" && "mx-auto max-w-[640px]")}>
      {hero?.packagesLabel && (
        <p
          className={cx(
            "text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[#F703EB]",
            align === "center" && "text-center",
          )}
        >
          {hero.packagesLabel}
        </p>
      )}
      <ul className={cx("mt-2.5 flex flex-wrap gap-2", align === "center" ? "justify-center" : "justify-start")}>
        {packages.map((item, idx) => (
          <li
            key={item}
            className={cx(
              "rounded-full border border-[#F703EB]/15 bg-[#F703EB]/[0.06] px-3 py-1.5 text-[0.76rem] font-medium leading-tight text-[#15151a]/78",
              idx >= 3 && "hidden sm:block",
            )}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ---------- CTA Row (primary Calendly + secondary #process) ----------

function CtaRow({
  hero,
  align,
  magnetic,
}: {
  hero: Dictionary["servicesWebsite"]["hero"]
  align: "left" | "center"
  magnetic: boolean
}) {
  const primaryClass =
    "group inline-flex items-center justify-center rounded-lg bg-[#F703EB] px-5 py-3 text-[0.88rem] font-medium text-white shadow-[0_14px_28px_rgba(247,3,235,0.20)] transition-colors duration-300 hover:bg-[#D802CD]"

  return (
    <div className={cx("flex flex-wrap items-center gap-3", align === "center" ? "justify-center" : "justify-start")}>
      {magnetic ? (
        <MagneticCta href="#book" className={primaryClass}>
          {hero.primaryCta}
          <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </MagneticCta>
      ) : (
        <Link href="#book" className={primaryClass}>
          {hero.primaryCta}
          <ArrowRight className="ml-1.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      )}
      <a
        href="#process"
        className="hidden sm:inline-flex items-center justify-center rounded-lg border border-[rgba(21,21,26,0.12)] bg-white px-5 py-3 text-[0.88rem] font-medium text-[#15151a] transition-colors duration-300 hover:border-[#15151a]"
      >
        {hero.secondaryCta}
      </a>
    </div>
  )
}

// ---------- Main Hero ----------

const frameChildVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

// Cinematic, staggered entrance for the hero copy
const heroTextContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const heroTextItem = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function HeroSection({ dict }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null)
  const shouldReduceMotion = useReducedMotion()

  // Toggle the scroll-driven frame growth. Flip to true to restore the cinematic morph.
  const SCROLL_ANIMATIONS_ENABLED = false

  const hero = dict.servicesWebsite.hero
  const eyebrow = dict.servicesWebsite.eyebrows.hero

  // ── Scroll-driven motion (kept for one-line restore) ─────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })
  const easeOutCubic = cubicBezier(0.33, 1, 0.68, 1)
  const heroTextOpacity = useTransform(scrollYProgress, [0.04, 0.14], [1, 0])
  const heroTextY = useTransform(scrollYProgress, [0.04, 0.14], [0, -36])
  const frameWidth = useTransform(scrollYProgress, [0.05, 0.32], ["620px", "880px"], { ease: easeOutCubic })
  const frameHeight = useTransform(scrollYProgress, [0.05, 0.32], ["540px", "620px"], { ease: easeOutCubic })
  const frameX = useTransform(scrollYProgress, [0.05, 0.32], ["20vw", "0vw"], { ease: easeOutCubic })
  const frameScale = useTransform(scrollYProgress, [0.05, 0.3], [0.94, 1], { ease: easeOutCubic })
  const frameZ = useTransform(scrollYProgress, [0.05, 0.3], [-160, 0], { ease: easeOutCubic })

  const useStaticIdleLayout = !SCROLL_ANIMATIONS_ENABLED

  const heroTextStyle = shouldReduceMotion
    ? { opacity: 1, y: 0 }
    : useStaticIdleLayout
      ? { opacity: 1, y: 0 }
      : { opacity: heroTextOpacity, y: heroTextY }
  const frameWrapperStyle = shouldReduceMotion ? { x: "20vw" } : useStaticIdleLayout ? { x: "20vw" } : { x: frameX }
  // NOTE: the idle frame renders at its final size with NO scale/z/perspective.
  // A 3D transform (z + perspective) or sub-1 scale would rasterise the frame as a
  // GPU layer and downscale the texture — which smears the tiny cqw text inside the
  // before/after mockups. Keeping transform-free renders the text pixel-crisp.
  const frameStyle = shouldReduceMotion
    ? { width: "600px", height: "520px", maxWidth: "calc(100vw - 96px)" }
    : useStaticIdleLayout
      ? { width: "600px", height: "520px", maxWidth: "calc(100vw - 96px)" }
      : {
          width: frameWidth,
          height: frameHeight,
          scale: frameScale,
          z: frameZ,
          transformPerspective: 2000,
          maxWidth: "calc(100vw - 96px)",
        }

  return (
    <>
      {/* MOBILE / TABLET — < lg (1024px). Stacked layout with the slider as preview. */}
      <section className="relative overflow-hidden lg:hidden">
        {/* Background glows */}
        <div
          aria-hidden
          className="pointer-events-none absolute -z-10 right-[-12%] top-[8%] h-[420px] w-[560px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(247,3,235,0.12),_transparent_62%)] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -z-10 left-[-18%] top-[55%] h-[380px] w-[520px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(247,3,235,0.08),_transparent_62%)] blur-3xl"
        />

        <div className="mx-auto max-w-[760px] px-5 pt-16 pb-12 sm:px-6 sm:pt-20 sm:pb-16 md:max-w-[920px] md:px-8 md:pt-24 md:pb-20">
          {/* Hero text — cinematic staggered reveal */}
          <motion.div
            initial={shouldReduceMotion ? false : "hidden"}
            animate={shouldReduceMotion ? undefined : "visible"}
            variants={heroTextContainer}
            className="text-center"
          >
            <motion.span variants={heroTextItem} className="section-eyebrow">
              {eyebrow}
            </motion.span>
            <motion.h1
              variants={heroTextItem}
              className="mx-auto mt-3 max-w-[20ch] font-serif text-[2.05rem] leading-[1.05] tracking-tight text-[#15151a] sm:text-[2.5rem] md:text-[3rem]"
            >
              {hero.title} <em className="not-italic text-[#F703EB]">{hero.titleHighlight}</em>
            </motion.h1>
            <motion.p
              variants={heroTextItem}
              className="mx-auto mt-4 max-w-[58ch] text-[0.95rem] leading-relaxed text-[#50505c] sm:text-[1rem] md:mt-5 md:text-[1.05rem]"
            >
              {hero.description}
            </motion.p>
            <motion.div variants={heroTextItem}>
              <HeroPackages hero={hero} align="center" />
            </motion.div>
            <motion.div variants={heroTextItem} className="mt-6 sm:mt-7">
              <CtaRow hero={hero} align="center" magnetic={false} />
            </motion.div>
          </motion.div>

          {/* Slider — the hero moment */}
          <div className="relative mt-12 sm:mt-16">
            {/* Ambient glow behind the slider */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[110%] w-[108%] -translate-x-1/2 -translate-y-1/2 rounded-[48px] bg-[radial-gradient(ellipse_at_center,rgba(247,3,235,0.11),transparent_70%)] blur-2xl"
            />
            <motion.div
              initial={shouldReduceMotion ? false : "hidden"}
              whileInView={shouldReduceMotion ? undefined : "visible"}
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.97 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.16, delayChildren: 0.2 },
                },
              }}
              className="relative mx-auto w-full max-w-[540px] overflow-hidden rounded-[22px] border border-white/70 bg-white/92 p-3 shadow-[0_24px_60px_-28px_rgba(247,3,235,0.13),0_8px_24px_rgba(15,23,42,0.06)] backdrop-blur-2xl md:rounded-[28px]"
            >
              {/* Subtle top sheen */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
              />
              <motion.div variants={frameChildVariants}>
                <BeforeAfterSlider
                  beforeLabel={hero.beforeLabel}
                  afterLabel={hero.afterLabel}
                  sliderHint={hero.sliderHint}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DESKTOP — >= lg (pinned hero) */}
      <section
        ref={containerRef}
        className={cx("relative hidden lg:block", SCROLL_ANIMATIONS_ENABLED ? "lg:h-[420vh]" : "lg:h-screen")}
      >
        <div className="sticky top-0 h-[100dvh] overflow-hidden">
          {/* Background glow — right side, behind the frame */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-[5%] top-1/2 -z-10 h-[480px] w-[680px] -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(247,3,235,0.10),_transparent_62%)] blur-2xl"
          />

          {/* HERO TEXT — left column */}
          <motion.div style={heroTextStyle} className="pointer-events-none absolute inset-0 z-10 flex items-center">
            <div className="mx-auto w-full max-w-[1380px] px-10">
              <div className="grid grid-cols-[1fr_1.25fr] items-center gap-10">
                <div className="pointer-events-auto text-left">
                  <span className="section-eyebrow">{eyebrow}</span>

                  <div
                    role="presentation"
                    aria-hidden="true"
                    className="mx-0 mt-2 max-w-[16ch] font-serif text-[2.8rem] leading-[1.05] text-[#15151a] xl:text-[3.2rem] 2xl:text-[3.6rem]"
                  >
                    {hero.title} <em className="not-italic text-[#F703EB]">{hero.titleHighlight}</em>
                  </div>

                  <p className="mx-0 mt-5 max-w-[52ch] text-[0.98rem] leading-relaxed text-[#50505c] xl:text-[1.05rem]">
                    {hero.description}
                  </p>

                  <HeroPackages hero={hero} />

                  <div className="mt-9">
                    <CtaRow hero={hero} align="left" magnetic />
                  </div>
                </div>
                <div />
              </div>
            </div>
          </motion.div>

          {/* SINGLE FLOATING FRAME — holds the before/after slider */}
          <motion.div
            style={frameWrapperStyle}
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
          >
            <motion.div
              style={frameStyle}
              className="pointer-events-auto relative overflow-hidden rounded-[28px] border border-white/70 bg-white/84 p-3 shadow-[0_34px_100px_rgba(15,23,42,0.12)] backdrop-blur-2xl"
            >
              {/* Top sheen */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent"
              />
              <BeforeAfterSlider
                beforeLabel={hero.beforeLabel}
                afterLabel={hero.afterLabel}
                sliderHint={hero.sliderHint}
                fill
              />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export { LogoStrip } from "./hero/logo-strip"
