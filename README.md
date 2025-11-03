Saucedemo Automation Project:

Automated end-to-end tests for Saucedemo using Playwright and TypeScript, built with best practices like Page Object Model and reusable fixtures.

--> Setup

1- Install Node.js and npm.

2- Download or extract the project ZIP.

3- Open a terminal in the project root directory and run: 
   npm install


The tests are located in the `tests/e2e/` directory.
--> Running Tests
Command	Description:

- npx playwright test	
Run all tests in all browsers (15 tests total).

- npx playwright test --ui	
Run tests interactively.

- npx playwright test tests/login.spec.ts	
Run only login tests.

 - npx playwright test tests/remove-from-cart.spec.ts
	Run optional remove-from-cart test.

- npx playwright test --project=chromium	
Run all tests in Chrome only.

--> Test Scenarios

- Valid login → Redirect to inventory page.

- Invalid login → Show error, stay on login page.

- Add product to cart → Cart count updates, product visible.

- Checkout → Fill info, complete purchase, verify confirmation.

- Remove product from cart (optional) → Product removed, cart empty.

--> Notes

- POM & fixtures used for modularity.

- Selectors are robust ([data-test="..."]).

- Assertions check URLs, text, visibility, cart state.

- Parallel execution across browsers with HTML reports and trace collection. 

- After running tests, open `playwright-report/index.html` to view results in your browser.


--> Maintainers
- Marina Girgis