import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * ContactPage — covers the ParaBank public contact form.
 * Fully accessible without login; good for form validation coverage.
 */
export class ContactPage extends BasePage {
  // ─── Locators ──────────────────────────────────────────────────────────────

  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly messageInput: Locator;
  readonly sendButton: Locator;
  readonly successMessage: Locator;
  readonly errorMessages: Locator;
  readonly pageHeader: Locator;

  constructor(page: Page) {
    super(page);

    this.nameInput = page.locator('input[id="name"]');
    this.emailInput = page.locator('input[id="email"]');
    this.phoneInput = page.locator('input[id="phone"]');
    this.messageInput = page.locator('textarea[id="message"]');
    this.sendButton = page.locator('input[value="Send to Customer Care"]');
    this.successMessage = page.locator('#rightPanel .title');
    this.errorMessages = page.locator('.error');
    this.pageHeader = page.locator('#rightPanel h1');
  }

  // ─── Actions ───────────────────────────────────────────────────────────────

  async navigate(): Promise<void> {
    await this.navigateTo('/parabank/contact.htm');
  }

  async fillContactForm(data: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }): Promise<void> {
    await this.fillField(this.nameInput, data.name);
    await this.fillField(this.emailInput, data.email);
    await this.fillField(this.phoneInput, data.phone);
    await this.fillField(this.messageInput, data.message);
  }

  async submitForm(): Promise<void> {
    await this.clickElement(this.sendButton);
    await this.waitForNavigation();
  }

  async clearForm(): Promise<void> {
    await this.nameInput.clear();
    await this.emailInput.clear();
    await this.phoneInput.clear();
    await this.messageInput.clear();
  }

  // ─── Getters ───────────────────────────────────────────────────────────────

  async getSuccessMessage(): Promise<string> {
    return this.getElementText(this.successMessage);
  }

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

  async isFormVisible(): Promise<boolean> {
    return this.isElementVisible(this.nameInput);
  }
}
