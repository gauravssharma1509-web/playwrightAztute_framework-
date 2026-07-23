import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { faker } from '@faker-js/faker';

export class ReviewSettingPage extends BasePage {

    private selectedLocation: string = '';

    constructor(page: Page) {
        super(page);
    }



    private menuOpenBtn ="//div[@role='button' and contains(@class,'bg-accent')]" +"//span[normalize-space(text())='menu_open']";
    private locationDropdownArrow ="//span[contains(@class,'material-symbols-outlined')" + " and contains(text(),'keyboard_arrow_')]";
    private locationItem = (name: string) => `//li[contains(@class,'MuiListItem-root')]` + `//p[normalize-space(text())='${name}']`;
    private reviewsMenuDropdown = "//div[contains(@class,'cursor-pointer') and .//span[normalize-space(text())='Reviews']]";
    private reviewSettingsOption = "//a[normalize-space(text())='Review Settings']";
    private locationSearchInput = "//input[@id='input-with-icon-textfield']";
    private confirmationPopupTitle = "//h5[normalize-space()='Want to save the changes ?']";
    private confirmationPopupMessage = "//p[contains(.,'Are you sure you want to save the following changes')]";
    private saveChangesButton = "//div[@role='dialog']//div[@role='button' and normalize-space()='Save']";
    private leaveDiscardButton = "//div[@role='dialog']//div[@role='button' and normalize-space()='Leave & Discard']";
    private successToast = "//div[@role='alert'][contains(.,'Updated Review module settings successfully')]";
    private pageTitle = "//div[normalize-space(text())='Review Settings']";
    private pageSubtitle = "//h5[normalize-space(text())='Customize how and when review notification are sent']";
    private saveButton = "//button[normalize-space(text())='Save']";
    private socialNameValue = (name: string) => `//div[contains(@class,'card-body')]//div[normalize-space(text())='${name}']`;
    private socialNameIcon = "//div[contains(@class,'card-body')]//span[text()='add_location_alt']";
    private socialUrlInput = "//div[contains(@class,'card-body')]//input[@readonly]";
    private socialUrlIcon = "//div[.//div[contains(@class,'card-body')]//input[@readonly]]//span[text()='link']";
    private dailySectionLabel = "//h5[contains(text(), 'Emails to receive the patient feedback')]";
    private dailyInfoIcon = "//h5[contains(text(), 'Emails to receive the patient feedback')]//span[text()='info']";
    private dailyEmailChip = "//h5[contains(text(), 'Emails to receive the patient feedback')]" + "/following::div[contains(@class, 'rounded-full')][1]//span[contains(@class, 'text-sm')]";
    private directSectionLabel = "//h5[contains(text(), 'Send social media review link')]";
    private directInfoIcon = "//h5[contains(text(), 'Send social media review link')]//span[text()='info']";
    private directToggle = "//div[h5[contains(text(), 'Send social media review link')]]//input[@role='switch']";
    private directToggleLabel = "//div[h5[contains(text(), 'Send social media review link')]]//span[text()='Off']";
    private googleButton = "//button[.//span[text()='Google']]";
    private emailNotificationsLabel = "//h5[contains(text(), 'Send email notifications for new')]";
    private emailNotificationsInfoIcon = "//h5[contains(text(), 'Send email notifications for new')]//span[text()='info']";
    private emailNotificationsToggle = "//div[h5[contains(text(), 'Send email notifications for new')]]//input[@role='switch']";
    private emailNotificationsToggleLabel = "//div[h5[contains(text(), 'Send email notifications for new')]]//span[text()='Off']";
    private updatedReviewsEmailChip = "//h5[contains(text(), 'Send email notifications for new')]" + "/following::div[contains(@class, 'rounded-full')][1]//span[contains(@class, 'text-sm')]";
    private dailyEmailInput = "//h5[contains(text(), 'Emails to receive the patient feedback')]" + "/following::input[not(@role='switch')][1]";
    private updatedEmailInput = "//h5[contains(text(), 'Send email notifications for new')]" + "/following::input[not(@role='switch')][1]";
    private invalidEmailError = "//p[contains(text(),'Please enter a valid email address')]";
    private duplicateEmailError = "(//p[contains(text(),'This email is already added')])[1]";
    private dailyMaxEmailError = "//p[contains(text(),'Maximum 5 email addresses are allowed')]";
    private updatedMaxEmailError = "//p[contains(text(),'Maximum 3 email addresses are allowed')]";
    private cancelIcon = "//span[text()='cancel']";
    private emailChip = (email: string) => `//span[text()='${email}']`;
    private dailyTooltip = "//div[contains(@class,'MuiTooltip-tooltip')]//div[contains(text(),'These email addresses will receive a notification')]";
    private directTooltip = "//div[contains(@class,'MuiTooltip-tooltip')]//div[contains(text(),'When enabled, a direct link')]";
    private emailNotificationsTooltip = "//div[contains(@class,'MuiTooltip-tooltip')]//div[contains(text(),'Receive an email notification')]";
    private invalidValueError = "//span[normalize-space()='Invalid value']";
    private businessNameText = "//div[contains(@class,'card-body')]//span[contains(@class,'material-symbols-outlined')]/preceding-sibling::div";
    private settingsDropdown = "//span[normalize-space()='Settings']";
    private appointmentSettingsLink = "//a[contains(text(),'Appointment Settings')]";
    private reviewGoalsHeader = "//h5[normalize-space(text())='Review Goals']";
    private reviewGoalsSubtitle = "//h6[normalize-space(text())='Customize your review goal settings!']";
    private individualMonthlyGoalToggle = "//div[span[normalize-space(text())='Set Individual Monthly Goal']]//input[@role='switch']";
    private emailCancelButton = (email: string) => `(//span[translate(normalize-space(text()),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='${email.toLowerCase()}'])[1]/ancestor::div[contains(@class,'rounded-full')]//button[normalize-space()='cancel']`;
    private monthlyGoalInput = (monthLabel: string) => `//div[h5[normalize-space(.)='${monthLabel}']]//input`;
    private reviewsMenu = "//span[normalize-space()='Reviews']";
    private revieweSetting = "//a[normalize-space()='Review Settings']"



















