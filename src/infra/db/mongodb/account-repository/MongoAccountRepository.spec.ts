import { Collection } from 'mongodb';

import { mongoHelper } from '../helpers/mongo-helper';

import { MongoAccountRepository } from './MongoAccountRepository';

let accountsCollection: Collection;

let systemUnderTest: MongoAccountRepository;

describe('MongoAccountRepository', () => {
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL ?? '');
  });

  afterAll(async () => {
    await mongoHelper.disconnect();
  });

  beforeEach(async () => {
    systemUnderTest = new MongoAccountRepository();

    accountsCollection = await mongoHelper.getCollection('accounts');

    await accountsCollection.deleteMany({});
  });

  it('should return an account on create success', async () => {
    const name = 'any_name';
    const email = 'any_email@mail.com';
    const password = 'any_password';

    const account = await systemUnderTest.create({
      name,
      email,
      password,
    });

    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe(name);
    expect(account.email).toBe(email);
    expect(account.password).toBe(password);
  });

  it('should return null if findByEmail fails', async () => {
    const account = await systemUnderTest.findByEmail('any_email@mail.com');

    expect(account).toBeNull();
  });

  it('should return an account on findByEmail success', async () => {
    const name = 'any_name';
    const email = 'any_email@mail.com';
    const password = 'any_password';

    await accountsCollection.insertOne({
      name,
      email,
      password,
    });

    const account = await systemUnderTest.findByEmail(email);

    expect(account).toBeTruthy();
    expect(account?.id).toBeTruthy();
    expect(account?.name).toBe(name);
    expect(account?.email).toBe(email);
    expect(account?.password).toBe(password);
  });
});
