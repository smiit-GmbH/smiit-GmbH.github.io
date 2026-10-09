import { expect, test, type Page } from "@playwright/test"
import { keyPages } from "../e2e/routes"

// Full-page screenshot of one page per template. Run via `npm run test:visual`
// (Docker) — never directly on the host, or fonts render differently.

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
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

/** Wait until every image (including lazy ones) and font has loaded. */
async function settle(page: Page) {
  await page.evaluate(async () => {
    const pending = [...document.images].filter((img) => !img.complete)
    pending.forEach((img) => (img.loading = "eager"))
    const loaded = Promise.all(
      pending.map(
        (img) =>
          new Promise((r) => {
            img.addEventListener("load", r, { once: true })
            img.addEventListener("error", r, { once: true })
          }),
      ),
    )
    await Promise.race([loaded, new Promise((r) => setTimeout(r, 15_000))])
    await document.fonts.ready
  })
  await page.waitForLoadState("networkidle")
  await page.waitForTimeout(1000)
}

for (const pagePath of keyPages) {
  const name = pagePath.replace(/^\/|\/$/g, "").replace(/\//g, "-") || "root"

  test(pagePath, async ({ page }) => {
    test.setTimeout(120_000)
    await page.goto(pagePath)
    await page.waitForLoadState("load")
    await settle(page)

    await expect(page).toHaveScreenshot(`${name}.png`, {
      fullPage: true,
      animations: "disabled",
      timeout: 30_000, // full-page shots of long pages take a while to become stable
      // Video frames, WebGL and Lottie canvases are never pixel-stable; components can
      // opt out explicitly with a data-visual-unstable attribute.
      mask: [page.locator("video, canvas, iframe, [data-visual-unstable]")],
    })
  })
}
