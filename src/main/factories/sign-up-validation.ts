import { IValidation } from '../../presentation/helpers/validators/IValidation';
import { RequiredFieldValidation } from '../../presentation/helpers/validators/RequiredFieldValidation';
import { ValidationComposite } from '../../presentation/helpers/validators/ValidationComposite';

export const makeSignUpValidation = (): IValidation => {
  return new ValidationComposite([
    new RequiredFieldValidation('name'),
    new RequiredFieldValidation('email'),
    new RequiredFieldValidation('password'),
    new RequiredFieldValidation('passwordConfirmation'),
  ]);
};
