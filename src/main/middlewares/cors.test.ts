import supertest from 'supertest';

import app from '../config/app';

describe('CORS middleware', () => {
  it('should enable CORS', async () => {
    const ROUTE = '/test_cors';

    app.post(ROUTE, (_, response) => {
      response.send();
    });

    await supertest(app)
      .get(ROUTE)
      .expect('Access-Control-Allow-Origin', '*')
      .expect('Access-Control-Allow-Methods', '*')
      .expect('Access-Control-Allow-Headers', '*');
  });
});
