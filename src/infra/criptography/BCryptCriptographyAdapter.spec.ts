import bcrypt from 'bcrypt';

import BCryptCriptographyAdapter from './BCryptCriptographyAdapter';

let systemUnderTest: BCryptCriptographyAdapter;

const salt = 12;

describe('BCryptCriptographyAdapter', () => {
  beforeEach(() => {
    systemUnderTest = new BCryptCriptographyAdapter(salt);
  });

  it('should call BCrypt with correct values', async () => {
    const bcryptHash = jest.spyOn(bcrypt, 'hash');

    await systemUnderTest.encrypt('any_value');

    expect(bcryptHash).toHaveBeenCalledWith('any_value', salt);
  });
});
