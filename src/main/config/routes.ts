import { Express, Router } from 'express';
import { sync } from 'fast-glob';

export default (app: Express): void => {
  const router = Router();

  app.use('/api', router);

  sync('**/src/main/routes/*.routes.ts').forEach(async filePath =>
    (await import(`../../../${filePath}`)).default(router)
  );
};
