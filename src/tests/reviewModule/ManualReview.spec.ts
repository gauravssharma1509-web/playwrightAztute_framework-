import { test } from '../../fixtures/baseFixture';
import { ManualReviewPage } from '../../pages/reviewModule/ManualReviewPage';

let manualReviewPage: ManualReviewPage;

test.beforeEach(async ({ page, loginPage }) => {
    console.log("Inside beforeEach");
    manualReviewPage = new ManualReviewPage(page);
    await manualReviewPage.openManualReviews();
});

test('@Verify sorting functionality for Name, Created Date and Updated Date columns', async ({ }) => {
    test.setTimeout(60000);
    await manualReviewPage.verifySortingFunctionality();
});

test('@Verify Records Per Page and Pagination', async ({ }) => {
    await manualReviewPage.verifyRecordsPerPageAndPagination();
});

test('@Verify Delete Manual Review with Cancel and Delete Confirmation', async ({ }) => {
    await manualReviewPage.verifyDeleteManualReview();
});

test('@Verify Manual Review Search Functionality', async ({ }) => {
    test.setTimeout(180000);
    await manualReviewPage.verifyManualReviewSearch();
});

test('@Verify Manual Review Date Filter Functionality', async ({ }) => {
    test.setTimeout(600000);
    await manualReviewPage.verifyManualReviewDateFilter();
});

test('@Verify Reach Out By Dropdown Filter options and status icons', async ({ }) => {
    test.setTimeout(180000);
    await manualReviewPage.verifyAllReachOutFilters();
});

test('@Verify Reach Out By Extended Flow with Select All and Chip Removal', async ({ }) => {
    test.setTimeout(600000);
    await manualReviewPage.verifyAllReachOutFiltersExtended();
});
