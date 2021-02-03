import { CompareFieldsValidation } from '../../presentation/helpers/validators/CompareFieldsValidation';
import { EmailValidaton } from '../../presentation/helpers/validators/EmailValidation';
import { IValidation } from '../../presentation/helpers/validators/IValidation';
import { RequiredFieldValidation } from '../../presentation/helpers/validators/RequiredFieldValidation';
import { ValidationComposite } from '../../presentation/helpers/validators/ValidationComposite';
import { EmailValidatorAdapter } from '../../utils/EmailValidatorAdapter';

export const makeSignUpValidation = (): IValidation => {
  return new ValidationComposite([
    new RequiredFieldValidation('name'),
    new RequiredFieldValidation('email'),
    new RequiredFieldValidation('password'),
    new RequiredFieldValidation('passwordConfirmation'),
    new CompareFieldsValidation('passwordConfirmation', 'password'),
    new EmailValidaton('email', new EmailValidatorAdapter()),
  ]);
};
