"use client"

import Image from "next/image"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { useEffect, useRef, useState } from "react"

interface AboutProps {
  dict: any
}

export default function About({ dict }: AboutProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [play, setPlay] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return

    // optional: reduced motion respektieren
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    if (reduce) {
      setPlay(true) // oder false – je nachdem ob du dann statisch zeigen willst
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setPlay(true) // startet 1x
      },
      { threshold: 0.35 }
    )

    obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative pt-12 pb-0 md:pt-20 md:pb-8">
      <div className="max-w-[1400px] mx-auto px-0 sm:px-6 lg:px-8">
        <div
          className={[
            "relative overflow-hidden",
            "rounded-[1.75rem]",
            "border-none sm:border sm:border-black/10",
            "min-h-[600px] sm:min-h-[705px] md:min-h-[610px] lg:min-h-[690px]",
          ].join(" ")}
        >
          {/* Background image */}
          <Image
            src="/assets/home/about_mobile.png"
            alt=""
            fill
            sizes="100vw"
            aria-hidden="true"
            className="object-cover object-bottom scale-[1.12] md:hidden"
            priority={false}
          />
          <Image
            src="/assets/home/about.png"
            alt=""
            fill
            sizes="(min-width: 768px) 1200px, 100vw"
            aria-hidden="true"
            className="hidden md:block object-cover object-top"
            priority={false}
          />

          {/* Text overlay */}
          <div className="relative z-10 h-full flex flex-col items-center justify-start text-center px-3 md:px-10 pt-16 sm:pt-14 md:pt-12 lg:pt-16">
            <h2 className="font-serif text-[2.05rem] sm:text-[2.6rem] md:text-[3.0rem] leading-[1.19] sm:leading-[1.08] text-black tracking-tight max-w-[22ch] sm:max-w-[30ch] whitespace-normal sm:whitespace-pre-line text-balance">
              {dict.about.title}
            </h2>
            <p className="mt-4 md:mt-5 text-[0.87rem] sm:text-xs md:text-[0.88rem] leading-[1.89] sm:leading-relaxed text-black/80 max-w-[40ch] sm:max-w-[52ch] whitespace-normal sm:whitespace-pre-line text-pretty">
              {dict.about.text}
            </p>
          </div>

          <div
            className={[
              "md:hidden",
              "pointer-events-none",
              "absolute left-[38%] sm:left-[37%] -translate-x-1/2",
              "top-[300px] sm:top-[340px]",
              "z-20",
              "w-[80px] h-[80px]",
            ].join(" ")}
            aria-hidden="true"
          >
            {play && (
              <DotLottieReact
                src="/assets/lottie/satelite.lottie"
                autoplay
                loop
                speed={3}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