    private async enableToggle(locator: string): Promise<void> {

        const toggle = this.page.locator(locator);

        if (!(await toggle.isChecked())) {
            await toggle.click({ force: true });
        }

        await expect(toggle).toBeChecked();
    }

    async openReviewSetting() {
        await this.waitForVisible(this.reviewsMenu);
        await this.click(this.reviewsMenu);
        await this.page.waitForTimeout(1000);
        await this.waitForVisible(this.revieweSetting);
        await this.click(this.revieweSetting);
        await this.page.waitForLoadState("networkidle");
        console.log("Review Settings Page Opened");

    }




    private async verifyElement(
        locator: string,
        description: string,
        assertionType: 'visible' | 'disabled' | 'notChecked' | 'hasValue',
        expectedValue?: string
    ): Promise<void> {
        const element = this.page.locator(locator);

        switch (assertionType) {
            case 'visible':
                await expect(element).toBeVisible();
                break;
            case 'disabled':
                await expect(element).toBeDisabled();
                break;
            case 'notChecked':
                await expect(element).not.toBeChecked();
                break;
            case 'hasValue':
                await expect(element).toHaveValue(expectedValue ?? '');
                break;
        }

        console.log(` Verified: ${description}`);
    }



    async verifyAllReviewSettingsUI(): Promise<void> {
        console.log("Starting full UI validation of Review Settings Page...");

        await this.verifyElement(this.pageTitle, "Page Title 'Review Settings' is visible.", 'visible');
        await this.verifyElement(this.pageSubtitle, "Page Subtitle is visible.", 'visible');
        await this.verifyElement(this.saveButton, "Save Button is visible.", 'visible');
        await this.verifyElement(this.saveButton, "Save Button is disabled.", 'disabled');

        await this.verifyElement(this.businessNameText, `Business Social Name is visible.`, 'visible');
        await this.verifyElement(this.socialNameIcon, "Business Social Name location icon is visible.", 'visible');
        const urlInput = this.page.locator(this.socialUrlInput);
        await expect(urlInput).toBeVisible();
        const urlValue = (await urlInput.inputValue())?.trim() || '';
        await expect(urlValue.length).toBeGreaterThan(0);
        console.log(`   Verified: Business Social URL input is present with value: "${urlValue}".`);
        await this.verifyElement(this.socialUrlIcon, "Business Social URL link icon is visible.", 'visible');

        await this.verifyElement(this.dailySectionLabel, "Daily feedback recipient section label is visible.", 'visible');
        await this.verifyElement(this.dailyInfoIcon, "Daily feedback info icon is visible.", 'visible');

        const dailyEmailLocator = this.page.locator(this.dailyEmailChip);
        await expect(dailyEmailLocator).toBeVisible();
        const dailyEmailText = (await dailyEmailLocator.textContent())?.trim() || '';
        await expect(dailyEmailText.length).toBeGreaterThan(0);
        console.log(`   Verified: Daily feedback email chip is visible containing email: "${dailyEmailText}".`);

        await this.verifyElement(this.directSectionLabel, "Send review link directly section label is visible.", 'visible');
        await this.verifyElement(this.directInfoIcon, "Send review link directly info icon is visible.", 'visible');
        await this.verifyElement(this.directToggle, "Send review link directly toggle is OFF.", 'notChecked');
        await this.verifyElement(this.directToggleLabel, "Send review link directly label displays 'Off'.", 'visible');
        await this.verifyElement(this.googleButton, "Google integration button is visible.", 'visible');
        await this.verifyElement(this.googleButton, "Google integration button is disabled.", 'disabled');

        await this.verifyElement(this.emailNotificationsLabel, "Send email notifications section label is visible.", 'visible');
        await this.verifyElement(this.emailNotificationsInfoIcon, "Send email notifications info icon is visible.", 'visible');
        await this.verifyElement(this.emailNotificationsToggle, "Send email notifications toggle is OFF.", 'notChecked');
        await this.verifyElement(this.emailNotificationsToggleLabel, "Send email notifications label displays 'Off'.", 'visible');

        const updatedEmailLocator = this.page.locator(this.updatedReviewsEmailChip);
        await expect(updatedEmailLocator).toBeVisible();
        const updatedEmailText = (await updatedEmailLocator.textContent())?.trim() || '';
        await expect(updatedEmailText.length).toBeGreaterThan(0);
        console.log(`   Verified: New reviews email recipient chip is visible containing email: "${updatedEmailText}".`);

        await this.verifyElement(this.reviewGoalsHeader, "Review Goals card header is visible.", 'visible');
        await this.verifyElement(this.reviewGoalsSubtitle, "Review Goals card description subtitle is visible.", 'visible');
        await this.verifyElement(this.individualMonthlyGoalToggle, "Set Individual Monthly Goal toggle is OFF.", 'notChecked');

        const previousMonths = [
            'Jan 26 (Previous)',
            'Feb 26 (Previous)',
            'Mar 26 (Previous)',
            'Apr 26 (Previous)',
            'May 26 (Previous)',
            'Jun 26 (Previous)'
        ];

        for (const month of previousMonths) {
            await this.verifyElement(
                this.monthlyGoalInput(month),
                `${month} input field is visible and contains value '0'.`,
                'hasValue',
                '0'
            );
        }

        const setGoalInput = this.page.locator(this.monthlyGoalInput('Set Goal *'));
        await expect(setGoalInput).toBeVisible();
        const setGoalValue = await setGoalInput.inputValue();
        await expect(setGoalValue.length).toBeGreaterThan(0);
        console.log(`  Verified: Set Goal * input field is visible with value "${setGoalValue}".`);

        console.log("Review Settings Page UI validation completed successfully!");
    }
    async verifySaveConfirmationPopup(): Promise<void> {
        console.log("Verifying Save Confirmation Popup...");

        await expect(this.page.locator(this.confirmationPopupTitle)).toBeVisible();
        await expect(this.page.locator(this.confirmationPopupMessage)).toBeVisible();
        await expect(this.page.locator(this.saveChangesButton)).toBeVisible();
        await expect(this.page.locator(this.leaveDiscardButton)).toBeVisible();

        console.log("  Verified: Save Confirmation Popup.");
    }


