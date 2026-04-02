import { Page } from "@playwright/test";

//This class represents everything about the Checkout Page,
export class CheckoutPage {
    constructor(private page: Page) {}

    //Selectors from the checkout page
    private firstNameInput = '#first-name';
    private lastNameInput = '#last-name';
    private postalCodeInput = '#postal-code'
    private continueButton = '#continue';
    private finishButton = '#finish';

    //Actions - reusable methods
    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.page.fill(this.firstNameInput, firstName);
        await this.page.fill(this.lastNameInput, lastName);
        await this.page.fill(this.postalCodeInput, postalCode);
    }
    
    async clickContinue() {
        await this.page.click(this.continueButton);
    }

    async clickFinish() {
        await this.page.click(this.finishButton);
    }
}
