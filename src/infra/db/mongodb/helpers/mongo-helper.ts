import { Collection, MongoClient } from 'mongodb';

interface IMongoHelper {
  client: MongoClient | null;
  connect(uri: string): Promise<void>;
  disconnect(): Promise<void>;
  getCollection(name: string): Collection;
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
};

export default mongoHelper;
