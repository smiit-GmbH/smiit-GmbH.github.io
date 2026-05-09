"use client"

import { useRef, useState, useEffect, useCallback, useMemo } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { ArrowRight, CheckCircle2, MapPin, Search, ZoomOut } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import type { Locale } from "@/lib/dictionary"
import { useScroll, useMotionValueEvent } from "framer-motion"

if (typeof window !== "undefined") {
  void import("@/components/pages/about/globe")
  void import("react-globe.gl")
  void fetch("/data/world.geojson", { priority: "low" } as RequestInit).catch(() => {})
}

function GlobePlaceholder() {
  return <Spinner size={40} aria-label="Lade interaktiven Globus" />
}

const Globe = dynamic(
  () => import("@/components/pages/about/globe").then((m) => m.Globe),
  { ssr: false, loading: () => <GlobePlaceholder /> },
)

export function HeroSection({
  lang,
  dict,
}: {
  lang: Locale
  dict: any
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [isDesktop, setIsDesktop] = useState(true)
  const [isMobileZoomedIn, setIsMobileZoomedIn] = useState(false)
  const progressRafRef = useRef<number | null>(null)
  const latestDesktopProgressRef = useRef(0)
  const committedDesktopProgressRef = useRef(0)

  const commitDesktopProgress = useCallback((value: number) => {
    const quantized = Math.round(Math.max(0, Math.min(1, value)) * 24) / 24
    if (quantized === committedDesktopProgressRef.current) return

    committedDesktopProgressRef.current = quantized
    setProgress(quantized)
  }, [])

  const desktopBadgeOpacity = useMemo(() => {
    if (progress <= 0.3) return 0

    const raw = Math.min(1, (progress - 0.3) * 3)
    return Math.round(raw * 8) / 8
  }, [progress])

  useEffect(() => {
    let resizeTimeout: number | null = null

    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024)
    const handleResize = () => {
      if (resizeTimeout !== null) {
        window.clearTimeout(resizeTimeout)
      }

      resizeTimeout = window.setTimeout(() => {
        resizeTimeout = null
        checkDesktop()
      }, 120)
    }

    checkDesktop()

    window.addEventListener('resize', handleResize)
    return () => {
      if (resizeTimeout !== null) {
        window.clearTimeout(resizeTimeout)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!isDesktop) return

    latestDesktopProgressRef.current = latest
    if (progressRafRef.current !== null) return

    progressRafRef.current = window.requestAnimationFrame(() => {
      progressRafRef.current = null
      commitDesktopProgress(latestDesktopProgressRef.current)
    })
  })

  useEffect(() => {
    if (!isDesktop) {
      setProgress(isMobileZoomedIn ? 1 : 0)
    }
  }, [isDesktop, isMobileZoomedIn])

  useEffect(() => {
    if (!isDesktop) {
      committedDesktopProgressRef.current = isMobileZoomedIn ? 1 : 0
      return
    }

    commitDesktopProgress(scrollYProgress.get())
  }, [commitDesktopProgress, isDesktop, scrollYProgress])

  useEffect(() => {
    return () => {
      if (progressRafRef.current !== null) {
        window.cancelAnimationFrame(progressRafRef.current)
      }
    }
  }, [])

  const a = dict.aboutPage

  return (
    <section ref={containerRef} className="relative overflow-x-clip lg:h-[200vh]">
      <div className="lg:sticky lg:top-0 lg:h-[100dvh] flex items-start lg:items-center pt-28 sm:pt-32 lg:pt-24 pb-12 lg:pb-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid gap-6 sm:gap-10 lg:gap-16 xl:gap-20 lg:grid-cols-2 items-center">
            
            {/* Left Column: Text Content */}
            <div className="min-w-0 flex flex-col space-y-6 lg:space-y-10 z-10">
              <div className="flex flex-col items-start w-full">
                <h1 className="font-serif text-[2rem] sm:text-[3.15rem] lg:text-[3rem] xl:text-[3.4rem] leading-tight text-black">
                  {a.titlePrefix}
                  <span className="text-[#21569c] inline-block relative isolate z-0 mx-1.5 sm:mx-2">
                    {a.titleHighlight}
                    <svg
                      className="pointer-events-none absolute w-full h-2 sm:h-3 -bottom-0.5 sm:-bottom-1 left-0 text-[#21569c]/45 z-[-1]"
                      viewBox="0 0 100 10"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 5 Q 50 10 100 5"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                  </span>
                  {a.titleSuffix}
                </h1>

                <p className="mt-4 lg:mt-6 text-sm sm:text-base lg:text-lg text-black/75 max-w-[50ch] leading-relaxed">
                  {a.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <Link
                  href={`/${lang}/about/#book`}
                  className="inline-flex items-center justify-center px-5 py-3 sm:px-6 sm:py-3.5 text-sm sm:text-base font-medium text-white bg-[#21569c] hover:bg-[#21569c]/85 rounded-xl transition-colors duration-200"
                >
                  {a.primaryButton}
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
                {/* <Link
                  href={`/${lang}/services/`}
                  className="inline-flex items-center justify-center px-5 py-3 sm:px-6 sm:py-3.5 text-sm sm:text-base font-medium text-[#0B162D] bg-white hover:bg-white/65 border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors duration-200 shadow-sm"
                >
                  {a.secondaryButton}
                </Link> */}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 pt-4 sm:pt-6 border-t border-gray-100">
                {a.features.map((feature: string, index: number) => (
                  <div key={index} className="flex items-center text-sm font-medium text-[#4B5563]">
                    <CheckCircle2 className="h-5 w-5 text-[#21569c] mr-2 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="min-w-0 flex flex-col items-center w-full mt-4 lg:mt-0">
              <div className="relative h-[400px] sm:h-[500px] lg:h-[700px] w-full flex items-center justify-center">
                {isDesktop && (
                  <div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#21569c] bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm transition-opacity duration-500 pointer-events-none"
                    style={{ opacity: desktopBadgeOpacity }}
                  >
                    <MapPin className="h-4 w-4" />
                    {a.ourClients}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#16aea3]/5 to-transparent rounded-full blur-3xl -z-10 transform scale-110" />
                <Globe progress={progress} />
              </div>
              
              {!isDesktop && (
                <button
                  onClick={() => setIsMobileZoomedIn(!isMobileZoomedIn)}
                  className="mt-6 inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-[#0B162D] bg-white/80 backdrop-blur-sm border border-gray-200 hover:bg-gray-50 rounded-full transition-all duration-200 shadow-sm"
                >
                  {isMobileZoomedIn ? (
                    <>
                      <ZoomOut className="mr-2 h-4 w-4 text-[#21569c]" />
                      {a.overview}
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4 text-[#21569c]" />
                      {a.ourClients}
                    </>
                  )}
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
