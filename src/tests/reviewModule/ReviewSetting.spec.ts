import { test } from '../../fixtures/baseFixture';
import { ReviewSettingPage } from '../../pages/reviewModule/ReviewSettingPage';

let reviewSettingPage: ReviewSettingPage;

test.beforeEach(async ({ page, loginPage }) => {
    console.log("Inside beforeEach");
    reviewSettingPage = new ReviewSettingPage(page);
    await reviewSettingPage.openReviewSetting();
});


test('@Verify all Review Settings Elements', async ({ }) => {

    await reviewSettingPage.verifyAllReviewSettingsElements();
});
test('@Verify validation of Review Settings', async ({ }) => {

    await reviewSettingPage.verifyDailyEmailValidation();
    await reviewSettingPage.verifyUpdatedEmailValidation();
});
test('@Verify Review Settings tooltips info icons', async ({ }) => {
    await reviewSettingPage.verifyAllReviewSettingsTooltips();
});

test('Verify Set Goal and Jul input validation', async ({ }) => {
    await reviewSettingPage.verifyGoalInputValidation();
});
test('@Verify Business Social URL and Name matches Appointment Settings', async ({ }) => {
    await reviewSettingPage.verifyBusinessUrlOnAppointmentSettings();
});
