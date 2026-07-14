import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginModule/LoginPage";

type MyFixtures = {

    loginPage: LoginPage;

};

export const test = base.extend<MyFixtures>({

    loginPage: async ({ page }, use) => {

        console.log("========== FIXTURE START ==========");

        const loginPage = new LoginPage(page);
        console.log("Before Open");
        await loginPage.openApplication();
        console.log("After Open");
        await loginPage.loginToApplication();
        console.log("After Login");
        console.log("Current URL :", page.url());

        await use(loginPage);

        console.log("========== FIXTURE END ==========");

    }

});

export { expect };