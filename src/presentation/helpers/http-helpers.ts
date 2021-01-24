import { IHttpRespose } from '../protocols/http';

const badRequest = (error: Error): IHttpRespose => ({
  statusCode: 400,
  body: error,
});

export default badRequest;
