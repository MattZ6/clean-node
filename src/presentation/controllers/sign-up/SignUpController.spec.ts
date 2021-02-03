// eslint-disable-next-line max-classes-per-file
import { SignUpController } from './SignUpController';

import {
  IEmailValidator,
  ICreateAccount,
  ICreateAccountDTO,
  IAccountModel,
  IValidation,
} from './SignUpController.protocols';

import {
  MissingParamError,
  InvalidParamError,
  ServerError,
} from '../../errors';

import { IHttpRequest } from '../../protocols';

import { badRequest, ok, serverError } from '../../helpers/http';

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

class EmailValidatorStub implements IEmailValidator {
  isValid(_: string): boolean {
    return true;
  }
}

let emailValidatorStub: EmailValidatorStub;
let createAccountStub: CreateAccountStub;
let validationStub: ValidationStub;

let systemUnderTest: SignUpController;

describe('SignUpController', () => {
  beforeEach(() => {
    emailValidatorStub = new EmailValidatorStub();
    createAccountStub = new CreateAccountStub();
    validationStub = new ValidationStub();

    systemUnderTest = new SignUpController(
      emailValidatorStub,
      createAccountStub,
      validationStub
    );
  });

  it('should return 400 if no name is provided', async () => {
    const httpResponse = await systemUnderTest.handle({
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    });

    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')));
  });

  it('should return 400 if no email is provided', async () => {
    const httpResponse = await systemUnderTest.handle({
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    });

    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')));
  });

  it('should return 400 if no password is provided', async () => {
    const httpResponse = await systemUnderTest.handle({
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password',
      },
    });

    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')));
  });

  it('should return 400 if no password confirmation is provided', async () => {
    const httpResponse = await systemUnderTest.handle({
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    });

    expect(httpResponse).toEqual(
      badRequest(new MissingParamError('passwordConfirmation'))
    );
  });

  it('should return 400 if password confirmation fails', async () => {
    const httpResponse = await systemUnderTest.handle({
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'another_password',
      },
    });

    expect(httpResponse).toEqual(
      badRequest(new InvalidParamError('passwordConfirmation'))
    );
  });

  it('should return 400 if an invalid email is provided', async () => {
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpResponse = await systemUnderTest.handle({
      body: {
        name: 'any_name',
        email: 'invalid_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    });

    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')));
  });

  it('should call EmailValidator with correct email', async () => {
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');

    const httpRequest: IHttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    await systemUnderTest.handle(httpRequest);

    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email);
  });

  it('should return 500 if EmailValidator throws', async () => {
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error('any_error');
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

  it('should return 400 if Validation returns an eror', async () => {
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
});
