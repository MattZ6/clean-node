import { ICreateAccountDTO } from '../../domain/usecases/ICreateAccount';

import { IAccountModel } from '../../domain/models/IAccount';

export interface ICreateAccountRepository {
  create(data: ICreateAccountDTO): Promise<IAccountModel>;
}
