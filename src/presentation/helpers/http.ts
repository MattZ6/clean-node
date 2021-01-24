import { IHttpRespose } from '../protocols';

import { ServerError } from '../errors';

export const badRequest = (error: Error): IHttpRespose => ({
  statusCode: 400,
  body: error,
});

export const serverError = (): IHttpRespose => ({
  statusCode: 500,
  body: new ServerError(),
});
