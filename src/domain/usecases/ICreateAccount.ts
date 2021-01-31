import { IAccountModel } from '../models/IAccount';

export interface ICreateAccountDTO {
  name: string;
  email: string;
  password: string;
}

export interface ICreateAccount {
  execute(data: ICreateAccountDTO): Promise<IAccountModel>;
}
