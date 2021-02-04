import { IAccountModel } from '../../../domain/models/IAccount';
import { IGetAccountByEmailRepository } from '../../protocols/IGetAccountByEmailRepository';

import { DbAuthentication } from './DbAuthentication';

class GetAccountByEmailRepositoryStub implements IGetAccountByEmailRepository {
  async findByEmail(email: string): Promise<IAccountModel> {
    return {
      id: 'any_id',
      name: 'any_name',
      email,
      password: 'hashed_password',
    };
  }
}

let getAccountByEmailRepositoryStub: GetAccountByEmailRepositoryStub;

let systemUnderTest: DbAuthentication;

describe('DbAuthentication UseCase', () => {
  beforeEach(() => {
    getAccountByEmailRepositoryStub = new GetAccountByEmailRepositoryStub();

    systemUnderTest = new DbAuthentication(getAccountByEmailRepositoryStub);
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
});
