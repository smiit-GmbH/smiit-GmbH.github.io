import { expect, test } from "@playwright/test"

// Guard against animations that keep running when nobody can see them (e.g. an
// infinite loop on an off-screen or display:none element). Such loops are
// invisible in screenshots but burn CPU and battery for as long as the page is open.
// After the entrance animations have finished, a page scrolled to the top should
// stop touching the DOM.

const pages = [
  "/de/",
  "/de/about/",
  "/de/services/analytics/",
  "/de/services/apps/",
  "/de/services/strategy/",
  "/de/website/",
  "/de/products/smiit-analytics/",
]

for (const path of pages) {
  test(`idle page does not keep animating: ${path}`, async ({ page }) => {
    test.setTimeout(60_000)
    await page.addInitScript(() => {
      localStorage.setItem("smiit-consent-v1", "denied")
      const writes: string[] = []
      ;(window as unknown as { __writes: string[] }).__writes = writes
      const describe = (el: Element) => `${el.tagName.toLowerCase()}.${(el.getAttribute("class") ?? "").split(" ")[0]}`
      const setAttribute = Element.prototype.setAttribute
      Element.prototype.setAttribute = function (name: string, value: string) {
        writes.push(`${name} on ${describe(this)}`)
        return setAttribute.call(this, name, value)
      }
    })
    await page.goto(path)
    await page.waitForLoadState("load")
    await page.waitForTimeout(8_000) // entrance animations, count-ups, intro overlay

    await page.evaluate(() => ((window as unknown as { __writes: string[] }).__writes.length = 0))
    await page.waitForTimeout(2_000)
    const writes = await page.evaluate(() => (window as unknown as { __writes: string[] }).__writes)

    // A few incidental writes are fine; a running animation produces hundreds per second.
    const summary = [...new Set(writes)].slice(0, 5).join(", ")
    expect(writes.length, `DOM attribute writes while idle: ${summary}`).toBeLessThan(50)
  })
}
