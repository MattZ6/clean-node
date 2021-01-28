import { ICreateAccountDTO } from '../../../../domain/usecases/ICreateAccount';
import IAccount from '../../../../domain/models/IAccount';
import ICreateAccountRepository from '../../../../data/protocols/ICreateAccountRepository';
import mongoHelper from '../helpers/mongo-helper';

export default class MongoAccountRepository
  implements ICreateAccountRepository {
  async create({
    name,
    email,
    password,
  }: ICreateAccountDTO): Promise<IAccount> {
    const accountsCollection = mongoHelper.getCollection('accounts');

    const result = await accountsCollection.insertOne({
      name,
      email,
      password,
    });

    const account = mongoHelper.mapTo<IAccount>(result.ops[0]);

    return account;
  }
}
