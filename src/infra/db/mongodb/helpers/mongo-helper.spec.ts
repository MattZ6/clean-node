import { mongoHelper as systemUnderTest } from './mongo-helper';

describe('Mongo helper', () => {
  beforeAll(async () => {
    await systemUnderTest.connect(process.env.MONGO_URL ?? '');
  });

  afterAll(async () => {
    await systemUnderTest.disconnect();
  });

  it('should reconnect if mongodb is down', async () => {
    let accountsCollection = await systemUnderTest.getCollection('accounts');

    expect(accountsCollection).toBeTruthy();

    await systemUnderTest.disconnect();

    accountsCollection = await systemUnderTest.getCollection('accounts');

    expect(accountsCollection).toBeTruthy();
  });

  it('should not reconnect if no uri is provided', async () => {
    const accountsCollection = await systemUnderTest.getCollection('accounts');

    expect(accountsCollection).toBeTruthy();

    await systemUnderTest.disconnect();

    systemUnderTest.uri = null;

    const promsie = systemUnderTest.getCollection('accounts');

    expect(promsie).rejects.toThrow();
  });
});
