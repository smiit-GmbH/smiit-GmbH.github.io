import type { Locale } from "@/lib/dictionary"
import { SuffixSpec } from "./data"
import { formatNumber } from "@/components/pages/services/shared/hero-kit"

// ---------- Path generators ----------

export function smoothLinePath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return ""
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1]
    const p1 = points[i]
    const dx = p1.x - p0.x
    const cp1x = p0.x + dx / 2
    const cp2x = p1.x - dx / 2
    d += ` C ${cp1x} ${p0.y}, ${cp2x} ${p1.y}, ${p1.x} ${p1.y}`
  }
  return d
}

export function smoothAreaPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return ""
  const line = smoothLinePath(points)
  const last = points[points.length - 1]
  const first = points[0]
  return `${line} L ${last.x} 146 L ${first.x} 146 Z`
}

export function forecastSegmentPath(from: { x: number; y: number }, to: { x: number; y: number }): string {
  const dx = to.x - from.x
  const cp1x = from.x + dx / 2
  const cp2x = to.x - dx / 2
  return `M ${from.x} ${from.y} C ${cp1x} ${from.y}, ${cp2x} ${to.y}, ${to.x} ${to.y}`
}

export function resolveSuffix(spec: SuffixSpec, millionSuffix: string): string {
  if (spec.type === "million") return millionSuffix
  if (spec.type === "percent") return " %"
  return ""
}

export function formatDelta(value: number, decimals: number, unit: string, lang: Locale): string {
  const sign = value >= 0 ? "+" : ""
  const formatted = `${sign}${formatNumber(value, decimals, lang)}`
  return unit ? `${formatted} ${unit}` : formatted
}

export function formatValue(value: number, decimals: number, suffix: string, lang: Locale): string {
  return `${formatNumber(value, decimals, lang)}${suffix}`
}
