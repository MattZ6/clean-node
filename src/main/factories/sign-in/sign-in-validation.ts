import { EmailValidaton } from '../../../presentation/helpers/validators/EmailValidation';
import { IValidation } from '../../../presentation/protocols/IValidation';
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/RequiredFieldValidation';
import { ValidationComposite } from '../../../presentation/helpers/validators/ValidationComposite';
import { EmailValidatorAdapter } from '../../../utils/EmailValidatorAdapter';

export const makeSignInValidation = (): IValidation => {
  return new ValidationComposite([
    new RequiredFieldValidation('email'),
    new RequiredFieldValidation('password'),
    new EmailValidaton('email', new EmailValidatorAdapter()),
  ]);
};
