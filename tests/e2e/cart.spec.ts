import { test, expect } from '../../fixtures/custom-fixtures';

test.describe('Product and Cart Scenarios', () => {

  /**
   * Scenario 3: Add a product to the cart and validate it.
   * Uses the `loggedInPage` fixture to start already logged in.
   */
  test('Add product to cart and verify', async ({ loggedInPage, inventoryPage, cartPage }) => {
    const productName = 'Sauce Labs Backpack';

    // Step 1: Add the item to the cart
    await inventoryPage.addItemToCart(productName);

    // Step 2: Check that the cart badge updates to 1
    await inventoryPage.checkCartCount(1);

    // Step 3: Navigate to the cart page
    await inventoryPage.goToShoppingCart();

    // Step 4: Confirm that the correct product is in the cart
    await cartPage.verifyProductIsPresent(productName);
  });

});
