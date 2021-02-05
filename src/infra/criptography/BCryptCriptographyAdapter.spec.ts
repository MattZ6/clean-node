import bcrypt from 'bcrypt';

import { BCryptCriptographyAdapter } from './BCryptCriptographyAdapter';

let systemUnderTest: BCryptCriptographyAdapter;

const BCRYPT_SALT = 12;

const HASHED_VALUE = 'hashed_value';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return new Promise(resolve => resolve(HASHED_VALUE));
  },
}));

describe('BCryptCriptographyAdapter', () => {
  beforeEach(() => {
    systemUnderTest = new BCryptCriptographyAdapter(BCRYPT_SALT);
  });

  it('should call BCrypt with correct values', async () => {
    const bcryptHash = jest.spyOn(bcrypt, 'hash');

    await systemUnderTest.hash('any_value');

    expect(bcryptHash).toHaveBeenCalledWith('any_value', BCRYPT_SALT);
  });

  it('should throw if BCrypt throws', async () => {
    jest
      .spyOn(bcrypt, 'hash')
      .mockReturnValueOnce(new Promise((_, reject) => reject(new Error())));

    const promise = systemUnderTest.hash('any_value');

    await expect(promise).rejects.toThrow();
  });

  it('should return a hash on success', async () => {
    const hashedValue = await systemUnderTest.hash('any_value');

    expect(hashedValue).toBe(HASHED_VALUE);
  });
});
