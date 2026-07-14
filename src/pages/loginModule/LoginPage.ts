import { Page } from "@playwright/test";
import { BasePage } from "../BasePage";
import { ConfigReader } from "../../utils/ConfigReader";

export class LoginPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    private username = "//input[@id='username']";
    private password = "//input[@id='password']";
    private loginBtn = "//button[contains(.,'Login')]";

    private menu = "//span[contains(.,'menu_open')]";
    private locationDropDown = "//span[contains(.,'keyboard_arrow_down')]";

    async loginToApplication() {

        await this.fill(this.username, ConfigReader.get("APP_USERNAME"));

        await this.fill(this.password, ConfigReader.get("APP_PASSWORD"));

        await this.click(this.loginBtn);

        await this.page.waitForLoadState("networkidle");

        await this.click(this.menu);

        await this.selectLocation(ConfigReader.get("LOCATION"));

    }

   async selectLocation(location: string) {
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(2000);

    
    const currentLocation = (
        await this.page
            .locator("//div[contains(@class,'MuiBox-root')]//p[contains(@class,'MuiTypography-body2')]")
            .first()
            .textContent()
    )?.trim();

    console.log("Current :", currentLocation);
    console.log("Expected:", location);

    
    if (currentLocation === location) {
        console.log("Location already selected.");
        return;

    }
    console.log("Changing Location...");
  
    
    await this.page.locator(this.locationDropDown).click();
    await this.page
        .locator(`//li//p[normalize-space()='${location}']`)
        .click();
    await this.page.waitForLoadState("networkidle");
    console.log("Location Changed");

}
}