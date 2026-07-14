import { test } from "../../fixtures/baseFixture";
import { AutoReplyPage } from "../../pages/reviewModule/AutoReplyPage";

let autoReply: AutoReplyPage;

test.beforeEach(async ({ page, loginPage }) => {
    console.log("Inside beforeEach");
    autoReply = new AutoReplyPage(page);
    await autoReply.openAutoReply();
});










test("Rule Name Min Validation", async () => {
    await autoReply.verifyRuleNameMinValidation();
});


test("Rule Name Max Validation", async () => {
    await autoReply.verifyRuleNameMaxLength();
});









test("Template Required Validation", async () => {
    await autoReply.verifyTemplateRequiredValidation();
});


test("Template Name Min Validation", async () => {

    await autoReply.verifyTemplateNameMinValidation();

});


