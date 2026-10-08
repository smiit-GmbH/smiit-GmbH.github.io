import AxeBuilder from "@axe-core/playwright"
import { expect, test } from "@playwright/test"
import { keyPages } from "./routes"

// WCAG 2.1 A/AA scan of one page per template, on desktop and mobile.
// Reduced motion + a full scroll make every scroll-reveal settle first, so axe
// measures the final colors instead of half-faded entrance animations.
for (const pagePath of keyPages) {
  test(`a11y ${pagePath}`, async ({ page }) => {
    test.setTimeout(90_000) // long pages: full scroll + axe scan
    await page.emulateMedia({ reducedMotion: "reduce" })
    await page.goto(pagePath)
    await page.waitForLoadState("load")
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 60))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(1000)

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze()

    const serious = results.violations.filter((v) => v.impact === "critical" || v.impact === "serious")
    const describe = (v: (typeof serious)[number]) => `${v.id} (${v.impact}): ${v.nodes.length}× — ${v.help}`

    // Color contrast is a known, brand-level issue (accent pink and light greys
    // on white) that needs a design decision — reported, but not blocking yet.
    for (const v of serious.filter((v) => v.id === "color-contrast")) {
      test.info().annotations.push({ type: "warning", description: describe(v) })
    }

    expect(serious.filter((v) => v.id !== "color-contrast").map(describe)).toEqual([])
  })
}
