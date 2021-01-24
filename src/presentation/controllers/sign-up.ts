import { IHttpRequest, IHttpRespose } from '../protocols/http';

import MissingParamError from '../errors/MissingParamError';

export default class SignUpController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public handle(httpRequest: IHttpRequest): IHttpRespose {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new MissingParamError('name'),
      };
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new MissingParamError('email'),
      };
    }

    return {
      statusCode: 200,
      body: null,
    };
  }
}
