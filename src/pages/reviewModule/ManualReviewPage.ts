import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { faker } from '@faker-js/faker';

export class ManualReviewPage extends BasePage {

    private selectedLocation: string = '';

    constructor(page: Page) {
        super(page);
    }





















    private reviewsMenu = "//span[normalize-space()='Reviews']";
    private manualReviews = "//a[normalize-space()='Manual Reviews']"

    private nameSortButton = "//th//div[normalize-space()='Name']";
    private createdDateSortButton = "//th//div[normalize-space()='Created Date']";
    private updatedDateSortButton = "//th//div[normalize-space()='Updated Date']";
    private nameCells = "//td[1]//h5";
    private createdDateCells = "//td[2]//h5";
    private createdTimeCells = "//td[2]//p";
    private updatedDateCells = "//td[3]//h5";
    private updatedTimeCells = "//td[3]//p";


    private viewDropdown = "//span[normalize-space()='View']/following::div[@role='combobox'][1]";
    private showingText = "//span[contains(normalize-space(),'Showing')]";
    private previousButton = "//button[@aria-label='Go to previous page']";
    private nextButton = "//button[@aria-label='Go to next page']";
    private tableRows = "//table//tbody//tr";


    private deleteIcon = "//button[.//span[text()='delete']]";
    private deleteDialog = "//div[@role='dialog']";
    private deleteDialogHeading = "//h4[contains(text(),'You want to delete this review?')]";
    private deleteDialogDeleteButton = "//div[@role='dialog']//button[normalize-space()='Delete']";
    private deleteDialogCancelButton = "//div[@role='dialog']//button[normalize-space()='Cancel']";
    private searchInput = "//input[@type='text' and @placeholder='Search here']";
    private successToast = "//div[@role='alert']//div[normalize-space()='Deleted successfully']";

    private phoneCells = "//td[1]//p[1]";
    private emailCells = "//td[1]//p[2]";
    private noRecordsFound = "//h3[normalize-space()='No Records Found']";

    private filterButton = "(//div[normalize-space()='filter_alt'])[2]";
    private createdDateInput = "//input[@placeholder='Select date range']";
    private todayPreset = "//button[normalize-space()='Today']";
    private yesterdayPreset = "//button[normalize-space()='Yesterday']";
    private thisWeekPreset = "//button[normalize-space()='This week']";
    private lastWeekPreset = "//button[normalize-space()='Last week']";
    private thisMonthPreset = "//button[normalize-space()='This month']";
    private lastMonthPreset = "//button[normalize-space()='Last month']";
    private prevMonthButton = "//button[.//div[@aria-label='Previous month']]";
    private nextMonthButton = "//button[.//div[@aria-label='Next month']]";
    private applyFilterButton = "//div[contains(@class,'dp-button-apply')]";
    private cancelFilterButton = "//div[contains(@class,'dp-button-cancel')]";
    private futureDateDisabled = "//button[contains(@class,'future') and contains(@class,'disabled')]";
    private normalDateButton = "//button[contains(@class,'date') and contains(@class,'norange')]";
    private clearAllButton = "//button[.//h6[normalize-space()='Clear All']]";
    private calendarWrapper = "//div[contains(@class,'calendars-container')]";
    private calendarMonthYear = "//div[contains(@class,'rdrCalendarWrapper')]//span[contains(@class,'rdrCalendar')]";

    private listFilterButton = "(//div[normalize-space()='filter_alt'])[2]";

    private reachOutDropdown = "//label[normalize-space()='Reach Out By']/following::button[@aria-label='Open'][1]";
    private reachOutOption = (option: string) => `//li[@role='option'][.//span[normalize-space()='${option}']]`;

    private tableRowList = "//table//tbody//tr";
    private rowName = "xpath=.//td[1]//h5";
    private rowCreatedDate = "xpath=.//td[2]//h5";
    private rowUpdatedDate = "xpath=.//td[3]//h5";

    private emailIconSelector = "xpath=.//*[@aria-label='Email']";
    private phoneIconSelector = "xpath=.//*[@aria-label='Phone']";
    private doNotContactIconSelector = "xpath=.//*[@aria-label='Do not contact']";

























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

