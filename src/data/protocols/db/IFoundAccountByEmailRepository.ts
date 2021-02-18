import { IAccountModel } from '../../../domain/models/IAccount';

export interface IFoundAccountByEmailRepository {
  findByEmail(email: string): Promise<IAccountModel | null>;
}
