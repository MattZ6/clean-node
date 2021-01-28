import ICreateAccountRepository from '../../protocols/ICreateAccountRepository';
import {
  IEncrypter,
  ICreateAccount,
  ICreateAccountDTO,
  IAccountModel,
} from './DbCreateAccount.protocols';

export default class DbCreateAccount implements ICreateAccount {
  constructor(
    private readonly encrypter: IEncrypter,
    private readonly createAccountRepository: ICreateAccountRepository
  ) {}

  public async execute({
    name,
    email,
    password,
  }: ICreateAccountDTO): Promise<IAccountModel> {
    const passwordHash = await this.encrypter.encrypt(password);

    const account = await this.createAccountRepository.create({
      name,
      email,
      password: passwordHash,
    });

    return account;
  }
}
