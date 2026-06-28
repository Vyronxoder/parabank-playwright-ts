import { test, expect } from '../fixtures/fixtures';
import { LOOKUP_DATA } from '../data/testData';

/**
 * Forgot Login (Lookup) Test Suite — ParaBank
 *
 * Covers the credential recovery form — required field validation,
 * non-existent user error handling, and page load checks.
 * No prior login required.
 *
 * @tag regression
 */

test.describe('Forgot Login Info — ParaBank', () => {
  test.beforeEach(async ({ lookupPage }) => {
    await lookupPage.navigate();
  });

  // ─── Page Load ─────────────────────────────────────────────────────────────

  test('should load lookup page successfully @smoke', async ({ lookupPage }) => {
    const isVisible = await lookupPage.isFormVisible();
    expect(isVisible).toBe(true);
  });

  test('should display all lookup form fields @smoke', async ({ lookupPage }) => {
    await expect(lookupPage.firstNameInput).toBeVisible();
    await expect(lookupPage.lastNameInput).toBeVisible();
    await expect(lookupPage.addressInput).toBeVisible();
    await expect(lookupPage.cityInput).toBeVisible();
    await expect(lookupPage.stateInput).toBeVisible();
    await expect(lookupPage.zipCodeInput).toBeVisible();
    await expect(lookupPage.ssnInput).toBeVisible();
    await expect(lookupPage.findLoginButton).toBeVisible();
  });

  // ─── Validation — Empty Fields ─────────────────────────────────────────────

  test('should show validation error on empty form submission @regression', async ({ lookupPage }) => {
    await lookupPage.submitForm();
    const error = await lookupPage.getErrorMessage();
    expect(error.length).toBeGreaterThan(0);
  });

  test('should show error when first name is missing @regression', async ({ lookupPage }) => {
    await lookupPage.fillLookupForm({ ...LOOKUP_DATA.nonExistentUser, firstName: '' });
    await lookupPage.submitForm();
    const error = await lookupPage.getErrorMessage();
    expect(error.length).toBeGreaterThan(0);
  });

  test('should show error when SSN is missing @regression', async ({ lookupPage }) => {
    await lookupPage.fillLookupForm({ ...LOOKUP_DATA.nonExistentUser, ssn: '' });
    await lookupPage.submitForm();
    const error = await lookupPage.getErrorMessage();
    expect(error.length).toBeGreaterThan(0);
  });

  // ─── Negative — Non-Existent User ─────────────────────────────────────────

  test('should show error for non-existent user lookup @regression', async ({ lookupPage }) => {
    await lookupPage.fillLookupForm(LOOKUP_DATA.nonExistentUser);
    await lookupPage.submitForm();
    const error = await lookupPage.getErrorMessage();
    expect(error.toLowerCase()).toMatch(/error|not found|invalid|could not/);
  });

  // ─── Input Behaviour ───────────────────────────────────────────────────────

  test('should accept input in all fields without errors @regression', async ({ lookupPage }) => {
    await lookupPage.fillLookupForm(LOOKUP_DATA.nonExistentUser);
    await expect(lookupPage.firstNameInput).toHaveValue(LOOKUP_DATA.nonExistentUser.firstName);
    await expect(lookupPage.lastNameInput).toHaveValue(LOOKUP_DATA.nonExistentUser.lastName);
    await expect(lookupPage.ssnInput).toHaveValue(LOOKUP_DATA.nonExistentUser.ssn);
  });

  // ─── Navigation ───────────────────────────────────────────────────────────

  test('should have correct page URL @smoke', async ({ lookupPage, page }) => {
    await expect(page).toHaveURL(/lookup/);
  });
});
