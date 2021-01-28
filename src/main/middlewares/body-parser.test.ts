import supertest from 'supertest';

import app from '../config/app';

describe('Body parser middleware', () => {
  it('should parse body as json', async () => {
    const ROUTE = '/test_body_parser';

    app.post(ROUTE, (request, response) => {
      response.send(request.body);
    });

    await supertest(app)
      .post(ROUTE)
      .send({
        hello: 'world',
      })
      .expect({ hello: 'world' });
  });
});
