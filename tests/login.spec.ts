import {test, expect} from '@playwright/test';

//test.describe() is used to group related tests together. It can be nested within other describe blocks as well. This helps in organizing tests and making the test output more readable.
test.describe('Login Page', () => {

    //This runs before EACH test in this group
    //We navigate to the home page fresh everytime
    test.beforeEach(async ({page}) => {
        await page.goto('/');
    });

    //----TEST 1: Successful Login----
    test('should allow user to login with valid credentials', async ({page}) => {
        // Fill in the username and password fields
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');

        //Click the login button
        await page.click('#login-button');

        //ASSERTION: Did we actually land on the products page?
        //expect() checks ifsomething is true./It it`s not, the test will fail.
        await expect(page).toHaveURL('/inventory.html');

        //Also check if the page title is visible
        await expect(page.locator('.title')).toHaveText('Products');
    });

    //----TEST 2: Unsuccessful Login----
    test('should show error message with invalid credentials', async ({page}) => {
        // Fill in the username and password fields with invalid data
        await page.fill('#user-name', 'invalid_user');
        await page.fill('#password', 'wrong_password');

        //Click the login button
        await page.click('#login-button');

        //ASSERTION: We expecte an error message to be visible
        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Username and password do not match any user');
    });

    //----TEST 3: Login with empty fields----
    test('should show error message when fields are empty', async ({page}) => {
        // Click the login button without filling in any fields
        await page.click('#login-button');

        //Assertion
        const errorMessage = page.locator('[data-test="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('Username is required');
    });
});