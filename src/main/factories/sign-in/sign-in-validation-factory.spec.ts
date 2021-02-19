import { makeSignInValidation } from './sign-in-validation-factory';
import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '../../../presentation/helpers/validators';
import { IEmailValidator } from '../../../presentation/protocols/IEmailValidator';

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
      new EmailValidation('email', emailValidatorStub),
    ]);
  });
});
