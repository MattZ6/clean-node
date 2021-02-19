import supertest from 'supertest';

import app from '../config/app';

import { mongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';

describe('SignIn routes', () => {
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL ?? '');
  });

  afterAll(async () => {
    await mongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountsCollection = await mongoHelper.getCollection('accounts');

    await accountsCollection.deleteMany({});
  });

  describe('POST /signup', () => {
    it('should return 200 on sign up', async () => {
      await supertest(app)
        .post('/api/v1/signup')
        .send({
          name: 'Usuário',
          email: 'usuario.teste@gmail.com',
          password: '123',
          passwordConfirmation: '123',
        })
        .expect(200);
    });
  });
});
