"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import LocalizedLink from "@/components/localized-link"

interface ProductsProps {
  dict: any
}

function ProductCard({
  item,
  index,
}: {
  item: { title: string; text: string; image: string; href?: string; external?: boolean }
  index: number
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])

  const cardContent = (
    <>
      {/* Parallax image wrapper */}
      <motion.div
        className="absolute inset-[-16%] will-change-transform"
        style={{ y: imageY }}
      >
        <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
          <Image
            src={item.image}
            alt={item.title.replace("\n", " ")}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover object-bottom"
          />
        </div>
      </motion.div>

      {/* Hover shadow overlay */}
      <div className="absolute inset-0 rounded-[1.5rem] transition-shadow duration-500 group-hover:shadow-2xl" />

      {/* Text overlay */}
      <div className="relative z-10 p-6 md:p-7">
        <h3 className="font-serif text-[1.55rem] md:text-[1.7rem] leading-[1.15] tracking-tight text-white whitespace-pre-line">
          {item.title}
        </h3>
        <p className="mt-3 text-[0.88rem] md:text-[0.9rem] leading-[1.7] text-white/85 max-w-[38ch]">
          {item.text}
        </p>
      </div>
    </>
  )

  const linkOverlay = item.href ? (
    item.external ? (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-20"
        aria-label={item.title.replace("\n", " ")}
      />
    ) : item.href.startsWith("#") ? (
      <a
        href={item.href}
        className="absolute inset-0 z-20"
        aria-label={item.title.replace("\n", " ")}
      />
    ) : (
      <LocalizedLink
        href={item.href}
        className="absolute inset-0 z-20"
        aria-label={item.title.replace("\n", " ")}
      />
    )
  ) : null

  return (
    <motion.div
      ref={cardRef}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      className="group relative overflow-hidden rounded-[1.5rem] min-h-[460px] sm:min-h-[520px] md:min-h-[560px] cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {cardContent}
      {linkOverlay}
    </motion.div>
  )
}

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

export default function Products({ dict }: ProductsProps) {
  const { products } = dict

  return (
    <section className="relative pt-2 pb-4 md:pt-8 md:pb-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10 md:mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariants}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="font-serif text-[2.1rem] sm:text-[2.8rem] md:text-[3.4rem] leading-[1.12] tracking-tight text-black whitespace-pre-line">
            {products.title}
          </h2>
          <p className="mt-4 md:mt-5 text-sm md:text-[0.94rem] leading-relaxed text-black/65 max-w-[58ch] mx-auto whitespace-pre-line">
            {products.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridVariants}
        >
          {products.items.map(
            (
              item: { title: string; text: string; image: string; href?: string; external?: boolean },
              idx: number,
              arr: any[]
            ) => {
              const isLastOdd = idx === arr.length - 1 && arr.length % 2 !== 0
              return (
                <div key={idx} className={isLastOdd ? "md:col-span-2 md:max-w-[calc(50%-0.625rem)] md:mx-auto lg:col-span-1 lg:max-w-none lg:mx-0" : ""}>
                  <ProductCard item={item} index={idx} />
                </div>
              )
            }
          )}
        </motion.div>

        {/* Desktop CTA – gradient banner */}
        <motion.div
          className="mt-8 rounded-[1.5rem] overflow-hidden hidden lg:flex flex-col items-center justify-center text-center px-6 py-20 products-gradient-animate"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          <motion.h2
            className="font-serif text-[3.2rem] leading-[1.12] tracking-tight text-black whitespace-pre-line max-w-[22ch]"
            variants={fadeUpVariants}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {products.ctaBottom}
          </motion.h2>
          <motion.div
            className="mt-8 flex justify-center"
            variants={fadeUpVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <a href="#book">
              <Button
                variant="outline"
                className="rounded-xl px-6 py-6 text-sm text-black bg-white hover:bg-white/80 hover:text-black cursor-pointer"
              >
                {products.ctaBottomButton}
                <ChevronRight className="ml-1.5 h-4 w-4" />
              </Button>
            </a>
          </motion.div>
        </motion.div>

        {/* Mobile CTA – compact, minimal */}
        <motion.div
          className="mt-5 lg:hidden rounded-2xl border border-black/8 bg-white px-5 py-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          <motion.h2
            className="font-serif text-[1.5rem] leading-[1.18] tracking-tight text-black whitespace-pre-line"
            variants={fadeUpVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {products.ctaBottom}
          </motion.h2>
          <motion.p
            className="mt-2.5 text-[0.84rem] leading-relaxed text-black/60"
            variants={fadeUpVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {products.ctaSubtext ?? ""}
          </motion.p>
          <motion.div
            className="mt-5"
            variants={fadeUpVariants}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <a href="#book" className="block">
              <Button
                variant="outline"
                className="w-full rounded-xl px-5 py-5 text-sm font-medium border-black text-black hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
              >
                {products.ctaBottomButton}
                <ChevronRight className="ml-1.5 h-4 w-4" />
              </Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
