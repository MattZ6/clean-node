import supertest from 'supertest';

import app from '../../config/app';

describe('CORS middleware', () => {
  it('should enable CORS', async () => {
    app.post('/test_cors', (_, res) => {
      res.send();
    });

    await supertest(app)
      .get('/test_cors')
      .expect('Access-Control-Allow-Origin', '*')
      .expect('Access-Control-Allow-Methods', '*')
      .expect('Access-Control-Allow-Headers', '*');
  });
});
