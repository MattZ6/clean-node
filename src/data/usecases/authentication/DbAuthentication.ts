import {
  IAuthentication,
  IAuthenticateRequestDTO,
  IFoundAccountByEmailRepository,
  IHashComparer,
  IEncrypter,
  IUpdateAccessTokenRepository,
} from './DbAuthentication.protocols';

export class DbAuthentication implements IAuthentication {
  constructor(
    private readonly getAccountByEmailRepository: IFoundAccountByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter,
    private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository
  ) {}

  async auth({
    email,
    password,
  }: IAuthenticateRequestDTO): Promise<string | null> {
    const account = await this.getAccountByEmailRepository.findByEmail(email);

    if (!account) {
      return null;
    }

    const passwordsMatch = await this.hashComparer.compare(
      password,
      account.password
    );

    if (!passwordsMatch) {
      return null;
    }

    const accessToken = await this.encrypter.encrypt(account.id);

    await this.updateAccessTokenRepository.update({
      accountId: account.id,
      accessToken,
    });

    return accessToken;
  }
}
