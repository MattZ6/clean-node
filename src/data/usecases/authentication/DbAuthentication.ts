import {
  IAuthentication,
  IAuthenticateRequestDTO,
  IGetAccountByEmailRepository,
} from './DbAuthentication.protocols';

export class DbAuthentication implements IAuthentication {
  constructor(
    private readonly getAccountByEmailRepository: IGetAccountByEmailRepository
  ) {}

  async auth({ email }: IAuthenticateRequestDTO): Promise<string | null> {
    await this.getAccountByEmailRepository.findByEmail(email);

    return null;
  }
}
