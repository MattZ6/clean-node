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

    const password = 'valid_password';

    const promise = systemUnderTest.execute({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password,
    });

    await expect(promise).rejects.toThrow();
  });
});
