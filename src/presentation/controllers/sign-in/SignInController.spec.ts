/* eslint-disable max-classes-per-file */
import {
  InvalidParamError,
  MissingParamError,
  ServerError,
} from '../../errors';
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http';
import {
  IEmailValidator,
  IHttpRequest,
  IAuthentication,
  IAuthenticateRequestDTO,
} from './SignInController.protocols';
import { SignInController } from './SignInController';

class EmailValidatorStub implements IEmailValidator {
  isValid(_: string): boolean {
    return true;
  }
}
class AuthenticationStub implements IAuthentication {
  async auth(_: IAuthenticateRequestDTO): Promise<string | null> {
    return 'any_access_token';
  }
}

let emailValidatorStub: EmailValidatorStub;
let authenticationStub: AuthenticationStub;

let systemUnderTest: SignInController;

describe('SignInController', () => {
  beforeEach(() => {
    emailValidatorStub = new EmailValidatorStub();
    authenticationStub = new AuthenticationStub();

    systemUnderTest = new SignInController(
      emailValidatorStub,
      authenticationStub
    );
  });

  it('should return 400 if no email is provided', async () => {
    const response = await systemUnderTest.handle({
      body: {
        password: 'any_password',
      },
    });

    expect(response).toEqual(badRequest(new MissingParamError('email')));
  });

  it('should return 400 if no password is provided', async () => {
    const response = await systemUnderTest.handle({
      body: {
        email: 'any_email@email.com',
      },
    });

    expect(response).toEqual(badRequest(new MissingParamError('password')));
  });

  it('should return 400 if an invalid email is provided', async () => {
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);

    const httpResponse = await systemUnderTest.handle({
      body: {
        email: 'invalid_email@email.com',
        password: 'any_password',
      },
    });

    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')));
  });

  it('should call EmailValidator with correct email', async () => {
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');

    const httpRequest: IHttpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
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
        email: 'invalid_email@email.com',
        password: 'any_password',
      },
    });

    expect(httpResponse).toEqual(serverError(new ServerError()));
  });

  it('should call Authentication with correct values', async () => {
    const authSpy = jest.spyOn(authenticationStub, 'auth');

    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
      },
    };

    await systemUnderTest.handle(httpRequest);

    expect(authSpy).toHaveBeenCalledWith({
      email: httpRequest.body.email,
      password: httpRequest.body.password,
    });
  });

  it('should return 401 invalid credentials are provided', async () => {
    jest
      .spyOn(authenticationStub, 'auth')
      .mockReturnValueOnce(new Promise(res => res(null)));

    const httpResponse = await systemUnderTest.handle({
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
      },
    });

    expect(httpResponse).toEqual(unauthorized());
  });

  it('should return 500 authentication throws', async () => {
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => {
      throw new Error();
    });

    const httpResponse = await systemUnderTest.handle({
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
      },
    });

    expect(httpResponse).toEqual(serverError(new ServerError()));
  });

  it('should return 200 if valid credentials are provided', async () => {
    const httpResponse = await systemUnderTest.handle({
      body: {
        email: 'any_email@email.com',
        password: 'any_password',
      },
    });

    expect(httpResponse).toEqual(
      ok({
        accessToken: 'any_access_token',
      })
    );
  });
});
