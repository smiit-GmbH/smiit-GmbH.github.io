import { expect, test, type Page } from "@playwright/test"
import { keyPages } from "../e2e/routes"

// Full-page screenshot of one page per template. Run via `npm run test:visual`
// (Docker) — never directly on the host, or fonts render differently.

test.beforeEach(async ({ page }) => {
  // Virtual clock: time only advances when the test says so (see settle()).
  await page.clock.install({ time: new Date("2026-01-15T10:00:00Z") })

  await page.addInitScript(() => {
    // framer-motion runs opacity/transform animations through the Web Animations
    // API, which ticks on the compositor in real time and ignores the virtual
    // clock. Without it, framer-motion falls back to rAF-driven animations.
    Reflect.deleteProperty(Element.prototype, "animate")

    // Idle callbacks never fire: the about page loads its WebGL globe on idle, and
    // rendering it in software (no GPU in Docker) makes every virtual second very
    // expensive. The globe area is masked in the screenshot anyway.
    window.requestIdleCallback = (() => 0) as typeof window.requestIdleCallback

    // Pretend the visitor already answered the cookie banner.
    try {
      window.localStorage.setItem("smiit-consent-v1", "denied")
    } catch {}

    // Report every observed element as visible right away. Scroll-reveals (our
    // hooks and framer-motion's whileInView) then all end up in their final
    // state without scrolling — scrolling through the page is timing-dependent
    // and left random sections unrevealed.
    class AlwaysVisibleObserver {
      readonly root = null
      readonly rootMargin = "0px"
      readonly thresholds = [0]
      constructor(private callback: IntersectionObserverCallback) {}
      observe(target: Element) {
        const rect = target.getBoundingClientRect()
        const entry = {
          target,
          isIntersecting: true,
          intersectionRatio: 1,
          boundingClientRect: rect,
          intersectionRect: rect,
          rootBounds: null,
          time: performance.now(),
        } as IntersectionObserverEntry
        queueMicrotask(() => this.callback([entry], this as unknown as IntersectionObserver))
      }
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return []
      }
    }
    window.IntersectionObserver = AlwaysVisibleObserver as unknown as typeof IntersectionObserver
  })
})

/**
 * Bring the page into a deterministic state. The browser runs on a virtual clock,
 * so JS-driven animations (framer-motion loops, timers) advance by exactly the
 * same amount of time on every run, however busy the machine is.
 */
async function settle(page: Page) {
  // Load every image, including lazy ones. Network I/O runs in real time; the
  // virtual clock is stepped alongside so timer-driven code keeps going too.
  await page.evaluate(() => document.querySelectorAll("img").forEach((img) => (img.loading = "eager")))
  for (let i = 0; i < 60; i++) {
    const done = await page.evaluate(() => [...document.images].every((img) => img.complete))
    if (done) break
    await page.clock.runFor(250)
    await page.waitForTimeout(250)
  }
  await page.evaluate(() => document.fonts.ready)
  await page.waitForLoadState("networkidle")
  // Let entrance animations, intro overlays and count-ups finish in virtual time.
  await page.clock.runFor(8_000)
}

for (const pagePath of keyPages) {
  const name = pagePath.replace(/^\/|\/$/g, "").replace(/\//g, "-") || "root"

  test(pagePath, async ({ page }) => {
    test.setTimeout(240_000)
    await page.goto(pagePath)
    await page.waitForLoadState("load")
    await settle(page)

    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: true,
      animations: "disabled",
      timeout: 90_000, // full-page shots of long pages are slow to capture, especially under load
      // Video frames, WebGL and Lottie canvases are never pixel-stable; components can
      // opt out explicitly with a data-visual-unstable attribute.
      mask: [page.locator("video, canvas, iframe, [data-visual-unstable]")],
    })
  })
}
