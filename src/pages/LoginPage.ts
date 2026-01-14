import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async navigate() {
    await this.goto("/");
  }

  async login(username: string, password: string) {
    // Fill in credentials
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);

    // Click login
    await this.loginButton.click();
  }

  async verifyErrorMessage(message: string) {
    await expect(this.errorMessage).toContainText(message);
  }
}
