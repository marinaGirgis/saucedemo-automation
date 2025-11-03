import { Page, expect } from '@playwright/test';

/**
 * This classhandles the checkout process on Saucedemo:
 * 1. Enter user info
 * 2. Complete order
 * 3. Verify confirmation
 */
export class CheckoutPage {
  private readonly page: Page;

  // --- User Info Fields to fill out by user ---
  private readonly firstNameField = '[data-test="firstName"]';
  private readonly lastNameField = '[data-test="lastName"]';
  private readonly zipCodeField = '[data-test="postalCode"]';
  private readonly continueButton = '[data-test="continue"]';

  // --- Finish Step ---
  private readonly finishButton = '[data-test="finish"]';

  // --- Confirmation of order---
  private readonly confirmationHeader = '.complete-header';
  private readonly expectedConfirmationMessage = 'Thank you for your order!';

  constructor(page: Page) {
    this.page = page;
  }

  /** Fill user info and move to the overview page */
  async enterUserInfo(firstName: string, lastName: string, zipCode: string) {
    await this.page.fill(this.firstNameField, firstName);
    await this.page.fill(this.lastNameField, lastName);
    await this.page.fill(this.zipCodeField, zipCode);
    await this.page.click(this.continueButton);

    // Verify navigation to overview page
    await expect(this.page).toHaveURL(/.*checkout-step-two.html/);
  }

  /** To complete the checkout by clicking "Finish" */
  async finishOrder() {
    await this.page.click(this.finishButton);

    // this is to Verify navigation to confirmation page
    await expect(this.page).toHaveURL(/.*checkout-complete.html/);
  }

  /** to Verify if the order confirmation message is displayed */
  async checkConfirmationMessage() {
    await expect(this.page.locator(this.confirmationHeader))
      .toHaveText(this.expectedConfirmationMessage);
  }
}
