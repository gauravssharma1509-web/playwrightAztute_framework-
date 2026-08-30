import { test } from "../../fixtures/baseFixture";
import { ManageModulePage } from "../../pages/loginModule/ManageModulePage";

let manageModulePage: ManageModulePage;

test.beforeEach(async ({ page }) => {

    manageModulePage = new ManageModulePage(page);

});

test("Verify New Referral navigation", async () => {

    await manageModulePage.navigateToNewReferral();

});