/* eslint-disable max-classes-per-file */
import { ILogErrorRepository } from '../../data/protocols/db/log/ILogErrorRepository';
import { ok, serverError } from '../../presentation/helpers/http/http';
import {
  IController,
  IHttpRequest,
  IHttpRespose,
} from '../../presentation/protocols';

import { LogControllerDecorator } from './LogControllerDecorator';

class ControllerStub implements IController {
  async handle(_: IHttpRequest): Promise<IHttpRespose> {
    return ok();
  }
}

class LogErrorRepositoryStub implements ILogErrorRepository {
  async saveError(_: string): Promise<void> {
    return new Promise(res => res());
  }
}

let controllerStub: ControllerStub;
let logErrorRepositoryStub: LogErrorRepositoryStub;

let systemUnderTest: LogControllerDecorator;

describe('LogControllerDecorator', () => {
  beforeEach(() => {
    controllerStub = new ControllerStub();
    logErrorRepositoryStub = new LogErrorRepositoryStub();

    systemUnderTest = new LogControllerDecorator(
      controllerStub,
      logErrorRepositoryStub
    );
  });

  it('should call controller handle method', async () => {
    const handleSpy = jest.spyOn(controllerStub, 'handle');

    const request: IHttpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    await systemUnderTest.handle(request);

    expect(handleSpy).toHaveBeenCalledWith(request);
  });

  it('should return same result of the controller', async () => {
    const response = await systemUnderTest.handle({
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    });

    expect(response).toEqual(ok());
  });

  it('should call LogErrorRepository with correct error if controller returns a server errror (500)', async () => {
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'saveError');

    const error: Error = {
      name: 'Error',
      message: 'any_error',
      stack: 'the stack trace',
    };

    jest
      .spyOn(controllerStub, 'handle')
      .mockReturnValueOnce(new Promise(res => res(serverError(error))));

    await systemUnderTest.handle({
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    });

    expect(logSpy).toHaveBeenLastCalledWith(error.stack);
  });
});
