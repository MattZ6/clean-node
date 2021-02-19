import { IValidation } from '../../../presentation/protocols/IValidation';
import {
  CompareFieldsValidation,
  RequiredFieldValidation,
  ValidationComposite,
  EmailValidation,
} from '../../../presentation/helpers/validators';
import { EmailValidatorAdapter } from '../../../utils/EmailValidatorAdapter';

export const makeSignUpValidation = (): IValidation => {
  return new ValidationComposite([
    new RequiredFieldValidation('name'),
    new RequiredFieldValidation('email'),
    new RequiredFieldValidation('password'),
    new RequiredFieldValidation('passwordConfirmation'),
    new CompareFieldsValidation('passwordConfirmation', 'password'),
    new EmailValidation('email', new EmailValidatorAdapter()),
  ]);
};
