import env from '../../config/env';

import { DbAuthentication } from '../../../data/usecases/authentication/DbAuthentication';

import { BCryptHashAdapter } from '../../../infra/criptography/BCryptHashAdapter';
import { JwtAdapter } from '../../../infra/criptography/JwtAdapter';
import { MongoAccountRepository } from '../../../infra/db/mongodb/account/MongoAccountRepository';
import { MongoLogRepository } from '../../../infra/db/mongodb/log/MongoLogRepository';

import { SignInController } from '../../../presentation/controllers/sign-in/SignInController';
import { IController } from '../../../presentation/protocols';

import { LogControllerDecorator } from '../../decorators/LogControllerDecorator';
import { makeSignInValidation } from './sign-in-validation-factory';

export const makeSignInController = (): IController => {
  const hasher = new BCryptHashAdapter(12);
  const encrypter = new JwtAdapter(env.jwtSecret);

  const accountRepository = new MongoAccountRepository();

  const authenticationUseCase = new DbAuthentication(
    accountRepository,
    hasher,
    encrypter,
    accountRepository
  );

  const signInController = new SignInController(
    authenticationUseCase,
    makeSignInValidation()
  );

  const mongoLogRepository = new MongoLogRepository();

  return new LogControllerDecorator(signInController, mongoLogRepository);
};
