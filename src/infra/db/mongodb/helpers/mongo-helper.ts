import { MongoClient } from 'mongodb';

interface IMongoHelper {
  client: MongoClient | null;
  connect(uri: string): Promise<void>;
  disconnect(): Promise<void>;
}

const MongoHelper: IMongoHelper = {
  client: null,

  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },

  async disconnect(): Promise<void> {
    await this.client?.close();
  },
};

export default MongoHelper;
