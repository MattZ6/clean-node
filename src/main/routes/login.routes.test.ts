import { Collection } from 'mongodb';
import { hash } from 'bcrypt';

import supertest from 'supertest';

import app from '../config/app';

import { mongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';

let accountsCollection: Collection;

describe('SignIn routes', () => {
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL ?? '');
  });

  afterAll(async () => {
    await mongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountsCollection = await mongoHelper.getCollection('accounts');

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

  describe('POST /login', () => {
    it('should return 200 on sign in', async () => {
      const email = 'usuario.teste@gmail.com';
      const password = '123';

      const hashedPassword = await hash(password, 12);

      await accountsCollection.insertOne({
        name: 'Usuário',
        email,
        password: hashedPassword,
      });

      await supertest(app)
        .post('/api/v1/login')
        .send({
          email,
          password,
        })
        .expect(200);
    });

    it('should return 401 on sign in', async () => {
      const email = 'usuario.teste@gmail.com';
      const password = '123';

      await supertest(app)
        .post('/api/v1/login')
        .send({
          email,
          password,
        })
        .expect(401);
    });
  });
});
