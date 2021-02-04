import {
  IAuthentication,
  IAuthenticateRequestDTO,
  IGetAccountByEmailRepository,
  IHashComparer,
} from './DbAuthentication.protocols';

export class DbAuthentication implements IAuthentication {
  constructor(
    private readonly getAccountByEmailRepository: IGetAccountByEmailRepository,
    private readonly hashComparer: IHashComparer
  ) {}

  async auth({
    email,
    password,
  }: IAuthenticateRequestDTO): Promise<string | null> {
    const account = await this.getAccountByEmailRepository.findByEmail(email);

    if (!account) {
      return null;
    }

    await this.hashComparer.compare(password, account.password);

    return null;
  }
}
