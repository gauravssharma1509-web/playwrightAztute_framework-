import { Page, expect } from '@playwright/test';
import { BasePage } from '../BasePage';
import { faker } from '@faker-js/faker';

export class SendAndBulkReqPage extends BasePage {

    constructor(page: Page) {
        super(page);
    }


 // -------------------------XPATH -------------------



    private reviewsMenu = "//span[normalize-space()='Reviews']";
    private reviewRequest = "//a[normalize-space()='Review Request']";
    private sendReviewRequestBtn = "//button[contains(normalize-space(),'Send Review Request')]";


    private drawerTitle = "//h4[normalize-space()='Send Review Request']";
    private quickReviewTab = "//div[normalize-space()='Quick Review']";
    private bulkReviewTab = "//div[normalize-space()='Bulk Review']";
    private patientSearchInput = "//input[@placeholder='Search patient name']";
    private patientSearchBtn = "//input[@placeholder='Search patient name']/ancestor::div[contains(@class,'MuiInputBase-root')]/following::button[1]";
    private popupSearchInput = "//input[@placeholder='Search among patients']";
    private popupPatientNames = "//div[contains(@class,'css-zce81d')]//p[1]";
    private popupPatientPhones = "//div[contains(@class,'css-zce81d')]//p[2]";
    private popupPatientEmails = "//div[contains(@class,'css-zce81d')]//p[3]";
    private closeDrawerBtn = "//button[.//span[normalize-space()='close']]";
    private patientsMenu = "//span[normalize-space()='Patients']";
    private patientListingMenu = "//a[normalize-space()='Patient Listing']";
    private patientListingSearch = "//button[contains(normalize-space(),'Add Patient')]/preceding::input[1]";
    private patientName = "(//tbody/tr)[1]/td[1]";
    private patientEmail = "(//tbody/tr)[1]/td[3]";
    private patientPhone = "(//tbody/tr)[1]/td[6]//p";
    private listingRowsPerPageDropdown = "//span[normalize-space()='View']/following::div[@role='combobox'][1]";
    private listingRowsPerPageOption100 = "//li[@role='option' and normalize-space()='100']";
    private listingNextBtn = "//div[contains(@class,'MuiTablePagination-actions')]//button[last()]";
    private listingNameCells = "//tbody/tr/td[1]";
    private listingEmailCells = "//tbody/tr/td[3]";
    private listingPhoneCells = "//tbody/tr/td[6]//p";
    private listingNoRecords = "//td[contains(normalize-space(),'No Records Found')]";
    private popupNoOptions = ".MuiAutocomplete-noOptions";
    private popupClearBtn = "//span[normalize-space()='clear']";
    private alphabetLetters = "//div[@role='presentation']//div[contains(@class,'MuiBox-root')]//p[string-length(text())=1]";
    private patientCardName = "//div[@role='presentation']//div[contains(@class,'cursor-pointer')]//h5";
    private patientCardContact = "//div[@role='presentation']//div[contains(@class,'cursor-pointer')]//p[1]";
    private patientCardEmail = "//div[@role='presentation']//div[contains(@class,'cursor-pointer')]//p[2]";
    private allPatientsLoaded = "//div[@role='presentation']//p[normalize-space()='All patients loaded']";
    private avatarLetter = "//div[@role='presentation']//div[contains(@class,'css-zce81d')]//div[string-length(normalize-space())=1]";





































    
    // ------------------------ACTION ----------------------------
    async openSendAndBulkReq() {

        await this.waitForVisible(this.reviewsMenu);
        await this.click(this.reviewsMenu);

        await this.waitForVisible(this.reviewRequest);
        await this.click(this.reviewRequest);

        await this.page.waitForLoadState('networkidle');

        console.log("Review Request Page Opened");
    }

    async clickSendReviewRequest() {

        await this.waitForVisible(this.sendReviewRequestBtn);
        await this.click(this.sendReviewRequestBtn);
        await this.page.waitForLoadState("networkidle");
        console.log("Clicked on Send Review Request");
    }

