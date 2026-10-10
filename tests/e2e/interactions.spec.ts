import { expect, test } from "@playwright/test"

// The interactive client islands on otherwise server-rendered pages.

test.describe("blog post", () => {
  const post = "/de/blog/mlops-with-microsoft-azure/"

  test("a citation reveals the collapsed sources and scrolls to the entry", async ({ page }) => {
    await page.goto(post)
    await page.waitForLoadState("load")

    // Sources beyond the first six start collapsed.
    const late = page
      .locator("sup a[href^='#ref-']")
      .filter({ hasText: /\[(?:[7-9]|\d{2,})\]/ })
      .first()
    const n = Number((await late.textContent())!.replace(/\D/g, ""))
    const entry = page.locator(`#ref-${n}`)
    await expect(entry).toBeHidden()

    await late.click()
    await expect(entry).toBeVisible()
    await expect(entry).toBeInViewport()
  })

  test("'more sources' expands the full list", async ({ page }) => {
    await page.goto(post)
    await page.waitForLoadState("load")
    const more = page.getByRole("button", { name: /weitere Quellen anzeigen/ })
    await more.scrollIntoViewIfNeeded()
    await more.click()
    await expect(more).toBeHidden()
    await expect(page.locator("li[id^='ref-']:visible")).toHaveCount(await page.locator("li[id^='ref-']").count())
  })

  test("file tree folders toggle", async ({ page }) => {
    await page.goto(post)
    await page.waitForLoadState("load")
    const folder = page.locator("article button[aria-expanded]").first()
    await folder.scrollIntoViewIfNeeded()
    const before = await folder.getAttribute("aria-expanded")
    await folder.click()
    await expect(folder).toHaveAttribute("aria-expanded", before === "true" ? "false" : "true")
  })

  test("desktop table of contents highlights the current section", async ({ page, isMobile }) => {
    test.skip(isMobile, "the sticky TOC is desktop-only")
    await page.goto(post)
    await page.waitForLoadState("load")
    await page.locator("#abschnitt-3").scrollIntoViewIfNeeded()
    const toc = page.locator("aside nav")
    await expect(toc.locator("button[aria-current='true']")).toHaveCount(1)
    await expect(toc.locator("button[aria-current='true']")).not.toHaveText(
      (await toc.locator("button").first().textContent()) ?? "",
    )
  })
})

test.describe("glossary search", () => {
  test("finds terms, handles no results and resets", async ({ page }) => {
    await page.goto("/de/glossary/")
    await page.waitForLoadState("load")
    const search = page.getByRole("searchbox")

    await search.fill("power")
    await expect(page.getByRole("heading", { name: /Treffer/ })).toBeVisible()
    await expect(page.locator("#cluster-analytics")).toHaveCount(0)

    // Synonyms widen the search beyond names and definitions.
    await search.fill("lakehouse")
    await expect(page.getByRole("heading", { name: /[1-9]\d* Treffer/ })).toBeVisible()

    await search.fill("xyzxyz")
    await expect(page.getByText("Keine Begriffe gefunden.")).toBeVisible()

    await page.getByRole("button", { name: "Zurücksetzen" }).first().click()
    await expect(search).toHaveValue("")
    await expect(page.locator("#cluster-analytics")).toBeVisible()
  })
})

test("footer 'cookie settings' re-opens the consent banner", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("smiit-consent-v1", "denied"))
  await page.goto("/de/")
  await page.waitForLoadState("load")
  const banner = page.getByRole("dialog", { name: "Cookie-Einwilligung" })
  await expect(banner).toHaveCount(0)
  await page.getByRole("button", { name: "Cookie-Einstellungen" }).click()
  await expect(banner).toBeVisible()
})
