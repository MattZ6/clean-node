import { Router } from 'express';

import { adaptRoute } from '../adapter/express-root-adapter';

import { makeSignUpController } from '../factories/sign-up';

export default (router: Router): void => {
  router.post('/v1/sign_up', adaptRoute(makeSignUpController()));
};
