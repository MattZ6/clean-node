import { DbCreateAccount } from '../../data/usecases/create-account/DbCreateAccount';

import { BCryptCriptographyAdapter } from '../../infra/criptography/BCryptCriptographyAdapter';
import { MongoAccountRepository } from '../../infra/db/mongodb/account-repository/MongoAccountRepository';
import { MongoLogRepository } from '../../infra/db/mongodb/log-repository/MongoLogRepository';

import { SignUpController } from '../../presentation/controllers/sign-up/SignUpController';
import { IController } from '../../presentation/protocols';

import { EmailValidatorAdapter } from '../../utils/EmailValidatorAdapter';

import { LogControllerDecorator } from '../decorators/log';
import { makeSignUpValidation } from './sign-up-validation';

export const makeSignUpController = (): IController => {
  const emailValidator = new EmailValidatorAdapter();

  const encrypter = new BCryptCriptographyAdapter(12);
  const accountRepository = new MongoAccountRepository();

  const createAccountUseCase = new DbCreateAccount(
    encrypter,
    accountRepository
  );

  const signUpController = new SignUpController(
    emailValidator,
    createAccountUseCase,
    makeSignUpValidation()
  );

  const mongoLogRepository = new MongoLogRepository();

  return new LogControllerDecorator(signUpController, mongoLogRepository);
};
