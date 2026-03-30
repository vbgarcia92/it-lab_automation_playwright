import { expect, test} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Page with Page Object Model', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('should login with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL('/inventory.html');
    });
});