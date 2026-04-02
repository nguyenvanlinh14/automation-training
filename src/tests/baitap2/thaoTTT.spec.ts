// Thảo TTT
import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  // Login
  await page.goto("https://www.saucedemo.com/");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  // Add sản phẩm
  await page
    .locator(".inventory_item")
    .filter({ has: page.getByText("Sauce Labs Backpack") })
    .getByRole("button", { name: /add to cart/i })
    .click();

  await page
    .locator(".inventory_item")
    .filter({ has: page.getByText("Sauce Labs Bolt T-Shirt") })
    .getByRole("button", { name: /add to cart/i })
    .click();

  // Vào cart
  await page.locator('[data-test="shopping-cart-link"]').click();

  // ===== LẤY DATA =====
  const cartNames = await page
    .locator(".inventory_item_name")
    .allTextContents();
  const cartPrices = await page
    .locator(".inventory_item_price")
    .allTextContents();
  const cartQty = await page.locator(".cart_quantity").allTextContents();

  // Checkout
  await page.getByRole("button", { name: "Checkout" }).click();
  await page.getByPlaceholder("First Name").fill("Mike");
  await page.getByPlaceholder("Last Name").fill("Brown");
  await page.getByPlaceholder("Zip/Postal Code").fill("67890");
  await page.getByRole("button", { name: "Continue" }).click();

  // ===== SO SÁNH =====
  expect(page.locator(".inventory_item_name")).toHaveText(cartNames);
  expect(page.locator(".inventory_item_price")).toHaveText(cartPrices);
  expect(page.locator(".cart_quantity")).toHaveText(cartQty);

  // Finish
  await page.getByRole("button", { name: "Finish" }).click();
});
