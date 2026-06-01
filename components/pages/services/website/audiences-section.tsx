"use client"

import { motion } from "framer-motion"
import { Building2, Trash2, Truck, Factory } from "lucide-react"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"

const ICONS = [Building2, Trash2, Truck, Factory]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function AudiencesSection({ dict }: { dict: any }) {
  const audiences = dict.servicesWebsite.audiences
  const eyebrow = dict.servicesWebsite.eyebrows.audiences
  const heading = useRevealOnScroll()
  const grid = useRevealOnScroll({ margin: "-60px" })

  return (
    <section id="branchen" className="relative bg-transparent pt-[clamp(72px,9vw,140px)] pb-[clamp(40px,5vw,80px)]">
      <div className="mx-auto max-w-[1240px] px-8">
        {/* Heading */}
        <div ref={heading.ref} className={`reveal-fade-up ${heading.isRevealed ? "revealed" : ""}`}>
          <span className="section-eyebrow">{eyebrow}</span>
          <h2 className="mt-[22px] font-serif text-[clamp(2.1rem,4.4vw,3.7rem)] leading-[1.02] tracking-[-0.02em] max-w-[20ch] text-[#15151a]">
            {audiences.title}{" "}
            <em className="not-italic text-[#e6009b]">{audiences.titleHighlight}</em>
          </h2>
        </div>

        {/* Cards */}
        <motion.div
          ref={grid.ref}
          variants={containerVariants}
          initial="hidden"
          animate={grid.isRevealed ? "visible" : "hidden"}
          className="mt-[52px] grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4"
        >
          {audiences.items.map((item: { number: string; title: string; text: string }, idx: number) => {
            const Icon = ICONS[idx] ?? Building2
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="group relative overflow-hidden rounded-[26px] bg-white border border-[rgba(21,21,26,0.06)] p-[26px] min-h-[220px] flex flex-col justify-between transition-all duration-300 hover:-translate-y-[5px] hover:shadow-[0_30px_70px_-20px_rgba(21,21,26,0.22)]"
              >
                {/* Number */}
                <span className="absolute top-[18px] right-[22px] font-serif text-[1.5rem] text-[#8a8a96] group-hover:text-[#e6009b] transition-colors duration-300">
                  {item.number}
                </span>
                {/* Badge */}
                <div className="w-[52px] h-[52px] rounded-[15px] bg-[#e9f0fb] text-[#2160b8] grid place-items-center border border-[rgba(21,21,26,0.06)]">
                  <Icon className="w-[24px] h-[24px]" />
                </div>
                {/* Content */}
                <div className="mt-auto">
                  <h4 className="text-[1.22rem] font-semibold tracking-[-0.02em] text-[#15151a]">{item.title}</h4>
                  <p className="mt-[8px] text-[0.92rem] text-[#50505c] leading-[1.5]">{item.text}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
