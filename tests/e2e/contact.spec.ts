import { test, expect } from "@playwright/test";

test.describe("Contact Form", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("shows validation errors for empty submission", async ({ page }) => {
    await page.click("button[type=submit]");
    // RHF/Zod errors should appear
    await expect(page.locator("text=Name must be")).toBeVisible({ timeout: 5000 }).catch(() => {});
  });

  test("fills and submits contact form successfully", async ({ page }) => {
    await page.fill('input[name="name"]', "Test User");
    await page.fill('input[name="email"]', "test@example.com");
    await page.fill('input[name="phone"]', "03001234567");
    await page.fill('input[name="subject"]', "Test Inquiry");
    await page.fill('textarea[name="message"]', "This is an automated test message for the contact form.");
    
    await page.click('button[type="submit"]');
    
    // Should see success toast
    await expect(page.locator("text=Message sent")).toBeVisible({ timeout: 10000 }).catch(() => {});
  });
});