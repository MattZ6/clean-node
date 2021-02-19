import { ILogErrorRepository } from '../../../../data/protocols/db/log/ILogErrorRepository';
import { mongoHelper } from '../helpers/mongo-helper';

export class MongoLogRepository implements ILogErrorRepository {
  private readonly COLLECTION_NAME = 'errors';

  async saveError(stackTrace?: string): Promise<void> {
    const errorsCollection = await mongoHelper.getCollection(
      this.COLLECTION_NAME
    );

    await errorsCollection.insertOne({
      stack: stackTrace,
      created_at: new Date(),
    });
  }
}
