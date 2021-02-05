/* eslint-disable max-classes-per-file */
import {
  IHasher,
  ICreateAccountDTO,
  ICreateAccountRepository,
  IAccountModel,
} from './DbCreateAccount.protocols';

import { DbCreateAccount } from './DbCreateAccount';

class HasherStub implements IHasher {
  async hash(_: string): Promise<string> {
    return 'hashed_password';
  }
}

class CreateAccountRepositoryStub implements ICreateAccountRepository {
  async create({
    name,
    email,
    password,
  }: ICreateAccountDTO): Promise<IAccountModel> {
    return new Promise(resolve =>
      resolve({
        id: 'any_id',
        name,
        email,
        password,
      })
    );
  }
}

let hasherStub: HasherStub;
let createAccountRepositoryStub: CreateAccountRepositoryStub;

let systemUnderTest: DbCreateAccount;

describe('DbCreateAccount use case', () => {
  beforeEach(() => {
    hasherStub = new HasherStub();
    createAccountRepositoryStub = new CreateAccountRepositoryStub();

    systemUnderTest = new DbCreateAccount(
      hasherStub,
      createAccountRepositoryStub
    );
  });

  it('should call Hasher with correct password', async () => {
    const hashSpy = jest.spyOn(hasherStub, 'hash');

    const password = 'valid_password';

    await systemUnderTest.execute({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password,
    });

    expect(hashSpy).toHaveBeenCalledWith(password);
  });

  it('should throw if Hasher throws', async () => {
    jest
      .spyOn(hasherStub, 'hash')
      .mockReturnValueOnce(new Promise((_, reject) => reject(new Error())));

    const promise = systemUnderTest.execute({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    });

    await expect(promise).rejects.toThrow();
  });

  it('should call CreateAccountRepository with correct data', async () => {
    const createSpy = jest.spyOn(createAccountRepositoryStub, 'create');

    const name = 'valid_name';
    const email = 'valid_email@mail.com';

    await systemUnderTest.execute({
      name,
      email,
      password: 'valid_password',
    });

    expect(createSpy).toHaveBeenCalledWith({
      name,
      email,
      password: 'hashed_password',
    });
  });

  it('should throw if CreateAccountRepository throws', async () => {
    jest
      .spyOn(createAccountRepositoryStub, 'create')
      .mockReturnValueOnce(new Promise((_, reject) => reject(new Error())));

    const promise = systemUnderTest.execute({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password',
    });

    await expect(promise).rejects.toThrow();
  });

  it('should return an account on success', async () => {
    const name = 'valid_name';
    const email = 'valid_email@mail.com';

    const account = await systemUnderTest.execute({
      name,
      email,
      password: 'valid_password',
    });

    expect(account).toEqual({
      id: 'any_id',
      name,
      email,
      password: 'hashed_password',
    });
  });
});
