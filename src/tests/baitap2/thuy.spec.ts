// Thuý
import { test, expect } from "@playwright/test";

test("Kiểm tra thông tin sản phẩm bằng User-facing locators", async ({
  page,
}) => {
  await page.goto("https://www.saucedemo.com/");

  // --- ĐĂNG NHẬP ---
  // Sử dụng getByPlaceholder để tìm field nhập liệu
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  // Sử dụng getByRole cho các thành phần mang tính tương tác
  await page.getByRole("button", { name: "Login" }).click();

  // --- GHI NHỚ THÔNG TIN (Màn hình Products) ---
  // Lấy tên sản phẩm bằng getByText
  const nameProd1 = await page.getByText("Sauce Labs Backpack").textContent();
  const nameProd2 = await page.getByText("Sauce Labs Bike Light").textContent();

  // Lấy giá tiền: Dùng locator().filter() để khoanh vùng sản phẩm cụ thể
  const priceProd1 = await page
    .locator(".inventory_item")
    .filter({ hasText: "Sauce Labs Backpack" })
    .locator(".inventory_item_price")
    .textContent();

  const priceProd2 = await page
    .locator(".inventory_item")
    .filter({ hasText: "Sauce Labs Bike Light" })
    .locator(".inventory_item_price")
    .textContent();

  // --- THÊM VÀO GIỎ & CHECKOUT ---
  await page.getByRole("button", { name: "Add to cart" }).first().click();
  await page.getByRole("button", { name: "Add to cart" }).first().click();

  // Click vào biểu tượng giỏ hàng (link)
  await page.locator(".shopping_cart_link").click();
  await page.getByRole("button", { name: "Checkout" }).click();

  // --- ĐIỀN THÔNG TIN ---
  await page.getByPlaceholder("First Name").fill("Mike");
  await page.getByPlaceholder("Last Name").fill("Brown");
  await page.getByPlaceholder("Zip/Postal Code").fill("67890");
  await page.getByRole("button", { name: "Continue" }).click();

  // --- SO SÁNH THÔNG TIN (Màn hình Overview) ---
  const checkoutName1 = await page
    .getByText("Sauce Labs Backpack")
    .textContent();
  const checkoutName2 = await page
    .getByText("Sauce Labs Bike Light")
    .textContent();

  // So sánh tên
  expect(checkoutName1).toBe(nameProd1);
  expect(checkoutName2).toBe(nameProd2);

  // Kiểm tra giá hiển thị có tồn tại trên màn hình không
  // Đảm bảo giá không phải null trước khi dùng getByText
  expect(priceProd1).not.toBeNull();
  expect(priceProd2).not.toBeNull();
  await expect(page.getByText(priceProd1!)).toBeVisible();
  await expect(page.getByText(priceProd2!)).toBeVisible();
});
