import supertest from 'supertest';

import app from '../config/app';

describe('Content type middleware', () => {
  it('should return default content type as json', async () => {
    const ROUTE = '/test_content_type_default';

    app.get(ROUTE, (_, response) => {
      response.send('');
    });

    await supertest(app).get(ROUTE).expect('Content-Type', /json/);
  });

  it('should return xml content when forced', async () => {
    const ROUTE = '/test_content_type_xml';

    app.get(ROUTE, (_, response) => {
      response.type('xml');
      response.send('');
    });

    await supertest(app).get(ROUTE).expect('Content-Type', /xml/);
  });
});