    async verifyQuickReviewPatientSearch(): Promise<void> {
        await expect(this.page.locator(this.drawerTitle)).toBeVisible();
        await expect(this.page.locator(this.quickReviewTab)).toBeVisible();
        await expect(this.page.locator(this.bulkReviewTab)).toBeVisible();
        await expect(this.page.locator(this.patientSearchInput)).toBeVisible();
        await this.click(this.patientSearchBtn);
        await expect(this.page.locator(this.popupSearchInput)).toBeVisible();

        const patients: { name: string; phone: string; email: string }[] = [];
        let idleScrolls = 0;
        const maxIdleScrolls = 10;

        while (idleScrolls < maxIdleScrolls) {
            const names = await this.page.locator(this.popupPatientNames).allTextContents();
            const phones = await this.page.locator(this.popupPatientPhones).allTextContents();
            const emails = await this.page.locator(this.popupPatientEmails).allTextContents();

            let newAdded = 0;
            for (let i = 0; i < names.length; i++) {
                const name = names[i]?.trim() ?? '';
                const phone = phones[i]?.trim() ?? '';
                const email = emails[i]?.trim() ?? '';
                if (!patients.some(p => p.name === name && p.phone === phone && p.email === email)) {
                    patients.push({ name, phone, email });
                    newAdded++;
                }
            }

            if (newAdded === 0) {
                idleScrolls++;
            } else {
                idleScrolls = 0;
            }

            if (idleScrolls >= maxIdleScrolls) break;

            await this.page.locator('[role="listbox"]').evaluate(el => {
                el.scrollTop = el.scrollHeight;
            });
            await this.page.waitForTimeout(800);
        }

        console.log("");
        for (let i = 0; i < patients.length; i++) {
            console.log(`${i + 1}.`);
            console.log(`   Name    : ${patients[i].name}`);
            console.log(`   Email   : ${patients[i].email}`);
            console.log(`   Phone   : ${patients[i].phone}`);
            console.log("");
        }
        console.log(`Total Patients Captured : ${patients.length}`);

        await this.page.locator("//div[contains(@class,'MuiBackdrop-invisible')]").click({ force: true });
        await this.page.waitForTimeout(1000);
        await this.click(this.closeDrawerBtn);

        await this.waitForVisible(this.patientsMenu);
        await this.click(this.patientsMenu);
        await this.waitForVisible(this.patientListingMenu);
        await this.click(this.patientListingMenu);
        await this.page.waitForTimeout(2000);
        await expect(this.page.locator(this.patientListingSearch)).toBeVisible();

        let matched = 0;
        let mismatched = 0;
        let verified = 0;

        console.log("");
        console.log("+-----+----------------------+----------------------+------------+------------------------------+------------------------------+-------------+-----------------+-----------------+---------------+--------+");
        console.log("| S.No| Popup Name           | Listing Name         | Name Match | Popup Email                  | Listing Email                | Email Match | Popup Contact   | Listing Contact | Contact Match | Result |");
        console.log("+-----+----------------------+----------------------+------------+------------------------------+------------------------------+-------------+-----------------+-----------------+---------------+--------+");

        for (let i = 0; i < patients.length; i++) {
            const p = patients[i];
            await this.page.locator(this.patientListingSearch).click();
            await this.page.keyboard.press('Control+a');
            await this.page.keyboard.press('Backspace');
            await this.page.keyboard.type(p.name);
            await this.page.waitForTimeout(1000);

            const rows = this.page.locator("//tbody/tr");
            const rowCount = await rows.count();

            let nameMatch = false;
            let emailMatch = false;
            let phoneMatch = false;

            if (rowCount > 0) {
                const listName = (await this.page.locator(this.patientName).textContent())?.trim() ?? '';
                const listEmail = (await this.page.locator(this.patientEmail).textContent())?.trim() ?? '';
                const listPhone = (await this.page.locator(this.patientPhone).textContent())?.trim() ?? '';

                const cleanName = listName.replace(/^avatar\s+/i, '').trim();
                nameMatch = cleanName.toLowerCase() === p.name.toLowerCase();
                emailMatch = listEmail.toLowerCase() === p.email.toLowerCase();
                phoneMatch = listPhone === p.phone;

                const isIdentified = phoneMatch || (emailMatch && p.email !== '');
                const result = isIdentified ? 'PASS' : 'FAIL';
                if (result === 'PASS') matched++;
                else mismatched++;
                verified++;

                console.log(
                    `| ${String(i + 1).padEnd(3)} ` +
                    `| ${p.name.padEnd(20)} ` +
                    `| ${cleanName.padEnd(20)} ` +
                    `| ${(nameMatch ? 'YES' : 'NO').padEnd(10)} ` +
                    `| ${p.email.padEnd(28)} ` +
                    `| ${listEmail.padEnd(28)} ` +
                    `| ${(emailMatch ? 'YES' : 'NO').padEnd(11)} ` +
                    `| ${p.phone.padEnd(15)} ` +
                    `| ${listPhone.padEnd(15)} ` +
                    `| ${(phoneMatch ? 'YES' : 'NO').padEnd(13)} ` +
                    `| ${result.padEnd(6)} |`
                );
            }
        }

        console.log("+-----+----------------------+----------------------+------------+------------------------------+------------------------------+-------------+-----------------+-----------------+---------------+--------+");
        console.log("");
        console.log("==================================== SUMMARY ====================================");
        console.log("");
        console.log(`Total Patients Captured : ${patients.length}`);
        console.log(`Total Patients Verified : ${verified}`);
        console.log(`Matched Records         : ${matched}`);
        console.log(`Mismatched Records      : ${mismatched}`);
        console.log("");
        console.log("=================================================================================");
        console.log("");

        expect(mismatched, `${mismatched} records did not match between popup and listing`).toBe(0);
    }

