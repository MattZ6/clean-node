/* eslint-disable max-classes-per-file */
import IAccountModel from '../../../domain/models/IAccount';
import { ICreateAccountDTO } from '../../../domain/usecases/ICreateAccount';
import ICreateAccountRepository from '../../protocols/ICreateAccountRepository';
import DbCreateAccount from './DbCreateAccount';
import { IEncrypter } from './DbCreateAccount.protocols';

class EncrypterStub implements IEncrypter {
  async encrypt(_: string): Promise<string> {
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

let encrypterStub: EncrypterStub;
let createAccountRepositoryStub: CreateAccountRepositoryStub;

let systemUnderTest: DbCreateAccount;

describe('DbCreateAccount use case', () => {
  beforeEach(() => {
    encrypterStub = new EncrypterStub();
    createAccountRepositoryStub = new CreateAccountRepositoryStub();

    systemUnderTest = new DbCreateAccount(
      encrypterStub,
      createAccountRepositoryStub
    );
  });

  it('should call Encrypter with correct password', async () => {
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');

    const password = 'valid_password';

    await systemUnderTest.execute({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password,
    });

    expect(encryptSpy).toHaveBeenCalledWith(password);
  });

  it('should throw if Encrypter throws', async () => {
    jest
      .spyOn(encrypterStub, 'encrypt')
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
});
