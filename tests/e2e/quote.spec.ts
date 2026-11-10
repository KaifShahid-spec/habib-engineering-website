import { test, expect } from "@playwright/test";

test.describe("Quote Request Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact/request-quote");
  });

  test("shows quote form with items", async ({ page }) => {
    await expect(page.locator('input[name="company"]')).toBeVisible();
    await expect(page.locator('input[name="items.0.productName"]')).toBeVisible();
  });

  test("can add multiple items", async ({ page }) => {
    await page.click('text=Add Item');
    await expect(page.locator('input[name="items.1.productName"]')).toBeVisible();
  });
});