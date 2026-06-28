import { test as base } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import { ContactPage } from '../pages/ContactPage';
import { LookupPage } from '../pages/LookupPage';

/**
 * Custom Fixtures — typed POM injection for all test specs.
 * Tests import `test` from here instead of @playwright/test directly,
 * getting fully initialised page objects with zero boilerplate.
 */

type ParaBankFixtures = {
  homePage: HomePage;
  registerPage: RegisterPage;
  contactPage: ContactPage;
  lookupPage: LookupPage;
};

export const test = base.extend<ParaBankFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  contactPage: async ({ page }, use) => {
    await use(new ContactPage(page));
  },

  lookupPage: async ({ page }, use) => {
    await use(new LookupPage(page));
  },
});

export { expect } from '@playwright/test';
