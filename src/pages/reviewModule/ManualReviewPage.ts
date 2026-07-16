import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { faker } from '@faker-js/faker';

export class ManualReviewPage extends BasePage {

    private selectedLocation: string = '';

    constructor(page: Page) {
        super(page);
    }




















    // LOCATORS 

    private reviewsMenu = "//span[normalize-space()='Reviews']";
    private manualReviews = "//a[normalize-space()='Manual Reviews']"

    // Sorting Locators
    private nameSortButton = "//th//div[normalize-space()='Name']";
    private createdDateSortButton = "//th//div[normalize-space()='Created Date']";
    private updatedDateSortButton = "//th//div[normalize-space()='Updated Date']";
    private nameCells = "//td[1]//h5";
    private createdDateCells = "//td[2]//h5";
    private createdTimeCells = "//td[2]//p";
    private updatedDateCells = "//td[3]//h5";
    private updatedTimeCells = "//td[3]//p";

    // Records Per Page & Pagination Locators
    private viewDropdown = "//span[normalize-space()='View']/following::div[@role='combobox'][1]";
    private showingText = "//span[contains(normalize-space(),'Showing')]";
    private previousButton = "//button[@aria-label='Go to previous page']";
    private nextButton = "//button[@aria-label='Go to next page']";
    private tableRows = "//table//tbody//tr";

    // Delete Manual Review Locators
    private deleteIcon = "//button[.//span[text()='delete']]";
    private deleteDialog = "//div[@role='dialog']";
    private deleteDialogHeading = "//h4[contains(text(),'You want to delete this review?')]";
    private deleteDialogDeleteButton = "//div[@role='dialog']//button[normalize-space()='Delete']";
    private deleteDialogCancelButton = "//div[@role='dialog']//button[normalize-space()='Cancel']";
    private searchInput = "//input[@type='text' and @placeholder='Search here']";
    private successToast = "//div[@role='alert']//div[normalize-space()='Deleted successfully']";

    // Search Manual Review Locators
    private phoneCells = "//td[1]//p[1]";
    private emailCells = "//td[1]//p[2]";
    private noRecordsFound = "//h3[normalize-space()='No Records Found']";























    // ACTION 

// sorting listing page for manual reviews 



    async openManualReviews() {
        await this.waitForVisible(this.reviewsMenu);
        await this.click(this.reviewsMenu);
        await this.page.waitForTimeout(1000);
        await this.waitForVisible(this.manualReviews);
        await this.click(this.manualReviews);
        await this.page.waitForLoadState("networkidle");
        console.log("Manual Reviews Page Opened");
    }

    private async getCellTexts(locator: string): Promise<string[]> {
        const elements = this.page.locator(locator);
        const count = await elements.count();
        const texts: string[] = [];
        for (let i = 0; i < count; i++) {
            const text = (await elements.nth(i).textContent())?.trim() ?? '';
            texts.push(text);
        }
        return texts;
    }

    private verifyAscending(values: string[]): void {
        for (let i = 1; i < values.length; i++) {
            expect(values[i - 1].localeCompare(values[i])).toBeLessThanOrEqual(0);
        }
    }

    private verifyDescending(values: string[]): void {
        for (let i = 1; i < values.length; i++) {
            expect(values[i - 1].localeCompare(values[i])).toBeGreaterThanOrEqual(0);
        }
    }

    private parseDateTime(date: string, time: string): Date {
        const cleanTime = time.replace('at ', '');
        return new Date(`${date} ${cleanTime}`);
    }

    private verifyDateTimeAscending(dates: string[], times: string[]): void {
        for (let i = 1; i < dates.length; i++) {
            const prev = this.parseDateTime(dates[i - 1], times[i - 1]);
            const curr = this.parseDateTime(dates[i], times[i]);
            expect(prev.getTime()).toBeLessThanOrEqual(curr.getTime());
        }
    }

