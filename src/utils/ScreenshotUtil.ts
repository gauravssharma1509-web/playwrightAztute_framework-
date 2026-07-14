import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import * as allure from 'allure-js-commons';

export class ScreenshotUtil {

    static async capture(page: Page, testName: string): Promise<void> {

        const folder = "reports/screenshots";

        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }

        const date = new Date();

        const timestamp =
            `${date.getFullYear()}-` +
            `${String(date.getMonth() + 1).padStart(2, '0')}-` +
            `${String(date.getDate()).padStart(2, '0')}_` +
            `${String(date.getHours()).padStart(2, '0')}-` +
            `${String(date.getMinutes()).padStart(2, '0')}-` +
            `${String(date.getSeconds()).padStart(2, '0')}`;

        const screenshotPath = path.join(
            folder,
            `${testName}_${timestamp}.png`
        );

        await page.screenshot({
            path: screenshotPath,
            fullPage: true
        });

        
        const imageBuffer = fs.readFileSync(screenshotPath);

        await allure.attachment(
            "Screenshot",
            imageBuffer,
            "image/png"
        );

    }

}