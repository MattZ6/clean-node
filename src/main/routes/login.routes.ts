import { Router } from 'express';

import { adaptRoute } from '../adapter/express/express-route-adapter';

import { makeSignInController } from '../factories/sign-in/sign-in-factory';
import { makeSignUpController } from '../factories/sign-up/sign-up-factory';

export default (router: Router): void => {
  router.post('/v1/login', adaptRoute(makeSignInController()));
  router.post('/v1/signup', adaptRoute(makeSignUpController()));
};
