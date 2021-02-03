// eslint-disable-next-line max-classes-per-file
import { InvalidParamError } from '../../errors';
import { IEmailValidator } from '../../protocols/IEmailValidator';

import { EmailValidaton } from './EmailValidation';

class EmailValidatorStub implements IEmailValidator {
  isValid(_: string): boolean {
    return true;
  }
}

let emailValidatorStub: EmailValidatorStub;

let systemUnderTest: EmailValidaton;

describe('EmailValidaton', () => {
  beforeEach(() => {
    emailValidatorStub = new EmailValidatorStub();

    systemUnderTest = new EmailValidaton('email', emailValidatorStub);
  });

  it('should return InvalidParamError if EmailValidator returns false', () => {
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

    const result = systemUnderTest.validate('invalid_email@email.com');

    expect(result).toEqual(new InvalidParamError('email'));
  });

  it('should call EmailValidator with correct email', () => {
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');

    const email = 'any_email@email.com';

    systemUnderTest.validate({
      email,
    });

    expect(isValidSpy).toHaveBeenCalledWith(email);
  });

  it('should throw if EmailValidator throws', () => {
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error('any_error');
    });

    expect(systemUnderTest.validate).toThrowError();
  });
});
