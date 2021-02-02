import { MissingParamError } from '../../errors';
import { badRequest } from '../../helpers/http';
import { SignInController } from './SignInController';

let systemUnderTest: SignInController;

describe('SignInController', () => {
  beforeEach(() => {
    systemUnderTest = new SignInController();
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
});
