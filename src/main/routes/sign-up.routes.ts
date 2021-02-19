import { Router } from 'express';

import { adaptRoute } from '../adapter/express/express-route-adapter';

import { makeSignUpController } from '../factories/sign-up/sign-up-factory';

export default (router: Router): void => {
  router.post('/v1/sign_up', adaptRoute(makeSignUpController()));
};
