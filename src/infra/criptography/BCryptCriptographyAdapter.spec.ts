import bcrypt from 'bcrypt';

import { BCryptCriptographyAdapter } from './BCryptCriptographyAdapter';

let systemUnderTest: BCryptCriptographyAdapter;

const BCRYPT_SALT = 12;

const HASHED_VALUE = 'hashed_value';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return HASHED_VALUE;
  },
  async compare(_value: string, _hashedValue: string): Promise<boolean> {
    return true;
  },
}));

describe('BCryptCriptographyAdapter', () => {
  beforeEach(() => {
    systemUnderTest = new BCryptCriptographyAdapter(BCRYPT_SALT);
  });

  it('should call hash method with correct values', async () => {
    const bcryptHash = jest.spyOn(bcrypt, 'hash');

    await systemUnderTest.hash('any_value');

    expect(bcryptHash).toHaveBeenCalledWith('any_value', BCRYPT_SALT);
  });

  it('should throw if hash method throws', async () => {
    jest
      .spyOn(bcrypt, 'hash')
      .mockReturnValueOnce(new Promise((_, reject) => reject(new Error())));

    const promise = systemUnderTest.hash('any_value');

    await expect(promise).rejects.toThrow();
  });

  it('should return a valid hash on hash method success', async () => {
    const hashedValue = await systemUnderTest.hash('any_value');

    expect(hashedValue).toBe(HASHED_VALUE);
  });

  it('should call compare method with correct values', async () => {
    const compareHash = jest.spyOn(bcrypt, 'compare');

    await systemUnderTest.compare('any_value', 'hashed_value');

    expect(compareHash).toHaveBeenCalledWith('any_value', 'hashed_value');
  });

  it('should throw if hash method throws', async () => {
    jest
      .spyOn(bcrypt, 'compare')
      .mockReturnValueOnce(new Promise((_, rej) => rej(new Error())));

    const promise = systemUnderTest.compare('any_value', 'hashed_value');

    await expect(promise).rejects.toThrow();
  });

  it('should return false when compare fails', async () => {
    jest
      .spyOn(bcrypt, 'compare')
      .mockReturnValueOnce(new Promise(res => res(false)));

    const match = await systemUnderTest.compare('any_value', 'hashed_value');

    expect(match).toBe(false);
  });

  it('should return true when compare succeeds', async () => {
    const match = await systemUnderTest.compare('any_value', 'hashed_value');

    expect(match).toBe(true);
  });
});
