import { EmailValidaton } from '../../../presentation/helpers/validators/EmailValidation';
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/RequiredFieldValidation';
import { ValidationComposite } from '../../../presentation/helpers/validators/ValidationComposite';
import { IEmailValidator } from '../../../presentation/protocols/IEmailValidator';
import { makeSignInValidation } from './sign-in-validation';

jest.mock('../../../presentation/helpers/validators/ValidationComposite');

class EmailValidatorStub implements IEmailValidator {
  isValid(_: string): boolean {
    return true;
  }
}

let emailValidatorStub: EmailValidatorStub;

describe('SignInValidation Factory', () => {
  beforeEach(() => {
    emailValidatorStub = new EmailValidatorStub();
  });

  it('should call ValidationComposite with all validations', () => {
    makeSignInValidation();

    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredFieldValidation('email'),
      new RequiredFieldValidation('password'),
      new EmailValidaton('email', emailValidatorStub),
    ]);
  });
});
