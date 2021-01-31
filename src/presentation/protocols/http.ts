/* eslint-disable @typescript-eslint/no-explicit-any */

export interface IHttpRespose<T = any> {
  statusCode: number;
  body: T;
}

export interface IHttpRequest<T = any> {
  body?: T;
}
