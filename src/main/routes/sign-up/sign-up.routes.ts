import { Router } from 'express';

export default (router: Router): void => {
  router.post('/v1/sign_up', (req, res) => res.json({ hello: 'world' }));
};
