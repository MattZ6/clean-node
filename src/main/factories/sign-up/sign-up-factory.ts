import { DbCreateAccount } from '../../../data/usecases/create-account/DbCreateAccount';

import { BCryptHashAdapter } from '../../../infra/criptography/BCryptHashAdapter';
import { MongoAccountRepository } from '../../../infra/db/mongodb/account/MongoAccountRepository';
import { MongoLogRepository } from '../../../infra/db/mongodb/log/MongoLogRepository';

import { SignUpController } from '../../../presentation/controllers/sign-up/SignUpController';
import { IController } from '../../../presentation/protocols';

import { LogControllerDecorator } from '../../decorators/LogControllerDecorator';
import { makeSignUpValidation } from './sign-up-validation-factory';

export const makeSignUpController = (): IController => {
  const hasher = new BCryptHashAdapter(12);
  const accountRepository = new MongoAccountRepository();

  const createAccountUseCase = new DbCreateAccount(hasher, accountRepository);

  const signUpController = new SignUpController(
    createAccountUseCase,
    makeSignUpValidation()
  );

  const mongoLogRepository = new MongoLogRepository();

  return new LogControllerDecorator(signUpController, mongoLogRepository);
};
