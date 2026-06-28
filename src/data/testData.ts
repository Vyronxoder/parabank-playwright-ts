/**
 * Test data for ParaBank E2E test suite.
 * Centralised here so tests stay clean and data changes are easy to manage.
 */

export const VALID_CREDENTIALS = {
  username: 'john',
  password: 'demo',
};

export const INVALID_CREDENTIALS = {
  username: 'invalidUser_xyz123',
  password: 'wrongPassword!',
};

export const EMPTY_CREDENTIALS = {
  username: '',
  password: '',
};

export const REGISTRATION_DATA = {
  valid: {
    firstName: 'Test',
    lastName: 'Automation',
    address: '123 QA Street',
    city: 'Testville',
    state: 'CA',
    zipCode: '94102',
    phone: '4155551234',
    ssn: '987654321',
    username: `qauser_${Date.now()}`,
    password: 'SecurePass@123',
    confirmPassword: 'SecurePass@123',
  },
  missingRequired: {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    ssn: '',
    username: '',
    password: '',
    confirmPassword: '',
  },
  passwordMismatch: {
    firstName: 'Test',
    lastName: 'User',
    address: '456 Bug Lane',
    city: 'Failcity',
    state: 'NY',
    zipCode: '10001',
    ssn: '123456789',
    username: `mismatch_${Date.now()}`,
    password: 'Password@123',
    confirmPassword: 'DifferentPass@456',
  },
};

export const CONTACT_DATA = {
  valid: {
    name: 'Gaurav Chaubey',
    email: 'gaurav@example.com',
    phone: '9876543210',
    message: 'This is an automated test message from the QA suite. Please disregard.',
  },
  invalidEmail: {
    name: 'Test User',
    email: 'not-an-email',
    phone: '1234567890',
    message: 'Testing invalid email validation.',
  },
  empty: {
    name: '',
    email: '',
    phone: '',
    message: '',
  },
  longMessage: {
    name: 'Boundary Test',
    email: 'boundary@test.com',
    phone: '5555555555',
    message: 'A'.repeat(500),
  },
};

export const LOOKUP_DATA = {
  nonExistentUser: {
    firstName: 'NoSuch',
    lastName: 'PersonExists',
    address: '999 Ghost Ave',
    city: 'Nowhere',
    state: 'ZZ',
    zipCode: '00000',
    ssn: '000000000',
  },
  emptyFields: {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    ssn: '',
  },
};

export const URLS = {
  home: '/parabank/index.htm',
  register: '/parabank/register.htm',
  contact: '/parabank/contact.htm',
  lookup: '/parabank/lookup.htm',
  aboutUs: '/parabank/about.htm',
  services: '/parabank/services.htm',
};