    async verifyQuickReviewVsPatientListing(): Promise<void> {
        await expect(this.page.locator(this.drawerTitle)).toBeVisible();
        await expect(this.page.locator(this.quickReviewTab)).toBeVisible();
        await expect(this.page.locator(this.bulkReviewTab)).toBeVisible();
        await expect(this.page.locator(this.patientSearchInput)).toBeVisible();
        await this.click(this.patientSearchBtn);
        await expect(this.page.locator(this.popupSearchInput)).toBeVisible();

        // Helper to capture patients currently rendered in the popup DOM
        const capturePopupPatients = (): Promise<{ name: string; phone: string; email: string }[]> => {
            return this.page.evaluate(() => {
                const input = document.querySelector('input[placeholder="Search among patients"]');
                if (!input) return [];
                const popup = input.closest('[role="presentation"]')
                    || input.closest('[class*="MuiPopper"]')
                    || input.closest('[class*="MuiAutocomplete"]')
                    || input.closest('[class*="MuiPaper"]')
                    || input.parentElement?.parentElement?.parentElement;
                if (!popup) return [];
                const allPs = Array.from(popup.querySelectorAll('p'));
                const patients: { name: string; phone: string; email: string }[] = [];
                const phonePattern = /^\(\d{3}\)\s*\d{3}-\d{4}$/;
                for (let i = 0; i < allPs.length; i++) {
                    const text = allPs[i].textContent?.trim() || '';
                    if (phonePattern.test(text)) {
                        const name = allPs[i - 1]?.textContent?.trim() || '';
                        const next = allPs[i + 1]?.textContent?.trim() || '';
                        const email = next.includes('@') ? next : '';
                        if (name) patients.push({ name, phone: text, email });
                    }
                }
                return patients;
            });
        };

        // Helper to scroll the popup patient list container incrementally
        let scrolledToTop = false;
        const scrollPopupDown = (): Promise<boolean> => {
            return this.page.evaluate((alreadyToTop) => {
                const input = document.querySelector('input[placeholder="Search among patients"]');
                if (!input) return false;
                const popup = input.closest('[role="presentation"]')
                    || input.closest('[class*="MuiPopper"]')
                    || input.closest('[class*="MuiAutocomplete"]')
                    || input.closest('[class*="MuiPaper"]')
                    || input.parentElement?.parentElement?.parentElement;
                if (!popup) return false;
                for (const el of popup.querySelectorAll('*')) {
                    try {
                        const s = window.getComputedStyle(el);
                        if ((s.overflowY === 'scroll' || s.overflowY === 'auto') && el.scrollHeight > el.clientHeight) {
                            if (!alreadyToTop) {
                                el.scrollTop = 0;
                            } else {
                                el.scrollTop += el.clientHeight * 0.95;
                            }
                            return true;
                        }
                    } catch { }
                }
                return false;
            }, scrolledToTop);
        };

        const popupPatients: { name: string; phone: string; email: string }[] = [];
        let idleScrolls = 0;
        const maxIdleScrolls = 10;

        await this.page.waitForTimeout(300);

        while (idleScrolls < maxIdleScrolls) {
            const batch = await capturePopupPatients();
            let newAdded = 0;
            for (const p of batch) {
                if (!popupPatients.some(x => x.name === p.name && x.phone === p.phone && x.email === p.email)) {
                    popupPatients.push(p);
                    newAdded++;
                }
            }
            if (newAdded === 0) idleScrolls++;
            else idleScrolls = 0;

            if (idleScrolls >= maxIdleScrolls) break;

            await scrollPopupDown();
            scrolledToTop = true;
            await this.page.waitForTimeout(400);
        }

        console.log("");
        for (let i = 0; i < popupPatients.length; i++) {
            console.log(`${i + 1}.`);
            console.log(`   Name    : ${popupPatients[i].name}`);
            console.log(`   Email   : ${popupPatients[i].email}`);
            console.log(`   Phone   : ${popupPatients[i].phone}`);
            console.log("");
        }
        console.log(`Total Patients Captured : ${popupPatients.length}`);

        await this.page.locator("//div[contains(@class,'MuiBackdrop-invisible')]").click({ force: true });
        await this.page.waitForTimeout(1000);
        await this.click(this.closeDrawerBtn);

        await this.waitForVisible(this.patientsMenu);
        await this.click(this.patientsMenu);
        await this.waitForVisible(this.patientListingMenu);
        await this.click(this.patientListingMenu);
        await this.page.waitForTimeout(2000);
        await expect(this.page.locator(this.patientListingSearch)).toBeVisible();

        await this.page.locator(this.listingRowsPerPageDropdown).click();
        await this.page.locator(this.listingRowsPerPageOption100).click();
        await this.page.waitForTimeout(2000);

        const listingPatients: { name: string; email: string; phone: string }[] = [];

        while (true) {
            const names = await this.page.locator(this.listingNameCells).allTextContents();
            const emails = await this.page.locator(this.listingEmailCells).allTextContents();
            const phones = await this.page.locator(this.listingPhoneCells).allTextContents();

            const noRecord = await this.page.locator(this.listingNoRecords).isVisible().catch(() => false);
            if (!noRecord) {
                for (let i = 0; i < names.length; i++) {
                    const name = (names[i]?.trim() ?? '').replace(/^avatar\s+/i, '').trim();
                    const email = emails[i]?.trim() ?? '';
                    const phone = phones[i]?.trim() ?? '';
                    if (name && !listingPatients.some(p => p.name === name && p.phone === phone && p.email === email)) {
                        listingPatients.push({ name, email, phone });
                    }
                }
            }

            const clicked = await this.page.evaluate(() => {
                const btns = Array.from(document.querySelectorAll('button'));
                for (const btn of btns) {
                    const aria = (btn.getAttribute('aria-label') || '').toLowerCase();
                    if (aria.includes('next')) {
                        if (btn.disabled || btn.classList.contains('Mui-disabled')) return 'disabled';
                        btn.scrollIntoView();
                        btn.click();
                        return 'clicked';
                    }
                }
                for (const btn of btns) {
                    if (btn.textContent?.trim() === '>' || btn.textContent?.trim() === '›') {
                        if (btn.disabled || btn.classList.contains('Mui-disabled')) return 'disabled';
                        btn.scrollIntoView();
                        btn.click();
                        return 'clicked';
                    }
                }
                return 'not_found';
            });

            if (clicked !== 'clicked') break;

            await this.page.waitForTimeout(1000);
        }

        console.log("");
        console.log("============= Patient Listing =============");
        console.log("");
        for (let i = 0; i < listingPatients.length; i++) {
            console.log(`${i + 1}.`);
            console.log(`   Name    : ${listingPatients[i].name}`);
            console.log(`   Email   : ${listingPatients[i].email}`);
            console.log(`   Phone   : ${listingPatients[i].phone}`);
            console.log("");
        }
        console.log(`Total Patient Listing Records : ${listingPatients.length}`);

        let matched = 0;
        let mismatched = 0;
        let missingInListing = 0;
        const usedListing = new Array(listingPatients.length).fill(false);

        console.log("");
        console.log("+-----+----------------------+----------------------+------------+------------------------------+------------------------------+-------------+-----------------+-----------------+---------------+--------+");
        console.log("| S.No| Popup Name           | Listing Name         | Name Match | Popup Email                  | Listing Email                | Email Match | Popup Contact   | Listing Contact | Contact Match | Result |");
        console.log("+-----+----------------------+----------------------+------------+------------------------------+------------------------------+-------------+-----------------+-----------------+---------------+--------+");

        for (let i = 0; i < popupPatients.length; i++) {
            const pp = popupPatients[i];
            let matchIdx = -1;
            let nameMatch = false;
            let emailMatch = false;
            let phoneMatch = false;
            let bestName = '';
            let bestEmail = '';
            let bestPhone = '';

            for (let j = 0; j < listingPatients.length; j++) {
                if (usedListing[j]) continue;
                const lp = listingPatients[j];
                const nm = lp.name.toLowerCase() === pp.name.toLowerCase();
                const em = lp.email.toLowerCase() === pp.email.toLowerCase();
                const ph = lp.phone === pp.phone;
                if (nm && em && ph) {
                    matchIdx = j;
                    nameMatch = true;
                    emailMatch = true;
                    phoneMatch = true;
                    bestName = lp.name;
                    bestEmail = lp.email;
                    bestPhone = lp.phone;
                    break;
                }
                if (lp.phone === pp.phone) {
                    matchIdx = j;
                    nameMatch = lp.name.toLowerCase() === pp.name.toLowerCase();
                    emailMatch = lp.email.toLowerCase() === pp.email.toLowerCase();
                    phoneMatch = true;
                    bestName = lp.name;
                    bestEmail = lp.email;
                    bestPhone = lp.phone;
                }
            }

            if (matchIdx >= 0) {
                usedListing[matchIdx] = true;
                const result = (nameMatch && emailMatch && phoneMatch) ? 'PASS' : 'FAIL';
                if (result === 'PASS') matched++;
                else mismatched++;

                console.log(
                    `| ${String(i + 1).padEnd(3)} ` +
                    `| ${pp.name.padEnd(20)} ` +
                    `| ${bestName.padEnd(20)} ` +
                    `| ${(nameMatch ? 'YES' : 'NO').padEnd(10)} ` +
                    `| ${pp.email.padEnd(28)} ` +
                    `| ${bestEmail.padEnd(28)} ` +
                    `| ${(emailMatch ? 'YES' : 'NO').padEnd(11)} ` +
                    `| ${pp.phone.padEnd(15)} ` +
                    `| ${bestPhone.padEnd(15)} ` +
                    `| ${(phoneMatch ? 'YES' : 'NO').padEnd(13)} ` +
                    `| ${result.padEnd(6)} |`
                );
            } else {
                missingInListing++;
                mismatched++;
                console.log(
                    `| ${String(i + 1).padEnd(3)} ` +
                    `| ${pp.name.padEnd(20)} ` +
                    `| ${'—'.padEnd(20)} ` +
                    `| ${'NO'.padEnd(10)} ` +
                    `| ${pp.email.padEnd(28)} ` +
                    `| ${'—'.padEnd(28)} ` +
                    `| ${'NO'.padEnd(11)} ` +
                    `| ${pp.phone.padEnd(15)} ` +
                    `| ${'—'.padEnd(15)} ` +
                    `| ${'NO'.padEnd(13)} ` +
                    `| ${'FAIL'.padEnd(6)} |`
                );
            }
        }

        const missingInPopup = usedListing.filter(u => !u).length;

        console.log("+-----+----------------------+----------------------+------------+------------------------------+------------------------------+-------------+-----------------+-----------------+---------------+--------+");
        console.log("");
        console.log("============================================================");
        console.log("");
        console.log(`Popup Patients Captured      : ${popupPatients.length}`);
        console.log(`Patient Listing Captured     : ${listingPatients.length}`);
        console.log(`Matched Records              : ${matched}`);
        console.log(`Mismatched Records           : ${mismatched}`);
        console.log(`Missing in Popup             : ${missingInPopup}`);
        console.log(`Missing in Patient Listing   : ${missingInListing}`);
        console.log("");
        console.log("============================================================");
        console.log("");

        expect(mismatched, `${mismatched} records did not match between popup and listing`).toBe(0);
    }












    
    async validateQuickReviewPatientSearch(): Promise<void> {
        await expect(this.page.locator(this.drawerTitle)).toBeVisible();
        await expect(this.page.locator(this.quickReviewTab)).toBeVisible();
        await expect(this.page.locator(this.bulkReviewTab)).toBeVisible();
        await expect(this.page.locator(this.patientSearchInput)).toBeVisible();
        await this.click(this.patientSearchBtn);
        await expect(this.page.locator(this.popupSearchInput)).toBeVisible();
        await this.page.waitForTimeout(1000);

        const testData = [
            { label: 'Single character (1 char)', value: 'A', shouldTriggerSearch: false },
            { label: 'Two characters', value: 'Ab', shouldTriggerSearch: true },
            { label: 'Valid patient name', value: 'Priya Kamte', shouldTriggerSearch: true },
            { label: 'Valid patient email', value: 'priyakamte@medianv.com', shouldTriggerSearch: true },
            { label: 'Valid patient phone', value: '(345) 678-8787', shouldTriggerSearch: true },
            { label: 'Dynamic full name', value: faker.person.fullName(), shouldTriggerSearch: true },
            { label: 'Dynamic valid email', value: faker.internet.email(), shouldTriggerSearch: true },
            { label: 'Dynamic invalid email', value: 'invalid-email@', shouldTriggerSearch: true },
            { label: 'Dynamic phone number', value: faker.phone.number(), shouldTriggerSearch: true },
            { label: 'Single special character (1 char)', value: '!', shouldTriggerSearch: false },
            { label: 'Multiple special characters', value: '!@#$%^&*()', shouldTriggerSearch: true },
            { label: 'Alphanumeric string', value: 'abc123', shouldTriggerSearch: true },
            { label: 'Spaces only', value: '   ', shouldTriggerSearch: true },
            { label: 'Leading and trailing spaces', value: '  John  ', shouldTriggerSearch: true },
            { label: '1000-character string', value: 'a'.repeat(1000), shouldTriggerSearch: true },
            { label: 'SQL Injection string', value: "'; DROP TABLE patients; --", shouldTriggerSearch: true },
            { label: 'XSS string', value: '<script>alert("XSS")</script>', shouldTriggerSearch: true },
        ];

        for (const tc of testData) {
            console.log("");
            console.log("========================================");
            console.log(`Test Case  : ${tc.label}`);
            console.log(`Search Value : ${tc.value}`);
            console.log("========================================");

            await this.page.locator("//div[contains(@class,'MuiBackdrop-invisible')]").click({ force: true }).catch(() => true);
            await this.page.waitForTimeout(500);
            await this.click(this.patientSearchBtn);
            await expect(this.page.locator(this.popupSearchInput)).toBeVisible();
            await this.page.locator(this.popupSearchInput).click();
            await this.page.waitForTimeout(500);

            if (!tc.shouldTriggerSearch) {
                await this.page.keyboard.type(tc.value);
                await this.page.waitForTimeout(2000);

                const names = await this.page.locator(this.popupPatientNames).allTextContents();
                expect(names.length, 'Search should not trigger for single character').toBeGreaterThan(0);
                console.log("Search did NOT trigger (as expected for single character)");
                console.log(`Records visible (unchanged) : ${names.length}`);
                console.log("========================================");
                continue;
            }

            await this.page.keyboard.type(tc.value);
            await this.page.waitForTimeout(2000);

            const noOptions = await this.page.locator(this.popupNoOptions).isVisible().catch(() => false);
            const names = await this.page.locator(this.popupPatientNames).allTextContents();
            const phones = await this.page.locator(this.popupPatientPhones).allTextContents();
            const emails = await this.page.locator(this.popupPatientEmails).allTextContents();

            if (noOptions || names.length === 0) {
                console.log("");
                console.log("========================================");
                console.log(`Search Value : ${tc.value}`);
                console.log("========================================");
                console.log("No patient found");
                console.log(`Total Records : 0`);
                console.log("========================================");
            } else {

                console.log(`Total Records : ${names.length}`);
                console.log("");
                console.log("| Patient Name              | Phone Number     | Email Address                   |");
                console.log("|---------------------------|------------------|--------------------------------|");
                for (let i = 0; i < names.length; i++) {
                    const name = names[i]?.trim() || 'N/A';
                    const phone = phones[i]?.trim() || 'N/A';
                    const email = emails[i]?.trim() || 'N/A';
                    console.log(`| ${name.padEnd(25)} | ${phone.padEnd(16)} | ${email.padEnd(30)} |`);
                }
                console.log("========================================");
            }
        }
    }

