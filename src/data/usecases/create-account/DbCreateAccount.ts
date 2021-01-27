import IAccountModel from '../../../domain/models/IAccount';
import {
  ICreateAccount,
  ICreateAccountDTO,
} from '../../../domain/usecases/ICreateAccount';

import IEncrypter from '../../protocols/IEncrypter';

export default class DbCreateAccount implements ICreateAccount {
  constructor(private readonly encrypter: IEncrypter) {}

  public async execute({
    password,
  }: ICreateAccountDTO): Promise<IAccountModel> {
    await this.encrypter.encrypt(password);

    return new Promise(res => res({} as IAccountModel));
  }
}
