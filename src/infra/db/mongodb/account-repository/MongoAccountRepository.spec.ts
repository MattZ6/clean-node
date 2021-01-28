import mongoHelper from '../helpers/mongo-helper';

import MongoAccountRepository from './MongoAccountRepository';

let systemUnderTest: MongoAccountRepository;

describe('MongoAccountRepository', () => {
  beforeAll(async () => {
    await mongoHelper.connect(
      process.env.MONGO_URL ?? 'mongodb://127.0.0.1:27498/jest?'
    );
  });

  afterAll(async () => {
    await mongoHelper.disconnect();
  });

  beforeEach(() => {
    systemUnderTest = new MongoAccountRepository();
  });

  it('should return an account on success', async () => {
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
});
