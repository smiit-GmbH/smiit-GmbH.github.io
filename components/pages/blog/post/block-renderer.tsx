"use client"

import type { ReactNode } from "react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import type { BlogBlock } from "@/lib/blog"
import { FileTree } from "./file-tree"
import { FlowDiagram, FlowSteps, MaturityLadder } from "./flow-visuals"
import { cx } from "./text-utils"

export function BlogBlockRenderer({
  block,
  id,
  number,
  linked,
  color,
  onCite,
}: {
  block: BlogBlock
  id?: string
  number?: number
  /** Glossary-autolinked content: a node for paragraphs, an aligned array for bullets. */
  linked?: ReactNode | ReactNode[]
  /** Category accent color (hex), used by the maturity graphic. */
  color: string
  /** Reveals the (collapsed) sources list and scrolls to the cited entry. */
  onCite?: (n: number) => void
}) {
  switch (block.type) {
    case "heading":
      return (
        <div className="mt-16 mb-5 first:mt-0">
          <span aria-hidden className="font-mono text-[0.8rem] font-semibold tracking-[0.2em] text-[var(--area)]">
            {String(number ?? 0).padStart(2, "0")}
          </span>
          <h2
            id={id}
            className="mt-3 scroll-mt-28 font-serif text-[1.55rem] sm:text-[1.9rem] leading-[1.12] tracking-tight text-[#0B162D]"
          >
            {block.text}
          </h2>
        </div>
      )
    case "subheading":
      return (
        <h3 className="mt-10 mb-4 scroll-mt-28 font-serif text-[1.25rem] sm:text-[1.5rem] leading-[1.2] tracking-tight text-[#0B162D]">
          {block.text}
        </h3>
      )
    case "paragraph":
      return (
        <p className="mb-5 text-[0.9rem] sm:text-[1.05rem] leading-[1.75] text-[#0B162D]/80">
          {linked ?? block.text}
          <Citations refs={block.refs} onCite={onCite} />
        </p>
      )
    case "bullets":
      return (
        <ul className="mb-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--area)]" />
              <span className="text-[0.9rem] sm:text-[1.05rem] leading-[1.75] text-[#0B162D]/80">
                {Array.isArray(linked) ? linked[i] : item}
                <Citations refs={block.itemRefs?.[i]} onCite={onCite} />
              </span>
            </li>
          ))}
        </ul>
      )
    case "table":
      return (
        <div className="my-8 overflow-x-auto rounded-[16px] border border-black/10 bg-white">
          <table className="w-full min-w-[620px] border-collapse text-left">
            <thead>
              <tr className="bg-[#0B162D]/[0.03]">
                {block.headers.map((header) => (
                  <th
                    key={header}
                    className="border-b border-black/10 px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-wider text-[#0B162D]/55"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-b border-black/[0.06] last:border-b-0">
                  {row.map((cell, c) => (
                    <td
                      key={c}
                      className={cx(
                        "px-4 py-3 align-top text-[0.86rem] leading-snug",
                        c === 0 ? "font-semibold text-[#0B162D]" : "text-[#0B162D]/70",
                      )}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case "code":
      return (
        <pre className="mb-6 overflow-x-auto rounded-[16px] bg-[#0B162D] p-5 text-[0.82rem] leading-relaxed text-white/85 shadow-[0_14px_40px_rgba(11,22,45,0.18)]">
          <code className="font-mono whitespace-pre">{block.content}</code>
        </pre>
      )
    case "grid":
      return (
        <div className="my-8 rounded-[20px] border border-black/10 bg-[#0B162D]/[0.02] p-6 sm:p-7">
          <ul className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
            {block.items.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--area)]" />
                <span>
                  <span className="block text-[0.95rem] font-semibold text-[#0B162D]">{item.title}</span>
                  <span className="text-[0.86rem] leading-snug text-[#0B162D]/60">{item.description}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )
    case "numbered":
      return (
        <ol className="my-8 space-y-2.5">
          {block.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3.5 rounded-xl border border-black/10 bg-white px-4 py-3.5 shadow-[0_2px_10px_rgba(18,38,63,0.04)]"
            >
              <span
                className="mt-px flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-[0.8rem] font-semibold"
                style={{ color, backgroundColor: `${color}14` }}
              >
                {i + 1}
              </span>
              <span className="min-w-0">
                <span className="block text-[0.95rem] font-semibold text-[#0B162D]">{item.title}</span>
                <span className="mt-0.5 block text-[0.86rem] leading-snug text-[#0B162D]/60">{item.description}</span>
              </span>
            </li>
          ))}
        </ol>
      )
    case "repo":
      return (
        <a
          href={block.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group my-4 flex items-start gap-4 rounded-[16px] border border-black/10 bg-white/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:shadow-[0_14px_36px_rgba(18,38,63,0.10)]"
        >
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            style={{ color, backgroundColor: `${color}14` }}
          >
            <svg viewBox="0 0 16 16" className="h-5 w-5" fill="currentColor" aria-hidden>
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-mono text-[0.9rem] font-semibold text-[#0B162D] transition-colors group-hover:text-[var(--area)]">
              {block.name}
            </span>
            <span className="mt-1 block text-[0.86rem] leading-snug text-[#0B162D]/60">{block.description}</span>
          </span>
          <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-[#0B162D]/30 transition-colors group-hover:text-[var(--area)]" aria-hidden />
        </a>
      )
    case "flow":
      return <FlowSteps steps={block.steps} color={color} />
    case "diagram":
      return <FlowDiagram steps={block.steps} color={color} />
    case "filetree":
      return <FileTree nodes={block.nodes} />
    case "maturity":
      return <MaturityLadder items={block.items} color={color} />
    case "image":
      return (
        <figure className="my-9 mx-auto" style={{ maxWidth: block.maxWidth ?? 760 }}>
          <div className="overflow-hidden rounded-[16px] border border-black/10 bg-white p-4 sm:p-6">
            <Image
              src={block.src}
              alt={block.alt}
              width={block.width}
              height={block.height}
              sizes={`(min-width: 1024px) ${block.maxWidth ?? 760}px, 100vw`}
              className="mx-auto h-auto w-full"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-center text-[0.82rem] leading-relaxed text-[#0B162D]/50">
              {block.caption}
            </figcaption>
          )}
        </figure>
      )
    default:
      return null
  }
}

/** Superscript citation links into the (collapsed) sources list. */
function Citations({ refs, onCite }: { refs?: number[]; onCite?: (n: number) => void }) {
  if (!refs || refs.length === 0) return null
  return (
    <sup className="ml-0.5 font-semibold">
      {refs.map((n) => (
        <a
          key={n}
          href={`#ref-${n}`}
          onClick={(e) => {
            if (onCite) {
              e.preventDefault()
              onCite(n)
            }
          }}
          className="text-[var(--area)] no-underline hover:underline"
        >
          [{n}]
        </a>
      ))}
    </sup>
  )
}
