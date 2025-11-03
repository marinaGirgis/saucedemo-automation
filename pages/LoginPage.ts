import { Page, expect } from '@playwright/test';

/**
 * This classRepresents the login page of Saucedemo.
 * Handles navigation, login actions, and login validations.
 */
export class LoginPage {
  private readonly page: Page;

  // --- Locators of the login page ---
  private readonly usernameField = '[data-test="username"]';
  private readonly passwordField = '[data-test="password"]';
  private readonly loginButton = '[data-test="login-button"]';
  private readonly errorContainer = '[data-test="error"]';

  // Expected URL after successful login
  private readonly inventoryPath = '/inventory.html';

  constructor(page: Page) {
    this.page = page;
  }

  /** Navigating to the login page */
  async navigateToLogin() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  /**
   * Fill username and password, then click login
   * @param username - Username to login
   * @param password - Password to login
   */
  async performLogin(username: string, password: string) {
    await this.page.fill(this.usernameField, username);
    await this.page.fill(this.passwordField, password);
    await this.page.click(this.loginButton);
  }

  /** Verifying successful login by checking the URL */
  async verifySuccessfulLogin() {
    await expect(this.page).toHaveURL(new RegExp(this.inventoryPath));
  }

  /** Getting the error message displayed after a failed login */
  async getDisplayedErrorMessage(): Promise<string> {
    return await this.page.locator(this.errorContainer).innerText();
  }
}
