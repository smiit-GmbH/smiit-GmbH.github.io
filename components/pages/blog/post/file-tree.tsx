"use client"

import { useState, type CSSProperties } from "react"
import { ChevronRight, File, Folder, FolderOpen } from "lucide-react"
import type { FileTreeNode } from "@/lib/blog"
import { cx } from "./text-utils"

/** Interactive, collapsible repository file tree. */
export function FileTree({ nodes }: { nodes: FileTreeNode[] }) {
  return (
    <div className="my-8 overflow-hidden rounded-[16px] border border-black/10 bg-[#0B162D]/[0.02] p-2.5 font-mono text-[0.85rem] sm:p-3.5">
      <ul>
        {nodes.map((node, i) => (
          <FileTreeItem key={i} node={node} depth={0} />
        ))}
      </ul>
    </div>
  )
}

function FileTreeItem({ node, depth }: { node: FileTreeNode; depth: number }) {
  const indent = { paddingLeft: depth * 18 + 6 }

  if (node.type === "file") {
    return (
      <li>
        <div className="flex items-center gap-2 py-1 pr-2 text-[#0B162D]/70" style={indent}>
          <File className="h-3.5 w-3.5 shrink-0 text-[#0B162D]/35" aria-hidden />
          <span>{node.name}</span>
        </div>
      </li>
    )
  }

  return <FileTreeFolder node={node} depth={depth} indent={indent} />
}

function FileTreeFolder({
  node,
  depth,
  indent,
}: {
  node: Extract<FileTreeNode, { type: "folder" }>
  depth: number
  indent: CSSProperties
}) {
  const hasChildren = node.children.length > 0
  const [open, setOpen] = useState(Boolean(node.defaultOpen))

  const Label = (
    <>
      {open && hasChildren ? (
        <FolderOpen className="h-4 w-4 shrink-0 text-[var(--area)]" aria-hidden />
      ) : (
        <Folder className="h-4 w-4 shrink-0 text-[var(--area)]" aria-hidden />
      )}
      <span className="font-semibold text-[#0B162D]">{node.name}/</span>
      {node.note && (
        <span className="ml-2 hidden truncate font-sans text-[0.72rem] font-normal text-[#0B162D]/45 sm:inline">
          {node.note}
        </span>
      )}
    </>
  )

  // Leaf folders (no listed children) render as a static row — nothing to expand.
  if (!hasChildren) {
    return (
      <li>
        <div className="flex items-center gap-1.5 py-1 pr-2" style={indent}>
          <span className="h-3.5 w-3.5 shrink-0" aria-hidden />
          {Label}
        </div>
      </li>
    )
  }

  return (
    <li>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-1.5 rounded-md py-1 pr-2 text-left transition-colors hover:bg-black/[0.04]"
        style={indent}
      >
        <ChevronRight
          className={cx("h-3.5 w-3.5 shrink-0 text-[#0B162D]/40 transition-transform duration-200", open && "rotate-90")}
          aria-hidden
        />
        {Label}
      </button>
      {open && (
        <ul>
          {node.children.map((child, i) => (
            <FileTreeItem key={i} node={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}
