// Sinh
import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  //lay thong tin san pham o trang gio hang
  const cartProductName = await page
    .locator(".inventory_item_name")
    .textContent();
  const cartProductPrice = await page
    .locator(".inventory_item_price")
    .textContent();
  const cartProductQty = await page.locator(".cart_quantity").textContent();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill("Mike");
  await page.locator('[data-test="lastName"]').fill("Brown");
  await page.locator('[data-test="postalCode"]').fill("67890");
  await page.locator('[data-test="continue"]').click();
  //lay thong tin san pham o trang overview
  const overviewProductName = await page
    .locator(".inventory_item_name")
    .textContent();
  const overviewProductPrice = await page
    .locator(".inventory_item_price")
    .textContent();
  const overviewProductQty = await page.locator(".cart_quantity").textContent();
  //so sanh
  expect(overviewProductName).toBe(cartProductName);
  expect(overviewProductPrice).toBe(cartProductPrice);
  expect(overviewProductQty).toBe(cartProductQty);
  console.log("overviewProductName:", overviewProductName);
  console.log("overviewProductPrice", overviewProductPrice);
  console.log("overviewProductQty", overviewProductQty);
  console.log("Cart product name:", cartProductName);
  console.log("cartProductPrice", cartProductPrice);
  console.log("cartProductQty", cartProductQty);
});