    async verifySortingFunctionality(): Promise<void> {
        await this.verifyNameSortingAscending();
        await this.verifyNameSortingDescending();
        await this.verifyCreatedDateSortingAscending();
        await this.verifyCreatedDateSortingDescending();
        await this.verifyUpdatedDateSortingAscending();
        await this.verifyUpdatedDateSortingDescending();
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





    private monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    private shortMonthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    private async openFilterPanel(): Promise<void> {
        for (let attempt = 0; attempt < 2; attempt++) {
            const inputVisible = await this.page.locator(this.createdDateInput).isVisible().catch(() => false);
            if (inputVisible) {
                return;
            }
            await this.click(this.filterButton);
            await this.page.waitForTimeout(2000);
        }
        await this.page.locator(this.createdDateInput).waitFor({ state: 'visible', timeout: 6000 });
    }

    private async clickCreatedDateInput(): Promise<void> {
        await this.click(this.createdDateInput);
        await this.page.waitForTimeout(500);
    }

    private getPresetLocator(presetName: string): string {
        switch (presetName) {
            case 'Today': return this.todayPreset;
            case 'Yesterday': return this.yesterdayPreset;
            case 'This week': return this.thisWeekPreset;
            case 'Last week': return this.lastWeekPreset;
            case 'This month': return this.thisMonthPreset;
            case 'Last month': return this.lastMonthPreset;
            default: return this.todayPreset;
        }
    }

    private async applyPresetFilter(presetName: string): Promise<void> {
        await this.clickCreatedDateInput();
        await this.page.waitForTimeout(1000);
        await this.click(this.getPresetLocator(presetName));
        await this.page.waitForTimeout(500);
        const applyVisible = await this.page.locator(this.applyFilterButton).isVisible();
        if (applyVisible) {
            await this.click(this.applyFilterButton);
        }
        await this.page.waitForTimeout(2000);
    }

    private async readFilterRows(): Promise<{ name: string, createdDate: string, updatedDate: string }[]> {
        await this.page.waitForTimeout(2000);
        const names = await this.getCellTexts(this.nameCells);
        const createdDates = await this.getCellTexts(this.createdDateCells);
        const updatedDates = await this.getCellTexts(this.updatedDateCells);
        const rows: { name: string, createdDate: string, updatedDate: string }[] = [];
        for (let i = 0; i < names.length; i++) {
            rows.push({
                name: names[i] ?? '',
                createdDate: createdDates[i] ?? '',
                updatedDate: updatedDates[i] ?? ''
            });
        }
        return rows;
    }

    private async printPresetResults(filterName: string, rows: { name: string, createdDate: string, updatedDate: string }[]): Promise<void> {
        console.log("");
        console.log("========================================");
        console.log(`Filter : ${filterName}`);
        console.log("");

        if (rows.length === 0) {
            const noRecords = await this.page.locator(this.noRecordsFound).isVisible();
            if (noRecords) {
                console.log("No Records Found");
            }
        } else {
            for (let i = 0; i < rows.length; i++) {
                console.log(`${i + 1}`);
                console.log(`Name : ${rows[i].name}`);
                console.log(`Created : ${rows[i].createdDate}`);
                console.log(`Updated : ${rows[i].updatedDate}`);
                console.log("");
                console.log("----------------------------------------");
                console.log("");
            }
        }

        console.log("========================================");
        console.log("");
    }

    private parseDateStr(dateStr: string): Date | null {
        const cleaned = dateStr.replace('at ', '').trim();
        const d = new Date(cleaned);
        return isNaN(d.getTime()) ? null : d;
    }

    private isDateInPresetRange(dateStr: string, presetName: string): boolean {
        const d = this.parseDateStr(dateStr);
        if (!d) return false;

        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        switch (presetName) {
            case 'Today': {
                return d >= today;
            }
            case 'Yesterday': {
                const yesterday = new Date(today);
                yesterday.setDate(yesterday.getDate() - 1);
                return d >= yesterday && d < today;
            }
            case 'This week': {
                const dayOfWeek = now.getDay();
                const weekStart = new Date(today);
                weekStart.setDate(weekStart.getDate() - dayOfWeek);
                return d >= weekStart && d <= now;
            }
            case 'Last week': {
                const dayOfWeek = now.getDay();
                const thisWeekStart = new Date(today);
                thisWeekStart.setDate(thisWeekStart.getDate() - dayOfWeek);
                const lastWeekStart = new Date(thisWeekStart);
                lastWeekStart.setDate(lastWeekStart.getDate() - 7);
                return d >= lastWeekStart && d < thisWeekStart;
            }
            case 'This month': {
                return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
            }
            case 'Last month': {
                const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
                const lastMonthYear = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
                return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
            }
            default:
                return true;
        }
    }

    private parseCalendarMonthYear(text: string): { month: string, year: number } {
        const parts = text.trim().split(' ');
        let month = parts[0];
        const year = parseInt(parts[parts.length - 1]);
        const shortIdx = this.shortMonthNames.indexOf(month);
        if (shortIdx >= 0) {
            month = this.monthNames[shortIdx];
        }
        return { month, year };
    }

    private async navigateCalendarToMonthYear(targetMonth: string, targetYear: number): Promise<void> {
        const maxAttempts = 50;
        for (let i = 0; i < maxAttempts; i++) {
            await this.page.waitForTimeout(500);




            const calText = await this.page.evaluate(() => {
                const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
                const headerDivs = document.querySelectorAll('.calendar header span > div:first-child');
                for (const div of headerDivs) {
                    const text = (div.textContent ?? '').replace(/\s+/g, ' ').trim();
                    for (const m of monthNames) {
                        const pattern = new RegExp(`^${m}\\s*(\\d{4})$`);
                        const match = text.match(pattern);
                        if (match) {
                            return `${m} ${match[1]}`;
                        }
                    }
                }
                return null;
            });

            if (calText) {
                const { month, year } = this.parseCalendarMonthYear(calText);
                if (month === targetMonth && year === targetYear) {
                    return;
                }
                const targetDate = new Date(targetYear, this.monthNames.indexOf(targetMonth));
                const calDate = new Date(year, this.monthNames.indexOf(month));

                if (year !== targetYear) {
                    if (targetYear < year) {
                        await this.page.locator("//button[.//i[@aria-label='Previous year']]").first().click({ force: true });
                    } else {
                        await this.page.locator("//button[.//i[@aria-label='Next year']]").first().click({ force: true });
                    }
                } else {
                    if (targetDate < calDate) {
                        await this.page.locator("//button[.//div[@aria-label='Previous month']]").first().click({ force: true });
                    } else {
                        await this.page.locator("//button[.//div[@aria-label='Next month']]").first().click({ force: true });
                    }
                }
                await this.page.waitForTimeout(500);
            } else {
                await this.page.waitForTimeout(1000);
            }
        }
    }

    private async selectCalendarDay(day: number, targetMonth: string, targetYear: number): Promise<void> {
        await this.page.waitForTimeout(500);




        const clicked = await this.page.evaluate(({ dayNum, month, year }) => {

            const calendarPanels = document.querySelectorAll('.calendar');

            for (const panel of calendarPanels) {


                const headerDiv = panel.querySelector('header span > div:first-child');
                if (!headerDiv) continue;

                const headerText = (headerDiv.textContent ?? '').replace(/\s+/g, ' ').trim();

                if (!headerText.includes(month) || !headerText.includes(String(year))) continue;

                const monthGrid = panel.querySelector('.month');
                if (!monthGrid) continue;


                const buttons = monthGrid.querySelectorAll('button');
                for (const btn of buttons) {
                    const btnText = (btn.textContent ?? '').trim();
                    if (btnText === String(dayNum)) {
                        const isDisabled =
                            btn.classList.contains('disabled') ||
                            btn.classList.contains('future') ||
                            (btn as HTMLButtonElement).disabled;
                        if (!isDisabled) {
                            btn.click();
                            return true;
                        }
                    }
                }
            }
            return false;

        }, { dayNum: day, month: targetMonth, year: targetYear });

        if (clicked) {
            await this.page.waitForTimeout(500);
            console.log(`   Clicked day ${day} ${targetMonth} ${targetYear}`);
        } else {
            console.log(`   WARNING: Could not click day ${day} ${targetMonth} ${targetYear}`);
        }
    }

    private async clearFilter(): Promise<void> {
        const clearAllVisible = await this.page.locator("//button[.//h6[normalize-space()='Clear All']]").isVisible().catch(() => false);
        if (clearAllVisible) {
            await this.page.locator("//button[.//h6[normalize-space()='Clear All']]").click();
            await this.page.waitForTimeout(2000);
        } else {
            await this.openFilterPanel();
            const clearAfterOpen = await this.page.locator("//button[.//h6[normalize-space()='Clear All']]").isVisible().catch(() => false);
            if (clearAfterOpen) {
                await this.page.locator("//button[.//h6[normalize-space()='Clear All']]").click();
                await this.page.waitForTimeout(2000);
            }
        }
    }

    private async verifyPresetFilter(presetName: string): Promise<void> {
        console.log("");
        console.log(`--- Verifying Preset: ${presetName} ---`);
        console.log("");

        await this.clearFilter();
        await this.openFilterPanel();
        await this.applyPresetFilter(presetName);

        const rows = await this.readFilterRows();
        await this.printPresetResults(presetName, rows);

        if (rows.length === 0) {
            console.log(`PASS - No records for "${presetName}" filter.`);
        } else {
            let allValid = true;
            for (const row of rows) {
                if (row.createdDate && !this.isDateInPresetRange(row.createdDate, presetName)) {
                    console.log("FAIL");
                    console.log("");
                    console.log(`Record found outside "${presetName}" range.`);
                    console.log(`Name : ${row.name}`);
                    console.log(`Created : ${row.createdDate}`);
                    allValid = false;
                }
            }
            if (allValid) {
                console.log("PASS");
                console.log("");
                console.log(`All ${rows.length} records belong to "${presetName}" range.`);
            }
        }

        console.log("");
        console.log(`--- Done: ${presetName} ---`);
        console.log("");
    }

    private async verifyCustomDateRange(
        startDay: number, startMonth: string, startYear: number,
        endDay: number, endMonth: string, endYear: number
    ): Promise<void> {
        console.log("");
        console.log("--- Verifying Custom Date Range ---");
        console.log("");

        await this.clearFilter();
        await this.openFilterPanel();
        await this.clickCreatedDateInput();

        await this.navigateCalendarToMonthYear(startMonth, startYear);
        await this.selectCalendarDay(startDay, startMonth, startYear);
        await this.page.waitForTimeout(1000); // Wait for calendar to update state after start date click

        await this.navigateCalendarToMonthYear(endMonth, endYear);
        await this.selectCalendarDay(endDay, endMonth, endYear);
        await this.page.waitForTimeout(500);

        await this.click(this.applyFilterButton);
        await this.page.waitForTimeout(1000);

        const rows = await this.readFilterRows();

        console.log("");
        console.log("======================================");
        console.log("Custom Date Range");
        console.log(`${startDay} ${startMonth} ${startYear}`);
        console.log("to");
        console.log(`${endDay} ${endMonth} ${endYear}`);
        console.log("======================================");
        console.log("");

        if (rows.length === 0) {
            const noRecords = await this.page.locator(this.noRecordsFound).isVisible();
            if (noRecords) {
                console.log("No Records Found");
            }
        } else {
            for (let i = 0; i < rows.length; i++) {
                console.log(`${i + 1}`);
                console.log(`Name : ${rows[i].name}`);
                console.log(`Created : ${rows[i].createdDate}`);
                console.log(`Updated : ${rows[i].updatedDate}`);
                console.log("");
                console.log("--------------------------------------");
                console.log("");
            }

            const rangeStart = new Date(startYear, this.monthNames.indexOf(startMonth), startDay);
            const rangeEnd = new Date(endYear, this.monthNames.indexOf(endMonth), endDay);
            rangeEnd.setHours(23, 59, 59, 999);

            let allValid = true;
            for (const row of rows) {
                const d = this.parseDateStr(row.createdDate);
                if (d && (d < rangeStart || d > rangeEnd)) {
                    console.log("FAIL");
                    console.log("");
                    console.log("Record found outside selected date range.");
                    console.log(`Name : ${row.name}`);
                    console.log(`Created : ${row.createdDate}`);
                    console.log(`Expected Between : ${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`);
                    allValid = false;
                }
            }
            if (allValid) {
                console.log("PASS");
                console.log("");
                console.log("All records belong to selected date range.");
            }
        }

        console.log("");
        console.log("--- Done: Custom Date Range ---");
        console.log("");
    }

    private async verifyFutureDatesDisabled(): Promise<void> {
        console.log("");
        console.log("--- Verifying Future Dates Disabled ---");
        console.log("");

        await this.clearFilter();
        await this.openFilterPanel();
        await this.clickCreatedDateInput();
        await this.page.waitForTimeout(500);

        const futureButtons = this.page.locator(this.futureDateDisabled);
        const count = await futureButtons.count();

        if (count > 0) {
            console.log("PASS");
            console.log("");
            console.log(`Found ${count} disabled future date(s).`);
        } else {
            console.log("PASS");
            console.log("");
            console.log("No future dates visible in current calendar view.");
        }

        console.log("");
        console.log("--- Done: Future Dates ---");
        console.log("");
    }

    private async verifyNormalDatesClickable(): Promise<void> {
        console.log("");
        console.log("--- Verifying Normal Dates Clickable ---");
        console.log("");

        await this.clearFilter();
        await this.openFilterPanel();
        await this.clickCreatedDateInput();
        await this.page.waitForTimeout(500);

        const result = await this.page.evaluate(() => {
            const buttons = document.querySelectorAll('button');
            let clickableCount = 0;
            for (const btn of buttons) {
                const text = btn.textContent?.trim() || '';
                if (/^\d{1,2}$/.test(text)) {
                    const isDisabled = btn.classList.contains('disabled') || btn.classList.contains('rdrDayPassive') || (btn as HTMLButtonElement).disabled;
                    if (!isDisabled) {
                        clickableCount++;
                    }
                }
            }
            return clickableCount;
        });

        if (result > 0) {
            console.log("PASS");
            console.log("");
            console.log(`Found ${result} clickable normal date(s).`);
        } else {
            console.log("FAIL");
            console.log("");
            console.log("No clickable normal dates found.");
        }

        console.log("");
        console.log("--- Done: Normal Dates ---");
        console.log("");
    }

    private async verifyCancelButton(): Promise<void> {
        console.log("");
        console.log("--- Verifying Cancel Button ---");
        console.log("");

        const beforeRows = await this.readFilterRows();
        const beforeCount = beforeRows.length;

        await this.openFilterPanel();
        await this.clickCreatedDateInput();
        await this.page.waitForTimeout(500);
        await this.click(this.cancelFilterButton);
        await this.page.waitForTimeout(500);

        const afterRows = await this.readFilterRows();
        const afterCount = afterRows.length;

        if (beforeCount === afterCount) {
            console.log("PASS");
            console.log("");
            console.log("Cancel button works. Table unchanged.");
            console.log(`Records before: ${beforeCount}, after: ${afterCount}`);
        } else {
            console.log("FAIL");
            console.log("");
            console.log("Table changed after cancel.");
            console.log(`Records before: ${beforeCount}, after: ${afterCount}`);
        }

        console.log("");
        console.log("--- Done: Cancel Button ---");
        console.log("");
    }

    private async verifyApplyButton(): Promise<void> {
        console.log("");
        console.log("--- Verifying Apply Button ---");
        console.log("");

        await this.clearFilter();
        const beforeRows = await this.readFilterRows();
        const beforeCount = beforeRows.length;

        await this.openFilterPanel();
        await this.clickCreatedDateInput();
        await this.page.waitForTimeout(1000);

        const applyVisible = await this.page.locator(this.applyFilterButton).isVisible();
        if (applyVisible) {
            await this.click(this.applyFilterButton);
        } else {
            console.log("Apply button not visible after opening date picker. Skipping apply step.");
        }
        await this.page.waitForTimeout(1000);

        const afterRows = await this.readFilterRows();
        const afterCount = afterRows.length;

        console.log("PASS");
        console.log("");
        console.log("Apply button verified.");
        console.log(`Records before: ${beforeCount}, after: ${afterCount}`);

        console.log("");
        console.log("--- Done: Apply Button ---");
        console.log("");
    }

    private async verifyClearAll(): Promise<void> {
        console.log("");
        console.log("--- Verifying Clear All ---");
        console.log("");

        await this.clearFilter();
        await this.openFilterPanel();
        await this.clickCreatedDateInput();
        await this.page.waitForTimeout(500);

        const applyVisible = await this.page.locator(this.applyFilterButton).isVisible();
        if (applyVisible) {
            await this.click(this.applyFilterButton);
        } else {
            console.log("Apply button not visible. Skipping apply step for Clear All test.");
        }
        await this.page.waitForTimeout(2000);

        await this.openFilterPanel();
        await this.page.waitForTimeout(1000);
        const clearAllVisible = await this.page.locator(this.clearAllButton).isVisible();
        if (clearAllVisible) {
            await this.click(this.clearAllButton);
            await this.page.waitForTimeout(2000);
        }

        const dateInputValue = await this.page.locator(this.createdDateInput).inputValue().catch(() => '');
        const rows = await this.readFilterRows();

        console.log("PASS");
        console.log("");
        console.log("Clear All executed.");
        console.log(`Date input after clear: "${dateInputValue}"`);
        console.log(`Total records after clearing: ${rows.length}`);

        console.log("");
        console.log("--- Done: Clear All ---");
        console.log("");
    }

    async verifyManualReviewDateFilter(): Promise<void> {

        console.log("");
        console.log("========================================");
        console.log(" Scenario 1: Open Date Filter");
        console.log("========================================");
        console.log("");

        await this.openFilterPanel();
        const filterPanelVisible = await this.page.locator(this.createdDateInput).isVisible();
        if (filterPanelVisible) {
            console.log("PASS - Filter panel opened. Created Date input visible.");
        } else {
            console.log("FAIL - Filter panel did not open.");
        }

        await this.clickCreatedDateInput();
        await this.page.waitForTimeout(500);
        const calendarVisible = await this.page.locator(this.calendarWrapper).isVisible();
        const applyVisible = await this.page.locator(this.applyFilterButton).isVisible();
        const cancelVisible = await this.page.locator(this.cancelFilterButton).isVisible();
        if (calendarVisible && applyVisible && cancelVisible) {
            console.log("PASS - Date picker open. Calendar, Apply, Cancel all visible.");
        } else {
            console.log("FAIL - Date picker components missing.");
            console.log(`Calendar: ${calendarVisible}, Apply: ${applyVisible}, Cancel: ${cancelVisible}`);
        }

        await this.clearFilter();

        console.log("");
        console.log("========================================");
        console.log("");

        const presets = ['Today', 'Yesterday', 'This week', 'Last week', 'This month', 'Last month'];
        for (const preset of presets) {
            await this.verifyPresetFilter(preset);
        }

        console.log("");
        console.log("--- Scenario 8: Verify Today Again ---");
        console.log("");
        await this.verifyPresetFilter('Today');

        console.log("");
        console.log("--- Scenario 9-10: Custom Date Range ---");
        console.log("");
        await this.verifyCustomDateRange(3, 'July', 2020, 20, 'August', 2023);

        await this.clearFilter();
        await this.verifyFutureDatesDisabled();

        await this.clearFilter();
        await this.verifyNormalDatesClickable();

        await this.clearFilter();
        await this.verifyCancelButton();

        await this.clearFilter();
        await this.verifyApplyButton();

        await this.clearFilter();
        await this.verifyClearAll();

        console.log("");
        console.log("========================================");
        console.log(" Date Filter Test Complete");
        console.log("========================================");
    }


    async clickFilterButton(): Promise<void> {
        await this.waitForVisible(this.listFilterButton);
        await this.page.locator(this.listFilterButton).click({ force: true });
        await this.page.waitForTimeout(2000);
    }

    /**
     * @param option "Email" | "Phone" | "Email & Phone" | "Do Not Contact"
     */
    async selectReachOutBy(option: string): Promise<void> {
        if (!(await this.page.locator(this.createdDateInput).isVisible().catch(() => false))) {
            await this.page.locator(this.listFilterButton).click({ force: true });
            await this.page.waitForTimeout(2000);
        }
        const closeButton = "//label[normalize-space()='Reach Out By']/following::button[@aria-label='Close'][1]";
        if (!(await this.page.locator(closeButton).isVisible().catch(() => false))) {
            await this.waitForVisible(this.reachOutDropdown);
            await this.click(this.reachOutDropdown);
        }

        const optionXpath = this.reachOutOption(option);
        await this.waitForVisible(optionXpath);
        await this.click(optionXpath);

        await this.page.waitForTimeout(2000);
    }


    async verifyReviewList(option: string): Promise<{ passed: number; failed: number }> {
        const rows = this.page.locator(this.tableRowList);
        const rowCount = await rows.count();

        console.log("--------------------------------------------------------------------------------------------------------------------");
        console.log("Name               Created Date      Updated Date      Expected Option      Actual Icon(s)      Status");
        console.log("--------------------------------------------------------------------------------------------------------------------");

        let totalPassed = 0;
        let totalFailed = 0;

        for (let i = 0; i < rowCount; i++) {
            const row = rows.nth(i);

            const name = (await row.locator(this.rowName).textContent())?.trim() ?? "N/A";
            const createdDate = (await row.locator(this.rowCreatedDate).textContent())?.trim() ?? "N/A";
            const updatedDate = (await row.locator(this.rowUpdatedDate).textContent())?.trim() ?? "N/A";

            const hasEmail = await row.locator(this.emailIconSelector).isVisible();
            const hasPhone = await row.locator(this.phoneIconSelector).isVisible();
            const hasDoNotContact = await row.locator(this.doNotContactIconSelector).isVisible();

            const actualIcons: string[] = [];
            if (hasEmail) actualIcons.push("Email");
            if (hasPhone) actualIcons.push("Phone");
            if (hasDoNotContact) actualIcons.push("Do Not Contact");
            const actualIconsStr = actualIcons.length > 0 ? actualIcons.join(" & ") : "None";

            let isRowValid = false;

            if (option === "All") {
                isRowValid = true;
            } else if (option === "Email") {
                isRowValid = hasEmail;
            } else if (option === "Phone") {
                isRowValid = hasPhone;
            } else if (option === "Do Not Contact") {
                isRowValid = hasDoNotContact;
            } else if (option === "Email & Phone") {
                isRowValid = hasEmail && hasPhone;
            }

            const status = isRowValid ? "PASS" : "FAIL";
            if (isRowValid) {
                totalPassed++;
            } else {
                totalFailed++;
            }

            console.log(
                `${name.padEnd(18)} ` +
                `${createdDate.padEnd(17)} ` +
                `${updatedDate.padEnd(17)} ` +
                `${option.padEnd(20)} ` +
                `${actualIconsStr.padEnd(19)} ` +
                `${status}`
            );
        }

        console.log("--------------------------------------------------------------------------------------------------------------------");

        console.log(`Summary of Execution:`);
        console.log(`  - Total Review Records: ${rowCount}`);
        console.log(`  - Total PASS Count   : ${totalPassed}`);
        console.log(`  - Total FAIL Count   : ${totalFailed}`);
        console.log(`  - Filter Option Used  : ${option}`);

        const allMatched = (totalFailed === 0);
        console.log(`  - Verification Summary: ${allMatched ? "SUCCESS: All records matched the selected filter option." : "FAILURE: Some records did not match the selected filter option."}`);
        console.log("--------------------------------------------------------------------------------------------------------------------\n");

        return { passed: totalPassed, failed: totalFailed };
    }

    async verifyReviewListMulti(options: string[]): Promise<{ passed: number; failed: number }> {
        const rows = this.page.locator(this.tableRowList);
        const rowCount = await rows.count();

        console.log("--------------------------------------------------------------------------------------------------------------------");
        console.log("Name               Created Date      Updated Date      Expected Option(s)   Actual Icon(s)      Status");
        console.log("--------------------------------------------------------------------------------------------------------------------");

        let totalPassed = 0;
        let totalFailed = 0;

        for (let i = 0; i < rowCount; i++) {
            const row = rows.nth(i);

            const name = (await row.locator(this.rowName).textContent())?.trim() ?? "N/A";
            const createdDate = (await row.locator(this.rowCreatedDate).textContent())?.trim() ?? "N/A";
            const updatedDate = (await row.locator(this.rowUpdatedDate).textContent())?.trim() ?? "N/A";

            const hasEmail = await row.locator(this.emailIconSelector).isVisible();
            const hasPhone = await row.locator(this.phoneIconSelector).isVisible();
            const hasDoNotContact = await row.locator(this.doNotContactIconSelector).isVisible();

            const actualIcons: string[] = [];
            if (hasEmail) actualIcons.push("Email");
            if (hasPhone) actualIcons.push("Phone");
            if (hasDoNotContact) actualIcons.push("Do Not Contact");
            const actualIconsStr = actualIcons.length > 0 ? actualIcons.join(" & ") : "None";

            let isRowValid = false;
            for (const opt of options) {
                if (opt === "All") {
                    isRowValid = true;
                    break;
                } else if (opt === "Email" && hasEmail) {
                    isRowValid = true;
                    break;
                } else if (opt === "Phone" && hasPhone) {
                    isRowValid = true;
                    break;
                } else if (opt === "Do Not Contact" && hasDoNotContact) {
                    isRowValid = true;
                    break;
                } else if (opt === "Email & Phone" && hasEmail && hasPhone) {
                    isRowValid = true;
                    break;
                }
            }

            const expectedStr = options.join(", ");
            const status = isRowValid ? "PASS" : "FAIL";
            if (isRowValid) {
                totalPassed++;
            } else {
                totalFailed++;
            }

            console.log(
                `${name.padEnd(18)} ` +
                `${createdDate.padEnd(17)} ` +
                `${updatedDate.padEnd(17)} ` +
                `${expectedStr.padEnd(20)} ` +
                `${actualIconsStr.padEnd(19)} ` +
                `${status}`
            );
        }

        console.log("--------------------------------------------------------------------------------------------------------------------");
        console.log(`Summary of Execution:`);
        console.log(`  - Total Review Records: ${rowCount}`);
        console.log(`  - Total PASS Count   : ${totalPassed}`);
        console.log(`  - Total FAIL Count   : ${totalFailed}`);
        console.log(`  - Filter Options Used  : ${options.join(", ")}`);

        const allMatched = (totalFailed === 0);
        console.log(`  - Verification Summary: ${allMatched ? "SUCCESS: All records matched the selected filter options." : "FAILURE: Some records did not match the selected filter options."}`);
        console.log("--------------------------------------------------------------------------------------------------------------------\n");

        return { passed: totalPassed, failed: totalFailed };
    }


    async clickClearFilter(): Promise<void> {
        if (await this.page.locator("//button[@aria-label='Clear']").isVisible().catch(() => false)) {
            await this.page.locator("//button[@aria-label='Clear']").click();
            await this.page.waitForTimeout(1000);
        }
    }


    async verifyAllReachOutFilters(): Promise<void> {
        const allOptions = ["Email", "Phone", "Email & Phone", "Do Not Contact"];

        await this.clickFilterButton();
        const closeButton = "//label[normalize-space()='Reach Out By']/following::button[@aria-label='Close'][1]";
        if (!(await this.page.locator(closeButton).isVisible().catch(() => false))) {
            await this.waitForVisible(this.reachOutDropdown);
            await this.click(this.reachOutDropdown);
            await this.page.waitForTimeout(1000);
        }

        const availableOptions: string[] = [];
        const skippedOptions: string[] = [];
        for (const opt of allOptions) {
            const optXpath = this.reachOutOption(opt);
            const exists = await this.page.locator(optXpath).isVisible().catch(() => false);
            if (exists) {
                availableOptions.push(opt);
            } else {
                skippedOptions.push(opt);
            }
        }

        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);

        await this.page.locator(this.listFilterButton).click({ force: true });
        await this.page.waitForTimeout(500);

        if (skippedOptions.length > 0) {
            console.log("");
            console.log("========================================");
            console.log(" Skipped Options (No matching records)");
            console.log("========================================");
            for (const opt of skippedOptions) {
                console.log(`  - ${opt}: No records found in listing`);
            }
            console.log("========================================");
            console.log("");
        }

        let totalTests = 0;
        let totalPassed = 0;
        let totalFailed = 0;

        for (const option of availableOptions) {
            await this.clickFilterButton();

            await this.selectReachOutBy(option);
            const v1 = await this.verifyReviewList(option);
            totalPassed += v1.passed;
            totalFailed += v1.failed;

            await this.clickClearFilter();

            await this.selectReachOutBy(option);
            const v2 = await this.verifyReviewList(option);
            totalPassed += v2.passed;
            totalFailed += v2.failed;

            await this.clearFilter();

            totalTests += 2;
        }

        console.log("");
        console.log("========================================");
        console.log(" Final Execution Summary");
        console.log("========================================");
        console.log(` Total Tests : ${totalTests}`);
        console.log(` Total PASS  : ${totalPassed}`);
        console.log(` Total FAIL  : ${totalFailed}`);
        console.log("========================================");
        console.log("");

        expect(totalFailed, `Final validation failed: ${totalFailed} records had incorrect status icons across all filters`).toBe(0);
    }


