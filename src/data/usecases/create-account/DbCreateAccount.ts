import {
  IEncrypter,
  ICreateAccount,
  ICreateAccountDTO,
  IAccountModel,
} from './DbCreateAccount.protocols';

export default class DbCreateAccount implements ICreateAccount {
  constructor(private readonly encrypter: IEncrypter) {}

  public async execute({
    password,
  }: ICreateAccountDTO): Promise<IAccountModel> {
    await this.encrypter.encrypt(password);

    return new Promise(res => res({} as IAccountModel));
  }
}
