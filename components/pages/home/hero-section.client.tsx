"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { IntroOverlay } from "@/components/custom/IntroOverlay"
import type { Locale } from "@/lib/dictionary"

interface HeroSectionClientProps {
  lang: Locale
  dict: any
}

export default function HeroSectionClient({ lang, dict }: HeroSectionClientProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [videoFailed, setVideoFailed] = useState(false)
  const [introVisible, setIntroVisible] = useState(true)
  const [contentVisible, setContentVisible] = useState(false)

  const handleIntroExitStart = useCallback(() => setContentVisible(true), [])
  const handleIntroDone = useCallback(() => setIntroVisible(false), [])

  useEffect(() => {
    const el = videoRef.current
    if (!el) return

    const maybePromise = el.play()
    if (maybePromise && typeof (maybePromise as Promise<void>).catch === "function") {
      ;(maybePromise as Promise<void>).catch(() => setVideoFailed(true))
    }
  }, [])

  return (
    <>
      <motion.section
        initial={false}
        animate={contentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: contentVisible ? "auto" : "none" }}
        aria-hidden={!contentVisible}
      >
        <section className="relative isolate h-[95vh] md:h-[105vh] overflow-hidden rounded-b-[1.75rem]">
          <div className="absolute inset-0 z-0">
            {/* Mobile hero */}
            <Image
              src="/assets/hero_mobile.png"
              alt=""
              fill
              priority
              sizes="100vw"
              aria-hidden="true"
              className="h-full w-full object-cover md:hidden"
            />

            {/* Desktop fallback image */}
            <Image
              src="/assets/hero.png"
              alt=""
              fill
              priority
              sizes="100vw"
              aria-hidden="true"
              className={`hidden md:block h-full w-full object-cover transition-opacity duration-300 ${
                videoFailed ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Desktop video */}
            <video
              ref={videoRef}
              className={`hidden md:block h-full w-full object-cover transition-opacity duration-300 ${
                videoFailed ? "opacity-0" : "opacity-100"
              }`}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/assets/hero.png"
              onError={() => setVideoFailed(true)}
            >
              <source src="/assets/videos/hero.mp4" type="video/mp4" />
            </video>
          </div>

          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-[0.18] bg-black/10"
            style={{
              backgroundImage: "url(/assets/grain.png)",
              backgroundRepeat: "repeat",
              backgroundSize: "150px 150px",
              mixBlendMode: "soft-light",
            }}
          />

          <div className="relative z-20 min-h-screen flex flex-col items-center text-center pt-20 sm:pt-28 pb-24 md:pb-16 md:items-start md:text-left md:pt-36">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid lg:grid-cols-14 gap-10 lg:gap-16 items-center">
                <div className="lg:col-span-8">
                  <h1 className="font-serif text-[2.8rem] sm:text-[2.75rem] md:text-[2.75rem] lg:text-[3.5rem] xl:text-[4.0rem] leading-[1.04] text-black tracking-tight max-w-[18ch] md:max-w-none mx-auto md:mx-0">
                    {dict.hero.title}
                  </h1>

                  <p className="mt-10 md:mt-7 text-base sm:text-lg md:text-[1.275rem] text-black/80 max-w-[42ch] md:max-w-xl leading-relaxed mx-auto md:mx-0">
                    {dict.hero.subtitle}
                  </p>

                  <Link href={`/${lang}/contact`} scroll={false} className="hidden md:inline-block mt-12">
                    <button className="group flex items-center gap-3 bg-white/25 hover:bg-white/85 border border-black/20 text-black px-7 py-3.5 rounded-xl font-medium text-base transition-all duration-300 backdrop-blur-sm cursor-pointer">
                      {dict.hero.cta}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>

                <div className="hidden lg:block lg:col-span-4" aria-hidden="true" />
              </div>
            </div>

             {/* Mobile CTA */}
             <div className="md:hidden absolute left-4 right-4 bottom-14 sm:bottom-6">
               <Link href={`/${lang}/contact`} scroll={false} className="block">
                <button className="w-full flex items-center justify-center gap-3 bg-white/80 hover:bg-white/90 border border-black/10 text-black text-center px-5 py-3 rounded-2xl font-semibold text-sm transition-colors backdrop-blur-md cursor-pointer">
                   {dict.hero.cta}
                   <ArrowRight className="w-5 h-5" />
                 </button>
               </Link>
              </div>
           </div>
         </section>

      </motion.section>

      {introVisible && (
        <IntroOverlay
          onExitStart={handleIntroExitStart}
          onDone={handleIntroDone}
        />
      )}
    </>
  )
}
