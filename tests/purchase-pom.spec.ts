import { expect, test } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { CheckoutPage } from "../pages/CheckoutPage";

// Before each test, the browser will navigate to the specified URL (baseURL from config) and we will be on the login page

test.describe('Complete purchase flow using Page Object Model', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });



    // --- TEST 1: Complete purchase flow using Page Object Model ---

    test('should complete purchase flow successfully', async ({ page }) => {
        // Step 1: Login
        const loginPage = new LoginPage(page);
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL('/inventory.html');    

        // Step 2: Add item to cart
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        //Step 2 Assertion
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('1');

        //Step 3: Go to cart
        await page.click('.shopping_cart_link');
        //Step 3 Assertion
        await expect(page).toHaveURL('/cart.html');

        //Step 4: Proceed to checkout
        await page.click('[data-test="checkout"]');
        //Step 4 Assertion
        await expect(page).toHaveURL('/checkout-step-one.html');

        //Step 5: Fill in checkout information and continue
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillCheckoutInformation('Vini', 'Garcia', '4031');
        await checkoutPage.clickContinue();
        //Step 5 Assertion
        await expect(page).toHaveURL('/checkout-step-two.html');

        //step 6: Finish checkout
        await checkoutPage.clickFinish();
        //Step 6 Assertion - we should be on the checkout complete page
        await expect(page).toHaveURL('/checkout-complete.html');
    });

    // --- TEST 2: Proceed to checkout with multiple items in cart ---

    test('should proceed to checkout with multiple items in cart', async ({ page }) => {
        // Step 1: Login
        const loginPage = new LoginPage(page);
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL('/inventory.html');

        // Step 2: Add multiple items to cart
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
        //Step 2 Assertion
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('2');
        //Step 3: Go to cart
        await page.click('.shopping_cart_link');
        //Step 3 Assertion
        await expect(page).toHaveURL('/cart.html');
        //Step 4: Proceed to checkout
        await page.click('[data-test="checkout"]');
        //Step 4 Assertion
        await expect(page).toHaveURL('/checkout-step-one.html');
    });
});

