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

test.describe("desktop header dropdowns", () => {
  test.skip(({ isMobile }) => isMobile, "the mobile header uses the menu sheet instead")

  test.beforeEach(async ({ page }) => {
    await page.goto("/de/services/apps/")
    await page.waitForLoadState("load")
  })

  test("language switcher opens on hover and keeps the current page", async ({ page }) => {
    await page.getByRole("button", { name: "Language selection" }).hover()
    await page.getByRole("button", { name: "English" }).click()
    await expect(page).toHaveURL(/\/en\/services\/apps\/$/)
  })

  test("language switcher works with the keyboard", async ({ page }) => {
    const trigger = page.getByRole("button", { name: "Language selection" })
    await trigger.focus()
    await page.keyboard.press("Enter")
    await expect(trigger).toHaveAttribute("aria-expanded", "true")

    await page.keyboard.press("Escape")
    await expect(trigger).toHaveAttribute("aria-expanded", "false")
    await expect(trigger).toBeFocused()

    await page.keyboard.press("Enter")
    await expect(page.getByRole("button", { name: "English" })).toBeVisible() // wait for the fade-in
    await page.keyboard.press("Tab") // Deutsch
    await page.keyboard.press("Tab") // English
    await page.keyboard.press("Enter")
    await expect(page).toHaveURL(/\/en\/services\/apps\/$/)
  })

  test("menus open on tap (touch screens at desktop width)", async ({ browser }) => {
    const context = await browser.newContext({ hasTouch: true, viewport: { width: 1280, height: 800 } })
    const page = await context.newPage()
    await page.goto("/de/services/apps/")
    await page.waitForLoadState("load")

    const services = page.getByRole("button", { name: "Dienstleistungen" })
    await services.tap()
    await expect(services).toHaveAttribute("aria-expanded", "true")
    await expect(page.getByRole("link", { name: "Datenanalyse" }).first()).toBeVisible()

    // Tapping elsewhere closes it again.
    await page.locator("main").tap({ position: { x: 10, y: 400 } })
    await expect(services).toHaveAttribute("aria-expanded", "false")
    await context.close()
  })
})
