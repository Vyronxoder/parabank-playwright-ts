import { test, expect } from '../fixtures/fixtures';
import { REGISTRATION_DATA } from '../data/testData';

test.describe('Registration — ParaBank', () => {
  test.beforeEach(async ({ registerPage }) => {
    await registerPage.navigate();
  });

  test('should load registration page successfully @smoke', async ({ registerPage }) => {
    const isLoaded = await registerPage.isPageLoaded();
    expect(isLoaded).toBe(true);
  });

  test('should display all required form fields @smoke', async ({ registerPage }) => {
    await expect(registerPage.firstNameInput).toBeVisible();
    await expect(registerPage.lastNameInput).toBeVisible();
    await expect(registerPage.usernameInput).toBeVisible();
    await expect(registerPage.passwordInput).toBeVisible();
    await expect(registerPage.confirmPasswordInput).toBeVisible();
    await expect(registerPage.registerButton).toBeVisible();
  });

  test('should show validation errors when all fields are empty @regression', async ({ registerPage }) => {
    await registerPage.submitForm();
    const errors = await registerPage.getErrorMessages();
    expect(errors.length).toBeGreaterThan(0);
  });

  test('should show error when first name is missing @regression', async ({ registerPage }) => {
    await registerPage.fillRegistrationForm({ ...REGISTRATION_DATA.valid, firstName: '' });
    await registerPage.submitForm();
    const errors = await registerPage.getErrorMessages();
    expect(errors.length).toBeGreaterThan(0);
  });

  test('should show error when last name is missing @regression', async ({ registerPage }) => {
    await registerPage.fillRegistrationForm({ ...REGISTRATION_DATA.valid, lastName: '' });
    await registerPage.submitForm();
    const errors = await registerPage.getErrorMessages();
    expect(errors.some(e => e.toLowerCase().includes('last name'))).toBe(true);
  });

  test('should show error when username is missing @regression', async ({ registerPage }) => {
    await registerPage.fillRegistrationForm({ ...REGISTRATION_DATA.valid, username: '' });
    await registerPage.submitForm();
    const errors = await registerPage.getErrorMessages();
    expect(errors.some(e => e.toLowerCase().includes('username'))).toBe(true);
  });

  test('should show error when password is missing @regression', async ({ registerPage }) => {
    await registerPage.fillRegistrationForm({ ...REGISTRATION_DATA.valid, password: '', confirmPassword: '' });
    await registerPage.submitForm();
    const errors = await registerPage.getErrorMessages();
    expect(errors.length).toBeGreaterThan(0);
  });

  test('should show error when passwords do not match @regression', async ({ registerPage }) => {
    await registerPage.fillRegistrationForm(REGISTRATION_DATA.passwordMismatch);
    await registerPage.submitForm();
    const errors = await registerPage.getErrorMessages();
    expect(errors.some(e => e.toLowerCase().includes('password'))).toBe(true);
  });

  test('should accept single character first name @regression', async ({ registerPage }) => {
    await registerPage.fillField(registerPage.firstNameInput, 'A');
    await expect(registerPage.firstNameInput).toHaveValue('A');
  });

  test('should accept maximum length username input @regression', async ({ registerPage }) => {
    const longUsername = 'u'.repeat(50);
    await registerPage.fillField(registerPage.usernameInput, longUsername);
    const value = await registerPage.usernameInput.inputValue();
    expect(value.length).toBeGreaterThan(0);
  });

  test('should register new user successfully with valid data @regression', async ({ registerPage }) => {
    await registerPage.fillRegistrationForm(REGISTRATION_DATA.valid);
    await registerPage.submitForm();
    const heading = await registerPage.getSuccessHeading();
    expect(heading.toLowerCase()).toContain('welcome');
  });
});