    private verifyDateTimeDescending(dates: string[], times: string[]): void {
        for (let i = 1; i < dates.length; i++) {
            const prev = this.parseDateTime(dates[i - 1], times[i - 1]);
            const curr = this.parseDateTime(dates[i], times[i]);
            expect(prev.getTime()).toBeGreaterThanOrEqual(curr.getTime());
        }
    }

    private isNamesAscending(names: string[]): boolean {
        for (let i = 1; i < names.length; i++) {
            if (names[i - 1].localeCompare(names[i]) > 0) return false;
        }
        return true;
    }

    private isNamesDescending(names: string[]): boolean {
        for (let i = 1; i < names.length; i++) {
            if (names[i - 1].localeCompare(names[i]) < 0) return false;
        }
        return true;
    }

    private isDateTimeAscending(dates: string[], times: string[]): boolean {
        for (let i = 1; i < dates.length; i++) {
            const prev = this.parseDateTime(dates[i - 1], times[i - 1]);
            const curr = this.parseDateTime(dates[i], times[i]);
            if (prev.getTime() > curr.getTime()) return false;
        }
        return true;
    }

    private isDateTimeDescending(dates: string[], times: string[]): boolean {
        for (let i = 1; i < dates.length; i++) {
            const prev = this.parseDateTime(dates[i - 1], times[i - 1]);
            const curr = this.parseDateTime(dates[i], times[i]);
            if (prev.getTime() < curr.getTime()) return false;
        }
        return true;
    }

    async verifyNameSortingAscending(): Promise<void> {
        await this.page.locator(this.nameSortButton).waitFor({ state: 'visible', timeout: 15000 });
        for (let attempt = 0; attempt < 3; attempt++) {
            await this.page.locator(this.nameSortButton).click({ force: true });
            await this.page.waitForTimeout(3000);
            const names = await this.getCellTexts(this.nameCells);
            console.log(`Attempt ${attempt + 1}:`, names);
            if (this.isNamesAscending(names)) {
                console.log("Ascending Order:", names);
                console.log("   Verified: Name sorted in Ascending Order.");
                return;
            }
        }
        const names = await this.getCellTexts(this.nameCells);
        this.verifyAscending(names);
    }

    async verifyNameSortingDescending(): Promise<void> {
        await this.page.locator(this.nameSortButton).click({ force: true });
        await this.page.waitForTimeout(3000);
        const names = await this.getCellTexts(this.nameCells);
        this.verifyDescending(names);
        console.log("Descending Order:", names);
        console.log("   Verified: Name sorted in Descending Order.");
    }

    async verifyCreatedDateSortingAscending(): Promise<void> {
        await this.page.locator(this.createdDateSortButton).waitFor({ state: 'visible', timeout: 15000 });
        for (let attempt = 0; attempt < 3; attempt++) {
            await this.page.locator(this.createdDateSortButton).click({ force: true });
            await this.page.waitForTimeout(2000);
            const dates = await this.getCellTexts(this.createdDateCells);
            const times = await this.getCellTexts(this.createdTimeCells);
            if (this.isDateTimeAscending(dates, times)) {
                console.log("Ascending Order:", dates.map((d, i) => `${d} ${times[i]}`));
                console.log("   Verified: Created Date sorted in Ascending Order.");
                return;
            }
        }
        const dates = await this.getCellTexts(this.createdDateCells);
        const times = await this.getCellTexts(this.createdTimeCells);
        this.verifyDateTimeAscending(dates, times);
    }

    async verifyCreatedDateSortingDescending(): Promise<void> {
        await this.page.locator(this.createdDateSortButton).click({ force: true });
        await this.page.waitForTimeout(2000);
        const dates = await this.getCellTexts(this.createdDateCells);
        const times = await this.getCellTexts(this.createdTimeCells);
        this.verifyDateTimeDescending(dates, times);
        console.log("Descending Order:", dates.map((d, i) => `${d} ${times[i]}`));
        console.log("   Verified: Created Date sorted in Descending Order.");
    }

