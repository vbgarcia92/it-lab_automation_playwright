import { Page } from "@playwright/test";

//This class represents everything about the Login Page,

export class LoginPage {

    //Store the page reference in the class so we can use it in all methods
    constructor(private page: Page) {}

    //All selectors defined in ONE place
    private usernameInput = '#user-name';
    private passwordInput = '#password';
    private loginButton = '#login-button';
    private errorMessage = '[data-test="error"]';

    //Actions - reusable methods
    async login(username: string, password: string) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
    }
    
    async getErrorMessage() {
        return this.page.locator(this.errorMessage);
    }

}