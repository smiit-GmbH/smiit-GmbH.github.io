"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import Footer from "@/components/footer"
import Header from "@/components/header"
import { IntroOverlay } from "@/components/custom/IntroOverlay"

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [videoFailed, setVideoFailed] = useState(false)
  const [introVisible, setIntroVisible] = useState(true)
  const [contentVisible, setContentVisible] = useState(false)

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
      <motion.main
        initial={false}
        animate={contentVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: contentVisible ? "auto" : "none" }}
        aria-hidden={!contentVisible}
      >
        <Header />
        <section className="relative isolate h-[105vh] overflow-hidden rounded-b-[1.75rem]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/hero.png"
              alt=""
              fill
              priority
              sizes="100vw"
              aria-hidden="true"
              className={`h-full w-full object-cover transition-opacity duration-300 ${
                videoFailed ? "opacity-100" : "opacity-0"
              }`}
            />
            <video
              ref={videoRef}
              className={`h-full w-full object-cover transition-opacity duration-300 ${
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

          <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true" />

          <div className="relative z-20 min-h-screen flex items-start pt-36 md:pt-42 pb-16">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div className="lg:col-span-8">
                  <h1 className="font-serif text-2xl sm:text-3xl md:text-[2.75rem] lg:text-[3.5rem] xl:text-[4.0rem] leading-[1.06] text-black tracking-tight">
                    Datengesteuerte Trans-formation, maßgeschneidert für den Mittelstand
                  </h1>

                  <p className="mt-7 text-lg sm:text-lg md:text-[1.275rem] text-black/70 max-w-xl leading-relaxed">
                    Digitale Lösungen für Automatisierung, Datenanalyse und Unternehmensberatung
                  </p>

                  <Link href="/kontakt" scroll={false} className="inline-block mt-12">
                    <button className="group flex items-center gap-3 bg-white/25 hover:bg-white/45 border border-black/20 text-black px-7 py-3.5 rounded-xl font-medium text-base transition-all duration-300 backdrop-blur-sm cursor-pointer">
                      Starten Sie Ihre Transformation
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>

                <div className="hidden lg:block lg:col-span-4" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </motion.main>

      {introVisible && (
        <IntroOverlay
          onExitStart={() => setContentVisible(true)}
          onDone={() => setIntroVisible(false)}
        />
      )}
    </>
  )
}
