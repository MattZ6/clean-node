import { IHttpRequest, IHttpRespose } from '../protocols/http';

export default class SignUpController {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public handle(httpRequest: IHttpRequest): IHttpRespose {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing param: name'),
      };
    }

    if (!httpRequest.body.email) {
      return {
        statusCode: 400,
        body: new Error('Missing param: email'),
      };
    }

    return {
      statusCode: 200,
      body: null,
    };
  }
}
