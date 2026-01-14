import { test, expect } from "../utils/fixtures";
import { LoginPage } from "../pages/LoginPage";

test.describe("Login Functionality", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test("should login successfully with valid credentials", async ({
    page,
    loginPage,
  }) => {
    await loginPage.login("standard_user", "secret_sauce");

    // Initial basic assertion just to verify we are logged in (URL change or element presence)
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test("should show error with invalid credentials", async ({ loginPage }) => {
    await loginPage.login("locked_out_user", "secret_sauce");
    await loginPage.verifyErrorMessage("Sorry, this user has been locked out.");
  });
});
