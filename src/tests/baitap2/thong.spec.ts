// Thông
import { test, expect } from "@playwright/test";

test("Xác minh thông tin giỏ hàng được giữ nguyên từ Cart đến Overview", async ({
  page,
}) => {
  // 1. Đăng nhập
  await page.goto("https://www.saucedemo.com/");

  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  // 2. Thêm 2 sản phẩm cụ thể
  const product1Name = "Sauce Labs Backpack";
  const product2Name = "Sauce Labs Bike Light";

  // Tìm container chứa sản phẩm dựa trên tên, sau đó nhấn nút Add to cart bên trong đó
  const product1Container = page
    .locator(".inventory_item")
    .filter({ hasText: product1Name });
  const product2Container = page
    .locator(".inventory_item")
    .filter({ hasText: product2Name });

  await product1Container.getByRole("button", { name: "Add to cart" }).click();
  await product2Container.getByRole("button", { name: "Add to cart" }).click();

  // Lưu lại giá sản phẩm để đối chiếu
  const cartItemsBefore = [
    {
      name: product1Name,
      price: await product1Container
        .locator(".inventory_item_price")
        .innerText(),
    },
    {
      name: product2Name,
      price: await product2Container
        .locator(".inventory_item_price")
        .innerText(),
    },
  ];

  // 3. Click icon giỏ hàng
  await page.locator(".shopping_cart_link").click();
  await expect(page).toHaveURL(/.*cart.html/);

  // 4. Click CHECKOUT
  await page.getByRole("button", { name: "Checkout" }).click();

  // 5. Nhập thông tin giao hàng
  await page.getByPlaceholder("First Name").fill("Mike");
  await page.getByPlaceholder("Last Name").fill("Brown");
  await page.getByPlaceholder("Zip/Postal Code").fill("67890");

  // 6. Click CONTINUE
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page).toHaveURL(/.*checkout-step-two.html/);

  // 7. So sánh thông tin trên trang Overview
  for (const item of cartItemsBefore) {
    // Tìm item container dựa trên tên sản phẩm
    const checkoutItem = page
      .locator(".cart_item")
      .filter({ hasText: item.name });

    // Kiểm tra tên hiển thị
    await expect(checkoutItem.getByText(item.name)).toBeVisible();

    // Kiểm tra giá khớp với lúc đầu
    await expect(checkoutItem.locator(".inventory_item_price")).toHaveText(
      item.price,
    );
  }

  // Kiểm tra số lượng sản phẩm
  const quantityLabels = page.locator(".cart_quantity");
  await expect(quantityLabels).toHaveCount(2);
});
