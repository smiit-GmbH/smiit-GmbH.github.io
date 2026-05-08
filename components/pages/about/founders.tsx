"use client"

import Image from "next/image"
import Link from "next/link"
import { memo, useState } from "react"
import { motion } from "framer-motion"
import { Mail, ExternalLink, ArrowRight, Linkedin, GraduationCap } from "lucide-react"
import type { Locale } from "@/lib/dictionary"

interface Founder {
  name: string
  role: string
  image: string
  education: string[]
  bio: string
  email: string
  cvLink: string
  linkedIn?: string
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const FlipCard = memo(function FlipCard({
  founder,
  cvLinkText,
  flipHint,
}: {
  founder: Founder
  cvLinkText: string
  flipHint: string
}) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      variants={fadeUpVariants}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-[340px] sm:max-w-[360px] mx-auto"
    >
      {/* Card container with perspective */}
      <div
        className="perspective-1000 cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className="relative w-full aspect-[3/4] transition-transform duration-700 ease-in-out transform-style-3d"
          style={{
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* ===== FRONT ===== */}
          <div className="absolute inset-0 backface-hidden rounded-2xl overflow-hidden shadow-md ring-1 ring-black/5 bg-[linear-gradient(180deg,#f5f7fa,#e9eef5)] sm:bg-transparent">
            <div className="absolute inset-3 sm:inset-0 rounded-xl sm:rounded-2xl overflow-hidden">
              {/* Image */}
              <Image
                src={founder.image}
                alt={`${founder.name} – ${founder.role}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 90vw, 360px"
                loading="lazy"
              />

              {/* Gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Text on front */}
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white">
                <h3 className="font-serif text-xl sm:text-2xl leading-tight tracking-tight">
                  {founder.name}
                </h3>
                <p className="mt-1 text-sm sm:text-base text-white/80">
                  {founder.role}
                </p>
                <p className="mt-3 text-xs text-white/50 flex items-center gap-1.5">
                  <span className="inline-block w-4 h-[1px] bg-white/40" />
                  {flipHint}
                </p>
              </div>
            </div>
          </div>

          {/* ===== BACK ===== */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden shadow-md ring-1 ring-black/5 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,247,252,0.96))]">
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background: [
                  "radial-gradient(circle at top right, rgba(33,86,156,0.16), transparent 38%)",
                  "radial-gradient(circle at bottom left, rgba(22,174,163,0.12), transparent 34%)",
                  "linear-gradient(180deg, rgba(255,255,255,0.92), rgba(245,247,251,0.96))",
                ].join(", "),
              }}
            />
            <div className="absolute inset-0 bg-white/56" />

            {/* Content */}
            <div className="relative h-full flex flex-col justify-between p-6 sm:p-7">
              {/* Top: Name */}
              <div>
                <h3 className="font-serif text-xl sm:text-2xl leading-tight tracking-tight text-black">
                  {founder.name}
                </h3>
                <p className="mt-1 text-sm text-black/60">{founder.role}</p>

                {/* Education */}
                <div className="mt-4 flex flex-col gap-1.5">
                  {founder.education.map((edu) => (
                    <div key={edu} className="flex items-start gap-2 text-xs sm:text-sm text-black/70">
                      <GraduationCap className="w-4 h-4 shrink-0 mt-0.5 text-[#21569c]" />
                      <span>{edu}</span>
                    </div>
                  ))}
                </div>

                {/* Bio */}
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-black/75">
                  {founder.bio}
                </p>
              </div>

              {/* Bottom: Links */}
              <div className="mt-5 flex flex-col gap-2">
                <a
                  href={`mailto:${founder.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  {founder.email}
                </a>
                {founder.cvLink && (
                  <a
                    href={founder.cvLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 shrink-0" />
                    {cvLinkText}
                  </a>
                )}
                {founder.linkedIn && (
                  <a
                    href={founder.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 text-sm text-black/60 hover:text-black transition-colors"
                  >
                    <Linkedin className="w-4 h-4 shrink-0" />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
})

export function FoundersSection({ lang, dict }: { lang: Locale; dict: any }) {
  const f = dict.aboutPage.founders

  return (
    <section className="relative pt-8 pb-8 md:pt-12 md:pb-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          variants={fadeUpVariants}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <h2 className="font-serif text-[2.6rem] sm:text-[3.15rem] md:text-[3.6rem] leading-[1.05] tracking-tight text-black whitespace-pre-line text-balance">
            {f.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-black/75 max-w-[54ch] mx-auto whitespace-pre-line">
            {f.subtitle}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="mt-12 sm:mt-14 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 lg:gap-24 xl:gap-32 max-w-[800px] lg:max-w-[900px] mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {f.members.map((member: Founder) => (
            <FlipCard
              key={member.name}
              founder={member}
              cvLinkText={f.cvLinkText}
              flipHint={f.flipHint}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-12 sm:mt-14 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          variants={fadeUpVariants}
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
        >
          <p className="text-sm sm:text-base leading-relaxed text-black/75 max-w-[48ch] mx-auto">
            {f.ctaText}
          </p>
          <Link
            href={`/${lang}/about/#book`}
            className="mt-5 inline-flex items-center justify-center px-5 py-3 sm:px-6 sm:py-3.5 text-sm sm:text-base font-medium text-white bg-[#21569c] hover:bg-[#21569c]/85 rounded-xl transition-colors duration-200"
          >
            {f.ctaButton}
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
