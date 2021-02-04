import { IEmailValidator } from '../../../presentation/protocols/IEmailValidator';

import {
  CompareFieldsValidation,
  RequiredFieldValidation,
  ValidationComposite,
  EmailValidation,
} from '../../../presentation/helpers/validators';

import { makeSignUpValidation } from './sign-up-validation';

jest.mock('../../../presentation/helpers/validators/ValidationComposite');

class EmailValidatorStub implements IEmailValidator {
  isValid(_: string): boolean {
    return true;
  }
}

let emailValidatorStub: EmailValidatorStub;

describe('SignUpValidation Factory', () => {
  beforeEach(() => {
    emailValidatorStub = new EmailValidatorStub();
  });

  it('should call ValidationComposite with all validations', () => {
    makeSignUpValidation();

    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredFieldValidation('name'),
      new RequiredFieldValidation('email'),
      new RequiredFieldValidation('password'),
      new RequiredFieldValidation('passwordConfirmation'),
      new CompareFieldsValidation('passwordConfirmation', 'password'),
      new EmailValidation('email', emailValidatorStub),
    ]);
  });
});
