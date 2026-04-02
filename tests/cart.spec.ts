import {test, expect} from '@playwright/test';

test.describe('Shopping Cart', () => {

    //before each cart testm we need to be logged in
    //So beforeEach does the login steps automatically

    test.beforeEach(async ({page}) => {
        await page.goto('/');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        await expect(page).toHaveURL('/inventory.html');
    });

    // --- TEST 1: Add first item to cart ---
    test('should add first item to cart', async ({page}) => {
        // Click the "Add to cart" button for the first item
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
       
        //the cart badge (little number bubble) should be now "1"
        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('1');
    });

    // --- TEST 2: Bavigate to cart and verify item is there ---
    test('should navigate to cart and verify item is there', async ({page}) => {

        //Add an item
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

        //Click the cart icon to go to the cart page
        await page.click('.shopping_cart_link');

        //We should be now in the cart page
        await expect(page).toHaveURL('/cart.html');

        //the item name should be visible in the cart
        const cartItem = page.locator('.inventory_item_name');
        await expect(cartItem).toHaveText('Sauce Labs Backpack');
    });

    // --- TEST 3: Remove item from cart ---

    test('should be able to remove an item from the cart', async ({page}) => {

        //Add an item first
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

        await page.click('[data-test="remove-sauce-labs-backpack"]');

        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).not.toBeVisible
    });

    // --- TEST 4: Add multiple items and verify cart badge count ---

    test('should add multiple items and verify cart badge count', async ({page}) => {
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        await page.click('[data-test="add-to-cart-sauce-labs-bike-light"]');
        await page.click('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');

        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText('3');
    });

    // --- test 5: Complete checkout process of a single product ---

    test('should complete checkout process of a single product', async ({page}) => {
        //Add an item to the cart
        await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
        //Go to the cart
        await page.click('.shopping_cart_link');
        //Click the checkout button
        await page.click('.checkout_button');
        // Fill the checkout information
        await page.fill('#first-name', 'Vini');
        await page.fill('#last-name', 'Garcia');
        await page.fill('#postal-code', '12345');
        //Click the continue button
        await page.click('#continue');
        //Click the finish button
        await page.click('#finish');
        //Verify the order confirmation message is visible
        const purchaseConfirmation = page.locator('.complete-header');
        await expect(purchaseConfirmation).toHaveText('Thank you for your order!');
    });
});
