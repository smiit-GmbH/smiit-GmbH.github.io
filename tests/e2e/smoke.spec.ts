import { expect, test } from "@playwright/test"
import { sitemapPaths } from "./routes"

// Every page in the sitemap renders, has exactly one <h1>, a title and a
// canonical link, and throws no uncaught JavaScript errors while loading.
test.describe("all sitemap pages", () => {
  test.skip(({ isMobile }) => isMobile, "covered once on desktop")

  for (const pagePath of sitemapPaths()) {
    test(pagePath, async ({ page }) => {
      const errors: string[] = []
      page.on("pageerror", (err) => errors.push(err.message))

      const response = await page.goto(pagePath)
      expect(response?.status()).toBe(200)
      await expect(page.locator("h1")).toHaveCount(1)
      await expect(page).toHaveTitle(/\S/)
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1)
      await page.waitForLoadState("load")

      expect(errors).toEqual([])
    })
  }
})

test("root redirects to a locale", async ({ page }) => {
  await page.goto("/")
  await expect(page).toHaveURL(/\/(de|en)\/$/)
})

test("unknown route shows the 404 page", async ({ page }) => {
  const response = await page.goto("/de/does-not-exist/")
  expect(response?.status()).toBe(404)
})

test("language switcher keeps the current page", async ({ page, isMobile }) => {
  test.skip(isMobile, "switcher lives in the mobile menu sheet")
  await page.goto("/de/services/apps/")
  await page.waitForLoadState("load")
  // The dropdown opens on hover (desktop header).
  await page.getByRole("button", { name: "Language selection" }).first().hover()
  await page.getByRole("button", { name: "English" }).first().click()
  await expect(page).toHaveURL(/\/en\/services\/apps\/$/)
})
