import { defineConfig, devices } from "@playwright/test"

const PORT = 4173

/**
 * All tests run against the static export in `out/` (run `npm run build`
 * first), served exactly as GitHub Pages would serve it.
 *
 * - desktop / mobile: functional + accessibility tests (`npm run test:e2e`)
 * - visual-*: screenshot comparisons, only run inside Docker (`npm run test:visual`)
 */
export default defineConfig({
  fullyParallel: true,
  // The pages run WebGL + long-running animations; more workers starve the CPU and cause timeouts.
  workers: process.env.CI ? 2 : 4,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
  },
  // Screenshots are always recorded on Linux (Docker), so no per-platform suffix.
  snapshotPathTemplate: "tests/visual/__screenshots__/{projectName}/{arg}{ext}",
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.001 },
  },
  projects: [
    { name: "desktop", testDir: "tests/e2e", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", testDir: "tests/e2e", use: { ...devices["Pixel 7"] } },
    {
      name: "visual-desktop",
      testDir: "tests/visual",
      use: { ...devices["Desktop Chrome"], contextOptions: { reducedMotion: "reduce" } },
    },
    {
      name: "visual-mobile",
      testDir: "tests/visual",
      use: { ...devices["Pixel 7"], contextOptions: { reducedMotion: "reduce" } },
    },
  ],
  webServer: {
    // SERVE_DIR lets the Docker runner serve a container-local copy (bind mounts are slow on Windows/macOS).
    command: `npx serve ${process.env.SERVE_DIR ?? "out"} -l ${PORT} --no-clipboard`,
    url: `http://localhost:${PORT}/de/`,
    timeout: 180_000,
    reuseExistingServer: !process.env.CI,
  },
})
