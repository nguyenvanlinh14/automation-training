// Hân
import { test, expect } from "@playwright/test";

test("TC_CO_03 - Verify cart information persistence", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  // ===== 1. Login =====
  await page
    .getByRole("textbox", { name: /username/i })
    .fill("performance_glitch_user");
  await page.getByRole("textbox", { name: /password/i }).fill("secret_sauce");
  await page.getByRole("button", { name: /login/i }).click();

  await page.waitForTimeout(2000);
  // Wait for Products page
  // await expect(page.getByText("Products")).toBeVisible();

  // ===== 2. Add specific products =====
  const productNames = ["Sauce Labs Backpack", "Sauce Labs Bike Light"];

  for (const name of productNames) {
    const product = page.locator(".inventory_item").filter({
      has: page.getByText(name),
    });

    await product.getByRole("button", { name: /add to cart/i }).click();
  }

  // ===== 3. Go to Cart =====
  await page.locator(".shopping_cart_link").click();

  // ===== 4. Verify items exist in Cart =====
  for (const name of productNames) {
    await expect(page.getByText(name)).toBeVisible();
  }

  // ===== 5. Capture data from CART =====
  const cartItems = await page.$$eval(".cart_item", (items) =>
    items.map((item) => ({
      name: item.querySelector(".inventory_item_name")?.textContent.trim(),
      price: item.querySelector(".inventory_item_price")?.textContent.trim(),
      quantity: item.querySelector(".cart_quantity")?.textContent.trim(),
    })),
  );

  // Verify number of items
  expect(cartItems.length).toBe(productNames.length);

  // ===== 6. Checkout =====
  await page.getByRole("button", { name: /checkout/i }).click();

  await page.getByRole("textbox", { name: /first name/i }).fill("Mike");
  await page.getByRole("textbox", { name: /last name/i }).fill("Brown");
  await page.getByRole("textbox", { name: /zip|postal/i }).fill("67890");

  await page.getByRole("button", { name: /continue/i }).click();

  // ===== 7. Verify Overview page =====
  await expect(page.getByText("Checkout: Overview")).toBeVisible();

  // ===== 8. Capture data from OVERVIEW =====
  const overviewItems = await page.$$eval(".cart_item", (items) =>
    items.map((item) => ({
      name: item.querySelector(".inventory_item_name")?.textContent.trim(),
      price: item.querySelector(".inventory_item_price")?.textContent.trim(),
      quantity: item.querySelector(".cart_quantity")?.textContent.trim(),
    })),
  );

  // ===== 9. ASSERT =====
  expect(overviewItems.length).toBe(cartItems.length);

  for (let i = 0; i < cartItems.length; i++) {
    expect(overviewItems[i].name).toBe(cartItems[i].name);
    expect(overviewItems[i].price).toBe(cartItems[i].price);
    expect(overviewItems[i].quantity).toBe(cartItems[i].quantity);
  }

  // ===== 10. Extra validation (UI level) =====
  for (const item of cartItems) {
    await expect(page.getByText(item.name ?? "")).toBeVisible();
    await expect(page.getByText(item.price ?? "")).toBeVisible();
  }
});
