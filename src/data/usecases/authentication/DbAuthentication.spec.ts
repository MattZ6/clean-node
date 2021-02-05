/* eslint-disable max-classes-per-file */
import { IAccountModel } from '../../../domain/models/IAccount';
import {
  IGetAccountByEmailRepository,
  IHashComparer,
  ITokenGenerator,
} from './DbAuthentication.protocols';

import { DbAuthentication } from './DbAuthentication';

class TokenGeneratorStub implements ITokenGenerator {
  async generate(_: string): Promise<string> {
    return 'any_token';
  }
}

class HashComparerStub implements IHashComparer {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  async compare(value: string, hashedValue: string): Promise<boolean> {
    return true;
  }
}

class GetAccountByEmailRepositoryStub implements IGetAccountByEmailRepository {
  async findByEmail(email: string): Promise<IAccountModel | null> {
    return {
      id: 'any_id',
      name: 'any_name',
      email,
      password: 'hashed_password',
    };
  }
}

let getAccountByEmailRepositoryStub: GetAccountByEmailRepositoryStub;
let hashComparerStub: HashComparerStub;
let tokenGeneratorStub: TokenGeneratorStub;

let systemUnderTest: DbAuthentication;

describe('DbAuthentication UseCase', () => {
  beforeEach(() => {
    getAccountByEmailRepositoryStub = new GetAccountByEmailRepositoryStub();
    hashComparerStub = new HashComparerStub();
    tokenGeneratorStub = new TokenGeneratorStub();

    systemUnderTest = new DbAuthentication(
      getAccountByEmailRepositoryStub,
      hashComparerStub,
      tokenGeneratorStub
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

  it('should call TokenGenerator with correct id', async () => {
    const generateSpy = jest.spyOn(tokenGeneratorStub, 'generate');

    await systemUnderTest.auth({
      email: 'any_email@email.com',
      password: 'any_password',
    });

    expect(generateSpy).toHaveBeenCalledWith('any_id');
  });
});
