import { MissingParamError } from '../../errors';
import { IValidation } from './IValidation';
import { ValidationComposite } from './ValidationComposite';

class ValidationStub implements IValidation {
  validate(_: any): Error | null {
    return null;
  }
}

let validationStubs: ValidationStub[];

let systemUnderTest: ValidationComposite;

describe('ValidationComposite', () => {
  beforeEach(() => {
    validationStubs = [new ValidationStub(), new ValidationStub()];

    systemUnderTest = new ValidationComposite(validationStubs);
  });

  it('should return an error if any validation fails', () => {
    const error = new MissingParamError('missing_field');

    const [, validationStub] = validationStubs;

    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(error);

    const result = systemUnderTest.validate({
      field: 'any_value',
    });

    expect(result).toEqual(error);
  });

  it('should return the first error if more than one validation fails', () => {
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error());
    jest
      .spyOn(validationStubs[1], 'validate')
      .mockReturnValueOnce(new MissingParamError('missing_field'));

    const result = systemUnderTest.validate({
      field: 'any_value',
    });

    expect(result).toEqual(new Error());
  });

  it('should return null if validation succeeds', () => {
    const result = systemUnderTest.validate({
      field: 'any_value',
    });

    expect(result).toBeNull();
  });
});
