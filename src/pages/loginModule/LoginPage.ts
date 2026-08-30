import { Page } from "@playwright/test";
import { BasePage } from "../BasePage";
import { ConfigReader } from "../../utils/ConfigReader";

export class LoginPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    // Locators
    private switchBtn = "//a[@id='AbpTenantSwitchLink']";
    private switchTenantNameBtn = "//input[@id='Input_Name']";
    private saveBtn = "//span[normalize-space()='Save']";
    private username = "//input[@id='LoginInput_UserNameOrEmailAddress']";
    private password = "//input[@id='LoginInput_Password']";
    private loginBtn = "//a[@id='loginButton']";
    private submitBtn = "//button[normalize-space()='Login']";

    // Dashboard element
    private manageBtn = "//span[normalize-space()='Home']";


    async loginToApplication(): Promise<void> {

        console.log("========== LOGIN START ==========");

        // Initial Login
        console.log("Clicking initial Login button...");
        await this.click(this.loginBtn);

        await this.page.waitForLoadState("domcontentloaded");


        // Tenant Switch
        console.log("Clicking Tenant Switch...");
        await this.click(this.switchBtn);


        // Enter Tenant Name
        console.log("Entering Tenant Name...");
        await this.clearAndFill(
            this.switchTenantNameBtn,
            "Path community"
        );


        // Save Tenant
        console.log("Clicking Save button...");
        await this.click(this.saveBtn);

        await this.page.waitForLoadState("domcontentloaded");


        // Enter Username
        console.log("Entering Username...");
        await this.clearAndFill(
            this.username,
            ConfigReader.get("APP_USERNAME")
        );


        // Enter Password
        console.log("Entering Password...");
        await this.clearAndFill(
            this.password,
            ConfigReader.get("APP_PASSWORD")
        );


        // Submit Login
        console.log("Clicking Login button...");
        await this.click(this.submitBtn);


        // Wait until Dashboard is ready
        console.log("Waiting for Dashboard...");

        await this.page
            .locator(this.manageBtn)
            .waitFor({ state: "visible" });


        console.log("Login successful.");
        console.log("Dashboard loaded.");
        console.log("Current URL:", this.page.url());

        console.log("========== LOGIN END ==========");
    }
}