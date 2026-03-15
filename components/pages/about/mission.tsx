"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const valueImages = [
  "/assets/about/values_trust.png",
  "/assets/about/values_quality.png",
  "/assets/about/values_together.png",
]

const fadeUpVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

export function MissionSection({ dict }: { dict: any }) {
  const m = dict.aboutPage.mission

  return (
    <section className="relative pt-8 pb-8 md:pt-4 md:pb-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-2 lg:px-4">
        {/* Header */}
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          variants={fadeUpVariants}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <h1 className="font-serif text-[2.6rem] sm:text-[3.15rem] md:text-[3.6rem] leading-[1.05] tracking-tight text-black whitespace-pre-line text-balance">
            {m.title}
          </h1>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-black/75 max-w-[54ch] mx-auto whitespace-pre-line">
            {m.subtitle}
          </p>
        </motion.div>

        {/* Mobile Layout */}
        <div className="mt-10 space-y-12 lg:hidden">
          {m.values.map((value: { title: string; text: string }, index: number) => (
            <motion.div
              key={value.title}
              className="flex flex-col items-center gap-6"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-20px" }}
              variants={fadeUpVariants}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-square rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5">
                <Image
                  src={valueImages[index]}
                  alt={value.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 90vw, 360px"
                  loading="lazy"
                />
              </div>
              <div className="text-center max-w-[50ch]">
                <h2 className="font-serif text-2xl sm:text-3xl leading-tight tracking-tight text-black">
                  {value.title}
                </h2>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-black/75">
                  {value.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop Layout – Checkerboard Grid */}
        <motion.div
          className="mt-14 hidden lg:grid grid-cols-3 gap-x-16 xl:gap-x-20 gap-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridVariants}
        >
          <motion.div
            className="flex items-center justify-center"
            variants={fadeUpVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="relative w-[260px] xl:w-[300px] aspect-square rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5">
              <Image
                src={valueImages[0]}
                alt={m.values[0].title}
                fill
                className="object-cover"
                sizes="300px"
                loading="lazy"
              />
            </div>
          </motion.div>
          <motion.div
            className="flex flex-col justify-center text-center px-2"
            variants={fadeUpVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h2 className="font-serif text-2xl xl:text-[1.75rem] leading-tight tracking-tight text-black">
              {m.values[1].title}
            </h2>
            <p className="mt-3 text-sm xl:text-base leading-relaxed text-black/75">
              {m.values[1].text}
            </p>
          </motion.div>
          <motion.div
            className="flex items-center justify-center"
            variants={fadeUpVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="relative w-[260px] xl:w-[300px] aspect-square rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5">
              <Image
                src={valueImages[2]}
                alt={m.values[2].title}
                fill
                className="object-cover"
                sizes="300px"
                loading="lazy"
              />
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col justify-center text-center px-2"
            variants={fadeUpVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h2 className="font-serif text-2xl xl:text-[1.75rem] leading-tight tracking-tight text-black">
              {m.values[0].title}
            </h2>
            <p className="mt-3 text-sm xl:text-base leading-relaxed text-black/75">
              {m.values[0].text}
            </p>
          </motion.div>
          <motion.div
            className="flex items-center justify-center"
            variants={fadeUpVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="relative w-[260px] xl:w-[300px] aspect-square rounded-2xl overflow-hidden shadow-sm ring-1 ring-black/5">
              <Image
                src={valueImages[1]}
                alt={m.values[1].title}
                fill
                className="object-cover"
                sizes="300px"
                loading="lazy"
              />
            </div>
          </motion.div>
          <motion.div
            className="flex flex-col justify-center text-center px-2"
            variants={fadeUpVariants}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <h2 className="font-serif text-2xl xl:text-[1.75rem] leading-tight tracking-tight text-black">
              {m.values[2].title}
            </h2>
            <p className="mt-3 text-sm xl:text-base leading-relaxed text-black/75">
              {m.values[2].text}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
