import { expect, test } from '../../fixtures/custom-fixtures';

test.describe('Cart Removal Scenario', () => {

  test('Scenario 5: Remove product from cart and verify cart count', async ({ loggedInPage, inventoryPage, cartPage }) => {
    const productName = 'Sauce Labs Backpack';

    // Step 1: Add product to cart
    await inventoryPage.addItemToCart(productName);
    await inventoryPage.checkCartCount(1);

    // Step 2: Go to the cart page
    await inventoryPage.goToShoppingCart();

    // Step 3: Remove product from cart
    await cartPage.removeProductFromCart(productName);

    // Step 4: Verifying the cart badge disappears
    const badgeVisible = await inventoryPage.isCartBadgeVisible();
    await expect(badgeVisible).toBeFalsy();

    // Step 5: Ensuring the product no longer exists in the cart
    const exists = await cartPage.isProductInCart(productName);
    await expect(exists).toBeFalsy();
  });

});
