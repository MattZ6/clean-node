import { ICreateAccountRepository } from '../../../../data/protocols/db/ICreateAccountRepository';

import { ICreateAccountDTO } from '../../../../domain/usecases/ICreateAccount';
import { IAccountModel } from '../../../../domain/models/IAccount';

import { mongoHelper } from '../helpers/mongo-helper';

export class MongoAccountRepository implements ICreateAccountRepository {
  async create({
    name,
    email,
    password,
  }: ICreateAccountDTO): Promise<IAccountModel> {
    const accountsCollection = await mongoHelper.getCollection('accounts');

    const result = await accountsCollection.insertOne({
      name,
      email,
      password,
    });

    const account = mongoHelper.mapTo<IAccountModel>(result.ops[0]);

    return account;
  }
}
