import { InvalidParamError } from '../../../errors';
import { IValidation } from '../../../protocols/IValidation';

export class CompareFieldsValidation implements IValidation {
  constructor(
    private readonly fieldName: string,
    private readonly fieldNameToCompare: string
  ) {}

  validate(data: any): Error | null {
    if (data[this.fieldName] !== data[this.fieldNameToCompare]) {
      return new InvalidParamError(this.fieldName);
    }

    return null;
  }
}
