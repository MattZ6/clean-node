import { MissingParamError } from '../../errors';
import { IValidation } from './IValidation';

export class RequiredFieldValidation implements IValidation {
  constructor(private readonly fieldName: string) {}

  validate(data: any): Error | null {
    if (!data[this.fieldName]) {
      return new MissingParamError(this.fieldName);
    }

    return null;
  }
}
