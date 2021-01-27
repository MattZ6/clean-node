import EmailValidatorAdapter from './EmailValidatorAdapter';

let systemUnderTest: EmailValidatorAdapter;

describe('EmailValidatorAdapter', () => {
  beforeEach(() => {
    systemUnderTest = new EmailValidatorAdapter();
  });

  it('should return false if validator returns false', () => {
    const isValid = systemUnderTest.isValid('invalid_email@mail.com');

    expect(isValid).toBe(false);
  });
});
