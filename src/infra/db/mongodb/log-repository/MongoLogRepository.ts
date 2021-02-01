import { ILogErrorRepository } from '../../../../data/protocols/ILogErrorRepository';
import { mongoHelper } from '../helpers/mongo-helper';

export class MongoLogRepository implements ILogErrorRepository {
  async saveError(stackTrace?: string): Promise<void> {
    const errorsCollection = await mongoHelper.getCollection('errors');

    await errorsCollection.insertOne({
      stack: stackTrace,
      created_at: new Date(),
    });
  }
}
