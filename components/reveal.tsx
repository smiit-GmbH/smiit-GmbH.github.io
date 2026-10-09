"use client"

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react"
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll"

type RevealProps<T extends ElementType> = {
  as?: T
  /** Full class list of the element; `revealed` is appended once it scrolls into view. */
  className?: string
  /** IntersectionObserver root margin (default "-80px"). */
  margin?: string
  children?: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">

/**
 * Scroll-reveal wrapper (pair with `.reveal-fade-up` & co.). The only client code is
 * the IntersectionObserver; `children` can stay server components, so static
 * content inside never needs to be hydrated.
 */
export function Reveal<T extends ElementType = "div">({ as, className, margin, children, ...rest }: RevealProps<T>) {
  const [ref, revealed] = useRevealOnScroll(margin ? { margin } : undefined)
  const Tag: ElementType = as ?? "div"
  return (
    <Tag ref={ref} {...rest} className={revealed ? `${className ?? ""} revealed`.trim() : className}>
      {children}
    </Tag>
  )
}