    async verifyUpdatedDateSortingAscending(): Promise<void> {
        await this.page.locator(this.updatedDateSortButton).waitFor({ state: 'visible', timeout: 15000 });
        for (let attempt = 0; attempt < 3; attempt++) {
            await this.page.locator(this.updatedDateSortButton).click({ force: true });
            await this.page.waitForTimeout(2000);
            const dates = await this.getCellTexts(this.updatedDateCells);
            const times = await this.getCellTexts(this.updatedTimeCells);
            if (this.isDateTimeAscending(dates, times)) {
                console.log("Ascending Order:", dates.map((d, i) => `${d} ${times[i]}`));
                console.log("   Verified: Updated Date sorted in Ascending Order.");
                return;
            }
        }
        const dates = await this.getCellTexts(this.updatedDateCells);
        const times = await this.getCellTexts(this.updatedTimeCells);
        this.verifyDateTimeAscending(dates, times);
    }

    async verifyUpdatedDateSortingDescending(): Promise<void> {
        await this.page.locator(this.updatedDateSortButton).click({ force: true });
        await this.page.waitForTimeout(2000);
        const dates = await this.getCellTexts(this.updatedDateCells);
        const times = await this.getCellTexts(this.updatedTimeCells);
        this.verifyDateTimeDescending(dates, times);
        console.log("Descending Order:", dates.map((d, i) => `${d} ${times[i]}`));
        console.log("   Verified: Updated Date sorted in Descending Order.");
    }
// Action for all Page And Records Related Logic 


    private getOptionLocator(option: string): string {
        return `//li[@role='option' and normalize-space()='${option}']`;
    }

    async selectRecordsPerPage(option: string): Promise<void> {
        await this.click(this.viewDropdown);
        await this.page.waitForTimeout(500);
        const optionLocator = this.getOptionLocator(option);
        await this.page.locator(optionLocator).waitFor({ state: 'visible' });
        await this.click(optionLocator);
        await this.page.waitForTimeout(3000);
        const value = await this.page.locator(this.viewDropdown).textContent();
        expect(value?.trim()).toBe(option);
        console.log(`Selected ${option} records per page.`);
    }

    async printAllRecordsPerPage(header: string): Promise<void> {
        const names = await this.getCellTexts(this.nameCells);
        const createdDates = await this.getCellTexts(this.createdDateCells);
        const createdTimes = await this.getCellTexts(this.createdTimeCells);
        const updatedDates = await this.getCellTexts(this.updatedDateCells);
        const updatedTimes = await this.getCellTexts(this.updatedTimeCells);

        console.log("");
        console.log(`================== ${header} ==================`);
        console.log("");

        for (let i = 0; i < names.length; i++) {
            console.log(`${i + 1}.`);
            console.log(`Name            : ${names[i]}`);
            console.log(`Created Date    : ${createdDates[i]} ${createdTimes[i]}`);
            console.log(`Updated Date    : ${updatedDates[i]} ${updatedTimes[i]}`);
            console.log("");
        }

        console.log("==========================================================");
        console.log("");
    }

    async verifyShowingText(): Promise<void> {
        const text = await this.page.locator(this.showingText).textContent();
        console.log(`Showing Text: ${text?.trim()}`);
        expect(text).toContain('Showing');
        expect(text).toContain('records');
    }

    async verifyPreviousButton(): Promise<void> {
        const isEnabled = await this.page.locator(this.previousButton).isEnabled();
        if (isEnabled) {
            await this.click(this.previousButton);
            await this.page.waitForLoadState('networkidle');
            await this.printAllRecordsPerPage('Page 1');
        } else {
            console.log("Already on first page. Previous button is disabled.");
        }
    }

