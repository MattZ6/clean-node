import { Express, Router } from 'express';
import { join } from 'path';
import { readdirSync } from 'fs';

export default (app: Express): void => {
  const router = Router();

  app.use('/api', router);

  const dir = join(__dirname, '..', 'routes');

  readdirSync(dir)
    .filter(fileName => !fileName.includes('.test.'))
    .map(async filename => {
      (await import(join(dir, filename))).default(router);
    });
};
