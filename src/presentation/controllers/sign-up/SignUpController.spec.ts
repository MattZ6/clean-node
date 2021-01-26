// eslint-disable-next-line max-classes-per-file
import SignUpController from './SignUpController';

import {
  IEmailValidator,
  ICreateAccount,
  ICreateAccountDTO,
  IAccount,
} from './SignUpController.protocols';

import {
  MissingParamError,
  InvalidParamError,
  ServerError,
} from '../../errors';

class CreateAccountStub implements ICreateAccount {
  public execute({ name, email, password }: ICreateAccountDTO): IAccount {
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

let systemUnderTest: SignUpController;

describe('SignUpController', () => {
  beforeEach(() => {
    emailValidatorStub = new EmailValidatorStub();
    createAccountStub = new CreateAccountStub();

    systemUnderTest = new SignUpController(
      emailValidatorStub,
      createAccountStub
    );
  });

  it('should return 400 if no name is provided', () => {
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = systemUnderTest.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  it('should return 400 if no email is provided', () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = systemUnderTest.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  it('should return 400 if no password is provided', () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = systemUnderTest.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  it('should return 400 if no password confirmation is provided', () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };

    const httpResponse = systemUnderTest.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new MissingParamError('passwordConfirmation')
    );
  });

  it('should return 400 if password confirmation fails', () => {
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'another_password',
      },
    };

    const httpResponse = systemUnderTest.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new InvalidParamError('passwordConfirmation')
    );
  });

  it('should return 400 if an invalid email is provided', () => {
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = systemUnderTest.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });

  it('should call EmailValidator with correct email', () => {
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    systemUnderTest.handle(httpRequest);

    expect(isValidSpy).toHaveBeenCalledWith(httpRequest.body.email);
  });

  it('should return 500 if EmailValidator throws', () => {
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error('any_error');
    });

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = systemUnderTest.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });

  it('should call CreateAccount with correct values', () => {
    const createAccountSpy = jest.spyOn(createAccountStub, 'execute');

    const httpRequest = {
      body: {
        name: 'valid_name',
        email: 'valid_email@email.com',
        password: 'valid_password',
        passwordConfirmation: 'valid_password',
      },
    };

    systemUnderTest.handle(httpRequest);

    expect(createAccountSpy).toHaveBeenCalledWith({
      name: httpRequest.body.name,
      email: httpRequest.body.email,
      password: httpRequest.body.password,
    });
  });
});
