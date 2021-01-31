/* eslint-disable @typescript-eslint/no-explicit-any */

import { Collection, MongoClient } from 'mongodb';

interface IMongoHelper {
  uri: string | null;
  client: MongoClient | null;
  connect(uri: string): Promise<void>;
  disconnect(): Promise<void>;
  getCollection(name: string): Promise<Collection>;
  mapTo<T = any>(data: any): T;
}

export const mongoHelper: IMongoHelper = {
  uri: null,

  client: null,

  async connect(uri: string): Promise<void> {
    this.uri = uri;

    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },

  async disconnect(): Promise<void> {
    if (this.client != null) {
      await this.client.close();
    }

    this.client = null;
  },

  async getCollection<T = any>(name: string): Promise<Collection<T>> {
    if (!this.client?.isConnected()) {
      if (!this.uri) {
        throw Error('No MongoDB uri provided');
      }

      await this.connect(this.uri);
    }

    if (!this.client) {
      throw Error('MongoDB client is null');
    }

    return this.client.db().collection<T>(name);
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
