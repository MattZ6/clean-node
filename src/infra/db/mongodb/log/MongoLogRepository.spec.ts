import { Collection } from 'mongodb';

import { mongoHelper } from '../helpers/mongo-helper';

import { MongoLogRepository } from './MongoLogRepository';

let systemUnderTest: MongoLogRepository;

let errorsCollection: Collection;

describe('MongoLogRepository', () => {
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL ?? '');
  });

  afterAll(async () => {
    await mongoHelper.disconnect();
  });

  beforeEach(async () => {
    systemUnderTest = new MongoLogRepository();

    errorsCollection = await mongoHelper.getCollection('errors');

    await errorsCollection.deleteMany({});
  });

  it('should create an error log on success', async () => {
    const stackTrace = 'any_error_stack';

    await systemUnderTest.saveError(stackTrace);

    const errorsCount = await errorsCollection.countDocuments();

    expect(errorsCount).toBe(1);
  });
});
