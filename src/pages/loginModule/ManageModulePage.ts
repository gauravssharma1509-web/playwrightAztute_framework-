import { Page } from "@playwright/test";
import { BasePage } from "../BasePage";

export class ManageModulePage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    private manageBtn = "//span[normalize-space()='Manage']";
    private manageHeader = "//h1[normalize-space()='Manage']";
    private referralBtn = "//mat-expansion-panel-header[contains(.,'My Referrals')]";
    private newBtn = "//button[normalize-space()='New']";


    async navigateToNewReferral(): Promise<void> {

        console.log("Clicking Manage...");
        await this.click(this.manageBtn);

        console.log("Verifying Manage page...");
        await this.waitForVisible(this.manageHeader);

        console.log("Clicking My Referrals...");
        await this.click(this.referralBtn);

        console.log("Clicking New...");
        await this.click(this.newBtn);

        console.log("New Referral page reached.");
    }
}