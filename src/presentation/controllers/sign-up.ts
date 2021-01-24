import { IHttpRequest, IHttpRespose } from '../protocols/http';

import MissingParamError from '../errors/MissingParamError';
import badRequest from '../helpers/http-helpers';

import IController from '../protocols/IController';

export default class SignUpController implements IController {
  public handle(httpRequest: IHttpRequest): IHttpRespose {
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

    return {
      statusCode: 200,
      body: null,
    };
  }
}
