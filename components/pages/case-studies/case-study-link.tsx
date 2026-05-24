import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Locale } from "@/lib/dictionary"

/**
 * Small, neutral "read case study" link used on review carousels, customer
 * cards and other marketing surfaces to point at the matching case study.
 * Kept colour-neutral so it fits the per-page accent contexts.
 */
export default function CaseStudyLink({
  href,
  lang,
  className,
}: {
  href: string
  lang: Locale
  className?: string
}) {
  return (
    <Link
      href={href}
      className={[
        "group/cs inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-[#0B162D] transition-colors hover:text-[#F703EB]",
        className ?? "",
      ].join(" ")}
    >
      {lang === "de" ? "Case Study lesen" : "Read case study"}
      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cs:translate-x-0.5" />
    </Link>
  )
}
