import { IHttpRequest, IHttpRespose } from '../protocols/http';

import MissingParamError from '../errors/MissingParamError';
import badRequest from '../helpers/http-helpers';

export default class SignUpController {
  public handle(httpRequest: IHttpRequest): IHttpRespose {
    const requiredFields = ['name', 'email'];

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
