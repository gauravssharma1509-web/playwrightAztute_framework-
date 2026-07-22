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
    test.setTimeout(600000);
    await sendAndBulkReqPage.validateAlphabetWisePatientList();
});