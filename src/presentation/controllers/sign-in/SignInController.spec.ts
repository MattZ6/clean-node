/* eslint-disable max-classes-per-file */
import { MissingParamError, ServerError } from '../../errors';
import { badRequest, ok, serverError, unauthorized } from '../../helpers/http';
import {
  IValidation,
  IAuthentication,
  IAuthenticateRequestDTO,
} from './SignInController.protocols';
import { SignInController } from './SignInController';

class ValidationStub implements IValidation {
  validate(_: any): Error | null {
    return null;
  }
}

class AuthenticationStub implements IAuthentication {
  async auth(_: IAuthenticateRequestDTO): Promise<string | null> {
    return 'any_access_token';
  }
}

let authenticationStub: AuthenticationStub;
let validationStub: ValidationStub;

let systemUnderTest: SignInController;

describe('SignInController', () => {
  beforeEach(() => {
    authenticationStub = new AuthenticationStub();
    validationStub = new ValidationStub();

    systemUnderTest = new SignInController(authenticationStub, validationStub);
  });

  it('should return 400 if Validation returns an error', async () => {
    const error = new MissingParamError('any_param');

    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(error);

    const httpResponse = await systemUnderTest.handle({
      body: {
        email: 'invalid_email@email.com',
        password: 'invalid_password',
      },
    });

    expect(httpResponse).toEqual(badRequest(error));
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
