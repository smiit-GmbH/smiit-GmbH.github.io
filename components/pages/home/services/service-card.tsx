"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import LocalizedLink from "../../../localized-link"

export function TagPill({ label, variant = "default" }: { label: string; variant?: "default" | "glass" }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full",
        "px-2.5 py-0.5",
        "text-[0.62rem] font-semibold uppercase tracking-wide",
        variant === "glass"
          ? "border border-black/10 bg-white/35 text-black/55 backdrop-blur-sm dark:border-white/20 dark:bg-white/15 dark:text-white/80"
          : "border border-black/25 bg-white/70 text-black/60 dark:border-white/20 dark:bg-white/10 dark:text-white/70",
      ].join(" ")}
    >
      {label}
    </span>
  )
}

export function ServiceCard({
  title,
  text,
  tags,
  className,
  onHoverStart,
  onHoverEnd,
  onFocus,
  onBlur,
  href,
  imageSrc,
  signalToken,
}: {
  title: string
  text: string
  tags: string[]
  className?: string
  onHoverStart?: () => void
  onHoverEnd?: () => void
  onFocus?: () => void
  onBlur?: () => void
  href?: string
  imageSrc?: string
  signalToken?: number | null
}) {
  const CardContent = (
    <motion.div
      tabIndex={href ? -1 : 0}
      onMouseEnter={!href ? onHoverStart : undefined}
      onMouseLeave={!href ? onHoverEnd : undefined}
      onFocus={!href ? onFocus : undefined}
      onBlur={!href ? onBlur : undefined}
      className={[
        "relative overflow-hidden",
        "rounded-[1.75rem] md:rounded-[1.6rem]",
        "bg-white dark:bg-[color:var(--color-card)]",
        "shadow-[0_10px_30px_rgba(0,0,0,0.06)]",
        "px-6 py-6 sm:px-7 sm:py-7",
        "transition-transform duration-300 ease-out",
        "will-change-transform",
        "hover:scale-[1.02] hover:-translate-y-0.5",
        "focus:scale-[1.02] focus:-translate-y-0.5",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/15 dark:focus-visible:ring-white/20",
        href ? "focus:ring-0" : "",
        className ?? "",
      ].join(" ")}
    >
      {/* card “signal ripple” overlay */}
      {typeof signalToken === "number" && (
        <motion.div
          key={signalToken}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[1.75rem] md:rounded-[1.6rem]"
          initial={{ opacity: 0, boxShadow: "0 0 0 0 rgba(0,0,0,0)" }}
          animate={{
            opacity: [0, 1, 1, 0],
            boxShadow: [
              "0 0 0 0 rgba(168,85,247,0.0)",
              "0 0 0 8px rgba(168,85,247,0.16)",
              "0 0 0 16px rgba(59,130,246,0.10)",
              "0 0 0 26px rgba(99,102,241,0.0)",
            ],
          }}
          transition={{ duration: 1.15, ease: "easeOut", times: [0, 0.25, 0.6, 1] }}
          style={{ mixBlendMode: "screen" }}
        />
      )}

      {imageSrc && (
        <div
          className="absolute right-0 top-0 bottom-0 w-[60%] pointer-events-none select-none opacity-90"
          style={{
            maskImage: "linear-gradient(to left, black -60%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to left, black -60%, transparent 100%)",
          }}
        >
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="(max-width: 1024px) 60vw, 22vw"
            className="object-cover object-right"
          />
        </div>
      )}

      <div className="relative z-10">
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <TagPill key={t} label={t} />
          ))}
        </div>

        <h3 className="mt-4 font-serif text-[1.75rem] leading-[1.05] tracking-tight text-black dark:text-white">
          {title}
        </h3>

        <p className="mt-3 text-[0.84rem] sm:text-[0.92rem] leading-relaxed text-black/75 dark:text-white/70 max-w-[60ch]">
          {text}
        </p>
      </div>
    </motion.div>
  )

  if (href) {
    return (
      <LocalizedLink
        href={href}
        className="block outline-none rounded-[1.6rem]"
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {CardContent}
      </LocalizedLink>
    )
  }

  return CardContent
}
