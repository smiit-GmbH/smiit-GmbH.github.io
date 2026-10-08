import { existsSync, readdirSync } from "node:fs"
import path from "node:path"

export const ROOT = path.resolve(__dirname, "..", "..")
export const LOCALES = ["de", "en"] as const

/** Lowercase kebab-case, safe to use as a URL path segment. */
export const URL_SAFE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

/** Strict ISO calendar date (YYYY-MM-DD) that is also a real date. */
export function isIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const d = new Date(`${value}T00:00:00Z`)
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value
}

/** Entry file slugs in a `content/<kind>/` folder (index + `_`-prefixed files excluded). */
export function contentFileSlugs(kind: string): string[] {
  return readdirSync(path.join(ROOT, "content", kind))
    .filter((f) => f.endsWith(".ts") && f !== "index.ts" && !f.startsWith("_"))
    .map((f) => f.slice(0, -".ts".length))
    .sort()
}

/** True if a site-absolute asset path (e.g. "/assets/x.webp") exists under `public/`. */
export function publicFileExists(src: string): boolean {
  const clean = src.split(/[?#]/)[0]
  return existsSync(path.join(ROOT, "public", ...clean.split("/").filter(Boolean)))
}

/** True if the localized route `app/[lang]/<routePath>/page.tsx` exists. */
export function localizedRouteExists(routePath: string): boolean {
  return existsSync(path.join(ROOT, "app", "[lang]", ...routePath.split("/"), "page.tsx"))
}

export function isNonEmpty(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0
}

export function duplicates<T>(values: T[]): T[] {
  return [...new Set(values.filter((v, i) => values.indexOf(v) !== i))]
}