    async validateAlphabetWisePatientList(): Promise<void> {
        await expect(this.page.locator(this.drawerTitle)).toBeVisible();
        await expect(this.page.locator(this.quickReviewTab)).toBeVisible();
        await expect(this.page.locator(this.bulkReviewTab)).toBeVisible();
        await expect(this.page.locator(this.patientSearchInput)).toBeVisible();
        await this.click(this.patientSearchBtn);
        await expect(this.page.locator(this.popupSearchInput)).toBeVisible();
        await this.page.waitForTimeout(1000);

        const alphabetCount = await this.page.locator(this.alphabetLetters).count();
        console.log(`Found ${alphabetCount} alphabet letters`);

        for (let idx = 0; idx < alphabetCount; idx++) {
            const letter = (await this.page.locator(this.alphabetLetters).nth(idx).textContent())?.trim() || '';

            console.log("");
            console.log("=========================================================");
            console.log(`Alphabet : ${letter}`);
            console.log("=========================================================");

            await this.page.locator(this.alphabetLetters).nth(idx).click();
            await this.page.waitForTimeout(1500);

            const avatarText = await this.page.locator(this.avatarLetter).nth(0).textContent() || '';
            console.log(`Avatar displays : ${avatarText.trim()}`);
            expect(avatarText.trim(), `Avatar should display ${letter}`).toBe(letter);

            await this.page.evaluate(() => {
                const input = document.querySelector('input[placeholder="Search among patients"]');
                if (!input) return;
                const popup = input.closest('[role="presentation"]')
                    || input.closest('[class*="MuiPopper"]')
                    || input.closest('[class*="MuiAutocomplete"]')
                    || input.closest('[class*="MuiPaper"]')
                    || input.parentElement?.parentElement?.parentElement;
                if (!popup) return;
                for (const el of popup.querySelectorAll('*')) {
                    try {
                        const s = window.getComputedStyle(el);
                        if ((s.overflowY === 'scroll' || s.overflowY === 'auto') && el.scrollHeight > el.clientHeight) {
                            el.scrollTop = 0;
                            return;
                        }
                    } catch { }
                }
            });
            await this.page.waitForTimeout(400);

            console.log("Scrolling to bottom...");

            let allLoaded = await this.page.locator(this.allPatientsLoaded).isVisible().catch(() => false);
            let attempts = 0;

            while (!allLoaded && attempts < 50) {
                await this.page.evaluate(() => {
                    const input = document.querySelector('input[placeholder="Search among patients"]');
                    if (!input) return;
                    const popup = input.closest('[role="presentation"]')
                        || input.closest('[class*="MuiPopper"]')
                        || input.closest('[class*="MuiAutocomplete"]')
                        || input.closest('[class*="MuiPaper"]')
                        || input.parentElement?.parentElement?.parentElement;
                    if (!popup) return;
                    for (const el of popup.querySelectorAll('*')) {
                        try {
                            const s = window.getComputedStyle(el);
                            if ((s.overflowY === 'scroll' || s.overflowY === 'auto') && el.scrollHeight > el.clientHeight) {
                                el.scrollTop += el.clientHeight * 0.95;
                                return;
                            }
                        } catch { }
                    }
                });

                await this.page.waitForTimeout(600);
                allLoaded = await this.page.locator(this.allPatientsLoaded).isVisible().catch(() => false);
                attempts++;
            }

            console.log("✓ All patients loaded");

            const cards = await this.page.evaluate(() => {
                const input = document.querySelector('input[placeholder="Search among patients"]');
                if (!input) return [];
                const popup = input.closest('[role="presentation"]')
                    || input.closest('[class*="MuiPopper"]')
                    || input.closest('[class*="MuiAutocomplete"]')
                    || input.closest('[class*="MuiPaper"]')
                    || input.parentElement?.parentElement?.parentElement;
                if (!popup) return [];
                const cardEls = Array.from(popup.querySelectorAll('[class*="css-zce81d"]'));
                return cardEls.map(card => {
                    const avatar = card.querySelector('[class*="css-1d2uzlm"]')?.textContent?.trim() || '';
                    const ps = card.querySelectorAll('p');
                    const name = ps[0]?.textContent?.trim() || '';
                    const contact = ps[1]?.textContent?.trim() || 'N/A';
                    const email = ps[2]?.textContent?.trim() || 'N/A';
                    return { avatar, name, contact, email };
                });
            });

            let validCount = 0;
            let mismatchedCount = 0;

            if (cards.length === 0) {
                console.log("");
                console.log(`No patients found for alphabet ${letter}`);
                console.log("");
                console.log(`Total Patients  : 0`);
                console.log(`Valid Count     : 0`);
                console.log(`Mismatched Count: 0`);
                console.log(`Test Status     : PASS`);
            } else {
                for (let i = 0; i < cards.length; i++) {
                    const card = cards[i];
                    const avatarMatch = card.avatar.toUpperCase() === letter.toUpperCase();
                    const nameMatch = card.name.toUpperCase().startsWith(letter.toUpperCase());

                    if (!avatarMatch || !nameMatch) {
                        mismatchedCount++;
                        console.log("");
                        console.log(`Patient ${i + 1}`);
                        console.log("----------------------------------------");
                        console.log(`Status  : MISMATCHED`);
                        console.log(`Name    : ${card.name}`);
                        console.log(`Contact : ${card.contact}`);
                        console.log(`Email   : ${card.email}`);
                    } else {
                        validCount++;
                        console.log("");
                        console.log(`Patient ${i + 1}`);
                        console.log("----------------------------------------");
                        console.log(`Status  : VALID`);
                        console.log(`Name    : ${card.name}`);
                        console.log(`Contact : ${card.contact}`);
                        console.log(`Email   : ${card.email}`);
                    }
                }

                console.log("");
                console.log(`Total Patients  : ${cards.length}`);
                console.log(`Valid Count     : ${validCount}`);
                console.log(`Mismatched Count: ${mismatchedCount}`);
                console.log(`Test Status     : ${mismatchedCount === 0 ? 'PASS' : 'FAILED'}`);
            }

            if (idx < alphabetCount - 1) {
                await this.page.locator("//div[contains(@class,'MuiBackdrop-invisible')]").click({ force: true }).catch(() => true);
                await this.page.waitForTimeout(500);
                await this.click(this.patientSearchBtn);
                await expect(this.page.locator(this.popupSearchInput)).toBeVisible();
                await this.page.waitForTimeout(1000);
            }
        }
    }
}
