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

    const passwordsMatch = await this.hashComparer.compare(
      password,
      account.password
    );

    if (!passwordsMatch) {
      return null;
    }

    return null;
  }
}
