import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * HomePage — covers the ParaBank public landing page.
 * Encapsulates navigation links, login form, and promotional content.
 */
export class HomePage extends BasePage {
  // ─── Locators ──────────────────────────────────────────────────────────────

  readonly loginUsernameInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;
  readonly registerLink: Locator;
  readonly forgotLoginLink: Locator;
  readonly aboutUsLink: Locator;
  readonly servicesLink: Locator;
  readonly adminPageLink: Locator;
  readonly errorMessage: Locator;
  readonly welcomePanel: Locator;
  readonly logoLink: Locator;

  constructor(page: Page) {
    super(page);

    this.loginUsernameInput = page.locator('input[name="username"]');
    this.loginPasswordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('input[value="Log In"]');
    this.registerLink = page.locator('a[href*="register"]').first();
    this.forgotLoginLink = page.locator('a[href*="lookup"]');
    this.aboutUsLink = page.locator('a[href*="about"]');
    this.servicesLink = page.locator('#HeaderContent a[href*="services"]');
    this.adminPageLink = page.locator('a[href*="admin"]').first();
    this.errorMessage = page.locator('.error');
    this.welcomePanel = page.locator('#rightPanel');
    this.logoLink = page.locator('#logo');
  }

  // ─── Actions ───────────────────────────────────────────────────────────────

  async navigate(): Promise<void> {
    await this.navigateTo('/parabank/index.htm');
  }

  async login(username: string, password: string): Promise<void> {
    await this.fillField(this.loginUsernameInput, username);
    await this.fillField(this.loginPasswordInput, password);
    await this.clickElement(this.loginButton);
    await this.waitForNavigation();
  }

  async goToRegister(): Promise<void> {
    await this.clickElement(this.registerLink);
    await this.waitForNavigation();
  }

  async goToForgotLogin(): Promise<void> {
    await this.clickElement(this.forgotLoginLink);
    await this.waitForNavigation();
  }

  async goToAboutUs(): Promise<void> {
    await this.clickElement(this.aboutUsLink);
    await this.waitForNavigation();
  }

  // ─── Getters ───────────────────────────────────────────────────────────────

  async getErrorMessage(): Promise<string> {
    return this.getElementText(this.errorMessage);
  }

  async isLoginFormVisible(): Promise<boolean> {
    return this.isElementVisible(this.loginUsernameInput);
  }
}
