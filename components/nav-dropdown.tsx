"use client"

import { useEffect, useId, useRef, useState, type ReactNode } from "react"

/**
 * Header dropdown (disclosure pattern) that works for every input:
 * - mouse: opens on hover, a click pins it open
 * - touch: tap toggles
 * - keyboard: Enter/Space toggles, Tab moves into the panel, Escape closes
 * Clicking outside, moving focus out, or choosing an entry closes it.
 */
export function NavDropdown({
  trigger,
  triggerLabel,
  triggerClassName,
  panelClassName,
  className,
  children,
}: {
  trigger: ReactNode
  /** Accessible name when the visible trigger text isn't descriptive enough. */
  triggerLabel?: string
  triggerClassName: string
  /** Position/size/look of the panel; visibility classes are added here. */
  panelClassName: string
  className?: string
  children: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const openedByHover = useRef(false)
  const panelId = useId()

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return (
    <div
      ref={rootRef}
      className={className}
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse" || open) return
        openedByHover.current = true
        setOpen(true)
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return
        openedByHover.current = false
        setOpen(false)
      }}
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false)
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={triggerLabel}
        onClick={() => {
          // A click right after hover-opening pins the menu instead of closing it.
          if (openedByHover.current) {
            openedByHover.current = false
            return
          }
          setOpen((o) => !o)
        }}
        className={triggerClassName}
      >
        {trigger}
      </button>
      <div
        id={panelId}
        onClick={() => setOpen(false)}
        className={`${panelClassName} transition-all duration-200 ${open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
      >
        {children}
      </div>
    </div>
  )
}