    async verifyCurrentPage(): Promise<void> {
        const currentPageButton = "//button[@aria-label='page 1']";
        const isEnabled = await this.page.locator(currentPageButton).isEnabled();
        if (isEnabled) {
            await this.click(currentPageButton);
            await this.page.waitForLoadState('networkidle');
        }
        console.log("Current Page : 1");

        const names = await this.getCellTexts(this.nameCells);
        const createdDates = await this.getCellTexts(this.createdDateCells);
        const createdTimes = await this.getCellTexts(this.createdTimeCells);
        const updatedDates = await this.getCellTexts(this.updatedDateCells);
        const updatedTimes = await this.getCellTexts(this.updatedTimeCells);

        for (let i = 0; i < names.length; i++) {
            console.log(`${i + 1}.`);
            console.log(`Name            : ${names[i]}`);
            console.log(`Created Date    : ${createdDates[i]}`);
            console.log(`Created Time    : ${createdTimes[i].replace('at ', '')}`);
            console.log(`Updated Date    : ${updatedDates[i]}`);
            console.log(`Updated Time    : ${updatedTimes[i].replace('at ', '')}`);
            console.log("");
        }
    }

    async verifyNextButtonPagination(clickCount: number): Promise<void> {
        for (let i = 1; i <= clickCount; i++) {
            const isEnabled = await this.page.locator(this.nextButton).isEnabled();
            if (!isEnabled) {
                console.log("No more pages available.");
                console.log("Next button is disabled.");
                console.log("Pagination completed successfully.");
                break;
            }
            await this.click(this.nextButton);
            await this.page.waitForLoadState('networkidle');
            const pageNumber = i + 1;

            console.log("");
            console.log("==========================");
            console.log(`Page : ${pageNumber}`);
            console.log("==========================");
            console.log("");

            const names = await this.getCellTexts(this.nameCells);
            const createdDates = await this.getCellTexts(this.createdDateCells);
            const createdTimes = await this.getCellTexts(this.createdTimeCells);
            const updatedDates = await this.getCellTexts(this.updatedDateCells);
            const updatedTimes = await this.getCellTexts(this.updatedTimeCells);

            for (let j = 0; j < names.length; j++) {
                console.log(`${j + 1}.`);
                console.log(`Name            : ${names[j]}`);
                console.log(`Created Date    : ${createdDates[j]}`);
                console.log(`Created Time    : ${createdTimes[j].replace('at ', '')}`);
                console.log(`Updated Date    : ${updatedDates[j]}`);
                console.log(`Updated Time    : ${updatedTimes[j].replace('at ', '')}`);
                console.log("");
            }
        }
    }

    async verifyRecordsPerPageAndPagination(): Promise<void> {
        await this.selectRecordsPerPage('20');
        await this.printAllRecordsPerPage('Records Per Page : 20');

        await this.selectRecordsPerPage('50');
        await this.printAllRecordsPerPage('Records Per Page : 50');

        await this.selectRecordsPerPage('100');
        await this.printAllRecordsPerPage('Records Per Page : 100');

        await this.verifyShowingText();
        await this.verifyPreviousButton();
        await this.verifyCurrentPage();
        await this.verifyNextButtonPagination(400);
    }

// Action for Delete Manual Review Related Logic 

    async captureFirstRowDetails(): Promise<{ name: string, createdDateTime: string, updatedDateTime: string }> {
        await this.page.locator(this.nameCells).first().waitFor({ state: 'visible', timeout: 15000 });
        const names = await this.getCellTexts(this.nameCells);
        const createdDates = await this.getCellTexts(this.createdDateCells);
        const createdTimes = await this.getCellTexts(this.createdTimeCells);
        const updatedDates = await this.getCellTexts(this.updatedDateCells);
        const updatedTimes = await this.getCellTexts(this.updatedTimeCells);

        return {
            name: names[0],
            createdDateTime: `${createdDates[0]} ${createdTimes[0]}`,
            updatedDateTime: `${updatedDates[0]} ${updatedTimes[0]}`
        };
    }

    printSelectedRecord(name: string, createdDateTime: string, updatedDateTime: string): void {
        console.log("");
        console.log("============================================");
        console.log("Selected Manual Review Record");
        console.log("");
        console.log(`Review Name       : ${name}`);
        console.log(`Created Date Time : ${createdDateTime}`);
        console.log(`Updated Date Time : ${updatedDateTime}`);
        console.log("");
        console.log("============================================");
        console.log("");
    }

