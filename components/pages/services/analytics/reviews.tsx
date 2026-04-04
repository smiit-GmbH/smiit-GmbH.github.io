"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"

const LOGOS: Record<number, string> = {
  1: "/assets/logos/dy-project.png",
  2: "/assets/logos/gb-logistics.png",
  3: "/assets/logos/claimity.png",
  4: "/assets/logos/rb-westkamp.png",
  5: "/assets/logos/asw-engineering.png",
}

export default function AnalyticsReviews({ dict }: { dict: any }) {
  const heading = useRevealOnScroll()
  const carousel = useRevealOnScroll()
  
  const reviews = dict.customerCards.map((c: any) => ({
    ...c,
    logoSrc: LOGOS[c.id as keyof typeof LOGOS],
  }))

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45,
      zIndex: 0,
    }),
    center: {
      zIndex: 2,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45,
    }),
  }

  const getIndex = (offset: number) => {
    let index = currentIndex + offset
    if (index < 0) index = reviews.length - 1
    if (index >= reviews.length) index = 0
    return index
  }

  const prevReview = reviews[getIndex(-1)]
  const nextReview = reviews[getIndex(1)]

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection)
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection
      if (nextIndex < 0) nextIndex = reviews.length - 1
      if (nextIndex >= reviews.length) nextIndex = 0
      return nextIndex
    })
  }, [reviews.length])

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1)
    }, 6000)
    return () => clearInterval(timer)
  }, [paginate])

  const currentReview = reviews[currentIndex]

  return (
    <section className="relative py-10 md:py-14 bg-transparent overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={heading.ref}
          className={`text-center mb-16 md:mb-20 reveal-fade-up ${heading.isRevealed ? "revealed" : ""}`}
        >
          <h2 className="font-serif text-[2rem] sm:text-[2.8rem] md:text-[3.4rem] leading-[1.1] tracking-tight text-black">
            {dict.servicesAnalytics.portfolio.title === "Unser" ? "Was unsere " : "What our "}
            <span className="text-[#21569c]">
              {dict.servicesAnalytics.portfolio.title === "Unser" ? "Kunden sagen" : "clients say"}
            </span>
          </h2>
        </div>

        <div
          ref={carousel.ref}
          className={`relative h-[400px] sm:h-[350px] md:h-[400px] w-full max-w-7xl mx-auto flex items-center justify-center [perspective:1000px] reveal-fade-up reveal-delay-1 ${carousel.isRevealed ? "revealed" : ""}`}
        >
          {/* Previous Card Preview (Desktop only) */}
          <div 
            className="hidden lg:flex absolute left-0 w-[350px] h-[300px] items-center justify-center opacity-40 scale-75 -rotate-y-12 -translate-x-8 cursor-pointer hover:opacity-60 transition-all duration-300 z-0"
            onClick={() => paginate(-1)}
          >
            <div className="w-full h-full bg-white rounded-[2rem] p-8 shadow-lg border border-gray-100 flex flex-col items-center text-center pointer-events-none">
              <div className="h-12 mb-6 flex items-center justify-center">
                {prevReview.logoSrc && (
                  <Image src={prevReview.logoSrc} alt={prevReview.name} width={120} height={40} className="max-h-full w-auto object-contain grayscale" />
                )}
              </div>
              <p className="font-serif text-lg text-black leading-relaxed line-clamp-3">"{prevReview.feedback}"</p>
            </div>
          </div>

          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 },
                rotateY: { duration: 0.4 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x)
                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1)
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1)
                }
              }}
              className="absolute w-full max-w-[700px] px-4 sm:px-10 z-10"
            >
              <div className="relative bg-white rounded-[2rem] p-8 sm:p-12 md:p-16 shadow-[0_20px_60px_rgba(11,22,45,0.08)] border border-gray-100 flex flex-col items-center text-center">
                <Quote className="absolute top-6 left-6 sm:top-10 sm:left-10 w-10 h-10 sm:w-16 sm:h-16 text-[#21569c]/10 rotate-180" />
                <Quote className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-10 h-10 sm:w-16 sm:h-16 text-[#21569c]/10" />
                
                <div className="h-12 sm:h-16 mb-8 flex items-center justify-center">
                  {currentReview.logoSrc && (
                    <Image
                      src={currentReview.logoSrc}
                      alt={currentReview.name}
                      width={160}
                      height={60}
                      className="max-h-full w-auto object-contain opacity-80 grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  )}
                </div>

                <p className="font-serif text-xl sm:text-2xl md:text-3xl text-black leading-relaxed mb-8 relative z-10">
                  "{currentReview.feedback}"
                </p>

                <div className="mt-auto">
                  <h4 className="font-semibold text-black text-base sm:text-lg">
                    {currentReview.name}
                  </h4>
                  <p className="text-sm sm:text-base text-[#21569c] mt-1">
                    {currentReview.subtitle}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Next Card Preview (Desktop only) */}
          <div 
            className="hidden lg:flex absolute right-0 w-[350px] h-[300px] items-center justify-center opacity-40 scale-75 rotate-y-12 translate-x-8 cursor-pointer hover:opacity-60 transition-all duration-300 z-0"
            onClick={() => paginate(1)}
          >
            <div className="w-full h-full bg-white rounded-[2rem] p-8 shadow-lg border border-gray-100 flex flex-col items-center text-center pointer-events-none">
              <div className="h-12 mb-6 flex items-center justify-center">
                {nextReview.logoSrc && (
                  <Image src={nextReview.logoSrc} alt={nextReview.name} width={120} height={40} className="max-h-full w-auto object-contain grayscale" />
                )}
              </div>
              <p className="font-serif text-lg text-black leading-relaxed line-clamp-3">"{nextReview.feedback}"</p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-2 sm:px-0 z-20">
            <button
              className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-100 shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex items-center justify-center text-black/50 hover:text-[#21569c] hover:scale-110 transition-all duration-300 -translate-x-2 sm:-translate-x-6"
              onClick={() => paginate(-1)}
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              className="pointer-events-auto w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-100 shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex items-center justify-center text-black/50 hover:text-[#21569c] hover:scale-110 transition-all duration-300 translate-x-2 sm:translate-x-6"
              onClick={() => paginate(1)}
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8 sm:mt-12 relative z-20">
          {reviews.map((_: any, idx: number) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1)
                setCurrentIndex(idx)
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-8 bg-[#21569c]" : "w-2 bg-black/15 hover:bg-black/30"
              }`}
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
