import {test, expect} from '@playwright/test';

test.describe('Sorting Functionality', () => {
    
    // Before each sorting test, we need to be logged in and on the inventory page
    test.beforeEach(async ({page}) => {
        await page.goto('/');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
        await expect(page).toHaveURL('/inventory.html');
    });

    // --- TEST 1: Sort items by name (A to Z) ---
    test('should sort items by name from A to Z', async ({page}) => {
        // Click the sort dropdown and select "Name (A to Z)"
        await page.selectOption('.product_sort_container', 'az');
        // Get the list of item names after sorting
        const itemNames = await page.$$eval('.inventory_item_name', items => items.map(item => item.textContent));
        // Assert that the item names are in alphabetical order
        const sortedNames = [...itemNames].sort();
        expect(itemNames).toEqual(sortedNames);
    });

    // --- TEST 2: Sort items by name (Z to A) ---
    test('should sort items by name from Z to A', async ({page}) => {
        // Click the sort dropdown and select "Name (Z to A)"
        await page.selectOption('.product_sort_container', 'za');
        // Get the list of item names after sorting
        const itemNames = await page.$$eval('.inventory_item_name', items => items.map(item => item.textContent));
        // Assert that the item names are in reverse alphabetical order
        const sortedNames = [...itemNames].sort().reverse();
        expect(itemNames).toEqual(sortedNames);
    });

    // --- TEST 3: Sort items by price (low to high) ---
    test('should sort items by price from low to high', async ({page}) => {
        // Click the sort dropdown and select "Price (low to high)"
        await page.selectOption('.product_sort_container', 'lohi');
        // Get the list of item prices after sorting
        const itemPrices = await page.$$eval('.inventory_item_price', items => items.map(item => parseFloat(item.textContent.replace('$', ''))));
        // Assert that the item prices are in ascending order
        const sortedPrices = [...itemPrices].sort((a, b) => a - b);
        expect(itemPrices).toEqual(sortedPrices);
    });

    // --- TEST 4: Sort items by price (high to low) ---
    test('should sort items by price from high to low', async ({page}) => {
        
        // Click the sort dropdown and select "Price (high to low)"
        await page.selectOption('.product_sort_container', 'hilo');
        // Get the list of item prices after sorting
        const itemPrices = await page.$$eval('.inventory_item_price', items => items.map(item => parseFloat(item.textContent.replace('$', ''))));
        // Assert that the item prices are in descending order
        const sortedPrices = [...itemPrices].sort((a, b) => b - a);
        expect(itemPrices).toEqual(sortedPrices);
    });
});