import { Fragment, type ReactNode } from "react"

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ")
}

/** Renders `**bold**` and `` `code` `` spans; glossary auto-linking applies to the plain segments only. */
export function withEmphasis(text: string, link: (plain: string) => ReactNode): ReactNode {
  if (!text.includes("**") && !text.includes("`")) return link(text)
  return text.split(/(\*\*.+?\*\*|`[^`]+`)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong key={i} className="font-semibold text-[#0B162D]">
          {part.slice(2, -2)}
        </strong>
      )
    }
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      return (
        <code key={i} className="rounded bg-[#0B162D]/[0.06] px-1.5 py-0.5 font-mono text-[0.85em] text-[#0B162D]">
          {part.slice(1, -1)}
        </code>
      )
    }
    return <Fragment key={i}>{part && link(part)}</Fragment>
  })
}
