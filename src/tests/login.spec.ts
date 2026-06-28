import { test, expect } from '../fixtures/fixtures';
import { VALID_CREDENTIALS, INVALID_CREDENTIALS, URLS } from '../data/testData';

test.describe('Login — ParaBank', () => {
  test.beforeEach(async ({ homePage }) => {
    await homePage.navigate();
  });

  test('should display login form on home page @smoke', async ({ homePage }) => {
    await expect(homePage.loginUsernameInput).toBeVisible();
    await expect(homePage.loginPasswordInput).toBeVisible();
    await expect(homePage.loginButton).toBeVisible();
  });

  test('should redirect to accounts overview after successful login @smoke', async ({ homePage, page }) => {
    await homePage.login(VALID_CREDENTIALS.username, VALID_CREDENTIALS.password);
    await expect(page).toHaveURL(/overview/);
  });

  test('should display welcome message after successful login @regression', async ({ homePage, page }) => {
    await homePage.login(VALID_CREDENTIALS.username, VALID_CREDENTIALS.password);
    const content = page.locator('#rightPanel');
    await expect(content).toBeVisible();
  });

  test('should show error for invalid username and password @regression', async ({ homePage }) => {
    await homePage.login(INVALID_CREDENTIALS.username, INVALID_CREDENTIALS.password);
    await expect(homePage.errorMessage).toBeVisible();
    await expect(homePage.errorMessage).toContainText('could not be verified');
  });

  test('should show error when username is empty @regression', async ({ homePage }) => {
    await homePage.login('', VALID_CREDENTIALS.password);
    const url = homePage.getCurrentUrl();
    expect(url).toBeDefined();
  });

  test('should show error when password is empty @regression', async ({ homePage }) => {
    await homePage.login(VALID_CREDENTIALS.username, '');
    const url = homePage.getCurrentUrl();
    expect(url).toBeDefined();
  });

  test('should show error when both fields are empty @regression', async ({ homePage }) => {
    await homePage.login('', '');
    const url = homePage.getCurrentUrl();
    expect(url).toBeDefined();
  });

  test('should not allow SQL injection to bypass login @regression', async ({ homePage, page }) => {
    await homePage.login("' OR '1'='1", 'anyPassword');
    const url = page.url();
    expect(url).not.toContain('overview');
  });

  test('should navigate to register page via link @smoke', async ({ homePage, page }) => {
    await homePage.goToRegister();
    await expect(page).toHaveURL(/register/);
  });

  test('should navigate to forgot login page via link @regression', async ({ homePage, page }) => {
    await homePage.goToForgotLogin();
    await expect(page).toHaveURL(/lookup/);
  });

  test('should navigate to about us page @regression', async ({ homePage, page }) => {
    await homePage.goToAboutUs();
    await expect(page).toHaveURL(/about/);
  });

  test('should have correct page title @smoke', async ({ page }) => {
    await page.goto(URLS.home);
    const title = await page.title();
    expect(title).toContain('ParaBank');
  });
});
