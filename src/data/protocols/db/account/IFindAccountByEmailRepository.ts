import { IAccountModel } from '../../../../domain/models/IAccount';

export interface IFindAccountByEmailRepository {
  findByEmail(email: string): Promise<IAccountModel | null>;
}
