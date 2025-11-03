import { test } from '../../fixtures/custom-fixtures';

test.describe('Checkout Flow', () => {

  /**
   * Scenario 4: Complete checkout for a product and verify the confirmation message.
   * Automatically starts logged in using `loggedInPage`.
   */
  test('Complete checkout and confirm order', async ({ loggedInPage, inventoryPage, cartPage, checkoutPage }) => {
    const productName = 'Sauce Labs Backpack';

    // Step 1: Add product to cart and confirm cart badge
    await inventoryPage.addItemToCart(productName);
    await inventoryPage.checkCartCount(1);

    // Step 2: Navigating to the shopping cart
    await inventoryPage.goToShoppingCart();

    // Step 3: Moving from Cart to Checkout page
    await cartPage.continueToCheckout();

    // Step 4: Enter user info and finalize order
    await checkoutPage.enterUserInfo('John', 'Doe', '12345');
    await checkoutPage.finishOrder();

    // Step 5: Verifying the order confirmation message
    await checkoutPage.checkConfirmationMessage();
  });

});
