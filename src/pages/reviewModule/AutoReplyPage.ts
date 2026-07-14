import { Page, expect } from "@playwright/test";
import { BasePage } from "../BasePage";
export class AutoReplyPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }

    private reviewsMenu = "//span[normalize-space()='Reviews']";
    private autoReplyMenu = "//a[normalize-space()='Auto Reply']";
    private addRuleBtn = "//button[.//span[text()='add']]";
    private ruleNameTxt = "//input[@placeholder='Auto reply demo 1']";
    private ruleNameError = "//p[contains(text(),'Rule name must be at least 2 characters')]";



    private addTemplateBtn = "(//button[.//span[text()='add']])[2]";
    private createBtn = "(//button[normalize-space()='Create'])[2]";
    private templateNameError = "//p[contains(text(),'Template name is required')]";
    private contentError ="//span[contains(text(),'Content is required')]";

    private templateNameTxt = "//input[@placeholder='Enter a template name']";
    private templateNameMinError = "//p[contains(text(),'Template name must be at least 2 characters')]";



async verifyTemplateRequiredValidation() {
    
    await this.click(this.addRuleBtn);
    await this.click(this.addTemplateBtn);
    await this.click(this.createBtn);
    await this.waitForVisible(this.templateNameError);
    await this.waitForVisible(this.contentError);
    const templateError = await this.getText(this.templateNameError);
    const contentError = await this.getText(this.contentError);
    console.log("Template Name Error :", templateError);
    console.log("Content Error :", contentError);
    expect(templateError.trim()).toBe("Template name is required");
    expect(contentError.trim()).toBe("Content is required");
}

async verifyTemplateNameMinValidation() {

    await this.click(this.addRuleBtn);
    await this.click(this.addTemplateBtn);
    await this.fill(this.templateNameTxt, "S");
    await this.page.keyboard.press("Tab");
    await this.waitForVisible(this.templateNameMinError);
    const error = await this.getText(this.templateNameMinError);
    console.log("Template Name Min Validation :", error);
    expect(error.trim()).toBe( "Template name must be at least 2 characters");
}
























    async openAutoReply() {
        await this.waitForVisible(this.reviewsMenu);
        await this.click(this.reviewsMenu);
        await this.page.waitForTimeout(1000);
        await this.waitForVisible(this.autoReplyMenu);
        await this.click(this.autoReplyMenu);
        await this.page.waitForLoadState("networkidle");
        console.log("Auto Reply Page Opened");

    }

    async verifyRuleNameMinValidation() {
        await this.click(this.addRuleBtn);
        await this.fill(this.ruleNameTxt, "f");
        await this.page.keyboard.press("Tab");
        await this.waitForVisible(this.ruleNameError);
        const error = await this.getText(this.ruleNameError);
        console.log("Validation Message :", error);
        expect(error?.trim()).toBe("Rule name must be at least 2 characters");

    }

    async verifyRuleNameMaxLength() {
        await this.click(this.addRuleBtn);
        const valueMax = "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXY";
        await this.fill(this.ruleNameTxt, valueMax);
        const actualValue = await this.page.locator(this.ruleNameTxt).inputValue();
        console.log("Entered Length :", valueMax.length);
        console.log("Actual Length :", actualValue.length);

        if (actualValue.length === 50) {
            console.log("Maximum length validation passed.");
        } else {
            throw new Error("Maximum length validation failed.");
        }
    }


}