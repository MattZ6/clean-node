import { IAccountModel } from '../../../domain/models/IAccount';

export interface IGetAccountByEmailRepository {
  findByEmail(email: string): Promise<IAccountModel>;
}