    async clickDeleteIcon(): Promise<void> {
        await this.page.locator(this.deleteIcon).first().click();
        await this.page.waitForTimeout(1000);
    }

    async verifyDeletePopup(): Promise<void> {
        await this.waitForVisible(this.deleteDialog);
        const headingText = await this.page.locator(this.deleteDialogHeading).textContent();
        console.log(`Popup Heading: ${headingText?.trim()}`);

        const isDeleteEnabled = await this.page.locator(this.deleteDialogDeleteButton).isEnabled();
        console.log(`Delete Button Enabled: ${isDeleteEnabled}`);

        const isCancelEnabled = await this.page.locator(this.deleteDialogCancelButton).isEnabled();
        console.log(`Cancel Button Enabled: ${isCancelEnabled}`);

        expect(isDeleteEnabled).toBe(true);
        expect(isCancelEnabled).toBe(true);
    }

    async clickDialogCancel(): Promise<void> {
        await this.click(this.deleteDialogCancelButton);
        await this.page.locator(this.deleteDialog).waitFor({ state: 'hidden' });
        console.log("Popup closed after clicking Cancel.");
    }

    async searchReview(name: string): Promise<void> {
        await this.page.locator(this.searchInput).click();
        await this.page.keyboard.press('Control+a');
        await this.page.keyboard.press('Backspace');
        await this.page.keyboard.type(name, { delay: 50 });
        await this.page.waitForTimeout(2000);
    }

    async compareRecordAfterCancel(name: string, createdDateTime: string, updatedDateTime: string): Promise<void> {
        const names = await this.getCellTexts(this.nameCells);
        const createdDates = await this.getCellTexts(this.createdDateCells);
        const createdTimes = await this.getCellTexts(this.createdTimeCells);
        const updatedDates = await this.getCellTexts(this.updatedDateCells);
        const updatedTimes = await this.getCellTexts(this.updatedTimeCells);

        const actualName = names[0] ?? '';
        const actualCreatedDT = `${createdDates[0] ?? ''} ${createdTimes[0] ?? ''}`;
        const actualUpdatedDT = `${updatedDates[0] ?? ''} ${updatedTimes[0] ?? ''}`;

        const nameMatch = actualName === name;
        const createdMatch = actualCreatedDT === createdDateTime;
        const updatedMatch = actualUpdatedDT === updatedDateTime;

        console.log("");
        if (nameMatch && createdMatch && updatedMatch) {
            console.log("PASS");
        } else {
            console.log("FAIL");
        }
        console.log("");
        console.log(`Expected Review Name  : ${name}`);
        console.log(`Actual Review Name    : ${actualName}`);
        console.log("");
        console.log(`Expected Created Date : ${createdDateTime}`);
        console.log(`Actual Created Date   : ${actualCreatedDT}`);
        console.log("");
        console.log(`Expected Updated Date : ${updatedDateTime}`);
        console.log(`Actual Updated Date   : ${actualUpdatedDT}`);
        console.log("");
        if (nameMatch && createdMatch && updatedMatch) {
            console.log("Result : Record exists after clicking Cancel.");
        } else {
            console.log("Result : Record details do not match after clicking Cancel.");
        }
        console.log("");

        expect(nameMatch).toBe(true);
        expect(createdMatch).toBe(true);
        expect(updatedMatch).toBe(true);
    }

    async clearSearch(): Promise<void> {
        await this.page.locator("//span[normalize-space()='clear']").first().click();
        await this.page.waitForTimeout(2000);
    }

    async clickDialogDelete(): Promise<void> {
        await this.click(this.deleteDialogDeleteButton);
        await this.page.waitForTimeout(2000);
    }

    async verifySuccessToast(): Promise<void> {
        await this.waitForVisible(this.successToast);
        const toastText = await this.page.locator(this.successToast).textContent();
        console.log(`Toast Message: ${toastText?.trim()}`);
        expect(toastText?.trim()).toBe('Deleted successfully');
        await this.page.waitForTimeout(3000);
    }

