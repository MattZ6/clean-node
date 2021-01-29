import DbCreateAccount from '../../data/usecases/create-account/DbCreateAccount';

import BCryptCriptographyAdapter from '../../infra/criptography/BCryptCriptographyAdapter';
import MongoAccountRepository from '../../infra/db/mongodb/account-repository/MongoAccountRepository';

import SignUpController from '../../presentation/controllers/sign-up/SignUpController';

import EmailValidatorAdapter from '../../utils/EmailValidatorAdapter';

export default function makeSignUpController(): SignUpController {
  const emailValidator = new EmailValidatorAdapter();

  const encrypter = new BCryptCriptographyAdapter(12);
  const accountRepository = new MongoAccountRepository();

  const createAccountUseCase = new DbCreateAccount(
    encrypter,
    accountRepository
  );

  return new SignUpController(emailValidator, createAccountUseCase);
}
