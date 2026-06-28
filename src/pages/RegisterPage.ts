import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * RegisterPage — covers the ParaBank new user registration form.
 * No login required; publicly accessible.
 */
export class RegisterPage extends BasePage {
  // ─── Locators ──────────────────────────────────────────────────────────────

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly phoneInput: Locator;
  readonly ssnInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly errorMessages: Locator;
  readonly successMessage: Locator;
  readonly pageHeader: Locator;

  constructor(page: Page) {
    super(page);

    this.firstNameInput = page.locator('input[id="customer.firstName"]');
    this.lastNameInput = page.locator('input[id="customer.lastName"]');
    this.addressInput = page.locator('input[id="customer.address.street"]');
    this.cityInput = page.locator('input[id="customer.address.city"]');
    this.stateInput = page.locator('input[id="customer.address.state"]');
    this.zipCodeInput = page.locator('input[id="customer.address.zipCode"]');
    this.phoneInput = page.locator('input[id="customer.phoneNumber"]');
    this.ssnInput = page.locator('input[id="customer.ssn"]');
    this.usernameInput = page.locator('input[id="customer.username"]');
    this.passwordInput = page.locator('input[id="customer.password"]');
    this.confirmPasswordInput = page.locator('input[id="repeatedPassword"]');
    this.registerButton = page.locator('input[value="Register"]');
    this.errorMessages = page.locator('.error');
    this.successMessage = page.locator('#rightPanel h1');
    this.pageHeader = page.locator('#rightPanel h1').first();
  }

  // ─── Actions ───────────────────────────────────────────────────────────────

  async navigate(): Promise<void> {
    await this.navigateTo('/parabank/register.htm');
  }

  async fillRegistrationForm(data: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone?: string;
    ssn: string;
    username: string;
    password: string;
    confirmPassword: string;
  }): Promise<void> {
    await this.fillField(this.firstNameInput, data.firstName);
    await this.fillField(this.lastNameInput, data.lastName);
    await this.fillField(this.addressInput, data.address);
    await this.fillField(this.cityInput, data.city);
    await this.fillField(this.stateInput, data.state);
    await this.fillField(this.zipCodeInput, data.zipCode);
    if (data.phone) await this.fillField(this.phoneInput, data.phone);
    await this.fillField(this.ssnInput, data.ssn);
    await this.fillField(this.usernameInput, data.username);
    await this.fillField(this.passwordInput, data.password);
    await this.fillField(this.confirmPasswordInput, data.confirmPassword);
  }

  async submitForm(): Promise<void> {
    await this.clickElement(this.registerButton);
    await this.waitForNavigation();
  }

  // ─── Getters ───────────────────────────────────────────────────────────────

  async getErrorMessages(): Promise<string[]> {
    const errors = this.errorMessages;
    const count = await errors.count();
    const messages: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await errors.nth(i).textContent();
      if (text) messages.push(text.trim());
    }
    return messages;
  }

  async getSuccessHeading(): Promise<string> {
    return this.getElementText(this.successMessage);
  }

  async isPageLoaded(): Promise<boolean> {
    return this.isElementVisible(this.firstNameInput);
  }
}
