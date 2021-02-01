import { ok } from '../../presentation/helpers/http';
import {
  IController,
  IHttpRequest,
  IHttpRespose,
} from '../../presentation/protocols';

import { LogControllerDecorator } from './log';

class ControllerStub implements IController {
  async handle(_: IHttpRequest): Promise<IHttpRespose> {
    return ok();
  }
}

let controllerStub: ControllerStub;
let systemUnderTest: LogControllerDecorator;

describe('LogControllerDecorator', () => {
  beforeEach(() => {
    controllerStub = new ControllerStub();

    systemUnderTest = new LogControllerDecorator(controllerStub);
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
});
