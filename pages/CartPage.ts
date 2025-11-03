import { Page, expect } from '@playwright/test';

/**
 * This class Represents the Cart Page of the Saucedemo website.
 * The class contains all actions and verifications related to the shopping cart.
 */
export class CartPage {
  readonly page: Page;

  // Main button used to continue to checkout
  private readonly checkoutButton = '[data-test="checkout"]';

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Helper: Returns the locator for a product name within the cart
   * @param productName - The name of the product to find.
   */
  private getProductNameSelector(productName: string): string {
    return `.inventory_item_name:has-text("${productName}")`;
  }

  /**
   * Helper: Returns the locator for the "Remove" button of a specific product.
   * @param productName - The name of the product whose remove button should be clicked.
   */
  private getRemoveButtonSelector(productName: string): string {
    return `div.cart_item:has-text("${productName}") >> button:has-text("Remove")`;
  }

  /**
   * This method Moves the user from the Cart page to the Checkout Information page.
   */
  async continueToCheckout() {
    await this.page.click(this.checkoutButton);
    await expect(this.page).toHaveURL(/.*checkout-step-one.html/);
  }

  /**
   * To Confirm that a specific product is visible in the cart.
   * @param productName - The name of the product to verify.
   */
  async verifyProductIsPresent(productName: string) {
    const selector = this.getProductNameSelector(productName);
    await expect(this.page.locator(selector)).toBeVisible();
  }

  /**
   * This method Removes a product from the cart by clicking its "Remove" button.
   * @param productName - The name of the product to remove.
   */
  async removeProductFromCart(productName: string) {
    const removeSelector = this.getRemoveButtonSelector(productName);
    await this.page.click(removeSelector);
  }

  /**
   * This is to check if a product is still listed in the cart.
   * @param productName - The name of the product to check.
   * @returns true if the product is still in the cart; false otherwise.
   */
  async isProductInCart(productName: string): Promise<boolean> {
    const productLocator = this.page.locator(this.getProductNameSelector(productName));
    return (await productLocator.count()) > 0;
  }
}
