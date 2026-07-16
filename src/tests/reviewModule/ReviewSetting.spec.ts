import { test } from '../../fixtures/baseFixture';
import { faker } from '@faker-js/faker';
import { ReviewSettingPage } from '../../pages/reviewModule/ReviewSettingPage';

let reviewSettingPage: ReviewSettingPage;

test.beforeEach(async ({ page , loginPage}) => {
    console.log("Inside beforeEach");
    reviewSettingPage = new ReviewSettingPage(page);
    await reviewSettingPage.openReviewSetting();
});


test('@Verify all Review Settings Elements', async ({ }) => {

    // await reviewSettingPage.clickReviewsMenu();
    // await reviewSettingPage.clickReviewSettingsOption();
    await reviewSettingPage.verifyAllReviewSettingsUI();
    await reviewSettingPage.toggleSetIndividualMonthlyGoalOn();
    await reviewSettingPage.verifyFutureGoalInputsAndSaveEnabled();
    await reviewSettingPage.toggleSocialMediaReviewLinkOn();
    await reviewSettingPage.verifyGoogleButtonEnabled();
    await reviewSettingPage.toggleEmailNotificationOn();
    await reviewSettingPage.verifyEmailRecipientEnabled();
    await reviewSettingPage.clickSaveButton();
    await reviewSettingPage.verifySaveConfirmationPopup();

    await reviewSettingPage.clickSaveChangesButton();

    await reviewSettingPage.verifyReviewSettingsSavedSuccessfully();
});
test('@Verify validation of Review Settings', async ({ }) => {

    await reviewSettingPage.clearDailyEmailChips();

    const dailyEmails = await reviewSettingPage.addMultipleDailyEmails(5);
    await reviewSettingPage.addDailyEmail(faker.internet.email());

    await reviewSettingPage.verifyDailyMaxEmailError();

    await reviewSettingPage.clearDailyInput();

    await reviewSettingPage.removeSpecificEmailChip(dailyEmails[3]);

    await reviewSettingPage.removeSpecificEmailChip(dailyEmails[2]);

    await reviewSettingPage.addDailyEmail(dailyEmails[0]);

    await reviewSettingPage.verifyDailyDuplicateEmailError();

    await reviewSettingPage.addDailyEmail('invalidemail');

    await reviewSettingPage.verifyDailyInvalidEmailError();

    await reviewSettingPage.verifyDailyEmailMaxLength();

    await reviewSettingPage.clearUpdatedEmailChips();

    const updatedEmails = await reviewSettingPage.addMultipleUpdatedEmails(3);
    await reviewSettingPage.addUpdatedEmail(faker.internet.email());

    await reviewSettingPage.verifyUpdatedMaxEmailError();

    await reviewSettingPage.clearUpdatedInput();

    await reviewSettingPage.removeSpecificEmailChip(updatedEmails[2]);

    await reviewSettingPage.removeSpecificEmailChip(updatedEmails[1]);

    await reviewSettingPage.addUpdatedEmail(updatedEmails[0]);

    await reviewSettingPage.verifyUpdatedDuplicateEmailError();

    await reviewSettingPage.addUpdatedEmail('invalidemail');

    await reviewSettingPage.verifyUpdatedInvalidEmailError();

    await reviewSettingPage.verifyUpdatedEmailMaxLength();
});
test('@Verify Review Settings tooltips info icons', async ({ }) => {
    await reviewSettingPage.verifyDailyFeedbackTooltip();
    await reviewSettingPage.verifyDirectReviewLinkTooltip();
    await reviewSettingPage.verifyEmailNotificationsTooltip();
});


test('Verify Set Goal and Jul input validation', async ({ }) => {
    await reviewSettingPage.fillSetGoalWithRandomNonNumeric();
    await reviewSettingPage.verifyInvalidValueVisible();
    await reviewSettingPage.verifySetGoalEmpty();
    await reviewSettingPage.fillSetGoalWithRandomThreeDigit();
    await reviewSettingPage.verifyInvalidValueNotVisible();
    await reviewSettingPage.clearSetGoal();
    await reviewSettingPage.verifyInvalidValueVisible();
    await reviewSettingPage.toggleSetIndividualMonthlyGoalOn();
    await reviewSettingPage.fillJulGoalWithRandomNonNumeric();
    await reviewSettingPage.verifyInvalidValueVisible();
    await reviewSettingPage.verifyJulGoalEmpty();
    await reviewSettingPage.fillJulGoalWithRandomThreeDigit();
    await reviewSettingPage.verifyInvalidValueNotVisible();
    await reviewSettingPage.clearJulGoal();
    await reviewSettingPage.verifyInvalidValueVisible();
});


test('@Verify Business Social URL and Name matches Appointment Settings', async ({ }) => {
    await reviewSettingPage.verifyBusinessUrlOnAppointmentSettings();
});