    async verifyReviewSettingsSavedSuccessfully(): Promise<void> {
        console.log("Verifying Success Toast...");

        await expect(this.page.locator(this.successToast)).toBeVisible();

        console.log("  Verified: Review Settings updated successfully.");
    }

    async verifyAllReviewSettingsElements(): Promise<void> {
        await this.verifyAllReviewSettingsUI();
        await this.toggleSetIndividualMonthlyGoalOn();
        await this.verifyFutureGoalInputsAndSaveEnabled();
        await this.toggleSocialMediaReviewLinkOn();
        await this.verifyGoogleButtonEnabled();
        await this.toggleEmailNotificationOn();
        await this.verifyEmailRecipientEnabled();
        await this.clickSaveButton();
        await this.verifySaveConfirmationPopup();
        await this.clickSaveChangesButton();
        await this.verifyReviewSettingsSavedSuccessfully();
    }

    async verifyAllReviewSettingsTooltips(): Promise<void> {
        await this.verifyDailyFeedbackTooltip();
        await this.verifyDirectReviewLinkTooltip();
        await this.verifyEmailNotificationsTooltip();
    }



    async toggleSetIndividualMonthlyGoalOn(): Promise<void> {

        console.log("Turning ON Individual Monthly Goal...");

        await this.enableToggle(this.individualMonthlyGoalToggle);
        console.log("   Toggled: 'Set Individual Monthly Goal' switch is checked.");
    }

