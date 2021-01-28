import { Collection, MongoClient } from 'mongodb';

interface IMongoHelper {
  client: MongoClient | null;
  connect(uri: string): Promise<void>;
  disconnect(): Promise<void>;
  getCollection(name: string): Collection;
  mapTo<T = any>(data: any): T;
}

const mongoHelper: IMongoHelper = {
  client: null,

  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },

  async disconnect(): Promise<void> {
    if (!this.client) {
      return;
    }

    await this.client?.close();
  },

  getCollection(name: string): Collection {
    if (!this.client) {
      throw Error('Cliente não ativo');
    }

    return this.client.db().collection(name);
  },

  mapTo<T>(data: any): T {
    const { _id, ...dataWithoutId } = data;

    const xxx = {
      id: _id,
      ...dataWithoutId,
    };

    return xxx as T;
  },
};

export default mongoHelper;