    async verifyRecordDeleted(name: string, createdDateTime: string, updatedDateTime: string): Promise<void> {
        await this.page.goto('/review/manual_review');
        await this.page.waitForLoadState('networkidle');
        await this.searchReview(name);

        const noRecords = await this.page.locator("//h3[normalize-space()='No Records Found']").isVisible();
        const rowCount = await this.page.locator(this.tableRows).count();
        const recordDeleted = noRecords || rowCount === 0;

        console.log("");
        console.log("============================================");
        if (recordDeleted) {
            console.log("PASS");
            console.log("");
            console.log("Deleted Review");
            console.log(`Review Name       : ${name}`);
            console.log(`Created Date Time : ${createdDateTime}`);
            console.log(`Updated Date Time : ${updatedDateTime}`);
            console.log("");
            console.log("Result");
            console.log("Record deleted successfully.");
            console.log("No matching record found in Manual Reviews.");
        } else {
            console.log("FAIL");
            console.log("");
            console.log("Deleted Review");
            console.log(`Review Name       : ${name}`);
            console.log(`Created Date Time : ${createdDateTime}`);
            console.log(`Updated Date Time : ${updatedDateTime}`);
            console.log("");
            console.log("Result");
            console.log("Record is still visible after Delete operation.");
        }
        console.log("");
        console.log("============================================");

        expect(recordDeleted).toBe(true);
    }

    async verifyDeleteManualReview(): Promise<void> {
        const record = await this.captureFirstRowDetails();
        this.printSelectedRecord(record.name, record.createdDateTime, record.updatedDateTime);

        await this.clickDeleteIcon();
        await this.verifyDeletePopup();
        await this.clickDialogCancel();

        await this.searchReview(record.name);
        await this.compareRecordAfterCancel(record.name, record.createdDateTime, record.updatedDateTime);

        await this.clearSearch();

        await this.clickDeleteIcon();
        await this.verifyDeletePopup();
        await this.clickDialogDelete();

        await this.verifySuccessToast();

        await this.verifyRecordDeleted(record.name, record.createdDateTime, record.updatedDateTime);
    }

// Search Manual Review Related Logic

    async printAllAvailableManualReviews(): Promise<void> {
        await this.page.locator(this.nameCells).first().waitFor({ state: 'visible', timeout: 15000 });
        const names = await this.getCellTexts(this.nameCells);
        const createdDates = await this.getCellTexts(this.createdDateCells);
        const createdTimes = await this.getCellTexts(this.createdTimeCells);
        const updatedDates = await this.getCellTexts(this.updatedDateCells);
        const updatedTimes = await this.getCellTexts(this.updatedTimeCells);
        const phones = await this.getCellTexts(this.phoneCells);
        const emails = await this.getCellTexts(this.emailCells);

        console.log("");
        console.log("=====================================");
        console.log("Available Manual Reviews");
        console.log("");

        for (let i = 0; i < names.length; i++) {
            console.log(`${i + 1}.`);
            console.log(`Review : ${names[i]}`);
            console.log(`Created : ${createdDates[i]} ${createdTimes[i].replace('at ', '')}`);
            console.log(`Updated : ${updatedDates[i]} ${updatedTimes[i].replace('at ', '')}`);
            console.log(`Phone : ${phones[i] ?? ''}`);
            console.log(`Email : ${emails[i] ?? ''}`);
            console.log("");
        }

        console.log("=====================================");
        console.log("");
    }

