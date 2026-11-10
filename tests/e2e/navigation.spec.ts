import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("home page loads with hero", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Habib Engineering/i);
    await expect(page.locator("h1").first()).toContainText(/1985|Habib/i);
  });

  test("can navigate to About page", async ({ page }) => {
    await page.goto("/");
    await page.click("text=About");
    await expect(page).toHaveURL(/\/about/);
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("can navigate to Products page", async ({ page }) => {
    await page.goto("/products");
    await expect(page.locator("h1").first()).toContainText(/Products/i);
  });

  test("can navigate to Contact page", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator("form")).toBeVisible();
  });
});