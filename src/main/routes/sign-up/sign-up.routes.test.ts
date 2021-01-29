import supertest from 'supertest';

import mongoHelper from '../../../infra/db/mongodb/helpers/mongo-helper';

import app from '../../config/app';

describe('SignUp routes', () => {
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL ?? '');
  });

  afterAll(async () => {
    await mongoHelper.disconnect();
  });

  beforeEach(async () => {
    await mongoHelper.getCollection('accounts').deleteMany({});
  });

  it('should return an account on success', async () => {
    await supertest(app)
      .post('/v1/sign_up')
      .send({
        name: 'Usuário',
        email: 'usuario.teste@gmail.com',
        password: '123',
        passwordConfirmation: '123',
      })
      .expect(200);
  });
});
