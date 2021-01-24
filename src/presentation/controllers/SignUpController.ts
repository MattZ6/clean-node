import { IHttpRequest, IHttpRespose } from '../protocols/http';

import IController from '../protocols/IController';
import IEmailValidator from '../protocols/IEmailValidator';

import InvalidParamError from '../errors/InvalidParamError';
import MissingParamError from '../errors/MissingParamError';

import { badRequest, serverError } from '../helpers/http-helpers';

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

      const isValidEmail = this.emailValidator.isValid(httpRequest.body.email);

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
