import {
  IHttpRequest,
  IHttpRespose,
  IController,
  IEmailValidator,
  ICreateAccount,
} from './SignUpController.protocols';

import { MissingParamError, InvalidParamError } from '../../errors';

import { ok, badRequest, serverError } from '../../helpers/http';

export default class SignUpController implements IController {
  constructor(
    private readonly emailValidator: IEmailValidator,
    private readonly createAccountUseCase: ICreateAccount
  ) {}

  public handle(httpRequest: IHttpRequest): IHttpRespose {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body;

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      const isValidEmail = this.emailValidator.isValid(email);

      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'));
      }

      const account = this.createAccountUseCase.execute({
        name,
        email,
        password,
      });

      return ok(account);
    } catch (error) {
      return serverError();
    }
  }
}
