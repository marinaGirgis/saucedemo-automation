import { expect, test } from '../../fixtures/custom-fixtures';

test.describe('Login Functionality', () => {

  /**
   * Scenario 1: Standard user logs in successfully.
   */
  test('Successful login with standard user', async ({ loginPage }) => {
    // Go to login page and enter valid credentials
    await loginPage.navigateToLogin();
    await loginPage.performLogin('standard_user', 'secret_sauce');

    // Confirm the user lands on the inventory page
    await loginPage.verifySuccessfulLogin();
  });

  /**
   * Scenario 2: Locked-out user fails to log in.
   */
  test('Locked out user cannot log in', async ({ loginPage, page }) => {
    const expectedError = 'Epic sadface: Sorry, this user has been locked out.';

    // Attempt login with a locked-out user
    await loginPage.navigateToLogin();
    await loginPage.performLogin('locked_out_user', 'secret_sauce');

    // Verify the proper error message is shown
    const actualError = await loginPage.getDisplayedErrorMessage();
    await expect(actualError).toBe(expectedError);

    // Ensure user remains on the login page
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

});
