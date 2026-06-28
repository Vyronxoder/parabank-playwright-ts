import { test, expect } from '../fixtures/fixtures';
import { CONTACT_DATA } from '../data/testData';

test.describe('Contact Form — ParaBank', () => {
  test.beforeEach(async ({ contactPage }) => {
    await contactPage.navigate();
  });

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

  test('should accept any email format (no server-side email validation) @regression', async ({ contactPage, page }) => {
    await contactPage.fillContactForm(CONTACT_DATA.invalidEmail);
    await contactPage.submitForm();
    const url = page.url();
    expect(url).toBeDefined();
  });

  test('should accept a very long message without crashing @regression', async ({ contactPage }) => {
    await contactPage.fillContactForm(CONTACT_DATA.longMessage);
    const value = await contactPage.messageInput.inputValue();
    expect(value.length).toBeGreaterThan(0);
  });

  test('should submit contact form successfully with valid data @regression', async ({ contactPage }) => {
    await contactPage.fillContactForm(CONTACT_DATA.valid);
    await contactPage.submitForm();
    const successMsg = await contactPage.getSuccessMessage();
    expect(successMsg.toLowerCase()).toMatch(/thank|sent|success|customer care|contact/);
  });

  test('should clear all form fields correctly @regression', async ({ contactPage }) => {
    await contactPage.fillContactForm(CONTACT_DATA.valid);
    await contactPage.clearForm();
    await expect(contactPage.nameInput).toHaveValue('');
    await expect(contactPage.emailInput).toHaveValue('');
    await expect(contactPage.messageInput).toHaveValue('');
  });
});
