import { ICreateAccountRepository } from '../../../../data/protocols/db/ICreateAccountRepository';
import { IFindAccountByEmailRepository } from '../../../../data/protocols/db/IFindAccountByEmailRepository';

import { ICreateAccountDTO } from '../../../../domain/usecases/ICreateAccount';
import { IAccountModel } from '../../../../domain/models/IAccount';

import { mongoHelper } from '../helpers/mongo-helper';

export class MongoAccountRepository
  implements ICreateAccountRepository, IFindAccountByEmailRepository {
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

    return mongoHelper.mapTo<IAccountModel>(result.ops[0]);
  }

  async findByEmail(email: string): Promise<IAccountModel | null> {
    const accountsCollection = await mongoHelper.getCollection<IAccountModel>(
      'accounts'
    );

    const account = await accountsCollection.findOne({ email });

    if (!account) {
      return null;
    }

    return mongoHelper.mapTo<IAccountModel>(account);
  }
}
