import { Page, Locator, expect } from '@playwright/test';

/**
 * BasePage — shared methods and utilities inherited by all page objects.
 * Centralises navigation, waits, and common assertions so individual
 * page classes stay clean and focused on their own selectors/actions.
 */
export class BasePage {
  constructor(protected readonly page: Page) {}

  // ─── Navigation ────────────────────────────────────────────────────────────

  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  // ─── Element Helpers ───────────────────────────────────────────────────────

  async waitForElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
  }

  async clickElement(locator: Locator): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async fillField(locator: Locator, value: string): Promise<void> {
    await locator.waitFor({ state: 'visible' });
    await locator.clear();
    await locator.fill(value);
  }

  async selectDropdown(locator: Locator, value: string): Promise<void> {
    await locator.selectOption({ label: value });
  }

  async getElementText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    return (await locator.textContent()) ?? '';
  }

  async isElementVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  // ─── Assertions ────────────────────────────────────────────────────────────

  async assertVisible(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeVisible();
  }

  async assertText(locator: Locator, expected: string): Promise<void> {
    await expect(locator).toHaveText(expected);
  }

  async assertContainsText(locator: Locator, expected: string): Promise<void> {
    await expect(locator).toContainText(expected);
  }

  async assertUrl(expected: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(expected);
  }

  // ─── Waits ─────────────────────────────────────────────────────────────────

  async waitForNavigation(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async waitForNetworkIdle(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }
}
