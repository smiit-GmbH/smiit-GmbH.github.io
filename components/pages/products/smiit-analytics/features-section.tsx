"use client"

import { Database, BarChart3, Cpu } from "lucide-react"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"

interface FeaturesSectionProps {
  dict: any
}

const icons = [Database, BarChart3, Cpu]

export function FeaturesSection({ dict }: FeaturesSectionProps) {
  const { features } = dict.smiitAnalytics
  const heading = useRevealOnScroll()
  const cards = useRevealOnScroll()
  const embed = useRevealOnScroll()

  return (
    <section
      id="features"
      className="relative py-14 md:py-18"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={heading.ref}
          className={`text-center mb-12 md:mb-16 reveal-fade-up ${heading.isRevealed ? "revealed" : ""}`}
        >
          <h2 className="font-serif text-[2rem] sm:text-[2.8rem] md:text-[3.4rem] leading-[1.1] tracking-tight text-black">
            {features.title}{" "}
            <span className="text-[#21569c]">{features.titleHighlight}</span>
          </h2>

          <p className="mt-4 md:mt-5 text-sm md:text-base leading-relaxed text-black/55 max-w-[55ch] mx-auto">
            {features.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Feature cards */}
          <div ref={cards.ref}>
            <div className="space-y-4">
              {features.items.map((item: { title: string; text: string }, idx: number) => {
                const Icon = icons[idx]
                return (
                  <div
                    key={idx}
                    className={`flex gap-4 p-5 rounded-[1.75rem] bg-white border-1 border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 reveal-fade-up reveal-delay-${idx + 1} ${cards.isRevealed ? "revealed" : ""}`}
                  >
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#21569c]/10 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-[#21569c]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-base text-black">{item.title}</h3>
                      <p className="mt-1 text-sm text-black/60 leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Embedded Power BI Report */}
          <div
            ref={embed.ref}
            className={`relative rounded-[1.25rem] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.06)] reveal-fade-up reveal-delay-2 ${embed.isRevealed ? "revealed" : ""}`}
            style={{ backgroundColor: "rgb(15 23 42)" }}
          >
            <div className="relative aspect-[3/2]">
              <iframe
                title="smiit Analytics (Website)"
                src="https://app.powerbi.com/view?r=eyJrIjoiMGIzNGViZDUtMjkwYy00NTc5LWJjOWMtZTUwNDk2YTcwM2Q2IiwidCI6IjQxNmMzYzYwLWM3MDEtNDE2ZS1iOTg4LTRmNWZjYjU1ZGZiYyJ9"
                className="absolute inset-0 w-full h-full border-0"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
