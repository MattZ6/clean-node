import {
  IAuthentication,
  IAuthenticateRequestDTO,
  IGetAccountByEmailRepository,
  IHashComparer,
  ITokenGenerator,
} from './DbAuthentication.protocols';

export class DbAuthentication implements IAuthentication {
  constructor(
    private readonly getAccountByEmailRepository: IGetAccountByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly tokenGenerator: ITokenGenerator
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

    return this.tokenGenerator.generate(account.id);
  }
}
