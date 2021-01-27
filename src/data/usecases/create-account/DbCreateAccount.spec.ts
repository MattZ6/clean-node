import DbCreateAccount from './DbCreateAccount';
import IEncrypter from '../../protocols/IEncrypter';

class EncrypterStub implements IEncrypter {
  async encrypt(_: string): Promise<string> {
    return 'hashed_password';
  }
}

let encrypterStub: EncrypterStub;

let systemUnderTest: DbCreateAccount;

describe('DbCreateAccount use case', () => {
  beforeEach(() => {
    encrypterStub = new EncrypterStub();

    systemUnderTest = new DbCreateAccount(encrypterStub);
  });

  it('should call Encrypter with correct password', () => {
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');

    const password = 'valid_password';

    systemUnderTest.execute({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password,
    });

    expect(encryptSpy).toHaveBeenCalledWith(password);
  });
});