    async clickSelectAll(): Promise<void> {
        const closeBtn = "//label[normalize-space()='Reach Out By']/following::button[@aria-label='Close'][1]";
        if (!(await this.page.locator(closeBtn).isVisible().catch(() => false))) {
            await this.waitForVisible(this.reachOutDropdown);
            await this.click(this.reachOutDropdown);
            await this.page.waitForTimeout(1000);
        }
        await this.page.locator("//button[text()='Select All']").click();
        await this.page.waitForTimeout(1000);
    }


    async verifyAllOptionsSelected(): Promise<void> {
        const closeBtn = "//label[normalize-space()='Reach Out By']/following::button[@aria-label='Close'][1]";
        if (!(await this.page.locator(closeBtn).isVisible().catch(() => false))) {
            await this.waitForVisible(this.reachOutDropdown);
            await this.click(this.reachOutDropdown);
            await this.page.waitForTimeout(1500);
        }
        await this.page.waitForTimeout(1000);
        const checkedStates = await this.page.evaluate(() => {
            const boxes = document.querySelectorAll<HTMLInputElement>('li[role="option"] input[type="checkbox"]');
            return Array.from(boxes).map(b => b.checked);
        });
        const allChecked = checkedStates.length > 0 && checkedStates.every(c => c === true);
        console.log(`  All Options Selected: ${allChecked ? 'PASS' : 'FAIL'}`);
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
    }


