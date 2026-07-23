import { test } from '../../fixtures/baseFixture';
import { SendAndBulkReqPage } from '../../pages/reviewModule/SendAndBulkReqPage';

let sendAndBulkReqPage: SendAndBulkReqPage;

test.beforeEach(async ({ page, loginPage }) => {
    console.log("Inside beforeEach")
    sendAndBulkReqPage = new SendAndBulkReqPage(page);
    await sendAndBulkReqPage.openSendAndBulkReq();
    await sendAndBulkReqPage.clickSendReviewRequest();
});

test('@Verify Quick Review Patient Search matches Patient Listing', async ({ }) => {
    test.setTimeout(7200000);
    await sendAndBulkReqPage.verifyQuickReviewVsPatientListing();
});

test('@Verify Quick Review Patient Search Validations', async ({ }) => {
    test.setTimeout(300000);
    await sendAndBulkReqPage.validateQuickReviewPatientSearch();
});

test('@Verify Alphabet Wise Patient List', async ({ }) => {
    test.setTimeout(7200000);
    await sendAndBulkReqPage.validateAlphabetWisePatientList();
});

test('@Verify Message Field Accepts Valid Input 600 Characters', async ({ }) => {
    test.setTimeout(120000);
    await sendAndBulkReqPage.verifyMessageFieldAcceptsValidInput();
});

test('@Verify Message Field Accepts Each Character Type up to Maximum Limit', async ({ }) => {
    test.setTimeout(180000);
    await sendAndBulkReqPage.verifyMessageFieldAcceptsEachCharTypeUpToMax();
});

test('@Verify User Can Open Add Template Popup', async ({ }) => {
    test.setTimeout(120000);
    await sendAndBulkReqPage.verifyAddTemplatePopup();
});

test('@Verify Successful Template Creation', async ({ }) => {
    test.setTimeout(120000);
    await sendAndBulkReqPage.verifySuccessfulTemplateCreation();
});

test('@Verify Mandatory Field Validation', async ({ }) => {
    test.setTimeout(120000);
    await sendAndBulkReqPage.verifyMandatoryFieldValidation();
});

test('@Verify Schedule Review Checkbox Functionality', async ({ }) => {
    test.setTimeout(120000);
    await sendAndBulkReqPage.verifyScheduleReviewCheckbox();
});