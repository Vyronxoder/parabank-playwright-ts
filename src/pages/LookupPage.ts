import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * LookupPage — covers the ParaBank "Forgot Login Info" page.
 * Publicly accessible; used for credential recovery validation testing.
 */
export class LookupPage extends BasePage {
  // ─── Locators ──────────────────────────────────────────────────────────────

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly addressInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly zipCodeInput: Locator;
  readonly ssnInput: Locator;
  readonly findLoginButton: Locator;
  readonly errorMessage: Locator;
  readonly pageHeader: Locator;
  readonly resultPanel: Locator;

  constructor(page: Page) {
    super(page);

    this.firstNameInput = page.locator('input[id="firstName"]');
    this.lastNameInput = page.locator('input[id="lastName"]');
    this.addressInput = page.locator('input[id="address.street"]');
    this.cityInput = page.locator('input[id="address.city"]');
    this.stateInput = page.locator('input[id="address.state"]');
    this.zipCodeInput = page.locator('input[id="address.zipCode"]');
    this.ssnInput = page.locator('input[id="ssn"]');
    this.findLoginButton = page.locator('input[value="Find My Login Info"]');
    this.errorMessage = page.locator('.error');
    this.pageHeader = page.locator('#rightPanel h1');
    this.resultPanel = page.locator('#rightPanel');
  }

  // ─── Actions ───────────────────────────────────────────────────────────────

  async navigate(): Promise<void> {
    await this.navigateTo('/parabank/lookup.htm');
  }

  async fillLookupForm(data: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    ssn: string;
  }): Promise<void> {
    await this.fillField(this.firstNameInput, data.firstName);
    await this.fillField(this.lastNameInput, data.lastName);
    await this.fillField(this.addressInput, data.address);
    await this.fillField(this.cityInput, data.city);
    await this.fillField(this.stateInput, data.state);
    await this.fillField(this.zipCodeInput, data.zipCode);
    await this.fillField(this.ssnInput, data.ssn);
  }

  async submitForm(): Promise<void> {
    await this.clickElement(this.findLoginButton);
    await this.waitForNavigation();
  }

  // ─── Getters ───────────────────────────────────────────────────────────────

  async getErrorMessage(): Promise<string> {
    return this.getElementText(this.errorMessage);
  }

  async getPageHeader(): Promise<string> {
    return this.getElementText(this.pageHeader);
  }

  async isFormVisible(): Promise<boolean> {
    return this.isElementVisible(this.firstNameInput);
  }
}
