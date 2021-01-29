import supertest from 'supertest';

import app from '../../config/app';

describe('SignUp routes', () => {
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
