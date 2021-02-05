/* eslint-disable max-classes-per-file */
import {
  IAccountModel,
  IGetAccountByEmailRepository,
  IHashComparer,
  IEncrypter,
  IUpdateAccessTokenRepository,
  IUpdateAccessTokenDataDTO,
} from './DbAuthentication.protocols';

import { DbAuthentication } from './DbAuthentication';

class UpdateAccessTokenRepositoryStub implements IUpdateAccessTokenRepository {
  async update(_: IUpdateAccessTokenDataDTO): Promise<void> {
    // return GENERATED_ACCESS_TOKEN;
  }
}

const GENERATED_ACCESS_TOKEN = 'any_token';

class EncrypterStub implements IEncrypter {
  async encrypt(_: string): Promise<string> {
    return GENERATED_ACCESS_TOKEN;
  }
}

class HashComparerStub implements IHashComparer {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async compare(value: string, hashedValue: string): Promise<boolean> {
    return true;
  }
}

const ACCOUNT_ID = 'any_id';

class GetAccountByEmailRepositoryStub implements IGetAccountByEmailRepository {
  async findByEmail(email: string): Promise<IAccountModel | null> {
    return {
      id: ACCOUNT_ID,
      name: 'any_name',
      email,
      password: 'hashed_password',
    };
  }
}

let getAccountByEmailRepositoryStub: GetAccountByEmailRepositoryStub;
let hashComparerStub: HashComparerStub;
let encrypterStub: EncrypterStub;
let updateAccessTokenRepositoryStub: UpdateAccessTokenRepositoryStub;

let systemUnderTest: DbAuthentication;

describe('DbAuthentication UseCase', () => {
  beforeEach(() => {
    getAccountByEmailRepositoryStub = new GetAccountByEmailRepositoryStub();
    hashComparerStub = new HashComparerStub();
    encrypterStub = new EncrypterStub();
    updateAccessTokenRepositoryStub = new UpdateAccessTokenRepositoryStub();

    systemUnderTest = new DbAuthentication(
      getAccountByEmailRepositoryStub,
      hashComparerStub,
      encrypterStub,
      updateAccessTokenRepositoryStub
    );
  });

  it('should call GetAccountByEmailRepository with correct email', async () => {
    const findByEmailSpy = jest.spyOn(
      getAccountByEmailRepositoryStub,
      'findByEmail'
    );

    const email = 'any_email@email.com';

    await systemUnderTest.auth({
      email,
      password: 'any_password',
    });

    expect(findByEmailSpy).toHaveBeenCalledWith(email);
  });

  it('should throw if GetAccountByEmailRepository throws', async () => {
    jest
      .spyOn(getAccountByEmailRepositoryStub, 'findByEmail')
      .mockImplementationOnce(() => {
        throw new Error();
      });

    const promise = systemUnderTest.auth({
      email: 'any_email@email.com',
      password: 'any_password',
    });

    await expect(promise).rejects.toThrow();
  });

  it('should return null if GetAccountByEmailRepository returns null', async () => {
    jest
      .spyOn(getAccountByEmailRepositoryStub, 'findByEmail')
      .mockReturnValue(new Promise(res => res(null)));

    const accessToken = await systemUnderTest.auth({
      email: 'any_email@email.com',
      password: 'any_password',
    });

    expect(accessToken).toBeNull();
  });

  it('should call HashComparer with correct values', async () => {
    const findByEmailSpy = jest.spyOn(hashComparerStub, 'compare');

    const password = 'any_password';

    await systemUnderTest.auth({
      email: 'any_email@email.com',
      password,
    });

    expect(findByEmailSpy).toHaveBeenCalledWith(password, 'hashed_password');
  });

  it('should throw if HashComparer throws', async () => {
    jest.spyOn(hashComparerStub, 'compare').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = systemUnderTest.auth({
      email: 'any_email@email.com',
      password: 'any_password',
    });

    await expect(promise).rejects.toThrow();
  });

  it('should return null if HashComparer returns false', async () => {
    jest
      .spyOn(hashComparerStub, 'compare')
      .mockReturnValueOnce(new Promise(res => res(false)));

    const accessToken = await systemUnderTest.auth({
      email: 'any_email@email.com',
      password: 'any_password',
    });

    expect(accessToken).toBeNull();
  });

  it('should call Encrypter with correct value', async () => {
    const generateSpy = jest.spyOn(encrypterStub, 'encrypt');

    await systemUnderTest.auth({
      email: 'any_email@email.com',
      password: 'any_password',
    });

    expect(generateSpy).toHaveBeenCalledWith(ACCOUNT_ID);
  });

  it('should throw if Encrypter throws', async () => {
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = systemUnderTest.auth({
      email: 'any_email@email.com',
      password: 'any_password',
    });

    await expect(promise).rejects.toThrow();
  });

  it('should return a access token on success', async () => {
    const accessToken = await systemUnderTest.auth({
      email: 'any_email@email.com',
      password: 'any_password',
    });

    expect(accessToken).toBe(GENERATED_ACCESS_TOKEN);
  });

  it('should call UpdateAccessTokenRepository with correct values', async () => {
    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'update');

    const accessToken = await systemUnderTest.auth({
      email: 'any_email@email.com',
      password: 'any_password',
    });

    expect(updateSpy).toHaveBeenCalledWith({
      accountId: ACCOUNT_ID,
      accessToken,
    });
  });

  it('should throw if UpdateAccessTokenRepository throws', async () => {
    jest
      .spyOn(updateAccessTokenRepositoryStub, 'update')
      .mockImplementationOnce(() => {
        throw new Error();
      });

    const promise = systemUnderTest.auth({
      email: 'any_email@email.com',
      password: 'any_password',
    });

    await expect(promise).rejects.toThrow();
  });
});
