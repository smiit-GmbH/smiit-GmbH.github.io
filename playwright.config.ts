import { defineConfig, devices } from "@playwright/test"

const PORT = 4173

/**
 * End-to-end tests run against the static export in `out/` (run `npm run build`
 * first), served exactly as GitHub Pages would serve it.
 */
export default defineConfig({
  testDir: "tests/e2e",
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
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command: `npx serve out -l ${PORT} --no-clipboard`,
    url: `http://localhost:${PORT}/de/`,
    reuseExistingServer: !process.env.CI,
  },
})
