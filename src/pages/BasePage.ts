import { Page, Locator, expect } from '@playwright/test';
import { ConfigReader } from '../utils/ConfigReader';

export class BasePage {

    constructor(protected page: Page) {}

    async openApplication(url?: string): Promise<void> {
    const appUrl = url ?? ConfigReader.get("BASE_URL");
    console.log("Opening :", appUrl);
    await this.page.goto(appUrl, {
        waitUntil: "domcontentloaded"
    });
    console.log("After goto :", this.page.url());
}

    async click(locator: string): Promise<void> {
    await this.page.locator(locator).waitFor({
        state: "visible"
    });

    await this.page.locator(locator).click();

}
    async fill(locator: string, value: string): Promise<void> {
        await this.page.locator(locator).fill(value);
    }

    async type(locator: string, value: string): Promise<void> {
        await this.page.locator(locator).type(value);
    }

    async getText(locator: string): Promise<string> {
        return (await this.page.locator(locator).textContent()) ?? "";
    }

    async isVisible(locator: string): Promise<boolean> {
        return await this.page.locator(locator).isVisible();
    }

    async hover(locator: string): Promise<void> {
        await this.page.locator(locator).hover();
    }

    async scrollIntoView(locator: string): Promise<void> {
        await this.page.locator(locator).scrollIntoViewIfNeeded();
    }

    async waitForVisible(locator: string): Promise<void> {
        await this.page.locator(locator).waitFor({
            state: 'visible'
        });
    }

    async selectDropdown(locator: string, value: string): Promise<void> {
        await this.page.locator(locator).selectOption(value);
    }

    async verifyUrl(expected: RegExp): Promise<void> {
        await expect(this.page).toHaveURL(expected);
    }
}