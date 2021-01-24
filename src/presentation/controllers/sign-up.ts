import { IHttpRequest, IHttpRespose } from '../protocols/http';

import MissingParamError from '../errors/MissingParamError';
import badRequest from '../helpers/http-helpers';

export default class SignUpController {
  public handle(httpRequest: IHttpRequest): IHttpRespose {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'));
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'));
    }

    return {
      statusCode: 200,
      body: null,
    };
  }
}
