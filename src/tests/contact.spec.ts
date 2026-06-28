import { test, expect } from '../fixtures/fixtures';
import { CONTACT_DATA } from '../data/testData';

/**
 * Contact Form Test Suite — ParaBank
 *
 * Covers form validation (empty submission, invalid email),
 * successful form submission, boundary value testing (long message),
 * and UI presence checks.
 * No prior login required.
 *
 * @tag regression
 */

test.describe('Contact Form — ParaBank', () => {
  test.beforeEach(async ({ contactPage }) => {
    await contactPage.navigate();
  });

  // ─── Page Load ─────────────────────────────────────────────────────────────

  test('should load contact page successfully @smoke', async ({ contactPage }) => {
    const isVisible = await contactPage.isFormVisible();
    expect(isVisible).toBe(true);
  });

  test('should display all contact form fields @smoke', async ({ contactPage }) => {
    await expect(contactPage.nameInput).toBeVisible();
    await expect(contactPage.emailInput).toBeVisible();
    await expect(contactPage.phoneInput).toBeVisible();
    await expect(contactPage.messageInput).toBeVisible();
    await expect(contactPage.sendButton).toBeVisible();
  });

  // ─── Validation — Empty Fields ─────────────────────────────────────────────

  test('should show validation errors on empty submission @regression', async ({ contactPage }) => {
    await contactPage.submitForm();
    const errors = await contactPage.getErrorMessages();
    expect(errors.length).toBeGreaterThan(0);
  });

  test('should show error when name is missing @regression', async ({ contactPage }) => {
    await contactPage.fillContactForm({ ...CONTACT_DATA.valid, name: '' });
    await contactPage.submitForm();
    const errors = await contactPage.getErrorMessages();
    expect(errors.some(e => e.toLowerCase().includes('name'))).toBe(true);
  });

  test('should show error when email is missing @regression', async ({ contactPage }) => {
    await contactPage.fillContactForm({ ...CONTACT_DATA.valid, email: '' });
    await contactPage.submitForm();
    const errors = await contactPage.getErrorMessages();
    expect(errors.length).toBeGreaterThan(0);
  });

  test('should show error when phone is missing @regression', async ({ contactPage }) => {
    await contactPage.fillContactForm({ ...CONTACT_DATA.valid, phone: '' });
    await contactPage.submitForm();
    const errors = await contactPage.getErrorMessages();
    expect(errors.length).toBeGreaterThan(0);
  });

  test('should show error when message is missing @regression', async ({ contactPage }) => {
    await contactPage.fillContactForm({ ...CONTACT_DATA.valid, message: '' });
    await contactPage.submitForm();
    const errors = await contactPage.getErrorMessages();
    expect(errors.length).toBeGreaterThan(0);
  });

  // ─── Validation — Invalid Inputs ───────────────────────────────────────────

  test('should reject invalid email format @regression', async ({ contactPage }) => {
    await contactPage.fillContactForm(CONTACT_DATA.invalidEmail);
    await contactPage.submitForm();
    const errors = await contactPage.getErrorMessages();
    expect(errors.length).toBeGreaterThan(0);
  });

  // ─── Boundary Value Analysis ───────────────────────────────────────────────

  test('should accept a very long message without crashing @regression', async ({ contactPage }) => {
    await contactPage.fillContactForm(CONTACT_DATA.longMessage);
    const value = await contactPage.messageInput.inputValue();
    expect(value.length).toBeGreaterThan(0);
  });

  // ─── Successful Submission ─────────────────────────────────────────────────

  test('should submit contact form successfully with valid data @regression', async ({ contactPage }) => {
    await contactPage.fillContactForm(CONTACT_DATA.valid);
    await contactPage.submitForm();
    const successMsg = await contactPage.getSuccessMessage();
    expect(successMsg.toLowerCase()).toMatch(/thank|sent|success/);
  });

  // ─── Input Behaviour ──────────────────────────────────────────────────────

  test('should clear all form fields correctly @regression', async ({ contactPage }) => {
    await contactPage.fillContactForm(CONTACT_DATA.valid);
    await contactPage.clearForm();
    await expect(contactPage.nameInput).toHaveValue('');
    await expect(contactPage.emailInput).toHaveValue('');
    await expect(contactPage.messageInput).toHaveValue('');
  });
});
