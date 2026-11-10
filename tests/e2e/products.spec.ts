import { test, expect } from "@playwright/test";

test.describe("Products", () => {
  test("products page lists categories", async ({ page }) => {
    await page.goto("/products");
    await expect(page.locator("h1")).toContainText(/Products/i);
  });

  test("can navigate to a category", async ({ page }) => {
    await page.goto("/products");
    // Click on first category card
    await page.locator("a[href^='/products/']").first().click();
    await expect(page).toHaveURL(/\/products\/.+/);
  });
});