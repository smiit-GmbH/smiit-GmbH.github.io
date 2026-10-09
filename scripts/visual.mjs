// Runs the visual regression tests inside the official Playwright Docker image,
// so screenshots render identically on every machine and in CI (fonts and
// anti-aliasing differ between Windows, macOS and Linux).
//
//   node scripts/visual.mjs            compare against the committed screenshots
//   node scripts/visual.mjs --update   re-record the screenshots
//   (further arguments are passed to `playwright test`, e.g. -g "de/blog")
//
// Requires Docker and a fresh `npm run build` (the tests serve `out/`).
import { spawnSync } from "node:child_process"
import fs from "node:fs"
import { createRequire } from "node:module"

const require = createRequire(import.meta.url)
const playwrightVersion = require("@playwright/test/package.json").version
const serveVersion = require("serve/package.json").version
const image = `mcr.microsoft.com/playwright:v${playwrightVersion}-noble`

if (!fs.existsSync("out")) {
  console.error('No build output in out/ — run "npm run build" first.')
  process.exit(1)
}

const update = process.argv.includes("--update")
const extra = process.argv.slice(2).filter((a) => a !== "--update")

function docker(args, { capture = false } = {}) {
  const r = spawnSync("docker", args, { stdio: capture ? ["ignore", "pipe", "inherit"] : "inherit", encoding: "utf8" })
  if (r.error) throw r.error
  return r
}

// No bind mounts: they are very slow on Windows/macOS. Inputs are copied in with
// `docker cp`, the container installs just the two packages it needs, and only
// test output (plus new screenshots with --update) is copied back.
const script = `
set -e
cd /tmp
npm init -y >/dev/null
npm install --no-save --no-audit --no-fund --loglevel=error @playwright/test@${playwrightVersion} serve@${serveVersion}
exec npx playwright test --project=visual-desktop --project=visual-mobile --workers=2 "$@"
`
const create = docker(
  [
    "create",
    "--ipc=host",
    "-e",
    "CI",
    "-w",
    "/tmp",
    image,
    "sh",
    "-c",
    script,
    "visual",
    ...(update ? ["--update-snapshots"] : []),
    ...extra,
  ],
  { capture: true },
)
const id = create.stdout.trim()
if (create.status !== 0 || !id) process.exit(create.status ?? 1)

let status = 1
try {
  for (const path of ["out", "tests", "playwright.config.ts"]) {
    if (docker(["cp", path, `${id}:/tmp/${path}`]).status !== 0) throw new Error(`docker cp ${path} failed`)
  }
  console.log(`> playwright test (visual) in ${image} ${update ? "--update-snapshots " : ""}${extra.join(" ")}`)
  status = docker(["start", "--attach", id]).status ?? 1

  fs.rmSync("test-results", { recursive: true, force: true })
  docker(["cp", `${id}:/tmp/test-results`, "test-results"], { capture: true })
  if (update) {
    fs.rmSync("tests/visual/__screenshots__", { recursive: true, force: true })
    docker(["cp", `${id}:/tmp/tests/visual/__screenshots__`, "tests/visual/__screenshots__"])
  }
} finally {
  docker(["rm", "--force", id], { capture: true })
}
process.exit(status)
