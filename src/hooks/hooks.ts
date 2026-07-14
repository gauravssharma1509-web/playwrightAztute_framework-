import { test } from "@playwright/test";
import { ScreenshotUtil } from "../utils/ScreenshotUtil";

test.beforeEach(async () => {

    console.log("========== Test Started ==========");

});

test.afterEach(async ({ page }, testInfo) => {

    await ScreenshotUtil.capture(page, testInfo.title);

    console.log(`Status : ${testInfo.status}`);

    console.log("========== Test Completed ==========");

});