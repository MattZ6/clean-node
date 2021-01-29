/* eslint-disable no-console */

import env from './config/env';

import mongoHelper from '../infra/db/mongodb/helpers/mongo-helper';

mongoHelper
  .connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default;

    app.listen(env.port, () =>
      console.log(`Server running at http:localhost:${env.port}`)
    );
  })
  .catch(err => {
    console.error(`
    ---------------------------------------
    ----- Database connection failed! -----
    ---------------------------------------
    `);

    console.error(err);
  });
