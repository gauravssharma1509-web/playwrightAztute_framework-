import { test } from '../../fixtures/baseFixture';
import { ManualReviewPage } from '../../pages/reviewModule/ManualReviewPage';

let manualReviewPage: ManualReviewPage;

test.beforeEach(async ({ page, loginPage }) => {
    console.log("Inside beforeEach");
    manualReviewPage = new ManualReviewPage(page);
    await manualReviewPage.openManualReviews();
});

test('@Verify sorting functionality for Name, Created Date and Updated Date columns', async ({ page }) => {
    test.setTimeout(60000);

    await manualReviewPage.verifyNameSortingAscending();
    await manualReviewPage.verifyNameSortingDescending();
    await manualReviewPage.verifyCreatedDateSortingAscending();
    await manualReviewPage.verifyCreatedDateSortingDescending();
    await manualReviewPage.verifyUpdatedDateSortingAscending();
    await manualReviewPage.verifyUpdatedDateSortingDescending();
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