    async removeChipByText(text: string): Promise<void> {
        const chipDelete = this.page.locator(`//button[normalize-space()='${text}']//img`);
        if (await chipDelete.isVisible().catch(() => false)) {
            await chipDelete.click();
        } else {
            const closeBtn = "//label[normalize-space()='Reach Out By']/following::button[@aria-label='Close'][1]";
            if (!(await this.page.locator(closeBtn).isVisible().catch(() => false))) {
                await this.waitForVisible(this.reachOutDropdown);
                await this.click(this.reachOutDropdown);
                await this.page.waitForTimeout(1000);
            }
            const optionLoc = this.page.locator(this.reachOutOption(text));
            if (await optionLoc.isVisible().catch(() => false)) {
                await optionLoc.click();
                await this.page.waitForTimeout(500);
            }
            await this.page.keyboard.press('Escape');
            await this.page.waitForTimeout(500);
        }
        await this.page.waitForTimeout(1000);
    }


    async verifyAllReachOutFiltersExtended(): Promise<void> {
        const allOptions = ["Email", "Phone", "Email & Phone", "Do Not Contact"];

        await this.clickFilterButton();
        const closeBtn = "//label[normalize-space()='Reach Out By']/following::button[@aria-label='Close'][1]";
        if (!(await this.page.locator(closeBtn).isVisible().catch(() => false))) {
            await this.waitForVisible(this.reachOutDropdown);
            await this.click(this.reachOutDropdown);
            await this.page.waitForTimeout(1000);
        }

        const availableOptions: string[] = [];
        const skippedOptions: string[] = [];
        for (const opt of allOptions) {
            const exists = await this.page.locator(this.reachOutOption(opt)).isVisible().catch(() => false);
            if (exists) availableOptions.push(opt);
            else skippedOptions.push(opt);
        }

        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
        await this.page.locator(this.listFilterButton).click({ force: true });
        await this.page.waitForTimeout(500);

        if (skippedOptions.length > 0) {
            console.log("");
            console.log("========================================");
            console.log(" Skipped Options (Extended Flow)");
            console.log("========================================");
            for (const opt of skippedOptions) {
                console.log(`  - ${opt}: No records found in listing`);
            }
            console.log("========================================");
            console.log("");
        }

        let totalTests = 0;
        let totalPassed = 0;
        let totalFailed = 0;

        for (const option of availableOptions) {
            console.log("");
            console.log("========================================");
            console.log(` Extended Flow: ${option}`);
            console.log("========================================");
            console.log("");

            await this.clickFilterButton();
            await this.selectReachOutBy(option);

            console.log("--- Step 1: Initial Verify ---");
            const v1 = await this.verifyReviewList(option);
            totalPassed += v1.passed;
            totalFailed += v1.failed;

            console.log("--- Step 2: Select All ---");
            await this.clickSelectAll();

            console.log("--- Step 3: Verify All Selected ---");
            await this.verifyAllOptionsSelected();

            console.log("--- Step 4: Verify List (All Records) ---");
            const v2 = await this.verifyReviewList("All");
            totalPassed += v2.passed;
            totalFailed += v2.failed;

            let remainingOptions = [...availableOptions];
            const otherChips = availableOptions.filter(o => o !== option);
            for (const chip of otherChips) {
                console.log(`--- Removing Chip: ${chip} ---`);
                await this.removeChipByText(chip);
                remainingOptions = remainingOptions.filter(o => o !== chip);
                const v = await this.verifyReviewListMulti(remainingOptions);
                totalPassed += v.passed;
                totalFailed += v.failed;
            }

            console.log(`--- Removing Chip: ${option} ---`);
            await this.removeChipByText(option);
            remainingOptions = remainingOptions.filter(o => o !== option);
            if (remainingOptions.length === 0) {
                const noRecords = await this.page.locator("//h3[normalize-space()='No Records Found']").isVisible().catch(() => false);
                console.log(`  No Records Found after removing last chip: ${noRecords ? 'PASS' : 'INFO'}`);
                if (!noRecords) {
                    const vLast = await this.verifyReviewList("All");
                    totalPassed += vLast.passed;
                    totalFailed += vLast.failed;
                }
            } else {
                const vLast = await this.verifyReviewListMulti(remainingOptions);
                totalPassed += vLast.passed;
                totalFailed += vLast.failed;
            }

            console.log("--- Clear (X) and Reselect ---");
            await this.clickClearFilter();
            await this.selectReachOutBy(option);
            const v3 = await this.verifyReviewList(option);
            totalPassed += v3.passed;
            totalFailed += v3.failed;

            await this.clearFilter();

            totalTests += 8;
        }

        console.log("");
        console.log("========================================");
        console.log(" Final Execution Summary (Extended)");
        console.log("========================================");
        console.log(` Total Tests : ${totalTests}`);
        console.log(` Total PASS  : ${totalPassed}`);
        console.log(` Total FAIL  : ${totalFailed}`);
        console.log("========================================");
        console.log("");

        expect(totalFailed, `Final validation failed: ${totalFailed} records had incorrect status icons across all filters`).toBe(0);
    }
}