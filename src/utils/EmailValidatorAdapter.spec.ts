import validator from 'validator';

import EmailValidatorAdapter from './EmailValidatorAdapter';

let systemUnderTest: EmailValidatorAdapter;

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true;
  },
}));

describe('EmailValidatorAdapter', () => {
  beforeEach(() => {
    systemUnderTest = new EmailValidatorAdapter();
  });

  it('should return false if validator returns false', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);

    const isValid = systemUnderTest.isValid('invalid_email@mail.com');

    expect(isValid).toBe(false);
  });

  it('should return true if validator returns true', () => {
    const isValid = systemUnderTest.isValid('valid_email@mail.com');

    expect(isValid).toBe(true);
  });
});
