import { InvalidParamError } from '../../../errors';
import { CompareFieldsValidation } from '.';

let systemUnderTest: CompareFieldsValidation;

describe('CompareFieldsValidation', () => {
  const FIELD_NAME = 'field';
  const FIELD_TO_COMPARE_NAME = 'field_to_compare';

  beforeEach(() => {
    systemUnderTest = new CompareFieldsValidation(
      FIELD_NAME,
      FIELD_TO_COMPARE_NAME
    );
  });

  it('should return a InvalidParamError if validation fails', () => {
    const result = systemUnderTest.validate({
      [FIELD_NAME]: 'any_value',
      [FIELD_TO_COMPARE_NAME]: 'another_value',
    });

    expect(result).toEqual(new InvalidParamError(FIELD_NAME));
  });

  it('should return null if validation succeeds', () => {
    const result = systemUnderTest.validate({
      [FIELD_NAME]: 'equal_value',
      [FIELD_TO_COMPARE_NAME]: 'equal_value',
    });

    expect(result).toBeNull();
  });
});
