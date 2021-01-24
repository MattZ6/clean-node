import {
  IHttpRequest,
  IHttpRespose,
  IController,
  IEmailValidator,
} from '../protocols';

import { MissingParamError, InvalidParamError } from '../errors';

import { badRequest, serverError } from '../helpers/http';

export default class SignUpController implements IController {
  constructor(private readonly emailValidator: IEmailValidator) {}

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

      const { email, password, passwordConfirmation } = httpRequest.body;

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      const isValidEmail = this.emailValidator.isValid(email);

      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'));
      }

      return {
        statusCode: 200,
        body: null,
      };
    } catch (error) {
      return serverError();
    }
  }
}
