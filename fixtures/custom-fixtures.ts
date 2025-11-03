// fixtures/custom-fixtures.ts
import { test as base, expect, Page } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { InventoryPage } from '../pages/InventoryPage';
import { LoginPage } from '../pages/LoginPage';

/**
 * To define types for the page objects we want to inject automatically
 */
type PageObjectFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

/**
 * this is to define types for the fixture that provides a pre-logged-in page
 */
type LoggedInFixture = {
  loggedInPage: { page: Page };
};

/**
 * for Extending Playwright's base test with our custom fixtures
 */
export const test = base.extend<PageObjectFixtures & LoggedInFixture>({
  // Page object fixtures
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  /**
   * Logged-in fixture:
   * Automatically performs a standard_user login for tests that request it
   */
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    // Navigate to login and perform login
    await loginPage.navigateToLogin();
    await loginPage.performLogin('standard_user', 'secret_sauce');

    // Optional: wait until inventory page is visible
    await expect(page).toHaveURL(/.*inventory.html/);

    // Provide the logged-in page for tests
    await use({ page });
  },
});

/**
 * This is to re-export Playwright expect for cleaner imports in test files
 */
export { expect };
