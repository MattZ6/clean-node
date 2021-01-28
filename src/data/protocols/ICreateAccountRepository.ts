import IAccountModel from '../../domain/models/IAccount';
import { ICreateAccountDTO } from '../../domain/usecases/ICreateAccount';

export default interface ICreateAccountRepository {
  create(data: ICreateAccountDTO): Promise<IAccountModel>;
}