    async verifyFutureGoalInputsAndSaveEnabled(): Promise<void> {
        console.log("Verifying future monthly goal inputs are enabled...");

        const futureMonths = [
            'Jul *',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];

        for (const month of futureMonths) {
            const inputLocator = this.page.locator(this.monthlyGoalInput(month));
            await expect(inputLocator).toBeEnabled();
            console.log(`   Verified: Future monthly input '${month}' is enabled.`);
        }

        console.log("Verifying Save button is enabled...");
        const saveBtnLocator = this.page.locator(this.saveButton);
        await expect(saveBtnLocator).toBeEnabled();
        console.log("  Verified: Save button is enabled.");
    }

    async toggleSocialMediaReviewLinkOn(): Promise<void> {

        console.log("Turning ON Social Media Review Link...");

        await this.enableToggle(this.directToggle);
        console.log(" 'Send social media review link' toggle is ON.");
    }

    async verifyGoogleButtonEnabled(): Promise<void> {

        console.log("Verifying Google button is enabled...");

        const googleBtn = this.page.locator(this.googleButton);

        await expect(googleBtn).toBeEnabled();

        console.log(" Google button is enabled.");
    }




    async toggleEmailNotificationOn(): Promise<void> {

        console.log("Turning ON Email Notification...");

        await this.enableToggle(this.emailNotificationsToggle);
        console.log("'Send email notifications' toggle is ON.");
    }

    async verifyEmailRecipientEnabled(): Promise<void> {

        console.log("Verifying Email recipient field is enabled...");

        const emailChip = this.page.locator(this.updatedReviewsEmailChip);

        await expect(emailChip).toBeEnabled();

        console.log(" Email recipient field is enabled.");
    }
    async clickSaveButton(): Promise<void> {
        console.log("Clicking Save button...");

        await this.click(this.saveButton);

        console.log("   Clicked: Save button.");
    }
    async clickSaveChangesButton(): Promise<void> {
        console.log("Clicking 'Save' button on confirmation popup...");

        await this.click(this.saveChangesButton);

        console.log("  Clicked: Save Changes button.");
    }


    async typeEmailAndSubmit(inputLocator: string, email: string): Promise<void> {
        await this.fill(inputLocator, email);
        await this.press(inputLocator, "Enter");
        await this.page.waitForTimeout(500);
    }

