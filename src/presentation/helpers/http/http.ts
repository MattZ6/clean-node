/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IHttpRespose } from '../../protocols';

import { ServerError, UnauthorizedError } from '../../errors';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ok = (data?: any): IHttpRespose => ({
  statusCode: 200,
  body: data ?? null,
});

export const badRequest = (error: Error): IHttpRespose => ({
  statusCode: 400,
  body: error,
});

export const unauthorized = (): IHttpRespose => ({
  statusCode: 401,
  body: new UnauthorizedError(),
});

export const serverError = (error: Error): IHttpRespose => ({
  statusCode: 500,
  body: new ServerError(error.stack),
});
