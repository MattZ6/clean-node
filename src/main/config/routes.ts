import { Express, Router } from 'express';
import { sync } from 'fast-glob';

export default (app: Express): void => {
  const router = Router();

  app.use(router);

  sync('**/src/main/routes/**/*.routes.ts').map(async filePath =>
    (await import(`../../../${filePath}`)).default(router)
  );
};
