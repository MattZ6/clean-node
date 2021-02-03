// eslint-disable-next-line max-classes-per-file
import { SignUpController } from './SignUpController';

import {
  ICreateAccount,
  ICreateAccountDTO,
  IAccountModel,
  IValidation,
} from './SignUpController.protocols';

import { MissingParamError, ServerError } from '../../errors';

import { badRequest, ok, serverError } from '../../helpers/http/http';

class ValidationStub implements IValidation {
  validate(_: any): Error | null {
    return null;
  }
}

class CreateAccountStub implements ICreateAccount {
  public async execute({
    name,
    email,
    password,
  }: ICreateAccountDTO): Promise<IAccountModel> {
    return {
      id: 'valid_id',
      name,
      email,
      password,
    };
  }
}

let createAccountStub: CreateAccountStub;
let validationStub: ValidationStub;

let systemUnderTest: SignUpController;

describe('SignUpController', () => {
  beforeEach(() => {
    createAccountStub = new CreateAccountStub();
    validationStub = new ValidationStub();

    systemUnderTest = new SignUpController(createAccountStub, validationStub);
  });

  it('should return 400 if Validation returns an error', async () => {
    const error = new MissingParamError('any_param');

    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(error);

    const httpResponse = await systemUnderTest.handle({
      body: {
        name: 'valid_name',
        email: 'valid_email@email.com',
        password: 'valid_password',
        passwordConfirmation: 'valid_password',
      },
    });

    expect(httpResponse).toEqual(badRequest(error));
  });

  it('should call CreateAccount with correct values', async () => {
    const createAccountSpy = jest.spyOn(createAccountStub, 'execute');

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    await systemUnderTest.handle(httpRequest);

    expect(createAccountSpy).toHaveBeenCalledWith({
      name: httpRequest.body.name,
      email: httpRequest.body.email,
      password: httpRequest.body.password,
    });
  });

  it('should return 500 if CreateAccount throws', async () => {
    jest.spyOn(createAccountStub, 'execute').mockImplementationOnce(() => {
      return new Promise((_, reject) => reject(Error('any_error')));
    });

    const httpResponse = await systemUnderTest.handle({
      body: {
        name: 'any_name',
        email: 'invalid_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    });

    expect(httpResponse).toEqual(serverError(new ServerError()));
  });

  it('should return 200 valid data is provided', async () => {
    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@email.com',
        password: 'valid_password',
        passwordConfirmation: 'valid_password',
      },
    };

    const httpResponse = await systemUnderTest.handle(httpRequest);

    expect(httpResponse).toEqual(
      ok({
        id: 'valid_id',
        name: httpRequest.body.name,
        email: httpRequest.body.email,
        password: httpRequest.body.password,
      })
    );
  });

  it('should call Validation with correct values', async () => {
    const validateSpy = jest.spyOn(validationStub, 'validate');

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    await systemUnderTest.handle(httpRequest);

    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });
});
