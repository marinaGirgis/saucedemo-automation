import { Page, expect } from '@playwright/test';

/**
 * Represents the Inventory Page of Saucedemo.
 * Handles actions like adding products to the cart, navigating to the cart,
 * and checking the cart count/badge.
 */
export class InventoryPage {
  public readonly page: Page;

  // Locators
  private readonly cartBadge = '.shopping_cart_badge';
  private readonly cartIcon = '.shopping_cart_link';

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Helper: Generate the "Add to Cart" button selector for a specific product.
   * @param productName - The product to target.
   */
  private getProductCardSelector(productName: string): string {
    return `div.inventory_item:has-text("${productName}") >> button:has-text("Add to cart")`;
  }

  /**
   * I add a product to the cart by its name.
   * @param productName - Name of the product to add.
   */
  async addItemToCart(productName: string) {
    const selector = this.getProductCardSelector(productName);
    await this.page.click(selector);
  }

  /**
   * To Navigate to the shopping cart page.
   */
  async goToShoppingCart() {
    await this.page.click(this.cartIcon);
    await expect(this.page).toHaveURL(/.*cart.html/);
  }

  /**
   * To Check if the cart badge shows the expected count of items.
   * @param expectedCount - Number of items expected in the cart.
   */
  async checkCartCount(expectedCount: number) {
    const badge = this.page.locator(this.cartBadge);
    await expect(badge).toHaveText(String(expectedCount));
  }

  /**
   * To Check if the cart badge is visible.
   * Useful for verifying if the cart is empty or not.
   * @returns true if the badge exists, false otherwise.
   */
  async isCartBadgeVisible(): Promise<boolean> {
    const badge = this.page.locator(this.cartBadge);
    return await badge.count() > 0;
  }
}
