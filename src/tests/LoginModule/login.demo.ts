import { test } from "../../fixtures/baseFixture";

test("Login to Application", async ({ page, loginPage }) => {

    console.log("Inside Test");

    await page.waitForTimeout(10000);

});