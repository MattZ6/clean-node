import { InvalidParamError } from '../../errors';
import { IEmailValidator } from '../../protocols/IEmailValidator';
import { IValidation } from './IValidation';

export class EmailValidaton implements IValidation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: IEmailValidator
  ) {}

  validate(data: any): Error | null {
    const isValid = this.emailValidator.isValid(data[this.fieldName]);

    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }

    return null;
  }
}
