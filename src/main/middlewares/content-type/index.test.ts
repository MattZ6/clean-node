import supertest from 'supertest';

import app from '../../config/app';

describe('Content type middleware', () => {
  it('should return default content type as json', async () => {
    app.get('/test_content_type_default', (_, res) => {
      res.send('');
    });

    await supertest(app)
      .get('/test_content_type_default')
      .expect('Content-Type', /json/);
  });

  it('should return xml content when forced', async () => {
    app.get('/test_content_type_xml', (_, res) => {
      res.type('xml');
      res.send('');
    });

    await supertest(app)
      .get('/test_content_type_xml')
      .expect('Content-Type', /xml/);
  });
});
