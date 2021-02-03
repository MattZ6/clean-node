import { CompareFieldsValidation } from '../../../presentation/helpers/validators/CompareFieldsValidation';
import { EmailValidaton } from '../../../presentation/helpers/validators/EmailValidation';
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/RequiredFieldValidation';
import { ValidationComposite } from '../../../presentation/helpers/validators/ValidationComposite';
import { IEmailValidator } from '../../../presentation/protocols/IEmailValidator';
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
      new EmailValidaton('email', emailValidatorStub),
    ]);
  });
});