    async clearAllEmailChips(): Promise<void> {
        const cancelIcons = this.page.locator(this.cancelIcon);
        const count = await cancelIcons.count();
        for (let i = count - 1; i >= 0; i--) {
            await cancelIcons.nth(i).click({ force: true });
            await this.page.waitForTimeout(300);
        }
        console.log("Cleared all email chips.");
    }

    async verifyErrorMessage(errorLocator: string, description: string): Promise<void> {
        await expect(this.page.locator(errorLocator)).toBeVisible();
        console.log(`   Verified: ${description}`);
    }

    async verifyInputMaxLength(inputLocator: string, maxLength: number): Promise<void> {
        const testString = 'a'.repeat(maxLength + 1);
        const overflowChar = testString[maxLength];
        await this.fill(inputLocator, testString);

        const actualValue = await this.inputValue(inputLocator);

        console.log(`   Input value length: ${actualValue.length}`);
        console.log(`   Overflow character used: '${overflowChar}'`);
        console.log(`   Actual value in input: '${actualValue}'`);

        await expect(this.page.locator(inputLocator)).toHaveValue('a'.repeat(maxLength));
        console.log(`   Verified: Input accepts maximum ${maxLength} characters. Last character '${overflowChar}' was not added.`);
    }





    async addDailyEmail(email: string): Promise<void> {
        await this.typeEmailAndSubmit(this.dailyEmailInput, email);
    }

    async verifyDailyMaxEmailError(): Promise<void> {
        await this.verifyErrorMessage(this.dailyMaxEmailError, "Maximum 5 email error is displayed for Daily Notifications");
    }

    async verifyDailyDuplicateEmailError(): Promise<void> {
        await this.verifyErrorMessage(this.duplicateEmailError, "'This email is already added' error is displayed for Daily Notifications");
    }

    async verifyDailyInvalidEmailError(): Promise<void> {
        await this.verifyErrorMessage(this.invalidEmailError, "'Please enter a valid email address' error is displayed for Daily Notifications");
    }

    async verifyDailyEmailMaxLength(): Promise<void> {
        await this.verifyInputMaxLength(this.dailyEmailInput, 40);
    }

    async clearDailyEmailChips(): Promise<void> {
        await this.clearAllEmailChips();
    }

    async clearInput(inputLocator: string): Promise<void> {
        await this.fill(inputLocator, '');
        await this.page.waitForTimeout(300);
        console.log("Cleared input field.");
    }


    async removeSpecificEmailChip(email: string): Promise<void> {

        const cancelBtn = this.page.locator(this.emailCancelButton(email));
        if (await cancelBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
            await cancelBtn.click({ force: true });
            await this.page.waitForTimeout(500);
            console.log(`Removed email chip: ${email}`);
        } else {
            console.log(`Email chip '${email}' not found, skipping removal.`);
        }
    }

    async clearDailyInput(): Promise<void> {
        await this.clearInput(this.dailyEmailInput);
    }

    async clearUpdatedInput(): Promise<void> {
        await this.clearInput(this.updatedEmailInput);
    }



    async addUpdatedEmail(email: string): Promise<void> {
        await this.typeEmailAndSubmit(this.updatedEmailInput, email);
    }

    async verifyUpdatedMaxEmailError(): Promise<void> {
        await this.verifyErrorMessage(this.updatedMaxEmailError, "Maximum 3 email error is displayed for Email Notifications");
    }

    async verifyUpdatedDuplicateEmailError(): Promise<void> {
        await this.verifyErrorMessage(this.duplicateEmailError, "'This email is already added' error is displayed for Email Notifications");
    }

    async verifyUpdatedInvalidEmailError(): Promise<void> {
        await this.verifyErrorMessage(this.invalidEmailError, "'Please enter a valid email address' error is displayed for Email Notifications");
    }

    async verifyUpdatedEmailMaxLength(): Promise<void> {
        await this.verifyInputMaxLength(this.updatedEmailInput, 40);
    }

    async clearUpdatedEmailChips(): Promise<void> {
        await this.clearAllEmailChips();
    }