    async verifyManualReviewSearch(): Promise<void> {
        await this.printAllAvailableManualReviews();

        const names = await this.getCellTexts(this.nameCells);
        const phones = await this.getCellTexts(this.phoneCells);
        const emails = await this.getCellTexts(this.emailCells);

        const fullName = names[0];
        const phone = phones[0] ?? '';
        const email = emails[0] ?? '';

        const originalRowCount = await this.page.locator(this.tableRows).count();

        const nameParts = fullName.split(' ');
        const firstName = nameParts[0];
        const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : firstName;
        const partialName = fullName.substring(0, 3);

        const fullPhone = phone;
        const partialPhone = phone.substring(0, 4);

        const fullEmail = email;
        const emailParts = email.split('@');
        const partialEmail = emailParts.length > 1 ? emailParts[0] : email.substring(0, 4);

        // Step 3: Single Character Search
        console.log("");
        console.log("=====================================");
        console.log("  Single Character Search");
        console.log("=====================================");
        await this.searchReview(fullName.charAt(0));
        const singleCharRow = await this.page.locator(this.tableRows).count();
        const singleCharFirst = (await this.getCellTexts(this.nameCells))[0];
        if (singleCharRow === originalRowCount && singleCharFirst === fullName) {
            console.log("PASS");
            console.log("");
            console.log("Single character search is ignored.");
            console.log("Search is triggered only after entering at least two characters.");
        } else {
            console.log("FAIL");
            console.log("");
            console.log("Single character search triggered filtering.");
        }
        await this.clearSearch();

        // Step 5: Minimum 2 Character Search
        console.log("");
        console.log("=====================================");
        console.log(" Minimum 2 Character Search");
        console.log("=====================================");
        const twoChars = fullName.substring(0, 2);
        await this.searchReview(twoChars);
        const twoCharRow = await this.page.locator(this.tableRows).count();
        if (twoCharRow > 0) {
            console.log("PASS");
            console.log("");
            console.log("Search executed successfully with minimum 2 characters.");
        } else {
            console.log("FAIL");
            console.log("");
            console.log(`No matching record found for "${twoChars}"`);
        }
        await this.clearSearch();

        // Step 7: Exact Review Name Search
        console.log("");
        console.log("=====================================");
        console.log(" Exact Review Name Search");
        console.log("=====================================");
        await this.searchReview(fullName);
        const exactNames = await this.getCellTexts(this.nameCells);
        const exactFirst = exactNames[0] ?? '';
        if (exactFirst === fullName) {
            console.log("PASS");
            console.log("");
            console.log("Exact Review Name matched.");
            console.log("");
            console.log(`Expected : ${fullName}`);
            console.log(`Actual   : ${exactFirst}`);
        } else {
            console.log("FAIL");
            console.log("");
            console.log("Exact Review Name not found.");
            console.log("");
            console.log(`Expected : ${fullName}`);
            console.log(`Actual   : ${exactFirst}`);
        }
        await this.clearSearch();

        // Step 9: First Name Search
        console.log("");
        console.log("=====================================");
        console.log(" First Name Search");
        console.log("=====================================");
        await this.searchReview(firstName);
        const firstNameRow = await this.page.locator(this.tableRows).count();
        if (firstNameRow > 0) {
            console.log("PASS");
            console.log("");
            console.log("First Name search working correctly.");
        } else {
            console.log("FAIL");
            console.log("");
            console.log(`No record found for "${firstName}"`);
        }
        await this.clearSearch();

        // Step 11: Last Name Search
        console.log("");
        console.log("=====================================");
        console.log("    Last Name Search");
        console.log("=====================================");
        await this.searchReview(lastName);
        const lastNameRow = await this.page.locator(this.tableRows).count();
        if (lastNameRow > 0) {
            console.log("PASS");
            console.log("");
            console.log("Last Name search working correctly.");
        } else {
            console.log("FAIL");
            console.log("");
            console.log(`No matching record found for "${lastName}"`);
        }
        await this.clearSearch();

        // Step 13: Partial Name Search
        console.log("");
        console.log("=====================================");
        console.log(" Partial Name Search");
        console.log("=====================================");
        await this.searchReview(partialName);
        const partialNameRow = await this.page.locator(this.tableRows).count();
        if (partialNameRow > 0) {
            console.log("PASS");
            console.log("");
            console.log("Partial search working correctly.");
        } else {
            console.log("FAIL");
            console.log("");
            console.log(`No matching record found for "${partialName}"`);
        }
        await this.clearSearch();

        // Step 15: Full Phone Number Search
        console.log("");
        console.log("=====================================");
        console.log("Full Phone Number Search");
        console.log("=====================================");
        if (fullPhone) {
            await this.searchReview(fullPhone);
            const fullPhoneRow = await this.page.locator(this.tableRows).count();
            if (fullPhoneRow > 0) {
                console.log("PASS");
                console.log("");
                console.log("Phone Number search successful.");
            } else {
                console.log("FAIL");
                console.log("");
                console.log(`Phone Number not found for "${fullPhone}"`);
            }
            await this.clearSearch();
        } else {
            console.log("SKIP - No phone number available");
        }

        // Step 17: Partial Phone Number Search
        console.log("");
        console.log("=====================================");
        console.log(" Partial Phone Number Search");
        console.log("=====================================");
        if (partialPhone) {
            await this.searchReview(partialPhone);
            const partialPhoneRow = await this.page.locator(this.tableRows).count();
            if (partialPhoneRow > 0) {
                console.log("PASS");
                console.log("");
                console.log("Partial Phone Number search successful.");
            } else {
                console.log("FAIL");
                console.log("");
                console.log(`Partial Phone Number search returned no results for "${partialPhone}"`);
            }
            await this.clearSearch();
        } else {
            console.log("SKIP - No phone number available");
        }

        // Step 19: Email Address Search
        console.log("");
        console.log("=====================================");
        console.log("  Email Address Search");
        console.log("=====================================");
        if (fullEmail) {
            await this.searchReview(fullEmail);
            const fullEmailRow = await this.page.locator(this.tableRows).count();
            if (fullEmailRow > 0) {
                console.log("PASS");
                console.log("");
                console.log("Email search successful.");
            } else {
                console.log("FAIL");
                console.log("");
                console.log(`Email not found for "${fullEmail}"`);
            }
            await this.clearSearch();
        } else {
            console.log("SKIP - No email available");
        }

        // Step 21: Partial Email Search
        console.log("");
        console.log("=====================================");
        console.log(" Partial Email Search");
        console.log("=====================================");
        if (partialEmail) {
            await this.searchReview(partialEmail);
            const partialEmailRow = await this.page.locator(this.tableRows).count();
            if (partialEmailRow > 0) {
                console.log("PASS");
                console.log("");
                console.log("Partial Email search successful.");
            } else {
                console.log("FAIL");
                console.log("");
                console.log(`Partial Email search returned no results for "${partialEmail}"`);
            }
            await this.clearSearch();
        } else {
            console.log("SKIP - No email available");
        }

        // Step 23: Maximum Length String Search
        console.log("");
        console.log("=====================================");
        console.log(" Maximum Length String Search");
        console.log("=====================================");
        const longString = faker.string.alphanumeric(1000);
        await this.searchReview(longString);
        const longStringRow = await this.page.locator(this.tableRows).count();
        console.log("PASS");
        console.log("");
        console.log("Maximum-length search handled successfully.");
        console.log(`Rows displayed: ${longStringRow}`);
        await this.page.goto('/review/manual_review');
        await this.page.waitForLoadState('networkidle');

        // Step 25: Invalid Data Search
        console.log("");
        console.log("=====================================");
        console.log(" Invalid Data Search");
        console.log("=====================================");
        const invalidSearch = faker.string.symbol(10) + faker.string.numeric(10);
        await this.searchReview(invalidSearch);
        const invalidRow = await this.page.locator(this.tableRows).count();
        const noRecords = await this.page.locator(this.noRecordsFound).isVisible();
        if (invalidRow === 0 || noRecords) {
            console.log("PASS");
            console.log("");
            console.log("No records found for invalid search.");
            console.log("");
            console.log(`Search Value : ${invalidSearch}`);
        } else {
            console.log("FAIL");
            console.log("");
            console.log(`Invalid search returned ${invalidRow} results.`);
            console.log("");
            console.log(`Search Value : ${invalidSearch}`);
        }
        await this.clearSearch();
    }
}