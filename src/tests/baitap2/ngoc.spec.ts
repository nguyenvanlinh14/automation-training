// Ngọc
import { test, expect } from "@playwright/test";

test("TC_CO_03-..", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  // Đăng nhập bằng Placeholder và Role
  await page.getByPlaceholder("Username").fill("performance_glitch_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await page.waitForTimeout(10000);
  // Thêm sản phẩm 1: Lấy item có chứa text "Sauce Labs Backpack"
  const backpackItem = page
    .locator(".inventory_item")
    .filter({ has: page.getByText("Sauce Labs Backpack") });
  const productName = (await backpackItem
    .locator(".inventory_item_name")
    .textContent()) as string;
  const productPrice = (await backpackItem
    .locator(".inventory_item_price")
    .textContent()) as string;
  const productQuantity = "1";
  await backpackItem.getByRole("button", { name: "Add to cart" }).click();

  // Thêm sản phẩm 2: Lấy item có chứa text "Sauce Labs Bolt T-Shirt"
  const tshirtItem = page
    .locator(".inventory_item")
    .filter({ has: page.getByText("Sauce Labs Bolt T-Shirt") });
  const productName2 = (await tshirtItem
    .locator(".inventory_item_name")
    .textContent()) as string;
  const productPrice2 = (await tshirtItem
    .locator(".inventory_item_price")
    .textContent()) as string;
  const productQuantity2 = "1";
  await tshirtItem.getByRole("button", { name: "Add to cart" }).click();

  // Vào giỏ hàng và tới trang checkout
  await page.locator(".shopping_cart_link").click(); // Giữ locator này vì icon không có role hay text trực tiếp
  await page.getByRole("button", { name: "Checkout" }).click();

  // Điền form Checkout thông qua Placeholder
  await page.getByPlaceholder("First Name").fill("Mike");
  await page.getByPlaceholder("Last Name").fill("Brown");
  await page.getByPlaceholder("Zip/Postal Code").fill("67890");
  await page.getByRole("button", { name: "Continue" }).click();

  // Kiểm tra giỏ hàng - Sử dụng toContainText thay vì chỉ định đích danh item-name/item-price
  const cartItems = page.locator(".cart_item");
  await expect(cartItems.first()).toContainText(productName);
  await expect(cartItems.first()).toContainText(productPrice);
  await expect(cartItems.first().locator(".cart_quantity")).toHaveText(
    productQuantity,
  );

  await expect(cartItems.last()).toContainText(productName2);
  await expect(cartItems.last()).toContainText(productPrice2);
  await expect(cartItems.last().locator(".cart_quantity")).toHaveText(
    productQuantity2,
  );

  await page.getByRole("button", { name: "Finish" }).click();
});
