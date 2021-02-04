import { MissingParamError } from '../../../errors';
import { RequiredFieldValidation } from '.';

let systemUnderTest: RequiredFieldValidation;

describe('RequiredFieldValidation', () => {
  const FIELD_NAME = 'field';

  beforeEach(() => {
    systemUnderTest = new RequiredFieldValidation(FIELD_NAME);
  });

  it('should return a MissingParamError if validation fails', () => {
    const result = systemUnderTest.validate({ invalid: 'field' });

    expect(result).toEqual(new MissingParamError(FIELD_NAME));
  });

  it('should return null if validation succeeds', () => {
    const result = systemUnderTest.validate({ [FIELD_NAME]: 'with_value' });

    expect(result).toBeNull();
  });
});
