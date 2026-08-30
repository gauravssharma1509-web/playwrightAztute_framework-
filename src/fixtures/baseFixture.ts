import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginModule/LoginPage";

type MyFixtures = {
    loginPage: LoginPage;
};

export const test = base.extend<MyFixtures>({

    loginPage: [async ({ page }, use) => {

        console.log("========== LOGIN FIXTURE START ==========");

        const loginPage = new LoginPage(page);

        await loginPage.openApplication();

        await loginPage.loginToApplication();

        console.log("Login completed successfully.");

        await use(loginPage);

        console.log("========== LOGIN FIXTURE END ==========");

    }, { auto: true }]

});

export { expect };