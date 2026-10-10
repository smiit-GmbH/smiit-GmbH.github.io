import { strict as assert } from "node:assert"
import { readFileSync, readdirSync, statSync } from "node:fs"
import path from "node:path"
import { test } from "node:test"
import { ROOT, publicFileExists } from "./helpers"

// Social preview images: every `{ url: "/og/…", width, height }` declared in the
// code must point to an existing file whose real pixel size matches the
// declaration — crawlers use the declared size to lay out the preview card.

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = path.join(dir, name)
    if (statSync(p).isDirectory()) return sourceFiles(p)
    return /\.(ts|tsx)$/.test(name) ? [p] : []
  })
}

/** Width/height from a PNG's IHDR chunk. */
function pngSize(file: string): { width: number; height: number } {
  const buf = readFileSync(file)
  assert.equal(buf.toString("ascii", 12, 16), "IHDR", `${file} is not a PNG`)
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
}

const declaration = /url:\s*"(\/og\/[^"]+)",\s*width:\s*(\d+),\s*height:\s*(\d+)/g

const declared = ["app", "content", "lib"].flatMap((dir) =>
  sourceFiles(path.join(ROOT, dir)).flatMap((file) =>
    [...readFileSync(file, "utf8").matchAll(declaration)].map((m) => ({
      where: path.relative(ROOT, file),
      url: m[1],
      width: Number(m[2]),
      height: Number(m[3]),
    })),
  ),
)

test("OG image declarations are found", () => {
  assert.ok(declared.length > 10, `only ${declared.length} declarations found — did the format change?`)
})

for (const d of declared) {
  test(`OG image ${d.url} (${d.where}) exists with the declared size`, () => {
    assert.ok(publicFileExists(d.url), `${d.url} does not exist in public/`)
    const actual = pngSize(path.join(ROOT, "public", d.url))
    assert.deepEqual(actual, { width: d.width, height: d.height }, `${d.url}: declared ${d.width}×${d.height}`)
  })
}
