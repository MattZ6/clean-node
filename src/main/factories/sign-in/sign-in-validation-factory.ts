import { IValidation } from '../../../presentation/protocols/IValidation';
import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from '../../../presentation/helpers/validators';
import { EmailValidatorAdapter } from '../../adapter/validators/email/EmailValidatorAdapter';

export const makeSignInValidation = (): IValidation => {
  return new ValidationComposite([
    new RequiredFieldValidation('email'),
    new RequiredFieldValidation('password'),
    new EmailValidation('email', new EmailValidatorAdapter()),
  ]);
};