    async verifyDailyEmailValidation(): Promise<void> {
        await this.clearDailyEmailChips();
        const emails = await this.addMultipleDailyEmails(5);
        await this.addDailyEmail(faker.internet.email());
        await this.verifyDailyMaxEmailError();
        await this.clearDailyInput();
        await this.removeSpecificEmailChip(emails[3]);
        await this.removeSpecificEmailChip(emails[2]);
        await this.addDailyEmail(emails[0]);
        await this.verifyDailyDuplicateEmailError();
        await this.addDailyEmail('invalidemail');
        await this.verifyDailyInvalidEmailError();
        await this.verifyDailyEmailMaxLength();
    }

    async verifyUpdatedEmailValidation(): Promise<void> {
        await this.clearUpdatedEmailChips();
        const emails = await this.addMultipleUpdatedEmails(3);
        await this.addUpdatedEmail(faker.internet.email());
        await this.verifyUpdatedMaxEmailError();
        await this.clearUpdatedInput();
        await this.removeSpecificEmailChip(emails[2]);
        await this.removeSpecificEmailChip(emails[1]);
        await this.addUpdatedEmail(emails[0]);
        await this.verifyUpdatedDuplicateEmailError();
        await this.addUpdatedEmail('invalidemail');
        await this.verifyUpdatedInvalidEmailError();
        await this.verifyUpdatedEmailMaxLength();
    }





    async hoverAndVerifyTooltip(iconLocator: string, tooltipLocator: string, description: string): Promise<void> {
        console.log(`Hovering on info icon to verify tooltip: "${description}"...`);
        await this.page.mouse.move(0, 0);
        await this.page.waitForTimeout(500);
        await this.hover(iconLocator);
        await this.page.waitForTimeout(2000);
        await expect(this.page.locator(tooltipLocator)).toBeVisible({ timeout: 10000 });
        console.log(`   Verified: ${description}`);
    }

    async verifyDailyFeedbackTooltip(): Promise<void> {
        await this.hoverAndVerifyTooltip(this.dailyInfoIcon, this.dailyTooltip, "Daily feedback tooltip");
    }

    async verifyDirectReviewLinkTooltip(): Promise<void> {
        await this.hoverAndVerifyTooltip(this.directInfoIcon, this.directTooltip, "Direct review link tooltip");
    }

    async verifyEmailNotificationsTooltip(): Promise<void> {
        await this.hoverAndVerifyTooltip(this.emailNotificationsInfoIcon, this.emailNotificationsTooltip, "Email notifications tooltip");
    }


    async fillSetGoal(value: string): Promise<void> {
        await this.fill(this.monthlyGoalInput('Set Goal *'), value);
        await this.page.waitForTimeout(300);
    }

    async clearSetGoal(): Promise<void> {
        await this.clearInput(this.monthlyGoalInput('Set Goal *'));
    }

    async fillJulGoal(value: string): Promise<void> {
        await this.fill(this.monthlyGoalInput('Jul *'), value);
        await this.page.waitForTimeout(300);
    }

    async clearJulGoal(): Promise<void> {
        await this.clearInput(this.monthlyGoalInput('Jul *'));
    }

    async verifyGoalInputValidation(): Promise<void> {
        await this.fillSetGoalWithRandomNonNumeric();
        await this.verifyInvalidValueVisible();
        await this.verifySetGoalEmpty();
        await this.fillSetGoalWithRandomThreeDigit();
        await this.verifyInvalidValueNotVisible();
        await this.clearSetGoal();
        await this.verifyInvalidValueVisible();
        await this.toggleSetIndividualMonthlyGoalOn();
        await this.fillJulGoalWithRandomNonNumeric();
        await this.verifyInvalidValueVisible();
        await this.verifyJulGoalEmpty();
        await this.fillJulGoalWithRandomThreeDigit();
        await this.verifyInvalidValueNotVisible();
        await this.clearJulGoal();
        await this.verifyInvalidValueVisible();
    }

    async verifyInvalidValueVisible(): Promise<void> {
        await expect(this.page.locator(this.invalidValueError)).toBeVisible();
        console.log("   Verified: 'Invalid value' error is displayed.");
    }

