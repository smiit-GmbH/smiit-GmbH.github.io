// Verifies that every internal link and asset referenced from the static export
// (`out/`) resolves to a file. Run after `npm run build`.
import fs from "node:fs"
import path from "node:path"

const outDir = path.resolve(process.argv[2] ?? "out")
if (!fs.existsSync(outDir)) {
  console.error(`No build output at ${outDir} — run "npm run build" first.`)
  process.exit(1)
}

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name)
    return e.isDirectory() ? walk(p) : [p]
  })
}

function resolves(urlPath) {
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0])
  const target = path.join(outDir, clean)
  if (!target.startsWith(outDir)) return false
  if (fs.existsSync(target) && fs.statSync(target).isFile()) return true
  return fs.existsSync(path.join(target, "index.html")) || fs.existsSync(`${target}.html`)
}

const attr = /\s(?:href|src|poster)="([^"]+)"|\ssrcSet="([^"]+)"/g
const broken = new Map()
let checked = 0

for (const file of walk(outDir).filter((f) => f.endsWith(".html"))) {
  const html = fs.readFileSync(file, "utf8")
  for (const m of html.matchAll(attr)) {
    const urls = m[1] ? [m[1]] : m[2].split(",").map((s) => s.trim().split(/\s+/)[0])
    for (const raw of urls) {
      const url = raw.replace(/&amp;/g, "&")
      if (!url.startsWith("/") || url.startsWith("//")) continue
      checked++
      if (!resolves(url)) {
        const page = "/" + path.relative(outDir, file).replace(/\\/g, "/")
        if (!broken.has(url)) broken.set(url, new Set())
        broken.get(url).add(page)
      }
    }
  }
}

if (broken.size > 0) {
  console.error(`Found ${broken.size} broken internal link(s):`)
  for (const [url, pages] of broken) {
    const list = [...pages]
    console.error(`  ${url}\n    on ${list.slice(0, 3).join(", ")}${list.length > 3 ? ` (+${list.length - 3} more)` : ""}`)
  }
  process.exit(1)
}
console.log(`All ${checked} internal links and assets resolve.`)
