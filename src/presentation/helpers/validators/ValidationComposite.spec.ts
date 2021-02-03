import { MissingParamError } from '../../errors';
import { IValidation } from './IValidation';
import { ValidationComposite } from './ValidationComposite';

class ValidationStub implements IValidation {
  validate(_: any): Error | null {
    return null;
  }
}

let validationStub: ValidationStub;

let systemUnderTest: ValidationComposite;

describe('ValidationComposite', () => {
  beforeEach(() => {
    validationStub = new ValidationStub();

    systemUnderTest = new ValidationComposite([validationStub]);
  });

  it('should return an error if any validation fails', () => {
    const error = new MissingParamError('missing_field');

    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(error);

    const result = systemUnderTest.validate({
      field: 'any_value',
    });

    expect(result).toEqual(error);
  });
});