    async verifyInvalidValueNotVisible(): Promise<void> {
        await expect(this.page.locator(this.invalidValueError)).not.toBeVisible();
        console.log("   Verified: 'Invalid value' error is NOT displayed.");
    }

    async verifySetGoalEmpty(): Promise<void> {
        await expect(this.page.locator(this.monthlyGoalInput('Set Goal *'))).toHaveValue('');
        console.log("   Verified: Set Goal input is empty.");
    }

    async verifyJulGoalEmpty(): Promise<void> {
        await expect(this.page.locator(this.monthlyGoalInput('Jul *'))).toHaveValue('');
        console.log("   Verified: Jul input is empty.");
    }


    async getBusinessSocialUrl(): Promise<string> {
        const url = await this.inputValue(this.socialUrlInput);
        console.log(`   Business Social URL: ${url}`);
        return url;
    }

    async getBusinessSocialName(): Promise<string> {
        const name = await this.getText(this.businessNameText);
        console.log(`   Business Social Name: ${name}`);
        return name;
    }

    async clickSettingsMenu(): Promise<void> {
        console.log("Clicking on 'Settings' menu dropdown in sidebar...");
        await this.page.locator(this.settingsDropdown).click();
    }

    async clickAppointmentSettings(): Promise<void> {
        console.log("Clicking on 'Appointment Settings' option...");
        await this.click(this.appointmentSettingsLink);
    }

    async verifyUrlAndNameMatches(copiedUrl: string, copiedName: string): Promise<void> {
        const currentUrl = await this.inputValue(this.socialUrlInput);
        console.log(`   Appointment Settings URL: ${currentUrl}`);
        console.log(`   Copied URL: ${copiedUrl}`);
        await expect(currentUrl).toContain(copiedUrl);
        console.log("   Verified: URL matches.");

        const currentName = await this.getText(this.businessNameText);
        console.log(`   Appointment Settings Name: ${currentName}`);
        console.log(`   Copied Name: ${copiedName}`);
        await expect(currentName).toContain(copiedName);
        console.log("   Verified: Business name matches.");
    }


    async addMultipleDailyEmails(count: number): Promise<string[]> {
        const emails = Array.from({ length: count }, () => faker.internet.email());
        for (const email of emails) {
            await this.addDailyEmail(email);
        }
        return emails;
    }

    async addMultipleUpdatedEmails(count: number): Promise<string[]> {
        const emails = Array.from({ length: count }, () => faker.internet.email());
        for (const email of emails) {
            await this.addUpdatedEmail(email);
        }
        return emails;
    }


    private randomNonNumericValue(): string {
        return faker.string.alpha(3).toUpperCase() + faker.string.symbol(1) + faker.string.alpha(2);
    }

    private randomThreeDigit(): string {
        return faker.number.int({ min: 100, max: 999 }).toString();
    }

    async fillSetGoalWithRandomNonNumeric(): Promise<void> {
        const value = this.randomNonNumericValue();
        console.log(`   Random non-numeric value: ${value}`);
        await this.fillSetGoal(value);
    }

    async fillJulGoalWithRandomNonNumeric(): Promise<void> {
        const value = this.randomNonNumericValue();
        console.log(`   Random non-numeric value: ${value}`);
        await this.fillJulGoal(value);
    }

    async fillSetGoalWithRandomThreeDigit(): Promise<void> {
        const value = this.randomThreeDigit();
        console.log(`   Random 3-digit value: ${value}`);
        await this.fillSetGoal(value);
    }

    async fillJulGoalWithRandomThreeDigit(): Promise<void> {
        const value = this.randomThreeDigit();
        console.log(`   Random 3-digit value: ${value}`);
        await this.fillJulGoal(value);
    }


    async verifyBusinessUrlOnAppointmentSettings(): Promise<void> {
        const copiedUrl = await this.getBusinessSocialUrl();
        const copiedName = await this.getBusinessSocialName();
        await this.clickSettingsMenu();
        await this.clickAppointmentSettings();
        await this.verifyUrlAndNameMatches(copiedUrl, copiedName);
    }
}
