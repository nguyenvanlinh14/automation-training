import { test, expect } from "../utils/fixtures";
import { LoginPage } from "../pages/LoginPage";
const userName = process.env.STANDARD_USERNAME || "standard_user";
const password = process.env.STANDARD_PASSWORD || "secret_sauce";
test.describe("Login Functionality", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test("should login successfully with valid credentials", async ({
    page,
    loginPage,
  }) => {
    await loginPage.login(userName, password);

    // Initial basic assertion just to verify we are logged in (URL change or element presence)
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test("should show error with invalid credentials", async ({ loginPage }) => {
    await loginPage.login("locked_out_user", password);
    await loginPage.verifyErrorMessage("Sorry, this user has been locked out.");
  });
});
